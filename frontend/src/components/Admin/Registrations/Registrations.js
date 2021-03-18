import React from 'react';

import UserRegistration from './UserRegistration/UserRegistration';
import CreateCategory from './CreateCategory/CreateCategory';

const registrations = () => (
  <div className="row m-0 w-100 align-self-start align-items-center">
    <div
      className="mt-3 mt-lg-0 col-lg-7 d-flex justify-content-center"
      style={{
        minHeight: '50vh',
      }}
    >
      <UserRegistration />
    </div>

    <div
      className="mt-3 mt-lg-0 col d-flex align-items-center"
      style={{
        minHeight: '50vh',
      }}
    >
      <CreateCategory />
    </div>
  </div>
);

export default registrations;
