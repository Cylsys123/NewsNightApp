import React, { useState, useEffect, useCallback } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  RefreshControl,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  hp,
  wp,
  color,
  isANDROID,
  Loader,
} from "../../Components/CommonUtills/ThemeHelper";
import Images from "../../Assets/Images/Images";
import MainButton from "../../Components/MainButton/MainButton";
import { Data } from "../../DummyData/QuesLev2Option";
import Icons from "../../Assets/Icons/Icons";
import Styles from "./Styles";
import PlacedBetMsg from "../../Components/PlaceBetMessage/PlacedBetMsg";
import { toNumber } from "lodash";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PlayEvent = (props) => {
  const [value, setvalue] = useState();
  const [betStatus, setBetStatus] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [amount, setAmount] = useState(10);
  const [psbEarning, setPsbEarning] = useState(0);
  const [earning, setEarning] = useState(0);
  const [isEarning, setisEarning] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [remainAmount, setRemainAmount] = useState([]);
  const [Coins, setCoins] = useState([]);
  const [quest, setQuest] = useState([]);
  const [correctAns, setCorrectAns] = useState([]);
  const [selectAns, setSelectAns] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const data = props.route.params.data;
  const NewDate = moment(new Date()).format("DD MMMM[,] YYYY hh:mm A");
  const isFocused = useIsFocused();
  const today = moment(new Date()).format("DD MMMM[,] YYYY");
  const todayC = moment(new Date()).format("YYYYMMDD");
  // console.log("data.....", data);
  // console.log(
  //   "new_Date",
  //   moment(new Date()).format("ddd MMM DD h:mm:ss [IST] YYYY ")
  // );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getQues = () => {
    setRefreshing(true);
    setLoading(true);
    firestore()
      .collection("Admin Panel")
      .doc(data.id)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setQuest(userDetails.BetQuestion);
        setCorrectAns(userDetails.BetQuestion[0].correctAns);
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
        setCoins(userDetails.TotalCoins);
        console.log("getCoins...");
        setRemainAmount(userDetails.TotalCoins - amount);
        // getEventData(userDetails.TotalCoins);
      });
  };

  const getEventData = (TCoins) => {
    setRefreshing(true);
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
        setEventData(userDetails);
        console.log("getEventData...");
        // getCategoryData(TCoins, userDetails);
      });
  };

  const getCategoryData = (TCoins, eventDataa) => {
    setRefreshing(true);
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
        setCategoryData(userDetails);
        console.log("getCategoryData", data.Category);
        // isBetWon(TCoins, eventDataa, userDetails);
      });
  };

  // const isBetWon = (TCoins, eventData1, categoryData1) => {
  //   let earnings = 0;

  //   if (
  //     Object.keys(eventData1).length > 0 &&
  //     Object.keys(categoryData1).length > 0
  //   ) {
  //     earnings =
  //       eventData1?.ChoosedIndex == 1
  //         ? ((categoryData1?.TotalPool + eventData1?.BetAmount) *
  //             eventData1?.BetAmount) /
  //           (categoryData1?.TotalPool1 + eventData1?.BetAmount)
  //         : ((categoryData1?.TotalPool + eventData1?.BetAmount) *
  //             eventData1?.BetAmount) /
  //           (categoryData1?.TotalPool2 + eventData1?.BetAmount);

  //     if (
  //       categoryData1?.CorrectAnswer == eventData1?.ChoosedOption &&
  //       eventData1?.isEarned == false &&
  //       isEarning == false
  //     ) {
  //       firestore()
  //         .collection("Users")
  //         .doc(auth().currentUser.uid)
  //         .update({
  //           TotalCoins: toNumber(TCoins) + toNumber(earnings),
  //         })
  //         .then(() => {
  //           setisEarning(true);
  //           Alert.alert("Congratulations", "You have won the bet");
  //           firestore()
  //             .collection("Users")
  //             .doc(auth().currentUser.uid)
  //             .collection("My Events")
  //             .doc(data.id)
  //             .update({
  //               EarnedCoins: toNumber(earnings),
  //               isEarned: true,
  //             })
  //             .catch((error) => {
  //               console.log(
  //                 "Something went wrong with added Events to firestore: ",
  //                 error
  //               );
  //             });

  //           firestore()
  //             .collection("Users")
  //             .doc(auth().currentUser.uid)
  //             .collection("History")
  //             .add({
  //               createdAt: NewDate,
  // createdTime: firestore.Timestamp.fromDate(new Date()),
  //               onDate: todayC,
  //               Amount: toNumber(earnings),
  //               Credit: true,
  //               Remark: categoryData1.Category + " Bet Won",
  //             })
  //             .catch((error) => {
  //               setLoading(false);
  //               console.log(
  //                 "Something went wrong with added History to firestore: ",
  //                 error
  //               );
  //             });
  //         })
  //         .catch((error) => {
  //           console.log("Something went wrong with add Coins: ", error);
  //           setLoading(false);
  //           alert("Something went wrong with add Coins: " + error);
  //         });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   setRefreshing(true);
  //   getCoins();
  //   getQues();
  //   getEventData();
  //   // getCategoryData();
  //   // isBetWon();
  // }, [amount, Coins, remainAmount, isFocused]);

  useEffect(() => {
    setRefreshing(true);
    getCoins();
    getQues();
    getEventData();
    getCategoryData();
    // isBetWon();
  }, [isFocused]);

  // console.log("Coins", Coins);
  // console.log("Questttt", quest);
  // console.log("After Bet, Coins: ", remainAmount);
  // console.log("Correct Ans", correctAns);
  // console.log("select Ans", selectAns);
  // console.log("New_Date", NewDate);
  // console.log("EventData..", eventData);
  // console.log("CategoryData..", categoryData);
  // console.log("Index..", value);

  var i = toNumber(amount);
  const increaseAmount = (data1) => {
    if (data1 || data1 == 0) {
      if (200 > amount) {
        if (Coins > amount) {
          if (categoryData.TotalPool > amount) {
            setAmount(i + 10);
            setPsbEarning(
              value == 0
                ? ((categoryData.TotalPool + (i + 10)) * (i + 10)) /
                    (categoryData.TotalPool1 + (i + 10))
                : ((categoryData.TotalPool + (i + 10)) * (i + 10)) /
                    (categoryData.TotalPool2 + (i + 10))
            );
          } else {
            alert("You can't exceed with Total Pool");
          }
        } else {
          alert("Insufficient amount in wallet");
        }
      } else {
        alert("You can bet upto 200 coins");
      }
    } else {
      alert("Please select any option");
    }
  };
  const decreaseAmount = (data1) => {
    if (data1 || data1 == 0) {
      if (amount > 10) {
        setAmount(i - 10);
        setPsbEarning(
          value == 0
            ? ((categoryData.TotalPool + (i - 10)) * (i - 10)) /
                (categoryData.TotalPool1 + (i - 10))
            : ((categoryData.TotalPool + (i - 10)) * (i - 10)) /
                (categoryData.TotalPool2 + (i - 10))
        );
      }
    } else {
      alert("Please select any option");
    }
  };

  const checkBet = (value) => {
    setBetStatus(true);
    if (eventData.id == data.id) {
      alert("Your bet has been already placed");
    } else {
      alert("Your bet has been placed");
      // alert("Please wait...");
    }
  };

  const handleBet = (data1) => {
    setRefreshing(true);
    if (data1 || data1 == 0) {
      if (eventData.id != data.id) {
        if (Coins >= amount) {
          setBetStatus(true);
          setLoading(true);
          firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .update({
              // TotalCoins: remainAmount,
              TotalCoins: parseInt(Coins) - parseInt(amount),
            })
            .then(() => {
              setLoading(false);
              setShowMsg(true);
              setRefreshing(false);
              // props.navigation.navigate("DrawerTabs");
            })
            .catch((error) => {
              console.log("Something went wrong with add Coins: ", error);
              setLoading(false);
              alert("Something went wrong with add Coins: " + error);
            });

          firestore()
            .collection("Users")
            .doc(auth().currentUser.uid)
            .collection("My Events")
            .doc(data.id)
            .set({
              Category: data.Category,
              Headline: data.Headline,
              ArticlePicture: data.ArticlePicture,
              Name: data.Name,
              createdAt: NewDate,
              onDate: today,
              Open: true,
              Participants: parseInt(categoryData.TotalParticipants) + 1,
              EarnedCoins: 0,
              isEarned: false,
              ChoosedOption: selectAns,
              ChoosedIndex: data1,
              BetAmount: amount,
              BetAgain: false,
            })
            .catch((error) => {
              setRefreshing(false);
              setLoading(false);
              console.log(
                "Something went wrong with added Events to firestore: ",
                error
              );
            });

          firestore()
            .collection(data.Category)
            .doc(data.id)
            .update({
              TotalPool: categoryData.TotalPool + amount,
              TotalPool1:
                data1 == 0
                  ? categoryData.TotalPool1 + amount
                  : categoryData.TotalPool1,
              TotalPool2:
                data1 == 1
                  ? categoryData.TotalPool2 + amount
                  : categoryData.TotalPool2,
              Option1:
                data1 == 0 ? categoryData.Option1 + 1 : categoryData.Option1,
              Option2:
                data1 == 1 ? categoryData.Option2 + 1 : categoryData.Option2,
              // ValidTillNow: "",
              TotalParticipants: categoryData.TotalParticipants + 1,
              // CorrectAnswer: "",
            })
            .catch((error) => {
              setRefreshing(false);
              setLoading(false);
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
              Amount: amount,
              Credit: false,
              Remark: "Event Played",
            })
            .catch((error) => {
              setLoading(false);
              console.log(
                "Something went wrong with added History to firestore: ",
                error
              );
            });
        } else {
          alert("Can't Bet, Insufficient Coins");
          setRefreshing(false);
        }
      } else {
        alert("Your bet has been already placed");
        setRefreshing(false);
      }
    } else {
      alert("Please select any option");
      setRefreshing(false);
    }
  };

  const hideMessage = () => {
    setShowMsg(false);
  };
  const backToScreen = () => {
    props.navigation.pop();
  };

  const checkAns = (index, item) => {
    setvalue(index);
    setSelectAns(item.option);
    // setPsbEarning(
    //   categoryData.Option1 > 0 || categoryData.Option2 > 0
    //     ? categoryData.Option1 == 1 || categoryData.Option2 == 1
    //       ? amount * 2
    //       : index == 0
    //       ? amount * (categoryData.Option1 + 1)
    //       : amount * (categoryData.Option2 + 1)
    //     : amount
    // );

    // setPsbEarning(
    //   categoryData.Option1 > 0 || categoryData.Option2 > 0
    //     ? index == 0
    //       ? (categoryData.TotalPool + amount) / (categoryData.Option1 + 1)
    //       : (categoryData.TotalPool + amount) / (categoryData.Option2 + 1)
    //     : categoryData.TotalPool + amount
    // );

    setPsbEarning(
      index == 0
        ? ((categoryData.TotalPool + amount) * amount) /
            (categoryData.TotalPool1 + amount)
        : ((categoryData.TotalPool + amount) * amount) /
            (categoryData.TotalPool2 + amount)
    );
  };

  const renderList = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginLeft: wp(1) }}>
        <MainButton
          btnName={item.option}
          action={() => {
            checkAns(index, item);
          }}
          borderColor={value == index ? color.blueTheme : color.greenMint}
          borderWidth={0.5}
          btntextColor={value == index ? color.white : color.blackTheme}
          btnColor={value == index ? color.blueTheme : color.white}
          fontSize={isANDROID ? 15 : 13}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={Images.BlueBackground} style={Styles.ImgBg}>
        <TouchableOpacity style={Styles.BackIcon} onPress={backToScreen}>
          <Icon_1 name="chevron-left" size={30} color={color.white} />
        </TouchableOpacity>
        <View style={[Styles.HeadView, { marginTop: hp(5) }]}>
          <Text style={Styles.HeadTxt}>Wallet Amount</Text>
          {/* <View style={{ flexDirection: "row" }}> */}
          {/* <View style={Styles.IconBg}> */}
          {/* <Image source={Icons.Notes} />
            <Image source={Icons.Coins} style={Styles.ImgCoins} /> */}
          {/* </View> */}
          {/* <Text style={Styles.HeadTxt2}>{Coins}</Text> */}
          {/* </View> */}
          <Text style={Styles.HeadTxt}>Total pool</Text>
        </View>
        <View style={[Styles.HeadView, { marginTop: hp(2) }]}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.IconBg}>
              {/* <Image source={Icons.Notes} /> */}
              <Image source={Icons.Coins} style={Styles.ImgCoins} />
            </View>
            <Text style={Styles.HeadTxt2}>{parseInt(Coins)}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={Styles.HeadTxt2}>
              {parseInt(categoryData.TotalPool)}
            </Text>
            <View style={[Styles.IconBg]}>
              <Image source={Icons.Notes} />
              {/* <Image source={Icons.Coins} style={Styles.ImgCoins} /> */}
            </View>
          </View>
        </View>
        <View style={Styles.Line} />
      </ImageBackground>

      <View style={Styles.Card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingTop: hp(3) }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getQues} />
          }
        >
          <Text style={Styles.QHead}>Question:</Text>

          {quest.map((item, index) => {
            return (
              <>
                <Text style={Styles.QuesTxt}>{item.Question}</Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  data={item.Options}
                  renderItem={renderList}
                  keyExtractor={(item, index) => index.toString()}
                  style={{ flex: 1 }}
                />
              </>
            );
          })}

          <View style={{ flexDirection: "row", marginVertical: wp(2) }}>
            <View style={Styles.PartcipantView}>
              <Text style={Styles.PartcipantTxt}>{categoryData.Option1}</Text>
              <Icon_1
                name="account-multiple"
                size={27}
                color={color.blueTheme}
              />
            </View>
            <View style={Styles.PartcipantView}>
              <Text style={Styles.PartcipantTxt}>{categoryData.Option2}</Text>
              <Icon_1
                name="account-multiple"
                size={27}
                color={color.blueTheme}
              />
            </View>
          </View>

          <View style={Styles.Line1} />
          <View style={Styles.AmountView}>
            <Text style={Styles.AmountTxt}>Amount you want to bet</Text>
            <View style={Styles.AmountView}>
              <TouchableOpacity
                onPress={() => decreaseAmount(value)}
                style={Styles.IconBg2}
              >
                <Icon_1 name="minus" size={25} color={color.blueTheme} />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", marginHorizontal: wp(3) }}>
                <Text style={Styles.AmountTxt2}>{amount}</Text>
                <Image source={Icons.Coins} style={Styles.ImgCoins} />
              </View>
              <TouchableOpacity
                onPress={() => increaseAmount(value)}
                style={Styles.IconBg2}
              >
                <Icon_1 name="plus" size={25} color={color.blueTheme} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[Styles.AmountView, { marginTop: wp(4) }]}>
            <Text style={[Styles.AmountTxt]}>Total Participants</Text>
            <View style={[Styles.AmountView2, { flex: 0.6 }]}>
              <Text style={Styles.AmountTxt2}>
                {categoryData.TotalParticipants}
              </Text>
              <Icon_1
                name="account-multiple"
                size={27}
                color={color.blueTheme}
              />
            </View>
          </View>
          <Text style={Styles.Status}>
            {/* Betting valid till - Monday, 25 Oct 2022 12:00 PM */}
            Betting valid till - {categoryData.ValidTillNow}
          </Text>
          <View style={Styles.Line1} />
          <Text style={Styles.EarningHead}>Possible Earning</Text>
          <TouchableOpacity
            onPress={() =>
              alert(
                "Possible Earning is depend on Total participants, it will increase, when more participants will bet."
              )
            }
            style={Styles.EarningBg}
          >
            {/* <Text style={Styles.EarningTxt}>{psbEarning.toFixed(0)}</Text> */}
            <Text style={Styles.EarningTxt}>{parseInt(psbEarning)}</Text>
            <Image source={Icons.Coins} style={Styles.ImgCoins2} />
          </TouchableOpacity>
          <View style={{ marginVertical: hp(3) }} />
        </ScrollView>

        <View style={{ flex: 0.2, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            {eventData.id != data.id && betStatus == false ? (
              <MainButton
                btnName={"Place Bet"}
                action={() => handleBet(value)}
                disabled={betStatus ? true : false}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.white}
                btnColor={color.greenMint}
                fontSize={18}
              />
            ) : (
              <MainButton
                btnName={"Place Bet"}
                action={() => checkBet(value)}
                // action={() => handleBet(value)}
                borderColor={color.greenMint}
                borderWidth={0.5}
                // btntextColor={color.blackTheme}
                // btnColor={color.white}
                btntextColor={color.white}
                btnColor={color.greenMint}
                fontSize={18}
              />
            )}
          </View>
          <View style={{ marginHorizontal: wp(2) }} />
          <View style={{ flex: 1 }}>
            <MainButton
              btnName={"Join Chat"}
              action={() => alert("Coming Soon..")}
              borderColor={color.greenMint}
              borderWidth={0.5}
              btntextColor={color.blackTheme}
              btnColor={color.white}
              fontSize={18}
            />
          </View>
        </View>
      </View>
      <View style={{}}>
        <PlacedBetMsg visible={showMsg} onClose={hideMessage} />
      </View>
      {/* {isLoading ? (
        <View style={Styles.Loader}>
          <Loader visible={isLoading} />
        </View>
      ) : null} */}
    </View>
  );
};

export default PlayEvent;
