import React, { useState, useEffect, useCallback } from "react";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  RefreshControl,
  ImageBackground,
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { wp, color, Loader } from "../../Components/CommonUtills/ThemeHelper";
import Images from "../../Assets/Images/Images";
import Icons from "../../Assets/Icons/Icons";
import MainButton from "../../Components/MainButton/MainButton";
import Styles from "./Style";
import { Data } from "../../DummyData/HistoryList";
import { useIsFocused } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Reward = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const [userData, setuserData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getCoins = () => {
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
        setuserData(userDetails.TotalCoins);
      })
      .catch((error) => {
        setRefreshing(false);
        setLoading(false);
      });
  };

  const getHistory = () => {
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("History")
      .orderBy("createdTime", "desc")
      .get()
      .then((querySnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let temp = [];
        console.log("Total Data of History: ", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          // console.log("user Id: ", documentSnapshot.id);
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails["id"] = documentSnapshot.id;
          temp.push(userDetails);

          // let filterData = temp.sort((a, b) => {
          //   b.Remark.localeCompare(a.Remark);
          //   b.Remark - a.Remark;
          // });
          // console.log("temp...", temp);
          // console.log(
          //   "filterData...",
          //   temp.sort((a, b) => {
          //     b.Remark.localeCompare(a.Remark);
          //     b.Remark - a.Remark;
          //     a.Remark - b.Remark;
          //   })
          // );
          setHistoryData(temp);
        });
      });
  };
  // console.log("getHistory..", historyData);
  // console.log("getHistory..", historyData.Amount);
  // console.log("getHistory..", historyData.Credit);
  // console.log("getHistory..", historyData.createdAt);
  // console.log("getHistory..", historyData.onDate);

  useEffect(() => {
    setLoading(true);
    setRefreshing(true);
    getCoins();
    getHistory();
  }, [isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const renderList = ({ item }) => {
    // console.log("item....", item);
    return (
      <View>
        <View style={Styles.HistoryContentMainView}>
          <View
            style={[
              Styles.IconCircle,
              {
                borderColor:
                  item.Credit == true ? color.greenMint : color.redTheme,
              },
            ]}
          >
            <Icon_1
              name={
                item.Credit == true ? "arrow-bottom-left" : "arrow-top-right"
              }
              size={15}
              color={item.Credit == true ? color.greenMint : color.redTheme}
              style={{ alignSelf: "flex-start" }}
            />
          </View>
          <Text style={Styles.HistoryTxt}>{item.Remark}</Text>
          <Text style={Styles.HistoryAmount}>{item.Amount} coins</Text>
        </View>
        <View style={Styles.HistoryStatus}>
          <Text style={Styles.HistoryStatusTxt}>{item.createdAt}</Text>
          <Text
            style={{
              fontSize: 12,
              color: item.Credit == true ? color.greenMint : color.redTheme,
            }}
          >
            {item.Credit == true ? "Credited" : "Debited"}
          </Text>
        </View>
        <View style={[Styles.Line, { marginVertical: wp(3) }]} />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={Images.BlueBackground} style={Styles.ImgBg}>
        <Text style={Styles.Title}>Total Amount</Text>
        <Image source={Icons.Points} style={Styles.ImgPoints} />
        <Text style={Styles.Txt50}>{parseInt(userData)}</Text>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Styles.CardOver}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getHistory} />
        }
      >
        <View style={[Styles.HeadView, { paddingTop: wp(10) }]}>
          <View style={[Styles.Line, { alignSelf: "center" }]} />
          {/* <Text style={Styles.HeadTxt}>Available To Invest</Text> */}
          <Text style={{ ...Styles.HeadTxt, marginLeft: wp(4) }}>
            Funds available to play
          </Text>
          <View style={[Styles.Line, { alignSelf: "center" }]} />
        </View>
        <View style={Styles.InvestView}>
          <View style={Styles.CurrencySign}>
            <Image source={Icons.Coins} style={{ alignSelf: "center" }} />
          </View>
          <Text style={Styles.InvestTxt}>{parseInt(userData)}</Text>
          <Text
            style={{
              lineHeight: 36,
              fontSize: 18,
              color: color.blackTheme,
              marginLeft: wp(2),
            }}
          >
            coins
          </Text>
        </View>
        <View style={Styles.BtnView}>
          <MainButton
            btnName="Add Coins"
            action={() => {
              props.navigation.navigate("AddCoins");
            }}
            borderColor={color.greenMint}
            borderWidth={0.5}
            btntextColor={color.white}
            btnColor={color.greenMint}
            fontSize={18}
          />
        </View>

        <View style={Styles.HeadView}>
          <Text style={Styles.HeadTxt}>History</Text>
          <View style={[Styles.Line, { alignSelf: "center" }]} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          // data={Data}
          data={historyData}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
      {/* {isLoading ? (
        <View style={Styles.Loader}>
          <Loader visible={isLoading} />
        </View>
      ) : null} */}
    </View>
  );
};

export default Reward;
