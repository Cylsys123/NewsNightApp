import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
import { Data } from "../../DummyData/QuesOption";
import Styles from "./Styles";
import TimerProgress from "./TimerProgress";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
import CountDown from "react-native-countdown-component";

const PlayQuiz = (props) => {
  const [value, setvalue] = useState();
  const [Coins, setCoins] = useState();
  const [lostCoin, setLostCoin] = useState();
  const [getTime, setGetTime] = useState(0);
  const [arrindex, setArrindex] = useState(0);
  const [questList, setQuestList] = useState([]);
  const [correctAns, setCorrectAns] = useState("");
  const [showcorrectAns, setShowCorrectAns] = useState(false);
  const [selectAns, setSelectAns] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [Incorrect, setIncorrect] = useState(false);
  const [correct, setCorrect] = useState(false);
  const data = props.route.params.data;
  const isFocused = useIsFocused();
  const today = moment(new Date()).format("YYYYMMDD");
  const NewDate = moment(new Date()).format("DD MMMM[,] YYYY hh:mm A");

  // const [isselect, setisSelect] = useState(false);
  // const [selectedidx, setSelectedidx] = useState("");
  // const [selectedDetail, setselectedDetail] = useState("");
  // const [correct, setCorrect] = useState('');

  const Second = (id) => {
    // console.log("idididid", id);
    // setGetTime(Math.round(id / 10) * 30);
    setGetTime(id);
  };

  const getQuestion = () => {
    setLoading(true);
    firestore()
      .collection("Admin Panel")
      .doc(data.id)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setQuestList(userDetails.Quiz);
        setCorrectAns(userDetails.Quiz[arrindex].correctAns);
      })
      .catch((e) => {
        alert(e);
      });
  };

  // const getCoins = () => {
  //   setLoading(true);
  //   firestore()
  //     .collection("Users")
  //     .doc(auth().currentUser.uid)
  //     .get()
  //     .then((documentSnapshot) => {
  //       setLoading(false);
  //       let userDetails = {};
  //       userDetails = documentSnapshot.data();
  //       userDetails["id"] = documentSnapshot.id;
  //       setCoins(userDetails.TotalCoins + 100);
  //       setLostCoin(userDetails.TotalCoins - 100);
  //       console.log("Users' Coins: ", userDetails.TotalCoins);
  //     })
  //     .catch((error) => {
  //       console.log();
  //     });
  // };

  useEffect(() => {
    // getCoins();
    getQuestion();
  }, [arrindex, isFocused]);

  // console.log("QuizzQuestions...", questList);
  // console.log("correctAns...", correctAns);
  // console.log("selectAns...", selectAns);
  // console.log("After Correct Ans Total Coins: ", Coins);
  // console.log("After Incorrect Ans Total Coins: ", lostCoin);
  // console.log("today...", today);

  // const onWonQuiz = () => {
  //   firestore()
  //     .collection("Users")
  //     .doc(auth().currentUser.uid)
  //     .update({
  //       TotalCoins: Coins,
  //     })
  //     .then(() => {
  //       setLoading(false);
  //       alert("Congrats You have won 100 coins");
  //       props.navigation.navigate("DrawerTabs");
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log("Something went wrong with add Coins: ", error);
  //       alert("Something went wrong with add Coins: " + error);
  //     });
  //   const cred = true;
  //   const msgH = "Won Quiz";
  //   setHistory(cred, msgH);
  // };

  // const onLostQuiz = (msg, msgH) => {
  //   firestore()
  //     .collection("Users")
  //     .doc(auth().currentUser.uid)
  //     .update({
  //       TotalCoins: lostCoin,
  //     })
  //     .then(() => {
  //       setLoading(false);
  //       alert(msg);
  //       props.navigation.navigate("DrawerTabs");
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log("Something went wrong with lost Coins: ", error);
  //       alert("Something went wrong with lost Coins: " + error);
  //     });
  //   const cred = false;
  //   setHistory(cred, msgH);
  // };

  // const setHistory = (cred, msgH) => {
  //   firestore()
  //     .collection("Users")
  //     .doc(auth().currentUser.uid)
  //     .collection("History")
  //     .add({
  // createdAt: firestore.Timestamp.fromDate(new Date()),
  //       onDate: today,
  //       Amount: "100",
  //       Credit: cred,
  //       Remark: msgH,
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log(
  //         "Something went wrong with added History to firestore: ",
  //         error
  //       );
  //     });
  // };

  const backColor = () => {};

  const NextBtn = (arrindex, value) => {
    setvalue();
    if (value || value == 0) {
      if (arrindex < 1) {
        setArrindex(arrindex + 1);
        setShowCorrectAns(false);
        setIncorrect(false);
        setCorrect(false);
      } else {
        // const msg = "Incorrect Answer\nBetter Luck next time";
        // const msgH = "Lost Quiz: Incorrect Answer";
        // onLostQuiz(msg, msgH);
      }
    } else {
      alert("Please select any option");
    }
  };

  const FinishQuiz = (arrindex, value) => {
    // if (arrindex > 0) {
    //   setArrindex(arrindex - 1);
    //   setShowCorrectAns(false);
    // }
  };

  const onFinish = (data) => {
    setLoading(true);
    const msg = "You have ran out of time\nBetter Luck next time";
    const msgH = "Lost Quiz: Ran out of time";
    // onLostQuiz(msg, msgH);

    backToScreen();
  };

  const backToScreen = () => {
    props.navigation.pop();
  };

  const checkAns = (index, item) => {
    // setShowCorrectAns(item.option);
    setSelectAns(item.option);
    setvalue(index);
    // console.log("checkAns...", index);
    // console.log("checkAns...", item);
    // if (isselect && selectedidx != index) {
    //   setisSelect(true);
    //   setSelectedidx(index);
    //   setselectedDetail(item);
    // } else {
    //   setisSelect(!isselect);
    //   setSelectedidx(index);
    //   setselectedDetail();
    // }
  };

  const SubmitBtn = (value) => {
    // console.log("valuevalue...", showcorrectAns);
    // console.log("valuevalue...", Incorrect);
    if (value || value == 0) {
      setShowCorrectAns(true);
      if (correctAns != selectAns) {
        setIncorrect(true);
      } else {
        setCorrect(true);
      }
    } else {
      alert("Please select any option");
    }
  };

  const renderList = ({ item, index }) => {
    // console.log("item", item);
    // console.log("index", index);
    // console.log("isselect && selectedidx", isselect, selectedidx);
    return (
      <View>
        <TouchableOpacity
          disabled={showcorrectAns && true}
          onPress={() => {
            checkAns(index, item);
          }}
          style={[
            Styles.buttonContainer,
            {
              // backgroundColor:
              //   isselect && selectedidx == index
              //     ? correctAns && correctAns == showcorrectAns
              //       ? color.greenMint
              //       : color.blueTheme
              //     : color.white,

              // backgroundColor:
              //   value == index
              //     ? Incorrect
              //       ? color.redTheme
              //       : color.blueTheme
              //     : color.white,

              // backgroundColor:
              //   value == index
              //     ? correctAns == selectAns
              //       ? showcorrectAns
              //         ? color.redTheme
              //         : color.blueTheme
              //       : color.greenMint
              //     : color.white,
              backgroundColor: value == index ? color.blueTheme : color.white,
              borderColor: value == index ? color.blueTheme : color.greenMint,
            },
          ]}
        >
          <Text
            style={[
              Styles.text1,
              { color: value == index ? color.white : color.blackTheme },
              {
                // color:
                //   isselect && selectedidx == index
                //     ? color.white
                //     : color.blueTheme,
              },
            ]}
          >
            {item.option}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={Images.BlueBackground} style={Styles.ImgBg}>
        <TouchableOpacity style={Styles.BackIcon} onPress={backToScreen}>
          <Icon_1 name="chevron-left" size={30} color={color.white} />
        </TouchableOpacity>

        <View style={Styles.Progress}>
          {questList.length > 0 && (
            <View>
              {/* <View style={Styles.ProgressGreen} /> */}
              <TimerProgress
                Second={Second}
                onFinish={() => onFinish(arrindex)}
                {...props}
              />
            </View>
          )}
        </View>

        <View style={Styles.Sec}>
          {questList.length > 0 && (
            <>
              <View style={{ flexDirection: "row" }}>
                <CountDown
                  until={30}
                  onFinish={() => console.log("otp expired")}
                  size={12}
                  timeToShow={["S"]}
                  timeLabels={{ s: "" }}
                  digitStyle={{
                    backgroundColor: "transparent",
                    ...Styles.SecTxt,
                    marginTop: -wp(2),
                  }}
                  digitTxtStyle={{ color: "white", fontSize: 12 }}
                />
                <Text
                  style={{
                    ...Styles.SecTxt,
                    marginTop: -wp(0.4),
                    marginLeft: -wp(1.3),
                  }}
                >
                  sec
                </Text>
              </View>
              <Text style={Styles.SecTxt}>30 sec</Text>
            </>
          )}
        </View>
        <Text style={Styles.QuesTxt}>Question {arrindex + 1}/2</Text>
        <View style={Styles.Line} />
      </ImageBackground>
      <View style={Styles.Card}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: hp(40) }}
        >
          <Text style={Styles.QHead}>Question:</Text>

          {questList.map((item, index) => {
            return (
              <View>
                {arrindex == index ? (
                  <>
                    <Text style={Styles.Question}>{item.Question}</Text>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={item.Options}
                      renderItem={renderList}
                      keyExtractor={(item) => item.id}
                      style={{ flex: 2, marginBottom: hp(3) }}
                    />
                  </>
                ) : null}
              </View>
            );
          })}

          <View style={Styles.AnsView}>
            {Incorrect ? (
              <Text style={{ marginTop: wp(4), color: color.redTheme }}>
                Incorrect Answer😢
              </Text>
            ) : null}

            {correct ? (
              <Text style={{ marginTop: wp(4), color: color.greenTheme }}>
                Correct Answer👍
              </Text>
            ) : null}

            {showcorrectAns && (
              <>
                <Text style={Styles.AnsLabel}>Ans:</Text>
                <Text style={[Styles.Ans]}>{correctAns}</Text>
              </>
            )}
          </View>
          <View style={{ height: hp(5) }} />
        </ScrollView>
        <View style={Styles.BtnV}>
          <View style={{ flex: 1 }}>
            <MainButton
              btnName="Submit"
              action={() => SubmitBtn(value)}
              borderColor={color.greenMint}
              borderWidth={0.5}
              btntextColor={color.white}
              btnColor={color.greenMint}
              fontSize={18}
            />
          </View>
          <View style={{ marginHorizontal: wp(2) }} />
          <View style={{ flex: 1 }}>
            {arrindex == 1 ? (
              <MainButton
                btnName="Finish"
                // action={() => FinishQuiz(arrindex, value)}
                action={backToScreen}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.blackTheme}
                btnColor={color.white}
                fontSize={18}
              />
            ) : (
              <MainButton
                btnName="Next"
                action={() => NextBtn(arrindex, value)}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.blackTheme}
                btnColor={color.white}
                fontSize={18}
              />
            )}
          </View>
        </View>
      </View>
      {isLoading ? (
        <View style={Styles.Loader}>
          <Loader visible={isLoading} />
        </View>
      ) : null}
    </View>
  );
};

export default PlayQuiz;
