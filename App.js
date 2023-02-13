import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { useCallback } from "react";

import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

import { useRoute } from "./router";

export default function App() {
  const routing = useRoute({});

  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    Roboto_Medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
    //   <RegistrationScreen />
    //   {/* <LoginScreen />  */}
    //   {/* <PostsScreen /> */}
    // </View>
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}

{
  /* <AuthStack.Navigator initialRouteName="Login">
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
</AuthStack.Navigator> */
}

{
  /* <MainTab.Navigator>
          <MainTab.Screen name="Post" component={PostsScreen} />
          <MainTab.Screen name="Create" component={CreatePostsScreen} />
          <MainTab.Screen name="Profile" component={ProfileScreen} />
        </MainTab.Navigator>  */
}
