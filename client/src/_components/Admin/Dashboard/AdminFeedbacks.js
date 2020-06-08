/*
 * Component is responsible for rendering all registrations in table format on admin dashboards.
 * Data used : All registration details
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, fetchFeedbacks } from "../../../_actions/usersActions";
import { Container } from '@material-ui/core';
import Navbar from '../../Navigation/Navbar';
import { Copyright } from '../../Other/Footer';
const useStyles = theme => ({
    depositContext: {
        flex: 1,
    },
    root: {
        display: 'flex',
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 6,
        height: '100vh',
    },
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: "100%",
        marginLeft:"-1%"
    },
    paper: {
        padding: theme.spacing(0),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 350,
    },
});
class AdminFeedbacks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push("/login");
        }
        this.props.fetchFeedbacks();


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
                title: "Name",
                field: "name",
                render: rowData => (
                    rowData['name']
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
                title: "Feedback",
                field: "feedback",
                render: rowData => (
                    rowData["feedback"]
                ),
                cellStyle: {
                    width: 20,
                    minWidth: 20
                  },
                  headerStyle: {
                    width:20,
                    minWidth: 20
                  }    

            },
            {
                title: "Date Submitted",
                field: "date",
                render: rowData => (
                    rowData["date"]
                ),
                cellStyle: {
                    width: 20,
                    maxWidth: 20
                  },
                  headerStyle: {
                    width:20,
                    maxWidth: 20
                  }  
            },
            {
                title: "Email",
                field: "email",
                render: rowData => (
                    rowData['email']
                ),
                cellStyle: {
                    width: 20,
                    minWidth: 20
                  },
                  headerStyle: {
                    width:20,
                    minWidth: 20
                  }  
            },

        ];


        return (
            <div className={classes.root}>
                <Navbar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container} >
                        <React.Fragment>
                            <MaterialTable
                                title="Feedbacks"
                                columns={columns}
                                data={this.props.auth.feedbacks}
                                options={{
                                    sorting: true,
                                    filtering: true,
                                    exportButton: true
                                }}
                                width="100%"
                                
                            />
                        </React.Fragment>
                       <Copyright />
                    </Container>
                </main>
            </div>


        );
    }
}
AdminFeedbacks.propTypes = {
    auth: PropTypes.object.isRequired,
    fetchFeedbacks: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    feedbacks: state.feedbacks
});
export default connect(mapStateToProps, { fetchFeedbacks, logoutUser })(withStyles(useStyles)(AdminFeedbacks));
