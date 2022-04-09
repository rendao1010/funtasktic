import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export function getUser() {
  const item = localStorage.getItem("user");
  return item ? JSON.parse(item) : null;
}

export function setUser(user) {
  if (user == null) {
    localStorage.removeItem("user");
  } else {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
        uid: user.uid,
        refId: user.refId,
      })
    );
  }
}

export const getUserAvatarURL = async () => {
  // Create a root reference
  const storage = getStorage();

  const imageRef = storageRef(storage, getUser().uid + ".jpg");
  const imageUrl = await getDownloadURL(imageRef)
    .then((url) => url)
    .catch(() => {
      return "data:image/png;base64,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";
    });

  return imageUrl;
};
