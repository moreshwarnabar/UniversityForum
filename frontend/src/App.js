import React, { Component } from 'react';

import './App.css';
// import LoginPage from './containers/LoginPage/LoginPage';
import AdminPage from './containers/AdminPage/AdminPage';

class App extends Component {
  render() {
    return (
      <div
        className="container-fluid App"
        style={{
          backgroundColor: '#FBAB7E',
          backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
        }}
      >
        {/* <LoginPage /> */}
        <AdminPage />
      </div>
    );
  }
}

export default App;
