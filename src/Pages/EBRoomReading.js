import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import squre from "../Assets/Images/New_images/minus-square.png";
import Image from "react-bootstrap/Image";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import Button from "react-bootstrap/Button";
import {ArrowLeft2,ArrowRight2,} from "iconsax-react";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import addcircle from "../Assets/Images/New_images/add-circle.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import Calendars from "../Assets/Images/New_images/calendar.png";
import Form from "react-bootstrap/Form";
import { Room } from "@material-ui/icons";
import { MdError } from "react-icons/md";
import { setISODay } from "date-fns";

function EBRoomReading(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const popupRef = useRef(null);
  const [showDots, setShowDots] = useState("");
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
  const [id,setId]=useState("")
  const [roomId,setRoomId]=useState("")
  const [hostelId,setHostelId] =useState("")
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [ebErrorunit, setEbErrorunit] = useState("");
  const [deleteId, setDeleteId] = useState("");

  // const handleShowDots = (eb_Id) => {
  //   if (activeRow === eb_Id) {
  //     setActiveRow(null);
  //   } else {
  //     setActiveRow(eb_Id);
  //   }
  // };
  const handleShowDots = (eb_Id) => {
  setActiveRow((prevActiveRow) => (prevActiveRow === eb_Id ? null : eb_Id)); // Toggle the activeRow
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveRow(null);  // Close the menu if clicked outside
    }
  };

  // Add event listener for detecting clicks outside the popup
  document.addEventListener("mousedown", handleClickOutside);

  // Cleanup the event listener when the component unmounts
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
 
  useEffect(()=>{
    setHostelId(state.login.selectedHostel_Id);
  },[state.login.selectedHostel_Id])
  

  const handleReadingChange = (e) => {
    setReading(e.target.value);
    setReadingError('')
    setFormError('')
    setEbErrorunit("");
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY"}); 
  };
  useEffect(() => {
    const FilterEbAmount = state.Settings.EBBillingUnitlist.eb_settings?.filter(
      (item) => item.hostel_id == hostelId
    );
    setUnitAmount(FilterEbAmount);
    if (Array.isArray(FilterEbAmount) && FilterEbAmount.length > 0) {
      setUnitAmount(FilterEbAmount[0]?.amount);
    } else {
      console.log("unitAmount is not a valid array or is empty.");
    }
  }, [state.Settings.EBBillingUnitlist.eb_settings, hostelId]);




  
  useEffect(() => {
    setDateError(state?.PgList?.ebEditError);
   
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
  const handleRoom = (e) => {
    setRooms(e.target.value);
    setRoomError("");
    setFormError("");
    setEbErrorunit("");
  };
  const handleFloor = (e) => {
    setFloor(e.target.value);
    setRooms("");
    setfloorError("");
    setFormError("");
    setRoomId("")
    setEbErrorunit("");
  };
  const handleClose = () => {
    setebEditShow(false);
    setFormError("");
    setEbErrorunit("");
  };
  const handleDateChange = (date) => {
    
    setSelectedDate(date);
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY"}); 
    setDateError('');  
    setEbErrorunit(''); 
    setFormError("")
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
  useEffect(()=>{
    if(props.selectedHostel){
      dispatch({ type: "EBSTARTMETERLIST", payload: {hostel_id:hostelId}});
    }
  },[hostelId])

useEffect(()=>{
    if (state.PgList?.statusCodeForEbRoomList === 200) {
      setelectricityFilterddata(state.PgList?.EB_startmeterlist);
     
      setTimeout(() => {
        dispatch({ type: "CLEAR_EB_STARTMETER_LIST"});
      }, 1000);
    }
  },[state.PgList.statusCodeForEbRoomList])




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
    const formattedJoiningDate = item.date ? new Date(item.date) : null;
    setSelectedDate(formattedJoiningDate);
    setId(item.eb_Id)
    setRoomId(item.Room_Id) 
    setHostelId(item.hostel_Id)



    setInitialStateAssign({
      selectedHostel: item.hostel_Id || "",
      Floor: item.floor_id || "",
      Rooms: item.room_id || "",
      reading: item.reading || "",
      selectedDate: formattedJoiningDate || "",
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
          setReadingError("reading is required");
          break;
          case "Floor":
            setfloorError("Floor is required");
            break;
          case "Rooms":
            setRoomError("Rooms is required");
            break;
        case "selectedDate":
          setDateError("Date is required");
          break;

        default:
          break;
      }
      return false;
    }

    // Clear the error if value is valid
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
        setDateError("");
        break;
      default:
        break;
    }

    return true;
  };
  const handleSaveChanges = () => {
    const isreadingValid = validateAssignField(reading, "reading");
    const isDatevalid = validateAssignField(selectedDate, "selectedDate");
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");



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
    // if (!isreadingValid || !isDatevalid) {
    //   return;
    // }
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
    : selectedDate !== initialStateAssign.selectedDate)  ||
    String(reading) !== String(initialStateAssign.reading) 

   

    if (!isChangedBed) {
      setFormError("No changes detected.");
      return;
    } else {
      setFormError("");
    }

    let formattedDate = null;
try {
  let date = new Date(selectedDate);
  date.setDate(date.getDate() + 1); // Add 1 day
  formattedDate = date.toISOString().split("T")[0];
} catch (error) {
  setDateError("Date is required.");
  return;
}
    dispatch({
      type: "EDITELECTRICITY",
      payload: {
        hostel_id: hostelId,
        floor_id: Floor,
        room_id: Rooms, 
        reading: reading,
        date : formattedDate,
        id:id
      },
    });

  };

  // const electricityrowsPerPage = 5;
  const [electricityrowsPerPage, setElectricityrowsPerPage] = useState(10);
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

  const handlePageChange = (pageNumber) => {
    setelectricitycurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setElectricityrowsPerPage(Number(event.target.value));
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

  // useEffect(() => {
  //   setelectricityFilterddata(state.PgList?.EB_startmeterlist);
  // }, [state.PgList?.EB_startmeterlist]);


  const handleDeleteReading =()=>{
    dispatch({
      type: "DELETEECTRICITY",
      payload: {
        id:deleteId
      },
    });

  }

  useEffect(()=>{
    if(state.PgList.statusCodeForEditElectricity === 200 || state.PgList.statusCodeForDeleteElectricity === 200){
      handleCloseDelete()
      handleClose()
      dispatch({ type: "EBSTARTMETERLIST", payload: {hostel_id:hostelId}});
      dispatch({ type: "CUSTOMEREBLIST",payload: { hostel_id:hostelId}});
    
      setTimeout(() => {
      dispatch({ type: "CLEAR_EDIT_ELECTRICITY" });
     }, 200);

      

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ELECTRICITY" });
      }, 200);
    
    }
    },[state.PgList.statusCodeForEditElectricity , state.PgList.statusCodeForDeleteElectricity])

    useEffect(()=>{
      if (state.PgList?.statusCodeForEbRoomList === 200) {
        setTimeout(() => {
          dispatch({ type: "CLEAR_EB_STARTMETER_LIST"});
        }, 200);
      }
    },[state.PgList.statusCodeForEbRoomList])


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
          // disabled={edit}
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

// useEffect(()=>{
// if(state.PgList.statusCodeForEditElectricity === 200){
//   handleClose()
//   dispatch({ type: "EBSTARTMETERLIST", payload: {hostel_id: props.selectedHostel}})
//   dispatch({ type: "CUSTOMEREBLIST",payload: { hostel_id:props.selectedHostel}})
  
//   setTimeout(() => {
//     dispatch({ type: "CLEAR_EDIT_ELECTRICITY" });
//   }, 200);

// }
// },[state.PgList.statusCodeForEditElectricity])

  return (

    
    <>
    {
      props.ebpermissionError?(
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
      src={emptyimg}
      alt="Empty State"
      style={{ maxWidth: "100%", height: "auto" }}
    />

    {/* Permission Error */}
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
        <MdError  />
        <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{props.ebpermissionError}</span>
      </div>
    )}
  </div>
      ):
      <>
      <div>
        {currentRowelectricity.length > 0 && (
          <div 
           style={{
            // height: "400px",
            height: currentRowelectricity.length >= 6 ? "400px" : "auto",
            overflowY: "auto",
            borderRadius: "24px",
            border: "1px solid #DCDCDC",
            // borderBottom:"none"
          }}>
          <Table
             responsive="md"
             className="Table_Design"
             style={{ border: "1px solid #DCDCDC",borderBottom:"1px solid transparent",borderEndStartRadius:0,borderEndEndRadius:0}}
          >
            <thead
              style={{
                color: "gray",
                fontSize: "11px",
                backgroundColor: "#E7F1FF",
                position:"sticky",
                top:0,
                zIndex:1,
              }}
            >
              <tr style={{ height: "30px" }}>
               
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
                  Room no
                </th>
                {/* <th
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
                </th> */}
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
                  Reading
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
                  Dated
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
                  // let Dated = new Date(v.date);
                  // let Dated = v.date ? new Date(v.date) : new Date(v.initial_date); 
                  // let day = Dated.getDate();
                  // let month = Dated.getMonth() + 1;
                  // let year = Dated.getFullYear();
                  // let formattedDate = `${day}/${month}/${year}`;

                  let formattedDate;

// Check if v.date exists and is not "00-00-00"
if (v.date && v.date != '0000-00-00') {
    let Dated = new Date(v.date);
    let day = Dated.getDate();
    let month = Dated.getMonth() + 1;
    let year = Dated.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
} else {
    // Use a default initial date if v.date is empty or "00-00-00"
    let initialDate = new Date(v.initial_date); // Set your default initial date here
    let day = initialDate.getDate();
    let month = initialDate.getMonth() + 1;
    let year = initialDate.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
}



                  return (
                    <tr key={v.id}>
                      <td
                        style={{
                          border: "none",
                          padding: "10px",
                          textAlign: "center",
                          verticalAlign: "middle", // Center vertically
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {v.hoatel_Name}
                          </span>
                        </div>
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
                        {v.reading}
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
                          {formattedDate}
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
                        {v.total_reading}
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
                        {v.total_amount}
                      </td>
                      <td style={{ paddingTop: 12, border: "none" }}>

                        <div
                          style={{
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderRadius: 100,
                            border: "1px solid #EFEFEF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            zIndex: 1000,
                          }}
                          onClick={() => handleShowDots(v.eb_Id)}
                        >
                          <PiDotsThreeOutlineVerticalFill
                            style={{ height: 20, width: 20 }}
                          />
                          {activeRow === v.eb_Id && (
                            <>
                              <div
                                ref={popupRef}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#fff",
                                  position: "absolute",
                                  right: 50,
                                  top: 20,
                                  width: 163,
                                  height: "auto",
                                  border: "1px solid #EBEBEB",
                                  borderRadius: 10,
                                  display: "flex",
                                  justifyContent: "start",
                                  padding: 10,
                                  alignItems: "center",
                                  zIndex: showDots ? 1000 : "auto",
                                }}
                              >
                                <div
                                  style={{ backgroundColor: "#fff" }}
                                  className=""
                                >
                                  <div
  className={"mb-3 d-flex justify-content-start align-items-center gap-2"}
  style={{
    // backgroundColor: props.ebEditPermission ? "#f9f9f9" : "#fff",
    cursor: props.ebEditPermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!props.ebEditPermission) {
      handleEditRoomReading(v);
    }
  }}
>
  <img
    src={Edit}
    style={{
      height: 16,
      width: 16,
      filter: props.ebEditPermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
    }}
    alt="Edit"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy, sans-serif",
      color: props.ebEditPermission ? "#ccc" : "#222222", 
      cursor: props.ebEditPermission ? "not-allowed" : "pointer",
    }}
  >
    Edit
  </label>
</div>



<div
  className={"mb-2 d-flex justify-content-start align-items-center gap-2"}
  style={{
    // backgroundColor: props.ebDeletePermission ? "#f9f9f9" : "#fff",
    cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!props.ebDeletePermission) {
      handleDeleteShow(v);
    }
  }}
>
  <img
    src={Delete}
    style={{
      height: 16,
      width: 16,
      filter: props.ebDeletePermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
    }}
    alt="Delete"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy, sans-serif",
      color: props.ebDeletePermission ? "#ccc" : "#FF0000", // Change text color if disabled
      cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
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

                        {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          </div>
        )}

        {currentRowelectricity?.length === 0 && (
          <div  style={{marginTop:40}}>
            <div style={{ textAlign: "center" }}>
              <img src={emptyimg} width={240} height={240} alt="emptystate" />
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
              No room readings{" "}
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
              There are no room readings available.{" "}
            </div>

           
          </div>
        )}
      </div>

      {currentRowelectricity.length > 0 && (
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
                                             
                                                 {/* Current Page Indicator */}
                                                 <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                                                   {electricitycurrentPage} of {totalPagesinvoice}
                                                 </li>
                                             
                                                 {/* Next Button */}
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
     

        <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Edit Reading
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
                   <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{floorError}</span> 
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
                  <MdError />
                 <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{readingError}</span> 
                </div>
              )}
            </div>
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
                  Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
         {formError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                   <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{formError}</span> 
                  </div>
                )}
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
        style={{
          width: 388,
          height: 250,
          marginLeft: "500px",
          marginTop: "200px",
        }}
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}
          >
            Delete RoomReading?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Are you sure you want to delete this RoomReading?
        </Modal.Body>

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              marginRight: 10,
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
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
export default EBRoomReading;
