import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function MainScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleUploadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("Image Picker Result:", result); // Log the entire result object

    if (!result.cancelled) {
      const selectedAsset = result.assets[0];
      if (selectedAsset) {
        const imageUri = selectedAsset.uri;
        setImageUri(imageUri);
        setResult(result); // Set the result object in the state
        console.log("Selected Image URI:", imageUri); // Log the selected image URI
        navigation.navigate("ImagePreview", { imageUri, result }); // Pass the result object
      } else {
        console.log("No image asset found"); // Log a message if no asset is found
      }
    }
  };

  const handleTakePhoto = () => {
    console.log("Take photo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Derm AI</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.profileIcon}
        >
          <FontAwesome name="user-circle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subtitle}>Next-gen Skin Diagnosis Application</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleUploadPhoto}
          >
            <FontAwesome name="upload" size={32} color="#3498db" />
            <Text style={styles.iconText}>Upload Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleTakePhoto}>
            <FontAwesome name="camera" size={32} color="#3498db" />
            <Text style={styles.iconText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#d3d3d3",
  },
  iconButton: {
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
    marginTop: 10,
    color: "#3498db",
  },
  profileIcon: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
  },
});
