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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  teacherList: {
    width: '100%',
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

export default function Admin() {
  const classes = useStyles();
  let history = useHistory();

  const { logout, name } = useAuth()
  const { teachers, selectTeacher } = useAdmin()
  const [error, setError] = useState("")

  async function handleLogout() {
    try {
      await logout()
      console.log("logout history push.")
      history.go("/")
    } catch {
      console.log("failed to log out")
    }
  }

  async function handleLoadTeacher(teacher) {
    try {
      console.log("load teachers page for: " + teacher.name)
      selectTeacher(teacher);
    } catch {
      console.log("failed to load teacher")
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="inherit" className={classes.appBar} elevation={1}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={() => window.location.reload(false)}>
            {name}
          </Typography> 
          <Button color="primary" onClick={handleLogout}>Log out</Button>  
        </Toolbar>
      </AppBar>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth={false} className={classes.container}>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={0}>
          <Card className={classes.list}>

            <Grid item xs={12}>
                <div className={classes.teacherList}>
                <List component="nav" aria-label="main mailbox folders">
                    {teachers.map((value, id) => {
                        return (
                        <ListItem button key={id} onClick={() => handleLoadTeacher(value)}>
                            <ListItemIcon ><AccountCircle color='secondary'/></ListItemIcon>
                            <ListItemText primary={value.name} />
                            <Icon edge="end" aria-label="go">
                                <ChevronRight />
                            </Icon>
                        </ListItem>
                        )
                    })}
                </List>
                </div>
            </Grid>

            </Card>
          </Grid>
        </Container>

      </main>
    </div>
  );
}