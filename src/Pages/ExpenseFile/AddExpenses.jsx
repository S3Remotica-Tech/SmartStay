/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function StaticExample({ show, currentItem, setShowModal }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const customContainerRef = useRef();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [hostelName, setHostelName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [countError, setCountError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [netPaymentError, setNetPaymentError] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const calendarRef = useRef(null);
  const [initialState, setInitialState] = useState({
    assetName: "",
    vendorName: "",
    selectedDate: "",
    price: "",
    category: "",
    modeOfPayment: "",
    description: "",
    count: "",
    hostelName: "",
    account: "",
  });



  useEffect(() => {
    dispatch({
      type: "EXPENCES-CATEGORY-LIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: "ASSETLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);
  useEffect(() => {
    if (state.ExpenseList.expenceNetBanking) {
      setNetPaymentError(state.ExpenseList.expenceNetBanking)
    }
  }, [state.ExpenseList.expenceNetBanking])

  useEffect(() => {
    dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
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
      setAssetName((currentItem && currentItem.asset_id) || "");
      setVendorName((currentItem && currentItem.vendor_id) || "");
      setSelectedDate(moment(currentItem.purchase_date).toDate());
      setPrice((currentItem && currentItem.unit_amount) || "");
      setCategory((currentItem && currentItem.category_id) || "");
      setModeOfPayment((currentItem && Number(currentItem.payment_mode)) || "");
      setDescription((currentItem && currentItem.description) || "");
      setCount((currentItem && currentItem.unit_count) || "");
      setHostelName((currentItem && currentItem.hostel_id) || "");

      setInitialState({
        assetName: currentItem.asset_id || "",
        vendorName: currentItem.vendor_id || "",
        selectedDate: currentItem.purchase_date
          ? moment(currentItem.purchase_date).toDate()
          : null,
        price: currentItem.unit_amount || "",
        category: currentItem.category_id || "",
        modeOfPayment: Number(currentItem.payment_mode) || "",
        description: currentItem.description || "",
        count: currentItem.unit_count || "",
        hostelName: currentItem.hostel_id || "",
      });
    }
  }, [currentItem]);


   const getMinDate = () => {
    if (currentItem?.purchase_date) {
      return dayjs(currentItem.purchase_date).startOf("day");
    }
    return dayjs().startOf("day");
  };





  useEffect(() => {
    if (customContainerRef.current && calendarRef.current) {
      calendarRef.current.flatpickr.set({
        dateFormat: "d/m/Y",
        defaultDate: selectedDate || new Date(),
        appendTo: customContainerRef.current,
      });
    }
  }, [customContainerRef.current, selectedDate]);


  const handleCountChange = (e) => {
    setGeneralError("");
    setCountError("");
    setIsChangedError("");
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value);
    }
  };





  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption?.value || '');
    setGeneralError("");
    setCategoryError("");
    setIsChangedError("");
  };


  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setGeneralError("");
    setPaymentError("");
    setIsChangedError("");
    setNetPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };








  const handlePriceChange = (e) => {
    const value = e.target.value;
    setGeneralError("");
    setPriceError("");
    setIsChangedError("");
    setNetPaymentError("")

    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };



  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setIsChangedError("");
    setGeneralError("");

    if (value === "") {
      setDescription(value);
      return;
    }

    if (value.trim() !== "") {
      setDescription(value);
    } else {
      setDescription(value);
    }
  };

  const handleAddExpenses = () => {

    setCategoryError("");
    setDateError("");
    setCountError("");
    setPriceError("");
    setPaymentError("");
    setIsChangedError("");

    let hasError = false;

    if (!category) {
      setCategoryError("Please Select Category");
      hasError = true;
    }

    if (!selectedDate) {
      setDateError("Please Select Purchase Date");
      hasError = true;
    }

    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Transaction");
      hasError = true;
    }

    if (!price) {
      setPriceError("Please Enter Valid Unit Amount");
      hasError = true;
    } else if (isNaN(price) || price <= 0) {
      setPriceError("Price Must be a Positive Number");
      hasError = true;
    }

    if (!count) {
      setCountError("Please Enter Valid Unit Count");
      hasError = true;
    } else if (isNaN(count) || count <= 0) {
      setCountError("Unit Count Must be a Positive Number");
      hasError = true;
    }



    const isChanged =
      initialState.assetName !== assetName ||
      initialState.vendorName !== vendorName ||
      (initialState.selectedDate &&
        selectedDate &&
        initialState.selectedDate.getTime() !== selectedDate.getTime()) ||
      Number(initialState.price) !== Number(price) ||
      initialState.category !== category ||
      initialState.modeOfPayment !== modeOfPayment ||
      initialState.description !== description ||
      Number(initialState.count) !== Number(count) ||
      initialState.hostelName !== hostelName;

    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    dispatch({
      type: "ADDEXPENSE",
      payload: {
        category_id: category,
        purchase_date: formattedDate,
        unit_count: count,
        unit_amount: price,
        description: description,
        payment_mode: modeOfPayment,
        hostel_id: state.login.selectedHostel_Id,
        id: currentItem ? currentItem.id : null,
      },
    });
    setFormLoading(true)
  };











  const handleClose = () => {
    setShowModal(false);
    setNetPaymentError("")
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });

  }


  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" backdrop="static" >
        <Modal.Dialog
                   className="m-0 p-0"
                   style={{ minWidth: "550px", margin: "0 0px" }}
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
              {currentItem ? "Edit Expense" : "Add Expense"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Modal.Header>



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

          <Modal.Body style={{ maxHeight: "380px",overflowY: "scroll", padding: 20 }} className="show-scroll mt-3 me-1">
            <div className="row" style={{ marginTop: "-20px" }}>

              {state.Settings.Expences.data &&
                state.Settings.Expences.data.length === 0 && (

                  <div className="d-flex align-items-center mb-2">
                    <MdError style={{ color: "red", marginRight: "6px", fontSize: "16px", marginBottom: "26px" }} />
                    <label
                      className="pb-1 mb-0"
                      style={{
                        fontSize: 14,
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Please add a Category option in Settings, accessible after adding an expenses.
                    </label>
                  </div>

                )}

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
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
                    Category{" "}
                    <span style={{ color: "#FF0000", display: "inline-block", fontSize: "20px" }}>
                      *
                    </span>
                  </Form.Label>



                  <Select
                    options={
                      state.Settings.Expences.data && state.Settings.Expences.data.length > 0
                        ? state.Settings.Expences.data.map((view) => ({
                          value: view.category_Id,
                          label: view.category_Name,
                        }))
                        : []
                    }
                    onChange={handleCategoryChange}
                    value={
                      category
                        ? {
                          value: category,
                          label:
                            state.Settings.Expences.data.find(
                              (view) => view.category_Id === category
                            )?.category_Name || "Select a Category",
                        }
                        : null
                    }
                    placeholder="Select a Category"
                    classNamePrefix="custom"
                    styles={{
                      control: (base) => ({
                        ...base,
                        fontSize: "16px",
                        color: "rgba(75, 75, 75, 1)",
                        fontFamily: "Gilroy",
                        fontWeight: category ? 600 : 500,
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        boxShadow: "none",
                        height: "50px"
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
                    noOptionsMessage={() => "No category available"}
                  />


                </Form.Group>
                {categoryError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {categoryError}
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



                  <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                    <DatePicker
                      style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={selectedDate ? dayjs(selectedDate) : null}
                      onChange={(date) => {
                        setGeneralError("");
                        setDateError("");
                        setIsChangedError("");
                        setSelectedDate(date ? date.toDate() : null);
                      }}
                      getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                       disabledDate={(current) =>
                         current && current < getMinDate()
                             }
                    />
                  </div>
                </Form.Group>
                {dateError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {dateError}
                    </label>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginTop: "5px",
                    }}
                  >
                    Unit Count{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={count}
                    onChange={handleCountChange}
                    type="text"
                    placeholder="Enter Unit Count"
                    maxLength={10}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: count ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {countError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {countError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginTop: "5px",
                    }}
                  >
                    Per Unit Amount{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={price}
                    onChange={handlePriceChange}
                    type="text"
                    placeholder="Enter Unit Amount"
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
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
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
                      marginTop: "15px",
                    }}
                  >
                    Purchase Amount
                  </Form.Label>
                  <Form.Control
                    value={count * price}
                    disabled
                    type="text"
                    placeholder=""
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                      backgroundColor: "#E7F1FF",
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginTop: "5px",
                    }}
                  >
                    Mode Of Transaction{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>


                  <Select
                    options={
                      Array.isArray(state.bankingDetails?.bankingList?.banks)
                        ? state.bankingDetails.bankingList.banks.map((item) => {
                          let label = "";
                          if (item.type === "bank") label = "Bank";
                          else if (item.type === "upi") label = "UPI";
                          else if (item.type === "card") label = "Card";
                          else if (item.type === "cash") label = "Cash";

                          return {
                            value: item.id,
                            label: `${item.benificiary_name} - ${label}`,
                          };
                        })
                        : []
                    }
                    onChange={(selectedOption) =>
                      handleModeOfPaymentChange(selectedOption?.value)
                    }
                    value={
                      modeOfPayment
                        ? (() => {
                          const selected = state.bankingDetails?.bankingList?.banks.find(
                            (item) => item.id === modeOfPayment

                          );
                          if (!selected) return null;

                          const labelMap = {
                            bank: "Bank",
                            upi: "UPI",
                            card: "Card",
                            cash: "Cash",
                          };
                          return {
                            value: selected.id,
                            label: `${selected.benificiary_name} - ${labelMap[selected.type]}`,
                          };
                        })()
                        : null
                    }

                    placeholder="Select Payment"
                    classNamePrefix="custom"
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
                    noOptionsMessage={() => "No mode available"}
                  />

                </Form.Group>
                {paymentError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        whiteSpace: "nowrap"
                      }}
                    >
                      {paymentError}
                    </label>
                  </div>
                )}
              </div>


              <div className="col-lg-12 col-md-12  col-sm-12 col-xs-12">
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
                    Description
                  </Form.Label>
                  <Form.Control
                    value={description}
                    onChange={handleDescriptionChange}
                    type="email"
                    placeholder="Enter description"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: description ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>



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
            </div>}






          {currentItem && isChangedError && (
            <div className="d-flex align-items-center justify-content-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
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


          {netPaymentError && (
            <div className="d-flex align-items-center justify-content-center p-1 mb-2 mt-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {netPaymentError}
              </label>
            </div>
          )}


          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              onClick={handleAddExpenses}
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
              {currentItem ? "Save Changes" : "Add Expense"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
StaticExample.propTypes = {
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StaticExample;
