import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../_actions/usersActions";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from './Dashboard/Dashboard'
import {fetchEventCount} from '../../_actions/eventsActions';
const styles = theme => ({
  snack: {
    width:"50%",
    backgroundColor: theme.palette.error.dark,
    margin: theme.spacing(2),
  },
  message: {
    display: "flex",
    alignItems: "center",
    size: "small"
  }
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.fetchEventCount();
    
   
   
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };
  
  render() {
    
    console.log(this.state.userLocation);
    return (
      <div >
       
        <br></br>
        <Dashboard onClick={this.onLogoutClick}/>  
     
      </div>
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  fetchEventCount:PropTypes.func.isRequired,
  events:PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  events: state.eventCount
});
export default connect(mapStateToProps, { logoutUser,fetchEventCount })(withStyles(styles)(Home));
