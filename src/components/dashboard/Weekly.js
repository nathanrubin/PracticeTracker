import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';

import Title from './Title';

// Generate Order Data
function createData(id, su, m, t, w, th, f, s) {
  return { id, su, m, t, w, th, f, s };
}

const rows = [
  createData(0, 'X', 'X', 'X', 'X', 'X', 'X', 'X'),
];

function isComplete(day, weekdaysComplete) {
  return weekdaysComplete.includes(day) ? 'Image' : 'X'
}

const useStyles = makeStyles((theme) => ({
  table: {
    padding: theme.spacing(2, 0)
  },
  header: {
    width: '5rem'
  },
  cell: {
    border: 0,
    width: '5rem',
    minWidth: '40px'
  }
}));

export default function Weekly({student}) {
  const classes = useStyles();
  return (
      <Table className={classes.row}>
        <TableHead>
          <TableRow>
            {['SU', 'M', 'T', 'W', 'TH', 'F', 'S'].map((day) => (
              <TableCell key={day} align='center' className={classes.header}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <TableCell key={day} align='center' className={classes.cell}>{isComplete(day, student.weekdaysComplete)}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
  );
}