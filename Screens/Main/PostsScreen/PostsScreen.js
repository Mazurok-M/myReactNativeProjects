import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../../NestedScreens/DefaultScreenPosts";
import CommentsScreen from "../../NestedScreens/CommentsScreen";
import MapScreen from "../../NestedScreens/MapScreen";

import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useDispatch } from "react-redux";

const NestedScreen = createStackNavigator();

function HeaderTitle({ navigation, title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}>{title}</Text>
    </View>
  );
}

function HeaderRight({ navigation }) {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <TouchableOpacity onPress={signOut}>
      <View style={{ marginRight: 16 }}>
        <Feather name="log-out" size={24} color="#BDBDBD" />
      </View>
    </TouchableOpacity>
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
