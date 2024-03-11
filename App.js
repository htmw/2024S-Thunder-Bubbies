import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import TermsAndConditionsScreen from "./screens/TermsAndConditionsScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditionsScreen}
          options={{ title: "Terms and Conditions" }}
        />
        {/* Add more screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
