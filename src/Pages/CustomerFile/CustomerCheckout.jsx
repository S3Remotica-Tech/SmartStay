/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, ModalBody } from "react-bootstrap";
// import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import ErrorMessage from "../../Components/ErrorMessage";

function CustomerCheckout(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [requestDate, setRequestDate] = useState(null);
  const [dateDifference, setDateDifference] = useState(null);
  const [comments, setComments] = useState("");
  const [checkoUtDateError, setCheckOutDateError] = useState("");
  const [joiningError, setJoiningError] = useState("");
  const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState("");
  // const [lastDate, setLastDate] = useState("");
  const [joiningdate, setJoiningDate] = useState("");

  // useEffect(() => {
  //   if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
  //     const customerData = state.UsersList.customerdetails?.data?.[0]
  //     const invoiceDetails = state.UsersList.customerdetails?.invoice_details;

  //     if (customerData?.joining_Date) {
  //       const joining = new Date(customerData.joining_Date);
  //       const formattedJoining = `${String(joining.getDate()).padStart(2, "0")}-${String(
  //         joining.getMonth() + 1
  //       ).padStart(2, "0")}-${joining.getFullYear()}`;
  //       setJoiningDate(formattedJoining);
  //     } else {
  //       setJoiningDate("");
  //     }

  //     // if (invoiceDetails && invoiceDetails.length > 0) {
  //     //   const dates = invoiceDetails.map((item) => item.Date).filter(Boolean);
  //     //   if (dates.length > 0) {
  //     //     const maxDate = new Date(Math.max(...dates.map((d) => new Date(d))));
  //     //     const formatted = `${String(maxDate.getDate()).padStart(2, "0")}-${String(
  //     //       maxDate.getMonth() + 1
  //     //     ).padStart(2, "0")}-${maxDate.getFullYear()}`;
  //     //   // setLastDate(formatted);
  //     //   } else {
  //     //     // setLastDate("");
  //     //   }
  //     // } else {
  //     //   // setLastDate("");
  //     // }

  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
  //     }, 1000);
  //   }
  // }, [state.UsersList.CustomerdetailsgetStatuscode]);

  // console.log("props.bedData", props.bedData?.joiningDate);

  useEffect(() => {
    if (
      props.bedData.actualJoining ||
      props.bedData?.joiningDate ||
      props.bedData.currentTenantInfo?.[0].joiningDate ||
      props.bedData?.hostelInfo?.joiningDate
    ) {
      setJoiningDate(
        props.bedData.actualJoining ||
          props.bedData.currentTenantInfo?.[0].joiningDate ||
          props.bedData?.joiningDate ||
          props.bedData?.hostelInfo?.joiningDate,
      );
    }
  }, [
    props.bedData.actualJoining,
    props.bedData.currentTenantInfo,
    props.bedData?.joiningDate,
    props.bedData?.hostelInfo?.joiningDate,
  ]);

  const handleCloseCheckout = () => {
    dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });
    props.setCustomerCheckoutpage(false);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const calculateDateDifference = (checkoutDate, reqDate) => {
    if (checkoutDate && reqDate) {
      const diffInMs = checkoutDate - reqDate;
      const diffInDays =
        Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24)) + 1;
      setDateDifference(diffInDays);
    } else {
      setDateDifference(null);
    }
  };

  const handleCheckOutCustomer = () => {
    dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });

    if (!selectedDate || !requestDate) {
      if (!selectedDate) {
        setCheckOutDateError("Please Select Check-Out Date");
      }
      if (!requestDate) {
        setCheckOutRequestDateError("Please Select Request Date");
      }
      return;
    }

    if (dayjs(selectedDate).isBefore(dayjs(requestDate))) {
      setCheckOutDateError("Before Request Date not allowed");
      return;
    }

    const formattedDate = dayjs(selectedDate).isValid()
      ? dayjs(selectedDate).format("DD-MM-YYYY")
      : null;

    const formattedrequestDate = dayjs(requestDate).isValid()
      ? dayjs(requestDate).format("DD-MM-YYYY")
      : null;
    const customerId =
      props.bedData?.currentTenantInfo?.[0].tenetId ||
      props.bedData?.customerId ||
      props.bedData?.apiCall?.customerId;

    if (customerId && formattedDate && formattedrequestDate) {
      dispatch({
        type: "ADDCHECKOUTCUSTOMER",
        payload: {
          customerId: customerId,
          hostelId: props.bedData?.hostelId || state.login.selectedHostel_Id,
          requestDate: formattedrequestDate,
          checkoutDate: formattedDate,
          reason: comments,
        },
      });

      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList.errorMessageAddCheckOut) {
      setFormLoading(false);
    }
  }, [state.UsersList.errorMessageAddCheckOut]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      handleCloseCheckout();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 1000);
    }
  }, [state.UsersList?.accessRestrictionError]);

  // console.log("props.bedData", props.bedData);

  const tenant = props.bedData?.currentTenantInfo?.[0] || props.bedData;

  const profilePic = tenant?.profilePic;
  const isImage =
    typeof profilePic === "string" &&
    (profilePic.startsWith("http") || profilePic.startsWith("blob:"));

  return (
    <>
      <div>
        <Modal
          show={props.customerCheckoutpage}
          onHide={handleCloseCheckout}
          backdrop="static"
          centered
        >
          <Modal.Dialog className="m-0 p-0 pr-2.5 rounded-full">
            <Modal.Header className="relative">
              <div className="flex flex-col">
                <div className="text-xl font-gilroy font-semibold">
                  Move to Notice Period
                </div>
                {dateDifference !== null && (
                  <div className="w-full mt-1">
                    <p className="text-sm font-gilroy font-medium text-[#1E45E1] mb-0">
                      Notice Days* : {dateDifference}
                    </p>
                  </div>
                )}
              </div>
              <CloseCircle
                size="24"
                color="#000"
                onClick={handleCloseCheckout}
                className="cursor-pointer"
              />
            </Modal.Header>

            <Modal.Body className="-mt-1 relative">
              {formLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                  <div className="w-10 h-10 border-4 border-blue-700 border-r-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16">
                    {isImage ? (
                      <Image
                        src={profilePic}
                        alt="Profile"
                        className="h-16 w-16 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = Profiles;
                        }}
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gray-200 text-gray-700 flex justify-center items-center text-xl font-semibold">
                        {profilePic ||
                          tenant?.tenantInitials ||
                          tenant?.fullName?.[0] ||
                          "-"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-base font-semibold text-gray-900 font-gilroy mt-2">
                      {props.bedData?.currentTenantInfo?.[0].tenantFullName ||
                        props.bedData?.fullName}
                    </label>

                    <div className="flex flex-wrap gap-2 mt-1">
                      <div className="flex items-center bg-yellow-100 py-1 px-3.5 rounded-full text-xs text-gray-900 font-medium whitespace-nowrap font-gilroy">
                        {state.UsersList.customerdetails?.data?.[0]
                          .floor_name ||
                          props.bedData?.floorName ||
                          props.bedData?.hostelInfo?.floorName}
                      </div>

                      <div className="flex items-center bg-pink-100 py-1.5 px-3 rounded-full text-xs text-gray-900 font-medium whitespace-nowrap font-gilroy">
                        {props.bedData?.room?.Room_Name ||
                          props.bedData?.roomName ||
                          props.bedData?.hostelInfo?.roomName}{" "}
                        -{" "}
                        {props.bedData?.bed?.bed_no ||
                          props.bedData?.bedName ||
                          props.bedData?.hostelInfo?.bedName}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-900 font-gilroy">
                      Request Date{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </label>
                    <div className="relative w-full mt-1">
                      <DatePicker
                        className="w-full h-12 border border-gray-300 rounded px-3 cursor-pointer font-gilroy"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={requestDate ? dayjs(requestDate) : null}
                        onChange={(date) => {
                          setCheckOutRequestDateError("");
                          dispatch({
                            type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR",
                          });
                          setRequestDate(date ? date.toDate() : null);
                          calculateDateDifference(selectedDate, date);
                        }}
                        getPopupContainer={() => document.body}
                        popupStyle={{
                          zIndex: 2000,
                          top: "10px",
                          left: "640px",
                        }}
                        placement="topLeft"
                        disabledDate={(current) => {
                          if (!current) return false;
                          const joining = joiningdate
                            ? dayjs(joiningdate, "DD/MM/YYYY")
                            : null;
                          if (
                            joining &&
                            current.isBefore(joining.startOf("day"))
                          )
                            return true;
                          if (current.isAfter(dayjs().endOf("day")))
                            return true;
                          return false;
                        }}
                      />
                    </div>
                    {checkoUtrequestDateError && (
                      <ErrorMessage
                        message={checkoUtrequestDateError}
                        type="error"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-900 font-gilroy">
                      Check-Out Date{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </label>
                    <div className="relative w-full mt-1">
                      <DatePicker
                        className="w-full h-12 border border-gray-300 rounded px-3 cursor-pointer font-gilroy"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={selectedDate ? dayjs(selectedDate) : null}
                        onChange={(date) => {
                          setSelectedDate(date);
                          calculateDateDifference(date, requestDate);
                          setCheckOutDateError("");
                          setJoiningError("");
                          dispatch({
                            type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR",
                          });
                        }}
                        disabledDate={(current) => {
                          if (!requestDate) return true;
                          return (
                            current &&
                            current.isBefore(dayjs(requestDate), "day")
                          );
                        }}
                        getPopupContainer={() => document.body}
                        popupStyle={{
                          zIndex: 2000,
                          top: "10px",
                          left: "435px",
                        }}
                        placement="topLeft"
                      />
                    </div>
                    {checkoUtDateError && (
                      <ErrorMessage message={checkoUtDateError} type="error" />
                    )}
                    {joiningError && (
                      <ErrorMessage message={joiningError} type="error" />
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="comments"
                    className="mt-2 text-sm font-medium text-gray-700 font-gilroy"
                  >
                    Reason (Comments)
                  </label>
                  <input
                    type="text"
                    name="comments"
                    id="comments"
                    value={comments}
                    onChange={handleCommentsChange}
                    placeholder="Enter Comments"
                    required
                    className={`mt-2 w-full h-12 px-3 rounded-md text-base font-medium font-gilroy border ${
                      comments
                        ? "border-gray-700 text-gray-900"
                        : "border-gray-300 text-gray-500"
                    } focus:outline-none`}
                  />
                </div>
                {state.UsersList.errorMessageAddCheckOut && (
                  <ErrorMessage
                    message={state.UsersList.errorMessageAddCheckOut}
                    type="error"
                  />
                )}
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={handleCloseCheckout}
                    className="h-10 px-4 rounded-lg bg-white text-gray-700 font-gilroy font-medium border border-white"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={formLoading}
                    onClick={handleCheckOutCustomer}
                    className="h-10 px-4 rounded-lg !bg-blue-700 text-white font-gilroy font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}

CustomerCheckout.propTypes = {
  setCustomerCheckoutpage: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  customerCheckoutpage: PropTypes.bool.isRequired,
  uniqueostel_Id: PropTypes.string.isRequired,
  Hostel_Id: PropTypes.number,
  Floor_Id: PropTypes.number,
  Room_Name: PropTypes.string,
  bed_no: PropTypes.string,
  bed_amount: PropTypes.number,
  bedData: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    hostelId: PropTypes.string.isRequired,

    actualJoining: PropTypes.string,
    initials: PropTypes.string,
    profilePic: PropTypes.string,
    fullName: PropTypes.string,

    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,

    currentTenantInfo: PropTypes.arrayOf(
      PropTypes.shape({
        joiningDate: PropTypes.string,
        tenetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profilePic: PropTypes.string,
        tenantInitials: PropTypes.string,
        tenantFullName: PropTypes.string,
      }),
    ),

    room: PropTypes.shape({
      Hostel_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Floor_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Room_Name: PropTypes.string,
    }),

    bed: PropTypes.shape({
      bed_no: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default CustomerCheckout;
