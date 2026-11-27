import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";
import {
  fieldClass,
  fieldLabelClass,
  fieldSelectStyles,
} from "../../../Utils/FieldStyles";

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
      <Modal data-testid="short-stay-short-stay-recurring-check-modal" show={show} onHide={handleClose} centered backdrop="static">
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
          <CloseCircle data-testid="short-stay-close-icon"
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
                <Form.Label className={fieldLabelClass}
                 >From</Form.Label>
                <Form.Control data-testid="short-stay-from-input" className={fieldClass()} type="text"
                 
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
                <Form.Label className={fieldLabelClass}
                 >To</Form.Label>
                <Form.Control data-testid="short-stay-to-input" className={fieldClass()} type="text"
                 

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
                  <div data-testid="short-stay-hh-select" className="contents"><Select
                    options={hourOptions}
                    onChange={(e) => setCheckInFromHour(e.value)}
                    placeholder="HH"
                  /></div>
                  <div data-testid="short-stay-mm-select" className="contents"><Select
                    options={minuteOptions}
                    onChange={(e) => setCheckInFromMinute(e.value)}
                    placeholder="MM"
                  /></div>
                  <div data-testid="short-stay-am-pm-select" className="contents"><Select
                    options={ampmOptions}
                    onChange={(e) => setCheckInFromAmPm(e.value)}
                    placeholder="AM/PM"
                  /></div>
                </div>
              ) : (

                <div className="d-flex justify-content-end gap-2 align-items-center">
                  <div data-testid="short-stay-hh-select-2" className="contents"><Select
                    options={hourOptions}
                    onChange={(e) => setCheckInToHour(e.value)}
                    placeholder="HH"
                  /></div>
                  <div data-testid="short-stay-mm-select-2" className="contents"><Select
                    options={minuteOptions}
                    onChange={(e) => setCheckInToMinute(e.value)}
                    placeholder="MM"
                  /></div>
                  <div data-testid="short-stay-am-pm-select-2" className="contents"><Select
                    options={ampmOptions}
                    onChange={(e) => setCheckInToAmPm(e.value)}
                    placeholder="AM/PM"
                  /></div>
                </div>
              )}


            </div>

          </div>

          {/* Check-out Time */}
          <Form.Label style={{ fontWeight: 600 }}>Check-Out Time</Form.Label>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <Form.Group controlId="" style={{ marginBottom: 16 }}>
                <Form.Label className={fieldLabelClass}
                 
                >
                  From
                </Form.Label>
                <Form.Control data-testid="short-stay-from-input-2" className={fieldClass()} type="text"
                 

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
                <Form.Label className={fieldLabelClass}
                 
                >
                  To
                </Form.Label>
                <Form.Control data-testid="short-stay-to-input-2" className={fieldClass()} type="text"
                 
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
                  <div data-testid="short-stay-check-out-time-select" className="contents"><Select
                    options={hourOptions}
                    styles={fieldSelectStyles()}
                    placeholder="HH"
                    onChange={(e) => setCheckOutFromHour(e.value)}
                  /></div>
                  <div data-testid="short-stay-check-out-time-select-2" className="contents"><Select
                    options={minuteOptions}
                    styles={fieldSelectStyles()}
                    placeholder="MM"
                    onChange={(e) => setCheckOutFromMinute(e.value)}
                  /></div>
                  <div data-testid="short-stay-check-out-time-select-3" className="contents"><Select
                    options={ampmOptions}
                    styles={fieldSelectStyles()}
                    placeholder="AM/PM"
                    onChange={(e) => setCheckOutFromAmPm(e.value)}
                  /></div>
                </>
              ) : (
                <>
                  <div data-testid="short-stay-check-out-time-select-4" className="contents"><Select
                    options={hourOptions}
                    styles={fieldSelectStyles()}
                    placeholder="HH"
                    onChange={(e) => setCheckOutToHour(e.value)}
                  /></div>
                  <div data-testid="short-stay-check-out-time-select-5" className="contents"><Select
                    options={minuteOptions}
                    styles={fieldSelectStyles()}
                    placeholder="MM"
                    onChange={(e) => setCheckOutToMinute(e.value)}
                  /></div>
                  <div data-testid="short-stay-check-out-time-select-6" className="contents"><Select
                    options={ampmOptions}
                    styles={fieldSelectStyles()}
                    placeholder="AM/PM"
                    onChange={(e) => setCheckOutToAmPm(e.value)}
                  /></div>
                </>
              )}
            </div>
          </div>



          <Form.Group style={{ marginBottom: 24 }}>
            <Form.Label className={fieldLabelClass}>Late Fee</Form.Label>
            <InputGroup>
              <Form.Control data-testid="short-stay-late-fee-input" className={fieldClass()}
                placeholder="₹ 0.00"
               
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
            <Button data-testid="short-stay-cancel-btn"
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
            <Button data-testid="short-stay-save-btn"
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
