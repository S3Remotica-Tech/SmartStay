import PropTypes from "prop-types";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import BedStatusListView from "../NoticePeriod/BedStatusListView";

const ChangeBed = ({ show, onHide }) => {
ChangeBed.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
  const [showEmptyBed, setShowEmptyBed] = useState(false);

  return (
    <>
      <Modal
        show={show && !showEmptyBed}   
        onHide={onHide}
        centered
        backdrop="static"
        keyboard={false}
        contentClassName="p-0"
        style={{ borderRadius: 16, background: "transparent" }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "32px 32px 24px 32px",
            minWidth: 340,
            maxWidth: 400,
            minHeight: 200,
            height: 200,
            margin: "auto",
          }}
        >
          <div className="text-center">
            <h5
              className="mb-2"
              style={{
                fontWeight: 600,
                fontSize: 20,
                color: "#222",
                fontFamily: "Gilroy",
              }}
            >
              Please change Reserved tenant to another bed first.
            </h5>
            <div
              className="mb-4"
              style={{
                fontSize: 13,
                color: "#8A8A8A",
                fontWeight: 500,
                fontFamily: "Gilroy",
              }}
            >
              Then Re Check-In the Occupied Tenant
            </div>
            <div className="d-flex justify-content-center gap-3 mb-2">
              <Button
                variant="outline-secondary"
                onClick={onHide}
                style={{
                  borderRadius: 8,
                  minWidth: 110,
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  border: "1.5px solid #D1D1D1",
                  color: "#222",
                  background: "#fff",
                  fontSize: 15,
                  boxShadow: "none",
                  padding: "8px 0",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                style={{
                  borderRadius: 8,
                  minWidth: 110,
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  background: "#1E45E1",
                  border: "none",
                  color: "#fff",
                  fontSize: 15,
                  boxShadow: "0 2px 8px rgba(30, 69, 225, 0.10)",
                  padding: "8px 0",
                }}
                onClick={() => {
                  setShowEmptyBed(true);   // open BedStatusListView
                }}
              >
                Change Bed
              </Button>
            </div>
          </div>
        </div>
      </Modal>

    
      {showEmptyBed && (
        <Modal
          show={showEmptyBed}
          onHide={() => setShowEmptyBed(false)}
        //   fullscreen   
        >
          <BedStatusListView
            show={showEmptyBed}
            onHide={() => setShowEmptyBed(false)}
          />
        </Modal>
      )}
    </>
  );
};

export default ChangeBed;
