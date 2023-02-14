import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { getHeaderTitle } from "@react-navigation/elements";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import LoginScreen from "./Screens/Auth/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
// import PostsScreen from "./Screens/Main/PostsScreen/PostsScreen";
// import CreatePostsScreen from "./Screens/Main/CreatePostsScreen/CreatePostsScreen";
// import ProfileScreen from "./Screens/Main/ProfileScreen/ProfileScreen";
import Home from "./Screens/Home/Home";

// import { AntDesign } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";

// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   useWindowDimensions,
// } from "react-native";

// function HeaderTitle({ navigation, title }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleHeader}>{title}</Text>
//     </View>
//   );
// }

// function HeaderRight({ navigation }) {
//   return (
//     <View style={{ marginRight: 16 }}>
//       <Feather name="log-out" size={24} color="#BDBDBD" />
//     </View>
//   );
// }

// function HeaderLeft() {
//   return (
//     <View style={{ marginLeft: 16 }}>
//       <AntDesign name="arrowleft" size={24} color="#BDBDBD" />
//     </View>
//   );
// }

export const useRoute = (isAuth) => {
  // if (!isAuth)

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
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );

  // return (
  //   <MainTab.Navigator
  //     screenOptions={{
  //       tabBarShowLabel: false,
  //       tabBarStyle: {
  //         height: 83,
  //         backgroundColor: "#ffffff",
  //         paddingBottom: 34,
  //         paddingTop: 9,
  //         paddingHorizontal: 60,
  //         borderTopColor: "#E8E8E8",
  //         borderTopWidth: 1,
  //       },
  //       headerBackgroundContainerStyle: {
  //         borderBottomColor: "#E8E8E8",
  //         borderBottomWidth: 1,
  //       },
  //       headerStatusBarHeight: 27,
  //     }}
  //   >
  //     <MainTab.Screen
  //       options={({ navigation }) => {
  //         return {
  //           tabBarIcon: ({ focused, color, size }) => (
  //             <AntDesign name="appstore-o" size={24} color={color} />
  //           ),
  //           tabBarItemStyle: {
  //             height: 40,
  //             borderRadius: 20,
  //             marginRight: 16,
  //           },
  //           headerTitle: () => (
  //             <HeaderTitle navigation={navigation} title={"Публікації"} />
  //           ),
  //           headerTitleAlign: "center",
  //           headerRight: () => <HeaderRight navigation={navigation} />,
  //           tabBarActiveBackgroundColor: "#FF6C00",
  //           tabBarActiveTintColor: "#ffffff",
  //           tabBarInactiveTintColor: "#212121",
  //         };
  //       }}
  //       name="Post"
  //       component={PostsScreen}
  //     />
  //     <MainTab.Screen
  //       options={({ navigation }) => {
  //         return {
  //           tabBarIcon: ({ focused, color, size }) => (
  //             <AntDesign name="plus" size={13} color={color} />
  //           ),
  //           tabBarItemStyle: {
  //             height: 40,
  //             borderRadius: 20,
  //             marginRight: 16,
  //           },

  //           headerLeft: () => <HeaderLeft />,
  //           headerTitle: () => (
  //             <HeaderTitle
  //               navigation={navigation}
  //               title={"Створити публікацію"}
  //             />
  //           ),
  //           headerTitleAlign: "center",
  //           tabBarActiveBackgroundColor: "#FF6C00",
  //           tabBarActiveTintColor: "#ffffff",
  //           tabBarInactiveTintColor: "#212121",
  //         };
  //       }}
  //       name="Create"
  //       component={CreatePostsScreen}
  //     />
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, color, size }) => (
  //           <AntDesign name="user" size={24} color={color} />
  //         ),
  //         tabBarActiveBackgroundColor: "#FF6C00",
  //         tabBarActiveTintColor: "#ffffff",
  //         tabBarInactiveTintColor: "#212121",
  //         tabBarItemStyle: {
  //           height: 40,
  //           borderRadius: 20,
  //         },
  //         headerShown: false,
  //       }}
  //       name="Profile"
  //       component={ProfileScreen}
  //     />
  //   </MainTab.Navigator>
  // );
};

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//   },

//   titleHeader: {
//     fontFamily: "Roboto_Medium",
//     fontSize: 17,
//     lineHeight: 22,
//     color: "#212121",
//   },
// });
