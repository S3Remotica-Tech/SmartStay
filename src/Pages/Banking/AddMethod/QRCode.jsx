/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CloseCircle, Add, DocumentUpload } from "iconsax-react";
import ErrorMessage from "../../../Components/ErrorMessage";

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
    fontWeight: 600,
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

function QRCode({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  const upiOptions = [
    { value: "gpay1", label: "Gpay - smartstay@oksbi" },
    { value: "gpay2", label: "Gpay - hotel@oksbi" },
  ];

  const providerOptions = [
    { value: "gpay", label: "Gpay" },
    { value: "phonepe", label: "PhonePe" },
    { value: "paytm", label: "Paytm" },
  ];

  const [linkedUpi, setLinkedUpi] = useState(null);
  const [linkedUpiError, setLinkedUpiError] = useState("");

  const [provider, setProvider] = useState(null);
  const [providerError, setProviderError] = useState("");

  const [qrName, setQrName] = useState("");
  const [qrNameError, setQrNameError] = useState("");

  const [cardLast4, setCardLast4] = useState("");
  const [cardLast4Error, setCardLast4Error] = useState("");

  const [qrImage, setQrImage] = useState(null);
  const [qrImagePreview, setQrImagePreview] = useState("");
  const [qrImageError, setQrImageError] = useState("");
  const [qrImageName, setQrImageName] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleLinkedUpiChange = (selected) => {
    setLinkedUpi(selected);
    setLinkedUpiError("");
  };

  const handleProviderChange = (selected) => {
    setProvider(selected);
    setProviderError("");
  };

  const handleQrNameChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z\s]*$/.test(value)) return;

    setQrName(value);

    if (!value.trim()) {
      setQrNameError("Please Enter QR Name");
    } else {
      setQrNameError("");
    }
  };

  const handleCardLast4Change = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);

    setCardLast4(value);

    if (!value) {
      setCardLast4Error("Last 4 digits required");
    } else if (!/^\d{4}$/.test(value)) {
      setCardLast4Error("Enter exactly 4 digits");
    } else {
      setCardLast4Error("");
    }
  };

  

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    setDescription(value);

    if (!value.trim()) {
      setDescriptionError("");
    } else {
      setDescriptionError("");
    }
  };

  const removeQrImage = () => {
    setQrImage(null);
    setQrImagePreview("");
  };

  const handleSaveQRCode = () => {
    let isValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!linkedUpi) {
      setLinkedUpiError("Please select UPI ID");
      isValid = false;
    } else {
      setLinkedUpiError("");
    }

    if (!provider) {
      setProviderError("Please select provider");
      isValid = false;
    } else {
      setProviderError("");
    }

    if (!qrName.trim()) {
      setQrNameError("Please Enter QR name");
      isValid = false;
    } else if (!nameRegex.test(qrName.trim())) {
      setQrNameError("QR name should contain only letters");
      isValid = false;
    } else {
      setQrNameError("");
    }

    if (!cardLast4.trim()) {
      setCardLast4Error("Please Enter Last 4 digits");
      isValid = false;
    } else if (!/^\d{4}$/.test(cardLast4)) {
      setCardLast4Error("Enter exactly 4 digits");
      isValid = false;
    } else {
      setCardLast4Error("");
    }

   
    if (!isValid) return;

    setIsSaving(true);
  };

  useEffect(() => {
    if (state.bankingDetails.addPaymentMethodSuccessCode === 200) {
      setIsSaving(false);
       handleClose()
    }
  }, [state.bankingDetails.addPaymentMethodSuccessCode]);

  useEffect(() => {
    if (state.bankingDetails.addPaymentError) {
      setIsSaving(false);
    }
  }, [state.bankingDetails.addPaymentError]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    };
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="block mb-2 text-[13px] font-medium">
              Linked UPI ID <span className="text-red-500">*</span>
            </label>

            <Select
              value={linkedUpi}
              onChange={handleLinkedUpiChange}
              options={upiOptions}
              placeholder="Select UPI"
              styles={CustomStyles}
            />

            {linkedUpiError && (
              <ErrorMessage message={linkedUpiError} type="error" />
            )}
          </div>

          <div>
            <label className="block mb-2 text-[13px] font-medium">
              Provider <span className="text-red-500">*</span>
            </label>

            <Select
              value={provider}
              onChange={handleProviderChange}
              options={providerOptions}
              placeholder="Select Provider"
              styles={CustomStyles}
            />

            {providerError && (
              <ErrorMessage message={providerError} type="error" />
            )}
          </div>
        </div>

        <div className="mt-3">
          <label className="block mb-2 text-[13px] font-medium">
            QR Name <span className="text-red-500">*</span>
          </label>

          <input
            value={qrName}
            onChange={handleQrNameChange}
            placeholder="Ex : Owner Debit Card"
            className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm  outline-none focus:border-[#2952CC]"
          />

          {qrNameError && <ErrorMessage message={qrNameError} type="error" />}
        </div>

        <div className="mt-3">
          <label className="block mb-2 text-[13px] font-medium">
            Card Number (Last 4 Digits)
            <span className="text-red-500">*</span>
          </label>

          <input
            value={cardLast4}
            onChange={handleCardLast4Change}
            maxLength={4}
            placeholder="1234"
            inputMode="numeric"
            className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />

          {cardLast4Error && (
            <ErrorMessage message={cardLast4Error} type="error" />
          )}
        </div>

        <div className="mt-3">
          <label className="block mb-2 text-[13px] font-medium">
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the notes..."
            className="w-full p-4 border border-[#E5E7EB] rounded-lg resize-none text-sm outline-none focus:border-[#2952CC]"
          />

          {/* {descriptionError && (
            <ErrorMessage message={descriptionError} type="error" />
          )} */}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={handleClose}
          className="px-6 py-2 text-[#6B7280] text-sm font-medium"
        >
          Cancel
        </button>

        <button
          disabled={isSaving}
          onClick={handleSaveQRCode}
          className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving ....{" "}
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}

export default QRCode;
