import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const useStyles = theme => ({
    depositContext: {
        flex: 1,
    },
});
class RegistrationsCount extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Title>Registration Count</Title>
                <Typography component="p" variant="h4">
                    3,024.00
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                    Number of tickets sold : 222
                </Typography>
                <div>
                    <Link color="primary" href="#" >
                        View Registrations
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}
RegistrationsCount.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    fetchEvents:PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
  });
  export default connect(mapStateToProps, { logoutUser,fetchEvents })(withStyles(useStyles)(RegistrationsCount));