import React from 'react';
import { useAuth } from "../../contexts/AuthContext"
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToApp from '@material-ui/icons/ExitToApp'
import Divider from '@material-ui/core/Divider'
import { wagner } from '../../theme'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  title: {
    fontSize: 14,
  },
  container: {
    padding: theme.spacing(1)
  },
}));

export function SideBar ({student}) {
  const classes = useStyles();
  let history = useHistory();

  const { logout } = useAuth()

  async function handleLogout() {
    try {
      await logout()
      console.log("logout history push.")
      history.go("/")
    } catch {
      console.log("failed to log out")
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Class: </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.title} color="secondary" gutterBottom>{student? student.teacher : ""} - {student? student.class: ""}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Songs: </Typography>
        </Grid>
        <Grid item xs={8}>
          <a style={{ color: wagner.coral }} href="https://www.wagnersmusic.com/playalong-songs">Play Along Songs</a>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Stickers: </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Achievements: </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Version:</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.title} color="secondary" gutterBottom>0.9.1.1</Typography>
        </Grid>
      </Grid>

      <Divider />
      <List dense>
        <ListItem button variant="link" onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
