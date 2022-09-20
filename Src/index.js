import "react-native-gesture-handler";
import * as React from "react";
import Routes from "./Navigations/Routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

console.disableYellowBox = true;

const Main = () => {
  return (
    <>
      <Routes />
    </>
  );
};
export default Main;
