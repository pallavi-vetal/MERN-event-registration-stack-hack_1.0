/*
 * Component is responsible for rendering count of registrations and tickets.
 * Data used : Total number of tickets sold and number of registrations made till date.
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEventCount } from "../../../_actions/eventsActions";
import { Link } from "react-router-dom";
const useStyles = theme => ({
    depositContext: {
        flex: 1,
    },
});
class RegistrationsCount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
        this.props.fetchEventCount();
        this.setState({ events: this.props.events })
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Title>Registration Count</Title>
                <Typography component="p" variant="h4">
                    {this.props.events.eventCount.totalRegistrations}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext}>
                    Number of tickets sold  {this.props.events.eventCount.totalTickets}
                </Typography>
                <div>
        <Link color="primary"href="/registrations" to={{pathname:`/registrations`}}  >
          View all registrations
        </Link>
      </div>
            </React.Fragment>
        );
    }
}
RegistrationsCount.propTypes = {
    auth: PropTypes.object.isRequired,
    fetchEventCount: PropTypes.func.isRequired,
    events: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});
export default connect(mapStateToProps, { fetchEventCount })(withStyles(useStyles)(RegistrationsCount));