import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  Card2: {
    borderRadius: 10,
    marginBottom: wp(3),
    backgroundColor: color.white,
    // flex: 1,
    flexDirection: "row",
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
  LoaderStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: hp(82),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Styles;
