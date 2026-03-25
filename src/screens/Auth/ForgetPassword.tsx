import {  Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useLayoutEffect, useState } from "react"
import { ActivityIndicator, Alert, Text, TextInput,  TouchableOpacity, View } from "react-native"
import { useForgetPasswordMutation } from "src/redux/features/auth/authApi"
import { NavigationProp } from "src/types/auth"

const ForgetPassword = () => {

  const navigation = useNavigation<NavigationProp>()
  const [forgetPass] = useForgetPasswordMutation()
  const [email, setEmail] = useState<string>('');
  const [loading,setLoading]=useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212"
      },
      headerTintColor: "#FFFFFF",
      headerTitle: '',
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

  const handleForgetPassword = async () => {
    setLoading(true)
    if (!email) {
      Alert.alert("Put Your E-mail")
      return;
    }
    const forget = {
      data: {
        email: email
      }
    }
    try {
      const res = await forgetPass(forget).unwrap();
      if (res.success === true) {
        const otp=res.data.otp
        const email =res.data.email
        navigation.navigate("OTP Screen",{Otp:otp,Email:email});
      } else {
        Alert.alert(res.message || "Something went wrong");
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || "An unknown error occurred";
      Alert.alert("Error", errorMessage);
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-[#121212] p-3">
      <View className="px-3">
        <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2" >Forget Password</Text>
        <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-instrumentSansSemiBold" >We’ll send a verification code to your mail </Text>

        <View className="bg-[#2C2C2C] mt-3 mb-5 rounded-lg overflow-hidden flex-row items-center p-2">
          <TextInput className="flex-1" placeholder="Enter E-Mail Address" placeholderTextColor={"#ADAEBC"} style={{ color: "white" }} onChangeText={setEmail} />
        </View>
        <TouchableOpacity className="mt-2 mb-3 items-center  rounded-lg overflow-hidden" onPress={handleForgetPassword}>
          <LinearGradient
            colors={["#fff", "#FFF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-lg overflow-hidden "
            style={{ width: "100%", alignItems: "center", padding: 10 }}
          >
            <Text className="text-[#121212] text-xl font-instrumentSansBold" >{loading?<ActivityIndicator size={"small"} color={"blue"}/>:"Send Email"}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForgetPassword