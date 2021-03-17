import React from 'react';

import LoginForm from './LoginForm/LoginForm';

const login = props => (
  <div className="col">
    <p className="text-muted border-bottom">Login</p>
    <div className="">
      <LoginForm
        {...props.data}
        changed={props.change}
        submit={props.submit}
        formErrors={props.formErrors}
        blur={props.blur}
      />
    </div>
  </div>
);

export default login;
