/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import User from "../../Assets/Images/New_images/profile-picture.png";
import Tickicon from "../../Assets/Images/tick-circle.png";
import Profile_add from "../../Assets/Images/profile-add.png";
// import moment from "moment";
import ChangeStatusIcon from "../../Assets/Images/ComplaintChangeStatusicon.svg";
import AssignComplaintIcon from "../../Assets/Images/profile-add-AssingnComplaint.svg";
import CommentIcon from "../../Assets/Images/Comment-icon-complaints page.svg";
import send from "../../Assets/Images/send.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types"
import Select from "react-select";
import "./ComplianceList.css";
import { CloseCircle, Edit, Trash } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import ComplaintsView from "../../Pages/Compliants/ComplaintsView"


const ComplianceList = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showDots, setShowDots] = useState(null);
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState("");
  const [compliant, setCompliant] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [showAssignComplaint, setShowAssignComplaint] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [hostel_id, setHostel_Id] = useState("");
  // const [assignId, setAssignId] = useState("");
  const [loading, setLoading] = useState(true);
  const [formAssignCompliantLoading, setFormAssignCompliantLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [commentsLoading, setCommentsLoading] = useState(false)
  const [showComplaint, setShowComplaint] = useState(false);
  const [complaintsDetails, setComplaintsDetails] = useState('')
  const popupRef = useRef(null);
  const [trigger, setTrigger] = useState(false);

  const [alreadyAssigned, setAlreadyAssigned] = useState('')

  const commentsEndRef = useRef(null);
  const {
    canWriteModule: canWriteComplaints,
    // canReadModule: canReadComplaints,
    canUpdateModule: canUpdateComplaints,
    canDeleteModule: canDeleteComplaints,
  } = useHasPermission("Complaints");


  // const canWriteComplaints = useHasPermission("Complaints", "canWrite");
  // const canUpdateComplaints = useHasPermission("Complaints", "canUpdate");
  // const canDeleteComplaints = useHasPermission("Complaints", "canDelete");

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.ComplianceList?.complaintsView?.comments]);


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);




  const handleDeleteFormShow = (item) => {


    setDeleteForm(true);
    setDeleteId(item.complaintId);
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
      dispatch({ type: "DELETECOMPLIANCE", payload: deleteId });
    }
  };

  useEffect(() => {
    if (state.ComplianceList.statusCodeForDeleteCompliance === 200) {
      handleCloseDeleteForm();
    }
  }, [state.ComplianceList.statusCodeForDeleteCompliance]);

  const handleShowDots = (id) => {
    if (showDots === id) {
      setShowDots(null);
    } else {
      setShowDots(id);
    }

  };

  const handleEdit = (item) => {
    props.onEditComplaints(item);
  };


  const [compliants_Id, setComplaints_Id] = useState("");
  // const [name, setName] = useState("");
  // const [date, setDate] = useState("");
  // const [profile, setProfile] = useState("");

  const handleIconClick = (item) => {

    setComplaints_Id(item.complaintId);


    if (item.complaintId) {
      dispatch({ type: 'COMPLAINTSVIEW', payload: item.complaintId })
    }

    setShowCard(true);
   
  };

 

  useEffect(() => {
    if (state.ComplianceList.statusCodeForGetComplianceComment === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_COMENET_LIST" });
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForGetComplianceComment]);


  useEffect(() => {
    if (state.ComplianceList.statusCodeForAddComplianceComment === 201 && showCard) {
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostelId: hostel_id } });
      setComments("");
      setShowCard(false);
      setCommentsLoading(false)
      setTimeout(()=>{
      dispatch({ type: "CLEAR_COMPLIANCE_ADD_COMMENT" });

      },1000)
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
          setCommentError("Please Enter Comments");
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

    if (!isFloorValid) return;

    if (comments && compliants_Id) {
      dispatch({
        type: "Add_COMPLIANCE_COMMENT",
        payload: {
          complaintId: compliants_Id,
          data: { message: comments }
        },
      });
      setCommentsLoading(true)
    }
  };
  const handleCloseIconClick = () => {
    setShowCard(false);
    setComments("");
    setComplaints_Id("");
    setCommentError("");
  };


  const [selectedStatus, setSelectedStatus] = useState("");
  const [complaintId, setComplaintId] = useState('')



  const [statusErrorType, setStatusErrorType] = useState('')

  const handleChangeStatusOpenClose = (item) => {
  
    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ERROR' })
    // setAssignId(item?.ID);
    setShowDots(false);
    const normalizedStatus = item?.status?.toLowerCase() ?? "pending";
   setStatus(normalizedStatus);

    setSelectedStatus(item?.status === null ? "pending" : item?.status)
    setComplaintId(item?.complaintId)
    setShowChangeStatus(true);
    setShowAssignComplaint(false);
  };




  const ChangeStatusClose = () => {
    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ERROR' })
    setShowChangeStatus(false);
    setStatusError("");
  };

  useEffect(() => {
    const savedStatus = localStorage.getItem("selectedStatus");
    if (savedStatus) {
      setSelectedStatus(savedStatus);
    }
  }, []);

  const handleChangeStatusClick = () => {
    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ERROR' })
    const prevStatus = selectedStatus || "";

    if (!status) {
      setStatusError("Please Select Status");
      return;
    }

// console.log("prevStatus",prevStatus)
// console.log("status",status)

    if (status === prevStatus) {
      setStatusError("No Changes Detected");
      return;
    }

    setStatusError("");

    if (complaintId && status) {
      dispatch({
        type: "COMPLIANCECHANGESTATUS",
        payload: {
          complaintId,
          status: status
        }
      });
    }


    setFormLoading(true)
  };

 


  const handleAssignComplaintClick = () => {
// console.log("compliant",compliant)

    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR' })
    if (alreadyAssigned === compliant && compliant !== "") {
      setStatusErrorType("No Changes Detected");
      return;
    }

    if (compliant === "") {
      setStatusErrorType("Please Select User");
    } else {



      if (complaintId && compliant) {
        dispatch({
          type: "COMPLIANCEASSIGN",
          payload: {
            complaintId,
            userId: compliant
          }
        });
      }
      setFormAssignCompliantLoading(true)
    }
  };



  useEffect(() => {
    if (state.ComplianceList.complianceAssignChangeStatus === 200 && showAssignComplaint) {
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostelId: hostel_id } });
      dispatch({ type: "CLEAR_COMPLIANCE_CHANGE_ASSIGN" });
      setShowAssignComplaint(false);
      setStatusErrorType("");
      setSelectedStatus("")
      setShowChangeStatus(false);
      setFormAssignCompliantLoading(false)

    }
  }, [state.ComplianceList.complianceAssignChangeStatus]);





  useEffect(() => {
    if (state.ComplianceList.complianceChangeStatus === 200 && showChangeStatus) {
      dispatch({ type: "COMPLIANCE-LIST", payload: { hostelId: hostel_id } });
      dispatch({ type: "CLEAR_COMPLIANCE_CHANGE_STATUS_CODE" });
      setShowChangeStatus(false);
      setFormLoading(false)
    }
  }, [state.ComplianceList.complianceChangeStatus]);




  const handleAssignOpenClose = (item) => {

    dispatch({ type: "GETUSERSTAFF", payload: { hostelId: hostel_id } });
    setShowDots(false);
    setCompliant(item?.assigneeId ?? "");
    setAlreadyAssigned(item?.assigneeId ?? "");

    setComplaintId(item?.complaintId ? item?.complaintId : item?.complaintId)
    setShowAssignComplaint(true);
    setShowChangeStatus(false);
  };



  const handleCloseAssign = () => {

    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR' })
    setShowAssignComplaint(false);
    setStatusError("");
    setStatusErrorType("");

  };

  const handleCompliant = (selectedOption) => {
// console.log("selectedOption",selectedOption)
    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ASSIGN_ERROR' })
    setCompliant(selectedOption?.value || '');


    if (selectedOption === "") {
      setStatusErrorType("Please Select Compliant");
    } else {
      setStatusErrorType(" ");
    }
  };


  const handleStatus = (selectedOption) => {
    dispatch({ type: 'REMOVE_COMPLIANCE_CHANGE_STATUS_ERROR' })
    setStatus(selectedOption?.value || '');
    if (selectedOption?.value) {
      setStatusError('');
    }
  };

  

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries
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


  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.createAccount?.networkError || state.ComplianceList?.complianceChangeError || state.ComplianceList?.complianceAssignChangeError) {
      setFormLoading(false)
      setFormAssignCompliantLoading(false)
      setCommentsLoading(false)
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError, state.ComplianceList?.complianceChangeError, state.ComplianceList?.complianceAssignChangeError])



  const handleNavigateComplaintsView = (view) => {
    setComplaintsDetails(view)
    
    setShowComplaint(true)
    setTrigger(true)
  }

  const handleCloseComplaintsView = () => {
    setShowComplaint(false)
  }

  return (
    <>

      {loading ? (
        <div
          style={{
            position: 'fixed',
            top: '53%',
            left: '57%',
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
            style={{ borderRadius: 16, border: "1px solid #E6E6E6", height: 330 }}
          >
            <Card.Body style={{ padding: 15 }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div className="d-flex flex-wrap gap-2 align-items-start">

                  <div>
                    {props.complaints?.customerProfile ?
                      <Image
                        src={
                          props.complaints?.customerProfile === "0" ||
                            props.complaints?.customerProfile === "null" ||
                            props.complaints?.customerProfile === null
                            ? User
                            : props?.complaints?.customerProfile
                        }
                        roundedCircle
                        style={{ height: "60px", width: "60px", objectFit: "cover" }}
                      />
                      :
                      <div
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: "50%",
                           backgroundColor: "#E2E8F0",
                          color: "#44536A",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 20,
                          fontWeight: "600",
                           fontFamily: "Gilroy"
                        }}
                      >
                        {props.complaints?.initials || "-"}
                      </div>
                    }
                  </div>


                  <div className="flex-grow-1">
                    <div className="pb-2">
                      <label 
                      onClick={() => handleNavigateComplaintsView(props.complaints)}
                        className="d-block"
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "#1E45E1",
                          fontWeight: 600,
                          marginLeft: "10px", cursor: "pointer",
                           textDecoration: "underline"
                        }}
                      >
                        {props.complaints && props?.complaints?.customerName}
                      </label>


                      <div className="d-flex flex-wrap gap-2 ms-2">

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#FFE0D9",
                            padding: "6px 12px",
                            borderRadius: "60px",
                            fontFamily: "Gilroy",
                            fontSize: 16,
                            color: "#222",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {props.complaints?.roomName} - {props.complaints?.bedName}
                        </div>


                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#FFEFCF",
                            padding: "6px 12px",
                            borderRadius: "60px",
                            fontFamily: "Gilroy",
                            fontSize: 16,
                            color: "#222",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {props.complaints?.floorName}
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
                      cursor: "pointer",
                      backgroundColor: showDots === props.complaints?.complaintId ? "#E7F1FF" : "white",

                    }}
                    onClick={() => handleShowDots(props.complaints?.complaintId)}
                  >
                    <PiDotsThreeOutlineVerticalFill
                      style={{ height: 20, width: 20, cursor: "pointer" }}
                    />

                    {showDots === props.complaints.complaintId && (
                      <>
                        <div
                          ref={popupRef}
                          className="complist"
                          style={{
                            backgroundColor: "#F9F9F9",
                            position: "absolute",
                            right: 40,
                            top: '2px',
                            width: 175,
                            height: "auto",
                            border: "1px solid #F9F9F9",
                            borderRadius: 12,
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            zIndex: 1000,
                          }}
                        >
                          <div style={{ width: "100%" }}>
                            <div
                              className="d-flex align-items-center"
                              onClick={() => {
                                if (canWriteComplaints) {
                                  handleChangeStatusOpenClose(props.complaints)

                                }
                              }}
                              style={{
                                cursor: !canWriteComplaints ? "not-allowed" : "pointer",

                                opacity: !canWriteComplaints ? 0.5 : 1,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                backgroundColor: "#F9F9F9",
                                padding: "8px 12px",
                                width: "100%",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget.style.backgroundColor = "#EDF2FF")
                              }}
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              <img src={ChangeStatusIcon} style={{ height: 16, width: 16 }} alt="Change Status" />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy, sans-serif",
                                  cursor: !canWriteComplaints ? "not-allowed" : "pointer",
                                  paddingLeft: 5,
                                  color: !canWriteComplaints ? "#A9A9A9" : "#222222"
                                }}
                              >
                                Change Status
                              </label>
                            </div>

                            <div
                              className="d-flex align-items-center"
                              onClick={() => {
                                if (canWriteComplaints) {
                                  handleAssignOpenClose(props.complaints)
                                }
                              }
                              }
                              style={{
                                cursor: !canWriteComplaints ? "not-allowed" : "pointer",
                                opacity: !canWriteComplaints ? 0.5 : 1,
                                padding: "8px 12px",
                                width: "100%",
                              }}
                              onMouseEnter={(e) => {
                                (e.currentTarget.style.backgroundColor = "#EDF2FF")

                              }}
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              <img src={AssignComplaintIcon} style={{ height: 16, width: 16 }} alt="Assign Complaint" />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy, sans-serif",
                                  color: !canWriteComplaints ? "#A9A9A9" : "#222222",
                                  cursor: !canWriteComplaints ? "not-allowed" : "pointer",
                                  paddingLeft: 5,
                                }}
                              >
                                Assign Complaint
                              </label>
                            </div>

                            <div
                              className="d-flex align-items-center"
                              onClick={() => {
                                if (canUpdateComplaints) {
                                  handleEdit(props.complaints);
                                }
                              }}
                              style={{
                                cursor: !canUpdateComplaints ? "not-allowed" : "pointer",
                                padding: "8px 12px",
                                width: "100%",
                              }}
                              onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = !canUpdateComplaints
                                ? "transparent"
                                : "#EDF2FF")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              <Edit
                                size="16"
                                color={!canUpdateComplaints ? "#A9A9A9" : "#1E45E1"}
                              />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy, sans-serif",
                                  color: !canUpdateComplaints ? "#ccc" : "#222222",
                                  cursor: !canUpdateComplaints ? "not-allowed" : "pointer",
                                  paddingLeft: 5,
                                }}
                              >
                                Edit
                              </label>
                            </div>

                            <div
                              className="d-flex align-items-center"
                              onClick={() => {
                                if (canDeleteComplaints) {
                                  handleDeleteFormShow(props.complaints)
                                }
                              }
                              }
                              style={{
                                cursor: !canDeleteComplaints ? "not-allowed" : "pointer",
                                padding: "8px 12px",
                                width: "100%",
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                              }}
                              onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor = !canDeleteComplaints
                                ? "transparent"
                                : "#FFF0F0")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              <Trash
                                size="16"
                                color={!canDeleteComplaints ? "#A9A9A9" : "red"}
                              />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy, sans-serif",
                                  color: !canDeleteComplaints ? "#ccc" : "#FF0000",
                                  cursor: !canDeleteComplaints ? "not-allowed" : "pointer",
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
                      {props.complaints && props.complaints?.complaintId}
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
                      Complaint Date
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
                      {props.complaints?.complaintDate}{" "}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
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
                      Assigned To
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
                      {props.complaints?.assigneeName === "" ||
                        props.complaints?.assigneeName === null ? (
                        <span
                          style={{
                            color: !canWriteComplaints ? "#DBDBDB" : "#1E45E1",
                            fontSize: "16px",
                            cursor: "pointer",
                            textDecoration: "none",
                          }}
                          onClick={() => canWriteComplaints ? handleAssignOpenClose(props.complaints) : ''}
                        >
                          + Assign
                        </span>
                      ) : (
                        props.complaints?.assigneeName
                      )}
                    </label>

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
                <div className="">
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
                      Complaint Types
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
                        display: "block",
                      }}
                      title={props.complaints?.complaintTypeName}
                    >
                      {props.complaints && props.complaints?.complaintTypeName}
                      {props.complaints?.description && (
                        <span
                          title={props.complaints?.description}
                          style={{
                            display: "inline-block",
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            verticalAlign: "middle",
                            marginTop: "-6px",
                            paddingLeft: 4
                          }}
                        >
                          {" "}  {" - "}{props.complaints?.description}
                        </span>
                      )}


                    </label>
                  </div>
                </div>

                <div className="">
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

                  <div style={{fontFamily:"Gilroy", fontSize:14}}>
                    <label
                      style={ 
                        props.complaints &&
                          props?.complaints?.status?.toUpperCase() === "1"
                          ? { color: "#00A32E" }
                          : { color: "#FF9E00" }
                      }
                    >
                      {props.complaints && props.complaints?.status === null ? "Open" : props?.complaints?.status}
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
                  minHeight: 32,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {props.complaints?.assigneeName === "" || props.complaints?.assigneeName === null ? (
                    <>
                      <img
                        src={Profile_add}
                        alt="Add Profile"
                        style={{ marginRight: 8, height: 16, width: 16 }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#222",
                          fontFamily: "Gilroy",
                          lineHeight: "16px",
                        }}
                      >
                        Yet to assign the complaint
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        src={Tickicon}
                        alt="Success"
                        style={{ marginRight: 8, height: 16, width: 16 }}
                      />
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#222",
                          fontFamily: "Gilroy",
                          lineHeight: "16px",
                        }}
                      >
                        successfully attended on{" "}
                        {
                          props.complaints?.complaintDate
                        }
                      </span>
                    </>
                  )}
                </div>

                <div
                  onClick={() => canWriteComplaints ? handleIconClick(props.complaints) : ''}
                  style={{
                    border: "1px solid #DCDCDC",
                    borderRadius: "50px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <img
                    src={CommentIcon}
                    alt="Comments"
                    height={14}
                    width={14}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#333",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {props.complaints?.commentCount}
                  </span>
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
                      paddingTop: "-10px",
                      borderRadius: "30px",

                    }}
                    className="m-0 p-0"
                  >
                    <Modal.Header
                      style={{
                        marginBottom: "10px",
                        position: "relative",
                        display: "flex",
                        marginleft: "-15px", gap: 2
                      }}
                    >
                      <div className="gap-2"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",

                        }}
                      >
                        {
                          props.complaints?.customerProfile ?

                            <img
                              src={
                                props.complaints?.customerProfile === "0" ||
                                  props.complaints?.customerProfile === "null" ||
                                  props.complaints?.customerProfile === null
                                  ? User
                                  : props?.complaints?.customerProfile
                              }
                              alt="Profile"
                              style={{
                                cursor: "pointer",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                marginRight: "10px",
                              }}
                            />
                            :
                            <div
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: "50%",
                                 backgroundColor: "#E2E8F0",
                          color: "#44536A",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: 20,
                                fontWeight: "600",
                                 fontFamily: "Gilroy",
                              }}
                            >
                              {props?.complaints?.initials || "-"}
                            </div>

                        }
                        <div style={{ flexGrow: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "16px",
                              fontWeight: "600px",
                              fontFamily: "Gilroy",
                            }}
                          >
                            {props.complaints?.customerName}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: "14px",
                              color: "gray",
                              fontFamily: "Gilroy",
                            }}
                          >
                            {props.complaints?.complaintDate}
                          </p>
                        </div>
                      </div>


                      <CloseCircle size="24" color="#000" onClick={handleCloseIconClick}
                        style={{ cursor: 'pointer' }} />
                    </Modal.Header>
                    <Modal.Body>

                      <div
                        style={{
                          height:
                            state.ComplianceList?.complaintsView?.comments
                              ?.length > 2
                              ? "250px"
                              : "auto",
                          overflowY:
                            state.ComplianceList?.complaintsView?.comments
                              ?.length > 2
                              ? "auto"
                              : "hidden",
                          padding: "10px",
                          backgroundColor: "#F4F5F7",
                          borderRadius: "10px",
                        }}
                      >


                        {state.ComplianceList?.complaintsView?.comments?.length > 0 ? (
                          state.ComplianceList?.complaintsView?.comments.map((item, index) => {

                           const [day, month, year] = item?.commentedAt?.split("/") || [];


                            let Dated = new Date(year, month - 1, day);

                            const monthNames = [
                              "January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December",
                            ];

                            let formattedMonth = monthNames[Dated.getMonth()];
                            let formattedDate = `${day} ${formattedMonth} ${year}`;


                            return (
                              <div
                                key={index}
                                className="row d-flex "
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  borderBottom: "1px solid #EDF0F4",
                                  marginBottom: "10px", width: "100%",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: "10px", width: "100%",
                                  }}
                                >

                                  {
                                    item?.profilePic ?

                                     <img
  src={
    item?.profilePic &&
    item.profilePic !== "0" &&
    item.profilePic !== "null"
      ? item.profilePic
      : undefined
  }
  alt="User"
  style={{
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  }}
/>

                                      :

                                      <div
                                        style={{
                                          height: 40,
                                          width: 40,
                                          borderRadius: "50%",
                                           backgroundColor: "#E2E8F0",
                          color: "#44536A",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          fontSize: 14,
                                          fontWeight: "600",
                                           fontFamily: "Gilroy",
                                        }}
                                      >
                                        {item?.initials || "-"}
                                      </div>
                                  }




                                  <div style={{ flex: 1 }}>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      {item.commentText}
                                    </p>
                                    <p
                                      style={{
                                        margin: 0,
                                        fontSize: "14px",
                                        color: "#666666",
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      {formattedDate}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <label
                                    style={{
                                      wordWrap: "break-word",
                                      overflowWrap: "break-word",
                                      whiteSpace: "pre-wrap",
                                      maxWidth: "100%",
                                      marginTop: "8px",
                                      fontSize: "16px",
                                      fontWeight: "400",
                                      color: "#333",
                                      fontFamily: "Gilroy",
                                    }}
                                  >
                                    {item.comment}
                                  </label>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              color: "red",
                              fontSize: "16px",
                              padding: "20px",
                              fontFamily: "Gilroy",
                            }}
                          >
                            No Comments available
                          </div>
                        )}

                      </div>

                      <div ref={commentsEndRef} />
                      {commentsLoading && <div
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
                      </div>}


                      {/* {state.createAccount?.networkError ?
                        <ErrorMessage message={state.createAccount?.networkError} type="error" />
                        : null} */}

                      <Modal.Footer style={{ border: "none" }} className="p-0">
                        <div
                          style={{
                            marginTop: 15,
                            position: "relative",
                            display: "inline-block",
                            width: "100%",
                          }}
                        >
                          <Form.Control
                            type="text"
                            value={comments}
                            onChange={(e) => handleComments(e)}
                            className="input-field"
                            style={{
                              border: "1px solid #E7E7E7",
                              paddingTop: 6,
                              paddingBottom: 6,
                              paddingLeft: 16,
                              width: "100%",
                              height: "52px",
                              fontFamily: "Gilroy",
                              borderRadius: "12px",
                            }}
                            placeholder="Post your reply here"
                          />
                          <div className="input-field"
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
                            onClick={handleAddComment}
                          >
                            <img
                              src={send}
                              alt="Send"
                              style={{
                                width: "16px",
                                height: "16px",
                              }}

                            />
                          </div>

                        </div>

                      </Modal.Footer>
                      {commentError && (
                        <ErrorMessage message={commentError} type="error" />

                      )}
                    </Modal.Body>
                  </Modal.Dialog>
                </Modal>

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
                      borderRadius: "30px",
                    }}
                    className="m-0 p-0"
                  >
                    <Modal.Body>
                      <div>
                        <Modal.Header
                          style={{ position: "relative", paddingTop: "2px", paddingRight: 1, }}
                        >
                          <div
                            style={{
                              fontSize: 20,
                              fontWeight: 600,
                              fontFamily: "Gilroy",

                              marginLeft: "-13px"
                            }}
                          >
                            Change Status
                          </div>

                          <CloseCircle size="24" color="#000" onClick={ChangeStatusClose}
                            style={{ cursor: 'pointer' }} />


                        </Modal.Header>
                      </div>

                      <div className="row mt-2">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput5"
                          >
                            <Form.Label className="mb-2"
                              style={{
                                fontSize: 14,
                                color: "#222",
                                fontFamily: "'Gilroy'",
                                fontWeight: 500,
                                fontStyle: "normal",
                                lineHeight: "normal",
                              }}
                            >
                              Change Status {" "}
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </Form.Label>


                            <Select
                              options={[
                                { value: "pending", label: "Pending" },
                                { value: "inprogress", label: "Inprogress" },
                                { value: "resolved", label: "Resolved" },
                              ]}
                              onChange={handleStatus}

                              value={
                                status
                                  ? { value: status, label: status.replace("-", " ") }
                                  : null
                              }

                              placeholder="Select a Status"
                              classNamePrefix="custom"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  height: "50px",
                                  border: "1px solid #D9D9D9",
                                  borderRadius: "8px",
                                  fontSize: "16px",
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  textTransform: "capitalize"
                                }),
                                menu: (base) => ({
                                  ...base,
                                  backgroundColor: "#f8f9fa",
                                  border: "1px solid #ced4da",
                                  fontFamily: "Gilroy", textTransform: "capitalize"
                                }),
                                menuList: (base) => ({
                                  ...base,
                                  backgroundColor: "#f8f9fa",
                                  maxHeight: "120px",
                                  padding: 0,
                                  scrollbarWidth: "thin",
                                  overflowY: "auto",
                                  fontFamily: "Gilroy", textTransform: "capitalize"
                                }),
                                placeholder: (base) => ({
                                  ...base,
                                  color: "#555", textTransform: "capitalize"
                                }),
                                dropdownIndicator: (base) => ({
                                  ...base,
                                  color: "#555",
                                  cursor: "pointer"
                                }),
                                option: (base, state) => ({
                                  ...base,
                                  cursor: "pointer",
                                  backgroundColor: state.isFocused ? "lightblue" : "white",
                                  color: "#000", textTransform: "capitalize"
                                }),
                                indicatorSeparator: () => ({
                                  display: "none",
                                }),
                              }}
                            />


                          </Form.Group>

                          {statusError.trim() !== "" && (
                            <div className="d-flex justify-content-center mb-1">

                              <ErrorMessage message={statusError} type="error" />
                            </div>
                          )}


                          {state.ComplianceList?.complianceChangeError &&
                            <div className="d-flex justify-content-center mb-1">
                              <ErrorMessage message={state.ComplianceList?.complianceChangeError} type="error" />
                            </div>
                          }
                        </div>
                      </div>
                      {/* {state.createAccount?.networkError ?
                        <ErrorMessage message={state.createAccount?.networkError} type="error" />
                        : null} */}
                    </Modal.Body>





                    {formLoading && <div
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
                    </div>}
                    <Modal.Footer style={{ border: "none" }}>
                      <Button disabled={formLoading}
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
                          marginTop: "-25px"
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
                      borderRadius: "30px",
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
                        Assign Complaint
                      </div>

                      <CloseCircle size="24" color="#000" onClick={handleCloseAssign}
                        style={{ cursor: 'pointer' }} />


                    </Modal.Header>
                    <Modal.Body className="pb-1">
                      <div>

                      </div>

                      <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <Form.Group
                            className="mb-2"
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
                              Assign Complaint {" "}
                              <span style={{ color: "red", fontSize: "20px" }}>
                                *
                              </span>
                            </Form.Label>


                            {/* <Select
                              options={
                                state.Settings.addSettingStaffList
                                  ? state.Settings.addSettingStaffList.map((v) => ({
                                    value: v.userId,
                                    label: v.first_name,
                                  }))
                                  : []
                              }
                              onChange={handleCompliant}
                              value={
                                compliant
                                  ? (() => {
                                    const selected = state.Settings.addSettingStaffList.find((v) => String(v.userId) === String(compliant));
                                    return selected
                                      ? { value: selected.userId, label: selected.first_name }
                                      : null;
                                  })()
                                  : null
                              }
                              placeholder="Select a User"
                              classNamePrefix="custom"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  height: "50px",
                                  border: "1px solid #D9D9D9",
                                  borderRadius: "8px",
                                  fontSize: "16px",
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
                                  cursor: "pointer"
                                }),
                                option: (base, state) => ({
                                  ...base,
                                  cursor: "pointer",
                                  backgroundColor: state.isFocused ? "lightblue" : "white",
                                  color: "#000",
                                }),
                                indicatorSeparator: () => ({
                                  display: "none",
                                }),
                              }}
                            /> */}

                            <Select
                              options={
                                state.Settings.addSettingStaffList
                                  ? state.Settings.addSettingStaffList.map((v) => ({
                                    value: v.userId,
                                    label: v.firstName,
                                  }))
                                  : []
                              }
                              onChange={handleCompliant}
                              value={
                                compliant
                                  ? (() => {
                                    const selected = state.Settings.addSettingStaffList.find(
                                      (v) => String(v.userId) === String(compliant)
                                    );
                                    return selected
                                      ? { value: selected.userId, label: selected.firstName }
                                      : null;
                                  })()
                                  : null
                              }
                              placeholder="Select a Staff"
                              classNamePrefix="custom"
                              styles={{
                                control: (base) => ({
                                  ...base,
                                  height: "50px",
                                  border: "1px solid #D9D9D9",
                                  borderRadius: "8px",
                                  fontSize: "16px",
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
                                  cursor: "pointer"
                                }),
                                option: (base, state) => ({
                                  ...base,
                                  cursor: "pointer",
                                  backgroundColor: state.isFocused ? "lightblue" : "white",
                                  color: "#000",
                                }),
                                indicatorSeparator: () => ({
                                  display: "none",
                                }),
                              }}
                            />




                            {statusErrorType.trim() !== "" && (
                              <div className="d-flex justify-content-center">
                              <ErrorMessage message={statusErrorType} type="error" />

                              </div>

                            )}

                          </Form.Group>

                        </div>
                      </div>

                      {state.ComplianceList?.complianceAssignChangeError &&

                        <ErrorMessage message={state.ComplianceList.complianceAssignChangeError} type="error" />

                      }
                    </Modal.Body>
                    {formAssignCompliantLoading && <div
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
                    </div>}
                    <Modal.Footer style={{ border: "none", marginTop: '12px' }}>
                      <Button disabled={formAssignCompliantLoading}
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
                          marginTop: "-20px"
                        }}
                        onClick={handleAssignComplaintClick}
                      >
                        Assign Complaint
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal>


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
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            className="w-100 text-center"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",

              fontWeight: 600,
              color: "#222222",

            }}
          >
            Delete Compliance?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",

            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this Compliance?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{

            borderTop: "none",
            marginTop: "-10px",
          }}
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
            onClick={handleCloseDeleteForm}
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
            onClick={handleComplianceDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {
        showComplaint && <ComplaintsView show={showComplaint} handleClose={handleCloseComplaintsView} 
        complaintsDetails={complaintsDetails} 
        trigger={trigger} 
         />
      }





    </>
  );
};

ComplianceList.propTypes = {
  complaints: PropTypes.func.isRequired,
  onEditComplaints: PropTypes.func.isRequired,
  complianceEditPermission: PropTypes.func.isRequired,
  complianceDeletePermission: PropTypes.func.isRequired,
  disableActions: PropTypes.func.isRequired
};
export default ComplianceList;
