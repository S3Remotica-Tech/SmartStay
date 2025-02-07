import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../Pages/AssetFile/addAsset.css";
import { FileX } from "react-bootstrap-icons";
import moment from "moment";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import {
  ArrowUp2,
  ArrowDown2,
  CloseCircle,
  SearchNormal1,
  Sort,
  Edit,
  Trash,
} from "iconsax-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from "react-bootstrap";

function StaticExample({ show, currentItem, hostelId,setShowModal }) {
  const state = useSelector((state) => state);
  console.log("StaticExample",state)
  const dispatch = useDispatch();
  const customContainerRef = useRef();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [id, setId] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [hostelError, setHostelError] = useState("");
  const [vendorError, setVendorError] = useState("");
  const [assetError, setAssetError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [countError, setCountError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [purchaseDateError, setPurchaseDateError] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [netPaymentError,setNetPaymentError] = useState("")
  const [initialState, setInitialState] = useState({
    assetName: "",
    vendorName: "",
    selectedDate: "",
    price: "",
    category: "",
    modeOfPayment: "",
    description: "",
    count: "",
    hostelName: "",
    account: "",
  });

  const handleHostelNameChange = (e) => {
    setHostelName(e.target.value);
    setGeneralError("");
    setHostelError("");
    setIsChangedError("");
  };

  useEffect(() => {
    dispatch({
      type: "EXPENCES-CATEGORY-LIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "ASSETLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);
  useEffect(()=>{
if(state.ExpenseList.expenceNetBanking){
setNetPaymentError(state.ExpenseList.expenceNetBanking)
}
  },[state.ExpenseList.expenceNetBanking])

  useEffect(() => {
    dispatch({ type: "BANKINGLIST",payload:{ hostel_id: state.login.selectedHostel_Id} });
  }, []);

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #222222";
      closeButton.style.padding = "9px";
    }
  }, []);

  useEffect(() => {
    if (currentItem) {
      setId((currentItem && currentItem.id) || "");
      setAssetName((currentItem && currentItem.asset_id) || "");
      setVendorName((currentItem && currentItem.vendor_id) || "");
      setSelectedDate(moment(currentItem.purchase_date).toDate());
      setPrice((currentItem && currentItem.unit_amount) || "");
      setCategory((currentItem && currentItem.category_id) || "");
      setModeOfPayment((currentItem && currentItem.payment_mode) || "");
      setDescription((currentItem && currentItem.description) || "");
      setCount((currentItem && currentItem.unit_count) || "");
      setHostelName((currentItem && currentItem.hostel_id) || "");
      setAccount((currentItem && currentItem.bank_id) || "");

      setInitialState({
        assetName: currentItem.asset_id || "",
        vendorName: currentItem.vendor_id || "",
        selectedDate: currentItem.purchase_date
          ? moment(currentItem.purchase_date).toDate()
          : null,
        price: currentItem.unit_amount || "",
        category: currentItem.category_id || "",
        modeOfPayment: currentItem.payment_mode || "",
        description: currentItem.description || "",
        count: currentItem.unit_count || "",
        hostelName: currentItem.hostel_id || "",
      });
    }
  }, [currentItem]);

  useEffect(() => {
    if (customContainerRef.current && calendarRef.current) {
      calendarRef.current.flatpickr.set({
        dateFormat: "d/m/Y",
        defaultDate: selectedDate || new Date(),
        // maxDate: "today",
        appendTo: customContainerRef.current, // Append to custom container
      });
    }
  }, [customContainerRef.current, selectedDate]);
  const handleCountChange = (e) => {
    setGeneralError("");
    setCountError("");
    setIsChangedError("");
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value);
    }
  };

  const handleAssetNameChange = (e) => {
    setAssetName(e.target.value);
    setGeneralError("");
    setAssetError("");
    setIsChangedError("");
  };

  const handleVendorNameChange = (e) => {
    setVendorName(e.target.value);
    setGeneralError("");
    setVendorError("");
    setIsChangedError("");
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setGeneralError("");
    setCategoryError("");
    setIsChangedError("");
  };
  const handleAccount = (e) => {
    setAccount(e.target.value);
    setAccountError("");
    setIsChangedError("");
    setNetPaymentError("")
    dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});
  };

  const handleModeOfPaymentChange = (e) => {
    setModeOfPayment(e.target.value);
    setGeneralError("");
    setPaymentError("");
    setIsChangedError("");
    setNetPaymentError("")
    dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});
  };

  const handlePurchaseDateChange = (e) => {
    setPurchaseDate(e.target.value);
    setGeneralError("");
    setIsChangedError("");
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setGeneralError("");
    setPriceError("");
    setIsChangedError("");
    setNetPaymentError("")
    // if (/^\d*$/.test(value)) {
    //   setPrice(value);
    // }
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };
 
  

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setIsChangedError("");
    setGeneralError("");

    if (value === "") {
      setDescription(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        Description: "Description cannot be empty or spaces only",
      }));
      return;
    }

    if (value.trim() !== "") {
      setDescription(value);
      setErrors((prevErrors) => ({ ...prevErrors, Description: "" }));
    } else {
      setDescription(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        Description: "Description cannot be empty or spaces only",
      }));
    }
  };

  const handleAddExpenses = () => {
    // Reset all error messages
    setHostelError("");
    setVendorError("");
    setAssetError("");
    setCategoryError("");
    setDateError("");
    setCountError("");
    setPriceError("");
    setPaymentError("");
    setIsChangedError("");
    
    let hasError = false;
  
    // Validate individual fields and show specific errors
    if (!category) {
      setCategoryError("Please select a category");
      hasError = true;
    }
  
    if (!selectedDate) {
      setDateError("Please select a purchase date");
      hasError = true;
    }
  
    if (!modeOfPayment) {
      setPaymentError("Please enter a mode of payment");
      hasError = true;
    }
  
    if (!price) {
      setPriceError("Please enter a valid price");
      hasError = true;
    } else if (isNaN(price) || price <= 0) {
      setPriceError("Price must be a positive number");
      hasError = true;
    }
  
    if (!count) {
      setCountError("Please enter a valid unit count");
      hasError = true;
    } else if (isNaN(count) || count <= 0) {
      setCountError("Unit count must be a positive number");
      hasError = true;
    }
  
    if (modeOfPayment === "Net Banking" && !account) {
      setAccountError("Please choose a bank account");
      hasError = true;
    }
  
    const isChanged =
      initialState.assetName !== assetName ||
      initialState.vendorName !== vendorName ||
      (initialState.selectedDate &&
        selectedDate &&
        initialState.selectedDate.getTime() !== selectedDate.getTime()) ||
      Number(initialState.price) !== Number(price) ||
      initialState.category !== category ||
      initialState.modeOfPayment !== modeOfPayment ||
      initialState.description !== description ||
      Number(initialState.count) !== Number(count) ||
      initialState.hostelName !== hostelName;
  
    if (!isChanged) {
      setIsChangedError("Please make some changes before saving.");
      hasError = true;
    }
  
    // If any validation fails, do not proceed
    if (hasError) {
      return;
    }
  
    // Format the date and dispatch the action
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    dispatch({
      type: "ADDEXPENSE",
      payload: {
        category_id: category,
        purchase_date: formattedDate,
        unit_count: count,
        unit_amount: price,
        description: description,
        payment_mode: modeOfPayment,
        hostel_id: state.login.selectedHostel_Id,
        id: currentItem ? currentItem.id : null,
        bank_id: account,
      },
    });
  };
  

  // const handleAddExpenses = () => {
  //   setHostelError("");
  //   setVendorError("");
  //   setAssetError("");
  //   setCategoryError("");
  //   setDateError("");
  //   setCountError("");
  //   setPriceError("");
  //   setPaymentError("");

  //   if (!category && !selectedDate && !count && !price && !modeOfPayment) {
  //     setGeneralError("Please enter all mandatory fields");
  //     return;
  //   }

  //   const isChanged =
  //     initialState.assetName !== assetName ||
  //     initialState.vendorName !== vendorName ||
  //     (initialState.selectedDate &&
  //       selectedDate &&
  //       initialState.selectedDate.getTime() !== selectedDate.getTime()) ||
  //     Number(initialState.price) !== Number(price) ||
  //     initialState.category !== category ||
  //     initialState.modeOfPayment !== modeOfPayment ||
  //     initialState.description !== description ||
  //     Number(initialState.count) !== Number(count) ||
  //     initialState.hostelName !== hostelName;
  //   if (!isChanged) {
  //     setIsChangedError("Please make some changes before saving.");
  //     return;
  //   }
  //   if (!category) {
  //     setCategoryError("Please select a category");
  //     // return;
  //   }
  //   if (!selectedDate) {
  //     setDateError("Please select a purchase date");
  //     // return;
  //   }
  //   if (!modeOfPayment) {
  //     setPaymentError("Please enter a mode of payment");
  //     // return;
  //   }

  //   if (!price) {
  //     setPriceError("Please enter a valid price");
  //     // return;
  //   }

  //   if (!count) {
  //     setCountError("Please enter a valid unit count");
  //     // return;
  //   }

  //   if (isNaN(count) || count <= 0) {
  //     setCountError("Please enter a valid unit count");
  //     return;
  //   }
  //   if (isNaN(price) || price <= 0) {
  //     setPriceError("Please enter a valid price");
  //     return;
  //   }

  //   if (modeOfPayment == "Net Banking" && !account) {
  //     setAccountError("Please Choose Bank Account");
  //     return;
  //   }

  //   const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
  //   if (
  //     hostelId &&
  //     modeOfPayment &&
  //     count &&
  //     price &&
  //     category &&
  //     selectedDate
  //   ) {
  //     dispatch({
  //       type: "ADDEXPENSE",
  //       payload: {
  //         // vendor_id: vendorName || "",
  //         // asset_id: assetName || "",
  //         category_id: category,
  //         purchase_date: formattedDate,
  //         unit_count: count,
  //         unit_amount: price,
  //         description: description,
  //         payment_mode: modeOfPayment,
  //         hostel_id: hostelId,
  //         id: currentItem ? currentItem.id : null,
  //         bank_id: account,
  //         hostel_id: state.login.selectedHostel_Id,
  //       },
  //     });
  //   }
  //   // handleClose();
  // };

  const calendarRef = useRef(null);
  

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
    maxDate: "today",
    appendTo: customContainerRef.current,
  };

  // useEffect(() => {
  //     if (calendarRef.current) {
  //         calendarRef.current.flatpickr.set(options);
  //     }
  // }, [selectedDate])

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (selectedDates) => {
    setDateError("");
    setGeneralError("");
    setIsChangedError("");
    setSelectedDate(selectedDates[0]);
  };

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

  const handleClose = () => {
    setShowModal(false);
    setNetPaymentError("")
    dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});

  }
  const calculatePurchaseAmount = (count, price) => {
    return count * price;
    dispatch({type: "CLEAR_EXPENCE_NETBANKIG"});
  };


  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal show={show} onHide={handleClose} backdrop="static"  dialogClassName="custom-modal">
        <Modal.Dialog
          style={{ maxWidth: "100%", width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {currentItem ? "Edit an expense" : "Add an expense"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{cursor:'pointer'}} />
          </Modal.Header>

          

          {generalError && (
            <div className="d-flex align-items-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {generalError}
              </label>
            </div>
          )}

          <Modal.Body style={{ padding: 20 }}>
            <div className="row mt-1">
             
              {state.Settings.Expences.data &&
                state.Settings.Expences.data.length == 0 && (
                  <label
                    className="pb-1"
                    style={{
                      fontSize: 14,
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {" "}
                    Please add a 'Category' option in Settings, accessible after
                    adding an expense.
                  </label>
                )}

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Category{" "}
                    <span style={{ color: "#FF0000", display: "inline-block" }}>
                      *
                    </span>
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    value={category}
                    onChange={handleCategoryChange}
                    className=""
                    id="vendor-select"
                    style={{
                      marginTop: "5px",
                      fontSize: "16px",
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: category ? 600 : 500,
                    }}
                  >
                    <option value="" >Select a Category</option>
                    {state.Settings.Expences.data && state.Settings.Expences.data.length > 0 ? 
                      state.Settings.Expences.data.map((view) => (
                        <>
                          <option
                            key={view.category_Id}
                            value={view.category_Id}
                          >
                            {view.category_Name}
                          </option>
                        </>
                      ))
                    :
                    (
                      <option value="" disabled>
                      No category available
                    </option>
                    )
                    }
                  </Form.Select>
                </Form.Group>
                {categoryError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {categoryError}
                    </label>
                  </div>
                )}
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
                    Purchase Date{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <div style={{ position: "relative", width: "100%" }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setGeneralError("");
                        setDateError("");
                        setIsChangedError("");
                        setSelectedDate(date);
                      }}
                      dateFormat="dd/MM/yyyy"
                      // maxDate={new Date()}
                      minDate={null}
                      customInput={customDateInput({
                        value: selectedDate
                          ? selectedDate.toLocaleDateString("en-GB")
                          : "",
                      })}
                    />
                  </div>
                </Form.Group>
                {dateError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {dateError}
                    </label>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Unit count{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        display: count ? "none" : "inline-block",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={count}
                    onChange={handleCountChange}
                    type="text"
                    placeholder="Enter unit count"
                    maxLength={10}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: count ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {countError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {countError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Per unit amount{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        display: price ? "none" : "inline-block",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={price}
                    onChange={handlePriceChange}
                    type="text"
                    placeholder="Enter amount"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: price ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {priceError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {priceError}
                    </label>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Purchase Amount
                  </Form.Label>
                  <Form.Control
                    value={count * price}
                    disabled
                    type="text"
                    placeholder=""
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                      backgroundColor: "#E7F1FF",
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Mode of transaction{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        display: modeOfPayment ? "none" : "inline-block",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={modeOfPayment}
                    onChange={handleModeOfPaymentChange}
                    disabled={currentItem}
                    className=""
                    id="vendor-select"
                    style={{
                      fontSize: 16,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: modeOfPayment ? 600 : 500,
                    }}
                  >
                    <option value="">Select a mode</option>
                    <option value="UPI/BHIM">UPI/BHIM</option>
                    <option value="CASH">CASH</option>
                    <option value="Net Banking">Net Banking</option>
                  </Form.Select>
                </Form.Group>
                {paymentError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {paymentError}
                    </label>
                  </div>
                )}
              </div>

              {modeOfPayment === "Net Banking" && (
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Account{" "}
                    <span
                      style={{
                        color: "red",
                        fontSize: "20px",
                      }}
                    >
                      {" "}
                      *{" "}
                    </span>
                  </Form.Label>
                  {/* <Form.Select
                    aria-label="Default select example"
                    placeholder="Select no. of floor"
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
                    id="form-selects"
                    className="border"
                    value={account}
                    onChange={(e) => handleAccount(e)}
                    disabled={currentItem}
                  >
                    <option value="">Select Account</option>
                    {state.bankingDetails?.bankingList?.banks?.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.bank_name}
                      </option>
                    ))}
                  </Form.Select> */}




                  <Form.Select
                    aria-label="Default select example"
                    placeholder="Select no. of floor"
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
                    id="form-selects"
                    className="border"
                    value={account}
                    onChange={(e) => handleAccount(e)}
                    disabled={currentItem}
                  >
                    <option value="">Select Account</option>
                    {state.bankingDetails?.bankingList?.banks?.length > 0 ? (
                      state.bankingDetails.bankingList.banks.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.bank_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No accounts available
                      </option>
                    )}
                  </Form.Select>

                  {accountError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {accountError}
                      </label>
                    </div>
                  )}
                   {netPaymentError && (
                                            <div style={{ color: "red" }}>
                                              <MdError />
                                             <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {netPaymentError}</span>
                                            </div>
                                          )}
                </div>
              )}
              <div className="col-lg-12 col-md-12  col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Description
                  </Form.Label>
                  <Form.Control
                    value={description}
                    onChange={handleDescriptionChange}
                    type="email"
                    placeholder="Enter description"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: description ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          {currentItem && isChangedError && (
            <div className="d-flex align-items-center justify-content-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {isChangedError}
              </label>
            </div>
          )}
          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              onClick={handleAddExpenses}
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
            >
              {currentItem ? "Save Changes" : "Add  expense"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

export default StaticExample;
