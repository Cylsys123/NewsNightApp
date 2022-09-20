import React, { useState, } from "react";
import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";



const styles = StyleSheet.create({
  Animation: {
    marginTop: hp(13.1),
    alignSelf: "center",
  },
  Img: {
    height: wp(32.5),
    width: wp(75),
    alignSelf: "center",
    marginLeft: wp(5),
  },
  MainView: {
    flex: 1,
    marginHorizontal: wp(4.2),
    marginTop: wp(5),
  },
  HeadTxt: {
    fontSize: 23,
    fontWeight: isANDROID ? "bold" : "600",
    fontStyle: "normal",
    color: color.blackTheme,
    letterSpacing: 0.5,
  },
});
export default styles;
