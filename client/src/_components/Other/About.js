import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Omkar from '../../assets/images/omkar.jpg'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Navbar from '../Navigation/Navbar';
import Pallavi from '../../assets/images/profile1.png';
import { Container, CssBaseline, IconButton, Tooltip, Badge } from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import Chip from '@material-ui/core/Chip';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CodeIcon from '@material-ui/icons/Code';
import { Copyright } from './Footer';
const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 250,
  },
  paper: {
    marginTop: "10%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  labels:{
    padding:1
  },
  appBarSpacer: theme.mixins.toolbar
}));

function MyCard(props) {
  const classes = useStyles();
  const { post } = props;
 
  let image;
  if(post.id==="2"){
  image= <CardMedia className={classes.cardMedia} image={Pallavi} title={post.imageTitle} />
  }
  else{
    image= <CardMedia className={classes.cardMedia} image={Omkar} title={post.imageTitle} />
  }
  return (
    <div >
    <div className={classes.appBarSpacer} />
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
        <Hidden xsDown>
           {image}
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
               {post.work}
              </Typography>
             
              <Typography variant="subtitle1" color="textSecondary">
              <SchoolIcon/> &nbsp;Graduated from {post.graduation}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <CodeIcon />&nbsp; Contributed as {post.contribution} 
                </Typography>
              <Typography variant="subtitle1" color="textSecondary">
              <span>
              {post.interests.map((row=>{
                return (
                  <div className={classes.labels}>
                  &nbsp;<Chip variant="outlined" color="secondary" size="small" label={row.label} />&nbsp;
                  </div >
                )
               
              }))}
                </span>
              
              </Typography>
             
              <IconButton aria-label="linkedin" color="primary"  href={post.linkedinURL}>
                  <Tooltip title="LinkedIn" aria-label="">
                      <Badge  color="primary">
                          <LinkedInIcon /> 
                      </Badge>
                  </Tooltip>
              </IconButton> 
              <IconButton aria-label="youtube" color="secondary"  href={post.youtubeURL}>
                  <Tooltip title="Youtube" aria-label="">
                      <Badge  color="primary">
                          <YouTubeIcon /> 
                      </Badge>
                  </Tooltip>
              </IconButton>  
            </CardContent>
          </div>
          
        </Card>
      </CardActionArea>
    
    </div>
  );
}

MyCard.propTypes = {
  post: PropTypes.object,
};
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Container component="main" maxWidth="lg">
        <Navbar />
        <CssBaseline />
       
        <MyCard post={
          {
            "id":"1",
            "title":"Omkar Langhe",
            "work":"Software Engineer at Elliot Systems",
            "graduation":"Sinhgad Institute of Technology and Science",
            "description":"description",
            "image":{Pallavi},
            "imageTitle":"profile1.png",
            "interests":[
              {"label":"Angular"},
              { "label":"NodeJS - Express framework"},
              { "label":"Databases - MongoDB, MSSQL"}
            ],
            "contribution":"Backend Developer",
            "linkedinURL":"https://www.linkedin.com/in/omkar-langhe-787bb5134/",
            "youtubeURL":""
          }}/>
          <MyCard post={
          {
            "id":"2",
            "title":"Pallavi Vetal",
            "work":"Software Engineer at UBS",
            "graduation":"Pune Institute of Computer Technology",
            "description":"description",
            "image":{Pallavi},
            "imageTitle":"Pallavi Vetal",
            "interests":[
              {"label":"ReactJS"},
              { "label":"NodeJS - Express framework"},
              { "label":"Databases - MongoDB, Hive, CosmosDB"}
            ],
            "contribution":"FrontEnd Developer",
            "linkedinURL":"https://www.linkedin.com/in/pallavi-vetal-21031996/",
            "youtubeURL":"https://www.youtube.com/channel/UCQ8FP3Ta9MnnlHhdwt91J_g/videos?view_as=subscriber"
          }}/>
          <Copyright/>
      </Container>
     );
  }
}
 
export default About;

/*
 * Provides details about developers

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NavBar from '../Navigation/Navbar';
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
    marginLeft: theme.spacing(40),
    backgroundColor: theme.palette.background.paper,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '90vh',

  },
  list: {
    backgroundColor: theme.palette.background.paper,
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
     <NavBar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.appBarSpacer} />
        <Grid container spacing={1}>
          <Grid item xs={12} md={4} lg={6}>
            <List className={classes.root}>
              <Avatar alt="Travis Howard" className={classes.avatar} variant="rounded" src={Pallavi} />
              <br></br>
              <ListItem>
                <ListItemText style={{ width: "42vh" }}
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
          <Grid item xs={12} md={4} lg={3}>
            <List className={classes.list}>
              <Avatar alt="Travis Howard" className={classes.avatar} variant="rounded" src={Omkar} />
              <br></br>
              <ListItem>
                <ListItemText style={{ width: "52vh" }}
                  primary="Omkar Langhe"
                  secondary={
                    <React.Fragment >
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
*/