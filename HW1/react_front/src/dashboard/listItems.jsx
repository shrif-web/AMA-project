import React from "react";
import { Link } from "react-router-dom";
import HttpsIcon from '@material-ui/icons/Https';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ListSubheader from "@material-ui/core/ListSubheader";

export const goListItems = (
  <div>
    <ListSubheader inset>Go</ListSubheader>
    <ListItem button component={Link} to="/go/sha">
      <ListItemIcon>
        <HttpsIcon/>
      </ListItemIcon>
      <ListItemText primary="SHA-256" />
    </ListItem>
    <ListItem button component={Link} to="/go/write">
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Write" />
    </ListItem>
  </div>
);

export const nodeListItems = (
  <div>
    <ListSubheader inset>NodeJS</ListSubheader>
    <ListItem button component={Link} to="/node/sha">
      <ListItemIcon>
        <HttpsIcon/>
      </ListItemIcon>
      <ListItemText primary="SHA-256" />
    </ListItem>
    <ListItem button component={Link} to="/node/write">
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Write" />
    </ListItem>
  </div>
);
