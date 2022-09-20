import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon_1 from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../../Screens/Registrations/SignIn/Styles";

import {
  hp,wp,color,isANDROID,
} from "../CommonUtills/ThemeHelper";
import Styles from "./LinkButtonStyle";


const LinkButton = ({ 
    action, linkName, linktextColor,disabled
  }) => {
    return (
      <>
        <TouchableOpacity 
          disabled={disabled?true:false}
          onPress={action} 
          style={[{alignSelf:'center',}
        ]}>
            <Text style={[{
                color: color.blackTheme,
                fontSize: 14,
                letterSpacing: 0.5,
                marginTop: hp(0.4),
              },
                { color: linktextColor?linktextColor:color.blackTheme,}]}>
                {linkName}
            </Text>
        </TouchableOpacity>
      </>
    );
  };
  export default LinkButton;
  