import React, {useState} from "react"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
//import Dashboard from "./Dashboard"
import List from "./List"
import SignIn from "./SignIn"
import Home from "./Home"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Signup from "./Signup"
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import { normal, dark } from '../theme';


function App() {
  const [theme, setTheme] = useState(true)
  const appliedTheme = createMuiTheme(theme ? normal : dark )

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={List} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/home" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={SignIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
    </ThemeProvider>
  )
}

export default App