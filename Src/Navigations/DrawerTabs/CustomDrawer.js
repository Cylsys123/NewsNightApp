import React, { useContext, useState, useEffect, useCallback } from "react";

import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";
import Images from "../../Assets/Images/Images";
import { AuthContext } from "../../Firebase/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props) => {
  const { logout, user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [log, setLog] = useState(false);
  const isFocused = useIsFocused();

  const getUser = useCallback(async () => {
    // console.log("useCallback");
    const Dataa = await AsyncStorage.getItem("userDataa");
    let Dataaa = JSON.parse(Dataa);
    setUserData(Dataaa);
  }, []);
  useEffect(async () => {
    // setTimeout(() => {
    //   setRefresh(true);
    //   getUser();
    // }, 1000);
    // getUser();
    const Dataa = await AsyncStorage.getItem("userDataa");
    let Dataaa = JSON.parse(Dataa);
    setUserData(Dataaa);
  }, [isFocused, userData]);

  const LogOut = () => {
    Alert.alert("Are you sure?", "Do you want to Logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          setTimeout(() => {
            setLog(false);
          }, 8000);
          logout();
          await AsyncStorage.removeItem("userDataa");
          setLog(true);
          props.navigation.navigate("AuthStack");
        },
      },
    ]);
  };

  const _goToProfileScreen = () => {
    props.navigation.navigate("Profile");
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={Styles.bgImageContainer}>
          <View style={{ justifyContent: "center" }}>
            <Image
              source={
                userData
                  ? userData?.userImg == ""
                    ? Images.defaultImg
                    : { uri: userData?.userImg }
                  : Images.defaultImg
              }
              style={[Styles.imageContainer]}
            />
          </View>
          <View style={Styles.nameContaioner}>
            <Text style={Styles.userNameText}>
              {userData ? userData?.name : "User Name"}
              {/* User Name */}
            </Text>
            <TouchableOpacity
              onPress={_goToProfileScreen}
              disabled={log ? true : false}
              style={Styles.settingbtn}
            >
              <Text style={Styles.settingText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{}} showsVerticalScrollIndicator={false}>
          {/* <View style={{flex:1,borderWidth:1,justifyContent:"space-between",}}> */}
          <View style={{ marginTop: hp(6.39) }}>
            <DrawerItemList
              {...props}
              activeTintColor={color.gray}
              activeBackgroundColor={color.white}
              inactiveTintColor={color.gray}
              inactiveBackgroundColor={color.white}
              style={{ backgroundColor: color.blackTheme }}
              labelStyle={[
                { color: color.blackTheme, marginTop: -hp(0) },
                isANDROID ? { fontSize: 14 } : { fontSize: 15 },
              ]}
            />
          </View>
          {/* </View> */}
          {/* <View style={{height:hp(10)}} /> */}
        </ScrollView>
      </View>
      <View style={Styles.logoutContainer}>
        <TouchableOpacity
          disabled={log ? true : false}
          onPress={() => {
            props.navigation.navigate("ContactUs");
          }}
          style={[Styles.logoutButton, { backgroundColor: color.white }]}
        >
          <Icon_1 name="card-account-phone" size={25} color={color.blueTheme} />
          <Text
            style={[
              Styles.logoutText,
              isANDROID ? { fontSize: 14 } : { fontSize: 16 },
            ]}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={LogOut}
          disabled={log ? true : false}
          style={[Styles.logoutButton, { backgroundColor: color.white }]}
        >
          <Icon_1 name="arrow-right-circle" size={25} color={color.blueTheme} />
          <Text
            style={[
              Styles.logoutText,
              isANDROID ? { fontSize: 14 } : { fontSize: 16 },
            ]}
          >
            {log ? "Logging Out..." : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default CustomDrawer;

const Styles = StyleSheet.create({
  flexV1: {
    flex: 1,
  },

  bgImageContainer: {
    borderWidth: 1,
    borderColor: color.blueTheme,
    borderRadius: 15,
    flexDirection: "row",
    marginTop: hp(5.9),
    marginBottom: wp(2),
    marginHorizontal: wp(4),
    paddingVertical: hp(1.1),
    paddingHorizontal: hp(1.1),
    // marginTop:isANDROID ? hp(2.5) : hp(3.5)
  },

  imageContainer: {
    height: wp(13.3),
    width: wp(13.3),
    borderRadius: wp(13.3) / 2,
    backgroundColor: color.blueTheme,
  },

  nameContaioner: { marginHorizontal: wp(3), justifyContent: "center" },

  userNameText: {
    color: color.blueTheme,
    alignSelf: "center",
    fontWeight: "600",
    fontSize: isANDROID ? 16 : 18,
    letterSpacing: 0.3,
    marginVertical: hp(1),
  },

  roleType: {
    color: "white",
    fontSize: isANDROID ? 12 : 14,
    letterSpacing: 0.3,
    marginTop: hp(1),
  },

  settingbtn: {
    flexDirection: "row",
    alignSelf: "flex-start",
    // marginTop: hp(1) ,
  },

  settingText: {
    color: color.blackTheme,
    marginHorizontal: wp(1),
    marginBottom: hp(1),
    alignSelf: "center",
    fontSize: 12,
    borderBottomWidth: 1,
  },

  logoutContainer: {
    flex: 0.2,
    borderTopWidth: 0.5,
    borderTopColor: color.gray,
    marginBottom: hp(0),
    marginLeft: wp(3),
    paddingVertical: hp(1.5),
  },
  logoutButton: {
    paddingHorizontal: wp(1),
    paddingVertical: hp(1),
    borderRadius: 4,
    flexDirection: "row",
  },
  logoutText: {
    color: color.blackTheme,
    alignSelf: "center",
    marginLeft: wp(6.8),
  },
});
