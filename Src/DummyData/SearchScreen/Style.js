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
    backgroundColor: color.white,
    flexDirection: "row",
    marginHorizontal: wp(4.2),
    marginBottom: wp(3),
    padding: wp(3),
    alignItems: "center",
    justifyContent: "space-between",
  },
  NameTxt: {
    alignSelf: "center",
    fontSize: 16,
    color: color.blackTheme,
  },
  ViewBtn: {
    backgroundColor: color.greenMint,
    padding: wp(1.5),
    borderRadius: 10,
    marginTop: wp(2),
  },
  ViewTxt: {
    fontSize: 12,
    color: color.white,
    paddingHorizontal: wp(2),
  },
  TopbarMain: {
    backgroundColor: color.white,
    paddingTop: isANDROID ? null : hp(5),
  },
  Topbar: {
    backgroundColor: color.BgColor,
    marginHorizontal: wp(5),
    marginVertical: wp(3),
    paddingVertical: isANDROID ? null : wp(3),
    paddingRight: wp(2),
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ClearTouch: { alignSelf: "center", paddingHorizontal: wp(2) },
  ClearTxt: { color: color.gray, fontSize: 12 },
});
export default Styles;
