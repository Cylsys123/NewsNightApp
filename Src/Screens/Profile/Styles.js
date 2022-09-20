import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  Card: {
    flex: 1,
    margin: wp(4.2),
    backgroundColor: color.white,
    borderRadius: 10,
  },
  ImgView: { alignSelf: "center", marginTop: wp(7) },
  Img: {
    height: wp(25.3),
    width: wp(25.3),
    borderRadius: wp(25.3) / 2,
    alignSelf: "center",
  },
  UserName: {
    alignSelf: "center",
    marginTop: wp(3),
    fontSize: 20,
    fontWeight: "bold",
    color: color.blackTheme,
  },
  UserNameTxtIn: {
    alignSelf: "center",
    marginTop: wp(3),
    fontSize: 20,
    fontWeight: "bold",
    color: color.blackTheme,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
    width: wp(35),
  },
  Line: {
    height: 0.5,
    backgroundColor: color.blueTheme,
    marginVertical: wp(3),
  },
  View1: { flexDirection: "row", paddingLeft: wp(5) },
  HeadTxt: { color: color.blackTheme, fontSize: 16 },
  Txt: { color: color.black, fontSize: 13 },
  TxtInp: {
    color: color.black,
    fontSize: 13,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: wp(4),
    paddingVertical: wp(1),
    width: wp(35),
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
