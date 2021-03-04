import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"
import moment from 'moment';

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
    if (classes.length > 0) {
        classes.filter(c => (c.teacher === st.teacher && c.class === st.class)).map( studentsClass => setAssignments(studentsClass.assignments))
    }
    return
  }

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  function addToday() {
    const studentId = students[selectedStudent].id;
    const update = union(students[selectedStudent].weekdaysComplete, [today()]);
    students[selectedStudent].weekdaysComplete = update
    firestore.collection("students").doc(studentId).update( {
        weekdaysComplete: update
     });
  }

  function removeToday() {
    const studentId = students[selectedStudent].id;
    const index = students[selectedStudent].weekdaysComplete.indexOf(today());
    if (index > -1) {
        students[selectedStudent].weekdaysComplete.splice(index, 1);
    }
    firestore.collection("students").doc(studentId).update( {
        weekdaysComplete: students[selectedStudent].weekdaysComplete
     });
  }

  function isDayInPast(day) {
    const classDayStr = students[selectedStudent].class.trim().split(" ")[0].toLowerCase()
    const classDay = moment().day(classDayStr).format('d')
    const now = today()
    if (now <= classDay && (day < now || classDay < day)) {
      return true
    }
    if (classDay < day && day < now) {
      return true
    }

    return false;
  }

  function isClassDay(day) {
    const classDay= students[selectedStudent].class.trim().split(" ")[0].toLowerCase();
    return classDay === moment().day(day).format('ddd').toLowerCase();
  }

  function isWeekdayComplete(day) {
      return students[selectedStudent].weekdaysComplete.includes(day);
  }

  function isTodayComplete() {
    return isWeekdayComplete(today())
  }

 function today() {
    return moment().isoWeekday() % 7
 }

 function getClassTime() {
   return students[selectedStudent].class.trim().split(" ")[1].toLowerCase();
 }

  const value = {
    students,
    selectedStudent,
    assignments,
    selectStudent,
    addToday,
    removeToday,
    isWeekdayComplete,
    isTodayComplete,
    isClassDay,
    today,
    isDayInPast,
    getClassTime
  }

  return (
    <UserContext.Provider value={value}>
      {!loadingStudents && !loadingClasses && children}
    </UserContext.Provider>
  )
}