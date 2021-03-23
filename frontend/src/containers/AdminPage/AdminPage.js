import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../components/UI/Navbar/Navbar';
import Registrations from '../../components/Admin/Registrations/Registrations';
import ListUsers from '../../components/Admin/ListUsers/ListUsers';
import ReportedAnswers from '../../components/Admin/ReportedAnswers/ReportedAnswers';
import Links from '../../components/UI/Links/Links';
import { logoutUser } from '../../store/actions/creators/login';
import AuthRoute from '../../components/AuthRoute/AuthRoute';

class AdminPage extends Component {
  state = {
    linkData: [
      { goTo: '', label: 'Registrations' },
      { goTo: '/users', label: 'Users' },
      { goTo: '/answers', label: 'Answers' },
    ],
  };

  logoutHandler = () => {
    this.props.history.replace('/');
    this.props.onLogout();
  };

  render() {
    return (
      <React.Fragment>
        <Navbar logout={this.logoutHandler} />
        <div
          className="container pt-2 bg-light min-vh-100 d-flex flex-wrap justify-content-center"
          style={{ opacity: '0.8' }}
        >
          <Links links={this.state.linkData} url={this.props.match.url} />
          <Switch>
            <Route path="/admin/users" component={ListUsers} />
            <Route path="/admin/answers" component={ReportedAnswers} />
            <Route path="/admin" exact component={Registrations} />
            <AuthRoute path="" component={Registrations} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
