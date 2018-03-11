import React from 'react';
import { Modal, Button } from 'react-bootstrap'
class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        console.log("hi")
        this.setState({ show: true });
    }
    render() {
        console.log(this.props.element)
        return (
            <td><button className="btn btn-primary btn-sm" id={this.props.element} data-toggle="modal" data-target={`#${this.props.element}myModal`} >Edit</button>
                <div id={`${this.props.element}myModal`} className="modal fade" role="dialog">
                    <div className="modal-dialog">
                        {/* <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Edit todo</h4>
                            </div>
                            <div className="modal-body">
                                <div> Title: <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input></div><br />
                                <div>Description: <input type="text" name="description" value={this.state.description} onChange={this.handleChange}></input></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" onClick={this.handleSubmit} data-dismiss="modal">Save</button>
                            </div>
                        </div> */}

                    </div>
                </div>
            </td>
        )
    }
}
export default EditUser;