import { View, Text, Image, FlatList, SafeAreaView } from "react-native";

import { StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import ItemPosts from "../../Component/ItemPosts";

export default function DefaultScreenPosts({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profil}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/avatar.jpg")}
        />
        <View>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ItemPosts item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  profil: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  name: {
    color: "#212121",
    fontFamily: "Roboto_Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontFamily: "Roboto_Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
