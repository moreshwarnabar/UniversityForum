import React, { Component } from 'react';

import './App.css';
// import LoginPage from './containers/LoginPage/LoginPage';
import AdminPage from './containers/AdminPage/AdminPage';

class App extends Component {
  render() {
    return (
      <div className="container-fluid App">
        {/* <LoginPage /> */}
        <AdminPage />
      </div>
    );
  }
}

export default App;
