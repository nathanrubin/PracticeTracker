import React from 'react';
import { useUser } from "../../contexts/UserContext"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { wagner } from '../../theme';
import moment from "moment";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  header: {
    padding: 0
  },
  list: {
    paddingLeft: 10,
    paddingRight: 10
  },
  listIcon: {
    minWidth: 45
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  }
}));

export default function Assignments({first, assignments}) {
  const { addToday, removeToday, isWeekdayComplete } = useUser()

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      console.log("setting isComplete to false")
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    // if all our checked, add day as complete
    if (newChecked.length === assignments.length) {
      console.log("all assignments checked.")
      addToday()
    } else {
      removeToday()
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header}
        avatar={
          <Avatar variant="rounded" className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>
        }
        title={`${first}'s Assignments`}
        subheader={moment().format("dddd, MMMM DD")}
      />
        <List className={classes.root} dense={true} disablePadding={true}>
        <Grid container spacing={0}>
          {assignments.map((value, id) => {
            const labelId = `checkbox-list-label-${value}`;
            const checkId = `${first}-${id}`;

            return (
              <Grid item xs={12} sm={6} key={checkId}>
              <ListItem dense={true} key={checkId} role={undefined} className={classes.list} button onClick={handleToggle(checkId)}>
                <ListItemIcon className={classes.listIcon}>
                  <Checkbox 
                    edge="start"
                    checked={checked.indexOf(checkId) !== -1 || isWeekdayComplete()}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} secondary={`${value}`} style={{ color: (checked.indexOf(checkId) !== -1 || isWeekdayComplete()) ? wagner.coral : 'inherit', textDecoration : (checked.indexOf(checkId) !== -1 || isWeekdayComplete()) ? 'line-through' : 'none' }} />
              </ListItem>
              </Grid>
            );
          })}
          </Grid>
        </List>
      </Card>
  );
}