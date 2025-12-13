import React from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import PropTypes from "prop-types";

const MessageModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Room Rent Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
                <p>This user has already paid the Room Rent for this month</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
MessageModal.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  
};

export default MessageModal;
