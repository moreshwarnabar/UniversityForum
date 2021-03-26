import React, { Component } from 'react';
import { connect } from 'react-redux';

import UsersTable from './UsersTable/UsersTable';
import Pagination from '../../UI/Pagination/Pagination';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/creators/listUsers';

class ListUsers extends Component {
  state = {
    roles: [
      { name: 'ADMIN', isChecked: false },
      { name: 'STUDENT', isChecked: false },
      { name: 'FACULTY', isChecked: false },
    ],
  };

  blockUserHandler = (event, isBlocked) => {
    const id = +event.target.closest('tr').dataset.id;
    const user = { id, isBlocked: !isBlocked };

    this.props.onBlockUnblockUser(user);
  };

  resetFilterHandler = () => {
    const updatedRoles = this.state.roles.map(role => {
      return { ...role, isChecked: false };
    });

    this.props.onFetchAll();
    this.setState({ roles: updatedRoles });
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

    this.props.onFilteredFetch(search);
    this.setState({ roles: updatedRoles });
  };

  pageChangeHandler = event => {
    const parent = event.target.closest('.btn');
    const next = +parent.dataset.goto;

    this.props.onPageChange(next);
  };

  componentDidMount() {
    this.props.onFetchAll();
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
        <div className="container p-2 border rounded shadow bg-light d-flex justify-content-center flex-wrap">
          {this.props.isFetching ? (
            <Spinner loading={true} size={200} />
          ) : (
            <React.Fragment>
              <div className="w-100 p-2 text-center text-uppercase">
                <h3>List of Users</h3>
              </div>
              <div className="w-100 form-group pt-3 pl-2 border-top">
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
                  users={this.props.toDisplay}
                  error={this.props.isUsersEmpty}
                  clicked={this.blockUserHandler}
                />
              </div>
              <div className="w-100 d-flex justify-content-between">
                <Pagination
                  {...this.props.pagination}
                  clicked={this.pageChangeHandler}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.listUsers,
});

const mapDispatchToProps = dispatch => ({
  onFetchAll: () => dispatch(actions.fetchAllUsers()),
  onFilteredFetch: search => dispatch(actions.fetchFilteredUsers(search)),
  onPageChange: page => dispatch(actions.changeUsersPage(page)),
  onBlockUnblockUser: user => dispatch(actions.aysncBlockUnblockUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
