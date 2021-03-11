import React from 'react';

import logo from '../../resources/images/logo.png';
import Input from '../UI/Input/Input';

const login = props => {
  const inputs = [];
  for (let [key, data] of Object.entries(props.data)) {
    inputs.push(
      <Input
        key={key}
        label={data.label}
        elementType={data.elementType}
        config={data.config}
        changed={props.change}
        value={data.value}
      />
    );
  }

  return (
    <div
      className="p-3 d-flex flex-column flex-sm-row flex-wrap bg-light rounded shadow"
      style={{ opacity: '0.9' }}
    >
      <div className="col d-flex align-items-center justify-content-center border-right">
        <img src={logo} alt="" />
      </div>

      <div className="col">
        <p className="text-muted border-bottom">Login</p>
        {inputs}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Forgot Password?</small>
          <button
            className="btn btn-secondary rounded-pill"
            onClick={props.submit}
          >
            Login
          </button>
        </div>
      </div>

      <div className="mt-3 w-100 d-flex justify-content-center">
        <small className="text-muted">
          <a className="text-muted mr-1" href="about">
            About
          </a>
          |
          <a className="text-muted ml-1" href="contact">
            Contact Us
          </a>
        </small>
      </div>
    </div>
  );
};

export default login;
