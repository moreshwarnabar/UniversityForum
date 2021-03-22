import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import LoginPage from './containers/LoginPage/LoginPage';
import CategoryPage from './containers/CategoryPage/CategoryPage';
import AdminPage from './containers/AdminPage/AdminPage';
import QuestionsPage from './containers/QuestionsPage/QuestionsPage';
import AnswersPage from './containers/AnswersPage/AnswersPage';
import NetworkError from './components/NetworkError/NetworkError';

class App extends Component {
  render() {
    return (
      <div className="container-fluid px-0 App">
        <NetworkError />

        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/categories" component={CategoryPage} />
          <Route path="/questions" component={QuestionsPage} />
          <Route path="/answers" component={AnswersPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
