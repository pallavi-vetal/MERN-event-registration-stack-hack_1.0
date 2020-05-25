import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BasicDetailsForm from './BasicDetailsForm';
import IdentificationDetailsForm from './IdentificationDetailsForm';
import { withStyles } from "@material-ui/core/styles";
import Review from './Review';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerEvent } from "../../_actions/usersActions";
import Alert from '@material-ui/lab/Alert';
const useStyles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: "0%"
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
});

class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      registrationType: "",
      numberOfTickets: '',
      fullName: "",
      email: "",
      mobile: "",
      selectedFile: "",
      file: [{
        source: '',
        options: {
          type: ''
        }
      }],
      registrationID: "",
      errors: this.props.errors,
      fileName: "",
      imageID: ''

    }
    this.getStepContent = this.getStepContent.bind(this)
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors

      });
    }
    if (nextProps.registrationID) {
      this.setState({
        registrationID: nextProps.registrationID

      });

    }
  }

  handleNext = (e) => {
    this.setState({ "activeStep": this.state.activeStep + 1 })
    if (this.state.activeStep === 2) {
      console.log(this.state.activeStep)
      e.preventDefault();

      const userData = {
        email: this.state.email,
        fullName: this.state.fullName,
        mobile: this.state.mobile,
        registrationType: this.state.registrationType,
        numberOfTickets: parseInt(this.state.numberOfTickets, 10),
        imageID: this.state.imageID
      };

      this.props.registerEvent(userData);
    }

  };
  handleImageUpload = (e) => {
    this.setState({ "imageID": e })
  }
  handleBack = (e) => {
    this.setState({ "activeStep": this.state.activeStep - 1 })
  };
  handleHome = (e) => {
    this.setState({
      activeStep: 0,
      registrationType: "",
      numberOfTickets: '',
      fullName: "",
      email: "",
      mobile: "",
      selectedFile: "",
      registrationID: "",
      errors: {},
      fileName: "",
      imageID: ''
    })
    this.setState({ "activeStep": 0 })
  };
  onChange = (e) => {
    console.log(e.target.id)

    this.setState({ [e.target.id]: e.target.value });
    if(e.target.id==="registrationType" && e.target.value==="Self")
    this.setState({numberOfTickets:"1"})
    

  };
  getStepContent(step) {
    switch (step) {
      case 0:
        return <BasicDetailsForm state1={this.state} onChange={this.onChange}
          onImageUpload={this.handleImageUpload} />;
      case 1:
        return <IdentificationDetailsForm state1={this.state} onChange={this.onChange} />;
      case 2:
        return <Review state1={this.state} />;
      default:
        throw new Error('Unknown step');
    }
  }

  render() {

    const { classes } = this.props;
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



    const steps = ['Basic Details', 'Event details', 'Review your order'];
    //issue
    const { errors } = this.state.errors;
    const { registrationID } = this.state.registrationID;
    console.log("my errors:", errors, "registrationID", registrationID)
    function Greeting(state) {
      //const {state1} = state;
      //console.log(state,"232323")
      if (state.state.errors.error || state.state.errors && !state.state.registrationID) {
        return <Alert severity="error">Something Went Wrong. <br></br>
      Error Message :  <b>{state.state.errors.error}<br></br>
      {state.state.errors.name}<br></br>
      {state.state.errors.mobile}<br></br>
      {state.state.errors.email}<br></br>{
      state.state.errors.registrationType}</b></Alert>;
      }
      return <Alert severity="success">Thanks for showing interest in event. <br></br>Please note your registration number : &nbsp;
       <b>{state.state.registrationID.registrationID}</b></Alert>;
    }
    let activeStep = this.state.activeStep;
    return (
      <React.Fragment>

        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Register for Event
          </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your time.
                </Typography>
                  <Typography variant="subtitle1">
                    <Greeting state={this.props} />

                    <Link href="/" to={{ pathname: `/` }} trim="trim">
                      Home
                </Link>

                  </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {this.getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={this.handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    );
  }
}
RegisterCard.propTypes = {
  registerEvent: PropTypes.func.isRequired,
  registrationID: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  registrationID: state.registrationID,
  errors: state.errors
});

export default connect(mapStateToProps, { registerEvent })(withStyles(useStyles)(RegisterCard));


