/*
 * Component is responsible for rendering 2nd part of registration form containing registration specific details .
 */
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import { FormLabel } from '@material-ui/core';

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class IdentificationDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationType: '',
      numberOfTickets: '',
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    if (e.target.id === "registrationType" && e.target.value === "Self")
      this.setState({ numberOfTickets: "1" })

  };
  render() {
    const { classes } = this.props;
    let numbertick = 0;
    //If registration type === Self, set number of tickets to 1
    if (this.props.state1.registrationType === 'Self') {
      numbertick = "1";
    }
    return (<React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event details
      </Typography>
      <Grid container spacing={2} xs={9} md={12} lg={12}>
        <Grid item xs={12} md={6}>
          <br></br>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Registration Type</InputLabel>
            <Select
              native
              value={this.props.registrationType}
              onChange={this.props.onChange}
              required
              color="secondary"
              inputProps={{
                name: 'registrationType',
                id: 'registrationType',
              }}
            >
              <option aria-label="None" value="" />
              <option value={'Self'}>Self</option>
              <option value={'Group'}>Group</option>
              <option value={'Corporate'}>Corporate</option>
              <option value={'Others'}>Others</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <br></br>
          <FormLabel>Number of tickets</FormLabel>
          <TextField required id="numberOfTickets"
            name="numberOfTickets"
            value={this.props.state1.numberOfTickets}
            onChange={this.props.onChange}
            placeholder={numbertick}
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <br></br>
        </Grid>
      </Grid>

    </React.Fragment>);
  }
}

export default withStyles(useStyles)(IdentificationDetailsForm);
