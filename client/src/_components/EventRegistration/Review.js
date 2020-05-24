import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import React, { Component } from 'react';
const useStyles = (theme) => ({
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
});
class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { classes } = this.props;
    
    console.log(this.props.state1);
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Registration summary
      </Typography>
        <TableContainer >
          <Table className={classes.table} aria-label="custom pagination table" >
            <TableBody>

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
        <br></br>
     
      </React.Fragment>
    );
  }
}

export default withStyles(useStyles)(Review);


