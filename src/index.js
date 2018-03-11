import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import { Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
import '../src/assets/css/sideBarMenu.css'
import '../src/assets/css/customCss.css'

const customHistory = createBrowserHistory();


ReactDOM.render(
    <Router history={customHistory}>
        <Routes />
    </Router>, document.getElementById('root'));
registerServiceWorker();
