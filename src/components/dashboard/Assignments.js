import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Grid } from '@material-ui/core';
import { wagner } from '../../theme';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  headerIcon: {
    paddingLeft: 13
  },
  headerText: {
    paddingLeft: 3
  }
}));

export default function Assignments({first, assignments}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <React.Fragment>
    <List className={classes.root} dense={true}>
      <ListItem className={classes.headerIcon}>
          <ListItemIcon>
              <AssignmentIcon color='primary'/>
          </ListItemIcon>
          <ListItemText className={classes.headerText} primary={`${first}'s Assignments`}/>
      </ListItem>
      {assignments.map((value, id) => {
        const labelId = `checkbox-list-label-${value}`;
        const checkId = `${first}-${id}`;

        return (
          <ListItem dense key={checkId} role={undefined} button onClick={handleToggle(checkId)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(checkId) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} secondary={`${value}`} style={{ color: (checked.indexOf(checkId) !== -1) ? wagner.coral : 'inherit', textDecoration : (checked.indexOf(checkId) !== -1) ? 'line-through' : 'none' }} />
            
          </ListItem>
        );
      })}
    </List>
    </React.Fragment>
  );
}