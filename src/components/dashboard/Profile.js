import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

export const Profile = ({ student }) => (
  <div>
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
  </div>
);

