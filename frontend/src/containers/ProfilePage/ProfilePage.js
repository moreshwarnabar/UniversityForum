import React from 'react';
import ContactDetails from '../../components/Profile/ContactDetails/ContactDetails';
import UserDetails from '../../components/Profile/UserDetails/UserDetails';
import StudentDetails from '../../components/Profile/StudentDetails/StudentDetails';
import FacultyDetails from '../../components/Profile/FacultyDetails/FacultyDetails';
import Navbar from '../../components/UI/Navbar/Navbar';

const ProfilePage = props => (
  <React.Fragment>
    <Navbar />
    <div className="container min-vh-100 bg-light">
      <div>
        <UserDetails />
      </div>

      <div className="d-flex justify-content-around">
        <ContactDetails />
        {/* <StudentDetails/> */}

        <FacultyDetails />
      </div>
    </div>
  </React.Fragment>
);
export default ProfilePage;
