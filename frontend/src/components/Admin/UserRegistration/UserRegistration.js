import React, { Component } from 'react';

import Input from '../../UI/Input/Input';

class UserRegistration extends Component {
  state = {
    firstName: {
      elementType: 'input',
      label: 'First Name',
      value: '',
      config: {
        id: 'fname',
        type: 'text',
        name: 'firstName',
        placeholder: 'First name',
      },
    },
    lastName: {
      elementType: 'input',
      label: 'Last Name',
      value: '',
      config: {
        id: 'lname',
        type: 'text',
        name: 'lastName',
        placeholder: 'Last name',
      },
    },
    gender: {
      elementType: 'radio',
      group: 'Gender',
      name: 'gender',
      config: [
        { label: 'Male', id: 'male', value: 'male' },
        { label: 'Female', id: 'female', value: 'female' },
        { label: 'Other', id: 'other', value: 'other' },
      ],
    },
    dateOfBirth: {
      elementType: 'input',
      label: 'Date of Birth',
      value: '',
      config: {
        id: 'dob',
        type: 'date',
        name: 'dateOfBirth',
      },
    },
    username: {
      elementType: 'input',
      label: 'Username',
      value: '',
      config: {
        id: 'uname',
        type: 'email',
        name: 'username',
        placeholder: 'Your username',
      },
    },
    password: {
      elementType: 'input',
      label: 'Password',
      value: '',
      config: {
        id: 'pwd',
        type: 'password',
        name: 'password',
        placeholder: 'Your password',
      },
    },
    role: {
      elementType: 'select',
      label: 'Role',
      value: 'Choose a Role',
      id: 'role',
      name: 'role',
      config: [
        { value: '', displayValue: 'Choose a Role' },
        { value: 'ADMIN', displayValue: 'Admin' },
        { value: 'STUDENT', displayValue: 'Student' },
        { value: 'FACULTY', displayValue: 'Faculty' },
      ],
    },
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
