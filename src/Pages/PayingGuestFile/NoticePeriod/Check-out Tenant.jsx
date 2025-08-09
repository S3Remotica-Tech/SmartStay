/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";


function CheckoutTenant(props) {

  const [checkoutDate, setCheckoutDate] = useState(null);
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [fields, setFields] = useState([]);
  const [returnAmount, setReturnAmount] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState([]);

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return;
    }
    setAdvanceAmount(advanceAmount);
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
  }


  useEffect(() => { }, [props.showMenu]);

  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {

    const updatedFields = [...fields];
    const updatedErrors = [...errors];

    updatedFields[index][field] = value;
    setFields(updatedFields);

    if (field === "reason") {
      if (value === "others") {
        updatedFields[index].showInput = true;
        updatedFields[index].reason_name = "others";
        updatedFields[index].customReason = "";
      } else {
        updatedFields[index].showInput = false;
        updatedFields[index].reason = value;
        updatedFields[index].reason_name = value;
        updatedFields[index].customReason = "";
      }


      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "customReason") {
      updatedFields[index].customReason = value;
      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      updatedFields[index].amount = value;


      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
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
          <Modal.Body >
            <div>

              <div>

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
                      Check-out Tenant
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
                    style={{ fontSize: "13px", color: "#1E45E1", fontWeight: 600, fontFamily: "Gilroy" }}
                  >
                    Room No G3 &nbsp; | &nbsp; Bed 9
                  </span>
                </Modal.Header>



                <div className="d-flex align-items-center gap-3 mb-3 ms-3">
                  <img
                    src={Profileimage}
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div>
                    <p className="mb-1"
                      style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px", color: "#1B1B1B" }}>
                      Rajesh
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "13px", color: "#6C757D" }}
                    >
                      +91 98765 43210
                    </p>

                  </div>
                </div>





                <div style={{ maxHeight: "350px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                  <div className="row d-flex align-items-center">

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                      <Form.Group controlId="purchaseDate">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Checkout Date{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </Form.Label>

                        <div
                          className="datepicker-wrapper"
                          style={{ position: "relative", width: "100%" }}
                        >
                          <DatePicker
                            style={{
                              width: "100%",
                              height: 48,
                              cursor: "pointer",
                              fontFamily: "Gilroy",
                            }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={checkoutDate ? dayjs(checkoutDate) : null}
                            onChange={(date) => {

                              setCheckoutDate(date ? date.toDate() : null);
                            }}
                            getPopupContainer={(triggerNode) =>
                              triggerNode.closest(".show-scroll") || document.body
                            }
                            disabledDate={(current) =>
                              current && current > dayjs().endOf("day")
                            }
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                      <Form.Group>
                        <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                          Advance Amount
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
                            value={AdvanceAmount}
                            onChange={handleAdvanceAmount}
                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                              paddingLeft: 30,
                            }}
                          />
                        </div>
                      </Form.Group>

                    </div>

                  </div>

                  <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-3 mb-3">


                    <div className="d-flex justify-content-between align-items-center p-3 mb-2">

                      <div className="d-flex align-items-center">
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            marginBottom: 0,
                          }}
                        >
                          Advance Deduction
                        </label>
                      </div>


                      <div className="d-flex align-items-center">
                        <Button
                          onClick={handleAddField}
                          style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "10px",
                            padding: "6px 15px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: 0,
                          }}
                        >
                          <img
                            src={addcircle}
                            alt="Assign Bed"
                            style={{
                              height: 16,
                              width: 16,
                              filter: "brightness(0) invert(1)",
                            }}
                          />
                          Add
                        </Button>
                      </div>
                    </div>


                    {fields.map((item, index) => {
                      return (
                        <div className="row px-4 mb-3 d-flex" key={index}>

                          <div className="col-md-6" style={{ flex: 1 }}>

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Due Amount"
                              value={item.reason_name}
                              onChange={(e) => handleInputChange(index, "reason_name", e.target.value)}
                              style={{
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                                height: 50,
                                borderRadius: 8,
                              }}
                            />

                          </div>


                          <div className="col-md-5 position-relative px-2" style={{ flex: 1 }}>
                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={item.amount}
                              onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                              className="form-control"
                              style={{
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                                height: 50,
                                borderRadius: 8,
                                paddingRight: 35,
                              }}
                            />


                            <button
                              type="button"
                              onClick={() => handleRemoveField(index)}
                              style={{
                                position: "absolute",
                                right: 5,
                                top: "10%",
                                transform: "translateY(-50%)",
                                background: "#F0F0F0",
                                border: "1px solid #C1C1C1",
                                borderRadius: "50%",
                                width: 20,
                                height: 20,
                                padding: 0,
                                fontSize: 12,
                                lineHeight: 1,
                                textAlign: "center",
                                color: "#333",
                              }}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  <div className="datepicker-wrapper relative z-10">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        paddingTop: "6px",
                      }}
                    >
                      Return Amount{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </Form.Label>

                    <div className="position-relative">
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "10px",
                          transform: "translateY(-50%)",
                          fontSize: "16px",
                          color: "#555",
                        }}
                      >
                        ₹
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter amount"
                        value={returnAmount}
                        onChange={(e) => setReturnAmount(e.target.value)}
                        style={{
                          paddingLeft: "30px",
                          height: "50px",
                        }}
                      />
                    </div>
                  </div>



                  <div className="col-12">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        paddingTop: "6px",
                      }}
                    >
                      Reason(Comments) {" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        *
                      </span>
                    </Form.Label>

                    <Select

                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Cancelled Relocation"
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: "50px",
                          border: "1px solid #D9D9D9",
                          borderRadius: "8px",
                          fontSize: "15px",
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          fontFamily: "Gilroy",
                        }),
                        menuList: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          maxHeight: "120px",
                          padding: 0,
                          scrollbarWidth: "thin",
                          overflowY: "auto",
                          fontFamily: "Gilroy",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#555",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#555",
                          display: "inline-block",
                          fill: "currentColor",
                          lineHeight: 1,
                          stroke: "currentColor",
                          strokeWidth: 0,
                          cursor: "pointer",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                          color: "#000",
                        }),
                      }}
                    />


                  </div>

                </div>

                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: 10, justifyContent: "flex-end" }}>
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
                    Check-Out
                  </button>
                </div>


              </div>

            </div>
          </Modal.Body>



        </Modal.Dialog>
      </Modal>



    </div>
  );
}

CheckoutTenant.propTypes = {
  setRoomDetail: PropTypes.func.isRequired,
  setUserClicked: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  OnShowTable: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
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
  showAssignMenu: PropTypes.func.isRequired,
};
export default CheckoutTenant;