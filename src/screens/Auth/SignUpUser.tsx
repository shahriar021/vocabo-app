import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "src/hooks/useAuth";

const SignUpUser = () => {
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUpUser = async () => {
    if (!email || !password) {
      Alert.alert("Please fill up all fields!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password);
      Alert.alert("User registered successfully");
      navigation.navigate("OnBoarding" as never);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#121212", padding: 20 }}>
      <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        style={{ backgroundColor: "#2C2C2C", color: "white", marginBottom: 10, padding: 12, borderRadius: 8 }}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={{ backgroundColor: "#2C2C2C", color: "white", marginBottom: 10, padding: 12, borderRadius: 8 }}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={{ backgroundColor: "#2C2C2C", color: "white", marginBottom: 20, padding: 12, borderRadius: 8 }}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={handleSignUpUser} style={{ backgroundColor: "white", padding: 14, borderRadius: 8, alignItems: "center" }}>
        <Text style={{ color: "#121212", fontSize: 18, fontWeight: "bold" }}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpUser;
