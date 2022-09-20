import React, { useState, useEffect } from "react";
import { View, Text, Modal, StyleSheet, Image } from "react-native";
import { hp, wp, color, isANDROID } from "../CommonUtills/ThemeHelper";
import MainButton from "../MainButton/MainButton";
import Images from "../../Assets/Images/Images";

const PlaceBetMsg = (props) => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.onClose}
      animationType="slide"
      transparent={true}
    >
      <View
        style={[
          Styles.ModalView,
          isANDROID ? Styles.ModalViewAndroid : Styles.ModalViewiOS,
        ]}
      >
        <Image
          source={Images.Thumb}
          style={{ height: wp(15), width: wp(15), resizeMode: "contain" }}
        />
        <Text
          style={{
            fontSize: 18,
            color: color.greenMint,
            marginVertical: wp(3),
            fontWeight: "bold",
          }}
        >
          Awesome !
        </Text>
        <Text
          style={{
            color: color.blackTheme,
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
            marginHorizontal: wp(5),
          }}
        >
          Your bet has been successfully placed
        </Text>
        <View style={{ alignSelf: "stretch", marginHorizontal: wp(5) }}>
          <MainButton
            btnName={"Close"}
            action={props.onClose}
            borderColor={color.greenMint}
            borderWidth={0.5}
            btntextColor={color.white}
            btnColor={color.greenMint}
            fontSize={18}
          />
        </View>
      </View>
    </Modal>
  );
};
export default PlaceBetMsg;

const Styles = StyleSheet.create({
  ModalView: {
    backgroundColor: color.white,
    position: "absolute",
    borderRadius: 10,
    padding: wp(5),
    top: hp(40),
    // bottom: hp(35),
    marginHorizontal: hp(6),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  ModalViewAndroid: { elevation: 10 },
  ModalViewiOS: {
    shadowColor: color.blackTheme,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
  },
});
