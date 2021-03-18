import React, { Component } from 'react';
import axios from 'axios';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import * as validators from '../../../../validation/validation';

class UserRegistration extends Component {
  state = {
    formData: {
      firstName: { value: '', isValid: false },
      lastName: { value: '', isValid: false },
      gender: { value: '', isValid: false },
      dateOfBirth: { value: '', isValid: false },
      username: { value: '', isValid: false },
      password: { value: '', isValid: false },
      role: { value: '', isValid: false },
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
    formErrors: null,
    isRegisteringUser: false,
    isFormValid: false,
    success: false,
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    const updatedFormData = { ...this.state.formData };
    const updatedElData = {
      value,
      isValid: name === 'gender',
    };
    updatedFormData[name] = updatedElData;

    this.setState({ formData: updatedFormData });
  };

  onBlurHandler = event => {
    const { name } = event.target;
    const { formErrors, formData } = this.state;
    const validationResult = this.validateField(name, formErrors, formData);
    this.setState({ ...validationResult });
  };

  validateField = (name, formErrors, formData) => {
    const result = validators[`${name}Validation`]({ ...formData[name] });
    const validatedFormData = { ...formData, [name]: result[name] };
    const updatedFormErrors = { ...formErrors, [name]: result.errorMsg };

    // check if valid detail
    const isFormValid = this.checkFormValidity(validatedFormData);

    return {
      formData: validatedFormData,
      formErrors: updatedFormErrors,
      isFormValid,
    };
  };

  checkFormValidity = formData => {
    return Object.values(formData).every(({ isValid }) => isValid);
  };

  resetForm = () => {
    const resetFormData = {};
    Object.keys(this.state.formData).forEach(
      key => (resetFormData[key] = { value: '', isValid: false })
    );
    return resetFormData;
  };

  resetFormHandler = event => {
    event.preventDefault();
    this.setState({ formData: this.resetForm(), formErrors: null });
  };

  registerUserHandler = event => {
    event.preventDefault();
    const { formData, formErrors } = this.state;
    const finalFormErrors = {},
      updatedFormData = {};

    let isFormValid = true;
    Object.keys(formData).forEach(key => {
      const validationResult = this.validateField(key, formErrors, formData);
      finalFormErrors[key] = validationResult.formErrors[key];
      updatedFormData[key] = validationResult.formData[key];
      isFormValid = validationResult.isFormValid;
    });

    if (!isFormValid) {
      this.setState({
        formData: updatedFormData,
        formErrors: finalFormErrors,
        isFormValid,
      });
      return;
    }

    console.log('is form valid: ', isFormValid);
    const data = {};
    for (let [key, { value }] of Object.entries(formData)) {
      data[key] = value;
    }

    console.log(data);

    axios
      .post('http://localhost:8080/forum/users', data)
      .then(response => {
        this.setState({
          formData: this.resetForm(),
          isRegisteringUser: false,
          success: true,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.setState({
          errors: response.data.errorMessage,
        });
      });
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
            formErrors={this.state.formErrors}
            blur={this.onBlurHandler}
            isFormValid={this.state.isFormValid}
          />
        </div>
        <div>
          <p className="text-danger text-center" style={{ fontSize: '14px' }}>
            {this.state.errors}
          </p>
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
