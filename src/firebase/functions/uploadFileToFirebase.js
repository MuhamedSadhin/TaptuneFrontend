import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config";

export const uploadFileToFirebase = async (file, folder = "new") => {
  if (!file) throw new Error("No file provided");

  const fileName = `${folder}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, fileName);

  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};
