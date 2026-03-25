import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, } from "../screens"; 
import { Feather } from "@expo/vector-icons";
import { CustomDrawerContent } from './CustomeDrawerNavigation';
import Profile from 'src/screens/Profile/Profile';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
    return (
        <>{/* @ts-ignore */}
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#252525',
                },
                drawerActiveTintColor: '#1A5EED',
                drawerInactiveTintColor: '#333', 
            }}
        >

            <Drawer.Screen
                name="ProfileScreen"
                component={Profile}
                options={{
                    headerShown: true,

                    drawerIcon: ({ color }) => (
                        <Feather name="home" size={16} color={color} />
                    ),

                }}
            />
            
        </Drawer.Navigator>
        </>
    );
};
