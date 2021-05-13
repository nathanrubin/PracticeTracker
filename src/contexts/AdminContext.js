import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"
import moment from 'moment';
import {availablePacks, getStickers} from '../stickers';

const AdminContext = React.createContext()

export function useAdmin() {
  return useContext(AdminContext)
}

export function AdminProvider({ children }) {
  const { isAdmin, isTeacher, setIsTeacher, name } = useAuth()
  const [loadingTeachers, setLoadingTeachers] = useState(true)
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState('')

  useEffect(() => {
    {console.log("loading admin context")}
    if (!(isAdmin || isTeacher)) {
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
            if (isTeacher && details.name == name) {
                setSelectedTeacher(details);
            }
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


  function selectTeacher(selected) {
    setSelectedTeacher(selected)
    setIsTeacher(selected)
    console.log("selected: " + selected.name)
    return
  }

  function today() {
    return moment().isoWeekday() % 7
  }

  const value = {
    teachers,
    selectedTeacher,
    selectTeacher
  }

  return (
    <AdminContext.Provider value={value}>
      {!loadingTeachers && children}
    </AdminContext.Provider>
  )
}