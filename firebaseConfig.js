// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5i1QK_JM9V1_YgTotIs9XA0c_UgKGu6k",
    projectId: "routines-app-af6e4",
    appId: Platform.OS == "android" ? "1:201642044607:android:4324b501a21d05c6626a0a" : "1:201642044607:ios:849aaebabf4e5a1b626a0a"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);