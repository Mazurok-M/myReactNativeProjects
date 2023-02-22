import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
// import { AppLoading } from "expo";

SplashScreen.preventAutoHideAsync();

import { useRoute } from "./router";
import { store } from "./redux/store";
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

export default function App() {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => setUser(user));

  const routing = useRoute();

  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    Roboto_Medium: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    Roboto_Bold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
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
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </Provider>
  );
}
