
import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

// Config for firebase wagner-music (real database)
//      allow read, write: if request.auth != null;
const app = firebase.initializeApp({
    apiKey: "AIzaSyBNHOrfdAE-aAB6RqCEgpMIuWBM-uRcazo",
    authDomain: "wagners-music.firebaseapp.com",
    databaseURL: "https://wagners-music.firebaseio.com",
    projectId: "wagners-music",
    storageBucket: "wagners-music.appspot.com",
    messagingSenderId: "459671519837",
    appId: "1:459671519837:web:68c4d425876607a06883b4",
    measurementId: "G-MWFXWRN320"
})

// Config for firebase practice-tracker (test database)
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyAWXyDu8RDZ8F9sRI_NeOIhu220TPaSOLE",
//     authDomain: "practice-tracker-e1838.firebaseapp.com",
//     projectId: "practice-tracker-e1838",
//     storageBucket: "practice-tracker-e1838.appspot.com",
//     messagingSenderId: "873263178945",
//     appId: "1:873263178945:web:58d537956cdfcb5498a040",
//     measurementId: "G-XYP15FQ846"
// })

export const auth = app.auth()
export const firestore = app.firestore()
export default app