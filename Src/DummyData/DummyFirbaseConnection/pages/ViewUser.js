import React, { useState } from "react";
import { Text, View } from "react-native";
import Mytextinput from "../components/Mytextinput";
import Mybutton from "../components/Mybutton";
import firestore from "@react-native-firebase/firestore";

const ViewUser = () => {
  let [userId, setUserId] = useState("");
  let [userData, setUserData] = useState({});

  const searchUser = () => {
    if (userId) {
      firestore()
        .collection("Users")
        .doc(userId)
        .get()
        .then((documentSnapshot) => {
          /*
            A DocumentSnapshot belongs to a specific document,
            With snapshot you can view a documents data,
            metadata and whether a document actually exists.
          */
          let userDetails = {};
          // Document fields
          userDetails = documentSnapshot.data();
          // All the document related data
          userDetails["id"] = documentSnapshot.id;
          setUserData(userDetails);
          console.log("..", userDetails);
        });
    }
  };

  return (
    <View style={{ paddingHorizontal: 35 }}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={(userId) => setUserId(userId)}
        value={userId}
        style={{ padding: 10 }}
      />
      <Mybutton title="Search User" customClick={searchUser} />
      <View style={{ marginTop: 10 }}>
        <Text>User Id: {userData ? userData.id : ""}</Text>
        <Text>User Name: {userData ? userData.name : ""}</Text>
        <Text>User Contact: {userData ? userData.contact : ""}</Text>
        <Text>User Address: {userData ? userData.address : ""}</Text>
      </View>
    </View>
  );
};

export default ViewUser;
