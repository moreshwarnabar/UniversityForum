import React, { Component } from 'react';

import LoginForm from './LoginForm/LoginForm';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="col">
        <p className="text-muted border-bottom">Login</p>
        <div className="">
          <LoginForm
            {...this.state}
            changed={this.valueChangedHandler}
            submit={this.props.submit}
          />
        </div>
      </div>
    );
  }
}

export default Login;
