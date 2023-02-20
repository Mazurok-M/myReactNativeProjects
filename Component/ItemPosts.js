import { View, Text, Image, StyleSheet } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

export default function ItemPosts({ item, profile }) {
  return (
    <View>
      <Image
        style={styles.img}
        // source={{ uri: item.url }}
        // source={{ uri: "assets/images/Picture/picture-2.jpg" }}
        source={require("../assets/images/Picture/picture-2.jpg")}
      />
      {/* source={{ uri: item.url }}
       */}
      <Text style={styles.nemeTitle}>{item.title}</Text>
      <View style={styles.comentWrap}>
        <View style={styles.coment}>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={{ marginLeft: 8, marginRight: 24 }}>{item.coment}</Text>

          {profile && (
            <>
              <AntDesign name="like2" size={24} color="#BDBDBD" />
              <Text style={{ marginLeft: 6, marginRight: 24 }}>
                {item.like}
              </Text>
            </>
          )}
        </View>
        <View style={styles.address}>
          <AntDesign
            style={styles.marker}
            name="enviromento"
            size={24}
            color="#BDBDBD"
          />
          <Text style={{ marginLeft: 8 }}>{item.location}</Text>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  nemeTitle: {
    marginBottom: 11,
    fontFamily: "Roboto_Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  comentWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  coment: {
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    flexDirection: "row",
  },
});
