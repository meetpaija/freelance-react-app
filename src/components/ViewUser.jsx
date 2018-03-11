import React from 'react';
import { app } from '../firebase/firebaseconfig';
import Loading from 'react-loading-bar'
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import toastr from 'toastr';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class ViewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            selecteduser: {
                address: "",
                emailid: "",
                fname: "",
                lname: "",
                uid: "",
                roles: ""
            },
            users: [{
                address: "",
                emailid: "",
                fname: "",
                lname: "",
                uid: "",
                roles: ""
            }],
            show: false,
            open: false,
            selected: [],
        };
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleUpdateChange = (event) => {
        var newuser = this.state.selecteduser;
        newuser[event.target.name] = event.target.value;
        this.setState({ selecteduser: newuser })
    }

    handleChange = (event, index, value) => {
        this.setState({ value });
    }


    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        if (selectedRows.length === 0) {

        }
        else {
            this.handleOpen();
            this.setState({
                selected: selectedRows,
                selecteduser: {
                    address: this.state.users[selectedRows].address,
                    uid: this.state.users[selectedRows].uid,
                    fname: this.state.users[selectedRows].fname,
                    lname: this.state.users[selectedRows].lname,
                    roles: this.state.users[selectedRows].roles,
                    emailid: this.state.users[selectedRows].emailid,
                }
            });
        }
    };
    componentDidMount() {
        this.setState({ show: true })
        app.database().ref('users').once('value', (snapshot) => {
            var users = [];
            snapshot.forEach((childSnapshot) => {
                var user = {
                    uid: childSnapshot.key,
                    address: childSnapshot.val().address,
                    fname: childSnapshot.val().fname,
                    lname: childSnapshot.val().lname,
                    roles: childSnapshot.val().roles,
                    emailid: childSnapshot.val().email
                };
                users.push(user);
            });
            this.setState({ users: users, show: false })
        });
    }

    handleSelected = (e) => {
        var newuser = this.state.selecteduser;
        newuser['roles'] = e.target.innerText;
        this.setState({ selecteduser: newuser })
    }

    deleteUser = (e) => {
        app.database().ref('/users').child(this.state.selecteduser.uid).remove()
            .then(() => {
                toastr.success("Deleted Successfully");
                this.setState({ open: false, show: true })
                app.database().ref('users').once('value', (snapshot) => {
                    var users = [];
                    snapshot.forEach((childSnapshot) => {
                        var user = {
                            uid: childSnapshot.key,
                            address: childSnapshot.val().address,
                            fname: childSnapshot.val().fname,
                            lname: childSnapshot.val().lname,
                            roles: childSnapshot.val().roles,
                            emailid: childSnapshot.val().email
                        };
                        users.push(user);
                    });
                    this.setState({ users: users, show: false })
                })
                    .catch(error => {
                        this.setState({ show: false })
                        toastr.error(error.message);
                    });
            })
            .catch(error => {
                toastr.error(error.message);
            })

    }

    updateUser = (e) => {
        var postData = {
            address: this.state.selecteduser.address,
            fname: this.state.selecteduser.fname,
            lname: this.state.selecteduser.lname,
            email: this.state.selecteduser.emailid,
            roles: this.state.selecteduser.roles,
        };
        var updates = {};
        updates['/users/' + this.state.selecteduser.uid] = postData;
        app.database().ref().update(updates)
            .then(() => {
                toastr.success("updated successfully")
                this.setState({ open: false, show: true })
                app.database().ref('users').once('value', (snapshot) => {
                    var users = [];
                    snapshot.forEach((childSnapshot) => {
                        var user = {
                            uid: childSnapshot.key,
                            address: childSnapshot.val().address,
                            fname: childSnapshot.val().fname,
                            lname: childSnapshot.val().lname,
                            roles: childSnapshot.val().roles,
                            emailid: childSnapshot.val().email
                        };
                        users.push(user);
                    });
                    this.setState({ users: users, show: false })
                })
                    .catch(error => {
                        toastr.error(error.message);
                    });
            })
            .catch(error => {
                toastr.error(error.message)
            })
    }

    render() {
        var data = this.state.users;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Update User"
                primary={true}
                onClick={this.updateUser}
            />,
            <FlatButton
                label="Delete User"
                primary={true}
                onClick={this.deleteUser}
            />
        ];
        return (

            <MuiThemeProvider>
                <div>
                    <Loading
                        show={this.state.show}
                        color="red"
                    />
                    <h1>Users</h1>
                    <Table onRowSelection={this.handleRowSelection}>
                        <TableHeader >
                            <TableRow>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Address</TableHeaderColumn>
                                <TableHeaderColumn>Roles</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((element, index) => (
                                <TableRow key={`name${index}`} selected={this.isSelected(index)}>
                                    <TableRowColumn>{element.fname}</TableRowColumn>
                                    <TableRowColumn>{element.address}</TableRowColumn>
                                    <TableRowColumn>{element.roles}</TableRowColumn>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Dialog
                        title="Edit/Delete User"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        <TextField
                            name="fname"
                            onChange={this.handleUpdateChange}
                            defaultValue={this.state.selecteduser.fname}
                            floatingLabelText="FirstName"
                        /><br />
                        <TextField
                            name="lname"
                            onChange={this.handleUpdateChange}
                            defaultValue={this.state.selecteduser.lname}
                            floatingLabelText="LastName"
                        /><br />
                        <TextField
                            name="address"
                            onChange={this.handleUpdateChange}
                            defaultValue={this.state.selecteduser.address}
                            floatingLabelText="Address"
                        /><br />
                        <SelectField
                            floatingLabelText="Frequency"
                            value={this.state.value}
                            onChange={this.handleChange}
                            autoWidth={true}
                        >
                            <MenuItem value={1} onClick={this.handleSelected} primaryText="Security" />
                            <MenuItem value={2} onClick={this.handleSelected} primaryText="Residents" /></SelectField>
                    </Dialog>
                </div>
            </MuiThemeProvider >

        );
    }
}


export default ViewUser;