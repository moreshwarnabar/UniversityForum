import React, { Component } from 'react';

import Navbar from '../../components/UI/Navbar/Navbar';
import UserRegistration from '../../components/Admin/UserRegistration/UserRegistration';
import CreateCategory from '../../components/Admin/CreateCategory/CreateCategory';
import ListUsers from '../../components/Admin/ListUsers/ListUsers';
import ReportedAnswers from '../../components/Admin/ReportedAnswers/ReportedAnswers';
import Links from '../../components/UI/Links/Links';

class AdminPage extends Component {
  state = {
    linkData: [
      { goTo: 'registrations', label: 'Registrations' },
      { goTo: 'users', label: 'Users' },
      { goTo: 'answers', label: 'Answers' },
    ],
    index: 0,
  };

  selectHandler = selectedIndex => console.log(selectedIndex);

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="bg-light">
          <Links links={this.state.linkData} />
        </div>
        <div
          id="registrations"
          className={'row m-0 pb-3 min-vh-100 align-items-center '}
        >
          <div
            className="mt-3 mt-lg-0 col-lg-7 d-flex justify-content-center"
            style={{
              minHeight: '50vh',
            }}
          >
            <UserRegistration />
          </div>

          <div
            className="mt-3 mt-lg-0 col d-flex flex-wrap align-self-lg-stretch align-items-center"
            style={{
              minHeight: '50vh',
            }}
          >
            {/* <div
              className="mb-3 col-lg-12 col-3 d-none d-md-flex align-items-center justify-content-center"
              style={{ height: 'fit-content' }}
            >
              <Links linkData={this.state.linkData} />
            </div> */}

            <CreateCategory />
          </div>
        </div>

        <div id="users" className="row m-0 min-vh-100 align-items-center">
          <div className="col mt-4">
            <ListUsers />
          </div>
        </div>

        <div id="answers" className="row m-0 min-vh-100 align-items-center">
          <div className="col mt-4">
            <ReportedAnswers />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPage;
