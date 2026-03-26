import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const PrimaryButton = ({
 title,
  onPress,
  className = '',
  textClass = '',
  icon = null,
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row gap-3 items-center justify-center w-full p-3 rounded-lg ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#2F6B3F" />
      ) : (
        <>
        {icon && <>{icon}</>}
        <Text className={` text-lg font-bold ${textClass}`}>
          {title}
        </Text>
        </>
      )}
    </TouchableOpacity>
  )
}

export default PrimaryButton
