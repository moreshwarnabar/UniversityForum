import React from 'react';

const input = props => {
  switch (props.elementType) {
    case 'input':
      return (
        <div className="form-group">
          <label style={{ fontSize: '13px' }} htmlFor={props.config.id}>
            {props.label}
          </label>
          <input
            className="form-control"
            {...props.config}
            onChange={props.changed}
            value={props.value}
          />
        </div>
      );

    default:
      break;
  }
};

export default input;
