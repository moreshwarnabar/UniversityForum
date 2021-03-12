import React, { Component } from 'react';

import './App.css';
import LoginPage from './containers/LoginPage/LoginPage';
import UserRegistration from './components/Admin/UserRegistration/UserRegistration';

class App extends Component {
  render() {
    return (
      <div className="container-fluid App">
        {/* <LoginPage /> */}
        <UserRegistration />
      </div>
    );
  }
}

export default App;
