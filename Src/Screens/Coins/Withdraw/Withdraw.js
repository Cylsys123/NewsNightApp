import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../../Components/TopBar/TopBar";

const Withdraw = (props) => {
  const openDrawer = () => {
    // props.navigation.openDrawer();
    props.navigation.pop();
  };

  return (
    <>
      <TopBar back={openDrawer} title="Withdraw" rightNull Ctitle />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 23, fontWeight: "bold" }}>Withdraw</Text>
      </View>
    </>
  );
};

export default Withdraw;
