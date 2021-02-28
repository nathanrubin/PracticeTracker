import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"

const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const loadedClasses = []
  const { currentUser } = useAuth()
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [classes, setClasses] = useState([])
  const [assignments, setAssignments] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(true)
  const [loadingClasses, setLoadingClasses] = useState(true)

  useEffect(() => {
    firestore.collection("students").where("email", "==", currentUser.email)
    .get()
    .then((querySnapshot) => {
        const dbStudents = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const details = {
              id: doc.id,
              first: doc.data().first,
              last: doc.data().last,
              email: doc.data().email,
              class: doc.data().class,
              displayName: doc.data().displayName,
              stickerPack: doc.data().stickerPack,
              teacher: doc.data().teacher,
              teacherStickers: doc.data().teacherStickers,
              weekdaysComplete: doc.data().weekdaysComplete
            }
            dbStudents.push(details);
            loadClass(details.teacher, details.class);
        });
        if (dbStudents.length > 0){
          setStudents(dbStudents)
          setSelectedStudent(0)
        }
        setLoadingStudents(false)
      }).catch((error) => {
          console.log("Error getting document:", error);
          setLoadingStudents(false)
      });
    }, [])

  function loadClass(teacher, classDateTime) {
    firestore.collection("classes").where("teacher", "==", teacher).where("class", "==", classDateTime)
    .get()
    .then((querySnapshot) => {
        console.log("returned from class lookup")

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const details = {
                id: doc.id,
                email: doc.data().email,
                class: doc.data().class,
                teacher: doc.data().teacher,
                assignments: doc.data().assignments,
            }
            loadedClasses.push(details);
        });
        setClasses(loadedClasses)
        setAssignments(loadedClasses[0].assignments)
        setLoadingClasses(false)
        }).catch((error) => {
            console.log("Error getting document:", error);
            setLoadingClasses(false)
        });
    return
  }

  function selectStudent(selected) {
    setSelectedStudent(selected)
    const st = students[selected]
    console.log("student selected: " + st.first + " number of classes available: " + classes.length)

    if (classes.length > 0) {
        classes.filter(c => (c.teacher === st.teacher && c.class === st.class)).map( studentsClass => setAssignments(studentsClass.assignments))
    }
    return
  }

  const value = {
    students,
    selectedStudent,
    assignments,
    selectStudent
  }

  return (
    <UserContext.Provider value={value}>
      {!loadingStudents && !loadingClasses && children}
    </UserContext.Provider>
  )
}