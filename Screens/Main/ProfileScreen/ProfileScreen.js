import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import ItemPosts from "../../../Component/ItemPosts";
import { Pictures } from "../../../Component/Pictures";
import SvgComponent from "../../SvgComponent";

export default function ProfileScreen({ route }) {
  const [avatarImg, setAvatarImg] = useState(false);
  const [avatarBtn, setAvatarBtn] = useState("#ff6c00");

  const addAvatar = () => {
    setAvatarImg(!avatarImg);
    if (avatarImg) {
      setAvatarBtn("#FF6C00");
    } else {
      setAvatarBtn("#E8E8E8");
    }
  };

  console.log(route);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/images/photo-bg.jpg")}
      >
        <View style={styles.wrap}>
          <View style={styles.exitIcon}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </View>
          <View style={styles.avatar}>
            {avatarImg && (
              <Image
                style={styles.avatarImg}
                source={require("../../../assets/images/avatar.jpg")}
              />
            )}

            <TouchableOpacity
              style={{
                ...styles.avatarBtn,
                backgroundColor: avatarImg ? "#ffffff" : "transparent",
                transform: avatarImg
                  ? [{ rotate: "45deg" }]
                  : [{ rotate: "0deg" }],
              }}
              activeOpacity={0.8}
              onPress={addAvatar}
            >
              <SvgComponent style={styles.avatarSvg} colorBtn={avatarBtn} />
            </TouchableOpacity>
          </View>

          <Text style={styles.uzerName}>Natali Romanova</Text>
          <FlatList
            data={Pictures}
            renderItem={({ item }) => <ItemPosts item={item} profile />}
            keyExtractor={(item) => item.id}
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
