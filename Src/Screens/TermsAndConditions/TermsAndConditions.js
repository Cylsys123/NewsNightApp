import React, { useEffect, useLayoutEffect, useState } from 'react';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  RefreshControl,
  View,
  FlatList,
  ScrollView,
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { hp, wp, color, Loader, isANDROID } from "../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../Components/TopBar/TopBar";
import { Data, Data2, Data3 } from "../../DummyData/HomeList";
import { useIsFocused } from "@react-navigation/native";
import { flatMap, toNumber } from "lodash";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from 'react-native-vector-icons/Ionicons';

let headerList = [
  'Acknowledgment',
  'Limitation of Liability',
  'Disputes Resolution',
  'Links to Other Websites',
  'Translation Interpretation',
  '\"AS IS\" and \"AS AVAILABLE\" Disclaimer',
  'Changes to These Terms and Conditions',
  'Last_Update',
  'Interpretation and Definitions',
  'Contact Us',
  'United States Legal Compliance',
  'Termination',
  'Governing Law',
  'Severability and Waiver',
  'For European Union (EU) Users',
  'id',
];

const TermsAndConditions = (props) => {
  const [allDetails, setAllDetails] = useState([]);
  const [lastupdate, setLastUpdate] = useState({});
  const [contactDetails, setContactDetails] = useState({});
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerBackTitle: '',
      headerBackVisible: false,
      headerShown: true,
      title: 'Terms & Conditions',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fff', },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            // props.navigation.goBack();
            props.navigation.pop();
          }}
          style={[styles.headerLeftContainer]}>
          <View style={[styles.iconContainer]}>
            <Ionicons
              name={isANDROID ? 'chevron-back-outline' : 'ios-chevron-back'}
              size={isANDROID ? 25 : 30}
              color={'#000'}
              style={[{ alignSelf: 'center', }]}
            />
          </View>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    getHomeData();
    getTechnologyData();
  }, [isFocused]);

  const getTechnologyData = () => {
    setLoading(true);
    firestore()
    .collection('Technology')
    .doc('s5GWZa42bfiw0xvzEuqS')
      .get()
      // .then((querySnapshot) => {
      //   console.log("querySnapshot.....", Object.keys(querySnapshot._data).length);
      // });
      .then((documentSnapshot) => {
        let temp = [];
        let userDetails = {};
        let latestUpade = {};
        let contactDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        console.log("userDetails?._data.......",JSON.stringify(userDetails), documentSnapshot);
        
      });
  };
  const getHomeData = () => {
    setLoading(true);
    firestore()
      .collection("Terms & Conditions")
      .doc("0o4w2jqrEnQWw5zWb2Tf")
      .get()
      // .then((querySnapshot) => {
      //   console.log("querySnapshot.....", Object.keys(querySnapshot._data).length);
      // });
      .then((documentSnapshot) => {
        let temp = [];
        let userDetails = {};
        let latestUpade = {};
        let contactDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        // console.log("userDetails?._data.......",JSON.stringify(userDetails?._data));
        userDetails?._data.filter((ele, idx) => {
          if (ele?.title == 'Last Update') {
            return latestUpade = ele;
          } else if (ele?.title == 'Contact Us') {
            return contactDetails = ele;
          } else {
            temp.push(ele);
          }
        })
        setLastUpdate(latestUpade);
        setContactDetails(contactDetails);
        setAllDetails(temp);
        setLoading(false);
      });
  };

  if (isLoading) {
    return (
      <View style={[styles.mainContainer,{justifyContent:'center',}]}>
        <ActivityIndicator
          animating={isLoading}
          size={'large'}
          color={color.blueTheme}
        />
      </View>
    );
  // } else if (!isLoading && allDetails.length == '0'
  //   // && !Object.keys(lastupdate).length
  //   // && !Object.keys(contactDetails).length
  // ) {
  //   <View style={[styles.mainContainer]}>
  //     <Text style={[{ alignSelf: 'center', fontSize: 20, fontWeight: '700',}]}>
  //       {'Data not Found'}
  //     </Text>
  //   </View>
  } else {
    return (
      // null
      <View style={[styles.mainContainer]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.flatContainer]}
          data={allDetails}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={(
            <View style={[{}]}>
              <Text style={[{ marginTop: hp(1.2), }]}>
                {`${lastupdate?.title || 'NA'}:  ${lastupdate?.value || 'NA'}`}
              </Text>
              <Text style={[{ marginTop: hp(1.2), }]}>
                {'Please read these Terms and Conditions carefully before using Our Services.'}
              </Text>
            </View>
          )}
          ListHeaderComponentStyle={[styles.flatHeader]}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={[{ marginTop: hp(1.6), }]}>
                <View style={[styles.borderView]}>
                  <Text style={[styles.titleTextBlue]}>{item?.title || 'NA'}
                  </Text>
                </View>
                {item?.details?.length > 0 ? (
                  item?.details.map((ele, idx) => {
                    let dataType = typeof ele;
                    if (dataType == 'object') {
                      return (
                        <View style={[{ marginTop: hp(1.2), }]}>
                          <Text style={[styles.titleTextBlue2]}>
                            {ele?.sub_title || ele?.name || 'NA'}
                          </Text>
                          {ele.description ? (
                            <Text style={[{}]}>{ele?.description || 'NA'}</Text>
                          ) : null}
                          {typeof ele?.interpret_details == 'object' ? (
                            ele?.interpret_details.map((item1, index) => {
                              return (
                                <Text style={[{}]}>{item1 || 'NA'}</Text>
                              );
                            })
                          ) : null}
                          {typeof ele?.define_categories == 'object' ? (
                            ele?.define_categories.map((item2, index) => {
                              return (
                                <View style={[styles.rowContainer]}>
                                  <Text style={[styles.titleText]}>
                                    {item2?.name || 'NA'}{': '}
                                    <Text style={[{ fontWeight: 'normal' }]}>
                                      {item2?.description || 'NA'}
                                    </Text>
                                  </Text>
                                </View>
                              );
                            })
                          ) : null}
                        </View>
                      );
                    } else {
                      return (
                        <View style={[{ marginTop: hp(1.2), }]}>
                          <Text>{ele || 'NA'}</Text>
                        </View>
                      );
                    }
                  })
                ) : null}
              </View>
            );
          }}
          ListFooterComponent={(
            <View>
              <View style={[styles.borderView]}>
                <Text style={[styles.titleTextBlue]}>{contactDetails?.title || 'NA'}</Text>
              </View>
              {typeof contactDetails?.details == 'object' ?
                contactDetails?.details.map((item, index) => {
                  return (
                    <Text style={[{ marginTop: hp(1.2) }]}>
                      {item?.name || 'NA'}{': '}
                      {item?.description || 'NA'}
                    </Text>
                  );
                })
                : null}
            </View>
          )}
          ListFooterComponentStyle={[styles.flatHeader]}
        />
      </View>
    
    );
  }
};
const styles = StyleSheet.create({
  headerLeftContainer: {
    // borderWidth:1,
    // marginLeft: isANDROID ? wp(0) : wp(4),
    paddingLeft: wp(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(4),
  },
  flatContainer: {
    paddingBottom: hp(5),
    marginLeft: wp(2),
  },
  flatHeader: { marginTop: hp(1.6), },
  flatFooter: { marginTop: hp(1.6), },
  borderView: {
    borderBottomWidth: 1,
    borderColor: color.blueTheme,
    paddingVertical: hp(0.7),
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  titleTextBlue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: color.blueTheme,
  },
  titleTextBlue2: {
    fontWeight: '600',
    fontSize: 14,
    color: '#3D7CE6',
  },
  rowContainer: {
    flexDirection: 'row',
    marginLeft: wp(6),
  },
});

export default TermsAndConditions;