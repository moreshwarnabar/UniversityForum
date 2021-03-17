import React from 'react';

const loginForm = props => (
  <form>
    <div className="form-group">
      <label style={{ fontSize: '13px' }} htmlFor="uname">
        Username
      </label>
      <input
        className={`form-control form-control-sm ${
          props.errors?.username ? 'is-invalid' : null
        }`}
        id="uname"
        name="username"
        type="email"
        placeholder="Your username"
        onChange={props.changed}
        value={props.username}
      />
      <div className="invalid-feedback">{props.errors?.username}</div>
    </div>
    <div className="form-group">
      <label style={{ fontSize: '13px' }} htmlFor="pwd">
        Password
      </label>
      <input
        className={`form-control form-control-sm ${
          props.errors?.password ? 'is-invalid' : null
        }`}
        id="pwd"
        name="password"
        type="password"
        placeholder="Your password"
        onChange={props.changed}
        value={props.password}
      />
      <div className="invalid-feedback">{props.errors?.password}</div>
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <small className="text-muted">Forgot Password?</small>
      <button className="btn btn-secondary rounded-pill" onClick={props.submit}>
        Login
      </button>
    </div>
  </form>
);

export default loginForm;
