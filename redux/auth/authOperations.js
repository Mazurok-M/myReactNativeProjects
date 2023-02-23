import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

// import { app } from "../../firebase/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebase/config";

import { authSlice } from "./authReduser";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser = ({ login, email, password }) => async (
  dispatch,
  getSatte
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: login,
    });

    const { displayName, uid, email } = auth.currentUser;

    dispatch(
      updateUserProfile({
        userId: uid,
        login: displayName,
        userEmail: email,
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

export const authSignOutUser = () => async (dispatch, getSatte) => {
  await signOut(auth);

  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getSatte) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          userEmail: user.email,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
