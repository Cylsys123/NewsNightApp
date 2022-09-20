import React, { useState, useEffect, useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  hp,
  wp,
  color,
  Loader,
} from "../../Components/CommonUtills/ThemeHelper";
import Icons from "../../Assets/Icons/Icons";
import MainButton from "../../Components/MainButton/MainButton";
import PlacedBetMsg from "../../Components/PlaceBetMessage/PlacedBetMsg";
import Styles from "./Styles";
import { useIsFocused } from "@react-navigation/native";
import { toNumber } from "lodash";
import moment from "moment";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MyEventsView = (props) => {
  const [heart, setHeart] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [remainAmount, setRemainAmount] = useState([]);
  const [betAmount, setBetAmount] = useState([]);
  const [lostCoin, setLostCoin] = useState(0);
  const [coins, setcoins] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState([]);
  const [checkBet, setCheckBet] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEarning, setisEarning] = useState(false);
  const [isEarned, setisEarned] = useState(false);
  const data = props.route.params.data;
  const [earnedCoins, setEarnedCoins] = useState(data.EarnedCoins || "");
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const today = moment(new Date()).format("YYYYMMDD");
  const NewDate = moment(new Date()).format("DD MMMM[,] YYYY hh:mm A");
  const todayC = moment(new Date()).format("YYYYMMDD");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getBetDetails = () => {
    setLoading(true);
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("My Events")
      .doc(data.id)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setBetAmount(userDetails.BetAmount);
        setTotalParticipants(userDetails.Participants);
        setCheckBet(userDetails.BetAgain);
      });
  };

  const getCoins = () => {
    setLoading(true);
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setRemainAmount(userDetails.TotalCoins);
        getEventData(userDetails.TotalCoins);
      });
  };

  const getEventData = (TCoins) => {
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("My Events")
      .doc(data.id)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        getCategoryData(TCoins, userDetails, userDetails.BetAmount);
        // setcoins(userDetails.BetAmount);
      });
  };

  const getCategoryData = (TCoins, eventDataa, BetAmount) => {
    setLoading(true);
    firestore()
      .collection(data.Category)
      .doc(data.id)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        isBetWon(TCoins, eventDataa, userDetails);
        isBetLost(TCoins, eventDataa, BetAmount, userDetails);
      });
  };

  let earnings = 0;
  const isBetWon = (TCoins, eventData1, categoryData1) => {
    if (
      Object.keys(eventData1).length > 0 &&
      Object.keys(categoryData1).length > 0
    ) {
      earnings =
        eventData1?.ChoosedIndex == 1
          ? ((categoryData1?.TotalPool + eventData1?.BetAmount) *
              eventData1?.BetAmount) /
            (categoryData1?.TotalPool1 + eventData1?.BetAmount)
          : ((categoryData1?.TotalPool + eventData1?.BetAmount) *
              eventData1?.BetAmount) /
            (categoryData1?.TotalPool2 + eventData1?.BetAmount);

      if (
        categoryData1?.CorrectAnswer === eventData1?.ChoosedOption &&
        eventData1?.isEarned === false &&
        isEarning === false
      ) {
        firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .update({
            TotalCoins: parseInt(TCoins) + parseInt(earnings),
          })
          .then(() => {
            setEarnedCoins(parseInt(earnings));
            setisEarning(true);
            setisEarned(true);
            Alert.alert("Congratulations", "You have won the bet");
            firestore()
              .collection("Users")
              .doc(auth().currentUser.uid)
              .collection("My Events")
              .doc(data.id)
              .update({
                EarnedCoins: parseInt(earnings),
                isEarned: true,
              })
              .catch((error) => {
                console.log(
                  "Something went wrong with added Events to firestore: ",
                  error
                );
              });

            firestore()
              .collection("Users")
              .doc(auth().currentUser.uid)
              .collection("History")
              .add({
                createdAt: NewDate,
                createdTime: firestore.Timestamp.fromDate(new Date()),
                onDate: todayC,
                Amount: parseInt(earnings),
                Credit: true,
                Remark: categoryData1.Category + " Bet Won",
              })
              .catch((error) => {
                setLoading(false);
                console.log(
                  "Something went wrong with added History to firestore: ",
                  error
                );
              });
          })
          .catch((error) => {
            console.log("Something went wrong with add Coins: ", error);
            setLoading(false);
            alert("Something went wrong with add Coins: " + error);
          });
      }
    }
  };

  const isBetLost = (TCoins, eventData1, BetAmount, categoryData1) => {
    if (
      categoryData1?.CorrectAnswer != "" &&
      categoryData1?.CorrectAnswer != eventData1?.ChoosedOption &&
      eventData1?.isEarned === false &&
      isEarning === false
    ) {
      setisEarning(true);
      setisEarned(true);
      setLostCoin(BetAmount);
      Alert.alert("Better Luck next time", "You have lost the bet");
    }
  };

  useEffect(() => {
    setRefreshing(true);
    getCoins();
    getBetDetails();
  }, [isFocused]);

  console.log("remainAmount", remainAmount);
  console.log("betAmount", betAmount);
  console.log("totalParticipants", totalParticipants);

  const handleBet = () => {
    setRefreshing(true);
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        // TotalCoins: remainAmount,
        TotalCoins: remainAmount - betAmount,
      })
      .then(() => {
        setRefreshing(false);
        setShowMsg(true);
        setCheckBet(true);
      })
      .catch((error) => {
        console.log("Something went wrong with add Coins: ", error);
        alert("Something went wrong with add Coins: " + error);
      });

    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("My Events")
      .doc(data.id)
      .update({
        BetAmount: data.BetAmount + data.BetAmount,
        BetAgain: true,
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added Events to firestore: ",
          error
        );
      });

    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("History")
      .add({
        createdAt: NewDate,
        createdTime: firestore.Timestamp.fromDate(new Date()),
        onDate: today,
        Amount: data.BetAmount,
        Credit: false,
        Remark: "Event Played Again",
      })
      .catch((error) => {
        setRefreshing(false);
        console.log(
          "Something went wrong with added History to firestore: ",
          error
        );
      });
  };

  const hideMessage = () => {
    setShowMsg(false);
  };

  const backToScreen = () => {
    props.navigation.pop();
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{ uri: data.ArticlePicture }}
          style={Styles.ImgBg}
        >
          <View style={Styles.IconView}>
            <TouchableOpacity
              style={[Styles.IconTouch, { padding: wp(1) }]}
              onPress={backToScreen}
            >
              <Icon_1 name="chevron-left" size={30} color={color.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                Styles.IconTouch,
                // { padding: wp(1.5) }
              ]}
              onPress={() => {
                // setHeart(!heart);
              }}
            >
              {/* <Icon_1
                name="heart"
                size={25}
                color={heart ? color.redTheme : color.white}
              /> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Styles.CardView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text style={Styles.HeadTxt}>{data.Name}</Text>
          {data.Open == true ? (
            <View style={[Styles.Open]}>
              <Text style={Styles.OpenCloseTxt}>Open</Text>
            </View>
          ) : (
            <View style={[Styles.Close]}>
              <Text style={Styles.OpenCloseTxt}>Closed</Text>
            </View>
          )}

          <Text style={Styles.ContentTxt}>{data.Headline}</Text>

          <View style={Styles.Line} />

          <View style={Styles.StatusView}>
            <Text>Your bet amount</Text>
            <View style={{ flexDirection: "row", marginHorizontal: wp(3) }}>
              <Text style={[Styles.AmountTxt, { marginRight: wp(3) }]}>
                {/* {data.BetAmount} */}
                {betAmount}
              </Text>
              <Image source={Icons.Coins} style={Styles.ImgCoins} />
            </View>
          </View>
          <View style={{ marginVertical: hp(2) }} />
          <View style={[Styles.StatusView, { marginRight: wp(7) }]}>
            <Text>Total Participants</Text>
            <View style={Styles.AmountView}>
              <Text style={Styles.AmountTxt}>
                {/* {data.Participants} */}
                {totalParticipants}
              </Text>
              <Icon_1
                name="account-multiple"
                size={27}
                color={color.blueTheme}
              />
            </View>
          </View>

          <View style={Styles.Line} />

          <Text style={Styles.EarningHead}>
            You {parseInt(lostCoin) ? "Lost" : "Won"}
          </Text>
          <View style={Styles.EarningBg}>
            <Text style={Styles.EarningTxt}>
              {earnedCoins ? parseInt(earnedCoins) : parseInt(lostCoin)}
            </Text>
            <Image source={Icons.Coins} style={Styles.ImgCoins2} />
          </View>

          <View style={{ marginHorizontal: hp(10), marginVertical: wp(5) }}>
            {checkBet == false && earnedCoins == "" && lostCoin == 0 ? (
              <MainButton
                btnName={"Bet Again"}
                action={() => handleBet()}
                // action={NavData}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.white}
                btnColor={color.greenMint}
                fontSize={18}
              />
            ) : null}
          </View>
        </ScrollView>
        <View style={{}}>
          <PlacedBetMsg visible={showMsg} onClose={hideMessage} />
        </View>
        {/* {isLoading ? (
          <View style={Styles.Loader}>
            <Loader visible={isLoading} />
          </View>
        ) : null} */}
      </View>
    </>
  );
};

export default MyEventsView;
