import React, { Component } from 'react';
import axios from 'axios';

import UsersTable from './UsersTable/UsersTable';
import Pagination from '../../UI/Pagination/Pagination';

class ListUsers extends Component {
  state = {
    users: null,
    toDisplay: [],
    pagination: {
      per: 1,
      current: 1,
      last: 1,
    },
    roles: [
      { name: 'ADMIN', isChecked: false },
      { name: 'STUDENT', isChecked: false },
      { name: 'FACULTY', isChecked: false },
    ],
    isUsersEmpty: false,
  };

  // pageChange, filterChange, resetFilter, pageContent, blockUser
  blockUserHandler = (event, isBlocked) => {
    const id = +event.target.closest('tr').dataset.id;
    const user = { id, isBlocked: !isBlocked };

    axios.put('http://localhost:8080/forum/users', user).then(response => {
      const updatedUser = response.data.result;
      const users = this.updateUser([...this.state.users], updatedUser);
      const toDisplay = this.updateUser([...this.state.toDisplay], updatedUser);

      this.setState({ users, toDisplay });
    });
  };

  updateUser = (users, updatedUser) => {
    const userIndex = users.findIndex(user => user.id === updatedUser.id);
    users[userIndex] = updatedUser;
    return users;
  };

  resetFilterHandler = () => {
    const updatedRoles = this.state.roles.map(role => {
      return { ...role, isChecked: false };
    });

    axios
      .get('http://localhost:8080/forum/users/all')
      .then(response => this.initPagination(response, updatedRoles));
  };

  filterChangeHandler = event => {
    const name = event.target.value;
    const updatedRoles = this.state.roles.map(role => {
      if (role.name === name) return { name, isChecked: !role.isChecked };
      return role;
    });

    const search = updatedRoles
      .filter(role => role.isChecked)
      .map(role => `role=${role.name}`)
      .join('&');

    axios
      .get(
        `http://localhost:8080/forum/users/${
          search === '' ? '/all' : `/filters?${search}`
        }`
      )
      .then(response => this.initPagination(response));

    this.setState({ roles: updatedRoles });
  };

  initPagination = (response, roles = this.state.roles) => {
    const users = response.data.result;

    const { pagination } = this.state;
    const { current, per } = pagination;

    const last = users.length / per;
    const toDisplay = this.pageContentSlicer(users, current, per);

    const isUsersEmpty = users.length === 0;

    this.setState({
      users,
      toDisplay,
      pagination: { ...pagination, last },
      isUsersEmpty,
      roles,
    });
  };

  pageChangeHandler = event => {
    const { users, pagination } = this.state;

    const parent = event.target.closest('.btn');
    const next = +parent.dataset.goto;
    const toDisplay = this.pageContentSlicer(users, next, pagination.per);

    this.setState({ toDisplay, pagination: { ...pagination, current: next } });
  };

  pageContentSlicer = (users, page, per) => {
    const start = per * (page - 1);
    const end = per * page;

    return users.slice(start, end);
  };

  componentDidMount() {
    axios
      .get('http://localhost:8080/forum/users/all')
      .then(response => this.initPagination(response));
  }

  render() {
    const filters = this.state.roles.map(({ name, isChecked }) => (
      <div key={name} className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="checkbox"
          id={name}
          value={name.toUpperCase()}
          name="role"
          checked={isChecked}
          onChange={this.filterChangeHandler}
        />
        <label
          className="form-check-label"
          htmlFor={name}
          style={{ fontSize: '13px' }}
        >
          {name[0].toUpperCase() + name.slice(1)}
        </label>
      </div>
    ));

    return (
      <div className="row m-0 align-self-start align-items-center justify-content-center w-100">
        <div className="container p-3 border rounded shadow bg-light">
          <div>
            <h3>List of Users</h3>
          </div>
          <div className="form-group pt-3 pl-2 border-top">
            {filters}
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={this.resetFilterHandler}
            >
              Reset
            </button>
          </div>
          <div className="table-responsive">
            <UsersTable
              users={this.state.toDisplay}
              error={this.state.isUsersEmpty}
              clicked={this.blockUserHandler}
            />
          </div>
          <div className="d-flex justify-content-between">
            <Pagination
              {...this.state.pagination}
              clicked={this.pageChangeHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ListUsers;
