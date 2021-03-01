import React from 'react';
import { useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToApp from '@material-ui/icons/ExitToApp'
import Divider from '@material-ui/core/Divider'

export function SideBar ({student}) {

  const { logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    try {
      await logout()
      history.push("/")
    } catch {
      console.log("failed to log out")
    }
  }

  return (
    <React.Fragment>
      <List dense>
        <ListItem>
          <ListItemText primary="Student:" secondary={student.first} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Class:" secondary={student.class} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Stickers:" secondary={student.stickerPack} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Achievements:" secondary="todo" />
        </ListItem>
      </List>
      <Divider />
      <List dense>
        <ListItem button variant="link" onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </React.Fragment>
  );
}
