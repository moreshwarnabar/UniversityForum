import React, { Component } from 'react';
import axios from 'axios';

import styles from './LoginPage.module.css';
import logo from '../../resources/images/logo.png';
import Login from '../../components/Login/Login';
import { validateLogin } from '../../validation/validation';

class LoginPage extends Component {
  state = {
    user: null,
    formData: {
      username: '',
      password: '',
    },
    errors: null,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    const updatedFormData = { ...this.state.formData, [name]: value };
    this.setState({ formData: updatedFormData });
  };

  LoginHandler = event => {
    event.preventDefault();
    const {
      formData: { username, password },
    } = this.state;

    const errors = validateLogin({ username, password });
    if (Object.keys(errors).length) {
      console.log(errors);
      this.setState({ errors });
      return;
    }

    axios
      .get(`http://localhost:8080/forum/users/single/${username}/${password}`)
      .then(response => {
        const user = response.data.result;
        console.log(user);
        this.setState({ user, errors: null });
        if (user.role === 'ADMIN') {
          this.props.history.push('/admin');
        }
      });
  };

  render() {
    return (
      <div
        className={`position-relative min-vh-100 d-flex justify-content-center align-items-center ${styles.LoginPage}`}
        style={{ top: '56px' }}
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
            data={this.state.formData}
            submit={this.LoginHandler}
            errors={this.state.errors}
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
