import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "src/hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { validateEmail } from "src/components/shared/verifyEmail";
import { setToken } from "src/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";

const SignUpUser = () => {
  const navigation = useNavigation<any>();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

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

      <InputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <InputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
          showToggle
          isVisible={isVisible}
          setIsVisible={setIsVisible}
      />

      <InputField
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
          showToggle
          isVisible={isVisible}
          setIsVisible={setIsVisible}
      />

      <PrimaryButton
        title="Create Account"
        onPress={handleSignUpUser}
        loading={loading}
        className="bg-white mt-2 mb-3"
        textClass="text-[#121212] text-xl"

      />
    </ScrollView>
  );
};

export default SignUpUser;
