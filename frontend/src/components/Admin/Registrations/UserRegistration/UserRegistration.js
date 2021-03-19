import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import * as userActions from '../../../../store/actions/actions';
import * as formConfigs from '../../../../config/formConfigs';

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

    const updatedFormData = formConfigs.changeValue(
      { ...this.state.formData },
      name,
      value
    );

    this.setState({ formData: updatedFormData });
  };

  onBlurHandler = event => {
    const { name } = event.target;
    const validationResult = formConfigs.validateField(name, this.state);
    this.setState({ ...validationResult });
  };

  resetFormHandler = event => {
    event.preventDefault();
    this.setState({
      formData: formConfigs.resetForm(this.state.formData),
      formErrors: null,
      isFormValid: false,
    });
    this.props.onReset();
  };

  registerUserHandler = event => {
    event.preventDefault();

    const result = formConfigs.validateFormBeforeSubmit(this.state);

    if (!result.isFormValid) {
      this.setState({ ...result });
      return;
    }

    const data = formConfigs.dataFactory(this.state.formData);

    this.props.onSubmit(data);
    this.setState({ formData: this.resetForm() });
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
          onClick={() => this.props.onShow()}
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
