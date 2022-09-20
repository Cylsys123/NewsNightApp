import React, { useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import { ImageBackground, View, Text, Image, ScrollView } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { AuthContext } from "../../../Firebase/AuthProvider";
import MainButton from "../../../Components/MainButton/MainButton";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";
import Logos from "../../../Assets/Logos/Logos";
import Images from "../../../Assets/Images/Images";
import Styles from "./Style";
import LinkButton from "../../../Components/LinkButton/LinkButton";

const Verification = (props) => {
  const [otpCode, setOtpCode] = useState("");
  const { user, setUser, loginWithPhone } = useContext(AuthContext);
  const [confirm, setConfirm] = useState(null);

  const phoneNumber = props.route.params.phoneNumber;

  const gotoCreatePassword = () => {
    props.navigation.navigate("CreatePassword");
    console.log("welcome to gotoCreatePassword");
  };

  console.log("ForgotData", phoneNumber);
  // console.log("verificationId", props.route.params.data.verificationId);

  useEffect(() => {
    signInWithPhoneNumber();
    // loginWithPhone(phoneNumber);
  }, []);

  const signInWithPhoneNumber = async () => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    // alert(JSON.stringify(confirmation));
  };

  const confirmCode = async () => {
    //   // try {
    //   //   const credential = auth.PhoneAuthProvider.credential(
    //   //     confirm.verificationId,
    //   //     otpCode
    //   //   );
    //   //   console.log("confirm.verificationId,", confirm.verificationId);
    //   //   const userData = await auth().currentUser.linkWithCredential(credential);
    //   //   setUser(userData.user);
    //   //   console.log("userData...", userData.user);
    //   // } catch (error) {
    //   //   if (error.code == "auth/invalid-verification-code") {
    //   //     console.log("Invalid code.");
    //   //   } else {
    //   //     console.log("Account linking error");
    //   //   }
    //   // }
    try {
      const response = await confirm.confirm(otpCode);
      // if (response) {
      //   props.navigation.navigate("CreatePassword");
      // }
      // alert(JSON.stringify(response));
      setConfirm(null);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  return (
    <>
      <ImageBackground
        source={Images.Background}
        style={{ flex: 1 }}
        imageStyle={{ resizeMode: "stretch" }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.imgContainer}>
            <Image source={Logos.Logo} style={Styles.imgStyle} />
          </View>

          <View style={Styles.mainView}>
            <View style={{ marginTop: hp(8) }} />
            <Text style={[Styles.HeadTxt, {}]}>Verification</Text>

            <View style={{ marginTop: hp(3) }} />
            {/* <View style={{ flexDirection: 'row', flex: 1, }}> */}
            <Text
              style={{
                color: color.blackTheme,
                fontSize: 14,
                letterSpacing: 0.5,
              }}
            >
              Please enter 6 digit code sent to{" "}
              <Text
                onPress={() => console.log("vhv vhjv gig")}
                style={{ color: color.blue }}
              >
                {/* shubham@gmail.com */}
                {props.route.params.data}
              </Text>
            </Text>
            {/* </View> */}
            <OTPInputView
              style={Styles.otpStyle}
              pinCount={6}
              autoFocusOnLoad
              codeInputFieldStyle={Styles.underlineStyleBase}
              codeInputHighlightStyle={Styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
              code={otpCode}
              onCodeChanged={(code) => {
                setOtpCode(code);
              }}
            />
            <View style={{ height: hp(1) }} />
            <MainButton
              btnName="Verify"
              btnColor={color.blueTheme}
              btntextColor={color.white}
              // action={() => gotoCreatePassword()}
              action={() => confirmCode(otpCode)}
              fontSize={18}
            />
            <View style={{ height: hp(40) }} />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Verification;
