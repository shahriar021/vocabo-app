import { AntDesign, Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import React, { useLayoutEffect, useState } from "react"
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useDispatch } from "react-redux"
import { setToken, setUserType,setId } from "src/redux/features/auth/authSlice";
import { useLoginMutation } from "src/redux/features/auth/authApi"
import { useAuth } from "src/hooks/useAuth"

const LoginScreen = () => {
  const { login } = useAuth();
    const navigation = useNavigation()
    const [isType, setIsType] = useState<boolean>(false);
    const [userTypes, setUserTypes] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading,setLoading]=useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [loginData] = useLoginMutation()
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212"
            },
            headerTintColor: "#FFFFFF",
            headerTitle: () => null,
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

    const validateEmail = (email: any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async () => {
        setLoading(true)
        if (!userTypes) {
            Alert.alert("Error", "Please select a user type");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Error", "Please enter a valid email address");
            return;
        }

        if (!password.trim()) {
            Alert.alert("Error", "Please enter your password");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return;
        }
        const ldata = {
            data: {
                email: email,
                password: password
            }
        }
        try {
            const res = await loginData(ldata).unwrap(); 
            if(userTypes===res?.data?.role){
                dispatch(setToken(res.data.accessToken));
                dispatch(setUserType(userTypes));
                if(res?.data?.id){
                    dispatch(setId(res.data.id))
                }
                setLoading(false)
                Alert.alert(res.message)
            }else{
                Alert.alert("There is a mismatch in user types,Please select your type carefully!")
            }
        } catch (err: any) {
            setLoading(false)
            const errorMessage = err?.data?.message || err?.message || "Something went wrong!";
            Alert.alert("Error", errorMessage);
        }
    };

    return (
      <View className="flex-1 bg-[#121212] p-3">
        <View className="px-3 relative">
          <Text className="text-[#FFFFFF] text-2xl font-instrumentSansBold mb-2">Login to Your Account</Text>
          <Text className="mt-1 mb-2 text-[#FFFFFF] text-lg font-semibold">
            It is quick and easy to log in. Enter your email and password below.
          </Text>

          <View className=" bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
            <View className="flex-1"  >
              <Text style={{ color: "#ADAEBC" }}>{userTypes ? userTypes : "Select Types"}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsType(true)}>
              <AntDesign name="downcircle" size={24} color="#626870" />
            </TouchableOpacity>
          </View>

          {isType && (
            <View className="absolute bg-[#121212] top-44 z-10 right-3 rounded-lg p-2 gap-2 border border-white">
              <TouchableOpacity
                className="bg-[#2C2C2C] p-2 rounded-lg"
                onPress={() => {
                  setUserTypes("User");
                  setIsType(false);
                }}
              >
                <Text className="font-instrumentRegular text-white">User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#2C2C2C] p-2 rounded-lg"
                onPress={() => {
                  setUserTypes("Brand");
                  setIsType(false);
                }}
              >
                <Text className="font-instrumentRegular text-white">Service Provider</Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
            <TextInput
              className="flex-1"
              placeholder="Enter your email address"
              onChangeText={setEmail}
              placeholderTextColor={"#ADAEBC"}
              style={{ color: "#ADAEBC" }}
            />
          </View>
          <View className="bg-[#2C2C2C] mt-3 mb-2 rounded-lg overflow-hidden flex-row items-center p-2">
            <TextInput
              className="flex-1"
              placeholder="Enter Password"
              onChangeText={setPassword}
              placeholderTextColor={"#ADAEBC"}
              style={{ color: "#ADAEBC" }}
              secureTextEntry={!isVisible}
            />
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              {isVisible ? <Feather name="eye-off" size={24} color="gray" /> : <Feather name="eye" size={24} color="gray" />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="mt-1 mb-3" onPress={() => navigation.navigate("Forget Password" as never)}>
            <Text className="text-[#1E80DD] font-instrumentSansBold">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-1 mb-3 items-center" onPress={() => navigation.navigate("Sign Up as User")}>
            <Text className="text-[#979797] text-xl font-instrumentSansBold">I don’t have an account</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-1 mb-3 items-center bg-[#fff] p-3 rounded-lg " onPress={handleLogin}>
            <Text className="text-[#000] text-xl font-instrumentSansBold">
              {loading ? <ActivityIndicator size={"small"} color={"green"} /> : "login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default LoginScreen