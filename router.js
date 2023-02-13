import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import PostsScreen from "./Screens/Main/PostsScreen/PostsScreen";
import CreatePostsScreen from "./Screens/Main/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/Main/ProfileScreen/ProfileScreen";

import { AntDesign } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          backgroundColor: "#ffffff",
          paddingBottom: 34,
          paddingTop: 9,
          paddingHorizontal: 60,
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
          headerTitle: "Публікації",
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#212121",
          tabBarItemStyle: {
            height: 40,
            borderRadius: 20,
            marginRight: 16,
            borderBottomColor: "#212121",
          },
        }}
        name="Post"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="plus" size={13} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "#212121",
          tabBarItemStyle: {
            height: 40,
            borderRadius: 20,
            marginRight: 16,
          },
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
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
