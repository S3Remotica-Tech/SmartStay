/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import "flatpickr/dist/themes/material_blue.css";
import "bootstrap/dist/css/bootstrap.min.css";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
// import Filters from "../../Assets/Images/Filters.svg";
import Select from "react-select";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Compliants/Compliance.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
// import Form from "react-bootstrap/Form";
import ComplianceList from "../Compliants/ComplianceList";
import "react-datepicker/dist/react-datepicker.css";
// import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import AddCompliants from "./AddCompliants";

const CustomStyles = {
  control: (base, state) => {
    const selectedValue = state.getValue()?.[0]?.value;

    const isActualSelected =
      state.hasValue && selectedValue && selectedValue !== "ALL";

    return {
      ...base,
      minHeight: "38px",
      height: "38px",
      width: "100%",
      border: `1px solid ${state.isFocused ? "#5865F2" : isActualSelected ? "#5865F2" : "#E5E5E5"
        }`,
      borderRadius: "8px",
      fontSize: "12px",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",

      backgroundColor: isActualSelected
        ? "#1E45E1"
        : state.isFocused
          ? "#FFFFFF"
          : "#F7F7F7",

      "&:hover": {
        borderColor: state.isFocused
          ? "#5865F2"
          : isActualSelected
            ? "#5865F2"
            : "#D1D5DB",

        backgroundColor: isActualSelected
          ? "#5865F2"
          : state.isFocused
            ? "#FFFFFF"
            : "#F0F0F0",
      },
    };
  },

  singleValue: (base, state) => {
    const selectedValue = state.getValue()?.[0]?.value;

    const isActualSelected = selectedValue && selectedValue !== "ALL";

    return {
      ...base,
      color: isActualSelected ? "#FFFFFF" : "#6B7280",
      fontWeight: 500,
    };
  },

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: "13px",
      padding: "6px 12px",

      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#FFFFFF",

      color: "#111827",
      cursor: "pointer",
      whiteSpace: "nowrap",
      overflow: "visible",
      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #5865F2",
        fontWeight: 500,
      }),

      "&:hover": {
        backgroundColor: "#F3F4F6",
      },
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "32px",
  }),

  dropdownIndicator: (base, state) => {
    const selectedValue = state.getValue()?.[0]?.value;

    const isActualSelected = selectedValue && selectedValue !== "ALL";

    return {
      ...base,
      padding: "4px",
      color: isActualSelected
        ? "#FFFFFF"
        : state.isFocused
          ? "#5865F2"
          : "#6B7280",

      "&:hover": {
        color: isActualSelected ? "#FFFFFF" : "#5865F2",
      },
    };
  },

  indicatorSeparator: () => ({
    display: "none",
  }),
};






const Compliance = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;

  const [hosId, setHosId] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  const [filteredUsers, setFilteredUsers] = useState([]);


  // const [ExcelFilterDates, setExcelFilterDates] = useState([]);
  // const [filterStatus, setFilterStatus] = useState(false);
  const [statusfilter, setStatusfilter] = useState({
    value: "ALL",
    label: "All",
  });
  const location = useLocation();
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState(false);
  const [ComplaintData, setComplaintdata] = useState("");

  const [chips, setChips] = useState([]);

  const filterOptionsData = useSelector((state) => state.ComplianceList.Compliance.filterOption);


  const statusOptions = [
    { value: "ALL", label: "All" },
    ...(filterOptionsData?.status?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || []),
    { value: "date", label: "Date" },
  ];

  const handleReset = () => {
    dispatch({
      type: "SET_COMPLIANCE_FILTERS",
      payload: {
        status: "",
        statusLabel: "",
        search: "",
        startDate: "",
        endDate: "",
      },
    });

    dispatch({
      type: "COMPLIANCE-LIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
      },
    });

    setStatusfilter({
      value: "ALL",
      label: "All",
    });

    setSelectedDateRange([]);
    setChips([]);
    setFilterInput("");
  };

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
    const filters = state.ComplianceList?.complainceFilters;
    const filterData = [];

    if (
      filters?.status &&
      filters.status !== "ALL" &&
      filters.status !== "date"
    ) {
      filterData.push({
        key: "status",
        label: "Status",
        type: "status",
        value: filters.statusLabel || filters.status,
      });
    }

    if (filters?.search) {
      filterData.push({
        key: "search",
        label: "Search",
        type: "search",
        value: filters.search,
      });
    }

    if (filters?.startDate && filters?.endDate) {
      filterData.push({
        key: "date",
        label: "Date",
        type: "date",
        value: `${filters.startDate} - ${filters.endDate}`,
      });
    }


    setChips(filterData);
  }, [state.ComplianceList?.complainceFilters]);

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
      setFilteredUsers(state.ComplianceList.Compliance?.complaintsList);


      dispatch({ type: "CLEAR_COMPLIANCE_LIST" });

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


  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    dispatch({
      type: "SET_COMPLIANCE_FILTERS",
      payload: {
        search: e.target.value,
      },
    });

  };


  const handleStatusFilter = (selected) => {
    // console.log("value", value)
    setSelectedDateRange([]);
    setStatusfilter(selected);
    dispatch({
      type: "SET_COMPLIANCE_FILTERS",
      payload: {
        status: selected?.value === "ALL" ? "" : selected?.value,
        statusLabel: selected?.label || "All",
        startDate: "",
        endDate: "",
      },
    });
  };



  const handleDateChange = (dates) => {
    setSelectedDateRange([]);
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) {
      setSelectedDateRange([]);
      setStatusfilter("All");

      dispatch({
        type: "COMPLIANCE-LIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
        },
      });
      dispatch({
        type: "SET_COMPLIANCE_FILTERS",
        payload: {
          startDate: "",
          endDate: "",
        },
      });

      return;
    }
    setSelectedDateRange(dates);
    const newStartDate = dayjs(dates[0]).startOf("day").format("DD-MM-YYYY");
    const newEndDate = dayjs(dates[1]).endOf("day").format("DD-MM-YYYY");

    dispatch({
      type: "SET_COMPLIANCE_FILTERS",
      payload: {
        startDate: newStartDate,
        endDate: newEndDate,
      },
    });
  };


  console.log("complainceFilters;", state.ComplianceList?.complainceFilters)

  useEffect(() => {
    const hostelId = state.login?.selectedHostel_Id;

    if (!hostelId) {
      setLoading(false);
      return;
    }



    const debounceTimer = setTimeout(() => {
      const filters = state.ComplianceList?.complainceFilters;

      if (
        filters?.status === "date" &&
        (!filters?.startDate || !filters?.endDate)
      ) {
        setLoading(false);
        return;
      }

      setLoading(true);

      dispatch({
        type: "COMPLIANCE-LIST",
        payload: {
          hostelId,
          customerName: filters?.search || "",
          status: filters?.status === "date" ? "" : filters?.status,
          startDate: filters?.status === "date" ? filters.startDate : "",
          endDate: filters?.status === "date" ? filters.endDate : "",
        },
      });
    }, 500);



    return () => clearTimeout(debounceTimer);
  }, [
    state.login?.selectedHostel_Id,
    state.ComplianceList?.complainceFilters,

  ]);


  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_COMPLIANCE_FILTERS",
        payload: {
          status: "",
          statusLabel: "",
          search: "",
          startDate: "",
          endDate: "",
        },
      });
    }
  }, [])

  useEffect(() => {
    setLoading(false);
  }, [state.ComplianceList.Compliance?.complaintsList]);

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

  // console.log("complainceFilters", state.ComplianceList?.complainceFilters)

  // const handleFilterd = () => {
  //   setFilterStatus(!filterStatus);
  //   dispatch({
  //     type: "COMPLIANCE-LIST",
  //     payload: { hostelId: state.login.selectedHostel_Id },
  //   });
  // };


  // useEffect(() => {
  //   if (!filterStatus) {
  //     setStatusfilter("All");
  //     setSelectedDateRange([]);
  //   }
  // }, [filterStatus]);



  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);
    }
  }, [state.UsersList.UserListStatusCode]);



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

  console.log("statusfilter", statusfilter)

  return (
    <>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[1050]">
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
              <div className="relative ">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <Image src={searchteam} className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="form-control border-start-0 border border-l-0 border-r-0 border-[#CFD5DB] shadow-none outline-none px-2.5 py-2.5 w-full w-12 font-gilroy"
                    value={filterInput}
                    onChange={(e) => handlefilterInput(e)}
                  />
                </div>


              </div>





              <div className="mr-3 w-36 border border-gray-300 rounded-lg">
                <Select
                  isDisabled={!canReadComplaints}
                  options={statusOptions}
                  value={statusOptions.find(
                    (option) => option.value === statusfilter?.value
                  )}
                  onChange={handleStatusFilter}
                  isSearchable={false}
                  placeholder="Select Status"
                  className="text-sm font-gilroy"
                  styles={CustomStyles}
                />
              </div>

              {statusfilter?.value === "date" && (
                <div style={{ paddingRight: 30 }}>
                  <RangePicker
                    value={selectedDateRange}
                    onChange={handleDateChange}
                    format="DD-MM-YYYY"
                    className="h-10 cursor-pointer font-gilroy"
                  />
                </div>
              )}

              {/* <div className="me-2 cursor-pointer">
                <img
                  src={excelimg}
                  alt="excel"
                  width={38}
                  height={38}
                  onClick={handleComplianceeExcel}
                  className={`transition-opacity duration-300 ease-in-out ${canReadComplaints
                    ? "cursor-pointer opacity-100 pointer-events-auto"
                    : "cursor-not-allowed opacity-40 pointer-events-none"
                    }`}
                />
              </div> */}

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

        {chips?.length > 0 && (
          <div className="flex font-gilroy flex-wrap items-start gap-3 p-3 mx-3 mt-3 mb-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex flex-wrap gap-2 flex-1">
              {chips.map((chip) => (
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 bg-blue-100 text-gray-800 flex-shrink-0"
                >
                  {chip.label} :
                  <span className="text-gray-900">{chip.value}</span>
                </span>
              ))}
            </div>
            <span
              className="text-blue-600 text-sm font-medium cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </span>
          </div>
        )}


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
                <div key={complaints?.complaintId} className="bg-white rounded-xl p-2.5">
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
