import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import {  Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setToken, setUserInfo } from "src/redux/features/auth/authSlice";
import { useAuth } from "src/hooks/useAuth";
import { validateEmail } from 'src/components/shared/verifyEmail';
import PrimaryButton from "src/components/shared/PrimaryButton";
import InputField from "src/components/shared/InputField";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/types";

type NavigationProp = StackNavigationProp<RootStackParamList>

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

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

  const handleLogin = async () => {
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
    setLoading(true);
    try {
      const user = await login(email, password);
      console.log(user, "user..");
      dispatch(setToken(await user.getIdToken()));
      dispatch(setUserInfo(user));
      Alert.alert("Login successful");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#121212] p-3">
      <View className="px-3 relative">
        <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2">Login to Your Account</Text>
        <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-semibold">
          It is quick and easy to log in. Enter your email and password below.
        </Text>

        <InputField
          placeholder="Enter your email address"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showToggle
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />

        <TouchableOpacity className="mt-1 mb-3 items-center" onPress={() => navigation.navigate("Sign Up as User")}>
          <Text className="text-[#979797] text-xl font-instrumentSansBold">I don’t have an account</Text>
        </TouchableOpacity>

        <PrimaryButton
          title="Login"
          onPress={handleLogin}
          loading={loading}
          className="mt-1 mb-3 bg-white"
          textClass="text-black text-xl"
        />
      </View>
    </View>
  );
};

export default LoginScreen;
