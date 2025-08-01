import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";

function ShortStayRecurringModal({ handleClose, show }) {




  const hourOptions = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString().padStart(2, "0"),
  }));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    const m = i < 10 ? `0${i}` : `${i}`;
    return {
      value: m,
      label: m,
    };
  });

  const ampmOptions = ["AM", "PM"].map((p) => ({ value: p, label: p }));

  const selectStyle = {
    control: (base) => ({
      ...base,
      height: 45,
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "14px",
      fontFamily: "Gilroy",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#1E45E1" : "#fff",
      color: state.isFocused ? "#fff" : "#222",
      fontSize: 14,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: 150,
      padding: 0,
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };



  const [fromEditing, setFromEditing] = useState(false);


  const [checkInFromHour, setCheckInFromHour] = useState("");
  const [checkInFromMinute, setCheckInFromMinute] = useState("");
  const [checkInFromAmPm, setCheckInFromAmPm] = useState("");

  const [checkInToHour, setCheckInToHour] = useState("");
  const [checkInToMinute, setCheckInToMinute] = useState("");
  const [checkInToAmPm, setCheckInToAmPm] = useState("");






  const [checkOutEditing, setCheckOutEditing] = useState(false);

  const [checkOutFromHour, setCheckOutFromHour] = useState("");
  const [checkOutFromMinute, setCheckOutFromMinute] = useState("");
  const [checkOutFromAmPm, setCheckOutFromAmPm] = useState("");

  const [checkOutToHour, setCheckOutToHour] = useState("");
  const [checkOutToMinute, setCheckOutToMinute] = useState("");
  const [checkOutToAmPm, setCheckOutToAmPm] = useState("");

  




  return (
    <>
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header style={{}}>
          <Modal.Title
            style={{
              fontSize: 18,
              color: "#222222",
              fontFamily: "Gilroy",
              fontWeight: 600,
            }}
          >
            Short Stay Recurring
          </Modal.Title>
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>

        <Modal.Body className="pt-2" style={{ fontFamily: "Gilroy" }}>

          <Form.Label style={{ fontWeight: 600, color: "#222" }}>Check-in Time</Form.Label>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 ">


              <Form.Group controlId="" style={{ marginBottom: 16 }}>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}>From</Form.Label>
                <Form.Control type="text"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 40,
                    borderRadius: 8,
                  }}
                  onFocus={() => {
                    setFromEditing(true);
                    setCheckInFromHour("");
                    setCheckInFromMinute("");
                    setCheckInFromAmPm("");
                  }}
                  value={
                    checkInFromHour || checkInFromMinute || checkInFromAmPm
                      ? `${checkInFromHour}:${checkInFromMinute} ${checkInFromAmPm}`
                      : ""
                  }
                  placeholder="HH:MM AM/PM"

                />
              </Form.Group>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <Form.Group controlId="" style={{ marginBottom: 16 }}>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}>To</Form.Label>
                <Form.Control type="text"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 40,
                    borderRadius: 8,
                  }}

                  value={
                    checkInToHour || checkInToMinute || checkInToAmPm
                      ? `${checkInToHour}:${checkInToMinute} ${checkInToAmPm}`
                      : ""
                  }
                  placeholder="HH:MM AM/PM"

                  onFocus={() => {
                    setFromEditing(false);
                    setCheckInToHour("");
                    setCheckInToMinute("");
                    setCheckInToAmPm("");
                  }}

                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end gap-2 align-items-center">


              {fromEditing ? (
                <div className="d-flex justify-content-end gap-2 align-items-center">
                  <Select
                    options={hourOptions}
                    onChange={(e) => setCheckInFromHour(e.value)}
                    placeholder="HH"
                  />
                  <Select
                    options={minuteOptions}
                    onChange={(e) => setCheckInFromMinute(e.value)}
                    placeholder="MM"
                  />
                  <Select
                    options={ampmOptions}
                    onChange={(e) => setCheckInFromAmPm(e.value)}
                    placeholder="AM/PM"
                  />
                </div>
              ) : (

                <div className="d-flex justify-content-end gap-2 align-items-center">
                  <Select
                    options={hourOptions}
                    onChange={(e) => setCheckInToHour(e.value)}
                    placeholder="HH"
                  />
                  <Select
                    options={minuteOptions}
                    onChange={(e) => setCheckInToMinute(e.value)}
                    placeholder="MM"
                  />
                  <Select
                    options={ampmOptions}
                    onChange={(e) => setCheckInToAmPm(e.value)}
                    placeholder="AM/PM"
                  />
                </div>
              )}


            </div>

          </div>

          {/* Check-out Time */}
          <Form.Label style={{ fontWeight: 600 }}>Check-Out Time</Form.Label>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <Form.Group controlId="" style={{ marginBottom: 16 }}>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  From
                </Form.Label>
                <Form.Control type="text"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 40,
                    borderRadius: 8,
                  }}

                  value={
                    checkOutFromHour || checkOutFromMinute || checkOutFromAmPm
                      ? `${checkOutFromHour}:${checkOutFromMinute} ${checkOutFromAmPm}`
                      : ""
                  }
                  placeholder="HH:MM AM/PM"

                  onFocus={() => {
                    setCheckOutEditing(true);
                    setCheckOutFromHour("");
                    setCheckOutFromMinute("");
                    setCheckOutFromAmPm("");
                  }}


                />
              </Form.Group>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <Form.Group controlId="" style={{ marginBottom: 16 }}>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  To
                </Form.Label>
                <Form.Control type="text"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 40,
                    borderRadius: 8,
                  }}
                  placeholder="HH:MM AM/PM"
                  value={
                    checkOutToHour || checkOutToMinute || checkOutToAmPm
                      ? `${checkOutToHour}:${checkOutToMinute} ${checkOutToAmPm}`
                      : ""
                  }
                  onFocus={() => {
                    setCheckOutEditing(false);
                    setCheckOutToHour("");
                    setCheckOutToMinute("");
                    setCheckOutToAmPm("");
                  }}

                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end gap-2 align-items-center">
              {checkOutEditing ? (
                <>
                  <Select
                    options={hourOptions}
                    styles={selectStyle}
                    placeholder="HH"
                    onChange={(e) => setCheckOutFromHour(e.value)}
                  />
                  <Select
                    options={minuteOptions}
                    styles={selectStyle}
                    placeholder="MM"
                    onChange={(e) => setCheckOutFromMinute(e.value)}
                  />
                  <Select
                    options={ampmOptions}
                    styles={selectStyle}
                    placeholder="AM/PM"
                    onChange={(e) => setCheckOutFromAmPm(e.value)}
                  />
                </>
              ) : (
                <>
                  <Select
                    options={hourOptions}
                    styles={selectStyle}
                    placeholder="HH"
                    onChange={(e) => setCheckOutToHour(e.value)}
                  />
                  <Select
                    options={minuteOptions}
                    styles={selectStyle}
                    placeholder="MM"
                    onChange={(e) => setCheckOutToMinute(e.value)}
                  />
                  <Select
                    options={ampmOptions}
                    styles={selectStyle}
                    placeholder="AM/PM"
                    onChange={(e) => setCheckOutToAmPm(e.value)}
                  />
                </>
              )}
            </div>
          </div>



          <Form.Group style={{ marginBottom: 24 }}>
            <Form.Label style={{ fontWeight: 600 }}>Late Fee</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="₹ 0.00"
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  borderRight: "none", 
                  height: 40,
                  borderRadius: "8px 0 0 8px",
                }}
              />
              <InputGroup.Text
                style={{
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  border: "1px solid #D9D9D9",
                  borderLeft: "none", 
                  backgroundColor: "#fff",
                  borderRadius: "0 8px 8px 0",
                  color: "#9C9C9C",
                }}
              >
                /hr
              </InputGroup.Text>
            </InputGroup>
            <Form.Text
              muted
              style={{
                color: "#7C7C7C",
                fontWeight: 400,
                fontFamily: "Gilroy",
                fontSize: 14,
              }}
            >
              Add a penalty amount. If the tenant checks out late.
            </Form.Text>
          </Form.Group>


         <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 16,
            }}
          >
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#fff",
                border: "1px solid #4B4B4B",
                borderRadius: 12,
                padding: "8px 35px",
                fontWeight: 400,
                fontFamily: "Gilroy",
                color: "#4B4B4B",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#1E45E1",
                borderRadius: 12,
                padding: "8px 45px",
                fontWeight: 400,
                border: "none",
                fontFamily: "Gilroy",
                color: "#fff",
              }}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal >
    </>
  );
}
ShortStayRecurringModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  
  
};
export default ShortStayRecurringModal;
