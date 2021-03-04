import React from 'react';
import { useUser } from "../../contexts/UserContext"
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';

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
    padding: theme.spacing(1, 0)
  },
  cell: {
    width: '6rem',
    padding: theme.spacing(2, 0, 1, 0)
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
  }, 
  chip: {
    padding: 0,
    height: 16,
    color: wagner.coral,
    backgroundColor: theme.palette.background.paper,
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 5,
    top: 53,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: theme.palette.background.paper,
    color: wagner.coral
  },
}))(Badge);

export default function Weekly() {
  const classes = useStyles();
  const { students, selectedStudent, assignments, addToday, removeToday, isWeekdayComplete, isDayInPast, isClassDay, today, getClassTime } = useUser()
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

  function renderClassDay() {
    return <Chip color='secondary' size="small" icon={<StarIcon />} label={getClassTime()} className={classes.chip} />
  }

  function renderDayOfWeek(dayName, dayIndex) {
    return ( dayIndex === (moment().isoWeekday() % 7) ? 
      <div className={classes.root}>
        <Avatar className={classes.avatar}>
          <StyledBadge badgeContent={renderClassDay()} invisible={!isClassDay(dayIndex)}>
            {dayName}
          </StyledBadge>
        </Avatar> 
      </div>:
      <Typography component={'div'} color={isDayInPast(dayIndex) ? "secondary" : "inherit"}>
        <StyledBadge badgeContent={renderClassDay()} invisible={!isClassDay(dayIndex)}>
         {dayName}
        </StyledBadge>
      </Typography>
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