import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditContactDetails from '../../Edit/EditContactDetails/EditContactDetails';
import Spinner from '../../UI/Spinner/Spinner';
import '../Profile.css';
import * as Icon from 'react-bootstrap-icons';
import * as actions from '../../../store/actions/creators/profileActionCreators/contactDetails';

class ContactDetails extends Component {
  state = {
    showContactDetailsForm: false,
    contactFormDetails: null,
    formFields: ['phoneNo', 'city', 'state', 'street', 'pinCode'],
    isFormInit: false,
    error: {
      phoneNo: null,
      pinCode: null,
    },
  };

  componentDidMount() {
    const id = this.props.userId;
    this.props.onPageLoad(id);
  }

  componentDidUpdate() {
    if (!this.state.isFormInit && !this.props.isFetching) {
      const formData = {};
      const contacts = this.props.contactDetails;
      this.state.formFields.forEach(
        field => (formData[field] = contacts ? contacts[field] : '')
      );
      this.setState({ contactFormDetails: formData, isFormInit: true });
    }
  }

  showEditContactDetailsForm = () => {
    const { showContactDetailsForm, error } = this.state;
    const contactFormDetails = { ...this.state.contactFormDetails };
    if ((error.phoneNo || error.pinCode) && this.props.contactDetails) {
      Object.keys(error).forEach(
        key => (contactFormDetails[key] = this.props.contactDetails[key] || '')
      );
    }
    this.setState({
      showContactDetailsForm: !showContactDetailsForm,
      contactFormDetails,
      error: {
        phoneNo: null,
        pinCode: null,
      },
    });
  };

  changeContactDetailsHandler = event => {
    const { name, value } = event.target;
    const updatedContact = { ...this.state.contactFormDetails, [name]: value };
    this.setState({
      contactFormDetails: updatedContact,
    });
  };

  validate = () => {
    const { phoneNo, pinCode } = this.state.contactFormDetails;
    if (phoneNo.trim().length !== 10) {
      this.setState({
        error: {
          phoneNo: 'Mobile No. must contain 10 digit',
        },
      });
    } else if (pinCode.trim().length !== 6) {
      this.setState({ error: { pinCode: 'pincode must contain 6 digit' } });
    } else {
      this.setState({
        error: {
          phoneNo: '',
          pinCode: '',
        },
      });
      return true;
    }
  };

  updateContactDetails = event => {
    if (this.validate()) {
      const id = this.props.userId;
      const data = this.state.contactFormDetails;

      if (this.props.contactDetails) {
        data.id = id;
        this.props.onUpdate(data);
      } else {
        this.props.onCreate(id, data);
      }
      this.setState({ showContactDetailsForm: false });
    }
  };

  render() {
    if (!this.props.isFetching) {
      return (
        <div className="card-body-profile shadow-lg p-3 mb-3 bg-white rounded">
          <div>{this.initialContactDetails}</div>

          <EditContactDetails
            {...this.state.contactFormDetails}
            error={this.state.error}
            showContactDetailsForm={this.state.showContactDetailsForm}
            showEditContactDetailsForm={this.showEditContactDetailsForm}
            updateContactDetails={this.updateContactDetails}
            changeContactDetailsHandler={this.changeContactDetailsHandler}
          />
          <div>
            <div className="row ml-4 justify-content-between">
              <h5 className=" ml-3">Contact Details :</h5>
              <button
                className="btn btn-sm btn-light mr-5"
                onClick={this.showEditContactDetailsForm}
              >
                <Icon.PencilFill />
              </button>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <h6 className="ml-5">Mobile </h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {this.props.contactDetails?.phoneNo}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <h6 className="ml-5">city</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {this.props.contactDetails?.city}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <h6 className="ml-5">state</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {this.props.contactDetails?.state}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <h6 className="ml-5">Street</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {this.props.contactDetails?.street}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-5">
                <h6 className="ml-5">Pin code</h6>
              </div>
              <div className="col-sm-7 text-secondary">
                {this.props.contactDetails?.pinCode}
              </div>
            </div>
          </div>
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
  ...state.contactDetails,
  isError: state.networkError.isError,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchContact(id)),
  onUpdate: data => dispatch(actions.updateContact(data)),
  onCreate: (id, data) => dispatch(actions.createContact(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
