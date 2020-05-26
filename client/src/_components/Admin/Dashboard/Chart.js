import React, { Component } from 'react';
import {  XAxis, YAxis, Label, ResponsiveContainer,CartesianGrid,Legend,Tooltip,Area,AreaChart } from 'recharts';
import Title from './Title';
import { withStyles } from "@material-ui/core/styles";
import { fetchTimeSeriesData } from "../../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = theme => ({
  depositContext: {
      flex: 1,
  },
});

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month:""
    }
  }
  async componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
   await this.props.fetchTimeSeriesData();
   this.setState({month:this.props.events.eventTimeSeries[1].month})
  }
  
  render() {
    
  
    let mdata=new Map();

    for(var i=1;i<31;i++)
      mdata.set(i,0);
   // let i=1;
    for(var i1=1;i1<31;i1++){
      this.props.events.eventTimeSeries.sort().map((row)=>{
        if(mdata.has(row["day"])){
          mdata.set(row["day"],
          {
           "count":row["registeredCount"],
           "tickets":row["totalTicketsPerDay"]
          }
        )
        }
        else{
          mdata.set(i1,
          {
           "count":0,
           "tickets":0
          }
        )
        }
        
      })
    }
    
    
  let data = []
  mdata.forEach(
   (key,value) =>{data.push({
      "Day":value,
      "Total number of tickets sold":key.tickets,
      "Total number of regitrations":key.count
    })
   })
    
    return (
    <React.Fragment>
      <Title>Month - {this.state.month}</Title>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
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
              style={{ textAnchor: 'middle'}}
            >
             
            </Label>
          </YAxis>
          <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
          <Area type="monotone" dataKey="Total number of tickets sold"  stroke="#8884d8" fill="#82ca9d" activeDot={{r: 8}} />
          <Area type="monotone" dataKey="Total number of regitrations"  stroke="#82ca9d"  />
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
