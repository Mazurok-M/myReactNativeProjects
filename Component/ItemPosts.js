import { View, Text, Image, StyleSheet } from "react-native";
import { Feather, AntDesign, FontAwesome, Fontisto } from "@expo/vector-icons";

export default function ItemPosts({ item, profile }) {
  const color = (number) => {
    return number === 0 ? "#BDBDBD" : "#FF6C00";
  };

  return (
    <View>
      <Image
        style={styles.img}
        // source={{ uri: item.url }}
        source={require("../assets/images/Picture/picture-2.jpg")}
      />
     
      <Text style={styles.nemeTitle}>{item.title}</Text>
      <View style={styles.comentWrap}>
        <View style={styles.coment}>
        
          {item.coment === 0 ? (
            <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
          ) : (
            <FontAwesome name="comment" size={24} color="#FF6C00"  />
          )}

          <Text style={{ marginLeft: 8, marginRight: 24 }}>{item.coment}</Text>

          {profile && (
            <>
              <AntDesign name="like2" size={24} color={color(item.like)} />
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
