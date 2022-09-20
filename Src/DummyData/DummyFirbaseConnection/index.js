import "react-native-gesture-handler";

import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./pages/HomeScreen";
import RegisterUser from "./pages/RegisterUser";
import UpdateUser from "./pages/UpdateUser";
import ViewAllUser from "./pages/ViewAllUser";
import ViewUser from "./pages/ViewUser";
import DeleteUser from "./pages/DeleteUser";
import RealTimeAddUpdateUser from "./pages/RealTimeAddUpdateUser";
import AddOrderSummary from "./pages/AddOrderSummary";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#03A89E", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{ title: "Update" }}
        />
        <Stack.Screen
          name="ViewAllUser"
          component={ViewAllUser}
          options={{ title: "View All" }}
        />
        <Stack.Screen
          name="ViewUser"
          component={ViewUser}
          options={{ title: "View" }}
        />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{ title: "Delete" }}
        />
        <Stack.Screen
          name="RealTimeAddUpdateUser"
          component={RealTimeAddUpdateUser}
          options={{ title: "Real Time Updates" }}
        />
        <Stack.Screen
          name="AddOrderSummary"
          component={AddOrderSummary}
          options={{ title: "Add Order Summary" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
