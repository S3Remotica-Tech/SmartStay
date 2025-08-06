/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import Closecircle from "../../Assets/Images/close-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import moment from "moment";
import Image from "react-bootstrap/Image";
import People from "../../Assets/Images/New_images/profile-picture.png";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { CloseCircle } from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";


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
  const [fields, setFields] = useState([]);
  const [noChangeMessage, setNoChangeMessage] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const errorRef = useRef(null);
  const [formLoading, setFormLoading] = useState(false)
  const [formCheckoutLoading, setFormCheckoutLoading] = useState(false)
  const nochangeRef = useRef(null)
  const [errors, setErrors] = useState([]);



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
    setFormLoading(false)
    setFormCheckoutLoading(false)

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

    setFields([{ reason: "", amount: "", }]);
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



  


  // useEffect(() => {

  //   setFields(prevFields => {
  //     const otherFields = prevFields.filter((_, i) => i !== 0);
  //     return [
  //       { reason: "DueAmount", amount: String(dueamount || "") },
  //       ...otherFields,
  //     ];
  //   });
  // }, [dueamount]);


  

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
          id: item?.id || "",
          reason: item.reason || "",
          amount: String(item.amount || "")
        }));

      const dueAmountValue = outstandingDueAmount || String(dueamount || "");

      setFields([
        { id: "", reason: "DueAmount", amount: dueAmountValue },
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
      setCustomerError("Please Select Customer");

    }



    if (!checkOutDate) {
      setCheckOutDateError("Please Select  Check-Out Date");

    }

    if (!checkOutrequestDate) {
      setCheckOutRequestDateError("Please Select  Request Date");

    }

    if (!selectedCustomer || !checkOutDate || !checkOutrequestDate) {
      return;
    }

    const reqDate = new Date(
      moment(checkOutrequestDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    const outDate = new Date(
      moment(checkOutDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );

    reqDate.setHours(0, 0, 0, 0);
    outDate.setHours(0, 0, 0, 0);

    if (outDate < reqDate) {
      setCheckOutDateError("Before Request Date not allowed");
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
      cursor: "pointer"
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
      setFormLoading(false)
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
   
    let hasReasonAmountError = false;
    let newErrors = [];


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
    const formattedCheckOutDate = moment(checkOutDate, "DD-MM-YYYY");
    const formattedRequestDate = moment(data.req_date, "YYYY-MM-DD");

    if (formattedCheckOutDate.isBefore(formattedRequestDate, 'day')) {
      setCheckOutDateError("Before Request Date not allowed");
      return;
    }



    if (advanceamount) {
      // const nonEmptyFields = fields.filter(
      //   (field) =>
      //     field.reason !== "DueAmount" &&
      //     (field.reason?.trim() !== "" || field?.amount.trim() !== "")
      // );



 const formattedReasons = fields.map((item) => {
      let reason_name = "";

      if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
        reason_name = item.customReason || item["custom Reason"] || "";
      } else {
        reason_name = item.reason || item.reason_name || "";
      }

      const error = { reason: "", amount: "" };
      if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
        error.amount = "Please enter amount";
        hasReasonAmountError = true;
      }


      if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
        error.reason = "Please enter reason";
        hasReasonAmountError = true;
      }

      newErrors.push(error);
      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput
      };
    });

    setErrors(newErrors)

    if (hasReasonAmountError) return;


console.log("Payload****************", {
  checkout_date: formattedDate,
  id: selectedCustomer,
  hostel_id: data.Hostel_Id,
  comments: comments,
  advance_return: returnAmount,
  reinburse: 1,
  reasons: formattedReasons,
  payment_id: modeOfPayment,
});
      dispatch({
        type: "ADDCONFIRMCHECKOUTCUSTOMER",
        payload: {
          checkout_date: formattedDate,
          id: selectedCustomer,
          hostel_id: data.Hostel_Id,
          comments: comments,
          advance_return: returnAmount,
          reinburse: 1,
          reasons: formattedReasons,
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
    const filterUserList = state.UsersList.Users?.filter(
      (u) => u.ID === selectedCustomer
    );

    const joiningDate = filterUserList?.[0]?.user_join_date;

    if (
      joiningDate &&
      moment(checkOutDate, "DD-MM-YYYY").isBefore(moment(joiningDate, "YYYY-MM-DD"))
    ) {
      setNoChangeMessage("Before join date not allowed");
      return;
    }

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
      setFormLoading(false)
      handleCloseConfirmFormPage()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodeAddConfirmCheckout]);



  useEffect(() => {
    if (state.UsersList.statusCodeConformEdit === 200) {
      setFormCheckoutLoading(false)
      setFormLoading(false)
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
  const advance = parseFloat(advanceamount) || 0;

  // Ignore the first field only if not in conformEdit mode
 

  // Sum of all amounts excluding "advance return"
  const totalFieldAmount = fields.reduce((acc, curr) => {
   
    const amt = parseFloat(curr.amount);
    return acc + (isNaN(amt) ? 0 : amt);
  }, 0);

  const due = advance - totalFieldAmount;
   setReturnAmount(due); 
}, [advanceamount, fields, conformEdit]);

console.log("fields",fields)


  // const handleInputChange = (index, field, value) => {
  //   const updatedFields = [...fields];
  //   updatedFields[index][field] = value;
  //   setNoChangeMessage("")


  //   setFields(updatedFields);
  // };



  // const handleAddField = () => {
  //   setFields([...fields, { reason: "", amount: "" }]);
  //   setNoChangeMessage("")
  //   setConformCheckErr("")
  //   dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  // };




  

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 200) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 2000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])





  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];



  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
    setNoChangeMessage("")
    setConformCheckErr("")
    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };

  const handleInputChange = (index, field, value) => {
    setNoChangeMessage("")
    const updatedFields = [...fields];
    const updatedErrors = [...errors];

    if (field === "reason") {
      if (value === "others") {
        updatedFields[index].showInput = true;
        updatedFields[index].reason_name = "others";
        updatedFields[index].customReason = "";
      } else {
        updatedFields[index].showInput = false;
        updatedFields[index].reason = value;
        updatedFields[index].reason_name = value;
        updatedFields[index].customReason = "";
      }


      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "customReason") {
      updatedFields[index].customReason = value;
      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      updatedFields[index].amount = value;


      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
  };



  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
    setConformCheckErr("")
    setNoChangeMessage("")
    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };






console.log("checkouteditaction",checkouteditaction)





  return (
    <>
      <Modal show={show} onHide={handlecloseform} centered backdrop="static"
        style={{
          width: "100%",
          paddingRight: "10px",
          borderRadius: "30px",
        }}>
        <Modal.Dialog
          style={{
            minWidth: 500,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
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

          <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll pt-0 mt-2 me-3">
            <div >
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
                          Customer {" "}
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
                                fontSize: "14px",
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
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Current Floor {" "}

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
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Current Bed {" "}
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
                        Request Date {" "}
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </Form.Label>


                      <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy",
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={checkOutrequestDate ? dayjs(checkOutrequestDate) : null}
                          onChange={(date) => {
                            setCheckOutRequestDateError("");
                            setIsChangedError("");
                            setCheckOutRequestDate(date ? date.toDate() : null);
                          }}
                          disabledDate={(current) => current && current > dayjs().endOf("day")}

                          getPopupContainer={() =>
                            document.body
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
                            fontSize: "14px",
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
                        Check-Out Date {" "}
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </Form.Label>



                      <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>

                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy",
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={checkOutDate ? dayjs(checkOutDate) : null}
                          onChange={(date) => {
                            setCheckOutDateError('');
                            setIsChangedError("");
                            setCheckOutDate(date ? date.toDate() : null);
                          }}

                          getPopupContainer={() => document.body}
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
                            fontSize: "14px",
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
                      className="form-control mt-2 mb-3"
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
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {isChangedError}
                </span>
              </div>
            )}



          </Modal.Body>


          {state.createAccount?.networkError ?
            <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
              <MdError style={{ color: "red", marginRight: '5px', fontSize: 14 }} />
              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
            </div>
            : null}

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
          <Modal.Footer
            className="d-flex align-items-center justify-content-center pt-0"
            style={{ border: "none" }}
          >
            <Button
              className=""
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
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>



      <Modal show={cofirmForm} onHide={handleCloseConfirmFormPage} centered backdrop="static" dialogClassName="custom-modals-style"
      >
        <Modal.Dialog
          style={{
            paddingRight: "10px",
            borderRadius: "30px",

          }}
          className="m-0 p-0"

        >
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

          <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll pt-2 mt-2 me-3">
            <div >
              <div className="row row-gap-2 d-flex align-items-center">

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="d-flex gap-3 align-items-center">
                  <Image
                    src={
                      data?.user_profile !== undefined &&
                        data?.user_profile !== null &&
                        data?.user_profile !== '' &&
                        data?.user_profile !== '0'
                        ? data.user_profile
                        : Profile2
                    }

                    roundedCircle
                    style={{ height: 55, width: 55, cursor: "pointer" }}
                  />
                  <div>
                    <label  style={{
                        fontSize: 20,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                      }}>{data?.Name}</label>
                  </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group className="mb-2">
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
                  <Form.Group className="mb-2">
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
                          color: conformEdit ? "#000" : "#000",
                          fontFamily: "Gilroy"
                        }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={checkOutDate ? dayjs(checkOutDate) : null}
                        onChange={(date) => {
                          setCheckOutDateError('');
                          setIsChangedError("");
                          setCheckOutDate(date ? date.toDate() : null);
                        }}
                        getPopupContainer={() => document.body}
                        disabled={conformEdit}
                      />
                    </div>
                  </Form.Group>
                  {checkoUtDateError && (
                    <div
                      className="d-flex align-items-center p-1"
                      style={{ marginTop: "-6px" }}>
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




                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>Advance Deduction</h6>
                  <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-1 mb-3">

                    <div className="d-flex justify-content-between align-items-center p-2">
                      <div>
                        <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                      </div>
                      <div>
                        <Button
                          onClick={handleAddField}
                          style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "10px",
                            padding: "6px 15px",
                            marginBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <img
                            src={addcircle}
                            alt="Assign Bed"
                            style={{
                              height: 16,
                              width: 16,
                              filter: "brightness(0) invert(1)",
                            }}
                          />
                          Add
                        </Button>

                      </div>
                    </div>


                    {fields.map((item, index) => {
                      const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                      const filteredOptions = reasonOptions.map((opt) => {
                        if (opt.value === "maintenance") {
                          return {
                            ...opt,
                            isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                          };
                        }
                        return opt;
                      });

                      return (
                        <div className="row px-4 mb-3" key={index}>
                          <div className="col-md-6">


                            {!item.showInput ? (
                              <Select
                                options={filteredOptions}
                                value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                onChange={(selectedOption) => {
                                  const selectedValue = selectedOption.value;

                                  if (selectedValue === "others") {
                                    handleInputChange(index, "reason", "others");
                                  } else {
                                    handleInputChange(index, "reason", selectedValue);
                                  }
                                }}
                                isDisabled={item.reason === "maintenance"}
                                menuPlacement="auto"
                                styles={{
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
                                    cursor: "pointer",
                                  }),
                                  indicatorSeparator: () => ({
                                    display: "none",
                                  }),
                                  option: (base, state) => ({
                                    ...base,
                                    cursor: state.isDisabled ? "not-allowed" : "pointer",
                                    backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                    color: state.isDisabled ? "#aaa" : "#000",
                                  }),
                                }}
                              />
                            ) : (
                              <>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter custom reason"
                                  value={item.customReason}
                                  onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
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
                              </>
                            )}
                            {errors[index]?.reason && (
                              <div className="d-flex align-items-center mt-1">
                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                <label
                                  className="mb-0"
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {errors[index]?.reason}
                                </label>
                              </div>
                            )}
                          </div>


                          <div className="col-md-5">

                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={item.amount}
                              onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                              className="form-control"
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
                            {errors[index]?.amount && (
                              <div className="d-flex align-items-center mt-1">
                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                <label
                                  className="mb-0"
                                  style={{
                                    color: "red",
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {errors[index]?.amount}
                                </label>
                              </div>
                            )}
                          </div>


                          <div className="col-md-1 d-flex justify-content-center align-items-center p-0">

                            {index !== 0 && (
                              <Trash
                                size="20"
                                color="red"
                                variant="Bold"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveField(index)}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}




                  </div>
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
                          getPopupContainer={() => document.body}
                        />
                      </div>
                    </Form.Group>


                  </div>
                )}


                <div className="col-lg-12 col-md-12 col-sm-12">
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
                        style={{ color: "red", marginTop: 5, }}
                      >
                        <MdError style={{ fontSize: "14px", marginRight: "6px", marginTop: "1px" }} />
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


              {isChangedError && (
                <div
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
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {noChangeMessage}
                  </span>
                </div>
              )}
            </div>


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
          <Modal.Footer
            className="d-flex align-items-center justify-content-center"
            style={{ border: "none" }}
          >

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

          </Modal.Footer>

        </Modal.Dialog>

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
