import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditStudentDetails from '../../Edit/EditStudentDetails/EditStudentDetails';
import Spinner from '../../UI/Spinner/Spinner';
import '../Profile.css';
import * as Icon from 'react-bootstrap-icons';
import * as actions from '../../../store/actions/creators/profileActionCreators/studentDetails';

class StudentDetails extends Component {
  state = {
    showStudentDetailsForm: false,
    formFields: ['branch', 'stream', 'year'],
    studentFormData: null,
    isFormInit: false,
    error: {
      branch: '',
      stream: '',
    },
  };

  componentDidMount() {
    const id = this.props.userId;
    this.props.onPageLoad(id);
  }

  componentDidUpdate() {
    if (!this.state.isFormInit && !this.props.isFetching) {
      const formData = {};
      const student = this.props.studentDetails;
      this.state.formFields.forEach(
        field => (formData[field] = student ? student[field] : '')
      );
      this.setState({ studentFormData: formData, isFormInit: true });
    }
  }

  validate = () => {
    if (this.state.studentFormData.branch.trim().length < 3) {
      this.setState({ error: { branch: 'Invalid Branch' } });
    } else if (this.state.studentFormData.stream.trim().length < 3) {
      this.setState({ error: { stream: 'Invalid Stream' } });
    } else {
      this.setState({
        error: {
          branch: '',
          stream: '',
        },
      });
      return true;
    }
  };

  showEditStudentDetailsForm = () => {
    this.setState({
      showStudentDetailsForm: !this.state.showStudentDetailsForm,
    });
  };

  changeStudentDetailsHandler = event => {
    const { name, value } = event.target;
    const updatedStudent = { ...this.state.studentFormData, [name]: value };
    this.setState({
      studentFormData: updatedStudent,
    });
  };

  updateStudentDetails = event => {
    if (this.validate()) {
      const id = this.props.userId;
      const data = this.state.studentFormData;

      if (this.props.studentDetails) {
        data.id = id;
        this.props.onUpdate(data);
      } else {
        this.props.onCreate(id, data);
      }
      this.setState({ showStudentDetailsForm: false });
    }
  };

  render() {
    if (!this.props.isFetching) {
      return (
        <div className="card-body-profile shadow-lg p-3 mb-3 bg-white rounded">
          <div className="row ml-4 justify-content-between">
            <h5 className=" ml-3">Student Details :</h5>
            <button
              className="btn btn-sm btn-light mr-5"
              onClick={this.showEditStudentDetailsForm}
            >
              <Icon.PencilFill />
            </button>
          </div>
          <hr />

          <div className="row ">
            <div className="col-sm-5">
              <h6 className="ml-5">Branch </h6>
            </div>
            <div className="col-sm-7 text-secondary">
              {this.props.studentDetails?.branch}
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-sm-5">
              <h6 className="ml-5">Stream </h6>
            </div>
            <div className="col-sm-7 text-secondary">
              {this.props.studentDetails?.stream}
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-sm-5">
              <h6 className="ml-5">Admission year </h6>
            </div>
            <div className="col-sm-7 text-secondary">
              {this.props.studentDetails?.year}
            </div>
          </div>

          <hr />

          {this.state.showStudentDetailsForm ? (
            <EditStudentDetails
              {...this.state.studentFormData}
              error={this.state.error}
              showStudentDetailsForm={this.state.showStudentDetailsForm}
              showEditStudentDetailsForm={this.showEditStudentDetailsForm}
              updateStudentDetails={this.updateStudentDetails}
              changeStudentDetailsHandler={this.changeStudentDetailsHandler}
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <div
          className="my-3 col-6 d-flex justify-content-center align-items-center"
          style={{ height: '300px' }}
        >
          <Spinner loading={true} size={200} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  ...state.studentDetails,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchStudent(id)),
  onCreate: (id, data) => dispatch(actions.createStudent(id, data)),
  onUpdate: data => dispatch(actions.updateStudent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDetails);
