/*
 * Component is responsible for rendering all registrations in table format on admin dashboards.
 * Data used : All registration details
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { fetchEvents } from "../../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { logoutUser } from "../../../_actions/usersActions";
import { Copyright } from '../../Other/Footer';
import Navbar from '../../Navigation/Navbar';
import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Paper } from '@material-ui/core';
const drawerWidth = 240;
const useStyles = theme => ({
  depositContext: {
    flex: 1,
  },
  root: {
    display: 'flex',
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 6,
    height: '120vh',

  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginLeft:"-4%"
  },
});
class RegistrationsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.fetchEvents();
    

  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  render() {
    const { classes } = this.props;
    const columns = [
      {
        title: "Registration ID",
        field: "_id",
        render: rowData => (
          <Link href="/registration" to={{ pathname: `/registration/${rowData["_id"]}` }} trim="trim">
            <span><TouchAppIcon /></span>
          </Link>

        ),
        cellStyle: {
          width: 5,
          maxWidth: 5
        },
        headerStyle: {
          width:5,
          maxWidth: 5
        }   
      },
      {
        title: "Full Name",
        field: "fullName",
        render: rowData => (
          rowData['fullName']
        ),
        cellStyle: {
          width: 5,
          maxWidth: 5
        },
        headerStyle: {
          width:5,
          maxWidth: 5
        }   

      },
      {
        title: "Registration Type",
        field: "registrationType",
        render: rowData => (
          rowData["registrationType"]
        ),
        cellStyle: {
          width: 5,
          maxWidth: 5
        },
        headerStyle: {
          width:5,
          maxWidth: 5
        }   

      },
      {
        title: "Date Registered",
        field: "date",
        render: rowData => (
          rowData['date']
        ),
        cellStyle: {
          width: 5,
          maxWidth: 5
        },
        headerStyle: {
          width:5,
          maxWidth: 5
        }   

      },

    ];
    return (
      <div className={classes.root}>
        <Navbar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Paper maxWidth="lg" className={classes.container} >
            <React.Fragment>
              <MaterialTable
                title="Registration List"
                columns={columns}
                data={this.props.events.events}
                options={{
                  sorting: true,
                  filtering: true,
                  exportButton:true
                }}
                detailPanel={[
                  {
                    tooltip: 'Show Registration Details',
                    render: rowData => {
                      return (
                        <TableContainer >
                    <Table className={classes.table} aria-label="custom pagination table"  >
                      <TableBody>
                        <TableRow>
                          <TableCell component="th">
                            <Typography variant="h6" gutterBottom>
                              Registration ID : <small>{rowData._id}</small>
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow key={this.props.events.eventID.fullName}>
                          <TableCell component="th" scope="row">
                            <b>Name</b>
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {rowData.fullName}
                          </TableCell>
                        </TableRow>
                        <TableRow key={rowData.mobile}>
                          <TableCell component="th" scope="row">
                            <b>Mobile No</b>
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {rowData.mobile}
                          </TableCell>
                        </TableRow>
                        <TableRow key={rowData.email}>
                          <TableCell component="th" scope="row">
                            <b>Email ID</b>
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {rowData.email}
                          </TableCell>
                        </TableRow>
                        <TableRow key={rowData.registrationType}>
                          <TableCell component="th" scope="row">
                            <b>Registration Type</b>
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {rowData.registrationType}
                          </TableCell>
                        </TableRow>
                        <TableRow key={rowData.numberOfTickets}>
                          <TableCell component="th" scope="row">
                            <b>Number of Tickets</b>
                          </TableCell>
                          <TableCell component="td" scope="row">
                            {rowData.numberOfTickets}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  
                  </TableContainer>
                      )
                      
                    },
                    cellStyle: {
                      width: 1,
                      maxWidth: 1
                    },
                    headerStyle: {
                      width:1,
                      maxWidth: 1
                    }   
                  },
                  
                ]}
              />
            </React.Fragment>
          
          </Paper>
          <Copyright />
        </main>
      </div>

    );
  }
}
RegistrationsTable.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});
export default connect(mapStateToProps, { fetchEvents, logoutUser })(withStyles(useStyles)(RegistrationsTable));
