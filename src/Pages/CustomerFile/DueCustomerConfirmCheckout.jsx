/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form  } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
// import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
// import Image from "react-bootstrap/Image";
// import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
// import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
// import { DatePicker } from 'antd';
// import dayjs from 'dayjs';
import { CloseCircle, DocumentDownload } from "iconsax-react";
// import addcircle from "../../Assets/Images/New_images/add-circle.png";
// import whiteaddcircle from "../../Assets/Images/white_add-circle.png";
// import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
// import { FaCheck } from "react-icons/fa";
// import arrowTot from "../../Assets/Images/New_images/direction-down 01.png";
// import writeOff from "../../Assets/Images/New_images/writeoff.png";
// import writeOffWhite from "../../Assets/Images/New_images/writeoffWhite.png";
// import addcircleblack from "../../Assets/Images/New_images/add-circle-black.png";
import { Tooltip } from "bootstrap";
// import { useFormState } from "react-dom";
import ErrorMessage from '../../Components/ErrorMessage'



function DueCustomerConfirmCheckout({ show, handleClose, data,customerID }) {


    const handleClosecheck = ()=>{
        handleClose()
         dispatch({ type: "REMOVE_CONFORM_CHECKOUT_ERROR" });
    }

console.log("DueCustomerConfirmCheckout",data)
    const state = useSelector((state) => state);
   
    const dispatch = useDispatch();
    // const [checked, setChecked] = useState(false);

    const [fields, setFields] = useState([]);
    // const [errors, setErrors] = useState([]);
    // const [modeOfPayment, setModeOfPayment] = useState("");
    const [comments, setComments] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [uploadFile, setUploadFile] = useState(null);
    // const [rightOffNote, setRightOffNote] = useState("")
    // const [checkoUtDateError, setCheckOutDateError] = useState("");
    const [ReturnAmount, setReturnAmount] = useState('')
    // const [modeOfPaymentError, setModeOfPaymentError] = useState("")
    const [formLoading, setFormLoading] = useState(false)
    // const checkOutDateRef = useRef(null);
    // const modeOfPaymentRef = useRef(null);
    //   const [showBreakdown, setShowBreakdown] = useState(false);
    //    const [refundCompleted, setRefundCompleted] = useState(false);
       const [dataBed,setDataBed] =useState([])
    //    const [activeTab, setActiveTab] = useState("record");
       const [hostelData,setHostelData] = useState("")
    //    const [refundableDetails,setReFundableDetails] = useState("")
       const [detuction,setDetuction] = useState("")


    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
        }
    }, [state.login.selectedHostel_Id]);


     useEffect(() => {
            if (data?.customerId) {
                dispatch({ type: "GETFINALSETTLEMENT", payload: data?.customerId });
                // setFormLoading(true)
            }
        }, [data])
    

     useEffect(() => {
      const userData = state.UsersList.Users.filter((item) => item.ID === customerID);
      
      setDataBed(userData)
    }, [customerID]);
  useEffect(() => {
        if (state.UsersList?.chrckoutError) {
            setFormLoading(false)
        }

    }, [state.UsersList?.chrckoutError])

    // const reasonOptions = [
    //     { value: "DueAmount", label: "Due Amount" },
    //     { value: "maintenance", label: "Maintenance" },
    //     { value: "others", label: "Others" },
    // ];
    // const [invoiceTotal,setInvoieTotal] = useState('')
    // const [rentalBalance,setRentalBalance] = useState('')

    useEffect(() => {
        if (state.UsersList.statusCodegetConfirmCheckout) {
            const validInvoices = state?.UsersList?.GetconfirmcheckoutBillDetails?.filter(
                (invoice) => invoice.balance > 0
            );



            const deduction_details = state?.UsersList?.nonRefundable_details?.filter(
                (deduction) => deduction.amount > 0
            );
         

            const invoiceTotal = Array.isArray(validInvoices)
                ? validInvoices.reduce((total, invoice) => total + Number(invoice.balance || 0), 0)
                : 0;


            // if (Array.isArray(deduction_details) && deduction_details.length > 0) {
            //     const formattedFields = deduction_details.map((item) => ({
            //         reason_name: item.reason || "",
            //         amount: Number(item.amount) || 0,
            //         showInput: false,
            //     }));
           
            
            //     formattedFields.unshift({
            //         reason_name: "DueAmount",
            //         amount: invoiceTotal,
            //         showInput: false,
            //     });


            //     setFields(formattedFields);
            // //   setInvoieTotal(invoiceTotal);
            // } else {
            //     setFields([
            //         { reason_name: "DueAmount", amount: invoiceTotal, showInput: false },
            //     ]);
               
            // }
            if (Array.isArray(deduction_details) && deduction_details.length > 0) {
    const formattedFields = deduction_details.map((item) => ({
        reason_name: item.reason || "",
        amount: Number(item.amount) || 0,
        showInput: false,
        isDefault: false, // backend la irunthu vanthathu illana false
    }));

    formattedFields.unshift({
        reason_name: "DueAmount",
        amount: invoiceTotal,
        showInput: false,
        isDefault: true, // Backend la irunthu vanthathu
    });

    setFields(formattedFields);
} else {
    setFields([
        { reason_name: "DueAmount", amount: invoiceTotal, showInput: false, isDefault: true },
    ]);
}
// const rentBalance =
//   state?.UsersList?.GetconfirmcheckoutBillDetails?.find(
//     (item) => String(item.action).toLowerCase() === "rent"
//   )?.balance ?? 0;
// setRentalBalance(rentBalance)
setDetuction(state?.UsersList?.Deduction)
// setReFundableDetails(state?.UsersList?.Refundable_details)


setHostelData(state?.UsersList?.hostelData)

        }

        setTimeout(() => {
            dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
        }, 500);
    }, [state.UsersList.statusCodegetConfirmCheckout, data]);


    const advanceAmount = state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount

    useEffect(() => {
        if (fields || advanceAmount) {
            const totalDeductions = fields.reduce((acc, item) => acc + Number(item.amount || 0), 0);
            const returnAmount = Number(advanceAmount || 0) - totalDeductions;
            setReturnAmount(returnAmount)
        }
    }, [fields, advanceAmount])






    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
        }
    };


    // const handleAddField = () => {
    //     setFields([...fields, { reason_name: "", amount: "", showInput: false }]);

    //     dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    // };



  


// const handleInputChange = (index, field, value) => {
//     const updatedFields = [...fields];
//     const updatedErrors = [...errors];
//     const fieldData = updatedFields[index] || {};

//     if (field === "reason_name") {
//         fieldData.reason = value;
//         fieldData.reason_name = value;
//         fieldData.showInput = value === "others";
//         if (value !== "others") fieldData.customReason = "";
//         if (updatedErrors[index]) {
//             updatedErrors[index].reason = "";
//         }
//     }

//     if (field === "customReason") {
//         fieldData.customReason = value;
//         if (updatedErrors[index]) {
//             updatedErrors[index].reason = "";
//         }
//     }
//     if (field === "amount") {
//     // allow only digits
//     if (/^\d*$/.test(value)) {
//       fieldData.amount = value;
//       if (updatedErrors[index]) {
//         updatedErrors[index].amount = "";
//       }
//     }
//   }

//     // if (field === "amount") {
//     //     fieldData.amount = value;
//     //     if (updatedErrors[index]) {
//     //         updatedErrors[index].amount = "";
//     //     }
//     // }

//     updatedFields[index] = fieldData;
//     setFields(updatedFields);
//     setErrors(updatedErrors);
// };







    // const handleRemoveField = (index) => {
    //     const updatedFields = [...fields];
    //     updatedFields.splice(index, 1);
    //     setFields(updatedFields);

    //     dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    // };


    // const handleModeOfPaymentChange = (e) => {
    //     setModeOfPaymentError("")
    //     setModeOfPayment(e.target.value);
    // };

    const handleCommentsChange = (event) => {
        setComments(event.target.value);

    };


    // const handleToggle = () => {
    //     setChecked((prev) => !prev);

    // };



   

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
// const [transactionId,setTransactionId] = useState("")
// const handleTransactionId = (e) => {
//   const value = e.target.value;
//   setTransactionId(value);
// };
  
//    const handleConfirmCheckout = () => {
//   dispatch({ type: "CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });

//   let hasError = false;

//   // --- Date Validation ---
// //   if (!checkOutDate) {
// //     setCheckOutDateError("Please select a checkout Date");
// //     checkOutDateRef.current?.focus();
// //     return;
// //   }

//   // --- Mode of Payment Validation ---
// //   if (ReturnAmount > 0 && !modeOfPayment) {
// //     // setModeOfPaymentError("Please Select Mode Of Payment");
// //     if (!hasError) {
// //       modeOfPaymentRef.current?.focus();
// //       hasError = true;
// //     }
// //   }


//   if (hasError) return;

//   const formatDate = (date) =>
//     typeof date === "string" ? date : moment(date).format("YYYY-MM-DD");

//   const formattedCheckOutDate = moment(formatDate(checkOutDate), "YYYY-MM-DD");
//   const formattedRequestDate = moment(
//     data.req_date || dataBed[0]?.req_date,
//     "YYYY-MM-DD"
//   );

// //   if (formattedCheckOutDate.isBefore(formattedRequestDate, "day")) {
// //     setCheckOutDateError("Before Request Date not allowed");
// //     return;
// //   }

//   // --- Validate ID ---
//   const userId = data?.ID || dataBed[0]?.ID;
//   if (!userId) return;

//   // --- Reasons Validation ---
//   const { formattedReasons, errors, hasError: reasonError } = fields.reduce(
//     (acc, item) => {
//       let reason_name = "";

//       if (
//         item.reason?.toLowerCase() === "others" ||
//         item.reason_name?.toLowerCase() === "others"
//       ) {
//         reason_name = item.customReason || item["custom Reason"] || "";
//       } else {
//         reason_name = item.reason || item.reason_name || "";
//       }

//       const error = { reason: "", amount: "" };
//     //   if (reason_name && !item.amount) {
//     //     error.amount = "Please enter amount";
//     //     acc.hasError = true;
//     //   }
//  if (reason_name) {
//   // Skip validation only if it's the default backend DueAmount
//   if (reason_name === "DueAmount" && item.isDefault) {
//     // No error
//   } else if (!item.amount || Number(item.amount) <= 0) {
//     error.amount = "Please enter amount";
//     acc.hasError = true;
//   }
// }

//       if (!reason_name && item.amount) {
//         error.reason = "Please enter reason";
//         acc.hasError = true;
//       }

//       acc.errors.push(error);
//       acc.formattedReasons.push({
//         reason_name,
//         amount: item.amount?.toString() || "",
//         showInput: !!item.showInput,
//       });

//       return acc;
//     },
//     { formattedReasons: [], errors: [], hasError: false }
//   );

//   setErrors(errors);
//   if (reasonError) return;

// //   setCheckOutDateError("");

//   const formattedDate = formatDate(checkOutDate);

//   // --- Common Payload ---
//   const basePayload = {
//     checkout_date: formattedDate,
//     id: userId,
//     hostel_id: data?.Hostel_Id || dataBed[0]?.Hostel_Id,
//     advance_return: ReturnAmount,
//     reinburse: 1,
//     reasons: formattedReasons,
//   };

//   // --- Dispatch ---
//   if (ReturnAmount >= 0) {
//     dispatch({
//       type: "ADDCONFIRMCHECKOUTCUSTOMER",
//       payload: {
//         ...basePayload,
//         comments,
//         payment_id: modeOfPayment,
//         transaction_id:transactionId
        
//       },
//     });
//   } else {
//     dispatch({
//       type: "CONFIRMCHECKOUTDUECUSTOMER",
//       payload: {
//         ...basePayload,
//         formal_checkout: activeTab === "writeoff",
//         // reason_note: rightOffNote,
//         profile: uploadFile,
//       },
//     });
//   }

//   setFormLoading(true);
// };






    useEffect(() => {
        if (hostelData) {
            setCheckOutDate(hostelData?.CheckoutDate)
        }

    }, [hostelData])

    useEffect(() => {
        if (state.UsersList.statusCodeForDueCustomer === 200 || state.UsersList.statusCodeAddConfirmCheckout === 200) {
            setFormLoading(false)
            handleClosecheck()
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
    // Initialize tooltips with white background
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(
      (tooltipTriggerEl) =>
        new Tooltip(tooltipTriggerEl, {
          customClass: "white-tooltip",
        })
    );
  }, []);
  useEffect(() => {
  // Inject custom style once
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



const handleConfirmCheckout =()=>{
    if(data.customerId || data.currentTenantCustomerId){
 dispatch({
                type: "CONFIRMCHECKOUT",
                payload: { customerId:data.customerId || data.currentTenantCustomerId,
                    comments:comments},
            })
    }
}

    return (
        <div>
             
          {/* <Modal show={show} onHide={handleClose} dialogClassName="checkout-modal" size="lg" centered>
      <Modal.Body className="p-0">
        <div className="d-flex" style={{ height: "80vh" }}>
         
          <div className="p-4 border-end rounded" style={{ flex: "0 0 35%", background: "#f9f9f9" }}>
          <div className="d-flex align-items-center">
  
  <img
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
  />

 

<div>
      <p style={{fontSize:"1.25rem",fontFamily:"Gilroy",fontWeight:600}} className="mb-0">{data?.Name || dataBed[0]?.Name}</p>
  <div className="d-flex mb-2">
    <span className="badge rounded-pill bg-warning text-dark me-2" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
      {hostelData.floor_name}
    </span>
    <span className="badge rounded-pill bg-danger-subtle text-dark" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
      {hostelData["Room Name"]} - {hostelData["Bed Name"]}
    </span>
  </div>

</div>


</div>



            <hr />

            <div className="d-flex justify-content-between mb-3">
              <span style={{fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400}}>Joined Date</span>
              <span style={{fontSize:"1rem",fontFamily:"Gilroy",fontWeight:600}}>  {new Date(hostelData.joining_Date).toLocaleDateString("en-GB")}
</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400}}>Req Checkout Date</span>
              <span style={{fontSize:"1rem",fontFamily:"Gilroy",fontWeight:600}}>{new Date(hostelData.request_checkout_date).toLocaleDateString("en-GB")}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400}}>Total Advance Amount</span>
              <span style={{fontSize:"1rem",fontFamily:"Gilroy",fontWeight:600}}>₹ {hostelData.AdvanceAmount}</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span style={{fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400}}>Monthly Rent</span>
              <span style={{fontSize:"1rem",fontFamily:"Gilroy",fontWeight:600}}>₹ {hostelData.RoomRent}</span>
            </div>

<div className="mt-2" style={{textAlign:"center"}}>
     {ReturnAmount < 0 && <span style={{color:"red",fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400 ,textAlign:"center"}}>Pending</span>}
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
  <p className="mb-0" style={{fontSize:"1.5rem",fontFamily:"Gilroy",fontWeight:600}}>Checkout</p>
  <CloseCircle
    size="24"
    color="#000"
    onClick={handleClose}
    style={{ cursor: "pointer" }}
  />
</div>
<div style={{ maxHeight: "60vh", overflowY: "auto", padding: "15px" }}>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                            ref={checkOutDateRef}
                                            style={{
                                                width: "100%", height: 48, cursor: "pointer",
                                                backgroundColor: "#FFF",
                                                color: "#000",
                                                fontFamily: "Gilroy"
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            value={checkOutDate ? dayjs(checkOutDate) : null}
                                            onChange={(date) => {
                                                setCheckOutDate(date ? date.toDate() : null);
                                                setCheckOutDateError("");
                                            }}
                                            getPopupContainer={() => document.body}

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
                                        Rental Balance
                                    </label>


                                </div>

                                <input
                                    type="text"
                                    name="Advance"
                                    id="Advance"

                                    value={rentalBalance}
                                    className="form-control mt-2"
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

            <div className="p-3  rounded mt-3" style={{backgroundColor:"#E7F1FF",borderRadius:10}}>
           
            
                <div className="d-flex justify-content-between align-items-center p-2">
                                        <div>
                                              <p style={{fontFamily:"Gilroy",fontWeight:600,fontSize:"1rem"}}>Deductions</p>
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

                                             {item.reason_name !== "DueAmount" || !item.isDefault ? (
    <Trash
        size="20"
        color="red"
        variant="Bold"
        style={{ cursor: "pointer" }}
        onClick={() => handleRemoveField(index)}
    />
   ) : null}

                                                   
                                                </div>
                                            </div>
                                        );
                                    })}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <p style={{fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400}}>Total Refund</p>
              <span
          style={{ color: "blue", cursor: "pointer",fontSize:"0.875rem",fontFamily:"Gilroy",fontWeight:400 }}
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
          <p style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:600}}>Total Paid by Tenant</p>
            <p style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:600}}>₹ 18000</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Security Deposit Amount</p>
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>₹ {data.AdvanceAmount || dataBed[0]?.AdvanceAmount}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Rental Amount</p>
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>₹ {data.RoomRent || dataBed[0]?.RoomRent}</p>
          </div>

          <p style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:600}}>Deductions</p>
          <div className="d-flex justify-content-between">
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Stayed Days ({detuction.stayedDays} days * ₹{detuction.ratePerDay})</p>
            <p style={{ color: "red",fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400 }}>₹ {detuction.stayDeductionAmount}</p>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Due amount</p>
            <p style={{ color: "red",fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400 }}>{detuction.DueAmount}</p>
          </div>

          <p style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:600}}>Refundable Amount</p>
          <div className="d-flex justify-content-between">
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Remaining Rent Refund</p>
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>₹ {refundableDetails.remainingRentRefund}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Security Deposit Refund</p>
            <p style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>₹ {refundableDetails.securityDepositRefund}</p>
          </div>
        </div>
      )}

             <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 ">
                              

                                <input
                                    type="text"
                                    name="Advance"
                                    id="Advance"

                                  value={ReturnAmount}
                                    className="form-control mt-2"
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
 {ReturnAmount < 0 && (
    <>
 <div className="d-flex justify-content-between align-items-center mb-3">

  <label className="form-label mb-0"style={{fontSize:"0.875rem",fontWeight:400,fontFamily:"Gilroy"}} >Choose Method to checkout</label>

 
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
       style={{ color: activeTab === "record" ? "white" : "black",fontSize:"0.875rem",fontWeight:400,fontFamily:"Gilroy",padding:5}}
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


)}


{activeTab !== "writeoff" &&(
    <>
        <Form.Check
        type="checkbox"
        style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400,color:"#1E45E1"}}
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
            <Form.Label  style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Transaction ID</Form.Label>
            <Form.Control  value={transactionId} onChange={(e)=>handleTransactionId(e)} style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}} type="text" placeholder="Enter Transaction ID" />
          </Form.Group>

         
          <Form.Group className="mb-3">
            <Form.Label  style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={comments}
              onChange={handleCommentsChange}
              placeholder="Enter comments"
              style={{fontFamily:"Gilroy",fontSize:"0.875rem",fontWeight:400}}
            />
          </Form.Group>
        </div>
      )}
    </>
)
}
      


            <div className="text-end">
              <Button variant="" className="me-2" onClick={handleClose}  style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:400}}>
                Cancel
              </Button>
              <Button variant="primary"   disabled={activeTab !== "writeoff" && ReturnAmount < 0} style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:400}} onClick={handleConfirmCheckout}>Checkout</Button>
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

      
    </Modal> */}


    <Modal show={show} onHide={handleClosecheck} centered >
     
       <Modal.Header
                          style={{ marginBottom: "10px", position: "relative",borderBottom:"none" }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                              }}
                            >
                            Check-out Tenant
                            </div>
                          
                          </div>
                          <CloseCircle size="24" color="#000" onClick={handleClosecheck}
                            style={{ cursor: 'pointer' }} />
                        </Modal.Header>
      <Modal.Body>
     
        <div className="d-flex align-items-center " style={{marginTop:"-30px"}}>
           <img
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
  />
         <div>
      <p style={{fontSize:"1.25rem",fontFamily:"Gilroy",fontWeight:600}} className="mb-0">{data?.firstName || data?.currentTenantFirstName}</p>
  <div className="d-flex mb-2">
    <span className="badge rounded-pill bg-warning text-dark me-2" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
      {data.floorName}
    </span>
    <span className="badge rounded-pill bg-danger-subtle text-dark" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
      {data.roomName} - {data.bedName}
    </span>
  </div>
  </div>
          <div className="ms-auto text-end mt-2">
            <p   style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"#4B4B4B",padding:0 , margin:0}}>Checkout Date</p>
            <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600,}}>{data.bookedAt}</p>
          </div>
        </div>

        {/* Status */}
        {/* <div className="mb-3">
          <strong>Status: </strong>
          <Badge bg="succes
          s">Dues Cleared</Badge>
        </div> */}
{detuction?.DueAmount ? (
          <div className="d-flex justify-content-between align-items-center mb-3">
  <span style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>Status</span>
 <div className="d-flex justify-content-between align-items-center mb-3">
   
  <Button
    style={{
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Gilroy",
      backgroundColor: "#F03E3E",
      padding: "3px 12px",
      borderRadius: 50,
      border: "none",
    }}
  >
 Write-Off
  </Button>
</div>

</div>
):    
  <div className="d-flex justify-content-between align-items-center mb-3">
  <span style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>Status</span>
 <div className="d-flex justify-content-between align-items-center mb-3">
   
  <Button
    style={{
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Gilroy",
      backgroundColor: "#0D9D35",
      padding: "3px 12px",
      borderRadius: 50,
      border: "none",
    }}
  >
   Checkout
  </Button>
</div>

</div>}

        {/* <div className="d-flex justify-content-between align-items-center mb-3">
  <span style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>Status</span>
 <div className="d-flex justify-content-between align-items-center mb-3">
   
  <Button
    style={{
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Gilroy",
      backgroundColor: "#0D9D35",
      padding: "3px 12px",
      borderRadius: 50,
      border: "none",
    }}
  >
    Dues Cleared
  </Button>
</div>

</div> */}


        {/* Comments */}
        

{/* {detuction?.DueAmount ? (
<> */}
        
                                    {/* </> */}
                                    {/* ): */}
                                    <Form.Group >
          <Form.Label style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>Comments</Form.Label>
          <Form.Control
          style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,height:50}}
            as="textarea"
            placeholder="Please Enter Comments"
            rows={3}
            value={comments}
          onChange={handleCommentsChange}
          />
        </Form.Group>
        {/* } */}

      </Modal.Body>
        {state.UsersList?.chrckoutError && (
                    <ErrorMessage message={state.UsersList?.chrckoutError} type="error" />
                )}
      <Modal.Footer style={{borderTop:"none",marginTop:"-10px"}}>
        <Button style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:400}} className="btn btn-light" onClick={handleClosecheck}>
          Cancel
        </Button>
        <Button onClick={handleConfirmCheckout} style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:400}} variant="primary">Check-Out</Button>
      </Modal.Footer>
    </Modal>
        </div>
    )
}
DueCustomerConfirmCheckout.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
    customerID: PropTypes.func.isRequired,


};
export default DueCustomerConfirmCheckout