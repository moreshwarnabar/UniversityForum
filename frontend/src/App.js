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
import AuthRoute from './components/AuthRoute/AuthRoute';

class App extends Component {
  render() {
    return (
      <div className="container-fluid px-0 App">
        <NetworkError />

        <Switch>
          <AuthRoute path="/admin" component={AdminPage} />
          <AuthRoute path="/profile" component={ProfilePage} />
          <AuthRoute path="/categories" component={CategoryPage} />
          <AuthRoute path="/questions" component={QuestionsPage} />
          <AuthRoute path="/answers" component={AnswersPage} />
          <Route
            path="/"
            exact
            render={() => <AuthRoute path="/" component={LoginPage} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
