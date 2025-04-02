// firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database"; // Import Realtime Database

// 🔥 Replace with your Firebase project config
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_PROJECT_ID.appspot.com",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBflSqBcwkmV0Af3wGuGHYCsrnLJiXjzyc",
  authDomain: "tasks-62a31.firebaseapp.com",
  databaseURL: "https://tasks-62a31-default-rtdb.firebaseio.com",
  projectId: "tasks-62a31",
  storageBucket: "tasks-62a31.firebasestorage.app",
  messagingSenderId: "975577967058",
  appId: "1:975577967058:web:eb5af7333c044a090c800b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db: Database = getDatabase(app);
