import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, TouchableOpacity, TextInput } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Provider } from "react-native-paper";
import { AuthContext } from "../../Firebase/AuthProvider.js";
import Icon_1 from "react-native-vector-icons/MaterialCommunityIcons";
import {
  hp,
  wp,
  color,
  isANDROID,
  Loader,
} from "../../Components/CommonUtills/ThemeHelper";
import TopBar from "../../Components/TopBar/TopBar";
import Images from "../../Assets/Images/Images";
import Styles from "./Styles";
import Imagepicker from "./ImagePicker";
import { useIsFocused } from "@react-navigation/native";
import MainButton from "../../Components/MainButton/MainButton";

const Profile = (props) => {
  const [userData, setUserData] = useState({});
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [edit, setEdit] = useState(false);
  const { user, forgotPassword } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        setLoading(false);
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        // setUserData(userDetails);
        setName(userDetails.name);
        setEmail(userDetails.email);
        setPhone(userDetails.mobile);
      });
  }, [isFocused]);

  const ChangePassword = async () => {
    // props.navigation.navigate("CreatePassword");
    try {
      forgotPassword(Email);
      Alert.alert(
        "Please check your email: " + Email,
        "Reset Password link has been sent to this email"
      );
    } catch (e) {
      console.log(e);
    }
  };

  const editBtn = () => {
    setEdit(true);
  };
  const handleEdit = () => {
    setLoading(true);
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        name: Name,
        email: Email,
        mobile: Phone,
      })
      .then(() => {
        setLoading(false);
        setEdit(false);
        alert("Profile updated Successfully");
      })
      .catch((err) => {
        alert("Can't Edit Profile");
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <TopBar title="Profile" rightNull />
      <Provider>
        <View style={Styles.Card}>
          <View style={Styles.ImgView}>
            {/* <Image source={Images.defaultImg} style={Styles.Img} /> */}
            <Imagepicker />
            {edit ? (
              <TextInput
                placeholder="Name"
                value={Name}
                onChangeText={(text) => setName(text)}
                style={{ ...Styles.UserNameTxtIn }}
              />
            ) : (
              <Text style={Styles.UserName}>{Name}</Text>
            )}
          </View>
          <View style={Styles.Line} />
          <View style={Styles.View1}>
            <Icon_1
              name="email"
              size={22}
              color={color.greenMint}
              style={{ paddingHorizontal: wp(5) }}
            />
            <View>
              <Text style={Styles.HeadTxt}>Email ID</Text>
              <View style={{ marginVertical: wp(1.5) }} />
              {/* {edit ? (
                <TextInput
                  placeholder="Email"
                  value={Email}
                  onChangeText={(text) => setEmail(text)}
                  style={{ ...Styles.TxtInp }}
                />
              ) : ( */}
              <Text style={Styles.Txt}>{Email}</Text>
              {/* )} */}
            </View>
          </View>
          <View style={Styles.Line} />
          <View style={Styles.View1}>
            <Icon_1
              name="cellphone"
              size={22}
              color={color.greenMint}
              style={{ paddingHorizontal: wp(5) }}
            />
            <View>
              <Text style={Styles.HeadTxt}>Mobile Number</Text>
              <View style={{ marginVertical: wp(1.5) }} />
              {edit ? (
                <TextInput
                  placeholder="Phone"
                  value={Phone}
                  onChangeText={(text) => setPhone(text)}
                  style={{ ...Styles.TxtInp }}
                />
              ) : (
                <Text style={Styles.Txt}>{Phone}</Text>
              )}
            </View>
          </View>

          {edit ? null : (
            <>
              <View style={Styles.Line} />
              <TouchableOpacity style={Styles.View1} onPress={ChangePassword}>
                <Icon_1
                  name="key-variant"
                  size={22}
                  color={color.greenMint}
                  style={{ paddingHorizontal: wp(5) }}
                />
                <Text style={Styles.HeadTxt}>Change Password</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={Styles.Line} />

          <View style={{ marginHorizontal: wp(6) }}>
            <MainButton
              btnName={edit ? "Save" : "Edit"}
              action={() => {
                edit ? handleEdit() : editBtn();
              }}
              btntextColor={color.white}
              btnColor={color.blueTheme}
              fontSize={18}
            />
          </View>
        </View>
        {isLoading ? (
          <View style={Styles.Loader}>
            <Loader visible={isLoading} />
          </View>
        ) : null}
      </Provider>
    </View>
  );
};

export default Profile;
