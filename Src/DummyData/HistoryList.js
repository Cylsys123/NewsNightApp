import { Image } from "react-native";
import React from "react";
import {
  hp,
  wp,
  color,
  isANDROID,
} from "../Components/CommonUtills/ThemeHelper";
import Images from "../Assets/Images/Images";

export const Data = [
  {
    id: "1",
    icon: "arrow-bottom-left",
    remark: "Wallet Top-up",
    time: "Today",
    amount: "100",
    transaction: "Credited",
    color: color.greenMint,
  },
  {
    id: "2",
    icon: "arrow-top-right",
    remark: "Withdraw",
    time: "2 days ago",
    amount: "20",
    transaction: "Debited",
    color: color.redTheme,
  },
];
