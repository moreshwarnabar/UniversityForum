import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './LoginPage.module.css';
import logo from '../../resources/images/logo.png';
import Login from '../../components/Login/Login';
import * as actions from '../../store/actions/creators/login';
import * as formConfigs from '../../config/formConfigs';

class LoginPage extends Component {
  state = {
    formData: {
      username: { value: '', isValid: false },
      password: { value: '', isValid: false },
    },
    formErrors: null,
    isFormValid: false,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    const updatedLoginData = formConfigs.changeValue(
      { ...this.state.formData },
      name,
      value
    );

    this.setState({ formData: updatedLoginData });
  };

  onBlurHandler = event => {
    const { name } = event.target;
    const validationResult = formConfigs.validateField(name, this.state);
    this.setState({ ...validationResult });
  };

  LoginHandler = event => {
    event.preventDefault();
    const result = formConfigs.validateFormBeforeSubmit(this.state);

    if (!result.isFormValid) {
      this.setState({ ...result });
      return;
    }

    const data = formConfigs.dataFactory(this.state.formData);

    this.props.userLogin(data);
  };

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
            data={this.state.formData}
            submit={this.LoginHandler}
            formErrors={this.state.formErrors}
            blur={this.onBlurHandler}
            loading={this.props.isFetching}
          />

          <div className="mt-3 w-100 d-flex flex-column align-items-center justify-content-center">
            {this.props.error ? (
              <p className="text-danger" style={{ fontSize: '14px' }}>
                {this.props.error.data.errorDetails}
              </p>
            ) : null}
            <small className="text-muted">
              <a className="text-muted mr-1" href="/">
                About
              </a>
              |
              <a className="text-muted ml-1" href="/">
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
    ...state.login,
    isError: state.networkError.isError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: loginData => dispatch(actions.authenticateUser(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
