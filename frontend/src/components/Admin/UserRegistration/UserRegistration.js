import React, { Component } from 'react';

import RegistrationForm from './RegistrationForm/RegistrationForm';

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
      { id: 'male', name: 'gender', value: 'male' },
      { id: 'female', name: 'gender', value: 'female' },
      { id: 'other', name: 'gender', value: 'other' },
    ],
    selectOptions: [
      { value: '', displayValue: 'Choose a Role' },
      { value: 'ADMIN', displayValue: 'Admin' },
      { value: 'STUDENT', displayValue: 'Student' },
      { value: 'FACULTY', displayValue: 'Faculty' },
    ],
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    const updatedFormData = { ...this.state.formData, [name]: value };
    this.setState({ formData: updatedFormData });
  };

  render() {
    return (
      <div className="p-2 border rounded shadow">
        <div className="pl-2 w-100">
          <h3>User Registration</h3>
        </div>
        <div className="p-1 border-top">
          <RegistrationForm
            {...this.state.formData}
            radio={this.state.radioChoices}
            option={this.state.selectOptions}
            changed={this.valueChangedHandler}
          />
        </div>
      </div>
    );
  }
}

export default UserRegistration;
