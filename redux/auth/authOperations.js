import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { app } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/config";

export const authSignUpUser = ({ login, email, password }) => async (
  dispatch,
  getSatte
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

export const authSigInUser = ({ email, password }) => async (
  dispatch,
  getSatte
) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

const authSignOutUser = () => (dispatch, getSatte) => {};
