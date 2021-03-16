import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalWindow = props => {
  return (
    <Modal
      size="lg"
      centered
      // animation={false}
      show={props.showModal}
      onHide={props.closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 style={{ fontFamily: 'Montserrat' }}>
            {props.answer?.question.description}
          </h4>
          <p
            className="m-0"
            style={{ fontSize: '10px', fontFamily: 'Montserrat' }}
          >
            <strong>Posted On: </strong>
            {props.answer?.question.askedOn}
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontFamily: 'Montserrat' }}>{props.answer?.answer}</p>
        <div style={{ fontFamily: 'Montserrat', fontSize: '13px' }}>
          <p className="m-0">
            {props.answer?.answerBy.firstName +
              ' ' +
              props.answer?.answerBy.lastName}
            , {props.answer?.answerBy.role}
          </p>
          <p className="m-0">{props.answer?.answeredOn}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={props.removeReport}>
          Remove Report
        </Button>
        <Button variant="danger" onClick={props.delete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default modalWindow;
