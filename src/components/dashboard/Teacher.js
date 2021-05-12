import React, { useState, useEffect, useRef } from 'react'
import { useUser } from "../../contexts/UserContext"

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import { SideBar } from './SideBar';
import Weekly from './Weekly';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'

import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 0, // keep right padding when drawer closed
  },
  drawerTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
    marginLeft: 16
  },
  drawerTitleIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 0',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 0,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    padding: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  addStudent: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

export default function Teacher() {
  const classes = useStyles();
  const { students, selectedStudent, selectStudent, assignments, saveStudent, teachers, getTeacherClassDays, getClassTimes } = useUser()
  const [error, setError] = useState("")
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedTeacher, setSelectedTeacher] = React.useState('');
  const [selectedClass, setSelectedClass] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [teacherClasses, setTeacherClasses] = React.useState([]);
  const [classTimes, setClassTimes] = React.useState([]);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [firstError, setFirstError] = React.useState('');
  const firstRef = useRef()
  const lastRef = useRef()

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const switchStudent = (event, index) => {
    selectStudent(index)
    setAnchorEl(null)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const addStudentOpen = () => {
    console.log("opening adding student")
    setOpenDialog(true);
  }
  const addStudentClose = () => {
    console.log("class add student")
    setOpenDialog(false);
    setAnchorEl(null)
  }
  const saveNewStudent = () => {
    console.log("saving student: " + firstRef.current.value + " " + lastRef.current.value + " " + selectedTeacher + " " + selectedClass + " " + selectedTime);
    setOpenDialog(false);
    setAnchorEl(null)
    saveStudent(firstRef.current.value, lastRef.current.value, selectedTeacher, selectedClass, selectedTime)
  }
  
  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value);
    setTeacherClasses(getTeacherClassDays(event.target.value))
    setSelectedClass('')
    setSelectedTime('')
    setIsEnabled(false)
  };
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
    setClassTimes(getClassTimes(selectedTeacher, event.target.value))
    setSelectedTime('')
    setIsEnabled(false)
  };
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setIsEnabled(!firstError && firstRef.current.value && lastRef.current.value)
  };
  const handleValidation = () => {
    const isValidFirst = !students.length || students.filter(s => s.first === firstRef.current.value).length == 0
    setIsEnabled(isValidFirst && firstRef.current.value && lastRef.current.value && selectedTeacher && selectedClass && selectedTime);
    setFirstError(isValidFirst ? "" : "First name must be unique.");
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="inherit" className={classes.appBar} elevation={1}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={() => window.location.reload(false)}>
            Teacher
          </Typography>         
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          {error && <Alert severity="error">{error}</Alert>}
          TODO
          {/* List Teachers - On select load Teacher */}
        </Container>

      </main>
    </div>
  );
}