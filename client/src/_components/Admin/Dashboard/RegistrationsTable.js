import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import { fetchEvents } from "../../../_actions/eventsActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";


const useStyles = theme => ({
    depositContext: {
        flex: 1,
    },
});
class RegistrationsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (!this.props.auth.isAuthenticated) {
          this.props.history.push("/login");
        }
        this.props.fetchEvents();
        
       
      }
    render() {
        const { classes } = this.props;
        const columns = [
            {
                title: "Registration ID",
                field: "registrationID",
                render: rowData => (
                  rowData['_id']
                ),
                headerStyle: {
                  backgroundColor: "#673ab7",
                  color: "#ffffff"
                }
              },
            {
              title: "Full Name",
              field: "Full Name",
              render: rowData => (
                rowData['fullName']
              ),
              headerStyle: {
                backgroundColor: "#673ab7",
                color: "#ffffff"
              }
            },
            {
              title: "Email ID",
              field: "email",
              render: rowData => (
               rowData["email"]
              ),
              headerStyle: {
                backgroundColor: "#673ab7",
                color: "#ffffff"
              }
            },
            {
              title: "Registration Type",
              field: "registrationType",
              render: rowData => (
              rowData["registrationType"]
              ),
              headerStyle: {
                backgroundColor: "#673ab7",
                color: "#ffffff"
              }
            },
            {
                title: "Number of Tickets",
                field: "numberOfTickets",
                render: rowData => (
                rowData["numberOfTickets"]
                ),
                headerStyle: {
                  backgroundColor: "#673ab7",
                  color: "#ffffff"
                }
              },
              {
                title: "Date Registered",
                field: "date",
                render: rowData => (
                  rowData['date']
                ),
                headerStyle: {
                  backgroundColor: "#673ab7",
                  color: "#ffffff"
                }
              },  
           
          ];
        return (
            <React.Fragment>
                
                <MaterialTable
          title="Restaurant List"
          columns={columns}
          data={this.props.events.events}
          
          options={{
            sorting: true,
            filtering: true
          }}
        />
                
            </React.Fragment>
        );
    }
}
RegistrationsTable.propTypes = {
    auth: PropTypes.object.isRequired,
    fetchEvents:PropTypes.func.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    events: state.events
  });
export default connect(mapStateToProps, { fetchEvents })(withStyles(useStyles)(RegistrationsTable));

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
    event.preventDefault();
}
