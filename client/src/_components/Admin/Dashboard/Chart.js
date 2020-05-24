import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { withStyles } from "@material-ui/core/styles";
import { fetchRegistrationTypeDetails } from "../../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const useStyles = theme => ({
  depositContext: {
      flex: 1,
  },
});
// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
   this.props.fetchRegistrationTypeDetails();
   this.setState({events:this.props.events})
  }
  
  render() {
    
    return (
    <React.Fragment>
      <Title>Month - May</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time"  >
            <Label

              position="top"
              
            >
              Days
           </Label>
          </XAxis>
          <YAxis >
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle'}}
            >
              # Tickets
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount"  dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
    );
  }
}
Chart.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchRegistrationTypeDetails: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});
export default connect(mapStateToProps, { fetchRegistrationTypeDetails })(withStyles(useStyles)(Chart));
const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

