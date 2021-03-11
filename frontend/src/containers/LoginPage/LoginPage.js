import React, { Component } from 'react';
import axios from 'axios';

import styles from './LoginPage.module.css';
import Login from '../../components/Login/Login';

class LoginPage extends Component {
  state = {
    loginData: {
      username: {
        elementType: 'input',
        label: 'Username',
        value: '',
        config: {
          type: 'text',
          id: 'username',
          placeholder: 'Your username',
          name: 'username',
        },
      },
      password: {
        elementType: 'input',
        label: 'Password',
        value: '',
        config: {
          type: 'password',
          id: 'password',
          placeholder: 'Your password',
          name: 'password',
        },
      },
    },
    user: null,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    const updatedLoginData = { ...this.state.loginData };
    updatedLoginData[name].value = value;
    
    this.setState({ loginData: updatedLoginData });
  };

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
          change={this.valueChangedHandler}
          data={this.state.loginData}
          submit={this.LoginHandler}
        />
      </div>
    );
  }
}

export default LoginPage;
