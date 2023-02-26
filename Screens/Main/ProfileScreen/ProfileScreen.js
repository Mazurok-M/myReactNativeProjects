import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import ItemPosts from "../../../Component/ItemPosts";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import Avatar from "../../../Component/Avatar";

export default function ProfileScreen({ route, navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();

  const { userId, login, avatar } = useSelector((state) => state.auth);
  const [imageAvatar, setImageAvatar] = useState(avatar);

  const state = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    onSnapshot(
      query(collection(db, "posts"), where("userId", "==", userId)),
      (data) => {
        setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/images/photo-bg.jpg")}
      >
        <View style={styles.wrap}>
          <View style={styles.exitIcon}>
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>

          <Avatar imageAvatar={imageAvatar} setImageAvatar={setImageAvatar} />

          <Text style={styles.uzerName}>{login}</Text>
          <FlatList
            data={userPosts.sort((a, b) => (a.date < b.date ? 1 : -1))}
            renderItem={({ item }) => (
              <ItemPosts item={item} navigation={navigation} profile />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  wrap: {
    backgroundColor: "#ffffff",
    marginTop: 147,
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    position: "relative",
  },
  exitIcon: {
    marginTop: 22,
    marginLeft: "auto",
    marginBottom: 46,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",

    marginTop: -60,

    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  avatarImg: {
    borderRadius: 16,
    resizeMode: "cover",
  },
  avatarBtn: {
    position: "absolute",
    top: 81,
    left: 107,
    borderRadius: 12.5,
  },
  avatarSvg: {},
  uzerName: {
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
});
