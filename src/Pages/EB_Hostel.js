/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "./EB_Hostel.css";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import "flatpickr/dist/themes/material_blue.css";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EBRoomReading from "./EBRoomReading";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import "react-datepicker/dist/react-datepicker.css";
import excelimg from "../Assets/Images/New_images/excel_blue.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { MdError } from "react-icons/md";
import EBHostelReading from "./EB_Hostel_Based";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import PropTypes from "prop-types";
import Select from "react-select";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Filters from "../Assets/Images/Filters.svg";
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import {CloseCircle} from "iconsax-react";
function EB_Hostel() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const theme = useTheme();
const { RangePicker } = DatePicker;
 dayjs.extend(isBetween);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [addEbDetail, setaddEbDetail] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [endmeter, setEndmeter] = useState("");
  const [value, setValue] = React.useState("1");
  const [ebrolePermission, setEbRolePermission] = useState("");
  const [ebpermissionError, setEbPermissionError] = useState("");
  const [ebAddPermission, setEbAddPermission] = useState("");
  const [ebDeletePermission, setEbDeletePermission] = useState("");
  const [ebEditPermission, setEbEditPermission] = useState("");
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [hostelBased, setHostelBased] = useState("");
  const [uniqueostel_Id, setUniqostel_Id] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [endMeterError, setendMeterError] = useState("");
  const [dateError, setDateError] = useState("");
  const [hostelBasedForm, setHostelBasedForm] = useState(false);
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const [electricityFilterddata, setelectricityFilterddata] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [loader, setLoader] = useState(true);
  const [customerLoader, setCustomerLoader] = useState(true);
  const [dateErrorMesg, setDateErrorMesg] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    setSelectedHostel(state.login.selectedHostel_Id);
  }, [state.login.selectedHostel_Id]);

  // useEffect(() => {
  //   if (selectedHostel) {
  //     dispatch({
  //       type: "ALL_HOSTEL_DETAILS",
  //       payload: { hostel_id: selectedHostel },
  //     });
  //   }
  // }, [selectedHostel]);

  const [editeb, setEditEb] = useState(false);

  const handleHostelForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding eb information.", {
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
    setHostelBasedForm(true);
    setEditEb(false);
  };

  useEffect(() => {
    if (state.UsersList?.exportEbDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportEbDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportEbDetails?.response?.fileUrl]);

  const handleEbExcel = () => {
    dispatch({
      type: "EXPORTEBSDETAILS",
      payload: { type: "customer_readings", hostel_id: selectedHostel },
    });
    setIsDownloadTriggered(true);
  };
  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownload && isDownloadTriggered]);
  useEffect(() => {
    if (state.UsersList?.statusCodeForExportEb === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_EB_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportEb]);

  useEffect(() => {
    setEbRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      ebrolePermission[0]?.is_owner === 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_view === 1
    ) {
      setEbPermissionError("");
    } else {
      setEbPermissionError("Permission Denied");
    }
  }, [ebrolePermission]);

  useEffect(() => {
    if (
      ebrolePermission[0]?.is_owner === 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_create === 1
    ) {
      setEbAddPermission("");
    } else {
      setEbAddPermission("Permission Denied");
    }
  }, [ebrolePermission]);

  useEffect(() => {
    if (
      ebrolePermission[0]?.is_owner === 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_delete === 1
    ) {
      setEbDeletePermission("");
    } else {
      setEbDeletePermission("Permission Denied");
    }
  }, [ebrolePermission]);
  useEffect(() => {
    if (
      ebrolePermission[0]?.is_owner === 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_edit === 1
    ) {
      setEbEditPermission("");
    } else {
      setEbEditPermission("Permission Denied");
    }
  }, [ebrolePermission]);

  const handleChanges = (event, newValue) => {
    setLoader(false);
    setValue(newValue);
    setaddEbDetail(false);
    setHostelBasedForm(false);
    setFilterInput("");
    setSearch(false);
    setDropdownVisible(false);
  };

  const calendarRef = useRef(null);
  // useEffect(() => {
  //   dispatch({ type: "EBLIST" });
  // }, []);
  const [electricityFilterd, setelectricityFilterd] = useState([]);
  const [electricityHostel, setelectricityHostel] = useState([]);
  useEffect(() => {
    //  if(state.login.selectedHostel_Id){
    setCustomerLoader(true);
    dispatch({
      type: "CUSTOMEREBLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
    //  }
  }, []);
  useEffect(() => {
    if (state.PgList?.statusCodeForEbRoomList === 200) {
      setLoader(false);
      setelectricityFilterd(state.PgList?.EB_startmeterlist);

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_STARTMETER_LIST" });
      }, 1000);
    }
  }, [state.PgList.statusCodeForEbRoomList]);

  useEffect(() => {
    if (state.login.selectedHostel_Id && value === "2") {
      setLoader(true);
      dispatch({
        type: "EBSTARTMETERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
    if (selectedHostel && value === "3") {
      setLoader(true);
      dispatch({
        type: "HOSTELBASEDEBLIST",
        payload: { hostel_id: selectedHostel },
      });
    }
  }, [selectedHostel]);

  useEffect(() => {
    if (state.PgList.getStatusCodeForHostelBased === 200) {
      setLoader(false);
      setelectricityHostel(state?.PgList?.getHostelBasedRead?.hostel_readings);

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_CUSTOMER_HOSTEL_EBLIST" });
      }, 200);
    }
  }, [state.PgList.getStatusCodeForHostelBased]);
  const options = {
    dateFormat: "Y/m/d",
    maxDate: new Date(),
    minDate: null,
  };

  useEffect(() => {
    setDateError(state?.PgList?.ebError);
  }, [state?.PgList?.ebError]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  // useEffect(() => {
  //   setSelectedHostel(state.login.selectedHostel_Id);
  // }, [state.login.selectedHostel_Id]);

  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || "");
    setRooms("");
    setfloorError("");
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  const handleRoom = (selectedOption) => {
    setRooms(selectedOption?.value || "");
    setRoomError("");
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  useEffect(() => {
    if (selectedHostel && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: selectedHostel, floor_Id: Floor },
      });
    }
  }, [Floor]);

  useEffect(() => {
    if (selectedHostel) {
      dispatch({
        type: "HOSTELDETAILLIST",
        payload: { hostel_Id: selectedHostel },
      });
    }
  }, [selectedHostel]);

  useEffect(() => {
    if (selectedHostel) {
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: { hostel_id: selectedHostel },
      });
    }
  }, [selectedHostel]);
  // useEffect(() => {
  //   dispatch({ type: "TRANSACTIONHISTORY" });
  // }, []);

  const handleAddEbDetails = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding eb information.", {
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
    setaddEbDetail(true);
  };

  const handleendmeter = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    setEndmeter(value);
    setendMeterError("");
    setDateErrorMesg("");
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  // useEffect(() => {
  //   const FilterEbAmount = state.Settings.EBBillingUnitlist?.filter(
  //     (item) => item.hostel_id == selectedHostel
  //   );
  //   setUnitAmount(FilterEbAmount);
  //   if (Array.isArray(FilterEbAmount) && FilterEbAmount.length > 0) {
  //     setUnitAmount(FilterEbAmount[0]?.amount);
  //   } else {
  //     console.log("unitAmount is not a valid array or is empty.");
  //   }
  // }, [state.Settings.EBBillingUnitlist, selectedHostel]);

  useEffect(() => {
    const FilterHostelBased = state.Settings.EBBillingUnitlist?.filter(
      (item) => item.hostel_id === selectedHostel
    );

    if (Array.isArray(FilterHostelBased) && FilterHostelBased.length > 0) {
      setHostelBased(FilterHostelBased[0]?.hostel_based);
      setHostelName(FilterHostelBased[0]?.Name);
    } else {
      console.log("unitAmount is not a valid array or is empty.");
    }
  }, [state.Settings.EBBillingUnitlist, selectedHostel]);

  useEffect(() => {
    if (state.PgList.statusCodeforEbCustomer === 200) {
      setelectricityFilterddata(state.PgList?.EB_customerTable);
      setOriginalElec(state.PgList?.EB_customerTable)
      setCustomerLoader(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_CUSTOMER_EBLIST" });
      }, 200);
    }
  }, [state.PgList.statusCodeforEbCustomer]);

  useEffect(() => {
    if (state.PgList.nostatusCodeforEbCustomer === 201) {
      setCustomerLoader(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOHOSTEL" });
      }, 200);
    }
  }, [state.PgList.nostatusCodeforEbCustomer]);

  useEffect(() => {
    if (state.PgList?.statusCodeForEbRoomList === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_STARTMETER_LIST" });
      }, 200);
    }
  }, [state.PgList.statusCodeForEbRoomList]);

  useEffect(() => {
    if (state.PgList.AddEBstatusCode === 200) {
      dispatch({
        type: "EBSTARTMETERLIST",
        payload: { hostel_id: selectedHostel },
      });
      dispatch({
        type: "CUSTOMEREBLIST",
        payload: { hostel_id: selectedHostel },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB" });
      }, 200);
    }
  }, [state.PgList.AddEBstatusCode]);

  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null ||
      value === "0";
    if (isValueEmpty) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Floor Required");
          break;
        case "Rooms":
          setRoomError("Room Required");
          break;

        case "selectedDate":
          setDateErrorMesg("Date Required");
          break;
        case "endmeter":
          setendMeterError("Reading Required");
          break;
        default:
          break;
      }
      return false;
    }

    switch (fieldName) {
      case "Floor":
        setfloorError("");
        break;
      case "Rooms":
        setRoomError("");
        break;

      case "selectedDate":
        setDateErrorMesg("");
        break;
      case "endmeter":
        setendMeterError("");
        break;
      default:
        break;
    }

    return true;
  };

  const handleClose = () => {
    setaddEbDetail(false);
    setfloorError("");
    setRoomError("");
    setendMeterError("");
    setEndmeter("");
    setRooms("");
    setFloor("");
    setSelectedDate("");
    setDateError("");
    setDateErrorMesg("");
  };

  const handleSaveEbBill = () => {
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");

    const isEndMeterValid = validateAssignField(endmeter, "endmeter");
    const isDatevalid = validateAssignField(selectedDate, "selectedDate");

    if (Floor === "Select Floor" || !isFloorValid) {
      setfloorError("Please Select Valid Floor");
      return;
    } else {
      setfloorError("");
    }

    // Validate Room field
    if (Rooms === "Select a Room" || !isRoomValid) {
      setRoomError("Please Select Valid Room");
      return;
    } else {
      setRoomError("");
    }

    if (!isEndMeterValid || (!isFloorValid && !isRoomValid && !isDatevalid)) {
      return;
    }
    if (Floor && Rooms && endmeter && selectedDate) {
      const incrementDateAndFormat = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);

        return newDate.toISOString().split("T")[0];
      };
      const formattedDate = selectedDate
        ? incrementDateAndFormat(selectedDate)
        : "";
      dispatch({
        type: "CREATEEB",
        payload: {
          hostel_id: selectedHostel,
          floor_id: Floor,
          room_id: Rooms,
          date: formattedDate,
          reading: endmeter,
        },
      });
    }
  };
  useEffect(() => {
    if (state.PgList?.AddEBstatusCode === 200) {
      handleClose();
      dispatch({
        type: "CUSTOMEREBLIST",
        payload: { hostel_id: selectedHostel },
      });
    }
  }, [state.PgList?.AddEBstatusCode]);

  // const electricityrowsPerPage = 5;
  const [electricityrowsPerPage, setElectricityrowsPerPage] = useState(10);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;
  // const currentRoomelectricity = electricityFilterddata?.slice(
  //   indexOfFirstRowelectricity,
  //   indexOfLastRowelectricity
  // );
  const currentRoomelectricity =
    filterInput.length > 0
      ? electricityFilterddata
      : electricityFilterddata?.slice(
          indexOfFirstRowelectricity,
          indexOfLastRowelectricity
        );

  const handlePageChange = (pageNumber) => {
    setelectricitycurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setElectricityrowsPerPage(Number(event.target.value));
    setelectricitycurrentPage(1);
  };
  const totalPagesinvoice = Math.ceil(
    electricityFilterddata?.length / electricityrowsPerPage
  );


  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  
    const sortedData = React.useMemo(() => {
      if (!sortConfig.key) return currentRoomelectricity;
  
      const sorted = [...currentRoomelectricity].sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
  
  
        if (!isNaN(valueA) && !isNaN(valueB)) {
          return sortConfig.direction === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        }
  
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortConfig.direction === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }
  
        return 0;
      });
  
      return sorted;
    }, [currentRoomelectricity, sortConfig]);
  
    const handleSort = (key, direction) => {
      setSortConfig({ key, direction });
    };


   

  // const renderPageNumberselectricity = () => {
  //   const pageNumberselectricity = [];
  //   let startPageelectricity = electricitycurrentPage - 1;
  //   let endPageelectricity = electricitycurrentPage + 1;

  //   if (electricitycurrentPage === 1) {
  //     startPageelectricity = 1;
  //     endPageelectricity = 3;
  //   }

  //   if (electricitycurrentPage === totalPagesinvoice) {
  //     startPageelectricity = totalPagesinvoice - 2;
  //     endPageelectricity = totalPagesinvoice;
  //   }

  //   if (electricitycurrentPage === 2) {
  //     startPageelectricity = 1;
  //     endPageelectricity = 3;
  //   }

  //   if (electricitycurrentPage === totalPagesinvoice - 1) {
  //     startPageelectricity = totalPagesinvoice - 2;
  //     endPageelectricity = totalPagesinvoice;
  //   }

  //   for (let i = startPageelectricity; i <= endPageelectricity; i++) {
  //     if (i > 0 && i <= totalPagesinvoice) {
  //       pageNumberselectricity.push(
  //         <li key={i} style={{ margin: "0 5px" }}>
  //           <button
  //             style={{
  //               padding: "5px 10px",
  //               textDecoration: "none",
  //               color: i === electricitycurrentPage ? "#007bff" : "#000000",
  //               cursor: "pointer",
  //               borderRadius: "5px",
  //               display: "inline-block",
  //               minWidth: "30px",
  //               textAlign: "center",
  //               backgroundColor:
  //                 i === electricitycurrentPage ? "transparent" : "transparent",
  //               border:
  //                 i === electricitycurrentPage ? "1px solid #ddd" : "none",
  //             }}
  //             onClick={() => handleElectricityPageChange(i)}
  //           >
  //             {i}
  //           </button>
  //         </li>
  //       );
  //     }
  //   }

  //   return pageNumberselectricity;
  // };

  
  const handleDateChange = (date) => {
    setDateError("");
    setDateErrorMesg("");
    setSelectedDate(date);
    dispatch({ type: "CLEAR_EB_ERROR" });
  };
  const handleSearch = () => {
    setSearch(!search);
  };

const [customerDateRange, setCustomerDateRange] = useState([]);
  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
  };

  const handleDateRangeChangeEb = (dates) => {
    setCustomerDateRange(dates);
    
      if (!dates || dates.length !== 2) {
        setFilterStatus(false);  
        setelectricityFilterddata(originalElec); 
        return;
      }
    
      const [start, end] = dates;
    
      const filtered = originalElec?.filter((item) => {
        const itemDate = dayjs(item.reading_date);
        return itemDate.isSameOrAfter(start, 'day') && itemDate.isSameOrBefore(end, 'day');
      });
    
      setelectricityFilterddata(filtered);
      setFilterStatus(true); 
      setelectricitycurrentPage(1)
      
    };

  const [originalElec, setOriginalElec] = useState("");

  // const handleUserSelect = (user) => {
  //   setFilterInput(user.Name);
  //   setelectricityFilterddata([user]);
  //   setDropdownVisible(false);
  // };
  const handleUserSelect = (user) => {
    setFilterInput(user.Name);
    setelectricityFilterddata([user]);

    setDropdownVisible(false);
  };

  // const handlefilterInput = (e) => {
  //   const inputValue = e.target.value;
  //   setFilterInput(inputValue);
  //   setDropdownVisible(inputValue.length > 0);

  //   if (inputValue.length === 0) {
  //     setelectricityFilterddata(originalElec);
  //   } else {
  //     const filteredData = originalElec?.filter((item) =>
  //       item.Name.toLowerCase().includes(inputValue.toLowerCase())
  //     );
  //     setelectricityFilterddata(filteredData);
  //   }
  // };
  const handlefilterInput = (e) => {
    const searchText = e.target.value;
    setFilterInput(searchText);
    setDropdownVisible(searchText.length > 0);

    if (searchText.length > 0) {
      // Filter the latest list
      setelectricityFilterddata(
        originalElec.filter((item) =>
          item.Name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    } else {
      // Reset to the full list when input is cleared
      setelectricityFilterddata(originalElec);
    }
  };

  useEffect(() => {
    if (electricityFilterddata?.length > 0 && originalElec?.length === 0) {
      setOriginalElec(electricityFilterddata);
    }
  }, [electricityFilterddata]);

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
    setelectricityFilterddata(originalElec);
    // setRoomBasedDetail(originalElecRoom);
    // setReceiptData(originalReceipt);
  };

  return (
    <div >
     <div
        className="container-fluid"
        style={{
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          height: "auto",
        }}
      >
     <div
  className="d-flex flex-wrap justify-content-between align-items-center"
  style={{ paddingLeft: 13, paddingTop: value === "2" ? "22px" : "19px" }}
>
  {/* Title */}
  <div className="me-3" style={{ minWidth: "100px" }}>
    <label
      style={{
        fontSize: 18,
        color: "#000000",
        fontWeight: 600,
        marginLeft: "-2px",
        marginTop: "4px",
      }}
    >
      Electricity
    </label>
  </div>

  {/* Actions */}
  <div className="d-flex flex-wrap align-items-center gap-2">

    {/* Search Field */}
    {search && value === "1" ? (
      <div className="position-relative" style={{ maxWidth: "300px", minWidth: "180px" }}>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <Image src={searchteam} alt="Search" style={{ height: 20, width: 20 }} />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search"
            value={filterInput}
            onChange={(e) => handlefilterInput(e)}
            style={{ boxShadow: "none", outline: "none", borderRight: "none" }}
          />
          <span className="input-group-text bg-white border-start-0">
            <img
              src={closecircle}
              alt="close"
              onClick={handleCloseSearch}
              style={{ height: 20, width: 20, cursor: "pointer" }}
            />
          </span>
        </div>
        {/* Dropdown List */}
        {value === "1" &&
          isDropdownVisible &&
          electricityFilterddata?.length > 0 && (
            <div
              style={{
                border: "1px solid #d9d9d9",
                position: "absolute",
                top: 50,
                left: 0,
                zIndex: 1000,
                padding: 10,
                borderRadius: 8,
                backgroundColor: "#fff",
                width: "100%",
              }}
            >
              <ul
                className="show-scroll p-0"
                style={{
                  listStyleType: "none",
                  maxHeight: 174,
                  minHeight:
                    electricityFilterddata?.length > 1 ? "100px" : "auto",
                  overflowY:
                    electricityFilterddata?.length > 3 ? "auto" : "hidden",
                  margin: 0,
                }}
              >
                {electricityFilterddata?.map((user, index) => (
                  <li
                    key={index}
                    className="d-flex align-items-center"
                    style={{
                      padding: "10px 5px",
                      cursor: "pointer",
                      borderBottom:
                        index !== electricityFilterddata?.length - 1
                          ? "1px solid #eee"
                          : "none",
                      backgroundColor:
                        hoveredIndex === index ? "#1E45E1" : "transparent",
                        color:
                        hoveredIndex === index ? "white" : "black",
                    }}
                    onClick={() => handleUserSelect(user)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Image
                      src={user.profile || Profile}
                      alt={user.Name}
                      roundedCircle
                      style={{
                        height: "30px",
                        width: "30px",
                        marginRight: "10px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Profile;
                      }}
                    />
                    <span>{user.Name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    ) : (
      value === "1" && (
        <div className="me-2" style={{ cursor: "pointer" }}>
          <Image
            src={searchteam}
            alt="Search Icon"
            style={{ height: 24, width: 24 }}
            onClick={handleSearch}
          />
        </div>
      )
    )}

    {/* Filter Icon */}
    {value === "1" && (
      <div className="me-2">
        <Image
          src={Filters}
          roundedCircle
          style={{ height: "50px", width: "50px", cursor: "pointer" }}
          onClick={handleFilterd}
        />
      </div>
    )}

    {/* Date Picker */}
    {filterStatus && value === "1" && (
      <div className="me-2">
        <RangePicker
          value={customerDateRange}
          onChange={handleDateRangeChangeEb}
          format="DD/MM/YYYY"
          style={{ height: 40,cursor:"pointer" }}
        />
      </div>
    )}

    {/* Excel Icon */}
    {value === "1" && (
      <div className="me-2" style={{ cursor: "pointer" }}>
        <img
          src={excelimg}
          alt="Excel"
          width={38}
          height={38}
          onClick={handleEbExcel}
        />
      </div>
    )}

    {/* Action Button */}
    <div className="me-2" style={{ paddingRight: 4 }}>
      {hostelBased === 1 ? (
        <Button
          onClick={handleHostelForm}
          className="text-white"
          style={{
            fontFamily: "Gilroy",
            fontSize: "14px",
            backgroundColor: "#1E45E1",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "11px 19px",
            whiteSpace: "nowrap",
            width: 146,
          }}
        >
          + Hostel Reading
        </Button>
      ) : (
        <Button
          onClick={handleAddEbDetails}
          disabled={ebAddPermission}
          className="text-white"
          style={{
            fontFamily: "Gilroy",
            fontSize: "14px",
            backgroundColor: "#1E45E1",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "11px 19px",
            whiteSpace: "nowrap",
            width: 146,
          }}
        >
          + Room Reading
        </Button>
      )}
    </div>
  </div>
</div>

      </div>

      <TabContext value={value}>
        <div>
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <TabList
              orientation={isSmallScreen ? "vertical" : "horizontal"}
              onChange={handleChanges}
              aria-label="lab API tabs example"
              style={{ marginLeft: "14px", marginTop: "-10px" }}
              className="custom-tab-list d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
            >
              <Tab
                label="Customer Reading"
                value="1"
                style={{
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                  lineHeight: "normal",
                  fontStyle: "normal",
                  fontWeight: 500,
                  textTransform: "none",
                }}
              />

              {hostelBased === 1 ? (
                <Tab
                  label="Hostel Reading"
                  value="3"
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                />
              ) : (
                <Tab
                  label="Room Reading"
                  value="2"
                  style={{
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    textTransform: "none",
                  }}
                />
              )}
            </TabList>
          </Box>
        </div>

        <TabPanel value="1">
          <>
            <EBHostelReading
              hostelBasedForm={hostelBasedForm}
              setHostelBasedForm={setHostelBasedForm}
              uniqueostel_Id={uniqueostel_Id}
              hostelName={hostelName}
              setHostelName={setHostelName}
              value={value}
              hostelBased={hostelBased}
              editeb={editeb}
              setEditEb={setEditEb}
              electricityHostel={electricityHostel}
              setLoader={setLoader}
              loading={loader}
            />

            {ebpermissionError ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // height: "100vh",
                  }}
                >
                  {/* Image */}
                  <img
                    src={Emptystate}
                    alt="Empty State"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />

                  {/* Permission Error */}
                  {ebpermissionError && (
                    <div
                      style={{
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginTop: "1rem",
                      }}
                    >
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {ebpermissionError}
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>

           {sortedData && sortedData.length > 0 && (
                     
                     
                     
                                   <div
                                     className='show-scrolls'
                                     style={{
                                       // height: "400px",
                                       // height: currentItems.length >= 6 ? "380px" : "auto",
                                       // overflowY: currentItems.length >= 6 ? "auto" : "visible",
                                       // borderRadius: "24px",
                                       // border: "1px solid #DCDCDC",
                                       // borderBottom:"none"
                                       height: currentRoomelectricity.length >= 8 || sortedData.length >= 8 ? "500px" : "auto",
                                       overflow: "auto",
                                       borderTop: "1px solid #E8E8E8",
                                       marginBottom: 20,
                                       marginTop: "20px"
                                       //  borderBottom:"1px solid #DCDCDC"
                                     }}>
                     
                                     <Table
                                       responsive="md"
                                     >
                     
                                       <thead style={{
                                         fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                         top: 0,
                                         zIndex: 1
                                       }}>
                                         <tr>
                                         <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }} > <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'desc')} style={{ cursor: "pointer" }} />
                                           </div> Name</div></th>

                                           <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500 }}>
                                             <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("HostelName", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("HostelName", 'desc')} style={{ cursor: "pointer" }} />
                                           </div>  Paying Guest</div> 
                                            </th>

                                           {hostelBased !== 1 && (
                                        <>
                                          <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500 }} >
                                             <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'desc')} style={{ cursor: "pointer" }} />
                                           </div> Floor</div> 
                                
                                           </th>

                                          <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500 }} >
                                              <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Room_Id", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Room_Id", 'desc')} style={{ cursor: "pointer" }} />
                                           </div> Room</div> 
                                
                                          </th>
                           
                                         </>
                                               )}

                     
                                           <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("start_meter", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("start_meter", 'desc')} style={{ cursor: "pointer" }} />
                                           </div> Previous </div></th>

                                           <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("end_meter", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("end_meter", 'desc')} style={{ cursor: "pointer" }} />
                                           </div> Current </div></th>
                     
                                           <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("reading_date", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("reading_date", 'desc')} style={{ cursor: "pointer" }} />
                                           </div>  Date </div></th>
                     
                                           <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("unit", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("unit", 'desc')} style={{ cursor: "pointer" }} />
                                           </div> Units</div></th>
                     
                                           <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("amount", 'asc')} style={{ cursor: "pointer" }} />
                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("amount", 'desc')} style={{ cursor: "pointer" }} />
                                           </div>  Amount </div></th>
                     
                                         </tr>
                                       </thead>
                     
                     
                                       <tbody>
                                         {   sortedData && sortedData.length > 0 && (
                                                 <>
                                                   {sortedData.map((v) => {
           
            const formattedDate = v.reading_date
              ? v.reading_date.split("-").reverse().join("-")
              : "";

            return (
              <tr key={v.id}>
                <td
                  style={{
                    border: "none",
                    display: "flex",
                    padding: "10px",
                    paddingLeft: "20px",
                  }}
                >
                  {/* <Image
                      src={imageUrl}
                      alt={v.Name || "Default Profile"}
                      roundedCircle
                      style={{
                        height: "40px",
                        width: "40px",
                        marginRight: "10px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Profile;
                      }}
                    /> */}
                  <span
                    style={{
                      fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      cursor: "pointer",
                      paddingTop: 10,
                      textAlign: "start",
                    }}
                  >
                    {v.Name}
                  </span>
                </td>


                <td
                  style={{
                    paddingTop: 20,
                    border: "none",
                    textAlign: "start",
                    fontSize: 13, 
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    marginTop: 10,
                  }}
                >
                  <span
                    style={{
                      paddingTop: "3px",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      paddingBottom: "3px",
                      borderRadius: "60px",
                      backgroundColor: "#FFEFCF",
                      textAlign: "start",
                      fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}
                  >
                    {v.HostelName}
                  </span>
                </td>
                {hostelBased !== 1 && (
                  <>
                    <td
                      style={{
                        fontSize: 13, 
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        textAlign: "start",
                        verticalAlign: "middle",
                        borderBottom: "none",
                      }}
                    >
                      {v.floor_name}
                    </td>
                    <td
                      style={{
                        fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                        textAlign: "start",
                        verticalAlign: "middle",
                        borderBottom: "none",
                      }}
                    >
                      {v.Room_Id}
                    </td>
                  </>
                )}
                <td
                  style={{
                    fontSize: 13, 
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    textAlign: "start",
                    verticalAlign: "middle",
                    borderBottom: "none",
                  }}
                >
                  {v.start_meter}
                </td>
                <td
                  style={{
                    fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    textAlign: "start",
                    verticalAlign: "middle",
                    borderBottom: "none",
                  }}
                >
                  {v.end_meter}
                </td>
                <td
                  style={{
                    paddingTop: "15px",
                    border: "none",
                    textAlign: "start",
                    fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap",
                    marginBottom: "-20px",
                  }}
                >
                  <span
                    style={{
                      paddingTop: "5px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      paddingBottom: "5px",
                      borderRadius: "60px",
                      backgroundColor: "#EBEBEB",
                      textAlign: "start",
                      fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      display: "inline-block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formattedDate}
                  </span>
                </td>
                <td
                  style={{
                    fontSize: 13, 
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    textAlign: "start",
                    verticalAlign: "middle",
                    borderBottom: "none",
                  }}
                >
                  {v.unit}
                </td>
                <td
                  style={{
                    fontSize: 13, 
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    textAlign: "start",
                    verticalAlign: "middle",
                    borderBottom: "none",
                  }}
                >
                  {v.amount}
                </td>
              </tr>
            );
        
                           
                     })}
                                                 </>
                                               
                     
                                             )
                                         }
                                       </tbody>
                     
                     
                                     </Table>
                                   </div>
                     
                     
                                 )}


                

                {customerLoader && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: "200px",
                      display: "flex",
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

                {!customerLoader &&
                  !loader &&
                  currentRoomelectricity.length === 0 && (
                    <div style={{ marginTop: 40 }}>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={emptyimg}
                          width={240}
                          height={240}
                          alt="emptystate"
                        />
                      </div>
                      <div
                        className="pb-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          fontSize: 20,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        No customer readings
                      </div>
                      <div
                        className="pb-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        There are no customer readings available.
                      </div>
                    </div>
                  )}

                {electricityFilterddata?.length >= 5 && (
                  <nav
                  // className="pagination-container"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      padding: "10px",
                      position: "fixed",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
                    }}
                  >
                    {/* Dropdown for Items Per Page */}
                    <div>
                      <select
                        value={electricityrowsPerPage}
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
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    {/* Pagination Controls */}
                    <ul
                      style={{
                        display: "flex",
                        alignItems: "center",
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {/* Previous Button */}
                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color:
                              electricitycurrentPage === 1 ? "#ccc" : "#1E45E1",
                            cursor:
                              electricitycurrentPage === 1
                                ? "not-allowed"
                                : "pointer",
                            borderRadius: "50%",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() =>
                            handlePageChange(electricitycurrentPage - 1)
                          }
                          disabled={electricitycurrentPage === 1}
                        >
                          <ArrowLeft2
                            size="16"
                            color={
                              electricitycurrentPage === 1 ? "#ccc" : "#1E45E1"
                            }
                          />
                        </button>
                      </li>

                      {/* Current Page Indicator */}
                      <li
                        style={{
                          margin: "0 10px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {electricitycurrentPage} of {totalPagesinvoice}
                      </li>

                      {/* Next Button */}
                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color:
                              electricitycurrentPage === totalPagesinvoice
                                ? "#ccc"
                                : "#1E45E1",
                            cursor:
                              electricitycurrentPage === totalPagesinvoice
                                ? "not-allowed"
                                : "pointer",
                            borderRadius: "50%",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() =>
                            handlePageChange(electricitycurrentPage + 1)
                          }
                          disabled={
                            electricitycurrentPage === totalPagesinvoice
                          }
                        >
                          <ArrowRight2
                            size="16"
                            color={
                              electricitycurrentPage === totalPagesinvoice
                                ? "#ccc"
                                : "#1E45E1"
                            }
                          />
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </>
        </TabPanel>
        <Modal
          show={addEbDetail}
          onHide={() => handleClose()}
          backdrop="static"
          centered
        >
          <Modal.Header style={{ marginBottom: "10px", position: "relative" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Add a Reading
            </div>
            {/* <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleClose}
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
                width: "25px",
                height: "25px",
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
            </button> */}
            <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer'}}/>
          </Modal.Header>
          <Modal.Body style={{ marginTop: "-10px" }}>
            <div className="row ">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Floor{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                {/* <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={Floor}
                  onChange={(e) => handleFloor(e)}
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
                  <option
                    style={{ fontSize: 14, fontWeight: 600 }}
                    selected
                    value=""
                  >
                    Select Floor
                  </option>
                  {state?.UsersList?.hosteldetailslist &&
                    state?.UsersList?.hosteldetailslist.map((item) => (
                      <>
                        <option key={item.floor_id} value={item.floor_id}>
                          {item.floor_name}
                        </option>
                      </>
                    ))}
                </Form.Select> */}

                <Select
                  options={
                    state?.UsersList?.hosteldetailslist?.map((item) => ({
                      value: item.floor_id,
                      label: item.floor_name,
                    })) || []
                  }
                  onChange={handleFloor}
                  value={
                    Floor
                      ? state?.UsersList?.hosteldetailslist?.find(
                          (item) => item.floor_id === Floor
                        ) && {
                          value: Floor,
                          label: state?.UsersList?.hosteldetailslist?.find(
                            (item) => item.floor_id === Floor
                          )?.floor_name,
                        }
                      : null
                  }
                  placeholder="Select Floor"
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  noOptionsMessage={() => "No floors available"}
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
                    }),
                    menuList: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      maxHeight: "120px",
                      padding: 0,
                      scrollbarWidth: "thin",
                      overflowY: "auto",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#555",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      cursor:"pointer"
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

                {floorError && (
                  <div>
                    <MdError
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginBottom: "2px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      {floorError}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Room{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                {/* <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={Rooms}
                  onChange={(e) => handleRoom(e)}
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
                  <option>Select a Room</option>
                  {state.UsersList?.roomdetails &&
                    state.UsersList?.roomdetails.map((item) => (
                      <>
                        <option key={item.Room_Id} value={item.Room_Id}>
                          {item.Room_Name}
                        </option>
                      </>
                    ))}
                </Form.Select> */}

                <Select
                  options={
                    state?.UsersList?.roomdetails?.map((item) => ({
                      value: item.Room_Id,
                      label: item.Room_Name,
                    })) || []
                  }
                  onChange={handleRoom}
                  value={
                    Rooms
                      ? state?.UsersList?.roomdetails?.find(
                          (item) => item.Room_Id === Rooms
                        ) && {
                          value: Rooms,
                          label: state?.UsersList?.roomdetails?.find(
                            (item) => item.Room_Id === Rooms
                          )?.Room_Name,
                        }
                      : null
                  }
                  placeholder="Select a Room"
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  noOptionsMessage={() => "No rooms available"}
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
                    }),
                    menuList: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      maxHeight: "120px",
                      padding: 0,
                      scrollbarWidth: "thin",
                      overflowY: "auto",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#555",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      cursor:"pointer"
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

                {roomError && (
                  <div>
                    <MdError
                      style={{
                        color: "red",
                        fontSize: "13px",
                        marginBottom: "2px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      {roomError}
                    </span>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group>
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Reading{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="6542310"
                    value={endmeter}
                    onChange={(e) => handleendmeter(e)}
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
                {endMeterError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ color: "red", fontSize: "13px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      {endMeterError}
                    </span>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group controlId="purchaseDate">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Date{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                 

                  <div
                    className="datepicker-wrapper"
                    style={{ position: "relative", width: "100%" }}
                  >
                    <DatePicker
                      style={{ width: "100%", height: 48,cursor:"pointer" }}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={selectedDate ? dayjs(selectedDate) : null}
                      onChange={(date) => handleDateChange(date)}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".datepicker-wrapper")
                      }
                      dropdownClassName="custom-datepicker-popup"
                    />
                  </div>
                </Form.Group>
                {dateErrorMesg && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ color: "red", fontSize: "13px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5,
                      }}
                    >
                      {dateErrorMesg}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          {dateError && (
            <div
              className="d-flex justify-content-center align-items-center mt-2"
              style={{ color: "red" }}
            >
              <MdError style={{ fontSize: "14px", marginRight: "6px" }} />
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {dateError}
              </span>
            </div>
          )}
          <Modal.Footer
            className="d-flex justify-content-center"
            style={{ borderTop: "none" }}
          >
            <Button
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                height: 50,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Montserrat, sans-serif",
                marginTop: 10,
              }}
              onClick={handleSaveEbBill}
            >
              Add Reading
            </Button>
          </Modal.Footer>
        </Modal>
        <TabPanel value="2">
          <EBRoomReading
            handleAddEbDetails={handleAddEbDetails}
            setaddEbDetail={setaddEbDetail}
            ebAddPermission={ebAddPermission}
            ebEditPermission={ebEditPermission}
            ebDeletePermission={ebDeletePermission}
            ebpermissionError={ebpermissionError}
            uniqueostel_Id={uniqueostel_Id}
            setUniqostel_Id={setUniqostel_Id}
            selectedHostel={selectedHostel}
            setLoader={setLoader}
            electricityFilterd={electricityFilterd}
            loading={loader}
            value={value}
          />
        </TabPanel>

        <TabPanel value="3">
          <EBHostelReading
            hostelBasedForm={hostelBasedForm}
            setHostelBasedForm={setHostelBasedForm}
            uniqueostel_Id={uniqueostel_Id}
            hostelName={hostelName}
            setHostelName={setHostelName}
            value={value}
            handleHostelForm={handleHostelForm}
            hostelBased={hostelBased}
            editeb={editeb}
            setEditEb={setEditEb}
            electricityHostel={electricityHostel}
            loading={loader}
            setLoader={setLoader}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

EB_Hostel.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};
export default EB_Hostel;
