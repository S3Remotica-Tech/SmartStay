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
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import { CloseCircle } from "iconsax-react";

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
  const [formLoading, setFormLoading] = useState(false)
  const [editId, setEditId] = useState("");
  const [deleteForm, setDeleteForm] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [dateErrorMesg, setDateErrorMesg] = useState("")
  const [hostelEbList, setHostelEbList] = useState("")

  useEffect(() => {
    if (selectedHostel) {
      props.setLoader(true)
      dispatch({
        type: "HOSTELBASEDEBLIST",
        payload: { hostel_id: selectedHostel },
      });
    }


  }, [selectedHostel]);
  useEffect(() => {
    if (props.value === "3" && state.login.selectedHostel_Id) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, [state.login.selectedHostel_Id])

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
  const [showAbove, setShowAbove] = useState(false);

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;


      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);



  const handleDeleteEb = (item) => {
    setDeleteForm(true);
    setHostelDeleteId(item.eb_Id);
  };
  const handleCloseDelete = () => {
    setDeleteForm(false);
  };

  const handlehosetelDelete = () => {
    dispatch({
      type: "HOSTELBASEDDELETEEB",
      payload: { id: hosteldeleteId },
    });
  };

  useEffect(() => {
    if (state.PgList.statusCodeForDeleteHostelBased === 200) {
      handleCloseDelete();

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

    setSelectedDate(
      user.date ? moment(user.date).toDate("") : null
    );

    setInitialStateAssign({

      reading: user.reading || "",
      selectedDate: user.date || "",
    });
  };





  useEffect(() => {
    if (state.PgList.dateAlready) {
      setFormLoading(false)
      setDateError(state.PgList.dateAlready);
    }
  }, [state.PgList.dateAlready]);

  useEffect(() => {
    if (props.editeb) {
      setFormLoading(false)
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

    reading: "",
    selectedDate: "",
  });
  const handleSaveEb = () => {
    dispatch({ type: "CLEAR_ADD_HOSTEL_BASED" });
    dispatch({ type: "CLEAR_SAME_DATE_ALREADY" });
    dispatch({ type: "CLEAR_EDIT_SAME_DATE_ALREADY" });
    const isReadingValid = validateAssignField(reading, "reading");
    const isDateValid = validateAssignField(selectedDate, "selectedDate");
    const isHostelValid = validateAssignField(hos_Name, "Hostel ID");

    if (!isReadingValid || !isDateValid || !isHostelValid) {
      return;
    }



    const formattedDated = moment(selectedDate).format("YYYY-MM-DD");
    if (props.editeb && editId) {

      const isChangedBed =
        (moment(selectedDate).isValid() &&
          moment(initialStateAssign.selectedDate).isValid()
          ? !moment(selectedDate).isSame(moment(initialStateAssign.selectedDate), "day")
          : selectedDate !== initialStateAssign.selectedDate) ||
        String(reading) !== String(initialStateAssign.reading);


      if (!isChangedBed) {
        setFormError("No Changes Detected");
        return;
      }

      setFormError("");


      dispatch({
        type: "HOSTELBASEDEDITEB",
        payload: {
          hostel_id: selectedHostel,
          reading: reading,
          date: formattedDated,
          id: editId,
        },
      });
      setFormLoading(true)
    } else {

      dispatch({
        type: "HOSTELBASEDADDEB",
        payload: {
          hostel_id: selectedHostel,
          reading: reading,
          date: formattedDated,
        },
      });
      setFormLoading(true)
    }
  };



  useEffect(() => {
    if (state.PgList.statusCodeForAddHostelBased === 200) {
      setFormLoading(false)
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
      setFormLoading(false)
      handleCloseHostel();
      props.setEditEb(false);

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
    dispatch({ type: "CLEAR_SAME_DATE_ALREADY" });

  };



  const [electricityrowsPerPage, setElectricityrowsPerPage] = useState(10);
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;

  const dataSource = props.filterStatus ? props.electricityHostel : hostelEbList;

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

      {
        props.ebpermissionError ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 96

            }}
          >

            <img
              src={emptyimg}
              alt="Empty State"

            />


            {props.ebpermissionError && (



              <div
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "16px",
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
                  {props.ebpermissionError}
                </span>
              </div>
            )}
          </div>
        ) : <>

          <div>

            {props.value === "3" && sortedData?.length > 0 ? (
              <>
                {props.value === "3" && sortedData && sortedData.length > 0 && (

                  <div
                    className="p-0 booking-table-userlist  booking-table ms-2 me-4"
                    style={{ paddingBottom: "20px", marginLeft: "-22px" }}
                  >



                    <div
                      className='show-scrolls'
                      style={{

                        height: sortedData.length >= 8 || sortedData.length >= 8 ? "440px" : "auto",
                        overflow: "auto",
                        borderTop: "1px solid #E8E8E8",
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
                                  formattedDate = `${day}/${month}/${year}`;
                                }


                                return (
                                  <tr key={v.eb_Id}>

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
                                          marginLeft: 10
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
                                        verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"

                                      }}
                                      className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                    >
                                      <div style={{ marginLeft: 5 }}>{v.reading}</div>
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
                                        borderBottom: "1px solid #E8E8E8"
                                      }}
                                      className="ps-0 ps-sm-0 ps-md-1 ps-lg-1"
                                    >
                                      <span
                                        style={{
                                          paddingTop: "5px",
                                          paddingLeft: "16px",
                                          paddingRight: "16px",
                                          paddingBottom: "5px",
                                          borderRadius: "60px",
                                          marginLeft: 2,
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
                                        verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"
                                      }}
                                      className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                    >
                                      <div style={{ marginLeft: 6 }}>{v.total_reading}</div>

                                    </td>
                                    <td
                                      style={{
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        textAlign: "start",
                                        verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"
                                      }}
                                      className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                    >

                                      <div style={{ marginLeft: 6 }}>₹{v.total_amount}</div>
                                    </td>
                                    <td style={{
                                      textAlign: "start",
                                      color: "#939393",
                                      fontSize: 13,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"
                                    }}

                                    >
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
                                        onClick={(e) => handleShowActive(v.eb_Id, e)}
                                      >
                                        <PiDotsThreeOutlineVerticalFill
                                          style={{ height: 20, width: 20, color: "#000000" }}
                                        />
                                        {activeRow === v.eb_Id && (
                                          <div
                                            ref={popupRef}
                                            style={{
                                              cursor: "pointer",
                                              backgroundColor: "#f9f9f9",
                                              position: "fixed",

                                              top: showAbove
                                                ? popupPosition.top - (popupRef.current?.offsetHeight || 200) - 10
                                                : popupPosition.top - 25,
                                              left: popupPosition.left,

                                              width: 120,
                                              height: "auto",
                                              border: "1px solid #EBEBEB",
                                              borderRadius: 10,
                                              display: "flex",
                                              justifyContent: "start",

                                              alignItems: "center",
                                              zIndex: 1000,
                                            }}
                                          >
                                            <div style={{ width: "100%", }}>
                                              <div
                                                className="d-flex justify-content-start align-items-center gap-2"
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: 6,
                                                  padding: "8px 12px",
                                                  width: "100%",
                                                  transition: "background-color 0.2s ease",
                                                }}
                                                onMouseEnter={(e) =>
                                                  (e.currentTarget.style.backgroundColor = "#F0F0F0")
                                                }
                                                onMouseLeave={(e) =>
                                                  (e.currentTarget.style.backgroundColor = "transparent")
                                                }
                                                onClick={() => handleEditEb(v)}
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
                                                    color: "#222",
                                                  }}
                                                >
                                                  Edit
                                                </label>
                                              </div>

                                              <div
                                                className="d-flex justify-content-start align-items-center gap-2"
                                                style={{
                                                  cursor: "pointer",
                                                  borderRadius: 6,
                                                  padding: "8px 12px",
                                                  transition: "background-color 0.2s ease",
                                                }}
                                                onMouseEnter={(e) =>
                                                  (e.currentTarget.style.backgroundColor = "#FFF0F0")
                                                }
                                                onMouseLeave={(e) =>
                                                  (e.currentTarget.style.backgroundColor = "transparent")
                                                }
                                                onClick={() => handleDeleteEb(v)}
                                              >
                                                <img
                                                  src={Delete}
                                                  alt="Delete"
                                                  style={{ height: 16, width: 16 }}
                                                />
                                                <label
                                                  style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy, sans-serif",
                                                    color: "#222",
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

                  </div>
                )}



              </>
            ) :
              !props.loading && props.value === "3" && dataSource?.length === 0 ? (
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
                      fontSize: 18,
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
                      fontSize: 14,
                      color: "rgba(75, 75, 75, 1)",
                    }}
                  >
                    There are no Hostel readings available.
                  </div>

                </div>
              ) : null}
          </div>
        </>
      }

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


      {props.value === "3" && !props.ebpermissionError && props.electricityHostel?.length >= 5 &&
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
      }

      <Modal
        show={props.hostelBasedForm}
        onHide={() => handleCloseHostel()}
        backdrop="static"
        centered
      >


        <Modal.Header style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >

            {props.editeb ? "Edit Hostel Reading" : "Add Hostel Reading"}
          </div>

          <CloseCircle size="24" color="#000" onClick={handleCloseHostel}
            style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Modal.Body className="pt-2">
          <div className="row ">


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
                  <MdError style={{ fontSize: "14px", marginBottom: "2px" }} />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginLeft: 2
                    }}
                  >
                    {" "}
                    {readingError}
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
                  Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>

                <div
                  className="datepicker-wrapper"
                  style={{ position: "relative", width: "100%" }}
                >
                  <DatePicker
                    style={{ height: 48, width: "100%", cursor: "pointer", fontFamily: "Gilroy" }}
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
                    disabledDate={(current) => {
                      const Hostel = state.UsersList?.hotelDetailsinPg?.find(
                        (u) => Number(u.id) === Number(state.login.selectedHostel_Id)
                      );
                      if (!Hostel || !Hostel.create_At) return false;

                      const createDate = moment(Hostel.create_At, "YYYY-MM-DD");
                      if (!createDate.isValid()) return false;

                      return current && current.isBefore(createDate, "day");
                    }}
                  />
                </div>
              </Form.Group>
              {dateErrorMesg && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "14px", marginBottom: "2px" }} />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginLeft: 2
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
              <MdError style={{ fontSize: '14px', marginRight: "6px" }} />
              <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{dateError}</span>
            </div>
          )}
        </Modal.Body>
        {formError && (
          <div className="d-flex justify-content-center align-items-center" style={{ color: "red" }}>
            <MdError style={{ fontSize: '14px', marginRight: "6px" }} />
            <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{formError}</span>
          </div>
        )}

        {state.createAccount?.networkError ?
          <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
            <MdError style={{ color: "red", marginRight: '5px' }} />
            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
          </div>
          : null}

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

        <Modal.Footer className="d-flex justify-content-center" style={{ border: "none" }}>
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

          >

            {props.editeb ? "Save Changes" : "Add Reading"}
          </Button>
        </Modal.Footer>
      </Modal>


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
  filterStatus: PropTypes.func.isRequired,
  ebpermissionError: PropTypes.func.isRequired,

}
export default EBHostelReading;