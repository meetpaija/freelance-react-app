import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { app } from '../firebase/firebaseconfig';
import toastr from 'toastr'
import { Link, Redirect } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import { Drawer, MenuItem } from 'material-ui';
class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: '',
            redirectToLogin: false,
            show: false
        }
    }
    componentDidMount() {
        this.setState({ show: true })
        var user = app.auth().currentUser;
        if (user) {
            this.setState({ currentUser: "Admin", show: false });
        } else {
            toastr.success("Please login first")
            this.setState({ redirectToLogin: true, show: false })
        }
    }

    handleLogOut = () => {
        this.setState({ show: true })
        app.auth().signOut().then(() => {
            toastr.success("Sign-out successful");
            this.setState({ redirectToLogin: true, show: false })
        }).catch((error) => {
            toastr.error(error)
            this.setState({ redirectToLogin: false, show: false })
        });
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to="/" />
        }
        return (
            <MuiThemeProvider>
                <Drawer open={true}>
                    <h3 className="welcomeUser">{this.state.currentUser}</h3>
                    <hr />
                    <Link to="/dashboard"><MenuItem>DashBoard</MenuItem></Link>
                    <Link to="/add-admin"><MenuItem>Add User</MenuItem></Link>
                    <MenuItem onClick={this.handleLogOut}>SignOut <Glyphicon glyph="log-out" /></MenuItem>

                </Drawer>
            </MuiThemeProvider>


        )
    }
}

export default SideBar;