import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthRequest } from "expo-auth-session/providers/google";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./LoginScreen.styles";

export default function LoginScreen() {
  const [request, response, promptAsync] = useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });
  const navigation = useNavigation();

  const handleTermsAndConditionsPress = () => {
    // Navigate to the TermsAndConditionsScreen
    navigation.navigate("TermsAndConditions");
  };

  const handleGoogleLogin = async () => {
    const result = await promptAsync();
    if (result.type === "success") {
      // Handle successful login
      console.log("Logged in with Google!");
    }
  };

  return (
    <LinearGradient
      colors={["#fff", "#49A09D"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>DermAI</Text>
        <Text style={styles.subtitle}>Detect Early, Heal Swiftly.</Text>
      </View>

      <Image style={styles.icon} source={require("../assets/skin-type.png")} />

      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.disclaimerContainer}
          onPress={handleTermsAndConditionsPress}
        >
          <Text style={styles.disclaimer}>
            By tapping Login you agree to our{"\n"}
            terms and conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
          <Image
            style={styles.googleIcon}
            source={require("../assets/google-icon.png")}
          />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
