import React, { Component } from 'react';
import { fade, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import { logoutUser } from "../../_actions/usersActions";
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from "@material-ui/icons/Info";
import { fetchEventCount } from "../../_actions/eventsActions";
import { Link, Tooltip } from '@material-ui/core';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
const Login = props => <Link href="/login" to={{ pathname: `/login` }} {...props} />;
const DashboardLink = props => <Link href="/home" to={{ pathname: `/home` }} {...props} />;
const RegistrationsLink = props => <Link href="/registrations" to={{ pathname: `/registrations` }} {...props} />;
const AdminFeedbackLink = props => <Link href="/adminfeedbacks" to={{ pathname: `/adminfeedbacks` }} {...props} />;
const SignUpLink = props => <Link href="/register" to={{ pathname: `/register` }} {...props} />;
const AboutUsLink = props => <Link href="/about" to={{ pathname: `/about` }} {...props} />;
const HomeLink = props => <Link href="/" to={{ pathname: `/` }} {...props} />;
const FeedbackLink = props => <Link href="/feedback" to={{ pathname: `/feedback` }} {...props} />;
const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        width: "100%"
    },
    customeAppBar: {
        marginTop: 0,
        minHeight: 40,
    },
    customizeToolbar: {
        minHeight: 50,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: "10%",
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            mobileMoreAnchorEl: null,
            isAuthenticated: false,
            countTotalTick:0,
            countRegistrations:0
        }
    }
    async componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.setState({ isAuthenticated: true })
        }
        else
            this.setState({ isAuthenticated: false })
        await this.props.fetchEventCount();
        this.setState({ 
            countTotalTick:this.props.events.eventCount.totalTickets,
            countRegistrations:this.props.events.eventCount.totalRegistrations
         })    
    }


    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null })
    };

    handleMobileMenuOpen = (event) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleChange = event => {
        this.setState({
            anchorEl: event.target.checked
        });
    };

    handleMenu = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
       // this..push("/");
    };
    render() {
        const { classes } = this.props;
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                {this.props.auth.isAuthenticated && (
                    <div>
                        <MenuItem component={DashboardLink} color="inherit">
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge color="secondary">
                                    <DashboardIcon />
                                </Badge>
                            </IconButton>
                            <p>Dashboard</p>
                        </MenuItem>
                        <MenuItem component={RegistrationsLink} color="inherit">
                            <IconButton aria-label="show registrations" color="inherit">
                                <Badge badgeContent={this.state.countRegistrations} color="secondary">
                                    <PermContactCalendarIcon />
                                </Badge>
                            </IconButton>
                            <p>Registrations</p>
                        </MenuItem>
                        <MenuItem component={AdminFeedbackLink} color="inherit">
                            <IconButton aria-label="show 11 new notifications" color="inherit">
                                <Badge badgeContent={11} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <p>Feedbacks</p>
                        </MenuItem>
                        <MenuItem onClick={this.onLogoutClick}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="primary-search-account-menu"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <ExitToAppIcon />
                            </IconButton>
                            <p>Sign Out</p>
                        </MenuItem>
                    </div>
                )}
                {!this.props.auth.isAuthenticated && (
                    <div>
                        <MenuItem component={HomeLink} color="inherit">
                            <IconButton aria-label="show 11 new notifications" color="inherit" >
                                <Tooltip title="Home Page">
                                    <HomeIcon />
                                </Tooltip>
                            </IconButton>
                            <p>Home</p>
                        </MenuItem>
                        <MenuItem component={Login} color="inherit">
                            <IconButton aria-label="show 11 new notifications" color="inherit" >
                                <Tooltip title="Admin Sign In">
                                    <ExitToAppIcon />
                                </Tooltip>
                            </IconButton>
                            <p>Sign In</p>
                        </MenuItem>
                        <MenuItem component={SignUpLink} color="inherit">
                            <IconButton aria-label="show 11 new notifications" color="inherit" >
                                <Tooltip title="Admin Sign Up">
                                    <PersonAddIcon />
                                </Tooltip>
                            </IconButton>
                            <p>Sign Up</p>
                        </MenuItem>
                        <MenuItem component={FeedbackLink} color="inherit">
                            <IconButton aria-label="show 11 new notifications" color="inherit" >
                                <Tooltip title="Give your valuable feedback">
                                    <PermContactCalendarIcon />
                                </Tooltip>
                            </IconButton>
                            <p>Give Feedback</p>
                        </MenuItem>
                        <MenuItem component={AboutUsLink} color="inherit">
                            <IconButton aria-label="show 11 new notifications" color="inherit" >
                                <Tooltip title="Want to know about us">
                                    <InfoIcon />
                                </Tooltip>
                            </IconButton>
                            <p>About Us</p>
                        </MenuItem>

                    </div>
                )}
           
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar position="fixed" color="secondary" className={classes.customeAppBar}>
                    <Toolbar className={classes.customizeToolbar}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            StackHack 1.0
                        </Typography>
                        <div className={classes.grow} />
                        {this.props.auth.isAuthenticated &&(
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="home" color="inherit" component={HomeLink}>
                                <Tooltip title="Home" aria-label="">
                                    <Badge  color="secondary">
                                        <HomeIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
                            <IconButton aria-label="" color="inherit" component={DashboardLink}>
                                <Tooltip title="Dashboard" aria-label="">
                                    <Badge  color="secondary">
                                        <DashboardIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>   

                            <IconButton aria-label="show 4 new registrations" color="inherit" component={RegistrationsLink}>
                                <Tooltip title="Total Registrations Count...See more" aria-label="show 4 new registrations">
                                    <Badge badgeContent={this.state.countRegistrations} color="secondary">
                                        <PermContactCalendarIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                            <IconButton aria-label="show 17 new feedbacks" color="inherit" component={AdminFeedbackLink}>
                                <Tooltip title="Want to see feedbacks" aria-label="show 17 new feedbacks">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
                            <IconButton aria-label="" color="inherit" onClick={this.onLogoutClick}>
                                <Tooltip title="Want to go?" aria-label="show 4 new registrations">
                                    <Badge  color="secondary">
                                        <ExitToAppIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
                            </div>
                        )}
                         {!this.props.auth.isAuthenticated &&(
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="home" color="inherit" component={HomeLink}>
                                <Tooltip title="Home" aria-label="">
                                    <Badge  color="secondary">
                                        <HomeIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
                            <IconButton aria-label="about us" color="inherit" component={AboutUsLink}>
                                <Tooltip title="Want to know about us?" aria-label="about us">
                                    <Badge  color="secondary">
                                        <InfoIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
                            <IconButton aria-label="feedback" color="inherit" component={FeedbackLink}>
                                <Tooltip title="Want to give your valuable feedback" aria-label="feedback">
                                    <Badge  color="secondary">
                                        <PermContactCalendarIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
                            <IconButton aria-label="SignIn" color="inherit" component={Login}>
                                <Tooltip title="Admin Sign In" aria-label="">
                                    <Badge  color="secondary">
                                        <ExitToAppIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>   

                            <IconButton aria-label="Sign up" color="inherit" component={SignUpLink}>
                                <Tooltip title="Want to sign up? (Admin Sign Up)" aria-label="sign up">
                                    <Badge  color="secondary">
                                        <PersonAddIcon />
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                           
                            </div>
                        )}
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}

            </div>
        );
    }
}

NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    fetchEventCount:PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
});
export default connect(mapStateToProps, { logoutUser,fetchEventCount })(
    withStyles(styles)(NavBar)
);

