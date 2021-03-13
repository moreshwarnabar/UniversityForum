import React, { Component } from 'react';

import * as factories from '../../../configurations/FormFields/formFields';
import Input from '../../UI/Input/Input';

class UserRegistration extends Component {
  state = {
    firstName: factories.inputFactory('First Name', {
      id: 'fname',
      type: 'text',
      name: 'firstName',
      placeholder: 'First Name',
    }),
    lastName: factories.inputFactory('Last Name', {
      id: 'lname',
      type: 'text',
      name: 'lastName',
      placeholder: 'Last Name',
    }),
    gender: factories.radioFactory('Gender', [
      { label: 'Male', id: 'male', value: 'male' },
      { label: 'Female', id: 'female', value: 'female' },
      { label: 'Other', id: 'other', value: 'other' },
    ]),
    dateOfBirth: factories.inputFactory('Date of Birth', {
      id: 'dob',
      type: 'date',
      name: 'dateOfBirth',
    }),
    username: factories.inputFactory('Username', {
      id: 'uname',
      type: 'text',
      name: 'username',
      placeholder: 'Username',
    }),
    password: factories.inputFactory('Password', {
      id: 'pwd',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
    }),
    role: factories.selectFactory('Role', [
      { value: '', displayValue: 'Choose a Role' },
      { value: 'ADMIN', displayValue: 'Admin' },
      { value: 'STUDENT', displayValue: 'Student' },
      { value: 'FACULTY', displayValue: 'Faculty' },
    ]),
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: { ...this.state[name], value } });
  };

  render() {
    const inputs = [];
    for (let [key, value] of Object.entries(this.state)) {
      inputs.push(
        <Input key={key} changed={this.valueChangedHandler} {...value} />
      );
    }
    return (
      <div className="row">
        <div className="col-lg-6 d-flex flex-wrap justify-content-between">
          {inputs}
        </div>
      </div>
    );
  }
}

export default UserRegistration;
