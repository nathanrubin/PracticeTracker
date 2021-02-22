import React, { useRef, useState } from "react"
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import wagnerLogo from "../resources/icons/icon-512x512.png";

import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        www.wagnersmusic.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(2, 0, 0),
    borderRadius: 50,
    minWidth: 200
  },
  Media: {
    height: '100%',
    width: '100%'
  },
}));

export default function SignIn() {
  const classes = useStyles();
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      console.log("login... await - " + emailRef.current.value)
      await login(emailRef.current.value, passwordRef.current.value)
      console.log("login... finished")

      history.push('/')

      console.log("login... history push")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
    console.log("login... loading finished")
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={wagnerLogo} className={classes.Media}/>
        <Typography variant="body2" color="textSecondary" align="center">
          Sign in to continue
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            href="/signup"
          >
            Create New Account
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.button}
            href="/signin"
          >
            Sign In
          </Button>
          
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}