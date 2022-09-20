import { StyleSheet } from "react-native";
import { hp, wp, color, isANDROID } from "../CommonUtills/ThemeHelper";

const TextInputStyles = StyleSheet.create({
  textTitle: {
    color: color.blackTheme,
    fontSize: 15,
    letterSpacing: 0.5,
    marginTop: hp(2),
    marginBottom: hp(0.7),
  },
  textContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: color.txtInptColor,
    paddingVertical: isANDROID ? wp(1.3) : wp(0.5),
    // flex:1,     // use this flex by array but only when required
  },
  textInput: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    fontSize: 15,
    color: color.blackTheme,
    paddingVertical: isANDROID ? -hp(0.5) : hp(1),
    alignSelf: "center",
    flex: 1,
    //backgroundColor: "red",
    borderRadius: 100,
  },
});
export default TextInputStyles;
