import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import moment from "moment";
import TopBar from "../../Components/TopBar/TopBar";
import { Data } from "../../DummyData/NotificationList";
import Styles from "./Styles";
import { useIsFocused } from "@react-navigation/native";
import ListComponent from "./ListComponent";
import { wp, hp } from "../../Components/CommonUtills/ThemeHelper";

const TOPIC = "NewsKnight";

const Notifications = (props) => {
  const [notifData, setNotifData] = useState({});
  const [bodyData, setBodyData] = useState({});
  const [titleData, setTitleData] = useState({});
  const [imgURL, setImgURL] = useState({});
  const today = moment(new Date()).format("DD MMMM[,] YYYY");
  const isFocused = useIsFocused();
  const [getNotifData, setGetNotifData] = useState([]);
  const [recentData, setrecentData] = useState([]);
  const [pastData, setpastData] = useState([]);

  // const dataFilter = () => {
  //   let recentdata = Data.filter((item) => {
  //     return item.recent == true;
  //   });
  //   setrecentData(recentdata);

  //   let pastdata = Data.filter((item) => {
  //     return item.recent == false;
  //   });
  //   setpastData(pastdata);
  // };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log("Authorization status(authStatus):", authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  const handleNotification = async () => {
    console.log("handleNotification()...");
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log("FCM Token -> ", fcmToken);
        });
    } else console.log("Not Authorization status:", authStatus);
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "getInitialNotification:" +
              "Notification caused app to open from quit state"
          );
          console.log(remoteMessage);
          alert(
            "getInitialNotification: Notification caused app to" +
              " open from quit state"
          );
        }
      });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "onNotificationOpenedApp: " +
            "Notification caused app to open from background state"
        );
        console.log(remoteMessage);
        alert(
          "onNotificationOpenedApp: Notification caused app to" +
            " open from background state"
        );
      }
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // alert("A new FCM message arrived!");
      // console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));

      await AsyncStorage.setItem(
        "@app:Notification",
        JSON.stringify(remoteMessage),
        (err) => {
          if (err) {
            console.log("An error AsyncStorage to set");
            throw err;
          }
          console.log("Success set AsyncStorage");
        }
      ).catch((err) => {
        console.log("error is: " + err);
      });

      const noteStore = await AsyncStorage.getItem("@app:Notification");
      let nottif = JSON.parse(noteStore);
      if (remoteMessage) {
        setNotifData(nottif);
        setImgURL(nottif.notification.android.imageUrl);
        setTitleData(nottif.notification.title);
        setBodyData(nottif.notification.body);
      } else {
        setNotifData({});
        setImgURL({});
        setTitleData({});
        setBodyData({});
      }
    });

    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        console.log(`Topic: ${TOPIC} Suscribed`);
      });

    return () => {
      unsubscribe;
    };
  };

  const AddNotifF = async () => {
    await handleNotification().then(() => {
      console.log("AddNotifF()...");
      if (
        Object.keys(titleData).length > 0 &&
        Object.keys(bodyData).length > 0 &&
        Object.keys(imgURL).length > 0
      ) {
        firestore()
          .collection("Users")
          .doc(auth().currentUser.uid)
          .collection("Notification")
          .add({
            title: titleData,
            body: bodyData,
            imageUrl: imgURL,
            createdAt: today,
          })
          .then(() => {
            console.log("New Notification Added");
            setNotifData({});
            setImgURL({});
            setTitleData({});
            setBodyData({});
          })
          .catch((error) => {
            setLoading(false);
            console.log(
              "Something went wrong with added Notification to firestore: ",
              error
            );
          });
      } else {
        console.log("Firestore is not getting any value");
      }
      console.log("ALL notifData: ", notifData);
      console.log("ImgURL: ", imgURL);
      console.log("TitleDAta: ", titleData);
      console.log("Body Data", bodyData);
    });
  };

  const getUserNotification = async () => {
    await AddNotifF().then(() => {
      console.log("getUserNotification()...");
      firestore()
        .collection("Users")
        .doc(auth().currentUser.uid)
        .collection("Notification")
        .get()
        .then((querySnapshot) => {
          let temp = [];
          querySnapshot.forEach((documentSnapshot) => {
            let userDetails = {};
            userDetails = documentSnapshot.data();
            userDetails["id"] = documentSnapshot.id;
            temp.push(userDetails);
            setGetNotifData(temp);
            console.log("userDetails...", userDetails);
            let recent = temp.filter((item) => {
              return item.createdAt == today;
            });
            setrecentData(recent);

            let past = temp.filter((item) => {
              return item.createdAt != today;
            });
            setpastData(past);
          });
        });
    });
  };

  useEffect(() => {
    // dataFilter();
    // handleNotification();
    // AddNotifF();
    getUserNotification();
  }, [isFocused]);

  const backScreen = () => {
    props.navigation.pop();
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar back={backScreen} title="Notification" rightNull Ctitle />
      {getNotifData.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {recentData.length > 0 ? (
            <>
              <Text style={Styles.HeadTxt}>Recent</Text>
              <ListComponent data={recentData} />
            </>
          ) : null}

          {pastData.length > 0 ? (
            <>
              <Text style={Styles.HeadTxt}>Past</Text>
              <ListComponent data={pastData} />
            </>
          ) : null}
        </ScrollView>
      ) : (
        <View
          style={{
            height: hp(82),
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[Styles.ETxt]}>You don't have any Notification yet</Text>
        </View>
      )}
    </View>
  );
};

export default Notifications;
