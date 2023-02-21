import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function ItemPosts({ item, profile, navigation }) {
  const latitude = item.coords.latitude;
  const longitude = item.coords.longitude;
  const title = item.nameLocale;

  const color = (number) => {
    return number === 0 ? "#BDBDBD" : "#FF6C00";
  };

  return (
    <View>
      <Image style={styles.img} source={{ uri: item.photo }} />

      <Text style={styles.nemeTitle}>{item.namePhoto}</Text>
      <View style={styles.comentWrap}>
        <View style={styles.coment}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.navigate("Comments")}
          >
            <FontAwesome name="comment" size={24} color="#FF6C00" />

            <Text style={{ marginLeft: 8, marginRight: 24 }}>5</Text>
          </TouchableOpacity>
          {profile && (
            <>
              <AntDesign name="like2" size={24} color={color(item.like)} />
              <Text style={{ marginLeft: 6, marginRight: 24 }}>
                {item.like}
              </Text>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Map", { latitude, longitude, title })
          }
        >
          <View style={styles.address}>
            <AntDesign
              style={styles.marker}
              name="enviromento"
              size={24}
              color="#BDBDBD"
            />
            <Text style={{ marginLeft: 8 }}>{item.nameLocale}</Text>
          </View>
        </TouchableOpacity>
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
