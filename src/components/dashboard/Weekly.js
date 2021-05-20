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

import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import {getStickers, getImgByTitle, availablePacks} from '../../stickers';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DialogTitle, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: "center",
  },
  rootAssignments: {
    backgroundColor: theme.palette.background.paper
  },
  floatRight: {
    float: 'right'
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
  row: {
    height: 70
  },
  headerAssignments: {
    padding: 0
  },
  assignmentTitle: {
    textTransform: 'uppercase',
    fontWeight: 500
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
    fontSize: '12px',
    color: wagner.coral,
    backgroundColor: theme.palette.background.paper,
  },
  '@global': {
    '.MuiChip-labelSmall': {
      paddingLeft: '5px',
      paddingRight: '5px'
    }
  },
  stickerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stickerPackSelect: {
    display: 'flex',
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  gridList: {
    width: 350,
  },
  avatarSticker: {
    maxWidth: 40,
    maxHeight: 40,
    width: 'auto',
    height: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
  },
  packDialog: {
    padding: theme.spacing(0, 1),
    [theme.breakpoints.down(480)]: {
      margin: -32,
    },
  },
  packDialogContent: {
    padding: theme.spacing(0, 2)
  },
  packAvatar: {
    width: '14%',
    height: '14%',
    maxWidth: 40,
    maxHeight: 40
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

const StyledAvatarBadge = withStyles((theme) => ({
  badge: {
    right: 19,
    top: 60,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: theme.palette.background.paper,
    color: wagner.coral
  },
}))(Badge);

export default function Weekly() {
  const classes = useStyles();
  const { students, selectedStudent, assignments, addSticker, removeSticker, isDayInPast, isClassDay, today, getClassTime, saveStickerPack } = useUser()
  const student = students[selectedStudent]? students[selectedStudent] : {first: "student"};

  const [checked, setChecked] = React.useState(setInitialChecked());

  function setInitialChecked() {
    var array = []
    students.map(st => {
      if (st.myStickers[today()]) {
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
      removeSticker(today());
    }

    setChecked(newChecked);

    // if all our checked, add day as complete
    if (newChecked.filter(name => name.includes(student.first)).length === assignments.length) {
      handleOpen(today())
    } 
  };

  function renderClassDay() {
    return <Chip color='secondary' size="small" icon={<StarIcon />} label={getClassTime()} className={classes.chip} />
  }

  function renderDayOfWeek(dayName, dayIndex) {
    return ( dayIndex === (moment().isoWeekday() % 7) ? 
      <div className={classes.root}>
        <StyledAvatarBadge badgeContent={renderClassDay()} invisible={!isClassDay(dayIndex)}>
          <Avatar className={classes.avatar}>
              {dayName}
          </Avatar> 
        </StyledAvatarBadge>
      </div>:
      <Typography component={'div'} color={isDayInPast(dayIndex) ? "secondary" : "inherit"}>
        <StyledBadge badgeContent={renderClassDay()} invisible={!isClassDay(dayIndex)}>
         {dayName}
        </StyledBadge>
      </Typography>
    )
  }

  function renderSticker(day) {
    const stickerName = students[selectedStudent]? students[selectedStudent].myStickers[day] : "";
    const img = getImgByTitle(stickerName);
    var stickerEl = "";
    if (isDayInPast(day) && img === undefined) {
      stickerEl = <IconButton style={{padding:8}} onClick={() => handleOpen(day)}><ClearIcon color='secondary' className={classes.avatarSticker} /></IconButton>
    } else if ((isDayInPast(day) || day === today()) && img !== undefined){
      stickerEl = <IconButton style={{padding:8}} onClick={() => handleOpen(day)}><Avatar src={img} className={classes.avatarSticker}/></IconButton>
    } else {
      stickerEl = ""
    }
    return <div className={classes.stickerContainer}>{stickerEl}</div>
  }

  const [open, setOpen] = React.useState(false);
  const [stickerDay, setStickerDay] = React.useState();

  const handleOpen = (day) => {
    setStickerDay(day);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddSticker = (sticker) => {
      addSticker(sticker, stickerDay)
      setOpen(false);
  }
  const handlRemoveSticker = () => {
    removeSticker(stickerDay);
    if (stickerDay == today()) {
      setChecked([]);
    }
    setOpen(false);
  }

  const [selectedPack, setSelectedPack] = React.useState(getPreviousPack());
  const [openPack, setOpenPack] = React.useState(false);
  const handleStickerPackChange = (event) => {
    setSelectedPack(event.target.value);
  };
  const handleSavePack = () => {
    saveStickerPack(selectedPack);
    setOpenPack(false)
  }
  const handleOpenPack = () => {
    if (students.length && (students[selectedStudent].isNewWeek || students[selectedStudent].isMissingPack)) {
      setOpenPack(true)
      return true
    }
    return false
  }

  function getPreviousPack() {
    const datePack = students.length ? students[selectedStudent].stickerPack : "";
    const pack = datePack.length ? (datePack.includes('/') ? datePack.split('/')[1] : datePack) : "Music1";
    return availablePacks.includes(pack)? pack : 'Music1';
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
              <TableRow className={classes.row}>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <TableCell key={day} align='center' className={classes.cell}>
                    {renderSticker(day)}
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
            title={<div className={classes.assignmentTitle}>{student.first}'s Assignments</div>}
            subheader={<div className={classes.assignmentTitle} style={{ color: wagner.coral }} >{moment().format("dddd, MMMM DD")}</div>}
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

      <Dialog onClose={handleClose} aria-labelledby="sticker-select" open={open}>
        <DialogContent>
          <DialogContentText onClose={handleClose}>
            Pick a sticker:
          </DialogContentText>
            {getStickers(students.length && students[selectedStudent].stickerPack).map((tile) => (
                <IconButton aria-label={`${tile.title}`} onClick={() => handleAddSticker(tile.title)} key={tile.img} style={{padding: '5px'}}>
                    <Avatar src={tile.img} />
                </IconButton>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlRemoveSticker()} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog aria-labelledby="sticker-pack-diaglog" open={openPack || handleOpenPack()} className={classes.packDialog}>
        <DialogTitle>Pick new stickers:<Button onClick={() => handleSavePack()} color="primary" className={classes.floatRight}>Save</Button></DialogTitle>
        <DialogContent className={classes.packDialogContent}>
          <FormControl className={classes.formControl}>
            <Select
              id="sticker-pack-open-select"
              value={selectedPack}
              autoWidth={true}
              onChange={handleStickerPackChange}
            >
            {availablePacks.map((pack) => (
              <MenuItem value={pack} key={pack} style={{paddingLeft: 0, paddingRight: 0}} >
                <div className={classes.stickerPackSelect}>
                  {getStickers(pack).map((tile) => (
                      <Avatar key={tile.title} src={tile.img} className={classes.packAvatar} />          
                  ))}
                </div>
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>

    </Grid>
  );
}