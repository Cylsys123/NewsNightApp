import React, { useState, useEffect, useContext } from "react";
import { GoogleSignin } from "react-native-google-signin";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import CheckBox from "react-native-checkbox";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import MainButton from "../../../Components/MainButton/MainButton";
import TextInput_Component from "../../../Components/TextInput_Component/TextInputComponent";
import {
  hp,
  wp,
  color,
  isANDROID,
  Loader,
} from "../../../Components/CommonUtills/ThemeHelper";
import Images from "../../../Assets/Images/Images";
import Logos from "../../../Assets/Logos/Logos";
import styles from "./Styles";
import LinkButton from "../../../Components/LinkButton/LinkButton";

import { AuthContext } from "../../../Firebase/AuthProvider";

const SignUp = (props) => {
  const [Name, setName] = useState("");
  const [EmailID, setEmailID] = useState(props?.route?.params?.userEmail || "");
  const [Mobile, setMobile] = useState("");
  const [Pass, setPass] = useState("");
  const [RePass, setRePass] = useState("");
  const [LoginStatus, setLoginStatus] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const ifLogin = props?.route?.params?.ifLogin;

  const [isFirstnameNull, setFirstNametextboxColor] = useState(false);
  const [isEmailIDNull, setisEmailIDNull] = useState(false);
  const [isMobileNull, setisMobileNull] = useState(false);
  const [isRePassNull, setisRePassNull] = useState(false);
  const [isPassNull, setisPassNull] = useState(false);
  const [error, seterror] = useState(false);
  const [PWerror, setPWerror] = useState(false);
  const [checked, setChecked] = useState(false);
  const [SecureText, setSecureText] = useState(true);

  const { register, googleSignUp, fbSignUp } = useContext(AuthContext);

  const Valid_Mail =
    /^([^<>()\[\]\\.,;:\s@"])+[a-zA-z0-9_\-\.]+[@][a-z]+[\.][a-z]{2,3}$/;

  console.log("By Login...", props?.route?.params?.ifLogin);
  console.log("userEmail...", props?.route?.params?.userEmail);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "725542603395-48q0btkeq17rhl5ckh5gdud5kq9h83au.apps.googleusercontent.com",
    });
  }, []);

  const handlegoogleSignUp = () => {
    if (Name != "" && EmailID != "" && Mobile != "" && checked == true) {
      googleSignUp(Name, Mobile);
      setLoginStatus(true);
      // alert("Please wait...");
      // props.navigation.navigate("SignIn");
      // console.log("going back to SignIn");
    } else {
      setLoginStatus(false);
      alert("Please fill out all required information");
    }
  };

  const handlefbSignUp = () => {
    if (Name != "" && EmailID != "" && Mobile != "" && checked == true) {
      fbSignUp(Name, Mobile, EmailID);
      // setLoginStatus(true);
      alert("Please wait...");
    } else {
      // setLoginStatus(false);
      alert("Please fill out all required information");
    }
  };

  const handleEmailSignUp = async () => {
    if (Name == "") {
      alert("Please enter name");
    } else if (EmailID == "") {
      alert("Please enter email");
    } else if (!Valid_Mail.test(String(EmailID).toLowerCase())) {
      alert("Invalid email address");
    } else if (Mobile == "") {
      alert("Please enter mobile number");
    } else if (Mobile.length < 10) {
      alert("Mobile Number must be in 10 digit");
    } else if (Pass == "") {
      alert("Please enter password");
    } else if (RePass == "") {
      alert("Please Re-enter password");
    } else if (Pass != RePass) {
      alert("Password doesn't match");
    } else if (checked == false) {
      alert("Please accept Terms & Conditions");
    } else {
      try {
        // register(EmailID, Pass, Name, Mobile);
        setLoginStatus(true);
        setLoading(true);
        // setTimeout(() => {
        //   setLoginStatus(false);
        //   props.navigation.navigate("SignIn");
        // }, 5000);
        // alert("Please wait..."
        await auth()
          .createUserWithEmailAndPassword(EmailID, Pass)
          .then(() => {
            firestore()
              .collection("Users")
              .doc(auth().currentUser.uid)
              .set({
                name: Name,
                mobile: Mobile,
                email: EmailID,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: "",
                TotalCoins: 100,
                CoinsLoopDate: 0,
                CoinsRequestDate: 0,
                CoinsRequested: 0,
                isRequestCoin: false,
                timesCoinCredit: 0,
                TermsConditions: "Accepted",
              })
              .then(async () => {
                alert("User Registered successfully");
                setLoading(false);
                setLoginStatus(false);
                await auth()
                  .signOut()
                  .then(() => {
                    props.navigation.navigate("SignIn");
                  });
              })
              .catch((error) => {
                setLoading(false);
                setLoginStatus(false);
                console.log(
                  "Something went wrong with added user to firestore: ",
                  error
                );
                alert(
                  "Something went wrong with added user to firestore: " + error
                );
              });
          })
          .catch((error) => {
            setLoading(false);
            setLoginStatus(false);
            console.log("Something went wrong with sign up: " + error);
            alert("Something went wrong with sign up: " + error);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
        setLoginStatus(true);
      }
    }
  };

  const getName = (data) => {
    if (data == "") {
      setName(data);
      setFirstNametextboxColor(true);
      console.log("name1", data);
    } else {
      setName(data);
      setFirstNametextboxColor(false);
      console.log("name2", data);
    }
  };

  const getEmailID = (data) => {
    if (!Valid_Mail.test(String(data).toLowerCase())) {
      seterror(true);
      setisEmailIDNull(true);
    } else {
      seterror(false);
      setisEmailIDNull(false);
    }
    console.log("email", data);
    setEmailID(data);
  };

  const getMobile = (data) => {
    if (data == "" || data == null) {
      setMobile(data);
      setisMobileNull(true);
    } else {
      setMobile(data);
      setisMobileNull(false);
    }
  };

  const getPassword = (data) => {
    if (data == "") {
      setPass(data);
      setisPassNull(true);
    } else {
      setPass(data);
      setisPassNull(false);
    }
  };

  const getRePassword = (data) => {
    let password = Pass;
    if (data == "") {
      setRePass(data);
      setisRePassNull(true);
      console.log("re-pass is null");
    } else if (data !== Pass) {
      setRePass(data);
      setisRePassNull(true);
      setPWerror(true);
      console.log("re-pass is not matching");
    } else {
      setPWerror(false);
      setisRePassNull(false);
      setRePass(data);
      console.log("re-pass is matching");
    }
  };

  // const welcome = () => {
  //   props.navigation.navigate("SignIn");
  //   console.log("going back to SignIn");
  // };

  const gotoSignIN = () => {
    props.navigation.navigate("SignIn");
  };

  return (
    <ImageBackground source={Images.Background} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.MainView}>
          <Text style={styles.HeadTxt}>Sign Up</Text>

          <TextInput_Component
            titleName="Name"
            TextValue={Name}
            getValue={(text) => getName(text.replace(/[^a-zA-Z_ ]/g, ""))}
            error={isFirstnameNull}
          />

          <TextInput_Component
            titleName="Email Id"
            TextValue={EmailID}
            getValue={getEmailID}
            error={isEmailIDNull}
          />
          {error ? (
            <Text style={{ color: color.redTheme }}>
              Enter a valid email address
            </Text>
          ) : null}

          <TextInput_Component
            titleName="Mobile Number"
            TextValue={Mobile}
            maxLength={10}
            getValue={(text) => getMobile(text.replace(/[^0-9]/g, ""))}
            error={isMobileNull}
          />
          {ifLogin == 1 ? null : (
            <>
              <TextInput_Component
                titleName="Password"
                TextValue={Pass}
                getValue={getPassword}
                error={isPassNull}
                security
              />

              <TextInput_Component
                titleName="Re-enter Password"
                security
                TextValue={RePass}
                getValue={getRePassword}
                error={isRePassNull}
              />
              {PWerror ? (
                <Text style={{ color: color.redTheme }}>
                  Password is not matching
                </Text>
              ) : null}
            </>
          )}

          <View style={{ flexDirection: "row", marginTop: hp(2) }}>
            <TouchableOpacity
              onPress={() => setChecked(!checked)}
              style={{
                alignSelf: "center",
                flexDirection: "row",
                marginHorizontal: wp(1),
              }}
            >
              <Icon_1
                name={
                  checked ? "checkbox-marked-outline" : "checkbox-blank-outline"
                }
                size={25}
                color={color.blackTheme}
              />
            </TouchableOpacity>
            <Text style={{ alignSelf: "center", color: color.blackTheme }}>
              {" "}
              I agree with{" "}
              <Text
                style={{ color: color.linkblue }}
                onPress={() => {
                  props.navigation.navigate('TermsAndConditions');
                }}
              >
                Terms & Conditions
              </Text>
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <MainButton
              // btnName={"Sign Up"}
              btnName={LoginStatus ? "Registering..." : "Sign Up"}
              disabled={LoginStatus || ifLogin == 1 ? true : false}
              action={() => handleEmailSignUp()}
              // action={() => handleSignUP()}
              btntextColor={color.white}
              btnColor={color.blueTheme}
              // btnColor={
              //   LoginStatus || ifLogin == 1 ? color.gray : color.blueTheme
              // }
              fontSize={18}
            />
          </View>
          <View style={styles.OtherView}>
            <View style={styles.Line} />

            <Text style={styles.TxtOther}>Sign Up with Other</Text>

            <View style={styles.Line} />
          </View>
          <View style={styles.IconView}>
            <TouchableOpacity
              disabled={LoginStatus ? true : false}
              onPress={() => handlefbSignUp()}
            >
              <Icon_1 name="facebook" color={color.blackTheme} size={35} />
            </TouchableOpacity>
            <View style={{ marginHorizontal: wp(5) }} />
            <TouchableOpacity
              disabled={LoginStatus ? true : false}
              onPress={() => handlegoogleSignUp()}
              style={styles.iconContainer}
            >
              <Icon_1
                name="google"
                color={color.white}
                size={20}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.SignINView}>
            <Text style={styles.SignINtxt}>Already have an account?{"  "}</Text>
            <LinkButton
              action={gotoSignIN}
              linkName="Sign In"
              linktextColor={color.linkblue}
            />
          </View>
        </View>
        <View style={{ height: hp(10) }} />
        {isLoading ? (
          <View style={styles.Loader}>
            <Loader visible={isLoading} />
          </View>
        ) : null}
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  other: {
    fontSize: 20,
  },
});
