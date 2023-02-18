import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyC_lE0668hwlYXylLiPMPNLaXMvLYEaKTw",
  authDomain: "alterego-test.firebaseapp.com",
  projectId: "alterego-test",
  storageBucket: "alterego-test.appspot.com",
  messagingSenderId: "373581046067",
  appId: "1:373581046067:web:6bf2251b42e6a36bd7de46"
}

const firebaseSetup = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseSetup)
export default firebaseSetup