import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "src/hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { validateEmail } from "src/components/shared/verifyEmail";
import { setToken } from "src/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

const SignUpUser = () => {
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
      },
      headerTintColor: "#FFFFFF",
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity className="flex-row gap-2 items-center" onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
          <View className="flex-col">
            <Text className="font-instrumentSansBold text-white text-xl">Vocabo</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSignUpUser = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    setLoading(true)
    try {
      const userCredential = await signUp(email, password);
      const token = await userCredential.getIdToken();
      dispatch(setToken(token));
      Alert.alert("User registered successfully");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false)
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
        <Text style={{ color: "#121212", fontSize: 18, fontWeight: "bold" }}>{loading ? <ActivityIndicator color={"black"} size={"small"} /> : "Create Account"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUpUser;
