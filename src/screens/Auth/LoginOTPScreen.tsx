import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const LoginOTPScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation<any>();

  const [otpNumbers, setOtpNumbers] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: any, index: any) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otpNumbers];
      newOtp[index] = text;
      setOtpNumbers(newOtp);

      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };


  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === 'Backspace' && otpNumbers[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    navigation.navigate("Reset Password" as never);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "OTP Verification ",
      headerStyle: {
        backgroundColor: "white",
        elevation: 0, // for Android
        shadowOpacity: 0, // for iOS
        borderBottomWidth: 0, // for iOS
      },
      headerTintColor: "black",
      headerTitleAlign: "center",
      headerLeft: () => (
        <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
          <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
            <Entypo name="chevron-small-left" size={24} color="red" />
          </View>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View className='flex-1 items-center  px-2 bg-white'>
      <Text className='font-robotoBold text-xl mb-2 text-red-700 mt-2'>Verify Your Identity</Text>
      <Text className='text-center text-gray-500'>
        {` 
For your security, verify the code sent to your registered contact. \n Let’s confirm it’s you!`}
      </Text>

      <View className='flex-row gap-5 mt-3 mb-2'>
        {otpNumbers.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            maxLength={1}
            keyboardType='numeric'
            className='border p-1 rounded-lg border-red-600 text-2xl text-red-600 text-center font-bold'
            style={{ width: width * 0.15, height: height * 0.06 }}
          />
        ))}
      </View>

      <View className="items-center mb-2">
        <TouchableOpacity
          className="items-center mt-3 rounded-full overflow-hidden"
          style={{ width: width * 0.9 }}
          onPress={handleVerify}
        >
          <LinearGradient
            colors={["#DD0F14", "#C21A1E"]}
            style={{ width, borderRadius: 999, alignItems: "center" }}
          >
            <Text className="text-white p-3">Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Text className='text-gray-500'>
        Resend Code in <Text className='text-red-800'> 53</Text>s
      </Text>
    </View>
  );
};

export default LoginOTPScreen;
