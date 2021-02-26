import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { firestore } from "../../firebase"

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuIcon from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import { Profile } from './Profile';
import Assignments from './Assignments'
import Weekly from './Weekly';
import Title from './Title'
import moment from "moment";

const drawerWidth = 240;
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
    width: 250,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
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
}));

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory()
  const { logout, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [open, setOpen] = React.useState(false);
  const [students, setStudents] = useState([])
  const [currentStudent, setCurrentStudent] = useState({})

  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(() => {
    firestore.collection("students").where("email", "==", currentUser.email)
    .get()
    .then((querySnapshot) => {
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
            students.push(details)
            setCurrentStudent(details)
        });
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
  
      return () => unsubscribe()
    }, [])

  const list = (
    <div className={classes.list}>
      
      <DialogTitle disableTypography className={classes.drawerTitle}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Account info
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
            <Close />
        </IconButton>
      </DialogTitle>

      <Divider />
      <List dense><Profile student={currentStudent} /></List>
      <Divider />
      <List dense>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="inherit" className={classes.appBar} elevation={1}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            PRACTICE TRACKER
          </Typography>
          <Typography component="h2" variant="h6" color="secondary" noWrap className={classes.title}>
            {moment().format("dddd, MMMM DD")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {error && <Alert severity="error">{error}</Alert>}

            {/* Assignments */}
            <Grid item>
              <Paper className={classes.paper}>
               <Assignments />
              </Paper>
            </Grid>
            

            {/* Weekly */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Weekly />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}