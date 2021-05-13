import React, {useState} from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { UserProvider } from "../contexts/UserContext"
import { AdminProvider } from "../contexts/AdminContext"
import Dashboard from "./dashboard/Dashboard"
import Admin from "./dashboard/Admin"
import Teacher from "./dashboard/Teacher"
import Class from "./dashboard/Class"
import LogIn from "./LogIn"
import Landing from "./Landing"
import ForgotPassword from "./ForgotPassword"
import SignUp from "./SignUp"
import { ThemeProvider } from '@material-ui/core'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { normal, dark } from '../theme';

function App() {
  const { currentUser, isAdmin, isTeacher, isClass } = useAuth()
  const [theme, setTheme] = useState(true)
  const appliedTheme = createMuiTheme(theme ? normal : dark )

  const authAdminRoutes = () => (
    <AdminProvider>
      <Switch>
        <Route exact path="/" component={isClass? Class : isTeacher? Teacher : Admin} />
        <Redirect from="/**" to="/" />
      </Switch>
    </AdminProvider>
  );

  const authRoutes = () => (
    <UserProvider>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Redirect from="/**" to="/" />
      </Switch>
    </UserProvider>
  );
  const routes = () => (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Redirect from="/**" to="/" />
    </Switch>
  );

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Router>
        {isAdmin || isTeacher ? authAdminRoutes() : currentUser && currentUser.emailVerified ? authRoutes() : routes()}
      </Router>
    </ThemeProvider>
  )
}

export default App;