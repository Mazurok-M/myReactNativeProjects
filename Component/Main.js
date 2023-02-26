import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

import { useSelector, useDispatch } from "react-redux";

import { useRoute } from "../router";
import { View } from "react-native";

import { authStateChangeUser } from "../redux/auth/authOperations";

export default function Main() {
  const { stateChange } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, [stateChange]);

  const routing = useRoute(stateChange);

  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    Roboto_Medium: require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
    Roboto_Bold: require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}
