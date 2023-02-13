import { View, Text } from "react-native";

import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function PostsScreen() {
  <View style={styles.container}>
    <Text>Публікації</Text>
    <AntDesign name="user" size={24} color="black" />
  </View>;
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
