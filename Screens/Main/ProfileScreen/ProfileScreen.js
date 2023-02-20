import { View, Text, ImageBackground } from "react-native";

import { StyleSheet } from "react-native";

export default function ProfileScreen() {
  return ( <View style={styles.container}>
   <ImageBackground
   style={styles.background}
  source={require("../../../assets/images/photo-bg.jpg")}
   >
    <View></View>
   </ImageBackground>
  </View>);
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
});
