import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  ImageBackground,
  Image,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/home/splashBack.jpeg")}
        style={styles.fullImage}
        resizeMode="cover"
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <View className="w-full mb-6 bg-white/90 rounded-2xl px-4 py-3 items-start">
            <View style={{ width: scale(200), height: verticalScale(40) }}>
              <Image
                source={require("../../../../assets/home/voc.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullImage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    alignItems: "center",
    justifyContent: "center",
  },
});
