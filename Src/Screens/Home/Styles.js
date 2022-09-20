import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  Card: {
    borderRadius: 10,
    marginLeft: wp(3),
    height: hp(16.6),
    width: wp(74.4),
  },
  Card2: {
    borderRadius: 10,
    marginBottom: wp(3),
    backgroundColor: color.white,
    flex: 1,
    flexDirection: "row",
  },
  ImgView: {
    alignSelf: "center",
    flex: 1,
    marginVertical: wp(3),
    marginLeft: wp(3),
  },
  Img: {
    borderRadius: 10,
    width: wp(30),
    height: wp(20),
  },
  NameTxt: {
    color: color.blackTheme,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: wp(1),
  },
  DetailsTxt: {
    color: color.black,
    fontSize: 12,
  },
  LiveView: {
    backgroundColor: color.redIndicater,
    paddingVertical: 2,
    borderTopRightRadius: 10,
  },
  LiveTxt: { textAlign: "center", color: color.white },
  HeadView: {
    backgroundColor: color.white,
    flexDirection: "row",
    paddingHorizontal: wp(4.2),
    paddingVertical: wp(2),
    paddingLeft: wp(7),
  },
  HeadTxt: {
    fontSize: 16,
    marginRight: wp(3),
    color: color.blackTheme,
  },
  HeadLine: {
    height: 0.5,
    backgroundColor: color.blackTheme,
    alignSelf: "center",
    flex: 1,
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
