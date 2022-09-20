import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import { hp, wp, color } from "../../Components/CommonUtills/ThemeHelper";
import Styles from "./Styles";

const ListComponent = (props) => {
  const [List, setList] = useState(props.data);
  const [NewList, setNewList] = useState(props.data);

  const ClearItem = (id) => {
    firestore()
      .collection("Users")
      .doc(userId)
      .delete()
      .then(() => {
        console.log("Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderHiddenItem = (item, index) => {
    // console.log("item.....", item);
    return (
      <TouchableOpacity
        style={Styles.Swipe}
        // onPress={() => ClearItem(index)}
      >
        <Icon_1 name="trash-can-outline" size={40} color={color.white} />
      </TouchableOpacity>
    );
  };

  const renderList = ({ item, index }) => {
    return (
      <>
        <View style={Styles.Card}>
          <View style={{ alignSelf: "center", flex: 0.3 }}>
            {/* {item.image} */}
            <Image
              source={{ uri: item.imageUrl }}
              style={{ borderRadius: 100, width: wp(13), height: wp(13) }}
            />
          </View>
          <View style={{ alignSelf: "center", flex: 1 }}>
            <Text style={Styles.HTxt}>{item.title}</Text>
            <Text style={Styles.Txt}>{item.body}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={{}}>
      <SwipeListView
        showsVerticalScrollIndicator={false}
        data={props.data}
        scrollEnabled={false}
        renderItem={renderList}
        keyExtractor={(item) => item.id}
        style={{ paddingBottom: hp(3), paddingHorizontal: wp(4.2) }}
        renderHiddenItem={renderHiddenItem}
        disableRightSwipe={true}
        disableLeftSwipe={true}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    </View>
  );
};

export default ListComponent;
