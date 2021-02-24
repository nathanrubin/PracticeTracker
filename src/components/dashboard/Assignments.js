import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Assignment from '@material-ui/icons/Assignment'
import CardActionArea from '@material-ui/core/CardActionArea'
import { DataGrid } from '@material-ui/data-grid';


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
      <Grid item xs>
        <DataGrid rows={rows} columns={columns} rowHeight={28} hideFooter autoHeight checkboxSelection density disableColumnSelector={false}/>
      </Grid>
    </React.Fragment>
  );
}