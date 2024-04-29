import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import backend as K
from tensorflow.keras.layers import Dense, Activation, Dropout, BatchNormalization, Flatten
from tensorflow.keras.optimizers import AdamW
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Model
import numpy as np
import pandas as pd
import os
import shutil
import time
from sklearn.model_selection import train_test_split

def preprocess(sdir, trsplit, vsplit):
   filepaths = []
   labels = []
   classlist = os.listdir(sdir)
   for klass in classlist:
       classpath = os.path.join(sdir, klass)
       flist = os.listdir(classpath)
       for f in flist:
           fpath = os.path.join(classpath, f)
           filepaths.append(fpath)
           labels.append(klass)
   Fseries = pd.Series(filepaths, name='filepaths')
   Lseries = pd.Series(labels, name='labels')
   df = pd.concat([Fseries, Lseries], axis=1)
   dsplit = vsplit / (1 - trsplit)
   strat = df['labels']
   train_df, dummy_df = train_test_split(df, train_size=trsplit, shuffle=True, random_state=123, stratify=strat)
   strat = dummy_df['labels']
   valid_df, test_df = train_test_split(dummy_df, train_size=dsplit, shuffle=True, random_state=123, stratify=strat)
   return train_df, test_df, valid_df

def balance(train_df, max_samples, min_samples, column, working_dir, image_size):
   train_df = train_df.copy()
   train_df = trim(train_df, max_samples, min_samples, column)
   aug_dir=os.path.join(working_dir, 'aug')
   if os.path.isdir(aug_dir):
       shutil.rmtree(aug_dir)
   os.mkdir(aug_dir)
   for label in train_df['labels'].unique():
       dir_path=os.path.join(aug_dir,label)
       os.mkdir(dir_path)
   gen=ImageDataGenerator(horizontal_flip=True,  rotation_range=20, width_shift_range=.2,
                                 height_shift_range=.2, zoom_range=.2)
   groups=train_df.groupby('labels')
   for label in train_df['labels'].unique():
       group=groups.get_group(label)
       sample_count=len(group)
       if sample_count< max_samples:
           aug_img_count=0
           delta=max_samples-sample_count
           target_dir=os.path.join(aug_dir, label)
           aug_gen=gen.flow_from_dataframe( group,  x_col='filepaths', y_col=None, target_size=image_size,
                                           class_mode=None, batch_size=1, shuffle=False,
                                           save_to_dir=target_dir, save_prefix='aug-', color_mode='rgb',
                                           save_format='jpg')
           while aug_img_count<delta:
               images=next(aug_gen)
               aug_img_count += len(images)
   aug_fpaths=[]
   aug_labels=[]
   classlist=os.listdir(aug_dir)
   for klass in classlist:
       classpath=os.path.join(aug_dir, klass)
       flist=os.listdir(classpath)
       for f in flist:
           fpath=os.path.join(classpath,f)
           aug_fpaths.append(fpath)
           aug_labels.append(klass)
   Fseries=pd.Series(aug_fpaths, name='filepaths')
   Lseries=pd.Series(aug_labels, name='labels')
   aug_df=pd.concat([Fseries, Lseries], axis=1)
   ndf=pd.concat([train_df,aug_df], axis=0).reset_index(drop=True)
   return ndf

sdir = r'Dataset'
train_df, test_df, valid_df = preprocess(sdir, .8, .1)
max_samples = 1006
min_samples = 0
column = 'labels'
working_dir = r'./'
img_size = (480, 480)
ndf = balance(train_df, max_samples, min_samples, column, working_dir, img_size)

channels = 3
batch_size = 16
img_shape = (img_size[0], img_size[1], channels)
length = len(test_df)
test_batch_size = sorted([int(length/n) for n in range(1, length+1) if length % n == 0 and length/n <= 80], reverse=True)[0]
test_steps = int(length/test_batch_size)

def scalar(img):
   return img

trgen = ImageDataGenerator(preprocessing_function=scalar, horizontal_flip=True)
tvgen = ImageDataGenerator(preprocessing_function=scalar)
train_gen = trgen.flow_from_dataframe(ndf, x_col='filepaths', y_col='labels', target_size=img_size, class_mode='categorical',
                                     color_mode='rgb', shuffle=True, batch_size=batch_size)
test_gen = tvgen.flow_from_dataframe(test_df, x_col='filepaths', y_col='labels', target_size=img_size, class_mode='categorical',
                                    color_mode='rgb', shuffle=False, batch_size=test_batch_size)
valid_gen = tvgen.flow_from_dataframe(valid_df, x_col='filepaths', y_col='labels', target_size=img_size, class_mode='categorical',
                                     color_mode='rgb', shuffle=True, batch_size=batch_size)
classes = list(train_gen.class_indices.keys())
class_count = len(classes)
train_steps = int(np.ceil(len(train_gen.labels)/batch_size))

model_name = 'EfficientNet'
base_model = tf.keras.applications.EfficientNetB0(include_top=False, weights="imagenet", input_shape=img_shape, pooling='max')
x = base_model.output
x = BatchNormalization(axis=-1, momentum=0.99, epsilon=0.001)(x)
x = Dense(256, kernel_regularizer=tf.keras.regularizers.l2(l=0.0016), activation='swish')(x)
x = Dropout(rate=.5, seed=123)(x)
x = Dense(128, kernel_regularizer=tf.keras.regularizers.l2(l=0.0016), activation='swish')(x)
x = Dropout(rate=.2, seed=123)(x)
output = Dense(class_count, activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=output)
model.compile(AdamW(learning_rate=.001), loss='categorical_crossentropy', metrics=['accuracy'])

epochs = 50
patience = 1
stop_patience = 3
threshold = .9
factor = .5
dwell = True
freeze = False
ask_epoch = 5
batches = train_steps
callbacks = [LRA(model=model, base_model=base_model, patience=patience, stop_patience=stop_patience, threshold=threshold,
                factor=factor, dwell=dwell, batches=batches, initial_epoch=0, epochs=epochs, ask_epoch=ask_epoch)]

history = model.fit(x=train_gen, epochs=epochs, verbose=0, callbacks=callbacks, validation_data=valid_gen,
                   validation_steps=None, shuffle=False, initial_epoch=0)