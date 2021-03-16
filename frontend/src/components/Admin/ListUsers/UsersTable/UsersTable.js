import React from 'react';

const usersTable = props => {
  const { users, error } = props;
  if (error)
    return <p>No results for the requested filter. Please click reset!</p>;
  const userRows = users.map(user => {
    const { id, isBlocked, firstName, lastName, username, role, gender } = user;
    return (
      <tr key={username} data-id={id}>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{username}</td>
        <td>{role}</td>
        <td>{gender}</td>
        <td>
          <button
            type="button"
            className={`btn btn-${isBlocked ? 'success' : 'danger'} btn-sm`}
            onClick={event => props.clicked(event, isBlocked)}
          >
            {isBlocked ? 'Unblock' : 'Block'}
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-bordered table-hover table-striped table-dark text-center">
      <thead className="thead-light">
        <tr>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Gender</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{userRows}</tbody>
    </table>
  );
};

export default usersTable;
