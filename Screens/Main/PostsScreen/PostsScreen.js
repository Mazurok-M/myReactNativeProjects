import { View, Text, Image } from "react-native";

import { StyleSheet } from "react-native";

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profil}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/images/avatar.jpg")}
          />
          <View>
            <Text style={styles.name} >Natali Romanova</Text>
            <Text style={styles.email} >email@example.com</Text>
          </View>
        </View>
      </View>
    </View>
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
    color: "#212121",
  }
});
