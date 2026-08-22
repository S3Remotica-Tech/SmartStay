/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import {
  ArrowDown2,
  ArrowUp2,
  ArrowLeft,
  Edit2,
  InfoCircle,
 
} from "iconsax-react";

import Profile2 from "../../Assets/Images/New_images/profile-picture.png";

import { Tooltip } from "bootstrap";
import ErrorMessage from "../../Components/ErrorMessage";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Edit, AddCircle, Verify, CloseCircle } from "iconsax-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation, useNavigate } from "react-router-dom";
import AddRoomReading from "../ElectrictyFile/AddRoomReading";
import { TiTick } from "react-icons/ti";

dayjs.extend(customParseFormat);

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 500,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function FinalSettlement() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const datePickerRef = useRef(null);
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isEditingRent, setIsEditingRent] = useState(false);
  const [amount, setAmount] = useState("");
  const [customRent, setCustomRent] = useState(null);
  const [ReturnAmount, setReturnAmount] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [GenerateLoading, setGenerateLoading] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const breakdownRef = useRef(null);
  const [finalSettlementList, setFinalSettlementList] = useState();
  const [showWallet, setShowWallet] = useState(false);
  const [showRefundableAdvance, setShowRefundableAdvance] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showRetainer, setShowRetainer] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [showInvoices, setShowInvoices] = React.useState(false);
  const [showRentDetails, setShowRentDetails] = React.useState(false);
  const [collectFullRent, setCollectFullRent] = useState(false);
  const [showEbMissed, setShowEbMissed] = useState(false);
  const [showOtherCharges, setShowOtherCharges] = useState(false);

  const [showRoomReading, setShowRoomReading] = useState(false);
  const [showDeductions, setShowDeductions] = useState(false);

  const [isEditingDate, setIsEditingDate] = useState(false);
  const [checkoutDate, setCheckoutDate] = useState(dayjs());
  const [selectedRowDetails, setSelectedRowDetails] = useState("");
  const {
    data,
    pgDetails,
    isPGWay,
    customer,
    isTenantOverview,
    isPgWayTrigger,
    isTenantWayTrigger,
  } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [finalAmountSetClicked, setFinalAmountSetClicked] = useState(false);
  const [PayableORRefundabeleRent, setPayableORRefundabeleRent] = useState("");
  const [discount, setDiscount] = useState("");
  const [tempDiscount, setTempDiscount] = useState(discount);

  const handleSet = () => {
    setDiscount(tempDiscount === "" ? 0 : Number(tempDiscount));
    setIsEditing(false);
  };

  useEffect(() => {
    setDiscount(finalSettlementList?.currentMonthRentInfo?.discountAmount);
  }, [finalSettlementList?.currentMonthRentInfo]);

  const handleRoomReading = (item) => {
    setShowRoomReading(true);
    setSelectedRowDetails(item);
  };

  const handleCloseRoomReading = () => {
    dispatch({ type: "REMOVE_ROOM_READING_ERROR" });
    setShowRoomReading(false);
  };

  const customerId =
    data?.apiCall?.customerId || data?.customerId || data?.tenetId;

  useEffect(() => {
    if (!customerId) return;

    const payload = {
      customerId: customerId,
    };

    if (checkoutDate) {
      payload.leavingDate = checkoutDate?.format("DD-MM-YYYY");
    }

    dispatch({ type: "GETFINALSETTLEMENT", payload });
    setFormLoading(true);
  }, [customerId, checkoutDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEditingDate &&
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsEditingDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditingDate]);

  useEffect(() => {
    if (state.InvoiceList.finalSettlementGetStatusCode === 200) {
      setFormLoading(false);
      setFinalSettlementList(state.InvoiceList?.finalSettlementDetails);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_FINAL_SETTLEMENT" });
      }, []);
    }
  }, [state.InvoiceList.finalSettlementGetStatusCode]);

  useEffect(() => {
    if (state.UsersList.StatusCodeForDateUpdate === 200) {
      dispatch({ type: "CLEAR_CHEKOUT_DATE_CHANGE" });
    }
  }, [state.UsersList.StatusCodeForDateUpdate]);

  useEffect(() => {
    if (state.UsersList?.finalError) {
      setFormLoading(false);
    }
  }, [state.UsersList?.finalError]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_FINAL_GENERATE_ERROR" });
    };
  }, []);

  const reasonOptions = [
    { value: "DueAmount", label: "Due Amount" },
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];

  const handleAddField = () => {
    setShowDeductions(true);
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);

    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
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
      let numericValue = value.replace(/[^0-9.]/g, "");
      if (!/^\d*\.?\d*$/.test(numericValue)) {
        return;
      }
      if (numericValue.startsWith(".")) {
        return;
      }
      if (/^0\d+/.test(numericValue)) {
        numericValue = numericValue.replace(/^0+/, "0");
      }
      if (numericValue.startsWith("0")) {
        numericValue = numericValue.replace(/^0+/, "");
      }

      if (numericValue === "") {
        numericValue = "";
      }

      updatedFields[index].amount = numericValue;

      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    updatedFields[index] = fieldData;
    setFields(updatedFields);
    setErrors(updatedErrors);

    if (updatedErrors[index]) {
      if (field === "reason_name" || field === "customReason") {
        updatedErrors[index].reason = "";
      }
      if (field === "amount") {
        updatedErrors[index].amount = "";
      }
    }
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;

    setCollectFullRent(checked);
    setIsEditingRent(checked);
    if (!checked) {
      setCustomRent(finalSettlementList?.currentMonthRentInfo?.fullRent || 0);
      setFinalAmountSetClicked(false);
    }
  };

  useEffect(() => {
    if (state.UsersList.conformChekoutError) {
      setFormLoading(false);
    }
  }, [state.UsersList.conformChekoutError]);

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

  const handleClose = () => {
    if (pgDetails || isPGWay) {
      navigate(`/paying-guest/${state.login.selectedHostel_Id}`);
    } else if (isTenantOverview) {
      navigate(`/tenant/details/${state.login.selectedHostel_Id}`, {
        state: {
          isTenantOverview: true,
          navigatePg: isPgWayTrigger,
          navigateTenant: isTenantWayTrigger,
        },
      });
    } else {
      navigate(`/tenant/${state.login.selectedHostel_Id}`);
    }
  };

  useEffect(() => {
    if (
      state.UsersList.statusCodeForDueCustomer === 200 ||
      state.UsersList.statusCodeAddConfirmCheckout === 200
    ) {
      setFormLoading(false);
      handleClose();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
      }, 500);
    }
  }, [
    state.UsersList.statusCodeForDueCustomer,
    state.UsersList.statusCodeAddConfirmCheckout,
  ]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    [...tooltipTriggerList].forEach(
      (tooltipTriggerEl) =>
        new Tooltip(tooltipTriggerEl, {
          customClass: "white-tooltip",
        }),
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

  useEffect(() => {
    if (finalSettlementList?.settlementInfo) {
      const { isRefundable, amountTobePaid } =
        finalSettlementList.settlementInfo;

      const apiDeductions =
        finalSettlementList?.deductionsInfo?.listDeductions || [];

      const apiMap = new Map(
        apiDeductions.map((item) => [
          item.item?.toLowerCase(),
          Number(item.pendingAmount) || 0,
        ]),
      );

      const totalUserDeductions = (fields || []).reduce((sum, item) => {
        const reasonName = item.reason_name?.toLowerCase();
        const userAmount = Number(item.amount) || 0;
        const apiAmount = apiMap.get(reasonName);

        if (item.isSystemGenerated) return sum;

        if (item.customReason && item.customReason.trim() !== "") {
          return sum + userAmount;
        }

        if (apiAmount !== undefined) {
          return sum + userAmount;
        }

        return sum + userAmount;
      }, 0);

      let updatedAmountToBePaid = amountTobePaid;
      let finalAmount = 0;
      // let balanceRent = 0;

      // const currentMonthOtherItems =
      //   finalSettlementList?.currentMonthRentInfo?.currentMonthOtherItems;
      // const totalOtherItemsAmount = currentMonthOtherItems?.reduce(
      //   (sum, item) => sum + Number(item.amount || 0),
      //   0,
      // );

      if (collectFullRent) {
        if (!finalAmountSetClicked) {
          updatedAmountToBePaid =
            amountTobePaid +
            finalSettlementList?.currentMonthRentInfo?.rentDifference;
        } else {
          const customRentDiff =
            customRent - finalSettlementList?.currentMonthRentInfo?.fullRent;

          updatedAmountToBePaid =
            amountTobePaid +
            finalSettlementList?.currentMonthRentInfo?.rentDifference +
            customRentDiff;
        }
      } else {
        updatedAmountToBePaid = amountTobePaid;
      }

      if (updatedAmountToBePaid < 0) {
        finalAmount = isRefundable
          ? updatedAmountToBePaid + totalUserDeductions
          : updatedAmountToBePaid - totalUserDeductions;
      } else {
        finalAmount = isRefundable
          ? updatedAmountToBePaid - totalUserDeductions
          : updatedAmountToBePaid + totalUserDeductions;
      }

      const appliedDiscount = Number(discount) || 0;

      finalAmount -= appliedDiscount;

      const normalizedAmount =
        finalAmount > -1 && finalAmount < 0 ? 0 : finalAmount;

      setReturnAmount(normalizedAmount);
    }
  }, [
    finalSettlementList,
    fields,
    discount,
    collectFullRent,
    customRent,
    finalAmountSetClicked,
  ]);

  useEffect(() => {
    if (collectFullRent) {
      const LastMonthPaid =
        finalSettlementList?.currentMonthRentInfo?.currentRentPaid;

      const isPayableORRefundabeleRent = finalAmountSetClicked
        ? Number(customRent) +
          Number(
            finalSettlementList?.currentMonthRentInfo?.otherItemAmount || 0,
          )
        : finalSettlementList?.currentMonthRentInfo?.currentMonthPayableAmount;

      const finalPayableAmount = isPayableORRefundabeleRent - LastMonthPaid;

      setPayableORRefundabeleRent(finalPayableAmount);
    } else {
      const isPayableORRefundabeleRent = finalAmountSetClicked
        ? Number(customRent) +
          Number(
            finalSettlementList?.currentMonthRentInfo?.otherItemAmount || 0,
          )
        : finalSettlementList?.currentMonthRentInfo?.currentMonthPayableAmount;
      setPayableORRefundabeleRent(isPayableORRefundabeleRent);
    }
  }, [
    finalAmountSetClicked,
    finalSettlementList?.currentMonthRentInfo?.currentMonthPayableAmount,
    finalSettlementList?.currentMonthRentInfo?.otherItemAmount,
    customRent,
    collectFullRent,
  ]);

  useEffect(() => {
    if (!finalAmountSetClicked) {
      setAmount(finalSettlementList?.currentMonthRentInfo?.fullRent || 0);
    }
  }, [
    finalAmountSetClicked,
    finalSettlementList?.currentMonthRentInfo?.fullRent,
  ]);

  const apiDeductions =
    finalSettlementList?.deductionsInfo?.listDeductions || [];
  const totalApiDeductions = apiDeductions.reduce(
    (sum, item) => sum + (Number(item.pendingAmount) || 0),
    0,
  );

  useEffect(() => {
    if (finalSettlementList?.deductionsInfo?.listDeductions?.length > 0) {
      const mappedFields =
        finalSettlementList.deductionsInfo.listDeductions.map((item) => ({
          reason_name: item.item,
          amount: item.pendingAmount || "",
          showInput: true,
          customReason: item.item,
          isSystemGenerated: true,
        }));
      setFields(mappedFields);
    }
  }, [finalSettlementList]);

  const apiMap = new Map(
    apiDeductions.map((item) => [
      item.type?.toLowerCase(),
      Number(item.amount) || 0,
    ]),
  );

  const totalUserDeductions = (fields || []).reduce((sum, item) => {
    if (item.isSystemGenerated) return sum;

    const reasonName = item.reason_name?.toLowerCase();
    const userAmount = Number(item.amount) || 0;
    const apiAmount = apiMap.get(reasonName);

    if (apiAmount !== undefined) {
      return sum + userAmount;
    }

    return sum + userAmount;
  }, 0);

  const totalDeductions = totalApiDeductions + totalUserDeductions;

  const displayDeduction =
    Number(finalSettlementList?.deductionsInfo?.pendingAmount || 0) +
    Number(totalUserDeductions || 0);

  const validateFields = () => {
    let isValid = true;
    const newErrors = fields.map((item) => {
      let errorObj = {};

      if (!item.reason_name) {
        errorObj.reason = "Please select a reason";
        isValid = false;
      }

      if (item.reason_name === "others" && !item.customReason?.trim()) {
        errorObj.reason = "Please enter custom reason";
        isValid = false;
      }

      if (!item.amount) {
        errorObj.amount = "Please enter amount";
        isValid = false;
      }

      return errorObj;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleClickGenerate = () => {
    dispatch({ type: "REMOVE_FINAL_SETTLMENT_ERROR" });
    dispatch({ type: "REMOVE_FINAL_GENERATE_ERROR" });
    if (!validateFields()) return;
    // const apiDeductions =
    //   finalSettlementList?.deductionsInfo?.listDeductions || [];

    // const apiMap = new Map(
    //   apiDeductions.map((item) => [
    //     item.item?.toLowerCase(),
    //     Number(item.pendingAmount) || 0,
    //   ]),
    // );

    const Finalsettelmenntdata = fields
      .filter((f) => f.reason_name && f.amount)
      .map((f) => {
        const userAmount = Number(f.amount) || 0;

        if (f.isSystemGenerated === true) {
          return null;
        }

        if (
          f.reason_name.toLowerCase() === "others" &&
          f.customReason?.trim()
        ) {
          return {
            item: f.customReason.trim(),
            amount: userAmount,
          };
        }

        return {
          item: f.reason_name,
          amount: userAmount,
        };
      })
      .filter(Boolean);

    if (customerId) {
      dispatch({
        type: "FINALSETTLEMENT",
        payload: {
          customerId: customerId,
          data: {
            discountAmount: Number(discount) || 0,
            deductions: Finalsettelmenntdata,
            shouldCollectFullRent: collectFullRent,
            customRent: collectFullRent ? amount : "",
          },
        },
      });
      setGenerateLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForFinalSettlement === 201) {
      setGenerateLoading(false);
      handleClose();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_FINAL_GENERATE" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForFinalSettlement]);

  useEffect(() => {
    if (state.InvoiceList.finalSettlementError) {
      setFormLoading(false);
      setGenerateLoading(false);
      const date = finalSettlementList?.stayInfo?.actualCheckoutDate;
      if (date) {
        setCheckoutDate(dayjs(date, "DD/MM/YYYY"));
      }
      setTimeout(() => {
        dispatch({ type: "REMOVE_FINAL_SETTLMENT_ERROR" });
      }, 100);
    }
  }, [state.InvoiceList.finalSettlementError]);

  useEffect(() => {
    if (
      state.UsersList?.addRoomReadingStatusCode === 201 ||
      state.UsersList?.addRoomReadingStatusCode === 200
    ) {
      setShowRoomReading(false);

      if (!customerId) return;
      const payload = {
        customerId: customerId,
      };

      if (checkoutDate) {
        payload.leavingDate = checkoutDate?.format("DD-MM-YYYY");
      }

      dispatch({ type: "GETFINALSETTLEMENT", payload });
      setTimeout(() => {
        dispatch({ type: "REMOVE_ADD_ROOM_READING" });
      }, 100);
    }
  }, [state.UsersList?.addRoomReadingStatusCode]);

  const isNonHostel = !finalSettlementList?.ebInfo?.isHostelReading;

  const missedEbList = finalSettlementList?.ebInfo?.missedEb || [];
  const pendingEbList = finalSettlementList?.ebInfo?.pendingEb || [];

  const showNoEbMessage =
    isNonHostel && missedEbList.length === 0 && pendingEbList.length === 0;

  const UnpaidInvoices = Array.isArray(
    finalSettlementList?.unpaidInvoiceInfo?.listUnpaidInvoices,
  )
    ? finalSettlementList.unpaidInvoiceInfo?.listUnpaidInvoices
    : Array.isArray(finalSettlementList?.unpaidInvoices)
      ? finalSettlementList.unpaidInvoices
      : [];

  return (
    <div className="h-screen overflow-y-hidden ">
      <div className="mb-3 sticky top-0 bg-white z-0 h-[50px] px-3 py-2.5 ">
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={handleClose}
            size="26"
            color="#4A5565"
            className="cursor-pointer"
          />

          <div>
            <label className="block text-[20px] font-semibold text-[#222222] font-gilroy">
              Final Settlement
            </label>
            <p className="text-sm font-semibold text-[#4A5565] font-gilroy">
              Tenants / Final Settlement
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3 h-[calc(100vh-50px)] bg-[#f9f9f9] p-2.5 w-full flex-nowrap ">
        <div className="flex-[0_0_30%] bg-white rounded-lg p-4  ">
          <div className="flex items-center gap-3 mb-1 font-gilroy">
            {finalSettlementList?.customerInfo?.profilePic ? (
              <img
                src={
                  finalSettlementList?.customerInfo?.profilePic !== "0"
                    ? finalSettlementList.customerInfo.profilePic
                    : Profile2
                }
                alt="profile"
                className="h-[55px] w-[55px] rounded-full cursor-pointer"
              />
            ) : (
              <div className="h-[50px] w-[50px] rounded-full bg-slate-200 text-[#44536A] flex items-center justify-center text-base font-semibold">
                {finalSettlementList?.customerInfo?.initials}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <label className="text-[20px] font-semibold text-[#222222] mb-0">
                  {finalSettlementList?.customerInfo?.fullName}
                </label>

                <Verify size="20" color="#1E45E1" variant="Bold" />
              </div>

              <label className="text-sm font-normal text-[#4B4B4B]">
                Mobile : +{finalSettlementList?.customerInfo?.countryCode}{" "}
                {finalSettlementList?.customerInfo?.mobile}
              </label>
            </div>
          </div>

          <div className="flex justify-between mb-2 w-full gap-2 font-gilroy">
            <span className="w-full rounded-full bg-[#FFEFCF] p-2 text-xs font-normal text-gray-900 text-center">
              {pgDetails?.floorName ||
                data?.floorName ||
                data?.hostelInfo?.floorName ||
                customer?.floorName}
            </span>

            <span className="w-full rounded-full bg-red-100 p-2 text-xs font-normal text-gray-900 text-center">
              {pgDetails?.roomName ||
                data?.roomName ||
                data?.hostelInfo?.roomName ||
                customer?.roomName}{" "}
              -{" "}
              {pgDetails?.bedName ||
                data?.bedName ||
                data?.hostelInfo?.bedName ||
                customer?.bedName}
            </span>
          </div>

          <hr className="border-t border-[#DFDFDF] my-2" />

          <div className="flex justify-between mb-3 font-gilroy">
            <span className="text-sm font-normal text-gray-700">
              Joined Date
            </span>
            <span className="text-base font-semibold text-gray-900">
              {finalSettlementList?.customerInfo?.joiningDate}
            </span>
          </div>

          <div className="flex justify-between mb-3 font-gilroy">
            <span className="text-sm font-normal text-gray-700">
              Req Checkout Date
            </span>
            <span className="text-base font-semibold text-gray-900">
              {finalSettlementList?.stayInfo?.noticeDate}
            </span>
          </div>

          <div className="flex justify-between mb-3 font-gilroy">
            <span className="text-sm font-normal text-gray-700">
              Advance Amount
            </span>
            <span className="text-base font-semibold text-gray-900">
              ₹{finalSettlementList?.customerInfo?.advanceAmount}
            </span>
          </div>

          <div className="flex justify-between mb-3 font-gilroy">
            <span className="text-sm font-normal text-gray-700">
              Booking Amount
            </span>
            <span className="text-base font-semibold text-gray-900">
              ₹{finalSettlementList?.customerInfo?.bookingAmount}
            </span>
          </div>

          <div className="flex justify-between mb-3 font-gilroy">
            <span className="text-sm font-normal text-gray-700">
              Advance Paid
            </span>
            <span className="text-base font-semibold text-gray-900">
              ₹{finalSettlementList?.customerInfo?.advancePaidAmount}
            </span>
          </div>

          <div className="flex justify-between mb-3 font-gilroy">
            <span className="text-sm font-normal text-gray-700">
              Monthly Rent
            </span>
            <span className="text-base font-semibold text-gray-900">
              ₹ {finalSettlementList?.customerInfo?.rentAmount}
            </span>
          </div>

          <div className="flex justify-between items-center mb-3 font-gilroy">
            <span className="text-sm font-normal">Actual Checkout Date</span>

            {!isEditingDate && (
              <span className="flex items-center gap-2 text-base font-semibold">
                {finalSettlementList?.stayInfo?.actualCheckoutDate
                  ? finalSettlementList?.stayInfo?.actualCheckoutDate
                  : checkoutDate?.format("DD/MM/YYYY")}

                <Edit
                  size={16}
                  color="#1E45E1"
                  className="cursor-pointer"
                  onClick={(e) => (e.stopPropagation(), setIsEditingDate(true))}
                />
              </span>
            )}
          </div>

          {isEditingDate && (
            <div ref={datePickerRef} className="relative w-full mt-1">
              <DatePicker
                value={checkoutDate}
                allowClear={false}
                className="w-full h-12 cursor-pointer font-gilroy"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                onChange={(date) => {
                  setCheckoutDate(date);
                  setIsEditingDate(false);
                }}
                getPopupContainer={(triggerNode) =>
                  triggerNode.closest(".relative")
                }
              />
            </div>
          )}

          <hr className="border-t border-[#DFDFDF] my-2" />

          <div
            className={`mt-2 p-1 text-center rounded-lg ${
              ReturnAmount > 0 ? "bg-[#FFF7F7]" : "bg-[#F0FFE0]"
            }`}
          >
            <span
              className={`text-sm font-normal font-gilroy ${
                ReturnAmount > 0 ? "text-red-600" : "text-[#038C3D]"
              }`}
            >
              {ReturnAmount > 0 ? "Pending" : "Refund"}
            </span>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-lg p-3.5 relative h-[calc(100vh-50px)] overflow-hidden">
          <div className="max-h-[calc(100vh-150px)] overflow-y-auto overflow-x-hidden show-scrolls">
            <div className="me-1">
              {/* unpaid invoice */}

              <div
                className="mb-2 border border-gray-200 rounded-lg bg-white font-gilroy cursor-pointer"
                onClick={() => setShowInvoices((prev) => !prev)}
              >
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[5px] p-1 flex cursor-pointer">
                      {showInvoices ? (
                        <ArrowUp2
                          size="16"
                          color="#1E45E1"
                          // onClick={() => setShowInvoices(false)}
                        />
                      ) : (
                        <ArrowDown2
                          size="16"
                          color="#1E45E1"
                          // onClick={() => setShowInvoices(true)}
                        />
                      )}
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      Unpaid Invoices
                    </span>
                  </div>

                  <span className="text-base font-semibold text-gray-900">
                    ₹ {finalSettlementList?.settlementInfo?.unpaidInvoiceAmount}
                    {/* {UnpaidInvoices?.reduce(
                      (sum, inv) => sum + Number(inv.payableAmount || 0),
                      0,
                    ) || 0} */}
                  </span>
                </div>

                {showInvoices && <hr className="m-0 border-gray-300" />}

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showInvoices ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {showInvoices && (
                    <div className="px-[10px] py-2">
                      <div className="border border-gray-300 rounded">
                        <table className="w-full text-sm align-middle mb-0 font-gilroy">
                          <thead>
                            <tr>
                              <th className="px-2 py-2 text-start text-[14px] font-semibold text-[#00092F]">
                                Invoice No
                              </th>

                              <th className="px-2 py-2 text-start text-[14px] font-semibold text-[#00092F]">
                                Type
                              </th>

                              <th className="px-2 py-2 text-end text-[14px] font-semibold text-[#00092F]">
                                Invoice Amount
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {Array.isArray(UnpaidInvoices) &&
                            UnpaidInvoices?.length > 0 ? (
                              UnpaidInvoices.map((user) => (
                                <tr key={user.invoiceNumber}>
                                  <td className="px-2 py-2 text-[14px] text-[#1E45E1] font-normal underline">
                                    {user.invoiceNumber}
                                  </td>

                                  <td className="px-2 py-2 text-[14px] text-gray-800 font-normal">
                                    {user.type}
                                  </td>

                                  <td className="px-2 py-2 text-[14px] text-gray-800 font-medium text-end">
                                    ₹{user.payableAmount}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={3}
                                  className="text-center px-2 py-2 text-sm text-gray-500"
                                >
                                  No pending invoices
                                </td>
                              </tr>
                            )}

                            <tr className="bg-gray-50">
                              <td
                                colSpan={2}
                                className="px-2 py-2 text-start text-sm text-gray-800"
                              >
                                Total
                              </td>

                              <td className="px-2 py-2 text-end text-sm text-gray-800">
                                ₹{" "}
                                {
                                  finalSettlementList?.settlementInfo
                                    ?.unpaidInvoiceAmount
                                }
                                {/* {UnpaidInvoices?.reduce(
                                  (sum, inv) =>
                                    sum + Number(inv.payableAmount || 0),
                                  0,
                                ) || 0} */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* refundable rent */}

              <div
                className="mb-2 border border-gray-200 rounded-lg bg-white font-gilroy cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowRentDetails((prev) => !prev);
                }}
              >
                <div className="flex justify-between items-center p-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[5px] p-1 flex cursor-pointer">
                      {showRentDetails ? (
                        <ArrowUp2 size="16" color="#1E45E1" />
                      ) : (
                        <ArrowDown2
                          size="16"
                          color="#1E45E1"
                          // onClick={() => setShowRentDetails(true)}
                        />
                      )}
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      {/* {finalSettlementList?.settlementInfo?.label}  */}
                      <span>
                        {PayableORRefundabeleRent < 0
                          ? "Refundable Rent"
                          : "Payable Rent"}
                      </span>
                    </span>
                  </div>
                  {isEditingRent ? (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-[8px] border border-blue-100 bg-white p-1 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
                    >
                      <div className="flex items-center justify-between">
                        {isEditingRent ? (
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-40 border-none outline-none text-[16px] font-semibold py-2 px-2 text-[#1A1C21]"
                            autoFocus
                          />
                        ) : (
                          <h2 className="text-4xl font-semibold text-[#1A1C21]">
                            ₹ {Number(amount).toFixed(2)}
                          </h2>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCustomRent(Number(amount));
                            setFinalAmountSetClicked(true);
                            setIsEditingRent(false);
                          }}
                          className="flex  items-center gap-2 rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-600"
                        >
                          <TiTick size={14} />
                          Set
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 ">
                      <span className="text-base font-semibold text-black">
                        ₹{PayableORRefundabeleRent}
                      </span>
                      {finalAmountSetClicked && (
                        <Edit2
                          size="16"
                          color="#1E45E1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEditingRent(true);
                            setAmount(customRent);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center justify-between gap-2 px-4 py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="collectFullRent"
                      checked={collectFullRent}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCheckboxChange(e);
                      }}
                      className="w-4 h-4 cursor-pointer accent-[#1E45E1]"
                    />

                    <label
                      htmlFor="collectFullRent"
                      className="text-sm font-medium text-[#222222] cursor-pointer flex items-center gap-4"
                    >
                      Do you want to collect Full Rent for current month?{" "}
                    </label>
                  </div>
                  {collectFullRent && (
                    <div className="relative inline-block group">
                      <label className="text-sm font-medium text-[#1E45E1] cursor-pointer flex items-center gap-2 whitespace-nowrap">
                        Full Rent + Other Charges
                        <InfoCircle size="14" color="#1E45E1" />
                      </label>

                      <div className="absolute right-0 top-full mt-2 z-50 hidden w-72 rounded-lg bg-[#64748B] px-3 py-2 text-xs text-white shadow-lg group-hover:block">
                        <p>
                          <strong>Full Rent</strong> ₹{amount}
                          {finalSettlementList?.currentMonthRentInfo
                            ?.otherItemAmount > 0 && (
                            <>
                              {" + "}
                              <strong>Other Charges</strong> ₹
                              {
                                finalSettlementList.currentMonthRentInfo
                                  .otherItemAmount
                              }
                            </>
                          )}
                        </p>

                        <p className="mt-2 text-gray-100">
                          System automatically adds other charges to the rent
                          amount.
                        </p>

                        <div className="absolute -top-1 right-5  h-2 w-2 rotate-45 bg-[#64748B]" />
                      </div>
                    </div>
                  )}
                </div>
                {showRentDetails && <hr className="m-0 border-gray-300" />}

                {showRentDetails && (
                  <div className="px-[10px] py-2">
                    <div className="flex justify-between py-2 text-sm text-black">
                      <span>Last Rent Paid</span>
                      <span>
                        ₹
                        {finalSettlementList?.currentMonthRentInfo
                          ?.currentRentPaid || 0}
                      </span>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="text-sm text-black cursor-pointer select-none">
                          Actual Stay Days (Rent) (
                          {(() => {
                            const d =
                              finalSettlementList?.currentMonthRentInfo
                                ?.stayDays ?? 0;
                            return `${d} ${d === 1 ? "day" : "days"}`;
                          })()}
                          )
                        </div>

                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDetails(!showDetails);
                          }}
                          className="flex cursor-pointer"
                        >
                          <span className="bg-blue-100 rounded-[5px] p-1">
                            {showDetails ? (
                              <ArrowUp2 size="16" color="#1E45E1" />
                            ) : (
                              <ArrowDown2 size="16" color="#1E45E1" />
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-black">
                        ₹
                        {
                          finalSettlementList?.currentMonthRentInfo
                            ?.currentPayableRent
                        }
                      </div>
                    </div>

                    {showDetails &&
                      finalSettlementList?.currentMonthRentInfo?.rentLists?.map(
                        (item, index) => (
                          <div key={index} className="mt-2">
                            <div className="flex justify-between items-center text-xs text-blue-600 bg-gray-50 p-2.5 rounded-lg w-full">
                              <div className="whitespace-nowrap">
                                {item.floorName} | {item.roomName} -{" "}
                                {item.bedName}
                              </div>

                              <div className="whitespace-nowrap text-gray-800">
                                ({item.noOfDays}{" "}
                                {item.noOfDays === 1 ? "day" : "days"} ×{" "}
                                {item.rentPerDay} = {item.totalRent})
                              </div>
                            </div>

                            {index !==
                              finalSettlementList.currentMonthRentInfo.rentLists
                                .length -
                                1 && (
                              <div className="border-b border-dashed border-gray-300 mt-1.5" />
                            )}
                          </div>
                        ),
                      )}

                    {finalSettlementList?.currentMonthRentInfo
                      ?.otherItemAmount > 0 && (
                      <>
                        <div className="flex justify-between items-start mt-2">
                          <div className="flex gap-3">
                            <div className="text-sm text-black cursor-pointer select-none">
                              Other Charges
                            </div>

                            <div
                              className="flex cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowOtherCharges(!showOtherCharges);
                              }}
                            >
                              <span className="bg-blue-100 rounded-[5px] p-1">
                                {showOtherCharges ? (
                                  <ArrowUp2 size="16" color="#1E45E1" />
                                ) : (
                                  <ArrowDown2 size="16" color="#1E45E1" />
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm text-black">
                            ₹
                            {
                              finalSettlementList?.currentMonthRentInfo
                                ?.otherItemAmount
                            }
                          </div>
                        </div>

                        {showOtherCharges &&
                          finalSettlementList?.currentMonthRentInfo?.currentMonthOtherItems?.map(
                            (item, index) => (
                              <div key={index} className="mt-2">
                                <div className="flex justify-between items-center text-xs text-blue-600 bg-gray-50 p-2.5 rounded-lg w-full">
                                  <div className="whitespace-nowrap">
                                    {item.item}
                                  </div>

                                  <div className="whitespace-nowrap text-gray-800">
                                    ₹{item.amount}
                                  </div>
                                </div>

                                {index !==
                                  finalSettlementList?.currentMonthRentInfo
                                    ?.currentMonthOtherItems?.length -
                                    1 && (
                                  <div className="border-b border-dashed border-gray-300 mt-1.5" />
                                )}
                              </div>
                            ),
                          )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Missed EB */}

              <div
                className="mb-2 border border-gray-200 rounded-[10px] bg-white font-gilroy cursor-pointer"
                onClick={() => setShowEbMissed((prev) => !prev)}
              >
                <div className="flex justify-between items-center px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span className="cursor-pointer">
                      {showEbMissed ? (
                        <ArrowUp2
                          size="16"
                          color="#1E45E1"
                          // onClick={() => setShowEbMissed(false)}
                        />
                      ) : (
                        <ArrowDown2
                          size="16"
                          color="#1E45E1"
                          // onClick={() => setShowEbMissed(true)}
                        />
                      )}
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      Electricity Bill
                    </span>
                  </div>

                  <span className="text-base font-semibold">
                    ₹{finalSettlementList?.ebInfo?.pendingEbAmount}
                  </span>
                </div>

                {showEbMissed && <hr className="m-0 border-gray-300" />}

                {showEbMissed && (
                  <div className="px-4 py-3">
                    {!finalSettlementList?.ebInfo?.isHostelReading &&
                      finalSettlementList?.ebInfo?.missedEb?.length > 0 && (
                        <>
                          <label className="text-sm font-semibold text-gray-800 mb-2 block">
                            Missed Electricity
                          </label>
                          <hr className="m-0 mb-2 border-gray-300" />
                        </>
                      )}

                    {!finalSettlementList?.ebInfo?.isHostelReading &&
                      finalSettlementList?.ebInfo?.missedEb?.map(
                        (item, index) => (
                          <div key={index} className="mb-3.5">
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-800 text-sm font-medium">
                                  {item.floorName || "Floor Name"}
                                </span>

                                <span className="w-[1px] h-[14px] bg-gray-300 inline-block" />

                                <span className="text-gray-800 text-sm font-medium">
                                  {item.roomName || "Room Name"} -{" "}
                                  {item.bedName || "Bed Name"}
                                </span>

                                <span className="px-2 py-1 rounded-lg text-xs font-semibold text-[#AA6805] bg-[#FFF5EE]">
                                  {item.fromDate} - {item.toDate}
                                </span>
                              </div>

                              <div
                                className="flex items-center gap-1 cursor-pointer"
                                onClick={() => handleRoomReading(item)}
                              >
                                <AddCircle
                                  size="18"
                                  color="#1E45E1"
                                  variant="Bold"
                                />
                                <label className="text-[13px] text-gray-800 font-medium cursor-pointer">
                                  Add
                                </label>
                              </div>
                            </div>
                          </div>
                        ),
                      )}

                    {!finalSettlementList?.ebInfo?.isHostelReading &&
                      finalSettlementList?.ebInfo?.pendingEb?.length > 0 && (
                        <>
                          <label className="text-sm font-semibold text-gray-800 pb-1 block">
                            Pending Invoices
                          </label>
                          <hr className="m-0 mb-2 border-gray-300" />
                        </>
                      )}

                    {!finalSettlementList?.ebInfo?.isHostelReading &&
                      finalSettlementList?.ebInfo?.pendingEb?.map(
                        (item, index) => (
                          <div key={index} className="mb-3.5">
                            <div className="flex justify-between items-center text-sm font-semibold">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-800 text-sm font-medium">
                                  {item.floorName || "Floor Name"}
                                </span>

                                <span className="w-[1px] h-[14px] bg-gray-300 inline-block" />

                                <span className="text-gray-800 text-sm font-medium">
                                  {item.roomName || "Room Name"} -{" "}
                                  {item.bedName || "Bed Name"}
                                </span>

                                <span className="px-2 py-1 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50">
                                  {item.fromDate} - {item.toDate}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="whitespace-nowrap">
                                  ({item.units} Units) ₹{item.amount}
                                </span>
                              </div>
                            </div>
                          </div>
                        ),
                      )}

                    {showNoEbMessage && (
                      <div className="px-3 py-3 text-center text-[13px] font-medium text-[#AA6805] bg-[#FFF5EE]">
                        EB reading not calculated yet
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Wallet */}

              <div
                className="mb-2 rounded-[10px] border border-[#E5E7EB] bg-white font-gilroy cursor-pointer"
                onClick={() => setShowWallet((prev) => !prev)}
              >
                <div className="flex items-center justify-between px-3 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="cursor-pointer"
                      // onClick={() => setShowWallet(!showWallet)}
                    >
                      {showWallet ? (
                        <ArrowUp2 size="16" color="#1E45E1" />
                      ) : (
                        <ArrowDown2 size="16" color="#1E45E1" />
                      )}
                    </span>

                    <span className="text-sm font-semibold text-[#111827]">
                      Wallet
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-2 rounded-lg  ${
                      finalSettlementList?.walletInfo?.walletAmount < 0
                        ? "text-red-50"
                        : "text-green-50"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        finalSettlementList?.walletInfo?.walletAmount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ₹
                    </span>
                    <span
                      className={`text-base font-semibold ${
                        finalSettlementList?.walletInfo?.walletAmount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {finalSettlementList?.walletInfo?.walletAmount}
                    </span>
                  </div>
                </div>

                {showWallet && (
                  <hr className="m-0" style={{ border: "1px solid #DFDFDF" }} />
                )}

                {showWallet && (
                  <div className=" rounded-xl  shadow-sm">
                    {finalSettlementList?.walletInfo?.transactions?.length >
                    0 ? (
                      finalSettlementList.walletInfo.transactions.map(
                        (txn, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between px-3 py-3 border-b last:border-b-0  transition"
                          >
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-[#111827]">
                                {txn.source}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold
                ${txn.amount < 0 ? " text-red-600" : " text-green-600"}
              `}
                              >
                                ₹{txn.amount}
                              </span>
                            </div>
                          </div>
                        ),
                      )
                    ) : (
                      <div className="px-6 py-2 text-center  h-fit flex items-center justify-center">
                        <span className=" text-[13px] px-3 py-1  font-medium text-[#AA6805] bg-[#FFF5EE] rounded-md">
                          No wallet transactions available
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Refundable Advance */}
              <div className="mb-2 rounded-[10px] border border-[#E5E7EB] bg-white font-gilroy">
                <div
                  className="flex items-start justify-between px-3 py-3 cursor-pointer"
                  onClick={() => setShowRefundableAdvance((prev) => !prev)}
                >
                  <div className="flex items-center gap-2">
                    {showRefundableAdvance ? (
                      <ArrowUp2 size="16" color="#1E45E1" />
                    ) : (
                      <ArrowDown2 size="16" color="#1E45E1" />
                    )}

                    <span className="text-sm font-semibold text-[#222222]">
                      {finalSettlementList?.advanceItems?.label}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[15px] font-semibold text-[#222222]">
                      ₹{" "}
                      {finalSettlementList?.advanceItems
                        ?.availableAdvanceBalance || 0}
                    </span>

                    <span className="text-[12px] font-medium text-[#1E45E1] underline">
                      {" "}
                      {finalSettlementList?.advanceItems?.invoiceNo}
                    </span>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showRefundableAdvance ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {showRefundableAdvance && (
                    <>
                      <hr className="m-0 border-[#E5E7EB]" />

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead className="bg-[#FAFAFA]">
                            <tr>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Adjusted With
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Type
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Date
                              </th>

                              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase text-[#6B7280]">
                                Applied Amount
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {finalSettlementList?.advanceItems?.redeemedList
                              ?.length > 0 ? (
                              finalSettlementList?.advanceItems?.redeemedList?.map(
                                (txn, index) => (
                                  <tr
                                    key={index}
                                    className="border-t border-[#E5E7EB]"
                                  >
                                    <td className="px-4 py-3 text-[13px] font-medium text-[#1E45E1] underline">
                                      {txn.invoiceNumber}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-[#222222]">
                                      {txn.invoiceType}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-[#666666]">
                                      {txn.redeemedDate}
                                    </td>

                                    <td className="px-4 py-3 text-right text-[13px] font-medium text-[#222222]">
                                      ₹ {txn.redeemedAmount}
                                    </td>
                                  </tr>
                                ),
                              )
                            ) : (
                              <tr>
                                <td
                                  colSpan={3}
                                  className="px-4 py-4 text-center text-sm text-[#AA6805] "
                                >
                                  No refundable advance transactions available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Booking */}

              <div className="mb-2 rounded-[10px] border border-[#E5E7EB] bg-white font-gilroy">
                <div
                  className="flex items-start justify-between px-3 py-3 cursor-pointer"
                  onClick={() => setShowBooking((prev) => !prev)}
                >
                  <div className="flex items-center gap-2">
                    {showBooking ? (
                      <ArrowUp2 size="16" color="#1E45E1" />
                    ) : (
                      <ArrowDown2 size="16" color="#1E45E1" />
                    )}

                    <span className="text-sm font-semibold text-[#222222]">
                      {finalSettlementList?.bookingItems?.label}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[15px] font-semibold text-[#222222] `}
                    >
                      ₹{" "}
                      {finalSettlementList?.bookingItems
                        ?.availableAdvanceBalance || 0}
                    </span>

                    <span className="text-[12px] font-medium text-[#1E45E1] underline">
                      {finalSettlementList?.bookingItems?.invoiceNo}
                    </span>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showBooking ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {showBooking && (
                    <>
                      <hr className="m-0 border-[#E5E7EB]" />

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead className="bg-[#FAFAFA]">
                            <tr>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Adjusted With
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Type
                              </th>

                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Date
                              </th>

                              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase text-[#6B7280]">
                                Applied Amount
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {finalSettlementList?.bookingItems?.redeemedList
                              ?.length > 0 ? (
                              finalSettlementList.bookingItems.redeemedList?.map(
                                (txn, index) => (
                                  <tr
                                    key={index}
                                    className="border-t border-[#E5E7EB]"
                                  >
                                    <td className="px-4 py-3 text-[13px] font-medium text-[#1E45E1] underline">
                                      {txn.invoiceNumber}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-[#222222]">
                                      {txn.invoiceType}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-[#666666]">
                                      {txn.redeemedDate}
                                    </td>

                                    <td className="px-4 py-3 text-right text-[13px] font-medium text-[#222222]">
                                      ₹ {txn.redeemedAmount}
                                    </td>
                                  </tr>
                                ),
                              )
                            ) : (
                              <tr>
                                <td
                                  colSpan={3}
                                  className="px-4 py-4 text-center text-sm text-[#AA6805] "
                                >
                                  No booking transactions available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Retainer Invoice */}
              <div className="mb-2 rounded-[10px] border border-[#E5E7EB] bg-white font-gilroy">
                <div
                  className="flex items-start justify-between px-3 py-3 cursor-pointer"
                  onClick={() => setShowRetainer((prev) => !prev)}
                >
                  <div className="flex items-center gap-2">
                    {showRetainer ? (
                      <ArrowUp2 size="16" color="#1E45E1" />
                    ) : (
                      <ArrowDown2 size="16" color="#1E45E1" />
                    )}

                    <span className="text-sm font-semibold text-[#222222]">
                      Retainer Invoice
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`text-[15px] font-semibold text-[#222222] `}
                    >
                      ₹{" "}
                      {finalSettlementList?.settlementInfo?.retainerBalance ||
                        0}
                    </span>

                    {/* <span className="text-[12px] font-medium text-[#1E45E1] underline"> */}
                    {/* {finalSettlementList?.bookingItems?.invoiceNo} */}
                    {/* </span> */}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showRetainer ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {showRetainer && (
                    <>
                      <hr className="m-0 border-[#E5E7EB]" />

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead className="bg-[#FAFAFA]">
                            <tr>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                invoiceNumber
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                invoiceAmount
                              </th>

                              <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase text-[#6B7280]">
                                Date
                              </th>

                              <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase text-[#6B7280]">
                                availableAmount
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {finalSettlementList?.retainerItems
                              ?.listRetainerItems?.length > 0 ? (
                              finalSettlementList?.retainerItems?.listRetainerItems?.map(
                                (txn, index) => (
                                  <tr
                                    key={index}
                                    className="border-t border-[#E5E7EB]"
                                  >
                                    <td className="px-4 py-3 text-[13px] font-medium text-[#1E45E1] underline">
                                      {txn.invoiceNumber}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-[#222222]">
                                      ₹{txn.invoiceAmount}
                                    </td>
                                    <td className="px-4 py-3 text-[13px] text-[#666666]">
                                      {txn.invoiceDate}
                                    </td>

                                    <td className="px-4 py-3 text-right text-[13px] font-medium text-[#222222]">
                                      ₹ {txn.availableAmount}
                                    </td>
                                  </tr>
                                ),
                              )
                            ) : (
                              <tr>
                                <td
                                  colSpan={3}
                                  className="px-4 py-4 text-center text-sm text-[#AA6805] "
                                >
                                  No retainer transactions available
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* deductions */}

              <div
                className="mt-3 border border-gray-200 rounded-lg font-gilroy cursor-pointer"
                onClick={() => setShowDeductions((prev) => !prev)}
              >
                <div className="flex justify-between items-center py-3 px-3 cursor-pointer flex-wrap gap-3">
                  <div className="flex items-center gap-2 min-w-[180px]">
                    <span className="rounded-[5px] p-1 flex">
                      {showDeductions ? (
                        <ArrowUp2 size="16" color="#1E45E1" />
                      ) : (
                        <ArrowDown2 size="16" color="#1E45E1" />
                      )}
                    </span>

                    <span className="text-sm font-semibold text-gray-900">
                      Deductions
                    </span>
                  </div>

                  <div className=" items-center gap-6 flex-wrap">
                    <span className="text-sm font-semibold text-black">
                      ₹ {displayDeduction || 0}
                    </span>
                    <div className="flex items-center gap-1 text-[#AA6805] text-sm ">
                      <InfoCircle size="14" color="#AA6805" /> Pending
                    </div>
                  </div>
                </div>
                <div className="flex !items-center w-fit !justify-end w-full">
                  <div
                    className="flex !items-center w-fit !justify-end my-2 mx-4 gap-1 cursor-pointer text-[#1E429F] 
                      border-1 border-[#E1EFFE] 
                      bg-[#E1EFFE] px-3 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddField();
                    }}
                  >
                    <AddCircle size="18" color="#1E45E1" variant="Bold" />

                    <label className="text-[13px] text-blue-800 font-medium cursor-pointer">
                      Add
                    </label>
                  </div>
                </div>

                {showDeductions && <hr className="m-0 border-gray-300" />}

                {showDeductions && (
                  <div
                    className="px-[10px] py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {fields.length === 0 && (
                      <div className="px-4 py-[14px] mx-3 my-2 text-center text-[13px] font-medium text-gray-500 bg-gray-50 rounded-md">
                        No deductions available
                      </div>
                    )}

                    {fields.map((item, index) => {
                      const filteredOptions = (() => {
                        let options = [...reasonOptions];

                        if (
                          item.reason_name &&
                          !options.some((opt) => opt.value === item.reason_name)
                        ) {
                          options.push({
                            value: item.reason_name,
                            label:
                              item.reason_name.charAt(0).toUpperCase() +
                              item.reason_name.slice(1),
                          });
                        }

                        const isMaintenanceSelected = fields.some(
                          (field) => field.reason === "maintenance",
                        );

                        return options.map((opt) => ({
                          ...opt,
                          isDisabled:
                            opt.value === "maintenance" &&
                            isMaintenanceSelected &&
                            item.reason !== "maintenance",
                        }));
                      })();

                      return (
                        <div key={index} className="flex gap-3 px-4 mb-3">
                          <div className="w-1/2">
                            {!item.showInput ? (
                              <Select
                                options={filteredOptions}
                                value={
                                  filteredOptions.find(
                                    (opt) => opt.value === item.reason_name,
                                  ) || null
                                }
                                onChange={(selectedOption) => {
                                  const selectedValue = selectedOption.value;

                                  if (selectedValue === "others") {
                                    handleInputChange(
                                      index,
                                      "reason_name",
                                      "others",
                                    );
                                  } else {
                                    handleInputChange(
                                      index,
                                      "reason_name",
                                      selectedValue,
                                    );
                                  }
                                }}
                                isDisabled={
                                  item.reason_name === "maintenance" ||
                                  item?.reason_name === "DueAmount"
                                }
                                menuPlacement="bottom"
                                menuPosition="fixed"
                                styles={CustomStyles}
                              />
                            ) : (
                              <input
                                disabled={item.isSystemGenerated}
                                type="text"
                                placeholder="Enter custom reason"
                                value={item.customReason}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "customReason",
                                    e.target.value,
                                  )
                                }
                                className="w-full h-[50px] px-3 text-base text-gray-700 border border-gray-300 rounded-lg font-medium outline-none"
                              />
                            )}

                            {errors[index]?.reason && (
                              <ErrorMessage
                                message={errors[index]?.reason}
                                type="error"
                              />
                            )}
                          </div>

                          <div className="w-[40%] relative">
                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={item.amount}
                              disabled={
                                apiDeductions.some(
                                  (apiItem) =>
                                    apiItem.item?.toLowerCase() ===
                                    item.reason_name?.toLowerCase(),
                                ) && item.isSystemGenerated
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "amount",
                                  e.target.value,
                                )
                              }
                              className="w-full h-[50px] px-3 text-base text-gray-700 border border-gray-300 rounded-lg font-medium outline-none"
                            />

                            {errors[index]?.amount && (
                              <ErrorMessage
                                message={errors[index]?.amount}
                                type="error"
                              />
                            )}

                            <div className="w-[10%] flex justify-center items-center p-0">
                              {!item.isSystemGenerated && (
                                <CloseCircle
                                  variant="Bold"
                                  size="20"
                                  className="absolute right-0 top-0 -translate-y-1/2 text-gray-400 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveField(index);
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="text-sm flex flex-wrap text-[#505F76] px-[10px] py-2">
                  Note: These amount was be withheld from the Non Refundable
                  Deposit amount due to lack of payment.
                </div>
              </div>

              {/* discount */}

              <div className="mt-3 border border-gray-200 rounded-lg font-gilroy">
                <div className="flex justify-between items-center px-[14px] py-[10px] cursor-pointer">
                  <span className="text-sm font-semibold text-gray-900">
                    Discount (Current Month)
                  </span>

                  <div className="flex items-center gap-3 border rounded-md px-1 py-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempDiscount}
                        onChange={(e) => {
                          let value = e.target.value;

                          if (!/^\d*\.?\d*$/.test(value)) return;

                          if (value.startsWith(".")) return;

                          if ((value.match(/\./g) || []).length > 1) return;

                          if (/^0\d+/.test(value)) {
                            value = value.replace(/^0+/, "");
                          }

                          setTempDiscount(value);
                        }}
                        className="w-24 px-3 py-1 text-sm focus:outline-none"
                      />
                    ) : (
                      <div className=" px-2 py-1 text-sm font-medium bg-white">
                        ₹ {discount}
                      </div>
                    )}
                    <button
                      onClick={() => {
                        if (isEditing) {
                          handleSet();
                        } else {
                          setTempDiscount(discount);
                          setIsEditing(true);
                        }
                      }}
                      className={`
        px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1
        disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white
        ${
          isEditing
            ? "text-[#03543F] border-1 border-[#DEF7EC] bg-[#DEF7EC]"
            : "text-[#1E429F] border-1 border-[#E1EFFE] bg-[#E1EFFE]"
        }
    `}
                    >
                      {!isEditing && <Edit2 size={14} />}
                      {isEditing ? "SET" : "Edit"}
                    </button>
                  </div>
                </div>
              </div>

              {/* } */}

              <div className="mx-3 my-3 flex items-center justify-between">
                <p className="text-sm font-medium font-gilroy text-slate-600">
                  {ReturnAmount > 0
                    ? "Outstanding Amount Payable"
                    : "Refund Payable to Tenant"}
                </p>

                <span
                  className="
      flex items-center gap-1.5
      text-[#1E45E1] cursor-pointer
      text-sm font-normal font-gilroy
      whitespace-nowrap
    "
                  onClick={() => {
                    setShowBreakdown(!showBreakdown);

                    setTimeout(() => {
                      breakdownRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                >
                  View Breakdown
                  {showBreakdown ? (
                    <ArrowUp2 size="16" color="#1E45E1" />
                  ) : (
                    <ArrowDown2 size="16" color="#1E45E1" />
                  )}
                </span>
              </div>

              {showBreakdown && (
                <>
                  <div
                    ref={breakdownRef}
                    className="rounded px-3 pt-1 font-gilroy space-y-1"
                  >
                    <div className="flex justify-between">
                      <p className="text-base font-semibold text-gray-900">
                        Final Settlement
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">
                        {/* {finalSettlementList?.settlementInfo?.label} */}{" "}
                        {PayableORRefundabeleRent < 0
                          ? "Refundable Rent"
                          : "Payable Rent"}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {/* ₹ {finalSettlementList?.settlementInfo?.payableAmount} */}
                        {/* {finalSettlementList?.settlementInfo?.refundableRent} */}
                        ₹{PayableORRefundabeleRent}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">
                        Refundable Advance
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        ₹{" "}
                        {finalSettlementList?.settlementInfo?.refundableAdvance}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Total Deductions</p>
                      <p className="text-sm font-medium text-red-600">
                        ₹ {totalDeductions}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Electricity</p>
                      <p className="text-sm font-medium text-red-600">
                        ₹{" "}
                        {finalSettlementList?.settlementInfo?.electricityAmount}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Unpaid Invoices</p>
                      <p className="text-sm font-medium text-red-600">
                        ₹{" "}
                        {
                          finalSettlementList?.settlementInfo
                            ?.unpaidInvoiceAmount
                        }
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600">Retainer Invoice</p>
                      <p className="text-sm font-medium text-gray-900">
                        ₹{" "}
                        {finalSettlementList?.settlementInfo?.retainerBalance ||
                          0}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 mb-10">
                    <input
                      type="text"
                      name="Advance"
                      id="Advance"
                      value={Math.round(ReturnAmount).toLocaleString("en-IN")}
                      placeholder="Amount"
                      readOnly
                      className={`mt-1 h-[50px] w-full rounded-[8px] border border-[#D9D9D9]
    px-3 text-[16px] font-semibold font-gilroy shadow-none outline-none
    focus:border-[#1E45E1] focus:ring-0
    ${
      ReturnAmount > 0
        ? "text-green-600"
        : ReturnAmount < 0
          ? "text-red-600"
          : "text-gray-700"
    }
  `}
                    />
                  </div>
                </>
              )}

              {state.UsersList?.finalError && (
                <ErrorMessage
                  message={state.UsersList?.finalError}
                  type="error"
                />
              )}
            </div>
          </div>

          <div
            className="
    absolute bottom-0 left-0 w-full
    mt-0 mb-2 p-2
    flex justify-between items-center
    bg-white
    shadow-[0px_-4px_12px_rgba(0,0,0,0.08)]
    font-gilroy h-fit
  "
          >
            <div className="my-3 h-fit">
              <div className="text-sm font-normal text-[#4B4B4B]">
                {ReturnAmount > 0
                  ? "Outstanding Amount Payable"
                  : "Total Refund Payable"}
              </div>

              <div
                className={`text-[22px] font-semibold ${
                  ReturnAmount > 0
                    ? "text-green-600"
                    : ReturnAmount < 0
                      ? "text-red-600"
                      : "text-gray-700"
                }`}
              >
                ₹ {Math.round(ReturnAmount).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="flex items-center gap-6 h-fit">
              <button
                onClick={handleClose}
                className="text-base font-normal font-gilroy"
              >
                Cancel
              </button>

              <button
                disabled={GenerateLoading}
                onClick={handleClickGenerate}
                className={`
                  !w-[130px]
                  !h-[52px]
                  !rounded-lg
                  !border
                  !border-[#1E45E1]
                  !bg-[#1E45E1]
                  !text-white
                  !text-sm
                  !font-semibold
                  !font-gilroy
                  ${GenerateLoading ? "!opacity-70 !cursor-not-allowed" : ""}
                `}
              >
                {GenerateLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </div>
                ) : (
                  " Generate Bill"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {formLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            opacity: 0.75,
            zIndex: 10,
          }}
        >
          <div
            style={{
              borderTop: "4px solid #1E45E1",
              borderRight: "4px solid transparent",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}

      {showRoomReading && (
        <AddRoomReading
          show={showRoomReading}
          handleClose={handleCloseRoomReading}
          selectedRowDetails={selectedRowDetails}
          finalSettlementWay={true}
        />
      )}
    </div>
  );
}
FinalSettlement.propTypes = {
  // show: PropTypes.func.isRequired,
  // handleClose: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  customerID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pgDetails: PropTypes.shape({
    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,
  }).isRequired,
};
export default FinalSettlement;
