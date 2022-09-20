import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  ImageBackground,
  Animated,
  StyleSheet,
  View,
} from "react-native";

import Logos from "../../Assets/Logos/Logos";
import Images from "../../Assets/Images/Images";
import { hp, wp } from "../../Components/CommonUtills/ThemeHelper";
import { AuthContext } from "../../Firebase/AuthProvider";
import { CommonActions } from "@react-navigation/native";

const Splash = (props) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      // props.navigation.navigate(user ? "DrawerTabs" : "SignIn");
      if (user) {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            // routes: [{ name: "DrawerTabs" }],
            routes: [{ name: "AppStack" }],
          })
        );
      } else {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            // routes: [{ name: "SignIn" }],
            routes: [{ name: "AuthStack" }],
          })
        );
      }
    }, 3000);
  });
  const position = new Animated.ValueXY({ x: 0, y: 600 });
  Animated.spring(position, {
    toValue: { x: 0, y: 0 },
    bounciness: 20,
    speed: 2,
  }).start();

  return (
    <>
      <ImageBackground
        style={{
          flex: 1,
        }}
        // imageStyle={{resizeMode='stretch'}}
        source={Images.Background}
      >
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            justifyContent: "center",
          }}
        >
          <Animated.View
          // style={{transform: [ { translateX: position.x },{ translateY: position.y }]}}
          >
            <Image style={styles.Img} source={Logos.Logo} />
          </Animated.View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Img: {
    height: wp(40.5),
    width: wp(90),
    // resizeMode:"stretch",
    alignSelf: "center",
    marginLeft: wp(15),
  },
});
