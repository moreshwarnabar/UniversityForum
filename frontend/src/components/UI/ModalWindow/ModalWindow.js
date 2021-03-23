import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalWindow = props => {
  return (
    <Modal
      size="lg"
      centered
      animation={false}
      show={props.showModal}
      onHide={props.closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      {props.btnLabels ? (
        <Modal.Footer>
          <Button variant="success" onClick={props.cancel}>
            {props.btnLabels?.cancel}
          </Button>
          <Button variant="danger" onClick={props.proceed}>
            {props.btnLabels?.proceed}
          </Button>
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default modalWindow;
