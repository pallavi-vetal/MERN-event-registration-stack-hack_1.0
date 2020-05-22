import React, { Component } from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'
import Title from './Title';
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
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                
                <MaterialTable
                    title="Recent Registrations"
                    columns={[
                        { title: 'FullName', field: 'name' },
                        { title: 'Email ID', field: 'surname' },
                        { title: 'Date Registered', field: 'birthYear', type: 'date' },
                        { title: 'Registration Type', field: 'birthCity' },
                       
                    ]}
                    data={[
                        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                    ]}
                    options={{
                        filtering: true
                    }}
                />
                <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={preventDefault}>
                        See more orders
              </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default (withStyles(useStyles)(RegistrationsTable));
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
