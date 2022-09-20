import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";

import Images from "../../Assets/Images/Images";
import Logos from "../../Assets/Logos/Logos";
import { color, wp, hp, isANDROID } from "../CommonUtills/ThemeHelper";

const TopBar = (props) => {
  return (
    <>
      <View
        style={[
          Styles.topBarStyle,
          { backgroundColor: props.Ctitle ? color.white : color.blueTheme },
        ]}
      >
        <View style={[Styles.leftView, {}]}>
          {props.open ? (
            <TouchableOpacity
              onPress={props.open}
              style={[Styles.iconPosition, { backgroundColor: "transparent" }]}
            >
              <Icon_1
                name={"text"}
                size={30}
                color={props.black ? color.black : color.white}
              />
              {/* <Image source={Images.Background} style={{ height: hp(3.5), width: hp(3.5) }} /> */}
            </TouchableOpacity>
          ) : props.back ? (
            <TouchableOpacity
              onPress={props.back}
              style={[
                Styles.iconPosition,
                {
                  backgroundColor: props.Ctitle ? color.white : "transparent",
                  borderRadius: wp(50),
                },
                isANDROID ? Styles.cardViewAndroid : Styles.cardViewiOS,
              ]}
            >
              <Icon_1 name="chevron-left" size={30} color={color.blackTheme} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={[Styles.titleView]}>
          {props.Head ? (
            <Image source={Logos.NewsKnight} style={Styles.img} />
          ) : (
            <Text
              style={[
                Styles.titleText,
                { color: props.Ctitle ? color.blackTheme : color.white },
              ]}
            >
              {props.title}
            </Text>
          )}
        </View>

        <View style={[Styles.rightView, {}]}>
          {props.rightNull ? null : (
            <TouchableOpacity
              onPress={
                props.Notification
                  ? props.Notification
                  : props.menuDots
                  ? props.menuDots
                  : props.searchPress
              }
              style={[
                Styles.rightEvent,
                {
                  backgroundColor: props.Notification
                    ? color.blueIconBg
                    : props.menuDots
                    ? "transparent"
                    : "transparent",
                },
              ]}
            >
              <Icon_1
                name={
                  props.Notification
                    ? "bell"
                    : props.menuDots
                    ? "dots-vertical"
                    : "magnify"
                }
                size={props.Notification ? 20 : 28}
                color={
                  props.Notification
                    ? color.white
                    : props.menuDots
                    ? color.blackTheme
                    : color.white
                }
                style={{ alignSelf: "center" }}
              />
              {props.redDot ? <View style={Styles.notifyIcon} /> : null}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};
export default TopBar;
const Styles = StyleSheet.create({
  topBarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: isANDROID ? hp(2) : hp(4.2),
    paddingBottom: hp(1.5),
    paddingHorizontal: wp(4.2),
  },

  iconPosition: {
    alignSelf: "flex-start",
  },
  img: {
    resizeMode: "contain",
    height: wp(12),
    width: wp(30),
  },
  rightEvent: {
    alignSelf: "flex-end",
    borderRadius: 100,
    padding: wp(1.5),
  },
  notifyIcon: {
    borderRadius: wp(3.5) / 2,
    backgroundColor: color.redLinnet,
    height: wp(3.5),
    width: wp(3.5),
    position: "absolute",
    alignSelf: "flex-end",
  },
  leftView: {
    flex: 0.5,
    justifyContent: "center",
  },
  rightView: {
    flex: 0.5,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  titleView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  titleText: {
    fontWeight: isANDROID ? "bold" : "700",
    fontSize: 20,
    letterSpacing: 0.5,
    paddingHorizontal: wp(1),
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardViewAndroid: { elevation: 10 },
  cardViewiOS: {
    shadowColor: color.blackTheme,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
  },
});
