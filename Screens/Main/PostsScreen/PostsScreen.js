import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  SectionList,
  SafeAreaView,
} from "react-native";

import { StyleSheet } from "react-native";

import { FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const Pictures = [
  {
    id: "1",
    title: "Ліс",
    url: require("../../../assets/images/Picture/picture-1.jpg"),
      
    coment: 1,
    location: "Ukrain",
  },
  {
    id: "2",
    title: "Закат",
  
    url: require("../../../assets/images/Picture/picture-1.jpg"),

    coment: 5,
    location: "Ivano-Frankivs'k Region, Ukraine",
  },
  {
    id: "3",
    title: "Дім",
    url: require("../../../assets/images/Picture/picture-1.jpg"),

    coment: 15,
    location: "Ukrain",
  },
];

const Item = ({ item }) => {

  return (
    <View>
      <Image
        style={styles.img}
        source={require("../../../assets/images/Picture/picture-2.jpg")}
        />
         {/* source={{ uri: item.url }}
        */}
      <Text style={styles.nemeTitle}>{item.title}</Text>
      <View style={styles.comentWrap}>
        <View style={styles.coment}>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={{ marginLeft: 8 }}>{item.coment}</Text>
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
};

export default function PostsScreen() {
  const [pictures, setPictures] = useState(Pictures);

  return (
    <View style={styles.container}>    
        <View style={styles.profil}>
          <Image
            style={styles.avatar}
            source={require("../../../assets/images/avatar.jpg")}
          />
          <View>
            <Text style={styles.name}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
        </View>
        <SafeAreaView >
          <FlatList
            data={pictures}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>    
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 80,
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
  },
  address: {
    flexDirection: "row",
  },
});
