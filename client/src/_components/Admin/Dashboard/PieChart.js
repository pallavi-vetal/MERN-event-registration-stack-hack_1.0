import React, { Component } from 'react';
import {
    PieChart, Pie, Cell,ResponsiveContainer
} from 'recharts';
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


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
 class Example extends Component {
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
       //this.createData(this.props);
      // console.log(this.state);
       
      }
      

    render() {
        let data = this.props.events.eventType.map((row=>{
            console.log(row)
            return {
              "value":row.totalAmount,
              "name":row._id.registrationType
            }
          }))
          console.log(data)
        return (
            <React.Fragment>
                <Title>Registration Type</Title>
                <ResponsiveContainer>
                    <PieChart >
                        <Pie
                            data={data}
                           
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
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
