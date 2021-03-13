import React, { Component } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import UserRegistration from '../../components/Admin/UserRegistration/UserRegistration';
import CreateCategory from '../../components/Admin/CreateCategory/CreateCategory';

class AdminPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="d-flex">
          <div className="col-lg-7">
            <UserRegistration />
          </div>
          <div className="col">
            <CreateCategory />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
