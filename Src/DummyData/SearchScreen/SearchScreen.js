import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import { Data } from "../SearchList";
import Styles from "./Style";

const SearchScreen = (props) => {
  const [masterData, setMasterData] = useState(Data);
  const [filterData, setFilterData] = useState(Data);

  const backToScreen = () => {
    props.navigation.pop();
  };

  const filterMember = (text) => {
    const newData = masterData.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setFilterData(newData);
    if (text == "") {
      setFilterData(masterData);
    }
    //setMemberInputValue(text);
  };

  const resetInputField = () => {
    setFilterData("");
  };

  const renderList = ({ item }) => {
    return (
      <>
        <View style={Styles.Card}>
          <View>{item.image}</View>
          <View>
            <Text style={Styles.NameTxt}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("News");
              }}
              style={Styles.ViewBtn}
            >
              <Text style={Styles.ViewTxt}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <View>
      <View style={Styles.TopbarMain}>
        <View style={Styles.Topbar}>
          <TextInput
            placeholder="Search..."
            onChangeText={(text) => {
              filterMember(text);
            }}
            value={filterData}
            style={{ paddingLeft: wp(5) }}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={resetInputField}
              style={Styles.ClearTouch}
            >
              <Text style={Styles.ClearTxt}> Clear</Text>
            </TouchableOpacity>
            <Icon_1
              name="close"
              color={color.gray}
              size={25}
              onPress={backToScreen}
            />
          </View>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filterData ? filterData : masterData}
        renderItem={renderList}
        keyExtractor={(item) => item.id}
        style={{ marginTop: wp(3) }}
      />
    </View>
  );
};

export default SearchScreen;
