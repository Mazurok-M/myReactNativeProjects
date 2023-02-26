import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

import SvgComponent from "../Screens/SvgComponent";
import { useDispatch, useSelector } from "react-redux";

import { updateUserAvatar } from "../redux/auth/authOperations";

export default function Avatar({ imageAvatar, setImageAvatar }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const uploadAvatarToServer = async (photo) => {
    const respons = await fetch(photo);
    const file = await respons.blob();

    const uniqueAvatarId = Date.now().toString();

    const data = await ref(storage, `avatarsImages/${uniqueAvatarId}`);

    await uploadBytes(data, file);

    const processedPhoto = await getDownloadURL(
      ref(storage, `avatarsImages/${uniqueAvatarId}`)
    );

    return processedPhoto;
  };

  const pickImage = async () => {
    if (imageAvatar) {
      const photoUrl = "";
      dispatch(updateUserAvatar(photoUrl));
      return setImageAvatar("");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUrl = await uploadAvatarToServer(result.assets[0].uri);
      setImageAvatar(photoUrl);

      if (state) dispatch(updateUserAvatar(photoUrl));
    }
  };

  return (
    <View style={styles.avatar}>
      {imageAvatar && (
        <Image style={styles.avatarImg} source={{ uri: imageAvatar }} />
      )}

      <TouchableOpacity
        style={{
          ...styles.avatarBtn,
          backgroundColor: imageAvatar ? "#ffffff" : "transparent",
          transform: imageAvatar ? [{ rotate: "45deg" }] : [{ rotate: "0deg" }],
        }}
        activeOpacity={0.8}
        onPress={pickImage}
      >
        <SvgComponent colorBtn={imageAvatar ? "#E8E8E8" : "#FF6C00"} />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",

    marginTop: -60,

    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  avatarImg: {
    borderRadius: 16,
    resizeMode: "cover",
    width: 120,
    height: 120,
  },
  avatarBtn: {
    position: "absolute",
    top: 81,
    left: 107,
    borderRadius: 12.5,
  },
});
