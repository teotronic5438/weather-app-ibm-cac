import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCphw9fMC6GUZZ0FwyV09L9ZyD62IfrMsc",
    authDomain: "weather-ice-cream.firebaseapp.com",
    databaseURL: "https://weather-ice-cream.firebaseio.com",
    projectId: "weather-ice-cream",
    storageBucket: "weather-ice-cream.appspot.com",
    messagingSenderId: "1017596718798",
    appId: "1:1017596718798:web:6e620576a63f1ab9f52a9f",
    measurementId: "G-ZCX97K72HZ"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);