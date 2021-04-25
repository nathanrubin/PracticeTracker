import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  console.log("useAuth")
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [registered, setRegistered] = useState(true)
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      console.log("useContext signup: " + user.email);
      if (user && !user.emailVerified) {
        console.log("Initial load and users email is not verified. Send verification.")
        user.sendEmailVerification()
      }
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function sendEmailVerification() {
    return currentUser.sendEmailVerification()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {

      if (user) {
        setLoading(true)
        firestore.collection("accounts").where('emails', 'array-contains', user.email).limit(1)
          .get()
          .then((querySnapshot) => {
            if(!querySnapshot.empty) {
              console.log("setting current user")
              setCurrentUser(user)
              setRegistered(true)
            } else {
              setRegistered(false)
            }
            setLoading(false)
          }) 
      } else {
        setCurrentUser(null)
        setRegistered(false)
        setLoading(false)
      } 
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    registered,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    sendEmailVerification
  }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}