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
} from "react-native";

import { StyleSheet } from "react-native";

import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useState } from "react";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default function CreatePostsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [picture, setPicture] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleAddPicture = () => {
    setPicture(true);
  };

  const handleDeletePicture = () => {
    setPicture(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View style={styles.wrap}>
            <View>
              <View style={styles.wrapImg}>
                {picture && (
                  <Image
                    style={styles.img}
                    source={require("../../../assets/images/Picture/picture-1.jpg")}
                  />
                )}

                <TouchableOpacity
                  style={{
                    ...styles.wrapBtnAdd,
                    backgroundColor: picture
                      ? "rgba(255, 255, 255, 0.3)"
                      : "#F6F6F6",
                  }}
                  onPress={handleAddPicture}
                >
                  <FontAwesome
                    name="camera"
                    size={20}
                    color={picture ? "#ffffff" : "#BDBDBD"}
                  />
                </TouchableOpacity>
              </View>
              {picture ? (
                <Text style={styles.title}>Редагувати фото</Text>
              ) : (
                <Text style={styles.title}>Завантажте фото</Text>
              )}

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Назва..."
                  placeholderTextColor={"#BDBDBD"}
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
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    ...styles.btn,
                    backgroundColor: picture ? "#FF6C00" : "#F6F6F6",
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      ...styles.btnTitle,
                      color: picture ? "#ffffff" : "#BDBDBD",
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  wrap: {
    height: deviceHeight - 70,
    paddingTop: 32,
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  wrapImg: {
    height: 240,

    borderRadius: 8,
    position: "relative",
    marginBottom: 8,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    borderRadius: 8,
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
    // backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
  },
  btnTitle: {
    // color: "#BDBDBD",
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
