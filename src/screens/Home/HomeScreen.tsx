import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import BrandWeek from "src/components/ui/homepage/BrandWeek";
import { useAppSelector } from "src/redux/hooks";
import { StackNavigationProp } from '@react-navigation/stack';


const { width } = Dimensions.get("screen");

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchModal, setSearchModal] = useState(false)
  const [loadMore, setLoadMore] = useState(5)
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#121212",
      },
    });
  }, [navigation]);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);




  return (
    <>
      <ScrollView
        className="bg-[#121212] flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        
      >
       <Text>hellow i am here...</Text>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
