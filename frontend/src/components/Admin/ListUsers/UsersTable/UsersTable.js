import React from 'react';

const usersTable = props => {
  const { users, error } = props;
  if (error)
    return <p>No results for the requested filter. Please click reset!</p>;
  const userRows = users?.map(user => {
    const { id, isBlocked, firstName, lastName, username, role, gender } = user;
    return (
      <tr key={username} data-id={id}>
        <td className="align-middle">{firstName}</td>
        <td className="align-middle">{lastName}</td>
        <td className="align-middle">{username}</td>
        <td className="align-middle">{role}</td>
        <td className="align-middle">{gender}</td>
        <td className="align-middle">
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
          <th scope="col" className="align-middle">
            First Name
          </th>
          <th scope="col" className="align-middle">
            Last Name
          </th>
          <th scope="col" className="align-middle">
            Username
          </th>
          <th scope="col" className="align-middle">
            Role
          </th>
          <th scope="col" className="align-middle">
            Gender
          </th>
          <th scope="col" className="align-middle">
            Action
          </th>
        </tr>
      </thead>
      <tbody>{userRows}</tbody>
    </table>
  );
};

export default usersTable;
