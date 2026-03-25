import "./global.css";
import "./gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "./src/components/layout/MainLayout";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native"
import { ActivityIndicator, View } from "react-native";


export default function App() {

  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    setPublishableKey(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <StripeProvider publishableKey={publishableKey} urlScheme="com.sta.ark">
          <Provider store={store}>
            <PersistGate loading={
              <View style={{ flex: 1, backgroundColor: "#121212", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="white" />
              </View>
            }
              persistor={persistor}>
              <MainLayout />
            </PersistGate>
          </Provider>
        </StripeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
