import React, {useState} from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Dashboard from "./dashboard/Dashboard"
import LogIn from "./LogIn"
import Landing from "./Landing"
import ForgotPassword from "./ForgotPassword"
import SignUp from "./SignUp"
import { ThemeProvider } from '@material-ui/core'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { normal, dark } from '../theme';

function App() {
  const { currentUser } = useAuth()
  const [theme, setTheme] = useState(true)
  const appliedTheme = createMuiTheme(theme ? normal : dark )

  const authRoutes = () => (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Redirect from="/**" to="/" />
    </Switch>
  );
  const routes = () => (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
        {currentUser? authRoutes():routes()}
      </Router>
    </ThemeProvider>
  )
}

export default App