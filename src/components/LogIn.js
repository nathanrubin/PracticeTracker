import React, { useRef, useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MUILink from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';

import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  alert: {
    marginTop: theme.spacing(1), 
    width: '100%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: 50,
  },
}));

export default function LogIn() {
  const classes = useStyles();
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const { currentUser, login } = useAuth()
  const [verify, setVerify] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setVerify("")
      setLoading(true)

      await login(emailRef.current.value, passwordRef.current.value)
      if (currentUser && !currentUser.emailVerified) {
        setVerify("Please verify your email.")
      }

    } catch {
      setError("Failed to log in. ")
      setLoading(false)
    } 
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in to Practice Tracker
        </Typography>
        {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
        {verify && <Alert severity="info" className={classes.alert}
          action={<Button color="inherit" size="small" onClick={() => window.location.reload(false)}>done</Button>}>{verify}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            inputRef={emailRef}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={passwordRef}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <MUILink to="/forgot-password" color="primary" textDecoration='inherited' variant="body2" component={Link}>
                Forgot password?
              </MUILink>
            </Grid>
            <Grid item>
              <MUILink to="/signup" color="primary" variant="body2" component={Link}>
                {"Don't have an account? Sign Up"}
              </MUILink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}