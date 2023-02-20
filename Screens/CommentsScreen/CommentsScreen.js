import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { comments } from "../../Component/Comments";
import { useState } from "react";

export default function CommentsScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapImg}>
        <Image
          style={styles.img}
          source={require("../../assets/images/Picture/picture-3.jpg")}
        />
      </View>

      <FlatList
        data={comments}
        renderItem={({ item }) => {
          return item.name === "Natali Romanova" ? (
            <View style={styles.wrap}>
              <View style={styles.commentsWrapFirst}>
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <View style={styles.commentDateWrap}>
                    <Text style={styles.commentDate}> {item.date} </Text>
                    <View style={styles.border}></View>
                    <Text style={styles.commentDate}>{item.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.avatar}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/avatar.jpg")}
                />
              </View>
            </View>
          ) : (
            <View style={styles.wrap}>
              <View style={styles.avatar}>
                <Image
                  style={styles.avatar}
                  source={require("../../assets/images/avatar-2.jpg")}
                />
              </View>
              <View style={styles.commentsWrap}>
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <View style={styles.commentDateWrap}>
                    <Text style={styles.commentDate}> {item.date} </Text>
                    <View style={styles.border}></View>
                    <Text style={styles.commentDate}>{item.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={{ paddingTop: 5 }}>
        <TextInput placeholder="Коментувати..." style={styles.input} />
      </View>
      <TouchableOpacity style={styles.btn}>
        <AntDesign name="arrowup" size={14} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
    position: "relative",
  },
  wrapImg: {
    height: 240,
    marginBottom: 32,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    borderRadius: 8,
  },

  wrap: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",

  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentsWrapFirst: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginRight: 16,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: 299,
  },
  commentsWrap: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: " rgba(0, 0, 0, 0.03)",
    marginLeft: 16,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    width: 299,
  },
  comment: {

  },
  commentText: {
    color: "#212121",
    fontFamily: "Roboto_Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  commentDateWrap: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  commentDate: {
    color: "#BDBDBD",
  },
  border: {
    borderRightColor: "#BDBDBD",
    borderRightWidth: 1,
    height: 11,
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 10,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    borderWidth: 1,
  },
  btn: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",
  },
});
