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
      registrationType : '',
      numberOfTickets : '',
      
     }
  }
  onChange = e => {

    this.setState({ [e.target.id]: e.target.value });
    
    console.log(this.state);
    
  };
  render() { 
    const {classes} = this.props;
    console.log(this.props.registrationType+" "+this.props.numberOfTickets);
    let numbertick = 0;
    if(this.props.state1.registrationType==='Self'){
      numbertick = "1";
    }
    return ( <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event details
      </Typography>
      <Grid container spacing={3}>
        <Grid item  md={6}>
          <br></br>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Registration Type</InputLabel>
          <Select
            native
            value={this.props.registrationType}
            onChange={this.props.onChange}
            required
           
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
           vaule={this.props.state1.numberOfTickets} 
           onChange={this.props.onChange}
           placeholder={numbertick}
          fullWidth 
          />
        </Grid>
        <Grid item xs={12} md={6}>
         <br></br>
        </Grid>
      </Grid>

    </React.Fragment> );
  }
}
 
export default withStyles(useStyles)(IdentificationDetailsForm);