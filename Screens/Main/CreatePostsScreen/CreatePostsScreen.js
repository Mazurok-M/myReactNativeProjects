import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import * as MediaLibrary from "expo-media-library";

import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

let deviceWidth = Dimensions.get("window").width;

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [namePhoto, setNamePhoto] = useState("");
  const [nameLocale, setNameLocale] = useState("");
  const [coordsLocale, setCoordsLocale] = useState("");
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [cameraPermission, setCameraPermission] = useState();
  const [mediaPermission, setMediaPermission] = useState();
  const [locationPermission, setLocationPermission] = useState();

  const { userId, login } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleDeletePicture = () => {
    setPhoto(false);
    setNamePhoto("");
    setNameLocale("");
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      const locationStatus = await Location.requestForegroundPermissionsAsync();

      setCameraPermission(cameraStatus.status);
      setMediaPermission(mediaStatus.status);
      setLocationPermission(locationStatus.status);
    })();
  }, []);

  const takePhoto = async () => {
    if (
      cameraPermission === "granted" &&
      mediaPermission === "granted" &&
      locationPermission === "granted"
    ) {
      const photo = await camera.takePictureAsync();
      const { coords } = await Location.getCurrentPositionAsync();
      setCoordsLocale(coords);
      setPhoto(photo.uri);
    }
    return <Text>No access to camera or location</Text>;
  };

  const sendPhoto = async () => {
    await uploadPostToServer();
    navigation.navigate("DefaultPosts");

    handleDeletePicture();
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const createPost = await addDoc(collection(db, "posts"), {
      photo,
      namePhoto,
      nameLocale,
      coordsLocale,
      userId,
      login,
      date: Date.now(),
      totalComment: 0,
    });
  };

  const uploadPhotoToServer = async () => {
    const respons = await fetch(photo);
    const file = await respons.blob();

    const uniquePostId = Date.now().toString();

    const data = await ref(storage, `postImages/${uniquePostId}`);

    await uploadBytes(data, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImages/${uniquePostId}`)
    );

    return processedPhoto;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View>
            {photo ? (
              <View style={styles.camera}>
                <Image style={styles.img} source={{ uri: photo }} />
                <TouchableOpacity
                  style={{
                    ...styles.wrapBtnAdd,
                    backgroundColor: photo
                      ? "rgba(255, 255, 255, 0.3)"
                      : "#F6F6F6",
                  }}
                  onPress={handleDeletePicture}
                >
                  <FontAwesome
                    name="camera"
                    size={20}
                    color={photo ? "#ffffff" : "#BDBDBD"}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <Camera style={styles.camera} ref={setCamera}>
                <TouchableOpacity
                  style={{
                    ...styles.wrapBtnAdd,
                    backgroundColor: photo
                      ? "rgba(255, 255, 255, 0.3)"
                      : "#F6F6F6",
                  }}
                  onPress={takePhoto}
                >
                  <FontAwesome
                    name="camera"
                    size={20}
                    color={photo ? "#ffffff" : "#BDBDBD"}
                  />
                </TouchableOpacity>
              </Camera>
            )}
            {photo ? (
              <Text style={styles.title}>Редагувати фото</Text>
            ) : (
              <Text style={styles.title}>Завантажте фото</Text>
            )}
            <View>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor={"#BDBDBD"}
                onChangeText={setNamePhoto}
                value={namePhoto}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <View>
                <TouchableOpacity style={styles.wrapMap}>
                  <AntDesign
                    style={styles.marker}
                    name="enviromento"
                    size={24}
                    color="#BDBDBD"
                  />
                  <TextInput
                    style={styles.inputMap}
                    placeholder="Місцевість..."
                    placeholderTextColor={"#BDBDBD"}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    onChangeText={setNameLocale}
                    value={nameLocale}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
                }}
                activeOpacity={0.8}
                onPress={sendPhoto}
              >
                <Text
                  style={{
                    ...styles.btnTitle,
                    color: photo ? "#ffffff" : "#BDBDBD",
                  }}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.wrapDelete}
              onPress={handleDeletePicture}
            >
              <Feather name="trash-2" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

    paddingTop: 32,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 22,
  },
  camera: {
    height: 240,
    position: "relative",
    marginBottom: 8,
    borderRadius: 8,
  },
  photoContainer: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    position: "absolute",
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    borderRadius: 8,
    height: 240,
  },
  wrapBtnAdd: {
    position: "absolute",
    top: 90,
    left: (deviceWidth - 92) / 2,

    width: 60,
    height: 60,
    backgroundColor: "#ffffff",

    borderRadius: 30,
    paddingLeft: 19,

    paddingTop: 20,
  },
  title: {
    fontFamily: "Roboto_Regular",
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 48,
  },
  input: {
    fontFamily: "Roboto_Medium",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    paddingBottom: 15,
    marginBottom: 32,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },

  wrapMap: {
    paddingBottom: 15,
    marginBottom: 32,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  inputMap: {
    fontFamily: "Roboto_Medium",
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginRight: 32,
  },
  marker: {
    marginRight: 4,
  },
  btn: {
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  },
  btnTitle: {
    textAlign: "center",
  },
  wrapDelete: {
    backgroundColor: "#F6F6F6",
    paddingTop: 8,
    paddingBottom: 8,
    width: 70,
    borderRadius: 20,
    alignItems: "center",
  },
});
