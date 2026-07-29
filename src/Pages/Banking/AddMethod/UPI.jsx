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

function UPI({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;

  console.log("OverviewDetails", OverviewDetails);

  const upiOptions =
    state?.bankingDetails?.getUpiCardTypes?.map((view) => ({
      value: view.id,
      label: view.name,
    })) || [];

  console.log("upiOptions", upiOptions);

  const [linkedBank, setLinkedBank] = useState(null);
  const [linkedBankError, setLinkedBankError] = useState("");

  const [upiApp, setUpiApp] = useState(null);
  const [upiAppError, setUpiAppError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiIdError, setUpiIdError] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [qrImage, setQrImage] = useState(null);
  const [qrImagePreview, setQrImagePreview] = useState("");
  const [qrImageError, setQrImageError] = useState("");
  const [qrImageName, setQrImageName] = useState("");
  const [hoveredImage, setHoveredImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleLinkedBankChange = (selected) => {
    setLinkedBank(selected);
    setLinkedBankError("");
  };

  const handleUpiAppChange = (selected) => {
    setUpiApp(selected);
    setUpiAppError("");
  };

  const handleUpiIdChange = (e) => {
    const value = e.target.value.trim();

    setUpiId(value);

    const upiRegex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/;

    if (!value) {
      setUpiIdError("Please Enter UPI ID");
    } else if (!upiRegex.test(value)) {
      setUpiIdError("Enter a valid UPI ID");
    } else {
      setUpiIdError("");
    }
  };

  const handleDisplayNameChange = (e) => {
    const value = e.target.value;

    if (!/^[A-Za-z\s]*$/.test(value)) {
      return;
    }

    setDisplayName(value);

    if (!value.trim()) {
      setDisplayNameError("Please Enter Display Name");
    } else {
      setDisplayNameError("");
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

  const handleQrImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setQrImage(file);
    setQrImageName(file.name);
    setQrImagePreview(URL.createObjectURL(file));
    setQrImageError("");
  };

  const removeQrImage = () => {
    setQrImage(null);
    setQrImagePreview("");
  };

  const handleSaveUPI = () => {
    dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    let isValid = true;

    // if (!linkedBank) {
    //   setLinkedBankError("Please select linked bank");
    //   isValid = false;
    // }

    if (!upiApp) {
      setUpiAppError("Please select UPI app");
      isValid = false;
    }

    const upiRegex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9]{2,}$/;

    if (!upiId.trim()) {
      setUpiIdError("Please Enter UPI ID");
      isValid = false;
    } else if (!upiRegex.test(upiId.trim())) {
      setUpiIdError("Please Enter a Valid UPI ID");
      isValid = false;
    } else {
      setUpiIdError("");
    }

    const displayNameRegex = /^[A-Za-z\s]+$/;

    if (!displayName.trim()) {
      setDisplayNameError("Please Enter Display Name");
      isValid = false;
    } else if (!displayNameRegex.test(displayName.trim())) {
      setDisplayNameError("Display Name should contain only letters");
      isValid = false;
    } else {
      setDisplayNameError("");
    }

    if (!qrImage) {
      setQrImageError("Please upload QR image");
      isValid = false;
    } else {
      setQrImageError("");
    }

    if (!isValid) return;

    dispatch({
      type: "ADD_PAYMENT_METHOD_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bankId: OverviewDetails?.bankId,
        paymentMethod: "UPI",
        upiId: upiId.trim(),
        upiApp: upiApp.value,
        displayName: displayName.trim(),
        description: description.trim(),
        qrImage: qrImage || "",
        cardNumber: "",
        cardNetwork: 0,
        cardHolderName: "",
        creditLimit: "",
        billingCycle: "",
        linkedUpiId: "",
      },
    });
    setIsSaving(true);
  };

  useEffect(() => {
    if (state.bankingDetails.addPaymentMethodSuccessCode === 200) {
      setIsSaving(false);
      handleClose();
    }
  }, [state.bankingDetails.addPaymentMethodSuccessCode]);

  useEffect(() => {
    if (state.bankingDetails.addPaymentError) {
      setIsSaving(false);
    }
  }, [state.bankingDetails.addPaymentError]);

  useEffect(() => {
    if (
      state.UsersList?.accessRestrictionError ||
      state.createAccount?.networkError
    ) {
      setIsSaving(false);
      dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [
    state.UsersList?.accessRestrictionError,
    state.createAccount?.networkError,
  ]);

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
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Linked Bank
            </label>

            <input
              value={OverviewDetails?.bankName}
              disabled
              // onChange={handleLinkedBankChange}
              placeholder=""
              className="w-full mt-2 h-11 px-3 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />

            {linkedBankError && (
              <ErrorMessage message={linkedBankError} type="error" />
            )}
          </div>

          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              UPI APP <span className="text-red-500">*</span>
            </label>

            <Select
              options={upiOptions}
              value={upiApp}
              onChange={handleUpiAppChange}
              placeholder="Select UPI App"
              className="mt-2"
              styles={CustomStyles}
            />

            {upiAppError && <ErrorMessage message={upiAppError} type="error" />}
          </div>
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            UPI ID <span className="text-red-500">*</span>
          </label>

          <input
            value={upiId}
            onChange={handleUpiIdChange}
            placeholder="Ex : smartstay@oksbi"
            className="w-full mt-2 h-11 px-3 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />
          {upiIdError && <ErrorMessage message={upiIdError} type="error" />}
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Display Name <span className="text-red-500">*</span>
          </label>

          <input
            value={displayName}
            onChange={handleDisplayNameChange}
            placeholder="Gpay UPI"
            className="w-full mt-2 h-11 px-3 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />

          {displayNameError && (
            <ErrorMessage message={displayNameError} type="error" />
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
                  className={`absolute bottom-0 left-[21px]  right-[21px] overflow-hidden rounded-b-md bg-gray-100
                    transition-all duration-300 ${
                      hoveredImage === qrImagePreview ? "h-[50px]" : "h-0"
                    }`}
                >
                  <div className="h-[50px] bg-white/40 flex items-center justify-between px-3 py-1">
                    <p className=" text-sm truncate max-w-[170px] mb-0 text-[#222222]">
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
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the notes..."
            className="w-full mt-2 p-3 border border-[#E5E7EB] rounded-lg text-sm resize-none outline-none focus:border-[#2952CC]"
          />
          {/* {descriptionError && (
            <ErrorMessage message={descriptionError} type="error" />
          )} */}
        </div>
      </div>

      {state.bankingDetails.addPaymentError && (
        <ErrorMessage
          message={state.bankingDetails.addPaymentError}
          type="error"
        />
      )}

      <div className="flex justify-end gap-4 px-6 py-2 ">
        <button
          onClick={handleClose}
          className="px-6 py-2 text-[#6B7280] text-sm font-medium"
        >
          Cancel
        </button>

        <button
          disabled={isSaving}
          onClick={handleSaveUPI}
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

export default UPI;
