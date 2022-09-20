import React, { useState, useEffect, useCallback } from "react";
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  hp,
  wp,
  color,
  Loader,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../Components/TopBar/TopBar";
import Styles from "./Styles";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const FavoriteType = (props) => {
  const [favData, setFavData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const openDrawer = () => {
    props.navigation.toggleDrawer();
  };

  const NavNews = (data) => {
    props.navigation.navigate("Type", { data });
  };

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection("Admin Panel")
      // .collection("Users")
      // .doc(auth().currentUser.uid)
      // .collection("Favourite")
      .get()
      .then((querySnapshot) => {
        setLoading(false);
        let temp = [];
        querySnapshot.forEach((documentSnapshot) => {
          let userDetails = {};
          userDetails = documentSnapshot.data();
          userDetails["id"] = documentSnapshot.id;
          temp.push(userDetails);

          let favouriteData = temp.filter((item) => {
            return item.Favourite == true;
          });
          setFavData(favouriteData);
        });
      });
  }, [refreshing, isFocused]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
            {/* {item.Live == true && (
              <View style={Styles.LiveView}>
                <Text style={Styles.LiveTxt}>Live</Text>
              </View>
            )} */}
            <TouchableOpacity onPress={() => NavNews(item)}>
              <Icon_1
                name="chevron-right"
                size={50}
                color={color.greenMint}
                style={{
                  alignSelf: "center",
                  // marginTop: item.Live == true ? wp(3) : wp(6),
                  marginTop: wp(6),
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
    <View style={{ flex: 1 }}>
      <TopBar open={openDrawer} black title="Favourite" Ctitle />
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favData}
          renderItem={renderList}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: wp(3), marginHorizontal: wp(4) }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {isLoading ? (
          <View style={Styles.Loader}>
            <Loader visible={isLoading} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default FavoriteType;
