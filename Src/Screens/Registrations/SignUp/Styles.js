import { StyleSheet } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  MainView: {
    flex: 1,
    marginHorizontal: isANDROID ? wp(5) : wp(6),
    marginTop: hp(10),
  },
  HeadTxt: {
    fontSize: 23,
    fontWeight: "bold",
    color: color.blackTheme,
    letterSpacing: 0.5,
    marginBottom: hp(3),
  },
  TermsMainView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(3),
  },
  checkbox: {
    height: wp(4),
    width: wp(4),
    borderWidth: wp(0.2),
  },
  Txt: {
    textAlign: "center",
    letterSpacing: 0.5,
    color: color.blackTheme,
  },
  TxtBlue: { color: color.linkblue, letterSpacing: 0.5 },
  OtherView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(3),
  },
  Line: {
    flex: 1,
    height: wp(0.1),
    backgroundColor: color.blackTheme,
  },
  TxtOther: {
    color: color.blackTheme,
    marginHorizontal: wp(3),
    letterSpacing: 0.5,
  },
  IconView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: wp(5),
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
    alignItems: "center",
    marginVertical: wp(5),
  },
  SignINView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: wp(7),
  },
  SignINtxt: {
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
