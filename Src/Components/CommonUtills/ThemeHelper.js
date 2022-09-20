import { ActivityIndicator } from "react-native-paper";
import React, { useState } from "react";
import { Dimensions, PixelRatio, Platform } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const isIOS = Platform.OS === "ios";
const isANDROID = Platform.OS === "android";
const isiPAD = screenHeight / screenWidth < 1.6;

const widthPercentageToDP = (wp) => {
  const widthPercent = wp;
  const elemWidth =
    typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (hp) => {
  const heightPercent = hp;
  const elemHeight =
    typeof heightPercent === "number"
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

// based on iphone 5s's scale
const scale = screenWidth / 375;
const normalize = (size) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const color = {
  white: "#FFFFFF",
  whiteShade: "#FFFFFFaa",

  gray: "#B3AFB0",
  grayShade: "#b6b6b6",
  lightgray: "#B3AFB0aa",
  black: "#4E4E4E",

  pink: "#DC5BB1",
  redLinnet: "#FF0000",
  redTheme: "#C71933",
  redIndicater: "#DD4A48",

  orange: "#FFA81D",
  yellow: "#E9CE1C",

  blue: "#6785F1",
  blueTheme: "#00458A",
  linkblue: "#0B8AFF",
  blueIconBg: "rgba(255, 255, 255, 0.2)",
  blueBg: "rgba(0, 69, 138, 0.05)",

  blackTheme: "#161B30",

  green: "#62C354",
  greenMint: "#3EB489",
  greenTheme: "#12C79E",
  greenHighlight: "#03DAC6",

  txtInptColor: "#626985",
  iconBg: "#D2475C",
  BgColor: "#F7F7F7",
  screenBg: "#F0F1F4",
};

//const Splash_Gradient = ['#CC262E', '#660E14'];

const fonts = {
  fontBold: "bold",
};

const Loader = (props) => {
  return (
    <ActivityIndicator
      animating={props.visible}
      size={"large"}
      color={"#00458A"}
    />
  );
};

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  screenHeight,
  screenWidth,
  normalize,
  isIOS,
  isANDROID,
  isiPAD,
  color,
  fonts,
  Loader,
};
