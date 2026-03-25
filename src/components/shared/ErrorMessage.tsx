import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

interface Props {
  message?: string
  onRetry?: () => void
}

const ErrorMessage: React.FC<Props> = ({ message = "Something went wrong", onRetry }) => (
  <View className="items-center justify-center mt-4">
    <Text className="text-red-500 text-center mb-3">{message}</Text>
    {onRetry && (
      <TouchableOpacity
        onPress={onRetry}
        className="bg-red-600 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-semibold">Retry</Text>
      </TouchableOpacity>
    )}
  </View>
)

export default ErrorMessage
