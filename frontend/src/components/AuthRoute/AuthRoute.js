import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from '../../containers/LoginPage/LoginPage';
import authorizer from '../../config/auth';

const authRoute = props => {
  if (props.isLoggedIn) {
    const {
      user: { role },
      path,
      component: Component,
    } = props;

    return authorizer.isAuthorized(role, path) ? (
      <Route path={path} component={Component} />
    ) : (
      <Redirect to={authorizer.baseRoute(role)} />
    );
  } else {
    return <LoginPage />;
  }
};

const mapStateToProps = state => ({
  user: state.login.user,
  isLoggedIn: state.login.isLoggedIn,
});

export default connect(mapStateToProps)(authRoute);
