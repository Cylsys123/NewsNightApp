import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";

import Styles from "./TextInput_Styles";
import {
  wp,
  hp,
  isANDROID,
  Loader,
  fonts,
  color,
} from "../CommonUtills/ThemeHelper";

const TextInputComponent = ({
  titleName,
  TextValue,
  maxLength,
  label,
  getValue,
  error,
  security,
}) => {
  const [IseyeOn, setIseyeOn] = useState(true);
  const [Change, setChange] = useState(true);

  const textChange = (data) => {
    // console.log("data", data);
    getValue(data);
  };

  return (
    <>
      <Text style={Styles.textTitle}>{titleName}</Text>
      <View
        style={[
          Styles.textContainer,
          {
            borderColor:
              // Change? color.linkblue:
              error ? color.redTheme : color.blackTheme,
          },
        ]}
      >
        <TextInput
          onChangeText={(text) => textChange(text)}
          //onPressIn={() => setChange(!Change)}
          value={TextValue}
          placeholder={label}
          style={[Styles.textInput]}
          autoCapitalize="none"
          secureTextEntry={security ? (IseyeOn ? true : false) : false}
          maxLength={maxLength}
        />
        {security && titleName === "Password" ? (
          <TouchableOpacity
            onPress={() => setIseyeOn(!IseyeOn)}
            style={{ alignSelf: "center", paddingRight: wp(3) }}
          >
            <Icon_1
              name={IseyeOn ? "eye-off" : "eye"}
              size={20}
              color={color.gray}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};
export default TextInputComponent;
