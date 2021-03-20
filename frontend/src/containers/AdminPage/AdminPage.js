import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../components/UI/Navbar/Navbar';
import Registrations from '../../components/Admin/Registrations/Registrations';
import ListUsers from '../../components/Admin/ListUsers/ListUsers';
import ReportedAnswers from '../../components/Admin/ReportedAnswers/ReportedAnswers';
import Links from '../../components/UI/Links/Links';
import { logoutUser } from '../../store/actions/creators/login';

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

  componentDidMount() {
    if (!this.props.user) this.props.history.replace('/');
  }

  render() {
    return (
      <React.Fragment>
        <Navbar logout={this.logoutHandler} />
        <div className="container pt-2 bg-light min-vh-100 d-flex flex-wrap justify-content-center">
          <Links links={this.state.linkData} url={this.props.match.url} />
          <Switch>
            <Route path="/admin/users" component={ListUsers} />
            <Route path="/admin/answers" component={ReportedAnswers} />
            <Route path="/admin" component={Registrations} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
