import React, { Component } from 'react';
import { Grid, DropdownButton, MenuItem, Row, Panel, Form, FormControl, FormGroup, ControlLabel, Button, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import toastr from 'toastr'
import Loading from 'react-loading-bar'
import { app } from '../firebase/firebaseconfig'
import SideBar from '../common/SideBar';
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
            show: false,
            redirect: false,
            roles: "--Role--"
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        this.setState({ show: true })
        e.preventDefault()
        if (this.state.address !== "" &&
            this.state.fname !== "" &&
            this.state.lname !== "" &&
            this.state.email !== "" &&
            this.state.password !== "" &&
            this.state.roles !== "--Role--") {
            if (this.state.password === this.state.confpassword) {
                app.database().ref('users/').child(this.guid()).set({
                    fname: this.state.fname,
                    lname: this.state.lname,
                    email: this.state.email,
                    address: this.state.address,
                    roles: this.state.roles
                }).then(() => {
                    toastr.success("Successfully Added");
                    this.setState({ redirect: true, show: false })
                    return;
                })
                    .catch(error => {
                        this.setState({ show: false })
                        toastr.error(error.message)
                        return;
                    })
                return;
            }
            else {
                toastr.error("password doesn't match");
                this.setState({ show: true })
                return;
            }
        } else {
            toastr.error("some fields are missing..check again");
            this.setState({ show: false })
            return;
        }
    }

    guid = () => {
        return (this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4());
    }

    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }


    handleSelect = (e) => {
        this.setState({ roles: e })
    }

    render() {
        if (this.state.redirect) {
            return < Redirect to="/dashboard" />;
        }
        return (
            <div>

                <SideBar />

                <div className="mainContent">
                    <Loading
                        show={this.state.show}
                        color="red"
                    />
                    <br />
                    <Grid >
                        <Row >
                            <h1>Add Another User</h1>
                        </Row>
                        <hr />
                        <Panel >
                            <Panel.Body>

                                {/* <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                onChange={(event, newValue) => this.setState({ email: newValue })}
                            />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({ password: newValue })}
                            />
                            <br />
                            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleSubmit(event)} /> */}


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
                                            <Button onClick={(event) => this.handleSubmit(event)}>Add User</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Panel.Body>
                        </Panel>
                    </Grid>
                </div >
            </div>
        );
    }
}

export default Registration;
