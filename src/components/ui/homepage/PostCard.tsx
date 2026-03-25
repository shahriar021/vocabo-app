import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { toggleLike } from "src/redux/features/post/postSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "src/types/navigation";
import { Post } from "src/types";

type NavigationProp = StackNavigationProp<RootStackParamList, "Post Details">

const PostCard = ({ item }: { item: Post }) => {
  const [showComments, setShowComments] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const likeState = useAppSelector((state) => state.post?.likes[item.id]);
  const isLiked = likeState?.isLiked ?? false;
  const likeCount = likeState?.count ?? (item.totalReacts ?? 0);
  const commentCount = item.totalComments ?? 0;

  const handleLike = () => {
    dispatch(toggleLike(item.id));
  };

  return (
    <View className="bg-[#313030] rounded-xl p-4 shadow-sm mx-4 mb-3 border-white">
      <TouchableOpacity onPress={() => navigation.navigate("Post Details", { id: item.id })}>
        <Text className="text-base font-bold text-white capitalize mb-2">{item.title}</Text>
        <Text className="text-sm text-gray-100 leading-5" numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-between items-center p-2 bg-[#121212] rounded-lg mt-2">
        <TouchableOpacity
          className={`${isLiked ? "bg-[#FF4B4B]" : ""} p-1 items-center rounded-xl`}
          onPress={handleLike}
        >
          <Ionicons name="heart" size={24} color="white" />
          <Text className="text-white">{likeCount}</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={() => setShowComments((prev) => !prev)}
          >
            <Ionicons name={showComments ? "chatbubble" : "chatbubble-outline"} size={20} color="white" />
            <Text className="text-white mt-1">{commentCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity className="p-2 rounded-full items-center justify-center gap-1">
            <FontAwesome5 name="share" size={18} color="white" />
            <Text className="text-white">Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showComments && (
        <View className="mt-3 bg-gray-100 rounded-lg p-3">
          <Text className="text-gray-400 text-sm text-center">No comments yet</Text>
        </View>
      )}
    </View>
  );
};

export default PostCard;