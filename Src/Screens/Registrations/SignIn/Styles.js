import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  Animation: {
    alignSelf: "center",
    marginTop: hp(13.1),
    // borderWidth:1,
  },
  Img: {
    height: wp(32.5),
    width: wp(75),
    // resizeMode:"stretch",
    alignSelf: "center",
    marginLeft: wp(10),
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
  Txt: {
    borderWidth: 1,
    alignSelf: "center",
    letterSpacing: 0.5,
    color: color.blackTheme,
  },
  TxtBlue: { color: color.blueTheme, letterSpacing: 0.5 },

  OtherView: {
    flexDirection: "row",
    marginTop: hp(5),
  },
  Line: {
    borderWidth: 0.5,
    alignSelf: "center",
    flex: 1,
  },
  TxtOther: {
    alignSelf: "center",
    color: color.blackTheme,
    marginHorizontal: wp(2),
    letterSpacing: 0.5,
  },
  IconView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: wp(5),
    alignItems: "center",
  },
  iconContainer: {
    borderRadius: 100,
    borderWidth: 5,
    borderColor: color.blackTheme,
    backgroundColor: color.blackTheme,
  },
  SignUpView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: wp(5),
  },
  SignUptxt: {
    alignSelf: "center",
    color: color.blackTheme,
    marginTop: hp(0.7),
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
