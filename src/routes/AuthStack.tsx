import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { OnBoarding, LoginScreen, SignUpUser,  } from 'src/screens';
import { RootStackParamList } from 'src/types';


const AuthStackSc = createStackNavigator<RootStackParamList>()

const AuthStack = () => {
  return (
    <>
    <AuthStackSc.Navigator id={undefined}  screenOptions={{ headerShown: false }}>
      <AuthStackSc.Screen name="OnBoarding" component={OnBoarding} />
      <AuthStackSc.Screen options={{headerShown:true}} name="Login Screen" component={LoginScreen}/>
      <AuthStackSc.Screen options={{headerShown:true}} name="Sign Up as User" component={SignUpUser}/>
    </AuthStackSc.Navigator>
    </>
  );
};

export default AuthStack;
