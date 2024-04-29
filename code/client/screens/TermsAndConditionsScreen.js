import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This application is a capstone project developed by students of CS691 at
        Pace University.
      </Text>
      <Text style={styles.text}>
        By accessing and using this application, you agree to abide by the terms
        and conditions outlined below.
      </Text>
      <Text style={styles.text}>
        - The content provided in this application is for educational purposes
        only.
      </Text>
      <Text style={styles.text}>
        - The developers and Pace University hold no responsibility for the
        accuracy or reliability of the information provided.
      </Text>
      <Text style={styles.text}>
        - Unauthorized use or reproduction of the content within this
        application is prohibited.
      </Text>
      <Text style={styles.text}>
        Thank you for using our application and supporting our capstone project.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
