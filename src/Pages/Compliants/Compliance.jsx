/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import "flatpickr/dist/themes/material_blue.css";
import "bootstrap/dist/css/bootstrap.min.css";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import Filters from "../../Assets/Images/Filters.svg";

import "sweetalert2/dist/sweetalert2.min.css";
import "../Compliants/Compliance.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import ComplianceList from "../Compliants/ComplianceList";
import "react-datepicker/dist/react-datepicker.css";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import AddCompliants from "./AddCompliants";

const Compliance = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;

  const [hosId, setHosId] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [ExcelFilterDates, setExcelFilterDates] = useState([]);
  const [filterStatus, setFilterStatus] = useState(false);
  const [statusfilter, setStatusfilter] = useState("");
  const location = useLocation();
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);

  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState(false);
  const [ComplaintData, setComplaintdata] = useState("");

  const {
    canWriteModule: canWriteComplaints,
    canReadModule: canReadComplaints,
  } = useHasPermission("Complaints");

  useEffect(() => {
    if (!canReadComplaints) {
      setLoading(false);
    }
  }, [canReadComplaints]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  const isComplaintForm = location.state?.isComplaintForm || false;

  useEffect(() => {
    setShow(isComplaintForm);
  }, [isComplaintForm]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHosId(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (hosId) {
      dispatch({
        type: "COMPLAINT-TYPE-LIST",
        payload: { hostel_id: state?.login?.selectedHostel_Id },
      });
    }
  }, [hosId]);

  useEffect(() => {
    if (state.UsersList?.exportComplianceDetails?.response?.fileUrl) {
      setExcelDownload(
        state.UsersList?.exportComplianceDetails?.response?.fileUrl,
      );
    }
  }, [state.UsersList?.exportComplianceDetails?.response?.fileUrl]);

  const handleComplianceeExcel = () => {
    if (ExcelFilterDates.length === 2) {
      dispatch({
        type: "EXPORTCOMPLIANCEDETAILS",
        payload: {
          type: "complaint",
          hostel_id: hosId,
          start_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelFilterDates[1]?.format("YYYY-MM-DD"),
        },
      });
      setExcelFilterDates([]);
      setStatusfilter("");
    } else if (
      statusfilter &&
      statusfilter !== "date" &&
      statusfilter !== "All"
    ) {
      dispatch({
        type: "EXPORTCOMPLIANCEDETAILS",
        payload: {
          type: "complaint",
          hostel_id: hosId,
          status: statusfilter,
        },
      });
      setExcelFilterDates([]);
      setStatusfilter("");
    } else {
      dispatch({
        type: "EXPORTCOMPLIANCEDETAILS",
        payload: { type: "complaint", hostel_id: hosId },
      });
    }

    setIsDownloadTriggered(true);
  };

  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();

      setTimeout(() => {
        setExcelDownload("");
        setIsDownloadTriggered(false);
      }, 500);
    }
  }, [excelDownload && isDownloadTriggered]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportcompliance === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_COMPLIANCE_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportcompliance]);

  useEffect(() => {
    if (state.ComplianceList?.statusCodeCompliance === 200) {
      setLoading(false);
      setFilteredUsers(state.ComplianceList.Compliance);

      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_LIST" });
      }, 1000);
    }
  }, [state.ComplianceList?.statusCodeCompliance]);

  useEffect(() => {
    if (state.ComplianceList.statusCodeForDeleteCompliance === 200) {
      dispatch({
        type: "COMPLIANCE-LIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_COMPLIANCE" });
      }, 1000);
    }
  }, [state.ComplianceList.statusCodeForDeleteCompliance]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "COMPLIANCE-LIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customerName: filterInput,
        },
      });
    } else {
      setFilteredUsers([]);
      setLoading(false);
    }
  }, [state.login?.selectedHostel_Id, filterInput]);

  useEffect(() => {
    setLoading(false);
  }, [state.ComplianceList.Compliance]);

  useEffect(() => {
    if (state.ComplianceList.statusCodeForAddCompliance === 201) {
      dispatch({
        type: "COMPLIANCE-LIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_COMPLIANCE_STATUS_CODE" });
      }, 500);
    }

    // if (state.ComplianceList.Compliance) {
    //   const filteredItems = state.ComplianceList?.Compliance?.filter((user) =>
    //     user?.complaintResponseDto?.customerName
    //       ?.toLowerCase()
    //       .includes(filterInput.toLowerCase())
    //   );

    //   setFilteredUsers(filteredItems);

    // } else {
    //   setFilteredUsers(state.ComplianceList?.Compliance || []);
    // }
  }, [state.ComplianceList.statusCodeForAddCompliance]);

  useEffect(() => {
    if (state.ComplianceList.statusCodeForEditCompliant === 200) {
      dispatch({
        type: "COMPLIANCE-LIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_COMPLIANT_STATUS_CODE" });
      }, 500);
    }
  }, [state.ComplianceList.statusCodeForEditCompliant]);

  // const [hostelname, setHostelName] = useState("");

  // const handleCloseSearch = () => {
  //   setSearch(false);
  //   setFilterInput("");
  //   setDropdownVisible(false);
  // };

  // const handleSearch = () => {
  //   setSearch(!search);
  // };

  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
    dispatch({
      type: "COMPLIANCE-LIST",
      payload: { hostelId: state.login.selectedHostel_Id },
    });
  };

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    // setDropdownVisible(e.target.value.length > 0);
  };

  // const handleUserSelect = (user) => {
  //   setFilterInput(user.customerName);
  //   dispatch({
  //     type: "COMPLIANCE-LIST",
  //     payload: {
  //       hostelId: state.login.selectedHostel_Id,
  //       customerName: user.customerName,
  //     },
  //   });

  //   // setDropdownVisible(false);
  // };

  // useEffect(() => {
  //   if (!filterInput) {
  //     dispatch({
  //       type: "COMPLIANCE-LIST",
  //       payload: { hostelId: state.login.selectedHostel_Id },
  //     });
  //   }
  // }, [filterInput]);

  const handleStatusFilter = (event) => {
    const value = event.target.value;
    setStatusfilter(value);

    let statusValue = value;
    if (value === "null") {
      statusValue = null;
    }

    if (value === "All") {
      dispatch({
        type: "COMPLIANCE-LIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    } else {
      dispatch({
        type: "COMPLIANCE-LIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          status: statusValue,
        },
      });
    }
  };

  const [selectedDateRange, setSelectedDateRange] = useState([]);

  const handleDateChange = (dates) => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) {
      setSelectedDateRange([]);
      setStatusfilter("All");

      dispatch({
        type: "COMPLIANCE-LIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
        },
      });

      return;
    }

    setSelectedDateRange(dates);

    const newStartDate = dayjs(dates[0]).startOf("day").format("DD-MM-YYYY");

    const newEndDate = dayjs(dates[1]).endOf("day").format("DD-MM-YYYY");

    setExcelFilterDates([
      dayjs(dates[0]).startOf("day"),
      dayjs(dates[1]).endOf("day"),
    ]);

    const filtered = (state.ComplianceList?.Compliance || []).filter((item) => {
      const itemDate = dayjs(item.date);
      return (
        itemDate.isSameOrAfter(dayjs(dates[0]), "day") &&
        itemDate.isSameOrBefore(dayjs(dates[1]), "day")
      );
    });

    setFilteredUsers(filtered);

    dispatch({
      type: "COMPLIANCE-LIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        startDate: newStartDate,
        endDate: newEndDate,
      },
    });
  };

  useEffect(() => {
    if (!filterStatus) {
      setStatusfilter("All");
      setSelectedDateRange([]);
    }
  }, [filterStatus]);

  // useEffect(() => {

  //   if (statusfilter === "date" && ExcelFilterDates.length === 2) {
  //     dispatch({
  //       type: 'COMPLIANCE-LIST', payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         from_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
  //         to_date: ExcelFilterDates[1]?.format("YYYY-MM-DD")
  //       }
  //     })
  //   }
  // }, [ExcelFilterDates]);

  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);
    }
  }, [state.UsersList.UserListStatusCode]);

  // const handleCheckoutChange = (selectedOption) => {
  //   setSelectedUserName(selectedOption?.value || "");
  //   if (!selectedOption) {
  //     setUserErrmsg("Please Select Name");
  //   } else {
  //     setUserErrmsg("");
  //   }
  // };

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding Compliance information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    dispatch({
      type: "TENANT_LIST_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        purpose: "COMPLAINTS",
      },
    });

    setEdit(false);
    setShow(true);
    setComplaintdata("");
  };

  const handleClose = () => {
    setShow(false);
    setEdit(false);
  };

  // const handleAssignShow = () => {
  //   setAssignpopupshow(true);
  // };
  // const handleAssignClose = () => {
  //   setAssignpopupshow(false);
  // };

  const handleEditcomplaint = (Complaintdata) => {
    setComplaintdata(Complaintdata);
    setEdit(true);

    dispatch({
      type: "TENANT_LIST_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        purpose: "COMPLAINTS",
      },
    });
    if (Complaintdata) {
      dispatch({
        type: "PARTICULAR_COMPLIANT",
        payload: { complaintId: Complaintdata.complaintId },
      });

      setShow(true);
    }
  };

  // const [EditComplaintDetails, setEditComplaintDetails] = useState({})

  useEffect(() => {
    if (state.ComplianceList.statusCodeforgetparticularCompliant === 200) {
      // setEditComplaintDetails(state.ComplianceList.ParticularComplaint)
      setTimeout(() => {
        dispatch({ type: "CLEAR_PARTICULAR_COMPLIANT_STATUS" });
      }, 500);
    }
  }, [state.ComplianceList.statusCodeforgetparticularCompliant]);

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]',
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #000000";
      closeButton.style.padding = "9px";
    }
  }, []);

  // useEffect(() => {
  //   if (hosId) {
  //     dispatch({ type: "GETUSERSTAFF", payload: { hostel_id: hosId } });
  //   }
  // }, [hosId]);

  useEffect(() => {
    if (state.Settings.StatusForaddSettingStaffList === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_USER_STAFF_LIST" });
      }, 500);
    }
  }, [state.Settings.StatusForaddSettingStaffList]);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  // const uniqueCompliance = Array.isArray(state.ComplianceList?.Compliance)
  //   ? state.ComplianceList.Compliance.filter(
  //       (item, index, self) =>
  //         index === self.findIndex((t) => t.customerId === item.customerId),
  //     )
  //   : [];

  // const filterUsers = uniqueCompliance?.filter((user) =>
  //   user?.customerName?.toLowerCase().includes(filterInput.toLowerCase()),
  // );

  // const blockedStatus = [
  //   "Vacated",
  //   "Booked",
  //   "Inactive",
  //   "Settlement Generated",
  // ];

  return (
    <>
      <div>
        {loading && (
          <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent z-[1050]">
            <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="sticky top-1 bg-white z-40 m-1 h-auto font-gilroy">
          <div className="flex justify-between items-center flex-wrap">
            <div>
              <label className="text-lg text-black font-semibold font-gilroy">
                Complaints
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative mt-2">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <Image src={searchteam} className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control border-start-0 border border-l-0 border-r-0 border-[#CFD5DB] shadow-none outline-none px-2.5 py-2 w-full w-12 font-gilroy"
                    value={filterInput}
                    onChange={(e) => handlefilterInput(e)}
                  />
                </div>

                {/* {isDropdownVisible && filteredUsers?.length > 0 && (
                  <div className="absolute top-15 left-0 z-50 w-full p-2.5 bg-white border border-gray-300 rounded-lg">
                    <ul className="show-scroll p-0 m-0 list-none rounded-lg max-h-44 overflow-y-auto bg-white w-full box-border">
                      {filterUsers?.length > 0 ? (
                        filterUsers.map((user, index) => {
                          const imagedrop =
                            user?.complaintResponseDto?.customerProfile ||
                            Profile;
                          return (
                            <li
                              key={index}
                              className={`flex items-center w-full p-2.5 rounded-lg cursor-pointer box-border font-gilroy ${
                                hoveredIndex === index
                                  ? "bg-blue-700 text-white"
                                  : "bg-white text-black"
                              }`}
                              onClick={() =>
                                handleUserSelect(user.complaintResponseDto)
                              }
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                            >
                              <Image
                                src={imagedrop}
                                alt={user?.Name || "Default Profile"}
                                roundedCircle
                                className="h-7.5 w-7.5 mr-2.5 flex-shrink-0"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = Profile;
                                }}
                              />
                              <div style={{ flexGrow: 1 }}>
                                {user?.complaintResponseDto?.customerName ||
                                  "Unnamed"}
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="flex items-center justify-center w-full p-2.5 rounded-lg bg-white text-black box-border font-gilroy">
                          No Customer found
                        </li>
                      )}
                    </ul>
                  </div>
                )} */}
              </div>
              {/* ) : ( */}
              {/* <div className="me-2 cursor-pointer">
                  <Image
                    src={searchteam}
                    className={`h-6 w-6 transition-opacity duration-300 ease-in-out ${
                      canReadComplaints
                        ? "cursor-pointer opacity-100 pointer-events-auto"
                        : "cursor-not-allowed opacity-40 pointer-events-none"
                    }`}
                    onClick={() => canReadComplaints && handleSearch()}
                  />
                </div>
              )} */}

              <div className="me-2 cursor-pointer">
                <Image
                  src={Filters}
                  className={`h-12 w-12 transition-opacity duration-300 ease-in-out ${
                    canReadComplaints
                      ? "cursor-pointer opacity-100 pointer-events-auto"
                      : "cursor-not-allowed opacity-40 pointer-events-none"
                  }`}
                  onClick={handleFilterd}
                />
              </div>

              {filterStatus && (
                <div className="mr-3 w-36 border border-gray-300 rounded-lg">
                  <Form.Select
                    onChange={(e) => handleStatusFilter(e)}
                    value={statusfilter}
                    aria-label="Select Price Range"
                    id="statusselect"
                    className="text-gray-900 font-semibold font-gilroy cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="date">Date</option>
                  </Form.Select>
                </div>
              )}
              {statusfilter === "date" && (
                <div style={{ paddingRight: 30 }}>
                  <RangePicker
                    value={selectedDateRange}
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                    className="h-10 cursor-pointer font-gilroy"
                  />
                </div>
              )}

              <div className="me-2 cursor-pointer">
                <img
                  src={excelimg}
                  alt="excel"
                  width={38}
                  height={38}
                  onClick={handleComplianceeExcel}
                  className={`transition-opacity duration-300 ease-in-out ${
                    canReadComplaints
                      ? "cursor-pointer opacity-100 pointer-events-auto"
                      : "cursor-not-allowed opacity-40 pointer-events-none"
                  }`}
                />
              </div>

              <div className="me-2 pr-1">
                <Button
                  disabled={
                    !canWriteComplaints || state?.login?.planStatus === 0
                  }
                  onClick={handleShow}
                  className="!font-gilroy text-sm !font-semibold text-white !bg-blue-700 rounded-lg p-2 w-36 whitespace-nowrap"
                >
                  {" "}
                  + Complaint
                </Button>
              </div>
            </div>
          </div>
        </div>

        {!canReadComplaints ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 
  h-[530px] lg:h-[530px] xl:h-[530px] 2xl:h-[850px] 3xl:h-[850px] overflow-y-auto show-scroll"
          >
            {filteredUsers.length > 0 &&
              filteredUsers.map((complaints) => (
                <div key={complaints.ID} className="bg-white rounded-xl p-2.5">
                  <ComplianceList
                    complaints={complaints}
                    onEditComplaints={handleEditcomplaint}
                    // onAssignshow={handleAssignShow}
                    disableActions={state?.login?.planStatus === 0}
                  />
                </div>
              ))}

            {!loading && filteredUsers.length === 0 && (
              <div className="col-span-1 md:col-span-2">
                <NoDataMessage label="Complaints" />
              </div>
            )}
          </div>
        )}
      </div>

      {show && (
        <AddCompliants
          show={show}
          handleClose={handleClose}
          edit={edit}
          ComplaintData={ComplaintData}
        />
      )}
    </>
  );
};

export default withErrorBoundary(Compliance);
