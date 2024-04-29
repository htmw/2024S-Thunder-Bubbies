from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from keras.models import load_model
from keras.preprocessing import image

app = Flask(_name_)
CORS(app)

model = load_model('skin_disease_model_efficientnet.h5')
class_labels = ['Melanoma', 'Melanocytic Nevi', 'Basal Cell Carcinoma', 'Actinic Keratosis']

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img = image.load_img(file, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions[0])
    predicted_class_label = class_labels[predicted_class_index]
    response = {
        'class_index': int(predicted_class_index),
        'class_label': predicted_class_label
    }
    return jsonify(response)

if _name_ == '_main_':
    app.run()
