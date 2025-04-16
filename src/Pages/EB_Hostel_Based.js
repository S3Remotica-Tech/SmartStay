/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import Button from "react-bootstrap/Button";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
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
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { ArrowUp2, ArrowDown2} from 'iconsax-react';
import {CloseCircle} from "iconsax-react";

function EBHostelReading(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const popupRef = useRef(null);
  const [activeRow, setActiveRow] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("");
  const [hos_Name, setHos_Name] = useState("");
  const [reading, setReading] = useState("");
  const [readingError, setReadingError] = useState("");
  const [formError, setFormError] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [hosteldeleteId, setHostelDeleteId] = useState("");
  
  const [editId, setEditId] = useState("");
  const [deleteForm, setDeleteForm] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [dateErrorMesg,setDateErrorMesg] = useState("")
const [hostelEbList,setHostelEbList] = useState("")

 useEffect(() => {
   
    props.setLoader(true)
    dispatch({
      type: "HOSTELBASEDEBLIST",
      payload: { hostel_id: selectedHostel },
    });
   
    
  }, [selectedHostel]);

 useEffect(() => {
      if (state.PgList.getStatusCodeForHostelBased === 200) {
        props.setLoader(false)
        setHostelEbList(
          state?.PgList?.getHostelBasedRead?.hostel_readings
        );
        
        setTimeout(() => {
          dispatch({ type: "CLEAR_EB_CUSTOMER_HOSTEL_EBLIST" });
        }, 200);
      }
    }, [state.PgList.getStatusCodeForHostelBased]);


    useEffect(() => {
        if (state.PgList.nostatusCodeforEbHostelBased === 201) {
          props.setLoader(false)
          setTimeout(() => {
            dispatch({ type: "CLEAR_NO_EB_HOSTEL_BASED" });
          }, 200);
        }
      }, [state.PgList.nostatusCodeforEbHostelBased]);

  const handleShowActive = (eb_Id, event) => {
    if (activeRow === eb_Id) {
      setActiveRow(null);
    } else {
      setActiveRow(eb_Id);
    }

    const { top, left,height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });

  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveRow(null); // Close the menu if clicked outside
      }
    };

    // Add event listener for detecting clicks outside the popup
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 

  const handleDeleteEb = (item) => {
    setDeleteForm(true);
    setHostelDeleteId(item.eb_Id);
  };
  const handleCloseDelete = () => {
    setDeleteForm(false);
  };
//  useEffect(() => {
//     dispatch({
//       type: "CUSTOMEREBLIST",
//       payload: { hostel_id: state.login.selectedHostel_Id },
//     });
   
//   }, [state.login.selectedHostel_Id]);
  const handlehosetelDelete = () => {
    dispatch({
      type: "HOSTELBASEDDELETEEB",
      payload: { id: hosteldeleteId },
    });
  };
console.log("state.PgList.statusCodeForDeleteHostelBased",state.PgList.statusCodeForDeleteHostelBased)
  useEffect(() => {
    if (state.PgList.statusCodeForDeleteHostelBased === 200) {
      handleCloseDelete();
      // dispatch({ type: "EBSTARTMETERLIST" });
      dispatch({
        type: "HOSTELBASEDEBLIST",
        payload: { hostel_id: selectedHostel },
      });
      dispatch({
        type: "CUSTOMEREBLIST",
        payload: { hostel_id: selectedHostel },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_HOSTEL_BASED" });
      }, 200);

    }
  }, [state.PgList.statusCodeForDeleteHostelBased]);

  const handleEditEb = (user) => {
    props.setEditEb(true);
    props.setHostelBasedForm(true);
    setHos_Name(user.hoatel_Name);
    setReading(user.reading);
    setSelectedHostel(selectedHostel);
    setEditId(user.eb_Id);
 setSelectedDate(user.date || "");
          // const formattedJoiningDate = item.joining_date
          //   ? new Date(item.joining_date)
          //   : null;
          // setJoiningDate(formattedJoiningDate);
          setSelectedDate(
            user.date ? moment(user.date).toDate("") : null
          );

    setInitialStateAssign({
      // hos_Name: user.hoatel_Name || "",
      reading: user.reading || "",
      selectedDate: user.date || "",
    });
  };

 
  useEffect(() => {
    setDateError(state.PgList.dateAlready);
  }, [state.PgList.dateAlready]);

  useEffect(() => {
    if (props.editeb) {
      setDateError(state.PgList.editDateAlready);
    }
  }, [state.PgList.editDateAlready]);

  useEffect(() => {
    setSelectedHostel(state.login.selectedHostel_Id);
    setHos_Name(props.hostelName);
  }, [props, state.login.selectedHostel_Id]);



  const handleReadingChange = (e) => {
    const newReading = e.target.value;
    if (!/^\d*$/.test(newReading)) {
      return; 
    }
    setReading(newReading);
    setReadingError("");
    setFormError("");
    setDateError("")
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
        case "Hostel ID":
          setHostelIdError("Hostel is Required");
          break;
        case "selectedDate":
          setDateErrorMesg("Date is Required");
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
      case "Hostel ID":
        setHostelIdError("");
        break;
      case "selectedDate":
        setDateErrorMesg("");
        break;
      default:
        break;
    }

    return true;
  };

  const [initialStateAssign, setInitialStateAssign] = useState({
    // hos_Name: "",
    reading: "",
    selectedDate: "",
  });
  const handleSaveEb = () => {
    // Validate fields
    const isReadingValid = validateAssignField(reading, "reading");
    const isDateValid = validateAssignField(selectedDate, "selectedDate");
    const isHostelValid = validateAssignField(hos_Name, "Hostel ID");

    if (!isReadingValid || !isDateValid || !isHostelValid) {
      return;
    }

    
    const isValidDate = (date) => !isNaN(Date.parse(date));
    const formattedDated = moment(selectedDate).format("YYYY-MM-DD");
    if (props.editeb && editId) {
      
      const isChangedBed =
        (isValidDate(selectedDate) &&
          isValidDate(initialStateAssign.selectedDate)
          ? new Date(selectedDate).toISOString().split("T")[0] !==
          new Date(initialStateAssign.selectedDate)
            .toISOString()
            .split("T")[0]
          : selectedDate !== initialStateAssign.selectedDate) ||
        String(reading) !== String(initialStateAssign.reading);

      if (!isChangedBed) {
        setFormError("No Changes Detected");
        return;
      }

      setFormError("");

      // Dispatch edit action
      dispatch({
        type: "HOSTELBASEDEDITEB",
        payload: {
          hostel_id: selectedHostel,
          reading: reading,
          date: formattedDated, // Use formatted date
          id: editId,
        },
      });
    } else {
      // Dispatch add action
      dispatch({
        type: "HOSTELBASEDADDEB",
        payload: {
          hostel_id: selectedHostel,
          reading: reading,
          date: formattedDated, // Use formatted date
        },
      });
    }
  };

  // const handleSaveEb = () => {
  //   const isreadingValid = validateAssignField(reading, "reading");
  //   const isDatevalid = validateAssignField(selectedDate, "selectedDate");
  //   const isHostelValid = validateAssignField(hos_Name, "Hostel ID");

  //   if (!isHostelValid || !isreadingValid || !isDatevalid) {
  //     return;
  //   }
  //   const incrementDateAndFormat = (date) => {
  //     const newDate = new Date(date);
  //     if (isNaN(newDate.getTime())) {
  //       // Handle invalid date
  //       return "";
  //     }
  //     newDate.setDate(newDate.getDate() + 1); // Increment the date by 1
  //     const year = newDate.getFullYear();
  //     const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits for month
  //     const day = String(newDate.getDate()).padStart(2, "0"); // Ensure 2 digits for day
  //     return `${year}-${month}-${day}`; // Format to YYYY-MM-DD
  //   };

  //   const formattedDate = selectedDate
  //     ? incrementDateAndFormat(selectedDate)
  //     : "";

  //   if (editeb && editId) {
  //     const isValidDate = (date) => {
  //       return !isNaN(Date.parse(date));
  //     };

  //     const isChangedBed =
  //       (isValidDate(selectedDate) && isValidDate(selectedDate)
  //         ? new Date(selectedDate).toISOString().split("T")[0] !==
  //           new Date(initialStateAssign.selectedDate)
  //             .toISOString()
  //             .split("T")[0]
  //         : selectedDate !== selectedDate) ||
  //       String(reading) !== String(initialStateAssign.reading);

  //     if (!isChangedBed) {
  //       setFormError("No changes detected.");
  //       return;
  //     } else {
  //       setFormError("");
  //     }

  //     dispatch({
  //       type: "HOSTELBASEDEDITEB",
  //       payload: {
  //         hostel_id: selectedHostel,
  //         reading: reading,
  //         date: formattedDate, // Use the formatted date here
  //         id: editId,
  //       },
  //     });
  //   }

  //   // For adding a new entry
  //   dispatch({
  //     type: "HOSTELBASEDADDEB",
  //     payload: {
  //       hostel_id: selectedHostel,
  //       reading: reading,
  //       date: formattedDate, // Use the formatted date here as well
  //     },
  //   });
  // };

  useEffect(() => {
    if (state.PgList.statusCodeForAddHostelBased === 200) {
      handleCloseHostel();
      
      dispatch({
        type: "CUSTOMEREBLIST",
        payload: { hostel_id: selectedHostel },
      });
      dispatch({
        type: "HOSTELBASEDEBLIST",
        payload: { hostel_id: selectedHostel },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_HOSTEL_BASED" });
      }, 200);
    }
  }, [state.PgList.statusCodeForAddHostelBased]);

  useEffect(() => {
    if (state.PgList.statusCodeForEditHostelBased === 200) {
      handleCloseHostel();
      props.setEditEb(false);
      // dispatch({ type: "EBSTARTMETERLIST" });
      dispatch({
        type: "HOSTELBASEDEBLIST",
        payload: { hostel_id: selectedHostel },
      });
      dispatch({
        type: "CUSTOMEREBLIST",
        payload: { hostel_id: selectedHostel },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_HOSTEL_BASED" });
      }, 200);
    }
  }, [state.PgList.statusCodeForEditHostelBased]);

  const handleCloseHostel = () => {
    props.setHostelBasedForm(false);
    setReading("");
    setSelectedDate("");
    setDateError("");
    setReadingError("");
    setFormError("");
    setDateError("");
    setEditId("")
    setDateErrorMesg("")
  };


  //  const electricityrowsPerPage = 5;
  const [electricityrowsPerPage, setElectricityrowsPerPage] = useState(5);
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  // const [electricityFilterddata, setelectricityFilterddata] = useState([]);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;
  const currentRowelectricity = hostelEbList?.slice(
    indexOfFirstRowelectricity,
    indexOfLastRowelectricity
  );

  // const handleElectricityPageChange = (InvoicepageNumber) => {
  //   setelectricitycurrentPage(InvoicepageNumber);
  // };
  const handlePageChange = (pageNumber) => {
    setelectricitycurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setElectricityrowsPerPage(Number(event.target.value));
    setelectricitycurrentPage(1)
  };

  const totalPagesinvoice = Math.ceil(
    hostelEbList?.length / electricityrowsPerPage
  );



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
  //   setelectricityFilterddata(state?.PgList?.getHostelBasedRead?.hostel_readings);
  // }, [state?.PgList?.getHostelBasedRead?.hostel_readings]);

 

 
  return (
    <>
      <div>
        {props.value === "3" &&   sortedData?.length > 0 ? (
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
                            height: currentRowelectricity.length >= 8 || sortedData.length >= 8 ? "500px" : "auto",
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
                                <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500 }}> <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("hoatel_Name", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("hoatel_Name", 'desc')} style={{ cursor: "pointer" }} />
                                </div>  Paying Guest</div>  </th>
          
                                {/* <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }} > <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'desc')} style={{ cursor: "pointer" }} />
                                </div> Floor</div></th>
          
                                <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}> <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Room_Id", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Room_Id", 'desc')} style={{ cursor: "pointer" }} />
                                </div> Room no </div> </th> */}
          
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
                              {   sortedData && sortedData.length > 0 && (
                                      <>
                                        {sortedData.map((v) => {


          
                  let formattedDate;

                  // Check if v.date exists and is not "00-00-00"
                  if (v.date && v.date !== '0000-00-00') {
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
                    <tr key={v.eb_Id}>

                      <td
                        style={{
                          border: "none",
                          padding: "10px",
                          textAlign: "start",
                          verticalAlign: "middle",
                          paddingLeft:"25px"
                        }}
                      >
                        <div
                         
                        >
                          {/* <Image
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
                          /> */}
                          <span
                            style={{
                              fontSize: 13, 
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {v.hoatel_Name}
                          </span>
                        </div>
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
                        {v.reading}
                      </td>
                      <td
                        style={{
                          textAlign: "start",
                          verticalAlign: "middle",
                          borderBottom: "none",
                          fontSize: 13, 
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                      
                        
                          {formattedDate}
                        {/* </span> */}
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
                        {v.total_reading}
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
                        {v.total_amount}
                      </td>
                      <td  style={{
                      textAlign: "start",
                      color: "#939393",
                      fontSize: 13, 
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      // borderTopRightRadius: 24,
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
                          // zIndex: 1000,
                          // zIndex:activeRow === v.eb_Id? 1000: "auto",
                          backgroundColor: activeRow === v.eb_Id  ? "#E7F1FF"  : "white",
                        }}
                          onClick={(e) => handleShowActive(v.eb_Id, e)}
                        >
                          <PiDotsThreeOutlineVerticalFill
                            style={{ height: 20, width: 20,color:"#000000"}}
                          />
                          {activeRow === v.eb_Id && (
                            <div
                              ref={popupRef}
                              style={{
                                cursor: "pointer",
                                backgroundColor: "#f9f9f9",
                                position: "fixed",
                                top: popupPosition.top,
                                left: popupPosition.left,
                                // position: "absolute",
                                // right: 50,
                                // top: 20,
                                width: 120,
                                height: "auto",
                                border: "1px solid #EBEBEB",
                                borderRadius: 10,
                                display: "flex",
                                justifyContent: "start",
                                padding: 10,
                                alignItems: "center",
                                zIndex: 1000 ,
                              }}
                            >
                              <div>
                                <div
                                  className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleEditEb(v)}
                                >
                                  <img
                                    src={Edit}
                                    style={{
                                      height: 16,
                                      width: 16,
                                      filter: props.ebEditPermission
                                        ? "grayscale(100%)"
                                        : "none",
                                    }}
                                    alt="Edit"
                                  />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy, sans-serif",
                                      cursor: "pointer",
                                      color:"#000000"
                                    }}
                                  >
                                    Edit
                                  </label>
                                </div>
                                <div
                                  className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleDeleteEb(v)}
                                >
                                  <img
                                    src={Delete}
                                    style={{
                                      height: 16,
                                      width: 16,
                                    }}
                                    alt="Delete"
                                  />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy, sans-serif",
                                      cursor: "pointer",
                                      color:"#000000"
                                    }}
                                  >
                                    Delete
                                  </label>
                                </div>
                              </div>
                            </div>
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
          
          
                      )}

        

          </>
        ) :
         props.value === "3"  && !props.loading && currentRowelectricity  && currentRowelectricity?.length === 0 ? (
          <div>
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
              No hostel readings
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
              There are no Hostel readings available.
            </div>

          </div>
        ) : null}
      </div>

      { props.loading &&
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


      {props.value === "3" && props.electricityHostel?.length >= 5 && (
        <nav
        className="pagination-container"
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
                  cursor:
                    electricitycurrentPage === 1 ? "not-allowed" : "pointer",
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
                <ArrowLeft2
                  size="16"
                  color={electricitycurrentPage === 1 ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>

            {/* Current Page Indicator */}
            <li
              style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
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
                onClick={() => handlePageChange(electricitycurrentPage + 1)}
                disabled={electricitycurrentPage === totalPagesinvoice}
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

      <Modal
        show={props.hostelBasedForm}
        onHide={() => handleCloseHostel()}
        backdrop="static"
        centered
      >
        {/* <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header> */}

        <Modal.Header style={{ marginBottom: "10px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
          {/* {editeb ? "Edit Hostel Readig":"Add Hostel Reading"}   */}
          {props.editeb ? "Edit Hostel Reading" : "Add Hostel Reading"}
          </div>
          {/* <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleCloseHostel}
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
          <CloseCircle size="24" color="#000" onClick={handleCloseHostel} 
            style={{ cursor: 'pointer' }}/>
        </Modal.Header>
        <Modal.Body style={{marginTop:"-13px"}}>
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
                  value={hostelId}
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
            {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
              </div> */}

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Hostel Name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="6542310"
                  value={hos_Name}
                  //   onChange={(e) => handleReadingChange(e)}
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
              {hostelIdError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {hostelIdError}
                  </span>
                </div>
              )}

              {/* {readingError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {readingError}
                  </div>
                )} */}
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
                  <MdError />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginLeft:5
                    }}
                  >
                    {" "}
                    {readingError}
                  </span>
                </div>
              )}
              {/* {readingError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {readingError}
                </div>
              )} */}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group  controlId="purchaseDate">
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
                
                  <div
                                                                  className="datepicker-wrapper"
                                                                  style={{ position: "relative", width: "100%" }}
                                                                >
                                                                 <DatePicker
                                                                   style={{ height: 48,width: "100%",cursor:"pointer" }}
                                                                   format="DD/MM/YYYY"
                                                                     placeholder="DD/MM/YYYY"
                                                                   value={selectedDate ? dayjs(selectedDate) : null}
                                                                   onChange={(date) => {
                                                                    setSelectedDate(date ? date.toDate() : null);
                                                                    dispatch({ type: "CLEAR_SAME_DATE_ALREADY" });
                                                                    dispatch({ type: "CLEAR_EDIT_SAME_DATE_ALREADY" });
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
                  <MdError />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginLeft:5
                    }}
                  >
                    {" "}
                    {dateErrorMesg}
                  </span>
                </div>
              )}
            </div>
          </div>

          {dateError && (
              <div className="d-flex justify-content-center align-items-center mt-2" style={{ color: "red" }}>
              <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
              <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500}}>{dateError}</span>
            </div>
              )}
        </Modal.Body>
         {formError && (
                                                                <div className="d-flex justify-content-center align-items-center" style={{ color: "red" }}>
                                                                  <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
                                                                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500}}>{formError}</span>
                                                                </div>
                                                              )}
        <Modal.Footer className="d-flex justify-content-center" style={{border:"none"}}>
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12 w-100"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 10,
            }}
            onClick={handleSaveEb}
          // disabled={!!formError}
          >
            {/* Save Changes */}
            {props.editeb ? "Save Changes" : "Add Reading"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* delete */}
      <Modal
        show={deleteForm}
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
            onClick={handlehosetelDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


EBHostelReading.propTypes = {
  electricityHostel: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired,
  editeb: PropTypes.func.isRequired,
  setEditEb: PropTypes.func.isRequired,
  ebEditPermission: PropTypes.func.isRequired,
  hostelBasedForm: PropTypes.func.isRequired,
  hostelName: PropTypes.func.isRequired,
  setHostelBasedForm: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
}
export default EBHostelReading;