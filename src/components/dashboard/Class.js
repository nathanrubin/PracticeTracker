import React, { useState, useEffect, useRef } from 'react'

import { useAdmin } from "../../contexts/AdminContext"
import { makeStyles } from '@material-ui/core/styles';
import { wagner } from '../../theme';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Star from '@material-ui/icons/Star';
import Check from '@material-ui/icons/Check';
import StarBorder from '@material-ui/icons/StarBorder';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import {getTeacherStickers, getTeacherStickersForStudent} from '../../stickers';
import { visibleColumnsLengthSelector } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
  },
  rootAssignments: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    flexGrow: 1
  },
  classDate: {
    fontWeight: 500,
    fontSize: 16,
    paddingTop: 2
  },
  table: {
    padding: theme.spacing(2, 0),
  },
  cellStudent: {
    width: '12rem',
    textTransform: 'capitalize',
    padding: theme.spacing(1, 0)
  },
  cellStudentAward: {
    width: '12rem',
    textTransform: 'capitalize',
    padding: 0
  },
  cell: {
    width: '6rem',
    padding: 0,
    textAlign: 'right'
  },
  row: {
    height: 20
  },
  headerAssignments: {
    padding: 0
  },
  assignmentTitle: {
    textTransform: 'uppercase',
    fontWeight: 500,
    padding: '10px 10px 0 10px'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  addAssignment: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  award: {
    display: 'flex',
    justifyContent: 'center'
  },
  awardAvatar: {
    maxWidth: 18,
    maxHeight: 18
  },
}));

export default function Class() {
  const classes = useStyles();
  const { selectedTeacher, selectClass, selectedClass, classDetails, classStudents, getLongClassDate, updateAssignments, addTeacherSticker, checkStickerSentToday, sendCandy } = useAdmin()
  const [assignments, setAssignments] = useState(classDetails.assignments)
  const [assignmentError, setAssignmentError] = useState("")
  const assignmentRef = useRef()
  const [openDialog, setOpenDialog] = React.useState(false);
  const [stickerDialog, setStickerDialog] = React.useState(false);
  const [awardDialog, setAwardDialog] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);

  function goBack() {
    selectClass('')
  }

  function renderTeacherStickers(student) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {student.teacherStickers.length>=4? <IconButton style={{padding: '8px'}} onClick={() => openAwardDialog(student)}><EmojiEvents color="primary" fontSize="small" /></IconButton> : ''}
        <div>
          {student.first + " " + student.last.charAt(0) + "."}
          <div className={classes.award}>
            {getTeacherStickersForStudent(student).slice(0, 5).map((s, id) => (
                  <Avatar key={id} src={s} className={classes.awardAvatar} />
            ))}
          </div>
      </div>
    </div>
    )
  }

  function renderStudent(student, col) {
    if (col==0) {
      return renderTeacherStickers(student);
    }
    else if (col==8) {
      return student.weekdaysComplete.length >= 5 ? 
        checkStickerSentToday(student) ? 
          <Check fontSize="small" style={{ color: wagner.green, margin: '8px' }} /> 
          : <IconButton style={{padding: '8px'}} key={col} onClick={() => openStickerDialog(student)}><Star color="primary" fontSize="small" /></IconButton>
        : '';
    } else {
      return student.weekdaysComplete.length >= col? 'X' : '';
    }
  }

  function removeAssignment(id) {
    var tmp = [...assignments];
    tmp.splice(id, 1);
    setAssignments(tmp);
    updateAssignments(tmp);
  }

  const addAssignmentOpen = () => {
    console.log("opening adding assignment")
    setOpenDialog(true);
  }
  const addAssignmentClose = () => {
    console.log("class add assignment")
    setOpenDialog(false);
  }
  const saveNewAssignment = () => {
    var tmp = [...assignments];
    tmp.push(assignmentRef.current.value);
    setAssignments(tmp);
    updateAssignments(tmp);
    setOpenDialog(false);
  }

  const handleValidation = () => {
    setAssignmentError(assignmentRef.current.value ? "" : "Assignment can't be empty.");
    setIsEnabled(assignmentRef.current.value);
  };

  const openStickerDialog = (student) => {
    setSelectedStudent(student);
    setStickerDialog(true);
  };
  const closeStickerDialog = () => {
    setSelectedStudent("");
    setStickerDialog(false);
  };

  const handleAddSticker = (sticker) => {
    addTeacherSticker(selectedStudent, sticker);
    setStickerDialog(false);
  };

  const openAwardDialog = (student) => {
    setSelectedStudent(student);
    setAwardDialog(true);
  };
  const closeAwardDialog = () => {
    setSelectedStudent("");
    setAwardDialog(false);
  };
  function sendCandyAward() {
    console.log("sending candy!");
    sendCandy(selectedStudent);
    closeAwardDialog();
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="inherit" className={classes.appBar} elevation={1}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => goBack()}
            >
            <ArrowBack />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" className={classes.title} noWrap onClick={() => window.location.reload(false)}>
            {selectedTeacher && selectedTeacher.name}
          </Typography>
          <Typography className={classes.classDate} color="secondary">{getLongClassDate(selectedClass)}</Typography>
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

        <Grid container spacing={1}>

          {/* Weekly */}
          <Grid item xs={12}>
            <Card className={classes.root}>
              <Table className={classes.row}>
                <TableHead>
                  <TableRow>
                    {['Student', '1', '2', '3', '4', '5', '6', '7', <StarBorder fontSize="small" style={{ marginTop: '4', marginRight: '10' }} />].map((col, id) => (
                      <TableCell key={id} align='center' className={id == 0 ? classes.cellStudent : classes.cell}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classStudents.map((student, id) => (
                    <TableRow className={classes.row} key={id}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, id) => (
                        <TableCell key={id} align='center' className={id == 0 ? student.teacherStickers.length>0? classes.cellStudentAward : classes.cellStudent : classes.cell}>
                          {renderStudent(student, col)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>

          <Grid item xs={12}>

            <Card className={classes.rootAssignments}>
              <Typography className={classes.assignmentTitle} color="secondary">Weekly Assignments</Typography>
              <Grid item xs={12}>
                <List dense>
                    {assignments && assignments.map((assignment, id) => {
                      return (<React.Fragment key={id}><Divider  />
                          <ListItem key={id} style={{paddingTop: 0, paddingBottom: 0}}>
                              <ListItemText primary={assignment} />
                              <IconButton edge="end" aria-label="delete" style={{padding: '8px', marginRight: '-16px'}} onClick={() => removeAssignment(id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                          </ListItem>
                          </React.Fragment>
                    )})}
                    <Divider  />
                    <IconButton aria-label="add assignment" style={{padding: '5px', margin: '5px'}} onClick={() => addAssignmentOpen()}>
                      <Add color='primary'/>
                    </IconButton>
                </List>
              </Grid>
            </Card>

          </Grid>
      </Grid>
      </Container>

      <Dialog onClose={addAssignmentClose} aria-labelledby="add-assignment" open={openDialog}>
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogContent>
            <form className={classes.addAssignment} autoComplete="off">
              <TextField autoFocus id="assignment" label="Assignment" error={assignmentError.length>0} helperText={assignmentError} inputRef={assignmentRef} onChange={handleValidation}/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => saveNewAssignment()} color="primary" disabled={!isEnabled}>
              Save
            </Button>
          </DialogActions>
      </Dialog>

      <Dialog onClose={closeStickerDialog} aria-labelledby="teacher-sticker-select" open={stickerDialog}>
        <DialogContent style={{padding: '8px'}}>
          <DialogContentText onClose={closeStickerDialog} style={{paddingLeft: '4px'}}>
            Sticker Selection
          </DialogContentText>
          
          {getTeacherStickers().map((tile) => (
              <IconButton aria-label={`${tile.title}`} onClick={() => handleAddSticker(tile.title)} key={tile.img} style={{padding: '4px'}}>
                  <Avatar src={tile.img} style={{borderRadius: 0, width: 50, height: 50}} />
              </IconButton>
          ))}
        </DialogContent>
      </Dialog>

      <Dialog onClose={closeAwardDialog} aria-labelledby="teacher-award-select" open={awardDialog}>
        <DialogTitle>CANDY AWARD</DialogTitle>

        <DialogContent>
          <DialogContentText onClose={closeAwardDialog}>
            {selectedStudent.first} {selectedStudent.last} has earned a candy!
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => sendCandyAward()} color="primary" >
              Send
            </Button>
            <Button onClick={() => closeAwardDialog()} color="inherit">
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </main>
  </div>
  );
}