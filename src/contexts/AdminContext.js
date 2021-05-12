import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"
import moment from 'moment';
import {availablePacks, getStickers} from '../stickers';

const AdminContext = React.createContext()

export function useUser() {
  return useContext(AdminContext)
}

export function AdminProvider({ children }) {
  const { isAdmin } = useAuth()
  const [loadingTeachers, setLoadingTeachers] = useState(true)
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    {console.log("loading admin context")}
    if (!isAdmin) {
      return 
    }

    firestore.collection("teachers")
    .get()
    .then((querySnapshot) => {
        const dbTeachers = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const details = {
              id: doc.id,
              name: doc.data().name,
              classes: doc.data().classes ? doc.data().classes : []
            }
            dbTeachers.push(details);
        });
        if (dbTeachers.length > 0){
          setTeachers(dbTeachers)

        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      }).finally(() => {
        setLoadingTeachers(false)
      });
  }, [])


  function today() {
    return moment().isoWeekday() % 7
  }

  const value = {
    teachers
  }

  return (
    <AdminContext.Provider value={value}>
      {!loadingTeachers && children}
    </AdminContext.Provider>
  )
}