import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OfflineBanner = () => (
  <SafeAreaView style={{ backgroundColor: "#ff4444", padding: 8, }}>
    <Text style={{ color: "white", textAlign: "center" }}>
      You’re offline 
    </Text>
  </SafeAreaView>
);

export default OfflineBanner;
