import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

import { authSlice } from "./authReduser";

const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  authUpdateUserAvatar,
} = authSlice.actions;

export const authSignUpUser = ({ login, email, password, avatar }) => async (
  dispatch,
  getSatte
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: login,
      photoURL: avatar,
    });

    const user = auth.currentUser;

    dispatch(
      updateUserProfile({
        userId: user?.uid,
        login: user?.displayName,
        userEmail: user?.email,
        avatar: user?.photoURL,
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
          avatar: user.photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

export const updateUserAvatar = (photoURL) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL,
    });

    const user = auth.currentUser;
    console.log(user);
    dispatch(
      authUpdateUserAvatar({
        avatar: user.photoURL,
      })
    );
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};
