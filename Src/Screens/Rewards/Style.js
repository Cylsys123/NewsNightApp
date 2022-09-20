import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  ImgBg: {
    paddingTop: isANDROID ? hp(2) : hp(6),
    alignItems: "center",
    paddingBottom: hp(8),
  },
  Title: {
    color: color.white,
    fontWeight: isANDROID ? "bold" : "600",
    fontSize: 20,
  },
  ImgPoints: {
    height: wp(15),
    width: wp(20),
    resizeMode: "contain",
    marginVertical: wp(4),
  },
  Txt50: {
    color: color.white,
    fontWeight: isANDROID ? "bold" : "600",
    fontSize: 25,
  },
  CardOver: {
    backgroundColor: color.white,
    margin: wp(4.2),
    borderRadius: 10,
    marginTop: -hp(5),
    flex: 1,
  },
  HeadView: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: hp(2),
  },
  HeadTxt: {
    color: color.blackTheme,
    fontSize: 18,
    marginLeft: wp(1.5),
    marginRight: wp(4),
    alignSelf: "center",
  },
  Line: {
    borderBottomWidth: 0.5,
    borderColor: color.blueTheme,
    flex: 1,
  },
  InvestView: {
    marginTop: hp(5),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  CurrencySign: {
    alignSelf: "center",
    backgroundColor: color.blueBg,
    padding: wp(2),
    height: wp(8),
    width: wp(8),
    borderRadius: 100,
    justifyContent: "center",
  },
  InvestTxt: {
    color: color.blackTheme,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: wp(4),
  },
  BtnView: {
    marginHorizontal: hp(12),
    marginBottom: wp(7),
    // flex: 1,
  },
  HistoryContentMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: wp(4),
  },
  IconCircle: {
    borderWidth: 1,
    padding: wp(0.5),
    borderRadius: 100,
  },
  HistoryStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
    marginVertical: wp(1),
  },
  HistoryStatusTxt: { color: color.black, fontSize: 12 },
  HistoryTxt: { flex: 1, marginLeft: wp(2), color: color.blackTheme },
  HistoryAmount: { alignSelf: "flex-end", color: color.blackTheme },
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
