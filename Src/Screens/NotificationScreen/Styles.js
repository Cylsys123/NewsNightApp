import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  HeadTxt: {
    color: color.blackTheme,
    fontSize: 16,
    margin: wp(3),
    marginLeft: wp(8),
    fontWeight: "bold",
  },
  ETxt: {
    color: color.blackTheme,
    fontSize: 20,
    fontWeight: "bold",
  },
  Card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: wp(3),
    padding: wp(3),
  },
  Swipe: {
    backgroundColor: color.redIndicater,
    borderRadius: 10,
    marginBottom: wp(3),
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
  },
  HTxt: {
    color: color.blackTheme,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: wp(1),
  },
  Txt: { color: color.black, fontSize: 12 },
});
export default Styles;
