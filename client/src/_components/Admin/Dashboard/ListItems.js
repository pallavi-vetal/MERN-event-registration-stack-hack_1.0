import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from "react-router-dom";
const HomeLink = props => <Link href="/home" to={{pathname:`/home`}} {...props} />;
const RegistrationsLink = props => <Link href="/registrations" to={{pathname:`/registrations`}} {...props} />;
const EventPageLink = props => <Link href="/" to={{pathname:`/`}} {...props} />;
export const mainListItems = (
  <div>
    <ListItem button component={HomeLink} justify="flex-start">
      <ListItemIcon>
        <DashboardIcon >
        </DashboardIcon>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={RegistrationsLink}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Registrations" />
    </ListItem>
   
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset container justify="flex-start">Register for event?</ListSubheader>
    <ListItem button justify="flex-start" component={EventPageLink}>
      <ListItemIcon>
        <AssignmentIndIcon />
      </ListItemIcon>
      <ListItemText primary="Event Registration" />
    </ListItem>
    
  </div>
);