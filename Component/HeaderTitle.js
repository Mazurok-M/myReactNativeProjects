import { StyleSheet, View, Text } from "react-native";


import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function HeaderTitle({ navigation,  title }) {
  return (
      <View style={styles.container}>
        <Text style={styles.titleHeader}>{title}</Text>
      </View>
  );
}

// header: ({ navigation, route, options }) => {
//     const title = getHeaderTitle(options, route.name);
  
//     return <MyHeader title={title} style={options.headerStyle} />;
//   };
// export default function HeaderRight ({navigation}) {
//     return (<View style={styles.iconRight}>
//         <Feather name="log-out" size={24} color="#BDBDBD" />
//       </View>)
// }

const styles = StyleSheet.create({
  container: {
    textAlign: "center"
  },
 

  titleHeader: {
    fontFamily: "Roboto_Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  
});

