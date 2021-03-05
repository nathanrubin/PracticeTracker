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
  const [loadingClasses, setLoadingClasses] = useState(false)

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
              weekdaysComplete: doc.data().weekdaysComplete,
              myStickers: doc.data().myStickers ? doc.data().myStickers : []
            }
            emptyStickers.forEach((empty, id) => {
              if(details.myStickers[id] === undefined) {
                details.myStickers[id] = empty 
              }
            });
            dbStudents.push(details);
            loadClass(details.teacher, details.class);
            setLoadingClasses(true);
        });
        if (dbStudents.length > 0){
          setStudents(dbStudents)
          setSelectedStudent(0)
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      }).finally(() => {
        console.log("student query ended.");
        setLoadingStudents(false)
      });
    }, [])

  function loadClass(teacher, classDateTime) {
    console.log("loading classes");
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
        }).catch((error) => {
            console.log("Error getting document:", error);
        }).finally(() => {
          console.log("classes query ended.");
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

  const emptyStickers = ["","","","","","",""];
  function addSticker(stickerTitle, day) {
    const studentId = students[selectedStudent].id;
    students[selectedStudent].myStickers[day] = stickerTitle;
    firestore.collection("students").doc(studentId).update( {
        myStickers: students[selectedStudent].myStickers
     });
  }

  function removeSticker(day) {
    const studentId = students[selectedStudent].id;
    students[selectedStudent].myStickers[day] = "";
    firestore.collection("students").doc(studentId).update( {
        myStickers: students[selectedStudent].myStickers
     });
  }

  function saveStudent(first, last, teacher, classDay, time) {
    const studentId = currentUser.email + "-" + first;
    var newStudent = {
        first: first,
        last: last,
        teacher: teacher,
        class: classDay + " " + time,
        email: currentUser.email,
        displayName: first,
        stickerPack: "",
        teacherStickers: [],
        weekdaysComplete: [],
        myStickers: []
    }
    firestore.collection("students").doc(studentId).set(newStudent)
    .then(() => {
        console.log("Student successfully saved!");
        newStudent.id = studentId;
        students.push(newStudent)
        if (!selectedStudent) {
          setSelectedStudent(0)
        }
        loadClass(newStudent.teacher, newStudent.class);
    })
    .catch((error) => {
        console.error("Error saving student document: ", error);
    });
  }

  function isDayInPast(day) {
    if (!students[selectedStudent]) {
      return false;
    }

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
    if (!students[selectedStudent]) {
      return false;
    }
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
   return students[selectedStudent]? students[selectedStudent].class.trim().split(" ")[1].toLowerCase() : "";
 }

  const value = {
    students,
    selectedStudent,
    assignments,
    selectStudent,
    addToday,
    removeToday,
    addSticker,
    removeSticker,
    isWeekdayComplete,
    isTodayComplete,
    isClassDay,
    today,
    isDayInPast,
    getClassTime,
    saveStudent
  }

  return (
    <UserContext.Provider value={value}>
      {!loadingStudents && !loadingClasses && children}
    </UserContext.Provider>
  )
}