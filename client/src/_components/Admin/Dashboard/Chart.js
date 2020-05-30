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

const useStyles = theme => ({

});

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: ""
    }
  }

  async componentDidMount() {
    // If not logged in , user should get redirected to login instead of dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    await this.props.fetchTimeSeriesData();
    if(this.props.events.eventTimeSeries[0]!==undefined)
      this.setState({ month: this.props.events.eventTimeSeries[0].month })
  }

  render() {
   /* 
    Prepare time series data in required format. Put count 0 if no registration made on particular day
   */
    let mdata = new Map();
    for (let i = 1; i <= 31; i++)
      mdata.set(i, 0);
    for (let i1 = 1; i1 <= 31; i1++) {
      this.props.events.eventTimeSeries.sort().map((row) => {
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
          "Total number of tickets sold": key.tickets,
          "Total number of regitrations": key.count
        })
      })

    return (
      <React.Fragment>
        <Title>Month - {this.state.month}</Title>
        <ResponsiveContainer>
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
            <Tooltip wrapperStyle={{ top: -50, left: 200,right:300 }}/>
            <Legend />
            <Area type="monotone" dataKey="Total number of tickets sold" stroke="#8884d8"  stackId="1" fill="#82ca9d" activeDot={{ r: 8 }} />
            <Area type="monotone" dataKey="Total number of regitrations" stroke="#82ca9d"  stackId="1" />
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
