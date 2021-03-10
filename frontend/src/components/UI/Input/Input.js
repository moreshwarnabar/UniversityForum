import React from 'react';

const input = props => (
  <div className="form-group">
    <label style={{ fontSize: '13px' }} htmlFor={props.name}>
      {props.label}
    </label>
    <input
      type={props.type}
      className="form-control"
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
    />
  </div>
);

export default input;
