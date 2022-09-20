import React, { useState, useEffect } from "react";
import {
  ScrollView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  hp,
  wp,
  color,
  Loader,
} from "../../Components/CommonUtills/ThemeHelper";
import Images from "../../Assets/Images/Images";
import MainButton from "../../Components/MainButton/MainButton";
import Styles from "./Styles";
import { useIsFocused } from "@react-navigation/native";

const News = (props) => {
  const [heart, setHeart] = useState();
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const data = props.route.params.data;
  // console.log("News.....", data);

  const getUser = async () => {
    setLoading(true);
    await firestore()
      .collection("Admin Panel")
      .doc(data.id)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setUserData(userDetails);
        setHeart(userDetails.Favourite);
      });
  };

  useEffect(() => {
    getUser();
  }, [heart, isFocused]);

  const isfavourite = async (dataa) => {
    setLoading(true);
    setHeart(dataa);
    firestore()
      .collection("Admin Panel")
      .doc(data.id)
      .update({
        Favourite: dataa,
      })
      .then(() => {
        console.log(
          heart == true
            ? "Removed from favourite List"
            : "Added in favourite list"
        );
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        alert(e);
      });
    // firestore()
    //   .collection("Users")
    //   .doc(auth().currentUser.uid)
    //   .collection("Favourite")
    //   .add({
    //     Article: data.Article,
    //     ArticlePicture: data.ArticlePicture,
    //     Author: data.Author,
    //     BetQuestion: data.BetQuestion,
    //     Category: data.Category,
    //     CategoryId: data.CategoryId,
    //     Favourite: true,
    //     Headline: data.Headline,
    //     Live: data.Live,
    //     Name: data.Name,
    //     Open: data.Open,
    //     Quiz: data.Quiz,
    //     Trending: data.Trending,
    //   })
    //   .then(() => {
    //     console.log("Added in Favourite List");
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.log(
    //       "Something went wrong with added History to firestore: ",
    //       error
    //     );
    //   });
  };

  console.log("userDataiddddd", data.id);
  console.log("userDatails", userData);

  const backToScreen = () => {
    props.navigation.pop();
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <ImageBackground
          //  source={Images.Business}
          source={{ uri: data.ArticlePicture }}
          style={Styles.ImgBg}
        >
          <View style={Styles.IconView}>
            <TouchableOpacity
              style={[Styles.IconTouch, { padding: wp(1) }]}
              onPress={backToScreen}
            >
              <Icon_1 name="chevron-left" size={30} color={color.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[Styles.IconTouch, { padding: wp(1.5) }]}
              onPress={() => isfavourite(!heart)}
            >
              <Icon_1
                name="heart"
                size={25}
                color={heart == true ? color.redTheme : color.white}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={Styles.ContentView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ height: hp(33) }}
          >
            <View style={{ flex: 1 }}>
              <Text style={Styles.ContentHead}>{data.Headline}</Text>
              <Text
                style={{
                  color: color.blackTheme,
                  fontSize: 12,
                  textAlign: "justify",
                }}
              >
                {data.Author}
                {"\n"}
              </Text>
            </View>

            <View style={{ flex: 2 }}>
              <Text
                style={{
                  color: color.blackTheme,
                  fontSize: 14,
                  textAlign: "justify",
                }}
              >
                {data.Article}
              </Text>
            </View>
          </ScrollView>

          <View style={Styles.BtnView}>
            <View style={{ flex: 1 }}>
              <MainButton
                btnName="Play Quiz"
                action={() => {
                  props.navigation.navigate("PlayQuiz", { data });
                }}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.white}
                btnColor={color.greenMint}
                fontSize={18}
              />
            </View>
            <View style={{ marginHorizontal: wp(3) }} />
            <View style={{ flex: 1 }}>
              <MainButton
                btnName="Play Event"
                action={() => {
                  props.navigation.navigate("PlayEvent", { data });
                }}
                borderColor={color.greenMint}
                borderWidth={0.5}
                btntextColor={color.greenMint}
                btnColor={color.white}
                fontSize={18}
              />
            </View>
          </View>
        </View>
        {isLoading ? (
          <View style={Styles.Loader}>
            <Loader visible={isLoading} />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default News;
