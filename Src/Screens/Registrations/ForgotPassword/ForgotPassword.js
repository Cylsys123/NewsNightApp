import React, { useState, useEffect, useContext } from "react";
import {
  ImageBackground,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "../../../Firebase/AuthProvider.js";
import MainButton from "../../../Components/MainButton/MainButton";
import TextInputComponent from "../../../Components/TextInput_Component/TextInputComponent";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../../Components/CommonUtills/ThemeHelper";
import Logos from "../../../Assets/Logos/Logos";
import Images from "../../../Assets/Images/Images";
import Styles from "./ForgotPassword_Style";

const ForgotPassword = (props) => {
  const { user, forgotPassword } = useContext(AuthContext);
  const [ForgotPass, setForgotPass] = useState("");
  // const [PWerror,setPWerror]=useState(false);
  const [isPWerror, setisPWerror] = useState(false);
  const [LoginStatus, setLoginStatus] = useState(false);
  const [NavData, setNavData] = useState({});

  // const signInWithPhoneNumber = async (ForgotPass) => {
  //   try {
  //     // const confirmation = await auth().verifyPhoneNumber(ForgotPass);
  //     const confirmation = await auth().signInWithPhoneNumber(ForgotPass);
  //     getEmailID(confirmation);
  //     welcome(confirmation);
  //   } catch (e) {
  //     console.log(e);
  //     alert(e);
  //   }
  // };

  const getEmailID = (data) => {
    if (data == "" || data === null) {
      setisPWerror(true);
      setForgotPass(data);
    } else {
      setisPWerror(false);
      setForgotPass(data);
    }
    console.log("EmailID", data);
  };

  const welcome = (phoneNumber) => {
    if (ForgotPass && ForgotPass.length > 9) {
      props.navigation.navigate("Verification", { phoneNumber });
      console.log("going for Verification", phoneNumber);
    } else {
      alert("Please enter 10 digit mobile number");
    }
  };
  // console.log("setNavData", NavData);

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
            <Text style={[Styles.HeadTxt, {}]}>Forgot Password</Text>

            <View style={{ height: hp(3) }} />
            <TextInputComponent
              titleName="Enter your registered email ID to reset password"
              // titleName="Enter your registered mobile number to receive verification code"
              TextValue={ForgotPass}
              getValue={getEmailID}
              error={isPWerror}
            />
            <View style={{ height: hp(1) }} />
            {/* this view is just for adjusting width of Button */}
            <MainButton
              btnName={LoginStatus ? "Mail Sent..." : "Send"}
              disabled={LoginStatus ? true : false}
              btnColor={color.blueTheme}
              btntextColor={color.white}
              // action={() => welcome()}
              action={() => {
                // signInWithPhoneNumber("+91" + ForgotPass);
                // welcome("+91" + ForgotPass);
                setLoginStatus(true);
                forgotPassword(ForgotPass);
                // Alert.alert(
                //   "Please check your email: " + ForgotPass,
                //   "Reset Password link has been sent to this email",
                //   {
                //     text: "OK",
                //     // onPress: () => props.navigation.navigate("SignIn"),
                //   }
                // );
                // props.navigation.navigate("SignIn");

                Alert.alert(
                  "Please check your email: " + ForgotPass,
                  "Reset Password link has been sent to this email"
                );
              }}
              fontSize={18}
            />
          </View>
          <View style={{ height: hp(40) }} />
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default ForgotPassword;
