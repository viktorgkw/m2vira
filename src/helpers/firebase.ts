import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsvr0BRPPg4eBaH3l3cqvKCD8jh2eUtmU",
  authDomain: "m2vira-storage.firebaseapp.com",
  projectId: "m2vira-storage",
  storageBucket: "m2vira-storage.appspot.com",
  messagingSenderId: "341534522434",
  appId: "1:341534522434:web:ff7f3d7eb85baaebd9c1db",
  measurementId: "G-SNGJ5TYDHV",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { storage };
