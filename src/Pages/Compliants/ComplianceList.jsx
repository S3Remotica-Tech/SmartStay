/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import User from "../../Assets/Images/New_images/profile-picture.png";
import Tickicon from "../../Assets/Images/tick-circle.png";
import Profile_add from "../../Assets/Images/profile-add.png";
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
      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_ADD_COMMENT" });

      }, 1000)
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
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-[1050]">
          <div className="w-10 h-10 border-t-4 border-r-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
        </div>

      ) : (
        <div>
            <div className="bg-wh border border-gray-200 rounded-[16px] h-[330px] md:h-[400px] lg:h-[400px] xl:h-[330px] 3xl:h-full p-2 font-gilroy ">
            <div className="p-3">
              <div className="flex justify-between items-center flex-wrap">
                <div className="flex flex-wrap gap-2 items-start">

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
                        className="h-[60px] w-[60px] object-cover"
                      />
                      :
                      <div
                        className="h-14 w-14 rounded-full bg-gray-200 text-[#44536A] flex items-center justify-center text-xl font-semibold">
                        {props.complaints?.initials || "-"}
                      </div>
                    }
                  </div>


                  <div className="flex-grow">
                    <div className="pb-2">
                      <label
                        onClick={() => handleNavigateComplaintsView(props.complaints)}
                        className="ml-2.5 text-blue-700 font-semibold text-base underline cursor-pointer mb-1"
                      >
                        {props.complaints && props?.complaints?.customerName}
                      </label>


                      <div className="flex flex-wrap gap-2 ml-1">

                        <div className="flex items-center bg-[#FFE0D9] px-2.5 h-7 rounded-full text-gray-900 text-base font-medium font-gilroy text-sm whitespace-nowrap"

                        >
                          {props.complaints?.roomName} - {props.complaints?.bedName}
                        </div>


                        <div className="flex items-center bg-[#FFEFCF] px-2.5 h-7 rounded-full text-gray-900 text-base font-medium font-gilroy text-sm whitespace-nowrap"
                        >
                          {props.complaints?.floorName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


                <div>
                  <div

                    className={`
    h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center relative cursor-pointer
    ${showDots === props.complaints?.complaintId ? 'bg-blue-100' : 'bg-white'}
  `}
                    onClick={() => handleShowDots(props.complaints?.complaintId)}
                  >
                    <PiDotsThreeOutlineVerticalFill
                      className="h-5 w-5 cursor-pointer"
                    />

                    {showDots === props.complaints.complaintId && (
                      <>
                        <div
                          ref={popupRef}
                          // className="complist"
                          className="absolute right-12 top-0 w-[175px] bg-gray-50 border border-gray-50 rounded-lg flex items-center justify-start z-[1000]"
                        >
                          <div className="w-full">
                            <div

                              onClick={() => {
                                if (canWriteComplaints) {
                                  handleChangeStatusOpenClose(props.complaints)

                                }
                              }}
                              className={`flex items-center
    w-full bg-gray-50 px-3 py-2 rounded-t-lg
    ${!canWriteComplaints ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}
  `}
                              onMouseEnter={(e) => {
                                (e.currentTarget.style.backgroundColor = "#EDF2FF")
                              }}
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              <img src={ChangeStatusIcon} className="h-4 w-4" alt="Change Status" />
                              <label
                                className={`
    text-sm font-semibold pl-2
    ${!canWriteComplaints ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-900'}
  `}
                              >
                                Change Status
                              </label>
                            </div>

                            <div
                              onClick={() => {
                                if (canWriteComplaints) {
                                  handleAssignOpenClose(props.complaints)
                                }
                              }
                              }
                              className={`flex items-center
    w-full px-3 py-2
    ${!canWriteComplaints ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}
  `}
                              onMouseEnter={(e) => {
                                (e.currentTarget.style.backgroundColor = "#EDF2FF")

                              }}
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                              }
                            >
                              <img src={AssignComplaintIcon} className="h-4 w-4" alt="Assign Complaint" />
                              <label
                                className={`
    text-sm font-semibold pl-2
    ${!canWriteComplaints ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-900'}
  `}
                              >
                                Assign Complaint
                              </label>
                            </div>

                            <div
                              onClick={() => {
                                if (canUpdateComplaints) {
                                  handleEdit(props.complaints);
                                }
                              }}
                              className={`flex items-center
    w-full px-3 py-2
    ${!canUpdateComplaints ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}
  `}
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
                                className={`
    text-sm font-semibold pl-2
    ${!canUpdateComplaints ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-gray-900'}
  `}
                              >
                                Edit
                              </label>
                            </div>

                            <div
                              onClick={() => {
                                if (canDeleteComplaints) {
                                  handleDeleteFormShow(props.complaints)
                                }
                              }
                              }
                              className={`flex items-center
    w-full px-3 py-2
    ${!canDeleteComplaints ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}
  `}
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
                                className={`
    text-sm font-semibold pl-2
    ${!canDeleteComplaints ? 'cursor-not-allowed text-gray-400' : 'cursor-pointer text-red-500'}
  `}

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
              <hr className="border border-gray-200" />

              <div className="flex flex-wrap justify-between items-center mb-3 ">
                <div className="mb-2">
                  <div className="mb-1">
                    <label className="text-gray-400 text-xs font-medium font-gilroy">
                      Request ID
                    </label>
                  </div>
                  <div>
                    <label className="text-gray-900 text-base font-semibold font-gilroy">
                      {props.complaints?.complaintId}
                    </label>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="mb-1">
                    <label className="text-gray-400 text-xs font-medium font-gilroy">
                      Complaint Date
                    </label>
                  </div>
                  <div>
                    <label className="text-gray-900 text-base font-semibold font-gilroy">
                      {props.complaints?.complaintDate}
                    </label>
                  </div>
                </div>

                <div className="mb-1">
                  <div className="mb-1">
                    <label className="text-gray-400 text-xs font-medium font-gilroy">
                      Assigned To
                    </label>
                  </div>
                  <div>
                    {props.complaints?.assigneeName ? (
                      <label className="text-gray-900 text-base font-semibold font-gilroy">
                        {props.complaints?.assigneeName}
                      </label>
                    ) : (
                      <span
                        className={`text-base font-semibold cursor-pointer ${!canWriteComplaints ? 'text-gray-300' : 'text-blue-600'
                          } font-gilroy`}
                        onClick={() => (canWriteComplaints ? handleAssignOpenClose(props.complaints) : null)}
                      >
                        + Assign
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="mb-1">
                    <label className="text-gray-400 text-xs font-medium font-gilroy">
                      Complaint Types
                    </label>
                  </div>

                  <div>
                    <label
                      className="text-gray-900 text-base font-semibold font-gilroy block"
                      title={props.complaints?.complaintTypeName}
                    >
                      {props.complaints?.complaintTypeName}
                      {props.complaints?.description && (
                        <span
                          className="inline-block max-w-[200px] truncate align-middle ml-1 -mt-1"
                          title={props.complaints?.description}
                        >
                          {" - "}{props.complaints?.description}
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <div >
                    <label className="text-gray-400 text-xs font-medium font-gilroy">
                      Status
                    </label>
                  </div>

                  <div>
                    <label
                      className={`text-sm font-gilroy ${props.complaints?.status?.toUpperCase() === "1"
                        ? "text-green-600"
                        : "text-orange-500"
                        }`}
                    >
                      {props.complaints?.status === null ? "Open" : props.complaints?.status}
                    </label>
                  </div>
                </div>
              </div>


              <hr className="!border !border-gray-400" />
              <div className="flex justify-between items-center min-h-[32px]" >
                <div className="flex items-center">
                  {props.complaints?.assigneeName === "" || props.complaints?.assigneeName === null ? (
                    <>
                      <img
                        src={Profile_add}
                        alt="Add Profile"
                        className="mr-2 h-4 w-4
"
                      />
                      <span className="text-sm font-semibold text-[#222] font-gilroy leading-4">
                        Yet to assign the complaint
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        src={Tickicon}
                        alt="Success"
                        className="mr-2 h-4 w-4"
                      />
                      <span
                        className="text-sm font-semibold text-[#222] font-gilroy leading-4"
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
                  className="border border-[#DCDCDC] rounded-full px-2.5 py-1.5 cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={CommentIcon}
                    alt="Comments"
                    className="h-3.5 w-3.5"
                  />
                  <span className="text-xs font-medium text-[#333] font-gilroy" >
                    {props.complaints?.commentCount}
                  </span>
                </div>



                <Modal
                  show={showCard}
                  onHide={handleCloseIconClick}
                  centered
                  backdrop="static"
                >
                  <Modal.Dialog className="m-0 p-0 max-w-[950px] rounded-[30px] -mt-[10px]" >
                    <Modal.Header className="relative flex mb-2.5 gap-0.5"
                    >
                      <div className="flex items-center w-full gap-2"
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
                              className="cursor-pointer w-10 h-10 rounded-full mr-2.5"
                            />
                            :
                            <div className="font-gilroy cursor-pointer h-12 w-12 rounded-full bg-gray-200 text-[#44536A] flex items-center justify-center text-lg font-semibold"

                            >
                              {props?.complaints?.initials || "-"}
                            </div>

                        }
                        <div className="flex-1">
                          <p className="m-0 text-base font-semibold font-gilroy "

                          >
                            {props.complaints?.customerName}
                          </p>
                          <p
                            className="m-0 text-sm text-gray-500 font-gilroy"
                          >
                            {props.complaints?.complaintDate}
                          </p>
                        </div>
                      </div>


                      <CloseCircle size="24" color="#000" onClick={handleCloseIconClick}
                        className="cursor-pointer" />
                    </Modal.Header>
                    <Modal.Body>

                      <div
                        className={`p-2.5 bg-[#F4F5F7] rounded-[10px]
    ${comments.length > 2 ? "h-[250px] overflow-y-auto" : "h-auto overflow-y-hidden"}
  `}
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
                                className="w-full mb-2.5"
                              >

                                <div className="flex items-start w-full">
                                  <div className="flex items-start gap-2.5 w-full">
                                    {item?.profilePic ? (
                                      <img
                                        src={
                                          item?.profilePic &&
                                            item.profilePic !== "0" &&
                                            item.profilePic !== "null"
                                            ? item.profilePic
                                            : undefined
                                        }
                                        alt="User"
                                        className="w-10 h-10 rounded-full mr-2.5 cursor-pointer"
                                      />
                                    ) : (
                                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-semibold font-gilroy">
                                        {item?.initials || "-"}
                                      </div>
                                    )}

                                    <div className="flex-1">
                                      <p className="m-0 text-base font-semibold font-gilroy">
                                        {item.commentText}
                                      </p>
                                      <p className="m-0 text-sm text-gray-500 font-gilroy">
                                        {formattedDate}
                                      </p>
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block break-words whitespace-pre-wrap max-w-full mt-2 text-base font-normal text-gray-800 font-gilroy">
                                      {item.comment}
                                    </label>
                                  </div>
                                </div>

                                <div className="mt-3 border-b border-[#EDF0F4]" />
                              </div>

                            );
                          })
                        ) : (
                          <div className="text-center text-red-500 text-base p-5 font-gilroy">
                            No Comments available
                          </div>
                        )}

                      </div>

                      <div ref={commentsEndRef} />
                      {commentsLoading && <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10" >
                        <div className="w-10 h-10 rounded-full border-4 border-r-transparent border-t-[#1E45E1] animate-spin" >
                        </div>
                      </div>}


                      {/* {state.createAccount?.networkError ?
                        <ErrorMessage message={state.createAccount?.networkError} type="error" />
                        : null} */}

                      <Modal.Footer className="p-0 border-0">
                        <div className="mt-4 relative inline-block w-full">
                          <Form.Control
                            type="text"
                            value={comments}
                            onChange={(e) => handleComments(e)}
                            placeholder="Post your reply here"
                            className="w-full h-[52px] border border-[#E7E7E7] rounded-xl pl-4 py-1 font-gilroy focus:outline-none"
                          />

                          <div
                            onClick={handleAddComment}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#1E45E1] border border-[#E7E7E7] rounded-full p-2 flex items-center justify-center cursor-pointer"
                          >
                            <img
                              src={send}
                              alt="Send"
                              className="w-4 h-4"
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

                {/* change status */}
                <Modal
                  show={showChangeStatus}
                  onHide={ChangeStatusClose}
                  centered
                  backdrop="static"
                >
                  <Modal.Dialog className="m-0 p-0 max-w-5xl pr-2 rounded-3xl">
                    <Modal.Body>
                      <div>
                        <Modal.Header className="relative pr-px h-12" >
                          <div className="text-xl font-semibold font-gilroy -ml-3 -mt-3" >
                            Change Status
                          </div>

                          <CloseCircle size="24" color="#301414" onClick={ChangeStatusClose}
                            className="-mt-3 cursor-pointer" />
                        </Modal.Header>
                      </div>

                      <div className="mt-2">
                        <div className="w-full">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 font-gilroy">
                              Change Status <span className="text-red-500 text-xl">*</span>
                            </label>
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
                                  height: "46px",
                                  border: "1px solid #D9D9D9",
                                  borderRadius: "8px",
                                  fontSize: "16px",
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  textTransform: "capitalize",
                                }),
                                menu: (base) => ({
                                  ...base,
                                  backgroundColor: "#f8f9fa",
                                  border: "1px solid #ced4da",
                                  fontFamily: "Gilroy",
                                  textTransform: "capitalize",
                                }),
                                menuList: (base) => ({
                                  ...base,
                                  backgroundColor: "#f8f9fa",
                                  maxHeight: "120px",
                                  padding: 0,
                                  overflowY: "auto",
                                  fontFamily: "Gilroy",
                                  textTransform: "capitalize",
                                }),
                                placeholder: (base) => ({
                                  ...base,
                                  color: "#555",
                                  textTransform: "capitalize",
                                }),
                                dropdownIndicator: (base) => ({
                                  ...base,
                                  color: "#555",
                                  cursor: "pointer",
                                }),
                                option: (base, state) => ({
                                  ...base,
                                  cursor: "pointer",
                                  backgroundColor: state.isFocused ? "lightblue" : "white",
                                  color: "#000",
                                  textTransform: "capitalize",
                                }),
                                indicatorSeparator: () => ({
                                  display: "none",
                                }),
                              }}
                            />
                          </div>

                          {statusError.trim() !== "" && (
                            <div className="flex justify-center mb-1">
                              <ErrorMessage message={statusError} type="error" />
                            </div>
                          )}

                          {state.ComplianceList?.complianceChangeError && (
                            <div className="flex justify-center mb-1">
                              <ErrorMessage
                                message={state.ComplianceList?.complianceChangeError}
                                type="error"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* {state.createAccount?.networkError ?
                        <ErrorMessage message={state.createAccount?.networkError} type="error" />
                        : null} */}
                    </Modal.Body>


                    {formLoading && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                        <div className="w-10 h-10 rounded-full border-4 border-r-transparent border-t-blue-700 animate-spin"></div>
                      </div>
                    )}


                    <Modal.Footer className="!border-t-0">
                      <Button disabled={formLoading}
                        className="w-full !bg-blue-700 font-medium h-12 rounded-xl !text-base !font-gilroy"
                        onClick={handleChangeStatusClick}
                      >
                        Change Status
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal>

                {/* Assign complaint */}
                <Modal
                  show={showAssignComplaint}
                  onHide={handleCloseAssign}
                  centered
                  backdrop="static"
                >
                  <Modal.Dialog className="m-0 p-0 max-w-5xl pr-2 rounded-3xl">
                    <Modal.Header className="relative pr-px" >
                      <div className="text-xl font-semibold font-gilroy" >
                        Assign Complaint
                      </div>

                      <CloseCircle size="24" color="#000" onClick={handleCloseAssign}
                        className="cursor-pointer" />


                    </Modal.Header>
                    <Modal.Body className="pb-1">
                      <div>

                      </div>


                      <div className="w-full">
                        <div className="mb-2">

                          <label className="block mb-2 text-base font-medium text-gray-900 font-gilroy">
                            Assign Complaint <span className="text-red-500 text-xl">*</span>
                          </label>

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
                                  const selected =
                                    state.Settings.addSettingStaffList?.find(
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
                                height: "46px",
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
                                cursor: "pointer",
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
                            <div className="flex justify-center mt-1">
                              <ErrorMessage message={statusErrorType} type="error" />
                            </div>
                          )}
                        </div>
                      </div>


                      {state.ComplianceList?.complianceAssignChangeError &&

                        <ErrorMessage message={state.ComplianceList.complianceAssignChangeError} type="error" />

                      }
                    </Modal.Body>

                    {formAssignCompliantLoading && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                        <div className="w-10 h-10 rounded-full border-4 border-r-transparent border-t-blue-700 animate-spin"></div>
                      </div>
                    )}

                    <Modal.Footer className="border-0">
                      <Button disabled={formAssignCompliantLoading}
                        className="w-full !bg-blue-700 font-medium h-12 rounded-xl !text-base !font-gilroy"
                        onClick={handleAssignComplaintClick}
                      >
                        Assign Complaint
                      </Button>
                    </Modal.Footer>
                  </Modal.Dialog>
                </Modal>


              </div>
            </div>
          </div>

        </div>
      )}



      {/* Delete Compliance Modal */}
      <Modal
        show={deleteForm}
        onHide={handleCloseDeleteForm}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >

        <Modal.Header className="border-0">
          <Modal.Title className="w-full text-center !text-lg !font-semibold !text-gray-900 !font-gilroy mb-0">
            Delete Compliance?
          </Modal.Title>
        </Modal.Header>


        <Modal.Body className="text-center text-sm font-medium font-gilroy text-gray-500 -mt-2.5">
          Are you sure you want to delete this Compliance?
        </Modal.Body>

        <Modal.Footer className="flex justify-center border-0 ">

          <Button
            onClick={handleCloseDeleteForm}
            className="w-full max-w-[160px] h-12 px-5 py-3 rounded-lg !border !border-blue-700 bg-white !text-blue-700 !text-sm !font-semibold !font-gilroy"
          >
            Cancel
          </Button>

          <Button
            onClick={handleComplianceDelete}
            className="w-full max-w-[160px] h-12 px-5 py-3 rounded-lg !bg-blue-700 text-white !text-sm !font-semibold !font-gilroy"
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
