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
  const { isAdmin, isTeacher, setIsTeacher, setIsClass, name } = useAuth()
  const [loadingTeachers, setLoadingTeachers] = useState(true)
  const [teachers, setTeachers] = useState([])
  const [selectedTeacher, setSelectedTeacher] = useState('')
  const [selectedClass, setSelectedClass] = useState('')

  const [classDetails, setClassDetails] = useState({})
  const [classStudents, setClassStudents] = useState([])

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

  async function selectClass(classDateTime) {
    if (classDateTime && selectedTeacher) {
      console.log("class data and teacher selected. " + classDateTime)
      loadClassDetails(selectedTeacher.name, classDateTime);
      await loadClassStudents(selectedTeacher.name, classDateTime);
      setSelectedClass(classDateTime);
      setIsClass(classDateTime);
    } else {
      setClassStudents([])
      setClassDetails('')
      setSelectedClass('')
      setIsClass('')
    }
    return
  }

  function loadClassDetails(teacher, classDateTime) {
    firestore.collection("classes").where("teacher", "==", teacher).where("class", "==", classDateTime).limit(1)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const details = {
                id: doc.id,
                email: doc.data().email,
                class: doc.data().class,
                teacher: doc.data().teacher,
                assignments: doc.data().assignments,
            }
            setClassDetails(details);
            return details
        });
        }).catch((error) => {
            console.log("Error getting class details:", error);
            return ''
        })
  }

  async function loadClassStudents(teacher, classDateTime) {

    await firestore.collection("students").where("teacher", "==", teacher).where("class", "==", classDateTime)
    .get()
    .then((querySnapshot) => {
        const students = []

        querySnapshot.forEach((doc) => {
            const student = {
                id: doc.id,
                first: doc.data().first,
                last: doc.data().last,
                myStickers: doc.data().myStickers,
                teacherStickers: doc.data().teacherStickers
            }
            students.push(student);
            setClassStudents(students);
        });
        }).catch((error) => {
            console.log("Error getting class students:", error);
        })
    return
  }

  function getClassDays(teacher) {
    console.log(teacher)
    const days = teacher.classes.map(c => c.trim().split(" ")[0].toLowerCase()) // ["fri 4:00p", "mon 3:15p"] => ["fri", "mon"]
    var uniqueDays = Array.from(new Set(days));
    let sorted = uniqueDays.sort((a, b) => moment(a, 'ddd').weekday() - moment(b, 'ddd').weekday() );
    console.log(sorted)
    return sorted
  }
 
  function getClassTimes(teacher, day) {
   var times = teacher.classes.filter(c => c.includes(day)).map(c => c.trim().split(" ")[1].toLowerCase()); // ["mon 4:00p", "mon 3:15p"] => ["3:15p", "4:00p"]
   times.sort((a, b) => moment(a,'h:mma') - moment(b,'h:mma'));
   return times
  }

  function getLongDay(short) {
    return moment(short, 'ddd').format('dddd').toUpperCase()
  }

  function today() {
    return moment().isoWeekday() % 7
  }

  const value = {
    teachers,
    selectedTeacher,
    selectedClass,
    classDetails,
    classStudents,
    selectTeacher,
    selectClass,
    getClassDays,
    getClassTimes,
    getLongDay
  }

  return (
    <AdminContext.Provider value={value}>
      {!loadingTeachers && children}
    </AdminContext.Provider>
  )
}