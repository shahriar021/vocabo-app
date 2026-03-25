 {/* @ts-nocheck */}
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import OnBoarding from 'src/screens/Auth/OnBoarding';
import LoginScreen from 'src/screens/Auth/LoginScreen';
import SignUpUser from 'src/screens/Auth/SignUpUser';

const Stack = createStackNavigator<any>();

const AuthStack = () => {
  return (
    <>
   
    <Stack.Navigator id={undefined}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen options={{headerShown:true}} name="Login Screen" component={LoginScreen}/>
      <Stack.Screen options={{headerShown:true}} name="Sign Up as User" component={SignUpUser}/>
    </Stack.Navigator>
    </>
  );
};

export default AuthStack;
