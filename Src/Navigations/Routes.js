import React from "react";
import { View } from "react-native";
import AppNavigation from "./AppNavigation/AppNavigation";
import { AuthProvider } from "../Firebase/AuthProvider";

const Routes = (props) => {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default Routes;
