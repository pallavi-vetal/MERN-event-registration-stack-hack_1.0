/*
 * Component is responsible for rendering preview of registration details.
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { fetchImage } from "../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core';
const styles = (theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  avatar:{
    height:"100%",
    width:"100%"
}
});
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img:''
    }
  }
  async componentDidMount(){
    var base64Flag = 'data:image/jpeg;base64,';
    //var imageStr = this.arrayBufferToBase64(data.img.data.data);
    if(this.props.state1.imageID)
    {
      await this.props.fetchImage(this.props.state1.imageID);
    var imageStr = this.arrayBufferToBase64(this.props.events.eventImage.imageBuffer.data);
    this.setState({img: base64Flag + imageStr});
    }
    
  }
  arrayBufferToBase64 = (buffer) =>{
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};  
  render() {
    const { classes } = this.props;
    
    console.log(this.props.state1);
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Registration summary
      </Typography>
      <Grid container spacing={2} xs={12} md={12} lg={12} >     
        <TableContainer >
          <Table className={classes.table} aria-label="custom pagination table" >
            <TableBody >
              <TableRow>
              <TableCell component="th" scope="row">
              <Avatar alt="Identification document" variant="rounded" src={this.state.img} className={classes.avatar} />
              </TableCell>
              </TableRow>
              <TableRow key={this.props.state1.fullName}>
                <TableCell component="th" scope="row">
                  <b>Name</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {this.props.state1.fullName}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.state1.mobile}>
                <TableCell component="th" scope="row">
                  <b>Mobile No</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {this.props.state1.mobile}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.state1.email}>
                <TableCell component="th" scope="row">
                  <b>Email ID</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {this.props.state1.email}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.state1.email}>
                <TableCell component="th" scope="row">
                  <b>Registration Type</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {this.props.state1.registrationType}
                </TableCell>
              </TableRow>
              <TableRow key={this.props.state1.email}>
                <TableCell component="th" scope="row">
                  <b>Number of Tickets</b>
                </TableCell>
                <TableCell component="th" scope="row">
                  {this.props.state1.numberOfTickets}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        <br></br>
     
      </React.Fragment>
    );
  }
}

Review.propTypes = {
  auth: PropTypes.object.isRequired,
  events : PropTypes.object.isRequired,
  fetchImage : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  events : state.events
}); 
export default connect(mapStateToProps,{fetchImage})(
  withStyles(styles)(Review)
);



