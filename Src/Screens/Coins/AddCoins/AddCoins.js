import React, { useState, useEffect } from "react";
import { TextInput, View, Text, TouchableOpacity, Image } from "react-native";
import VirtualKeyboard from "react-native-virtual-keyboard";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import MainButton from "../../../Components/MainButton/MainButton";
import {
  hp,
  color,
  isANDROID,
  Loader,
} from "../../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../../Components/TopBar/TopBar";
import Icons from "../../../Assets/Icons/Icons";
import Styles from "./Styles";
import { toNumber } from "lodash";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

const AddCoins = (props) => {
  const [userData, setUserData] = useState({});
  const [dynamicValue, setDynamicValue] = useState(0);
  const [Coins, setCoins] = useState();
  const [rqstedStatus, setRqstedSatus] = useState(false);
  const [rqstDate, setRqstDate] = useState();
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const today = moment(new Date()).format("YYYYMMDDhh");

  console.log(today);

  const BtnValue100 = () => {
    var a = toNumber(dynamicValue);
    setDynamicValue(a + 100);
  };
  const BtnValue200 = () => {
    var a = toNumber(dynamicValue);
    setDynamicValue(a + 20);
  };
  const BtnValue500 = () => {
    var a = toNumber(dynamicValue);
    setDynamicValue(a + 50);
  };

  const getUser = async () => {
    setLoading(true);
    await firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setUserData(userDetails);
        setCoins(userDetails.TotalCoins);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
    // RequestSuccess();
  }, [isFocused]);

  const updateCoins = (data) => {
    var a = toNumber(dynamicValue);
    setCoins(a + data);
    return a + data;
  };
  var coinss = toNumber(dynamicValue);

  const RaiseRqstBtn = async (data) => {
    // console.log("data......", data);
    // let coinss = await updateCoins(data);
    // console.log("coinss", coinss);
    setLoading(true);
    if (userData.isRequestCoin == false) {
      if (dynamicValue != 0 || "") {
        if (dynamicValue <= 100) {
          firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .update({
              CoinsRequestDate: today,
              isRequestCoin: true,
              CoinsRequested: coinss,
            })
            .then(() => {
              alert(dynamicValue + " coins requested");
              setLoading(false);
              setRqstedSatus(true);
            })
            .catch((error) => {
              setLoading(false);
              console.log("Something went wrong with requested Coins: ", error);
              alert("Something went wrong with requested Coins: " + error);
            });
        } else {
          alert("You can request only 100 coins once a day");
          setLoading(false);
        }
      } else {
        alert("Please enter some value");
        setLoading(false);
      }
    } else {
      setLoading(false);
      alert("You have already Requested");
    }
  };

  // const RequestSuccess = () => {
  //   var rqsD = toNumber(rqstDate);
  //   var rqsDate = rqsD + 100;
  //   if (today <= rqsDate && userData.isRequestCoin == true) {
  //     try {
  //       firestore()
  //         .collection("Users")
  //         .doc(auth().currentUser.uid)
  //         .update({
  //           TotalCoins: Coins + rqstedCoins,
  //           isRequestCoin: false,
  //           CoinsRequested: 0,
  //           CoinsRequestDate: 0,
  //         })
  //         .then(() => {
  //           alert(
  //             "Your requested " +
  //               dynamicValue +
  //               " coins has added in your Reward Coins"
  //           );
  //           setLoading(false);
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           console.log("Something went wrong with add Coins: ", error);
  //           alert("Something went wrong with add Coins: " + error);
  //         });
  //       firestore()
  //         .collection("Users")
  //         .doc(auth().currentUser.uid)
  //         .collection("History")
  //         .add({
  //           createdAt: NewDate,
  //           createdTime: firestore.Timestamp.fromDate(new Date()),
  //           onDate: today,
  //           Amount: dynamicValue,
  //           Credit: true,
  //           Remark: "Requested Coin",
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //           console.log(
  //             "Something went wrong with added History to firestore: ",
  //             error
  //           );
  //         });
  //       setLoading(false);
  //     } catch (e) {
  //       alert("Please enter some value");
  //     }
  //   }
  // };

  const openDrawer = () => {
    props.navigation.goBack();
  };
  const resetTxt = () => {
    setDynamicValue(0);
  };
  const KeyPress = (text) => {
    setDynamicValue(toNumber(text));
  };

  return (
    <>
      <TopBar back={openDrawer} title="Add Coins" rightNull Ctitle />
      <View style={Styles.Card}>
        <View style={{ flexDirection: "row" }}>
          <View style={Styles.CurrencySign}>
            <Image source={Icons.Coins} style={{ alignSelf: "center" }} />
          </View>
          <Text style={Styles.AvailableTxt}>{Coins} coins available</Text>
        </View>
        <View style={Styles.Separater} />
        <View style={Styles.DynamicAmtView}>
          <View style={Styles.CurrencySign}>
            <Image source={Icons.Coins} style={{ alignSelf: "center" }} />
          </View>

          <Text style={Styles.TxtInput}>{dynamicValue}</Text>
          <View style={Styles.VSeparater} />
          <TouchableOpacity
            onPress={resetTxt}
            style={[
              Styles.ClearTxtView,
              isANDROID ? Styles.ShadowAndrd : Styles.ShadowiOS,
            ]}
          >
            <Icon_1 name="close" size={25} color={color.grayShade} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginVertical: hp(3) }}>
          <TouchableOpacity
            onPress={BtnValue100}
            style={[
              Styles.StaticAmtView,
              isANDROID ? Styles.ShadowAndrd : Styles.ShadowiOS,
            ]}
          >
            <Text style={Styles.StaticAmtTxt}>+100</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={BtnValue200}
            style={[
              Styles.StaticAmtView,
              isANDROID ? Styles.ShadowAndrd : Styles.ShadowiOS,
            ]}
          >
            <Text style={Styles.StaticAmtTxt}>+20</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={BtnValue500}
            style={[
              Styles.StaticAmtView,
              isANDROID ? Styles.ShadowAndrd : Styles.ShadowiOS,
            ]}
          >
            <Text style={Styles.StaticAmtTxt}>+50</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.BtnView}>
          <MainButton
            btnName="Raise Request"
            action={() => RaiseRqstBtn(Coins)}
            disabled={rqstedStatus ? true : false}
            borderColor={color.greenMint}
            borderWidth={0.5}
            btntextColor={color.white}
            btnColor={color.greenMint}
            fontSize={18}
          />
        </View>
        <View style={[Styles.Separater, { flex: 0.7 }]} />
        <VirtualKeyboard
          color="black"
          pressMode="string"
          onPress={KeyPress}
          // decimal={true}
          // backspaceImg={Icons.Back}
        />
        {isLoading ? (
          <View style={Styles.LoaderStyle}>
            <Loader visible={isLoading} />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default AddCoins;
