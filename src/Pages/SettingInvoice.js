import React, { useRef, useState, useEffect } from "react";
import Plus from "../Assets/Images/New_images/add-circle.png";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Logo from "../Assets/Images/Logo-Icon.png";
import Form from "react-bootstrap/Form";
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import dottt from "../Assets/Images/dot_round.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import InvoiceSettingsList from "./InvoicesettingsList";
import Modal from "react-bootstrap/Modal";
import { MdError } from "react-icons/md";
import moment from 'moment';
import { IoReturnDownForward } from "react-icons/io5";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import ComplianceList from "./ComplianceList";
import { FormControl, InputGroup, Pagination } from "react-bootstrap";
import Calendars from "../Assets/Images/New_images/calendar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import close from '../Assets/Images/close.svg';
import Select from "react-select";

function SettingInvoice({ hostelid }) {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [invoice, setSetinvoice] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [invoicedueDate, setInvoiceDueDate] = useState(null);

  const [selectedHostel, setSelectedHostel] = useState({ id: "", name: "" });
  const [showTable, setShowTable] = useState(false);

  const [billrolePermission, setBillRolePermission] = useState("");

  const [billpermissionError, setBillPermissionError] = useState("");
  const [billAddPermission, setBillAddPermission] = useState("");
  const [billDeletePermission, setBillDeletePermission] = useState("");
  const [billEditPermission, setBillEditPermission] = useState("");

  const [logo, setLogo] = useState("");
  const [hostelerrormsg, setHostelErrmsg] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [prefix, setPrefix] = useState("");
  const [startNumber, setStartNumber] = useState("");

  const [prefixerrormsg, setPrefixErrmsg] = useState("");
  const [suffixerrormsg, setSuffixfixErrmsg] = useState("");
  const [totalErrormsg, setTotalErrmsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showform, setShowForm] = useState(false);
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [duedateerrmsg, setDueDateErrmsg] = useState("");
  const [recurringform, setRecurringForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true)
  const initialValuesRef = useRef({});

  const [editprefix, setEditPrefix] = useState("");
  const [editstartnumber, setEditStartnumber] = useState("");
  const [editHostel, setEditHostel] = useState({ id: "", name: "" });
  const [show, setShow] = useState(false);
  const [calculatedstartdate, setCalculatedstartdate] = useState("");
  const [calculatedenddate, setCalculatedEnddate] = useState("");
  const [calculatedstartdateerrmsg, setCalculatedstartdateErrmsg] = useState("");
  const [calculatedenddateerrmsg, setCalculatedEnddateErrMsg] = useState("");
  const [every_recurr, setEvery_Recurr] = useState("");
  const [InvoiceList, setInvoiceList] = useState([]);



  useEffect(() => {
    setBillRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_view == 1
    ) {
      setBillPermissionError("");
    } else {
      setBillPermissionError("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_create == 1
    ) {
      setBillAddPermission("");
    } else {
      setBillAddPermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_edit == 1
    ) {
      setBillEditPermission("");
    } else {
      setBillEditPermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    // if (state.login.selectedHostel_Id) {
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    // }
  }, [state.login.selectedHostel_Id]);

  console.log("state.UsersList.hotelDetailsinPg", state.UsersList.hotelDetailsinPg)
  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries,
      appearOnScrool
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
      appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });


  const handleHostelChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setShowTable(true);
    setTotalErrmsg("");
    setSelectedHostel({
      id: e.target.value,
      name: e.target.options[selectedIndex].text,
    });

    if (!e) {
      setHostelErrmsg("");
    } else {
      setHostelErrmsg("");
    }
  };


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSuffixfixErrmsg("");
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setSelectedImage(compressedFile);
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };



  const handlePrefix = (e) => {
    setTotalErrmsg("");
    setPrefix(e.target.value);
    setSuffixfixErrmsg("");
    if (!e.target.value) {
      setPrefixErrmsg("Please Enter Prefix");
    } else {
      setPrefixErrmsg("");
    }
  };

  const handleSuffix = (e) => {
    setTotalErrmsg("");
    setSuffixfixErrmsg("");
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setStartNumber(value);
    }
    if (!e.target.value) {
      setSuffixfixErrmsg("Please Enter suffix");
    } else {
      setSuffixfixErrmsg("");
    }
  };

  const handleEdit = (item) => {
    console.log("item", item);

    // Parse the `item.inv_date` into a valid Date object
    const parsedDate = item.inv_date ? new Date(item.inv_date) : null;
    const parsedDueDate = item.due_date ? new Date(item.due_date) : null;

    // Update local states
    setPrefix(item.prefix);
    setStartNumber(item.suffix);
    // Set the parsed date into `selectedDate`
    setSelectedDate(parsedDate);
    setInvoiceDueDate(parsedDueDate);

    setEdit(true);
    setShowForm(true);
    setShow(true);
    setEditPrefix(item.prefix);
    setEditStartnumber(item.suffix);
    setEditHostel({ id: item.id, name: item.Name });

    // Save initial values for editing
    initialValuesRef.current = {
      editprefix: item.prefix,
      editstartnumber: item.suffix,
    };
  };



  let hasChanges =
    editprefix !== initialValuesRef.current.editprefix ||
    editstartnumber !== initialValuesRef.current.editstartnumber;

  const handleClose = () => {
    setShow(false);
  };

  const HandleupdateInvoice = () => {
    if (editprefix && editstartnumber && editHostel) {
      dispatch({ type: "INVOICESETTINGS", payload: { hostel_Id: editHostel.id, prefix: editprefix, suffix: editstartnumber } });
      handleClose();
      setEditHostel({ id: "", name: "" });
      setEditPrefix("");
      setEditStartnumber("");
    }
  };


  const handleInvoiceSettings = () => {

    const isPrefixValid =
      prefix !== undefined && prefix !== null && prefix !== "";
    const isStartNumberValid =
      startNumber !== undefined && startNumber !== null && startNumber !== "";
    const isSelectedImageValid = selectedImage !== null;



    if (!isPrefixValid || !isStartNumberValid || !selectedDate || !invoicedueDate) {

      if (!isPrefixValid) {
        setPrefixErrmsg("Please enter Prefix");
      }

      if (!isStartNumberValid) {
        setSuffixfixErrmsg("Please Enter Suffix")
      }
      if (!selectedDate) {
        setInvoiceDateErrmsg("Please Select Invoice Date")
      }
      if (!invoicedueDate) {
        setDueDateErrmsg("Please Select Due Date")
      }

      return;
    }



    if (isPrefixValid && isStartNumberValid && state.login.selectedHostel_Id && selectedDate && invoicedueDate) {
      const formattedInvoiceDate = moment(selectedDate).format('YYYY-MM-DD');
      const formattedDueDate = moment(invoicedueDate).format('YYYY-MM-DD');

      dispatch({
        type: "INVOICESETTINGS",
        payload: { hostel_Id: state.login.selectedHostel_Id, prefix: prefix, suffix: startNumber, inv_date: formattedInvoiceDate, due_date: formattedDueDate }
      });

      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });

      setShowForm(false);
      setPrefix("");
      setStartNumber("");
      setSelectedDate('')
      setInvoiceDueDate('')


    }

    else {
      setSelectedDate('')
      setInvoiceDueDate('')
    }
  };



  useEffect(() => {
    if (state.InvoiceList?.invoiceSettingsStatusCode == 200) {

      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
      setSelectedDate('')
      setInvoiceDueDate('')

      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_SETTINS_STATUSCODE" });
      }, 1000);
    }
  }, [state.InvoiceList]);




  useEffect(() => {
    const filteredHostels = state.UsersList?.hotelDetailsinPg?.filter(
      (item) => item.id === Number(selectedHostel.id)
    );


    if (filteredHostels.length > 0) {
      const profileURL = filteredHostels[0]?.profile;
      setLogo(profileURL);
    } else {
      setLogo(Logo);
    }
  }, [selectedHostel]);

  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  if (InvoiceList.length != 0) {
    var currentRows = InvoiceList.slice(indexOfFirstRow, indexOfLastRow);
    var totalPages = Math.ceil(InvoiceList.length / rowsPerPage);
  } else {
    var currentRows = 0;
    var totalPages = 0;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (currentPage === 1) {
      startPage = 1;
      endPage = 3;
    }

    if (currentPage === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }

    if (currentPage === 2) {
      startPage = 1;
      endPage = 3;
    }

    if (currentPage === totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === currentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === currentPage ? "transparent" : "transparent",
                border: i === currentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbers;
  };



  // const handlestartDateChange = (e) => {
  //   setCalculatedstartdate(e.target.value);
  // };

  // const handleEndDateChange = (e) => {
  //   setCalculatedEnddate(e.target.value);
  // };

  const handlechangeEvery = (e) => {
    setEvery_Recurr(e.target.value)
  }

  const handleSaveRecurring = () => {

    if (!calculatedstartdate || !calculatedenddate) {

      if (!calculatedstartdate) {
        setCalculatedstartdateErrmsg('Please Select date')
      }
      if (!calculatedenddate) {
        setCalculatedEnddateErrMsg('Please Select date')
      }
      return;
    }

    dispatch({
      type: "SETTINGSADDRECURRING",
      payload: { hostel_id: Number(state.login.selectedHostel_Id), type: 'invoice', recure: 1, start_date: Number(calculatedstartdate), end_date: Number(calculatedenddate) }
    });
    setRecurringForm(false);
  }


  useEffect(() => {
    if (state.InvoiceList.settingsaddRecurringStatusCode === 200) {

      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING' })
      }, 100)
    }
  }, [state.InvoiceList.settingsaddRecurringStatusCode])


  const [showPopup, setShowPopup] = useState(false);
  const handleShow = () => {

    if (!state.login.selectedHostel_Id) {
      setShowPopup(true);
      return;
    }
    setShowForm(true);
    setEdit(false);
    console.log("Form is now showing...");
  };


  const handleCloseForm = () => {
    setShowForm(false);
    setPrefixErrmsg('');
    setSuffixfixErrmsg('')
    setInvoiceDateErrmsg('')
    setDueDateErrmsg('')
    setPrefix('')
    setStartNumber('')
    setSelectedDate('')
    setInvoiceDueDate('')
  };

  const handleRecurringFormShow = (item) => {
    setRecurringForm(true);

  };

  const handleCloseRecurringForm = () => {
    setRecurringForm(false);
    setCalculatedstartdateErrmsg('')
    setCalculatedEnddateErrMsg('')
    setCalculatedstartdate('')
    setCalculatedEnddate('')
  };


  const handleEditInvoice = (editData) => {

    setEdit(true);
    setShowForm(true);
    setPrefix(editData.prefix);
    setStartNumber(editData.suffix);

    const formattedInvDate = new Date(editData.inv_date);
    const formattedDueDate = new Date(editData.due_date);

    setSelectedDate(formattedInvDate);
    setInvoiceDueDate(formattedDueDate);
  };



  useEffect(() => {
    if (selectedDate && isNaN(new Date(selectedDate).getTime())) {
      setSelectedDate(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (invoicedueDate && isNaN(new Date(invoicedueDate).getTime())) {
      setInvoiceDueDate(null);
    }
  }, [invoicedueDate]);




  const customDateInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      className="date-input-container w-100"
      onClick={onClick}
      style={{ position: "relative" }}
    >
      <FormControl
        type="text"
        className="date_input"
        value={value || "DD/MM/YYYY"} // Show placeholder if no value
        readOnly
        ref={ref}
        style={{
          border: "1px solid #D9D9D9",
          borderRadius: 8,
          padding: "9px 12px",
          fontSize: 14,
          fontFamily: "Gilroy",
          fontWeight: value ? 600 : 500,
          width: "100%",
          height: 50,
          boxSizing: "border-box",
          boxShadow: "none",
          cursor: "pointer",
        }}
        aria-label="Select date"
      />
      <img
        src={Calendars}
        style={{
          height: 24,
          width: 24,
          cursor: "pointer",
          position: "absolute",
          right: 10,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        alt="Open calendar"
        onClick={onClick}
      />
    </div>
  ));

  useEffect(() => {
    if (state?.UsersList?.statuscodeForhotelDetailsinPg == 200) {
      setInvoiceList(state?.UsersList?.hotelDetailsinPg)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_HOSTEL_LIST_All_CODE' })
      }, 1000)
    }

  }, [state?.UsersList?.statuscodeForhotelDetailsinPg])
  console.log("UsersListSTATUSCODE", state?.UsersList?.statuscodeForhotelDetailsinPg);


useEffect(()=>{
  if(InvoiceList.length == 0){
    setLoading(false)
  }
else if( InvoiceList && InvoiceList?.every(
  (item) =>
    (!item.prefix || item.prefix === 'null' || item.prefix === null || item.prefix === 0) &&
    (!item.suffix || item.suffix === 'null' || item.suffix === null || item.suffix === 0)
)) {
setLoading(false)
}
},[InvoiceList])


  console.log("InvoiceList:", InvoiceList);

  // start date change
  const options = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleStartDateChange = (selectedOption) => {
    console.log(selectedOption?.value);
  };
  const handleEndDateChange = (selectedOption) => {
    console.log(selectedOption?.value); 
  };


  return (
    <div className="container" style={{ position: "relative" }}>


      {loading &&
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: '200px',
            display: 'flex',
            height: "50vh",
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

      <div className="pt-4" style={{
        display: "flex", flexDirection: "row", justifyContent: "space-between", position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
        // height: 83, 
        marginTop: 5
      }}>
        <h3 style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Invoice</h3>


        {InvoiceList && InvoiceList.length > 0 ? (
          InvoiceList.map((list) => {
            const isDefaultPrefixSuffix =
              (!list.prefix || list.prefix === 'null' || list.prefix === null || list.prefix === 0) &&
              (!list.suffix || list.suffix === 'null' || list.suffix === null || list.suffix === 0);

            return isDefaultPrefixSuffix ? (
              <button
                key={`add-invoice-${list.id}`}
                onClick={handleShow}
                // style={{
                //   border: "none",
                //   fontFamily: "Gilroy",
                //   fontSize: 14,
                //   backgroundColor: "#1E45E1",
                //   color: "white",
                //   fontWeight: 600,
                //   borderRadius: 8,
                //   padding: "12px 16px",
                // }}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  padding: "8px 10px",
                  width: "auto",
                  maxWidth: "100%",
                  marginBottom: "10px",
                  maxHeight: 50,
                  marginTop: "-6px",
                  borderColor: "#1E45E1"
                }}
                disabled={showPopup}
              >
                + Invoice
              </button>
            ) : (
              <button
                key={`edit-invoice-${list.id}`}
                onClick={() => handleEdit(list)}
                // style={{
                //   border: "none",
                //   fontFamily: "Gilroy",
                //   fontSize: 14,
                //   backgroundColor: "#1E45E1",
                //   color: "white",
                //   fontWeight: 600,
                //   borderRadius: 8,
                //   padding: "12px 16px",
                // }}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  padding: "10px 34px",
                  width: "auto",
                  maxWidth: "100%",
                  marginBottom: "10px",
                  maxHeight: 50,
                  marginTop: "-6px",
                  borderColor:"#1E45E1"
      
                }}
              >
                Edit Invoice
              </button>
            );
          })
        ) : null}








      </div>

      {showPopup && (
        <div className="d-flex flex-wrap">
          <p style={{ color: "red", fontFamily:"Gilroy", fontSize:14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
            Please add a hostel before adding Invoice information.
          </p>
        </div>)}

      <div>
        {InvoiceList && InvoiceList.length > 0 ? (
          InvoiceList.every(
            (item) =>
              (!item.prefix || item.prefix === 'null' || item.prefix === null || item.prefix === 0) &&
              (!item.suffix || item.suffix === 'null' || item.suffix === null || item.suffix === 0)
          ) ? (
            <div style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
              <div className="d-flex justify-content-center">
                <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
              </div>
              <div
                className="pb-1 mt-3"
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: 20,
                  color: "rgba(75, 75, 75, 1)",
                }}
              >
                No Invoice available
              </div>
            </div>
          ) : (
            state.UsersList.hotelDetailsinPg.filter((item) => {
              const isValidPrefix =
                item.prefix && item.prefix !== 'null' && item.prefix !== null && item.prefix !== 0;
              const isValidSuffix =
                item.suffix && item.suffix !== 'null' && item.suffix !== null && item.suffix !== 0;
              console.log('Item:', item, 'isValidPrefix:', isValidPrefix, 'isValidSuffix:', isValidSuffix);
              return isValidPrefix || isValidSuffix;
            })
              .map((item) => (
                <div key={item.id} className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12 mt-3">
                  <InvoiceSettingsList
                    item={item}
                    handleRecurringFormShow={handleRecurringFormShow}
                  // OnEditInvoice={handleEditInvoice}
                  />
                </div>
              ))
          )
        ) : !loading && (
          <div style={{ alignItems: "center", justifyContent: "center", marginTop: "90px" }}>
            <div className="d-flex justify-content-center">
              <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
            </div>
            <div
              className="pb-1 mt-3"
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Gilroy",
                fontSize: 20,
                color: "rgba(75, 75, 75, 1)",
              }}
            >
              No Invoice available
            </div>
          </div>
        )}
      </div>



      {showform ? (
        <div
          className="modal show"
          style={{ display: "block", position: "initial", fontFamily: "Gilroy,sans-serif" }}
        >
          <Modal show={showform} onHide={handleCloseForm} centered backdrop="static">
            <Modal.Dialog
              style={{ maxWidth: 950, paddingRight: "10px", paddingRight: "10px", borderRadius: "30px" }}
              className="m-0 p-0"
            >
              <Modal.Body>
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}
                    >
                      {edit ? "Edit Invoice" : "Add Invoice "}
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseForm}
                      style={{ position: "absolute", right: "10px", top: "16px", border: "1px solid black", background: "transparent", cursor: "pointer", padding: "0", display: "flex", justifyContent: "center", alignItems: "center", width: "32px", height: "32px", borderRadius: "50%" }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ fontSize: "30px", paddingBottom: "6px" }}
                      >
                        &times;
                      </span>
                    </button>
                  </Modal.Header>
                </div>

                <div className="row mt-1">
                  <div className="d-flex row ">
                    <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 500, color: "#000", fontStyle: "normal", lineHeight: "normal" }}>
                          Prefix
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>
                        <Form.Control
                          style={{ padding: "10px", marginTop: "10px", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 500 }}
                          type="text"
                          placeholder="prefix"
                          value={prefix}
                          onChange={(e) => handlePrefix(e)}
                        // readOnly
                        // style={inputStyle}
                        />
                      </Form.Group>

                      {prefixerrormsg.trim() !== "" && (
                        <div>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "red",
                            }}
                          >
                            {prefixerrormsg !== " " && (
                              <MdError
                                style={{ fontSize: "13px", color: "red", marginBottom: "3px" }}
                              />
                            )}{" "}
                            {prefixerrormsg}
                          </p>
                        </div>
                      )}
                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 500, color: "#000", fontStyle: "normal", lineHeight: "normal", }}
                        >
                          Suffix
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>
                        <Form.Control
                          style={{
                            padding: "10px",
                            marginTop: "10px",
                            fontSize: 14,
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            lineHeight: "18.83px",
                            fontWeight: 500,
                          }}
                          type="text"
                          placeholder="suffix"
                          value={startNumber}
                          onChange={(e) => handleSuffix(e)}
                        // readOnly
                        />



                        {suffixerrormsg.trim() !== "" && (
                          <div>
                            <p
                              style={{
                                fontSize: "13px",
                                color: "red",
                                marginTop: "3px",
                              }}
                            >
                              {suffixerrormsg !== " " && (
                                <MdError
                                  style={{ fontSize: "13px", color: "red", marginBottom: "3px" }}
                                />
                              )}{" "}
                              {suffixerrormsg}
                            </p>
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                  {/* </div> */}



                  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#000",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        Preview
                      </Form.Label>
                      <Form.Control
                        style={{
                          padding: "10px",
                          marginTop: "10px",
                          fontSize: 14,
                          backgroundColor: "#E7F1FF",
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          lineHeight: "18.83px",
                          fontWeight: 500,
                        }}
                        type="text"
                        placeholder="preview"
                        readOnly
                        value={prefix + startNumber}
                      // readOnly
                      />
                    </Form.Group>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                    <Form.Group className="" controlId="purchaseDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Invoice date
                        <span style={{ color: "red", fontSize: "20px" }}> * </span>
                      </Form.Label>
                      <div style={{ position: "relative", width: "100%" }}>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            React.createElement(customDateInput, {
                              value: selectedDate
                                ? selectedDate.toLocaleDateString("en-GB")
                                : "",
                            })
                          }
                        />




                      </div>
                    </Form.Group>

                    {invoicedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "13px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {invoicedateerrmsg}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="" controlId="purchaseDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Due date
                        <span style={{ color: "red", fontSize: "20px" }}> * </span>
                      </Form.Label>
                      <div style={{ position: "relative", width: "100%" }}>

                        <DatePicker
                          selected={invoicedueDate}
                          onChange={(date) => setInvoiceDueDate(date)}
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            React.createElement(customDateInput, {
                              value: invoicedueDate
                                ? invoicedueDate.toLocaleDateString("en-GB")
                                : "",
                            })
                          }
                        />





                      </div>
                    </Form.Group>

                    {duedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {duedateerrmsg}
                        </label>
                      </div>
                    )}
                  </div>





                  {totalErrormsg.trim() !== "" && (
                    <div>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginTop: "3px",
                        }}
                      >
                        {totalErrormsg !== " " && (
                          <MdError style={{ fontSize: "13px", color: "red" }} />
                        )}{" "}
                        {totalErrormsg}
                      </p>
                    </div>
                  )}
                </div>
              </Modal.Body>

              <Modal.Footer style={{ border: "none" }}>
                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 500,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                  onClick={handleInvoiceSettings}
                >
                  Add Invoice
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>


      ) : null}



      {recurringform && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "initial",
            fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={recurringform}
            onHide={handleCloseRecurringForm}
            centered
            backdrop="static"
          >
            <Modal.Dialog
              style={{
                maxWidth: 950,
                paddingRight: "10px",
                paddingRight: "10px",
                borderRadius: "30px",
              }}
              className="m-0 p-0"
            >
              <Modal.Body>
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Recurring Enable
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseRecurringForm}
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
                </div>

                <div className="row mt-1">
                  <div class="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label for="startDayDropdown" class="form-label">Invoice calculation Start Date will be
                      <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                      </label>
                    </div>
                    {/* <div className="col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                        value={calculatedstartdate}
                        onChange={handlestartDateChange}
                      >
                        <option value="">Select</option>
                        {[...Array(31)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleStartDateChange}
                        value={options.find((option) => option.value === calculatedstartdate)}
                        placeholder="Select"
                        classNamePrefix="custom" // Prefix for custom styles
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
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
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedstartdateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: "15px", color: "red", marginTop: "-9px" }}
                        >
                          {calculatedstartdateerrmsg !== " " && (
                            <MdError style={{ fontSize: "13px", color: "red",marginBottom:"3px" }} />
                          )}{" "}
                          {calculatedstartdateerrmsg}
                        </p>
                      </div>
                    )}
                  </div>

                  <div class="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label for="startDayDropdown" class="form-label">Invoice Calculation End date wil be
                      <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                      </label>
                    </div>
                    {/* <div className="col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                        value={calculatedenddate}
                        onChange={handleEndDateChange}
                      >
                        {[...Array(31)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleEndDateChange}
                        value={options.find((option) => option.value === calculatedenddate)}
                        placeholder="Select"
                        classNamePrefix="custom" // Prefix for custom styles
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            overflowY: "auto",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedenddateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: "15px", color: "red", marginTop: "-9px" }}
                        >
                          {calculatedenddateerrmsg !== " " && (
                            <MdError style={{ fontSize: "13px", color: "red",marginBottom:"3px" }} />
                          )}{" "}
                          {calculatedenddateerrmsg}
                        </p>
                      </div>
                    )}

                  </div>


                  <div class="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label for="startDayDropdown" class="form-label">On Every</label>
                    </div>
                    <div className="col-lg-4">
                      <select class="form-select border" id="startDayDropdown"
                        value={every_recurr}
                        onChange={handlechangeEvery}
                      >
                        <option value="monthly">Monthly</option>

                      </select>
                    </div>

                  </div>


                </div>
              </Modal.Body>

              <Modal.Footer style={{ border: "none" }}>
                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 500,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                  onClick={handleSaveRecurring}
                >
                  Add Invoice
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      )}
    </div>
  );
}
export default SettingInvoice;