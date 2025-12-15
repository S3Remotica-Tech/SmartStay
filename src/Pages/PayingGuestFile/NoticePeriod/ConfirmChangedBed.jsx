/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import { FiRepeat } from "react-icons/fi";
import building from '/src/Assets/Images/New_images/building1.svg';
import Frame from "/src/Assets/Images/New_images/Frame.svg";
// import Group from "/src/Assets/Images/New_images/Group.png";
import repeatOne from "/src/Assets/Images/New_images/repeate-one.svg";
import { FormControl } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { CloseCircle } from "iconsax-react";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(minMax);
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../Components/ErrorMessage';
import { LiaBedSolid } from "react-icons/lia";

function ConfirmChangeBed({ show, handleClose,  currentBed,  }) {
  ConfirmChangeBed.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    previousBed: PropTypes.func.isRequired,
    currentBed: PropTypes.func.isRequired
  };

  // const selectedDateRef = useRef(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch();


const [formLoading, setFormLoading] = useState(false)
  const isPreviousBed = state.PgList?.isClickedBed



  const [selectedDate, setSelectedDate] = useState(null);
  const [newRoomRent, setNewRoomRent] = useState("");
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [errors, setErrors] = useState({ date: "", rent: "" });


  const currentRoomRent = currentBed?.rentAmount || 0;
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toDate() : null);
    setErrors((prev) => ({ ...prev, date: "" }));
  };


  const handleRentChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");


    if (/^0+$/.test(value)) {
      value = "";
    } else if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }

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
    if (isPreviousBed?.currentTenantInfo?.tenetId) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: isPreviousBed?.currentTenantInfo?.tenetId } });
    }
  }, [isPreviousBed]);

  const handleSubmit = () => {
    let hasError = false;
    const newErrors = { date: "", rent: "" };

    if (!selectedDate) {
      newErrors.date = "Please Select a  Date";
      hasError = true;
    }

    if (isPreviousBed?.isOccupied && (!newRoomRent)) {
      newErrors.rent = "Please Enter Rent Amount";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;


    const formatToCustomDate = (date) => {
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${dd}-${mm}-${yyyy}`
    }
    const formattedDate = selectedDate ? formatToCustomDate(selectedDate) : "";

    const datum = {
      bedId: currentBed?.id,
      rentAmount: Number(newRoomRent) || 0,
      joiningDate: formattedDate,
    };

    if (state.login.selectedHostel_Id && datum) {
      const payload = {
        hostelId: state.login.selectedHostel_Id,
        customerId: isPreviousBed?.currentTenantInfo?.tenetId,
        datum,
      };
      dispatch({
        type: "CUSTOMERREASSINBED",
        payload,
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.changeBedError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_CHANGE_BED_ERROR" });
      }, 3000)

    }

  }, [state.UsersList?.changeBedError])


  const CustomerOverView = state.UsersList.customerdetails;




  const invoices = CustomerOverView?.invoiceResponseList || [];
  // const lastBillDate = invoices.length > 0
  //   ? dayjs(invoices[invoices.length - 1].invoiceGeneratedDate, "DD/MM/YYYY")
  //   : null;





  const disabledDate = (current) => {
    const today = dayjs().endOf("day");
    const joiningDate = dayjs(CustomerOverView?.hostelInfo?.joiningDate, "DD/MM/YYYY");
    const invoices = CustomerOverView?.invoiceResponseList || [];
    const bedHistory = CustomerOverView?.bedHistory || [];


    const lastBillDate = invoices.length > 0
      ? dayjs(invoices[invoices.length - 1].invoiceGeneratedDate, "DD/MM/YYYY")
      : null;


    let latestBedChangeDate = null;
    if (bedHistory.length > 0) {
      const lastRecord = bedHistory[bedHistory.length - 1];
      if (lastRecord.endDate === "Till date") {
        latestBedChangeDate = dayjs(lastRecord.startDate, "DD/MM/YYYY");
      } else {
        const validDates = bedHistory
          .filter((b) => b.startDate)
          .map((b) => dayjs(b.startDate, "DD/MM/YYYY"));
        if (validDates.length > 0) {
          latestBedChangeDate = dayjs.max(validDates);
        }
      }
    }


    if (current.isAfter(today, "day")) {
      return true;
    }


    const joinedThisMonth =
      joiningDate.month() === dayjs().month() && joiningDate.year() === dayjs().year();

    if (joinedThisMonth) {

      const compareDate =
        bedHistory.length > 0 ? latestBedChangeDate : joiningDate;
      return current.isBefore(compareDate, "day") || current.isAfter(today, "day");
    }


    const compareDate = latestBedChangeDate || lastBillDate || joiningDate;
    return current.isBefore(compareDate, "day") || current.isAfter(today, "day");
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

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
          </Modal.Header>


          <Modal.Body
            style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll mt-1 me-3"
          >

            <div className="d-flex justify-content-between align-items-start mb-1" >

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
                  <span style={{ position: 'relative', top: '2px' }}>{isPreviousBed?.roomName || 'N/A'} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>

                  <LiaBedSolid style={{ width: '20px', height: '20px', verticalAlign: 'middle', color: "#1E45E1" }} />
                  <span className="ms-2" style={{ position: 'relative', top: '3px', left: '4px' }}>{isPreviousBed?.bedName || 'N/A'} </span>
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
                  <span style={{ position: 'relative', top: '2px' }}>{currentBed?.roomName || 'N/A'} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <LiaBedSolid style={{ width: '20px', height: '20px', verticalAlign: 'middle', color: "#1E45E1" }} />
                  <span className="ms-2" style={{ position: 'relative', top: '3px', left: '4px' }}>{currentBed?.bedName || 'N/A'} </span>
                </p>
              </div>
            </div>


            <div className="row" style={{ fontSize: 13 }}>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
                <Form.Group className="mb-1">
                  <Form.Label style={{ marginBottom: 4, fontSize: 14, fontFamily: "Gilroy" }}>Date {" "} <span style={{ color: "red", fontSize: "20px" }}>
                    *
                  </span></Form.Label>
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
                    disabledDate={disabledDate}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                  />
                </Form.Group>

                {errors.date && (
                  <ErrorMessage message={errors.date} type="error" />
                )}
              </div>


              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <div className="d-flex align-items-center">


                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "nowrap",
                        marginBottom: 0,
                      }}
                    >
                      New Rent Amount{" "}
                      <span style={{ color: "red", fontSize: 20 }}>*</span>
                    </Form.Label>


                    <div className="d-flex align-items-center ms-3">
                      <Form.Check.Input
                        type="checkbox"
                        checked={sameAsCurrent}
                        onChange={handleSameAsCurrent}
                        style={{ cursor: "pointer" }}
                      />
                      <span className="mt-1"
                        style={{
                          marginLeft: 4,
                          color: "#1E45E1",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          fontSize: 11,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Same as Current
                      </span>
                    </div>

                  </div>

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



            </div>


            {state.UsersList?.changeBedError && <div className="d-flex justify-content-center">
              <ErrorMessage message={state.UsersList?.changeBedError} type="error" />
            </div>}


          </Modal.Body>
          <div className="d-flex gap-3 mt-1 ms-3 me-3  mb-3 ">
            <Button
              variant="light"
              className="px-4"
              style={{ border: "1px solid #ddd", width: "260px", backgroundColor: "white", fontSize: 16, fontFamily: "Gilroy" }}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button disabled={formLoading}
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

{formLoading && <div
                style={{
                    position: 'absolute',
                    top: 100,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    opacity: 0.75,
                    zIndex: 10,
                }}
            >
                <div
                    style={{
                        borderTop: '4px solid #1E45E1',
                        borderRight: '4px solid transparent',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        animation: 'spin 1s linear infinite',
                    }}
                ></div>
            </div>}
        </Modal.Dialog>
      </Modal>




    </div>

  );
}

export default ConfirmChangeBed;


