import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useGetPostDetailsQuery } from "src/redux/features/post/postApi";

const PostDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const { data: post, isLoading, error } = useGetPostDetailsQuery(id);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  if (isLoading) return <Text className="text-white text-center mt-4">Loading...</Text>;
  if (error) return <Text className="text-red-500 text-center mt-4">Failed to load post</Text>;

  return (
    <View className="flex-1 bg-[#121212] p-4">
      {/* Post Content */}
      <Text className="text-white text-xl font-bold mb-3">{post?.title}</Text>
      <Text className="text-gray-300 text-base leading-6 mb-6">{post?.body}</Text>

      {/* Actions Bar */}
      <View className="flex-row justify-between items-center p-3 bg-[#313030] rounded-lg mt-auto">
        {/* Like Button */}
        <TouchableOpacity className={`${isLiked ? "bg-[#FF4B4B]" : ""} flex-col items-center p-2 rounded-xl`} onPress={handleLike}>
          <Ionicons name="heart" size={24} color="white" />
          <Text className="text-white text-xs mt-1">{likeCount}</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-6">
          {/* Comment Button */}
          <TouchableOpacity className="flex-col items-center" onPress={handleShowComments}>
            <Ionicons name={showComments ? "chatbubble" : "chatbubble-outline"} size={20} color="white" />
            <Text className="text-white text-xs mt-1">{commentCount}</Text>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity className="flex-col items-center p-2 rounded-full">
            <FontAwesome5 name="share" size={18} color="white" />
            <Text className="text-white text-xs mt-1">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PostDetails;
