import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiBuilding, BiDoorOpen, BiBed, BiTransferAlt } from "react-icons/bi";

function ConfirmReassignBed() {
  return (
    <div
      className="card shadow-sm rounded-4 p-4"
      style={{ width: "600px", border: "1px solid #eee" }}
    >

      <div
        className="d-flex justify-content-between align-items-start pb-2 mb-3"
        style={{ borderBottom: "1px solid #dee2e6" }}
      >
        <p className="fw-semibold mb-0" style={{ fontSize: "16px", fontWeight: 600 }}>
          Confirm Reassign Bed
        </p>
      </div>

      <div className="row text-center mb-2">
        <div className="col-5 text-start fw-semibold">Current Bed</div>
        <div className="col-2"></div>
        <div className="col-5 text-start fw-semibold">New Bed</div>
      </div>

      <div className="row text-center mb-3">

        <div className="col-5 text-start">
          <div className="mb-2">
            <BiBuilding className="me-2" /> Ground Floor
          </div>
          <div className="mb-2">
            <BiDoorOpen className="me-2" /> Room G2
          </div>
          <div className="mb-2">
            <BiBed className="me-2" /> Bed 06
          </div>
        </div>


        <div className="col-2 d-flex justify-content-center align-items-center">
          <BiTransferAlt size={24} />
        </div>


        <div className="col-5 text-start">
          <div className="mb-2">
            <BiBuilding className="me-2" /> Second Floor
          </div>
          <div className="mb-2">
            <BiDoorOpen className="me-2" /> Room S2
          </div>
          <div className="mb-2">
            <BiBed className="me-2" /> Bed 08
          </div>
        </div>
      </div>






      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">

        <div className="w-50">
          <Form.Label className="fw-medium" style={{ fontSize: "15px" }}>Date</Form.Label>
          <Form.Control type="text" value="31/07/2025" />
        </div>

        <div className="w-50">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="fw-medium mb-0" style={{ fontSize: "15px" }}>New Rent Amount</Form.Label>
            <Form.Check
              type="checkbox"
              label="Same as Current"
              className="mb-0"
              style={{ fontSize: "13px" }}
            />
          </div>
          <Form.Control type="text" value="₹ 4000" />
        </div>
      </div>




      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="light"
          className="w-50 me-2 border"
          style={{ borderRadius: "8px" }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="w-50"
          style={{ borderRadius: "8px", backgroundColor: "#1a50ff" }}
        >
          Assign
        </Button>
      </div>
    </div>
  );
}

export default ConfirmReassignBed;