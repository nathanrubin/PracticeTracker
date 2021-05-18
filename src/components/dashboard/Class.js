import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { useAdmin } from "../../contexts/AdminContext"
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import ChevronRight from '@material-ui/icons/ChevronRight'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { CardContent } from '@material-ui/core';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
  },
  rootAssignments: {
    backgroundColor: theme.palette.background.paper
  },
  table: {
    padding: theme.spacing(2, 0),
  },
  header: {
    width: '6rem',
    padding: theme.spacing(1, 0),
    textAlign: 'right'
  },
  cell: {
    width: '6rem',
    padding: theme.spacing(1, 0),
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
  }
}));



export default function Class() {
  const classes = useStyles();
  let history = useHistory();

  const { logout, isAdmin, setIsTeacher, name } = useAuth()
  const { selectedTeacher, selectClass, selectedClass, classDetails, classStudents, removeAssignmentIndex, saveAssignment } = useAdmin()
  const [assignmentError, setAssignmentError] = useState("")
  const assignmentRef = useRef()
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);

  function goBack() {
    selectClass('')
  }
  function renderStudent(student, col) {
    if (col==8) {
      return student.weekdaysComplete.length >= 5 ? <IconButton style={{padding: '5px', marginRight: '5px'}} key={col} ><Star color="secondary" fontSize="small" /></IconButton> : '';
    } else {
      return col==0 ? student.first + " " + student.last.charAt(0) + "." : student.weekdaysComplete.length >= col? 'X' : '';
    }
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
    console.log("saving assignment: " + assignmentRef.current.value);
    setOpenDialog(false);
    saveAssignment(assignmentRef.current.value)
  }
  
  const handleValidation = () => {
    setAssignmentError(assignmentRef.current.value ? "" : "Assignment can't be empty.");
    setIsEnabled(assignmentRef.current.value);
  };

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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={() => window.location.reload(false)}>
            {selectedTeacher && selectedTeacher.name} - {selectedClass}
          </Typography>
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
                    {['Student', '1', '2', '3', '4', '5', '6', '7', <StarBorder fontSize="small" style={{ marginTop: '4', marginRight: '10' }} />].map((col) => (
                      <TableCell key={col} align='center' className={classes.header}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classStudents.map((student, id) => (
                    <TableRow className={classes.row} key={id}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
                        <TableCell key={col} align='center' className={classes.cell}>
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
                    {classDetails && classDetails.assignments && classDetails.assignments.map((assignment, id) => {
                      return (<React.Fragment key={id}><Divider  />
                          <ListItem key={id} style={{paddingTop: 0, paddingBottom: 0}}>
                              <ListItemText primary={assignment} />
                              <IconButton edge="end" aria-label="delete" style={{padding: '5px'}} onClick={() => removeAssignmentIndex(id)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                          </ListItem>
                          </React.Fragment>
                    )})}
                    <Divider  />
                    <IconButton aria-label="add assignment" style={{padding: '5px', margin: '5px'}} onClick={() => addAssignmentOpen()}>
                      <Add color='secondary'/>
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
      </main>
    </div>
  );
}