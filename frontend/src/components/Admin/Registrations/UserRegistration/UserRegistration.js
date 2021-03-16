import React, { Component } from 'react';
import axios from 'axios';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import * as validations from '../../../../validation/validation';

class UserRegistration extends Component {
  state = {
    formData: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      username: '',
      password: '',
      role: '',
    },
    radioChoices: [
      { id: 'male', name: 'gender', value: 'MALE' },
      { id: 'female', name: 'gender', value: 'FEMALE' },
      { id: 'other', name: 'gender', value: 'OTHER' },
    ],
    selectOptions: [
      { value: '', displayValue: 'Choose a Role' },
      { value: 'ADMIN', displayValue: 'Admin' },
      { value: 'STUDENT', displayValue: 'Student' },
      { value: 'FACULTY', displayValue: 'Faculty' },
    ],
    errors: null,
    isRegisteringUser: false,
    success: false,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    const updatedFormData = { ...this.state.formData, [name]: value };
    this.setState({ formData: updatedFormData });
  };

  resetForm = () => {
    const resetFormData = {};
    Object.keys(this.state.formData).forEach(key => (resetFormData[key] = ''));
    return resetFormData;
  };

  resetFormHandler = event => {
    event.preventDefault();
    this.setState({ formData: this.resetForm(), errors: null });
  };

  registerUserHandler = event => {
    event.preventDefault();

    const errors = validations.validateUserRegistration(this.state.formData);

    if (errors) {
      this.setState({ errors });
    } else {
      axios
        .post('http://localhost:8080/forum/users', this.state.formData)
        .then(response => {
          this.setState({
            formData: this.resetForm(),
            isRegisteringUser: false,
            success: true,
          });
        });
    }
  };

  showRegistrationFormHandler = () => {
    this.setState({ isRegisteringUser: true, success: false });
  };

  render() {
    const successMessage = this.state.success ? (
      <p>Successfully Registered User</p>
    ) : null;

    return this.state.isRegisteringUser ? (
      <div className="p-2 w-100 border rounded shadow bg-light">
        <div className="pl-2 w-100">
          <h3>User Registration</h3>
        </div>
        <div className="p-1 border-top">
          <RegistrationForm
            {...this.state.formData}
            radio={this.state.radioChoices}
            option={this.state.selectOptions}
            changed={this.valueChangedHandler}
            reset={this.resetFormHandler}
            submit={this.registerUserHandler}
            errors={this.state.errors}
          />
        </div>
      </div>
    ) : (
      <div
        className="d-flex flex-column justify-content-around align-items-center bg-light border rounded shadow-lg"
        style={{ width: '100%' }}
      >
        {successMessage}
        <button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={this.showRegistrationFormHandler}
        >
          Register User
        </button>
      </div>
    );
  }
}

export default UserRegistration;
