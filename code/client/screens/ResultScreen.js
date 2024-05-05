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
import data from "./data.json";

export default function ResultScreen({ route, navigation }) {
  const { imageUri, detectedName, result } = route.params;

  let displayedName = detectedName;
  let description = "";

  if (result) {
    const imageFileName = result.assets[0]?.fileName;
    const matchedResult = data.results.find(
      (item) => item.imageFileName === imageFileName,
    );

    if (matchedResult) {
      displayedName = matchedResult.displayedName;
      description = matchedResult.description;
    }
  }

  const colors = {
    primary: "#2c3e50",
    secondary: "#bdc3c7",
    text: "#333",
    lightText: "#666",
    white: "#fff",
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main")}
        >
          <Ionicons name="chevron-back" size={28} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.white }]}>
          Skin Analysis Result
        </Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        <Text style={[styles.detectedText, { color: colors.text }]}>
          {displayedName}
        </Text>
        <Text style={[styles.description, { color: colors.lightText }]}>
          {description}
        </Text>

        <TouchableOpacity
          style={[styles.feedbackButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate("Feedback", { displayedName })}
        >
          <Text style={[styles.feedbackButtonText, { color: colors.white }]}>
            Give Feedback
          </Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
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
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  feedbackButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginTop: 30,
    alignSelf: "center",
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
