/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css";
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import ErrorMessage from '../../Components/ErrorMessage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customSelectStyles } from "../../Utils/SelectStyles"

function StaticExample({ show, currentItem, setShowModal }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const customContainerRef = useRef();
  const [assetName, setAssetName] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
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
  // const [netPaymentError, setNetPaymentError] = useState("")
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const calendarRef = useRef(null);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [initialState, setInitialState] = useState({
    assetName: "",
    vendorName: "",
    selectedDate: "",
    totalPrice: "",
    category: "",
    modeOfPayment: "",
    description: "",
    count: "",
    hostelName: "",
    account: "",
  });



  useEffect(() => {
    if (state.ExpenseList.insufficiantFundError) {
      setFormLoading(false)
    }
  }, [state.ExpenseList.insufficiantFundError])



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
      setTotalPrice((currentItem && currentItem.unit_amount) || "");
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
        totalPrice: currentItem.unit_amount || "",
        category: currentItem.category_id || "",
        modeOfPayment: Number(currentItem.payment_mode) || "",
        description: currentItem.description || "",
        count: currentItem.unit_count || "",
        hostelName: currentItem.hostel_id || "",
      });
    }
  }, [currentItem]);








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

  useEffect(() => {
    if (category) {
      const selectedCat = state.ExpenseList?.getInitializeExpenseList?.listExpenses.find(
        (cat) => cat.categoryId === category
      );

      setSubCategoryList(
        selectedCat?.subCategories.map((sub) => ({
          value: sub.subCategoryId,
          label: sub.subCategoryName,
        })) || []
      );
      const categoryHasSubCategory = selectedCat?.subCategories?.length > 0;
  

      if (categoryHasSubCategory && !subCategory) {
        setSubCategoryError("Please Select SubCategory");
      } else {
        setSubCategoryError("");
      }

      setSubCategory("");
    }

  }, [category])



  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;
    dispatch({ type: 'REMOVE_BANK_INSUFFICIANT_FUND_ERROR' })
    setModeOfPayment(selectedOption);
    setGeneralError("");
    setPaymentError("");
    setIsChangedError("");
    // setNetPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };








  const handlePriceChange = (e) => {
    dispatch({ type: 'REMOVE_BANK_INSUFFICIANT_FUND_ERROR' })
    const value = e.target.value;
    setGeneralError("");
    setPriceError("");
    setIsChangedError("");
    // setNetPaymentError("")

    if (/^\d*\.?\d*$/.test(value)) {
      setTotalPrice(value);
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

    const selectedCategoryObj = state.ExpenseList?.getInitializeExpenseList?.listExpenses.find(
      (cat) => cat.categoryId === category
    );

    const categoryHasSubCategory = selectedCategoryObj?.subCategories?.length > 0;

    if (categoryHasSubCategory && !subCategory) {
      setSubCategoryError("Please Select SubCategory");
      hasError = true;
    }


    if (!selectedDate) {
      setDateError("Please Select Purchase Date");
      hasError = true;
    }

    // if (selectedDate) {
    //   const selectedHostel = state?.UsersList?.hotelDetailsinPg[0]
    //   if (selectedHostel) {
    //     const HostelCreateDate = new Date(selectedHostel.create_At);
    //     const ExpenseDate = new Date(selectedDate);
    //     const HostelCreateDateOnly = new Date(HostelCreateDate.toDateString());
    //     const ExpenseDateOnly = new Date(ExpenseDate.toDateString());
    //     if (ExpenseDateOnly < HostelCreateDateOnly) {
    //       setJoingDateErrmsg('Before Hostel Create date not allowed');
    //       hasError = true;

    //     } else {
    //       setJoingDateErrmsg('');
    //     }
    //   }
    // }


    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Transaction");
      hasError = true;
    }

    if (!totalPrice) {
      setPriceError("Please Enter Valid Total Amount");
      hasError = true;
    } else if (isNaN(totalPrice) || totalPrice <= 0) {
      setPriceError("Price Must be a Positive Number");
      hasError = true;
    }

    // if (!count) {
    //   setCountError("Please Enter Valid Unit Count");
    //   hasError = true;
    // } else 

    if (count !== "" && (isNaN(count) || Number(count) <= 0)) {
      setCountError("Unit Count Must be a Positive Number");
      hasError = true;
    } else {
      setCountError(""); 
    }






    const isChanged =
      initialState.assetName !== assetName ||
      initialState.vendorName !== vendorName ||
      (initialState.selectedDate && selectedDate &&
        moment(initialState.selectedDate).format("YYYY-MM-DD") !==
        moment(selectedDate).format("YYYY-MM-DD")) ||
      Number(initialState.totalPrice) !== Number(totalPrice) ||
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

    const formattedDate = moment(selectedDate).format("DD-MM-YYYY");
    dispatch({
      type: "ADDEXPENSE",
      payload: {
        categoryId: category,
        subCategory: subCategory ? Number(subCategory) : null,
        purchaseDate: formattedDate,
        count: Number(count) || 1 ,
        totalAmount: Number(totalPrice),
        description: description,
        bankId: modeOfPayment,
        hostelId: state.login.selectedHostel_Id,
      },
    });
    setFormLoading(true)
  };



  const handleSubCategoryChange = (selectedOption) => {
    setSubCategory(selectedOption?.value || "");
    setSubCategoryError("");
    setGeneralError("");
    setIsChangedError("");
  };






  const handleClose = () => {
    dispatch({ type: 'REMOVE_BANK_INSUFFICIANT_FUND_ERROR' })
    setShowModal(false);
    // setNetPaymentError("")
    setJoingDateErrmsg("")
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });

  }

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])



  useEffect(() => {
    dispatch({ type: 'INITIALIZEEXPENSESLIST', payload: state.login.selectedHostel_Id })
  }, [])

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (state.ExpenseList?.getInitializeExpenseStatusCode === 200) {
      const expenses = state.ExpenseList?.getInitializeExpenseList?.listExpenses || [];
      if (expenses?.length === 0 && !hasShownToast.current) {

        toast.error(
          "Please add a Category option in Settings, accessible after adding an expense",
          {
            style: {
              fontFamily: "Gilroy, sans-serif",
            },
          });
        hasShownToast.current = true;

      }
      setTimeout(() => {
        dispatch({ type: 'REMOVE_INITIALIZE_EXPENSES_LIST' })
      }, 100)
    }
  }, [state.ExpenseList?.getInitializeExpenseStatusCode]);


  const expenseOptions =
    state.ExpenseList?.getInitializeExpenseList?.listExpenses?.map((item) => ({
      value: item.categoryId,
      label: item.categoryName,
    })) || [];







  const paymentOptions = Array.isArray(state.ExpenseList?.getInitializeExpenseList?.banks)
    ? state.ExpenseList.getInitializeExpenseList.banks.map((item) => {
      const typeLabelMap = { bank: "Bank", upi: "UPI", card: "Card", cash: "Cash" };
      return {
        value: item.bankId,
        label: `${item.holderName} - ${item.bankName || typeLabelMap[item.type]}`,
        type: item.type,
      };
    })
    : [];

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modals-style" backdrop="static" >
        <Modal.Dialog
          className="m-0 p-0"
          style={{ margin: "0 0px" }}
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
            <ErrorMessage message={generalError} type="error" />
          )}

          <Modal.Body style={{ maxHeight: "380px", overflowY: "scroll", padding: 20 }} className="show-scroll pt-1 mt-2 me-1">
            <div className="row" style={{}}>



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
                    Category {" "}
                    <span style={{ color: "#FF0000", display: "inline-block", fontSize: "20px" }}>
                      *
                    </span>
                  </Form.Label>



                  <Select
                    className="custom"
                    options={expenseOptions}
                    onChange={handleCategoryChange}
                    value={
                      category
                        ? expenseOptions.find((opt) => opt.value === category) || null
                        : null
                    }
                    placeholder="Select a Category"
                    classNamePrefix="custom"
                    styles={customSelectStyles(category)}
                    noOptionsMessage={() => "No category available"}
                  />


                </Form.Group>
                {categoryError && (
                  <ErrorMessage message={categoryError} type="error" />
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
                    }}
                  >
                    SubCategory {" "}{
                      subCategoryList.length > 0 ?

                        <span style={{ color: "#FF0000", display: "inline-block", fontSize: "20px" }}>
                          *
                        </span>
                        :
                        <span style={{ visibility: "hidden", fontSize: 20 }}>*</span>
                    }
                  </Form.Label>



                  <Select
                    options={subCategoryList}
                    onChange={handleSubCategoryChange}
                    value={
                      subCategory
                        ? subCategoryList.find((opt) => opt.value === subCategory) || null
                        : null
                    }
                    placeholder="Select a Category"
                    classNamePrefix="custom"
                    styles={{
                      control: (base) => ({
                        ...base,
                        fontSize: "16px",
                        color: "4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: subCategory ? 600 : 500,
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
                    noOptionsMessage={() => "No sub category available"}
                  />


                </Form.Group>
                {subCategoryError && (
                  <ErrorMessage message={subCategoryError} type="error" />
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
                    Purchase Date {" "}
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
                        setJoingDateErrmsg("")
                        setSelectedDate(date ? date.toDate() : null);
                      }}
                      disabledDate={(current) => current && current > dayjs().endOf("day")}
                      getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}

                    />
                  </div>
                </Form.Group>
                {dateError && (
                  <ErrorMessage message={dateError} type="error" />
                )}

                {joiningDateErrmsg.trim() !== "" && (
                  <ErrorMessage message={joiningDateErrmsg} type="error" />
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

                    }}
                  >
                    Total Amount{" "}
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
                    value={totalPrice}
                    onChange={handlePriceChange}
                    type="text"
                    placeholder="Enter Total Amount"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: totalPrice ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {priceError && (
                  <ErrorMessage message={priceError} type="error" />
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

                    }}
                  >
                    Unit Count {" "}
                    {/* <span
                      style={{
                        color: "#FF0000",
                        fontSize: "20px",
                      }}
                    >
                      *
                    </span> */}
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
                  <ErrorMessage message={countError} type="error" />
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

                    }}
                  >
                    Per Unit Amount  <span style={{ visibility: "hidden", fontSize: 20 }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={count > 0 ? totalPrice / count : 0}
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
                    Mode Of Transaction {" "}
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
                    options={paymentOptions}
                    onChange={(selectedOption) =>
                      handleModeOfPaymentChange(selectedOption?.value)
                    }

                    value={
                      modeOfPayment
                        ? paymentOptions.find((opt) => opt.value === modeOfPayment) || null
                        : null
                    }
                    placeholder="Select Payment"
                    classNamePrefix="custom"
                    isDisabled={currentItem}
                    styles={{
                      control: (base) => ({
                        ...base,
                        fontSize: 16,
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
                  <ErrorMessage message={paymentError} type="error" />
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
                    }}
                  >
                    Description {" "} <span style={{ visibility: "hidden", fontSize: 20 }}>*</span>
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

 {/* {state.createAccount?.networkError ?
             <div className="d-flex justify-content-center mt-1 mb-1">
              <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
              : null} */}


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
            <div className="d-flex align-items-center justify-content-center mb-2 mt-2">
              <ErrorMessage message={isChangedError} type="error" />
            </div>
          )}


          {state.ExpenseList.insufficiantFundError && (
            <div className="d-flex align-items-center justify-content-center  mb-2 mt-2">
              <ErrorMessage message={state.ExpenseList.insufficiantFundError} type="error" />
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
