import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "../../Firebase/AuthProvider";
import { View } from "react-native";
import { Loader } from "../../Components/CommonUtills/ThemeHelper";
import DrawerTabs from "../DrawerTabs/DrawerTabs";
import Splash from "../../Screens/Splash/Splash";
import SignIn from "../../Screens/Registrations/SignIn/SignIn";
import SignUp from "../../Screens/Registrations/SignUp/SignUp";
import ForgotPassword from "../../Screens/Registrations/ForgotPassword/ForgotPassword";
import Verification from "../../Screens/Registrations/Verification/Verification";
import CreatePassword from "../../Screens/Registrations/CreatePassword/CreatePassword";
import Type from "../../Screens/Type/Type";
import PlayQuiz from "../../Screens/PlayQuiz/PlayQuiz";
import PlayEvent from "../../Screens/PlayEvent/PlayEvent";
import News from "../../Screens/News/News";
import MyEventsView from "../../Screens/MyEventsView/MyEventsView";
import ContactUs from "../../Screens/ContactUs/ContactUs";
import Notifications from "../../Screens/NotificationScreen/Notifications";
import AddCoins from "../../Screens/Coins/AddCoins/AddCoins";
import TermsAndConditions from "../../Screens/TermsAndConditions/TermsAndConditions";

const AuthNav = createStackNavigator();
const AppNav = createStackNavigator();

const AuthStack = (props) => {
  return (
    <AuthNav.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"SignIn"}
    >
      <AuthNav.Screen name="SignIn" component={SignIn} />
      <AuthNav.Screen name="SignUp" component={SignUp} />
      <AuthNav.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthNav.Screen name="Verification" component={Verification} />
      <AuthNav.Screen name="CreatePassword" component={CreatePassword} />
      <AppNav.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </AuthNav.Navigator>
  );
};
const AppStack = (props) => {
  return (
    <AppNav.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"DrawerTabs"}
    >
      <AppNav.Screen name="DrawerTabs" component={DrawerTabs} />
      <AppNav.Screen name="Type" component={Type} />
      <AppNav.Screen name="PlayQuiz" component={PlayQuiz} />
      <AppNav.Screen name="PlayEvent" component={PlayEvent} />
      <AppNav.Screen name="News" component={News} />
      <AppNav.Screen name="MyEventsView" component={MyEventsView} />
      <AppNav.Screen name="ContactUs" component={ContactUs} />
      <AppNav.Screen name="Notifications" component={Notifications} />
      <AppNav.Screen name="AddCoins" component={AddCoins} />
    </AppNav.Navigator>
  );
};

const Routes = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  console.log("initializing....", initializing);

  if (initializing)
    return (
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
        <Loader visible={initializing} />
      </View>
    );

  return (
    <NavigationContainer>
      <AppNav.Navigator headerMode="none" initialRouteName="Splash">
        <AppNav.Screen name="Splash" component={Splash} />
        <AppNav.Screen name="AuthStack" component={AuthStack} />
        <AppNav.Screen name="AppStack" component={AppStack} />
      </AppNav.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
