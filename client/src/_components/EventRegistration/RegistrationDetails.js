import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import HomeNavBar from '../Navigation/HomeNavBar';
import Container from '@material-ui/core/Container';
import { Paper } from '@material-ui/core';
import { fetchEventsByID, fetchImage } from "../../_actions/eventsActions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { logoutUser } from "../../_actions/usersActions";
const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
      title: {
        flexGrow: 1,
      },
      drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        height: '200vh',
        overflow: 'auto',
      },
      container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 420,
      },
      section: {
        height: "100%",
        paddingTop: 5,
        backgroundColor: "#fff"
      },
      avatar:{
          height:"100%",
          width:"100%"
      }
})

class RegistrationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            img:''
         }
    }
    async componentDidMount(){
        const { match: { params } } = this.props;
        if (!this.props.auth.isAuthenticated) {
  
            this.props.history.push("/login");
          }
        var base64Flag = 'data:image/jpeg;base64,';
        //var imageStr = this.arrayBufferToBase64(data.img.data.data);
        await this.props.fetchEventsByID(params.id);
        await this.props.fetchImage(this.props.events.eventID.imageID);
        var imageStr = this.arrayBufferToBase64(this.props.events.eventImage.imageBuffer.data);
        this.setState({img: base64Flag + imageStr});
        
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
      };
    arrayBufferToBase64 = (buffer) =>{
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };  
    render() { 
        const {classes} = this.props;
        return ( 
            <div className={classes.root}>
            <HomeNavBar onClick={this.onLogoutClick}/>
            <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
            <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItem>
                <Avatar alt="Identification document" variant="rounded" src={this.state.img} className={classes.avatar} />
              </ListItem>
             
            </ListItem>
            <ListItem>
           
                    <TableContainer >
          <Table className={classes.table} aria-label="custom pagination table"  >
            <TableBody>
            <TableRow>
                <TableCell component="th">
                <Typography variant="h6" gutterBottom>
              Basic Details
            </Typography>
                </TableCell>
           
            </TableRow>
              <TableRow key={this.props.events.eventID.fullName}>
                <TableCell component="th" scope="row">
                  <b>Name</b>
                </TableCell>
                <TableCell component="td" scope="row">
                  {this.props.events.eventID.fullName}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.events.eventID.mobile}>
                <TableCell component="th" scope="row">
                  <b>Mobile No</b>
                </TableCell>
                <TableCell component="td" scope="row">
                  {this.props.events.eventID.mobile}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.events.eventID.email}>
                <TableCell component="th" scope="row">
                  <b>Email ID</b>
                </TableCell>
                <TableCell component="td" scope="row">
                  {this.props.events.eventID.email}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.events.eventID.registrationType}>
                <TableCell component="th" scope="row">
                  <b>Registration Type</b>
                </TableCell>
                <TableCell component="td" scope="row">
                  {this.props.events.eventID.registrationType}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.events.eventID.numberOfTickets}>
                <TableCell component="th" scope="row">
                  <b>Number of Tickets</b>
                </TableCell>
                <TableCell component="td" scope="row">
                  {this.props.events.eventID.numberOfTickets}
                </TableCell>
              </TableRow>




            </TableBody>

          </Table>
        </TableContainer>
        </ListItem>
            <Divider variant="inset" component="li" />
          
          </List>
          </Paper>
          </Container>
          </main>
          </div>
         
         );
    }
}
RegistrationDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    fetchEventsByID:PropTypes.func.isRequired,
    events : PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    fetchImage : PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    events : state.events
  }); 
  export default connect(mapStateToProps,{fetchEventsByID,logoutUser,fetchImage})(
    withStyles(styles)(RegistrationDetails)
  );
