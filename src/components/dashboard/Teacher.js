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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

export default function Teacher() {
  const classes = useStyles();
  let history = useHistory();

  const { logout, isAdmin } = useAuth()
  const { selectedTeacher, selectTeacher, selectClass, getClassDays, getClassTimes, getLongDay } = useAdmin()
  const [error, setError] = useState("")

  function adminBack() {
    selectTeacher('')
  }

  async function handleLogout() {
    try {
      await logout()
      console.log("logout history push.")
      history.go("/")
    } catch {
      console.log("failed to log out")
    }
  }
  
  function renderAdminBack() {
    return ( isAdmin ? 
      <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={() => adminBack()}
        >
        <ArrowBack />
      </IconButton>
     : '')
  }

  function renderClassTimes(day) {
    const times = getClassTimes(selectedTeacher, day)
    return (<React.Fragment>
        {times.map((time, id) => {
          return(<Button color={id % 2 == 0?"inherit": "primary"} style={{textTransform: 'none'}} key={id} onClick={() => selectClass(day + " " + time)}>{time}</Button>)
        })}</React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position="absolute" color="inherit" className={classes.appBar} elevation={1}>
        <Toolbar className={classes.toolbar}>
          {renderAdminBack()}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={() => window.location.reload(false)}>
            {selectedTeacher && selectedTeacher.name}
          </Typography>
          <Button color="primary" onClick={handleLogout}>Log out</Button>   
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
                
                <List component="nav" aria-label="main mailbox folders">
                    {getClassDays(selectedTeacher).map((day, id) => {
                        return (
                        <ListItem key={id}>
                            <ListItemText 
                              primary={<Typography variant="h6" className={classes.title} color="secondary">{getLongDay(day)}</Typography>} 
                              secondary={renderClassTimes(day)}
                            />
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