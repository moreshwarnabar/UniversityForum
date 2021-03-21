import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Profile.css';
import * as Icon from 'react-bootstrap-icons';
import EditFacultyDetails from '../../Edit/EditFacultyDetails/EditFacultyDetails';
import * as actions from '../../../store/actions/creators/profileActionCreators/facultyDetails';

class FacultyDetails extends Component {
  state = {
    showFacultyDetailsForm: false,
    formFields: ['department', 'position', 'experience', 'hireDate'],
    facultyFormDetails: null,

    error: {
      department: '',
      position: '',
    },
  };

  componentDidMount() {
    const id = this.props.userId;
    this.props.onPageLoad(id);
  }

  componentDidUpdate() {
    if (!this.state.facultyFormDetails) {
      const formData = {};
      const faculty = this.props.facultyDetails;
      this.state.formFields.forEach(
        field => (formData[field] = faculty ? faculty[field] : '')
      );
      this.setState({ facultyFormDetails: formData });
    }
  }

  showEditFacultyDetailsForm = () => {
    console.log('clicked edit Faculty');
    this.setState({
      showFacultyDetailsForm: !this.state.showFacultyDetailsForm,
    });
  };

  changeFacultyDetailsHandler = event => {
    const { name, value } = event.target;
    const updatedFaculty = { ...this.state.facultyFormDetails, [name]: value };
    this.setState({
      facultyFormDetails: updatedFaculty,
    });
  };

  validate() {
    if (this.state.facultyFormDetails.department.trim().length < 3) {
      this.setState({
        error: {
          department: 'Invalid Department',
        },
      });
    } else if (this.state.facultyFormDetails.position.trim().length < 3) {
      this.setState({
        error: {
          position: 'Invalid Position',
        },
      });
    } else {
      this.setState({
        error: {
          department: '',
          position: '',
        },
      });
      return true;
    }
  }

  updateFacultyDetails = event => {
    console.log('clicked updateFacultyDetails');
    if (this.validate()) {
      const id = this.props.userId;
      const data = this.state.facultyFormDetails;

      if (this.props.facultyDetails) this.props.onUpdate(data);
      else this.props.onCreate(id, data);
      this.setState({ showFacultyDetailsForm: false });
    }
  };

  render() {
    if (!this.props.isFetching) {
      return (
        <div className=" card-body-profile shadow-lg p-3 mb-5 bg-white rounded">
          {this.state.showFacultyDetailsForm ? (
            <EditFacultyDetails
              {...this.state.facultyFormDetails}
              error={this.state.error}
              showFacultyDetailsForm={this.state.showFacultyDetailsForm}
              showEditFacultyDetailsForm={this.showEditFacultyDetailsForm}
              updateFacultyDetails={this.updateFacultyDetails}
              changeFacultyDetailsHandler={this.changeFacultyDetailsHandler}
            />
          ) : (
            <div>
              <div className="row ml-4 justify-content-between">
                <h5 className="ml-2">Faculty Details :</h5>
                <button
                  className="btn btn-sm btn-light mr-5 "
                  onClick={this.showEditFacultyDetailsForm}
                >
                  <Icon.PencilFill />
                </button>
              </div>

              <hr />

              <div className="row">
                <div className="col-sm-5">
                  <h6 className="ml-5">Department </h6>
                </div>
                <div className="col-sm-7 text-secondary">
                  {this.props.facultyDetails?.department}
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <h6 className="ml-5">Position </h6>
                </div>
                <div className="col-sm-7 text-secondary">
                  {this.props.facultyDetails?.position}
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <h6 className="ml-5">Experience (years) </h6>
                </div>
                <div className="col-sm-7 text-secondary">
                  {this.props.facultyDetails?.experience}
                </div>
              </div>

              <hr />
              <div className="row">
                <div className="col-sm-5">
                  <h6 className="ml-5">Hire Date </h6>
                </div>
                <div className="col-sm-7 text-secondary">
                  {this.props.facultyDetails?.hireDate}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => ({
  ...state.facultyDetails,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchFaculty(id)),
  onCreate: (id, data) => dispatch(actions.createFaculty(id, data)),
  onUpdate: data => dispatch(actions.updateFaculty(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacultyDetails);
