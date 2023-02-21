import { View, Text, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../../NestedScreens/DefaultScreenPosts";
import CommentsScreen from "../../NestedScreens/CommentsScreen";
import MapScreen from "../../NestedScreens/MapScreen";

import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

function HeaderTitle({ navigation, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}>{title}</Text>
    </View>
  );
}

function HeaderRight({ navigation }) {
  return (
    <View style={{ marginRight: 16 }}>
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </View>
  );
}

export default function PostsScreen({ navigation }) {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultPosts"
        component={DefaultScreenPosts}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <HeaderTitle navigation={navigation} title={"Публікації"} />
            ),
            headerTitleAlign: "center",
            headerRight: () => <HeaderRight navigation={navigation} />,
            headerLeft: false,
          };
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <HeaderTitle navigation={navigation} title={"Коментарії"} />
            ),
            headerTitleAlign: "center",
          };
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={({ navigation }) => {
          return {
            headerTitle: () => (
              <HeaderTitle navigation={navigation} title={"Карта"} />
            ),
            headerTitleAlign: "center",
          };
        }}
      />
    </NestedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  titleHeader: {
    fontFamily: "Roboto_Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
});
