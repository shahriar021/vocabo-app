import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {  useNavigation } from "@react-navigation/native";
import React, {  useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useAppSelector } from "src/redux/hooks";
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetAllPostQuery } from "src/redux/features/post/postApi";
import PostCard from "src/components/ui/homepage/PostCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const token = useAppSelector((state) => state.auth.token);
  const {data:getPosts,isLoading,isError}=useGetAllPostQuery(undefined)


  useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#121212",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitle: 'Vocabo',
            headerTitleAlign: "left",
            headerTitleStyle: {
                color: "white",
                fontFamily: 'instrumentSans-Bold',
                fontSize: 20
            }
        })
    }, [navigation])

  return (
    <View className="flex-1 bg-[#121212]">
      {isLoading?<ActivityIndicator color={"white"} size={"small"}/>:<FlatList
        data={getPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16,backgroundColor:"#121212" }}
      />}
    </View>
  );
};

export default HomeScreen;
