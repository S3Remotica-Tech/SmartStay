import React, { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Logo from "../Assets/Images/Logo-Icon.png";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Roombased from "./EB_RoomBased";
import CryptoJS from "crypto-js";
import Filter from "../Assets/Images/New_images/Group 13.png";
import Button from "react-bootstrap/Button";
import "./EB_Hostel.css";
import dottt from "../Assets/Images/Group 14.png";
import { Dropdown, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import Calendars from "../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Swal from "sweetalert2";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import down from "../Assets/Images/New_images/down.png";
import squre from "../Assets/Images/New_images/minus-square.png";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import EBRoomReading from "./EBRoomReading";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import excelimg from "../Assets/Images/New_images/excel (5).png";

import {
  Autobrightness,
  Call,
  Sms,
  House,
  Buildings,
  ArrowLeft2,
  ArrowRight2,
} from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdError } from "react-icons/md";
import { set } from "date-fns";

function EB_Hostel(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [loginid, setLoginid] = useState();
  const loginId = localStorage.getItem("loginId");
  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  const [isvisible, setISVisible] = useState(false);
  const [backbtn, setBackbtn] = useState(true);
  const [hosteldetails, setHosteldetails] = useState("");
  const [transactionshow, settransactionshow] = useState(true);
  const [ebShow, setebshow] = useState(false);
  const [addEbDetail, setaddEbDetail] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [roomsByFloor, setRoomsByFloor] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startmeterdata, setStartmeterData] = useState([]);
  console.log("startmeterdata", startmeterdata);
  const [startmeter, setStartmeter] = useState([]);
  const [endmeter, setEndmeter] = useState("");
  const [amount, setAmount] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
  console.log("unitAmount", unitAmount);
  const [totmetReading, settotmetReading] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState("");
  const [ebErrorunit, setEbErrorunit] = useState("");
  const [buttonShow, setbuttonShow] = useState(false);
  const [value, setValue] = React.useState("1");
  const [ebrolePermission, setEbRolePermission] = useState("");
  const [ebpermissionError, setEbPermissionError] = useState("");
  const [ebAddPermission, setEbAddPermission] = useState("");
  const [ebDeletePermission, setEbDeletePermission] = useState("");
  const [ebEditPermission, setEbEditPermission] = useState("");
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [uniqueostel_Id,setUniqostel_Id]=useState('')
  console.log("uniqueostel_Id",props.allPageHostel_Id)
  useEffect(() => {
    console.log("uniqueHostelId:", props.allPageHostel_Id);
    setUniqostel_Id(props.allPageHostel_Id);
  }, [props.allPageHostel_Id]);


  useEffect(() => {
    console.log(
      "File URL in state:",
      state.UsersList?.exportEbDetails?.response?.fileUrl
    );
    if (state.UsersList?.exportEbDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportEbDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportEbDetails?.response?.fileUrl]);

  console.log("excelDownload", excelDownload);
  const handleEbExcel = () => {
    dispatch({
      type: "EXPORTEBSDETAILS",
      payload: { type: "customer_readings" },
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
    console.log("===ebrolePermission[0]", ebrolePermission);
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_view == 1
    ) {
      setEbPermissionError("");
    } else {
      setEbPermissionError("Permission Denied");
    }
  }, [ebrolePermission]);

  useEffect(() => {
    console.log("===ebrolePermission[0]", ebrolePermission);
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_create == 1
    ) {
      setEbAddPermission("");
    } else {
      setEbAddPermission("Permission Denied");
    }
  }, [ebrolePermission]);

  useEffect(() => {
    console.log("===ebrolePermission[0]", ebrolePermission);
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_delete == 1
    ) {
      setEbDeletePermission("");
    } else {
      setEbDeletePermission("Permission Denied");
    }
  }, [ebrolePermission]);
  useEffect(() => {
    console.log("===ebrolePermission[0]", ebrolePermission);
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_edit == 1
    ) {
      setEbEditPermission("");
    } else {
      setEbEditPermission("Permission Denied");
    }
  }, [ebrolePermission]);
  // const handleChanges = (event, newValue) => {
  //   setValue(newValue);

  // };
  const handleChanges = (event, newValue) => {
    setValue(newValue);
    setaddEbDetail(false); // Reset the addEbDetail state when switching tabs
  };

  console.log("selectedDate", selectedDate);
  const calendarRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "EBLIST" });
    dispatch({ type: "EBSTARTMETERLIST" });
    dispatch({ type: "CUSTOMEREBLIST" });
  }, []);

  useEffect(() => {
    const filteredstartmeter = state.PgList?.EB_startmeterlist.filter((item) =>
      item.Floor == 0 && item.Room == 0
        ? item.hostel_Id == selectedHostel
        : item?.hostel_Id == selectedHostel &&
          item.Floor == Floor &&
          item.Room == Rooms
    );

    const lastItem =
      filteredstartmeter?.length > 0
        ? filteredstartmeter[filteredstartmeter.length - 1]
        : null;
    setStartmeter(lastItem);
  }, [selectedHostel, state.PgList?.EB_startmeterlist, Floor, Rooms]);
console.log("state.PgList?.EB_startmeterlist",state.PgList?.EB_startmeterlist)
  const options = {
    dateFormat: "Y/m/d",
    // defaultDate: selectedDate || new Date(),
    maxDate: new Date(),
    minDate: null,
  };

  useEffect(() => {
    setEbErrorunit(state?.PgList?.ebError);
  }, [state?.PgList?.ebError]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  // const handleHostelChange = (e) => {
  //   setSelectedHostel(e.target.value);
  //   setFloor("");
  //   setRooms("");
  //   setHostelIdError("");
  //   setEbErrorunit("");
  //   dispatch({ type: "CLEAR_EB_ERROR" });
  // };
  useEffect(() => {
    console.log("setHostelId..?", uniqueostel_Id);
  
    // Only set hostelId if it's different from the current state
    setSelectedHostel((prev) => (prev !== uniqueostel_Id ? uniqueostel_Id : prev));
  }, [uniqueostel_Id])
  console.log("setHostelId..?",uniqueostel_Id)
  // useEffect(()=>{
  //   // const selectedHostel=  state.UsersList.hostelList &&
  //   // state.UsersList.hostelList.filter((item) => item.id == props.uniqueostel_Id);
  //   // setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
  //   setSelectedHostel(props.allPageHostel_Id);
  // },[props.allPageHostel_Id])
  const handleFloor = (e) => {
    setFloor(e.target.value);
    const filteredRooms = state.UsersList?.hosteldetailslist.filter(
      (room) => room.floor_id == e.target.value
    );
    console.log("filteredRooms", filteredRooms);
    setRoomsByFloor(filteredRooms);
    setRooms("");
    setfloorError("");
    setEbErrorunit("");
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  const handleRoom = (e) => {
    setRooms(e.target.value);
    setRoomError("");
    setEbErrorunit("");
    dispatch({ type: "CLEAR_EB_ERROR" });
  };
  const [startmeterValue, setStartmeterValue] = useState("");

  // useEffect(() => {
  //   if (startmeter && startmeter.end_Meter_Reading) {
  //     setStartmeterValue(startmeter.end_Meter_Reading);
  //     setstartMeterError("");
  //   } else {
  //     setStartmeterValue("");
  //   }
  // }, [startmeter]);

  useEffect(() => {
    if (selectedHostel && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: selectedHostel, floor_Id: Floor },
      });
    }
  }, [Floor]);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: selectedHostel },
    });
  }, [selectedHostel]);

  useEffect(() => {
    dispatch({ type: "EB-BILLING-UNIT-LIST" });
  }, []);
  useEffect(() => {
    dispatch({ type: "TRANSACTIONHISTORY" });
  }, []);

  const handleEbbill = (hostel) => {
    setISVisible(true);
    setHosteldetails(hostel);
  };

  const handleback = (isShow) => {
    setBackbtn(isShow);
    setISVisible(false);
  };

  const handleAddEbDetails = () => {
    setaddEbDetail(true);
    console.log("addEbDetail", addEbDetail);
  };

  const handleTransactionsShow = () => {
    settransactionshow(true);
    setebshow(false);
  };

  const handleendmeter = (e) => {
    setEndmeter(e.target.value);
    setendMeterError("");
    setEbErrorunit("");
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  const handleamount = (e) => {
    setAmount(e.target.value);
  };
  const handleebViewShow = () => {
    setebshow(true);
    settransactionshow(false);
  };
  useEffect(() => {
    const FilterEbAmount = state.Settings.EBBillingUnitlist.eb_settings?.filter(
      (item) => item.hostel_id == selectedHostel
    );
    console.log("FilteredEBAmount:", FilterEbAmount);
    setUnitAmount(FilterEbAmount);
    if (Array.isArray(FilterEbAmount) && FilterEbAmount.length > 0) {
      console.log("unitAmount..123?", FilterEbAmount[0]?.amount);
      setUnitAmount(FilterEbAmount[0]?.amount);
    } else {
      console.log("unitAmount is not a valid array or is empty.");
    }
  }, [state.Settings.EBBillingUnitlist.eb_settings, selectedHostel]);

  const totalMeterReading =
    endmeter -
    (startmeter && startmeter.end_Meter_Reading
      ? parseFloat(startmeter.end_Meter_Reading)
      : 0);
  console.log("totalMeterReading", totalMeterReading);

  const totalAmountRead =
    (unitAmount ? parseFloat(unitAmount) : 0) * (totalMeterReading || 0);
  console.log("totalAmountRead", totalAmountRead);

  useEffect(() => {
    if (state.PgList.AddEBstatusCode === 200) {
      dispatch({ type: "EBSTARTMETERLIST" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB" });
      }, 200);
    }
  }, [state.PgList.AddEBstatusCode]);
  const [hostelIdError, setHostelIdError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [endMeterError, setendMeterError] = useState("");

  const [dateError, setDateError] = useState("");

  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null ||
      value === "0";
    if (isValueEmpty) {
      switch (fieldName) {
        case "Hostel ID":
          setHostelIdError("Hostel is required");
          break;
        case "Floor":
          setfloorError("Floor is required");
          break;
        case "Rooms":
          setRoomError("Rooms is required");
          break;
        case "Bed":
          setBedError("Bed is required");
          break;
        case "selectedDate":
          setDateError("Date is required");
          break;
        case "endmeter":
          setendMeterError("reading is required");
          break;
        default:
          break;
      }
      return false;
    }

    // Clear the error if value is valid
    switch (fieldName) {
      case "Hostel ID":
        setHostelIdError("");
        break;
      case "Floor":
        setfloorError("");
        break;
      case "Rooms":
        setRoomError("");
        break;
      case "Bed":
        setBedError("");
        break;
      case "selectedDate":
        setDateError("");
        break;
      case "endmeter":
        setendMeterError("");
        break;
      default:
        break;
    }

    return true;
  };

  // const validateAssignField = (value, fieldName) => {

  //   const isValueEmpty =
  //     (typeof value === "string" && value.trim() === "") ||
  //     value === "undefined" ||
  //     value === "null" ||
  //     value === "0";

  //   if (isValueEmpty) {
  //     switch (fieldName) {
  //       case "Hostel ID":
  //         setHostelIdError("Hostel is required");
  //         break;
  //       case "Floor":
  //         setfloorError("Floor is required");
  //         break;
  //       case "Rooms":
  //         setRoomError("Rooms is required");
  //         break;
  //       case "Bed":
  //         setBedError("Bed is required");
  //         break;
  //       case "selectedDate":
  //         setDateError("date is required");
  //         break;
  //       case "endmeter":
  //         setendMeterError("endmeter is required");
  //         break;
  //       default:
  //         break;
  //     }
  //     return false;
  //   }

  //   // Clear errors if the value is valid
  //   switch (fieldName) {
  //     case "Hostel ID":
  //       setHostelIdError("");
  //       break;
  //     case "Floor":
  //       setfloorError("");
  //       break;
  //     case "Rooms":
  //       setRoomError("");
  //       break;
  //     case "Bed":
  //       setBedError("");
  //       break;
  //     case "selectedDate":
  //       setDateError("");
  //       break;
  //     case "endmeter":
  //       setendMeterError("");
  //       break;
  //       default:
  //         break;
  //   }

  //   return true;
  // };

  const handleDate = (selectedDates) => {
    setSelectedDate(selectedDates[0]);
    setDateError("");
    console.log("selectedDates", selectedDates);
  };

  const handleClose = () => {
    setaddEbDetail(false);
    setHostelIdError("");
    setfloorError("");
    setRoomError("");
    setendMeterError("");
    setEbErrorunit("");
    setStartmeter("");
    setEndmeter("");
    // setSelectedHostel("");
    setRooms("");
    setFloor("");
    setSelectedDate("");
    setDateError("");
  };

  const handleSaveEbBill = () => {
    const isHostelValid = validateAssignField(selectedHostel, "Hostel ID");
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");

    const isEndMeterValid = validateAssignField(endmeter, "endmeter");
    const isDatevalid = validateAssignField(selectedDate, "selectedDate");

    if (selectedHostel === "Select PG" || !isHostelValid) {
      setHostelIdError("Please select a valid Hostel");
      return;
    } else {
      setHostelIdError("");
    }

    if (Floor === "Select Floor" || !isFloorValid) {
      setfloorError("Please select a valid Floor");
      return;
    } else {
      setfloorError("");
    }

    // Validate Room field
    if (Rooms === "Select Room" || !isRoomValid) {
      setRoomError("Please select a valid Room");
      return;
    } else {
      setRoomError("");
    }

    if (
      !isHostelValid ||
      !isEndMeterValid ||
      (!isFloorValid && !isRoomValid && !isDatevalid)
    ) {
      return;
    }
    console.log("selectedDate", selectedDate);
    if (selectedHostel && Floor && Rooms && endmeter && selectedDate) {
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
    // else if (selectedHostel && endmeter) {
    //   dispatch({
    //     type: "CREATEEB",
    //     payload: {
    //       Hostel_Id: selectedHostel,
    //       end_Meter_Reading: endmeter,

    //       // EbAmount: totalAmountRead,
    //       date: selectedDate,
    //     },
    //   });
    // }

    // Reset fields after successful save
  };
  useEffect(() => {
    if (state.PgList?.AddEBstatusCode === 200) {
      handleClose();
      dispatch({ type: "CUSTOMEREBLIST" });
    }
  }, [state.PgList?.AddEBstatusCode]);

  const electricityrowsPerPage = 5;
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const [electricityFilterddata, setelectricityFilterddata] = useState([]);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;
  const currentRoomelectricity = electricityFilterddata?.slice(
    indexOfFirstRowelectricity,
    indexOfLastRowelectricity
  );

  const handleElectricityPageChange = (InvoicepageNumber) => {
    setelectricitycurrentPage(InvoicepageNumber);
  };

  const totalPagesinvoice = Math.ceil(
    electricityFilterddata?.length / electricityrowsPerPage
  );

  const renderPageNumberselectricity = () => {
    const pageNumberselectricity = [];
    let startPageelectricity = electricitycurrentPage - 1;
    let endPageelectricity = electricitycurrentPage + 1;

    if (electricitycurrentPage === 1) {
      startPageelectricity = 1;
      endPageelectricity = 3;
    }

    if (electricitycurrentPage === totalPagesinvoice) {
      startPageelectricity = totalPagesinvoice - 2;
      endPageelectricity = totalPagesinvoice;
    }

    if (electricitycurrentPage === 2) {
      startPageelectricity = 1;
      endPageelectricity = 3;
    }

    if (electricitycurrentPage === totalPagesinvoice - 1) {
      startPageelectricity = totalPagesinvoice - 2;
      endPageelectricity = totalPagesinvoice;
    }

    for (let i = startPageelectricity; i <= endPageelectricity; i++) {
      if (i > 0 && i <= totalPagesinvoice) {
        pageNumberselectricity.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === electricitycurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === electricitycurrentPage ? "transparent" : "transparent",
                border:
                  i === electricitycurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleElectricityPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumberselectricity;
  };

  useEffect(() => {
    setelectricityFilterddata(state.PgList?.EB_customerTable?.eb_details);
  }, [state.PgList?.EB_customerTable?.eb_details]);

  const transactionrowsPerPage = 10;
  const [tranactioncurrentPage, settranactioncurrentPage] = useState(1);
  const [TransactionFilterddata, seteleTransactionFilterddata] = useState([]);

  const indexOfLastRowtransaction =
    tranactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowtranaction =
    indexOfLastRowtransaction - transactionrowsPerPage;
  const currentRowtransaction = TransactionFilterddata?.slice(
    indexOfFirstRowtranaction,
    indexOfLastRowtransaction
  );
  const totalPagestransaction = Math.ceil(
    TransactionFilterddata?.length / transactionrowsPerPage
  );

  const handleTransactionPageChange = (transpageNumber) => {
    settranactioncurrentPage(transpageNumber);
  };

  const renderPageNumberstransaction = () => {
    const pageNumberstransaction = [];
    let startPagetransaction = tranactioncurrentPage - 1;
    let endPagetransaction = tranactioncurrentPage + 1;

    if (tranactioncurrentPage === 1) {
      startPagetransaction = 1;
      endPagetransaction = 3;
    }

    if (tranactioncurrentPage === totalPagestransaction) {
      startPagetransaction = totalPagestransaction - 2;
      endPagetransaction = totalPagestransaction;
    }

    if (tranactioncurrentPage === 2) {
      startPagetransaction = 1;
      endPagetransaction = 3;
    }

    if (tranactioncurrentPage === totalPagestransaction - 1) {
      startPagetransaction = totalPagestransaction - 2;
      endPagetransaction = totalPagestransaction;
    }

    for (let i = startPagetransaction; i <= endPagetransaction; i++) {
      if (i > 0 && i <= totalPagestransaction) {
        pageNumberstransaction.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === tranactioncurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === tranactioncurrentPage ? "transparent" : "transparent",
                border: i === tranactioncurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleTransactionPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumberstransaction;
  };

  useEffect(() => {
    seteleTransactionFilterddata(state.ExpenseList.transactionHistory);
  }, [state.ExpenseList.transactionHistory]);
  const [activeTab, setActiveTab] = useState(1);

  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          disabled={edit}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };
  const handleDateChange = (date) => {
    setDateError("");
    setEbErrorunit("");
    setSelectedDate(date);
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  return (
    <div style={{ paddingLeft: 15, marginTop: 8 }}>
      <div className="d-flex justify-content-between align-items-center ms-3 mb-3">
        <div style={{ padding: 15 }}>
          <label
            style={{
              fontSize: 18,
              color: "#000000",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Electricity
          </label>
        </div>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ paddingRight: 25 }}
        >
          {/* <div className="me-3">
            <Image
              src={Filter}
              roundedCircle
              style={{ height: "30px", width: "30px" }}
            />
          </div> */}
          <div style={{ paddingRight: "10px" }}>
            {value === "1" && (
              <img
                src={excelimg}
                width={38}
                height={38}
                onClick={handleEbExcel}
              />
            )}
          </div>

          <div>
            <Button
              style={{
                fontFamily: "Montserrat",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 8,
                width: 140,
                padding: "14px, 22px, 14px, 22px",
                border: "none",
                cursor: "pointer",
              }}
              disabled={ebAddPermission}
              onClick={handleAddEbDetails}
            >
              + Add Reading
            </Button>
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
              style={{ marginLeft: "20px", marginTop: "-30px" }}
              className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
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
            </TabList>
          </Box>
        </div>
        <TabPanel value="1">
          <>
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
                      <MdError size={20} />
                      <span>{ebpermissionError}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  {currentRoomelectricity?.length > 0 ? (
                    <Table
                      responsive="md"
                      className="Table_Design"
                      style={{
                        height: "auto",
                        overflow: "visible",
                        tableLayout: "auto",
                        borderRadius: "24px",
                        border: "1px solid #DCDCDC",
                      }}
                    >
                      <thead
                        style={{
                          color: "gray",
                          fontSize: "11px",
                          backgroundColor: "#E7F1FF",
                        }}
                      >
                        <tr style={{ height: "30px" }}>
                          <th
                            style={{
                              textAlign: "center",
                              fontFamily: "Gilroy",
                              color: "rgba(34, 34, 34, 1)",
                              fontSize: 14,
                              fontWeight: 600,
                              borderTopLeftRadius: 24,
                            }}
                          >
                            <img src={squre} height={20} width={20} />
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Name
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Paying Guest
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Floor
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Room
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Previous
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Current
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Date
                          </th>
                          <th
                            style={{
                              color: "#939393",
                              fontWeight: 500,
                              fontSize: "14px",
                              fontFamily: "Gilroy",
                              paddingTop: "10px",
                              paddingBottom: "10px",
                              textAlign: "center",
                            }}
                          >
                            Units
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              fontFamily: "Gilroy",
                              color: "#939393",
                              fontSize: 14,
                              fontWeight: 600,
                            }}
                          >
                            Amount
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              fontFamily: "Gilroy",
                              color: "rgba(34, 34, 34, 1)",
                              fontSize: 14,
                              fontWeight: 600,
                              borderTopRightRadius: 24,
                            }}
                          >
                            {" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "12px" }}>
                        {currentRoomelectricity.map((v) => {
                          const imageUrl = v.profile || Profile;
                          let Dated = new Date(v.createAt);
                          let day = Dated.getDate();
                          let month = Dated.getMonth() + 1;
                          let year = Dated.getFullYear();
                          let formattedDate = `${day}/${month}/${year}`;

                          return (
                            <tr key={v.id}>
                              <td
                                style={{
                                  padding: "10px",
                                  border: "none",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                }}
                              >
                                <img src={squre} height={20} width={20} />
                              </td>
                              <td
                                style={{
                                  border: "none",
                                  display: "flex",
                                  padding: "10px",
                                }}
                              >
                                <Image
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
                                />
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    cursor: "pointer",
                                    paddingTop: 10,
                                  }}
                                >
                                  {v.Name}
                                </span>
                              </td>

                              {/* <td
              style={{
                fontSize: "16px",
                fontWeight: 500,
                fontFamily: "Gilroy",
                textAlign: "center",
                verticalAlign: "middle",
                borderBottom: "none",
              }}
            >
              {v.HostelName}
            </td> */}
                              <td
                                style={{
                                  paddingTop: 15,
                                  border: "none",
                                  textAlign: "center",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  marginTop: 10,
                                }}
                              >
                                <span
                                  style={{
                                    paddingTop: "3px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingBottom: "3px",
                                    borderRadius: "60px",
                                    backgroundColor: "#FFEFCF",
                                    textAlign: "start",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  {v.HostelName}
                                </span>
                              </td>
                              <td
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  borderBottom: "none",
                                }}
                              >
                                {v.floor_name}
                              </td>
                              <td
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  borderBottom: "none",
                                }}
                              >
                                {v.Room_Id}
                              </td>
                              <td
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  borderBottom: "none",
                                }}
                              >
                                {v.start_meter}
                              </td>
                              <td
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  borderBottom: "none",
                                }}
                              >
                                {v.end_meter}
                              </td>
                              <td
                                style={{
                                  // textAlign: "center",
                                  // verticalAlign: "middle",
                                  // borderBottom: "none",
                                  padding: "10px",
                                  border: "none",
                                  textAlign: "center",
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  fontFamily: "Gilroy",
                                  verticalAlign: "middle",
                                  whiteSpace: "nowrap",
                                  marginBottom: "-20px",
                                }}
                              >
                                <span
                                  style={{
                                    // backgroundColor: "#EBEBEB",
                                    // paddingTop: "5px",
                                    // paddingLeft: "16px",
                                    // paddingRight: "16px",
                                    // paddingBottom: "5px",
                                    // borderRadius: "60px",
                                    // fontSize: "14px",
                                    // fontWeight: 500,
                                    // fontFamily: "Gilroy",
                                    paddingTop: "5px",
                                    paddingLeft: "16px",
                                    paddingRight: "16px",
                                    paddingBottom: "5px",
                                    borderRadius: "60px",
                                    backgroundColor: "#EBEBEB",
                                    textAlign: "start",
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    display: "inline-block",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {v.reading_date}
                                </span>
                              </td>
                              <td
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  borderBottom: "none",
                                }}
                              >
                                {v.unit}
                              </td>
                              <td
                                style={{
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  textAlign: "center",
                                  verticalAlign: "middle",
                                  borderBottom: "none",
                                }}
                              >
                                {v.amount}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  ) : (
                    <div>
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
                        No customer readings{" "}
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
                        There are no customer readings available.{" "}
                      </div>

                      <div style={{ textAlign: "center" }}>
                        <Button
                          disabled={ebAddPermission}
                          onClick={handleAddEbDetails}
                          style={{
                            fontSize: 16,
                            backgroundColor: "#1E45E1",
                            color: "white",
                            height: 59,
                            fontWeight: 600,
                            borderRadius: 12,
                            width: 185,
                            padding: "18px, 20px, 18px, 20px",
                            fontFamily: "Gilroy",
                          }}
                        >
                          + Add Reading
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {currentRoomelectricity?.length > 0 && (
                  <nav>
                    <ul
                      style={{
                        display: "flex",
                        alignItems: "center",
                        listStyleType: "none",
                        padding: 0,
                        justifyContent: "end",
                      }}
                    >
                      <li style={{ margin: "0 5px" }}>
                        <button
                          style={{
                            padding: "5px 10px",
                            textDecoration: "none",
                            color:
                              electricitycurrentPage === 1 ? "#ccc" : "#007bff",
                            cursor:
                              electricitycurrentPage === 1
                                ? "not-allowed"
                                : "pointer",
                            borderRadius: "5px",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() =>
                            handleElectricityPageChange(
                              electricitycurrentPage - 1
                            )
                          }
                          disabled={electricitycurrentPage === 1}
                        >
                          {" "}
                          <ArrowLeft2 size="16" color="#1E45E1" />
                        </button>
                      </li>
                      {electricitycurrentPage > 3 && (
                        <li style={{ margin: "0 5px" }}>
                          <button
                            style={{
                              padding: "5px 10px",
                              textDecoration: "none",
                              color: "white",
                              cursor: "pointer",
                              borderRadius: "5px",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() => handleElectricityPageChange(1)}
                          >
                            1
                          </button>
                        </li>
                      )}
                      {electricitycurrentPage > 3 && <span>...</span>}
                      {renderPageNumberselectricity()}
                      {electricitycurrentPage < totalPagesinvoice - 2 && (
                        <span>...</span>
                      )}
                      {electricitycurrentPage < totalPagesinvoice - 2 && (
                        <li style={{ margin: "0 5px" }}>
                          <button
                            style={{
                              padding: "5px 10px",
                              textDecoration: "none",

                              cursor: "pointer",
                              borderRadius: "5px",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() =>
                              handleElectricityPageChange(totalPagesinvoice)
                            }
                          >
                            {totalPagesinvoice}
                          </button>
                        </li>
                      )}
                      <li style={{ margin: "0 5px" }}>
                        <button
                          style={{
                            padding: "5px 10px",
                            textDecoration: "none",
                            color:
                              electricitycurrentPage === electricitycurrentPage
                                ? "#ccc"
                                : "#007bff",
                            cursor:
                              electricitycurrentPage === electricitycurrentPage
                                ? "not-allowed"
                                : "pointer",
                            borderRadius: "5px",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() =>
                            handleElectricityPageChange(
                              electricitycurrentPage + 1
                            )
                          }
                          disabled={
                            electricitycurrentPage === totalPagesinvoice
                          }
                        >
                          <ArrowRight2 size="16" color="#1E45E1" />
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
          {/* <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header> */}

          <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Add a Reading
            </div>
            <button
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
          <Modal.Body>
            <div className="row ">
              {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {ebErrorunit && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {ebErrorunit}
                  </div>
                )}
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Paying Guest
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={selectedHostel}
                  onChange={(e) => handleHostelChange(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    lineHeight: "18.83px",
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
                    Select PG
                  </option>
                  {state.UsersList?.hostelList &&
                    state.UsersList?.hostelList.map((item) => (
                      <>
                        <option key={item.id} value={item.id}>
                          {item.Name}
                        </option>
                      </>
                    ))}
                </Form.Select>
                {hostelIdError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {hostelIdError}
                  </div>
                )}
                {unitAmount &&
                  unitAmount?.length === 0 &&
                  selectedHostel != "" && (
                    <>
                      <label
                        className="pb-1"
                        style={{
                          fontSize: 12,
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        Please add a 'ebUnitAmount in Settings'
                      </label>
                    </>
                  )}
              </div> */}

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
                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  disabled={
                    unitAmount &&
                    unitAmount?.length === 0 &&
                    selectedHostel != ""
                  }
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
                </Form.Select>
                {floorError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {floorError}
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
                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  disabled={
                    unitAmount &&
                    unitAmount?.length === 0 &&
                    selectedHostel != ""
                  }
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
                </Form.Select>
                {roomError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {roomError}
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
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
                    <MdError />
                    {endMeterError}
                  </div>
                )}
              </div>

              {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222",
                    fontFamily: "'Gilroy'",
                    fontWeight: 500,
                  }}
                >
                  Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <div style={{ position: "relative" }}>
                  <label
                    htmlFor="date-input"
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: 8,
                      padding: 11,
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      color: "#222222",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between", // Ensure space between text and icon
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (calendarRef.current) {
                        calendarRef.current.flatpickr.open();
                      }
                    }}
                  >
                    {selectedDate
                      ? selectedDate.toLocaleDateString("en-GB")
                      : "YYYY/MM/DD"}
                    <img
                      src={Calendars}
                      style={{ height: 24, width: 24, marginLeft: 10 }}
                      alt="Calendar"
                    />
                  </label>
                  <Flatpickr
                    ref={calendarRef}
                    options={options}
                    value={selectedDate}
                    onChange={(selectedDates) => handleDate(selectedDates)}
                    style={{
                      padding: 10,
                      fontSize: 16,
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid #D9D9D9",
                      position: "absolute",
                      top: 100,
                      left: 100,
                      zIndex: 1000,
                      display: "none",
                    }}
                  />
                </div>
                {dateError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {dateError}
                  </div>
                )}
              </div> */}
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group className="mb-2" controlId="purchaseDate">
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
                  <div style={{ position: "relative", width: "100%" }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={null}
                      // disabled={edit}
                      customInput={customDateInput({
                        value: selectedDate
                          ? selectedDate.toLocaleDateString("en-GB")
                          : "",
                      })}
                    />
                  </div>
                </Form.Group>
                {dateError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {dateError}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                height: 50,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Montserrat, sans-serif",
                marginTop: 20,
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
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default EB_Hostel;
