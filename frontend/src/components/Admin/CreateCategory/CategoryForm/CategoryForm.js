import React from 'react';

const categoryForm = props => (
  <form>
    <div className="form-group">
      <label style={{ fontSize: '13px' }} htmlFor="name">
        Name
      </label>
      <input
        className={`form-control ${props.errors?.name ? 'is-invalid' : null}`}
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={props.name.value}
        onChange={props.changed}
        aria-describedby="nameValidation"
      />
      <div id="nameValidation" className="invalid-feedback">
        {props.errors?.name}
      </div>
    </div>
    <div className="form-group">
      <p style={{ fontSize: '13px' }} id="facultyAccess">
        Faculty Access
      </p>
      <div
        className={`form-control border-0 ${
          props.errors?.facultyAccess ? 'is-invalid' : null
        }`}
        aria-describedby="facultyAccessValidation"
      >
        {props.radio.map(choice => (
          <div key={choice.id} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              {...choice}
              checked={props.facultyAccess.value === choice.value}
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
      <div id="facultyAccessValidation" className="invalid-feedback">
        {props.errors?.facultyAccess}
      </div>
    </div>
    <button className="ml-1 btn btn-secondary" onClick={props.reset}>
      Reset
    </button>
    <button className="ml-3 btn btn-secondary" onClick={props.submit}>
      Create
    </button>
  </form>
);

export default categoryForm;
