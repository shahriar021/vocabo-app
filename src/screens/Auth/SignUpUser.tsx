import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { LinearGradient } from "expo-linear-gradient"
import React, { useLayoutEffect, useState } from "react"
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useSignUpUserMutation } from "src/redux/features/auth/authApi"
import { CountryPicker } from "react-native-country-codes-picker";

const SignUpUser = () => {
    const [postBody] = useSignUpUserMutation()

    const navigation = useNavigation<any>()

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [countryCode, setCountryCode] = useState('+93');
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
            },
            headerTintColor: "#FFFFFF",
            headerTitle: '', 
            headerBackTitleVisible: false, 
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

    const handleSignUpUser = async () => {
        if (!email || !password || !firstName || !lastName || !phoneNumber) {
            Alert.alert("Please fill up the fields!")
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password doesn't match")
            return;
        }
        const userData = {
            email: email,
            password: password,
            confirmedPassword: confirmPassword,
            role: "User",
            firstName: firstName,
            lastName: lastName,
            mobile: phoneNumber,
            countryCode: countryCode,
        };


        const formData = new FormData();

        formData.append("data", JSON.stringify(userData));

        try {
            const res = await postBody(formData).unwrap();
            Alert.alert(res.message);
            if (res.message === "User registered successfully") {
                navigation.navigate("OnBoarding" as never)
            }
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "An unknown error occurred";
            Alert.alert("Error", errorMessage);
        }

    };

    return (
        <ScrollView className="flex-1 bg-[#121212] p-3" contentContainerStyle={{ paddingBottom: 150 }}>
            <View className="px-3">
                <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2">Create Your Account</Text>
                <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-instrumentSansSemiBold" >It is quick and easy to create you account</Text>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" style={{ color: "#ADAEBC" }} placeholder="Enter First Name" placeholderTextColor={"#ADAEBC"} onChangeText={setFirstName} />
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" style={{ color: "#ADAEBC" }} placeholder="Enter Last Name" placeholderTextColor={"#ADAEBC"} onChangeText={setLastName} />
                </View>
                <View className="bg-[#2C2C2C] rounded-lg mt-2" style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 8, marginBottom: 5 }}>

                    <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={{
                            width: '20%',
                            height: 60,
                            backgroundColor: 'black',
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 20
                        }}>
                            {countryCode}
                        </Text>
                    </TouchableOpacity>
                    <CountryPicker
                        show={show}
                        lang="en"
                        pickerButtonOnPress={(item) => {
                            setCountryCode(item.dial_code);
                            setShow(false);
                        }}
                    />

                    <TextInput
                        placeholder="Phone number"
                        placeholderTextColor="#aaa"
                        keyboardType="phone-pad"
                        style={{ flex: 1, fontSize: 16, color: 'white' }}
                        onChangeText={setPhoneNumber}
                    />
                </View>
                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1" style={{ color: "#ADAEBC" }} placeholder="Enter Your E-Mail Address" placeholderTextColor={"#ADAEBC"} onChangeText={setEmail} />
                </View>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1 text-[#ADAEBC]" style={{ color: "#ADAEBC" }} placeholder="Enter Your Password" placeholderTextColor={"#ADAEBC"} secureTextEntry={isShowPassword} onChangeText={setPassword} />
                    <TouchableOpacity className="flex-row items-center" onPress={() => setIsShowPassword(!isShowPassword)}>
                        {isShowPassword ? <Feather name="eye" size={24} color="gray" />
                            : <Feather name="eye-off" size={24} color="gray" />}
                    </TouchableOpacity>
                </View>

                <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
                    <TextInput className="flex-1 text-[#ADAEBC]" placeholder="Confirmed Password" placeholderTextColor={"#ADAEBC"} secureTextEntry={isShowPassword} style={{ color: "#ADAEBC" }} onChangeText={setConfirmPassword} />
                    <TouchableOpacity className="flex-row items-center" onPress={() => setIsShowPassword(!isShowPassword)}>
                        {isShowPassword ? <Feather name="eye" size={24} color="gray" />
                            : <Feather name="eye-off" size={24} color="gray" />}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity className="mt-1 mb-3 items-center bg-[#4A4A4A] rounded-lg overflow-hidden" onPress={handleSignUpUser}>
                    <LinearGradient
                        colors={["#fff", "#fff"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="w-full rounded-lg  overflow-hidden"
                        style={{ width: "100%", alignItems: "center", padding: 10 }}
                    >
                        <Text className="text-[#121212] text-xl font-instrumentSansBold" >Create Account</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SignUpUser