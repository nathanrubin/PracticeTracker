import React, { useContext, useState, useEffect } from "react"
import { firestore } from "../firebase"
import { useAuth } from "./AuthContext"
import moment from 'moment';
import {availablePacks, getStickers, stickers} from '../stickers';

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

    firestore.collection("classes")
    .get()
    .then((querySnapshot) => {
        const dbTeachers = {}
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const details = {
              id: doc.id,
              teacher: doc.data().teacher,
              class: doc.data().class,
              email: doc.data().email,
              assignments: doc.data().assignments ? doc.data().assignments : []
            }
            const teacher = dbTeachers[details.teacher] ? dbTeachers[details.teacher] : {name: details.teacher, classes: []};
            teacher.classes.push(details);

            dbTeachers[details.teacher] = teacher;
        });

        if (isTeacher) {
          setSelectedTeacher(dbTeachers[name]);
        }
        if (dbTeachers){
          const teach = Object.keys(dbTeachers).reduce((array, key) => {
            return [...array, dbTeachers[key]]
          }, [])
          setTeachers(teach)
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
    return
  }

  async function selectClass(classDateTime) {
    if (classDateTime && selectedTeacher) {
      loadClassDetails(selectedTeacher, classDateTime);
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
    var details = teacher.classes.filter(c => c.class == classDateTime)[0];
    setClassDetails(details);
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
                myStickers: doc.data().myStickers ? doc.data().myStickers : [],
                teacherStickers: doc.data().teacherStickers,
                weekdaysComplete: doc.data().weekdaysComplete,
                stickerWall: doc.data().stickerWall ? doc.data().stickerWall : []
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
    const days = teacher.classes.map(c => c.class.trim().split(" ")[0].toLowerCase()) // ["fri 4:00p", "mon 3:15p"] => ["fri", "mon"]
    var uniqueDays = Array.from(new Set(days));
    let sorted = uniqueDays.sort((a, b) => moment(a, 'ddd').weekday() - moment(b, 'ddd').weekday() );
    return sorted
  }
 
  function getClassTimes(teacher, day) {
   var times = teacher.classes.filter(c => c.class.includes(day)).map(c => c.class.trim().split(" ")[1].toLowerCase()); // ["mon 4:00p", "mon 3:15p"] => ["3:15p", "4:00p"]
   times.sort((a, b) => moment(a,'h:mma') - moment(b,'h:mma'));
   return times
  }

  function getLongDay(short) {
    return moment(short, 'ddd').format('dddd').toUpperCase()
  }

  function getLongClassDate(short) {
    const splitDate = short.trim().split(" ");
    return getLongDay(splitDate[0]) + " " + splitDate[1];
  }

  function updateAssignments(assignments) {
    classDetails.assignments = assignments;
    setClassDetails(classDetails);
    firestore.collection("classes").doc(classDetails.id).update( {
        assignments: classDetails.assignments
    });
  }

  function addTeacherSticker(student, sticker) {
    const studentId = student.id;
    const day = moment().format('MMM DD');
    const daySticker = day + "/" + sticker;
    student.teacherStickers = union(student.teacherStickers, [daySticker]);
    firestore.collection("students").doc(studentId).update( {
      teacherStickers: student.teacherStickers
     });
  }

  function sendCandy(student) {
    // transfers teacher stickers to a students sticker wall
    student.stickerWall = union(student.stickerWall, student.teacherStickers);
    student.teacherStickers = [];
    firestore.collection("students").doc(student.id).update( {
      stickerWall: student.stickerWall,
      teacherStickers: student.teacherStickers
     });
  }

  function checkStickerSentToday(student) {
    const day = moment().format('MMM DD');
    const foundAny = student.teacherStickers.filter(s => s.includes(day))
    return foundAny.length > 0;
  }

  function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }

  function union(a, b) {
    return [...a, ...not(b, a)];
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
    getLongDay,
    getLongClassDate,
    updateAssignments,
    addTeacherSticker,
    checkStickerSentToday,
    sendCandy
  }

  return (
    <AdminContext.Provider value={value}>
      {!loadingTeachers && children}
    </AdminContext.Provider>
  )
}