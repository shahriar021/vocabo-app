import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Platform, Text, useWindowDimensions, View, TouchableOpacity } from "react-native";
import { HomeScreen, Profile } from "src/screens";

const BottomTabs = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, accessibilityState }: any) => {
  const focused = accessibilityState?.selected;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 5,
        borderTopColor: focused ? "#1D3725" : "transparent",
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export const BottomNavigation = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <BottomTabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            borderRadius: 60,
            marginHorizontal: 7,
            marginBottom: Platform.OS === "android" ? 10 : 16,
            paddingBottom: 7,
            height: 72,
            backgroundColor: "#121212",
            overflow: "hidden",
          },
          tabBarLabelStyle: {
            fontSize: width > 450 ? 14 : 10,
            width: "100%",
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#C5BAFF",
          tabBarLabelPosition: "below-icon",
          headerStyle: {
            backgroundColor: "#121212",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: "#5b21b6",
        }}
      >
        <BottomTabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            headerTitle: "Vocabo",
            headerTitleAlign: "left",
            headerTitleStyle: {
              color: "white",
              fontFamily: "instrumentSans-Bold",
              fontSize: 20,
            },
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/home/home-olive.png")}
                  style={{ width: 24, height: 24 }}
                />
                {focused && (
                  <Text style={{ color: "#2ECC71", fontSize: 10 }}>Home</Text>
                )}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />

        <BottomTabs.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerTitle: "Profile",
            headerTitleAlign: "left",
            headerTitleStyle: {
              color: "white",
              fontFamily: "instrumentSans-Bold",
              fontSize: 20,
            },
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/home/profile-olive.png")}
                  style={{ width: 24, height: 24 }}
                />
                {focused && (
                  <Text style={{ color: "#2ECC71", fontSize: 10 }}>Profile</Text>
                )}
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      </BottomTabs.Navigator>
    </View>
  );
};
