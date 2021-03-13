import React from 'react';

const categoryForm = props => (
  <form>
    <div className="form-group">
      <label style={{ fontSize: '13px' }} htmlFor="name">
        Name
      </label>
      <input
      className="form-control"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={props.name}
        onChange={props.changed}
      />
    </div>
    <div className="form-group">
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
    <button className="btn btn-secondary">Create</button>
  </form>
);

export default categoryForm;
