import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import * as validators from '../../../../validation/validation';
import * as userActions from '../../../../store/actions/actions';

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
    isFormValid: false,
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
    this.setState({
      formData: this.resetForm(),
      formErrors: null,
      isFormValid: false,
    });
    this.props.onReset();
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

    const data = {};
    for (let [key, { value }] of Object.entries(formData)) {
      data[key] = value;
    }

    this.props.onSubmit(data);
  };

  showRegistrationFormHandler = () => {
    this.props.onShow();
  };

  render() {
    const successMessage = this.props.isSuccess ? (
      <p className="text-success mb-3">Successfully Registered User</p>
    ) : null;

    return this.props.isRegisteringUser ? (
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
        {this.state.isFormValid ? (
          <div>
            <p className="text-danger text-center" style={{ fontSize: '14px' }}>
              {this.props.errors}
            </p>
          </div>
        ) : null}
      </div>
    ) : (
      <div
        className="d-flex flex-column justify-content-center align-items-center bg-light border rounded shadow-lg"
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

const mapStateToProps = state => ({
  ...state.userRegistration,
});

const mapDispatchToProps = dispatch => ({
  onShow: () => dispatch(userActions.showUserForm()),
  onReset: () => dispatch(userActions.resetUserForm()),
  onSubmit: data => dispatch(userActions.userRegistration(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
