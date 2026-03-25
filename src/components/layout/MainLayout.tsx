import { View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "src/routes/AuthStack";
import { useFonts } from "expo-font";
import { useAppSelector } from "src/redux/hooks";
import SplashScreen from "../ui/splashScreen/SplashScreen";
import ToastManager from 'toastify-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';

const MainLayout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [isSplashVisible, setIsSplashVisible] = useState(true);


  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const isAppReady = !isSplashVisible;

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <>
      <ToastManager position={'bottom'} duration={1000}
      />
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <StatusBar style="light" />
          {token ? (
            <StackNavigation />
          ) : (
            <AuthStack />
          )}
        </View>
      </NavigationContainer>
    </>
  );
};

export default MainLayout;
