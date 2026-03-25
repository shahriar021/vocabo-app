import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

const OnBoarding = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (

    <SafeAreaView className="flex-1 bg-[#121212] ">
      <ImageBackground
        source={require("../../../assets/e-icon/ON.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <View className="flex-1 items-center justify-end px-4 mb-5 p-3 ">
          <View className="w-full">
            <View style={{ width: scale(250), height: verticalScale(50) }} >
              <Image source={require("../../../assets/e-icon/ark.png")} style={{ width: "100%", height: "100%" }} />
            </View>
          </View>
          <View className=" w-full items-start mt-5">
            <Text className="text-[#fff] font-instrumentSansBold text-5xl  ">One Platform, A Thousand Brands!</Text>
          </View>


          <TouchableOpacity className="mt-20 mb-2 border border-[#FFFFFF] w-full items-center p-3 rounded-lg" onPress={() => navigation.navigate("Login Screen")}>
            <Text className="text-white text-lg font-instrumentSansBold">Log In</Text>
          </TouchableOpacity>

          

          <TouchableOpacity className="mt-2 mb-2 border border-[#FFFFFF] w-full items-center p-3 rounded-lg" onPress={() => navigation.navigate("Sign Up as User")}>
            <Text className="text-white font-instrumentSansBold">Sign Up as User</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>


  );
};

export default OnBoarding;
