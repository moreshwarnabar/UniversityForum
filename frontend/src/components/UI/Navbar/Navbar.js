import React from 'react';
import * as RB from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../../store/actions/creators/login';

const navbar = props => {
  // return (
  //   <nav className="navbar navbar-default bg-dark">
  //     <div className="container-fluid">
  //       <div className="navbar-header">
  //         <a href="abc">
  //           University{' '}
  //           <span className="glyphicon glyphicon-education w3-xxlarge "></span>
  //           Forum{' '}
  //         </a>
  //       </div>

  //       <ul className="nav navbar-nav">
  //         <li>
  //           {' '}
  //           <a className="w3-xxlarge nav-item nav-link active" href="#home">
  //             <span className="glyphicon glyphicon-home "></span>
  //           </a>
  //         </li>
  //         <li className="category">
  //           <h3>
  //             <a href="abc" className="col-md-12 text-center">
  //               <b>CATEGORY</b>
  //             </a>
  //           </h3>
  //         </li>
  //       </ul>

  //       <ul className="nav navbar-nav navbar-right">
  //         <li>
  //           <form className="navbar-form ">
  //             <div className="form-group col-md-100 text-center">
  //               <input
  //                 type="text"
  //                 className="form-control"
  //                 placeholder="Search..."
  //                 name="search"
  //               />
  //             </div>
  //           </form>
  //         </li>
  //         <li>
  //           <a className="w3-xxlarge" href="abc">
  //             <span className="glyphicon glyphicon-user"></span>{' '}
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   </nav>
  // );

  return (
    <RB.Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      animation="false"
    >
      <RB.Navbar.Brand href="#home" style={{ marginRight: '32px' }}>
        University Forum
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
          <React.Fragment>
            <RB.Form className="ml-lg-3" inline>
              <RB.FormControl
                type="text"
                placeholder="Search"
                className="form-control-sm mr-2 col-8 col-lg"
              />
              <RB.Button className="btn-sm" type="submit">
                Submit
              </RB.Button>
            </RB.Form>

            <RB.Nav className="mr-lg-5">
              <RB.NavDropdown title="Category" id="collasible-nav-dropdown">
                <RB.NavDropdown.Item href="#action/3.1">
                  Action
                </RB.NavDropdown.Item>
              </RB.NavDropdown>
            </RB.Nav>
          </React.Fragment>
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
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
