import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import LoginPage from './containers/LoginPage/LoginPage';
import CategoryPage from './containers/CategoryPage/CategoryPage';
import AdminPage from './containers/AdminPage/AdminPage';
import QuestionsPage from './containers/QuestionsPage/QuestionsPage';

class App extends Component {
  render() {
    return (
      <div className="container-fluid px-0 App">
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/categories/:name" component={QuestionsPage} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
        {/* <QuestionsPage /> */}
        {/* <CategoryPage /> */}
      </div>
    );
  }
}

export default App;
