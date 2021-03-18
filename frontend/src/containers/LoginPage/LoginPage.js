import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './LoginPage.module.css';
import logo from '../../resources/images/logo.png';
import Login from '../../components/Login/Login';
import * as actions from '../../store/actions/actions';
import * as validators from '../../validation/validation';

class LoginPage extends Component {
  state = {
    loginData: {
      username: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    formErrors: null,
    isFormValid: false,
    isTouched: false,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    const updatedLoginData = { ...this.state.loginData };
    const updatedElData = {
      ...updatedLoginData[name],
      value,
    };
    updatedLoginData[name] = updatedElData;

    this.setState({ loginData: updatedLoginData });
  };

  onBlurHandler = event => {
    const { name } = event.target;
    const { formErrors, loginData } = this.state;

    const result = validators[`${name}Validation`]({ ...loginData[name] });
    const validatedLoginData = { ...loginData, [name]: result[name] };
    const updatedFormErrors = { ...formErrors, [name]: result.errorMsg };

    // check if valid detail
    let isFormValid = true;
    Object.values(validatedLoginData).forEach(
      ({ isValid }) => (isFormValid = isFormValid && isValid)
    );

    this.setState({
      loginData: validatedLoginData,
      formErrors: updatedFormErrors,
      isFormValid,
    });
  };

  LoginHandler = event => {
    event.preventDefault();
    const { loginData } = this.state;
    if (this.state.isFormValid) this.props.userLogin(loginData);
  };

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      const nextPath =
        this.props.user.role === 'ADMIN' ? 'admin' : 'categories';
      console.log(nextPath);
      this.props.history.push(`/${nextPath}`);
    }
  }

  render() {
    return (
      <div
        className={`min-vh-100 d-flex justify-content-center align-items-center ${styles.LoginPage}`}
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
            formErrors={this.state.formErrors}
            blur={this.onBlurHandler}
          />

          <div className="mt-3 w-100 d-flex flex-column align-items-center justify-content-center">
            <p className="text-danger" style={{ fontSize: '14px' }}>
              {this.props.error}
            </p>
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

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: loginData => dispatch(actions.authenticateUser(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
