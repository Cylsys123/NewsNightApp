import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../Components/TopBar/TopBar";
import Styles from "./Styles";
import MainButton from "../../Components/MainButton/MainButton";
import Images from "../../Assets/Images/Images";

const Type = (props, item) => {
  const backToScreen = () => {
    props.navigation.pop();
  };

  const ReadNews = (data) => {
    props.navigation.navigate("News", { data });
    // console.log("ReadNewsData", data);
  };

  const TakeQuiz = (data) => {
    props.navigation.navigate("PlayQuiz", { data });
    // console.log("TakeQuizData", data);
  };

  const PlayEvent = (data) => {
    props.navigation.navigate("PlayEvent", { data });
    // console.log("PlayEventData", data);
  };
  // console.log("Type..Data..", props.route.params.data);
  console.log(
    "Iddddddd",
    props.route.params.data.id,
    props.route.params.data.Name,
    props.route.params.data.Category
  );

  return (
    <>
      <TopBar
        back={backToScreen}
        title={props.route.params.data.Category}
        Ctitle
      />
      <View style={Styles.Card}>
        <Text style={Styles.HeadTxt}>{props.route.params.data.Name}</Text>

        <TouchableOpacity onPress={() => ReadNews(props.route.params.data)}>
          <Image source={Images.ReadNews} style={Styles.Img} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TakeQuiz(props.route.params.data)}>
          <Image source={Images.TakeQuiz} style={Styles.Img} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => PlayEvent(props.route.params.data)}>
          <Image source={Images.PlayEvent} style={Styles.Img} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Type;
