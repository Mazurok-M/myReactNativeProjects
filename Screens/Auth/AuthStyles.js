import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrap: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatar: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#fff0ff",
    marginTop: -60,
    borderRadius: 16,
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatarBtn: {
    position: "absolute",
    top: 81,
    left: 107,
    borderRadius: 12.5,
  },
  avatarSvg: {},

  avatarImg: {
    borderRadius: 16,
  },
  form: {
    marginHorizontal: 16,
  },
  formTitle: {
    marginTop: 32,
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    fontFamily: "Roboto_Medium",
  },
  inputWrap: {},
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    paddingBottom: 15,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto_Regular",
  },
  passwordWrap: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    paddingBottom: 15,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto_Regular",
  },
  inputPassword: {
    flex: 4,
  },
  passwordText: {
    marginLeft: 15,
    color: " #1B4371",
  },
  btn: {
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 27,
  },
  btnTitle: {
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  link: { marginTop: 16 },
  linkTitle: {
    fontFamily: "Roboto_Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});