import React from 'react';

const registrationForm = props => (
  <form className="w-100">
    <div className="form-row">
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="fname">
          First Name
        </label>
        <input
          className={`form-control form-control-sm ${
            props.formErrors?.firstName ? 'is-invalid' : null
          }`}
          id="fname"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={props.changed}
          value={props.firstName.value}
          onBlur={props.blur}
        />
        <div className="invalid-feedback">{props.formErrors?.firstName}</div>
      </div>
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="lname">
          Last Name
        </label>
        <input
          className={`form-control form-control-sm ${
            props.formErrors?.lastName ? 'is-invalid' : null
          }`}
          id="lname"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={props.changed}
          value={props.lastName.value}
          onBlur={props.blur}
        />
        <div className="invalid-feedback">{props.formErrors?.lastName}</div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <p style={{ fontSize: '13px' }}>Gender</p>
        <div
          className={`form-control form-control-sm p-0 border-0 ${
            props.formErrors?.gender && !props.gender.isValid
              ? 'is-invalid'
              : null
          }`}
        >
          {props.radio.map(choice => (
            <div key={choice.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                {...choice}
                checked={props.gender.value === choice.value}
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
        <div className="invalid-feedback">{props.formErrors?.gender}</div>
      </div>
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="dob">
          Date of Birth
        </label>
        <input
          className={`form-control form-control-sm ${
            props.formErrors?.dateOfBirth ? 'is-invalid' : null
          }`}
          id="dob"
          type="date"
          name="dateOfBirth"
          onChange={props.changed}
          value={props.dateOfBirth.value}
          onBlur={props.blur}
        />
        <div className="invalid-feedback">{props.formErrors?.dateOfBirth}</div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="uname">
          Username
        </label>
        <input
          className={`form-control form-control-sm ${
            props.formErrors?.username ? 'is-invalid' : null
          }`}
          id="uname"
          type="email"
          name="username"
          placeholder="Username"
          onChange={props.changed}
          value={props.username.value}
          onBlur={props.blur}
        />
        <div className="invalid-feedback">{props.formErrors?.username}</div>
      </div>
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="pwd">
          Password
        </label>
        <input
          className={`form-control form-control-sm ${
            props.formErrors?.password ? 'is-invalid' : null
          }`}
          id="pwd"
          type="password"
          name="password"
          placeholder="Password"
          onChange={props.changed}
          value={props.password.value}
          onBlur={props.blur}
        />
        <div className="invalid-feedback">{props.formErrors?.password}</div>
      </div>
    </div>
    <div className="form-row justify-content-between align-items-center pr-md-2">
      <div className="form-group col-md-6">
        <label style={{ fontSize: '13px' }} htmlFor="role">
          Role
        </label>
        <select
          className={`form-control form-control-sm ${
            props.formErrors?.role ? 'is-invalid' : null
          }`}
          id="role"
          name="role"
          onChange={props.changed}
          value={props.role.value}
          onBlur={props.blur}
        >
          {props.option.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{props.formErrors?.role}</div>
      </div>
      <div>
        <button
          className="mr-2 btn btn-secondary align-self-center"
          onClick={props.reset}
        >
          Reset
        </button>
        <button
          className="ml-2 btn btn-secondary align-self-center"
          onClick={props.submit}
        >
          Register
        </button>
      </div>
    </div>
  </form>
);

export default registrationForm;
