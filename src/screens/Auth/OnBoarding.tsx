import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useLayoutEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { useAppDispatch } from "src/redux/hooks";
import { setToken } from "src/redux/features/auth/authSlice";

const OnBoarding = () => {
  const navigation = useNavigation()
  const [googleLoading, setGoogleLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize inside the component

    GoogleSignin.configure({
      webClientId: '467343947871-khtlvmtl9v2o8fhhebf8u845qd1t2cg5.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  const onGoogleButtonPress = async () => {
  setGoogleLoading(true);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    // New versions nest it under data.idToken
    const idToken = userInfo.data?.idToken ?? userInfo.idToken;
    
    if (!idToken) {
      throw new Error('No idToken returned from Google Sign-In');
    }

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await auth().signInWithCredential(googleCredential);
    
    const token = await userCredential.user.getIdToken();
    dispatch(setToken(token));
    Alert.alert("Success", "Logged in with Google!");
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("Cancelled", "Login was cancelled");
    } else {
      Alert.alert("Google Error", error.message);
    }
  } finally {
    setGoogleLoading(false);
  }
};

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
          <TouchableOpacity
            style={styles.googleButton}
            onPress={onGoogleButtonPress}
            disabled={googleLoading}
            className="flex-row items-center justify-center bg-white rounded-lg"
          >
            {googleLoading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <>
                {/* <Image
                  source={require('../../../assets/e-icon/google-icon.png')} // add a google icon asset
                  style={{ width: 20, height: 20, marginRight: 10 }}
                /> */}
                <Text style={{ color: '#000', fontWeight: '600', fontSize: 16 }}>
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  googleButton: {
  width: 300,
  height: 55,
  marginTop: 20,
  alignSelf: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderRadius: 8,
},
});

export default OnBoarding;
