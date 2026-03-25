import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { RootStackParamList } from 'src/types/auth';

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Success page">;
};

const SuccessPage = ({navigation}:Props) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212"
      },
      headerTintColor: "#FFFFFF",
      headerTitle: '',
      headerBackTitleStyle: '',
      headerBackTitle: '',
      headerLeft: () => (
        <TouchableOpacity className='flex-row gap-2 items-center' onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={24} color="white" />
          <View className='flex-col'>
            <Text className='font-instrumentSansBold text-white text-xl'>ARKIVE</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const circleSize = scale(82)

  return (
    <View className="flex-1 bg-[#121212]  items-center">
      <View className="px-3 py-3 items-center  w-full">

        <View className='bg-[#1A5EED] relative items-center justify-center rounded-full ' style={{ width: scale(82), height: scale(82) }}>
          <Feather name="key" size={circleSize * .5} color="white" />
          <View className='absolute bg-[#18E79D] rounded-full  right-0 bottom-0 z-10'><AntDesign name="check" size={24} color="white" /></View>
        </View>

        <View className='items-center'>
          <Text className='text-[#fff] font-instrumentSansBold text-2xl mt-2 mb-2'>SUCCESS</Text>
        </View>

        <View className='items-center'>
          <Text className='text-[#fff] font-instrumentSansBold text-xl mt-2 mb-2 text-center'>Your password has been successfully reset</Text>
        </View>
        <TouchableOpacity className="mt-2 mb-3 p-3 w-full items-center bg-[#04060F14] rounded-lg overflow-hidden border border-[#DCF3FF]" onPress={() => navigation.navigate("Login Screen" as never)}>
          <Text className="text-[#979797] text-xl font-instrumentSansBold" >Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessPage;




