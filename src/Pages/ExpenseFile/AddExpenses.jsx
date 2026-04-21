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
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ErrorMessage from "../../Components/ErrorMessage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customSelectStyles } from "../../Utils/SelectStyles";

function StaticExample({ show, currentItem, setShowModal }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const customContainerRef = useRef();
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
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const calendarRef = useRef(null);
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [initialState, setInitialState] = useState({
    selectedDate: "",
    totalPrice: "",
    category: "",
    subCategory: "",
    modeOfPayment: "",
    description: "",
    count: "",
    hostelName: "",
    account: "",
  });

  useEffect(() => {
    if (state.ExpenseList.insufficiantFundError) {
      setFormLoading(false);
    }
  }, [state.ExpenseList.insufficiantFundError]);

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
      const formattedDate = currentItem?.transactionDate
        ? moment(currentItem.transactionDate, "DD/MM/YYYY", true).toDate()
        : null;

      setSelectedDate(formattedDate);
      setTotalPrice(currentItem.totalAmount || "");
      setCategory(currentItem.categoryId || "");
      setSubCategory(currentItem.subCategoryId || "");
      setModeOfPayment(Number(currentItem.bankId) || "");
      setDescription(currentItem.description || "");
      setCount(currentItem.itemsCount || "");

      setInitialState({
        selectedDate: formattedDate,
        totalPrice: currentItem.totalAmount || "",
        category: currentItem.categoryId || "",
        subCategory: currentItem.subCategoryId || "",
        modeOfPayment: Number(currentItem.bankId) || "",
        description: currentItem.description || "",
        count: currentItem.itemsCount || "",
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
    setCategory(selectedOption?.value || "");
    setGeneralError("");
    setCategoryError("");
    setIsChangedError("");
    setSubCategory("");
  };

  useEffect(() => {
    if (category) {
      const selectedCat =
        state.ExpenseList?.getInitializeExpenseList?.listExpenses?.find(
          (cat) => cat.categoryId === category,
        );

      setSubCategoryList(
        selectedCat?.subCategories?.map((sub) => ({
          value: sub.subCategoryId,
          label: sub.subCategoryName,
        })) || [],
      );
      const categoryHasSubCategory = selectedCat?.subCategories?.length > 0;

      if (categoryHasSubCategory && !subCategory) {
        setSubCategoryError("Please Select SubCategory");
      } else {
        setSubCategoryError("");
      }

      // setSubCategory("");
    }
  }, [category]);

  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setModeOfPayment(selectedOption);
    setGeneralError("");
    setPaymentError("");
    setIsChangedError("");
    // setNetPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  const handlePriceChange = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    const value = e.target.value;
    setGeneralError("");
    setPriceError("");
    setIsChangedError("");
    // setNetPaymentError("")

    if (/^\d*\.?\d*$/.test(value)) {
      setTotalPrice(value);
    }
  };
  // const handleKeyDown = (e) => {
  //   if (e.key === "." || e.key === "e" || e.key === "-") {
  //     e.preventDefault();
  //   }
  // };

  // console.log("currentItem", currentItem)

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
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
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

    const selectedCategoryObj =
      state.ExpenseList?.getInitializeExpenseList?.listExpenses?.find(
        (cat) => cat.categoryId === category,
      );

    const categoryHasSubCategory =
      selectedCategoryObj?.subCategories?.length > 0;

    if (categoryHasSubCategory && !subCategory) {
      setSubCategoryError("Please Select SubCategory");
      hasError = true;
    }

    if (!selectedDate) {
      setDateError("Please Select Purchase Date");
      hasError = true;
    }

    if (!currentItem && !modeOfPayment) {
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

    if (count !== "" && (isNaN(count) || Number(count) <= 0)) {
      setCountError("Unit Count Must be a Positive Number");
      hasError = true;
    } else {
      setCountError("");
    }

    if (hasError) {
      return;
    }

    if (currentItem) {
      const isChanged =
        (initialState.selectedDate &&
          selectedDate &&
          moment(initialState.selectedDate).format("YYYY-MM-DD") !==
            moment(selectedDate).format("YYYY-MM-DD")) ||
        Number(initialState.totalPrice) !== Number(totalPrice) ||
        initialState.category !== category ||
        Number(initialState.subCategory || 0) !== Number(subCategory || 0) ||
        Number(initialState.modeOfPayment) !== Number(modeOfPayment) ||
        initialState.description !== description ||
        Number(initialState.count) !== Number(count);

      if (!isChanged) {
        setIsChangedError("No Changes Detected");
        hasError = true;
      }
    }
    if (hasError) {
      return;
    }

    const formattedDate = moment(selectedDate).format("DD-MM-YYYY");
    if (currentItem?.expenseId) {
      dispatch({
        type: "UPDATE_EXPENSE_SAGA",
        payload: {
          expenseId: currentItem?.expenseId,
          categoryId: category,
          ...(subCategory && { subCategoryId: Number(subCategory) }),
          purchaseDate: formattedDate,
          count: Number(count) || 1,
          totalAmount: Number(totalPrice),
          description: description,
          // bankId: modeOfPayment,
          hostelId: state.login.selectedHostel_Id,
        },
      });
      setFormLoading(true);
    } else {
      dispatch({
        type: "ADDEXPENSE",
        payload: {
          categoryId: category,
          subCategory: subCategory ? Number(subCategory) : null,
          purchaseDate: formattedDate,
          count: Number(count) || 1,
          totalAmount: Number(totalPrice),
          description: description,
          bankId: modeOfPayment,
          hostelId: state.login.selectedHostel_Id,
        },
      });
      setFormLoading(true);
    }
  };

  const handleSubCategoryChange = (selectedOption) => {
    setSubCategory(selectedOption?.value || "");
    setSubCategoryError("");
    setGeneralError("");
    setIsChangedError("");
  };

  const handleClose = () => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setShowModal(false);
    // setNetPaymentError("")
    setJoingDateErrmsg("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    dispatch({
      type: "INITIALIZEEXPENSESLIST",
      payload: state.login.selectedHostel_Id,
    });
  }, []);

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (state.ExpenseList?.getInitializeExpenseStatusCode === 200) {
      const expenses =
        state.ExpenseList?.getInitializeExpenseList?.listExpenses || [];
      if (expenses?.length === 0 && !hasShownToast.current) {
        toast.error(
          "Please add a Category option in Settings, accessible after adding an expense",
          {
            style: {
              fontFamily: "Gilroy, sans-serif",
            },
          },
        );
        hasShownToast.current = true;
      }
      setTimeout(() => {
        dispatch({ type: "REMOVE_INITIALIZE_EXPENSES_LIST" });
      }, 100);
    }
  }, [state.ExpenseList?.getInitializeExpenseStatusCode]);

  const expenseOptions =
    state.ExpenseList?.getInitializeExpenseList?.listExpenses?.map((item) => ({
      value: item.categoryId,
      label: item.categoryName,
    })) || [];

  const paymentOptions = Array.isArray(
    state.ExpenseList?.getInitializeExpenseList?.banks,
  )
    ? state.ExpenseList.getInitializeExpenseList.banks.map((item) => {
        const typeLabelMap = {
          bank: "Bank",
          upi: "UPI",
          card: "Card",
          cash: "Cash",
        };
        return {
          value: item.bankId,
          label: `${item.holderName} - ${item.bankName || typeLabelMap[item.type]}`,
          type: item.type,
        };
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-gilroy">
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="custom-modals-style"
        backdrop="static"
      >
        <Modal.Dialog className="m-0 p-0 max-h-[80vh] w-full max-w-lg">
          <Modal.Header className="flex items-center justify-between">
            <Modal.Title className="!text-lg !font-semibold text-[#222222] !font-gilroy">
              {currentItem ? "Edit Expense" : "Add Expense"}
            </Modal.Title>

            <CloseCircle
              size={24}
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>

          {generalError && <ErrorMessage message={generalError} type="error" />}

          <Modal.Body className="overflow-y-auto p-3 max-h-[70vh] show-scroll">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    Category{" "}
                    <span className="text-red-600 inline-block text-xl">*</span>
                  </Form.Label>

                  <Select
                    className="custom"
                    options={expenseOptions}
                    onChange={handleCategoryChange}
                    value={
                      category
                        ? expenseOptions?.find(
                            (opt) => opt.value === category,
                          ) || null
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

              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 mt-1">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    SubCategory{" "}
                    {subCategoryList.length > 0 ? (
                      <span className="text-red-600 inline-block text-xl">
                        *
                      </span>
                    ) : (
                      <span style={{ visibility: "hidden", fontSize: 20 }}>
                        *
                      </span>
                    )}
                  </Form.Label>

                  <Select
                    options={subCategoryList}
                    onChange={handleSubCategoryChange}
                    value={
                      subCategory
                        ? subCategoryList?.find(
                            (opt) => opt.value === subCategory,
                          ) || null
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
                        height: "50px",
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
                        backgroundColor: state.isFocused
                          ? "lightblue"
                          : "white",
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

              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 -mt-1">
                <Form.Group controlId="purchaseDate">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    Purchase Date{" "}
                    <span className="text-red-600 inline-block text-xl">*</span>
                  </Form.Label>

                  <div className="datepicker-wrapper relative w-full">
                    <DatePicker
                      className="w-full h-12 cursor-pointer font-gilroy"
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={selectedDate ? dayjs(selectedDate) : null}
                      onChange={(date) => {
                        setGeneralError("");
                        setDateError("");
                        setIsChangedError("");
                        setJoingDateErrmsg("");
                        setSelectedDate(date ? date.toDate() : null);
                      }}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".datepicker-wrapper")
                      }
                    />
                  </div>
                </Form.Group>
                {dateError && <ErrorMessage message={dateError} type="error" />}

                {joiningDateErrmsg.trim() !== "" && (
                  <ErrorMessage message={joiningDateErrmsg} type="error" />
                )}
              </div>

              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 -mt-1">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    Total Amount{" "}
                    <span className="text-red-600 inline-block text-xl">*</span>
                  </Form.Label>
                  <Form.Control
                    value={totalPrice}
                    onChange={handlePriceChange}
                    // onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="Enter Total Amount"
                    className={`text-base text-gray-700 font-gilroy ${totalPrice ? "font-semibold" : "font-medium"} shadow-none border border-gray-300 h-12 rounded-md`}
                  />
                </Form.Group>
                {priceError && (
                  <ErrorMessage message={priceError} type="error" />
                )}
              </div>

              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    Unit Count{" "}
                  </Form.Label>
                  <Form.Control
                    value={count}
                    onChange={handleCountChange}
                    type="text"
                    placeholder="Enter Unit Count"
                    maxLength={10}
                    className={`text-base text-gray-700 font-gilroy ${totalPrice ? "font-semibold" : "font-medium"} shadow-none border border-gray-300 h-12 rounded-md`}
                  />
                </Form.Group>
                {countError && (
                  <ErrorMessage message={countError} type="error" />
                )}
              </div>

              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    Per Unit Amount
                    {/* <span className="invisible text-xl">*</span> */}
                  </Form.Label>
                  <Form.Control
                    value={count > 0 ? (totalPrice / count).toFixed(2) : "0.00"}
                    disabled
                    type="text"
                    placeholder=""
                    className="text-base text-gray-700 font-gilroy font-semibold shadow-none border border-gray-300 h-12 rounded-md !bg-blue-100"
                  />
                </Form.Group>
              </div>
              {!currentItem && (
                <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 -mt-1">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                      Mode Of Transaction{" "}
                      <span className="text-red-600 inline-block text-xl">
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
                          ? paymentOptions?.find(
                              (opt) => opt.value === modeOfPayment,
                            ) || null
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
                      noOptionsMessage={() => "No mode available"}
                    />
                  </Form.Group>
                  {paymentError && (
                    <ErrorMessage message={paymentError} type="error" />
                  )}
                </div>
              )}

              <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                    Description{" "}
                    <span style={{ visibility: "hidden", fontSize: 20 }}>
                      *
                    </span>
                  </Form.Label>
                  <Form.Control
                    value={description}
                    onChange={handleDescriptionChange}
                    type="email"
                    placeholder="Enter description"
                    className={`text-base text-gray-700 font-gilroy ${description ? "font-semibold" : "font-medium"} shadow-none border border-gray-300 h-12 rounded-md`}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>

          {/* {state.createAccount?.networkError ?
             <div className="d-flex justify-content-center mt-1 mb-1">
              <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
              : null} */}

          {formLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
            </div>
          )}

          {currentItem && isChangedError && (
            <div className="flex items-center justify-center mb-2 mt-2">
              <ErrorMessage message={isChangedError} type="error" />
            </div>
          )}

          {state.ExpenseList.insufficiantFundError && (
            <div className="flex items-center justify-center  mb-2 mt-2">
              <ErrorMessage
                message={state.ExpenseList.insufficiantFundError}
                type="error"
              />
            </div>
          )}

          <Modal.Footer className="!border-t-0 mt-1 pt-1">
            <Button
              disabled={formLoading}
              onClick={handleAddExpenses}
              className="w-100 !bg-blue-700 !font-gilroy !font-semibold rounded-xl !text-base h-12"
            >
              {currentItem ? "Edit Expense" : "Add Expense"}
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
