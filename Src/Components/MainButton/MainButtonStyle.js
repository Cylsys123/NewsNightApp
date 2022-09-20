import { StyleSheet } from "react-native";
import { hp, wp, color, isANDROID } from "../CommonUtills/ThemeHelper";

const ButtonStyles = StyleSheet.create({
  button1: {
    marginTop: hp(3),
  },
  buttonContainer: {
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
  },
  text1: {
    flex: 1,
    letterSpacing: 0.5,
    //fontWeight: "600",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: isANDROID ? hp(1) : hp(1.3),
  },
});
export default ButtonStyles;
