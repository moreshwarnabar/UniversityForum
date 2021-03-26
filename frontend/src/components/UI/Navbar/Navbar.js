import React from 'react';
import * as RB from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../../store/actions/creators/login';
import { selectCategory } from '../../../store/actions/creators/category';
import * as actions from '../../../store/actions/creators/navbar';

const navbar = props => {
  return (
    <RB.Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      animation="false"
    >
      <RB.Navbar.Brand className="text-uppercase mr-2" href="#home">
        <h5 className="mb-0">University Forum</h5>
      </RB.Navbar.Brand>
      <RB.Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <RB.Navbar.Collapse
        id="responsive-navbar-nav"
        style={{
          justifyContent:
            props.user?.role === 'ADMIN' ? 'flex-end' : 'space-between',
        }}
      >
        {props.user?.role === 'ADMIN' ? null : (
          <RB.Nav className="mr-lg-5 ml-lg-3">
            <RB.Dropdown
              title="Category"
              id="collasible-nav-dropdown"
              show={props.show}
              onToggle={props.onToggle}
            >
              <RB.Dropdown.Toggle variant="dark" id="dropdown-basic">
                Category
              </RB.Dropdown.Toggle>
              <RB.Dropdown.Menu>
                {props.categories?.map(cat => (
                  <NavLink
                    to={`/questions`}
                    className="dropdown-item"
                    activeClassName=""
                    onClick={() => {
                      props.onToggle();
                      props.onSelectCategory(cat);
                    }}
                    key={cat.id}
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </RB.Dropdown.Menu>
            </RB.Dropdown>
          </RB.Nav>
        )}

        <RB.Nav className="ml-lg-5">
          {props.user?.role === 'ADMIN' ? (
            <button className="btn btn-sm btn-success" onClick={props.logout}>
              Logout
            </button>
          ) : (
            <RB.Dropdown>
              <RB.Dropdown.Toggle
                className="btn-sm"
                variant="success"
                id="dropdown-basic"
              >
                User Profile
              </RB.Dropdown.Toggle>

              <RB.Dropdown.Menu align="right">
                <NavLink
                  to="/profile"
                  className="dropdown-item"
                  activeClassName="active"
                >
                  View Profile
                </NavLink>
                <NavLink
                  to="/"
                  exact
                  className="dropdown-item"
                  activeClassName="active"
                  onClick={props.onLogout}
                >
                  Logout
                </NavLink>
              </RB.Dropdown.Menu>
            </RB.Dropdown>
          )}
        </RB.Nav>
      </RB.Navbar.Collapse>
    </RB.Navbar>
  );
};

const mapStateToProps = state => ({
  user: state.login.user,
  categories: state.category.categories,
  show: state.navbar.isOpen,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser()),
  onSelectCategory: id => dispatch(selectCategory(id)),
  onToggle: () => dispatch(actions.toggleDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
