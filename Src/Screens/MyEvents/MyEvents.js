import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import TopBar from "../../Components/TopBar/TopBar";
import { Data } from "../../DummyData/MyEventsList";
import ListComponent from "./ListComponent";
import Styles from "./Styles";
import { hp, Loader } from "../../Components/CommonUtills/ThemeHelper";
import { useIsFocused } from "@react-navigation/native";

const MyEvents = (props) => {
  const [eventData, setEventData] = useState([]);
  const [recentData, setRecentData] = useState([]);
  const [pastData, setPastData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const today = moment(new Date()).format("DD MMMM[,] YYYY");
  // console.log(
  //   "new_Date",
  //   moment(new Date()).format("ddd MMM DD h:mm:ss [IST] YYYY ")
  // );

  useEffect(() => {
    setLoading(true);
    getEventData();
  }, [isFocused]);

  const getEventData = () => {
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .collection("My Events")
      .get()
      .then((querySnapshot) => {
        setLoading(false);
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails["id"] = documentSnapshot.id;
          temp.push(userDetails);
          setEventData(temp);

          let recent = temp.filter((item) => {
            return item.onDate == today;
          });
          setRecentData(recent);

          let past = temp.filter((item) => {
            return item.onDate != today;
          });
          setPastData(past);
        });
      });
  };

  console.log("Events Data", eventData);

  return (
    <View style={{ flex: 1 }}>
      <TopBar title="My Events" rightNull />
      {eventData.length > 0 ? (
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getEventData} />
          }
        >
          {recentData.length > 0 ? (
            <>
              <Text style={Styles.HeadTxt}>Recent</Text>
              <ListComponent {...props} data={recentData} />
            </>
          ) : null}

          {pastData.length > 0 ? (
            <>
              <Text style={Styles.HeadTxt}>Past</Text>
              <ListComponent {...props} data={pastData} />
            </>
          ) : null}
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            height: hp(82),
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 23, fontWeight: "bold" }}>
            You haven't played any event yet
          </Text>
        </View>
      )}
      {/* {isLoading ? (
        <View style={Styles.Loader}>
          <Loader visible={isLoading} />
        </View>
      ) : null} */}
    </View>
  );
};

export default MyEvents;
