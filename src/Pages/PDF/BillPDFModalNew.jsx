/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Bills/Invoices.css";
import Whatsapp from '../../Assets/Images/whatsapp.png'
import Whatsapp_blue from '../../Assets/Images/whatsapp_blue.png'
import Whatsapp_white from '../../Assets/Images/whatsapp_white.png'
import Mail from '../../Assets/Images/gmail.png'
import Mail_white from '../../Assets/Images/gmail_white.png'
import Message_text from '../../Assets/Images/message-text.png'
import Message_text_white from '../../Assets/Images/message-white.png'
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { Row, Col, Table } from "react-bootstrap";
import { Location, Call, Profile, DocumentDownload, Edit, RefreshSquare } from 'iconsax-react'
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { ArrowUp2, ArrowDown2, AddCircle, Add } from "iconsax-react";
import RecordPayment from "../../Pages/Bills/RecordPayment";
import RefundAmount from "../Bills/RefundAmount";
import { useHasPermission } from '../../Utils/Permission';
import DiscountInvoice from "./DiscountInvoice";
import WaiveOFFConfirm from "./WaiveOFFConfirm";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";



const InvoiceCard = ({ rowData, isReportsInvoiceRegisterWay, isTenantWay }) => {

  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showform, setShowform] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [payapleform, setPayableForm] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [refundDetails, setRefundDetails] = useState('')
  const modalRef = useRef(null);
  const [showDiscountInvoice, setShowDiscountInvoice] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const innerScrollRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false)
  const [showWaiveModal, setShowWaiveModal] = useState(false);
  const menuItems = [
    {
      label: "Send Mail",
      icon: Mail,
      iconWhite: Mail_white,
      key: "mail",
    },
    {
      label: "Send SMS",
      icon: Message_text,
      iconWhite: Message_text_white,
      key: "sms",
    },
    {
      label: "Send Whatsapp",
      icon: Whatsapp_blue,
      iconWhite: Whatsapp_white,
      key: "whatsapp",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);


  const [isVisible, setIsVisible] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [invoiceList, setInvoiceList] = useState({
    balanceDue: '',
    invoiceId: '',
    invoiceDate: '',

  });

  const [openMenu, setOpenMenu] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleCloseForm = () => {

    setShowform(false);
    dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
    dispatch({ type: 'CLEAR_INVALID_DETAILS_ERROR' })
    dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
  };

  const handleCloseConfirm = () => {
    setShowWaiveModal(false)
  }


  const handleDownload = (rowData) => {
    console.log("rowData", rowData)
    if (rowData) {
      dispatch({
        type: "INVOICEPDF",
        payload: {
          hostelId: rowData?.hostelId || pdfDetails?.hostelId,
          invoiceId: rowData?.invoiceId,
        },
      });
      setPdfLoading(true)
    }


  };

  useEffect(() => {

    setIsVisible(true)
  }, [rowData])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state?.InvoiceList?.invoicePDF;
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
        setPdfLoading(false)
        dispatch({ type: 'CLEAR_INVOICE_PDF_STATUS_CODE' })
      }
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  // Add and Edit
  useEffect(() => {
    if (state.InvoiceList.pdfErrorMessage || state.createAccount?.networkError || state.InvoiceList?.sharePdfError) {
      setPdfLoading(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        dispatch({ type: 'REMOVE_SHARE_PDF_ERROR' })

      }, 100);
    }
  }, [state.InvoiceList.pdfErrorMessage, state.createAccount?.networkError, state.InvoiceList?.sharePdfError]);

  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false)
      dispatch({
        type: 'GETPARTICULARBILLSDETAILS',
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId
        }
      })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_INVOICE_DISCOUNT_REDUCER' })
      })
    }
  }, [state.InvoiceList?.makeInvoiceDiscountStatus])

  useEffect(() => {
    if (state.InvoiceList.sharePdfSuccess) {
      setPdfLoading(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_SHARE_PDF' })
      }, 100);

    }

  }, [state.InvoiceList.sharePdfSuccess])


  useEffect(() => {
    if (state.InvoiceList.createRefundStatusCode === 200) {
      setPayableForm(false)
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

      setTimeout(() => {
        dispatch({ type: 'REMOVE_CREATE_REFUND' })
      }, 100)
    }

  }, [state.InvoiceList.createRefundStatusCode])


  const handleBackInvoice = () => {
    if (isReportsInvoiceRegisterWay) {
      navigate(`/reports/invoice-register/${state.login?.selectedHostel_Id}`);
    } else if (isTenantWay) {
      navigate(`/tenant/details/${pdfDetails?.customerInfo?.customerId}`)
      dispatch({ type: "UPDATE_USERSLIST_TRUE" });

    } else {
      navigate(`/invoice/${state.login?.selectedHostel_Id}`);
    }


  }





  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {

    setIsOpen(false);

    if (String(key) === "whatsapp") {
      dispatch({
        type: 'GETSHAREPDF',
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      })

      setPdfLoading(true)

    }
  };


  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
  } = useHasPermission("Bills");

  const isValidSubscription = state.UsersList?.hotelDetailsinPg?.isSubscriptionActive
  const isExportAllow = isValidSubscription && canReadInvoice



  const pdfDetails = state.InvoiceList?.particularBillsDetails;



  const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;


  const templateColor = pdfDetails?.configurations?.templateColor;
  const isGradient = templateColor?.includes("linear-gradient");

  const textStyle = isGradient
    ? {
      fontFamily: "Gilroy",
      fontWeight: 600,
      background: templateColor,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }
    : {
      fontFamily: "Gilroy",
      fontWeight: 600,
      color: templateColor || "#1E45E1",
    };


  const getIconStyle = (templateColor) => {
    const isGradient = templateColor?.includes("linear-gradient");

    return isGradient
      ? {
        background: templateColor,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }
      : { color: templateColor || "#4B4B4B" };
  };


  const totalDeductions = pdfDetails?.invoiceInfo?.listDeductions?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );


  const showRentalPeriod =
    pdfDetails?.configurations?.invoiceType === 'Rent' &&
    pdfDetails?.invoiceType !== 'SETTLEMENT';




  const handleNavigateRecordPayment = (pdfDetails) => {
    setShowform(true);
    setSelectedUserId(pdfDetails?.customerInfo?.customerId)
    // setInvoiceValue(pdfDetails)
    setInvoiceList({
      balanceDue: pdfDetails?.invoiceInfo?.balanceAmount,
      invoiceId: pdfDetails?.invoiceId,
      invoiceDate: pdfDetails?.invoiceDate,
    })
  }


  const handleNavigateRefund = (pdfDetails) => {

    setRefundDetails(pdfDetails)
    setPayableForm(true)
  }
  const handleCloseRefundAmount = () => {
    setPayableForm(false)
  }

  const handleWaiveOff = () => {
    setOpen(false)
    setShowWaiveModal(true)
  }


  const handleMakeDiscount = () => {
    setOpen(false)
    setShowDiscountInvoice(true)
    setIsEdit(false)
  }

  const handleCloseFormDiscount = () => {
    setShowDiscountInvoice(false)
  }


  const statusClasses = {
    Pending: {
      bg: "bg-[#FFF1F1]",
      dot: "bg-[#EF4444]",
    },
    "Partial Payment": {
      bg: "bg-[#FFF1F1]",
      dot: "bg-[#EF4444]",
    },
    Paid: {
      bg: "bg-[#ECFDF5]",
      dot: "bg-[#10B981]",
    },
    Refunded: {
      bg: "bg-[#FFFBEB]",
      dot: "bg-[#F59E0B]",
    },
    "Partially Refunded": {
      bg: "bg-[#FFFBEB]",
      dot: "bg-[#F59E0B]",
    },
    "Pending Refund": {
      bg: "bg-[#FFF7ED]",
      dot: "bg-[#FB923C]",
    },
    Cancelled: {
      bg: "bg-[#F3F4F6]",
      dot: "bg-[#6B7280]",
    },
  };


  const isPending = pdfDetails?.invoiceInfo?.paymentStatus === "Pending";

  const isSettlement = pdfDetails?.invoiceType === "SETTLEMENT";
  const isRent = pdfDetails?.invoiceInfo?.invoiceItems?.[0]?.description === "Rent";

  const isNotDiscounted = pdfDetails?.invoiceInfo?.isDiscounted === false;

  const showSplitButton = isPending && (isSettlement || isRent) && isNotDiscounted;


  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false)
      dispatch({
        type: 'GETPARTICULARBILLSDETAILS', payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId
        }
      })
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_INVOICE_DISCOUNT_REDUCER' })
      })
    }

  }, [state.InvoiceList?.makeInvoiceDiscountStatus])

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (state.InvoiceList?.editInvoiceDiscountStatus === 200) {
      dispatch({
        type: 'INVOICESLISTFILTER',
        payload: { hostelId: state.login.selectedHostel_Id }
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_EDIT_INVOICE_DISCOUNT_REDUCER' })
      }, 100)

    }
  }, [state.InvoiceList?.editInvoiceDiscountStatus]);

  useEffect(() => {
    if (state.InvoiceList?.refuseDiscountStatus === 204) {
      setShowRefuseModal(false);
      dispatch({
        type: 'GETPARTICULARBILLSDETAILS', payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId
        }
      })

      dispatch({
        type: 'INVOICESLISTFILTER',
        payload: { hostelId: state.login.selectedHostel_Id }
      });
      setTimeout(() => {
        dispatch({ type: 'REFUSE_DISCOUNT_REDUCER_CLEAR' })
      }, 100)


    }
  }, [state.InvoiceList?.refuseDiscountStatus]);


  const handleRefuse = () => {

    const payload = {
      hostelId: pdfDetails?.hostelId,
      invoiceId: pdfDetails?.invoiceId,
    };
    if (pdfDetails?.hostelId && pdfDetails?.invoiceId) {
      dispatch({
        type: "REFUSE_DISCOUNT",
        payload
      });
    }
  }






  return (
    <div className="relative">
      <style>
        {`
@keyframes slideInRight {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideInRight 0.4s ease-out;
}
`}
      </style>


      <div className="border-l border-gray-200">

        <div className="flex justify-between items-center bg-white border-b border-gray-200 min-h-[50px] w-full sticky top-0 z-10 px-2">

          <div className="flex items-center gap-2">
            <div className="pl-1">
              <label className="text-[16px] text-black font-semibold font-gilroy">
                {pdfDetails?.invoiceNumber}
              </label>
            </div>

            <div>
              {(() => {
                const status =
                  pdfDetails?.invoiceInfo?.paymentStatus === "Cancelled"
                    ? "Cancelled"
                    : pdfDetails?.invoiceInfo?.paymentStatus;

                if (!status) return null;

                const styles = statusClasses[status] || {
                  bg: "bg-gray-100",
                  dot: "bg-gray-400",
                };

                return (
                  <span
                    className={`flex items-center gap-2 px-2 py-[2px] text-[10px] rounded-full  font-gilroy w-fit ${styles.bg}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                    {status}
                  </span>
                );
              })()}
            </div>
          </div>


          <div className="flex items-center gap-2">


            <div
              className={`flex items-center justify-center border rounded-lg h-[30px] w-[30px] ${isExportAllow ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                }`}
              onClick={() => {
                if (isExportAllow) handleDownload(rowData);
              }}
            >
              <DocumentDownload
                size="18"
                color={isExportAllow ? "#222222" : "#BDBDBD"}
              />
            </div>

            <button
              disabled
              className="flex items-center justify-center h-[30px] w-[30px] rounded-lg border
             disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshSquare
                size="18"
                className="text-[#222222] disabled:text-gray-400"
              />
            </button>


            <div className="relative inline-block">
              <div
                className="flex items-center justify-center gap-2 h-[30px] w-[80px] rounded-lg cursor-pointer bg-[#1E45E1]"
                onClick={handleShareClick}
              >
                <img
                  src={Whatsapp}
                  alt="Share"
                  className="h-[15px] w-[15px] invert"
                />
                <span className="text-sm font-normal text-white font-gilroy leading-none">
                  Share
                </span>
              </div>


              {isOpen && (
                <div className="absolute right-[5px] mt-2 p-2 shadow rounded-lg bg-white w-40 z-[9999]">
                  {menuItems.map((item) => {
                    const isDisabled = !isExportAllow;

                    return (
                      <div
                        ref={modalRef}
                        key={item.key}
                        className={`flex items-center mb-2 p-1 rounded transition-colors duration-200
                  ${isDisabled
                            ? "bg-gray-100 cursor-not-allowed opacity-60"
                            : hoveredItem === item.key
                              ? "bg-[#1E45E1] text-white cursor-pointer"
                              : "bg-white cursor-pointer"
                          }`}
                        onMouseEnter={() =>
                          !isDisabled && setHoveredItem(item.key)
                        }
                        onMouseLeave={() =>
                          !isDisabled && setHoveredItem(null)
                        }
                        onClick={() =>
                          !isDisabled && handleMenuClick(item.key)
                        }
                      >
                        <img
                          src={
                            !isDisabled && hoveredItem === item.key
                              ? item.iconWhite
                              : item.icon
                          }
                          className="mr-2"
                          alt={item.label}
                        />

                        <span
                          className={`text-[13px] font-normal font-gilroy ${isDisabled
                            ? "text-gray-400"
                            : hoveredItem === item.key
                              ? "text-white"
                              : "text-[#212529]"
                            }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>


            <div className="mr-3">
              <IoClose
                className="h-5 w-5 text-red-500 cursor-pointer"
                onClick={handleBackInvoice}
              />
            </div>

          </div>
        </div>



        <div className="relative h-[calc(100vh-80px)] overflow-y-auto bg-[#F7F8FC]   flex justify-center p-3 show-scrolls">
          {pdfLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {isVisible &&
            <div className="w-[90%] rounded-lg mb-5">


              <div
                ref={innerScrollRef}
                className="bg-white rounded-lg  shadow-md"
              >


                <div className="p-2 rounded-t-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center px-3 gap-4">


                    <div className="flex justify-start">
                      <img
                        src={
                          pdfDetails?.configurations?.hostelLogo
                            ? pdfDetails?.configurations?.hostelLogo
                            : Logo
                        }
                        alt="logo"
                        className="mt-2 max-w-[134px] rounded object-contain"
                        style={{
                          height: pdfDetails?.configurations?.hostelLogo ? 50 : 25,
                        }}
                      />
                    </div>


                    <div className="mt-2 sm:pl-4">

                      <div className="text-[14px] font-semibold text-[#2B2B2B] font-gilroy">
                        {pdfDetails?.stayInfo?.hostelName}
                      </div>

                      <div className="text-[11px] font-medium text-[#4B4B4B] leading-[1.2rem] break-words line-clamp-5 font-gilroy">
                        {pdfDetails?.configurations?.address}
                      </div>

                    </div>

                  </div>
                </div>

                <hr className="m-0"
                  style={{
                    border: "none",
                    height: "1px",
                    background: templateColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                />

                <div className="bg-white rounded-bottom  position-relative" style={{ width: "100%", }}>
                  <div className="text-center pt-2 pb-1">
                    <h5 style={{ ...textStyle, fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600 }}>

                      {
                        pdfDetails?.invoiceType === 'SETTLEMENT'
                          ? "Final Settlement Invoice"
                          : pdfDetails?.configurations?.invoiceType === 'Advance'
                            ? "Security Deposit"
                            : pdfDetails?.configurations?.invoiceType === 'Rent'
                              ? "Payment Bills"
                              : "Invoice"
                      }



                    </h5>
                  </div>


                  <div className="row px-4 mt-1">
                    <div className="col-md-5 mb-3" style={{ fontFamily: "Gilroy", fontSize: 13, color: "#222" }}>

                      <div className="mb-2" style={{ fontSize: 11, fontWeight: 600, fontStyle: "italic", ...textStyle }}>
                        Bill to:
                      </div>

                      <div className="mb-1 d-flex align-items-center">
                        <span style={getIconStyle(templateColor)}>
                          <Profile size="16" variant="Bold" />
                        </span>
                        <span style={{ fontWeight: 600, color: "#171717", fontSize: 12 }} className="ms-1">
                          : {""}{pdfDetails?.customerInfo?.fullName}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <span style={getIconStyle(templateColor)}>
                          <Call size="16" variant="Bold" />
                        </span>
                        <span style={{ color: "#171717", fontSize: 12 }} className="ms-1">
                          : {""}{pdfDetails?.customerInfo?.customerMobileNo &&
                            pdfDetails.customerInfo.customerMobileNo !== "undefined"
                            ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                            : ""}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <span style={getIconStyle(templateColor)}>
                          <IoBed style={{ fontSize: 16 }} />
                        </span>
                        <span style={{ color: "#171717", fontSize: 12 }} className="d-flex align-items-center ms-1">
                          {pdfDetails?.stayInfo?.floorName && (
                            <>
                              : {""}{pdfDetails.stayInfo.floorName} , {""}

                            </>
                          )}

                          {pdfDetails?.stayInfo?.roomName && (
                            <>
                              {pdfDetails.stayInfo.roomName} {""}

                            </>
                          )} {""}

                          -
                          {""}         {pdfDetails?.stayInfo?.bedName}
                        </span>

                      </div>

                      <div className="d-flex ">
                        <span style={getIconStyle(templateColor)}>
                          <Location size="16" variant="Bold" />
                        </span>

                        <div style={{ color: "#171717", fontSize: 12 }} className="ms-1" >
                          : {""} {pdfDetails?.customerInfo?.fullAddress}


                        </div>
                      </div>

                    </div>

                    <div className="col-md-7 mb-1 ps-5 mt-2 ">
                      <div className="row">

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.invoiceNumber}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.invoiceDate}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.dueDate}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.customerInfo?.joiningDate}</div>
                        {showRentalPeriod && <>
                          <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Rental Period :</div>
                          <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.invoiceInfo?.invoicePeriod}</div>
                        </>}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="px-5 ">
                  <div className="mb-1">
                    <label style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, ...textStyle }}>Payment Summary</label>
                  </div>
                  {
                    pdfDetails?.invoiceType === 'SETTLEMENT' ?
                      <>
                        <div className="" style={{ fontFamily: "Gilroy" }}>
                          <Row style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}>

                            <Col md={6} className="p-1">
                              <Table responsive className="mb-0">
                                <thead>
                                  <tr style={{ backgroundColor: "#FFF" }}>
                                    <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textTransform: "capitalize" }}>{pdfDetails?.invoiceInfo?.totalAmount > 0 ? "Payment" : "Refund"}</th>
                                    <th
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#222222",
                                        textAlign: "right",
                                      }}
                                    >
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                                    <tr key={index}>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          color: "#2D2D2D",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {item.description}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          textAlign: "right",
                                          fontWeight: 600,
                                          color: "#2D2D2D",
                                        }}
                                      >
                                        ₹ {Number(item.amount)}
                                      </td>
                                    </tr>
                                  ))}


                                </tbody>
                              </Table>

                            </Col>


                            <Col md={6} className="p-1">
                              <Table responsive className="mb-0">
                                <thead>
                                  <tr style={{ backgroundColor: "#FFF" }}>
                                    <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textTransform: "capitalize" }}>Deductions</th>
                                    <th
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#222222",
                                        textAlign: "right",
                                      }}
                                    >
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>

                                  {pdfDetails?.invoiceInfo?.listDeductions.length > 0 ? pdfDetails?.invoiceInfo?.listDeductions?.map((item, index) => (
                                    <tr key={index}>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          color: "#2D2D2D",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {item.type}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          color: "#2D2D2D",
                                          fontWeight: 600,
                                          textAlign: "right",
                                        }}
                                      >
                                        ₹{" "}

                                        {item.amount}
                                      </td>
                                    </tr>

                                  ))
                                    :
                                    <tr>
                                      <td colSpan="2" style={{ fontSize: 12, textAlign: "start", color: "#2D2D2D", fontWeight: 500, backgroundColor: "" }}>
                                        No Deductions
                                      </td>

                                    </tr>}


                                </tbody>
                              </Table>


                            </Col>





                            <Col md={6} className="p-1">
                              <div
                                style={{
                                  backgroundColor: "#FAFBFF",
                                  borderTop: "1px solid #DFDFDF",
                                  padding: "10px 12px",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#2D2D2D",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>Total</span>
                                <span>₹ {pdfDetails?.invoiceInfo?.subTotal || 0}</span>
                              </div>
                            </Col>



                            <Col md={6} className="p-1">
                              <div
                                style={{
                                  backgroundColor: "#FAFBFF",
                                  borderTop: "1px solid #DFDFDF",
                                  padding: "10px 12px",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#2D2D2D",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span style={{ color: "#FF0000" }}>Total Deductions</span>
                                <span>₹ {totalDeductions || 0}</span>
                              </div>
                            </Col>

                          </Row>

                        </div>
                        <div className="my-3 w-full flex justify-end">
                          <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">

                            <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                Grand Total
                              </span>
                              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                Payment Made
                              </span>
                              <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                                ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                              </span>
                            </div>
                            {
                              pdfDetails?.invoiceInfo?.totalAmount > 0 &&

                              <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Discount Applied
                                </span>
                                <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
                                </span>
                              </div>
                            }

                            <div className="flex justify-between items-center text-[12px] font-semibold">
                              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                Balance Due
                              </span>
                              <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                                ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
                              </span>
                            </div>

                          </div>
                        </div>
                      </>

                      :


                      pdfDetails?.configurations?.invoiceType === 'Advance' ?
                        <div
                          className="table-responsive row justify-content-between mt-0 mb-2 p-3 "
                          style={{ fontFamily: "Gilroy, sans-serif" }}
                        >
                          <table className="p-0"
                            style={{
                              width: "100%",
                              borderCollapse: "separate",
                              borderSpacing: 0,
                              border: "1px solid #dee2e6",
                              borderRadius: "12px",
                              overflow: "hidden",
                              fontFamily: "Gilroy, sans-serif",
                            }}
                          >
                            <thead>
                              <tr>
                                <th
                                  style={{
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #dee2e6",
                                    width: "10%",
                                  }}
                                >
                                  S.NO
                                </th>
                                <th
                                  style={{
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#000",
                                    textAlign: "left",
                                    borderBottom: "1px solid #dee2e6",
                                    width: "60%",
                                  }}
                                >
                                  DESCRIPTION
                                </th>
                                <th
                                  style={{
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: "#000",
                                    textAlign: "right",
                                    borderBottom: "1px solid #dee2e6",
                                    width: "30%",
                                  }}
                                >
                                  AMOUNT / INR
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                                <tr key={index}
                                  style={{
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <td
                                    style={{
                                      padding: "10px 14px",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      textAlign: "left",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    1
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px 14px",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      color: "#444",
                                      textAlign: "left",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Security Deposit (Advance)
                                  </td>
                                  <td
                                    style={{
                                      padding: "10px 14px",
                                      fontSize: "13px",
                                      fontWeight: 500,
                                      color: "#444",
                                      textAlign: "right",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    Rs. {item.amount?.toLocaleString("en-IN")}
                                  </td>
                                </tr>

                              ))}
                              <tr
                                style={{
                                  backgroundColor: "#F9F9F9",
                                  fontWeight: 600,
                                }}
                              >
                                <td
                                  colSpan="2"
                                  style={{
                                    textAlign: "left",
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    color: "#000",
                                  }}
                                >
                                  Total
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    color: "#000",
                                  }}
                                >
                                  ₹{" "}
                                  {Number(pdfDetails?.invoiceInfo?.subTotal || 0)}
                                </td>
                              </tr>

                            </tbody>
                          </table>

                          <div className="my-3 w-full flex justify-end">
                            <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">

                              <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Grand Total
                                </span>
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Payment Made
                                </span>
                                <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Balance Due
                                </span>
                                <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
                                </span>
                              </div>

                            </div>
                          </div>



                        </div>

                        :
                        <>
                          <div className="" style={{ fontFamily: "Gilroy" }}>
                            <Row
                              style={{
                                border: "1px solid #DFDFDF",
                                borderRadius: 8,
                                margin: 0,
                              }}
                            >

                              <Col
                                md={hasTax > 0 ? 6 : 12}
                                className="p-2"
                                style={{ borderRight: "none" }}
                              >
                                <Table responsive bordered={false} className="mb-0">
                                  <thead>
                                    <tr style={{ backgroundColor: "#FFF" }}>
                                      <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>S.NO</th>
                                      <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textAlign: "center" }}>DESCRIPTION</th>
                                      <th
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 600,
                                          color: "#222222",
                                          textAlign: "right",
                                        }}
                                      >
                                        AMOUNT / INR
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500 }}>
                                          {index + 1}
                                        </td>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500, textAlign: "center" }}>
                                          {item.description}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            textAlign: "right",
                                            fontWeight: 600,
                                            color: "#2D2D2D",
                                          }}
                                        >
                                          ₹ {Number(item.amount).toLocaleString("en-IN")}
                                        </td>
                                      </tr>
                                    ))}

                                    <tr
                                      style={{
                                        backgroundColor: "#FAFBFF",
                                        fontWeight: 600,
                                        borderTop: "1px solid #DFDFDF",
                                      }}
                                    >
                                      <td colSpan={2} style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 500, textAlign: hasTax ? "start" : "center", paddingLeft: !hasTax && 150 }}>
                                        Total
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "right",
                                          fontSize: 14,
                                          fontWeight: 600,
                                          color: "#2D2D2D",
                                        }}
                                      >
                                        ₹ {Number(pdfDetails?.invoiceInfo?.subTotal || 0).toLocaleString("en-IN")}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Col>


                              {hasTax && (
                                <Col md={6} className="p-2">
                                  <Table responsive bordered={false} className="mb-0">
                                    <thead>
                                      <tr style={{ backgroundColor: "#FFF" }}>
                                        <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>OTHERS</th>
                                        <th
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "#222222",
                                            textAlign: "right",
                                          }}
                                        >
                                          AMOUNT / INR
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      <tr>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500 }}>
                                          GST ({pdfDetails?.invoiceInfo?.taxPercentage}%)
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            color: "#2D2D2D",
                                            fontWeight: 600,
                                            textAlign: "right",
                                          }}
                                        >
                                          ₹{" "}
                                          {Number(pdfDetails?.invoiceInfo?.taxAmount).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                          })}
                                        </td>
                                      </tr>

                                      <tr
                                        style={{
                                          backgroundColor: "#FAFBFF",
                                          fontWeight: 600,
                                          borderTop: "1px solid #DFDFDF",
                                        }}
                                      >
                                        <td style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 500 }}>Total</td>
                                        <td
                                          style={{
                                            textAlign: "right",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "#2D2D2D",
                                          }}
                                        >
                                          ₹{" "}
                                          {Number(pdfDetails?.invoiceInfo?.taxAmount || 0).toLocaleString("en-IN")}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Col>
                              )}
                            </Row>




                          </div>



                          <div className="my-3 w-full flex justify-end">
                            <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">

                              <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Grand Total
                                </span>
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Payment Made
                                </span>
                                <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Discount Applied
                                </span>
                                <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-[12px] font-semibold">
                                <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                  Balance Due
                                </span>
                                <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                                  ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
                                </span>
                              </div>

                            </div>
                          </div>

                        </>
                  }


                </div>


                <div className="px-5 mt-1">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <h6
                        style={{
                          fontSize: "11px",
                          fontFamily: "Gilroy",
                          fontWeight: 800,
                          marginBottom: "12px", ...textStyle
                        }}
                      >
                        ACCOUNT DETAILS
                      </h6>

                      <div className="mb-1">
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy", }}>
                          Account No:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy", }}>
                          {pdfDetails?.accountDetails?.accountNo || "N/A"}
                        </span>
                      </div>

                      <div className="mb-1">
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          IFSC Code:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}> {pdfDetails?.accountDetails?.ifscCode || "N/A"}</span>
                      </div>

                      <div className="mb-1">
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          Bank Name:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{pdfDetails?.accountDetails?.bankName || "N/A"}</span>
                      </div>

                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          UPI Details:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{pdfDetails?.accountDetails?.upiId || "N/A"}</span>
                      </div>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-4 d-flex flex-column justify-content-between">

                      <div className="d-flex justify-content-center mb-2">
                        {pdfDetails?.accountDetails?.qrCode ?
                          <img
                            src={pdfDetails?.accountDetails?.qrCode ? pdfDetails?.accountDetails?.qrCode : ""}
                            alt="Barcode"
                            style={{ height: "auto", maxWidth: 150, borderRadius: 2 }}
                            className="img-fluid"
                          />
                          :
                          ""}
                      </div>

                      {/* <div className="d-flex justify-content-end">
                        {[Paytm, Phonepe, Gpay].map((icon, idx) => (
                          <img
                            key={idx}
                            src={icon}
                            alt="UPI"
                            style={{ height: 38, width: 38 }}
                            className="ms-2"
                          />
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center mt-4 mb-5 px-5">


                  <div className="w-full md:w-8/12 bg-[#F5F7FFBD] px-1 py-2 rounded">
                    <h4 className="text-[11px] font-[Gilroy] font-semibold text-[#4B4B4B]">
                      Terms and Conditions
                    </h4>

                    <p className="whitespace-pre-line text-[10px] font-[Gilroy] font-semibold text-[#3D3D3D] pr-[50px]">
                      {pdfDetails?.configurations?.termAndCondition}
                    </p>
                  </div>


                  <div className="w-full md:w-4/12 flex flex-col justify-end items-end mt-4 md:mt-0">
                    {pdfDetails?.configurations?.signatureUrl && (
                      <img
                        src={pdfDetails?.configurations?.signatureUrl}
                        alt="Digital Signature"
                        className="h-[60px] w-[130px] pl-5"
                      />
                    )}

                    <p className="text-[10px] font-[Gilroy] font-semibold text-[#2C2C2C]">
                      Authorized Signature
                    </p>
                  </div>

                </div>

                {Number(pdfDetails?.invoiceInfo?.discountAmount) > 0 && !showDiscountInvoice && (
                  <div className="fixed bottom-16 right-5 z-[9999] animate-slideIn">

                    <div className="relative flex items-center justify-between gap-4 bg-white px-4 py-2 rounded-md shadow-lg min-w-[220px]">

                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 flex items-center justify-center rounded-full bg-[#00A63E] text-white text-[11px]">
                          ✓
                        </span>

                        <span className="font-gilroy text-[14px] font-normal leading-[100%] tracking-normal">
                          Discount Applied
                        </span>
                      </div>

                      <PiDotsThreeOutlineVerticalFill
                        className="cursor-pointer text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(!openMenu);
                        }}
                      />

                      {openMenu && (
                        <div
                          className="absolute right-0 bottom-12 w-44 bg-white border rounded-md shadow-md z-50 animate-fadeIn"
                          onClick={(e) => e.stopPropagation()}
                        >

                          <div
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2
      font-gilroy text-[14px] font-normal leading-[150%] tracking-normal"

                            onClick={() => {
                              setIsEdit(true);
                              setEditData(pdfDetails?.discountDetails || pdfDetails?.invoiceInfo);
                              setShowDiscountInvoice(true);
                              setOpenMenu(false);
                            }}
                          >
                            <Edit
                              size="16"
                              color={"#222222"}
                            /> Edit
                          </div>


                          <div

                            className="mb-1 px-3 py-1.5 text-sm  font-gilroy bg-[#F7FAFF] text-black hover:bg-red-50 cursor-pointer flex items-center gap-2 whitespace-nowrap border-l-[3px] border-blue-600"
                            onClick={() => {
                              setShowRefuseModal(true);
                              setOpenMenu(false);
                              setSelectedInvoice(pdfDetails);
                            }}
                          >
                            <IoClose size={18} className="text-red-500 " />
                            Refuse with invoice
                          </div>


                        </div>
                      )}

                    </div>
                  </div>
                )}

                <hr className="mb-2"
                  style={{
                    border: "none",
                    height: "1px",
                    background: templateColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                />
                <div className="px-5">
                  <div
                    className="text-center rounded-bottom d-flex justify-content-between"
                    style={{
                      borderTopRightRadius: '38px',
                      borderTopLeftRadius: '38px',
                    }}
                  >

                    <p
                      className="mb-0"
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: '#4B4B4B',
                      }}
                    >
                      Email: {" "}
                      <span
                        style={{
                          fontSize: '13px',
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                          color: '#222222',
                        }}
                      >
                        {pdfDetails?.emailId}
                      </span>
                    </p>


                    <p
                      className="mb-0"
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: '#4B4B4B',
                      }}
                    >
                      Contact: {" "}
                      <span
                        style={{
                          fontSize: '13px',
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                          color: '#222222',
                        }}
                      >
                        {pdfDetails?.mobile && `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
                      </span>
                    </p>
                  </div>
                </div>


              </div>

            </div>

          }


        </div>
      </div>


      {pdfDetails?.invoiceInfo?.paymentStatus !== "Cancelled" && (
        <div className="sticky bottom-0 left-0 right-0 z-[1000] bg-white shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.15)] font-gilroy">

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
            <span className="font-semibold text-[16px] text-[#222]">
              {pdfDetails?.invoiceInfo?.totalAmount > 0
                ? "Payments Made"
                : "Refund Made"}
            </span>


            {pdfDetails?.paymentHistory?.length === 0 && pdfDetails?.invoiceInfo?.totalAmount > 0
              ? <span className="bg-[#F1F1F1] px-4 py-2 rounded-md text-xs text-black"> No Payments made yet!</span>
              : pdfDetails?.refundHistory?.length === 0 && pdfDetails?.invoiceInfo?.totalAmount < 0
                ? <span className="bg-[#FFF8F8] px-4 py-2 rounded-md text-sm text-red-500">No Refund made yet!</span>
                : ""}

            <div className="flex items-center gap-2">


              {Number(pdfDetails?.invoiceInfo?.balanceAmount) > 0 && (
                <div className="relative inline-flex" ref={menuRef}>


                  <button
                    disabled={!canWriteInvoice}
                    onClick={() => {
                      if (canWriteInvoice) handleNavigateRecordPayment(pdfDetails);
                    }}
                    className={`flex items-center gap-2 bg-[#1E45E1] text-white text-sm px-4 py-2 
        ${showSplitButton ? "rounded-l-md" : "rounded-md"} 
        disabled:opacity-50`}
                  >
                    <Add size="16" color="#FFFFFF" />
                    Record Payment
                  </button>

                  {
                    showSplitButton &&
                    <button
                      onClick={() => setOpen(!open)}
                      className="bg-[#1E45E1] text-white px-2 rounded-r-md border-l border-blue-400"
                    >
                      <ArrowDown2
                        size="16"
                        className={`transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                          }`}
                      />
                    </button>
                  }

                  {open && (
                    <div className="absolute right-0 top-[-100px] mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-50">

                      <button
                        onClick={handleWaiveOff}
                        disabled={!canWriteInvoice}
                        className={`w-full text-left px-4 py-2 text-sm
              ${canWriteInvoice ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"}
            `}
                      >
                        Waive Off
                      </button>

                      <button
                        onClick={handleMakeDiscount}
                        disabled={!canWriteInvoice}
                        className={`w-full text-left px-4 py-2 text-sm
              ${canWriteInvoice ? "hover:bg-blue-50" : "opacity-50 cursor-not-allowed"}
            `}
                      >
                        Make Discount
                      </button>

                    </div>
                  )}
                </div>
              )}


              {pdfDetails?.invoiceInfo?.totalAmount < 0 &&
                Number(pdfDetails?.invoiceInfo?.balanceAmount) !== 0 && (
                  <button
                    disabled={!canWriteInvoice}
                    onClick={() => handleNavigateRefund(pdfDetails)}
                    className="flex items-center gap-1 bg-[#1E45E1] text-white text-sm px-3 py-1.5 rounded-md disabled:opacity-50"
                  >
                    + Refund Amount
                  </button>
                )}


              {
                (
                  isOpenPayment ? (
                    <ArrowUp2
                      size="18" variant="Bold"
                      color="#1E45E1"
                      style={{ cursor: "pointer" }}
                      onClick={() => { setIsOpenPayment(false); setIsOpen(false) }}
                    />
                  ) : (
                    <ArrowDown2
                      size="18" variant="Bold"
                      color="#1E45E1"
                      style={{ cursor: "pointer" }}
                      onClick={() => { setIsOpenPayment(true); setIsOpen(false) }}
                    />
                  )
                )
              }

            </div>
          </div>


          {isOpenPayment && (
            <div>


              {pdfDetails?.paymentHistory?.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                      <tr>
                        <th className="text-left px-3 py-2">DATE</th>
                        <th className="text-left px-3 py-2">REF NO</th>
                        <th className="text-left px-3 py-2">PAYMENT MODE</th>
                        <th className="text-left px-3 py-2">AMOUNT</th>
                        <th className="text-left px-3 py-2">STATUS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pdfDetails.paymentHistory.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-3 py-2 text-xs text-[#6B7280] font-semibold">
                            {item.date || item.paidDate || "-"}
                          </td>

                          <td className="px-3 py-2 text-xs text-[#1E45E1] font-medium">
                            {item.transactionReferenceId ||
                              item.referenceNumber ||
                              "-"}
                          </td>

                          <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                            {item.bankAccount}
                          </td>

                          <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                            ₹{item.amount}
                          </td>

                          <td className="px-3 py-2">
                            <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                              ● Paid
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}


              {pdfDetails?.refundHistory?.length > 0 && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                      <tr>
                        <th className="text-left px-3 py-2">DATE</th>
                        <th className="text-left px-3 py-2">REF NO</th>
                        <th className="text-left px-3 py-2">RETURNED FROM</th>
                        <th className="text-left px-3 py-2">AMOUNT</th>
                        <th className="text-left px-3 py-2">STATUS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {pdfDetails.refundHistory.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-3 py-2 text-xs text-[#6B7280] font-semibold">
                            {item.date || item.paidDate || "-"}
                          </td>

                          <td className="px-3 py-2 text-xs text-[#1E45E1] font-medium">
                            {item.transactionReferenceId ||
                              item.referenceNumber ||
                              "-"}
                          </td>

                          <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                            {item.bankAccount}
                          </td>

                          <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                            ₹{item.amount}
                          </td>

                          <td className="px-3 py-2">
                            <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                              ● Refunded
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}


              <div className="flex justify-end px-5 py-2 border-t ">
                <span className="mr-2 text-sm text-[#4B4B4B] font-medium">
                  Balance Due
                </span>
                <span className="text-sm text-red-500 font-medium">
                  ₹{pdfDetails?.invoiceInfo?.balanceAmount}
                </span>
              </div>


            </div>
          )}

          {/* {
            pdfDetails?.invoiceInfo?.totalAmount > 0 &&

            <div className="relative inline-block w-full border-t" ref={menuRef}>
              <div className="flex justify-between items-center mx-4 my-1">
                <div className="flex justify-between gap-2 items-center">
                  <Danger size="20" color="#F59E0B" />
                  <label className="text-sm text-[#4B4B4B] font-medium">Late Fee Detected : ₹</label>
                </div>
                <div className="flex justify-between gap-2 items-center">
                  <label className="text-sm text-[#1E45E1] font-medium cursor-pointer" onClick={() => handleMakeDiscount()}>Create Invoice</label>
                  <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-md hover:bg-gray-300 bg-gray-100"
                  >
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              {open && (
                <div ref={menuRef} className="absolute top-[-80px] right-[80px] mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-1 text-sm text-gray-700">


                    <button
                      onClick={handleWaiveOff}
                      disabled={!canWriteInvoice}
                      className={`w-full text-left px-4 py-2 flex items-center gap-2
    ${canWriteInvoice ? "hover:bg-gray-100 cursor-pointer" : "opacity-50 cursor-not-allowed"}
  `}
                    >
                      Waive Off
                    </button>

                    <button
                      onClick={handleMakeDiscount}
                      disabled={!canWriteInvoice}
                      className={`w-full text-left px-4 py-2 flex items-center gap-2
    ${canWriteInvoice ? "hover:bg-blue-50 text-[#4B4B4B] cursor-pointer" : "opacity-50 cursor-not-allowed text-gray-400"}
  `}
                    >
                      Make Discount
                    </button>

                  </div>
                </div>
              )}

            </div>
          }
 */}


        </div>
      )}
      {showWaiveModal &&
        <WaiveOFFConfirm
          show={showWaiveModal}
          handleClose={handleCloseConfirm}

        />
      }

      {/* {
        showDiscountInvoice && <DiscountInvoice show={showDiscountInvoice} handleClose={handleCloseFormDiscount} />
      } */}
      {
        showDiscountInvoice && (
          <DiscountInvoice
            show={showDiscountInvoice}
            handleClose={handleCloseFormDiscount}
            isEdit={isEdit}
            editData={isEdit ? editData : ""}
          />
        )
      }

      {showform && (
        <RecordPayment show={showform} handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          invoiceList={invoiceList}
        />

      )}


      {payapleform &&
        <RefundAmount show={payapleform} handleClose={handleCloseRefundAmount} refundDetails={refundDetails} />

      }

      {/* {showEditModal && (
        <EditDiscountInvoiceModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
        />
      )} */}


      {showRefuseModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">

          <div className="bg-white shadow-lg rounded-lg w-[90%] max-w-md p-4">

            <h2 className="text-black font-gilroy font-gilroy text-[17.24px] font-semibold leading-[24.9px] tracking-normal">
              Refuse Discount !
            </h2>

            <p className="text-[#646464] font-gilroy mb-4 text-[13.41px] font-normal leading-[19.15px] tracking-normal">
              Are you sure you want to refuse this discount?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRefuseModal(false)}
                className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 bg-[#F3F3F3] font-gilroy"
              >
                Cancel
              </button>



              <button
                onClick={handleRefuse}
                className="px-4 py-2 text-sm rounded-md bg-[#2400FF] text-white font-gilroy"
              >
                Yes, Refuse
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  isReportsInvoiceRegisterWay: PropTypes.bool,
  isTenantWay: PropTypes.bool,
};


export default withErrorBoundary(InvoiceCard);