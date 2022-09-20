import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  ImgBg: {
    paddingBottom: hp(10),
    paddingHorizontal: wp(4.2),
    flex: 0.3,
  },
  BackIcon: {
    backgroundColor: color.blueIconBg,
    borderRadius: 100,
    alignSelf: "flex-start",
    marginTop: isANDROID ? hp(2) : hp(6),
  },
  Line: {
    marginTop: hp(3),
    height: 0.3,
    backgroundColor: color.blueIconBg,
    marginHorizontal: -wp(0.8),
  },
  Line1: {
    marginVertical: wp(5),
    height: 0.3,
    backgroundColor: color.blueTheme,
    marginHorizontal: -wp(3),
  },
  Card: {
    backgroundColor: color.white,
    margin: wp(4.2),
    borderRadius: 10,
    paddingHorizontal: wp(3),
    marginTop: -hp(5),

    flex: 1,
  },
  HeadView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  HeadTxt: { color: color.white, fontSize: 18, fontWeight: "bold" },
  HeadTxt2: {
    color: color.white,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginHorizontal: wp(3),
  },
  IconBg: {
    backgroundColor: color.white,
    height: wp(8),
    width: wp(8),
    borderRadius: 100,
    justifyContent: "center",
  },
  IconBg2: {
    backgroundColor: color.blueBg,
    borderRadius: 100,
    padding: 4,
  },
  ImgCoins: {
    height: wp(5),
    width: wp(5),
    resizeMode: "contain",
    alignSelf: "center",
  },
  ImgCoins2: {
    height: wp(7),
    width: wp(7),
    resizeMode: "contain",
    alignSelf: "center",
  },
  QHead: {
    color: color.gray,
    marginBottom: wp(2),
    fontSize: 15,
    marginLeft: wp(4.2),
  },
  QuesTxt: {
    fontSize: 16,
    color: color.blackTheme,
    marginLeft: wp(4.2),
  },
  PartcipantView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  PartcipantTxt: {
    color: color.blackTheme,
    alignSelf: "center",
    marginRight: wp(1),
  },
  AmountView: { flexDirection: "row", justifyContent: "space-between" },
  AmountView2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  AmountTxt: {
    color: color.blackTheme,
    alignSelf: "center",
    fontSize: 16,
    flex: 1,
  },
  AmountTxt2: {
    color: color.blackTheme,
    fontSize: 16,
    marginRight: wp(1),
    alignSelf: "center",
  },
  EarningHead: {
    color: color.blackTheme,
    fontSize: 16,
    alignSelf: "center",
  },
  EarningBg: {
    backgroundColor: color.blueBg,
    alignSelf: "center",
    marginTop: wp(3),
    borderRadius: 100,
    flexDirection: "row",
    height: wp(25),
    width: wp(25),
    alignItems: "center",
    justifyContent: "center",
  },
  EarningTxt: {
    color: color.blackTheme,
    fontSize: 23,
    fontWeight: "bold",
  },
  Status: {
    alignSelf: "center",
    color: color.redTheme,
    marginTop: hp(2),
    fontSize: 12,
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
