import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

// import { app } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/config";

import { authSlice } from "./authReduser";
import { async } from "@firebase/util";

export const authSignUpUser = ({ login, email, password }) => async (
  dispatch,
  getSatte
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, { displayName: login });

    const { displayName, uid } = auth.currentUser;

    dispatch(
      authSlice.actions.updateUserProfile({
        userId: uid,
        login: displayName,
      })
    );
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
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

const authSignOutUser = () => (dispatch, getSatte) => {};

export const authStateChangeUser = () => async (dispatch, getSatte) => {
  await onAuthStateChanged(auth, (user) => setUser(user));
};
