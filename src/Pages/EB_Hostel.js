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

function EB_Hostel() {
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
  const [selectedHostel, setSelectedHostel] = useState([]);
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

  const options = {
    dateFormat: "Y/m/d",
    defaultDate: selectedDate || new Date(),
  };

  useEffect(() => {
    setEbErrorunit(state?.PgList?.ebError);
  }, [state?.PgList?.ebError]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value);
    setFloor("");
    setRooms("");
    setHostelIdError("");
    setEbErrorunit("");
  };
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
  };

  const handleRoom = (e) => {
    setRooms(e.target.value);
    setRoomError("");
    setEbErrorunit("");
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
    // if (value === "1") {
    //   setaddEbDetail(true);
    //   console.log("Customer Reading Add Reading");
    // } else if (value === "2") {
    //   setaddEbDetail(true);
    //   console.log("Room Reading Add Reading");
    // }
  };

  const handleTransactionsShow = () => {
    settransactionshow(true);
    setebshow(false);
  };

  // const handlestartmeter = (e) => {
  //   setStartmeterValue(e.target.value);
  //   if (e.target.value) {
  //     setstartMeterError("");
  //   }
  // };

  const handleendmeter = (e) => {
    setEndmeter(e.target.value);
    setendMeterError("");
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
  // const [startMeterError, setstartMeterError] = useState("");
  const [dateError, setDateError] = useState("");

  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select PG" ||
      value === "Select Floor" ||
      value === "Select a Room"
    ) {
      switch (fieldName) {
        case "Hostel ID":
          setHostelIdError("Hostel ID is required");
          break;
        case "Floor":
          setfloorError("Floor is required");
          break;
        case "Rooms":
          setRoomError("Room is required");
          break;
        case "selectedDate":
          setDateError("date is required");
          break;
        // case "startmeter":
        //   setstartMeterError("startmeter is required");
        //   break;
        case "endmeter":
          setendMeterError("Reading is required");
          break;
        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "Hostel ID":
          setHostelIdError("");
        case "Floor":
          setfloorError("");
          break;
        case "Rooms":
          setRoomError("");
          break;
        case "Bed":
          setBedError("");
          break;
        case "dateError":
          setDateError("");
          break;
        case "endmeter":
          setendMeterError("");
          break;
        default:
          break;
      }
      return true;
    }
  };

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
    setSelectedHostel("");
    setRooms("");
    setFloor("");
    setSelectedDate("");
    setDateError("");
  };

  const handleSaveEbBill = () => {
    // Validate each field before proceeding
    const isHostelValid = validateAssignField(selectedHostel, "Hostel ID");
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");

    const isEndMeterValid = validateAssignField(endmeter, "endmeter");
    const isDatevalid = validateAssignField(selectedDate, "selectedDate");
    if (Floor === "Select Floor" || !isFloorValid) {
      setfloorError("Please select a valid Floor");
      return; // Prevent save
    } else {
      setfloorError(""); // Clear the error if valid
    }

    // Validate Room field
    if (Rooms === "Select Room" || !isRoomValid) {
      setRoomError("Please select a valid Room");
      return; // Prevent save
    } else {
      setRoomError(""); // Clear the error if valid
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
          Hostel_Id: selectedHostel,
          Floor: Floor,
          Room: Rooms,
          date: formattedDate,
          end_Meter_Reading: endmeter,
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
  const currentRowelectricity = electricityFilterddata?.slice(
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

  return (
    <div style={{ padding: 15 }}>
      <div className="d-flex justify-content-between align-items-center ms-3 mb-3">
        <div style={{ padding: 15 }}>
          <label
            style={{
              fontSize: 24,
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

          <div>
            <Button
              style={{
                fontFamily: "Montserrat",
                fontSize: 16,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 56,
                fontWeight: 600,
                borderRadius: 12,
                width: 184,
                padding: "18px, 20px, 18px, 20px",
                border: "none",
                cursor: "pointer",
              }}
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
              style={{ marginLeft: "20px" }}
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
            <div>
              {currentRowelectricity?.length > 0 && (
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
                          textAlign: "center",
                          fontFamily: "Gilroy",
                          color: "rgba(34, 34, 34, 1)",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {/* <img src={squre} height={20} width={20} /> */}
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
                          // borderTopRightRadius: 24
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
                    {currentRowelectricity &&
                      currentRowelectricity.map((v) => {
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
                                verticalAlign: "middle", // Center vertically
                              }}
                            >
                              <img src={squre} height={20} width={20} />
                            </td>
                            <td
                              style={{
                                border: "none",
                                padding: "10px",
                                textAlign: "center",
                                verticalAlign: "middle", // Center vertically
                              }}
                            >
                              <Image
                                src={imageUrl}
                                alt={v.hoatel_Name || "Default Profile"}
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
                              {v.Name}
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
                              {v.HostelName}
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
                              {v.Floor}
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
                              {v.Rooms}
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
                                textAlign: "center",
                                verticalAlign: "middle", // Center vertically
                                borderBottom: "none",
                              }}
                            >
                              <span
                                style={{
                                  backgroundColor: "#EBEBEB",
                                  paddingTop: "5px",
                                  paddingLeft: "16px",
                                  paddingRight: "16px",
                                  paddingBottom: "5px",
                                  borderRadius: "60px",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                {new Date(v.date).toISOString().split('T')[0]} 
                              </span>
                            </td>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                textAlign: "center",
                                verticalAlign: "middle", // Center vertically
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
              )}

              {state.PgList?.EB_startmeterlist?.length === 0 && (
                <div>
                  <div style={{ textAlign: "center" }}>
                    <img src={emptyimg} alt="emptystate" />
                  </div>
                  <div
                    className="pb-1"
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 24,
                      color: "rgba(75, 75, 75, 1)",
                    }}
                  >
                    No Active Electricity{" "}
                  </div>
                  <div
                    className="pb-1"
                    style={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      fontSize: 20,
                      color: "rgba(75, 75, 75, 1)",
                    }}
                  >
                    There are no active Electricity{" "}
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <Button
                      onClick={handleAddEbDetails}
                      style={{
                        fontSize: 16,
                        backgroundColor: "#1E45E1",
                        color: "white",
                        height: 56,
                        fontWeight: 600,
                        borderRadius: 12,
                        width: 200,
                        padding: "18px, 20px, 18px, 20px",
                        fontFamily: "Montserrat",
                      }}
                    >
                      + Record Reading
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {currentRowelectricity?.length > 0 && (
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
                        handleElectricityPageChange(electricitycurrentPage - 1)
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
                        handleElectricityPageChange(electricitycurrentPage + 1)
                      }
                      disabled={electricitycurrentPage === totalPagesinvoice}
                    >
                      <ArrowRight2 size="16" color="#1E45E1" />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        </TabPanel>
        <Modal
          show={addEbDetail}
          onHide={() => handleClose()}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default EB_Hostel;
