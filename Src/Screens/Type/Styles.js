import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  Card: {
    backgroundColor: color.white,
    margin: wp(4.2),
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  HeadTxt: {
    color: color.blackTheme,
    fontSize: 13,
    marginBottom: wp(5),
    fontWeight: "bold",
  },
  Img: { height: wp(40), width: wp(40), resizeMode: "contain" },
});
export default Styles;
