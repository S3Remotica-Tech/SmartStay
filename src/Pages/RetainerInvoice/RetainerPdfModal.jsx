/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Bills/Invoices.css";
import DownLoad from "../../Assets/Images/New_images/searchss.png";
import Whatsapp from "../../Assets/Images/whatsapp.png";
import Whatsapp_blue from "../../Assets/Images/whatsapp_blue.png";
import Whatsapp_white from "../../Assets/Images/whatsapp_white.png";
import Mail from "../../Assets/Images/gmail.png";
import Mail_white from "../../Assets/Images/gmail_white.png";
import Message_text from "../../Assets/Images/message-text.png";
import Message_text_white from "../../Assets/Images/message-white.png";
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
// import Gpay from '../../Assets/Images/gpay.png'
// import Phonepe from '../../Assets/Images/phonepe.png'
// import Paytm from '../../Assets/Images/paytm.png'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { Row, Col, Table } from "react-bootstrap";
import { Location, Call, Profile } from "iconsax-react";
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { ArrowUp2, ArrowDown2, AddCircle, Add, Link21 } from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import ApplyRetainerModal from "./RetainerApplyInvoice";

const InvoiceCard = ({ rowData }) => {
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [activeTab, setActiveTab] = useState("payments");

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
    const { canUpdateModule: canUpdateInvoice } = useHasPermission("Bills");

    const [isVisible, setIsVisible] = useState(true);
    const [isOpenPayment, setIsOpenPayment] = useState(false);
    const cardRef = useRef(null);
    const [applyInvoice, setApplyInvoice] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, [rowData]);

    const innerScrollRef = useRef(null);

    // console.log("rowData", rowData);

    const handleDownload = async () => {
        if (rowData || pdfDetails?.hostelId) {
            dispatch({
                type: "INVOICEPDF",
                payload: {
                    hostelId: pdfDetails?.hostelId || rowData,
                    invoiceId: pdfDetails?.invoiceId,
                },
            });

            setPdfLoading(true);
        }
    };
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
        if (state.InvoiceList?.statusCodeForPDf === 200) {
            const pdfUrl = state?.InvoiceList?.invoicePDF;
            if (pdfUrl) {
                window.open(pdfUrl, "_blank");
                setPdfLoading(false);
                dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
            }
        }
    }, [state.InvoiceList?.statusCodeForPDf]);

    const handleBackInvoice = () => {
        navigate(`/retainer-invoice/${state.login?.selectedHostel_Id}`);
    };
    const {
        canWriteModule: canWriteBooking,
        canReadModule: canReadBooking,
        // canUpdateModule: canUpdateInvoice,
        // canDeleteModule: canDeleteTenant,
    } = useHasPermission("Booking");
    // const isValid = (value) => {
    //   return value !== null && value !== undefined && value !== "undefined" && value !== "";
    // };
    const isValidSubscription =
        state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
    const isExportAllow = isValidSubscription && canReadBooking;

    const [isOpen, setIsOpen] = useState(false);

    const handleShareClick = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuClick = async (key) => {
        setIsOpen(false);

        if (String(key) === "whatsapp") {
            dispatch({
                type: "GETSHAREPDF",
                payload: {
                    hostelId: pdfDetails?.hostelId,
                    invoiceId: pdfDetails?.invoiceId,
                },
            });

            setPdfLoading(true);
        }
    };

    const pdfDetails = state.InvoiceList?.particularBillsDetails;

    console.log("pdfDetails", pdfDetails);

    const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;
    const isRedeemAvailable = pdfDetails?.invoiceInfo?.canRedeem;
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
        0,
    );

    const handleApplyInvoices = () => {
        setApplyInvoice(true);
    };

    const handleCloseApplyInvoices = () => {
        setApplyInvoice(false);
    };

    useEffect(() => {
        if (state.InvoiceList.sharePdfSuccess) {
            setPdfLoading(false);
            setTimeout(() => {
                dispatch({ type: "REMOVE_GET_SHARE_PDF" });
            }, 100);
        }
    }, [state.InvoiceList.sharePdfSuccess]);

    useEffect(() => {
        if (state?.Booking?.applyinvoiceSuccessCode === 201) {
            dispatch({
                type: "GETPARTICULARBILLSDETAILS",
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    invoiceId: pdfDetails?.invoiceId,
                },
            });

            dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
        }
    }, [state?.Booking?.applyinvoiceSuccessCode]);

    return (
        <div className=" bg-white font-gilroy">
            <div className="border-l border-gray-200">
                <div className="flex justify-between items-center bg-white  border-gray-200 min-h-[50px] w-full sticky top-0 z-10 px-2">
                    <div className="flex justify-between items-center w-full h-12 bg-white border-b border-[#E0E0E0] px-2">
                        <div className="flex items-center gap-2">
                            <div className="pl-1">
                                <label className="text-[14px] font-medium text-[#222222] font-gilroy">
                                    {pdfDetails?.invoiceNumber}
                                </label>
                            </div>

                            <div>
                                {rowData?.paymentStatus !== "Pending" ? (
                                    <span className="text-[10px] bg-[#D9FFD9] text-black rounded-[14px] px-3 py-2 font-gilroy">
                                        Paid
                                    </span>
                                ) : (
                                    <span className="text-[10px] bg-[#FFF0F0] text-[#EB2427] rounded-[14px] px-3 py-2 cursor-pointer font-gilroy">
                                        Unpaid
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-2">
                                <div
                                    className="flex justify-center items-center border rounded-[8px] cursor-pointer h-[30px] w-[30px]"
                                    onClick={handleDownload}
                                >
                                    <img
                                        src={DownLoad}
                                        alt="Download Invoice"
                                        className="h-[15px] w-[15px]"
                                    />
                                </div>

                                <div className="relative inline-block">
                                    <div
                                        className="flex items-center justify-center gap-2 h-[30px] w-[80px] rounded-[8px] cursor-pointer bg-[#1E45E1]"
                                        onClick={handleShareClick}
                                    >
                                        <img
                                            src={Whatsapp}
                                            alt="Share"
                                            className="h-[15px] w-[15px] invert"
                                        />
                                        <span className="text-[14px] font-normal font-gilroy text-white leading-none">
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

                                <div>
                                    <IoClose
                                        className="h-[20px] w-[20px] cursor-pointer text-red-500"
                                        onClick={handleBackInvoice}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative h-[calc(100vh-80px)] overflow-y-auto bg-[#F7F8FC]   flex justify-center p-3 show-scrolls">
                    {pdfLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                            <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                    {isVisible && (
                        <div className="w-[90%] rounded-lg">
                            <div
                                ref={innerScrollRef}
                                className="rounded-lg bg-white mb-[50px] pt-4 shadow-[0px_2px_6px_rgba(0,0,0,0.08)]"
                            >
                                <div className="p-2 relative rounded-t-lg">
                                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 px-6">

                                        <div className="w-full md:w-1/4 flex justify-center md:justify-start">
                                            <img
                                                src={
                                                    pdfDetails?.configurations?.hostelLogo
                                                        ? pdfDetails?.configurations?.hostelLogo
                                                        : Logo
                                                }
                                                alt="logo"
                                                className="object-contain"
                                                style={{
                                                    height: pdfDetails?.configurations?.hostelLogo ? 50 : 25,
                                                    maxWidth: 140,
                                                }}
                                            />
                                        </div>

                                        <div className="w-full md:flex-1  md:text-left">
                                            <p className="text-[12px] break-all">
                                                dummy@gmail.com
                                            </p>

                                            <p className="text-[12px] mt-1">
                                                +{pdfDetails?.countryCode} {pdfDetails?.mobile}
                                            </p>
                                        </div>

                                        <div className="w-full md:w-1/4  md:text-right">
                                            <h6 className="font-semibold">
                                                {pdfDetails?.stayInfo?.hostelName}
                                            </h6>

                                            <p className="text-[11px] break-words">
                                                {pdfDetails?.configurations?.address}
                                            </p>

                                            <p className="text-[11px] break-all">
                                                GSTIN : {pdfDetails?.configurations?.gstNumber}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="text-center -mt-5 pb-0">
                                    <h5
                                        className="text-[17px] font-semibold font-gilroy"
                                    >
                                        Retainer Invoice
                                    </h5>
                                </div>

                                <div className="mx-3 mb-3 mt-2 border border-[#D9D9D9] rounded-[14px] bg-white overflow-hidden">
                                    <div className="w-full bg-white rounded-b-lg relative">

                                        <div
                                            className="mb-1 text-[11px] font-semibold italic px-4 mt-1"
                                            style={textStyle}
                                        >
                                            Billed to:
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-between gap-6 px-4 mt-1">
                                            <div className="text-[13px] text-[#222] font-gilroy">
                                                <div className="grid grid-cols-[120px_10px_1fr] mb-1 items-center">
                                                    <div className="font-semibold text-[12px] text-[#171717]">
                                                        {pdfDetails?.customerInfo?.fullName}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-[120px_10px_1fr] mb-1 items-center">
                                                    <div className="font-semibold text-[12px] text-[#171717]">
                                                        {/* {pdfDetails?.customerInfo?.floorno} */}G-Floor,103-02(D)
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-[120px_10px_1fr] mb-1 items-center">
                                                    <div className="text-[12px] text-[#171717]">
                                                        {/* {pdfDetails?.customerInfo?.floorno} */}Address
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-[120px_10px_1fr] mb-1 items-center">
                                                    <div className="text-[12px] text-[#171717]">
                                                        {pdfDetails?.customerInfo?.customerMobileNo &&
                                                            pdfDetails.customerInfo.customerMobileNo !==
                                                            "undefined"
                                                            ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                                                            : ""}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-[140px_10px_1fr] flex items-center">
                                                {[
                                                    ["Invoice", pdfDetails?.invoiceNumber],
                                                    ["Invoice Date", pdfDetails?.invoiceDate],
                                                    ["Joining Date", pdfDetails?.invoiceDate],
                                                ].map(([label, value], i) => (
                                                    <React.Fragment key={i}>
                                                        <div className="text-right text-[10px] text-[#4B4B4B] truncate">
                                                            {label}
                                                        </div>
                                                        <div className="text-center h-fit">:</div>
                                                        <div className="text-left text-[12px] font-semibold text-[#171717] truncate">
                                                            {value}
                                                        </div>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 mt-4">
                                        <table className="w-full border-collapse">

                                            <thead>

                                                <tr className="border-b border-[#E8E8E8]">

                                                    <th
                                                        className="text-left text-[11px] font-medium text-[#7A7A7A] py-2"
                                                        style={{ width: "75%" }}
                                                    >
                                                        ITEM DETAIL
                                                    </th>

                                                    <th
                                                        className="text-right text-[11px] font-medium text-[#7A7A7A] py-2"
                                                    >
                                                        AMOUNT
                                                    </th>

                                                </tr>

                                            </thead>

                                            <tbody>

                                                {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (

                                                    <tr
                                                        key={index}
                                                        className="border-b border-[#EFEFEF]"
                                                    >

                                                        <td className="text-left text-[13px] text-[#222] py-4">
                                                            {item.description}
                                                        </td>

                                                        <td className="text-right text-[13px] font-semibold">
                                                            ₹ {Number(item.amount).toLocaleString("en-IN")}
                                                        </td>

                                                    </tr>

                                                ))}

                                                <tr>

                                                    <td
                                                        className="text-right pt-4 text-[13px] text-[#444]"
                                                    >
                                                        Subtotal
                                                    </td>

                                                    <td
                                                        className="text-right pt-4 font-semibold"
                                                    >
                                                        ₹ {Number(
                                                            pdfDetails?.invoiceInfo?.subTotal || 0
                                                        ).toLocaleString("en-IN")}
                                                    </td>

                                                </tr>

                                                <tr>

                                                    <td
                                                        className="text-right py-2 font-semibold text-[14px]"
                                                    >
                                                        Total
                                                    </td>

                                                    <td
                                                        className="text-right py-2 font-bold text-[14px]"
                                                    >
                                                        ₹ {Number(
                                                            pdfDetails?.invoiceInfo?.subTotal || 0
                                                        ).toLocaleString("en-IN")}
                                                    </td>

                                                </tr>

                                            </tbody>

                                        </table>
                                    </div>

                                    <div className="px-4 mt-1">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6 mb-1">
                                                <h6
                                                    className="text-[11px] font-extrabold mb-[12px]"
                                                    style={{ fontFamily: "Gilroy", ...textStyle }}
                                                >
                                                    ACCOUNT DETAILS
                                                </h6>

                                                <div className="mb-1">
                                                    <label
                                                        className="text-[11px] font-medium text-[#4B4B4B]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        Account No:
                                                    </label>{" "}
                                                    <span
                                                        className="text-[12px] font-medium text-[#171717]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        {pdfDetails?.accountDetails?.accountNo || "N/A"}
                                                    </span>
                                                </div>

                                                <div className="mb-1">
                                                    <label
                                                        className="text-[11px] font-medium text-[#4B4B4B]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        IFSC Code:
                                                    </label>{" "}
                                                    <span
                                                        className="text-[12px] font-medium text-[#171717]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        {pdfDetails?.accountDetails?.ifscCode || "N/A"}
                                                    </span>
                                                </div>

                                                <div className="mb-1">
                                                    <label
                                                        className="text-[11px] font-medium text-[#4B4B4B]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        Bank Name:
                                                    </label>{" "}
                                                    <span
                                                        className="text-[12px] font-medium text-[#171717]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        {pdfDetails?.accountDetails?.bankName || "N/A"}
                                                    </span>
                                                </div>

                                                <div>
                                                    <label
                                                        className="text-[11px] font-medium text-[#4B4B4B]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        UPI ID:
                                                    </label>{" "}
                                                    <span
                                                        className="text-[12px] font-medium text-[#171717]"
                                                        style={{ fontFamily: "Gilroy" }}
                                                    >
                                                        {pdfDetails?.accountDetails?.upiId || "N/A"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* SPACER */}
                                            <div className="hidden md:block md:col-span-2"></div>

                                            {/* RIGHT SECTION */}
                                            <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
                                                <div className="flex justify-center mb-2">
                                                    {pdfDetails?.accountDetails?.qrCode && (
                                                        <img
                                                            src={pdfDetails?.accountDetails?.qrCode}
                                                            alt="Barcode"
                                                            className="max-w-[150px] rounded-sm"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex justify-end">
                                                    <p className="text-[10px]">
                                                        Scan Qr for Payment
                                                    </p>
                                                </div>
                                                {/* 
      <div className="flex justify-end">
        {[Paytm, Phonepe, Gpay].map((icon, idx) => (
          <img key={idx} src={icon} alt="UPI" className="h-[38px] w-[38px] ml-2" />
        ))}
      </div> 
      */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mt-6 px-4">

                                        <div>

                                            <h4
                                                className="text-[12px] font-semibold"
                                                style={textStyle}
                                            >
                                                Authorized Signature
                                            </h4>

                                            {pdfDetails?.configurations?.signatureUrl && (
                                                <img
                                                    src={pdfDetails?.configurations?.signatureUrl}
                                                    alt=""
                                                    className="h-[60px] w-[130px]"
                                                />
                                            )}

                                        </div>


                                        <div className="text-right">
                                            <p className="text-[13px] font-semibold">
                                                Status :
                                            </p>
                                            <p className="text-[13px] font-semibold">
                                                Thanks for the business.
                                            </p>

                                            <p className="text-[13px] mt-2">
                                                Date :
                                                {pdfDetails?.invoiceDate}
                                            </p>

                                        </div>

                                    </div>
                                </div>
                                <hr
                                    className="mb-2"
                                    style={{
                                        border: "none",
                                        height: "1px",
                                        background: templateColor,
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                        borderRadius: "2px",
                                    }}
                                />

                                <div className="px-5">
                                    <div className="flex justify-between text-center rounded-b-[38px]">
                                        <p
                                            className="mb-0 text-[13px] font-medium text-[#4B4B4B]"
                                            style={{ fontFamily: "Gilroy" }}
                                        >
                                            Email:{" "}
                                            <span className="text-[13px] font-semibold text-[#222222]">
                                                {pdfDetails?.emailId}
                                            </span>
                                        </p>

                                        <p
                                            className="mb-0 text-[13px] font-medium text-[#4B4B4B]"
                                            style={{ fontFamily: "Gilroy" }}
                                        >
                                            Contact:{" "}
                                            <span className="text-[13px] font-semibold text-[#222222]">
                                                {pdfDetails?.mobile &&
                                                    `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="sticky bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.15)] font-gilroy">
                <div className="flex justify-between items-center px-4 py-2 !cursor-pointer ">
                    <div className="flex  gap-4 cursor-pointer">
                        <div
                            onClick={() => setActiveTab("payments")}
                            className={`px-1 py-2 cursor-pointer text-sm font-medium ${activeTab === "payments"
                                ? "text-[#1E45E1] border-b-[3px] border-[#1E45E1]"
                                : "text-black "
                                }`}
                        >
                            Payments Made
                        </div>

                        <div
                            onClick={() => setActiveTab("invoices")}
                            className={`px-1 py-2 cursor-pointer text-sm font-medium ${activeTab === "invoices"
                                ? "text-[#1E45E1]  border-b-[3px] border-[#1E45E1]"
                                : "text-black border-0"
                                }`}
                        >
                            Retainer adjusted Invoices
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="relative inline-flex">
                            <button
                                disabled={!canUpdateInvoice || !isRedeemAvailable}
                                onClick={() => handleApplyInvoices()}
                                className={`flex items-center gap-2 px-3 py-2 border !bg-[#F9F9F9] font-semibold  border-[#E7E7E7] rounded-[10px] transition-all duration-150
    ${!canUpdateInvoice || !isRedeemAvailable
                                        ? "cursor-not-allowed opacity-50 bg-gray-100"
                                        : "cursor-pointer hover:bg-[#EDF2FF]"
                                    }`}
                            >
                                <Link21
                                    color={
                                        !canUpdateInvoice || !isRedeemAvailable
                                            ? "#A9A9A9"
                                            : "#1E45E1"
                                    }
                                    size="16"
                                />

                                <span
                                    className={`text-sm font-semibold ${!canUpdateInvoice || !isRedeemAvailable
                                        ? "text-[#A9A9A9]"
                                        : "text-[#222222]"
                                        }`}
                                >
                                    Apply Invoices
                                </span>
                            </button>
                        </div>

                        {isOpenPayment ? (
                            <ArrowUp2
                                size="18"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setIsOpenPayment(false);
                                    setIsOpen(false);
                                }}
                            />
                        ) : (
                            <ArrowDown2
                                size="18"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    setIsOpenPayment(true);
                                    setIsOpen(false);
                                }}
                            />
                        )}
                    </div>
                </div>

                {isOpenPayment && (
                    <div>
                        {activeTab === "payments" && (
                            <div>
                                {pdfDetails?.paymentHistory?.length > 0 && (
                                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                                        <div
                                            id="tableContainer"
                                            className="overflow-auto relative  h-[150px]  rounded-xl show-scrolls"
                                        >
                                            <table className="w-full text-sm">
                                                <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                                                    <tr>
                                                        <th className="text-left px-3 py-2">DATE</th>
                                                        <th className="text-left px-3 py-2">REF NO</th>
                                                        <th className="text-left px-3 py-2">
                                                            PAYMENT MODE
                                                        </th>
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
                                    </div>
                                )}
                                <div className="flex justify-end mt-3 px-2">
                                    <div className="bg-[#F9F9F9] rounded-lg px-5 py-3 min-w-[290px] border border-[#F1F1F1]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] font-medium text-[#4B4B4B]">
                                                Amount Paid
                                            </span>

                                            <span className="text-[15px] font-semibold text-[#222222]">
                                                ₹
                                                {Number(
                                                    pdfDetails?.paymentHistory?.reduce(
                                                        (total, item) => total + Number(item.amount || 0),
                                                        0,
                                                    ) || 0,
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {activeTab === "invoices" && (
                            <>
                                <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                                    <div
                                        id="tableContainer"
                                        className="overflow-auto relative  h-[150px]  rounded-xl show-scrolls"
                                    >
                                        <table className="w-full text-sm">
                                            <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                                                <tr>
                                                    <th className="text-left px-3 py-2">DATE</th>
                                                    <th className="text-left px-3 py-2">INV NO</th>
                                                    <th className="text-left px-3 py-2">AMOUNT ADJUSTED</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {pdfDetails.invoiceInfo?.redemptionInfo?.redeemdList
                                                    ?.length > 0 ? (
                                                    pdfDetails.invoiceInfo?.redemptionInfo?.redeemdList?.map(
                                                        (item, index) => (
                                                            <tr key={index} className="border-t">
                                                                <td className="px-3 py-2 text-xs text-[#6B7280] font-semibold">
                                                                    {item.redeemedOn || "-"}
                                                                </td>

                                                                <td className="px-3 py-2 text-xs text-[#1E45E1] font-medium">
                                                                    {item.invoiceNo || "-"}
                                                                </td>

                                                                <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                                                                    {item.amount}
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan={12}
                                                            className="text-center align-middle py-3 text-sm text-red-600 font-semibold"
                                                        >
                                                            No Data Found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-3 px-2">
                                    <div className="bg-[#F9F9F9] rounded-lg px-3 py-3 min-w-[290px] border border-[#F1F1F1]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] font-medium text-[#4B4B4B]">
                                                Amount Deducted
                                            </span>

                                            <span className="text-[15px] font-semibold text-[#222222]">
                                                ₹
                                                {Number(
                                                    pdfDetails?.paymentHistory?.reduce(
                                                        (total, item) => total + Number(item.amount || 0),
                                                        0,
                                                    ) || 0,
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[13px] font-medium text-[#4B4B4B]">
                                                Balance Retainer Amount
                                            </span>

                                            <span className="text-[15px] font-semibold text-[#222222]">
                                                ₹
                                                {Number(
                                                    pdfDetails?.paymentHistory?.reduce(
                                                        (total, item) => total + Number(item.amount || 0),
                                                        0,
                                                    ) || 0,
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {applyInvoice && (
                <ApplyRetainerModal
                    show={applyInvoice}
                    handleClose={handleCloseApplyInvoices}
                    advanceDetails={pdfDetails}
                />
            )}
        </div>
    );
};

InvoiceCard.propTypes = {
    rowData: PropTypes.func.isRequired,
    handleClosed: PropTypes.func.isRequired,
};

export default withErrorBoundary(InvoiceCard);
