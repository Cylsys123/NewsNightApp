import { StyleSheet, Animated } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: wp(4.2),
    marginTop: wp(5),
  },
  imgContainer: { 
    marginTop: hp(13.1), 
    alignSelf: "center",
  },

  imgStyle: {
    height:wp(32.5),
    width:wp(75),
    // resizeMode:"stretch",
    alignSelf: "center",
    marginLeft:wp(10),
  },
  HeadTxt: {
    fontSize: 23,
    fontWeight: isANDROID ? "bold" : "600",
    fontStyle: "normal",
    color: color.blackTheme,
    letterSpacing: 0.5,
  },
});
export default Styles;
