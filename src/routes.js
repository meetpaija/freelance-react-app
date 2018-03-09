import React from 'react';
import { Route, Router, Switch } from 'react-router-dom'
import App from './App'
import Login from './components/Login';
import Registration from './components/Registration';
import ViewData from './components/ViewData';

const Routes = () => {
    return (<Switch>
        <Route exact
            path="/" component={App} />
        <Route path="/register" component={Registration} />
        <Route path="/view" component={ViewData} />
    </Switch>);
}

export default Routes;