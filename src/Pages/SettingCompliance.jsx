/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import message from "../Assets/Images/New_images/messages_gray.png";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import { Button, Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../Assets/Images/New_images/empty_image.png";
import { MdError } from "react-icons/md";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import "./SettingCompliance.css";

function SettingCompliance({ hostelid }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showForm, setShowForm] = useState(false);
  const [complaintTypeName, setComplaintTypeName] = useState("");
  const [originalComplaintTypeName, setOriginalComplaintTypeName] =
    useState("");
  const [complaintError, setComplaintError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [id, setId] = useState("");
  const [rowDetails, setRowDetails] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDots, setShowDots] = useState(null);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [compliancerowsPerPage, setCompliancerowsPerPage] = useState(10);
  const [complianceFilterddata, setComplianceFilterddata] = useState([]);
  const [compliancecurrentPage, setCompliancecurrentPage] = useState(1);
  const [planExpiredCompliance, setPlanExpiredCompliance] = useState("");
  const [formLoading, setFormLoading] = useState(false)
  

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    if (rowDetails.id) {
      dispatch({
        type: "DELETE-COMPLAINT-TYPE",
        payload: { id: rowDetails.id },
      });
    }
    setTimeout(() => {
      setShowPopup(false);
    }, 200);
  };

  useEffect(() => {
    if (state.Settings.planExpired) {
      setPlanExpiredCompliance(state.Settings.planExpired);
    }
  }, [state.Settings.planExpired]);

  const handleCancel = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (hostelid) {
      setLoading(true);
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: hostelid },
      });
    }
  }, [hostelid]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowDots = (e, row, index) => {
    e.stopPropagation();
    setShowDots((prev) => (prev === index ? null : index));
    setRowDetails(row);
    const { top, left, height } = e.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 130;

    setPopupPosition({ top: popupTop, left: popupLeft });
    setMenuLoaded(true);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };
  const handleEdit = () => {
    setShowEditForm(true);
    setId(rowDetails.id);
    setComplaintTypeName(rowDetails.complaint_name);
    setOriginalComplaintTypeName(rowDetails.complaint_name);
  };

  const handleClose = () => {
    setShowForm(false);
    setId("");
    setComplaintTypeName("");
    setOriginalComplaintTypeName("");
    setIsChangedError("");
    setShowEditForm(false);
    setComplaintError("");
    setPlanExpiredCompliance("");
    dispatch({ type: "CLEAR_ALREADY_COMPLAINTTYPE_ERROR" });
    dispatch({ type: "CLEAR_PLAN-EXPIRED" })

  };

  const [showPopupvalidation, setShowPopupValidation] = useState(false);
  const handleShowForm = () => {
    if (!hostelid) {
      setShowPopupValidation(true);
      return;
    }
    setShowForm(true);
  };

  const handleAddComplaintType = () => {
     dispatch({ type: "CLEAR_ALREADY_COMPLAINTTYPE_ERROR" });
    dispatch({ type: "CLEAR_PLAN-EXPIRED" })
    

    if (!complaintTypeName) {
      setComplaintError("Please Enter Complaint Type");
    } else {
      dispatch({
        type: "COMPLAINT-TYPE-ADD",
        payload: { complaint_name: complaintTypeName, hostel_id: hostelid },
      });
      setFormLoading(true)
      setComplaintError("");
    }
  };

  const handleEditType = () => {
     dispatch({ type: "CLEAR_ALREADY_COMPLAINTTYPE_ERROR" });
    dispatch({ type: "CLEAR_PLAN-EXPIRED" })

    if (complaintTypeName === originalComplaintTypeName) {
      setIsChangedError("No Changes Detected");
    } else {
      dispatch({
        type: "COMPLAINT-TYPE-EDIT",
        payload: {
          complaint_name: complaintTypeName,
          hostel_id: hostelid,
          id: id,
        },
      });
       setFormLoading(true)
      setIsChangedError("");
    }
  };

  const handleComplaintType = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setComplaintTypeName(value);
    if (e.target.value) {
      setComplaintError("");
    }
  };

  useEffect(() => {
    if (state.Settings.getcomplainttypeStatuscode === 200) {
      setComplianceFilterddata(state.Settings.Complainttypelist);

      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "CLEAR_GET_COMPLAINTTYPE_STATUS_CODE" });
      }, 300);
    }
  }, [state.Settings.getcomplainttypeStatuscode]);

  useEffect(() => {
    if (state.Settings.errorCompliants) {

      setFormLoading(false)
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ERROR_COMPLIANTS" });
      }, 1000);
    }
  }, [state.Settings.errorCompliants]);


  useEffect(()=>{
    if(state.Settings.alreadytypeerror){
      setFormLoading(false)
    }

  },[state.Settings.alreadytypeerror])










  useEffect(() => {
    if (state.Settings.addComplaintSuccessStatusCode === 200) {
      setFormLoading(false)
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: hostelid },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_COMPLAINT_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.addComplaintSuccessStatusCode]);

  useEffect(() => {
    if (state.Settings.deletecomplaintStatuscode === 200) {
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: hostelid },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.deletecomplaintStatuscode]);

  useEffect(() => {
    if (state.Settings.editComplaintSuccessStatusCode === 200) {
      setFormLoading(false)
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: hostelid },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_COMPLAINT_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.editComplaintSuccessStatusCode]);

  const indexOfLastRowCompliance =
    compliancecurrentPage * compliancerowsPerPage;
  const indexOfFirstRowCompliance =
    indexOfLastRowCompliance - compliancerowsPerPage;
  const currentRowCompliance = complianceFilterddata?.slice(
    indexOfFirstRowCompliance,
    indexOfLastRowCompliance
  );

  const handlePageChange = (generalpageNumber) => {
    setCompliancecurrentPage(generalpageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setCompliancerowsPerPage(Number(event.target.value));
    setCompliancecurrentPage(1)
  };

  const totalPagesGeneral = Math.ceil(
    complianceFilterddata?.length / compliancerowsPerPage
  );

  useEffect(() => {
    if (
      complianceFilterddata.length > 0 &&
      currentRowCompliance.length === 0 &&
      compliancecurrentPage > 1
    ) {
      setCompliancecurrentPage(compliancecurrentPage - 1);
    }
  }, [complianceFilterddata]);

  return (
    <div
      style={{
        position: "relative",

        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 130,
            right: 0,
            bottom: 0,
            left: 40,
            display: "flex",
            height: "50vh",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            opacity: 0.75,
            zIndex: 10,
          }}
        >
          <div
            style={{
              borderTop: "4px solid #1E45E1",
              borderRight: "4px solid transparent",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}

      <div
        className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-2"
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          height: 83,
        }}
      >
        <div className="w-100 d-flex justify-content-center justify-content-md-start mt-3">
          <label
            style={{
              fontFamily: "Gilroy",
              fontSize: 20,
              color: "#222",
              fontWeight: 600,
            }}
          >
            {" "}
            Complaint Type
          </label>
        </div>
        <div className="d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0 mb-3 mb-md-0">
          <Button
            onClick={handleShowForm}
            disabled={showPopupvalidation}
            style={{
              fontFamily: "Gilroy",
              fontSize: "14px",
              backgroundColor: "#1E45E1",
              color: "white",
              fontWeight: 600,
              borderRadius: "8px",
              width: 146,
              height: 45,
              textAlign: "center",
              marginTop: 12,
            }}
          >
            {" "}
            + Complaint Type
          </Button>
        </div>
      </div>
      {showPopupvalidation && (
        <div
          className="d-flex flex-wrap mt-3 align-items-center"
          style={{ gap: "10px" }}
        >
          <p
            style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }}
            className="col-12 col-sm-6 col-md-6 col-lg-9"
          >
            Please add a hostel before adding Complaints information.
          </p>
        </div>
      )}

      <div className="complainttype">
        {currentRowCompliance && currentRowCompliance.length > 0 && (
          <div className="container">
            <div className="row scroll-issue">
              {currentRowCompliance.map((u, i) => {
                return (
                  <>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-4 mb-3">
                      <div
                        className="d-flex align-items-center justify-content-between p-3 border rounded w-auto"
                        style={{
                          height: 64,
                          width: "100%",
                        }}
                      >
                        <div className="d-flex align-items-center">
                          <img
                            src={message}
                            width={24}
                            height={24}
                            alt="Role Icon"
                          />
                          <span
                            style={{
                              marginLeft: 20,
                              fontSize: 16,
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              color: "#222222",
                            }}
                          >
                            {u.complaint_name}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleShowDots(e, u, i)}
                          style={{
                            height: "35px",
                            width: "35px",
                            borderRadius: "50%",
                            border: "1px solid #EFEFEF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            cursor: "pointer",
                            backgroundColor:
                              showDots === i ? "#E7F1FF" : "white",
                          }}
                        >
                          <PiDotsThreeOutlineVerticalFill
                            style={{
                              height: "18px",
                              width: "18px",
                              cursor: "pointer",
                            }}
                          />
                        </button>
                      </div>

                      {showDots === i && menuLoaded && (
                        <div
                          ref={popupRef}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#F9F9F9",
                            position: "fixed",
                            top: popupPosition.top,
                            left: popupPosition.left,
                            width: 120,
                            border: "1px solid #EBEBEB",
                            borderRadius: 10,
                            display: "flex",
                            flexDirection: "column",
                                                       alignItems: "flex-start",
                            zIndex: 1000,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                          }}
                        >
                                                  <div
                            className="d-flex align-items-center gap-2 w-100 px-3 py-2"
                            onClick={() => handleEdit(u)}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDF2FF")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            style={{
                              cursor: "pointer",
                              transition: "background-color 0.2s ease",
                               borderTopLeftRadius: 10,
                                            borderTopRightRadius: 10,
                            }}
                          >
                            <img src={Edit} alt="edit" style={{ height: 16, width: 16 }} />
                            <label
                              className="m-0"
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fontFamily: "Gilroy, sans-serif",
                                color: "#222222",
                                cursor: "pointer",
                              }}
                            >
                              Edit
                            </label>
                          </div>

                         
                          <div style={{ width: "100%", height: 1, backgroundColor: "#E6E6E6" }} />

                        
                          <div
                            className="d-flex align-items-center gap-2 w-100 px-3 py-2"
                            onClick={handleDeleteClick}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF0F0")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            style={{
                              cursor: "pointer",
                              transition: "background-color 0.2s ease",
                               borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                            }}
                          >
                            <img src={Delete} alt="delete" style={{ height: 16, width: 16 }} />
                            <label
                              style={{
                                fontSize: 14,
                                fontWeight: 500,
                                fontFamily: "Gilroy, sans-serif",
                                color: "#FF0000",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </label>
                          </div>
                        </div>

                      )}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {!loading && complianceFilterddata.length === 0 && (
        <div style={{ marginTop: 110 }}>
          <div className="d-flex justify-content-center">
            <img
              src={EmptyState}
            
              alt="Empty state"
            />
          </div>
          <div
            className="pb-1"
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: 18,
              color: "rgba(75, 75, 75, 1)",
            }}
          >
            No Complaint Types available
          </div>
        </div>
      )}

      {complianceFilterddata.length >= 10 && (
        <nav className="position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center">
          <div>
            <select
              value={compliancerowsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: "5px",
                border: "1px solid #1E45E1",
                borderRadius: "5px",
                color: "#1E45E1",
                fontWeight: "bold",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: compliancecurrentPage === 1 ? "#ccc" : "#1E45E1",
                  cursor:
                    compliancecurrentPage === 1 ? "not-allowed" : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handlePageChange(compliancecurrentPage - 1)}
                disabled={compliancecurrentPage === 1}
              >
                <ArrowLeft2
                  size="16"
                  color={compliancecurrentPage === 1 ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>

            <li
              style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
            >
              {compliancecurrentPage} of {totalPagesGeneral}
            </li>

            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color:
                    compliancecurrentPage === totalPagesGeneral
                      ? "#ccc"
                      : "#1E45E1",
                  cursor:
                    compliancecurrentPage === totalPagesGeneral
                      ? "not-allowed"
                      : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handlePageChange(compliancecurrentPage + 1)}
                disabled={compliancecurrentPage === totalPagesGeneral}
              >
                <ArrowRight2
                  size="16"
                  color={
                    compliancecurrentPage === totalPagesGeneral
                      ? "#ccc"
                      : "#1E45E1"
                  }
                />
              </button>
            </li>
          </ul>
        </nav>
      )}

      <Modal
        className="editform custom-modal"
        show={showEditForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      >
        <Modal.Header style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Edit Complaint Type
          </div>
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body className="pt-1">
          <div className="col">
            <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 ">
              <Form.Group>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Complaint Type{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Complaint Type"
                  value={complaintTypeName}
                  onChange={(e) => handleComplaintType(e)}
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
              </Form.Group>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{ marginTop: "10px" }}
              >
                {isChangedError && (
                  <>
                    <MdError style={{ marginRight: "7px", color: "red", fontSize:"13px" }} />
                    <span
                      style={{
                        color: "red",
                        fontSize: 13,
                        fontFamily: "Gilroy",
                      }}
                    >
                      {" "}
                      {isChangedError}{" "}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 8,
              width: "100%",
            }}
            onClick={handleEditType}
          >
            Edit Complaint Type
          </Button>
        </Modal.Body>
        {formLoading &&
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
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
                        </div>
                    }
      </Modal>

      <Modal
        show={showForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      >
        <Modal.Header style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Add Complaint Type
          </div>
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body className="pt-1">
          <div className="col">
            <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 16,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Complaint Type{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Complaint Type"
                  value={complaintTypeName}
                  onChange={(e) => handleComplaintType(e)}
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
              </Form.Group>
              <div style={{ marginTop: "-10px" }}>
                {complaintError && (
                  <p
                    style={{
                      display: "flex",
                      fontSize: "13px",
                      alignItems: "center",
                      color: "red",
                      fontFamily: "Gilroy",
                      marginBottom: "-15px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        color: "red",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    >
                      <MdError />
                    </span>
                    {complaintError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

 {formLoading &&
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
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
                        </div>
                    }


        {planExpiredCompliance && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <MdError style={{ marginRight: "7px", color: "red" }} />
            <span
              style={{
                color: "red",
                fontSize: 13,
                fontFamily: "Gilroy",
              }}
            >
              {planExpiredCompliance}
            </span>
          </div>
        )}

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none" }}
        >
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 14,
              padding: "12px 16px 12px 16px",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: 15,
              width: "100%",
            }}
            onClick={handleAddComplaintType}
          >
            + Complaint Type
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showPopup}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            className="w-100 text-center mt-2"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",

              fontWeight: 600,
              color: "#222222",
            }}
          >
            Delete ComplaintType?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",

            marginTop: "-27px",
          }}
        >
          Are you sure you want to delete this Complaint-type?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginTop: "-10px" }}
        >
          <Button
            className="me-2"
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={() => {
              handleCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={() => {
              handleConfirmDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

SettingCompliance.propTypes = {
  hostelid: PropTypes.func.isRequired,
};

export default SettingCompliance;
