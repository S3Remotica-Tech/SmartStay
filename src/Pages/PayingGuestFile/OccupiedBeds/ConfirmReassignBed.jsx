/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import building from "/src/Assets/Images/New_images/building-4.svg";
import Frame from "/src/Assets/Images/New_images/Frame.svg";
import Vector from "/src/Assets/Images/New_images/Vector.svg";
import repeat from "/src/Assets/Images/New_images/repeat.svg";
import repeatOne from "/src/Assets/Images/New_images/repeate-one.svg";
import { DatePicker } from "antd";
import dayjs from "dayjs";


function ConfirmReassignBed() {


  const [date, setDate] = useState(null);
  const [newRentAmount, setNewRentAmount] = useState("");


  const handleDateChange = (date) => {
    setDate(date);
  };


  return (
    <div
      className="card shadow-sm rounded-4 p-4"
      style={{ width: "550px", border: "1px solid #eee" }}
    >

      <div
        className="d-flex justify-content-between align-items-start pb-2 mb-3"
        style={{ borderBottom: "1px solid #dee2e6" }}
      >
        <p className="fw-semibold mb-0" style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Gilroy" }}>
          Confirm Reassign Bed
        </p>
      </div>

      <div className="row text-center mb-2" style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>
        <div className="col-5 text-start fw-semibold">Current Bed</div>
        <div className="col-2"></div>
        <div className="col-5 text-start fw-semibold">New Bed</div>
      </div>

      <div className="row text-center mb-3">

        <div className="col-5 text-start" style={{ fontFamily: "Gilroy", fontWeight: 600, fontStyle: "Semibold", fontSize: "13px" }}>

          <div className="mb-2">
            <img src={building} alt="Ground Floor" className="me-2" /> Ground Floor
          </div>
          <div className="mb-2">
            <img src={Frame} alt="Room" className="me-2" /> Room G2
          </div>
          <div className="mb-2 mt-1">
            <img src={Vector} alt="Vector" className="me-3" />
            Bed 06
          </div>
        </div>


        <div className="col-2 d-flex justify-content-center align-items-center">
          <img src={repeat} alt="Vector" className="me-5" />
        </div>


        <div className="col-5 text-start" style={{ fontFamily: "Gilroy", fontWeight: 600, fontStyle: "Semibold", fontSize: "13px" }}>
          <div className="mb-2">
            <img src={building} alt="Second Floor" className="me-2" /> Second Floor
          </div>
          <div className="mb-2">
            <img src={Frame} alt="Room" className="me-2" /> Room S2
          </div>
          <div className="mb-2">
            <img src={Vector} alt="Vector" className="me-2" /> Bed 08
          </div>
        </div>
      </div>






      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">




        <div className="w-50" style={{ fontSize: "13px", fontFamily: "Gilroy" }}>
          <Form.Label className="fw-medium">Date</Form.Label>
          <div style={{ position: "relative", width: "100%" }}>
            <DatePicker
              style={{
                width: "100%",
                height: 38,
                cursor: "pointer",
                fontFamily: "Gilroy",
              }}
              format="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              value={date ? dayjs(date) : null}
              onChange={handleDateChange}
              getPopupContainer={(triggerNode) =>
                triggerNode.closest(".show-scroll") || document.body
              }
              disabledDate={(current) => current && current > dayjs().endOf("day")}
              suffixIcon={null}
            />
          </div>
        </div>




        <div className="w-50">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <Form.Label className="fw-medium mb-0" style={{ fontSize: "13px", fontFamily: "Gilroy" }}>New Rent Amount</Form.Label>
            <Form.Check
              type="checkbox"
              label="Same as Current"
              className="mb-0"
              style={{ fontSize: "13px", fontFamily: "Gilroy" }}
            />
          </div>


          <div className="position-relative">
            <span
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#555",
                fontSize: 16,
                fontFamily: "Gilroy",
              }}
            >
              ₹
            </span>
            <Form.Control
              type="number"
              value={newRentAmount}
              onChange={(e) => setNewRentAmount(e.target.value)}
              placeholder="Enter rent amount"
              style={{
                paddingLeft: 30,
              }}
            />
          </div>

        </div>
      </div>




      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="light"
          className="w-50 me-2 border"
          style={{ borderRadius: "8px", backgroundColor: "transparent" }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="w-50"
          style={{ borderRadius: "8px", backgroundColor: "#1a50ff" }}
        >
          <img src={repeatOne} alt="Vector" className="me-2" />
          Assign
        </Button>
      </div>
    </div>
  );
}

export default ConfirmReassignBed;