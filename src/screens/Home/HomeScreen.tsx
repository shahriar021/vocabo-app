import React from "react";
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
  const { data: getPosts, isLoading, isError, refetch } = useGetAllPostQuery(undefined)

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
