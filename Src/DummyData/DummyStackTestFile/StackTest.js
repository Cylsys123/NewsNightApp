import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

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

const Stack = createStackNavigator();

export const StackNav = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Splash"}
    >
      <Stack.Screen name="DrawerTabs" component={DrawerTabs} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="Type" component={Type} />
      <Stack.Screen name="PlayQuiz" component={PlayQuiz} />
      <Stack.Screen name="PlayEvent" component={PlayEvent} />
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="MyEventsView" component={MyEventsView} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="AddCoins" component={AddCoins} />
    </Stack.Navigator>
  );
};
