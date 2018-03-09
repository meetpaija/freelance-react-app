import React, { Component } from 'react';
import { Grid, DropdownButton, MenuItem, Row, Panel, Panelbody, Form, FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import jsonData from '../data/jsonData';
import { Link, Redirect } from 'react-router-dom';
class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confpassword: "",
            fname: "",
            lname: "",
            address: "",
            redirect: false,
            roles: "--Role--"
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.address !== "" &&
            this.state.fname !== "" &&
            this.state.lname !== "" &&
            this.state.email !== "" &&
            this.state.password !== "" &&
            this.state.roles !== "--Role--") {
            if (this.state.password === this.state.confpassword) {
                jsonData.push(
                    {
                        "fname": this.state.fname,
                        "lname": this.state.lname,
                        "address": this.state.address,
                        "role": this.state.roles,
                        "password": this.state.password,
                        "email": this.state.email
                    }
                )
                debugger;
                this.setState({ redirect: true })
            }
        }

    }
    handleSelect = (e) => {
        this.setState({ roles: e })
    }

    render() {
        if (this.state.redirect) {
            return < Redirect to="/view" />;
        }
        return (
            <div>
                <br />
                <Grid >
                    <Row >
                        <Col><h1>Register here</h1><Link to="/">Login here</Link></Col>
                    </Row>
                    <hr />
                    <Panel >
                        <Panel.Body>
                            <Form horizontal >
                                <FormGroup controlId="formHorizontalFName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        FirstName
        </Col>
                                    <Col sm={10}>
                                        <FormControl type="text" name="fname" value={this.state.fname} onChange={this.handleChange} placeholder="FirstName" />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalLName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Last Name
        </Col>
                                    <Col sm={10}>
                                        <FormControl name="lname" type="text" value={this.state.lname} onChange={this.handleChange} placeholder="LastName" />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Email
        </Col>
                                    <Col sm={10}>
                                        <FormControl name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalAddress">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Address
        </Col>
                                    <Col sm={10}>
                                        <FormControl name="address" componentClass="textarea" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
                                    </Col>

                                </FormGroup>

                                <FormGroup controlId="formHorizontalRole">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Role
        </Col>
                                    <Col sm={10}>
                                        <DropdownButton title={this.state.roles} id="dropdown-size-medium" onSelect={this.handleSelect}>
                                            <MenuItem eventKey="Admin">Admin</MenuItem>
                                            <MenuItem eventKey="Security">Security</MenuItem>
                                            <MenuItem eventKey="Residents">Residents</MenuItem>
                                        </DropdownButton>
                                    </Col>

                                </FormGroup>


                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Password
        </Col>
                                    <Col sm={10}>
                                        <FormControl type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formHorizontalConPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Confirm Password
        </Col>
                                    <Col sm={10}>
                                        <FormControl name="confpassword" type="password" value={this.state.confpassword} onChange={this.handleChange} placeholder="Password" />
                                    </Col>
                                </FormGroup>

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Panel.Body>
                    </Panel>
                </Grid>
            </div>
        );
    }
}

export default Registration;
