/*
 * Component integrates all dashboard components like area graph and pie chart
 * Represents admin dashboard
 */
import React, { Component } from 'react';
import clsx from 'clsx';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import RegistrationsCount from './RegistrationsCount';
import Example from './PieChart';
import Navbar from '../../Navigation/Navbar';
import RegistrationsTable from './RegistrationsTable';

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop:"-1.5%",
    color:"inherit"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow:5,
    height: '270vh',
    overflow: 'auto',
    color:"inherit"
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
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
     
      <Navbar/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Area Graph */}
            <Grid item xs={12} md={4} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Pie Chart */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightPaper}>
                <Example />
              </Paper>
            </Grid>
            {/* Recent RegistrationsCount */}
            <Grid item xs={12} md={4} lg={6}>
              <Paper className={fixedHeightPaper}>
                <RegistrationsCount />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={12}>
             <RegistrationsTable />
            </Grid>
          </Grid>
          
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



  