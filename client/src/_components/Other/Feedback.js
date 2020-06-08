/* Feedback Page */
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { submitFeedback } from "../../_actions/usersActions";
import SendIcon from '@material-ui/icons/Send';
import { blue, red } from '@material-ui/core/colors';
import NavBar from "../Navigation/Navbar";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { Copyright } from '../Other/Footer';
import clsx from 'clsx';
import InfoIcon from "@material-ui/icons/Info";
const useStyles = theme => ({

  paper: {
    marginTop: theme.spacing(9),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...theme.mixins.toolbar
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  success: {
    backgroundColor: blue[700],
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  error: {
    backgroundColor: red[600],
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  snack: {
    marginTop: theme.spacing(9),
  },
  appBarSpacer: theme.mixins.toolbar,
});

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      feedback: "",
      errors: {},
      isSubmit: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/");
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        iserror: true,
        isSubmit:false
      });
      this.setState({
        name: "",
        email: "",
        feedback: ""
      });
    }
    else {
      this.setState({ isSubmit: true });

    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ errors: {} })
  };

  async onSubmit(e) {
    e.preventDefault();

    const newFeedback = {
      name: this.state.name,
      email: this.state.email,
      feedback: this.state.feedback,

    };

    await this.props.submitFeedback(newFeedback, this.props.history);
    if (!this.props.errors.name || !this.props.errors.email || !this.props.errors.feedback) {
      this.setState({ iserror: false,isSubmit:true });
      this.setState({
        name: "",
        email: "",
        feedback: ""
      })
    }
    else {
      this.setState({ iserror: true, isSubmit: false });
      this.setState({
        name: "",
        email: "",
        feedback: ""
      })

    }
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div  >
       <NavBar />
        <Container component="main" maxWidth="xs" >
          <div className={classes.snack} >
            {this.state.iserror && (<div>
              <SnackbarContent
                autoHideDuration={6000}
                className={classes.error}
                aria-describedby="feedback-snackbar"
                message={
                  <span id="feedback-snackbar" className={classes.message}>
                    <InfoIcon className={clsx(classes.icon, classes.iconVariant)} />
                    {"Please Check errors!"}
                  </span>
                }
              />
            </div>)}
          </div>
          <div className={classes.paper} >
            {this.state.isSubmit && !this.state.iserror && (<div>
              <SnackbarContent
                autoHideDuration={6000}
                className={classes.success}
                aria-describedby="feedback-snackbar"
                message={
                  <span id="feedback-snackbar" className={classes.message}>
                    <CheckCircleIcon className={clsx(classes.icon, classes.iconVariant)} />
                    {"Your Feedback submitted successfully!"}<br></br>{"Thank you for your feedback!!!"}
                  </span>
                }
              />
            </div>)}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Feedback
        </Typography>
            <form className={classes.form} noValidate onSubmit={this.onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    required
                    color="secondary"
                    fullWidth
                    id="name"
                    label="Your Name"
                    autoFocus
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <label htmlFor="name"></label>
                  <Typography variant="h8" color="error">{errors.name}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="email"
                    name="email"
                    color="secondary"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Your Email Address"
                    autoFocus
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <label htmlFor="email"></label>
                  <Typography variant="h8" color="error">{errors.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="feedback"
                    name="feedback"
                    color="secondary"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={10}
                    id="feedback"
                    label="Feedback"
                    autoFocus
                    value={this.state.feedback}
                    onChange={this.onChange}
                  />
                  <label htmlFor="feedback"></label>
                  <Typography variant="h8" color="error">{errors.feedback}</Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="inherit"
                className={classes.submit}
                startIcon={<SendIcon />}
              >
                Submit Feedback
          </Button>
            </form>
          </div>
          <Copyright />
        </Container>
      </div>

    );
  }
}
Feedback.propTypes = {
  submitFeedback: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { submitFeedback })(withStyles(useStyles)(Feedback));

