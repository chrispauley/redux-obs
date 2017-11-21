import React, { Component } from 'react';
import './App.css';

import Stories from './components/Stories';
import UsersApp from './UsersApp'
import BeersApp from './BeersApp'

class App extends Component {
  render() {
    return (
      <div className="App">
        <UsersApp />

        <hr/>
        <Stories />

        <hr/>
        <div className='row'>
            <BeersApp />
        </div>
      </div>
    );
  }
}

export default App;
