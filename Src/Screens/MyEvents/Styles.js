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
    marginBottom: wp(3),
    backgroundColor: color.white,
    flex: 1,
    paddingTop: wp(2),
  },
  ImgView: {
    alignSelf: "center",
    flex: 1,
    marginVertical: wp(3),
    marginLeft: wp(3),
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
  DateTimeTxt: {
    color: color.black,
    fontSize: 10,
    marginTop: wp(2),
  },
  HeadTxt: {
    color: color.blackTheme,
    fontSize: 16,
    margin: wp(3),
    marginLeft: wp(8),
    fontWeight: "bold",
  },
  OpenClose: {
    alignItems: "center",
    marginRight: wp(2),
    paddingVertical: wp(0.5),
    borderRadius: 10,
  },
  OpenCloseTxt: { color: color.white, fontSize: 12 },
  ViewPartEarn: {
    flexDirection: "row",
    marginBottom: wp(3),
    marginHorizontal: wp(3),
    marginTop: wp(2),
    justifyContent: "space-between",
  },
  LeftRightView: {
    // flex: 1,
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  HTxt: {
    color: color.black,
    fontSize: 12,
    alignSelf: "center",
  },
  Txt: {
    color: color.black,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  Loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: hp(82),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
export default Styles;
