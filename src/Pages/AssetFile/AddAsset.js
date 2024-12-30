import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputGroup, FormControl } from "react-bootstrap";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import {
  ArrowUp2,
  ArrowDown2,
  CloseCircle,
  SearchNormal1,
  Sort,
  Edit,
  Trash,
} from "iconsax-react";

function StaticExample({ show, handleClose, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [productCount, setProductCount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
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
  const [generalError, setGeneralError] = useState("");
  const [assetError, setAssetError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
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
    dispatch({ type: "BANKINGLIST", hostel_id: state.login.selectedHostel_Id });
  }, []);

  useEffect(() => {
    dispatch({
      type: "VENDORLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

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
      setTotalPrice(currentItem.product_count * currentItem.price || "");
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
    if (state.AssetList.addAssetStatusCode == 200) {
      setAssetName("");
      setVendorName("");
      setBrandName("");
      setSerialNumber("");
      setProductCount("");
      setPurchaseDate("");
      setPrice("");
      setTotalPrice("");
      handleClose();
    }
  }, [state.AssetList.addAssetStatusCode]);

  const handleModeOfPaymentChange = (e) => {
    setModeOfPayment(e.target.value);
    setAccountError("");
    setAccount("");
    setIsChangedError("");
    setPaymentError("");
    // setGeneralError("");
    // setPaymentError("");
    // setIsChangedError("");
  };
  const handleAccount = (e) => {
    setAccount(e.target.value);
    setAccountError("");
    setIsChangedError("");
  };

  const handleAssetNameChange = (e) => {
    setGeneralError("");
    const value = e.target.value;
    setAssetError("");

    setIsChangedError("");

    dispatch({ type: "CLEAR_ASSET_NAME_ERROR" });
    if (value === "") {
      setAssetName(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        assetName: "Asset name cannot be empty or spaces only",
      }));
      return;
    }

    if (value.trim() !== "") {
      setAssetName(value);
      setErrors((prevErrors) => ({ ...prevErrors, assetName: "" }));
    }
  };

  const handleVendorNameChange = (e) => {
    setVendorName(e.target.value);
    setIsChangedError("");
    setGeneralError("");
  };

  const handleBrandNameChange = (e) => {
    const value = e.target.value;
    setIsChangedError("");
    setGeneralError("");

    if (value === "") {
      setBrandName(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        brandName: "Brand name cannot be empty or spaces only",
      }));
      return;
    }

    if (value.trim() !== "") {
      setBrandName(value);
      setErrors((prevErrors) => ({ ...prevErrors, brandName: "" }));
    }
  };

  const handleSerialNumberChange = (e) => {
    const value = e.target.value;
    setSerialNumberError("");
    dispatch({ type: "CLEAR_SERIAL_NUMBER_ERROR" });
    setIsChangedError("");
    setGeneralError("");
    if (value === "") {
      setSerialNumber(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        serial_Number: "Serial number cannot be empty or spaces only",
      }));
      return;
    }

    if (value.trim() !== "") {
      setSerialNumber(value);
      setErrors((prevErrors) => ({ ...prevErrors, serial_Number: "" }));
    }
  };

  const handleProductCountChange = (e) => {
    setProductCount(e.target.value);
  };

  const handlePurchaseDateChange = (e) => {
    setPurchaseDate(e.target.value);
  };

  const handlePriceChange = (e) => {
    const price = e.target.value;
    setPrice(price);

    setPriceError("");
    setIsChangedError("");
    setGeneralError("");
  };

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setGeneralError("");
    setProductNameError("");
    setIsChangedError("");

    if (value === "") {
      setProductName(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        productName: "Product name cannot be empty or spaces only",
      }));
      return;
    }

    if (value.trim() !== "") {
      setProductName(value);
      setErrors((prevErrors) => ({ ...prevErrors, productName: "" }));
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
    ) {
      setGeneralError("Please enter all mandatory fields");
      return;
    }

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
      setPaymentError("Please Enter payment type");

      // return;
    }
    if (modeOfPayment == "Net Banking" && !account) {
      setAccountError("Please Choose Bank Account");
      return;
    }
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
        "No changes detected. Please make some changes before saving."
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
          bank_id: account,
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

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (selectedDates) => {
    setSelectedDateError("");
    setIsChangedError("");
    //    const date = selectedDates[0];
    // const formatedDate = formatDateForPayload(date);
    setSelectedDate(selectedDates[0]);
  };

  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Dialog
          style={{ maxWidth: "100%", width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {currentItem ? "Edit an asset" : "Add an asset"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} />
          </Modal.Header>

          {isChangedError && (
            <div className="d-flex align-items-center p-1 mt-4">
              <MdError style={{ color: "red", marginRight: "5px" }} />
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
          {generalError && (
            <div className="d-flex align-items-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {generalError}
              </label>
            </div>
          )}

          {state.AssetList?.alreadyAssetNameHere && (
            <div className="d-flex align-items-center p-1">
              <MdError style={{ color: "red", marginRight: "5px" }} />
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
          <Modal.Body style={{ padding: 20 }}>
            <div className="row mt-1">
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
                    Asset Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={assetName}
                    onChange={handleAssetNameChange}
                    type="text"
                    placeholder="Enter name"
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
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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
                    Product Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={productName}
                    onChange={handleProductNameChange}
                    type="text"
                    placeholder="Enter name"
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
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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
                    }}
                  >
                    Vendor Name
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={vendorName}
                    onChange={handleVendorNameChange}
                    className=""
                    id="vendor-select"
                    style={{ fontWeight: vendorName ? 600 : 500 }}
                  >
                    <option>Select a vendor</option>
                    {state.ComplianceList.VendorList &&
                      state.ComplianceList.VendorList.map((view) => (
                        <>
                          <option key={view.id} value={view.id}>
                            {view.Vendor_Name}
                          </option>
                        </>
                      ))}
                  </Form.Select>
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
                    <span style={{ color: "white", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={brandName}
                    onChange={handleBrandNameChange}
                    type="text"
                    placeholder="Enter name"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: brandName ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
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
                    Serial Number{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={serialNumber}
                    onChange={handleSerialNumberChange}
                    type="text"
                    placeholder="Enter number"
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
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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

              {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Product Count</Form.Label>
                                    <Form.Control
                                        value={productCount}
                                        onChange={handleProductCountChange}
                                        type="text" placeholder="Enter count" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: productCount ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div> */}

              {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Purchase Date <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                   
                                    <div style={{ position: 'relative' }}>
                                        <label
                                            htmlFor="date-input"
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                borderRadius: 8,
                                                padding: 12,
                                                fontSize: 14,
                                                fontFamily: "Gilroy",
                                                fontWeight: selectedDate ? 600 : 500,
                                                color: "#222222",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                            onClick={() => {
                                                if (calendarRef.current) {
                                                    calendarRef.current.flatpickr.open();
                                                }
                                            }}
                                        >
                                            {selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                                            <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                                        </label>
                                        <Flatpickr
                                            ref={calendarRef}
                                            options={options}
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            style={{
                                                padding: 15,
                                                fontSize: 16,
                                                width: "100%",
                                                borderRadius: 8,
                                                border: "1px solid #D9D9D9",
                                                position: 'absolute',
                                                top: 100,
                                                left: 100,
                                                zIndex: 1000,
                                                display: "none"
                                            }}
                                        />
                                    </div>
                                </Form.Group>

                                {selectedDateError && (
                                    <div className="d-flex align-items-center p-1">
                                        <MdError style={{ color: "red", marginRight: '5px' }} />
                                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                            {selectedDateError}
                                        </label>
                                    </div>
                                )}

                            </div> */}

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group className="mb-2" controlId="purchaseDate">
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
                  <div style={{ position: "relative", width: "100%" }}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setGeneralError("");
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
                  </div>
                </Form.Group>
                {selectedDateError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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
                    Price{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={price}
                    onChange={handlePriceChange}
                    type="text"
                    placeholder="Enter amount"
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
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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
                    Mode of payment{" "}
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
                    aria-label="Default select example"
                    value={modeOfPayment}
                    onChange={handleModeOfPaymentChange}
                    disabled={currentItem}
                    className=""
                    id="vendor-select"
                    style={{
                      fontSize: 14,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: modeOfPayment ? 600 : 500,
                    }}
                  >
                    <option value="">Select mode of payment</option>
                    <option value="UPI/BHIM">UPI/BHIM</option>
                    <option value="CASH">CASH</option>
                    <option value="Net Banking">Net Banking</option>
                  </Form.Select>
                </Form.Group>
                {paymentError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
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
              </div>

              {modeOfPayment === "Net Banking" && (
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
                  <Form.Select
                    aria-label="Default select example"
                    placeholder="Select no. of floor"
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
                    id="form-selects"
                    className="border"
                    value={account}
                    onChange={(e) => handleAccount(e)}
                    disabled={currentItem}
                  >
                    <option value="">Select Account</option>
                    {state.bankingDetails?.bankingList?.banks?.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.bank_name}
                      </option>
                    ))}
                  </Form.Select>
                  {accountError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px" }} />
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
              )}
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
          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              onClick={handleAddAsset}
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 500,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
            >
              {currentItem ? "Save Changes" : "Add  asset"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

export default StaticExample;
