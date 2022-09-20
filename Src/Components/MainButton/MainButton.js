import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";

import { hp, wp, color, isANDROID } from "../CommonUtills/ThemeHelper";
import Styles from "./MainButtonStyle";

const MainButton = ({
  action,
  btnName,
  btntextColor,
  btnColor,
  iconName,
  iconSize,
  iconColor,
  fontSize,
  borderWidth,
  borderColor,
  alignSelf,
  disabled,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={action}
        disabled={disabled}
        style={[
          Styles.button1,
          {
            alignSelf: alignSelf,
          },
        ]}
      >
        <View
          style={[
            Styles.buttonContainer,
            {
              backgroundColor: btnColor,
              borderColor: color.redTheme,
              borderWidth: borderWidth,
              borderColor: borderColor,
            },
          ]}
        >
          <View style={{ flex: 0.1 }} />
          <Text
            style={[Styles.text1, { color: btntextColor, fontSize: fontSize }]}
          >
            {btnName}
          </Text>
          <Icon_1
            name={iconName}
            size={iconSize}
            color={iconColor}
            style={{ alignSelf: "center", flex: 0.1 }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};
export default MainButton;
