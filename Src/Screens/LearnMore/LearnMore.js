import React, { useState, useEffect, useLayoutEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  hp,
  wp,
  color,
  Loader,
  isANDROID,
} from "../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../Components/TopBar/TopBar";
import Images from "../../Assets/Images/Images";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon_1 from 'react-native-vector-icons/MaterialCommunityIcons';

const LearnMore = (props) => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  // useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     headerBackTitle: '',
  //     headerBackVisible: false,
  //     headerShown: true,
  //     title: 'Learn More',
  //     headerTitleAlign: 'center',
  //     headerStyle: { backgroundColor: '#fff', },
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         onPress={() => {
  //           // props.navigation.goBack();
  //           // props.navigation.pop();
  //           openDrawer();
  //         }}
  //         style={[styles.headerLeftContainer]}>
  //         <View style={[styles.iconContainer]}>
  //           <Icon_1
  //             name={'text'}
  //             size={isANDROID ? 25 : 30}
  //             color='#000'
  //             style={[{ alignSelf: 'center', }]}
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     ),
  //   });
  // });

  const openDrawer = () => {
    // props.navigation.openDrawer();
    props.navigation.toggleDrawer();
  };

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection("Learn More Content")
      .doc("qhj9jvCy8My7Cw88cJUx")
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        console.log("......", JSON.stringify(userDetails?.Data));
        setUserData(userDetails?.Data);
      })
      .catch((e) => {
        setLoading(false);
        alert("Something went wrong");
      });
  }, [isFocused]);


  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { justifyContent: 'center', }]}>
        <ActivityIndicator
          animating={isLoading}
          size={'large'}
          color={color.blueTheme}
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.mainContainer]}>
        {/* <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.flatContainer]}
        data={userData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          console.log("item....",item);
          return (
            <View > </View>
          );
        }}
      /> */}
        {/* <TopBar back={openDrawer} title="Learn More" rightNull Ctitle /> */}
        <TopBar open={openDrawer} black title="Learn More" Ctitle />
        <ScrollView showsVerticalScrollIndicator={false}>
          {userData.length > 0 ? (
            userData.map((element, index) => {
              return (
                <View style={[{ marginHorizontal: wp(6), marginTop: hp(2), }]}>
                  {element.Question ? (
                    <Text style={[{ alignSelf: 'center', marginTop: hp(1.2), fontWeight: '700', }]}>{element?.Question || ''}</Text>
                  ) : null}
                  {element.Answer ? (
                    <Text style={[{ marginTop: hp(1.2), }]}>{element?.Answer || ''}</Text>
                  ) : null}
                </View>
              );
            })
          ) : null}
        </ScrollView>
        {isLoading ? (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Loader visible={isLoading} />
          </View>
        ) : null}
      </View>

    );
  }
};
const styles = StyleSheet.create({
  headerLeftContainer: {
    // borderWidth:1,
    // marginLeft: isANDROID ? wp(0) : wp(4),
    paddingLeft: wp(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: wp(4),
  },
  flatContainer: {
    paddingBottom: hp(5),
    marginLeft: wp(2),
  },
});
export default LearnMore;
