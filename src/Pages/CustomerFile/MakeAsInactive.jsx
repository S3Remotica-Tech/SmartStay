/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  CloseCircle, Bank,
  Wallet2,
  Card,
} from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import Select from "react-select";

import {
  Option,
  SingleValue,
  DropdownIndicator,
  GroupHeading,

} from "../../Utils/CustomSelectComponents";
import {
  datePickerClass,
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
  fieldTextareaClass,
} from "../../Utils/FieldStyles";




function MakeAsInactive({
  show,
  handleCloseInActive,
  inActiveDetails,
  // currentItem,
}) {
  const state = useSelector((state) => state);

  dayjs.extend(isBetween);
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [inActiveDate, setInActiveDate] = useState(null);
  const [inActiveComments, setInActiveComments] = useState("");
  const [isActiveDateError, setIsACtiveDateError] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const previousCustomerIdRef = useRef(null);
  const previousCustomerIdDetailsRef = useRef(null);
  const CustomerOverView = state?.UsersList?.customerdetails;

  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };

  const handleInActiveReason = (e) => {
    setInActiveComments(e.target.value);
  };

  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;
    setModeOfPayment(selectedOption);
    setPaymentError("");
  };

  const SubmitInActiveForm = () => {
    let hasError = false;

    if (!inActiveDate) {
      setIsACtiveDateError("Please Select Inactive Date");
      hasError = true;
    } else {
      setIsACtiveDateError("");
    }

    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Transaction");
      hasError = true;
    } else {
      setPaymentError("");
    }

    if (hasError) return;

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = inActiveDate
      ? incrementDateAndFormat(inActiveDate)
      : "";

    setIsACtiveDateError("");
    if (formattedDate) {
      dispatch({
        type: "BOOKINGACTIVE",
        payload: {
          cancelDate: formattedDate,
          reason: inActiveComments,
          customerId:
            inActiveDetails?.apiCall?.customerId ||
            inActiveDetails?.tenetId ||
            inActiveDetails?.customerId,
          bankId: modeOfPayment,
          referenceNumber: transactionId,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      setFormLoading(false);
      handleCloseInActive();
    }
  }, [state.Booking.StatusCodeInactiveCode]);

  useEffect(() => {
    if (state.Booking.bookingMakeAsError || state.createAccount?.networkError) {
      setFormLoading(false);
    }
  }, [state.Booking.bookingMakeAsError, state.createAccount?.networkError]);

  // const paymentOptions = Array.isArray(
  //   state.UsersList?.initializeCancelBookingList?.listBanks,
  // )
  //   ? state.UsersList?.initializeCancelBookingList?.listBanks?.map((item) => ({
  //     value: String(item.bankId),
  //     label: `${item.holderName} - ${item.bankName || ""}`,
  //   }))
  //   : [];



  const paymentOptionsV1 =
    state.UsersList?.initializeCancelBookingList?.listBanks?.map((bank) => {
      const label = bank?.accountHolderName || "";

      const subLabel = [
        bank?.isBank ? bank?.bankName : bank?.accountType,
        bank?.displayName,
      ]
        .filter(Boolean)
        .join(" - ");

      const accountType = bank?.accountType;

      return {
        value: bank?.bankId,
        label: label,
        subLabel: subLabel,
        type: accountType || bank?.bankName,
        isUpi: bank?.upiIcons,
        icon: bank?.upiIcons ? (
          <img
            src={bank.upiIcons}
            alt="UPI"
            className="w-5 h-5 object-contain"
          />
        ) :
          accountType === "BANK" ? (
            <Bank color="#1E45E1" size="16" />
          ) : accountType === "CASH" ? (
            <Wallet2 color="#038C3D" size="16" />
          ) : (
            <Card color="#F59E0B" size="16" />
          ),
        data: bank,
      };
    }) || [];






  useEffect(() => {
    if (!inActiveDetails) return;

    const customerId =
      inActiveDetails?.apiCall?.customerId ||
      inActiveDetails?.tenetId ||
      inActiveDetails?.customerId;

    if (!customerId || previousCustomerIdRef.current === customerId) return;

    previousCustomerIdRef.current = customerId;

    dispatch({
      type: "INITIALIZECANCELBOOKING",
      payload: customerId,
    });
  }, [inActiveDetails]);




  useEffect(() => {
    const customerId =
      inActiveDetails?.apiCall?.customerId ||
      inActiveDetails?.tenetId ||
      inActiveDetails?.customerId;

    if (!customerId || previousCustomerIdDetailsRef?.current === customerId) return;

    previousCustomerIdDetailsRef.current = customerId;

    dispatch({
      type: "CUSTOMERDETAILS",
      payload: {
        customerId,
      },
    });
  }, [inActiveDetails]);

  const profilePic = inActiveDetails?.profilePic;

  const isValidImage =
    typeof profilePic === "string" &&
    profilePic !== "0" &&
    (profilePic.startsWith("http") ||
      profilePic.startsWith("data:image") ||
      profilePic.startsWith("/9j/"));


  const floorName = state.UsersList?.initializeCancelBookingList?.floorName;
  const roomName = state.UsersList?.initializeCancelBookingList?.roomName;
  const bedName = state.UsersList?.initializeCancelBookingList?.bedName;




  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="border-0 px-4 pt-3 pb-4 flex items-center justify-between">
          <div>
            <div className="!text-xl !font-semibold text-gray-900 !font-gilroy">
              Tenant Inactive?
            </div>

            <label className="block text-sm font-medium text-gray-600 font-gilroy">
              Are you sure you want to inactive this tenant?
            </label>
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleCloseInActive}
            className="cursor-pointer -mt-5"
          />
        </div>

        <div className="flex items-center gap-3 mb-3 ml-5">
          {isValidImage ? (
            <img
              src={
                profilePic.startsWith("/9j/")
                  ? `data:image/jpeg;base64,${profilePic}`
                  : profilePic
              }
              className="h-14 w-14 rounded-full object-cover"
              alt="image"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xl font-semibold font-gilroy">
              {inActiveDetails?.profilePic ||
                inActiveDetails?.tenantInitials ||
                inActiveDetails?.initials ||
                "-"}
            </div>
          )}

          <div>
            <p
              className="mt-2 block max-w-[120px] truncate text-base font-gilroy font-semibold text-blue-700 cursor-pointer mb-1"
              title={
                inActiveDetails?.fullName || inActiveDetails?.tenantFullName
              }
            >
              {inActiveDetails?.fullName || inActiveDetails?.tenantFullName}
            </p>

            <div className="flex gap-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
                {floorName}
              </span>

              <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
                {roomName}
                {" - "}
                {bedName}
              </span>
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-0 flex-1 overflow-y-auto show-scrolls relative ">
          <div className="mb-2">
            <Form.Group controlId="joiningDate">
              <Form.Label className={fieldLabelClass}>
                Date <span className={fieldRequiredClass}>*</span>
              </Form.Label>

              <div className="relative w-full">
                <DatePicker
                  className={datePickerClass(!!isActiveDateError)}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={
                    inActiveDate ? dayjs(inActiveDate, "DD/MM/YYYY") : null
                  }
                  onChange={(date) => {
                    setInActiveDate(date);
                    setIsACtiveDateError("");
                  }}
                  getPopupContainer={() => document.body}
                  popupStyle={{ zIndex: 2000 }}
                  placement="topLeft"
                  disabledDate={(current) => {
                    const bookedDate = dayjs(
                      CustomerOverView?.bookingInfo?.bookingDate,
                      "DD/MM/YYYY",
                    );
                    return (
                      current.isBefore(bookedDate, "day") ||
                      current.isAfter(dayjs(), "day")
                    );
                  }}
                />
              </div>
            </Form.Group>

            {isActiveDateError && (
              <ErrorMessage className="mt-[6px]" message={isActiveDateError} type="error" />
            )}
          </div>
          <div className="mb-2">
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label className={fieldLabelClass}>
                Refund From <span className={fieldRequiredClass}>*</span>
              </Form.Label>

              <Select
                options={paymentOptionsV1}
                onChange={(selectedOption) =>
                  handleModeOfPaymentChange(selectedOption?.value)
                }
                value={
                  modeOfPayment
                    ? paymentOptionsV1.find(
                      (opt) => opt.value === String(modeOfPayment),
                    ) || null
                    : null
                }
                placeholder="Select Payment"
                noOptionsMessage={() => "No mode available"}
                styles={fieldSelectStyles(!!paymentError)}
                isSearchable={false}
                components={{
                  Option,
                  SingleValue,
                  DropdownIndicator,
                  GroupHeading,
                  IndicatorSeparator: () => null,
                }}
              />
            </Form.Group>
            {paymentError && (
              <ErrorMessage className="mt-[6px]" message={paymentError} type="error" />
            )}
          </div>

          <div className="mt-1">
            <Form.Group>
              <Form.Label className={fieldLabelClass}>
                Transaction ID{" "}
              </Form.Label>
              <FormControl
                type="text"
                id="form-controls"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={(e) => handleTransactionId(e)}
                className={fieldClass()}
              />
            </Form.Group>
          </div>

          <div className="mb-2">
            <Form.Group>
              <Form.Label className={fieldLabelClass}>
                Reason (Comments)
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter reason here"
                value={inActiveComments}
                onChange={(e) => handleInActiveReason(e)}
                className={fieldTextareaClass()}
              />
            </Form.Group>
          </div>

          {state.Booking.bookingMakeAsError && (
            <div className="flex justify-center mb-2">
              <ErrorMessage className="mt-[6px]"
                message={state.Booking.bookingMakeAsError}
                type="error"
              />
            </div>
          )}
          {formLoading && (
            <div className="absolute inset-x-0 bottom-0 top-24 flex items-center justify-center opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
            </div>
          )}
        </div>
        <div className="border-0 p-4">
          <div className="flex w-full gap-3">
            <Button
              onClick={handleCloseInActive}
              className="w-full bg-white !border !border-gray-300 !text-gray-600 !font-semibold rounded-lg !text-base !font-gilroy py-2"
            >
              Cancel
            </Button>

            <Button
              disabled={formLoading}
              onClick={SubmitInActiveForm}
              className="w-full !bg-blue-700 text-white !font-semibold rounded-lg !text-base !font-gilroy py-2"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
MakeAsInactive.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseInActive: PropTypes.func.isRequired,

  // currentItem: PropTypes.shape({
  //   floorName: PropTypes.string,
  //   roomName: PropTypes.string,
  //   bedName: PropTypes.string,
  // }),

  inActiveDetails: PropTypes.shape({
    customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tenetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,
    profilePic: PropTypes.string,
    initials: PropTypes.string,
    tenantInitials: PropTypes.string,

    fullName: PropTypes.string,
    tenantFullName: PropTypes.string,

    firstName: PropTypes.string,
    bookedAt: PropTypes.string,

    apiCall: PropTypes.shape({
      customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),

    hostelInfo: PropTypes.shape({
      floorName: PropTypes.string,
      roomName: PropTypes.string,
      bedName: PropTypes.string,
    }),
  }).isRequired,
};

export default MakeAsInactive;
