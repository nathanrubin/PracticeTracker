import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Assignment from '@material-ui/icons/Assignment'
import CardActionArea from '@material-ui/core/CardActionArea'

function getAssignments() {
    return ["Ocean Waves – m.1-12 – 5x ", "(Bingos Dance) 2x ", "Cossack Ride – Fast! 1x "]
}
const assignments = getAssignments();

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Assignments() {
  const classes = useStyles();
  return (
    <React.Fragment>
        {assignments.map( (assignment, i)  => 
            <Grid key={i} item xs>
                <CardActionArea component="a" href="#">
                    <Paper button key={i} color="primary" className={classes.paper}>
                        <Assignment color="primary"  />
                        <Typography kkey={i} color="textSecondary">
                            {assignment}
                        </Typography>
                    </Paper>
                </CardActionArea>
            </Grid>
        )}
    </React.Fragment>
  );
}