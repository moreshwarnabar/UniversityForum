import React, { Component } from 'react';
import axios from 'axios';

import styles from './LoginPage.module.css';
import logo from '../../resources/images/logo.png';
import Login from '../../components/Login/Login';

class LoginPage extends Component {
  state = {
    user: null,
  };

  LoginHandler = (event, username, password) => {
    console.log(username, password);
    event.preventDefault();
    axios
      .get(`http://localhost:8080/forum/users/${username}/${password}`)
      .then(response => {
        console.log(response.data);
        this.setState({ user: response.data.result });
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
        <div
          className="p-3 d-flex flex-column flex-sm-row flex-wrap bg-light rounded shadow"
          style={{ opacity: '0.9' }}
        >
          <div className="col d-flex align-items-center justify-content-center border-right">
            <img src={logo} alt="" />
          </div>

          <Login
            change={this.valueChangedHandler}
            data={this.state.loginData}
            submit={this.LoginHandler}
          />

          <div className="mt-3 w-100 d-flex justify-content-center">
            <small className="text-muted">
              <a className="text-muted mr-1" href="about">
                About
              </a>
              |
              <a className="text-muted ml-1" href="contact">
                Contact Us
              </a>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
