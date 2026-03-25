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
import { useGetProfileQuery } from "src/redux/features/profile/profile/profileApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { usePostNotificationRegisterMutation } from "src/redux/features/notification/notificationApi";

const MainLayout = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const { data: getProfile, isSuccess } = useGetProfileQuery(token)
  const [postNotiRegis] = usePostNotificationRegisterMutation()

  const [fontsLoaded] = useFonts({
    'prosto-One': require("../../../assets/fonts/ProstoOne-Regular.ttf"),
    'playFairDisplay': require("../../../assets/fonts/PlayfairDisplay-Bold.ttf"),
    'podKova-bold': require("../../../assets/fonts/Podkova-Bold.ttf"),
    'opansans': require("../../../assets/fonts/OpenSans-Regular.ttf"),
    'poppins': require("../../../assets/fonts/Poppins-Bold.ttf"),
    'HelveticaNeue-Black': require("../../../assets/fonts/HelveticaNeueBlack.otf"),

    'instrumentSans-Bold': require("../../../assets/fonts/InstrumentSans-Bold.ttf"),
    'instrumentSans-Regular': require("../../../assets/fonts/InstrumentSans-Regular.ttf"),
    'instrumentSans-SemiBold': require("../../../assets/fonts/InstrumentSans-SemiBold.ttf"),
  });

  // useEffect(() => {
  //   const getAndSendFCMToken = async () => {
  //     try {
  //       await messaging().requestPermission();

  //       const fcToken = await messaging().getToken();
  //       const payload = {
  //         data: {
  //           token: fcToken,
  //           device: 'android'
  //         }
  //       };

  //       try {

  //         const res = await postNotiRegis({ token, body: payload }).unwrap();

  //       } catch (err) {

  //       }
  //     } catch (error) {

  //     }
  //   };

  //   getAndSendFCMToken();


  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {

  //     await Notifications.setNotificationHandler({
  //       handleNotification: async () => ({
  //         shouldShowAlert: true,
  //         shouldPlaySound: true,
  //         shouldSetBadge: false,
  //       }),
  //     });

  //     // Trigger the notification immediately
  //     await Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: remoteMessage.notification.title,
  //         body: remoteMessage.notification.body,
  //       },
  //       trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,seconds: 1 },
  //     });
  //   });


  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {

  //   });


  //   Notifications.addNotificationReceivedListener((notification) => {

  //   });

  //   Notifications.addNotificationResponseReceivedListener((response) => {

  //   });

  //   return unsubscribe;
  // }, []);


  useEffect(() => {
    if (isSuccess && getProfile) {
      const saveProfile = async () => {
        try {
          const jsonValue = JSON.stringify(getProfile);
          await AsyncStorage.setItem('user_profile', jsonValue);
          setIsSplashVisible(false);
        } catch (e) {
          console.error("Failed to save profile to AsyncStorage", e);
        }
      };

      saveProfile();
    }

  }, [getProfile, isSuccess]);



  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const isAppReady = fontsLoaded && !isSplashVisible;

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
