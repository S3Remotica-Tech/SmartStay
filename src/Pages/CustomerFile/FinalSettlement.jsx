/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button,Form,InputGroup} from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
// import { DatePicker } from 'antd';
// import dayjs from 'dayjs';
import { CloseCircle} from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
// import whiteaddcircle from "../../Assets/Images/white_add-circle.png";
import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import arrowTot from "../../Assets/Images/New_images/direction-down 01.png";
// import writeOff from "../../Assets/Images/New_images/writeoff.png";
// import writeOffWhite from "../../Assets/Images/New_images/writeoffWhite.png";
// import addcircleblack from "../../Assets/Images/New_images/add-circle-black.png";
import { Tooltip } from "bootstrap";


function FinalSettlement({ show, handleClose, data, customerID }) {
console.log("customerID",data)

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    console.log("FinalSettlement",state)

    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);
    const [billingError, setBillingError] = useState("");
    // const [comments, setComments] = useState("");
    // const [checkOutDate, setCheckOutDate] = useState("");
//  const [checkOutDate] = useState(() => {
//   const today = new Date();
//   return today.toISOString().split("T")[0];
// });
const [checkOutDate] = useState(() => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  return `${yyyy}-${mm}-${dd}`; // 👉 18/09/2025
});
const handleCloseForm = ()=>{
    handleClose()
    setBillingError("")
    setCurrenReadingError("")
    dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_ERROR" });
    dispatch({ type: "CLEAR_EB_ERROR" });


    
    
}


useEffect(()=>{
    if(state.UsersList.bllingError){
        setBillingError(state.UsersList.bllingError)

    }

},[state.UsersList.bllingError])
console.log("billngError",billingError)

    // const [uploadFile, setUploadFile] = useState(null);
    // const [rightOffNote, setRightOffNote] = useState("")
    // const [checkoUtDateError, setCheckOutDateError] = useState("");
    const [ReturnAmount, setReturnAmount] = useState('')
    // const [modeOfPaymentError, setModeOfPaymentError] = useState("")
    const [formLoading, setFormLoading] = useState(false)
    // const checkOutDateRef = useRef(null);
    // const modeOfPaymentRef = useRef(null);
    const [showBreakdown, setShowBreakdown] = useState(false);
    // const [refundCompleted, setRefundCompleted] = useState(false);
    const [dataBed, setDataBed] = useState([])
    // const [activeTab, setActiveTab] = useState("record");
    const [hostelData, setHostelData] = useState("")
    const [refundableDetails, setReFundableDetails] = useState("")
    const [detuction, setDetuction] = useState("")
    //  const [rentalBalance,setRentalBalance] = useState('')
     const [billAmount,setBillAmount] = useState("")
     const [nonRefundable,setnonRefundable] = useState("")
     const [amnitiesDetails,setAmnitiesDetails] = useState("")
     const [ebAmountData,setEbAmountData] = useState("")

     
    console.log("ebAmountData",ebAmountData)
     useEffect(() => {
    if (state.UsersList.statusCodegetConfirmCheckout) {
        const validInvoices = state?.UsersList?.GetconfirmcheckoutBillDetails?.filter(
            (invoice) => invoice.balance > 0
        );
        setBillAmount(validInvoices);
       
        const deduction_details = state?.UsersList?.nonRefundable_details?.filter(
            (deduction) => deduction.amount > 0
        );

        let formattedFields = [];

        if (Array.isArray(deduction_details) && deduction_details.length > 0) {
            formattedFields = deduction_details.map((item) => ({
                reason_name: item.reason || "",
                amount: Number(item.amount) || 0,
                showInput: false,
                isSystemGenerated: true,   // ✅ Mark API rows
            }));
        }

        setFields(formattedFields);
        

        // const rentBalance =
        //     state?.UsersList?.GetconfirmcheckoutBillDetails?.find(
        //         (item) => String(item.action).toLowerCase() === "rent"
        //     )?.balance ?? 0;

        // setRentalBalance(rentBalance);
        setDetuction(state?.UsersList?.Deduction);
        setReFundableDetails(state?.UsersList?.Refundable_details);
        setHostelData(state?.UsersList?.hostelData);
        setnonRefundable(state?.UsersList?.nonRefundable_details)
        setAmnitiesDetails(state.UsersList?.finalsettleLastrent.amenities_list)
        setEbAmountData(state.UsersList.ebAmount.response.EbData[0].eb_amount)
    }

    setTimeout(() => {
        dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
    }, 500);
}, [state.UsersList.statusCodegetConfirmCheckout, data, dataBed]);


//  console.log("refundableDetails",refundabl)
// const totalNonRefundable = nonRefundable.reduce((sum, item) => {
//   return sum + (Number(item.amount) || 0);
// }, 0);
// total calculation





// Total of existing nonRefundable rows
const totalNonRefundable = (Array.isArray(nonRefundable) ? nonRefundable : []).reduce(
  (sum, item) => sum + (Number(item.amount) || 0),
  0
);

// Total of newly added rows only (isNew = true)
const extraFields = (Array.isArray(fields) ? fields : []).filter(
  f => f.isNew
);

const totalFields = extraFields.reduce(
  (sum, item) => sum + (Number(item.amount) || 0),
  0
);


const grandTotal = totalNonRefundable + totalFields;

const balanceAmount =(Number(hostelData.AdvanceAmount) || 0) - grandTotal ;
console.log("balanceAmount",balanceAmount)

useEffect(()=>{
if(checkOutDate){
  dispatch({ type: "CHECKOUTDATEUPDATE", payload: { hostel_id: state.login.selectedHostel_Id,id:data.ID || customerID,checkoutDate:checkOutDate} });
}
},[checkOutDate])

 


useEffect(()=>{
    if(state.UsersList.StatusCodeForDateUpdate === 200){
         dispatch({
              type: "GETCONFIRMCHECKOUTCUSTOMER",
              payload: { id: data.ID || customerID, hostel_id: state.login.selectedHostel_Id },
            });
 dispatch({ type: "CLEAR_CHEKOUT_DATE_CHANGE"})
    }
},[state.UsersList.StatusCodeForDateUpdate])

  useEffect(() => {
    if (state.PgList?.AddEBstatusCode === 200) {
    
   dispatch({
              type: "GETCONFIRMCHECKOUTCUSTOMER",
              payload: { id: data.ID, hostel_id: state.login.selectedHostel_Id },
            });
        dispatch({
        type: "EBSTARTMETERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setTimeout(()=>{
 dispatch({ type: 'CLEAR_EB' })
      },1000)
    }
  }, [state.PgList?.AddEBstatusCode]);


    console.log("hostelData",hostelData)

    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
        }
    }, [state.login.selectedHostel_Id]);
    useEffect(() => {
        const userData = state.UsersList.Users.filter((item) => item.ID === customerID);

        setDataBed(userData)
    }, [customerID]);
    console.log("setDataBed",dataBed)

    const reasonOptions = [
        { value: "DueAmount", label: "Due Amount" },
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];

    


    const advanceAmount = state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount

  
    useEffect(() => {
    if (fields || advanceAmount) {
        const totalDeductions = fields.reduce((acc, item) => acc + Number(item.amount || 0), 0);

        const dueAmount = Number(detuction?.DueAmount || 0); 

        const returnAmount = Number(advanceAmount || 0) - totalDeductions - dueAmount;
        setReturnAmount(returnAmount);

        console.log("advanceAmount:", advanceAmount, "totalDeductions:", totalDeductions, "dueAmount:", dueAmount, "returnAmount:", returnAmount);
    }
}, [fields, advanceAmount, detuction]);


   
    const handleAddField = () => {
  setFields([
    ...fields,
    { reason_name: "", amount: "", customReason: "", showInput: false, isNew: true }
  ]);
};



    const handleInputChange = (index, field, value) => {
        const updatedFields = [...fields];
        const updatedErrors = [...errors];
        const fieldData = updatedFields[index] || {};

        if (field === "reason_name") {
            fieldData.reason = value;
            fieldData.reason_name = value;
            fieldData.showInput = value === "others";
            if (value !== "others") fieldData.customReason = "";
            if (updatedErrors[index]) {
                updatedErrors[index].reason = "";
            }
        }

        if (field === "customReason") {
            fieldData.customReason = value;
            if (updatedErrors[index]) {
                updatedErrors[index].reason = "";
            }
        }
        if (field === "amount") {

            if (/^\d*$/.test(value)) {
                fieldData.amount = value;
                if (updatedErrors[index]) {
                    updatedErrors[index].amount = "";
                }
            }
        }

        updatedFields[index] = fieldData;
        setFields(updatedFields);
        setErrors(updatedErrors);
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);

        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    };


  
   


    useEffect(() => {
        if (state.UsersList.conformChekoutError) {
            setFormLoading(false)

        }
    }, [state.UsersList.conformChekoutError])
    const quillRef = useRef(null);

    useEffect(() => {
        return () => {
            if (quillRef.current) {
                const editor = quillRef.current.getEditor?.();
                if (editor) {
                    editor.off("selection-change");
                    editor.off("text-change");
                }
            }
        };
    }, []);
   


     const [currentReading,setCurrentReading] = useState("")
    const [currenReadingError,setCurrenReadingError] =useState("")
    const [isConfirmed, setIsConfirmed] = useState(false);


      useEffect(() => {
        if (state?.PgList?.ebError) {
         
          setCurrenReadingError(state?.PgList?.ebError);
        }
      }, [state?.PgList?.ebError]);
    

     const handlecurrentReading =(e)=>{
    setCurrentReading(e.target.value)
    setCurrenReadingError("")
    dispatch({type:"CLEAR_EB_ERROR"})
     setIsConfirmed(false);
  
  }
  
    const handleClickInvoiceNo = () => {
        console.log("INV654 clicked");
    };
console.log("  const ",state.UsersList?.finalsettleLastrent?.LastReadingDate)

const handleCheckedtrue = (e) => {
  const checked = e.target.checked;
  setIsConfirmed(checked);
  setCurrenReadingError("");

  const today = new Date().toISOString().split("T")[0];
  const lastReadingDateRaw = state.UsersList?.finalsettleLastrent?.LastReadingDate;
  const lastReadingDate = lastReadingDateRaw
    ? new Date(lastReadingDateRaw).toISOString().split("T")[0]
    : "";

  if (checked) {
    if (!currentReading) {
      setCurrenReadingError("Please enter current reading");
      return;
    }

    // ✅ Call API only when lastReadingDate is NOT today
    if (lastReadingDate !== today) {
      dispatch({
        type: "CREATEEB",
        payload: {
          hostel_id: data.Hostel_Id,
          floor_id: data.Floor,
          room_id: data.hstl_Rooms,
          date: checkOutDate,
          reading: currentReading,
        },
      });
    } else {
     
      setCurrenReadingError("Last reading date is today — no need to create again");
    }
  }
};


// const handleCheckedtrue = (e) => {
//   const checked = e.target.checked;
//   setIsConfirmed(checked);
//   setCurrenReadingError("");

//   const today = new Date().toISOString().split("T")[0]; 
//   const lastReadingDate = state.UsersList?.finalsettleLastrent?.LastReadingDate;

//   if (checked) {
//     if (!currentReading) {
//       setCurrenReadingError("Please enter current reading");
//       return;
//     }

    
//     if (lastReadingDate === today) {
//       dispatch({
//         type: "CREATEEB",
//         payload: {
//           hostel_id: data.Hostel_Id,
//           floor_id: data.Floor,
//           room_id: data.hstl_Rooms,
//           date: checkOutDate,
//           reading: currentReading,
//         },
//       });
//     } else {
//       setCurrenReadingError("Last reading date is not today");
//     }
//   }
// };



  const inputRef = useRef(null);
  const checkboxRef = useRef(null);

const handleClickGenerate = () => {
  let hasError = false;

  const today = new Date().toISOString().split("T")[0];
  const lastReadingDateRaw = state.UsersList?.finalsettleLastrent?.LastReadingDate;
  const lastReadingDate = lastReadingDateRaw
    ? new Date(lastReadingDateRaw).toISOString().split("T")[0]
    : "";

  // ✅ Run validation ONLY when lastReadingDate is NOT today
  if (lastReadingDate !== today) {
    if (!currentReading) {
      setCurrenReadingError("Please enter current reading");
      hasError = true;
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      inputRef.current?.focus();
    } else if (!isConfirmed) {
      setCurrenReadingError("Please confirm current reading");
      hasError = true;
      checkboxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      checkboxRef.current?.focus();
    }
  }

  if (hasError) return;

  const refundableAmenities = refundableDetails
    ? [
        { key: "Refundable Rent", amount: refundableDetails.remainingRentRefund },
        { key: "Refundable Advance", amount: refundableDetails.securityDepositRefund },
      ]
    : [];

  const reasons = nonRefundable.map((item) => ({
    key: item.reason,
    amount: item.amount,
  }));

  dispatch({
    type: "FINALGENERATE",
    payload: {
      user_id: data.ID || customerID,
      hostel_id: state.login?.selectedHostel_Id,
      amenities: [...reasons, ...refundableAmenities],
    },
  });
};


// const handleClickGenerate = () => {
//   let hasError = false;

//   const today = new Date().toISOString().split("T")[0];
//   const lastReadingDate = state.UsersList?.finalsettleLastrent?.LastReadingDate;

//   if (lastReadingDate === today) {
  
//     if (!currentReading) {
//       setCurrenReadingError("Please enter current reading");
//       hasError = true;
//       inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//       inputRef.current?.focus();
//     } else if (!isConfirmed) {
//       setCurrenReadingError("Please confirm current reading");
//       hasError = true;
//       checkboxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
//       checkboxRef.current?.focus();
//     }
//   }
 

//   if (hasError) return;

//   const refundableAmenities = refundableDetails
//     ? [
//         { key: "Refundable Rent", amount: refundableDetails.remainingRentRefund },
//         { key: "Refundable Advance", amount: refundableDetails.securityDepositRefund },
//       ]
//     : [];

//   const reasons = nonRefundable.map((item) => ({
//     key: item.reason,
//     amount: item.amount,
//   }));

//   dispatch({
//     type: "FINALGENERATE",
//     payload: {
//       user_id: data.ID || customerID,
//       hostel_id: state.login?.selectedHostel_Id,
//       amenities: [...reasons, ...refundableAmenities],
//     },
//   });
// };






    useEffect(()=>{
if(state.UsersList.StatusCodeForFinalGenerate === 200){
handleCloseForm()
  dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
            setTimeout(() => {
                dispatch({ type: "CLEAR_CHECKOUT_FINAL_GENERATE" });
            }, 500);
}
    },[state.UsersList.StatusCodeForFinalGenerate])
    console.log("tate.UsersList.StatusCodeForFinalGenerate",state.UsersList.StatusCodeForFinalGenerate)

    const rows = Array.isArray(amnitiesDetails)
  ? amnitiesDetails
  : Object.values(amnitiesDetails);

    // const handleClickGenerate = () => {
    //     dispatch({ type: "CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });

    //     let hasError = false;

     
    //     if (!checkOutDate) {
    //         setCheckOutDateError("Please select a checkout Date");
    //         checkOutDateRef.current?.focus();
    //         return;
    //     }

    
    //     if (ReturnAmount > 0 && !modeOfPayment) {
    //         setModeOfPaymentError("Please Select Mode Of Payment");
    //         if (!hasError) {
    //             modeOfPaymentRef.current?.focus();
    //             hasError = true;
    //         }
    //     }


    //     if (hasError) return;

    //     const formatDate = (date) =>
    //         typeof date === "string" ? date : moment(date).format("YYYY-MM-DD");

    //     const formattedCheckOutDate = moment(formatDate(checkOutDate), "YYYY-MM-DD");
    //     const formattedRequestDate = moment(
    //         data.req_date || dataBed[0]?.req_date,
    //         "YYYY-MM-DD"
    //     );

    //     if (formattedCheckOutDate.isBefore(formattedRequestDate, "day")) {
    //         setCheckOutDateError("Before Request Date not allowed");
    //         return;
    //     }
    //     const userId = data?.ID || dataBed[0]?.ID;
    //     if (!userId) return;

    //     const { formattedReasons, errors, hasError: reasonError } = fields.reduce(
    //         (acc, item) => {
    //             let reason_name = "";

    //             if (
    //                 item.reason?.toLowerCase() === "others" ||
    //                 item.reason_name?.toLowerCase() === "others"
    //             ) {
    //                 reason_name = item.customReason || item["custom Reason"] || "";
    //             } else {
    //                 reason_name = item.reason || item.reason_name || "";
    //             }

    //             const error = { reason: "", amount: "" };
    //             if (reason_name && !item.amount) {
    //                 error.amount = "Please enter amount";
    //                 acc.hasError = true;
    //             }
    //             if (!reason_name && item.amount) {
    //                 error.reason = "Please enter reason";
    //                 acc.hasError = true;
    //             }

    //             acc.errors.push(error);
    //             acc.formattedReasons.push({
    //                 reason_name,
    //                 amount: item.amount?.toString() || "",
    //                 showInput: !!item.showInput,
    //             });

    //             return acc;
    //         },
    //         { formattedReasons: [], errors: [], hasError: false }
    //     );

    //     setErrors(errors);
    //     if (reasonError) return;

    //     setCheckOutDateError("");

    //     const formattedDate = formatDate(checkOutDate);

    //     const basePayload = {
    //         checkout_date: formattedDate,
    //         id: userId,
    //         hostel_id: data?.Hostel_Id || dataBed[0]?.Hostel_Id,
    //         advance_return: ReturnAmount,
    //         reinburse: 1,
    //         reasons: formattedReasons,
    //     };

    //     if (ReturnAmount >= 0) {
    //         dispatch({
    //             type: "ADDCONFIRMCHECKOUTCUSTOMER",
    //             payload: {
    //                 ...basePayload,
    //                 comments,
    //                 payment_id: modeOfPayment,
    //                 transaction_id: transactionId

    //             },
    //         });
    //     } else {
    //         dispatch({
    //             type: "CONFIRMCHECKOUTDUECUSTOMER",
    //             payload: {
    //                 ...basePayload,
    //                 formal_checkout: activeTab === "writeoff",
    //                 reason_note: rightOffNote,
    //                 profile: uploadFile,
    //             },
    //         });
    //     }

    //     setFormLoading(true);
    // };


    // useEffect(() => {
    //     if (hostelData) {
    //         setCheckOutDate(hostelData?.CheckoutDate)
    //     }

    // }, [hostelData])

    useEffect(() => {
        if (state.UsersList.statusCodeForDueCustomer === 200 || state.UsersList.statusCodeAddConfirmCheckout === 200) {
            setFormLoading(false)
            handleCloseForm()
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            })
            dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: dataBed[0]?.Floor, hostel_Id: state.login.selectedHostel_Id } })
            setTimeout(() => {
                dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
            }, 500);
        }

    }, [state.UsersList.statusCodeForDueCustomer, state.UsersList.statusCodeAddConfirmCheckout])


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])


    useEffect(() => {

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(
            (tooltipTriggerEl) =>
                new Tooltip(tooltipTriggerEl, {
                    customClass: "white-tooltip",
                })
        );
    }, []);
    useEffect(() => {

        const style = document.createElement("style");
        style.innerHTML = `
    .white-tooltip .tooltip-inner {
      background-color: white !important;
      color: black !important;
      border: 1px solid #ddd;
      font-size: 0.8rem;
    }
    .white-tooltip .tooltip-arrow::before {
      border-top-color: white !important;
    }
  `;
        document.head.appendChild(style);
    }, []);

  const hasRent = Array.isArray(billAmount) && billAmount.some(item => item.action === "Rent");

    return (
        <div>
            <Modal show={show} onHide={handleCloseForm} dialogClassName="checkout-modal" size="lg" centered>
                <Modal.Body className="p-0">
                    <div className="d-flex" style={{ height: "90vh" }}>

                        <div className="p-4 border-end rounded" style={{ flex: "0 0 35%", background: "#f9f9f9" }}>
                            <div className="d-flex align-items-center">
                              
                                {/* <img
                                    src={
                                        data?.user_profile && data?.user_profile !== "0"
                                            ? data?.user_profile
                                            : dataBed[0]?.profile && dataBed[0]?.profile !== "0"
                                                ? dataBed[0].profile
                                                : Profile2
                                    }
                                    style={{ height: 55, width: 55, cursor: "pointer" }}
                                    alt="profile"
                                    className="rounded-circle me-3"
                                /> */}
                                <img
//   src={
//     data?.profile && data?.profile !== "0"
//       ? data?.profile.startsWith("data:image")
//         ? data?.profile
//         : `data:image/jpeg;base64,${data?.profile}`
//       : dataBed[0]?.profile && dataBed[0]?.profile !== "0"
//       ? dataBed[0].profile.startsWith("data:image")
//         ? dataBed[0].profile
//         : `data:image/jpeg;base64,${dataBed[0].profile}`
//       : Profile2
//   }
src={
  (() => {
    const profile =
      data?.profile || dataBed?.[0]?.profile;

    // Invalid or empty values → show default
    if (
      !profile ||
      profile === 0 ||
      profile === "0" ||
      profile === null ||
      profile === "null" ||
      profile === undefined ||
      profile === "undefined" ||
      profile === ""
    ) {
      return Profile2;
    }

    // If it's already a data:image (base64 with prefix)
    if (profile.startsWith("data:image")) {
      return profile;
    }

    // If it looks like a normal base64 (starts with /9j/)
    if (profile.startsWith("/9j/")) {
      return `data:image/jpeg;base64,${profile}`;
    }

    // Otherwise, assume it’s a valid URL
    return profile;
  })()
}

  style={{ height: 55, width: 55, cursor: "pointer" }}
  alt="profile"
  className="rounded-circle me-3"
/>


                                <div>
                                    <p style={{ fontSize: "1.25rem", fontFamily: "Gilroy", fontWeight: 600 }} className="mb-0">{hostelData?.Name}</p>
                                    <div className="d-flex mb-2">

                                        <span
                                            className="badge rounded-pill text-dark me-2"
                                            style={{
                                                fontSize: "0.75rem",
                                                fontFamily: "Gilroy",
                                                fontWeight: 400,
                                                backgroundColor: "#FFEFCF"
                                            }}
                                        > 
                                            {hostelData.floor_name}
                                        </span>
                                        <span className="badge rounded-pill bg-danger-subtle text-dark" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                                        
                                            {hostelData["Room Name"]} - {hostelData["Bed Name"]}
                                        </span>
                                    </div>


                                </div>


                            </div>



                            <hr />

                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Joined Date</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}> 
                                   
                                     {new Date(hostelData.joining_Date).toLocaleDateString("en-GB")}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Req Checkout Date</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}> 
                                    {new Date(hostelData.request_checkout_date).toLocaleDateString("en-GB")}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Total Advance Amount</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>
                                    {hostelData.AdvanceAmount}
                                    </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Monthly Rent</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>₹ {hostelData.RoomRent}
                                    
                                    </span>
                            </div>


                             <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Checkout Date</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}> {checkOutDate}
                                    
                                    </span>
                            </div>

                            <div className="mt-2" style={{ textAlign: "center", backgroundColor: "#FFF7F7" }}>
                                {ReturnAmount < 0 && <span style={{ color: "red", fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400, textAlign: "center" }}>Pending</span>}
                            </div>

                        </div>

                     
                        <div className="container-fluid p-4 overflow-auto">

                            <div
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: "#fff",
                                    zIndex: 1050,
                                    padding: "10px 15px",

                                }}
                            >
                                <p className="mb-0" style={{ fontSize: "1.5rem", fontFamily: "Gilroy", fontWeight: 600 }}>Final Settlement</p>
                                <CloseCircle
                                    size="24"
                                    color="#000"
                                    onClick={handleCloseForm}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                              {billingError && (
                                      <div style={{ color: "red" }}>
                                        <MdError
                                          style={{ fontSize: "13px", marginRight: "5px" }}
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
                                          {billingError}
                                        </label>
                                      </div>
                                    )}
                            <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "15px" }}>

                           


<Form.Group className="mt-4">
         <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: 5
                }}
              >
                <Form.Label
                  style={{
                    fontFamily: 'Gilroy',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    marginBottom: 0,
                    padding: 0
                  }}
                >
                  Current Reading
                </Form.Label>

                <span
                  style={{
                    fontFamily: 'Gilroy',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0',
                    color: "gray"
                  }}
                >
                  Last Reading: <span style={{ color: '#1E45E1' }}>{state.UsersList?.finalsettleLastrent?.LastReading}</span>
                </span>
              </div>


  <InputGroup style={{ marginTop: 10 }}>
    <Form.Control
      type="number"
      className="small-placeholder"
      placeholder="471.55"
      value={currentReading}
       ref={inputRef}
      onChange={handlecurrentReading}
      style={{ fontSize: 14, fontWeight: 600, padding: "12px 14px" }}
    />
 
    <InputGroup.Text
    //   style={{
    //     borderColor: !isConfirmed &&  currenReadingError? "red" : "#ced4da",
    //     borderWidth: 1,
    //     borderStyle: "solid",
    //     padding: "0 6px"
    //   }}
    >
      {/* <Form.Check
        type="checkbox"
        id="confirmReading"
        checked={isConfirmed}
        onChange={handleCheckedtrue}
        style={{ margin: 0, borderColor: !isConfirmed &&  currenReadingError? "red" : "#ced4da", }}
      /> */}
     <Form.Check
  type="checkbox"
  id="confirmReading"
  checked={isConfirmed}
  onChange={handleCheckedtrue}
  style={{ margin: 0 }}
>
  <Form.Check.Input
    type="checkbox"
    checked={isConfirmed}
      ref={checkboxRef}
    onChange={handleCheckedtrue}
    style={{
      borderColor: !isConfirmed && currenReadingError ? "red" : "#ced4da",
    }}
  />
</Form.Check>

    </InputGroup.Text>
  </InputGroup>

  
</Form.Group>
   <style>{`
    .small-placeholder::placeholder {
      font-size: 14px;
      color: #a9a9a9;
      font-family: 'Gilroy';
    }
  `}</style>

{state.createAccount?.networkError ?
            <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
              <MdError style={{ color: "red", marginRight: '5px' }} />
              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
            </div>
            : null}

 {currenReadingError && (
                                      <div style={{ color: "red" }}>
                                        <MdError
                                          style={{ fontSize: "13px", marginRight: "5px" }}
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
                                          {currenReadingError}
                                        </label>
                                      </div>
                                    )}


                                <div className="p-3  rounded mt-3" style={{ backgroundColor: "#E7F1FF", borderRadius: 10 }}>


                                    <div className="d-flex justify-content-between align-items-center p-2">
                                        <div>
                                            <p style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: "1rem" }}>Deductions</p>
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


                                    {/* {fields.map((item, index) => {
                                        const filteredOptions = (() => {
                                            let options = [...reasonOptions];


                                            if (item.reason_name && !options.some(opt => opt.value === item.reason_name)) {
                                                options.push({
                                                    value: item.reason_name,
                                                    label: item.reason_name.charAt(0).toUpperCase() + item.reason_name.slice(1)
                                                });
                                            }


                                            const isMaintenanceSelected = fields.some(field => field.reason === "maintenance");
                                            return options.map(opt => ({
                                                ...opt,
                                                isDisabled: opt.value === "maintenance" && isMaintenanceSelected && item.reason !== "maintenance"
                                            }));
                                        })();


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
                                                                    handleInputChange(index, "reason_name", "others");
                                                                } else {
                                                                    handleInputChange(index, "reason_name", selectedValue);
                                                                }
                                                            }}
                                                            isDisabled={item.reason_name === "maintenance" || item?.reason_name === "DueAmount"}
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

                                                    {(!item.isSystemGenerated || item.reason_name !== "DueAmount") && (
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
                                    })} */}
{fields.map((item, index) => {
  
    const isNonRefundable = !!nonRefundable.find(
        nf => nf.reason === item.reason_name && !item.isNew
    );

  
    const disableField = isNonRefundable;

   
   const isMaintenanceSelected = fields.some(
  (field, i) => field.reason_name === "maintenance" && field.isNew && i !== index
);

    const filteredOptions = (() => {
        let options = [...reasonOptions];

     
        if (item.reason_name && !options.some(opt => opt.value === item.reason_name)) {
            options.push({
                value: item.reason_name,
                label: item.reason_name.charAt(0).toUpperCase() + item.reason_name.slice(1),
            });
        }

        return options.map(opt => ({
            ...opt,
            isDisabled:
                opt.value === "maintenance" &&
                isMaintenanceSelected &&
                item.reason_name !== "maintenance",
        }));
    })();

    return (
        <div className="row px-4 mb-3" key={index}>
          
            <div className="col-md-6">
                {!item.showInput ? (
                    <Select
                        options={filteredOptions}
                        value={filteredOptions.find(opt => opt.value === item.reason_name) || null}
                        onChange={(selectedOption) => {
                            const selectedValue = selectedOption.value;
                            if (selectedValue === "others") {
                                handleInputChange(index, "reason_name", "others");
                            } else {
                                handleInputChange(index, "reason_name", selectedValue);
                            }
                        }}
                        isDisabled={disableField || item.reason_name === "DueAmount"}
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
                                backgroundColor: disableField ? "#f0f0f0" : "white",
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
                                overflowY: "auto",
                                fontFamily: "Gilroy",
                            }),
                            placeholder: (base) => ({ ...base, color: "#555" }),
                            dropdownIndicator: (base) => ({ ...base, color: "#555", cursor: "pointer" }),
                            indicatorSeparator: () => ({ display: "none" }),
                            option: (base, state) => ({
                                ...base,
                                cursor: state.isDisabled ? "not-allowed" : "pointer",
                                backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                color: state.isDisabled ? "#aaa" : "#000",
                            }),
                        }}
                    />
                ) : (
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter custom reason"
                        value={item.customReason}
                        onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
                        disabled={disableField}
                        style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor: disableField ? "#f0f0f0" : "white",
                        }}
                    />
                )}
            </div>

            {/* Amount */}
            <div className="col-md-5">
                <input
                    type="text"
                    placeholder="Enter amount"
                    value={item.amount}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    className="form-control"
                    disabled={disableField}
                    style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: disableField ? "#f0f0f0" : "white",
                    }}
                />
            </div>

            {/* Trash Icon */}
            <div className="col-md-1 d-flex justify-content-center align-items-center p-0">
                {!disableField && (
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



                                    {/* {fields.map((item, index) => {
    const isNonRefundable = nonRefundable.some(
        nf => nf.reason === item.reason_name
    );

    const filteredOptions = (() => {
        let options = [...reasonOptions];

        if (item.reason_name && !options.some(opt => opt.value === item.reason_name)) {
            options.push({
                value: item.reason_name,
                label: item.reason_name.charAt(0).toUpperCase() + item.reason_name.slice(1),
            });
        }

        const isMaintenanceSelected = fields.some(field => field.reason === "maintenance");
        return options.map(opt => ({
            ...opt,
            isDisabled:
                opt.value === "maintenance" &&
                isMaintenanceSelected &&
                item.reason !== "maintenance",
        }));
    })();

 
    const disableField = isNonRefundable;

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
                                handleInputChange(index, "reason_name", "others");
                            } else {
                                handleInputChange(index, "reason_name", selectedValue);
                            }
                        }}
                        isDisabled={disableField || item.reason_name === "DueAmount"}
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter custom reason"
                        value={item.customReason}
                        onChange={(e) =>
                            handleInputChange(index, "customReason", e.target.value)
                        }
                        disabled={disableField} 
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
                )}
            </div>

            <div className="col-md-5">
                <input
                    type="text"
                    placeholder="Enter amount"
                    value={item.amount}
                    onChange={(e) =>
                        handleInputChange(index, "amount", e.target.value)
                    }
                    className="form-control"
                    disabled={disableField}
                    style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                        backgroundColor: disableField ? "#f0f0f0" : "white",
                    }}
                />
            </div>

            <div className="col-md-1 d-flex justify-content-center align-items-center p-0">
               
                {!disableField && (
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
})} */}

                                    {/* {fields.map((item, index) => {
   
    const isNonRefundable = nonRefundable.some(
        nf => nf.reason === item.reason_name
    );

    const filteredOptions = (() => {
        let options = [...reasonOptions];

        if (item.reason_name && !options.some(opt => opt.value === item.reason_name)) {
            options.push({
                value: item.reason_name,
                label: item.reason_name.charAt(0).toUpperCase() + item.reason_name.slice(1),
            });
        }

        const isMaintenanceSelected = fields.some(field => field.reason === "maintenance");
        return options.map(opt => ({
            ...opt,
            isDisabled:
                opt.value === "maintenance" &&
                isMaintenanceSelected &&
                item.reason !== "maintenance",
        }));
    })();

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
                                handleInputChange(index, "reason_name", "others");
                            } else {
                                handleInputChange(index, "reason_name", selectedValue);
                            }
                        }}
                       
                        isDisabled={isNonRefundable || item.reason_name === "DueAmount"}
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter custom reason"
                        value={item.customReason}
                        onChange={(e) =>
                            handleInputChange(index, "customReason", e.target.value)
                        }
                        disabled={isNonRefundable} 
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
                )}
            </div>

            <div className="col-md-5">
                <input
                    type="text"
                    placeholder="Enter amount"
                    value={item.amount}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    className="form-control"
                    disabled={isNonRefundable} 
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
            </div>

            <div className="col-md-1 d-flex justify-content-center align-items-center p-0">
              
                {!isNonRefundable && (
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
})} */}

                                </div>

                                <div className="mt-2 mb-2">

                                    <div className="mb-2">
                                        <div >
                                            <p style={{
                                                fontSize: 14,
                                                color: "black",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}>Invoices Pending</p>
                                            <div className="table-responsive border border-gray rounded p-2">
                                                <table className="table table-sm align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="pb-2" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}>Invoice No</th>
                                                            <th className="pb-2" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}>Type</th>
                                                            <th className="pb-2 text-end" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }} >Invoice Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {
                                                            billAmount?.map((user)=>{
return(
    <>
     <tr>
                                                            <td className="fw-normal text-decoration-underline text-primary mt-4"
                                                                onClick={handleClickInvoiceNo}
                                                                style={{
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: "14px",
                                                                    paddingTop: "1rem"
                                                                }}>
                                                                {user.invoiceid}
                                                            </td>
                                                            <td className="fw-normal" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", paddingTop: "1rem" }}>{user.action}</td>
                                                            <td className="text-end" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", fontWeight: 500, paddingTop: "1rem" }}>₹{user.balance}</td>
                                                        </tr>
                                                        <tr>
                                                            
                                                           
                                                        </tr>
    </>
)
                                                            })
                                                        } */}
                                                        {Array.isArray(billAmount) && billAmount.map((user) => (
  <tr key={user.invoiceid}>
    <td
      className="fw-normal text-decoration-underline text-primary mt-4"
      onClick={handleClickInvoiceNo}
      style={{
        fontFamily: "Gilroy",
        fontSize: "14px",
        paddingTop: "1rem"
      }}
    >
      {user.invoiceid}
    </td>
    <td
      className="fw-normal"
      style={{
        fontFamily: "Gilroy",
        fontSize: "14px",
        color: "black",
        paddingTop: "1rem"
      }}
    >
      {user.action}
    </td>
    <td
      className="text-end"
      style={{
        fontFamily: "Gilroy",
        fontSize: "14px",
        color: "black",
        fontWeight: 500,
        paddingTop: "1rem"
      }}
    >
      ₹{user.balance}
    </td>
  </tr>
))}

                                                       
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Refundable Rent */}
                                    <div className="mt-3">
                                        <div className="">
                                            <p style={{
                                                fontSize: 14,
                                                color: "black",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}>Refundable Rent</p>
                                            <div className="table-responsive border border-gray rounded p-2">
                                                <table className="table table-sm align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}>Description</th>
                                                            <th className="text-end" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="fw-normal" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", paddingTop: "1rem" }}>Last Rent Paid (30 Days)</td>
                                                            <td className="text-end" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black" }}>₹{state?.UsersList?.finalsettleLastrent?.lastRentPaidAmount}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-normal" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", paddingTop: "1rem" }}>Actual Stay Days ({detuction.stayedDays} days * ₹{detuction.ratePerDay})</td>
                                                            <td className="text-end" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black" }}>₹{detuction.stayDeductionAmount}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="fw-normal" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", paddingTop: "1rem" }}>EB Amount</td>
                                                            <td className="text-end" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black" }}>₹{ebAmountData}</td>
                                                        </tr>

  {rows.map((item, index) => (
    <tr key={index}>
      <td
       className="fw-normal" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", paddingTop: "1rem" }}
      >
        {item.Amnities_Name}
      </td>
      <td
      className="text-end" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black" }}
      >
        ₹{item.Amount}
      </td>
    </tr>
  ))}


                                                        {/* <tr>
                                                           
                                                            <td className="fw-normal" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black", paddingTop: "1rem" }}>Gym</td>
                                                            <td className="text-end" style={{ fontFamily: "Gilroy", fontSize: "14px", color: "black" }}>₹500</td>
                                                        </tr> */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Total Refund</p>
                                    <span
                                        style={{ color: "blue", cursor: "pointer", fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400, marginTop: "-18px" }}
                                        onClick={() => setShowBreakdown(!showBreakdown)}
                                    >

                                        View Breakdown <img
                                            src={arrowTot}
                                            alt="arrow"
                                            style={{
                                                transition: "transform 0.3s ease",
                                                transform: showBreakdown ? "rotate(180deg)" : "rotate(0deg)",
                                            }}
                                        />
                                    </span>
                                </div>


                                {showBreakdown && (
                                    <div className="p-3  rounded mb-3">
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>Final settlement</p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>
                                                {/* ₹  {refundableDetails.totalRefund} */}
                                                </p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Total Deductions</p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400, color: "red" }}> ₹ {grandTotal}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            {/* <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Refundable Rent</p> */}
                                        {hasRent ? (
  <p
    style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}
  >
    Payable Rent
  </p>
) : (
  <p
    style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}
  >
   Refundable Rent
  </p>
)}


                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>₹ {refundableDetails.remainingRentRefund}
                                               </p>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Refundable Advance</p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>₹ 
                                                {refundableDetails.securityDepositRefund}
                                                {/* {balanceAmount} */}
                                                </p>
                                        </div>


                                        {/* <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>Refundable Advance</p>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Stayed Days ({detuction.stayedDays} days * ₹{detuction.ratePerDay})</p>
                                            <p style={{ color: "red", fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>₹ {detuction.stayDeductionAmount}</p>
                                        </div>
                                        <div className="d-flex justify-content-between mb-3">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Due amount</p>
                                            <p style={{ color: "red", fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>{detuction.DueAmount}</p>
                                        </div>

                                        <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>Refundable Amount</p>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Remaining Rent Refund</p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>₹ {refundableDetails.remainingRentRefund}</p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Security Deposit Refund</p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>₹ {refundableDetails.securityDepositRefund}</p>
                                        </div> */}
                                    </div>
                                )}

                                <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 ">


                                    <input
                                        type="text"
                                        name="Advance"
                                        id="Advance"

                                        value={ReturnAmount}
                                        className="form-control mt-1"
                                        placeholder="Add Advance Amount"
                                        required
                                        style={{
                                            height: "50px",
                                            borderRadius: "8px",
                                            fontSize: 16,
                                            color: "#4b4b4b",
                                            fontFamily: "Gilroy",
                                            fontWeight: 600,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                        }}
                                    />
                                </div>
                                {/* {ReturnAmount < 0 && (
                                    <>
                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <label className="form-label mb-0" style={{ fontSize: "0.875rem", fontWeight: 400, fontFamily: "Gilroy" }} >Choose Method to checkout</label>


                                            <ul className="nav nav-pills mb-0 mt-2" id="checkoutTab" role="tablist" >
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className={`nav-link ${activeTab === "record" ? "active" : ""}`}
                                                        id="record-tab"
                                                        data-bs-toggle="pill"
                                                        data-bs-target="#record"
                                                        type="button"
                                                        role="tab"
                                                        onClick={() => setActiveTab("record")}
                                                        style={{ color: activeTab === "record" ? "white" : "black", fontSize: "0.875rem", fontWeight: 400, fontFamily: "Gilroy", padding: 5 }}
                                                    >
                                                        <img
                                                            src={activeTab === "record" ? whiteaddcircle : addcircleblack}
                                                            alt="addcircle"
                                                            style={{ marginRight: "5px", }}
                                                        />
                                                        Record
                                                    </button>
                                                </li>

                                                <li className="nav-item" role="presentation">
                                             
                                                    <button
                                                        className={`nav-link ${activeTab === "writeoff" ? "active" : ""}`}
                                                        id="writeoff-tab"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                     
                                                        title="Use this when tenant has absconded and all pending dues must be written off."
                                                        data-bs-target="#writeoff"
                                                        type="button"
                                                        role="tab"
                                                        onClick={() => setActiveTab("writeoff")}
                                                        style={{
                                                            color: activeTab === "writeoff" ? "white" : "black",
                                                            fontSize: "0.875rem",
                                                            fontWeight: 400,
                                                            fontFamily: "Gilroy",
                                                            padding: 5,
                                                        }}
                                                    >
                                                        <img
                                                            src={activeTab === "writeoff" ? writeOffWhite : writeOff}
                                                            alt="writeoff"
                                                            style={{ marginRight: "5px" }}
                                                        />
                                                        Write off
                                                    </button>

                                                </li>
                                            </ul>

                                        </div>
                                        {activeTab === "record" && (
                                            <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 ">
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
                                                        Paid Amount
                                                    </label>


                                                </div>

                                                <input
                                                    type="text"
                                                    name="Advance"
                                                    id="Advance"

                                                    // value={data.RoomRent || dataBed[0]?.RoomRent}
                                                    className="form-control mt-2"
                                                    placeholder="Enter Paid Amount"
                                                    required
                                                    style={{
                                                        height: "50px",
                                                        borderRadius: "8px",
                                                        fontSize: "1rem",

                                                        fontFamily: "Gilroy",
                                                        fontWeight: 600,
                                                        boxShadow: "none",
                                                        border: "1px solid #D9D9D9",
                                                    }}
                                                />
                                            </div>
                                        )}




                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            {activeTab === "writeoff" && (
                                                <div className="">
                                                    <label
                                                        style={{
                                                            fontSize: 14,
                                                            color: "#222222",
                                                            fontFamily: "Gilroy",
                                                            fontWeight: 500,
                                                            marginBottom: 5,
                                                        }}
                                                    >
                                                        Reason/Right-off Note
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        placeholder="Enter reason here..."
                                                        className="form-control mb-3"
                                                        style={{
                                                            fontFamily: "Gilroy",
                                                            fontSize: 14,
                                                            borderRadius: 10,
                                                            border: "1px solid #D9D9D9",
                                                            resize: "none",
                                                        }}
                                                        value={rightOffNote}
                                                        onChange={(e) => setRightOffNote(e.target.value)}
                                                    />



                                                    <label
                                                        style={{
                                                            fontSize: 14,
                                                            color: "#222222",
                                                            fontFamily: "Gilroy",
                                                            fontWeight: 500,
                                                            marginBottom: 5,
                                                        }}
                                                    >
                                                        Attachments/Proofs (If any)
                                                    </label>

                                                    <div className="row ms-1 me-1">

                                                        <div className="col-md-12" style={{
                                                            border: "1px dashed #D9D9D9",
                                                            padding: 20,
                                                            borderRadius: 10,
                                                            textAlign: "center",
                                                            backgroundColor: "#FAFAFA",
                                                        }}>
                                                            <div className="row">

                                                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                                                    {uploadFile ? (
                                                                        uploadFile.type.startsWith("image/") ? (
                                                                            <img
                                                                                src={URL.createObjectURL(uploadFile)}
                                                                                alt="Preview"
                                                                                style={{
                                                                                    width: "100%",
                                                                                    maxWidth: "200px",
                                                                                    height: "auto",
                                                                                    borderRadius: 8,
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <div
                                                                                style={{
                                                                                    fontSize: 14,
                                                                                    fontFamily: "Gilroy",
                                                                                    color: "#333",
                                                                                    fontWeight: 500,
                                                                                    gap: 4,
                                                                                }}
                                                                            >
                                                                                <DocumentDownload size="24" color="#1E45E1" /> {uploadFile.name}
                                                                            </div>
                                                                        )
                                                                    ) : (
                                                                        <div
                                                                            className="text-center"
                                                                            style={{
                                                                                backgroundColor: "#1E45E10D",
                                                                                borderRadius: 6,
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                justifyContent: "center",
                                                                            }}
                                                                        >
                                                                            <div>
                                                                                <div
                                                                                    style={{
                                                                                        backgroundColor: "#EAF0FF",
                                                                                        borderRadius: "50%",
                                                                                        padding: 10,
                                                                                        display: "flex",
                                                                                        alignItems: "center",
                                                                                        justifyContent: "center",
                                                                                        margin: "0 auto",
                                                                                    }}
                                                                                >
                                                                                    <DocumentDownload size="24" color="#1E45E1" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>


                                                                <div className="col-md-6 d-flex align-items-center justify-content-center" >
                                                                    <div >
                                                                        <label
                                                                            htmlFor="upload"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                                fontFamily: "Gilroy",
                                                                                color: "#1E45E1",
                                                                                fontWeight: 600,
                                                                            }}
                                                                        >
                                                                            Choose file
                                                                        </label>{" "}  <span style={{ color: "#16151C", fontFamily: "Gilroy", }}>to Upload</span>

                                                                        <div style={{ fontSize: 12, color: "#A0A0A0", fontFamily: "Gilroy" }}>
                                                                            <span style={{ fontWeight: 500 }}>JPG PNG PDF Format</span> <span style={{ fontWeight: 300 }}>(600px*300px)</span>
                                                                        </div>
                                                                        <input type="file" id="upload" hidden onChange={handleFileChange} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>



                                                    </div>
                                                </div>
                                            )}


                                        </div>

                                    </>


                                )} */}


                                {/* {activeTab !== "writeoff" && (
                                    <>
                                        <Form.Check
                                            type="checkbox"
                                            style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400, color: "#1E45E1" }}
                                            label="Mark refund as Completed"
                                            className="mb-3"
                                            checked={refundCompleted}
                                            onChange={(e) => setRefundCompleted(e.target.checked)}
                                        />
                                        {refundCompleted && (
                                            <div className="  rounded">
                                               
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <Form.Group
                                                        className="mb-1"
                                                        controlId="exampleForm.ControlInput1"
                                                        value={modeOfPayment}
                                                        disabled={ReturnAmount === 0}
                                                        onChange={handleModeOfPaymentChange}
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
                                                            ref={modeOfPaymentRef}
                                                            aria-label="Default select example"
                                                            value={modeOfPayment}
                                                            disabled={ReturnAmount === 0}
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


                                                    </Form.Group>
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
                                                </div>


                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Transaction ID</Form.Label>
                                                    <Form.Control value={transactionId} onChange={(e) => handleTransactionId(e)} style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }} type="text" placeholder="Enter Transaction ID" />
                                                </Form.Group>

                                        
                                                <Form.Group className="mb-3">
                                                    <Form.Label style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>Comments</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={2}
                                                        value={comments}
                                                        onChange={handleCommentsChange}
                                                        placeholder="Enter comments"
                                                        style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}
                                                    />
                                                </Form.Group>
                                            </div>
                                        )}
                                    </>
                                ) } */}



                                <div className="text-end mt-4">
                                    <Button variant="" className="me-2" onClick={handleCloseForm} style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        // disabled={activeTab !== "writeoff" && ReturnAmount < 0}
                                        style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400, backgroundColor: "#1E45E1" }} 
                                        onClick={handleClickGenerate}
                                        >Generate</Button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                    </div>}


            </Modal>
        </div>
    )
}
FinalSettlement.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
    customerID: PropTypes.func.isRequired,
};
export default FinalSettlement;