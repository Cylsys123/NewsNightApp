import React, { useState, useEffect, useCallback } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  RefreshControl,
  View,
  FlatList,
  ScrollView,
  Text,
  Image,
  Alert,
} from "react-native";
import { hp, wp, Loader } from "../../Components/CommonUtills/ThemeHelper";
import ListComponent from "./ListComponent";
import TopBar from "../../Components/TopBar/TopBar";
import { Data, Data2, Data3 } from "../../DummyData/HomeList";
import Styles from "./Styles";
import { useIsFocused } from "@react-navigation/native";
import { toNumber } from "lodash";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const userEmail = auth()?.currentUser?.email;
  const [listData, setListData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [otherData, setOtherData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const todayC = moment(new Date()).format("YYYYMMDD");
  const NewDate = moment(new Date()).format("DD MMMM[,] YYYY hh:mm A");
  const today = moment(new Date()).format("YYYYMMDDhh");
  // console.log("userData..", userData);
  // console.log("todayC..", todayC);

  // console.log("uid.....", auth().currentUser.uid);
  // console.log("userEmail.....", userEmail);

  useEffect(() => {
    setLoading(true);
    setRefreshing(true);
    getHomeData();
    getUserData();
  }, [isFocused]);

  const getHomeData = () => {
    firestore()
      .collection("Admin Panel")
      .get()
      .then((querySnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let temp = [];
        console.log("Total Data of HomeScreen: ", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails["id"] = documentSnapshot.id;
          temp.push(userDetails);
          setListData(temp);

          let trendingData = temp.filter((item) => {
            return item.Trending == true;
          });
          setTrendingData(trendingData);

          let otherData = temp.filter((item) => {
            return item.Trending == false;
          });
          setOtherData(otherData);
        });
      });
  };

  const getUserData = () => {
    firestore()
      .collection("Users")
      .doc(auth()?.currentUser?.uid)
      .get()
      .then(async (documentSnapshot) => {
        setLoading(false);
        setRefreshing(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setUserData(userDetails);
        OnceInDayAddCoins(userDetails);
        onCoinRequestSuccess(userDetails);
        await AsyncStorage.setItem("userDataa", JSON.stringify(userDetails));
        console.log("userDetails", userDetails);
      })
      .catch((error) => {
        setLoading(false);
        // console.log("You have not registered: ", error);
        // alert(
        //   "You have not registered yet, Please fill out all required information then click on Google Button"
        // );
        // var google = 1;
        // var fb = 1;
        // props.navigation.navigate("SignUp", {
        //   ifLogin: google || fb,
        //   userEmail,
        // }); //If User has not registered
      });
  };

  const OnceInDayAddCoins = (userDetails) => {
    if (todayC != userDetails.CoinsLoopDate) {
      Alert.alert(
        `Reward of the Day"`,
        `TotalCoins ${userDetails.TotalCoins},\n100 Coins Added in your Reward,\nNow TotalReward is ${userDetails.TotalCoins+100}`
      );
      firestore()
        .collection("Users")
        .doc(auth()?.currentUser?.uid)
        .update({
          TotalCoins: userDetails.TotalCoins + 100,
          CoinsLoopDate: todayC,
        })
        .then(() => {
          // alert("100 Coins Added in your Reward");
          firestore()
            .collection("Users")
            .doc(auth()?.currentUser?.uid)
            .collection("History")
            .add({
              createdAt: NewDate,
              createdTime: firestore.Timestamp.fromDate(new Date()),
              onDate: todayC,
              Amount: 100,
              Credit: true,
              Remark: "Reward for Day",
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
    } else {
      // alert("Already won 100 Coins");
      console.log("Already won 100 Coins");
    }
  };

  const onCoinRequestSuccess = (userDetails) => {
    var rqsD = toNumber(userDetails.CoinsRequestDate);
    var rqsDate = rqsD + 100;
    if (today >= rqsDate && userDetails.isRequestCoin == true) {
      firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .update({
          TotalCoins: userDetails.TotalCoins + userDetails.CoinsRequested,
          isRequestCoin: false,
          CoinsRequested: 0,
          CoinsRequestDate: 0,
        })
        .then(() => {
          Alert.alert(
            "Coin Request has approved",
            userDetails.CoinsRequested + " coins have added in your Reward"
          );
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Something went wrong with add Coins: ", error);
          alert("Something went wrong with add Coins: " + error);
        });
      firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .collection("History")
        .add({
          createdAt: NewDate,
          createdTime: firestore.Timestamp.fromDate(new Date()),
          onDate: today,
          Amount: userDetails.CoinsRequested,
          Credit: true,
          Remark: "Requested Coin",
        })
        .catch((error) => {
          setLoading(false);
          console.log(
            "Something went wrong with added History to firestore: ",
            error
          );
        });
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const openDrawer = () => {
    let val = 1;
    props.navigation.toggleDrawer({ id: val.toString() });
  };
  const NavNotification = () => {
    props.navigation.navigate("Notifications");
  };

  const renderList = ({ item }) => {
    return (
      <>
        <View style={[Styles.Card, { backgroundColor: item.BgColor }]}>
          <Image
            source={{ uri: item.ArticlePicture }}
            style={{ borderRadius: 10, height: hp(16.6), width: wp(74.4) }}
          />
        </View>
      </>
    );
  };

  return (
    <View>
      <TopBar Head Notification={NavNotification} open={openDrawer} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getHomeData} />
        }
      >
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={listData ? listData : Data}
          renderItem={renderList}
          keyExtractor={(item) => item.id}
          style={{ marginVertical: wp(3) }}
        />
        {listData.length > 0 ? (
          <>
            {trendingData.length > 0 ? (
              <>
                <View style={Styles.HeadView}>
                  <Text style={Styles.HeadTxt}>Trending Now</Text>
                  <View style={Styles.HeadLine} />
                </View>
                <ListComponent {...props} data={trendingData} />
              </>
            ) : null}

            {otherData.length > 0 ? (
              <>
                <View style={Styles.HeadView}>
                  <Text style={Styles.HeadTxt}>Trending Now</Text>
                  <View style={Styles.HeadLine} />
                </View>
                <ListComponent {...props} data={otherData} />
              </>
            ) : null}
          </>
        ) : null}

        <View style={{ height: hp(20) }} />
        {/* {isLoading ? (
          <View style={Styles.Loader}>
            <Loader visible={isLoading} />
          </View>
        ) : null} */}
      </ScrollView>
    </View>
  );
};

export default Home;
