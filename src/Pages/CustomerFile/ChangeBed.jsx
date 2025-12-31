/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from "prop-types";

const ChangeBedModal = ({show, handleClose}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      contentClassName="p-0"
      style={{ borderRadius: 16, background: 'transparent' }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(30, 69, 225, 0.10)',
          padding: '32px 32px 24px 32px',
                }}
      >
        <div className="text-center">
          <h5 className="mb-2" style={{ fontWeight: 600, fontSize: 20, color: '#222', fontFamily: 'Gilroy' }}>
            Please change Reserved tenant to another bed first.
          </h5>
          <div className="mb-4" style={{ fontSize: 13, color: '#8A8A8A', fontWeight: 500, fontFamily: 'Gilroy' }}>
            Then Re Check-In the Occupied Tenant
          </div>
          <div className="d-flex justify-content-center gap-3 mb-2">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              style={{
                borderRadius: 8,
                minWidth: 110,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                border: '1.5px solid #D1D1D1',
                color: '#222',
                background: '#fff',
                fontSize: 15,
                boxShadow: 'none',
                padding: '8px 0',
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              // onClick={handleChangeBed}
              style={{
                borderRadius: 8,
                minWidth: 110,
                fontWeight: 600,
                fontFamily: 'Gilroy',
                background: '#1E45E1',
                border: 'none',
                color: '#fff',
                fontSize: 15,
                boxShadow: '0 2px 8px rgba(30, 69, 225, 0.10)',
                padding: '8px 0',
              }}
            >
              Change Bed
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
ChangeBedModal.propTypes = {
        show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default ChangeBedModal;