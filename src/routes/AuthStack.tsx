 {/* @ts-nocheck */}
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import OTPScreen from "src/screens/Auth/OTPScreen";
import ForgetPassword from 'src/screens/Auth/ForgetPassword';
import LoginOTPScreen from 'src/screens/Auth/LoginOTPScreen';
import ResetPassword from 'src/screens/Auth/ResetPasswrod';
import VerificationPage from 'src/screens/Auth/SuccessPage';
import OnBoarding from 'src/screens/Auth/OnBoarding';
import LoginScreen from 'src/screens/Auth/LoginScreen';
import SignUpUser from 'src/screens/Auth/SignUpUser';
import SuccessPage from 'src/screens/Auth/SuccessPage';
import SignUpBrand from 'src/screens/Auth/SignUpBrand';

const Stack = createStackNavigator<any>();

const AuthStack = () => {
  return (
    <>
   
    <Stack.Navigator id={undefined}  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen options={{headerShown:true}} name="Login Screen" component={LoginScreen}/>
      <Stack.Screen options={{headerShown:true}} name="Sign Up as User" component={SignUpUser}/>
      <Stack.Screen options={{headerShown:true}} name="Sign Up as Brand" component={SignUpBrand}/>
      <Stack.Screen options={{headerShown:true}}  name="Forget Password" component={ForgetPassword}/>
      <Stack.Screen options={{headerShown:true}}  name="Login OTP" component={LoginOTPScreen}/>
      <Stack.Screen options={{headerShown:true}}  name="Reset Password" component={ResetPassword}/>
      <Stack.Screen options={{ headerShown: true }} name="Success page" component={SuccessPage} />
      <Stack.Screen options={{headerShown:true}} name="OTP Screen" component={OTPScreen} />
      <Stack.Screen options={{headerShown:true}} name="Verification Page" component={VerificationPage}/>
    </Stack.Navigator>
    </>
  );
};

export default AuthStack;
