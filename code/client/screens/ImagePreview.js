import React, { useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function ImagePreview({ route, navigation }) {
  const { imageUri, result } = route.params;

  useEffect(() => {
    const simulateLoading = setTimeout(() => {
      const detectedName = "Skin Condition Name";
      navigation.navigate("ResultScreen", { imageUri, detectedName, result });
    }, 5000);

    return () => clearTimeout(simulateLoading);
  }, [navigation, imageUri, result]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  loadingContainer: {
    alignItems: "center",
  },
});
