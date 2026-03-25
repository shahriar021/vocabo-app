import React from "react"
import { View, ActivityIndicator, Text } from "react-native"

const Loading = () => (
  <View className="flex-1 items-center justify-center mt-4">
    <ActivityIndicator size="large" color="#ffffff" />
    <Text className="text-white mt-2">Loading...</Text>
  </View>
)

export default Loading
