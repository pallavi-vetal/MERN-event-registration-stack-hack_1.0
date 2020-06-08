/*
 * Component is responsible for rendering area graph on admin dashboards.
 * Data used : Total number of tickets sold and number of registrations made per day in current month
 */
import React, { Component } from 'react';
import { XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Legend, Tooltip, Area, AreaChart } from 'recharts';
import Title from './Title';
import { withStyles } from "@material-ui/core/styles";
import { fetchTimeSeriesData } from "../../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormControl, InputLabel, Select, Button, Grid, MenuItem } from '@material-ui/core';

const useStyles = theme => ({
root:{
  color:"inherit"
},
formControl: {
  margin: theme.spacing(1),
    minWidth: 120,
},
cont:{
  display:"flex",
},
selectEmpty: {
  marginTop: theme.spacing(2),
  backgroundColor:"#ffffff",
  width:"100%"
},
submit: {
  margin: theme.spacing(2, 0, 2),
},
});

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: "",
      monthSelected:0,
      eventsData:[]
    }
  }

  async componentDidMount() {
    // If not logged in , user should get redirected to login instead of dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    let d = new Date();
    let n = d.getMonth();
    console.log("month ",n)
    this.setState({monthSelected:n})
    await this.props.fetchTimeSeriesData({"id":n});
    if(this.props.events.eventTimeSeries[0]!==undefined)
     {
      this.setState({
        month: this.props.events.eventTimeSeries[0].month,
        eventsData : this.props.events.eventTimeSeries
      })
     }
  }
  onSubmit = async(e) =>{
    
  }
   onChange = async(e) => {
    this.setState({ monthSelected: e.target.value });
    await this.props.fetchTimeSeriesData({"id":this.state.monthSelected});
    if(this.props.events.eventTimeSeries[0]!==undefined)
      {
        this.setState({
          month: this.props.events.eventTimeSeries[0].month,
          eventsData : this.props.events.eventTimeSeries,
          monthSelected:this.state.monthSelected
        })
      }
      else{
        this.setState({
          month: 'No data available :(',
          eventsData : [],
          monthSelected:this.state.monthSelected
        })
      }
  };
  render() {
   /* 
    Prepare time series data in required format. Put count 0 if no registration made on particular day
   */
    let mdata = new Map();
    for (let i = 1; i <= 31; i++)
      mdata.set(i, 0);
    for (let i1 = 1; i1 <= 31; i1++) {
      this.state.eventsData.sort().map((row) => {
        if (mdata.has(row["day"])) {
          mdata.set(row["day"],
            {
              "count": row["registeredCount"],
              "tickets": row["totalTicketsPerDay"]
            }
          )
        }
        else {
          mdata.set(i1,
            {
              "count": 0,
              "tickets": 0
            }
          )
        }
        return null;
      })
    }
    /* Traverse mdata and convert it to required object format 
      {
        "Day":"Day of month",
        "Total number of tickets sold": tickets_count,
        "Total number of regitrations": registration_count
      } 
    */
    let data = []
    mdata.forEach(
      (key, value) => {
        data.push({
          "Day": value,
          "# Tickets sold": key.tickets,
          "# Registrations": key.count
        })
      })
      const {classes} = this.props;
    return (
      <React.Fragment>
        <Title>Month - {this.state.month} </Title>
        
        <Grid item xs={12} md={6} lg={6} className={classes.cont}>
        
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          inputProps={{
            name: 'monthSelected',
            id: 'monthSelected',
          }}
          fullWidth
          value={this.state.monthSelected}
          onChange={this.onChange}
        >
            
              <MenuItem value={0} >Jan</MenuItem>
              <MenuItem value={1}>Feb</MenuItem>
              <MenuItem value={2}>Mar</MenuItem>
              <MenuItem value={3}>Apr</MenuItem>
              <MenuItem value={4}>May</MenuItem>
              <MenuItem value={5}>Jun</MenuItem>
              <MenuItem value={6}>Jul</MenuItem>
              <MenuItem value={7}>Aug</MenuItem>
              <MenuItem value={8}>Sept</MenuItem>
              <MenuItem value={9}>Oct</MenuItem>
              <MenuItem value={10}>Nov</MenuItem>
              <MenuItem value={11}>Dec</MenuItem>
            </Select>
      
       
        
          </FormControl>
        
       
          <Button
                type="submit"
                
                variant="outlined"
                color="secondary"
                onClick={this.onChange}
                className={classes.submit}
               style={{"height":"40px"}}
              >
                Submit 
          </Button>
        
        
        </Grid>
      
         
        <ResponsiveContainer width="100%" height={300}>
        
          <AreaChart
            data={data}
          >
            <XAxis dataKey="Day"  >
              <Label
                position="top"
              >
              </Label>
            </XAxis>
            <YAxis >
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle' }}
              >
              </Label>
            </YAxis>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip wrapperStyle={{ top: "0%",right:"20%",left:"20%",bottom:"0.5%"}} />
            <Legend />
            <Area type="monotone" dataKey="# Tickets sold"  stroke="#82ca9d"  stackId="1" fill="#82ca9d" activeDot={{ r: 8 }} />
            <Area type="monotone" dataKey="# Registrations" stroke="#8884d8"   stackId="1" />
          </AreaChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}
Chart.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchTimeSeriesData: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});
export default connect(mapStateToProps, { fetchTimeSeriesData })(withStyles(useStyles)(Chart));
