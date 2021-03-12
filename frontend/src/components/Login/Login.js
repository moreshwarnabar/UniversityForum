import React, { Component } from 'react';

import Input from '../UI/Input/Input';

class Login extends Component {
  state = {
    username: {
      elementType: 'input',
      label: 'Username',
      value: '',
      config: {
        type: 'text',
        id: 'username',
        placeholder: 'Your username',
        name: 'username',
      },
    },
    password: {
      elementType: 'input',
      label: 'Password',
      value: '',
      config: {
        type: 'password',
        id: 'password',
        placeholder: 'Your password',
        name: 'password',
      },
    },
  };

  valueChangedHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: { ...this.state[name], value } });
  };

  render() {
    const inputs = [];
    for (let [key, data] of Object.entries(this.state)) {
      inputs.push(
        <Input
          key={key}
          label={data.label}
          elementType={data.elementType}
          config={data.config}
          changed={this.valueChangedHandler}
          value={data.value}
        />
      );
    }

    return (
      <div className="col">
        <p className="text-muted border-bottom">Login</p>
        {inputs}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Forgot Password?</small>
          <button
            className="btn btn-secondary rounded-pill"
            onClick={event =>
              this.props.submit(
                event,
                this.state.username.value,
                this.state.password.value
              )
            }
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
