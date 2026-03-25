import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  totalReacts?: number;
  totalComments?: number;
  attachment?: string[];
  caption?: string;
};

const PostCard = ({ item }: { item: Post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.totalReacts ?? 0);
  const [showComments, setShowComments] = useState(false);
  const [commentCount] = useState(item.totalComments ?? 0);
  const navigation = useNavigation()

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm mx-4 mb-3">
      <TouchableOpacity onPress={()=>navigation.navigate("Post Details",{id:item.id})}>
        <Text className="text-base font-bold text-gray-800 capitalize mb-2">{item.title}</Text>
        <Text className="text-sm text-gray-500 leading-5" numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>

      {/* Actions Bar */}
      <View className="flex-row justify-between items-center p-2 bg-[#313030] rounded-lg mt-2">
        {/* Like Button */}
        <TouchableOpacity className={`${isLiked ? "bg-[#FF4B4B]" : ""} p-1 items-center rounded-xl`} onPress={handleLike}>
          <Ionicons name="heart" size={24} color="white" />
          <Text className="text-white">{likeCount}</Text>
        </TouchableOpacity>

        <View className="flex-row items-center gap-2">
          {/* Comment Button */}
          <TouchableOpacity className="items-center justify-center" onPress={handleShowComments}>
            <Ionicons name={showComments ? "chatbubble" : "chatbubble-outline"} size={20} color="white" />
            <Text className="text-white mt-1">{commentCount}</Text>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity className="p-2 rounded-full items-center justify-center gap-1">
            <FontAwesome5 name="share" size={18} color="white" />
            <Text className="text-white">Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments Section */}
      {showComments && (
        <View className="mt-3 bg-gray-100 rounded-lg p-3">
          <Text className="text-gray-400 text-sm text-center">No comments yet</Text>
        </View>
      )}
    </View>
  );
};

export default PostCard;
