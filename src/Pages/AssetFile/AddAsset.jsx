/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import { CloseCircle, } from "iconsax-react";
import "./addAsset.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function StaticExample({ show, setShow, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [productCount, setProductCount] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
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
  const [bankking, setBanking] = useState("")
  const [bankingError, setBankingError] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');


  const assetNameRef = useRef(null);
  const productNameRef = useRef(null);
  const paymentRef = useRef(null);
  const serialNumberRef = useRef(null);
  const dateRef = useRef(null);
  const priceRef = useRef(null);








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
    dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
    dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } })

  }, [state.login.selectedHostel_Id]);


  useEffect(() => {
    if (state.AssetList?.bankAmountError) {
      setFormLoading(false)
      setBankingError(state.AssetList?.bankAmountError)
    }

  }, [state.AssetList?.bankAmountError])

  const [serial_number_duplicate_Error, setSerial_Number_DuplicateError] = useState("")

  useEffect(() => {
    if (state.AssetList?.alreadySerialNumberHere) {
      setSerial_Number_DuplicateError(state.AssetList?.alreadySerialNumberHere)

      setTimeout(() => {
        dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" })
        setSerial_Number_DuplicateError("")
      }, 2000);
    }

  }, [state.AssetList?.alreadySerialNumberHere])

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {

      setBanking(state.bankingDetails.bankingList.banks)
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);

  useEffect(() => {
    dispatch({
      type: "VENDORLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);
  const handleClose = () => {
    setShow(false)
    setBankingError('')
    setPaymentError("")
    setSerial_Number_DuplicateError("")
    setJoingDateErrmsg('')
    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
    dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" })
  }

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
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
      setAssetName(currentItem.asset_name || "");
      setVendorName(currentItem.vendor_id || "");
      setBrandName(currentItem.brand_name || "");
      setSerialNumber(currentItem.serial_number || "");
      setProductCount(currentItem.product_count || "");
      setSelectedDate(moment(currentItem.purchase_date).toDate());
      setPrice(currentItem.price || "");
      setId(currentItem.id || 0);
      setProductName(currentItem.product_name || 0);
      setModeOfPayment(currentItem.payment_mode || "");

      setInitialState({
        assetName: currentItem.asset_name || "",
        vendorName: currentItem.vendor_id || "",
        brandName: currentItem.brand_name || "",
        serialNumber: currentItem.serial_number || "",
        productCount: currentItem.product_count || "",
        selectedDate: currentItem.purchase_date
          ? moment(currentItem.purchase_date).toDate()
          : null,
        price: currentItem.price || "",
        productName: currentItem.product_name || "",
      });
    }
  }, [currentItem]);



  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (state.AssetList.addAssetStatusCode === 200) {
      setFormLoading(false)
      setAssetName("");
      setVendorName("");
      setBrandName("");
      setSerialNumber("");
      setProductCount("");
      setPrice("");
      handleClose();
      setBankingError("")
      setJoingDateErrmsg('')
    }
  }, [state.AssetList.addAssetStatusCode]);



  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;
    setIsChangedError("");
    setPaymentError("");
    setBankingError("")
    setModeOfPayment(selectedOption);


    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
  };

  const labelMap = {
    bank: "Bank",
    upi: "UPI",
    card: "Card",
    cash: "Cash",
  };

  const paymentOptions = Array.isArray(bankking)
    ? bankking.map((item) => ({
      value: String(item.id),
      label: `${item.benificiary_name} - ${labelMap[item.type] || ""}`,
    }))
    : [];

  const handleAssetNameChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
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
    setVendorName(selectedOption?.value || '');
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
    if (!/^\d*$/.test(value)) {
      return;
    }
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
    const value = (e.target.value)
    if (!/^\d*$/.test(value)) {
      return;
    }
    setPrice(value);
    setPriceError("");
    setIsChangedError("");
    setBankingError("")

    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
  };

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
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

  const cleanSerialNumber = (serialNumber) => {
    return serialNumber.trim().replace(/[\t\n\r]+/g, "");
  };


  const nochangeRef = useRef(null)

  const handleAddAsset = () => {
    dispatch({ type: "CLEAR_ASSET_NAME_ERROR" });
    dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" });
    dispatch({ type: "CLEAR_BANK_AMOUNT_ERROR" });
    const cleanedSerialNumber = cleanSerialNumber(serialNumber);
    const focusedRef = { current: false };

    if (!assetName) {
      setAssetError("Please Enter Asset Name");
      if (!focusedRef.current && assetNameRef.current) {
        assetNameRef.current.focus();
        focusedRef.current = true;
      }
    }

    if (!productName) {
      setProductNameError("Please Enter Product Name");
      if (!focusedRef.current && productNameRef.current) {
        productNameRef.current.focus();
        focusedRef.current = true;
      }
      
    }

    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Payment");
      if (!focusedRef.current && paymentRef.current) {
        paymentRef.current.focus();
        focusedRef.current = true;
      }
      
    }

    if (!cleanedSerialNumber) {
      setSerialNumberError("Please Enter Serial Number");
      if (!focusedRef.current && serialNumberRef.current) {
        serialNumberRef.current.focus();
        focusedRef.current = true;
      }
      
    }

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
      Number(initialState.productCount) !== Number(productCount) ||
      (initialState.selectedDate && selectedDate &&
        moment(initialState.selectedDate).format("YYYY-MM-DD") !==
        moment(selectedDate).format("YYYY-MM-DD")) ||
      Number(initialState.price) !== Number(price) ||
      initialState.productName !== productName;


    if (!isChanged) {
      setIsChangedError("No Changes Detected");


      setTimeout(() => {
        if (nochangeRef.current) {
          nochangeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          nochangeRef.current.focus();
        }
      }, 100);

      return;
    } else {
      setIsChangedError("");
    }

    if (productName && serialNumber && selectedDate && price && assetName && modeOfPayment) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

      dispatch({
        type: "ADDASSET",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          asset_name: assetName,
          product_name: productName,
          vendor_id: vendorName,
          brand_name: brandName,
          serial_number: serialNumber,
          product_count: 1,
          purchase_date: formattedDate,
          price: price,
          payment_type: modeOfPayment,
          id: id,
        },
      });
      setFormLoading(true)
    }
  };








  const calendarRef = useRef(null);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
    maxDate: "today",
  };



  useEffect(() => {
    if (state.AssetList?.alreadyAssetNameHere || state.AssetList?.alreadySerialNumberHere) {
      setFormLoading(false)
    }

  }, [state.AssetList?.alreadyAssetNameHere, state.AssetList?.alreadySerialNumberHere])


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])









  return (
    <div>
      <div
        className="modal show"
        style={{
          display: "block",
          position: "initial",
        }}
      >
        <Modal show={show} onHide={handleClose} backdrop="static"

        >
          <Modal.Dialog
            style={{ maxWidth: "100%", width: "100%" }}
            className="m-0 p-0"
          >
            <Modal.Header>
              <Modal.Title
                style={{
                  fontSize: 18,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                }}
              >
                {currentItem ? "Edit an Asset" : "Add Assets"}
              </Modal.Title>

              <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
            </Modal.Header>



           

            {Array.isArray(state.bankingDetails?.bankingList?.banks) &&
              state.bankingDetails.bankingList.banks.length === 0 && (
                <div className="d-flex align-items-center pt-2 ps-2">
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
                    Please Create Banking before adding an asset
                  </label>
                </div>
              )}




            <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll p-3 mt-2 me-3" >

              <div className="row " style={{ marginTop: "-20px" }}>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Asset Name{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      value={assetName}
                      ref={assetNameRef}
                      onChange={handleAssetNameChange}
                      type="text"
                      placeholder="Enter Asset Name"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: assetName ? 600 : 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>

                  {assetError && (
                    <div className="d-flex align-items-center">
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
                        {assetError}
                      </label>
                    </div>
                  )}


                   {state.AssetList?.alreadyAssetNameHere && (
              <div className="d-flex align-items-center p-1 ms-1">
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
                  {state.AssetList?.alreadyAssetNameHere}
                </label>
              </div>
            )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Product Name{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      value={productName}
                      ref={productNameRef}
                      onChange={handleProductNameChange}
                      type="text"
                      placeholder="Enter Product Name"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: productName ? 600 : 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>

                  {productNameError && (
                    <div className="d-flex align-items-center">
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
                        {productNameError}
                      </label>
                    </div>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        marginTop: 10
                      }}
                    >
                      Vendor Name
                    </Form.Label>


                    <Select

                      options={
                        state.ComplianceList?.VendorList?.length > 0
                          ? state.ComplianceList.VendorList.map((view) => ({
                            value: view.id,
                            label: view.Vendor_Name,
                          }))
                          : []
                      }
                      onChange={handleVendorNameChange}
                      value={
                        state.ComplianceList?.VendorList?.find((vendor) => vendor.id === vendorName)
                          ? {
                            value: vendorName,
                            label: state.ComplianceList.VendorList.find(
                              (vendor) => vendor.id === vendorName
                            )?.Vendor_Name,
                          }
                          : null
                      }
                      placeholder="Select a Vendor"
                      classNamePrefix="custom"
                      menuPlacement="auto"
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
                          color: "#555",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#555",
                          cursor: "pointer"
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused ? "lightblue" : "white",
                          color: "#000",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />


                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Brand Name{" "}

                    </Form.Label>
                    <Form.Control
                      value={brandName}
                      onChange={handleBrandNameChange}
                      type="text"
                      placeholder="Enter Brand Name"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: brandName ? 600 : 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                        marginTop: 6
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Serial Number{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <Form.Control className="mb-1"
                      value={serialNumber}
                      ref={serialNumberRef}
                      onChange={handleSerialNumberChange}
                      type="text"
                      placeholder="Enter Serial Number"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: serialNumber ? 600 : 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>

                  {serialNumberError && (
                    <div className="d-flex align-items-center ">
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
                        {serialNumberError}
                      </label>
                    </div>
                  )}

                  {serial_number_duplicate_Error && (
                    <div className="d-flex align-items-center p-1">
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
                        {serial_number_duplicate_Error}
                      </label>
                    </div>
                  )}
                </div>



                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group controlId="purchaseDate">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Purchase Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>


                    <div
                      className="datepicker-wrapper"
                      style={{ position: "relative", width: "100%" }}
                    >
                      <DatePicker
                        ref={dateRef}
                        style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={selectedDate ? dayjs(selectedDate) : null}
                        onChange={(date) => {
                          setIsChangedError("");
                          setSelectedDateError("");
                          setJoingDateErrmsg('')
                          setSelectedDate(date ? date.toDate() : null);
                        }}

                        disabledDate={(current) => current && current > dayjs().endOf("day")}

                        getPopupContainer={(triggerNode) =>
                          triggerNode.closest(".datepicker-wrapper")
                        }
                      />
                    </div>
                  </Form.Group>
                  {selectedDateError && (
                    <div className="d-flex align-items-center p-1">
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
                        {selectedDateError}
                      </label>
                    </div>
                  )}

                  {joiningDateErrmsg.trim() !== "" && (
                    <div className="d-flex align-items-center">
                      <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {joiningDateErrmsg}
                      </label>
                    </div>
                  )}
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group className="mb-1"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Price{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      value={price}
                      ref={priceRef}
                      onChange={handlePriceChange}
                      type="text"
                      placeholder="Enter Amount"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: price ? 600 : 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>
                  {priceError && (
                    <div className="d-flex align-items-center ">
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
                        {priceError}
                      </label>
                    </div>
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2">
                  <Form.Group
                    className=""
                    controlId="exampleForm.ControlInput1"
                  >

                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Mode Of Payment{" "}
                      <span
                        style={{
                          color: "#FF0000", fontSize: 20,
                          display: modeOfPayment ? "none" : "inline-block",
                        }}
                      >
                        *
                      </span>
                    </Form.Label>




                    <Select
                      options={paymentOptions}
                      value={
                        paymentOptions.find((opt) => opt.value === String(modeOfPayment)) || null
                      }
                      onChange={(selectedOption) =>
                        handleModeOfPaymentChange(selectedOption?.value)
                      }
                      onMenuOpen={() => setIsSelectOpen(true)}
                      onMenuClose={() => setIsSelectOpen(false)}
                      placeholder="Select Payment"
                      isDisabled={currentItem}

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
                          height: 48,
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
                          color: "#555",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#555",
                          cursor: "pointer",
                        }),
                        option: (base, state) => ({
                          ...base,
                          cursor: "pointer",
                          backgroundColor: state.isFocused ? "lightblue" : "white",
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
                    <div className="d-flex align-items-center p-1 mb-2" style={{ marginTop: isSelectOpen ? 25 : 0, }}>
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
                        {paymentError}
                      </label>
                    </div>
                  )}

                  {bankingError && (
                    <div className="d-flex align-items-center p-1" >
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
                        {bankingError}
                      </label>
                    </div>
                  )}
                </div>


              </div>
            </Modal.Body>
            {isChangedError && (
              <div ref={nochangeRef} className="d-flex align-items-center justify-content-center mt-3 mb-4">
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
                  {isChangedError}
                </label>
              </div>
            )}

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
              </div>
            }
            {state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
              </div>
              : null}




            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 px-3" style={{ paddingBottom: 20, paddingTop: isSelectOpen ? 20 : 0, }}>

              <Button
                onClick={handleAddAsset}
                className="w-100"
                style={{
                  backgroundColor: "#1E45E1",
                  fontWeight: 600,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  padding: 12,
                }}
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
  value: PropTypes.func.isRequired
};

export default StaticExample;
