import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import { wp, color } from "../../Components/CommonUtills/ThemeHelper";
import Icons from "../../Assets/Icons/Icons";
import Images from "../../Assets/Images/Images";
import Styles from "./Styles";

const ListComponent = (props) => {
  const NavSearch = (data) => {
    props.navigation.navigate("MyEventsView", { data });
    // console.log("data...", data);
  };
  // const date = Date();
  // date.toString();
  // console.log("......", date.toString());

  const renderList = ({ item }) => {
    return (
      <>
        <TouchableOpacity style={[Styles.Card]} onPress={() => NavSearch(item)}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.ImgView}>
              <Image
                source={{ uri: item.ArticlePicture }}
                style={{ borderRadius: 10, height: wp(20), width: wp(30) }}
              />
            </View>
            <View style={{ alignSelf: "center", flex: 1.1 }}>
              <Text style={Styles.NameTxt}>{item.Name}</Text>
              <Text style={Styles.DetailsTxt}>{item.Headline}</Text>
              <Text style={Styles.DateTimeTxt}>{item.createdAt}</Text>
            </View>

            <View style={{ flex: 0.6 }}>
              {item.Open == true ? (
                <View
                  style={[
                    Styles.OpenClose,
                    { backgroundColor: color.greenMint },
                  ]}
                >
                  <Text style={Styles.OpenCloseTxt}>Open</Text>
                </View>
              ) : (
                <View
                  style={[
                    Styles.OpenClose,
                    { backgroundColor: color.redIndicater },
                  ]}
                >
                  <Text style={Styles.OpenCloseTxt}>Closed</Text>
                </View>
              )}
            </View>
          </View>
          <View style={Styles.ViewPartEarn}>
            <View style={Styles.LeftRightView}>
              <Text style={Styles.HTxt}>Participants</Text>
              <Icon_1
                name="account"
                size={18}
                color={color.blueTheme}
                style={{ marginHorizontal: wp(2) }}
              />
              <Text style={Styles.Txt}>{item.Participants}</Text>
            </View>
            {/* <View style={{ marginHorizontal: wp(7) }} /> */}
            <View style={{ ...Styles.LeftRightView }}>
              <Text style={Styles.HTxt}>Earned Coins</Text>
              <View style={{ alignSelf: "center" }}>
                <Image
                  source={Icons.Coins}
                  style={{ marginHorizontal: wp(2) }}
                />
              </View>
              <Text style={Styles.Txt}>{parseInt(item.EarnedCoins)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data}
        scrollEnabled={false}
        renderItem={renderList}
        keyExtractor={(item) => item.id}
        style={{ paddingHorizontal: wp(4.2) }}
      />
    </View>
  );
};

export default ListComponent;
