import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../Components/CommonUtills/ThemeHelper";
import MainButton from "../Components/MainButton/MainButton";
import { Data1, SubData } from "./FilterList";

const Filter = (props) => {
  const [value, setvalue] = useState(Data1);
  const [filterData, setFilterData] = useState();

  const handler_1 = (data, idx) => {
    console.log("\n");
    console.log("\n");
    console.log("data", data);
    console.log("idx", idx);
    const ary1 = [...value];
    let ary2 = ary1.map((item, index) => {
      if (idx == index) {
        item.isSelected = !item.isSelected;
      }
      return { ...item };
    });
    // console.log("selected val", ary2.filter(item => { return item.isSelected == true }));
    setvalue(ary2);
    setFilterData(
      ary2.filter((item) => {
        return item.isSelected == true;
      })
    );
  };
  const renderList = ({ item, index }) => {
    console.log("item", item);
    return (
      <View style={Styles.RenderView}>
        <TouchableOpacity
          onPress={() => handler_1(item, index)}
          style={[
            Styles.FilterTouch,
            item.isSelected ? { borderWidth: 5 } : { borderWidth: 0.5 },
          ]}
        >
          <Text style={{ alignSelf: "center" }}>{item.title}</Text>
        </TouchableOpacity>
        <View style={{ marginRight: wp(2), marginBottom: wp(3) }} />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal
        visible={props.visible}
        onRequestClose={props.onClose}
        animationType="slide"
        transparent={true}
      >
        <View
          style={[
            Styles.ModalView,
            isANDROID ? Styles.ModalViewAndroid : Styles.ModalViewiOS,
          ]}
        >
          {filterData ? (
            filterData != "" || filterData != null ? (
              <View style={{ flexDirection: "row" }}>
                {filterData.map((item) => {
                  return (
                    <Text style={{ alignSelf: "center" }}>
                      {item.title}
                      {", "}
                    </Text>
                  );
                })}
              </View>
            ) : null
          ) : null}
          <TouchableOpacity
            onPress={props.onClose}
            style={Styles.MinimizeModal}
          />
          <Text style={Styles.MainHead}>Filters</Text>
          <Text style={Styles.Head}>Category</Text>
          <View style={Styles.Line} />
          <View style={{ height: hp(15), marginTop: wp(2) }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={value}
              renderItem={renderList}
              keyExtractor={(item) => item.id}
              style={Styles.FlatListStyle}
            />
          </View>
          <View style={{ flexDirection: "row", marginHorizontal: wp(3) }}>
            <View style={{ flex: 1 }}>
              <MainButton
                btnName="Cancel"
                action={props.onClose}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.blackTheme}
                btnColor={color.white}
                fontSize={18}
                alignSelf={"stretch"}
              />
            </View>
            <View style={{ marginHorizontal: wp(2) }} />
            <View style={{ flex: 1 }}>
              <MainButton
                btnName="Apply"
                action={() => {
                  console.log("...Apply");
                }}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.white}
                btnColor={color.greenMint}
                fontSize={18}
                alignSelf={"stretch"}
              />
            </View>
          </View>
        </View>
      </Modal>
      {console.log("value", value)}
      {console.log("filterData", filterData)}
    </View>
  );
};
export default Filter;

const Styles = StyleSheet.create({
  ModalView: {
    backgroundColor: color.white,
    //top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    marginHorizontal: wp(4.2),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: hp(5),
    flex: 1,
  },
  ModalViewAndroid: { elevation: 10 },
  ModalViewiOS: {
    shadowColor: color.blackTheme,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.5,
  },
  RenderView: { flex: 1, marginLeft: wp(2) },
  FilterTouch: {
    borderColor: color.greenMint,
    borderRadius: 100,
    padding: wp(3),
  },
  MinimizeModal: {
    backgroundColor: color.grayShade,
    height: wp(1.5),
    width: wp(15),
    borderRadius: 10,
    alignSelf: "center",
    marginVertical: hp(1.2),
  },
  MainHead: {
    color: color.blackTheme,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  Head: {
    color: color.blackTheme,
    fontSize: 16,
    marginLeft: wp(4.2),
  },
  Line: {
    borderBottomWidth: 0.5,
    borderColor: color.grayShade,
    marginVertical: wp(1),
  },
  FlatListStyle: {
    marginLeft: wp(3),
    marginRight: wp(4.2),
  },
});
