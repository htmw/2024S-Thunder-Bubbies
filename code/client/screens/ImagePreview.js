import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function ImagePreview({ route, navigation }) {
  const { imageUri, result } = route.params;

  useEffect(() => {
    const simulateLoading = setTimeout(() => {
      const detectedName = "Skin Condition Name"; // Replace with your actual detection logic
      navigation.navigate("ResultScreen", { imageUri, detectedName, result }); // Pass the result object
    }, 5000);

    return () => clearTimeout(simulateLoading);
  }, [navigation, imageUri, result]); // Add result to the dependency array

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.loadingText}>Diagonising please wait...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  loadingText: {
    fontSize: 18,
    marginTop: 20,
  },
});
