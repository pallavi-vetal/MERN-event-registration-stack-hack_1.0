/*
 * Admin Home Page
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../_actions/usersActions";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from './Dashboard/Dashboard'

const styles = theme => ({
  snack: {
    width: "50%",
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
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div >
        <br></br>
        <Dashboard onClick={this.onLogoutClick} />
      
      </div>
    );
  }
}
Home.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  events: state.eventType
});
export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Home));
