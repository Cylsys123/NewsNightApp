import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Text,
  RefreshControl,
} from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import * as ImagePicker from "react-native-image-picker";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import {
  wp,
  hp,
  color,
  isANDROID,
  UserAvatarImage,
  Loader,
} from "../../Components/CommonUtills/ThemeHelper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Images from "../../Assets/Images/Images";
import { AuthContext } from "../../Firebase/AuthProvider.js";
import { $CombinedState } from "redux";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Imagepicker = (props) => {
  const [userData, setUserData] = useState({});
  const [fileUri, setfileUri] = useState("");
  const [Visible, setVisible] = useState(false);
  const [Uploading, setUploading] = useState(false);
  const [Transferred, setTransferred] = useState(0);
  const { user, updateProfile } = useContext(AuthContext);
  // console.log("userData.....", userData);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getUser = async () => {
    await firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        let userDetails = {};
        userDetails = documentSnapshot.data();
        userDetails["id"] = documentSnapshot.id;
        setUserData(userDetails);
        // console.log("..", userDetails);
      });
  };

  useEffect(() => {
    getUser();
  }, [userData]);

  const submitPhoto = async (img) => {
    if (img == "") {
      return "";
    }
    console.log("fileUri", img);
    const uploadUri = img;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    console.log("uploadUri", uploadUri);
    //AddtimeStamp to File Name
    // const extension = filename.split(".").pop();
    // const name = filename.split(".").slice(0, -1).join(".");
    // filename = name + Date.now() + "." + extension;

    setUploading(true);
    // setTransferred(0);

    //Set transfer State
    // const task = storage().ref(filename).putFile(uploadUri);
    // task.on("state_changed", (taskSnapshot) => {
    //   console.log(
    //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
    //   );
    // });

    // setTransferred(
    //   Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
    // );

    const storageRef = storage().ref(`photos/${filename}`);
    // const task = storageRef.putFile(uploadUri);

    try {
      // await storage().ref(`photos/${fileUri}`).putFile(fileUri);
      await storage().ref(`photos/${filename}`).putFile(uploadUri);
      // await task;
      // await storage().ref(filename).putFile(uploadUri);

      const url = await storageRef.getDownloadURL();
      setfileUri("");
      setUploading(false);
      console.log("url....", url);
      return url;
    } catch (e) {
      alert(e);
      setUploading(false);
      return "";
    }
  };

  const handleImgUpdate = async (img) => {
    console.log("uri.....", img);
    console.log("userData.userImg", userData.userImg);
    let imgUrl = await submitPhoto(img);
    console.log("imgUrl", imgUrl);
    // if (imgUrl == "" && userData.userImg) {
    //   imgUrl = userData.userImg;
    // }
    setUploading(true);
    firestore()
      .collection("Users")
      .doc(auth().currentUser.uid)
      .update({
        userImg: imgUrl,
      })
      .then(() => {
        console.log("Image Updated");
        setUploading(false);
      })
      .catch((e) => {
        setUploading(false);
        alert(e);
      });
  };

  const handleCancel = () => {
    setVisible(!Visible);
  };
  const handleGallery = () => {
    imageGalleryLaunch();
  };
  const handleCamera = () => {
    cameraLaunch();
  };

  //Camera Access Permission
  const requestCameraPermission = async () => {
    try {
      if (isANDROID) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          handleCamera();
          //this.setState({ setVisible: false });
        } else {
          console.log("Camera permission denied");
        }
      } else {
        console.log("worked");
        handleCamera();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Launch Camera
  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    ImagePicker.launchCamera(options, (res) => {
      console.log("done");
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.assets[0].uri };
        console.log("res.uri", res.assets[0].uri);
        setfileUri(res.assets[0].uri);
        setVisible(!Visible);
        handleImgUpdate(res.assets[0].uri);
        // ImgToBase64.getBase64String(res.uri)
        //     .then(base64String => {
        //         imagepickerCall(base64String, res.uri);
        //     })
        //     .catch(err => { console.log('error', err) });
      }
    });
  };

  //image gallery launch
  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    ImagePicker.launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
        alert(res.customButton);
      } else {
        setfileUri(res.assets[0].uri);
        console.log("image name", res.assets[0].uri);
        setVisible(!Visible);
        handleImgUpdate(res.assets[0].uri);
        // ImgToBase64.getBase64String(res.uri)
        //     .then(base64String => {
        //         imagepickerCall(base64String, res.uri);
        //     })
        //     .catch(err => { console.log('error', err) });
      }
    });
  };
  return (
    <View>
      {fileUri != "" ? (
        <View style={{ ...styles.profileView }}>
          <Image
            source={{ uri: fileUri }}
            // onLoadStart={() => setUploading(true)}
            // onLoadEnd={() => setUploading(false)}
            style={{
              ...styles.profileStyle,
              // borderWidth: Uploading ? 1 : null,
            }}
          />
          <TouchableOpacity
            onPress={() => setVisible(!Visible)}
            style={styles.iconView}
          >
            <Icon name="pencil" size={20} color={color.greenMint} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileView}>
          <Image
            // source={Images.defaultImg}
            source={
              userData.userImg == "" || null
                ? Images.defaultImg
                : { uri: userData.userImg }
            }
            // onLoadStart={() => (userData.userImg ? setUploading(true) : null)}
            // onLoadEnd={() => setUploading(false)}
            style={{
              ...styles.profileStyle,
              // borderWidth: Uploading ? 1 : null,
            }}
          />
          {/* {userData.userImg == "" || null ? ( */}
          <TouchableOpacity
            onPress={() => setVisible(!Visible)}
            style={styles.iconView}
          >
            <Icon name="pencil" size={25} color={color.greenMint} />
          </TouchableOpacity>
          {/* ) : null} */}
        </View>
      )}
      {Uploading ? (
        <>
          {/* <Text style={{ alignSelf: "center" }}>{Transferred} % completed</Text> */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Loader visible={Uploading} />
          </View>
        </>
      ) : null}

      {Visible ? (
        <Portal>
          <Dialog visible={true} style={{ backgroundColor: color.white }}>
            <Dialog.Content>
              <Dialog.Title style={{ color: color.blackTheme }}>
                Choose Picture From
              </Dialog.Title>
              <Paragraph style={{ color: color.blackTheme }}>
                You can choose your picture from Gallery or you can take photo.
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={requestCameraPermission} color={color.blueTheme}>
                Camera
              </Button>
              <Button onPress={handleGallery} color={color.blueTheme}>
                Gallery
              </Button>
              <Button onPress={handleCancel} color={color.blueTheme}>
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profileView: {
    // borderWidth: 0.5,
    // borderColor: color.blueTheme,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: wp(35) / 2,
    height: wp(35),
    width: wp(35),
  },
  iconView: {
    bottom: hp(1),
    right: hp(1.5),
    borderColor: color.blueTheme,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 5,
    backgroundColor: color.white,
    position: "absolute",
  },
  profileStyle: {
    alignSelf: "center",
    borderColor: color.blueTheme,
    backgroundColor: color.blueTheme,
    borderRadius: wp(33) / 2,
    height: wp(33),
    width: wp(33),
  },
});
export default Imagepicker;
