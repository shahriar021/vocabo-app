import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector, useAppDispatch } from 'src/redux/hooks'
import auth from '@react-native-firebase/auth'
import { setToken } from 'src/redux/features/auth/authSlice'
import { FirebaseUserInfo } from 'src/types'

const Profile = () => {
  const userInfo:FirebaseUserInfo | null = useAppSelector((state) => state.auth.userInfo)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitle: "Profile",
      headerTitleAlign: "left",
      headerTitleStyle: {
        color: "white",
        fontFamily: "instrumentSans-Bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await auth().signOut();
            dispatch(setToken(null));
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const displayName = userInfo?.displayName ?? "No Name"
  const email = userInfo?.email ?? ""
  const photoURL = userInfo?.photoURL
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const isEmailVerified = userInfo?.emailVerified ?? false

  return (
    <View className="flex-1 bg-[#121212] px-5 pt-4">

      <View className="items-center mt-4 mb-6">
        {photoURL ? (
          <Image
            source={{ uri: photoURL }}
            className="w-24 h-24 rounded-full mb-3"
          />
        ) : (
          <View className="w-24 h-24 rounded-full bg-[#2A2A2A] items-center justify-center mb-3 border-2 border-[#FF4B4B]">
            <Text className="text-[#FF4B4B] text-3xl font-bold">{initials}</Text>
          </View>
        )}

        <Text className="text-white text-xl font-bold">{displayName}</Text>
        <Text className="text-[#888] text-sm mt-1">{email}</Text>

        <View className={`flex-row items-center gap-1 mt-2 px-3 py-1 rounded-full ${isEmailVerified ? "bg-green-900/40" : "bg-yellow-900/40"}`}>
          <Ionicons
            name={isEmailVerified ? "checkmark-circle" : "alert-circle"}
            size={12}
            color={isEmailVerified ? "#4ade80" : "#facc15"}
          />
          <Text className={`text-xs font-medium ${isEmailVerified ? "text-green-400" : "text-yellow-400"}`}>
            {isEmailVerified ? "Verified" : "Not Verified"}
          </Text>
        </View>
      </View>

      <View className="h-px bg-[#1E1E1E] mb-6" />

      <Text className="text-[#555] text-xs font-semibold uppercase tracking-widest mb-3">Account Info</Text>

      <View className="bg-[#1A1A1A] rounded-2xl overflow-hidden mb-6">

        <View className="flex-row items-center px-4 py-3 border-b border-[#242424]">
          <View className="w-8 h-8 rounded-lg bg-[#242424] items-center justify-center mr-3">
            <Ionicons name="mail-outline" size={16} color="#888" />
          </View>
          <View className="flex-1">
            <Text className="text-[#555] text-xs">Email</Text>
            <Text className="text-white text-sm mt-0.5">{email}</Text>
          </View>
        </View>

        <View className="flex-row items-center px-4 py-3 border-b border-[#242424]">
          <View className="w-8 h-8 rounded-lg bg-[#242424] items-center justify-center mr-3">
            <Ionicons name="call-outline" size={16} color="#888" />
          </View>
          <View className="flex-1">
            <Text className="text-[#555] text-xs">Phone</Text>
            <Text className="text-white text-sm mt-0.5">{userInfo?.phoneNumber ?? "Not provided"}</Text>
          </View>
        </View>

        <View className="flex-row items-center px-4 py-3">
          <View className="w-8 h-8 rounded-lg bg-[#242424] items-center justify-center mr-3">
            <Ionicons name="finger-print-outline" size={16} color="#888" />
          </View>
          <View className="flex-1">
            <Text className="text-[#555] text-xs">Provider</Text>
            <Text className="text-white text-sm mt-0.5 capitalize">{userInfo?.providerId ?? "firebase"}</Text>
          </View>
        </View>

      </View>

      <Text className="text-[#555] text-xs font-semibold uppercase tracking-widest mb-3">Actions</Text>

      <View className="bg-[#1A1A1A] rounded-2xl overflow-hidden">

        <TouchableOpacity
          className="flex-row items-center px-4 py-3"
          onPress={handleLogout}
        >
          <View className="w-8 h-8 rounded-lg bg-red-900/40 items-center justify-center mr-3">
            <Ionicons name="log-out-outline" size={16} color="#f87171" />
          </View>
          <Text className="flex-1 text-red-400 text-sm font-medium">Logout</Text>
          <Ionicons name="chevron-forward" size={16} color="#444" />
        </TouchableOpacity>

      </View>

    </View>
  )
}

export default Profile