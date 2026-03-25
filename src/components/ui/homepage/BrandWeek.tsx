import { View, Text, Animated, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { verticalScale } from 'react-native-size-matters';
import { useGetBrandOfTheWeekQuery } from 'src/redux/features/brand/brandApi';
import { useAppSelector } from 'src/redux/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/types/screens';
const { width } = Dimensions.get("screen");

type Props = {
    navigation: StackNavigationProp<RootStackParamList, "Brand Details">;
};

const BrandWeek = ({navigation}:Props) => {
    const token = useAppSelector((state) => state.auth.token)
    const { data } = useGetBrandOfTheWeekQuery(token)

    return (
        <View className='flex-1 w-full'>
            {data?.data && data?.data?.brandLogo?.[0] ? (
                <>
                    <Text className="text-3xl text-center text-[#fff] mt-5 mb-2 font-playFairDisplay">
                        Brand of the week

                    </Text>
                    <TouchableOpacity style={{ width: "100%", height: verticalScale(180), overflow: 'hidden', alignItems: "center", justifyContent: "center", borderRadius: 20, position: "relative" }} onPress={()=>navigation.navigate("Brand Details", { id: data?.data?.brandId })}>
                        <Image source={{ uri: data?.data?.brandLogo[0] }} style={{ width: "100%", height: "100%" }} />
                        <Text
                            style={{
                                position: "absolute",
                                
                                left: 0,
                                right: 0,
                                textAlign: "center",
                                fontSize: 24,
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                color: 'white', 
                                paddingVertical: 5,
                                borderRadius: 10 
                            }}
                        >
                            {data?.data?.brandName}
                        </Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>No brand found as brand of the week</Text>
            )}
        </View>

    )
}

export default BrandWeek