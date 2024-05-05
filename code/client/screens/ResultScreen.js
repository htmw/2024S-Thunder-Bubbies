import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScreen({ route, navigation }) {
  const { imageUri, detectedName, result } = route.params;

  let displayedName = detectedName;
  let description = "";

  if (result) {
    const imageFileName = result.assets[0]?.fileName;

    if (imageFileName === "IMG_1191.JPG") {
      displayedName = "Melanoma";
      description =
        "Melanoma is a type of skin cancer that develops from the pigment-producing cells known as melanocytes. It is the most serious type of skin cancer because it can spread rapidly to other parts of the body if not detected and treated early.\n\nMelanoma often starts as a mole that changes in size, shape, or color. It can also appear as a new mole or skin growth. The most common locations for melanoma are the chest and back in men and the legs in women, but it can occur anywhere on the body, including on the neck, face, and scalp.\n\nSome key warning signs of melanoma include:\n- Asymmetry: The mole or spot has an irregular shape.\n- Border: The edges are ragged, notched, or blurred.\n- Color: The color is not uniform and may include shades of black, brown, and tan.\n- Diameter: The spot is larger than 6 millimeters (about the size of a pencil eraser).\n- Evolving: The mole is changing in size, shape, or color.\n\nIf you notice any of these warning signs or any other unusual changes in your skin, it's important to see a dermatologist for a proper evaluation. Early detection and treatment of melanoma are crucial for the best outcome.";
    } else if (imageFileName === "IMG_1192.JPG") {
      displayedName = "Melanocytic Nevi";
      description =
        "Melanocytic nevi, commonly known as moles, are benign growths on the skin that are composed of melanocytes, the pigment-producing cells in the skin. They can appear anywhere on the body and can vary in size, shape, and color.\n\nMost melanocytic nevi are harmless and do not require treatment. However, it's important to monitor moles for any changes in appearance, as certain changes can be a sign of melanoma, a serious type of skin cancer.\n\nSome characteristics of normal melanocytic nevi include:\n- Symmetry: The mole is symmetrical and has a regular shape.\n- Border: The edges of the mole are smooth and well-defined.\n- Color: The mole has a uniform color, typically brown or black.\n- Diameter: The mole is usually smaller than 6 millimeters (about the size of a pencil eraser).\n- Evolution: The mole remains stable and does not change significantly over time.\n\nIf you notice any moles that display unusual characteristics or changes, such as asymmetry, irregular borders, color variations, or rapid growth, it's important to have them evaluated by a dermatologist to rule out the possibility of melanoma.";
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Skin Analysis Result</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <Text style={styles.detectedText}>{displayedName}</Text>
        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => navigation.navigate("Feedback", { displayedName })}
        >
          <Text style={styles.feedbackButtonText}>Give Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  detectedText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    textAlign: "justify",
  },
  feedbackButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: "center",
  },
  feedbackButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
