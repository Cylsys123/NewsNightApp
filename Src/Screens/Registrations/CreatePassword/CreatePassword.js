import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import MainButton from "../../../Components/MainButton/MainButton";
import TextInput_Content from "../../../Components/TextInput_Component/TextInputComponent";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";
import Logos from "../../../Assets/Logos/Logos";
import Images from "../../../Assets/Images/Images";
import styles from "./Styles";

const CreatePassword = (props) => {
  const [NewPass, setNewPass] = useState("");
  const [Confirm, setConfirm] = useState("");
  const [SecureText, setSecureText] = useState(true);
  const [PWerror, setPWerror] = useState(false);
  const [isPassNull, setisPassNull] = useState(false);
  const [isConfirmNull, setisConfirmNull] = useState(false);

  const getNewPass = (data) => {
    if (data == "") {
      setisPassNull(true);
      setNewPass(data);
    } else {
      setisPassNull(false);
      setNewPass(data);
    }
  };

  const getConfirm = (data) => {
    if (data == "") {
      setConfirm(data);
      setisConfirmNull(true);
      console.log("confirm-pass is null");
    } else if (data !== NewPass) {
      setConfirm(data);
      setisConfirmNull(true);
      setPWerror(true);
      console.log("confirm-pass is not matching");
    } else {
      setPWerror(false);
      setisConfirmNull(false);
      setConfirm(data);
      console.log("confirm-pass is matching");
    }
  };

  const gotoSignIn = () => {
    props.navigation.navigate("SignIn");
  };
  const [position, setposition] = useState(new Animated.ValueXY({ x: -250, y: 0 }));
  Animated.timing(position, {
    toValue: { x: 0, y: 0 },
    duration: 1000,
    useNativeDriver: true,

  }).start();

  return (
    <ImageBackground
      source={Images.Background}
      imageStyle={{ resizeMode: "stretch" }}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Animated.View style={[styles.Animation,
          // transform: [{ translateX: position.x }, { translateY: position.y }],
        ]}>
          <Image source={Logos.Logo} style={styles.Img} />
        </Animated.View>

        <View style={styles.MainView}>
          <View style={{ marginTop: hp(8) }} />
          <Text style={[styles.HeadTxt, {}]}>Create Password</Text>
          <Text style={{ letterSpacing: 0.8 }}>
            Create new password and signIn again
          </Text>

          <View style={{ marginTop: hp(3) }} />
          <TextInput_Content
            titleName="Password"
            TextValue={NewPass}
            getValue={getNewPass}
            security
            error={isPassNull}
          />

          <TextInput_Content
            titleName="Confirm Password"
            TextValue={Confirm}
            getValue={getConfirm}
            security
            error={isConfirmNull}
          />
          {PWerror ? (
            <Text style={{ color: color.redTheme }}>
              Password is not matching
            </Text>
          ) : null}

          <View style={{ marginTop: hp(3) }} />
          <MainButton
            btnName="Save"
            action={gotoSignIn}
            btntextColor={color.white}
            btnColor={color.blueTheme}
            fontSize={18}
          />
        </View>
        <View style={{ height: hp(40) }} />
      </ScrollView>
    </ImageBackground>
  );
};

export default CreatePassword;

const Styles = StyleSheet.create({
  other: {
    fontSize: 20,
  },
});
