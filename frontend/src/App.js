import React, { Component } from 'react';

import './App.css';
// import LoginPage from './containers/LoginPage/LoginPage';
import ProfilePage from './containers/ProfilePage/ProfilePage'

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <LoginPage /> */}
       
       <ProfilePage/>

     
      </div>
    );
  }
}

export default App;
