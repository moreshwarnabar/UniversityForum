import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditContactDetails = props => (
  <div>
    <Modal show={props.showContactDetailsForm} onHide={props.showEditContactDetailsForm} centered>
      <Modal.Header>
        <h4>Update Contact Details</h4>
      </Modal.Header>
      <Modal.Body>
        <table className="table table-responsive ">
          <tbody>
            <tr>
              <td>
                <label>Mobile : (+91) </label>
              </td>
              <td>
                <input
                  type="tel"
                  minLength={10}
                  name="phoneNo"
                  className="form-control"
                  value={props.phoneNo}
                  onChange={props.changeContactDetailsHandler}
                />
                 <div className="text-danger">{props.error.phoneNo}</div>
              </td>
            </tr>
            <tr>
              <td>
                <label>city :</label>
              </td>
              <td>
                <input
                  type="text"
                  min={3}
                  name="city"
                  className="form-control"
                  value={props.city}
                  onChange={props.changeContactDetailsHandler}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>State :</label>
              </td>
              <td>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={props.state}
                  onChange={props.changeContactDetailsHandler}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Street :</label>
              </td>
              <td>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={props.street}
                  onChange={props.changeContactDetailsHandler}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Pin code :</label>
              </td>
              <td>
                <input
                  type="number"
                  name="pinCode"
                  className="form-control"
                  value={props.pinCode}
                  onChange={props.changeContactDetailsHandler}
                />
                <div  className="text-danger">{props.error.pinCode}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.showEditContactDetailsForm}>Close</Button>
        <Button type="submit" onClick={props.updateContactDetails}>
          {' '}
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
);
export default EditContactDetails;
