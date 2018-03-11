import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { app } from '../firebase/firebaseconfig'
import Loading from 'react-loading-bar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import 'react-loading-bar/dist/index.css'
import toastr from 'toastr';
// import { browserHistory, Link } from 'react-router';
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            show: false,
            redirect: false
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.type]: e.target.value })
    }

    handleSubmit = (e) => {
        this.setState({ show: true })
        e.preventDefault();

        app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                toastr.success("login successfully")
                this.setState({ redirect: true, show: false })
            })
            .catch(error => {
                toastr.error(error.message)
                this.setState({ redirect: false, show: false })
            })

    }

    render() {
        if (this.state.redirect) {
            return < Redirect to="/dashboard" />;
        }
        return (
            <div>
                <Loading
                    show={this.state.show}
                    color="red"
                />


                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <Grid>
                            <TextField
                                hintText="Enter your EmailId"
                                floatingLabelText="Email"
                                type="email"
                                onChange={this.handleChange}
                            />
                            <br />
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={this.handleChange}
                            />
                            <br />
                            <RaisedButton label="LogIn" primary={true} onClick={this.handleSubmit} />
                        </Grid>
                    </div>
                </MuiThemeProvider>

            </div>
        );
    }
}

export default Login;
