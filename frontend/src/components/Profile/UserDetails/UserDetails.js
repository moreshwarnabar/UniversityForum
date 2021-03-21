import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { connect } from 'react-redux';

import '../Profile.css';
import avatar7 from '../../../resources/images/avatar7.png';
import EditUser from '../../Edit/EditUser/EditUser';
import EditPassword from '../../Edit/EditPassword/EditPassword';
import * as actions from '../../../store/actions/creators/profileActionCreators/userDetails';

class UserDetails extends Component {
  state = {
    showUserDetailsForm: false,
    userFormDetails: null,
    password: '',
    reTypedPassword: '',
    showPasswordForm: false,
    message: '',
    error: {
      fName: '',
      lName: '',
    },
  };

  componentDidMount() {
    this.setState({ userFormDetails: this.props.user });
  }

  //Password Change
  showEditPasswordForm = () => {
    console.log('clicked edit Password');
    this.setState({
      showPasswordForm: !this.state.showPasswordForm,
    });
  };

  changePasswordHandler = event => {
    this.setState({
      password: event.target.value,
    });
  };

  changeRetypedPasswordHandler = event => {
    this.setState({
      reTypedPassword: event.target.value,
    });
  };

  validatePassword() {
    if (
      !(
        this.state.password.trim().length >= 4 &&
        this.state.password.trim().length < 15
      )
    ) {
      console.log('password error1');
      this.setState({
        message: 'password must be contain at between 6 to 15 character ',
      });
    } else if (!(this.state.password === this.state.reTypedPassword)) {
      console.log('password error2');
      this.setState({
        message: 'Both the Password fields must be same',
      });
    } else {
      console.log('password error3');
      this.setState({
        message: '',
      });
      return true;
    }
  }

  updatePassword = event => {
    if (this.validatePassword()) {
      console.log('clicked update Password');
      console.log(this.state.password + ' == ' + this.state.reTypedPassword);

      const id = this.props.user.id;
      const password = {
        password: this.state.password,
      };

      this.props.onPassword(id, password);
      this.setState({ showPasswordForm: false });
    }
  };

  showEditUserDetailsForm = () => {
    console.log('clicked editUser');
    this.setState({
      showUserDetailsForm: !this.state.showUserDetailsForm,
    });
  };

  changeUserDetailsHandler = event => {
    const { name, value } = event.target;
    const updatedUser = { ...this.state.userFormDetails, [name]: value };
    this.setState({
      userFormDetails: updatedUser,
    });
  };

  validate = () => {
    if (!(this.state.userFormDetails.firstName.trim().length < 15)) {
      this.setState({
        error: {
          fName: 'First Name must be 15 character',
        },
      });
    } else if (!(this.state.userFormDetails.lastName.trim().length < 15)) {
      this.setState({
        error: { lName: 'Last Name must be 15 character' },
      });
    } else {
      this.setState({ error: { fName: '', lName: '' } });
      return true;
    }
  };

  updateUserDetails = () => {
    if (this.validate()) {
      console.log('clicked updateUserDetails');
      const data = this.state.userFormDetails;
      this.props.onUpdate(data);
      this.setState({ showUserDetailsForm: false });
    }
  };

  render() {
    if (this.props.user != null) {
      return (
        <div>
          <EditUser
            {...this.state.userFormDetails}
            {...this.state.error}
            showUserDetailsForm={this.state.showUserDetailsForm}
            showEditUserDetailsForm={this.showEditUserDetailsForm}
            updateUserDetails={this.updateUserDetails}
            changeUserDetailsHandler={this.changeUserDetailsHandler}
          />

          <div className="shadow-lg p-3 mt-3 bg-white rounded ">
            <div className="row ml-4 justify-content-between">
              <h3 className="ml-2">Profile :</h3>
              <Button
                variant="light"
                size="sm"
                className="mb-3 "
                onClick={this.showEditPasswordForm}
              >
                <Icon.ShieldLockFill /> Change Password
              </Button>

              <Button
                variant="light"
                size="sm"
                className="mr-5 mb-3"
                onClick={this.showEditUserDetailsForm}
              >
                <Icon.PencilFill />
              </Button>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <img
                  className="float-left img-fluid rounded-circle"
                  src={avatar7}
                  alt="Profile Pic"
                ></img>
              </div>

              <hr />

              <div className="col-sm-8">
                <table className="table table-striped">
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="ml-5">Full Name</h6>
                      </td>
                      <td>
                        <div className="text-secondary ml-5">
                          {this.props.user.firstName} {this.props.user.lastName}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="ml-5">Username</h6>
                      </td>
                      <td>
                        <div className="text-secondary ml-5">
                          {this.props.user.username}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="ml-5">Date of Birth</h6>
                      </td>
                      <td>
                        <div className="text-secondary ml-5">
                          {this.props.user.dateOfBirth}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="ml-5">Gender</h6>
                      </td>
                      <td>
                        <div className="text-secondary ml-5">
                          {this.props.user.gender}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="ml-5">Role</h6>
                      </td>
                      <td>
                        <div className="text-secondary ml-5">
                          {this.props.user.role}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-success">{this.state.message}</div>
              </div>
            </div>
          </div>

          <EditPassword
            password={this.state.password}
            reTypedPassword={this.state.reTypedPassword}
            showPasswordForm={this.state.showPasswordForm}
            message={this.state.message}
            showEditPasswordForm={this.showEditPasswordForm}
            changePasswordHandler={this.changePasswordHandler}
            changeRetypedPasswordHandler={this.changeRetypedPasswordHandler}
            updatePassword={this.updatePassword}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => ({ ...state.userDetails });

const mapDispatchToProps = dispatch => ({
  onUpdate: data => dispatch(actions.updateUser(data)),
  onPassword: (id, password) => dispatch(actions.updatePassword(id, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
