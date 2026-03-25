import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGetPostDetailsQuery } from "src/redux/features/post/postApi";
import { useAppSelector } from "src/redux/hooks";
import { useDispatch } from "react-redux";
import { toggleLike } from "src/redux/features/post/postSlice";

const PostDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const { data: post, isLoading, error } = useGetPostDetailsQuery(id);
  const navigation = useNavigation();

  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const likeState = useAppSelector((state) => state.post?.likes[id]);
  const isLiked = likeState?.isLiked ?? false;
  const likeCount = likeState?.count ?? 0;

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTitle: "Details",
      headerTitleAlign: "left",
      headerTitleStyle: {
        color: "white",
        fontFamily: "instrumentSans-Bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  const handleLike = () => {
    dispatch(toggleLike(id));
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  if (isLoading)
    return <Text className="text-white text-center mt-4">Loading...</Text>;
  if (error)
    return (
      <Text className="text-red-500 text-center mt-4">Failed to load post</Text>
    );

  return (
    <View className="flex-1 bg-[#121212] p-5">
      {/* Post Content */}
      <View className="bg-[#1E1E1E] rounded-xl p-4 mb-6">
        <Text className="text-white text-2xl font-bold mb-3">{post?.title}</Text>
        <Text className="text-gray-400 text-base leading-6">{post?.body}</Text>
      </View>

      {/* Actions Bar */}
      <View className="flex-row justify-around items-center bg-[#1E1E1E] rounded-xl p-3">
        {/* Like Button */}
        <TouchableOpacity
          className="flex-col items-center"
          onPress={handleLike}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={22}
            color={isLiked ? "#FF4B4B" : "white"}
          />
          <Text className="text-white text-xs mt-1">{likeCount}</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity
          className="flex-col items-center"
          onPress={handleShowComments}
        >
          <Ionicons
            name={showComments ? "chatbubble" : "chatbubble-outline"}
            size={22}
            color="white"
          />
          <Text className="text-white text-xs mt-1">{commentCount}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity className="flex-col items-center">
          <FontAwesome5 name="share" size={20} color="white" />
          <Text className="text-white text-xs mt-1">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostDetails;
