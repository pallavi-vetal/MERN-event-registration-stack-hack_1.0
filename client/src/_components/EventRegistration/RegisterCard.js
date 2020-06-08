/*
 * Component is responsible for integration all forms and submiting form to server.
 */
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BasicDetailsForm from './BasicDetailsForm';
import clsx from 'clsx';
import IdentificationDetailsForm from './IdentificationDetailsForm';
import { withStyles } from "@material-ui/core/styles";
import Review from './Review';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerEvent } from "../../_actions/usersActions";
import Alert from '@material-ui/lab/Alert';
import { Copyright } from '../Other/Footer';
import PersonIcon from '@material-ui/icons/Person';
import TodayIcon from '@material-ui/icons/Today';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import { IconButton, Badge, Tooltip } from '@material-ui/core';
var QRCode = require('qrcode.react');
const HomeLink = props => <Link href="/" to={{ pathname: `/` }} {...props} />;
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <TodayIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      width: 600,
      
    },
    marginTop: "0%"
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(200 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    iconColor: 'green' 
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
      _id:"",
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

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === "registrationType" && e.target.value === "Self")
      this.setState({ numberOfTickets: "1" })


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
   downloadQR = () => { // will implement soon}
   const canvas = document.getElementById("123456");
  const pngUrl = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  let downloadLink = document.createElement("a");
  downloadLink.href = pngUrl;
  downloadLink.download = "123456.png";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
  render() {

    const { classes } = this.props;
    const steps = ['Basic Details', 'Event details', 'Review '];

    function Greeting(state,id) {
      if (state.state.errors.hasOwnProperty("error") || Object.keys(state.state.errors).length > 0) {
        return <Alert severity="error">
          Something Went Wrong. <br></br>
                  Error Message :
                  <b>{state.state.errors.error}<br></br>
            {state.state.errors.name}<br></br>
            {state.state.errors.mobile}<br></br>
            {state.state.errors.email}<br></br>{
              state.state.errors.registrationType}
          </b>
         
        </Alert>;
      }
      return <Alert severity="success">
        Thanks for showing interest in event. <br></br>
                Please note your registration number : &nbsp;
              <b>{state.state.registrationID.registrationID}</b>
        <br></br>
        {console.log("checksdfsdf",state)}
         We have sent an email to your registered email. Please check your mail inbox.
              <div>
              <QRCode
                id={123456}
                value={JSON.stringify(state.state.registrationID)}
                size={290}
                level={"H"}
                includeMargin={true}
              />
             <br></br> <a onClick={state.downloadQR}> Download QR </a>
            </div>
      </Alert>;
    }
    let activeStep = this.state.activeStep;
    return (
      <React.Fragment>
        <main className={classes.layout} >
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Register for Event
          </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel 
             connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label} >
                  <StepLabel StepIconComponent={ColorlibStepIcon} >{label}</StepLabel>
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
                    <Greeting state={this.props} downloadQR={this.downloadQR} id={this.state.registrationID}  />
                    <IconButton aria-label="home" color="default" component={HomeLink}>
                                <Tooltip title="Home" aria-label="">
                                    <Badge  color="secondary">
                                        <HomeIcon /> 
                                    </Badge>
                                </Tooltip>
                            </IconButton>  
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
                        color="secondary"
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


