import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FeedbackScreen({ route, navigation }) {
  const { displayedName } = route.params;
  const [feedback, setFeedback] = useState("");

  const handleFeedbackSubmit = () => {
    const feedbackData = {
      displayedName,
      feedback,
    };

    Alert.alert(
      "Feedback Submitted",
      `Detected Name: ${feedbackData.displayedName}\nFeedback: ${feedbackData.feedback}`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>
      <View style={styles.detectedNameContainer}>
        <Text style={styles.detectedNameLabel}>Detected Name:</Text>
        <Text style={styles.detectedNameText}>{displayedName}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleFeedbackSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  detectedNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  detectedNameLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333",
  },
  detectedNameText: {
    fontSize: 18,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 30,
    textAlignVertical: "top",
    height: 150,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
