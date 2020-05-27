import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from "react-router-dom";
const Register = props => <Link href="/register" to={{pathname:`/register`}} {...props} />;
const Login = props => <Link href="/login" to={{pathname:`/login`}} {...props} />;
const About = props => <Link href="/about" to={{pathname:`/about`}} {...props} />;
const Feedback = props => <Link href="/feedback" to={{pathname:`/feedback`}} {...props} />;
const Home = props => <Link href="/" to={{pathname:`/`}} {...props} />;
export const mainListItems = (
  <div>
    <ListItem button component={Home} justify="flex-start">
      <ListItemIcon>
      <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button component={Register} justify="flex-start">
      <ListItemIcon>
      <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Admin Sign Up" />
    </ListItem>
    <ListItem button component={Login}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Admin Sign In" />
    </ListItem>
   
  </div>
);

export const secondaryListItems = (
  <div>
   
    <ListItem button justify="flex-start" component={Feedback}>
      <ListItemIcon>
        <PermContactCalendarIcon />
      </ListItemIcon>
      <ListItemText primary="Feedback" />
    </ListItem>
    <ListItem button justify="flex-start" component={About}>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
    
  </div>
);