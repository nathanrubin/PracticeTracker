
import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "AIzaSyAWXyDu8RDZ8F9sRI_NeOIhu220TPaSOLE",
    authDomain: "practice-tracker-e1838.firebaseapp.com",
    projectId: "practice-tracker-e1838",
    storageBucket: "practice-tracker-e1838.appspot.com",
    messagingSenderId: "873263178945",
    appId: "1:873263178945:web:58d537956cdfcb5498a040",
    measurementId: "G-XYP15FQ846"
})

export const auth = app.auth()
export const firestore = app.firestore()
export default app