/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
// import Profile from "../../Assets/Images/New_images/profile-picture.png";
// import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import Select from "react-select";

function MakeAsInactive({
  show,
  handleCloseInActive,
  inActiveDetails,
  currentItem,
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

  console.log("inActiveDetails", inActiveDetails);

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

  const paymentOptions = Array.isArray(
    state.UsersList?.initializeCancelBookingList?.listBanks,
  )
    ? state.UsersList?.initializeCancelBookingList?.listBanks?.map((item) => ({
        value: String(item.bankId),
        label: `${item.holderName} - ${item.bankName || ""}`,
      }))
    : [];

  useEffect(() => {
    if (!inActiveDetails) return;
    if (
      inActiveDetails?.apiCall?.customerId ||
      inActiveDetails?.tenetId ||
      inActiveDetails?.customerId
    ) {
      dispatch({
        type: "INITIALIZECANCELBOOKING",
        payload:
          inActiveDetails?.apiCall?.customerId ||
          inActiveDetails?.tenetId ||
          inActiveDetails?.customerId,
      });
    }
  }, [inActiveDetails]);

  const CustomerOverView = state?.UsersList?.customerdetails;

  useEffect(() => {
    if (
      inActiveDetails?.apiCall?.customerId ||
      inActiveDetails?.tenetId ||
      inActiveDetails?.customerId
    ) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: {
          customerId:
            inActiveDetails?.apiCall?.customerId ||
            inActiveDetails?.tenetId ||
            inActiveDetails?.customerId,
        },
      });
    }
  }, [inActiveDetails]);

  // console.log("inActiveDetails", inActiveDetails);

  const profilePic = inActiveDetails?.profilePic;

  const isValidImage =
    typeof profilePic === "string" &&
    profilePic !== "0" &&
    (profilePic.startsWith("http") ||
      profilePic.startsWith("data:image") ||
      profilePic.startsWith("/9j/"));

  return (
    <Modal show={show} onHide={handleCloseInActive} centered backdrop="static">
      <Modal.Header className="border-0 px-4 pt-3 pb-4 flex items-start justify-between">
        <div>
          <Modal.Title className="!text-xl !font-semibold text-gray-900 !font-gilroy">
            Tenant Inactive?
          </Modal.Title>

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
      </Modal.Header>

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
            title={inActiveDetails?.fullName || inActiveDetails?.tenantFullName}
          >
            {inActiveDetails?.fullName || inActiveDetails?.tenantFullName}
          </p>

          <div className="flex gap-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
              {currentItem?.floorName ||
                inActiveDetails?.floorName ||
                inActiveDetails?.hostelInfo?.floorName}
            </span>

            <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium font-gilroy">
              {currentItem?.roomName ||
                inActiveDetails?.roomName ||
                inActiveDetails?.hostelInfo?.roomName}
              {" - "}
              {currentItem?.bedName ||
                inActiveDetails?.bedName ||
                inActiveDetails?.hostelInfo?.bedName}
            </span>
          </div>
        </div>
      </div>

      <Modal.Body className="px-4 pb-4 pt-0 max-h-[70vh] md:max-h-[56vh] lg:max-h-full overflow-y-auto show-scroll">
        <div className="mb-2">
          <Form.Group controlId="joiningDate">
            <Form.Label className="text-sm font-medium text-gray-900 font-gilroy">
              Date <span className="text-red-500 text-xl">*</span>
            </Form.Label>

            <div className="relative w-full">
              <DatePicker
                className="w-full h-12 cursor-pointer font-gilroy"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                value={inActiveDate ? dayjs(inActiveDate, "DD/MM/YYYY") : null}
                onChange={(date) => {
                  setInActiveDate(date);
                  setIsACtiveDateError("");
                }}
                getPopupContainer={() => document.body}
                popupStyle={{ zIndex: 2000, top: "-15px", left: "480px" }}
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
            <ErrorMessage message={isActiveDateError} type="error" />
          )}
        </div>
        <div className="mb-2">
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label className="text-sm font-medium text-[#222222] font-gilroy mt-1">
              Refund From <span className="text-red-500 text-xl">*</span>
            </Form.Label>

            <Select
              options={paymentOptions}
              onChange={(selectedOption) =>
                handleModeOfPaymentChange(selectedOption?.value)
              }
              value={
                modeOfPayment
                  ? paymentOptions.find(
                      (opt) => opt.value === String(modeOfPayment),
                    ) || null
                  : null
              }
              placeholder="Select Payment"
              noOptionsMessage={() => "No mode available"}
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
            />
          </Form.Group>
          {paymentError && <ErrorMessage message={paymentError} type="error" />}
        </div>

        <div className="mb-2">
          <Form.Group>
            <Form.Label className="text-sm font-medium text-gray-900 font-gilroy">
              Reason (Comments)
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter reason here"
              value={inActiveComments}
              onChange={(e) => handleInActiveReason(e)}
              className={`h-12 text-base text-gray-600 font-gilroy border border-gray-300 rounded-lg shadow-none
          ${inActiveComments ? "font-semibold" : "font-medium"}`}
            />
          </Form.Group>
        </div>

        {state.Booking.bookingMakeAsError && (
          <div className="flex justify-center mb-2">
            <ErrorMessage
              message={state.Booking.bookingMakeAsError}
              type="error"
            />
          </div>
        )}

        {/* <Modal.Footer className="border-0 p-0"> */}
        <Modal.Footer className="border-0 pt-2 pb-1 px-0">
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
        </Modal.Footer>
      </Modal.Body>

      {formLoading && (
        <div className="absolute inset-x-0 bottom-0 top-24 flex items-center justify-center opacity-75 z-10">
          <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
        </div>
      )}
    </Modal>
  );
}
MakeAsInactive.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseInActive: PropTypes.func.isRequired,

  currentItem: PropTypes.shape({
    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,
  }),

  inActiveDetails: PropTypes.shape({
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

    firstName: PropTypes.string,
    bookedAt: PropTypes.string,
  }).isRequired,
};

export default MakeAsInactive;
