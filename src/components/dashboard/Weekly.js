import React from 'react';
import { useUser } from "../../contexts/UserContext"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarIcon from '@material-ui/icons/Star';
import ClearIcon from '@material-ui/icons/Clear';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { wagner } from '../../theme';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
  },
  rootAssignments: {
    backgroundColor: theme.palette.background.paper
  },
  table: {
    padding: theme.spacing(2, 0)
  },
  header: {
    width: '6rem',
    padding: 6
  },
  cell: {
    border: 0,
    width: '6rem',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 10
  },
  headerAssignments: {
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
    backgroundColor: wagner.blue,
  },
  myClass: {
    height: theme.spacing(2)
  }
}));

export default function Weekly() {
  const classes = useStyles();
  const { students, selectedStudent, assignments, addToday, removeToday, isWeekdayComplete, isDayInPast, isClassDay, today } = useUser()
  const student = students[selectedStudent];

  const [checked, setChecked] = React.useState(getInitialChecked());

  function getInitialChecked() {
    var array = []
    students.map(st => {
      if (st.weekdaysComplete.includes(today())) {
        assignments.map((value, id) => {
          const checkId = `${st.first}-${id}`;
          array.push(checkId)
        })
      }
    })
    return array
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      removeToday()
    }

    setChecked(newChecked);

    // if all our checked, add day as complete
    if (newChecked.filter(name => name.includes(student.first)).length === assignments.length) {
      addToday()
    } 
  };

  function renderDayOfWeek(dayName, dayIndex) {
    return ( dayIndex === (moment().isoWeekday() % 7) ? 
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          {dayName}
        </Avatar> 
      </div>:
      <Typography color={isDayInPast(dayIndex) ? "secondary" : "inherit"}>{dayName}</Typography>
    )
  }

  return (
    <Grid container spacing={1}>

      {/* Weekly */}
      <Grid item xs={12}>
        <Card className={classes.root}>
          <Table className={classes.row}>
            <TableHead>
              <TableRow>
                {['SU', 'M', 'T', 'W', 'TH', 'F', 'S'].map((day, id) => (
                  <TableCell key={day} align='center' className={classes.header}>{renderDayOfWeek(day, id)}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <TableCell key={day} align='center' className={classes.cell}>
                    {isClassDay(day) ? 
                      <Box className={classes.myClass}>
                        <Typography color='secondary' variant='caption'><StarIcon color='secondary' style={{ fontSize: 13 }}/>{students[selectedStudent].class}</Typography>
                      </Box> : <Box className={classes.myClass}></Box>}
                      {isWeekdayComplete(day) && (isDayInPast(day) || day === today()) ? 
                        <TrophyIcon style={{ color: wagner.green }} fontSize="large" /> : isDayInPast(day) ? <ClearIcon color='secondary' fontSize="large"/> : ""}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </Grid>

      {/* Assignments */}
      <Grid item xs={12}>
        <Card className={classes.rootAssignments}>
          <CardHeader className={classes.headerAssignments}
            avatar={
              <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: wagner.coral }}>
                <AssignmentIcon />
              </Avatar>
            }
            title={<div>{student.first}'s Assignments</div>}
            subheader={<div style={{ color: wagner.coral }} >{moment().format("dddd, MMMM DD")}</div>}
          />
            <List className={classes.root} dense={true} disablePadding={true}>
            <Grid container spacing={0}>
              {assignments.map((value, id) => {
                const labelId = `checkbox-list-label-${value}`;
                const checkId = `${student.first}-${id}`;

                return (
                  <Grid item xs={12} sm={6} key={checkId}>
                  <ListItem dense={true} key={checkId} role={undefined} className={classes.list} button onClick={handleToggle(checkId)}>
                    <ListItemIcon className={classes.listIcon}>
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
                  </Grid>
                );
              })}
              </Grid>
            </List>
          </Card>
      </Grid>
      
    </Grid>
  );
}