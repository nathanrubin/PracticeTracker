import React, { useRef, useState } from "react";
import { Link } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MUILink from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useAuth } from "../contexts/AuthContext";
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a href={'https://www.wagnersmusic.com/'}>www.wagnersmusic.com</a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

export default function ForgotPassword() {
  const classes = useStyles();

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password Reset
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
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
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <MUILink to="/login" color="primary" variant="body2" component={Link}>
                Log In
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