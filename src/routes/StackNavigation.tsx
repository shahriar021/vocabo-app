import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomNavigation } from "./BottomNavigation";


import { ActivityIndicator } from "react-native";
import { useAppSelector } from "src/redux/hooks";


const Stack = createStackNavigator();

const StackNavigation = () => {
  const userType = useAppSelector((store)=>store?.auth?.userType)
  


  if(!userType){
    return <ActivityIndicator size="large"/>
  }

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
        {
          <Stack.Screen
            name="BottomScreen"
            component={BottomNavigation}
            options={{
              headerShown: false,
            }}
          />
        }
       
        
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;
