import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PostsScreen from "../Main/PostsScreen/PostsScreen";
import CreatePostsScreen from "../Main/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../Main/ProfileScreen/ProfileScreen";

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

function HeaderLeft({ navigation }) {
  return (
    <View style={{ marginLeft: 16 }}>
      <TouchableOpacity onPress={() => navigation.jumpTo("Post")}>
        <AntDesign name="arrowleft" size={24} color="rgba(33, 33, 33, 0.8)" />
      </TouchableOpacity>
    </View>
  );
}

export default function Home({ navigation }) {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 71,

          backgroundColor: "#ffffff",

          paddingTop: 9,
          paddingHorizontal: 60,
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
        },
        headerBackgroundContainerStyle: {
          borderBottomColor: "#E8E8E8",
          borderBottomWidth: 1,
        },
        headerStatusBarHeight: 27,
      }}
    >
      <MainTab.Screen
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="appstore-o" size={24} color={color} />
            ),
            tabBarItemStyle: {
              height: 40,
              borderRadius: 20,
              marginRight: 16,
            },
            tabBarActiveBackgroundColor: "#FF6C00",
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#212121",
            headerShown: false,
          };
        }}
        name="Post"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="plus" size={13} color={color} />
            ),
            tabBarItemStyle: {
              height: 40,
              borderRadius: 20,
              marginRight: 16,
            },
            tabBarStyle: { display: "none" },

            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: () => (
              <HeaderTitle
                navigation={navigation}
                title={"Створити публікацію"}
              />
            ),
            headerTitleAlign: "center",
            tabBarActiveBackgroundColor: "#FF6C00",
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#212121",
          };
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#212121",
          tabBarItemStyle: {
            height: 40,
            borderRadius: 20,
          },
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
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
