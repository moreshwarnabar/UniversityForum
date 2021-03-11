import React from 'react';

const Navbar = () => {
  return (
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#">
            University{' '}
            <span class="glyphicon glyphicon-education w3-xxlarge "></span>Forum{' '}
          </a>
        </div>

        <ul class="nav navbar-nav">
          <li>
            {' '}
            <a class="w3-xxlarge nav-item nav-link active" href="#home">
              <span class="glyphicon glyphicon-home "></span>
            </a>
          </li>
          <li class="category">
            <h3>
              <a href="#" class="col-md-12 text-center">
                <b>CATEGORY</b>
              </a>
            </h3>
          </li>
        </ul>

        <ul class="nav navbar-nav navbar-right">
          <li>
            <form class="navbar-form ">
              <div class="form-group col-md-100 text-center">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  name="search"
                />
              </div>
            </form>
          </li>
          <li>
            <a class="w3-xxlarge  " href="#">
              <span class="glyphicon glyphicon-user"></span>{' '}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
