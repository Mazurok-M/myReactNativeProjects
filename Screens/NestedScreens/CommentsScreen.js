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

import { useEffect, useState } from "react";
import { comments } from "../../Component/Comments";
import { useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function CommentsScreen({ route }) {
  const postId = route.params.postId;
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const { login, userId } = useSelector((state) => state.auth);

  const createComents = async () => {
    await addDoc(collection(doc(db, "posts", postId), "comments"), {
      comment,
      login,
      date: Date.now(),
      userId,
    });
    await updateDoc(doc(db, "posts", postId), {
      totalComment: allComment.length + 1,
    });
    setComment("");
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    await onSnapshot(
      collection(doc(db, "posts", postId), "comments"),
      (data) => {
        setAllComment(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            dateComment: new Date(doc.data().date).toLocaleString("ua", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: new Date(doc.data().date).toLocaleString("ua", {
              hour: "numeric",
              minute: "numeric",
            }),
          }))
        );
      }
    );
  };

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapImg}>
        <Image style={styles.img} source={{ uri: route.params.url }} />
      </View>
      <FlatList
        data={allComment.sort((a, b) => (a.date > b.date ? 1 : -1))}
        renderItem={({ item }) => {
          return item.userId === userId ? (
            <View style={styles.wrap}>
              <View style={styles.commentsWrapFirst}>
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <View style={styles.commentDateWrap}>
                    <Text style={styles.commentDate}>{item.dateComment}</Text>
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
                <Text>{item.login}</Text>
                {/* <Image
                  style={styles.avatar}
                  source={require("../../assets/images/avatar-2.jpg")}
                /> */}
              </View>
              <View style={styles.commentsWrap}>
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <View style={styles.commentDateWrap}>
                    <Text style={styles.commentDate}>{item.dateComment}</Text>
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
      <View style={styles.wrapInput}>
        <TextInput
          placeholder="Коментувати..."
          style={styles.input}
          onChangeText={setComment}
          value={comment}
        />
        <TouchableOpacity style={styles.btn} onPress={createComents}>
          <AntDesign name="arrowup" size={14} color="#ffffff" />
        </TouchableOpacity>
      </View>
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
  },
  wrapImg: {
    height: 240,
    marginBottom: 32,
  },
  img: {
    resizeMode: "cover",
    width: "100%",
    height: 240,
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
  comment: {},
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
  wrapInput: {
    flexDirection: "row",

    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 8,

    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    borderWidth: 1,
  },
  input: {
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",

    flex: 4,
  },

  btn: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",
  },
});
