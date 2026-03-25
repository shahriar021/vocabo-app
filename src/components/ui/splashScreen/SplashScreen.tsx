import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  ImageBackground,
  Image,
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
        source={require("../../../../assets/e-icon/splashBack.jpeg")}
        style={styles.fullImage}
        resizeMode="cover"
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <Image source={require("../../../../assets/e-icon/ark.png")} style={{width:scale(200),height:verticalScale(200)}} resizeMode="contain"/>
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
