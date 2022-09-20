import { StyleSheet } from "react-native";
import {
  hp,wp,color,isANDROID,
} from "../CommonUtills/ThemeHelper";

const Styles = StyleSheet.create({
  linkbtn:{
    marginTop:hp(0.7),
    borderWidth:1,
  },
  linkbtntext:{
    color: color.blackTheme,
    fontSize: 14,
    letterSpacing: 0.5,
    alignSelf:'center',
  },

});
export default Styles;
