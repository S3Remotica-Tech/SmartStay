/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import Button from "react-bootstrap/Button";
import { ArrowLeft2, ArrowRight2, } from "iconsax-react";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { MdError } from "react-icons/md";
import moment from "moment";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import { CloseCircle } from "iconsax-react";
import './EB_RoomReading.css';

function EBRoomReading(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const popupRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [ebEditShow, setebEditShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [reading, setReading] = useState("");
  const [readingError, setReadingError] = useState("");
  const [formError, setFormError] = useState("");
  const [id, setId] = useState("")
  const [hostelId, setHostelId] = useState("")
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [dateErrorMesg, setDateErrorMesg] = useState("")
  const [roomelectricity, setRoomElectricity] = useState([])

 const [formLoading, setFormLoading] = useState(false)



  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    props.setLoader(true)
    dispatch({
      type: "EBSTARTMETERLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });

  }, [state.login.selectedHostel_Id]);



  useEffect(() => {
    if (state.PgList?.statusCodeForEbRoomList === 200) {
      props.setLoader(false)
      setRoomElectricity(state.PgList?.EB_startmeterlist);

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_STARTMETER_LIST" });
      }, 1000);
    }
  }, [state.PgList.statusCodeForEbRoomList])


  useEffect(() => {
    if (state.PgList.statusCodeForEBRoombasednodata === 201) {
      props.setLoader(false)


      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_ROOM_BASED" });
      }, 200);
    }
  }, [state.PgList.statusCodeForEBRoombasednodata]);



  const handleShowDots = (eb_Id, event) => {
    setActiveRow((prevActiveRow) => (prevActiveRow === eb_Id ? null : eb_Id));

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });

  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);


    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setHostelId(state.login.selectedHostel_Id);
  }, [state.login.selectedHostel_Id])


  const handleReadingChange = (e) => {
    const value = (e.target.value)
    if (!/^\d*$/.test(value)) {
      return;
    }
    setReading(value);
    setReadingError('')
    setFormError('')
    setDateError('');
    setDateErrorMesg("")
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
  };
  useEffect(() => {
    const FilterEbAmount = state.Settings.EBBillingUnitlist.eb_settings?.filter(
      (item) => item.hostel_id === hostelId
    );
    setUnitAmount(FilterEbAmount);
    if (Array.isArray(FilterEbAmount) && FilterEbAmount.length > 0) {
      setUnitAmount(FilterEbAmount[0]?.amount);
    } 
  }, [state.Settings.EBBillingUnitlist.eb_settings, hostelId]);





  useEffect(() => {
    if(state?.PgList?.ebEditError){
      setFormLoading(false)
    setDateError(state?.PgList?.ebEditError);
    }
  }, [state?.PgList?.ebEditError]);

  useEffect(() => {
    if (hostelId && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: hostelId, floor_Id: Floor },
      });
    }
  }, [Floor]);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: hostelId },
    });
  }, [hostelId]);
  const handleRoom = (selectedOption) => {
    setRooms(selectedOption);
    setRoomError("");
    setFormError("");
  };
  const handleFloor = (selectedOption) => {
    setFloor(selectedOption);
    setRooms("");
    setfloorError("");
    setFormError("");
  };
  const handleClose = () => {
    setebEditShow(false);
    setFormError("");
    setDateError("")
    setDateErrorMesg("")
    setReadingError('')
  };


  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handleDeleteShow = (item) => {
    setDeleteShow(true);
    setDeleteId(item.eb_Id)
  };


  useEffect(() => {
    dispatch({ type: "EBLIST" });

  }, []);




  const [initialStateAssign, setInitialStateAssign] = useState({
    selectedHostel: "",
    Floor: "",
    Rooms: "",
    reading: "",
    selectedDate: "",
  });
  const handleEditRoomReading = (item) => {
    setUnitAmount('')
    setebEditShow(true);
    setSelectedHostel(item.hostel_Id);
    setFloor(item.floor_id);
    setRooms(item.room_id);


    setReading(item.reading);

    setSelectedDate(item.date || "");

    setSelectedDate(
      item.date ? moment(item.date).toDate("") : null
    );
    setId(item.eb_Id)
    setHostelId(item.hostel_Id)



    setInitialStateAssign({
      selectedHostel: item.hostel_Id || "",
      Floor: item.floor_id || "",
      Rooms: item.room_id || "",
      reading: item.reading || "",
      selectedDate: item.date || "",
    });
  };




  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null ||
      value === "0";
    if (isValueEmpty) {
      switch (fieldName) {
        case "reading":
          setReadingError("Reading is Required");
          break;
        case "Floor":
          setfloorError("Floor is Required");
          break;
        case "Rooms":
          setRoomError("Rooms is Required");
          break;
        case "selectedDate":
          setDateErrorMesg("Date is Required");
          break;

        default:
          break;
      }
      return false;
    }


    switch (fieldName) {
      case "reading":
        setReadingError("");
        break;

      case "Floor":
        setfloorError("");
        break;
      case "Rooms":
        setRoomError("");
        break;
      case "selectedDate":
        setDateErrorMesg("");
        break;
      default:
        break;
    }

    return true;
  };
  const handleSaveChanges = () => {
     dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
    const isreadingValid = validateAssignField(reading, "reading");
    const isDatevalid = validateAssignField(selectedDate, "selectedDate");
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");



    if (Floor === "Select Floor" || !isFloorValid) {
      setfloorError("Please Select a Valid Floor");
      return;
    } else {
      setfloorError("");
    }


    if (Rooms === "Select a Room" || !isRoomValid) {
      setRoomError("Please Select a Valid Room");
      return;
    } else {
      setRoomError("");
    }

    if (

      !isreadingValid ||
      (!isFloorValid && !isRoomValid && !isDatevalid)
    ) {
      return;
    }

    const isValidDate = (date) => {
      return !isNaN(Date.parse(date));
    };
    const isChangedBed =
      (String(Floor).toLowerCase() !== String(initialStateAssign.Floor).toLowerCase()) ||
      (String(Rooms).toLowerCase() !== String(initialStateAssign.Rooms).toLowerCase()) ||
      (String(hostelId).toLowerCase() !== String(initialStateAssign.selectedHostel).toLowerCase()) ||
      (isValidDate(selectedDate) && isValidDate(initialStateAssign.selectedDate)
        ? new Date(selectedDate).toISOString().split("T")[0] !==
        new Date(initialStateAssign.selectedDate).toISOString().split("T")[0]
        : selectedDate !== initialStateAssign.selectedDate) ||
      String(reading) !== String(initialStateAssign.reading)



    if (!isChangedBed) {
      setFormError("No Changes Detected");
      return;
    } else {
      setFormError("");
    }

    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    dispatch({
      type: "EDITELECTRICITY",
      payload: {
        hostel_id: hostelId,
        floor_id: Floor,
        room_id: Rooms,
        reading: reading,
        date: formattedDate,
        id: id
      },
    });
    setFormLoading(true)

  };


  const [electricityrowsPerPage, setElectricityrowsPerPage] = useState(10);
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;

  const dataSource = props.filterStatus ? props.RoomElect : roomelectricity;

  const currentRowelectricity = dataSource?.slice(
    indexOfFirstRowelectricity,
    indexOfLastRowelectricity
  );

  const handlePageChange = (pageNumber) => {
    setelectricitycurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setElectricityrowsPerPage(Number(event.target.value));
    setelectricitycurrentPage(1)
  };

  const totalPagesinvoice = Math.ceil(roomelectricity?.length / electricityrowsPerPage);



  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentRowelectricity;

    const sorted = [...currentRowelectricity].sort((a, b) => {
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
  }, [currentRowelectricity, sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };




  const handleDeleteReading = () => {
    dispatch({
      type: "DELETEECTRICITY",
      payload: {
        id: deleteId
      },
    });

  }

  useEffect(() => {
    if (state.PgList.statusCodeForEditElectricity === 200 || state.PgList.statusCodeForDeleteElectricity === 200) {
     setFormLoading(false)
      handleCloseDelete()
      handleClose()
      dispatch({ type: "EBSTARTMETERLIST", payload: { hostel_id: hostelId } });
      dispatch({ type: "CUSTOMEREBLIST", payload: { hostel_id: hostelId } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_ELECTRICITY" });
        dispatch({ type: "CLEAR_DELETE_ELECTRICITY" });
      }, 200);


    }
  }, [state.PgList.statusCodeForEditElectricity, state.PgList.statusCodeForDeleteElectricity])

  useEffect(() => {
    if (state.PgList?.statusCodeForEbRoomList === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_STARTMETER_LIST" });
      }, 200);
    }
  }, [state.PgList.statusCodeForEbRoomList])


 



  return (


    <>
      {
        props.ebpermissionError ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",

            }}
          >

            <img
              src={emptyimg}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />


            {props.ebpermissionError && (
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
                <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{props.ebpermissionError}</span>
              </div>
            )}
          </div>
        ) :
          <>


            {sortedData && sortedData.length > 0 ? (

              <div
                className="p-0 booking-table-userlist  booking-table ps-2 ms-0 me-4"
                style={{ paddingBottom: "20px", marginLeft: "-22px" }}
              >

                <div
                  className='show-scrolls electricity-table'
                  style={{


                    height: currentRowelectricity.length >= 8 || sortedData.length >= 8 ? "350px" : "auto",

                    overflow: "auto",
                    marginBottom: 20,
                    marginTop: "20px"

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
                        <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}> <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("hoatel_Name", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("hoatel_Name", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Paying Guest</div>  </th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }} > <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Floor</div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}> <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Room_Id", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Room_Id", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Room no </div> </th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("reading", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("reading", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Reading </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("date", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("date", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Date </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("total_reading", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("total_reading", 'desc')} style={{ cursor: "pointer" }} />
                        </div> Units</div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                          <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("total_amount", 'asc')} style={{ cursor: "pointer" }} />
                          <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("total_amount", 'desc')} style={{ cursor: "pointer" }} />
                        </div>  Amount </div></th>

                        <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}>Action</th>
                      </tr>
                    </thead>


                    <tbody>
                      {sortedData && sortedData.length > 0 && (
                        <>
                          {sortedData.map((v) => {

                            let formattedDate;

                            if (v.date && v.date !== '0000-00-00') {
                              let Dated = new Date(v.date);
                              let day = Dated.getDate().toString().padStart(2, '0');
                              let month = (Dated.getMonth() + 1).toString().padStart(2, '0');
                              let year = Dated.getFullYear();
                              formattedDate = `${day}-${month}-${year}`;
                            } else {
                              let initialDate = new Date(v.initial_date);
                              let day = initialDate.getDate().toString().padStart(2, '0');
                              let month = (initialDate.getMonth() + 1).toString().padStart(2, '0');
                              let year = initialDate.getFullYear();
                              formattedDate = `${day}-${month}-${year}`;
                            }




                            return (
                              <tr key={v.id}>


 <td
                                        className="ps-0 ps-sm-0 ps-md-3 ps-lg-1"
                                          style={{
                                            paddingTop: 15,
                                            border: "none",
                                            textAlign: "start",
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            marginTop: 10,
                                            verticalAlign: "middle",
                                            borderBottom: "1px solid #E8E8E8",
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
                                              textAlign: "center",
                                              fontSize: "11px",
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                              marginLeft:10
                                            }}
                                          >
                                            {v.hoatel_Name}
                                          </span>
                                        </td>
    <td
      style={{
        fontSize: 13, 
                              fontWeight: 500,
                              fontFamily: "Gilroy",
        textAlign: "start",
        verticalAlign: "middle",
        borderBottom: "1px solid #E8E8E8",
        paddingLeft:20,
        whiteSpace:"nowrap"
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
        verticalAlign: "middle"
        ,borderBottom: "1px solid #E8E8E8",
        paddingLeft:20,
        whiteSpace:"nowrap"
      }}
    >
      <div style={{marginLeft:2}}>  {v.Room_Id}</div>
    
    </td>


    <td
      style={{
        fontSize: 13, 
        fontWeight: 500,
        fontFamily: "Gilroy",
        textAlign: "start",
        verticalAlign: "middle",
       borderBottom: "1px solid #E8E8E8",
       paddingLeft:20,
       whiteSpace:"nowrap",
       marginLeft:13

      }}
    >
      <div style={{marginLeft:2}}>{v.reading}</div>
    
    </td>
    <td
      style={{
        textAlign: "start",
        verticalAlign: "middle", 
        borderBottom: "1px solid #E8E8E8",
               whiteSpace:"nowrap"
        
      }}
    >
      <span
        style={{
          backgroundColor: "#EBEBEB",
          paddingTop: "5px",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingBottom: "5px",
          marginLeft:-4,
          borderRadius: "60px",
          fontSize: 13, 
          fontWeight: 500,
          fontFamily: "Gilroy",
          whiteSpace:"nowrap"
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
        verticalAlign: "middle",borderBottom: "1px solid #E8E8E8",
        paddingLeft:20,
        whiteSpace:"nowrap"
       
      }}
    >
      <div style={{marginLeft:2}}>{v.total_reading}</div>
      
    </td>
    <td
      style={{
        fontSize: 13, 
        fontWeight: 500,
        fontFamily: "Gilroy",
        textAlign: "start",
        verticalAlign: "middle",borderBottom: "1px solid #E8E8E8",
        paddingLeft:20,
        whiteSpace:"nowrap"
        
      }}
    >
        <div style={{marginLeft:2}}>₹{v.total_amount}</div>
   
    </td>
    <td  style={{
       fontSize: 13, 
       fontWeight: 500,
       fontFamily: "Gilroy",
        textAlign: "start",
        verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
      }}>

                                  <div
                                    style={{
                                      cursor: "pointer",
                                      height: 35,
                                      width: 35,
                                      borderRadius: 100,
                                      border: "1px solid #EFEFEF",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",

                                      backgroundColor: activeRow === v.eb_Id ? "#E7F1FF" : "white",
                                    }}
                                    onClick={(e) => handleShowDots(v.eb_Id, e)}
                                  >
                                    <PiDotsThreeOutlineVerticalFill
                                      style={{ height: 20, width: 20, color: "black" }}
                                    />
                                    {activeRow === v.eb_Id && (
                                      <>
                                        <div
                                          ref={popupRef}
                                          style={{
                                            cursor: "pointer",
                                            backgroundColor: "#F9F9F9",
                                            position: "fixed",
                                            top: popupPosition.top,
                                            left: popupPosition.left,
                                            width: 150,
                                            border: "1px solid #EBEBEB",
                                            borderRadius: 10,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            zIndex: 1000,
                                          }}
                                        >

                                          <div
                                            className="d-flex justify-content-start align-items-center gap-2 "
                                            style={{
                                              cursor: props.ebEditPermission ? "not-allowed" : "pointer",
                                              opacity: props.ebEditPermission ? 0.6 : 1,
                                              borderTopLeftRadius: 10,
                                              borderTopRightRadius: 10,
                                              backgroundColor: "#F9F9F9",
                                              padding: "8px 12px",
                                              width:"100%",
                                            }}
                                            onClick={() => {
                                              if (!props.ebEditPermission) {
                                                handleEditRoomReading(v);
                                              }
                                            }}
                                            onMouseEnter={(e) => {
                                              if (!props.ebEditPermission)
                                                e.currentTarget.style.backgroundColor = "#EDF2FF";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >
                                            <img
                                              src={Edit}
                                              alt="Edit"
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: props.ebEditPermission ? "grayscale(100%)" : "none",
                                              }}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: props.ebEditPermission ? "#ccc" : "#222222",
                                              }}
                                            >
                                              Edit
                                            </label>
                                          </div>


                                          <div
                                            className="d-flex justify-content-start align-items-center gap-2"
                                            style={{
                                              cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
                                              opacity: props.ebDeletePermission ? 0.6 : 1,
                                              borderBottomLeftRadius: 10,
                                              borderBottomRightRadius: 10,
                                              backgroundColor: "#F9F9F9",
                                              padding: "8px 12px",
                                              width:"100%",
                                            }}
                                            onClick={() => {
                                              if (!props.ebDeletePermission) {
                                                handleDeleteShow(v);
                                              }
                                            }}
                                            onMouseEnter={(e) => {
                                              if (!props.ebDeletePermission)
                                                e.currentTarget.style.backgroundColor = "#FFF0F0";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >
                                            <img
                                              src={Delete}
                                              alt="Delete"
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: props.ebDeletePermission ? "grayscale(100%)" : "none",
                                              }}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: props.ebDeletePermission ? "#ccc" : "#FF0000",
                                              }}
                                            >
                                              Delete
                                            </label>
                                          </div>
                                        </div>

                                      </>
                                    )}
                                  </div>

                                
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
              </div>

            ):
                     props.value === "2" && !props.loading && roomelectricity && roomelectricity?.length === 0 ? (
                        <div style={{marginTop:60}}>
                          <div style={{ textAlign: "center" }}>
                            <img src={emptyimg} width={240} height={240} alt="No readings" />
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
                            No room readings
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
                            There are no room readings available.
                          </div>
            
                        </div>
                      ) : null}






            {props.loading &&
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: '200px',
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
              </div>
            }
            {roomelectricity?.length >= 5 && (
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
                  zIndex: 1000,
                }}
              >
              
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

             
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                
                  <li style={{ margin: "0 10px" }}>
                    <button
                      style={{
                        padding: "5px",
                        textDecoration: "none",
                        color: electricitycurrentPage === 1 ? "#ccc" : "#1E45E1",
                        cursor: electricitycurrentPage === 1 ? "not-allowed" : "pointer",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handlePageChange(electricitycurrentPage - 1)}
                      disabled={electricitycurrentPage === 1}
                    >
                      <ArrowLeft2 size="16" color={electricitycurrentPage === 1 ? "#ccc" : "#1E45E1"} />
                    </button>
                  </li>

                 
                  <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                    {electricitycurrentPage} of {totalPagesinvoice}
                  </li>

                  
                  <li style={{ margin: "0 10px" }}>
                    <button
                      style={{
                        padding: "5px",
                        textDecoration: "none",
                        color: electricitycurrentPage === totalPagesinvoice ? "#ccc" : "#1E45E1",
                        cursor: electricitycurrentPage === totalPagesinvoice ? "not-allowed" : "pointer",
                        borderRadius: "50%",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handlePageChange(electricitycurrentPage + 1)}
                      disabled={electricitycurrentPage === totalPagesinvoice}
                    >
                      <ArrowRight2
                        size="16"
                        color={electricitycurrentPage === totalPagesinvoice ? "#ccc" : "#1E45E1"}
                      />
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
      }


      <Modal
        show={ebEditShow}
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
            Edit Reading
          </div>
        
          <CloseCircle size="24" color="#000" onClick={handleClose}
            style={{ cursor: 'pointer' }} />
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
             

              <Select
                options={
                  state?.UsersList?.hosteldetailslist?.map((item) => ({
                    value: item.floor_id,
                    label: item.floor_name,
                  })) || []
                }
                onChange={(selectedOption) => handleFloor(selectedOption?.value)}
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
                isDisabled={unitAmount && unitAmount.length === 0 && selectedHostel !== ""}
                noOptionsMessage={() => "No floors available"}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    height: "50px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                    backgroundColor: state.isDisabled ? "#E9ECEF" : "white",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    fontFamily: "Gilroy"
                  }),
                  menuList: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                    maxHeight: "120px",
                    padding: 0,
                    scrollbarWidth: "thin",
                    overflowY: "auto",
                    fontFamily: "Gilroy"
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


              {floorError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: '14px', marginRight: "5px", marginBottom: "2px" }} />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500, }}>{floorError}</span>
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
              

              <Select
                options={
                  state?.UsersList?.roomdetails?.map((item) => ({
                    value: item.Room_Id,
                    label: item.Room_Name,
                  })) || []
                }
                onChange={(selectedOption) => handleRoom(selectedOption?.value)}
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
                isDisabled={unitAmount && unitAmount.length === 0 && selectedHostel !== ""}
                noOptionsMessage={() => "No rooms available"}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    height: "50px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                    backgroundColor: state.isDisabled ? "#E9ECEF" : "white",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    fontFamily: "Gilroy"
                  }),
                  menuList: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                    maxHeight: "120px",
                    padding: 0,
                    scrollbarWidth: "thin",
                    overflowY: "auto",
                    fontFamily: "Gilroy"
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


              {roomError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: '14px', marginRight: "5px", marginBottom: "2px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{roomError}</span>
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
                  value={reading}
                  onChange={(e) => handleReadingChange(e)}
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
              {readingError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: '14px', marginRight: "5px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{readingError}</span>
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
                  Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div className="datepicker-wrapper" style={{ position: 'relative', width: '100%' }}>
                 
                  <DatePicker
                    style={{ height: 48, width: "100%", cursor: "pointer",fontFamily: "Gilroy" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) => {
                      setSelectedDate(date ? date.toDate() : null);
                      dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
                      setDateError('');
                      setFormError('');
                      setDateErrorMesg('');
                    }}
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                    dropdownClassName="custom-datepicker-popup"
                  />

                </div>
              </Form.Group>
              {dateErrorMesg && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: '14px', marginRight: "5px", marginBottom: "2px" }} />
                  <span style={{ fontSize: '14px', color: 'red', fontFamily: "Gilroy", fontWeight: 500, }}>{dateErrorMesg}</span>
                </div>
              )}
            </div>
          </div>
          {dateError && (
            <div className="d-flex justify-content-center align-items-center mt-2" style={{ color: "red" }}>
              <MdError style={{ fontSize: '14px', marginRight: "6px" }} />
              <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500 }}>{dateError}</span>
            </div>
          )}
        </Modal.Body>
        {formError && (
          <div className="d-flex justify-content-center align-items-center" style={{ color: "red" }}>
            <MdError style={{ fontSize: '14px', marginRight: "6px" }} />
            <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{formError}</span>
          </div>
        )}


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
        <Modal.Footer className="d-flex justify-content-center " style={{ borderTop: "none" }}>
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 7,
            }}
            onClick={handleSaveChanges}
            disabled={!!formError}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
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
            Delete Reading?
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
          Are you sure you want to delete this Reading?
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
            onClick={handleCloseDelete}
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
            onClick={handleDeleteReading}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

EBRoomReading.propTypes = {
  setLoader: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  ebEditPermission: PropTypes.func.isRequired,
  ebpermissionError: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  ebDeletePermission: PropTypes.func.isRequired,
  filterStatus: PropTypes.func.isRequired,
  RoomElect: PropTypes.func.isRequired,
};
export default EBRoomReading;