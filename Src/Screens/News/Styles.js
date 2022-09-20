import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  ImgBg: {
    paddingBottom: hp(22),
    paddingTop: isANDROID ? hp(2) : hp(6),
    flex: 0.1,
  },
  IconView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(4.2),
  },
  IconTouch: {
    backgroundColor: color.blueIconBg,
    borderRadius: 100,
  },
  ContentView: {
    backgroundColor: color.white,
    marginVertical: wp(3),
    paddingTop: wp(2),
    marginHorizontal: wp(4.2),
    paddingHorizontal: wp(3),
    // paddingBottom: hp(3),
    borderRadius: 10,
    flex: 1,
  },
  ContentHead: {
    color: color.blackTheme,
    fontSize: 18,
    fontWeight: "bold",
  },
  BtnView: {
    flexDirection: "row",
    flex: 0.5,
  },
  Loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Styles;
