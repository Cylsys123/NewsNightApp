import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome5";

import TopBar from "../../Components/TopBar/TopBar";
import Images from "../../Assets/Images/Images";
import Icons from "../../Assets/Icons/Icons";
import {
  color,
  hp,
  isANDROID,
  wp,
} from "../../Components/CommonUtills/ThemeHelper";

import CustomDrawer from "./CustomDrawer";
import tabNavigator from "../BottomTabs/BottomTabs";
import Home from "../../Screens/Home/Home";
import FavoriteType from "../../Screens/FavoriteType/FavoriteType";
import LearnMore from "../../Screens/LearnMore/LearnMore";
import Category from "../../Screens/Category/Category";

const Drawer = createDrawerNavigator();

const DrawerTabs = (props) => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: color.blackTheme,
        width: isANDROID ? "75%" : "80%",
      }}
      initialRouteName="tabNavigator"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="tabNavigator"
        component={tabNavigator}
        // initialParams={{ screen: "Dashboard" }}
        options={{
          title: "Home",
          drawerActiveTintColor: color.blackTheme,
          drawerInactiveTintColor: color.blackTheme,
          drawerActiveBackgroundColor: color.white,
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <View style={{}}>
              {/* <Icon_1 name="home" size={40} color={color.blueTheme} /> */}
              <Image source={Icons.home_Active} style={Styles.imgIcon} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="FavoriteType"
        component={FavoriteType}
        // initialParams={{ screen: "Dashboard" }}
        options={{
          title: "Favourite",
          drawerActiveTintColor: color.blackTheme,
          drawerActiveBackgroundColor: color.white,
          drawerInactiveTintColor: color.blackTheme,
          headerShown: false,
          drawerLabelStyle: ({ focused }) =>
            focused ? color.white : color.blackTheme,
          drawerIcon: ({ focused, size }) => (
            <View style={{}}>
              {/* <Icon_1 name="heart" size={40} color={color.blueTheme} /> */}
              <Image source={Icons.heart_Active} style={Styles.imgIcon} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Category"
        component={Category}
        // initialParams={{ screen: "Dashboard" }}
        options={{
          title: "Category",
          drawerActiveTintColor: color.blackTheme,
          drawerActiveBackgroundColor: color.white,
          drawerInactiveTintColor: color.blackTheme,
          headerShown: false,
          drawerLabelStyle: ({ focused }) =>
            focused ? color.white : color.blackTheme,
          drawerIcon: ({ focused, size }) => (
            <View style={{}}>
              {/* <Icon_1 name="heart" size={40} color={color.blueTheme} /> */}
              <Image source={Icons.category_Active} style={Styles.imgIcon1} />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="LearnMore"
        component={LearnMore}
        // initialParams={{ screen: "Dashboard" }}
        options={{
          title: "Learn More",
          drawerActiveTintColor: color.blackTheme,
          drawerActiveBackgroundColor: color.white,
          drawerInactiveTintColor: color.blackTheme,
          headerShown: false,
          drawerLabelStyle: ({ focused }) =>
            focused ? color.white : color.blackTheme,
          drawerIcon: ({ focused, size }) => (
            <View style={{}}>
              {/* <Icon_1 name="heart" size={40} color={color.blueTheme} /> */}
              <Image source={Icons.info_Active} style={Styles.imgIcon} />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerTabs;

const Styles = StyleSheet.create({
  imgIcon: {
    height: wp(7),
    width: wp(7),
  },
  imgIcon1: { height: wp(6), width: wp(6) },
});
