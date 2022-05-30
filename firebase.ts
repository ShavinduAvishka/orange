// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIAkhZ80cO9GfF5_qhSJZH3Wsmxsdx2oI",
    authDomain: "orange-1c389.firebaseapp.com",
    projectId: "orange-1c389",
    storageBucket: "orange-1c389.appspot.com",
    messagingSenderId: "649193762725",
    appId: "1:649193762725:web:050ca916df79416f08824c"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }