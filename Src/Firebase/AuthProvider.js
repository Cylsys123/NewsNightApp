import React, { createContext, useState, useEffect } from "react";
import { View, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "react-native-google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { Loader } from "../Components/CommonUtills/ThemeHelper";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [confirm, setConfirm] = useState(null);
  // const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "725542603395-48q0btkeq17rhl5ckh5gdud5kq9h83au.apps.googleusercontent.com",
  //   });
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password, response, error) => {
          setLoading(true);
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then((resp) => {
                setLoading(false);
              })
              .catch((e) => {
                setLoading(false);
                console.log(e);
                switch (e) {
                  case "auth/email-already-in-use":
                    alert("Email already in use !");
                  case "auth/invalid-email":
                    alert("The email address is badly formatted !");
                  default:
                    alert("Please enter correct email and Password !");
                }
              });
          } catch (e) {
            setLoading(false);
            console.log(e);
            // alert(e.code);
            // alert(e.message);
          }
        },
        googleLogin: async () => {
          setLoading(true);
          try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
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
                    // CoinsLoopDate: 0,
                    CoinsRequestDate: 0,
                    CoinsRequested: 0,
                    isRequestCoin: false,
                    timesCoinCredit: 0,
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
        },
        googleSignUp: async (name, mobile) => {
          setLoading(true);
          try {
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential =
              auth.GoogleAuthProvider.credential(idToken);
            await auth()
              .signInWithCredential(googleCredential)
              .then(() => {
                setLoading(false);
                firestore()
                  .collection("Users")
                  .doc(auth().currentUser.uid)
                  .set({
                    name: name,
                    mobile: mobile,
                    email: auth().currentUser.email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: "",
                    TotalCoins: 100,
                    CoinsLoopDate: 0,
                    CoinsRequestDate: 0,
                    CoinsRequested: 0,
                    isRequestCoin: false,
                    timesCoinCredit: 0,
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
                setLoading(false);
                console.log("Something went wrong with sign up: ", error);
                alert("Please fill out all required information");
              });
          } catch (error) {
            setLoading(false);
            console.log({ error });
          }
        },
        fbLogin: async (name, mobile, email) => {
          try {
            const result = await LoginManager.logInWithPermissions([
              "public_profile",
              "email",
              "user_friends",
            ]);

            if (result.isCancelled) {
              throw "User cancelled the login process";
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
              throw "Something went wrong obtaining access token";
            }
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            await auth()
              .signInWithCredential(facebookCredential)
              .then(() => {
                firestore()
                  .collection("Users")
                  .doc(auth().currentUser.uid)
                  .set({
                    name: name,
                    mobile: mobile,
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: "",
                    TotalCoins: 100,
                    CoinsLoopDate: 0,
                    CoinsRequestDate: 0,
                    CoinsRequested: 0,
                    isRequestCoin: false,
                    timesCoinCredit: 0,
                  })
                  .catch((error) => {
                    setLoading(false);
                    console.log(
                      "Something went wrong with added user to firestore: ",
                      error
                    );
                  });
              });
          } catch (e) {
            console.log(e);
          }
        },
        fbSignUp: async (name, mobile, email) => {
          try {
            const result = await LoginManager.logInWithPermissions([
              "public_profile",
              "email",
              "user_friends",
            ]);

            if (result.isCancelled) {
              throw "User cancelled the login process";
            }
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
              throw "Something went wrong obtaining access token";
            }
            const facebookCredential = auth.FacebookAuthProvider.credential(
              data.accessToken
            );
            await auth()
              .signInWithCredential(facebookCredential)
              .then(() => {
                firestore()
                  .collection("Users")
                  .doc(auth().currentUser.uid)
                  .set({
                    name: name,
                    mobile: mobile,
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: "",
                    TotalCoins: 100,
                    CoinsLoopDate: 0,
                    CoinsRequestDate: 0,
                    CoinsRequested: 0,
                    isRequestCoin: false,
                    timesCoinCredit: 0,
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
                setLoading(false);
                console.log("Something went wrong with sign up: ", error);
                alert("Please fill out all required information");
              });
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, name, mobile) => {
          setLoading(true);
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                setLoading(false);
                firestore()
                  .collection("Users")
                  .doc(auth().currentUser.uid)
                  .set({
                    name: name,
                    mobile: mobile,
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: "",
                    TotalCoins: 100,
                    CoinsLoopDate: 0,
                    CoinsRequestDate: 0,
                    CoinsRequested: 0,
                    isRequestCoin: false,
                    timesCoinCredit: 0,
                  })
                  .then(async () => {
                    await auth().signOut();
                    alert("User Registered successfully");
                  })
                  .catch((error) => {
                    setLoading(false);
                    console.log(
                      "Something went wrong with added user to firestore: ",
                      error
                    );
                    alert(
                      "Something went wrong with added user to firestore: " +
                        error
                    );
                  });
              })
              .catch((error) => {
                setLoading(false);
                console.log("Something went wrong with sign up: " + error);
                alert("Something went wrong with sign up: " + error);
              });
          } catch (e) {
            setLoading(false);
            console.log(e);
          }
        },
        loginWithPhone: async (phoneNumber) => {
          try {
            // const confirmation = await auth().verifyPhoneNumber(ForgotPass);
            const confirmation = await auth().signInWithPhoneNumber(
              phoneNumber
            );
            // .then(() => {
            //   firestore()
            //     .collection("Users")
            //     .doc(auth().currentUser.uid)
            //     .set({
            //       name: "",
            //       mobile: phoneNumber,
            //       email: "",
            //       createdAt: firestore.Timestamp.fromDate(new Date()),
            //       userImg: "",
            //       TotalCoins: 50,
            // CoinsLoopDate: 0,
            //         CoinsRequestDate: 0,
            //         CoinsRequested: 0,
            //         isRequestCoin: false,
            //         timesCoinCredit: 0,
            //     })
            //     .catch((error) => {
            //       console.log(
            //         "Something went wrong with added user to firestore: ",
            //         error
            //       );
            //       alert(
            //         "Something went wrong with added user to firestore: " +
            //           error
            //       );
            //     });
            // });
            setConfirm(confirmation);
          } catch (e) {
            console.log(e);
            alert(e);
          }
        },
        confirmCode: async (otpCode) => {
          try {
            const credential = auth.PhoneAuthProvider.credential(
              confirm.verificationId,
              otpCode
            );
            console.log("confirm.verificationId,", confirm.verificationId);
            const userData = await auth().currentUser.linkWithCredential(
              credential
            );
            setUser(userData.user);
            console.log("userData...", userData.user);
          } catch (error) {
            if (error.code == "auth/invalid-verification-code") {
              console.log("Invalid code.");
            } else {
              console.log("Account linking error");
            }
          }
        },
        forgotPassword: async (Email) => {
          setLoading(true);
          try {
            await auth()
              .sendPasswordResetEmail(Email)
              .then(() => {
                setLoading(false);
              });
          } catch (e) {
            setLoading(false);
            console.log(e);
          }
        },
        logout: async () => {
          setLoading(true);
          try {
            await auth()
              .signOut()
              .then(() => {
                setLoading(false);
                // this.props.navigation.toggleDrawer();
              });
          } catch (e) {
            setLoading(false);
            console.log(e);
            alert(e);
          }
        },
        // updateProfile: async (update) => {
        //   try {
        //     await auth().updateProfile(update);
        //     alert("Profile upadated");
        //   } catch (e) {
        //     console.log(e);
        //     alert(e);
        //   }
        // },
      }}
    >
      {children}
      {isLoading ? (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader visible={isLoading} />
        </View>
      ) : null}
    </AuthContext.Provider>
  );
};
