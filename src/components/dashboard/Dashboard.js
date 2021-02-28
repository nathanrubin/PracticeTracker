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
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Close from '@material-ui/icons/Close';
import { SideBar } from './SideBar';
import Assignments from './Assignments'
import Weekly from './Weekly';
import Title from './Title'
import moment from "moment";
import MenuItem from '@material-ui/core/MenuItem';

import Menu from '@material-ui/core/Menu';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { students, selectedStudent, selectStudent, assignments } = useUser()
  const [error, setError] = useState("")
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
          {/* <Typography component="h2" variant="h6" color="secondary" noWrap className={classes.title}>
            {moment().format("dddd, MMMM DD")}
          </Typography> */}
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
            <AccountCircle />
          </IconButton>
          {/* <Button color="inherit" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu}>Login</Button> */}
          <Menu
            id="student-select"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {students.map(({first}, index) => (
              <MenuItem key={index} value={index} selected={index === selectedStudent} onClick={(event) => switchStudent(event, index)}>
                {first}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
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
        <SideBar student={students[selectedStudent]}/>
      </div>
      </Drawer>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {error && <Alert severity="error">{error}</Alert>}

            {/* Assignments */}
            <Grid item>
              <Paper className={classes.paper}>
               <Assignments first={`${students[selectedStudent].first}`} assignments={assignments}/>
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