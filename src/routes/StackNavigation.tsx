import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation } from "./BottomNavigation";
import { PostDetails } from 'src/screens';
import { RootStackParamList } from "src/types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigation = () => {

  return (
    <>
      {/* @ts-ignore */}
      <Stack.Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: "#121212",
          },
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            fontFamily: "HelveticaNeue-Black",
          },
          headerTintColor: "#006400",
        }}
      >
        <Stack.Screen
          name="BottomScreen"
          component={BottomNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Post Details"
          component={PostDetails}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
