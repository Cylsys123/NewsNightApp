import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "../../Firebase/AuthProvider";

import { View } from "react-native";
import { Loader } from "../../Components/CommonUtills/ThemeHelper";

import { StackNav } from "./StackTest";

import AppNavigation from "../../Navigations/AppNavigation/AppNavigation";

const Routes = (props) => {
  // const { user, setUser } = useContext(AuthContext);
  // const [initializing, setInitializing] = useState(true);

  // const onAuthStateChanged = (user) => {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // console.log("initializing....", initializing);

  // if (initializing)
  //   return (
  //     <View
  //       style={{
  //         position: "absolute",
  //         left: 0,
  //         right: 0,
  //         top: 0,
  //         bottom: 0,
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Loader visible={initializing} />
  //     </View>
  //   );

  return (
    // <NavigationContainer>
    //   {user ? <StackNav /> : <StackNav />}
    // </NavigationContainer>
    <AppNavigation />
  );
};

export default Routes;
