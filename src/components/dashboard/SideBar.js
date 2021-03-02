import React from 'react';
import { useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { makeStyles } from '@material-ui/core/styles';

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

  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/")
    } catch {
      console.log("failed to log out")
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={1} className={classes.container}>
        <Grid item xs={3}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Class: </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.title} color="secondary" gutterBottom>{student.teacher} - {student.class}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Play-Along: </Typography>
        </Grid>
        <Grid item xs={9}>
          <a style={{ color: wagner.coral }} href="https://www.wagnersmusic.com/playalong-songs">wagnersmusic.com/playalong-songs</a>
        </Grid>
        <Grid item xs={3}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Stickers: </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Achievements: </Typography>
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
