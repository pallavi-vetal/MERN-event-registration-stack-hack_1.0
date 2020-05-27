import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import HomeNavBar from '../Navigation/VerticalNav';
import Pallavi from '../../assets/images/profile1.png'
import Grid from '@material-ui/core/Grid';
import Omkar from '../../assets/images/omkar.jpg';
import { IconButton } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Copyright } from './Footer';
const useStyles = makeStyles((theme) => ({


  inline: {
    display: 'inline',
  },
  root: {
    marginLeft: theme.spacing(48),
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '90vh',
  
  },
  
  avatar: {
    height: "46vh",
    width: "45vh"
  }
}));

export default function About() {
  const classes = useStyles();

  return (
    <div>
      <HomeNavBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.appBarSpacer} />
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} lg={6}>
          <List className={classes.root}>
      <Avatar alt="Travis Howard" className={classes.avatar} variant="rounded" src={Pallavi} />
        <br></br>
          <ListItem>
            <ListItemText style={{width:"42vh"}}
              primary="Pallavi Vetal"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Software Engineer at UBS
              </Typography>
                  {" — Graduated from Pune Institute Of Computer Technology"}
                </React.Fragment>
              }
            />
          </ListItem>
          
      <IconButton>
      <Link href="https://www.linkedin.com/in/pallavi-vetal-21031996/" variant="body2">
      <LinkedInIcon />
        </Link>
      </IconButton>
         </List>
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
         <List > 
         <Avatar alt="Travis Howard" className={classes.avatar} variant="rounded" src={Omkar} />
        <br></br>
          <ListItem>
            <ListItemText 
              primary="Omkar Langhe"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                   Software Engineer at Elliot Systems
              </Typography>
                  {" — Graduated from Sinhgad Institute of Technology and Science"}
                </React.Fragment>
              }
            />
          </ListItem>
          <IconButton>
      <Link href="https://www.linkedin.com/in/omkar-langhe-787bb5134/" variant="body2">
      <LinkedInIcon />
        </Link>
      </IconButton>
        </List>
        </Grid>
        </Grid>
        <Copyright />
      </main>
    
    </div>


  );
}
