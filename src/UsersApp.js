import React, { Component } from 'react';
import './App.css';

import Users from './components/Users';

class UsersApp extends Component {
  render() {
    return (
      <div className="App">
        <Users />
      </div>
    );
  }
}

export default UsersApp;
