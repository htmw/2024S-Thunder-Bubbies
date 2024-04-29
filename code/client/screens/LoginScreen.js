import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./LoginScreen.styles";

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleTermsAndConditionsPress = () => {
    navigation.navigate("TermsAndConditions");
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
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
            By tapping Sign In or Sign Up you agree to our{"\n"}
            terms and conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
