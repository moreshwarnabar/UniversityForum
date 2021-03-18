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
        errors={props.errors}
      />
    </div>
  </div>
);

export default login;
