import React, { useCallback, useEffect, useState } from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {  Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useAppSelector } from 'src/redux/hooks';
import { useDispatch } from 'react-redux';
import { setToken, setUserType } from 'src/redux/features/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomDrawerContent = (props:any) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null);
  const userItems = [
    {
      label: 'Edit Profile',
      icon: require("../../assets/e-icon/editOlive.png"),
      screen: 'Edit Profile',
    },
    {
      label: 'Order History',
      icon: require("../../assets/e-icon/favOlive.png"),
      screen: 'Order History',
    },
    {
      label: 'My Favourite',
      icon: require("../../assets/e-icon/favOlive.png"),
      screen: 'My Favourite',
    },
    {
      label: 'Reward',
      icon: require("../../assets/e-icon/reward.png"),
      screen: 'Reward',
    },
  ];

  // Items for provider only
  const providerItems = [

    {
      label: 'Brand Profile',
      icon: require("../../assets/e-icon/editOlive.png"),
      screen: 'Brand Profile',
    },
  ];

  // Common items for both
  const commonItems = [
    {
      label: 'Change Password',
      icon: require("../../assets/e-icon/PasswordOlive.png"),
      screen: 'Change Password',
    },
    {
      label: 'Terms and conditions',
      icon: require("../../assets/e-icon/terms-live.png"),
      screen: 'Terms',
    },
    {
      label: 'Privacy  Policy',
      icon: require("../../assets/e-icon/privacyolive.png"),
      screen: 'Privacy',
    },

  ];
  const userType = useAppSelector((store) => store.auth.userType)

  const items = userType === 'User' ? [...userItems, ...commonItems] : [...providerItems, ...commonItems];

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user_profile');
        if (jsonValue != null) {
          setProfile(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load profile from AsyncStorage", e);
      }
    };

    loadProfile();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('user_profile');
          if (jsonValue != null) {
            setProfile(JSON.parse(jsonValue));
          }
        } catch (e) {
          console.error("Failed to load profile from AsyncStorage", e);
        }
      };
      loadProfile();
      return () => {
      };

    }, [])
  );


  // userType == user or provider
  const handleLogout = () => {
    dispatch(setUserType(null))
    dispatch(setToken(null))
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#252525' }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header Section */}
        <View style={{ padding: 16, backgroundColor: '#252525' }}>
          <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}>
            <Feather name="arrow-left-circle" size={24} color="white" />
          </TouchableOpacity>

          <View style={{ marginTop: 16, alignItems: 'center' }}>
            {profile?.data ? (
              userType === "Brand" ? (
                <Image
                  source={{ uri: profile?.data?.brandLogo?.[0] }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginBottom: 8,
                    borderColor: '#fff',
                    borderWidth: 1,

                  }}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={{ uri: profile?.data?.profile?.[0] }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    marginBottom: 8,
                    borderColor: '#fff',
                    borderWidth: 1,

                  }}
                  resizeMode="cover"
                />
              )
            ) : (
              <Image
                source={require("../../assets/e-icon/img (1).png")}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginBottom: 8,
                  borderColor: '#fff',
                  borderWidth: 1,

                }}
                resizeMode="cover"
              />
            )}
            <Text className='font-instrumentSansSemiBold' style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{userType == "Brand" ? profile?.data?.brandName : profile?.data?.userName}</Text>
            <View className='w-full border border-[#707070] mt-4' />
          </View>
        </View>

        {/* Drawer Items */}
        <View style={{ paddingTop: 20 }}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(item.screen)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={item.icon} style={{ width: 20, height: 20 }} />
                <Text style={{ marginLeft: 15, fontSize: 16, color: '#DCF3FF' }}>
                  {item.label}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#DCF3FF" />
            </TouchableOpacity>
          ))}
          <TouchableOpacity

            onPress={handleLogout}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require("../../assets/e-icon/Frame (2).png")} style={{ width: 20, height: 20 }} />
              <Text style={{ marginLeft: 15, fontSize: 16, color: '#DCF3FF' }}>
                Logout
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#DCF3FF" />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};
