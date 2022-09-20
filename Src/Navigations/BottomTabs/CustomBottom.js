import {
  wp,
  hp,
  color,
  fonts,
  normalize,
} from "../../Components/CommonUtills/ThemeHelper";

export const customTabBarStyle = {
  activeTintColor: color.greenMint,
  inactiveTintColor: color.gray,
  showIcon: true,
  keyboardHidesTabBar: true,
  // style: {
  //   backgroundColor: color.white,
  //   // shadowOpacity: 0,
  //   shadowColor: color.grayShade,
  //   shadowRadius: 4,
  //   shadowOffset: { height: -2, width: 0 },
  //   elevation: 30,
  //   // borderColor: color.blueTheme,
  //   borderTopWidth: 0.5,
  //   // borderWidth: 1,
  //   // position: "absolute",
  //   alignSelf:'center',
  //   justifyContent:'center',
  //   // height: '10%',
  //   width:'100%',
  // },
  tabStyle:{
    height:-hp(5),
    borderTopWidth:0.3,
    borderColor:color.blueTheme,
  },
  // tabStyle: {
  //   paddingTop:hp(0.5),
  //   paddingBottom:hp(1.5),
  //   // height: hp(10),
  //  // borderWidth:1,
  // },
};
