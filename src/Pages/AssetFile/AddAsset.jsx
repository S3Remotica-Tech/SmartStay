/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import { CloseCircle } from "iconsax-react";
import "./addAsset.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ErrorMessage from "../../Components/ErrorMessage";

function StaticExample({ show, setShow, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [serialNumberError, setSerialNumberError] = useState("");
  const [selectedDateError, setSelectedDateError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [assetError, setAssetError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [bankking, setBanking] = useState("");
  const [bankingError, setBankingError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");

  const assetNameRef = useRef(null);
  const productNameRef = useRef(null);
  const paymentRef = useRef(null);
  const serialNumberRef = useRef(null);
  const dateRef = useRef(null);
  const priceRef = useRef(null);

  useEffect(() => {
    if (assetNameRef.current) {
      assetNameRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "ALL_VENDOR_LIST_SAGA",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, []);

  const [initialState, setInitialState] = useState({
    assetName: "",
    vendorName: "",
    brandName: "",
    serialNumber: "",
    productCount: "",
    selectedDate: null,
    price: "",
    productName: "",
  });

  useEffect(() => {
    if (state.AssetList?.bankAmountError) {
      setFormLoading(false);
      setBankingError(state.AssetList?.bankAmountError);
    }
  }, [state.AssetList?.bankAmountError]);

  const [serial_number_duplicate_Error, setSerial_Number_DuplicateError] =
    useState("");

  useEffect(() => {
    if (state.AssetList?.alreadySerialNumberHere) {
      setSerial_Number_DuplicateError(state.AssetList?.alreadySerialNumberHere);

      setTimeout(() => {
        dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" });
        setSerial_Number_DuplicateError("");
      }, 2000);
    }
  }, [state.AssetList?.alreadySerialNumberHere]);

  useEffect(() => {
    if (state.bankingDetails.bankingList.listBanks) {
      setBanking(state.bankingDetails.bankingList.listBanks);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.bankingList.listBanks]);

  const handleClose = () => {
    setShow(false);
    setBankingError("");
    setPaymentError("");
    setSerial_Number_DuplicateError("");
    setJoingDateErrmsg("");
    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
    dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" });
  };

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]',
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #222222";
      closeButton.style.padding = "9px";
    }
  }, []);

  useEffect(() => {
    if (currentItem) {
      setAssetName(currentItem.assetName || "");
      setVendorName(currentItem.vendorId || "");
      setBrandName(currentItem.brandName || "");
      setSerialNumber(currentItem.serialNumber || "");
      setSelectedDate(
        currentItem.purchaseDate
          ? dayjs(currentItem.purchaseDate, "DD-MM-YYYY")
          : null,
      );
      setPrice(currentItem.price || "");
      // setId(currentItem.id || 0);
      setProductName(currentItem.productName || 0);
      setModeOfPayment(currentItem.payment_mode || "");

      setInitialState({
        assetName: currentItem.assetName || "",
        vendorName: currentItem.vendorId || "",
        brandName: currentItem.brandName || "",
        serialNumber: currentItem.serialNumber || "",
        selectedDate: currentItem.purchaseDate
          ? dayjs(currentItem.purchaseDate, "DD-MM-YYYY")
          : null,
        price: currentItem.price || "",
        productName: currentItem.productName || "",
      });
    }
  }, [currentItem]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (
      state.AssetList.addAssetStatusCode === 200 ||
      state.AssetList.updateAssetStatusCode === 200
    ) {
      setFormLoading(false);
    }
  }, [
    state.AssetList.addAssetStatusCode,
    state.AssetList.updateAssetStatusCode,
  ]);

  // const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;
    setIsChangedError("");
    setPaymentError("");
    setBankingError("");
    setModeOfPayment(selectedOption);

    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
  };

  const labelMap = {
    CARD: "Card",
    CASH: "Cash",
    UPI: "UPI",
    BANK: "Bank",
  };

  const paymentOptions = Array.isArray(bankking)
    ? bankking.map((item) => ({
        value: String(item.bankingId),
        label: `${item.accountHolderName} - ${labelMap[item.accountType] || ""}`,
      }))
    : [];

  const handleAssetNameChange = (e) => {
    const value = e.target.value;
    setAssetError("");

    setIsChangedError("");

    dispatch({ type: "CLEAR_ASSET_NAME_ERROR" });
    if (value === "") {
      setAssetName(value);
      return;
    }

    if (value.trim() !== "") {
      setAssetName(value);
    }
  };

  const handleVendorNameChange = (selectedOption) => {
    setVendorName(selectedOption?.value || "");
    setIsChangedError("");
  };

  const handleBrandNameChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setIsChangedError("");

    if (value === "") {
      setBrandName(value);
      return;
    }

    if (value.trim() !== "") {
      setBrandName(value);
    }
  };

  const handleSerialNumberChange = (e) => {
    const value = e.target.value;
    // if (!/^\d*$/.test(value)) {
    //   return;
    // }
    setSerialNumberError("");
    dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" });
    setIsChangedError("");
    if (value === "") {
      setSerialNumber(value);
      return;
    }

    if (value.trim() !== "") {
      setSerialNumber(value);
    }
  };

  const handlePriceChange = (e) => {
    let value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    if ((value.match(/\./g) || []).length > 1) return;
    if (/^0\d+/.test(value)) {
      value = value.replace(/^0+/, "");
    }
    setPrice(value);
    setPriceError("");
    setIsChangedError("");
    setBankingError("");

    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
  };

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductNameError("");
    setIsChangedError("");

    if (value === "") {
      setProductName(value);
      return;
    }

    if (value.trim() !== "") {
      setProductName(value);
    }
  };

  // const cleanSerialNumber = (serialNumber) => {
  //   return serialNumber.trim().replace(/[\t\n\r]+/g, "");
  // };

  const nochangeRef = useRef(null);

  // const formattedDate = selectedDate ? selectedDate?.format("DD-MM-YYYY") : "";

  const handleAddAsset = () => {
    dispatch({ type: "CLEAR_ASSET_NAME_ERROR" });
    dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" });
    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
    // const cleanedSerialNumber = cleanSerialNumber(serialNumber);
    const focusedRef = { current: false };

    if (!assetName) {
      setAssetError("Please Enter Asset Name");
      if (!focusedRef.current && assetNameRef.current) {
        assetNameRef.current.focus();
        focusedRef.current = true;
      }
    }

    if (!productName) {
      setProductNameError("Please Enter Product Type");
      if (!focusedRef.current && productNameRef.current) {
        productNameRef.current.focus();
        focusedRef.current = true;
      }
    }

    if (!currentItem && !modeOfPayment) {
      setPaymentError("Please Select Mode Of Payment");
      if (!focusedRef.current && paymentRef.current) {
        paymentRef.current.focus();
        focusedRef.current = true;
      }
    }

    // if (!cleanedSerialNumber) {
    //   setSerialNumberError("Please Enter Serial Number");
    //   if (!focusedRef.current && serialNumberRef.current) {
    //     serialNumberRef.current.focus();
    //     focusedRef.current = true;
    //   }

    // }

    if (!selectedDate) {
      setSelectedDateError("Please Select Date");
      if (!focusedRef.current && dateRef.current) {
        dateRef.current.focus();
        focusedRef.current = true;
      }
    }

    const numericRegex = /^[0-9]+$/;

    if (!price || !numericRegex.test(price) || price <= 0) {
      setPriceError("Please Enter Price");
      if (!focusedRef.current && priceRef.current) {
        priceRef.current.focus();
        focusedRef.current = true;
      }
      return;
    }

    const isChanged =
      initialState.assetName !== assetName ||
      initialState.vendorName !== vendorName ||
      initialState.brandName !== brandName ||
      initialState.serialNumber !== serialNumber ||
      (initialState.selectedDate &&
        selectedDate &&
        !dayjs(initialState.selectedDate).isSame(selectedDate, "day")) ||
      Number(initialState.price) !== Number(price) ||
      initialState.productName !== productName;

    if (!isChanged) {
      setIsChangedError("No Changes Detected");

      setTimeout(() => {
        if (nochangeRef.current) {
          nochangeRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          nochangeRef.current.focus();
        }
      }, 100);

      return;
    } else {
      setIsChangedError("");
    }

    if (productName && selectedDate && price && assetName) {
      const formattedDate = selectedDate
        ? selectedDate.format("DD-MM-YYYY")
        : "";
      if (currentItem?.assetId) {
        let payload = {
          hostelId: state.login.selectedHostel_Id,
          assetId: currentItem?.assetId,
          assetName: assetName,
          productName: productName,
          brandName: brandName,
          serialNumber: serialNumber,
          purchaseDate: formattedDate,
          price: price,
          isActive: true,
        };

        if (vendorName) {
          payload.vendorId = vendorName;
        }

        dispatch({ type: "UPDATEASSET", payload });

        setFormLoading(true);
      } else {
        dispatch({
          type: "ADDASSET",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            assetName: assetName,
            productName: productName,
            vendorId: vendorName,
            brandName: brandName,
            serialNumber: serialNumber,
            purchaseDate: formattedDate,
            price: price,
            bankingId: modeOfPayment,
          },
        });
      }

      setFormLoading(true);
    }
  };

  const calendarRef = useRef(null);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
    maxDate: "today",
  };

  useEffect(() => {
    if (state.AssetList?.alreadyAssetNameHere && assetNameRef.current) {
      assetNameRef.current.focus();
    }
  }, [state.AssetList?.alreadyAssetNameHere]);

  useEffect(() => {
    if (state.AssetList?.alreadySerialNumberHere && serialNumberRef) {
      serialNumberRef.current.focus();
    }
  }, [state.AssetList?.alreadySerialNumberHere]);

  useEffect(() => {
    if (
      state.AssetList?.alreadyAssetNameHere ||
      state.AssetList?.alreadySerialNumberHere
    ) {
      setFormLoading(false);
    }
  }, [
    state.AssetList?.alreadyAssetNameHere,
    state.AssetList?.alreadySerialNumberHere,
  ]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div>
      <div className="modal show block static">
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Dialog className="m-0 p-0 w-full max-w-full">
            <Modal.Header>
              <Modal.Title className="!text-lg text-[#222222] !font-gilroy !font-semibold">
                {currentItem ? "Edit an Asset" : "Add Assets"}
              </Modal.Title>

              <CloseCircle
                size="24"
                color="#000"
                onClick={handleClose}
                className="cursor-pointer"
              />
            </Modal.Header>

            <Modal.Body
              className="show-scroll p-3 mt-2 mr-3 max-h-96 overflow-y-scroll mb-2"
              style={{ height: 390, maxHeight: 400 }}
            >
              <div className="grid grid-cols-12 gap-x-4 gap-y-3 -mt-2">
                <div className="col-span-12 lg:col-span-6">
                  <Form.Group
                    className=""
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Asset Name <span className="text-red-600 text-xl">*</span>
                    </Form.Label>
                    <Form.Control
                      value={assetName}
                      ref={assetNameRef}
                      onChange={handleAssetNameChange}
                      type="text"
                      placeholder="Enter Asset Name"
                      className={` h-[50px] rounded-lg border border-[#D9D9D9] text-base text-[#4B4B4B] font-gilroy ${assetName ? "font-semibold" : "font-medium"}
                      shadow-none focus:ring-0 focus:border-[#D9D9D9]`}
                    />
                  </Form.Group>

                  {assetError && (
                    <ErrorMessage message={assetError} type="error" />
                  )}

                  {state.AssetList?.alreadyAssetNameHere && (
                    <ErrorMessage
                      message={state.AssetList?.alreadyAssetNameHere}
                      type="error"
                    />
                  )}
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Product Type{" "}
                      <span className="text-red-600 text-xl">*</span>
                    </Form.Label>
                    <Form.Control
                      value={productName}
                      ref={productNameRef}
                      onChange={handleProductNameChange}
                      type="text"
                      placeholder="Enter Product Type"
                      className={` h-[50px] rounded-lg border border-[#D9D9D9] text-base text-[#4B4B4B] font-gilroy ${assetName ? "font-semibold" : "font-medium"}
                      shadow-none focus:ring-0 focus:border-[#D9D9D9]`}
                    />
                  </Form.Group>

                  {productNameError && (
                    <ErrorMessage message={productNameError} type="error" />
                  )}
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Vendor Name
                    </Form.Label>

                    <Select
                      options={
                        state.AssetList?.allVendorList?.length > 0
                          ? state.AssetList?.allVendorList?.map((view) => ({
                              value: view.vendorId,
                              label: view.vendorName,
                            }))
                          : []
                      }
                      onChange={handleVendorNameChange}
                      value={
                        state.AssetList?.allVendorList?.find(
                          (vendor) => vendor.vendorId === vendorName,
                        )
                          ? {
                              value: vendorName,
                              label: state.AssetList?.allVendorList?.find(
                                (vendor) => vendor.vendorId === vendorName,
                              )?.vendorName,
                            }
                          : null
                      }
                      placeholder="Select a Vendor"
                      classNamePrefix="custom"
                      menuPlacement="bottom"
                      noOptionsMessage={() => "No vendors available"}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: "50px",
                          border: "1px solid #D9D9D9",
                          borderRadius: "8px",
                          fontSize: "16px",
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: vendorName ? 600 : 500,
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
                          color: "#9aa0a6",
                          fontSize: 16,
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#555",
                          cursor: "pointer",
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isSelected
                            ? "#1E45E1"
                            : state.isFocused
                              ? "#E8EEFF"
                              : "white",
                          color: state.isSelected ? "#fff" : "#000",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />
                  </Form.Group>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <Form.Group
                    className="mb-"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Brand Name{" "}
                    </Form.Label>
                    <Form.Control
                      value={brandName}
                      onChange={handleBrandNameChange}
                      type="text"
                      placeholder="Enter Brand Name"
                      className={` h-[50px] rounded-lg border border-[#D9D9D9] text-base text-[#4B4B4B] font-gilroy ${assetName ? "font-semibold" : "font-medium"}
                      shadow-none focus:ring-0 focus:border-[#D9D9D9]`}
                    />
                  </Form.Group>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Serial Number{" "}
                    </Form.Label>
                    <Form.Control
                      //  className="mb-1 mt-1.5"
                      value={serialNumber}
                      ref={serialNumberRef}
                      onChange={handleSerialNumberChange}
                      type="text"
                      placeholder="Enter Serial Number"
                      className={` h-[50px] rounded-lg border border-[#D9D9D9] text-base text-[#4B4B4B] font-gilroy ${assetName ? "font-semibold" : "font-medium"}
                      shadow-none focus:ring-0 focus:border-[#D9D9D9]`}
                    />
                  </Form.Group>

                  {serialNumberError && (
                    <ErrorMessage message={serialNumberError} type="error" />
                  )}

                  {serial_number_duplicate_Error && (
                    <ErrorMessage
                      message={serial_number_duplicate_Error}
                      type="error"
                    />
                  )}
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <Form.Group controlId="purchaseDate">
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Purchase Date{" "}
                      <span className="text-red-600 text-xl">*</span>
                    </Form.Label>

                    <div
                      className="datepicker-wrapper -mt-1"
                      style={{ position: "relative", width: "100%" }}
                    >
                      <DatePicker
                        ref={dateRef}
                        style={{
                          width: "100%",
                          height: 48,
                          cursor: "pointer",
                          fontFamily: "Gilroy",
                        }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={selectedDate ? dayjs(selectedDate) : null}
                        onChange={(date) => {
                          setIsChangedError("");
                          setSelectedDateError("");
                          setJoingDateErrmsg("");
                          setSelectedDate(date);
                        }}
                        disabledDate={(current) =>
                          current && current > dayjs().endOf("day")
                        }
                        getPopupContainer={() => document.body}
                        popupStyle={{ zIndex: 2000, left: "570px" }}
                        placement="bottomLeft"
                      />
                    </div>
                  </Form.Group>
                  {selectedDateError && (
                    <ErrorMessage message={selectedDateError} type="error" />
                  )}

                  {joiningDateErrmsg.trim() !== "" && (
                    <ErrorMessage message={joiningDateErrmsg} type="error" />
                  )}
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Price <span className="text-red-600 text-xl">*</span>
                    </Form.Label>
                    <Form.Control
                      value={price}
                      ref={priceRef}
                      onChange={handlePriceChange}
                      // onKeyDown={(e) => {
                      //   if (e.key === "." || e.key === "e" || e.key === "-") {
                      //     e.preventDefault();
                      //   }
                      // }}
                      type="text"
                      placeholder="Enter Amount"
                      className={` h-[50px] rounded-lg border border-[#D9D9D9] text-base text-[#4B4B4B] font-gilroy ${assetName ? "font-semibold" : "font-medium"}
                      shadow-none focus:ring-0 focus:border-[#D9D9D9]`}
                    />
                  </Form.Group>
                  {priceError && (
                    <ErrorMessage message={priceError} type="error" />
                  )}
                </div>
                {!currentItem && (
                  <div className="col-span-12 lg:col-span-6">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                        Mode Of Payment{" "}
                        <span
                          className={`text-red-500 text-xl ${
                            modeOfPayment ? "hidden" : "inline-block"
                          }`}
                        >
                          *
                        </span>
                      </Form.Label>

                      <Select
                        options={paymentOptions}
                        value={
                          paymentOptions.find(
                            (opt) => opt.value === String(modeOfPayment),
                          ) || null
                        }
                        onChange={(selectedOption) =>
                          handleModeOfPaymentChange(selectedOption?.value)
                        }
                        // onMenuOpen={() => setIsSelectOpen(true)}
                        // onMenuClose={() => setIsSelectOpen(false)}
                        placeholder="Select Payment"
                        isDisabled={currentItem}
                        menuPlacement="top"
                        styles={{
                          control: (base) => ({
                            ...base,
                            fontSize: 14,
                            color: "rgba(75, 75, 75, 1)",
                            fontFamily: "Gilroy",
                            fontWeight: modeOfPayment ? 600 : 500,
                            border: "1px solid #D9D9D9",
                            borderRadius: "8px",
                            boxShadow: "none",
                            height: 50,
                            cursor: "pointer",
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
                            maxHeight: "80px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            overflowY: "auto",
                            fontFamily: "Gilroy",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#9aa0a6",
                            fontSize: 16,
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            cursor: "pointer",
                          }),
                          option: (base, state) => ({
                            ...base,
                            cursor: "pointer",
                            backgroundColor: state.isFocused
                              ? "lightblue"
                              : "white",
                            color: "#000",
                            fontFamily: "Gilroy",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </Form.Group>
                    {paymentError && (
                      <ErrorMessage message={paymentError} type="error" />
                    )}

                    {bankingError && (
                      <ErrorMessage message={bankingError} type="error" />
                    )}
                  </div>
                )}
              </div>
            </Modal.Body>
            {isChangedError && (
              <div
                ref={nochangeRef}
                className="flex items-center justify-center mt-1 mb-1"
              >
                <ErrorMessage message={isChangedError} type="error" />
              </div>
            )}

            {formLoading && (
              <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-transparent opacity-75">
                <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-r-4 border-r-transparent border-t-blue-700"></div>
              </div>
            )}

            {/* {state.createAccount?.networkError ?
             <div className="d-flex justify-content-center mt-1 mb-1">
              <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
              : null} */}

            <div className="col-span-12 px-3 pb-4">
              <Button
                disabled={formLoading}
                onClick={handleAddAsset}
                className="w-100 !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[17px] !font-gilroy p-3 mt-2"
              >
                {currentItem ? "Save Changes" : "Add Asset"}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal>
      </div>
    </div>
  );
}

StaticExample.propTypes = {
  currentItem: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

export default StaticExample;
