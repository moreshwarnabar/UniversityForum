import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a href="abc">
            University{' '}
            <span className="glyphicon glyphicon-education w3-xxlarge "></span>
            Forum{' '}
          </a>
        </div>

        <ul className="nav navbar-nav">
          <li>
            {' '}
            <a className="w3-xxlarge nav-item nav-link active" href="#home">
              <span className="glyphicon glyphicon-home "></span>
            </a>
          </li>
          <li className="category">
            <h3>
              <a href="abc" className="col-md-12 text-center">
                <b>CATEGORY</b>
              </a>
            </h3>
          </li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li>
            <form className="navbar-form ">
              <div className="form-group col-md-100 text-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  name="search"
                />
              </div>
            </form>
          </li>
          <li>
            <a className="w3-xxlarge" href="abc">
              <span className="glyphicon glyphicon-user"></span>{' '}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
