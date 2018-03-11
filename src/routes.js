import React from 'react';
import { Route, Switch } from 'react-router-dom'
import App from './App'
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';

const Routes = () => {
    return (<Switch>
        <Route exact
            path="/" component={App} />
        <Route exact
            path="/login" component={App} />
        <Route exact path="/add-admin" component={Registration} />
        <Route exact path="/dashboard" component={Dashboard} />
    </Switch>);
}

export default Routes;