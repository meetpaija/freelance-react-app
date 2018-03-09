import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import ViewData from './components/ViewData';

class App extends Component {
  render() {
    return (
      <Login />
    );
  }
}

export default App;
