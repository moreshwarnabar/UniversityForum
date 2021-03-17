import React, { Component } from 'react';
import axios from 'axios'

import styles from './LoginPage.module.css';
import Login from '../../components/Login/Login';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    user: null,
  };

  UsernameChangedHandler = event =>
    this.setState({ username: event.target.value });

  PasswordChangedHandler = event =>
    this.setState({ password: event.target.value });

  LoginHandler = event => {
    event.preventDefault();
    axios
      .get(
        `http://localhost:8080/forum/users/${this.state.username}/${this.state.password}`
      )
      .then(response => {
        this.setState({ user: response.data });
      });

    // if (this.state.user.role === 'ADMIN') {
    //   this.props.history.push('/admin');
    // }
  };

  render() {
    return (
      <div
        className={
          styles.LoginPage + ' d-flex justify-content-center align-items-center'
        }
      >
        <Login
          username={this.UsernameChangedHandler}
          password={this.PasswordChangedHandler}
          value={this.state}
          submit={this.LoginHandler}
        />
      </div>
    );
  }
}

export default LoginPage;
