import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegistrationForm from './RegistrationForm/RegistrationForm';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../../store/actions/creators/userRegistrations';
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
    isSubmitted: false,
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
    this.setState({ isSubmitted: true });
  };

  componentDidUpdate() {
    const { isSubmitted, formData } = this.state;
    if (isSubmitted && this.props.isSuccess) {
      this.setState({
        formData: formConfigs.resetForm(formData),
        isSubmitted: false,
      });
    }
  }

  componentWillUnmount() {
    this.props.onHide();
  }

  render() {
    const successMessage = this.props.isSuccess ? (
      <p className="text-success mb-3">Successfully Registered User</p>
    ) : null;

    return this.props.isRegisteringUser ? (
      <div className="p-2 w-100 border rounded shadow bg-light">
        <div className="pl-2 w-100">
          <h3>User Registration</h3>
        </div>
        <div className="p-1 border-top d-flex justify-content-center align-items-center">
          {this.props.isFetching ? (
            <Spinner loading={true} size={300} />
          ) : (
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
          )}
        </div>
        {this.props.errors ? (
          <div>
            <p className="text-danger text-center" style={{ fontSize: '14px' }}>
              {this.props.errors.data.errorDetails}
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
  isError: state.networkError.isError,
});

const mapDispatchToProps = dispatch => ({
  onShow: () => dispatch(actions.showUserForm()),
  onHide: () => dispatch(actions.hideUserForm()),
  onReset: () => dispatch(actions.resetUserForm()),
  onSubmit: data => dispatch(actions.userRegistration(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
