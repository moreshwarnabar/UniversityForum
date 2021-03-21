import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../Profile.css';
import * as Icon from 'react-bootstrap-icons';
import EditContactDetails from '../../Edit/EditContactDetails/EditContactDetails';
import * as actions from '../../../store/actions/creators/profileActionCreators/contactDetails';

class ContactDetails extends Component {
  state = {
    showContactDetailsForm: false,
    contactFormDetails: null,
    formFields: ['mobile', 'city', 'state', 'street', 'pinCode'],
    error: {
      phoneNo: '',
      PinCode: '',
    },
  };

  componentDidMount() {
    const id = this.props.userId;
    this.props.onPageLoad(id);
  }

  componentDidUpdate() {
    if (!this.state.contactFormDetails) {
      const formData = {};
      const contacts = this.props.contactDetails;
      this.state.formFields.forEach(
        field => (formData[field] = contacts ? contacts[field] : '')
      );
      this.setState({ contactFormDetails: formData });
    }
  }

  showEditContactDetailsForm = () => {
    this.setState({
      showContactDetailsForm: !this.state.showContactDetailsForm,
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
    if (this.state.contactFormDetails.phoneNo.trim().length !== 10) {
      this.setState({
        error: {
          phoneNo: 'Mobile No. must contain 10 digit',
        },
      });
    } else if (this.state.contactFormDetails.pinCode.trim().length !== 6) {
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

      if (this.props.contactDetails) this.props.onUpdate(data);
      else this.props.onCreate(id, data);
      this.setState({ showContactDetailsForm: false });
    }
  };

  render() {
    if (!this.props.isFetching) {
      return (
        <div className="card-body-profile shadow-lg p-3 mb-5 bg-white rounded">
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
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = state => ({
  ...state.contactDetails,
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: id => dispatch(actions.fetchContact(id)),
  onUpdate: data => dispatch(actions.updateContact(data)),
  onCreate: (id, data) => dispatch(actions.createContact(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
