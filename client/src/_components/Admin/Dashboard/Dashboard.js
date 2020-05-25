import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from './Chart';
import RegistrationsCount from './RegistrationsCount';
import RegistrationsTable from './RegistrationsTable';
import Example from './PieChart';
import HomeNavBar from '../../Navigation/HomeNavBar';

const styles = theme => ({
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 320,
  },
  
});
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      open:false,
      anchorEl: null,
      auth: false
     }
  }

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
  
  handleDrawerOpen = () => {
    this.setState({open:true})
  };
  handleDrawerClose = () => {
    this.setState({open:false})
  };
  render() { 
    const { classes } = this.props;
    console.log(localStorage.getItem('user'))
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return ( 
      <div className={classes.root}>
     
      <HomeNavBar onClick={this.props.onClick}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Chart */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Example />
              </Paper>
            </Grid>
            {/* Recent RegistrationsCount */}
            <Grid item xs={12} md={4} lg={2}>
              <Paper className={fixedHeightPaper}>
                <RegistrationsCount />
              </Paper>
            </Grid>
            {/* Recent RegistrationsTable */}
            <Grid item xs={12}>
            
                <RegistrationsTable />
             
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
     );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
}); 
export default connect(mapStateToProps)(
  withStyles(styles)(Dashboard)
);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


  