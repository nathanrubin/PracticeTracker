import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

export const myProfile = (
  <div>
    <ListItem>
      <ListItemText primary="Student:" secondary="Nathan Rubin" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Class:" secondary="Mr. Aaron - Tuesday 3:15p" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Stickers:" secondary="todo" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Achievements:" secondary="todo" />
    </ListItem>
  </div>
);

