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
          <AuthRoute path="/admin" component={AdminPage} test={1} />
          <AuthRoute path="/profile" component={ProfilePage} test={2} />
          <AuthRoute path="/categories" component={CategoryPage} test={3} />
          <AuthRoute path="/questions" component={QuestionsPage} test={4} />
          <AuthRoute path="/answers" component={AnswersPage} test={5} />
          {/* <AuthRoute path="/" component={LoginPage} test={16} /> */}
          <Route
            path="/"
            render={() => <AuthRoute path="/" component={LoginPage} test={7} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
