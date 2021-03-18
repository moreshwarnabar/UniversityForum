import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ProfilePage from './containers/ProfilePage/ProfilePage'
import LoginPage from './containers/LoginPage/LoginPage';
import AdminPage from './containers/AdminPage/AdminPage';

class App extends Component {
  render() {
    return (
      <div className="container-fluid px-0 App">
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    );
  }
} 

export default App;
