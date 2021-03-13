import React, { Component } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import UserRegistration from '../../components/Admin/UserRegistration/UserRegistration';

class AdminPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container-fluid row">
          <UserRegistration />
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
