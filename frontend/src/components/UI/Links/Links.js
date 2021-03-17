import React from 'react';
import { NavLink } from 'react-router-dom';

const links = props => (
  <div className="position-relative bg-light w-100 align-self-start" style={{top: '56px'}}>
    <ul className="nav nav-tabs nav-fill">
      {props.links.map(({ goTo, label }) => (
        <li key={goTo} className="nav-item">
          <NavLink
            to={`${props.url}${goTo}`}
            exact
            activeClassName="active"
            className="nav-link"
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </div>
);

export default links;
