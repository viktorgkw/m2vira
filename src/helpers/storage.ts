import { storage } from "@/helpers/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const addImage = async (fileName: string, imgFile: File) => {
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, imgFile);
};

export const getImage = async (fileName: string): Promise<string> => {
  return await getDownloadURL(ref(storage, fileName));
};
