/* eslint-disable react-hooks/exhaustive-deps */
import { Form} from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";


function  MoveToNoticePeriod(props) {


  const [requestDate, setRequestDate] = useState(null);
  const [checkoutDate, setCheckoutDate] = useState(null);
  const [reason, setReason] = useState("");


  const handleRequestDateChange = (date) => {
    setRequestDate(date ? date.toDate() : null);
  };

  const handleCheckoutDateChange = (date) => {
    setCheckoutDate(date ? date.toDate() : null);
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
                    borderBottom: "none",
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
                      Move to Notice Period
                    </div>


                  </div>

                  <span
                    className="text-primary"
                    style={{ fontSize: "13px", color: "#1E45E1", fontWeight: 500, fontFamily: "Gilroy" }}
                  >
                    Notice Days : 30
                  </span>
                </Modal.Header>


                <div className="d-flex align-items-center gap-3 mb-3 ms-3">
                  <img
                    src={Profileimage}
                    alt="Profile"
                    className="rounded-circle"
                    width="45"
                    height="45"
                  />
                  <div>
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                      Rajesh
                    </p>
                    <div className="d-flex gap-2">
                      <span
                        style={{
                          backgroundColor: "#FFF3CD",
                          color: "#856404",
                          fontSize: "9px",
                          padding: "2px 6px",
                          borderRadius: "12px",
                          fontWeight: 500,
                        }}
                      >
                        Ground Floor
                      </span>
                      <span
                        style={{
                          backgroundColor: "#F8D7DA",
                          color: "#721C24",
                          fontSize: "9px",
                          padding: "2px 6px",
                          borderRadius: "12px",
                          fontWeight: 500,
                        }}
                      >
                        G005 - B03
                      </span>
                    </div>
                  </div>
                </div>


                <div style={{ maxHeight: "350px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">

                  <div className="row d-flex align-items-center">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                      <Form.Group controlId="requestDate">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Request Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </Form.Label>

                        <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                          <DatePicker
                            style={{
                              width: "100%",
                              height: 48,
                              cursor: "pointer",
                              fontFamily: "Gilroy",
                            }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={requestDate ? dayjs(requestDate) : null}
                            onChange={handleRequestDateChange}
                            getPopupContainer={(triggerNode) =>
                              triggerNode.closest(".show-scroll") || document.body
                            }
                            disabledDate={(current) => current && current > dayjs().endOf("day")}
                            suffixIcon={null}
                          />
                        </div>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                      <Form.Group controlId="checkoutDate">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Check-out Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </Form.Label>

                        <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
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
                            onChange={handleCheckoutDateChange}
                            getPopupContainer={(triggerNode) =>
                              triggerNode.closest(".show-scroll") || document.body
                            }
                            disabledDate={(current) => current && current > dayjs().endOf("day")}
                            suffixIcon={null}
                          />
                        </div>
                      </Form.Group>
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
                      Reason(Comments){" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>

                    <Form.Control
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Enter Comments"
                      style={{
                        height: "50px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "15px",
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
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
                    Move
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

 MoveToNoticePeriod.propTypes = {
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
export default MoveToNoticePeriod;