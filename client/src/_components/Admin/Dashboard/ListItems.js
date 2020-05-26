import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
const HomeLink = props => <Link href="/home" to={{pathname:`/home`}} {...props} />;
const RegistrationsLink = props => <Link href="/registrations" to={{pathname:`/registrations`}} {...props} />;
export const mainListItems = (
  <div>
    <ListItem button component={HomeLink}>
      <ListItemIcon>
        <DashboardIcon >
        </DashboardIcon>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={RegistrationsLink}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Registrations" />
    </ListItem>
   
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Want to go?</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
    
  </div>
);