import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config";

const deleteFileFromFirebase = async (fileUrl) => {
  try {
    if (!fileUrl) throw new Error("File URL is required");

    console.log("Deleting file from Firebase Storage:______________________________________________");

    const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.app.options.storageBucket}/o/`;
    const pathWithToken = decodeURIComponent(fileUrl.replace(baseUrl, ""));
    const filePath = pathWithToken.split("?")[0];

    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);

    console.log("File deleted successfully from Firebase Storage");
  } catch (error) {
    console.error("Error deleting file from Firebase:", error);
  }
};

export { deleteFileFromFirebase };
