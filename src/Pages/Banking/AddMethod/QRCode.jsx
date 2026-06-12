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

function QRCode() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

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

    setQrName(value);

    if (!value.trim()) {
      setQrNameError("QR Name is required");
    } else {
      setQrNameError("");
    }
  };

  const handleCardLast4Change = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);

    setCardLast4(value);

    if (!value) {
      setCardLast4Error("Last 4 digits required");
    } else if (value.length !== 4) {
      setCardLast4Error("Enter exactly 4 digits");
    } else {
      setCardLast4Error("");
    }
  };

  const handleQrImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setQrImage(file);
    setQrImageName(file.name);
    setQrImagePreview(URL.createObjectURL(file));
    setQrImageError("");
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    setDescription(value);

    if (!value.trim()) {
      setDescriptionError("Description is required");
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

    if (!linkedUpi) {
      setLinkedUpiError("Please select UPI ID");
      isValid = false;
    }

    if (!provider) {
      setProviderError("Please select provider");
      isValid = false;
    }

    if (!qrName.trim()) {
      setQrNameError("QR name is required");
      isValid = false;
    }

    if (!cardLast4) {
      setCardLast4Error("Last 4 digits required");
      isValid = false;
    }

    if (cardLast4.length !== 4) {
      setCardLast4Error("Enter exactly 4 digits");
      isValid = false;
    }

    if (!qrImage) {
      setQrImageError("Please upload QR image");
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }

    if (!isValid) return;
  };

  return (
    <div className="">
      <div className="h-[500px] overflow-y-auto  show-scrolls">
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
            className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm"
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
            className="w-full h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm"
          />

          {cardLast4Error && (
            <ErrorMessage message={cardLast4Error} type="error" />
          )}
        </div>

        <div className="mt-3">
          <label className="block mb-2 text-[13px] font-medium">
            Add QR Image <span className="text-red-500">*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
            onChange={handleQrImageChange}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="mb-3 flex flex-row gap-4 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-6 cursor-pointer hover:bg-gray-100"
          >
            <div className="rounded-md bg-blue-100 px-1 py-1">
              <DocumentUpload size={20} color="#1E45E1" />
            </div>

            <div>
              <p className="text-sm font-medium text-[#222222] mb-1">
                <span className="text-[#1E45E1]">Choose Image to</span> Upload
              </p>

              <p className="text-xs text-gray-500">JPG / JPEG / PNG Format</p>
            </div>
          </div>

          {qrImageError && <ErrorMessage message={qrImageError} type="error" />}
        </div>

        {qrImagePreview && (
          <div className="flex items-center justify-center">
            <div className="bg-[#FAFAFB] w-full rounded-md flex items-center justify-center">
              <div
                className="relative px-4 py-2 group"
                onMouseEnter={() => setHoveredImage(qrImagePreview)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <img
                  src={qrImagePreview}
                  alt="preview"
                  className="w-[350px] h-auto rounded-md object-fit"
                />

                <div
                  className={`absolute bottom-0 left-[21px]  right-[21px] overflow-hidden rounded-b-md transition-all duration-300 ${
                    hoveredImage === qrImagePreview ? "h-[50px]" : "h-0"
                  }`}
                >
                  <div className="h-[50px] bg-white/40 flex items-center justify-between px-3 py-1">
                    <p className="text-white text-sm truncate max-w-[170px] mb-0">
                      {qrImageName}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQrImagePreview(null);
                        removeQrImage();
                      }}
                      className="bg-[#FFF2F2] rounded-md p-1"
                    >
                      <Add size={20} color="#FF3B30" className="rotate-45" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3">
          <label className="block mb-2 text-[13px] font-medium">
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the notes..."
            className="w-full p-4 border border-[#E5E7EB] rounded-lg resize-none text-sm"
          />

          {descriptionError && (
            <ErrorMessage message={descriptionError} type="error" />
          )}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button className="text-[#6B7280] text-sm font-medium">Cancel</button>

        <button
          onClick={handleSaveQRCode}
          className="px-8 py-2 bg-[#2952CC] text-white rounded-lg text-sm font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default QRCode;
