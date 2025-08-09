/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormControl } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";

function BookingBed(props) {
  const [tenant, setTenant] = useState("");
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingAmount, setBookingAmount] = useState(null);
  const [joiningDate, setJoiningDate] = useState(null);

  const handleBookingDate = (date) => setBookingDate(date);
  const handleJoiningDate = (date) => setJoiningDate(date);

  const handleBookingAmount = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;
    setBookingAmount(value);
  };

  const handleCloseAssign = () => {
    props.setShowAssignMenu(false);
    props.setShowForm(false);
    props.OnShowTable(true);
    if (props.edit === "Edit") {
      props.OnShowTable(true);
    } else {
      props.setRoomDetail(false);
    }
  };

  return (
    <div>
      <Modal
        show={props.showAssignMenu}
        onHide={handleCloseAssign}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 950,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body>
            <Modal.Header
              className="pt-0 pb-2 mb-3"
              style={{
                position: "relative",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div className="w-100 d-flex justify-content-between align-items-start">
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >
                  Booking
                </div>

                <CloseCircle
                  size="24"
                  color="#000"
                  onClick={handleCloseAssign}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <span
                className="text-primary"
                style={{
                  fontSize: "13px",
                  color: "#1E45E1",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Room No G3 &nbsp; | &nbsp; Bed 9
              </span>
            </Modal.Header>

            <div
              style={{ maxHeight: "350px", overflowY: "scroll" }}
              className="show-scroll p-2 mt-2 me-1"
            >
              <div className="col-12 mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    paddingTop: "6px",
                  }}
                >
                  Select Tenant{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Select
                  value={tenant}
                  onChange={(option) => setTenant(option)}
                  placeholder="Select Tenant"
                  options={[
                    { label: "Priya", value: "Priya" },
                    { label: "Karthik", value: "Karthik" },
                    { label: "Meena", value: "Meena" },
                  ]}
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: 48,
                      minHeight: 48,
                      border: "1px solid #D9D9D9",
                      borderRadius: 8,
                      boxShadow: "none",
                      fontFamily: "Gilroy",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#4B4B4B",
                      backgroundColor: "#fff",
                      zIndex: 10,
                      "&:hover": {
                        border: "1px solid #D9D9D9",
                      },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
                      color: "#000",
                      fontFamily: "Gilroy",
                      fontSize: 15,
                      fontWeight: 500,
                      zIndex: 10,
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: 8,
                      fontFamily: "Gilroy",
                      zIndex: 10,
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                    }),
                  }}
                />
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                  <Form.Group controlId="bookingDate">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Booking Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>

                    <DatePicker
                      style={{
                        width: "100%",
                        height: 48,
                        fontFamily: "Gilroy",
                        fontSize: 15,
                        borderRadius: 8,
                        border: "1px solid #D9D9D9",
                        boxShadow: "none",
                      }}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={bookingDate ? dayjs(bookingDate) : null}
                      onChange={handleBookingDate}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".show-scroll") || document.body
                      }
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                    />
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                  <Form.Group>
                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Booking Amount
                      <span style={{ color: "red", fontSize: "20px" }}> *</span>
                    </Form.Label>

                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 12,
                          transform: "translateY(-50%)",
                          fontSize: 16,
                          color: "#000",
                          pointerEvents: "none",
                          zIndex: 1,

                        }}
                      >
                        ₹
                      </span>

                      <FormControl
                        type="text"
                        placeholder="Enter Amount"
                        value={bookingAmount}
                        onChange={handleBookingAmount}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 48,
                          width: "100%",
                          borderRadius: 8,
                          paddingLeft: 30,
                        }}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>

              <div className="col-12 mb-3">
                <Form.Group controlId="joiningDate">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Joining Date (Tentative){" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>

                  <DatePicker
                    style={{
                      width: "100%",
                      height: 48,
                      fontFamily: "Gilroy",
                      fontSize: 15,
                      borderRadius: 8,
                      border: "1px solid #D9D9D9",
                      boxShadow: "none",
                    }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={joiningDate ? dayjs(joiningDate) : null}
                    onChange={handleJoiningDate}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".show-scroll") || document.body
                    }
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("day")
                    }
                  />
                </Form.Group>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#333",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                }}
                onClick={handleCloseAssign}
              >
                Cancel
              </button>

              <button
                type="button"
                style={{
                  backgroundColor: "#1E45E1",
                  color: "#fff",
                  fontWeight: 600,
                  height: 40,
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: "Montserrat",
                  padding: "0 24px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

BookingBed.propTypes = {
  setRoomDetail: PropTypes.func.isRequired,
  setUserClicked: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  OnShowTable: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.any,
  AfterEditFloors: PropTypes.func.isRequired,
  AfterEditRoomses: PropTypes.func.isRequired,
  AfterEditBeds: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  displayDetail: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  advanceForm: PropTypes.func.isRequired,
  setAdvanceForm: PropTypes.func.isRequired,
  setShowAssignMenu: PropTypes.func.isRequired,
  showAssignMenu: PropTypes.bool.isRequired,
};

export default BookingBed;