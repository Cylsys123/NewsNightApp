import React, { useState, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity, Image } from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import {
  hp,
  wp,
  color,
  isANDROID,
  Loader,
} from "../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../Components/TopBar/TopBar";
import { Data, Data1 } from "../../DummyData/CategoryList";
import Styles from "./Styles";
import Filter from "../../DummyData/Filter";

const Category = (props) => {
  const [listData, setListData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const isFocused = useIsFocused();

  const [onSelectBgColor, setonSelectBgColor] = useState();
  const [isLoading, setLoading] = useState(false);

  const filterMember = (text) => {
    const newData = listData.filter((item) => {
      const itemData = `${item.Category.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilterData(newData);
    if (text == "") {
      setFilterData(listData);
    }
  };

  // console.log("filterData..", filterData);

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection("Admin Panel")
      .get()
      .then((querySnapshot) => {
        setLoading(false);
        let temp = [];
        console.log("Total Data of Category: ", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          console.log("user Id: ", documentSnapshot.id);
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails["id"] = documentSnapshot.id;
          temp.push(userDetails);
          setListData(temp);
          setFilterData(temp);
        });
      });
  }, [isFocused]);
  const backToScreen = () => {
    props.navigation.toggleDrawer();
  };
  const NavTab = (data) => {
    props.navigation.navigate("Type", { data });
    // console.log("data", data);
  };

  const BgColor = (index) => {
    setonSelectBgColor(index);
  };

  // console.log("listData", listData);

  const renderList = ({ item, index }) => {
    // const BgColor = (index) => {
    //   setonSelectBgColor(index);

    //   // if (index == index) {
    //   //   setonSelectBgColor(true);
    //   // } else {
    //   //   setonSelectBgColor(false);
    //   // }
    // };

    return (
      <View
        style={{
          paddingVertical: wp(4.5),
          paddingLeft: wp(4),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            filterMember(item.Category);
            // BgColor(index);
          }}
        >
          <View
            style={{
              alignItems: "center",
              // backgroundColor: onSelectBgColor == index ? color.blueBg : null,
              // width: wp(17),
            }}
          >
            {/* {item.image} */}
            <Image
              source={{ uri: item.ArticlePicture }}
              style={{
                borderRadius: 100,
                height: wp(15),
                width: wp(15),
              }}
            />
            <Text
              style={{ color: color.black, fontSize: 12, marginTop: wp(2) }}
              // numberOfLines={1}
            >
              {/* {item.Name} */}
              {item.Category}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderList2 = ({ item }) => {
    return (
      <>
        {/* {subListData && ( */}
        <View style={[Styles.Card2]}>
          <View style={Styles.ImgView}>
            {/* {item.image} */}
            <Image
              source={{ uri: item.ArticlePicture }}
              style={{ borderRadius: 10, width: wp(30), height: wp(20) }}
            />
          </View>
          <View style={{ alignSelf: "center", flex: 1.3 }}>
            <Text style={Styles.NameTxt}>{item.Name}</Text>
            <Text style={Styles.DetailsTxt}>{item.Headline}</Text>
          </View>

          <View
            style={{
              flex: 0.3,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => NavTab(item)}>
              <Icon_1
                name="chevron-right"
                size={50}
                color={color.greenMint}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* )} */}
      </>
    );
  };

  return (
    <View>
      {/* <TopBar back={backToScreen} title="Category" Ctitle /> */}
      <TopBar open={backToScreen} black title="Category" Ctitle />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={listData}
        renderItem={renderList}
        keyExtractor={(item) => item.id}
        style={{
          backgroundColor: color.white,
          marginTop: wp(3),
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        // data={listData}
        data={filterData ? filterData : listData}
        renderItem={renderList2}
        keyExtractor={(item) => item.id}
        style={{ marginTop: wp(3), marginHorizontal: wp(4) }}
      />
      {isLoading ? (
        <View style={Styles.LoaderStyle}>
          <Loader visible={isLoading} />
        </View>
      ) : null}
    </View>
  );
};

export default Category;
