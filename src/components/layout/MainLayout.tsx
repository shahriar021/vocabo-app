import { View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import StackNavigation from "src/routes/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "src/routes/AuthStack";
import { useAppSelector } from "src/redux/hooks";
import SplashScreen from "../ui/splashScreen/SplashScreen";
import ToastManager from 'toastify-react-native';
import { NetworkContext } from "../context/NetworkContext";
import OfflineBanner from "../shared/OfflineBanner";

const MainLayout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
   const { isConnected } = useContext(NetworkContext);

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
          {!isConnected && <OfflineBanner />}
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
