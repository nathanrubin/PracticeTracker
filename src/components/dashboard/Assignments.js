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


const columns = [
  { field: 'assignment', headerName: 'Assignments', flex: 1 },
];

const rows = [
  { id: 1, assignment: 'Ocean Waves – m.1-12 – 5x' },
  { id: 2, assignment: '(Bingos Dance) 2x' },
  { id: 3, assignment: 'Cossack Ride – Fast! 1x' },
];

function getAssignments() {
    return ["Ocean Waves – m.1-12 – 5x ", "(Bingos Dance) 2x ", "Cossack Ride – Fast! 1x "]
}
const assignments = getAssignments();

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Assignments() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
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
      <ListItem>
          <ListItemIcon>
              <AssignmentIcon color='primary' />
          </ListItemIcon>
          <ListItemText primary={'Assignments'} />
      </ListItem>
      {assignments.map((value, id) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem dense key={id} role={undefined} dense button onClick={handleToggle(id)}>
            <ListItemIcon dense>
              <Checkbox
                edge="start"
                checked={checked.indexOf(id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText dense id={labelId} secondary={`${value}`} style={{ color: (checked.indexOf(id) !== -1) ? wagner.coral : 'inherit', textDecoration : (checked.indexOf(id) !== -1) ? 'line-through' : 'none' }} />
            
          </ListItem>
        );
      })}
    </List>
    </React.Fragment>
  );
}