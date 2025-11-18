/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
// import Closecircle from "../../Assets/Images/close-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import moment from "moment";
import Image from "react-bootstrap/Image";
import People from "../../Assets/Images/New_images/profile-picture.png";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { CloseCircle } from "iconsax-react";
// import addcircle from "../../Assets/Images/New_images/add-circle.png";
// import { Trash } from 'iconsax-react';
// import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import ErrorMessage from '../../Components/ErrorMessage';

const CheckOutForm = ({
  uniqueostel_Id,
  show,
  handleClose,
  currentItem,
  data,
  // checkouteditaction,
  // cofirmForm,
  // conformEdit,
  // handleCloseConformForm
}) => {


  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkOutrequestDate, setCheckOutRequestDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [comments, setComments] = useState("");
  // const [advanceamount, setAdvanceAmount] = useState("");
  // const [dueamount, SetDueAmount] = useState('');
  // const [invoicenumber, SetInvoiceNumber] = useState([]);
  const [bedname, setBedname] = useState("");
  const [floorname, setFloorname] = useState("");
  // const [paymentDate, setPaymentDate] = useState("")
  // const [fields, setFields] = useState([]);
  // const [noChangeMessage, setNoChangeMessage] = useState("");
  // const [modeOfPayment, setModeOfPayment] = useState("");
  // const errorRef = useRef(null);
  const [formLoading, setFormLoading] = useState(false)
  // const [formCheckoutLoading, setFormCheckoutLoading] = useState(false)
  // const nochangeRef = useRef(null)
  // const [errors, setErrors] = useState([]);



  const handlecloseform = () => {
    handleClose();
    setSelectedCustomer("");
    setComments("");
    setCheckOutDate("");
    setCheckOutRequestDate("");
    setBedname("");
    setFloorname("");
    setCheckOutDateError("");
    setCustomerError("");
    setCheckOutRequestDateError("");
    setDateDifference(null);
    // SetDueAmount('')
    setFormLoading(false)
    // setFormCheckoutLoading(false)

  };

  // const handleCloseConfirmFormPage = () => {

  //   if (typeof handleCloseConformForm === "function") {
  //     handleCloseConformForm();
  //   }
  //   dispatch({ type: 'CLEAR_ADD_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
  //   dispatch({ type: 'CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR' })
  //   setConformCheckErr("")
  //   setNoChangeMessage("")
  //   setModeOfPaymentError("")

  //   setFields([{ reason: "", amount: "", }]);
  // }






  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //          dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id});
  //  }
  //  }, []);

  // const handleModeOfPaymentChange = (e) => {
  //   setModeOfPayment(e.target.value);
  //   setModeOfPaymentError("")


  // };






  const handleCustomerChange = (selectedOption) => {
    setSelectedCustomer(selectedOption ? selectedOption.value : "");

    setCustomerError("");
  };



  const handleCommentsChange = (event) => {
    setComments(event.target.value);
    // setNoChangeMessage("")
    setIsChangedError("")
  };



  const [dateDifference, setDateDifference] = useState(null);



  useEffect(() => {
    if (currentItem) {
      setCheckOutDate(
        currentItem.CheckoutDate ? new Date(currentItem.CheckoutDate) : null
      );
      setCheckOutRequestDate(
        currentItem.req_date ? new Date(currentItem.req_date) : null
      );
      setSelectedCustomer(currentItem.ID);

      setComments(currentItem.checkout_comment);
      setBedname(currentItem.bed_name);
      setFloorname(currentItem.floor_name);
    } else {
      setCheckOutDate("");
      setCheckOutRequestDate("");
      setSelectedCustomer("");

      setComments("");
      setBedname("");
      setFloorname("");
      dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    }
  }, [currentItem, show]);




  // useEffect(() => {
  //   if (data) {

  //     setCheckOutDate(data.CheckoutDate ? new Date(data.CheckoutDate) : null);
  //     setPaymentDate(data.CheckoutDate ? new Date(data.CheckoutDate) : null)
  //     setCheckOutRequestDate(data.req_date ? new Date(data.req_date) : null);
  //     setSelectedCustomer(data.ID);

  //     setComments(data.checkout_comment);
  //     setBedname(data.bed_name);
  //     setFloorname(data.floor_name);
  //     setModeOfPayment(data.bank_id)

  //   } else {
  //     setCheckOutDate("");
  //     setCheckOutRequestDate("");
  //     setSelectedCustomer("");
  //     setComments("");
  //     setBedname("");
  //     setFloorname("");
  //     setModeOfPayment("")

  //     dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
  //   }
  // }, [data, show]);






  // useEffect(() => {

  //   setFields(prevFields => {
  //     const otherFields = prevFields.filter((_, i) => i !== 0);
  //     return [
  //       { reason: "DueAmount", amount: String(dueamount || "") },
  //       ...otherFields,
  //     ];
  //   });
  // }, [dueamount]);




  // useEffect(() => {
  //   if (data?.amenities?.length > 0) {
  //     let outstandingDueAmount = "";
  //     const amenityFields = data.amenities
  //       .filter(item => {
  //         if (item.reason === "Outstanding Due") {
  //           outstandingDueAmount = String(item.amount || "");
  //           return false;
  //         }
  //         return true;
  //       })
  //       .map(item => ({
  //         id: item?.id || "",
  //         reason: item.reason || "",
  //         amount: String(item.amount || "")
  //       }));

  //     const dueAmountValue = outstandingDueAmount || String(dueamount || "");

  //     setFields([
  //       { id: "", reason: "DueAmount", amount: dueAmountValue },
  //       ...amenityFields,
  //     ]);
  //   }
  // }, [data?.amenities, dueamount]);


  useEffect(() => {

    if (selectedCustomer && !data && !currentItem) {
      const filteruserlist = state.UsersList.Users?.filter(
        (u) => u.ID === selectedCustomer
      );


      if (filteruserlist && filteruserlist.length > 0) {
        const user = filteruserlist[0];

        if (user.Bed !== undefined && user.Bed !== null) {
          setBedname(user.Bed);
        }

        if (user.bed_name !== undefined && user.bed_name !== null) {
          setBedname(user.bed_name);
        }

        setFloorname(filteruserlist[0].floor_name);

        if (user.floor_name !== undefined && user.floor_name !== null) {
          setFloorname(user.floor_name);
        }
      }
    }
  }, [selectedCustomer, state.UsersList.Users, data, currentItem]);

  const [customerWError, setCustomerError] = useState("");
  const [checkoUtDateError, setCheckOutDateError] = useState("");
  const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");




  const handleCheckOutCustomer = () => {

    dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    const formattedDate = moment(checkOutDate, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const formattedrequestDate = moment(
      checkOutrequestDate,
      "DD-MM-YYYY"
    ).format("YYYY-MM-DD");



    if (!selectedCustomer) {
      setCustomerError("Please Select Tenant");

    }



    if (!checkOutDate) {
      setCheckOutDateError("Please Select  Check-Out Date");

    }

    if (!checkOutrequestDate) {
      setCheckOutRequestDateError("Please Select  Request Date");

    }

    if (!selectedCustomer || !checkOutDate || !checkOutrequestDate) {
      return;
    }

    const reqDate = new Date(
      moment(checkOutrequestDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    const outDate = new Date(
      moment(checkOutDate, "DD-MM-YYYY").format("YYYY-MM-DD")
    );

    reqDate.setHours(0, 0, 0, 0);
    outDate.setHours(0, 0, 0, 0);

    if (outDate < reqDate) {
      setCheckOutDateError("Before Request Date not allowed");
      return;
    }




    const formatDateTocheckoutDate = (startdate) => {
      if (!startdate) return "";
      const d = new Date(startdate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateToRequestDate = (enddate) => {
      if (!enddate) return "";
      const d = new Date(enddate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const isChanged = (() => {
      const isCheckoutDateChanged =
        formatDateTocheckoutDate(currentItem?.CheckoutDate) !==
        formatDateTocheckoutDate(checkOutDate);
      const isRequestDateChanged =
        formatDateToRequestDate(currentItem?.req_date) !==
        formatDateToRequestDate(checkOutrequestDate);
      const isCommentsChanged =
        (comments || "") !== (currentItem?.checkout_comment || "");

      return isCheckoutDateChanged || isRequestDateChanged || isCommentsChanged;
    })();

    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      return;
    }

    if (
      selectedCustomer ||
      (currentItem?.ID &&
        formattedDate &&
        formattedrequestDate &&
        uniqueostel_Id) ||
      currentItem?.Hostel_Id
    ) {
      dispatch({
        type: "ADDCHECKOUTCUSTOMER",
        payload: {
          checkout_date: formattedDate,
          user_id: selectedCustomer || currentItem?.ID,
          hostel_id: uniqueostel_Id || currentItem?.Hostel_Id,
          comments: comments,
          action: currentItem ? 2 : 1,
          req_date: formattedrequestDate,
        },
      });
      setFormLoading(true)
    }
    setSelectedCustomer("");

    setComments("");
    setCheckOutDate("");
    setCheckOutRequestDate("");
    setBedname("");
    setFloorname("");
    setCheckOutDateError("");

    setCustomerError("");
    setCheckOutRequestDateError("");
    setDateDifference(null);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: "50px",
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
      display: "inline-block",
      fill: "currentColor",
      lineHeight: 1,
      stroke: "currentColor",
      strokeWidth: 0,
      cursor: "pointer"
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
      color: "#000",
    }),
  };


  const formatOptions = () => {
    return state.UsersList?.availableCheckOutCustomerList.map((user) => ({
      value: user.ID,
      label: (
        <div className="d-flex align-items-center">
          <Image
            src={
              user.profile && user.profile !== "0" && user.profile.trim() !== ""
                ? user.profile
                : People
            }
            roundedCircle
            style={{ height: "30px", width: "30px", marginRight: "10px" }}
          />
          <span>{user.Name}</span>
        </div>
      ),
    }));
  };

  useEffect(() => {
    if (uniqueostel_Id) {
      dispatch({
        type: "AVAILABLECHECKOUTCUSTOMER",
        payload: { hostel_id: uniqueostel_Id },
      });
    }
  }, [uniqueostel_Id]);

  useEffect(() => {
    if (selectedCustomer && data) {
      dispatch({
        type: "GETCONFIRMCHECKOUTCUSTOMER",
        payload: { id: selectedCustomer, hostel_id: data.Hostel_Id },
      });
    }
  }, [selectedCustomer, data]);





  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 2000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);


  useEffect(() => {
    if (state.UsersList.errorMessageAddCheckOut) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 2000);
    }
  }, [state.UsersList.errorMessageAddCheckOut]);


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])








  return (
    <>
      <Modal show={show} onHide={handlecloseform} centered backdrop="static"
        style={{
          width: "100%",
          paddingRight: "10px",
          borderRadius: "30px",
        }}>
        <Modal.Dialog
          style={{
            minWidth: 500,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Header className="d-flex justify-content-between align-items-center">
            <Modal.Title
              style={{
                fontWeight: "600",
                fontSize: "18px",
                fontFamily: "Gilroy",
              }}
            >
              Add Check-Out
            </Modal.Title>
            <CloseCircle size="24" color="#000" onClick={handlecloseform}
              style={{ cursor: 'pointer' }} />
          </Modal.Header>

          <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll pt-0 mt-2 me-3">
            <div >
              <div className="d-flex align-items-center">
                <div className="row row-gap-2">

                  <div className="col-lg-12 col-md-12 col-sm-12 colxs-12">
                    <div className="form-group">
                      <label
                        className="mt-2"
                        style={{
                          fontSize: 14,
                          color: "rgba(75, 75, 75, 1)",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Customer {" "}
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </label>
                      <Select
                        styles={customStyles}
                        value={formatOptions().find(
                          (opt) => opt.value === selectedCustomer
                        )}
                        onChange={handleCustomerChange}
                        options={formatOptions()}
                        placeholder="Select a customer"
                        classNamePrefix="custom"
                        menuPlacement="auto"


                      />

                      {customerWError && (

                        <ErrorMessage message={customerWError} type="error" />
                      )}
                    </div>
                  </div>


                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Current Floor {" "}

                      </Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder="Current Floor"
                        type="text"
                        value={floorname}

                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #E7F1FF",
                          height: 50,
                          borderRadius: 8,
                          backgroundColor: "#E7F1FF",
                        }}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Current Bed {" "}
                      </Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder="Current Bed"
                        type="text"
                        value={bedname}

                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #E7F1FF",
                          height: 50,
                          borderRadius: 8,
                          backgroundColor: "#E7F1FF",
                        }}
                      />
                    </Form.Group>
                  </div>



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
                        Request Date {" "}
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </Form.Label>


                      <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy",
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={checkOutrequestDate ? dayjs(checkOutrequestDate) : null}
                          onChange={(date) => {
                            setCheckOutRequestDateError("");
                            setIsChangedError("");
                            setCheckOutRequestDate(date ? date.toDate() : null);
                          }}
                          disabledDate={(current) => current && current > dayjs().endOf("day")}



                          getPopupContainer={() =>
                            document.body
                          }

                        />

                      </div>
                    </Form.Group>
                    {checkoUtrequestDateError && (
                      <ErrorMessage message={checkoUtrequestDateError} type="error" />
                    )}
                  </div>

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
                        Check-Out Date {" "}
                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                      </Form.Label>



                      <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>

                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy",
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={checkOutDate ? dayjs(checkOutDate) : null}
                          onChange={(date) => {
                            setCheckOutDateError('');
                            setIsChangedError("");
                            setCheckOutDate(date ? date.toDate() : null);
                          }}

                          getPopupContainer={() => document.body}
                        />

                      </div>
                    </Form.Group>
                    {checkoUtDateError && (
                      <ErrorMessage message={checkoUtDateError} type="error" />
                    )}
                  </div>
                  {state.UsersList.errorMessageAddCheckOut && (
                    <ErrorMessage message={state.UsersList.errorMessageAddCheckOut} type="error" />
                  )}



                  <div className="col-lg-12 col-md-12 col-sm-12 colxs-12">
                    <label
                      htmlFor="comments"
                      className="mt-2"
                      style={{
                        fontSize: 14,
                        color: "rgba(75, 75, 75, 1)",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Comments
                    </label>
                    <input
                      type="text"
                      name="comments"
                      id="comments"
                      value={comments}
                      onChange={handleCommentsChange}
                      className="form-control mt-2 mb-3"
                      placeholder="Add Comments"
                      required
                      style={{
                        height: "50px",
                        borderRadius: "8px",
                        fontSize: 16,
                        color: comments ? "#222" : "#4b4b4b",
                        fontFamily: "Gilroy",
                        fontWeight: comments ? 600 : 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                      }}
                    />
                  </div>

                  {dateDifference !== null && (
                    <div className="col-12 mt-3">
                      <p
                        style={{
                          fontSize: 15,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#1E45E1",
                        }}
                      >
                        ( Notice Days* - {dateDifference} days )
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {isChangedError && (
              <div
                className="d-flex justify-content-center align-items-center"
              >
                <ErrorMessage message={isChangedError} type="error" />
              </div>
            )}



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
            </div>
          }
          <Modal.Footer
            className="d-flex align-items-center justify-content-center pt-0"
            style={{ border: "none" }}
          >
            <Button
              className=""
              style={{
                borderRadius: "8px",
                fontFamily: "Gilroy",
                fontWeight: "600",
                fontSize: "14px",
                padding: "16px 24px",
                width: "100%",
                backgroundColor: "#1E45E1",
              }}

              onClick={() => {
                // if (checkouteditaction) {
                //   handleCheckOutCustomer();
                // } else {
                handleCheckOutCustomer();
                // }
              }}
            >

              Add Check-Out
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>



    </>
  );
};

CheckOutForm.propTypes = {
  uniqueostel_Id: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  checkoutaction: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  checkoutaddform: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  // cofirmForm: PropTypes.func.isRequired,
  // handleCloseConformForm: PropTypes.func.isRequired,
  // conformEdit: PropTypes.func.isRequired,
};

export default CheckOutForm;
