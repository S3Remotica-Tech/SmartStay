/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import { FiRepeat } from "react-icons/fi";
import building from '/src/Assets/Images/New_images/building1.svg';
import Frame from "/src/Assets/Images/New_images/Frame.svg";
import Group from "/src/Assets/Images/New_images/Group.png";
import repeatOne from "/src/Assets/Images/New_images/repeate-one.svg";
import { FormControl } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
// import Error_Icon from "/src/Assets/Images/New_images/Error_warning.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../Components/ErrorMessage'

function ConfirmChangeBed({ show, handleClose, previousBed, currentBed, customer }) {
  ConfirmChangeBed.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    previousBed: PropTypes.func.isRequired,
    currentBed: PropTypes.func.isRequired
  };

  const selectedDateRef = useRef(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  console.log("previousBed", previousBed)
  console.log("currentBed", currentBed)
  console.log("customer", customer)
  console.log("satte", state.PgList.isClickedBed)

  const isPreviousBed = state.PgList?.isClickedBed
  const [selectedDate, setSelectedDate] = useState(null);
  const [newRoomRent, setNewRoomRent] = useState("");
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [errors, setErrors] = useState({ date: "", rent: "" });


  const currentRoomRent = customer?.currentRent || 0;
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toDate() : null);
    setErrors((prev) => ({ ...prev, date: "" }));
  };


  const handleRentChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNewRoomRent(value);
    setErrors((prev) => ({ ...prev, rent: "" }));
  };


  const handleSameAsCurrent = (e) => {
    const checked = e.target.checked;
    setSameAsCurrent(checked);
    if (checked) {
      setNewRoomRent(currentRoomRent);
      setErrors((prev) => ({ ...prev, rent: "" }));
    } else {
      setNewRoomRent("");
    }
  };


 useEffect(() => {
  if(customer?.currentTenantCustomerId){
    dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: customer?.currentTenantCustomerId } });
  }
  }, [customer]);

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = { date: "", rent: "" };

    if (!selectedDate) {
      newErrors.date = "Please select a date";
      hasError = true;
    }

    if (isPreviousBed?.isOccupied && (!newRoomRent || newRoomRent.trim() === "")) {
      newErrors.rent = "Please enter rent amount";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;


    const payload = {
      customerId: customer?.id,
      previousBedId: previousBed?.id,
      newBedId: currentBed?.id,
      changeDate: dayjs(selectedDate).format("DD-MM-YYYY"),
      newRentAmount: Number(newRoomRent) || 0,
    };

    console.log("payload", payload)

    // Example dispatch or callback
    dispatch({ type: "CHANGE_BED_REQUEST", payload });

    handleClose();
  };
  return (


    <div>
      <Modal
        show={show}
        backdrop="static"
        style={{ marginTop: 50 }}
      >
        <Modal.Dialog
          style={{

            paddingRight: "10px",
            borderRadius: "30px",
            border: "none",
            boxShadow: "none",
          }}
          className="m-0 p-0"
        >
          <Modal.Header
            style={{ position: "relative" }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Confirm Change Bed
            </div>


          </Modal.Header>


          <Modal.Body className="" style={{}} >

            <div className="d-flex justify-content-between align-items-start mb-3" >

              <div>
                <p className="mb-2" style={{ fontFamily: 'Gilroy' }}>Current Bed</p>


                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={building}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="building"
                  />
                  <span style={{ position: 'relative', top: '4px', left: '3px' }}>{isPreviousBed?.floorName || 'N/A'} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Frame}
                    className="me-2"
                    style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    alt="Frame"
                  />
                  <span style={{ position: 'relative', top: '2px' }}>Room {isPreviousBed?.roomName || 'N/A'} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Group}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="Group"
                  />
                  <span style={{ position: 'relative', top: '3px', left: '4px' }}>Bed {isPreviousBed?.bedName || 'N/A'} </span>
                </p>

              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 33,
                  height: 33,
                  borderRadius: 10,
                  padding: 6,
                  backgroundColor: "#EEF1FF",
                  gap: 10,
                  opacity: 1,
                  transform: "rotate(0deg)",
                  marginTop: 80
                }}
              >
                <FiRepeat size={20} color="#1E45E1" />
              </div>



              <div>
                <h6 className="mb-3" style={{ fontFamily: 'Gilroy' }}>New Bed</h6>
                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={building}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="building"
                  />
                  <span style={{ position: 'relative', top: '4px', left: '3px' }}>{currentBed?.floorName || 'N/A'} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Frame}
                    className="me-2"
                    style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    alt="Frame"
                  />
                  <span style={{ position: 'relative', top: '2px' }}>Room {currentBed?.roomName || 'N/A'} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Group}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="Group"
                  />
                  <span style={{ position: 'relative', top: '3px', left: '4px' }}>Bed {currentBed?.bedName || 'N/A'} </span>
                </p>
              </div>
            </div>


            <div className="row" style={{ fontSize: 13 }}>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <Form.Group className="mb-3">
                  <Form.Label style={{ marginBottom: 4, fontSize: 14, fontFamily: "Gilroy" }}>Date</Form.Label>
                  <DatePicker
                    style={{
                      width: "100%",
                      height: 48,
                      border: "1px solid lightgrey",
                      cursor: "pointer",
                      fontFamily: "Gilroy",
                    }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    className="small-placeholder-datepicker"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={handleDateChange}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                  />
                </Form.Group>

                {errors.date && (
                  <ErrorMessage message={errors.date} type="error" />
                )}
              </div>
              {
                isPreviousBed?.isOccupied &&

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      New Rent Amount {" "} <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                      <Form.Check className="ms-3">
                        <Form.Check.Input

                          type="checkbox"
                          checked={sameAsCurrent}
                          onChange={handleSameAsCurrent}
                          style={{ cursor: "pointer" }}
                        />
                        <Form.Check.Label>
                          <span
                            style={{
                              color: "#1E45E1",
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                              fontSize: 11,
                              fontFamily: "Gilroy",
                            }}
                          >
                            Same as Current
                          </span>
                        </Form.Check.Label>
                      </Form.Check>

                    </Form.Label>
                    <FormControl
                      value={newRoomRent}
                      onChange={handleRentChange}
                      type="text"
                      id="form-controls"
                      placeholder="Enter Amount"
                      className="small-placeholder"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                        marginTop: 8,
                      }}
                    />
                    {errors.rent && (
                      <ErrorMessage message={errors.rent} type="error" />
                    )}
                  </Form.Group>


                </div>

              }

            </div>




            <div className="d-flex gap-3 mt-4 ">
              <Button
                variant="light"
                className="px-4"
                style={{ border: "1px solid #ddd", width: "260px", backgroundColor: "white", fontSize: 16, fontFamily: "Gilroy" }}
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                className="px-4"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#1E45E1",
                  borderRadius: "8px",
                  width: "260px", fontSize: 16, fontFamily: "Gilroy"
                }}
              >
                <img src={repeatOne} alt="icon" className="me-2" />
                Assign
              </Button>

            </div>
          </Modal.Body>


        </Modal.Dialog>
      </Modal>




    </div>

  );
}

export default ConfirmChangeBed;


