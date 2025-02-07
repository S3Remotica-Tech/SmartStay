import React, { useState, useEffect, useRef } from "react";
import Edit from "../Assets/Images/edit-Complaints.svg";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import User from "../Assets/Images/New_images/profile-picture.png";
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
import { MdError } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";

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
  const [showAssignee, setShowAssigne] = useState("");
  const [loading, setLoading] = useState(true);

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
    if (deleteId) {
      dispatch({ type: "DELETECOMPLIANCE", payload: { id: deleteId } });
    }
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
  const [customer_Id, setCustomer_Id] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [profile, setProfile] = useState("");

  const handleIconClick = (item) => {
    setCustomer_Id(item.ID);
    setShowCard(true);
    setName(item.Name);
    let Dated = new Date(item.createdat);

    let day = Dated.getDate();
    let month = Dated.getMonth();
    let year = Dated.getFullYear();

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let formattedMonth = monthNames[month];
    let formattedDate = `${day} ${formattedMonth} ${year}`;
    setDate(formattedDate);
    // setProfile(item.profile)
    setProfile(item.profile && item.profile !== "0" ? item.profile : User);
  };

  useEffect(() => {
    if (customer_Id) {
      dispatch({
        type: "GET_COMPLIANCE_COMMENT",
        payload: { com_id: customer_Id },
      });
    }
  }, [customer_Id]);

  useEffect(() => {
    if (state.ComplianceList.statusCodeForGetComplianceComment === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_COMENET_LIST" });
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForGetComplianceComment]);

  useEffect(() => {
    if (state.ComplianceList.statusCodeForAddComplianceComment === 200) {
      setComments("");
      setShowCard(false);
      dispatch({
        type: "GET_COMPLIANCE_COMMENT",
        payload: { com_id: customer_Id },
      });
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostel_id: hostel_id } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_ADD_COMMENT" });
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForAddComplianceComment]);

  const [comments, setComments] = useState("");
  const handleComments = (e) => {
    setComments(e.target.value);
    setCommentError("");
  };
  const [commentError, setCommentError] = useState("");
  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null ||
      value === "0";
    if (isValueEmpty) {
      switch (fieldName) {
        case "comments":
          setCommentError("comments is required");
          break;

        default:
          break;
      }
      return false;
    }

    switch (fieldName) {
      case "comments":
        setCommentError("");
        break;
      default:
        break;
    }

    return true;
  };

  const handleAddComment = () => {
    const isFloorValid = validateAssignField(comments, "comments");
    if (comments) {
      dispatch({
        type: "Add_COMPLIANCE_COMMENT",
        payload: { complaint_id: customer_Id, message: comments },
      });
    }
  };
  const handleCloseIconClick = () => {
    setShowCard(false);
    setComments("");
    setCustomer_Id("");
    setCommentError("");
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
    setAssignId(item?.ID);
    setShowDots(false);
    // setStatus("");
    setShowChangeStatus(true);
    setShowAssignComplaint(false);
    setStatus(item.Status);
  };

  //assign complaint
  const ChangeStatusClose = () => {
    setShowChangeStatus(false);
    setStatusError("");
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
    setAssignId(item?.ID);
    setShowDots(false);
    setCompliant(item?.Assign);
    setShowAssignComplaint(true);
    setShowChangeStatus(false);
  };
  const handleCloseAssign = () => {
    setShowAssignComplaint(false);
    setStatusError("");
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

  console.log("props",props);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);

  

  return (
    <>
    
    {loading ? (
  <div
  style={{
    position: 'fixed',  
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 1050, 
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
) : (
  <div>
     <Card
        className="h-100 fade-in"
        style={{ borderRadius: 16, border: "1px solid #E6E6E6" }}
      >
        <Card.Body style={{ padding: 20 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-2">
              <div className="">
                {/* <Image
                  src={User}
                  roundedCircle
                  style={{ height: "60px", width: "60px" }}
                /> */}
                <Image
                  src={
                    props.complaints.profile === "0" ||  props.complaints.profile === "null" ||   props.complaints.profile === null
                      ? 
                      User
                      : props.complaints.profile
                  }
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
                  cursor:"pointer"
                }}
                onClick={() => handleShowDots(props.complaints.ID)}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20,cursor:"pointer" }}
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
                  {props.complaints.assigner_name === "" ||
                  props.complaints.assigner_name == null ? (
                    <p
                      style={{
                        color: "#1E45E1",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleAssignOpenClose(props.complaints)}
                    >
                      + Assign
                    </p>
                  ) : (
                    props.complaints.assigner_name
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
                // onClick={handleIconClick}
              >
                <label style={{cursor: "pointer"}}>
                  <img
                  
                    src={CommentIcon}
                    alt="Comments"
                    onClick={() => handleIconClick(props.complaints)}
                  />{" "}
                  {props.complaints.comment_count}
                </label>
              </div>

              <Modal
                show={showCard}
                onHide={handleCloseIconClick}
                centered
                backdrop="static"
              >
                <Modal.Dialog
                  style={{
                    maxWidth: 950,
                    paddingRight: "5px",
                    // paddingRight: "10px",
                    borderRadius: "30px",
                  }}
                  className="m-0 p-0"
                >
                  <Modal.Body>
                    <div>
                      <Modal.Header
                        style={{
                          marginBottom: "30px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <img
                            src={profile}
                            alt="Profile"
                            style={{
                              cursor: "pointer",
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                            }}
                          />
                          <div style={{ flexGrow: 1 }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "16px",
                                fontWeight: "bold",
                                fontFamily: "Gilroy",
                              }}
                            >
                              {name}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "14px",
                                color: "gray",
                              }}
                            >
                              {date}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="close"
                          aria-label="Close"
                          onClick={handleCloseIconClick}
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
                      </Modal.Header>
                    </div>
                    <div
                      style={{
                        height:
                          state.ComplianceList?.getComplianceComments?.comments
                            ?.length > 2
                            ? "250px"
                            : "auto",
                        overflowY:
                          state.ComplianceList?.getComplianceComments?.comments
                            ?.length > 2
                            ? "auto"
                            : "hidden",
                        padding: "10px",
                        backgroundColor: "#F4F5F7",
                        borderRadius: "10px",
                      }}
                    >
                      {/* {state.ComplianceList?.getComplianceComments?.comments &&
                        state.ComplianceList?.getComplianceComments?.comments.map(
                          (item, index) => {
                            let Dated = new Date(item.created_at);

                            let day = Dated.getDate();
                            let month = Dated.getMonth();
                            let year = Dated.getFullYear();

                            const monthNames = [
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                            ];

                            let formattedMonth = monthNames[month];
                            let formattedDate = `${day} ${formattedMonth} ${year}`;

                            return (
                              <div
                                key={index}
                                className="row"
                                style={{
                                  borderBottom: "1px solid #EDF0F4",
                                  paddingBottom: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={
                                      item.profile?.trim() &&
                                      item.profile !== "0"
                                        ? item.profile
                                        : User
                                    }
                                    alt="User"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      marginRight: "10px",
                                    }}
                                  />
                                  <div>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      {item.name}
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        color: "#666666",
                                      }}
                                    >
                                      {formattedDate}
                                    </p>
                                  </div>
                                </div>

                                <p
                                  style={{
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    maxWidth: "100%",
                                    marginTop: "8px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#333",
                                  }}
                                >
                                  {item.comment}
                                </p>
                              </div>
                            );
                          }
                        )} */}

{state.ComplianceList?.getComplianceComments?.comments?.length > 0 ? (
  state.ComplianceList?.getComplianceComments?.comments.map((item, index) => {
    let Dated = new Date(item.created_at);

    let day = Dated.getDate();
    let month = Dated.getMonth();
    let year = Dated.getFullYear();

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    let formattedMonth = monthNames[month];
    let formattedDate = `${day} ${formattedMonth} ${year}`;

    return (
      <div
        key={index}
        className="row"
        style={{
          borderBottom: "1px solid #EDF0F4",
          paddingBottom: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
           src={
            !item.profile || ["0", "", "undefined", "null", "NULL"].includes(String(item.profile).trim()) 
              ? User 
              : item.profile
          }
            alt="User"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "Gilroy",
              }}
            >
              {item.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#666666",
              }}
            >
              {formattedDate}
            </p>
          </div>
        </div>

        <p
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
            marginTop: "8px",
            fontSize: "16px",
            fontWeight: "400",
            color: "#333",
          }}
        >
          {item.comment}
        </p>
      </div>
    );
  })
) : (
  <div
    style={{
      textAlign: "center",
      color: "#666",
      fontSize: "16px",
      padding: "20px",
      fontFamily: "Gilroy",
    }}
  >
    No data available
  </div>
)}

                    </div>
                  </Modal.Body>

                  <Modal.Footer style={{ border: "none" }}>
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
                        value={comments}
                        onChange={(e) => handleComments(e)}
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
                          onClick={handleAddComment}
                        />
                      </div>
                      {commentError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          <span
                            style={{
                              fontSize: "12px",
                              color: "red",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            {commentError}
                          </span>
                        </div>
                      )}
                    </div>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>
            </div>

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
     
      </div>
          )}
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
