import {
  View,
  Text,
  ImageBackground,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";

import { StyleSheet } from "react-native";
import ItemPosts from "../../../Component/ItemPosts";
import { Pictures } from "../../../Component/Pictures";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../../../assets/images/photo-bg.jpg")}
      >
        <View style={styles.wrap}>
          <View style={styles.avatar}>
            <Image
              style={styles.avatarImg}
              source={require("../../../assets/images/avatar.jpg")}
            />
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
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#fff0ff",

    marginTop: -60,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 32,
  },
  avatarImg: {
    borderRadius: 16,
    resizeMode: "cover",
  },
  uzerName: {
    fontFamily: "Roboto_Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
});

// font-family: 'Roboto';
// font-style: normal;
// font-weight: 500;
// font-size: 30px;
// line-height: 35px;
// text-align: center;
// letter-spacing: 0.01em;

// color: #212121;
