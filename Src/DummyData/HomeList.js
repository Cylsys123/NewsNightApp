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
    BgColor: color.blueTheme,
  },
  {
    id: "2",
    BgColor: color.yellow,
  },
  {
    id: "3",
    BgColor: color.greenMint,
  },
  {
    id: "4",
    BgColor: color.redTheme,
  },
  {
    id: "5",
    BgColor: color.linkblue,
  },
];

export const Data2 = [
  {
    id: "1",
    name: "IPL 2021 Final",
    trending: true,
    live: true,
    image: (
      <Image
        source={Images.Business}
        style={{ borderRadius: 10, width: wp(30), height: wp(20) }}
      />
    ),
    details:
      "Chennai Super Kings face the Kolkata Knight Riders in the Final of IPL 2021 on Friday",
  },
  {
    id: "2",
    name: "IPL 2021 Final",
    trending: true,
    live: true,
    image: (
      <Image
        source={Images.Business}
        style={{ borderRadius: 10, width: wp(30), height: wp(20) }}
      />
    ),
    details:
      "Chennai Super Kings face the Kolkata Knight Riders in the Final of IPL 2021 on Friday",
  },
  {
    id: "3",
    name: "IPL 2021 Final",
    trending: true,
    live: false,
    image: (
      <Image
        source={Images.Business}
        style={{ borderRadius: 10, width: wp(30), height: wp(20) }}
      />
    ),
    details:
      "Chennai Super Kings face the Kolkata Knight Riders in the Final of IPL 2021 on Friday",
  },
  {
    id: "4",
    name: "IPL 2021 Final",
    trending: true,
    live: false,
    image: (
      <Image
        source={Images.Business}
        style={{ borderRadius: 10, width: wp(30), height: wp(20) }}
      />
    ),
    details:
      "Chennai Super Kings face the Kolkata Knight Riders in the Final of IPL 2021 on Friday",
  },
  {
    id: "5",
    name: "IPL 2021 Final",
    trending: false,
    live: false,
    image: (
      <Image
        source={Images.Business}
        style={{ borderRadius: 10, width: wp(30), height: wp(20) }}
      />
    ),
    details:
      "Chennai Super Kings face the Kolkata Knight Riders in the Final of IPL 2021 on Friday",
  },
  // {
  //   id: "6",
  //   name: "Entertainment",
  //   image: (
  //     <Image
  //       source={Images.Business}
  //       style={{
  //   width: wp(36),
  //   height: wp(18),
  //   borderRadius: 10,
  // }}
  //     />
  //   ),
  // },
];

export const Data3 = [
  {
    id: "1",
    name: "Entertainment",
    image: <Image source={Images.Business} style={{ borderRadius: 10 }} />,
  },
  {
    id: "2",
    name: "Business & Finance",
    image: <Image source={Images.Business} style={{ borderRadius: 10 }} />,
  },
  {
    id: "3",
    name: "Sports",
    image: <Image source={Images.Business} style={{ borderRadius: 10 }} />,
  },
  {
    id: "4",
    name: "Technology",
    image: <Image source={Images.Business} style={{ borderRadius: 10 }} />,
  },
  {
    id: "5",
    name: "Current Affairs",
    image: <Image source={Images.Business} style={{ borderRadius: 10 }} />,
  },
];
