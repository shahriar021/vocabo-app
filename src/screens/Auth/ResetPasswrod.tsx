import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute,RouteProp } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TouchableOpacity, useWindowDimensions, TextInput, Alert } from 'react-native'
import { useResetPasswordMutation } from 'src/redux/features/auth/authApi';
import { RootStackParamList } from 'src/types/auth';

const ResetPassword = () => {
    const route = useRoute<RouteProp<RootStackParamList, "Reset Password">>()
    const { atoken } = route.params
    const { width } = useWindowDimensions();
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigation = useNavigation<any>()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Reset Password",
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0, 
                shadowOpacity: 0, 
                borderBottomWidth: 0, 
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    const [resetPassword] = useResetPasswordMutation()

    const [fontsLoaded] = useFonts({
        'Roboto-Bold': require('../../../assets/fonts/Roboto-Bold.ttf'),
    });

    if (!fontsLoaded) return null;


    const handleVerify = async () => {
        const info = {
            data: {
                newPassword: confirmPassword,
            }
        };
        

        if (newPassword === confirmPassword) {
            try {
                const res = await resetPassword({ info, atoken }).unwrap();
                Alert.alert(res.message);
                navigation.navigate("Success page" as never)
            } catch (err: any) {
                Alert.alert("Error", err?.message || "An error occurred.");
            }
        } else {
            Alert.alert("Password Doesn't match");
        }
    };


    return (
        <View className='flex-1 items-center bg-[#121212]'>
            <Text className='text-center mt-2 text-xl text-white font-robotoBold mb-3'>Set Your New Password</Text>
            <Text className='text-center text-white'>
                Create a new password to secure your account.</Text>
            <View className=' ' style={{ width: width * 0.9 }}>
                <Text className='mb-2 mt-3 text-white'>Enter new password</Text>
                <View className=' w-full flex-row border border-gray-500 p-2 rounded-xl'>
                    <TextInput className='flex-1 text-[#fff]' onChangeText={setNewPassword} />
                    <Text><Feather name="eye-off" size={24} color="gray" /></Text>
                </View>
                <Text className='mb-2 mt-3 text-white'>Confirm password</Text>
                <View className=' w-full flex-row border border-gray-500 p-2 rounded-xl'>
                    <TextInput className='flex-1 text-[#fff]' onChangeText={setConfirmPassword} />
                    <Text><Feather name="eye-off" size={24} color="gray" /></Text>
                </View>
            </View>
            <View className="items-center mb-2">
                <TouchableOpacity
                    className="items-center mt-3 rounded-full overflow-hidden"
                    style={{ width: width * 0.9 }}
                    onPress={handleVerify}
                >
                    <LinearGradient
                        colors={["#fff", "#fff"]}
                        style={{ width, borderRadius: 999, alignItems: "center" }}
                    >
                        <Text className="text-black p-3">Update Password</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ResetPassword;