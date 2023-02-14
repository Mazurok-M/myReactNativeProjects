import { useState } from "react";

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
} from "react-native";

import { styles } from "./AuthStyles";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation, ...props }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [text, setText] = useState("Показати");
  const [emailBorderColor, setEmailBorderColor] = useState("#E8E8E8");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#E8E8E8");

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const touchBtn = () => {
    console.log(state);
    setState(initialState);
    navigation.navigate("Home");
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

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
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
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Увійти</Text>
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
                          Увійти
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.link}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Registration")}
                      >
                        <Text style={styles.linkTitle}>
                          Немає акаунт? Зареєструватися
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
