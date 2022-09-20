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
  CardView: {
    flex: 1,
    backgroundColor: color.white,
    marginHorizontal: wp(4.2),
    marginVertical: wp(3),
    borderRadius: 10,
  },
  HeadTxt: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.blackTheme,
    marginTop: wp(5),
    marginLeft: wp(4),
    letterSpacing: 1,
  },
  Open: {
    alignItems: "center",
    paddingVertical: wp(0.5),
    paddingHorizontal: wp(4),
    borderRadius: 10,
    backgroundColor: color.greenMint,
    alignSelf: "flex-end",
    marginTop: -hp(4),
    marginRight: wp(4),
  },
  Close: {
    alignItems: "center",
    paddingVertical: wp(0.5),
    paddingHorizontal: wp(4),
    borderRadius: 10,
    backgroundColor: color.redIndicater,
    alignSelf: "flex-end",
    marginTop: -hp(4),
    marginRight: wp(4),
  },
  OpenCloseTxt: { color: color.white, fontSize: 12 },
  ContentTxt: {
    marginTop: isANDROID ? hp(5) : hp(3),
    textAlign: "justify",
    marginHorizontal: wp(4),
    color: color.black,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  Line: {
    borderBottomWidth: 0.2,
    borderColor: color.blueTheme,
    marginVertical: hp(3),
  },
  StatusView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  AmountTxt: {
    color: color.blackTheme,
    fontSize: 16,
    marginRight: wp(1),
    alignSelf: "center",
  },
  ImgCoins: {
    height: wp(6),
    width: wp(6),
    resizeMode: "contain",
    alignSelf: "center",
  },
  ImgCoins2: {
    height: wp(7),
    width: wp(7),
    resizeMode: "contain",
    alignSelf: "center",
  },
  AmountView: {
    flexDirection: "row",
    justifyContent: "center",
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
    height: wp(20),
    width: wp(20),
    alignItems: "center",
    justifyContent: "center",
  },
  EarningTxt: {
    color: color.blackTheme,
    fontSize: 25,
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