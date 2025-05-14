/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
import {  FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import PlusIcon from "../Assets/Images/New_images/plusIcon.png";
// import Closebtn from "../Assets/Images/CloseCircle.png";
import Delete from "../Assets/Images/New_images/trash.png";
import {CloseCircle} from "iconsax-react";

const CheckOutForm = ({
  // item,
  uniqueostel_Id,
  show,
  handleClose,
  currentItem,
  // checkoutaction,
  data,
  checkouteditaction,
  // checkoutaddform,
  cofirmForm,
  conformEdit,
  // setConfirmForm,
  handleCloseConformForm
}) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();


console.log("CheckOutForm",state)
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkOutrequestDate, setCheckOutRequestDate] = useState("");
  // const [currentFloor, setCurrentFloor] = useState("");
  // const [currentBed, setCurrentBed] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  // const [noticeDays, setNoticeDays] = useState("");
  const [comments, setComments] = useState("");
  const [advanceamount, setAdvanceAmount] = useState("");
  const [dueamount, SetDueAmount] = useState('');
  const [invoicenumber, SetInvoiceNumber] = useState([]);
  const [bedname, setBedname] = useState("");
  const [floorname, setFloorname] = useState("");
const [paymentDate,setPaymentDate] = useState("")
const [fields, setFields] = useState([{ reason: "", amount: "" }]);
const [noChangeMessage, setNoChangeMessage] = useState("");

console.log("reason", fields);


  const handlecloseform = () => {
    handleClose();
    setSelectedCustomer("");
    // setCurrentBed("");
    // setCurrentFloor("");
    // setNoticeDays("");
    setComments("");
    setCheckOutDate("");
    setCheckOutRequestDate("");
    setBedname("");
    setFloorname("");
    setCheckOutDateError("");
    // setGeneralError("");
    setCustomerError("");
    setCheckOutRequestDateError("");
    setDateDifference(null);
    // setReinburse(0)
    SetDueAmount('')
    
  };

  const handleCloseConfirmFormPage = ()=>{
    // handleCloseConformForm(false)
    if (typeof handleCloseConformForm === "function") {
      handleCloseConformForm(); 
    }
    dispatch({type:'CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR'})
     dispatch({type:'CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR'})
    setConformCheckErr("")
    setNoChangeMessage("")
    // setFields("")
    setFields([{ reason: "", amount: "" }]); 
  }

  // const [isChecked, setIsChecked] = useState(false);

  

  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption ? selectedOption.value : "");
    // setGeneralError("");
    setCustomerError("");
  };

  

  const handleCommentsChange = (event) => {
    // setGeneralError("");
    setComments(event.target.value);
    setNoChangeMessage("")
  };

 

  const [dateDifference, setDateDifference] = useState(null);

  // const calculateDateDifference = (checkOutDate, checkOutrequestDate) => {
  //   if (checkOutDate && checkOutrequestDate) {
  //     const diffInMs = checkOutDate - checkOutrequestDate;
  //     const diffInDays =
  //       Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24)) + 1;
  //     setDateDifference(diffInDays);
  //   } else {
  //     setDateDifference(null);
  //   }
  // };


  useEffect(() => {
    if (currentItem) {
      setCheckOutDate(
        currentItem.CheckoutDate ? new Date(currentItem.CheckoutDate) : null
      );
      setCheckOutRequestDate(
        currentItem.req_date ? new Date(currentItem.req_date) : null
      );
      setSelectedCustomer(currentItem.ID);
      // setCurrentBed(currentItem.Bed);
      // setCurrentFloor(currentItem.Floor);
      // setNoticeDays(currentItem.notice_period);
      setComments(currentItem.checkout_comment);
      setBedname(currentItem.bed_name);
      setFloorname(currentItem.floor_name);
    } else {
      setCheckOutDate("");
      setCheckOutRequestDate("");
      setSelectedCustomer("");
      // setCurrentBed("");
      // setCurrentFloor("");
      // setNoticeDays("");
      setComments("");
      setBedname("");
      setFloorname("");
      dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    }
  }, [currentItem, show]);

  useEffect(() => {
    if (data) {
      console.log("data.,.sdi",data)
      setCheckOutDate(data.CheckoutDate ? new Date(data.CheckoutDate) : null);
      setPaymentDate(data.CheckoutDate ? new Date(data.CheckoutDate) : null)
      setCheckOutRequestDate(data.req_date ? new Date(data.req_date) : null);
      setSelectedCustomer(data.ID);
      // setCurrentBed(data.Bed);
      // setCurrentFloor(data.Floor);
      // setNoticeDays(data.notice_period);
      setComments(data.checkout_comment);
      setBedname(data.bed_name);
      setFloorname(data.floor_name);
     
    } else {
      setCheckOutDate("");
      setCheckOutRequestDate("");
      setSelectedCustomer("");
      // setCurrentBed("");
      // setCurrentFloor("");
      // setNoticeDays("");
      setComments("");
      setBedname("");
      setFloorname("");
    //     if (data?.amenities && data?.amenities.length > 0) {
    //   const mappedFields = data?.amenities.map(item => ({
    //     reason: item.reason || "",
    //     amount: item.amount || ""
    //   }));
    //   console.log("mappeditems",mappedFields);
    //   console.log("data?.amenities",data?.amenities)
      
    //   setFields(mappedFields);
    // } else {
    //   setFields([{ reason: "", amount: "" }]);
    // }
      // SetDueAmount(0);
      dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    }
  }, [data, show]);


useEffect(() => {
  // Always ensure DueAmount is the first field
  setFields(prevFields => {
    const otherFields = prevFields.filter((_, i) => i !== 0); // Remove index 0
    return [
      { reason: "DueAmount", amount: String(dueamount || "") },
      ...otherFields,
    ];
  });
}, [dueamount]);

// useEffect(() => {
//   if (data?.amenities?.length > 0) {
//     const amenityFields = data.amenities.map(item => ({
//       reason: item.reason || "",
//       amount: String(item.amount || ""),
//     }));

//     setFields(prevFields => {
//       // Keep DueAmount at index 0, replace others with amenities
//       const dueField = prevFields.find(f => f.reason === "DueAmount") || {
//         reason: "DueAmount",
//         amount: String(dueamount || ""),
//       };
//       return [dueField, ...amenityFields];
//     });
//   }
// }, [data?.amenities]);

//  useEffect(() => {
//   if (data?.amenities?.length > 0) {
//     const amenityFields = data.amenities.map(item => ({
//       reason: item.reason || "",
//       amount: String(item.amount || ""),
//     }));

//     setFields(prevFields => {
//       const dueField = prevFields.find(f => f.reason === "DueAmount") || {
//         reason: "DueAmount",
//         amount: String(dueamount || ""),
//       };
//       return [dueField, ...amenityFields];
//     });
//   }
// }, [data?.amenities]);

useEffect(() => {
  if (data?.amenities?.length > 0) {
    let outstandingDueAmount = "";
    const amenityFields = data.amenities
      .filter(item => {
        if (item.reason === "Outstanding Due") {
          outstandingDueAmount = String(item.amount || "");
          return false; // Skip this item
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
          // setCurrentBed(user.Bed);
          setBedname(user.Bed);
        }

        if (user.bed_name !== undefined && user.bed_name !== null) {
          setBedname(user.bed_name);
        }
      
        setFloorname(filteruserlist[0].floor_name);

        if (user.floor_name !== undefined && user.floor_name !== null) {
          setFloorname(user.floor_name);
        }
      } else {
        console.log(
          "No matching user found for selectedCustomer",
          selectedCustomer
        );
      }
    }
  }, [selectedCustomer, state.UsersList.Users, data, currentItem]);

  // const [generalError, setGeneralError] = useState("");
  const [customerWError, setCustomerError] = useState("");
  const [checkoUtDateError, setCheckOutDateError] = useState("");
  const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");

  

  const handleCheckOutCustomer = () => {
    const formattedDate = moment(checkOutDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const formattedrequestDate = moment(
      checkOutrequestDate,
      "DD-MM-YYYY"
    ).format("YYYY-MM-DD");

    // let isValid = true;

    if (!selectedCustomer) {
      setCustomerError("Please Select a Customer");
      // isValid = false;
    }

    // if (!uniqueostel_Id) {
    //   setHostelError('Please select a hostel.');
    //   isValid = false;
    // }

    if (!checkOutDate) {
      setCheckOutDateError("Please Select a Check-Out Date");
      // isValid = false;
    }

    if (!checkOutrequestDate) {
      setCheckOutRequestDateError("Please Select a Request Date");
      // isValid = false;
    }

    if (!selectedCustomer || !checkOutDate || !checkOutrequestDate) {
      // setGeneralError("Please select all mandatory fields.");
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
        comments && comments !== currentItem?.checkout_comment;

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
    }
    setSelectedCustomer("");
    // setCurrentBed("");
    // setCurrentFloor("");
    // setNoticeDays("");
    setComments("");
    setCheckOutDate("");
    setCheckOutRequestDate("");
    setBedname("");
    setFloorname("");
    setCheckOutDateError("");
    // setGeneralError("");
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
      // SetDueAmount(
      //   state?.UsersList?.GetconfirmcheckoutBillDetails[0]?.balance || 0
      // );
      SetInvoiceNumber(state?.UsersList?.GetconfirmcheckoutBillDetails);
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodegetConfirmCheckout]);


  
  



  const validInvoices = invoicenumber.filter((invoice) => invoice.balance > 0);

  // const invoiceDisplay = validInvoices
  //   .map((invoice) => `${invoice.invoiceid} - ${invoice.balance}`)
  //   .join(", ");
  const hasBalance =
    Array.isArray(validInvoices) &&
    validInvoices.some((invoice) => invoice.balance > 0);

  useEffect(() => {
    if (validInvoices && hasBalance ) {
      const totaldueamount = validInvoices.reduce(
        (total, invoice) => total + invoice.balance,
        0
      );
      SetDueAmount(totaldueamount);
      
    }
  }, [validInvoices]);


// const handleAddAmount = (e)=>{
//   setAddAmount(e.target.value)
// }
// const handleAddAmount = (e) => {
//   const value = e.target.value;
//   setAddAmount(value);

//   const numericValue = parseFloat(value);
//   if (!isNaN(numericValue)) {
//     const result = advanceamount - numericValue;
//     setReturnAmount(result);
//   } else {
//     setReturnAmount("");
//   }
// };
// const [advanceamount, setAdvanceAmount] = useState(0);
// const [addAmount, setAddAmount] = useState("");
// const [returnAmount, setReturnAmount] = useState("");

// Optional: dynamic fields (if you add more in future)
// const [extraAmounts, setExtraAmounts] = useState([]);
// const [addAmount,setAddAmount] = useState("")
const [returnAmount,setReturnAmount] = useState("")

// This function will calculate returnAmount on change
// const handleAddAmount = (e) => {
//   const value = e.target.value;
//   setAddAmount(value);

//   const numericAdd = parseFloat(value);
//   const numericDue = parseFloat(dueamount);
//   const numericAdvance = parseFloat(advanceamount);

//   // Optional: total of extra/dynamic fields
//   const extraTotal = extraAmounts.reduce((sum, a) => sum + parseFloat(a.amount || 0), 0);

//   if (!isNaN(numericAdd)) {
//     const result = numericAdvance - (numericDue + numericAdd + extraTotal);
//     setReturnAmount(result.toFixed(2));
//   } else {
//     setReturnAmount("");
//   }
// };

  // const handleCheckboxChange = (e) => {
  //   const checked = e.target.checked;
    

  //   setIsChecked(checked);

  //   if (checked && dueamount > 0) {
  //     const updatedAdvanceAmount = advanceamount - dueamount;
  //     setAdvanceAmount(updatedAdvanceAmount);
      
      
  //   SetDueAmount(0);
            
  //   }
  // };
//  const [reinburse, setReinburse] = useState(0)
  // useEffect(()=> {
  //   if(isChecked){
  //     SetDueAmount(0);
  //     // const Reinburse = isChecked ? 1 : 0;
  //     setReinburse(1)
  //   }
  // },[isChecked])

  // useEffect(() => {
  //   if (!isChecked) {
  //     setAdvanceAmount(
  //       state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount
  //     );
      
  //     // SetDueAmount(
  //     //   state?.UsersList?.GetconfirmcheckoutBillDetails[0]?.balance || 0
  //     // );
  //   }
  // }, [isChecked]);

  const handleConfirmCheckout = () => {

    
    if (!selectedCustomer || !data.Hostel_Id || !checkOutDate ) {
      return;
    }
    if (!selectedCustomer) {
      setCustomerError("Please Select a Customer");
      // return;
    }

    

    if (!checkOutDate) {
      setCheckOutDateError("Please select a checkout Date");
      // return;
    }


    const formattedDate = moment(checkOutDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );

   

    if (selectedCustomer && data.Hostel_Id && formattedDate && advanceamount) {
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
        },
      });
    }




  
  };

const [initialData, setInitialData] = useState({});
// useEffect(() => {
//   if (data) {
//     setInitialData({
//       comments: data.checkout_comment || "",
//       returnAmount: String(data.advance_return || ""),
//       amenities: data.amenities || [],
//     });
//   }
// }, [data]);
// useEffect(() => {
//   if (data) {
//     setInitialData({
//       comments: data.checkout_comment || "",
//       returnAmount: String(data.advance_return || ""),
//       reason: data.amenities || [],
//       paymentDate: data.CheckoutDate ? moment(data.CheckoutDate).format("YYYY-MM-DD") : "",
//     });
//   }
// }, [data]);
useEffect(() => {
  if (data) {
    const initialReasons = (data.amenities || []).map((item) => ({
      reason: item.reason || "",
      amount: String(item.amount || ""),
    }));

    setInitialData({
      comments: data.checkout_comment || "",
      // returnAmount: String(data.advance_return || ""),
      reason: initialReasons, // ✅ only reason & amount
      paymentDate: data.CheckoutDate ? moment(data.CheckoutDate).format("YYYY-MM-DD") : "",
    });
  }
}, [data]);




const handleConfirmEditCheckout = () => {
  if (!conformEdit) return;

  if (!selectedCustomer || !data.Hostel_Id || !checkOutDate) {
    setNoChangeMessage("Please fill all required fields.");
    return;
  }

  const formattedDate = moment(checkOutDate).format("YYYY-MM-DD");
 const currentReasonFields = fields.filter(
  (field) =>
    field.reason !== "DueAmount" &&
    (field.reason.trim() !== "" || field.amount.trim() !== "")
);

// Format current payment date
const formattedPaymentDate = paymentDate
  ? moment(paymentDate).format("YYYY-MM-DD")
  : "";

  const formattedIniatialDate = initialData.paymentDate
  ? moment(initialData.paymentDate).format("YYYY-MM-DD")
  : "";

// Compare with initial
const hasCommentsChanged = comments !== initialData.comments;
// const hasReturnAmountChanged = Number(returnAmount) !== Number(initialData.returnAmount);
const haveFieldsChanged = JSON.stringify(currentReasonFields) !== JSON.stringify(initialData.reason);
const hasPaymentDateChanged = formattedPaymentDate !== formattedIniatialDate;


if (
  !hasCommentsChanged &&
  // !hasReturnAmountChanged &&
  !haveFieldsChanged &&
  !hasPaymentDateChanged
) {
  setNoChangeMessage("No Changes Detected.");
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
      user_id: selectedCustomer || currentItem?.ID,
    },
  });
};



// const handleConfirmEditCheckout = () => {
//   if (!conformEdit) return;
//     if (!selectedCustomer || !data.Hostel_Id || !checkOutDate) {
//       return;
//     }
//     if (!selectedCustomer) {
//       setCustomerError("Please Select a Customer");
//       // return;
//     }

    

//     if (!checkOutDate) {
//       setCheckOutDateError("Please select a checkout Date");
//       // return;
//     }


//     const formattedDate = moment(checkOutDate, "DD-MM-YYYY").format(
//       "YYYY-MM-DD"
//     );

   

//     if (selectedCustomer && data.Hostel_Id && formattedDate && advanceamount) {
//       const nonEmptyFields = fields.filter(
//         (field) =>
//           field.reason !== "DueAmount" &&
//           (field.reason.trim() !== "" || field.amount.trim() !== "")
//       );
      
      
//       dispatch({
//         type: "EDITCONFIRMCHECKOUTCUSTOMER",
//         payload: {
//           checkout_date: formattedDate,
//           id: selectedCustomer,
//           hostel_id: data.Hostel_Id,
//           comments: comments,
//           advance_return: returnAmount,
//           reinburse: 1,
//           reasons: nonEmptyFields,
//           payment_date:paymentDate,
//           user_id:selectedCustomer || currentItem?.ID,
//         },
//       });
//     }




  
//   };

  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      handleCloseConfirmFormPage()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodeAddConfirmCheckout]);



   useEffect(() => {
    if (state.UsersList.statusCodeConformEdit === 200) {
      handleCloseConfirmFormPage()
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodeConformEdit]);
  console.log("state.UserList.conformChekoutError",state.UsersList.conformChekoutError)

  
  const [conformcheckErr,setConformCheckErr] = useState("")
  useEffect(()=>{
if(state.UsersList.conformChekoutError){
  setConformCheckErr(state.UsersList.conformChekoutError)

}
  },[state.UsersList.conformChekoutError])

  
  useEffect(()=>{
if(state.UsersList.conformChekoutEditError){
  setConformCheckErr(state.UsersList.conformChekoutEditError)

}
  },[state.UsersList.conformChekoutEditError])
  useEffect(() => {
    const advance = parseFloat(advanceamount) || 0;
    const due = parseFloat(dueamount) || 0;
    const totalExtra = fields
      .slice(1)
      .reduce((acc, curr) => {
        const amt = parseFloat(curr.amount);
        return acc + (isNaN(amt) ? 0 : amt);
      }, 0);
  
    const result = advance - (due + totalExtra);
    setReturnAmount(result);
  }, [advanceamount, dueamount, fields]);
  
  
  // useEffect(() => {
  //   if (fields.length === 0) {
  //     setFields([{ reason: "DueAmount", amount: String(dueamount || "") }]);
  //   } else {
  //     // Always update first field's amount with current dueamount
  //     const updatedFields = [...fields];
  //     updatedFields[0] = {
  //       ...updatedFields[0],
  //       reason: "DueAmount",
  //       amount: String(dueamount || ""),
  //     };
  //     setFields(updatedFields);
  //   }
  // }, [dueamount]);
  
  
  console.log("Advance:", advanceamount, "Due:", dueamount, "Fields:", fields);
  
  // Input field change handlers
  // const handleInputChange = (index, field, value) => {
  //   const updatedFields = [...fields];
  //   updatedFields[index][field] = value;
  //   setFields(updatedFields);
  // };
  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];
    updatedFields[index][field] = value;
    setNoChangeMessage("")
  
    // Optional: If editing first amount field, you could sync with dueamount logic here if needed
    setFields(updatedFields);
  };
  
//  const ReturnAmount = advanceamount - (dueamount + fields);
  
  const handleAddField = () => {
    setFields([...fields, { reason: "", amount: "" }]);
  };
  
  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
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
            style={{ cursor: 'pointer' }}/>
        </Modal.Header>

        <Modal.Body>
          <div className="row row-gap-2">
            { !checkouteditaction && (
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
   
                    // isDisabled={checkouteditaction}
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
                  {/* <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span> */}
                </Form.Label>
                <FormControl
                  id="form-controls"
                  placeholder="Enter Name"
                  type="text"
                  value={floorname}
                  //   onChange={(e) => handleFirstName(e)}
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
                  //   onChange={(e) => handleFirstName(e)}
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
                  style={{ width: "100%", height: 48,cursor:"pointer" }}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={checkOutrequestDate ? dayjs(checkOutrequestDate) : null}
                  onChange={(date) => {
                    setCheckOutRequestDateError("");
                    setIsChangedError("");
                    setCheckOutRequestDate(date ? date.toDate() : null);
                  }}
                  getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
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
                  style={{ width: "100%", height: 48,cursor:"pointer" }}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={checkOutDate ? dayjs(checkOutDate) : null}
                  onChange={(date) => {
                    setCheckOutDateError('');
                    setIsChangedError("");
                    setCheckOutDate(date ? date.toDate() : null);
                  }}
                  getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
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
                      whiteSpace:"nowrap"
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

         

          {isChangedError && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ color: "red",marginTop:15 }}
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




          {/* {data && checkoutaction && !checkoutaddform && dueamount > 0 && (
            <div className="d-flex align-items-center p-1  mt-2" style={{paddingTop:"6px"}}>
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
                This customer has Due Amounts Total Due Amount is Rs{" "}
                {dueamount}
              </label>
            </div>
          )} */}

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
            // disabled={
            //   !checkouteditaction &&
            //   !checkoutaddform &&
            //   dueamount > 0 }
              onClick={() => {
               if (checkouteditaction) {
                  handleCheckOutCustomer();
                } else {
                  handleCheckOutCustomer();
                }
              }}
              
              
               
          >
            { currentItem && checkouteditaction
              ? "Save Changes"
              : "Add Check-Out"}
          </Button>
        </Modal.Body>
      </Modal>

{/* confirm checkout form */}

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
          <div className="row row-gap-2">
          
           

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
                  {/* <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span> */}
                </Form.Label>
                <FormControl
                  id="form-controls"
                  placeholder="Enter Name"
                  type="text"
                  value={floorname}
                  //   onChange={(e) => handleFirstName(e)}
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
                  //   onChange={(e) => handleFirstName(e)}
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
                  style={{ width: "100%", height: 48,cursor:"pointer" ,
      backgroundColor: conformEdit ? "#E7F1FF" : "#fff",
      color: conformEdit ? "#000" : "#000"}}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={checkOutDate ? dayjs(checkOutDate) : null}
                  onChange={(date) => {
                    setCheckOutDateError('');
                    setIsChangedError("");
                    setCheckOutDate(date ? date.toDate() : null);
                  }}
                  getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
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
                     Advance Collected 
                    </label>

                  
                  </div>

                  <input
                    type="text"
                    name="Advance"
                    id="Advance"
                    value={advanceamount}
                    // onChange={handleCommentsChange}
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
  {fields.map((item, index) => (
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
          disabled={index === 0} // 🔒 Disable DueAmount Reason
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
          disabled={index === 0} // 🔒 Disable DueAmount Amount
        />
      </div>

      <div className="col-lg-2 col-md-12 col-sm-12 d-flex justify-content-center align-items-center gap-2" style={{ marginTop: 30 }}>
        {index === fields.length - 1 && (
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
  ))}
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

    {/* {checkoUtDateError && (
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
    )} */}
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
      // onChange={(e)=>handleAddAmount(e)}
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

          {/* {generalError && (
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
          )} */}

          {isChangedError && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ color: "red",marginTop:15 }}
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
           className="d-flex justify-content-center align-items-center"
           style={{ color: "red",marginTop:15 }}
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
              className="d-flex justify-content-center align-items-center"
              style={{ color: "red",marginTop:15 }}
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
           

              // onClick={handleConfirmCheckout}
               onClick={conformEdit ? handleConfirmEditCheckout : handleConfirmCheckout}
              
              
               
          >
            {conformEdit
              ? "Save Changes"
              
              : "Confirm Check-Out"}

          </Button>
        </Modal.Body>
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
