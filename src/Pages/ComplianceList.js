import React, { useState, useEffect, useRef } from "react";
import Edit from "../Assets/Images/edit-Complaints.svg";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import User from "../Assets/Images/Ellipse 1.png";
import Tickicon from "../Assets/Images/tick-circle.png";
import Profile_add from "../Assets/Images/profile-add.png";
import moment from "moment";
import Delete from "../Assets/Images/New_images/trash.png";
import ChangeStatusIcon from "../Assets/Images/ComplaintChangeStatusicon.svg";
import AssignComplaintIcon from "../Assets/Images/profile-add-AssingnComplaint.svg";
import CommentIcon from "../Assets/Images/Comment-icon-complaints page.svg";
import manimg from "../Assets/Images/Man Img.svg";
import closeicon from "../Assets/Images/close.svg";
import send from "../Assets/Images/send.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormControl, InputGroup, Pagination } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const ComplianceList = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showDots, setShowDots] = useState(null);
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const [compliant, setCompliant] = useState("");
  const [complianceError, setComplianceError] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showAssignComplaint, setShowAssignComplaint] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [hostel_id, setHostel_Id] = useState("");
  const [assignId, setAssignId] = useState("");
  const [showAssignee,setShowAssigne] = useState("")

  const popupRef = useRef(null);
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);

  function getFloorName(floor_Id) {
    if (floor_Id === 1) {
      return "Ground Floor";
    } else if (floor_Id === 2) {
      return "1st Floor";
    } else if (floor_Id === 3) {
      return "2nd Floor";
    } else if (floor_Id === 4) {
      return "3rd Floor";
    } else if (floor_Id >= 11 && floor_Id <= 13) {
      const id = floor_Id - 1;
      return `${id}th Floor`;
    } else {
      const lastDigit = floor_Id % 10;
      let suffix = "th";

      switch (lastDigit) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
      }

      return `${floor_Id - 1}${suffix} Floor`;
    }
  }

  function getFormattedRoomId(floor_Id, room_Id) {
    const roomIdString = String(room_Id);
    switch (floor_Id) {
      case 1:
        return `${roomIdString.padStart(3, "0")}`;
      case 1:
        return `G${roomIdString.padStart(3, "0")}`;
      case 2:
        return `F${roomIdString.padStart(3, "0")}`;
      case 3:
        return `S${roomIdString.padStart(3, "0")}`;
      case 4:
        return `T${roomIdString.padStart(3, "0")}`;
      default:
        const floorAbbreviation = getFloorAbbreviation(floor_Id - 1);
        // return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
        return `${roomIdString.padStart(3, "0")}`;
    }
  }

  function getFloorAbbreviation(floor_Id) {
    switch (floor_Id) {
      case 5:
        return "F";
      case 6:
        return "S";
      case 8:
        return "E";
      case 9:
        return "N";
      case 10:
        return "T";

      default:
        return `${floor_Id}`;
    }
  }

  const handleDeleteFormShow = (item) => {
    setDeleteForm(true);
    setDeleteId(item.ID);
  };
  const handleCloseDeleteForm = () => {
    setDeleteForm(false);
  };
  useEffect(() => {
    if (state.UsersList?.statusCodeCompliance === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_LIST" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeCompliance]);

  const handleComplianceDelete = () => {
    dispatch({ type: "DELETECOMPLIANCE", payload: { id: deleteId } });
  };

  useEffect(() => {
    if (state.ComplianceList.statusCodeForDeleteCompliance === 200) {
      handleCloseDeleteForm();
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostel_id: hostel_id } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_COMPLIANCE" });
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForDeleteCompliance]);
  // const handleShowDots = () => {
  //   setShowDots(!showDots)
  // }
  const handleShowDots = (id) => {
    if (showDots == id) {
      setShowDots(null);
    } else {
      setShowDots(id);
    }
    // setSearch(false);
  };

  const handleEdit = (item) => {
    props.onEditComplaints(item);
  };

  const handleassignshow = () => {
    props.onAssignshow();
  };

  const handleIconClick = () => {
    setShowCard(!showCard);
  };

  const handleChangeStatusClick = () => {
    if (status === "") {
      setComplianceError("Please Select Compliant");
    } else {
      dispatch({
        type: "COMPLIANCEASSIGN",
        payload: {
          type: "status_change",
          assigner: compliant,
          status: status,
          id: assignId,
          hostel_id: hostel_id,
        },
      });
    }
  };

 
  const handleChangeStatusOpenClose = (item) => {
    console.log("status",item.Status)
    setAssignId(item?.ID); 
    setShowDots(false);
    // setStatus("");
    setShowChangeStatus(true);
    setShowAssignComplaint(false);
    setStatus(item.Status)
  };

  //assign complaint
  const ChangeStatusClose = () => {
    setShowChangeStatus(false);
    setStatusError("")
  };
  const handleAssignComplaintClick = () => {
    if (compliant === "") {
      setStatusError("Please Select status");
    } else {
      dispatch({
        type: "COMPLIANCEASSIGN",
        payload: {
          type: "assign",
          assigner: compliant,
          status: status,
          id: assignId,
          hostel_id: hostel_id,
        },
      });
    }
    setShowAssignComplaint(false); // Close Assign Complaint modal
    setShowChangeStatus(false);
  };

  useEffect(() => {
    if (state.ComplianceList.complianceAssignChangeStatus === 200) {
      setShowAssignComplaint(false);
      setShowChangeStatus(false);
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostel_id: hostel_id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_CHANGE_ASSIGN" });
      }, 500);
    }
  }, [state.ComplianceList.complianceAssignChangeStatus]);


  
  const handleAssignOpenClose = (item) => {
    console.log("handleAssignOpenClose", item);
    setAssignId(item?.ID);
    setShowDots(false);
    setCompliant(item?.Assign);
    setShowAssignComplaint(true);
    setShowChangeStatus(false);
  };
  const handleCloseAssign = () => {
    setShowAssignComplaint(false);
    setStatusError("")
  };

  const handleCompliant = (e) => {
    setCompliant(e.target.value);
    if (e.target.value === "") {
      setComplianceError("Please Select Compliant");
    } else {
      setComplianceError(" ");
    }
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
    if (e.target.value === "") {
      setStatusError("Please Select Status");
    } else {
      setStatusError("");
    }
  };

  useEffect(() => {
    dispatch({ type: "GETUSERSTAFF" });
  }, []);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries,
      appearOnScrool
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  useEffect(() => {
    if (state.ComplianceList.complianceChangeStatus === 200) {
      handleAssignOpenClose();
      handleChangeStatusOpenClose();

      // dispatch({ type: 'COMPLIANCE-LIST' })
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostel_id: hostel_id } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_CHANGE_STATUS_CODE" });
      }, 500);
    }
  }, [state.ComplianceList.complianceChangeStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowDots(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Card
        className="h-100 fade-in"
        style={{ borderRadius: 16, border: "1px solid #E6E6E6" }}
      >
        <Card.Body style={{ padding: 20 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-2">
              <div className="">
                <Image
                  src={User}
                  roundedCircle
                  style={{ height: "60px", width: "60px" }}
                />
              </div>
              <div>
                <div className="pb-2">
                  <label
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "#222",
                      fontWeight: 600,
                      marginLeft: "10px",
                    }}
                  >
                    {props.complaints && props.complaints.Name}{" "}
                  </label>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      style={{
                        marginTop: 5,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        background: "#FFE0D9",
                        padding: "6px 12px",
                        borderRadius: "60px",
                        marginRight: "10px",
                        fontFamily: "Gilroy",
                        fontSize: 16,
                        color: "#222",
                        fontWeight: 500,
                      }}
                    >
                      {props.complaints && props.complaints.room_name} - B
                      {props.complaints && props.complaints.Bed}
                    </div>
                    <div
                      style={{
                        marginTop: 5,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        background: "#FFEFCF",
                        padding: "6px 12px",
                        borderRadius: "60px",
                        fontFamily: "Gilroy",
                        fontSize: 16,
                        color: "#222",
                        fontWeight: 500,
                      }}
                    >
                      {props.complaints.floor_name}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  border: "1px solid #EFEFEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
                onClick={() => handleShowDots(props.complaints.ID)}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />

                {showDots === props.complaints.ID && (
                  <>
                    <div
                      ref={popupRef}
                      style={{
                        backgroundColor: "#EBEBEB",
                        position: "absolute",
                        right: 0,
                        top: 50,
                        width: 175,
                        height: 159,
                        border: "1px solid #EBEBEB",
                        borderRadius: 12,
                        display: "flex",
                        justifyContent: "start",
                        padding: 15,
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          className={"mb-2"}
                          onClick={() =>
                            handleChangeStatusOpenClose(props.complaints)
                          }
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={ChangeStatusIcon}
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            alt="Edit"
                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: "Gilroy, sans-serif",

                              cursor: "pointer",
                              paddingLeft: 5,
                            }}
                          >
                            Change Status
                          </label>
                        </div>

                        <div
                          className={"mb-2"}
                          onClick={() =>
                            handleAssignOpenClose(props.complaints)
                          }
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={AssignComplaintIcon}
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            alt="Edit"
                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: "Gilroy, sans-serif",
                              cursor: "pointer",
                              paddingLeft: 5,
                            }}
                          >
                            Assign Complaint
                          </label>
                        </div>

                        {/* edit */}
                        <div
                          className={"mb-2"}
                          onClick={() => {
                            if (!props.complianceEditPermission) {
                              handleEdit(props.complaints);
                            }
                          }}
                          style={{
                            cursor: props.complianceEditPermission
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <img
                            src={Edit}
                            style={{
                              height: 16,
                              width: 16,
                              filter: props.complianceEditPermission
                                ? "grayscale(100%)"
                                : "none",
                            }}
                            alt="Edit"
                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy, sans-serif",
                              color: props.complianceEditPermission
                                ? "#ccc"
                                : "#222222",
                              cursor: props.complianceEditPermission
                                ? "not-allowed"
                                : "pointer",
                              paddingLeft: 5,
                            }}
                          >
                            Edit
                          </label>
                        </div>

                        {/* Delete */}
                        <div
                          className={"mb-2"}
                          style={{
                            // backgroundColor: props.complianceDeletePermission ? "#f9f9f9" : "#fff",
                            cursor: props.complianceDeletePermission
                              ? "not-allowed"
                              : "pointer",
                          }}
                          onClick={() => handleDeleteFormShow(props.complaints)}
                          //   onClick={() => {
                          //     if (!props.complianceDeletePermission) {
                          //       handleDelete(props.complaints); // Replace with your delete function if necessary
                          //     }
                          //   }}
                        >
                          <img
                            src={Delete}
                            style={{
                              height: 16,
                              width: 16,
                              filter: props.complianceDeletePermission
                                ? "grayscale(100%)"
                                : "none", // Dim icon when disabled
                            }}
                            alt="Delete"
                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy, sans-serif",
                              color: props.complianceDeletePermission
                                ? "#ccc"
                                : "#FF0000",
                              cursor: props.complianceDeletePermission
                                ? "not-allowed"
                                : "pointer",
                              paddingLeft: 5,
                            }}
                          >
                            Delete
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr style={{ border: "1px solid #E7E7E7" }} />

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Request ID{" "}
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {props.complaints && props.complaints.Requestid}
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Complaint date
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {moment(props.complaints.date).format("DD-MM-YYYY")}{" "}
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Assigned to
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {props.complaints.Assign === "" ||
                  props.complaints.Assign == null ? (
                    <p style={{ color: "#1E45E1", fontSize: "16px" }}>
                      + Assign
                    </p>
                  ) : (
                    props.complaints.Assign
                  )}
                </label>{" "}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Complaint type
                </label>
              </div>

              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {props.complaints && props.complaints.complaint_name}-{" "}
                  {props.complaints && props.complaints.Description}
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 12,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Status
                </label>
              </div>

              <div>
                <label
                  style={
                    props.complaints &&
                    props.complaints.Status.toUpperCase() === "COMPLETED"
                      ? { color: "#00A32E" }
                      : { color: "#FF9E00" }
                  }
                >
                  {props.complaints && props.complaints.Status}
                </label>
              </div>
            </div>
          </div>

          <hr style={{ border: "1px solid #E7E7E7" }} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label
              style={{
                color: "#222222",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Gilroy, sans-serif",
              }}
            >
              {props.complaints.Assign === "" ||
              props.complaints.Assign == null ? (
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#222",
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  <img src={Profile_add} className="me-2" alt="Add Profile" />
                  Yet to assign the complaint
                </p>
              ) : (
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#222",
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  <img src={Tickicon} className="me-2" alt="Success" />
                  successfully attended on{" "}
                  {moment(props.complaints.date).format("DD-MM-YYYY")}
                </p>
              )}
            </label>

            {/* CommentIcon  */}
            <div>
              <div
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: 60,
                  padding: "8px 12px",
                  cursor: "pointer",
                }}
                onClick={handleIconClick}
              >
                <label>
                  <img src={CommentIcon} alt="Comments" /> 986
                </label>
              </div>

              {showCard && (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1px solid #DCDCDC",
                    borderRadius: 10,
                    padding: "16px",
                    backgroundColor: "#FFF",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                    width: 664,
                    height: 279,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: 18,
                        fontFamily: "Gilroy, sans-serif",
                        margin: 0,
                      }}
                    >
                      August 2024 . Monthly Report
                    </p>
                    <img
                      src={closeicon}
                      alt="Close"
                      style={{ cursor: "pointer", width: 20, height: 20 }}
                      onClick={handleIconClick} // Add this line to close the window when clicked
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 20,
                    }}
                  >
                    <label
                      style={{
                        fontWeight: 500,
                        fontSize: 12,
                        fontFamily: "Gilroy, sans-serif",
                        margin: 0,
                      }}
                    >
                      <img
                        src={manimg}
                        alt="man"
                        style={{ cursor: "pointer", width: 20, height: 20 }}
                      />{" "}
                      Akash Rathod
                    </label>
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: 12,
                        fontFamily: "Gilroy, sans-serif",
                        margin: 0,
                      }}
                    >
                      01 September 2024
                    </p>
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: 14,
                        fontFamily: "Gilroy, sans-serif",
                        margin: 0,
                      }}
                    >
                      Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                      commodo leo scelerisque turpis in gravida. Et facilisi
                      eget id consequat maecenas diam velit eget accumsan. Nam
                      suspendisse lectus vitae elementum integer. Velit sem nec
                      eget id ac. Sagittis sit mauris massa eget vel integer
                      mattis pulvinar. Eget aliquet
                    </p>
                  </div>

                  <div
                    style={{
                      border: "1px solid #E7E7E7",
                      marginTop: 15,
                      width: "100%",
                    }}
                  ></div>

                  <div
                    style={{
                      marginTop: 15,
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <input
                      type="text"
                      style={{
                        border: "1px solid #E7E7E7",
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 16,
                        width: "100%",
                        height: "52px",
                        borderRadius: "12px",
                      }}
                      placeholder="Post your reply here"
                    />
                    <div
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        backgroundColor: "#1E45E1",
                        border: "1px solid #E7E7E7",
                        borderRadius: "60px",
                        padding: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={send}
                        alt="Send"
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Background overlay */}
              {showCard && (
                <div
                  onClick={handleIconClick}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 999,
                  }}
                />
              )}
            </div>

            {/* change status card */}

            <Modal
              show={showChangeStatus}
              onHide={ChangeStatusClose}
              centered
              backdrop="static"
            >
              <Modal.Dialog
                style={{
                  maxWidth: 950,
                  paddingRight: "10px",
                  paddingRight: "10px",
                  borderRadius: "30px",
                }}
                className="m-0 p-0"
              >
                <Modal.Body>
                  <div>
                    <Modal.Header
                      style={{ marginBottom: "30px", position: "relative" }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Change Status
                      </div>
                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={ChangeStatusClose}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "16px",
                          border: "1px solid black",
                          background: "transparent",
                          cursor: "pointer",
                          padding: "0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            fontSize: "30px",
                            paddingBottom: "6px",
                          }}
                        >
                          &times;
                        </span>
                      </button>

                      {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
                    </Modal.Header>
                  </div>

                  <div className="row mt-1">
                    {/* complaint type */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput5"
                      >
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222",
                            fontFamily: "'Gilroy'",
                            fontWeight: 500,
                            fontStyle: "normal",
                            lineHeight: "normal",
                          }}
                        >
                          Change Status{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </Form.Label>
                        <Form.Select
                          className="border"
                          value={status}
                          onChange={(e) => {
                            handleStatus(e);
                          }}
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
                        >
                          <option value="" disabled selected>
                            Select a status
                          </option>
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </Form.Select>
                      </Form.Group>
                      {statusError && (
                        <span style={{ color: "red" }}>{statusError}</span>
                      )}
                    </div>
                  </div>
                </Modal.Body>

                <Modal.Footer style={{ border: "none" }}>
                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 500,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      fontStyle: "normal",
                      lineHeight: "normal",
                    }}
                    onClick={handleChangeStatusClick}
                  >
                    Change Status
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>

            <Modal
              show={showAssignComplaint}
              onHide={handleCloseAssign}
              centered
              backdrop="static"
            >
              <Modal.Dialog
                style={{
                  maxWidth: 950,
                  paddingRight: "10px",
                  paddingRight: "10px",
                  borderRadius: "30px",
                }}
                className="m-0 p-0"
              >
                <Modal.Body>
                  <div>
                    <Modal.Header
                      style={{ marginBottom: "30px", position: "relative" }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Assign Complaint
                      </div>
                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={handleCloseAssign}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "16px",
                          border: "1px solid black",
                          background: "transparent",
                          cursor: "pointer",
                          padding: "0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            fontSize: "30px",
                            paddingBottom: "6px",
                          }}
                        >
                          &times;
                        </span>
                      </button>

                      {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
                    </Modal.Header>
                  </div>

                  <div className="row mt-1">
                    {/* complaint type */}
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput5"
                      >
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222",
                            fontFamily: "'Gilroy'",
                            fontWeight: 500,
                            fontStyle: "normal",
                            lineHeight: "normal",
                          }}
                        >
                          Assign Complaint{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            *
                          </span>
                        </Form.Label>
                        <Form.Select
                          className="border"
                          value={compliant}
                          onChange={(e) => {
                            handleCompliant(e);
                          }}
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
                        >
                          <option value="" disabled selected>
                            Select a Complaint
                          </option>
                          {state.Settings.addSettingStaffList &&
    state.Settings.addSettingStaffList.map((v, i) => {
      return (
        <option key={v.id} value={v.id}>
          {v.first_name}
        </option>
      );
    })}
                        </Form.Select>
                      </Form.Group>
                      {statusError && (
                        <span style={{ color: "red" }}>{statusError}</span>
                      )}
                    </div>
                  </div>
                </Modal.Body>

                <Modal.Footer style={{ border: "none" }}>
                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 500,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      fontStyle: "normal",
                      lineHeight: "normal",
                    }}
                    onClick={handleAssignComplaintClick}
                  >
                    Assign Complaint
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal>

            {/* Background overlay */}
            {/* {showAssignComplaint && (
                        <div
                          onClick={handleAssignOpenClose}
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 999,
                          }}
                        />
                      )} */}
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={deleteForm}
        onHide={handleCloseDeleteForm}
        centered
        backdrop="static"
        style={{
          width: 388,
          height: 250,
          marginLeft: "500px",
          marginTop: "200px",
        }}
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}
          >
            Delete Compliance?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Are you sure you want to delete this Compliance?
        </Modal.Body>

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              marginRight: 10,
            }}
            onClick={handleCloseDeleteForm}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleComplianceDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ComplianceList;
