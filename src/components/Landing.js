import React, { useRef, useState } from "react"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import wagnerLogo from "/icons/icon-512x512.png";

import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcome: {
    margin: theme.spacing(1, 0, 1)
  },
  button: {
    margin: theme.spacing(2, 0, 0),
    borderRadius: 50,
    width: '100%',
    minWidth: 200,  
    underline: 'none'
  },
  Media: {
    height: '100%',
    width: '100%'
  },
}));

export default function SignIn() {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={wagnerLogo} className={classes.Media}/>
        <Typography variant="body2" color="textSecondary" className={classes.welcome} align="center">
          Log in to continue
        </Typography>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            component={Link} to="/signup"
            className={classes.button}
          >
            Sign up
          </Button>
          
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            component={Link} to="/login"
            className={classes.button}
          >
            Log in
          </Button>
      </div>
    </Container>
  )
}