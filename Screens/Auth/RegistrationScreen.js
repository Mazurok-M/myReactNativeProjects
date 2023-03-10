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
  Image,
} from "react-native";

import SvgComponent from "../SvgComponent";
import { styles } from "./AuthStyles";

import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";
import Avatar from "../../Component/Avatar";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegistrationScreen({ navigation, ...props }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [text, setText] = useState("Показати");
  const [loginBorderColor, setLoginBorderColor] = useState("#E8E8E8");
  const [emailBorderColor, setEmailBorderColor] = useState("#E8E8E8");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#E8E8E8");
  const [imageAvatar, setImageAvatar] = useState("");
  const [avatarBtn, setAvatarBtn] = useState("#ff6c00");

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    dispatch(authSignUpUser({ ...state, avatar: imageAvatar }));
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
                  paddingTop: 92,
                  paddingBottom: isShowKeyboard ? 16 : 78,
                }}
              >
                <Avatar
                  imageAvatar={imageAvatar}
                  setImageAvatar={setImageAvatar}
                />
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Реєстрація</Text>

                  <TextInput
                    value={state.login}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
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
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
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
                        <Text style={styles.btnTitle} onPress={handleSubmit}>
                          Зареєструватися
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.link}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("Login")}
                      >
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
