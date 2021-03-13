import React from 'react';

const registrationForm = props => (
  <form className="">
    <div className="form-row">
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="fname">
          First Name
        </label>
        <input
          className="form-control form-control-sm"
          id="fname"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={props.changed}
          value={props.firstName}
        />
      </div>
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="lname">
          Last Name
        </label>
        <input
          className="form-control form-control-sm"
          id="lname"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={props.changed}
          value={props.lastName}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-6">
        <p style={{ fontSize: '13px' }}>Gender</p>
        <div>
          {props.radio.map(choice => (
            <div key={choice.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                {...choice}
                onChange={props.changed}
              />
              <label
                className="form-check-label"
                style={{ fontSize: '13px' }}
                htmlFor={choice.id}
              >
                {choice.id[0].toUpperCase() + choice.id.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="form-group col-6">
        <label style={{ fontSize: '13px' }} htmlFor="dob">
          Date of Birth
        </label>
        <input
          className="form-control form-control-sm"
          id="dob"
          type="date"
          name="dateOfBirth"
          onChange={props.changed}
          value={props.dateOfBirth}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-6">
        <label style={{ fontSize: '13px' }} htmlFor="uname">
          Username
        </label>
        <input
          className="form-control form-control-sm"
          id="uname"
          type="email"
          name="username"
          placeholder="Username"
          onChange={props.changed}
          value={props.username}
        />
      </div>
      <div className="form-group col-6">
        <label style={{ fontSize: '13px' }} htmlFor="pwd">
          Password
        </label>
        <input
          className="form-control form-control-sm"
          id="pwd"
          type="password"
          name="password"
          placeholder="Password"
          onChange={props.changed}
          value={props.password}
        />
      </div>
    </div>
    <div className="form-row justify-content-between pr-2">
      <div className="form-group col-6">
        <label style={{ fontSize: '13px' }} htmlFor="role">
          Role
        </label>
        <select
          className="form-control form-control-sm"
          id="role"
          name="role"
          onChange={props.changed}
          value={props.role}
        >
          {props.option.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-secondary align-self-center">Register</button>
    </div>
  </form>
);

export default registrationForm;
