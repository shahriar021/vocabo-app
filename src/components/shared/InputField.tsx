import { View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

type InputFieldProps = {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: string
  showToggle?: boolean
  isVisible?: boolean
  setIsVisible?: (visible: boolean) => void
  className?: string
  textClass?: string
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  showToggle = false,
  isVisible = false,
  setIsVisible,
  className = '',
  textClass = '',
}) => {
  return (
    <View className={`bg-[#2C2C2C] rounded-lg flex-row items-center p-3 mb-3 ${className}`}>
      <TextInput
        className={`flex-1 text-white ${textClass}`}
        placeholder={placeholder}
        placeholderTextColor="#ADAEBC"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isVisible}
        keyboardType={keyboardType as any}
      />
      {showToggle && setIsVisible && (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <Feather name="eye-off" size={22} color="gray" />
          ) : (
            <Feather name="eye" size={22} color="gray" />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default InputField
