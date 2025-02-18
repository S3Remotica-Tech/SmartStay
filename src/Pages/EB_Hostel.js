import React, { useEffect, useState, useRef } from "react";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import "./EB_Hostel.css";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import Calendars from "../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import squre from "../Assets/Images/New_images/minus-square.png";
import Tab from "@mui/material/Tab";
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
import excelimg from "../Assets/Images/New_images/excel_blue.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { MdError } from "react-icons/md";
import EBHostelReading from "./EB_Hostel_Based";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import LoaderComponent from "./LoaderComponent";

function EB_Hostel(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [loginid, setLoginid] = useState();
  const loginId = localStorage.getItem("loginId");
  const [ebShow, setebshow] = useState(false);
  const [addEbDetail, setaddEbDetail] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [roomsByFloor, setRoomsByFloor] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [startmeterdata, setStartmeterData] = useState([]);
  const [startmeter, setStartmeter] = useState([]);
  const [endmeter, setEndmeter] = useState("");
  const [amount, setAmount] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
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
  const [hostelBased, setHostelBased] = useState("");
  const [uniqueostel_Id, setUniqostel_Id] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [endMeterError, setendMeterError] = useState("");
  const [dateError, setDateError] = useState("");
  const [hostelBasedForm, setHostelBasedForm] = useState(false);
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const [electricityFilterddata, setelectricityFilterddata] = useState([]);
  const [tranactioncurrentPage, settranactioncurrentPage] = useState(1);
  const [TransactionFilterddata, seteleTransactionFilterddata] = useState([]);
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(true);
  const [dateErrorMesg,setDateErrorMesg] = useState("")

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
    setHostelBasedForm(true);
    setEditEb(false)
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
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_view == 1
    ) {
      setEbPermissionError("");
    } else {
      setEbPermissionError("Permission Denied");
    }
  }, [ebrolePermission]);

  useEffect(() => {
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
    if (
      ebrolePermission[0]?.is_owner == 1 ||
      ebrolePermission[0]?.role_permissions[12]?.per_edit == 1
    ) {
      setEbEditPermission("");
    } else {
      setEbEditPermission("Permission Denied");
    }
  }, [ebrolePermission]);

  const handleChanges = (event, newValue) => {
    setLoader(false)
    setValue(newValue);
    setaddEbDetail(false);
    setHostelBasedForm(false);
    setFilterInput("")
    setSearch(false)
    setDropdownVisible(false);
  };

  const calendarRef = useRef(null);
  useEffect(() => {
    dispatch({ type: "EBLIST" });
  }, []);
  const [electricityFilterd, setelectricityFilterd] = useState([]);
  const [electricityHostel, setelectricityHostel] = useState([]);
  const [roomBasedDetail, setRoomBasedDetail] = useState("");
  useEffect(() => {
    setLoader(true)
    dispatch({
     type: "CUSTOMEREBLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });

    
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
    if (state.PgList?.statusCodeForEbRoomList === 200) {
      setLoader(false)
      setelectricityFilterd(state.PgList?.EB_startmeterlist);

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_STARTMETER_LIST" });
      }, 1000);
    }
  }, [state.PgList.statusCodeForEbRoomList])
  useEffect(() => {
    setLoader(true)
    dispatch({
      type: "EBSTARTMETERLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
    
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
    setLoader(true)
      dispatch({
        type: "HOSTELBASEDEBLIST",
        payload: { hostel_id: selectedHostel },
      });
    
  }, [selectedHostel]);


   useEffect(() => {
      if (state.PgList.getStatusCodeForHostelBased === 200) {
        setLoader(false)
        setelectricityHostel(
          state?.PgList?.getHostelBasedRead?.hostel_readings
        );
        
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

  const handleFloor = (e) => {
    setFloor(e.target.value);
    const filteredRooms = state.UsersList?.hosteldetailslist.filter(
      (room) => room.floor_id == e.target.value
    );
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
  useEffect(() => {
    dispatch({ type: "TRANSACTIONHISTORY" });
  }, []);

  const handleAddEbDetails = () => {
    setaddEbDetail(true);
  };

  const handleendmeter = (e) => {
    setEndmeter(e.target.value);
    setendMeterError("");
    setEbErrorunit("");
    setDateErrorMesg("")
    dispatch({ type: "CLEAR_EB_ERROR" });
  };

  useEffect(() => {
    const FilterEbAmount = state.Settings.EBBillingUnitlist?.filter(
      (item) => item.hostel_id == selectedHostel
    );
    setUnitAmount(FilterEbAmount);
    if (Array.isArray(FilterEbAmount) && FilterEbAmount.length > 0) {
      setUnitAmount(FilterEbAmount[0]?.amount);
    } else {
      console.log("unitAmount is not a valid array or is empty.");
    }
  }, [state.Settings.EBBillingUnitlist, selectedHostel]);

  useEffect(() => {
    const FilterHostelBased = state.Settings.EBBillingUnitlist?.filter(
      (item) => item.hostel_id == selectedHostel
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
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_CUSTOMER_EBLIST" });
      }, 200);
    }
  }, [state.PgList.statusCodeforEbCustomer]);
console.log("state.PgList.nostatusCodeforEbCustomer",state.PgList.nostatusCodeforEbCustomer)

  useEffect(() => {
    if (state.PgList.nostatusCodeforEbCustomer == 201) {
      setelectricityFilterddata([]);
      setLoader(false)
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
      dispatch({ type: "CUSTOMEREBLIST", payload: { hostel_id: selectedHostel } });

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
          setfloorError("Floor is required");
          break;
        case "Rooms":
          setRoomError("Rooms is required");
          break;
        case "Bed":
          setBedError("Bed is required");
          break;
        case "selectedDate":
          setDateErrorMesg("Date is required");
          break;
        case "endmeter":
          setendMeterError("Reading is required");
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
      case "Bed":
        setBedError("");
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
    setEbErrorunit("");
    setStartmeter("");
    setEndmeter("");
    setRooms("");
    setFloor("");
    setSelectedDate("");
    setDateError("");
    setDateErrorMesg("")
    
  };

  const handleSaveEbBill = () => {
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");

    const isEndMeterValid = validateAssignField(endmeter, "endmeter");
    const isDatevalid = validateAssignField(selectedDate, "selectedDate");

    if (Floor === "Select Floor" || !isFloorValid) {
      setfloorError("Please select a valid Floor");
      return;
    } else {
      setfloorError("");
    }

    // Validate Room field
    if (Rooms === "Select a Room" || !isRoomValid) {
      setRoomError("Please select a valid Room");
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
      : electricityFilterddata?.slice(indexOfFirstRowelectricity, indexOfLastRowelectricity);

  const handlePageChange = (pageNumber) => {
    setelectricitycurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setElectricityrowsPerPage(Number(event.target.value));
    setelectricitycurrentPage(1) 
  };
  const totalPagesinvoice = Math.ceil(
    electricityFilterddata?.length / electricityrowsPerPage
  );

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

  useEffect(() => {
    seteleTransactionFilterddata(state.ExpenseList.transactionHistory);
  }, [state.ExpenseList.transactionHistory]);

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
    setDateErrorMesg("")
    setSelectedDate(date);
    dispatch({ type: "CLEAR_EB_ERROR" });
  };
  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };

  const [originalElec, setOriginalElec] = useState("")
  const [originalElecRoom, etOriginalElecRoom] = useState("")

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


  const handlefilterInput = (e) => {
    const inputValue = e.target.value;
    setFilterInput(inputValue);
    setDropdownVisible(inputValue.length > 0);

    if (inputValue.length === 0) {
      setelectricityFilterddata(originalElec);
    } else {
      const filteredData = originalElec?.filter((item) =>
        item.Name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setelectricityFilterddata(filteredData);
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
  const handleRoomUserSelect = (user) => {
    setFilterInput(user.floor_name);
    // setRoomBasedDetail([user]);
    setDropdownVisible(false);
  };

  return (
    <div style={{ paddingLeft: 15 }}>
      <div
       className="container justify-content-between d-flex align-items-center"
       style={{
        //  position: "sticky",
         top: 0,
         right: 0,
         left: 0,
         zIndex: 1000,
         backgroundColor: "#FFFFFF",
         height: 83,
       }}
      >
        <div style={{ marginTop: -7 }}>
                    <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, }}>Electricity</label>
                  </div>

        <div
          className="d-flex  justify-content-between align-items-center flex-wrap flex-md-nowrap"
          
        >
          {search && value === "1" ? (
            <>
              <div
                          style={{
                            position: "relative",
                            width: "100%",
                            marginRight: 20,
                          }}
                        >
                <div
                            style={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              marginTop: '10px',
                              marginBottom: '10px'
                            }}
                          >
                  <Image
                    src={searchteam}
                    alt="Search"
                    style={{
                      position: "absolute",
                      left: "10px",
                      width: "24px",
                      height: "24px",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    className="input-group"
                    style={{ marginRight: 20 }}
                  >
                    <span className="input-group-text bg-white border-end-0">
                      <Image
                        src={searchteam}
                        style={{ height: 20, width: 20 }}
                      />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search"
                      aria-label="Search"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                        borderColor: "rgb(207,213,219)",
                        borderRight: "none",
                      }}
                      value={filterInput}
                      onChange={(e) => handlefilterInput(e)}
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <img
                        src={closecircle}
                        onClick={handleCloseSearch}
                        style={{ height: 20, width: 20 }}
                      />
                    </span>
                  </div>
                </div>

                {value === "1" &&
                  isDropdownVisible &&
                  electricityFilterddata?.length > 0 && (
                    <div
                      style={{
                        border: "1px solid #d9d9d9 ",
                        position: "absolute",
                        top: 60,
                        left: 0,
                        zIndex: 1000,
                        padding: 10,
                        borderRadius: 8,
                        backgroundColor: "#fff",
                        width: "94%",
                      }}
                    >
                      <ul
                        className="show-scroll p-0"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: "4px",
                          maxHeight: electricityFilterddata?.length > 1 ? "174px" : "auto",
                          minHeight: 100,
                          overflowY:
                            electricityFilterddata?.length > 1 ? "auto" : "hidden",
                          margin: "0",
                          listStyleType: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        {electricityFilterddata?.map((user, index) => {
                          const imagedrop = user.profile || Profile;
                          return (
                            <li
                              key={index}
                              className="list-group-item d-flex align-items-center"
                              style={{
                                cursor: "pointer",
                                padding: "10px 5px",
                                borderBottom:
                                  index !== electricityFilterddata?.length - 1
                                    ? "1px solid #eee"
                                    : "none",
                              }}
                              onClick={() => handleUserSelect(user)}
                            >
                              <Image
                                src={imagedrop}
                                alt={user.Name || "Default Profile"}
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
                          );
                        })}
                      </ul>
                    </div>
                  )}
                {/* {value === "2" &&
                        isDropdownVisible &&
                        roomBasedDetail?.length > 0 && (
                          <div
                            style={{
                              border: "1px solid #d9d9d9 ",
                              position: "absolute",
                              top: 60,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              width: "94%",
                            }}
                          >
                            <ul
                              className="show-scroll p-0"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                maxHeight:
                                roomBasedDetail?.length > 1 ? "174px" : "auto",
                                minHeight: 100,
                                overflowY:
                                roomBasedDetail?.length > 1
                                    ? "auto"
                                    : "hidden",
                                margin: "0",
                                listStyleType: "none",
                                boxSizing: "border-box",
                              }}
                            >
                              {roomBasedDetail?.map((user, index) => {
                                const imagedrop = user.profile || Profile;
                                return (
                                  <li
                                    key={index}
                                    className="list-group-item d-flex align-items-center"
                                    style={{
                                      cursor: "pointer",
                                      padding: "10px 5px",
                                      borderBottom:
                                        index !== roomBasedDetail?.length - 1
                                          ? "1px solid #eee"
                                          : "none",
                                    }}
                                    onClick={() => handleRoomUserSelect(user)}
                                  >
                                   
                                    <span>{user.floor_name}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )} */}

                {/* {value === "3" &&
                        isDropdownVisible &&
                        receiptdata?.length > 0 && (
                          <div
                            style={{
                              border: "1px solid #d9d9d9 ",
                              position: "absolute",
                              top: 60,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              width: "94%",
                            }}
                          >
                            <ul
                              className="show-scroll p-0"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                maxHeight:
                                  receiptdata?.length > 1 ? "174px" : "auto",
                                minHeight: 100,
                                overflowY:
                                  receiptdata?.length > 1 ? "auto" : "hidden",
                                margin: "0",
                                listStyleType: "none",
                                boxSizing: "border-box",
                              }}
                            >
                              {receiptdata?.map((user, index) => {
                                const imagedrop = user.profile || Profile;
                                return (
                                  <li
                                    key={index}
                                    className="list-group-item d-flex align-items-center"
                                    style={{
                                      cursor: "pointer",
                                      padding: "10px 5px",
                                      borderBottom:
                                        index !== receiptdata?.length - 1
                                          ? "1px solid #eee"
                                          : "none",
                                    }}
                                    onClick={() => handleUserReceipt(user)}
                                  >
                                    <Image
                                      src={imagedrop}
                                      alt={user.Name || "Default Profile"}
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
                                );
                              })}
                            </ul>
                          </div>
                        )} */}
              </div>
            </>
          ) : (
            <>
              {
                value === "1" &&
                <div style={{ paddingRight: 21 }}>
                  <Image
                    src={searchteam}
                    roundedCircle
                    style={{
                      height: "24px",
                      width: "24px",

                      cursor: "pointer",

                    }}
                    onClick={handleSearch}
                  />
                </div>

              }

            </>
          )}
          <div className="me-4" style={{ paddingRight: 5, marginTop: 5 }}>

            {value === "1" && (
              <img
                src={excelimg}
                width={38}
                height={38}
                onClick={handleEbExcel}
                style={{ cursor: "pointer" }}
              />
            )}

          </div>

          {hostelBased == 1 ? (
            <div className="me-4">
              <Button


                style={{
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  padding: "11px 17px",
                  marginTop: 2,
                  paddingLeft: 17,
                  whiteSpace: "nowrap",
cursor:"pointer"
                }}

                // disabled={ebAddPermission}
                onClick={handleHostelForm}
              >
                + Hostel Reading
              </Button>
            </div>
          ) : (
            <div className="">
              <Button
                // style={{
                //   fontFamily: "Montserrat",
                //   fontSize: 14,
                //   backgroundColor: "#1E45E1",
                //   color: "white",
                //   height: 52,
                //   fontWeight: 600,
                //   borderRadius: 8,
                //   width: 162,
                //   padding: "12px 16px", // Corrected padding
                //   border: "none",
                //   cursor: "pointer",
                //   whiteSpace: "nowrap",
                //   paddingTop: 10,
                //   paddingBottom: 10,
                //   paddingLeft: 5,
                //   paddingRight: 5,
                // }}
                style={{
                  // fontFamily: "Gilroy",
                  // fontSize: "14px",
                  // backgroundColor: "#1E45E1",
                  // color: "white",
                  // fontWeight: 600,
                  // borderRadius: "8px",
                  // padding: "11px 18px",
                  // marginTop: 2,
                  // paddingLeft: 19,
                  // whiteSpace: "nowrap",
                  // cursor:"pointer"
                    fontFamily: "Gilroy",
                                          fontSize: "14px",
                                          backgroundColor: "#1E45E1",
                                          color: "white",
                                          fontWeight: 600,
                                          borderRadius: "8px",
                                          padding: "11px 18px",
                                          marginTop: 4,
                                          // paddingLeft: 34,
                                          whiteSpace: "nowrap",
                                          cursor:"pointer",
                                          marginRight:"8px"
                }}
                disabled={ebAddPermission}
                onClick={handleAddEbDetails}
              >
                + Room Reading
              </Button>
            </div>
          )}
        </div>
      </div>

      <TabContext value={value} >
        <div >
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <TabList
              orientation={isSmallScreen ? "vertical" : "horizontal"}
              onChange={handleChanges}
              aria-label="lab API tabs example"
              style={{ marginLeft: "14px",marginTop:"-25px" }}
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

              {hostelBased == 1 ? (
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
              electricityHostel = {electricityHostel}
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
               

               
                  {currentRoomelectricity?.length > 0 && 
                    <div
                      style={{
                        // height: "400px",
                        height:
                          currentRoomelectricity.length >= 6 ? "400px" : "auto",
                        overflowY:
                          currentRoomelectricity.length >= 6
                            ? "auto"
                            : "visible",
                        borderRadius: "24px",
                        border: "1px solid #DCDCDC",
                        // borderBottom:"none"
                      }}
                    >
                      <Table
                        responsive="md"
                        className="Table_Design"
                        style={{
                          border: "1px solid #DCDCDC",
                          borderBottom: "1px solid transparent",
                          borderEndStartRadius: 0,
                          borderEndEndRadius: 0,
                        }}
                      >
                        <thead
                          style={{
                            color: "gray",
                            fontSize: "11px",
                            backgroundColor: "#E7F1FF",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                          }}
                        >
                          <tr style={{ height: "30px" }}>
                            <th
                              style={{
                                color: "rgb(147, 147, 147)",
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "start",
                                paddingLeft: "20px",
                                borderTopLeftRadius: 24,
                                // textAlign: hostelBased === 1 ? "start" : "center",
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                color: "rgb(147, 147, 147)",
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "start",
                              }}
                            >
                              Paying Guest
                            </th>

                            {hostelBased !== 1 && (
                              <>
                                <th
                                  style={{
                                    color: "rgb(147, 147, 147)",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    fontFamily: "Gilroy",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    textAlign: "start",
                                  }}
                                >
                                  Floor
                                </th>
                                <th
                                  style={{
                                    color: "rgb(147, 147, 147)",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    fontFamily: "Gilroy",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    paddingRight: "5px",
                                    textAlign: "start",
                                  }}
                                >
                                  Room
                                </th>
                              </>
                            )}

                            <th
                              style={{
                                color: "rgb(147, 147, 147)",
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "start",
                              }}
                            >
                              Previous
                            </th>
                            <th
                              style={{
                                color: "rgb(147, 147, 147)",
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "start",
                              }}
                            >
                              Current
                            </th>
                            <th
                              style={{
                                color: "rgb(147, 147, 147)",
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "start",
                                paddingLeft: "15px",
                              }}
                            >
                              Date
                            </th>
                            <th
                              style={{
                                color: "rgb(147, 147, 147)",
                                fontWeight: 500,
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                textAlign: "start",


                              }}
                            >
                              Units
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontWeight: 500,
                              }}
                            >
                              Amount
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontWeight: 500,
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
                                      fontSize: "16px",
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                      cursor: "pointer",
                                      paddingTop: 10,
                                      textAlign: "start",
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
                                    textAlign: "start",
                                    fontSize: "16px",
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
                                      fontSize: "14px",
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {v.HostelName}
                                  </span>
                                </td>
                                {hostelBased !== 1 && (
                                  <>
                                    <td
                                      style={{
                                        fontSize: "16px",
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
                                        fontSize: "16px",
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
                                    fontSize: "16px",
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
                                    fontSize: "16px",
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
                                    textAlign: "start",
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
                        </tbody>
                      </Table>
                    </div>
                        }




  
{loader && <LoaderComponent/>

// <div
              //   style={{
              //     position: 'absolute',
              //     top: 0,
              //     right: 0,
              //     bottom: 0,
              //     left: '200px',
              //     display: 'flex',
              //     alignItems: 'center',
              //     justifyContent: 'center',
              //     backgroundColor: 'transparent',
              //     opacity: 0.75,
              //     zIndex: 10,
              //   }}
              // >
              //   <div
              //     style={{
              //       borderTop: '4px solid #1E45E1',
              //       borderRight: '4px solid transparent',
              //       borderRadius: '50%',
              //       width: '40px',
              //       height: '40px',
              //       animation: 'spin 1s linear infinite',
              //     }}
              //   ></div>
              // </div>
             
            }


{
                   !loader && currentRoomelectricity && currentRoomelectricity?.length == 0 &&
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

                      {/* <div style={{ textAlign: "center" }}>
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
                      </div> */}
                      {/* {hostelBased == 1 ? (
                        <div style={{ textAlign: "center" }}>
                          <Button
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
                            disabled={ebAddPermission}
                            onClick={handleHostelForm}
                          >
                            + Add Hostel Reading
                          </Button>
                        </div>
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <Button
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
                            disabled={ebAddPermission}
                            onClick={handleAddEbDetails}
                          >
                            + Add Room Reading
                          </Button>
                        </div>
                      )} */}
                    </div>
}

                {electricityFilterddata?.length >= 5 && (
                  

                  <nav
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
                <Form.Select
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
                </Form.Select>
                {floorError && (
                  <div >
                    <MdError style={{ color: "red", fontSize: "13px",marginBottom:"2px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5
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
                <Form.Select
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
                </Form.Select>
                {roomError && (
                  <div >
                    <MdError style={{ color: "red", fontSize: "13px",marginBottom:"2px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5
                      }}
                    >
                      {roomError}
                    </span>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group >
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
                        marginLeft: 5
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
                {dateErrorMesg && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ color: "red", fontSize: "13px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginLeft: 5
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
                                    <div className="d-flex justify-content-center align-items-center mt-2" style={{ color: "red" }}>
                                    <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
                                    <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{dateError}</span>
                                  </div>
                                    )}
          <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
            <Button
              className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
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
            
            electricityFilterd={electricityFilterd}
            loading = {loader}
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
            electricityHostel = {electricityHostel}
            loading = {loader}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default EB_Hostel;