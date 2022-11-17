import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-URRgiSrqEjSjnHHPT9HYAvapigBiI7Y",
  authDomain: "vuefire0994.firebaseapp.com",
  databaseURL: "https://vuefire0994-default-rtdb.firebaseio.com",
  projectId: "vuefire0994",
  storageBucket: "vuefire0994.appspot.com",
  messagingSenderId: "307684123507",
  appId: "1:307684123507:web:be4c2d001047458bf81b06",
};

const firebaseApp = initializeApp(firebaseConfig);

//tambahkan code untuk menginisialisasikan Firebase

//tambahkan code untuk menginisialisasikan Realtime Database
export const db = getDatabase(firebaseApp);

//dan mendapatkan referensi ke database tersebut
