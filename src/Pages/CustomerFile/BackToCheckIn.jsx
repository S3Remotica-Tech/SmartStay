/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
// import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
import ErrorMessage from "../../Components/ErrorMessage";
import { JoininDatecustomer } from "../../Redux/Action/LoginAction";
import PropTypes from "prop-types";
import FormComingSoon from "../../Utils/FormComingSoon";
function BackToCheckIn({ show, handleClose, checkInDetails, pgDetails }) {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  // console.log("checkInDetails", checkInDetails, "pgDetails", pgDetails)

  const [activeTab, setActiveTab] = useState("LONG");
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [recheckInDate, setRecheckInDate] = useState(null);
  const [recheckinDateError, setRecheckinDateError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const CustomerOverView = state?.UsersList?.customerdetails;

  const reasonRef = useRef(null);
  const dateRef = useRef(null);

  const handleRecheckin = (e) => {
    setReason(e.target.value);
    setReasonError("");
  };

  const handleJoiningDateChange = (date) => {
    setRecheckinDateError("");
    setRecheckInDate(date ? date.toDate() : null);
    dispatch(JoininDatecustomer(date ? date.toDate() : null));
  };

  const customerId =
    checkInDetails?.apiCall?.customerId ||
    checkInDetails?.tenantId ||
    checkInDetails?.tenetId ||
    checkInDetails?.customerId;

  useEffect(() => {
    if (!customerId) return;

    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: customerId },
    });
    // console.log("executeddddddddddd");
    dispatch({
      type: "INITIALIZECANCELCHECKOUT",
      payload: {
        customerId: customerId,
        hostelId: state.login.selectedHostel_Id,
      },
    });
  }, [customerId]);

  // console.log("customerId", customerId);

  const noticeDate = state.UsersList.customerdetails?.checkoutInfo?.noticeDate;

  const noticeDayjs = noticeDate ? dayjs(noticeDate, "DD/MM/YYYY") : null;

  // console.log("pgDetails",pgDetails, "checkInDetails",checkInDetails)

  const handleSaveBacktoCheckin = () => {
    let isValid = true;

    setReasonError("");
    setRecheckinDateError("");

    if (!reason || reason.trim() === "") {
      setReasonError("Please enter a reason (comments)");
      isValid = false;
    }

    if (!recheckInDate) {
      setRecheckinDateError("Please select  Re-Check-In Date");
      isValid = false;
    }

    if (!isValid) return;

    if (state.UsersList?.initializeCancelCheckout?.canRecheckinSameBed) {
      dispatch({
        type: "CANCELCHECKOUT",
        payload: {
          customerId:
            checkInDetails?.apiCall?.customerId ||
            checkInDetails?.tenetId ||
            checkInDetails?.customerId,
          hostelId: state.login.selectedHostel_Id,
          // roomId: checkInDetails?.roomId,
          bedId:
            Number(CustomerOverView?.hostelInfo?.bedId) ||
            Number(pgDetails?.bedId) ||
            Number(checkInDetails?.hostelInfo?.bedId),
          reCheckInDate: dayjs(recheckInDate).format("DD-MM-YYYY"),
          reason: reason.trim(),
        },
      });
      setFormLoading(true);
    }
  };

  // console.log("checkInDetails", checkInDetails);

  useEffect(() => {
    if (state.UsersList.cancelCheckoutStatusCode === 200) {
      setFormLoading(false);
    }
  }, [state.UsersList.cancelCheckoutStatusCode]);
  useEffect(() => {
    if (state.UsersList?.cancelCheckoutError) {
      setFormLoading(false);
    }
  }, [state.UsersList?.cancelCheckoutError]);

  const profilePic = checkInDetails?.profilePic;

  const isValidImage =
    typeof profilePic === "string" &&
    profilePic.trim() !== "" &&
    (profilePic.startsWith("http") ||
      profilePic.startsWith("data:image") ||
      profilePic.startsWith("/9j/"));

  const imgsrc = isValidImage
    ? profilePic.startsWith("/9j/")
      ? `data:image/jpeg;base64,${profilePic}`
      : profilePic
    : null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col ">
        <div className="px-4 py-3 shrink-0 relative flex items-start justify-between">
          <div className="text-xl font-semibold font-gilroy">
            Cancel Check-Out
          </div>

          <CloseCircle
            size="23"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 shrink-0">
          {imgsrc ? (
            <img
              src={imgsrc}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-semibold text-base font-gilroy">
              {checkInDetails?.initials ||
                checkInDetails?.tenantInitials ||
                checkInDetails?.profilePic}
            </div>
          )}

          <div>
            <p className="font-semibold text-sm mb-1 font-gilroy">
              {checkInDetails?.fullName || checkInDetails?.tenantFullName}
            </p>

            <div className="flex gap-2 -ml-1">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
                {pgDetails?.floorName ||
                  checkInDetails?.floorName ||
                  checkInDetails?.hostelInfo?.floorName}
              </span>

              <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
                {pgDetails?.roomName ||
                  checkInDetails?.roomName ||
                  checkInDetails?.hostelInfo?.roomName}
                {" - "}
                {pgDetails?.bedName ||
                  checkInDetails?.bedName ||
                  checkInDetails?.hostelInfo?.bedName}
              </span>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="   px-1 py-1.5 w-full bg-indigo-50 rounded-lg">
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setActiveTab("LONG")}
                className={`flex-1 py-2 rounded-md font-semibold font-gilroy transition
        ${
          activeTab === "LONG"
            ? "bg-blue-700 text-white"
            : "bg-indigo-50 text-black"
        }`}
              >
                Long Stay
              </button>

              <button
                onClick={() => setActiveTab("SHORT")}
                className={`flex-1 py-2 rounded-md font-semibold font-gilroy transition
        ${
          activeTab === "SHORT"
            ? "bg-blue-700 text-white"
            : "bg-indigo-50 text-black"
        }`}
              >
                Short Stay
              </button>
            </div>
          </div>
        </div>

        {activeTab === "LONG" ? (
          <div className="relative px-4 py-1  flex-1 overflow-y-auto show-scrolls">
            <div className="mb-2">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy">
                  Reason (Comments){" "}
                  <span className="text-red-500 text-xl">*</span>
                </Form.Label>

                <FormControl
                  ref={reasonRef}
                  type="text"
                  placeholder="Enter Comments"
                  value={reason}
                  onChange={handleRecheckin}
                  className="h-12 text-base text-gray-600 font-medium font-gilroy border border-gray-300 rounded-lg shadow-none focus:outline-none"
                />
              </Form.Group>

              {reasonError && (
                <ErrorMessage message={reasonError} type="error" />
              )}
            </div>

            <div className="relative z-10">
              <Form.Label className="text-sm font-medium font-gilroy pt-1.5 block">
                Re Check-In Date <span className="text-red-500 text-xl">*</span>
              </Form.Label>

              <DatePicker
                ref={dateRef}
                className="w-full h-12 cursor-pointer font-gilroy"
                disabledDate={(current) => {
                  if (!current) return false;

                  const today = dayjs().endOf("day");

                  if (
                    noticeDayjs &&
                    current.isBefore(noticeDayjs.startOf("day"))
                  ) {
                    return true;
                  }
                  if (current.isAfter(today)) {
                    return true;
                  }
                  return false;
                }}
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                value={recheckInDate ? dayjs(recheckInDate) : null}
                onChange={handleJoiningDateChange}
              />

              {recheckinDateError && (
                <ErrorMessage message={recheckinDateError} type="error" />
              )}
            </div>

            {formLoading && (
              <div className="absolute inset-x-0 bottom-0 top-24 flex items-center justify-center opacity-75 z-10">
                <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
              </div>
            )}

            {state.UsersList?.cancelCheckoutError && (
              <div className="d-flex justify-content-center">
                <ErrorMessage
                  message={state.UsersList?.cancelCheckoutError}
                  type="error"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto show-scrolls">
            <FormComingSoon />
          </div>
        )}
        {activeTab === "LONG" && (
          <div className="flex items-center justify-end gap-4 m-4">
            <button
              type="button"
              onClick={handleClose}
              className="bg-transparent border-0 text-gray-700 text-sm font-medium font-montserrat cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                !state.UsersList?.initializeCancelCheckout?.canRecheckinSameBed
              }
              onClick={handleSaveBacktoCheckin}
              className={`h-10 px-6 rounded-lg text-sm font-semibold font-montserrat text-white
      ${
        state.UsersList?.initializeCancelCheckout?.canRecheckinSameBed
          ? "bg-blue-700 cursor-pointer"
          : "bg-indigo-300 cursor-not-allowed"
      }`}
            >
              Check-In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
BackToCheckIn.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,

  checkInDetails: PropTypes.shape({
    customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tenetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    profilePic: PropTypes.string,
    initials: PropTypes.string,
    tenantInitials: PropTypes.string,

    fullName: PropTypes.string,
    tenantFullName: PropTypes.string,
    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,
    bedId: PropTypes.string,
  }).isRequired,

  pgDetails: PropTypes.shape({
    bedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,
  }).isRequired,
};

export default BackToCheckIn;
