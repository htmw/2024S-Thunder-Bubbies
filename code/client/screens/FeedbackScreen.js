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
    // Handle feedback submission logic here
    const feedbackData = {
      displayedName,
      feedback,
    };

    // Simulating feedback submission
    Alert.alert(
      "Feedback Submitted",
      `Detected Name: ${feedbackData.displayedName}\nFeedback: ${feedbackData.feedback}`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Feedback Form</Text>
      <Text style={styles.detectedNameText}>
        Detected Name: {displayedName}
      </Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  detectedNameText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    height: 120,
  },
  submitButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
