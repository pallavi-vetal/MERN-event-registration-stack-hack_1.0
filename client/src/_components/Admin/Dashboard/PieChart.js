/*
 * Component is responsible for rendering PIE chart on admin dashboards.
 * Data used : Count of registrations aggregated by registration type.
 */
import React, { Component } from 'react';
import {
  PieChart, Pie, Sector, ResponsiveContainer
} from 'recharts';
import Title from './Title';
import { withStyles } from "@material-ui/core/styles";
import { fetchRegistrationTypeDetails } from "../../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Typography } from '@material-ui/core';
const useStyles = theme => ({

});

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.fetchRegistrationTypeDetails();
    this.setState({ events: this.props.events })
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }
  render() {
    const { classes } = this.props;
    let data = this.props.events.eventType.map((row => {
      console.log(row)
      return {
        "value": row.totalAmount,
        "name": row._id.registrationType
      }
    }))
    let heading;
    if (data.length===0) {
      heading = <Typography variant="h6" color="textSecondary">Enough data is not available</Typography>;
    } 
    
    return (
      <React.Fragment>
        <Title>Registration Type</Title>
        {heading}
        <ResponsiveContainer>
          <PieChart >
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data}
              className={classes.content}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"

              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
      </React.Fragment>


    );
  }
}
Example.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchRegistrationTypeDetails: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});
export default connect(mapStateToProps, { fetchRegistrationTypeDetails })(withStyles(useStyles)(Example));
