import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Button,
  TextInput,
} from "react-native";
// import CheckBox from "react-native-checkbox";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import { GoogleSignin } from "react-native-google-signin";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useSelector } from "react-redux";
import MainButton from "../../../Components/MainButton/MainButton";
import TextInputComponent from "../../../Components/TextInput_Component/TextInputComponent";
import LinkButton from "../../../Components/LinkButton/LinkButton";
import {
  hp,
  wp,
  color,
  isANDROID,
  Loader,
} from "../../../Components/CommonUtills/ThemeHelper";
import Logos from "../../../Assets/Logos/Logos";
import Images from "../../../Assets/Images/Images";
import Styles from "./Styles";
import languageJson from "../../../Rtl/en.json";
import { showAlert, closeAlert } from "react-native-customisable-alert";
import { CommonActions } from "@react-navigation/native";
import { AuthContext } from "../../../Firebase/AuthProvider";
import moment from "moment";

const SignIn = (props) => {
  const [EmailId_Mobile, setEmailId_Mobile] = useState("");
  const [Pass, setPass] = useState("");
  const [LoginStatus, setLoginStatus] = useState(false);

  const [isTextNull, setisTextNull] = useState(false);
  const [isPassNull, setisPassNull] = useState(false);
  const [ErrorText, setErrorText] = useState(false);
  const [SecureText, setSecureText] = useState(true);
  const [isLoading, setLoading] = useState(false);

  // const languageJson = useSelector(
  //   (state) => state.Language.languageJson.SignIn_Screen,
  // );
  // const languageJson = useSelector(
  //   languageJson.SignIn_Screen,
  // );
  const todayC = moment(new Date()).format("YYYYMMDD");

  const { emailResp, user, login, googleLogin, fbLogin } =
    useContext(AuthContext);

  // console.log("emailResp", emailResp);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "725542603395-48q0btkeq17rhl5ckh5gdud5kq9h83au.apps.googleusercontent.com",
    });
  }, []);

  const gotoSignUP = () => {
    props.navigation.navigate("SignUp");
  };

  const getEmailID = (data) => {
    if (data == "" || data == null) {
      setisTextNull(true);
      setEmailId_Mobile(data);
    } else {
      setisTextNull(false);
      setEmailId_Mobile(data);
    }
  };

  const getPassword = (data) => {
    if (data == "" || data == null) {
      setisPassNull(true);
      setPass(data);
    } else {
      setisPassNull(false);
      setPass(data);
    }
  };

  const isforget = () => {
    props.navigation.navigate("ForgotPassword");
    console.log("Going to ForgotPassword");
  };

  const emailLogIn = async () => {
    setLoading(true);
    setLoginStatus(true);
    if (EmailId_Mobile != "" && Pass != "") {
      try {
        await auth()
          .signInWithEmailAndPassword(EmailId_Mobile, Pass)
          .then(() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "AppStack" }],
              })
            );
            setLoginStatus(false);
            setLoading(false);
          })
          .catch((e) => {
            setLoginStatus(false);
            setLoading(false);
            console.log(e);
            switch (e) {
              case "auth/email-already-in-use":
                alert("Email already in use !");
              case "auth/invalid-email":
                alert("The email address is badly formatted !");
              case "auth/user-not-found":
                alert("User not registered !");
              default:
                alert("Please enter correct email and Password !");
            }
          });
      } catch (err) {
        console.log(err);
        // alert(e.code);
        // alert(e.message);
      }
      // try {
      //   login(EmailId_Mobile, Pass).then(() => {
      //     console.log("................", Resp);
      //     if (Resp != null) {
      //       // props.navigation.dispatch(
      //       //   CommonActions.reset({
      //       //     index: 0,
      //       //     routes: [{ name: "DrawerTabs" }],
      //       //   })
      //       // );
      //       props.navigation.navigate("DrawerTabs");
      //     }
      //   });
      //   setLoginStatus(true);
      //   setTimeout(() => {
      //     console.log("................", Resp);
      //     setLoginStatus(false);
      //     if (Resp != null) {
      //       props.navigation.navigate("DrawerTabs");
      //     }
      //   }, 8000);
      // } catch (e) {
      //   setLoginStatus(false);
      // }
    } else {
      setLoginStatus(false);
      alert("Please fill out all required information");
    }
  };

  const gotoGoogleLogIn = async () => {
    // googleLogin();
    setLoginStatus(true);
    setLoading(true);
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          setLoading(false);
          firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .set({
              name: auth().currentUser.displayName,
              mobile: "1234567890",
              email: auth().currentUser.email,
              createdAt: firestore.Timestamp.fromDate(new Date()),
              userImg: "",
              TotalCoins: 100,
              CoinsLoopDate: todayC,
              CoinsRequestDate: 0,
              CoinsRequested: 0,
              isRequestCoin: false,
              timesCoinCredit: 0,
            })
            .then(() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "AppStack" }],
                })
              );
              setLoginStatus(false);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.log(
                "Something went wrong with added user to firestore: ",
                error
              );
              alert("Please fill out all required information");
            });
        })
        .catch((error) => {
          console.log("Something went wrong with sign up: ", error);
          setLoading(false);
        });
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const gotoFacebookLogIn = () => {
    fbLogin();
    // alert("Please wait...");
    setLoginStatus(true);
    // props.navigation.navigate("FacebookLogIn");
  };

  const [position, setposition] = useState(
    new Animated.ValueXY({ x: -250, y: 0 })
  );
  Animated.timing(position, {
    toValue: { x: 0, y: 0 },
    duration: 2000,
    useNativeDriver: true,
  }).start();

  return (
    <>
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ resizeMode: "stretch" }}
        source={Images.Background}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View
            style={[
              Styles.Animation,
              // { transform: [
              //     { translateX: position.x },
              //     { translateY: position.y },
              //   ],
              // },
            ]}
          >
            <Image source={Logos.Logo} style={Styles.Img} />
          </Animated.View>
          <View style={Styles.MainView}>
            <View style={{ marginTop: hp(8) }} />
            <Text style={[Styles.HeadTxt, {}]}>
              {languageJson.SignIn_Screen.HeadText}
            </Text>

            <View style={{ height: hp(3) }} />
            <TextInputComponent
              titleName="Email Id"
              TextValue={EmailId_Mobile}
              getValue={getEmailID}
              error={isTextNull}
            />
            <TextInputComponent
              titleName="Password"
              TextValue={Pass}
              getValue={getPassword}
              security
              error={isPassNull}
            />

            <View style={{ marginTop: hp(1), alignSelf: "flex-start" }}>
              <LinkButton
                action={() => isforget()}
                linkName="Forgot Password?"
                linktextColor={color.linkblue}
              />
            </View>

            {/* <View style={{ }}> */}

            <MainButton
              btnName={LoginStatus ? "Logging In..." : "Login"}
              disabled={LoginStatus ? true : false}
              action={() => emailLogIn()}
              btntextColor={color.white}
              btnColor={LoginStatus ? color.gray : color.blueTheme}
              fontSize={18}
            />

            {/* <MainButton
              btnName="Login"
              action={emailLogIn}
              btntextColor={color.white}
              btnColor={color.blueTheme}
              fontSize={18}
            /> */}
            {/* </View> */}
            <View style={Styles.OtherView}>
              <View style={Styles.Line} />
              <Text style={Styles.TxtOther}>Sign in with Other</Text>
              <View style={Styles.Line} />
            </View>
            <View style={Styles.IconView}>
              <TouchableOpacity
                disabled={LoginStatus ? true : false}
                onPress={gotoFacebookLogIn}
              >
                <Icon_1 name="facebook" color={color.blackTheme} size={35} />
              </TouchableOpacity>
              {/* <View>
                <Button
                  title="Custom Animation Alert"
                  onPress={() =>
                    showAlert({
                      // title: 'Something went wrong!',
                      message: "You have lost all your data, sorry!",
                      animationIn: "tada",
                      animationOut: "zoomOut",
                    })
                  }
                />
              </View> */}

              <View style={{ marginHorizontal: wp(8) }} />
              <TouchableOpacity
                onPress={gotoGoogleLogIn}
                disabled={LoginStatus ? true : false}
                style={Styles.iconContainer}
              >
                <Icon_1
                  name="google"
                  color={color.white}
                  size={20}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.SignUpView}>
              <Text style={Styles.SignUptxt}>Don't have an account? </Text>
              <LinkButton
                action={() => gotoSignUP()}
                linkName="Sign UP"
                linktextColor={color.linkblue}
              />
            </View>
          </View>
          <View style={{ height: hp(5) }} />
          {isLoading ? (
            <View style={Styles.Loader}>
              <Loader visible={isLoading} />
            </View>
          ) : null}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SignIn;
