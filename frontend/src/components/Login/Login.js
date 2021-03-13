import React, { Component } from 'react';

import LoginForm from './LoginForm/LoginForm';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="col">
        <p className="text-muted border-bottom">Login</p>
        <div className="">
          <LoginForm value={this.state} changed={this.valueChangedHandler} />
        </div>
      </div>
    );
  }
}

export default Login;
