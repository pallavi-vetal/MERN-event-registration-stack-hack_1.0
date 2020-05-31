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
import { Link } from 'react-router-dom';
import { Typography, Container } from '@material-ui/core';
import Navbar from '../../Navigation/Navbar';
const useStyles = theme => ({
    depositContext: {
        flex: 1,
    },
    root: {
        display: 'flex',
    },
    
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 5,
        height: '100vh',
    },
    container: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(2),
        width:"100%",
    },
    paper: {
        padding: theme.spacing(2),
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

            },
            {
                title: "Email",
                field: "email",
                render: rowData => (
                    rowData['email']
                ),

            },
            {
                title: "Feedback",
                field: "feedback",
                render: rowData => (
                    rowData["feedback"]
                ),

            },
            {
                title: "Date Submitted",
                field: "date",
                render: rowData => (
                    rowData["date"]
                ),

            },
            

        ];
       
        
        let linkText;
        console.log(window.location.pathname)
        if (window.location.pathname === "/adminfeedbacks") {
            
            linkText = <Link color="primary" href="/home" to={{ pathname: `/home` }}  >
                            <Typography variant="h8">Back</Typography>
                        </Link>;
        }
        else {
            
            linkText =  <Link color="primary" href="/adminfeedbacks" to={{ pathname: `/adminfeedbacks` }}  >
                            <Typography variant="h8">View all Feedbacks</Typography>
                        </Link>;
        }
        return (
            <div className={classes.root}>
                <Navbar />
              
                    
                    <Container maxWidth="lg" className={classes.container}>
                        <MaterialTable
                            
                            title="Feedbacks"
                            columns={columns}
                            data={this.props.auth.feedbacks}
                            options={{
                                sorting: true,
                                filtering: true,
                                exportButton:true
                            }}
                           
                        />
                        <div>
                           {linkText}
                         </div>
                 </Container>
              
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
