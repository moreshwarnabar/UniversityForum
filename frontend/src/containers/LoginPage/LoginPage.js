import React, { Component } from 'react';

import styles from './LoginPage.module.css';
import Login from '../../components/Login/Login';

class LoginPage extends Component {
  render() {
    return (
      <div
        className={
          styles.LoginPage + ' d-flex justify-content-center align-items-center'
        }
      >
        <Login />
      </div>
    );
  }
}

export default LoginPage;
