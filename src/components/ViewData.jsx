import React, { Component } from 'react';
import { Grid, Table, Row, Panel, Panelbody, Form, FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import jsonData from '../data/jsonData';
class ViewData extends Component {
    render() {
        var data = jsonData;
        return (
            <div>
                <br />
                <Grid >
                    <Row >
                        <h1>View Users</h1>
                    </Row>
                    <hr />
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.fname}</td>
                                    <td>{element.address}</td>
                                    <td>{element.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Grid>
            </div>
        )
    }
}
export default ViewData;