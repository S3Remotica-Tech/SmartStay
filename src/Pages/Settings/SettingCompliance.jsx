/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import message from "../../Assets/Images/New_images/messages_gray.png";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import { Button, Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import "../../Pages/Settings/SettingCompliance.css";
import { toast } from 'react-toastify';
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import Emptystate from "../../Assets/Images/Empty-State-svg.svg";


function SettingCompliance() {
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
  const [complianceFilterddata, setComplianceFilterddata] = useState([]);
  const [compliancecurrentPage, setCompliancecurrentPage] = useState(1);
  const [planExpiredCompliance, setPlanExpiredCompliance] = useState("");
  const [formLoading, setFormLoading] = useState(false)




  const {
    canWriteModule: canWriteComplaints,
    canReadModule: canReadComplaints,
    canUpdateModule: canUpdateComplaints,
    canDeleteModule: canDeleteComplaints,
  } = useHasPermission("Complaints");


  // const canReadComplaints = useHasPermission("Complaints", "canRead");
  // const canWriteComplaints = useHasPermission("Complaints", "canWrite");
  // const canUpdateComplaints = useHasPermission("Complaints", "canUpdate");
  // const canDeleteComplaints = useHasPermission("Complaints", "canDelete");


  useEffect(() => {
    if (!canReadComplaints) {
      setLoading(false);
    }
  }, [canReadComplaints]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
  useEffect(() => {
    if (complianceFilterddata.length === 0) {
      setLoading(false);
    }

  }, [complianceFilterddata])

  const handleDeleteClick = () => {
    dispatch({ type: "REMOVE_ALREADY_ASSIGNCOMPLAINTTYPE_ERROR" });
    setShowPopup(true)
    setShowDots(false)
  }

  const handleConfirmDelete = () => {
    if (rowDetails.complaintTypeId) {
      setFormLoading(true);
      dispatch({
        type: "DELETE-COMPLAINT-TYPE",
        payload: { id: rowDetails.complaintTypeId },
      });
    }

  };

  useEffect(() => {
    if (state.Settings.planExpired) {
      setPlanExpiredCompliance(state.Settings.planExpired);
    }
  }, [state.Settings.planExpired]);

  const handleCancel = () => {
    setShowPopup(false);
    dispatch({ type: "REMOVE_ALREADY_ASSIGNCOMPLAINTTYPE_ERROR" });
  };

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     setLoading(true);
  //     dispatch({
  //       type: "COMPLAINT-TYPE-LIST",
  //       payload: { hostel_id: state.login.selectedHostel_Id },
  //     });
  //   }
  // }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [state.login.selectedHostel_Id]);



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
    setShowDots(false);
    setId(rowDetails.complaintTypeId);
    setComplaintTypeName(rowDetails.complaintTypeName);
    setOriginalComplaintTypeName(rowDetails.complaintTypeName);
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
    dispatch({ type: "REMOVE_ALREADY_ASSIGNCOMPLAINTTYPE_ERROR" });

  };

  const handleShowForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding Complaints information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowForm(true);
    dispatch({ type: "REMOVE_ALREADY_ASSIGNCOMPLAINTTYPE_ERROR" });
  };

  const handleAddComplaintType = () => {
    dispatch({ type: "CLEAR_ALREADY_COMPLAINTTYPE_ERROR" });
    dispatch({ type: "REMOVE_ALREADY_ASSIGNCOMPLAINTTYPE_ERROR" });
    dispatch({ type: "CLEAR_PLAN-EXPIRED" })


    if (!complaintTypeName.trim()) {
      setComplaintError("Please Enter Complaint Type");
    } else {
      dispatch({
        type: "COMPLAINT-TYPE-ADD",
        payload: { complaintTypeName: complaintTypeName.trim(), hostelId: state.login.selectedHostel_Id },
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
      // dispatch({
      //   type: "COMPLAINT-TYPE-EDIT",
      //   payload: {
      //     complaint_name: complaintTypeName,
      //     hostel_id: state.login.selectedHostel_Id,
      //     id: id,
      //   },
      // });

      dispatch({
        type: "COMPLAINT-TYPE-EDIT",
        payload: {
          id,
          complaintTypeName: complaintTypeName.trim(),
          isActive: true,
          hostelId: state.login.selectedHostel_Id
        },
      });

      setFormLoading(true)
      setIsChangedError("");
    }
  };

  const handleComplaintType = (e) => {
    dispatch({ type: "CLEAR_ALREADY_COMPLAINTTYPE_ERROR" });
    setIsChangedError("");
    let value = e.target.value;
    value = value.trimStart();
    value = value.replace(/\s+/g, " ");
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setComplaintTypeName(value);

    if (value) {
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


  useEffect(() => {
    if (state.Settings.alreadytypeerror) {
      setFormLoading(false)
      // setTimeout(() => {
      //   dispatch({type:'CLEAR_ALREADY_COMPLAINTTYPE_ERROR'})
      // }, 2000);
    }

  }, [state.Settings.alreadytypeerror])

  useEffect(() => {
    if (state.Settings.alreadyAssignComplainterror) {
      setFormLoading(false)
    }
  }, [state.Settings.alreadyAssignComplainterror])

  const errorMsg = state?.Settings?.alreadyAssignComplainterror;












  useEffect(() => {
    if (state.Settings.addComplaintSuccessStatusCode === 201) {
      setFormLoading(false)
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_COMPLAINT_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.addComplaintSuccessStatusCode]);

  useEffect(() => {
    if (state.Settings.deletecomplaintStatuscode === 200) {
      setFormLoading(false)
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      // handleClose();
      setShowPopup(false);
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
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_COMPLAINT_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.editComplaintSuccessStatusCode]);

  // const indexOfLastRowCompliance =
  //   compliancecurrentPage * compliancerowsPerPage;
  // const indexOfFirstRowCompliance =
  //   indexOfLastRowCompliance - compliancerowsPerPage;
  // const complianceFilterddata = complianceFilterddata?.slice(
  //   indexOfFirstRowCompliance,
  //   indexOfLastRowCompliance
  // );

  // const handlePageChange = (generalpageNumber) => {
  //   setCompliancecurrentPage(generalpageNumber);
  // };

  // const handleItemsPerPageChange = (selectedOption) => {
  //   setCompliancerowsPerPage(selectedOption.value);
  //   setCompliancecurrentPage(1);
  // };

  // const complianceOptions = [
  //   { value: 10, label: "10" },
  //   { value: 50, label: "50" },
  //   { value: 100, label: "100" },
  // ];

  // const totalPagesGeneral = Math.ceil(
  //   complianceFilterddata?.length / compliancerowsPerPage
  // );

  useEffect(() => {
    if (
      complianceFilterddata.length > 0 &&
      complianceFilterddata.length === 0 &&
      compliancecurrentPage > 1
    ) {
      setCompliancecurrentPage(compliancecurrentPage - 1);
    }
  }, [complianceFilterddata]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  return (
    <>


      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">

        <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
          <label className="font-gilroy text-[18px] text-[#222] font-semibold">
            Complaint Type
          </label>
        </div>



        <div className="w-full flex justify-center md:justify-end">
          <button
            disabled={!canWriteComplaints}
            onClick={handleShowForm}
            className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition
        ${canWriteComplaints
                ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}

          >
            + Complaint Type
          </button>
        </div>

      </div>

    
      {

        !canReadComplaints ? (

          <div className="flex flex-col items-center justify-center h-screen mt-24">
            <img src={Emptystate} alt="Empty State" />
            <ErrorMessage
              message={['You do not have access to view Settings Compliants']}
              type="warning"
            />
          </div>
        ) : (
          <div className="complainttype mt-2">
            {complianceFilterddata && complianceFilterddata.length > 0 && (
              <div className="container show-scrolls relative max-h-[475px] overflow-y-auto">
  
{loading && (
       <div className="absolute inset-0 flex items-center justify-center z-[1050] bg-transparent">
          <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
        </div>
      )} 

                <div className="flex flex-wrap -mx-2">
                  {complianceFilterddata.map((u, i) => (
                    <div key={i} className="w-full sm:w-1/2 md:w-full lg:w-1/3 px-2 mb-3">
                      <div
                        className="flex items-center justify-between p-3 border rounded w-full"
                        style={{ height: "64px" }}
                      >
                        <div className="flex items-center">
                          <img src={message} width={24} height={24} alt="Role Icon" />
                          <span className="ml-5 text-[16px] font-semibold font-gilroy text-[#222222]">
                            {u.complaintTypeName}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleShowDots(e, u, i)}
                          className={`flex items-center justify-center h-[35px] w-[35px] rounded-full border border-[#EFEFEF] relative cursor-pointer ${showDots === i ? "bg-[#E7F1FF]" : "bg-white"
                            }`}
                        >
                          <PiDotsThreeOutlineVerticalFill className="h-4.5 w-4.5" />
                        </button>
                      </div>

                      {showDots === i && menuLoaded && (
                        <div
                          ref={popupRef}
                          className="fixed flex flex-col items-start z-[1000] bg-[#F9F9F9] rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.05)] border border-[#EBEBEB]"
                          style={{ top: popupPosition.top, left: popupPosition.left, width: "120px" }}
                        >

                          <div
                            onClick={() => canUpdateComplaints && handleEdit(u)}
                            className={`flex items-center gap-2 w-full px-3 py-2 transition-colors duration-200 ${canUpdateComplaints ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                              } rounded-t-lg`}
                            onMouseEnter={(e) =>
                              canUpdateComplaints && (e.currentTarget.style.backgroundColor = "#EDF2FF")
                            }
                            onMouseLeave={(e) =>
                              canUpdateComplaints && (e.currentTarget.style.backgroundColor = "transparent")
                            }
                          >
                            <img
                              src={Edit}
                              alt="edit"
                              className={`h-4 w-4 ${canUpdateComplaints ? "filter-none opacity-100" : "filter grayscale opacity-50"}`}
                            />
                            <label
                              className={`text-[14px] font-medium font-gilroy ${canUpdateComplaints ? "text-[#222222]" : "text-[#A0A0A0]"
                                }`}
                            >
                              Edit
                            </label>
                          </div>

                          <div className="w-full h-[1px] bg-[#E6E6E6]" />

                          <div
                            onClick={() => canDeleteComplaints && handleDeleteClick()}
                            className={`flex items-center gap-2 w-full px-3 py-2 transition-colors duration-200 ${canDeleteComplaints ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                              } rounded-b-lg`}
                            onMouseEnter={(e) =>
                              canDeleteComplaints && (e.currentTarget.style.backgroundColor = "#FFF0F0")
                            }
                            onMouseLeave={(e) =>
                              canDeleteComplaints && (e.currentTarget.style.backgroundColor = "transparent")
                            }
                          >
                            <img
                              src={Delete}
                              alt="delete"
                              className={`h-4 w-4 ${canDeleteComplaints ? "filter-none opacity-100" : "filter grayscale opacity-50"}`}
                            />
                            <label
                              className={`text-[14px] font-medium font-gilroy ${canDeleteComplaints ? "text-[#FF0000]" : "text-[#A0A0A0]"
                                }`}
                            >
                              Delete
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        )}

      {!loading && complianceFilterddata.length === 0 && canReadComplaints && (
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center">
            <img src={EmptyState} alt="Empty state" className="mt-28 2xl:mt-52" />
          </div>
          <div className="pb-1 text-center font-gilroy font-semibold !text-lg text-[#4B4B4B] mt-2">
            No ComplaintTypes
          </div>
          <div className="pb-1 text-center font-medium font-gilroy text-sm text-[#4B4B4B]">
            There are no ComplaintTypes available.
          </div>
        </div>
      )}

      <Modal
        className="editform custom-modal"
        show={showEditForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      >

        <Modal.Header className="relative flex items-center justify-between">
          <div className="text-lg font-semibold font-gilroy">
            Edit Complaint Type
          </div>
          <CloseCircle
            size={24}
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </Modal.Header>

        <Modal.Body className="pt-1 mb-2">
          <div className="w-full">
            <div className="w-full">

              <div className="flex flex-col">
                <label className="text-sm text-gray-900 font-gilroy font-medium mb-1">
                  Complaint Type <span className="text-red-500 text-xl">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Complaint Type"
                  value={complaintTypeName}
                  onChange={(e) => handleComplaintType(e)}
                  className="mb-2 w-full h-12 px-3 border border-gray-300 rounded-md text-gray-700 font-gilroy font-medium text-base shadow-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {isChangedError && (
                <div className="flex items-center justify-center mt-2">
                  <ErrorMessage message={isChangedError} type="error" />
                </div>
              )}
            </div>
          </div>

          {state.Settings.alreadytypeerror && (
            <div className="mt-2">
              <ErrorMessage message={state.Settings.alreadytypeerror} type="error" />
            </div>
          )}

          <Button disabled={formLoading}
            onClick={handleEditType}
            className="!w-full !mt-2 !h-12 !bg-[#1E45E1] !text-white !font-montserrat !font-semibold !text-base !rounded-lg"
          >
            Update Complaint Type
          </Button>
        </Modal.Body>

        {formLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
          </div>
        )}
      </Modal>

      <Modal
        show={showForm}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      >

        <Modal.Header className="relative flex items-center justify-between">
          <div className="text-lg md:text-xl font-gilroy font-semibold">
            Add Complaint Type
          </div>
          <CloseCircle
            size={24}
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </Modal.Header>


        <Modal.Body className="pt-1">
          <div className="flex flex-col w-full">
            <div className="w-full">
              <div className="mb-2 flex flex-col">
                <label className="text-base text-gray-900 font-gilroy font-medium mb-2">
                  Complaint Type <span className="text-red-500 text-xl">*</span>
                </label>
                <input
                  type="text"
                  id="form-controls"
                  placeholder="Enter Complaint Type"
                  value={complaintTypeName}
                  onChange={(e) => handleComplaintType(e)}
                  className="w-full h-12 px-3 border border-gray-300 rounded-md text-gray-700 font-gilroy font-medium text-base shadow-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                {state.Settings.alreadytypeerror && (
                  <div className="mt-1">
                    <ErrorMessage message={state.Settings.alreadytypeerror} type="error" />
                  </div>
                )}

                {complaintError && (
                  <div className="mt-1">
                    <ErrorMessage message={complaintError} type="error" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        {formLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
          </div>
        )}

        {planExpiredCompliance && (
          <ErrorMessage message={planExpiredCompliance} type="error" />
        )}

        <Modal.Footer className="!flex !justify-center !pt-0 !border-t-0">
          <button disabled={formLoading}
            onClick={handleAddComplaintType}
            className=" disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!cursor-not-allowed disabled:!opacity-70 !w-full !h-12 !px-4 !py-3 !rounded-lg !bg-[#1E45E1] !text-white !font-montserrat !font-semibold !text-sm"
          >
            + Complaint Type
          </button>
        </Modal.Footer>

      </Modal>

      <Modal
        show={showPopup}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header className="!border-b-0">
          <div className="w-full text-center mt-2 text-lg font-gilroy font-semibold text-gray-900">
            Delete ComplaintType?
          </div>
        </Modal.Header>


        <Modal.Body className="text-center text-sm font-medium font-gilroy text-gray-600 -mt-7">
          Are you sure you want to delete this Complaint-type?
        </Modal.Body>

        {formLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
          </div>
        )}

        {Boolean(errorMsg) && errorMsg !== "undefined" && (
          <div className="flex items-center justify-center mt-2 mb-2">
            <ErrorMessage message={errorMsg} type="error" />
          </div>
        )}


        <Modal.Footer className="!flex !justify-center !gap-2 !border-t-0 !-mt-2">
          <button
            onClick={handleCancel}
            className="!flex-1 !h-13 !px-5 !py-3.5 !rounded-md !bg-white !text-blue-700 !border !border-blue-700 !font-gilroy !font-semibold !text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmDelete}
            className="!flex-1 !h-13 !px-5 !py-3.5 !rounded-md !bg-blue-700 !text-white !font-gilroy !font-semibold !text-sm"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

SettingCompliance.propTypes = {
  hostelid: PropTypes.func.isRequired,
};

export default withErrorBoundary(SettingCompliance);
