import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext"
import { useAdmin } from "../../contexts/AdminContext"
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ChevronRight from '@material-ui/icons/ChevronRight'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  teacherList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
    width: 400
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



export default function Class() {
  const classes = useStyles();
  let history = useHistory();

  const { logout, isAdmin, setIsTeacher, name } = useAuth()
  const { selectedTeacher, selectClass, selectedClass, classDetails, classStudents } = useAdmin()
  const [error, setError] = useState("")

  function goBack() {
    selectClass('')
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={() => window.location.reload(false)}>
            {selectedTeacher && selectedTeacher.name} - {selectedClass}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={0}>
          <Card className={classes.list}>

            <Grid item xs={12}>
                <div className={classes.teacherList}>
                {classStudents.map((student, id) => {
                    return (
                        <ListItem key={id}>
                            <ListItemText 
                              primary={student.first} 
                            />
                        </ListItem>
                        )
                })}

                </div>
            
            </Grid>
            <Grid item xs={12}>
                <div className={classes.teacherList}>
                {classDetails.assignments.map((assignment, id) => {
                    return (
                        <ListItem key={id}>
                            <ListItemText 
                              primary={assignment} 
                            />
                        </ListItem>
                        )
                })}

                </div>
            
            </Grid>

            </Card>
          </Grid>
        </Container>

      </main>
    </div>
  );
}