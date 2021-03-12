import React from 'react';

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <React.Fragment>
          <label style={{ fontSize: '13px' }} htmlFor={props.config.id}>
            {props.label}
          </label>
          <input
            className="form-control form-control-sm"
            {...props.config}
            onChange={props.changed}
            value={props.value}
          />
        </React.Fragment>
      );
      break;

    case 'radio':
      const radios = props.config.map(ch => (
        <div key={ch.id} className="form-check form-check-inline">
          <input
            className="form-check-label"
            type="radio"
            name={props.name}
            id={ch.id}
            value={ch.value}
          />
          <label
            className="ml-1 form-check-label"
            style={{ fontSize: '13px' }}
            htmlFor={ch.id}
          >
            {ch.label}
          </label>
        </div>
      ));

      inputElement = (
        <React.Fragment>
          <p style={{ marginBottom: '4px', fontSize: '13px' }}>{props.group}</p>
          {radios}
        </React.Fragment>
      );
      break;

    case 'select':
      const options = props.config.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.displayValue}
        </option>
      ));

      inputElement = (
        <React.Fragment>
          <label style={{ fontSize: '13px' }} htmlFor={props.id}>
            {props.label}
          </label>
          <select
            className="form-control form-control-sm"
            name={props.name}
            id={props.id}
            value={props.value}
            onChange={props.changed}
          >
            {options}
          </select>
        </React.Fragment>
      );
      break;

    default:
      break;
  }

  return <div className="form-group col-md-6">{inputElement}</div>;
};

export default input;
