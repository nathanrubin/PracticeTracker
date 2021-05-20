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
import Avatar from '@material-ui/core/Avatar';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {getStickers, getImgByTitle} from '../../stickers';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block'
  },
  title: {
    fontSize: 14,
  },
  content: {
    fontSize: 11,
  },
  container: {
    padding: theme.spacing(1)
  },
  packAvatar: {
    width: '15%',
    height: '15%',
    maxWidth: 40,
    maxHeight: 40
  },
  stickerPack: {
    display: 'flex',
    marginLeft: '0px',
    marginRight: '10px'
  },
  awardRow: {
    display: 'flex'
  },
  awardColumn: {
    display: 'inline-block'
  },
  awardAvatar: {
    maxWidth: 40,
    maxHeight: 40
  },
  award: {
    width: 40,
    textAlign: 'center'
  }
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

  function renderWallofFame(){
    if (student && student.stickerWall) {
      return ( <div className={classes.root}>
          <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
            {student.stickerWall.map((s) => (
              <GridListTile key={s.split('/')[1]}>
                <div className={classes.award}>
                  <Avatar key={s.split('/')[1]} src={getImgByTitle(s.split('/')[1])} className={classes.awardAvatar} />
                  <Typography className={classes.content} color="primary" gutterBottom>{s.split('/')[0]}</Typography>
                </div>
              </GridListTile>
            ))}
          </GridList>
        </div>)
    } else {
      return ""
    }
  }

  function renderAwards(){
    if (student && student.teacherStickers) {
      return ( <div className={classes.root}>
          <GridList cellHeight={'auto'} className={classes.gridList} cols={4}>
            {student.teacherStickers.map((s) => (
              <GridListTile key={s.split('/')[1]}>
                <div className={classes.award}>
                  <Avatar key={s.split('/')[1]} src={getImgByTitle(s.split('/')[1])} className={classes.awardAvatar} />
                  <Typography className={classes.content} color="primary" gutterBottom>{s.split('/')[0]}</Typography>
                </div>
              </GridListTile>
            ))}
          </GridList>
        </div>)
    } else {
      return ""
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
          <a style={{ color: wagner.coral }} href="https://www.wagnersmusic.com/playalong-songs">
          <Typography className={classes.title} color="secondary" gutterBottom>Play Along Songs</Typography></a>
        </Grid>
        <Grid item xs={5}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Sticker Pack: </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.stickerPack}>
              {getStickers(student? student.stickerPack : "Music1").map((tile) => (
                  <Avatar key={tile.title} src={tile.img} className={classes.packAvatar} />          
              ))}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>Recent Achievements: </Typography>
        </Grid>
        <Grid item xs={12}>
          {renderAwards()}
        </Grid>
      </Grid>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="Sticker Hall of Fame"
          id="panel1a-header"
        >
          <Typography className={classes.title} color="textSecondary" gutterBottom style={{marginLeft: -8}}>Past Achievements:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderWallofFame()}
        </AccordionDetails>
      </Accordion>

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
