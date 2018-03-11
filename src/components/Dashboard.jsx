import React from 'react';
import SideBar from '../common/SideBar';
import ViewUser from './ViewUser';
class Dashboard extends React.Component {


    render() {
        return (
            <div>
                <SideBar />
                <div className="mainContent">
                    <ViewUser />
                </div>
            </div>
        )
    }
}

export default Dashboard;