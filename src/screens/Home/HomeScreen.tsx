import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useGetAllPostQuery } from "src/redux/features/post/postApi";
import PostCard from "src/components/ui/homepage/PostCard";
import Loading from "src/components/shared/Loading";
import ErrorMessage from "src/components/shared/ErrorMessage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { data: getPosts, isLoading, isError, refetch } = useGetAllPostQuery(undefined)

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

  if (isLoading) return <Loading />
  if (isError) return <ErrorMessage onRetry={refetch} />

  return (
    <View className="flex-1 bg-[#121212]">
      {isLoading ? <ActivityIndicator color={"white"} size={"small"} /> : <FlatList
        data={getPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16, backgroundColor: "#121212" }}
      />}
    </View>
  );
};

export default HomeScreen;
