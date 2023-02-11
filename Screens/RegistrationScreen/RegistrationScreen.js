import { useCallback, useState } from "react";

import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import SvgComponent from "../SvgComponent";
import { styles } from "../AuthStyles";

SplashScreen.preventAutoHideAsync();

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ ...props }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [text, setText] = useState("Показати");
  const [loginBorderColor, setLoginBorderColor] = useState("#E8E8E8");
  const [emailBorderColor, setEmailBorderColor] = useState("#E8E8E8");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#E8E8E8");
  const [avatarImg, setAvatarImg] = useState(false);
  const [avatarBtn, setAvatarBtn] = useState("#ff6c00");

  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
    Roboto_Medium: require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const touchBtn = () => {
    console.log(state);
    setState(initialState);
  };

  const touchPassword = () => {
    setPasswordShow(!passwordShow);
    if (passwordShow) {
      setText("Сховати ");
    } else {
      setText("Показати");
    }
  };

  const customOnFocus = (nameState) => {
    props?.onFocus;
    nameState("#FF6C00");
  };

  const customOnBlur = (nameState) => {
    props?.onBlur;
    nameState("#E8E8E8");
  };

  const addAvatar = () => {
    setAvatarImg(!avatarImg);
    if (avatarImg) {
      setAvatarBtn("#FF6C00");
    } else {
      setAvatarBtn("#E8E8E8");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/photo-bg.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={{ justifyContent: "flex-end" }}>
              <View
                style={{
                  ...styles.wrap,
                  paddingBottom: isShowKeyboard ? 16 : 78,
                }}
              >
                <View style={styles.avatar}>
                  {avatarImg && (
                    <Image
                      style={styles.avatarImg}
                      source={require("../../assets/images/avatar.jpg")}
                    />
                  )}

                  <TouchableOpacity
                    style={{
                      ...styles.avatarBtn,
                      backgroundColor: avatarImg ? "#ffffff" : "transparent",
                      transform: avatarImg
                        ? [{ rotate: "45deg" }]
                        : [{ rotate: "0deg" }],
                    }}
                    activeOpacity={0.8}
                    onPress={addAvatar}
                  >
                    <SvgComponent
                      style={styles.avatarSvg}
                      colorBtn={avatarBtn}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.form}>
                  <Text style={styles.formTitle}>Реєстрація</Text>

                  <TextInput
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, login: value }))
                    }
                    placeholder="Логін"
                    style={{ ...styles.input, borderColor: loginBorderColor }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      customOnFocus(setLoginBorderColor);
                    }}
                    onBlur={() => {
                      customOnBlur(setLoginBorderColor);
                    }}
                  />
                  <TextInput
                    value={state.email}
                    placeholder="Адреса електронної пошти"
                    style={{ ...styles.input, borderColor: emailBorderColor }}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      customOnFocus(setEmailBorderColor);
                    }}
                    onBlur={() => {
                      customOnBlur(setEmailBorderColor);
                    }}
                    onChangeText={(value) =>
                      setState((prevState) => ({ ...prevState, email: value }))
                    }
                  />
                  <View>
                    <TouchableOpacity
                      style={{
                        ...styles.passwordWrap,
                        borderColor: passwordBorderColor,
                      }}
                      activeOpacity={0.8}
                      onFocus={customOnFocus}
                      onBlur={customOnBlur}
                    >
                      <TextInput
                        value={state.password}
                        placeholder="Пароль"
                        secureTextEntry={passwordShow}
                        style={styles.inputPassword}
                        onFocus={() => {
                          setIsShowKeyboard(true);
                          customOnFocus(setPasswordBorderColor);
                        }}
                        onBlur={() => {
                          customOnBlur(setPasswordBorderColor);
                        }}
                        onChangeText={(value) =>
                          setState((prevState) => ({
                            ...prevState,
                            password: value,
                          }))
                        }
                      />
                      <Text style={styles.passwordText} onPress={touchPassword}>
                        {text}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {!isShowKeyboard && (
                    <>
                      <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                        <Text style={styles.btnTitle} onPress={touchBtn}>
                          Зареєструватися
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.link} activeOpacity={0.8}>
                        <Text style={styles.linkTitle}>
                          Вже є акаунт? Увійти
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "flex-end",
//   },
//   wrap: {
//     backgroundColor: "#ffffff",
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//   },

//   avatar: {
//     position: "relative",
//     width: 120,
//     height: 120,
//     backgroundColor: "#fff0ff",
//     marginTop: -60,
//     borderRadius: 16,
//     marginBottom: 32,
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
//   avatarBtn: {
//     position: "absolute",
//     top: 81,
//     left: 107,
//     borderRadius: 12.5,
//   },
//   avatarSvg: {},

//   avatarImg: {
//     borderRadius: 16,
//   },
//   form: {
//     marginHorizontal: 16,
//   },
//   formTitle: {
//     marginBottom: 33,
//     textAlign: "center",
//     fontSize: 30,
//     lineHeight: 35,
//     color: "#212121",
//     fontFamily: "Roboto_Medium",
//   },
//   inputWrap: {},
//   input: {
//     backgroundColor: "#F6F6F6",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingBottom: 15,
//     paddingTop: 16,
//     paddingLeft: 16,
//     paddingRight: 16,
//     marginBottom: 16,
//     color: "#212121",
//     fontSize: 16,
//     lineHeight: 19,
//     fontFamily: "Roboto_Regular",
//   },
//   passwordWrap: {
//     backgroundColor: "#F6F6F6",
//     borderWidth: 1,
//     borderRadius: 8,
//     flexDirection: "row",
//     paddingBottom: 15,
//     paddingTop: 16,
//     paddingLeft: 16,
//     paddingRight: 16,
//     marginBottom: 16,
//     color: "#212121",
//     fontSize: 16,
//     lineHeight: 19,
//     fontFamily: "Roboto_Regular",
//   },
//   inputPassword: {
//     flex: 4,
//   },
//   passwordText: {
//     marginLeft: 15,
//     color: " #1B4371",
//   },
//   btn: {
//     height: 51,
//     backgroundColor: "#FF6C00",
//     borderRadius: 100,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 27,
//   },
//   btnTitle: {
//     fontFamily: "Roboto_Regular",
//     fontSize: 16,
//     lineHeight: 19,
//     color: "#ffffff",
//   },
//   link: { marginTop: 16 },
//   linkTitle: {
//     fontFamily: "Roboto_Regular",
//     fontSize: 16,
//     lineHeight: 19,
//     textAlign: "center",
//     color: "#1B4371",
//   },
// });
