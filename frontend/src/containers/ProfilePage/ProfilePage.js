import React from 'react';
import { connect } from 'react-redux';

import ContactDetails from '../../components/Profile/ContactDetails/ContactDetails';
import UserDetails from '../../components/Profile/UserDetails/UserDetails';
import StudentDetails from '../../components/Profile/StudentDetails/StudentDetails';
import FacultyDetails from '../../components/Profile/FacultyDetails/FacultyDetails';
import Navbar from '../../components/UI/Navbar/Navbar';

const ProfilePage = props => (
  <React.Fragment>
    <Navbar />
    <div className="container min-vh-100 pt-3 bg-light">
      <div>
        <UserDetails user={props.user} />
      </div>

      <div className="row">
        <ContactDetails userId={props.user.id} />
        {props.user.role === 'STUDENT' ? (
          <StudentDetails />
        ) : (
          <FacultyDetails />
        )}
      </div>
    </div>
  </React.Fragment>
);

const mapStateToProps = state => ({
  user: state.login.user,
});

export default connect(mapStateToProps)(ProfilePage);
