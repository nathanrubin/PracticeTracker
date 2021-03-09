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
  const [loadingTeachers, setLoadingTeachers] = useState(true)
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    if (!currentUser) {
      return 
    }

    firestore.collection("students").where("email", "==", currentUser.email)
    .get()
    .then((querySnapshot) => {
        const dbStudents = []

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
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
        setLoadingStudents(false)
      });
    }, [])

  function loadClass(teacher, classDateTime) {
    firestore.collection("classes").where("teacher", "==", teacher).where("class", "==", classDateTime)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
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
          setLoadingClasses(false)
        });
    return
  }

  useEffect(() => {
    if (!currentUser) {
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

  const emptyStickers = ["","","","","","",""];
  function addSticker(stickerTitle, day) {
    const studentId = students[selectedStudent].id;
    students[selectedStudent].weekdaysComplete = union(students[selectedStudent].weekdaysComplete, [day]);
    students[selectedStudent].myStickers[day] = stickerTitle;
    firestore.collection("students").doc(studentId).update( {
        myStickers: students[selectedStudent].myStickers,
        weekdaysComplete: students[selectedStudent].weekdaysComplete
     });
  }

  function removeSticker(day) {
    const studentId = students[selectedStudent].id;
    students[selectedStudent].myStickers[day] = "";

    // backwards compatibility - remove from weekday
    const index = students[selectedStudent].weekdaysComplete.indexOf(day);
    if (index > -1) {
        students[selectedStudent].weekdaysComplete.splice(index, 1);
    }

    firestore.collection("students").doc(studentId).update( {
        myStickers: students[selectedStudent].myStickers,
        weekdaysComplete: students[selectedStudent].weekdaysComplete
     });
  }

  function saveStudent(first, last, teacher, classDay, time) {
    const studentId = currentUser.email + "-" + first.toLowerCase();
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
        myStickers: ["","","","","","",""]
    }

    firestore.collection("students").doc(studentId).set(newStudent)
    .then(() => {
        console.log("Saved student");
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

 function today() {
    return moment().isoWeekday() % 7
 }

 function getClassTime() {
   return students[selectedStudent]? students[selectedStudent].class.trim().split(" ")[1].toLowerCase() : "";
 }

 function getTeacherClassDays(name) {
   const days = teachers.filter(teacher => teacher.name == name)
                        .map(t => t.classes.map(c => c.trim().split(" ")[0].toLowerCase())) // ["fri 4:00p", "mon 3:15p"] => ["fri", "mon"]
                        .reduce((acc, curVal) => acc.concat(curVal), []);
   console.log(days)
   return days
 }

 function getClassTimes(name, day) {
  const times = teachers.filter(teacher => teacher.name == name)
                       .map(t => t.classes.filter(c => c.includes(day)).map(c => c.trim().split(" ")[1].toLowerCase())) // ["mon 4:00p", "mon 3:15p"] => ["3:15p", "4:00p"]
                       .reduce((acc, curVal) => acc.concat(curVal), []);
  console.log(times)
  return times
 }

  const value = {
    teachers,
    students,
    selectedStudent,
    assignments,
    selectStudent,
    addSticker,
    removeSticker,
    isClassDay,
    today,
    isDayInPast,
    getClassTime,
    saveStudent,
    getTeacherClassDays,
    getClassTimes
  }

  return (
    <UserContext.Provider value={value}>
      {!loadingStudents && !loadingClasses && !loadingTeachers && children}
    </UserContext.Provider>
  )
}