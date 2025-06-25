/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import Closecircle from "../Assets/Images/close-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import moment from "moment";
import Image from "react-bootstrap/Image";
import People from "../Assets/Images/New_images/profile-picture.png";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import PlusIcon from "../Assets/Images/New_images/plusIcon.png";
import Delete from "../Assets/Images/New_images/trash.png";
import { CloseCircle } from "iconsax-react";

const CheckOutForm = ({
  uniqueostel_Id,
  show,
  handleClose,
  currentItem,
  data,
  checkouteditaction,
  cofirmForm,
  conformEdit,
  handleCloseConformForm
}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkOutrequestDate, setCheckOutRequestDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [comments, setComments] = useState("");
  const [advanceamount, setAdvanceAmount] = useState("");
  const [dueamount, SetDueAmount] = useState('');
  const [invoicenumber, SetInvoiceNumber] = useState([]);
  const [bedname, setBedname] = useState("");
  const [floorname, setFloorname] = useState("");
  const [paymentDate, setPaymentDate] = useState("")
  const [fields, setFields] = useState([{ reason: "", amount: "" }]);
  const [noChangeMessage, setNoChangeMessage] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const errorRef = useRef(null);
  const [formLoading, setFormLoading] = useState(false)
  const [formCheckoutLoading, setFormCheckoutLoading] = useState(false)
  const nochangeRef = useRef(null)



  const handlecloseform = () => {
    handleClose();
    setSelectedCustomer("");
    setComments("");
    setCheckOutDate("");
    setCheckOutRequestDate("");
    setBedname("");
    setFloorname("");
    setCheckOutDateError("");
    setCustomerError("");
    setCheckOutRequestDateError("");
    setDateDifference(null);
    SetDueAmount('')

  };

  const handleCloseConfirmFormPage = () => {

    if (typeof handleCloseConformForm === "function") {
      handleCloseConformForm();
    }
    dispatch({ type: 'CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
    dispatch({ type: 'CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
    setConformCheckErr("")
    setNoChangeMessage("")
    setModeOfPaymentError("")

    setFields([{ reason: "", amount: "" }]);
  }





  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, []);

  const handleModeOfPaymentChange = (e) => {
    setModeOfPayment(e.target.value);
    setModeOfPaymentError("")


  };






  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption ? selectedOption.value : "");

    setCustomerError("");
  };



  const handleCommentsChange = (event) => {
    setComments(event.target.value);
    setNoChangeMessage("")
    setIsChangedError("")
  };



  const [dateDifference, setDateDifference] = useState(null);



  useEffect(() => {
    if (currentItem) {
      setCheckOutDate(
        currentItem.CheckoutDate ? new Date(currentItem.CheckoutDate) : null
      );
      setCheckOutRequestDate(
        currentItem.req_date ? new Date(currentItem.req_date) : null
      );
      setSelectedCustomer(currentItem.ID);

      setComments(currentItem.checkout_comment);
      setBedname(currentItem.bed_name);
      setFloorname(currentItem.floor_name);
    } else {
      setCheckOutDate("");
      setCheckOutRequestDate("");
      setSelectedCustomer("");

      setComments("");
      setBedname("");
      setFloorname("");
      dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    }
  }, [currentItem, show]);

  useEffect(() => {
    if (data) {

      setCheckOutDate(data.CheckoutDate ? new Date(data.CheckoutDate) : null);
      setPaymentDate(data.CheckoutDate ? new Date(data.CheckoutDate) : null)
      setCheckOutRequestDate(data.req_date ? new Date(data.req_date) : null);
      setSelectedCustomer(data.ID);

      setComments(data.checkout_comment);
      setBedname(data.bed_name);
      setFloorname(data.floor_name);
      setModeOfPayment(data.bank_id)

    } else {
      setCheckOutDate("");
      setCheckOutRequestDate("");
      setSelectedCustomer("");
      setComments("");
      setBedname("");
      setFloorname("");
      setModeOfPayment("")

      dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    }
  }, [data, show]);


  useEffect(() => {

    setFields(prevFields => {
      const otherFields = prevFields.filter((_, i) => i !== 0);
      return [
        { reason: "DueAmount", amount: String(dueamount || "") },
        ...otherFields,
      ];
    });
  }, [dueamount]);



  useEffect(() => {
    if (data?.amenities?.length > 0) {
      let outstandingDueAmount = "";
      const amenityFields = data.amenities
        .filter(item => {
          if (item.reason === "Outstanding Due") {
            outstandingDueAmount = String(item.amount || "");
            return false;
          }
          return true;
        })
        .map(item => ({
          reason: item.reason || "",
          amount: String(item.amount || ""),
        }));

      const dueAmountValue = outstandingDueAmount || String(dueamount || "");

      setFields([
        { reason: "DueAmount", amount: dueAmountValue },
        ...amenityFields,
      ]);
    }
  }, [data?.amenities, dueamount]);

  useEffect(() => {

    if (selectedCustomer && !data && !currentItem) {
      const filteruserlist = state.UsersList.Users?.filter(
        (u) => u.ID === selectedCustomer
      );


      if (filteruserlist && filteruserlist.length > 0) {
        const user = filteruserlist[0];

        if (user.Bed !== undefined && user.Bed !== null) {
          setBedname(user.Bed);
        }

        if (user.bed_name !== undefined && user.bed_name !== null) {
          setBedname(user.bed_name);
        }

        setFloorname(filteruserlist[0].floor_name);

        if (user.floor_name !== undefined && user.floor_name !== null) {
          setFloorname(user.floor_name);
        }
      }
    }
  }, [selectedCustomer, state.UsersList.Users, data, currentItem]);

  const [customerWError, setCustomerError] = useState("");
  const [checkoUtDateError, setCheckOutDateError] = useState("");
  const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");



  const handleCheckOutCustomer = () => {
    dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    const formattedDate = moment(checkOutDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const formattedrequestDate = moment(
      checkOutrequestDate,
      "DD-MM-YYYY"
    ).format("YYYY-MM-DD");



    if (!selectedCustomer) {
      setCustomerError("Please Select a Customer");

    }



    if (!checkOutDate) {
      setCheckOutDateError("Please Select a Check-Out Date");

    }

    if (!checkOutrequestDate) {
      setCheckOutRequestDateError("Please Select a Request Date");

    }

    if (!selectedCustomer || !checkOutDate || !checkOutrequestDate) {
      return;
    }




    const formatDateTocheckoutDate = (startdate) => {
      if (!startdate) return "";
      const d = new Date(startdate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateToRequestDate = (enddate) => {
      if (!enddate) return "";
      const d = new Date(enddate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const isChanged = (() => {
      const isCheckoutDateChanged =
        formatDateTocheckoutDate(currentItem?.CheckoutDate) !==
        formatDateTocheckoutDate(checkOutDate);
      const isRequestDateChanged =
        formatDateToRequestDate(currentItem?.req_date) !==
        formatDateToRequestDate(checkOutrequestDate);
      const isCommentsChanged =
        (comments || "") !== (currentItem?.checkout_comment || "");

      return isCheckoutDateChanged || isRequestDateChanged || isCommentsChanged;
    })();

    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      return;
    }

    if (
      selectedCustomer ||
      (currentItem?.ID &&
        formattedDate &&
        formattedrequestDate &&
        uniqueostel_Id) ||
      currentItem?.Hostel_Id
    ) {
      dispatch({
        type: "ADDCHECKOUTCUSTOMER",
        payload: {
          checkout_date: formattedDate,
          user_id: selectedCustomer || currentItem?.ID,
          hostel_id: uniqueostel_Id || currentItem?.Hostel_Id,
          comments: comments,
          action: currentItem ? 2 : 1,
          req_date: formattedrequestDate,
        },
      });
      setFormLoading(true)
    }
    setSelectedCustomer("");

    setComments("");
    setCheckOutDate("");
    setCheckOutRequestDate("");
    setBedname("");
    setFloorname("");
    setCheckOutDateError("");

    setCustomerError("");
    setCheckOutRequestDateError("");
    setDateDifference(null);
  };

  const customStyles = {
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
      fontFamily: "Gilroy",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      maxHeight: "120px",
      padding: 0,
      scrollbarWidth: "thin",
      overflowY: "auto",
      fontFamily: "Gilroy",
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
      cursor:"pointer"
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
     option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      color: "#000",
                    }),
  };


  const formatOptions = () => {
    return state.UsersList?.availableCheckOutCustomerList.map((user) => ({
      value: user.ID,
      label: (
        <div className="d-flex align-items-center">
          <Image
            src={
              user.profile && user.profile !== "0" && user.profile.trim() !== ""
                ? user.profile
                : People
            }
            roundedCircle
            style={{ height: "30px", width: "30px", marginRight: "10px" }}
          />
          <span>{user.Name}</span>
        </div>
      ),
    }));
  };

  useEffect(() => {
    if (uniqueostel_Id) {
      dispatch({
        type: "AVAILABLECHECKOUTCUSTOMER",
        payload: { hostel_id: uniqueostel_Id },
      });
    }
  }, [uniqueostel_Id]);

  useEffect(() => {
    if (selectedCustomer && data) {
      dispatch({
        type: "GETCONFIRMCHECKOUTCUSTOMER",
        payload: { id: selectedCustomer, hostel_id: data.Hostel_Id },
      });
    }
  }, [selectedCustomer, data]);

  useEffect(() => {
    if (state.UsersList.statusCodegetConfirmCheckout === 200) {
      setAdvanceAmount(
        state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount
      );

      SetInvoiceNumber(state?.UsersList?.GetconfirmcheckoutBillDetails);
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodegetConfirmCheckout]);







  const validInvoices = invoicenumber.filter((invoice) => invoice.balance > 0);


  const hasBalance =
    Array.isArray(validInvoices) &&
    validInvoices.some((invoice) => invoice.balance > 0);

  useEffect(() => {
    if (validInvoices && hasBalance) {
      const totaldueamount = validInvoices.reduce(
        (total, invoice) => total + invoice.balance,
        0
      );
      SetDueAmount(totaldueamount);

    }
  }, [validInvoices]);



  const [returnAmount, setReturnAmount] = useState("")


  const [modeOfPaymentError, setModeOfPaymentError] = useState("")

  const handleConfirmCheckout = () => {
    dispatch({ type: 'CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
    dispatch({ type: 'CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
    let hasError = false;

    if (!selectedCustomer) {
      setCustomerError("Please Select a Customer");
      hasError = true;
    }

    if (!checkOutDate) {
      setCheckOutDateError("Please select a checkout Date");
      hasError = true;
    }

    if (!modeOfPayment) {
      setModeOfPaymentError("Please Select Mode Of Payment");
      hasError = true;
    }

    if (!data.Hostel_Id) {
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const formattedDate = moment(checkOutDate, "DD-MM-YYYY").format("YYYY-MM-DD");

    if (advanceamount) {
      const nonEmptyFields = fields.filter(
        (field) =>
          field.reason !== "DueAmount" &&
          (field.reason.trim() !== "" || field.amount.trim() !== "")
      );

      dispatch({
        type: "ADDCONFIRMCHECKOUTCUSTOMER",
        payload: {
          checkout_date: formattedDate,
          id: selectedCustomer,
          hostel_id: data.Hostel_Id,
          comments: comments,
          advance_return: returnAmount,
          reinburse: 1,
          reasons: nonEmptyFields,
          payment_id: modeOfPayment,
        },
      });
      setFormCheckoutLoading(true)
    }
  };



  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    if (data) {
      const initialReasons = (data.amenities || []).map((item) => ({
        reason: item.reason || "",
        amount: String(item.amount || ""),
      }));

      setInitialData({
        comments: data.checkout_comment || "",
        modeOfPayment: data.bank_id || "",
        reason: initialReasons,
        paymentDate: data.CheckoutDate ? moment(data.CheckoutDate).format("YYYY-MM-DD") : "",
      });
    }
  }, [data]);



  const handleConfirmEditCheckout = () => {
    dispatch({ type: 'CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
    dispatch({ type: 'CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
    if (!conformEdit) return;

    let hasError = false;
    setNoChangeMessage("");
    setModeOfPaymentError("");

    if (!selectedCustomer) {
      setNoChangeMessage("Please select a customer.");
      hasError = true;
    }

    if (!data.Hostel_Id) {
      setNoChangeMessage("Hostel ID is missing.");
      hasError = true;
    }

    if (!checkOutDate) {
      setNoChangeMessage("Please select a checkout date.");
      hasError = true;
    }

    if (!modeOfPayment) {
      setModeOfPaymentError("Please select mode of payment.");
      hasError = true;
    }

    if (hasError) return;

    const formattedDate = moment(checkOutDate).format("YYYY-MM-DD");

    const currentReasonFields = fields.filter(
      (field) =>
        field.reason !== "DueAmount" &&
        field.reason !== "Outstanding Due" &&
        (field.reason.trim() !== "" || field.amount.trim() !== "")
    );

    const formattedPaymentDate = paymentDate
      ? moment(paymentDate).format("YYYY-MM-DD")
      : "";

    const formattedIniatialDate = initialData.paymentDate
      ? moment(initialData.paymentDate).format("YYYY-MM-DD")
      : "";

    const hasCommentsChanged = comments !== initialData.comments;
    const hasBankIdChanged = modeOfPayment !== initialData.modeOfPayment;
    const hasPaymentDateChanged = formattedPaymentDate !== formattedIniatialDate;

    const areFieldsEqual = (a = [], b = []) => {
      const filterFields = (fields) =>
        fields
          .filter(
            (item) =>
              item.reason?.trim() !== "DueAmount" &&
              item.reason?.trim() !== "Outstanding Due"
          )
          .map((item) => ({
            reason: (item.reason || "").trim(),
            amount: (item.amount || "").trim(),
          }));

      const aFiltered = filterFields(a);
      const bFiltered = filterFields(b);

      if (aFiltered.length !== bFiltered.length) return false;

      for (let i = 0; i < aFiltered.length; i++) {
        if (
          aFiltered[i].reason !== bFiltered[i].reason ||
          aFiltered[i].amount !== bFiltered[i].amount
        ) {
          return false;
        }
      }

      return true;
    };

    const haveFieldsChanged = !areFieldsEqual(currentReasonFields, initialData.reason);



    if (
      !hasCommentsChanged &&
      !haveFieldsChanged &&
      !hasPaymentDateChanged &&
      !hasBankIdChanged
    ) {
      setNoChangeMessage("No Changes Detected");
      setTimeout(() => {
        nochangeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

      return;
    }

    dispatch({
      type: "EDITCONFIRMCHECKOUTCUSTOMER",
      payload: {
        checkout_date: formattedDate,
        id: selectedCustomer,
        hostel_id: data.Hostel_Id,
        comments: comments,
        advance_return: returnAmount,
        reinburse: 1,
        reasons: currentReasonFields,
        payment_date: formattedPaymentDate,
        payment_id: modeOfPayment,
        user_id: selectedCustomer || currentItem?.ID,
      },
    });
    setFormCheckoutLoading(true)
  };




  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      setFormCheckoutLoading(false)
      handleCloseConfirmFormPage()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodeAddConfirmCheckout]);



  useEffect(() => {
    if (state.UsersList.statusCodeConformEdit === 200) {
      setFormCheckoutLoading(false)
      handleCloseConfirmFormPage()
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodeConformEdit]);



  const [conformcheckErr, setConformCheckErr] = useState("")
  useEffect(() => {
    if (state.UsersList.conformChekoutError) {
      setFormCheckoutLoading(false)
      setConformCheckErr(state.UsersList.conformChekoutError)

    }
  }, [state.UsersList.conformChekoutError])


  useEffect(() => {
    if (state.UsersList.conformChekoutEditError) {
      setFormCheckoutLoading(false)
      setConformCheckErr(state.UsersList.conformChekoutEditError)

    }
  }, [state.UsersList.conformChekoutEditError])

  useEffect(() => {
    if (conformcheckErr && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [conformcheckErr]);

  useEffect(() => {
    if (state.UsersList.errorMessageAddCheckOut) {
      setFormLoading(false)
      setFormCheckoutLoading(false)
    }
  }, [state.UsersList.errorMessageAddCheckOut])

  useEffect(() => {

    const advanceReturnField = fields.find(
      (item) => item.reason?.toLowerCase() === "advance return"
    );


    const advance = parseFloat(advanceReturnField?.amount || advanceamount) || 0;
    const due = parseFloat(dueamount) || 0;
    const relevantFields = conformEdit ? fields : fields.slice(1);
    const totalExtra = relevantFields.reduce((acc, curr) => {
      if (curr.reason?.toLowerCase() === "advance return") return acc;
      const amt = parseFloat(curr.amount);
      return acc + (isNaN(amt) ? 0 : amt);
    }, 0);
    const result = advance - (due + totalExtra);
    setReturnAmount(result);
  }, [advanceamount, dueamount, fields, conformEdit]);

  let visibleIndex = -1;


  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];
    updatedFields[index][field] = value;
    setNoChangeMessage("")


    setFields(updatedFields);
  };



  const handleAddField = () => {
    setFields([...fields, { reason: "", amount: "" }]);
    setNoChangeMessage("")
    setConformCheckErr("")
    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
    setConformCheckErr("")
    setNoChangeMessage("")
    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };

  const labelStyle = {
    fontSize: 14,
    color: "rgba(75, 75, 75, 1)",
    fontFamily: "Gilroy",
    fontWeight: 500,
  };

  const inputStyle = {
    height: "50px",
    borderRadius: "8px",
    fontSize: 16,
    color: "#222",
    fontFamily: "Gilroy",
    fontWeight: 500,
    boxShadow: "none",
    border: "1px solid #D9D9D9",
  };




  return (
    <>
      <Modal show={show} onHide={handlecloseform} centered backdrop="static">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title
            style={{
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "Gilroy",
            }}
          >
            {
              currentItem && checkouteditaction
                ? "Edit Check-Out"
                : "Add Check-Out"}
          </Modal.Title>
          <CloseCircle size="24" color="#000" onClick={handlecloseform}
            style={{ cursor: 'pointer' }} />
        </Modal.Header>

        <Modal.Body>
          <div style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll p-2 mt-3 me-3">
            <div className="d-flex align-items-center">
              <div className="row row-gap-2">
                {!checkouteditaction && (
                  <div className="col-lg-12 col-md-12 col-sm-12 colxs-12">
                    <div className="form-group">
                      <label
                        className="mt-2"
                        style={{
                          fontSize: 14,
                          color: "rgba(75, 75, 75, 1)",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Customer{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </label>
                      <Select
                        styles={customStyles}
                        value={formatOptions().find(
                          (opt) => opt.value === selectedCustomer
                        )}
                        onChange={handleCustomerChange}
                        options={formatOptions()}
                        placeholder="Select a customer"
                        classNamePrefix="custom"
                        menuPlacement="auto"


                      />

                      {customerWError && (
                        <div className="d-flex align-items-center p-1 mb-2">
                          <MdError
                            style={{
                              color: "red",
                              marginRight: "5px",
                              fontSize: "12px",
                            }}
                          />
                          <label
                            className="mb-0"
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            {customerWError}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
                      Current Floor{" "}

                    </Form.Label>
                    <FormControl
                      id="form-controls"
                      placeholder="Enter Name"
                      type="text"
                      value={floorname}

                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #E7F1FF",
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: "#E7F1FF",
                      }}
                    />
                  </Form.Group>
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
                      Current Bed{" "}
                    </Form.Label>
                    <FormControl
                      id="form-controls"
                      placeholder="Enter name"
                      type="text"
                      value={bedname}

                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #E7F1FF",
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: "#E7F1FF",
                      }}
                    />
                  </Form.Group>
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
                      Request Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>


                    <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                      <DatePicker
                        style={{ width: "100%", height: 48, cursor: "pointer" }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={checkOutrequestDate ? dayjs(checkOutrequestDate) : null}
                        onChange={(date) => {
                          setCheckOutRequestDateError("");
                          setIsChangedError("");
                          setCheckOutRequestDate(date ? date.toDate() : null);
                        }}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.closest(".show-scroll") || document.body
                        }
                      />
                    </div>
                  </Form.Group>
                  {checkoUtrequestDateError && (
                    <div
                      className="d-flex align-items-center p-1 mb-2"
                      style={{ marginTop: "-6px" }}
                    >
                      <MdError
                        style={{
                          color: "red",
                          marginRight: "5px",
                          fontSize: "12px",
                        }}
                      />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {checkoUtrequestDateError}
                      </label>
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
                      Check-Out Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>



                    <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                      <DatePicker
                        style={{ width: "100%", height: 48, cursor: "pointer" }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={checkOutDate ? dayjs(checkOutDate) : null}
                        onChange={(date) => {
                          setCheckOutDateError('');
                          setIsChangedError("");
                          setCheckOutDate(date ? date.toDate() : null);
                        }}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.closest(".show-scroll") || document.body
                        }
                      />
                    </div>
                  </Form.Group>
                  {checkoUtDateError && (
                    <div
                      className="d-flex align-items-center p-1"
                      style={{ marginTop: "-6px" }}
                    >
                      <MdError
                        style={{
                          color: "red",
                          marginRight: "5px",
                          fontSize: "12px",
                        }}
                      />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          whiteSpace: "nowrap"
                        }}
                      >
                        {checkoUtDateError}
                      </label>
                    </div>
                  )}
                </div>



                <div className="col-lg-12 col-md-12 col-sm-12 colxs-12">
                  <label
                    htmlFor="comments"
                    className="mt-2"
                    style={{
                      fontSize: 14,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Comments
                  </label>
                  <input
                    type="text"
                    name="comments"
                    id="comments"
                    value={comments}
                    onChange={handleCommentsChange}
                    className="form-control mt-2"
                    placeholder="Add Comments"
                    required
                    style={{
                      height: "50px",
                      borderRadius: "8px",
                      fontSize: 16,
                      color: comments ? "#222" : "#4b4b4b",
                      fontFamily: "Gilroy",
                      fontWeight: comments ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                    }}
                  />
                </div>

                {dateDifference !== null && (
                  <div className="col-12 mt-3">
                    <p
                      style={{
                        fontSize: 15,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "#1E45E1",
                      }}
                    >
                      ( Notice Days* - {dateDifference} days )
                    </p>
                  </div>
                )}
              </div>
              {state.UsersList.errorMessageAddCheckOut && (
                <div className="d-flex align-items-center p-1 mt-6">
                  <MdError style={{ color: "red", marginRight: "5px", }} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,

                    }}
                  >
                    {state.UsersList.errorMessageAddCheckOut}
                  </label>
                </div>
              )}




            </div>

          </div>

          {isChangedError && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ color: "red", }}
            >
              <MdError style={{ fontSize: "14px", marginRight: "6px" }} />
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {isChangedError}
              </span>
            </div>
          )}


          <Button
            className="mt-3"
            style={{
              borderRadius: "8px",
              fontFamily: "Gilroy",
              fontWeight: "600",
              fontSize: "14px",
              padding: "16px 24px",
              width: "100%",
              backgroundColor: "#1E45E1",
            }}

            onClick={() => {
              if (checkouteditaction) {
                handleCheckOutCustomer();
              } else {
                handleCheckOutCustomer();
              }
            }}



          >
            {currentItem && checkouteditaction
              ? "Save Changes"
              : "Add Check-Out"}
          </Button>
        </Modal.Body>

        {formLoading &&
          <div
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
          </div>
        }


      </Modal>



      <Modal show={cofirmForm} onHide={handleCloseConfirmFormPage} centered backdrop="static">
        <Modal.Header className="d-flex justify-content-between align-items-center">
          <Modal.Title
            style={{
              fontWeight: "600",
              fontSize: "18px",
              fontFamily: "Gilroy",
            }}
          >
            Confirm Check-Out
          </Modal.Title>
          <img
            src={Closecircle}
            alt="Close"
            style={{ cursor: "pointer", width: "24px", height: "24px" }}
            onClick={handleCloseConfirmFormPage}
          />
        </Modal.Header>

        <Modal.Body>
          <div style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll p-2 mt-3 me-3">
            <div className="row row-gap-2 d-flex align-items-center">



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
                    Current Floor{" "}

                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter Name"
                    type="text"
                    value={floorname}

                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #E7F1FF",
                      height: 50,
                      borderRadius: 8,
                      backgroundColor: "#E7F1FF",
                    }}
                  />
                </Form.Group>
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
                    Current Bed{" "}
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                    value={bedname}

                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #E7F1FF",
                      height: 50,
                      borderRadius: 8,
                      backgroundColor: "#E7F1FF",
                    }}
                  />
                </Form.Group>
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
                    Check-Out Date{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>



                  <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%", }}>
                    <DatePicker
                      style={{
                        width: "100%", height: 48, cursor: "pointer",
                        backgroundColor: conformEdit ? "#E7F1FF" : "#fff",
                        color: conformEdit ? "#000" : "#000"
                      }}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={checkOutDate ? dayjs(checkOutDate) : null}
                      onChange={(date) => {
                        setCheckOutDateError('');
                        setIsChangedError("");
                        setCheckOutDate(date ? date.toDate() : null);
                      }}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".show-scroll") || document.body
                      }
                      disabled={conformEdit}
                    />
                  </div>
                </Form.Group>
                {checkoUtDateError && (
                  <div
                    className="d-flex align-items-center p-1"
                    style={{ marginTop: "-6px" }}
                  >
                    <MdError
                      style={{
                        color: "red",
                        marginRight: "5px",
                        fontSize: "12px",
                      }}
                    />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {checkoUtDateError}
                    </label>
                  </div>
                )}
              </div>


              <div className="col-lg-6 col-md-6 col-sm-12 colxs-12 mt-2">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <label
                    htmlFor="Advance"
                    style={{
                      fontSize: 14,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Total Advance
                  </label>


                </div>

                <input
                  type="text"
                  name="Advance"
                  id="Advance"
                  value={advanceamount}

                  className="form-control mt-2"
                  placeholder="Add Advance Amount"
                  required
                  style={{
                    height: "50px",
                    borderRadius: "8px",
                    fontSize: 16,
                    color: comments ? "#222" : "#4b4b4b",
                    fontFamily: "Gilroy",
                    fontWeight: comments ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                  }}
                />
              </div>


              <h6>Advance Deduction</h6>

              <div className="row align-items-center">

                {fields.map((item, index) => {
                  const isHidden = index !== 0 && item.reason?.toLowerCase() === 'advance return';
                  if (isHidden) return null;

                  visibleIndex++;

                  const isLastVisible = visibleIndex === fields.filter(f => f.reason?.toLowerCase() !== 'advance return' || fields.indexOf(f) === 0).length - 1;

                  return (
                    <React.Fragment key={index}>
                      <div className="col-lg-5 col-md-6 col-sm-12">
                        <label htmlFor={`reason-${index}`} className="form-label" style={labelStyle}>
                          {index === 0 ? 'DueAmount ' : 'Reason'}
                        </label>
                        <input
                          type="text"
                          id={`reason-${index}`}
                          name={`reason-${index}`}
                          placeholder={index === 0 ? 'Due Reason' : 'Enter Reason'}
                          value={item.reason}
                          onChange={(e) => handleInputChange(index, "reason", e.target.value)}
                          className="form-control"
                          style={inputStyle}
                          disabled={index === 0}
                        />
                      </div>

                      <div className="col-lg-5 col-md-6 col-sm-12">
                        <label htmlFor={`amount-${index}`} className="form-label" style={labelStyle}>
                          Amount
                        </label>
                        <input
                          type="text"
                          id={`amount-${index}`}
                          name={`amount-${index}`}
                          placeholder={index === 0 ? `₹${dueamount || 0}` : 'Enter Amount'}
                          value={index === 0 ? (fields[0].amount || dueamount || "") : item.amount}
                          onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                          className="form-control"
                          style={inputStyle}
                          disabled={index === 0}
                        />
                      </div>

                      <div
                        className="col-lg-2 col-md-12 col-sm-12 d-flex justify-content-center align-items-center gap-2"
                        style={{ marginTop: 30 }}
                      >
                        {isLastVisible && (
                          <img
                            src={PlusIcon}
                            alt="plus"
                            width={25}
                            height={25}
                            style={{ cursor: "pointer" }}
                            onClick={handleAddField}
                          />
                        )}
                        {fields.length > 1 && index !== 0 && (
                          <img
                            src={Delete}
                            alt="remove"
                            width={20}
                            height={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveField(index)}
                          />
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}



              </div>

              {(conformEdit) && (
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
                      Payment Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                      <DatePicker
                        style={{ width: "100%", height: 48, cursor: "pointer" }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={paymentDate ? dayjs(paymentDate) : null}
                        onChange={(date) => {
                          setIsChangedError("");
                          setNoChangeMessage("")
                          setPaymentDate(date ? date.toDate() : null);
                        }}
                        getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                      />
                    </div>
                  </Form.Group>


                </div>
              )}


              <div className="col-lg-6 col-md-6 col-sm-12">
                <label
                  htmlFor="amount"
                  className="form-label"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  ReturnAmount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Enter Return Amount"
                  className="form-control"
                  disabled

                  value={returnAmount}
                  style={{
                    height: "50px",
                    borderRadius: "8px",
                    fontSize: 16,
                    color: "#222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                  }}
                />
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                    Mode of Transaction{" "}
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
                    className=""
                    id="vendor-select"
                    style={{
                      fontSize: 16,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: modeOfPayment ? 600 : 500,
                      cursor: "pointer"
                    }}
                  >

                    <option value="">Select Mode Of Payment</option>
                    {Array.isArray(state.bankingDetails?.bankingList?.banks) &&
                      state.bankingDetails?.bankingList?.banks.map((item) => {
                        let label = "";
                        if (item.type === "bank") label = 'Bank';
                        else if (item.type === "upi") label = "UPI";
                        else if (item.type === "card") label = "Card";
                        else if (item.type === "cash") label = "Cash";

                        return (
                          <option key={item.id} value={item.id}>
                            {`${item.benificiary_name} - ${label}`}
                          </option>
                        );
                      })}

                  </Form.Select>


                {modeOfPaymentError && (
                  <div
                    className="d-flex justify-content-start align-items-start"
                    style={{ color: "red", marginTop: 15 }}
                  >
                    <MdError style={{ fontSize: "14px", marginRight: "6px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {modeOfPaymentError}
                    </span>
                  </div>
                )}




                </Form.Group>

              </div>


            <div className="col-lg-12 col-md-12 col-sm-12 colxs-12">
              <label
                htmlFor="comments"
                className="mt-2"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Comments
              </label>
              <input
                type="text"
                name="comments"
                id="comments"
                value={comments}
                onChange={handleCommentsChange}
                className="form-control mt-2"
                placeholder="Add Comments"
                required
                style={{
                  height: "50px",
                  
                  borderRadius: "8px",
                  fontSize: 16,
                  color: comments ? "#222" : "#4b4b4b",
                  fontFamily: "Gilroy",
                  fontWeight: comments ? 600 : 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                }}
              />
            </div>

              {dateDifference !== null && (
                <div className="col-12 mt-3">
                  <p
                    style={{
                      fontSize: 15,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      color: "#1E45E1",
                    }}
                  >
                    ( Notice Days* - {dateDifference} days )
                  </p>
                </div>
              )}
            </div>
            {state.UsersList.errorMessageAddCheckOut && (
              <div ref={errorRef} className="d-flex align-items-center p-1 mt-6">
                <MdError style={{ color: "red", marginRight: "5px", }} />
                <label
                  className="mb-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,

                  }}
                >
                  {state.UsersList.errorMessageAddCheckOut}
                </label>
              </div>
            )}



            {isChangedError && (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ color: "red", marginTop: 15 }}
              >
                <MdError style={{ fontSize: "14px", marginRight: "6px" }} />
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {isChangedError}
                </span>
              </div>
            )}

            {conformcheckErr && (
              <div
                ref={errorRef}
                className="d-flex justify-content-center align-items-center"
                style={{ color: "red", marginTop: 15 }}
              >
                <MdError style={{ fontSize: "14px", marginRight: "6px" }} />
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {conformcheckErr}
                </span>
              </div>
            )}
            {noChangeMessage && (
              <div
                ref={nochangeRef}
                className="d-flex justify-content-center align-items-center"
                style={{ color: "red", marginTop: 15 }}
              >
                <MdError style={{ fontSize: "14px", marginRight: "6px" }} />
                <span
                  style={{
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {noChangeMessage}
                </span>
              </div>
            )}
          </div>

          <Button
            className="mt-3"
            style={{
              borderRadius: "8px",
              fontFamily: "Gilroy",
              fontWeight: "600",
              fontSize: "14px",
              padding: "16px 24px",
              width: "100%",
              backgroundColor: "#1E45E1",
            }}



            onClick={conformEdit ? handleConfirmEditCheckout : handleConfirmCheckout}



          >
            {conformEdit
              ? "Save Changes"

              : "Confirm Check-Out"}

          </Button>
        </Modal.Body>
        {formCheckoutLoading &&
          <div
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
          </div>
        }
      </Modal>

    </>
  );
};

CheckOutForm.propTypes = {
  uniqueostel_Id: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  checkoutaction: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  checkouteditaction: PropTypes.func.isRequired,
  checkoutaddform: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  cofirmForm: PropTypes.func.isRequired,
  handleCloseConformForm: PropTypes.func.isRequired,
  conformEdit: PropTypes.func.isRequired,
};

export default CheckOutForm;
