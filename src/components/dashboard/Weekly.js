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

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  table: {
    margin: theme.spacing(10, 0),
  },
}));

export default function Week() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Weekly Practice</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>SU</TableCell>
            <TableCell>M</TableCell>
            <TableCell>T</TableCell>
            <TableCell>W</TableCell>
            <TableCell>TH</TableCell>
            <TableCell>F</TableCell>
            <TableCell>S</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.su}</TableCell>
              <TableCell>{row.m}</TableCell>
              <TableCell>{row.t}</TableCell>
              <TableCell>{row.w}</TableCell>
              <TableCell>{row.th}</TableCell>
              <TableCell>{row.f}</TableCell>
              <TableCell>{row.s}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}