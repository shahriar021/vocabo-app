import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useGetNotificationQuery } from 'src/redux/features/notification/notificationApi'
import { useAppSelector } from 'src/redux/hooks'
import { useNavigation } from '@react-navigation/native'

const Notification = () => {
    const navigation = useNavigation<any>()
    const token = useAppSelector((state) => state.auth.token)
    const { data: notiData } = useGetNotificationQuery(token)
    return (
        <TouchableOpacity className="relative" onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications" size={24} color="white" />
            {notiData?.data?.pagination?.total > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[16px] h-4 items-center justify-center px-1">
                    <Text className="text-white text-[10px] font-bold">
                        {notiData?.data?.pagination?.total > 99 ? '99+' : notiData?.data?.pagination?.total}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}

export default Notification