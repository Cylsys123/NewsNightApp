import React from "react";
import { TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import { wp, color } from "../../Components/CommonUtills/ThemeHelper";
import Styles from "./Styles";

const ListComponent = (props) => {
  const NavNews = (data) => {
    props.navigation.navigate("Type", { data });
  };

  const renderList = ({ item }) => {
    return (
      <>
        {/* {item.Trending == true && ( */}
        <View style={[Styles.Card2]}>
          <View style={Styles.ImgView}>
            <Image source={{ uri: item.ArticlePicture }} style={Styles.Img} />
          </View>
          <View style={{ alignSelf: "center", flex: 1.3 }}>
            <Text style={Styles.NameTxt}>{item.Name}</Text>
            <Text style={Styles.DetailsTxt}>{item.Headline}</Text>
          </View>

          <View style={{ flex: 0.3 }}>
            {item.Live == true && (
              <View style={Styles.LiveView}>
                <Text style={Styles.LiveTxt}>Live</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => NavNews(item)}>
              <Icon_1
                name="chevron-right"
                size={50}
                color={color.greenMint}
                style={{
                  alignSelf: "center",
                  marginTop: item.Live == true ? wp(3) : wp(6),
                }}
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={props.data}
        renderItem={renderList}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: wp(3), marginHorizontal: wp(4) }}
      />
    </View>
  );
};

export default ListComponent;
