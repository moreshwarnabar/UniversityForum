import React from 'react';

import LoginForm from './LoginForm/LoginForm';
import Spinner from '../UI/Spinner/Spinner';

const login = props => {
  return (
    <div className="col">
      <p className="text-muted border-bottom">Login</p>
      <div className="d-flex justify-content-center align-items-center">
        {props.loading ? (
          <Spinner loading={props.loading} size={150} />
        ) : (
          <LoginForm
            {...props.data}
            changed={props.change}
            submit={props.submit}
            formErrors={props.formErrors}
            blur={props.blur}
          />
        )}
      </div>
    </div>
  );
};

export default login;
