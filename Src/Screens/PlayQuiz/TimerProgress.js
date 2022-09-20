import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { wp, color } from "../../Components/CommonUtills/ThemeHelper";
import { ProgressBar, Colors } from "react-native-paper";

const TimerProgress = (props) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      timer();
    }, 1000);
  }, [value]);

  const timer = () => {
    if (value < 1) {
      setValue(value + 0.037);
    } else {
      // alert("Timeout");
      // props.navigation.navigate("DrawerTabs");
      props.onFinish();
    }
    // while (value >= 1) {
    //   setValue(0);
    // }
  };
  // console.log("value....", value);
  props.Second(value);
  return (
    <View>
      <ProgressBar
        progress={value}
        color={color.greenMint}
        style={Styles.ProgressBar}
      />
      {/* <Text>{value}</Text> */}
    </View>
  );
};

export default TimerProgress;

const Styles = StyleSheet.create({
  ProgressBar: {
    borderRadius: 100,
    height: wp(3.5),
    backgroundColor: color.white,
  },
});
