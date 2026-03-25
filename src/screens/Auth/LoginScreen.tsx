import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setToken, setUserInfo } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi";
import { useAuth } from "src/hooks/useAuth";
import { validateEmail } from 'src/components/shared/verifyEmail';

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
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

        <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput
            className="flex-1"
            placeholder="Enter your email address"
            onChangeText={setEmail}
            placeholderTextColor={"#ADAEBC"}
            style={{ color: "#ADAEBC" }}
          />
        </View>
        <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput
            className="flex-1"
            placeholder="Enter Password"
            onChangeText={setPassword}
            placeholderTextColor={"#ADAEBC"}
            style={{ color: "#ADAEBC" }}
            secureTextEntry={!isVisible}
          />
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            {isVisible ? <Feather name="eye-off" size={24} color="gray" /> : <Feather name="eye" size={24} color="gray" />}
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="mt-1 mb-3 items-center" onPress={() => navigation.navigate("Sign Up as User")}>
          <Text className="text-[#979797] text-xl font-instrumentSansBold">I don’t have an account</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-1 mb-3 items-center bg-[#fff] p-3 rounded-lg " onPress={handleLogin}>
          <Text className="text-[#000] text-xl font-instrumentSansBold">
            {loading ? <ActivityIndicator size={"small"} color={"green"} /> : "login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
