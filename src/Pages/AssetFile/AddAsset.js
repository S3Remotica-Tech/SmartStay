/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import {CloseCircle,} from "iconsax-react";
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
  // const [purchaseDate, setPurchaseDate] = useState("");
  const [price, setPrice] = useState("");
  // const [totalPrice, setTotalPrice] = useState("");
  const [id, setId] = useState("");
  const [productName, setProductName] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [serialNumberError, setSerialNumberError] = useState("");
  const [selectedDateError, setSelectedDateError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [assetError, setAssetError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  // const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [bankking,setBanking] = useState("")
  console.log("bankking",bankking)
  const [bankingError,setBankingError] = useState("")
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
      // setLoading(true);
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
    }, [state.login.selectedHostel_Id]);


    useEffect(()=>{
      if(state.AssetList?.bankAmountError){
        setBankingError(state.AssetList?.bankAmountError)
      }

    },[state.AssetList?.bankAmountError])

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
  const handleClose = ()=>{
    setShow(false)
    setBankingError('')
    setPaymentError("")
    dispatch({type: "CLEAR_BANK_AMOUNT_ERROR"});
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
      // setTotalPrice(currentItem.product_count * currentItem.price || "");
      setId(currentItem.id || 0);
      setProductName(currentItem.product_name || 0);
      setAccount(currentItem.bank_id || "");
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
      setAssetName("");
      setVendorName("");
      setBrandName("");
      setSerialNumber("");
      setProductCount("");
      // setPurchaseDate("");
      setPrice("");
      // setTotalPrice("");
      handleClose();
      setBankingError("")
    }
  }, [state.AssetList.addAssetStatusCode]);

  const handleModeOfPaymentChange = (e) => {
    setModeOfPayment(e.target.value);
    setAccountError("");
    setAccount("");
    setIsChangedError("");
    setPaymentError("");
    setBankingError("")
    dispatch({type: "CLEAR_BANK_AMOUNT_ERROR"});
    // setPaymentError("");
    // setIsChangedError("");
  };
  // const handleAccount = (e) => {
  //   setAccount(e.target.value);
  //   setAccountError("");
  //   setIsChangedError("");
  //   setBankingError("")
  //   dispatch({type: "CLEAR_BANK_AMOUNT_ERROR"});
  // };
  // const handleAccount = (selectedOption) => {
  //   setAccount(selectedOption?.value || "");
  //   setAccountError("");
  //   setIsChangedError("");
  //   setBankingError("");
  //   dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  // };

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
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   assetName: "Asset name cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setAssetName(value);
      // setErrors((prevErrors) => ({ ...prevErrors, assetName: "" }));
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
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   brandName: "Brand name cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setBrandName(value);
      // setErrors((prevErrors) => ({ ...prevErrors, brandName: "" }));
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
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   serial_Number: "Serial number cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setSerialNumber(value);
      // setErrors((prevErrors) => ({ ...prevErrors, serial_Number: "" }));
    }
  };

  // const handleProductCountChange = (e) => {
  //   setProductCount(e.target.value);
  // };

  // const handlePurchaseDateChange = (e) => {
  //   setPurchaseDate(e.target.value);
  // };

  const handlePriceChange = (e) => {
    // const price = e.target.value;
    // setPrice(price);
    const value = (e.target.value)
    if (!/^\d*$/.test(value)) {
      return; 
    }
    setPrice(value);
    setPriceError("");
    setIsChangedError("");
    setBankingError("")
    
    dispatch({type: "CLEAR_BANK_AMOUNT_ERROR"});
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
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   productName: "Product name cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setProductName(value);
      // setErrors((prevErrors) => ({ ...prevErrors, productName: "" }));
    }
  };

  const cleanSerialNumber = (serialNumber) => {
    return serialNumber.trim().replace(/[\t\n\r]+/g, "");
  };

  const handleAddAsset = () => {
    const cleanedSerialNumber = cleanSerialNumber(serialNumber);

    if (
      !productName &&
      !serialNumber &&
      !selectedDate &&
      !price &&
      !assetName
    ) 
    // {
    //   setGeneralError("Please enter all mandatory fields");
    //   return;
    // }

    if (!assetName) {
      setAssetError("Please Enter a Valid Asset Name");
      // Swal.fire({
      //     icon: 'warning',
      //     title: 'Please Enter a Valid Asset Name',
      // });
      // return;
    }
    if (!productName) {
      setProductNameError("Please Enter a Valid Product Name");
    }
    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Payment");

      // return;
    }
    // if (modeOfPayment === "Net Banking" && !account) {
    //   setAccountError("Please Choose Bank Account");
    //   return;
    // }
    // if (!vendorName) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Please Enter a Valid Vendor Name',
    //     });
    //     return;
    // }

    // if (!brandName) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Please Enter a Valid Brand Name',
    //     });
    //     return;
    // }

    if (!cleanedSerialNumber) {
      setSerialNumberError("Please Enter a Valid Serial Number");
      // return;
    }

    // if (!productCount || isNaN(productCount) || productCount <= 0) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Please Enter a Valid Product Count',
    //     });
    //     return;
    // }

    if (!selectedDate) {
      setSelectedDateError("Please Select a Valid Date");
      // return;
    }

    const numericRegex = /^[0-9]+$/;

    if (!price || !numericRegex.test(price) || price <= 0) {
      setPriceError("Please Enter a Valid Price");
      return;
    }

    const isChanged =
      initialState.assetName !== assetName ||
      initialState.vendorName !== vendorName ||
      initialState.brandName !== brandName ||
      initialState.serialNumber !== serialNumber ||
      Number(initialState.productCount) !== Number(productCount) ||
      (initialState.selectedDate &&
        selectedDate &&
        initialState.selectedDate.getTime() !== selectedDate.getTime()) ||
      Number(initialState.price) !== Number(price) ||
      initialState.productName !== productName;

    if (!isChanged) {
      setIsChangedError(
        "No Changes Detected"
      );
      return;
    }

    if (productName && serialNumber && selectedDate && price && assetName) {
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
          // bank_id: account,
          id: id,
        },
      });
    }
  };

  const calendarRef = useRef(null);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
    maxDate: "today",
  };


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
        // dialogClassName="custom-modal"  id="AddAsset"
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
              {currentItem ? "Edit an Asset" : "Add Asset"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
          </Modal.Header>

         

          {state.AssetList?.alreadyAssetNameHere && (
            <div className="d-flex align-items-center p-1">
              <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
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
          <Modal.Body>
            <div className="row mt-1">
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
                    <MdError style={{ color: "red", marginRight: "5px" ,fontSize:"14px",marginBottom:"2px"}} />
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
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group className="mb-1"  controlId="exampleForm.ControlInput1"
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
                    <MdError style={{ color: "red", marginRight: "6px",fontSize:"14px" }} />
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
                      marginTop:10
                    }}
                  >
                    Vendor Name
                  </Form.Label>
                  {/* <Form.Select
                    aria-label="Default select example"
                    value={vendorName}
                    onChange={handleVendorNameChange}
                    id="vendor-select"
                    style={{ fontWeight: vendorName ? 600 : 500 }}
                  >
                    <option value="">Select a vendor</option>
                    {state.ComplianceList.VendorList && state.ComplianceList.VendorList.length > 0 ? (
                      state.ComplianceList.VendorList.map((view) => (
                        <option key={view.id} value={view.id}>
                          {view.Vendor_Name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No vendors available
                      </option>
                    )}
                  </Form.Select> */}

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
      }),
      menuList: (base) => ({
        ...base,
        backgroundColor: "#f8f9fa",
        maxHeight: "120px", 
        padding: 0,
        scrollbarWidth: "thin",
        overflowY: "auto",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#555",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#555",
        cursor:"pointer"
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
                      marginTop:6
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
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px",marginBottom:"2px" }} />
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

                {state.AssetList?.alreadySerialNumberHere && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px",marginBottom:"2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {state.AssetList?.alreadySerialNumberHere}
                    </label>
                  </div>
                )}
              </div>

            

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group  controlId="purchaseDate">
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
                  {/* <div style={{ position: "relative", width: "100%" }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setIsChangedError("");
                        setSelectedDateError("");
                        setSelectedDate(date);
                      }}
                      dateFormat="dd/MM/yyyy"
                      minDate={null}
                      // maxDate={new Date()}
                      customInput={customDateInput({
                        value: selectedDate
                          ? selectedDate.toLocaleDateString("en-GB")
                          : "",
                      })}
                    />
                  </div> */}

                   <div
                                            className="datepicker-wrapper"
                                            style={{ position: "relative", width: "100%" }}
                                          >
                                            <DatePicker
                                              style={{ width: "100%", height: 48,cursor:"pointer" }}
                                              format="DD/MM/YYYY"
                                              placeholder="DD/MM/YYYY"
                                              value={selectedDate ? dayjs(selectedDate) : null}
                                              onChange={(date) => {
                                                setIsChangedError("");
                                                 setSelectedDateError("");
                                                setSelectedDate(date ? date.toDate() : null);
                                              }}
                                              getPopupContainer={(triggerNode) =>
                                                triggerNode.closest(".datepicker-wrapper")
                                              }
                                            />
                                          </div>
                </Form.Group>
                {selectedDateError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px" ,marginBottom:"2px",fontSize:"14px"}} />
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
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px",marginBottom:"2px" }} />
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
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
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
                        color: "#FF0000",fontSize:20,
                        display: modeOfPayment ? "none" : "inline-block",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                 
  <Form.Select className="border"
  aria-label="Select Mode Of Payment"
  value={modeOfPayment}
  onChange={handleModeOfPaymentChange}
  disabled={currentItem}
  style={{
    fontSize: 14,
    color: "rgba(75, 75, 75, 1)",
    fontFamily: "Gilroy",
    fontWeight: modeOfPayment ? 600 : 500,
    cursor: "pointer",
    height: 48,
    borderRadius: 8,
  }}
>
  <option value="">Select Mode Of Payment</option>
  {Array.isArray(bankking) &&
  [...new Map(bankking.map(item => [item.type, item])).values()].map((item) => {
    let label = "";
    if (item.type === "bank") label = "Bank";
    else if (item.type === "upi") label = "UPI";
    else if (item.type === "card") label = "Card";
    else if (item.type === "cash") label = "Cash";

    return (
      <option key={item.id} value={item.id}>
        {label}
      </option>
    );
  })}

</Form.Select>




                </Form.Group>
                {paymentError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px",marginBottom:"2px" }} />
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
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:14 }} />
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

              {/* {modeOfPayment === "Net Banking" && (
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Account{" "}
                    <span
                      style={{
                        color: "red",
                        fontSize: "20px",
                      }}
                    >
                      {" "}
                      *{" "}
                    </span>
                  </Form.Label>
                 

               <Select
                 placeholder="Select Account"
                 options={
                  bankking && bankking?.length > 0 ? bankking?.map((u) => ({
                         value: u.id,
                         label: u.bank_name,
                       }))
                     : []
                 }
               
                value={
                  Array.isArray(bankking)
                    ? bankking
                        .map((u) => ({
                          value: u.id,
                          label: u.bank_name,
                        }))
                        .find((opt) => opt.value === account)
                    : null
                }
                 onChange={handleAccount}
                 styles={{
                   control: (base) => ({
                     ...base,
                     height: "48px",
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
                   }),
                   menuList: (base) => ({
                     ...base,
                     backgroundColor: "#f8f9fa",
                     maxHeight: "120px",
                     padding: 0,
                     scrollbarWidth: "thin",
                     overflowY: "auto",
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
                   indicatorSeparator: () => ({
                     display: "none",
                   }),
                   option: (base, state) => ({
                     ...base,
                     cursor: "pointer", 
                     backgroundColor: state.isFocused ? "lightblue" : "white", 
                     color: "#000",
                   }),
                 }}
                 isDisabled={currentItem}
                 noOptionsMessage={() =>
                  bankking?.length === 0
                     ? "No accounts available"
                     : "No match found"
                 }
               />





                  {accountError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px",fontSize:14 }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {accountError}
                      </label>
                    </div>
                  )}
                </div>
              )} */}
              {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Total Price</Form.Label>
                                    <Form.Control
                                        value={productCount * price}
                                        readOnly
                                        type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 600, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div> */}
            </div>
          </Modal.Body>
          {isChangedError && (
            <div className="d-flex align-items-center justify-content-center mt-4">
              <MdError style={{ color: "red", marginRight: "5px",fontSize:14 }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {isChangedError}
              </label>
            </div>
          )}
          <Modal.Footer style={{ border: "none" }} className="">

  


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
          </Modal.Footer>
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
