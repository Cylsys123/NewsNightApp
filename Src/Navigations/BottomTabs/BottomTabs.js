import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import { customTabBarStyle } from "./CustomBottom";

import {
  color,
  isANDROID,
  wp,
  hp,
} from "../../Components/CommonUtills/ThemeHelper";
import Icons from "../../Assets/Icons/Icons";
import Home from "../../Screens/Home/Home";
import MyEvents from "../../Screens/MyEvents/MyEvents";
import Reward from "../../Screens/Rewards/Reward";
import Profile from "../../Screens/Profile/Profile";

const Tab = createBottomTabNavigator();

const tabNavigator = () => {
  const customizeBottom_1 = {
    activeTinColor: color.white,
    style: {
      backgroundColor: color.white,
      alignSelf: "center",
      justifyContent: "center",
      // borderRadius:100,
      borderWidth: 2,
      width: "100%",
      borderColor: color.blueTheme,
      // height:'10%'
      //elevation:5,bottom:hp(1.5),
    },
    tabBarStyle: {
      height: hp(10),
      borderTopWidth: 0.3,
      borderColor: color.blueTheme,
    },
  };
  const customTabs = {
    height: hp(10),
    borderTopWidth: 2,
    borderColor: color.linkblue,
  };

  return (
    <Tab.Navigator tabBarOptions={customTabBarStyle} shifting="false">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: Styles.tabBar,
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                { color: focused ? color.greenMint : color.gray },
                Styles.tabLables,
              ]}
            >
              Home
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[Styles.mainView]}>
              <Image
                source={focused ? Icons.HomeActive : Icons.HomeInactive}
                style={Styles.imgActive}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="MyEvents"
        component={MyEvents}
        options={{
          tabBarStyle: Styles.tabBar,
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                { color: focused ? color.greenMint : color.gray },
                Styles.tabLables,
              ]}
            >
              My Events
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[Styles.mainView]}>
              <Image
                source={focused ? Icons.MyEventActive : Icons.MyEventInactive}
                style={Styles.imgActive}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Reward"
        component={Reward}
        options={{
          tabBarStyle: Styles.tabBar,
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                { color: focused ? color.greenMint : color.gray },
                Styles.tabLables,
              ]}
            >
              Reward
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[Styles.mainView]}>
              <Image
                source={focused ? Icons.RewardActive : Icons.RewardInactive}
                style={Styles.imgActive}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarStyle: Styles.tabBar,
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                { color: focused ? color.greenMint : color.gray },
                Styles.tabLables,
              ]}
            >
              Profile
            </Text>
          ),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={[Styles.mainView]}>
              <Image
                source={focused ? Icons.UserActive : Icons.UserInactive}
                style={Styles.imgActive}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default tabNavigator;

const Styles = StyleSheet.create({
  mainView: {
    justifyContent: "center",
  },

  marginViewAndroid: { marginTop: -hp(2) },
  marginViewIOS: { marginTop: hp(4.5) },

  imgActive: {
    height: wp(8),
    width: wp(8),
    alignSelf: "center",
    marginTop: hp(0.5),
  },

  tabBar: {
    height: isANDROID ? hp(8.8) : hp(10),
    borderTopWidth: 0.3,
    borderColor: color.blueTheme,
  },
  tabLables: {
    marginBottom: isANDROID ? hp(0.7) : -hp(0.3),
    marginTop: isANDROID ? hp(0) : -hp(1),
  },
});
