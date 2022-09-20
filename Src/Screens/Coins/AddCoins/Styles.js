import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  Card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.white,
    borderRadius: 10,
    margin: wp(4.2),
  },
  AvailableTxt: {
    marginVertical: wp(5),
    color: color.blackTheme,
    fontSize: 12,
    marginLeft: wp(3),
  },
  Separater: {
    borderBottomWidth: 0.4,
    borderColor: color.blueTheme,
    alignSelf: "stretch",
  },
  DynamicAmtView: {
    flexDirection: "row",
    marginTop: hp(5),
    justifyContent: "center",
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
  TxtInput: {
    fontSize: 35,
    fontWeight: "bold",
    paddingHorizontal: wp(3),
    alignSelf: "center",
  },
  VSeparater: {
    height: hp(7),
    width: 0.7,
    backgroundColor: color.blueTheme,
    alignSelf: "center",
  },
  ClearTxtView: {
    alignSelf: "center",
    padding: wp(1),
    backgroundColor: color.white,
    borderRadius: 100,
    marginHorizontal: wp(4),
  },
  StaticAmtView: {
    padding: wp(2),
    paddingHorizontal: wp(5),
    backgroundColor: color.white,
    marginHorizontal: wp(4),
    borderRadius: 100,
  },
  ShadowAndrd: { elevation: 10 },
  ShadowiOS: {
    shadowColor: color.blackTheme,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.1,
  },
  StaticAmtTxt: {
    color: color.blackTheme,
    fontSize: 12,
    alignSelf: "center",
  },
  BtnView: {
    alignSelf: "stretch",
    marginHorizontal: wp(20),
    marginTop: hp(5),
  },
  LoaderStyle: {
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
