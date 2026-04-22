/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
// import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import { Tooltip } from "bootstrap";
import ErrorMessage from "../../Components/ErrorMessage";

function DueCustomerConfirmCheckout({ show, handleClose, data, pgDetails }) {
  const handleClosecheck = () => {
    handleClose();
    dispatch({ type: "REMOVE_CONFORM_CHECKOUT_ERROR" });
  };

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  // const [fields, setFields] = useState([]);
  const [comments, setComments] = useState("");
  // const [checkOutDate, setCheckOutDate] = useState("");
  // const [uploadFile, setUploadFile] = useState(null);

  // const [ReturnAmount, setReturnAmount] = useState('')

  const [formLoading, setFormLoading] = useState(false);

  // const [dataBed, setDataBed] = useState([])

  // const [hostelData, setHostelData] = useState("")

  // const [detuction, setDetuction] = useState("")

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.chrckoutError) {
      setFormLoading(false);
    }
  }, [state.UsersList?.chrckoutError]);

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  useEffect(() => {
    if (state.UsersList.conformChekoutError) {
      setFormLoading(false);
    }
  }, [state.UsersList.conformChekoutError]);
  const quillRef = useRef(null);

  useEffect(() => {
    return () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor?.();
        if (editor) {
          editor.off("selection-change");
          editor.off("text-change");
        }
      }
    };
  }, []);

  // useEffect(() => {
  //     if (hostelData) {
  //         setCheckOutDate(hostelData?.CheckoutDate)
  //     }

  // }, [hostelData])

  useEffect(() => {
    if (
      state.UsersList.statusCodeForDueCustomer === 200 ||
      state.UsersList.statusCodeAddConfirmCheckout === 200
    ) {
      setFormLoading(false);
      handleClosecheck();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: 1,
          size: 10,
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
      }, 500);
    }
  }, [
    state.UsersList.statusCodeForDueCustomer,
    state.UsersList.statusCodeAddConfirmCheckout,
  ]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]',
    );
    [...tooltipTriggerList].forEach(
      (tooltipTriggerEl) =>
        new Tooltip(tooltipTriggerEl, {
          customClass: "white-tooltip",
        }),
    );
  }, []);
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .white-tooltip .tooltip-inner {
      background-color: white !important;
      color: black !important;
      border: 1px solid #ddd;
      font-size: 0.8rem;
    }
    .white-tooltip .tooltip-arrow::before {
      border-top-color: white !important;
    }
  `;
    document.head.appendChild(style);
  }, []);

  const handleConfirmCheckout = () => {
    if (data?.apiCall?.customerId || data?.tenetId) {
      dispatch({
        type: "CONFIRMCHECKOUT",
        payload: {
          customerId: data?.apiCall?.customerId || data?.tenetId,
          comments: comments,
        },
      });
      setFormLoading(true);
    }
  };
  useEffect(() => {
    if (state.UsersList.statuscodeForConformCheckout === 200) {
      handleClosecheck();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: 1,
          size: 10,
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
      }, 500);
    }
  }, [state.UsersList.statuscodeForConformCheckout]);

  useEffect(() => {
    if (
      state.login.selectedHostel_Id &&
      (data?.apiCall?.customerId || data?.tenetId)
    ) {
      dispatch({
        type: "GETINITIALIZECHECKOUT",
        payload: {
          customerId: data?.apiCall?.customerId || data?.tenetId,
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
  }, []);

  const getProfileImage = () => {
    const pic = data?.profilePic;

    if (
      pic &&
      pic !== "0" &&
      (pic.startsWith("http") || pic.startsWith("data:image"))
    ) {
      return pic;
    }

    return null;
  };

  console.log("data", data);

  return (
    <div>
      <Modal show={show} onHide={handleClosecheck} centered>
        <Modal.Header className="flex items-start justify-between mb-3 relative border-b-0 pb-1">
          <h2 className="text-xl font-semibold font-gilroy">
            Check-out Tenant
          </h2>

          <button onClick={handleClosecheck} className="cursor-pointer">
            <CloseCircle size={24} color="#000" />
          </button>
        </Modal.Header>

        <Modal.Body>
          <div className="flex items-center gap-3 -mt-6">
            {getProfileImage() ? (
              <img
                src={getProfileImage()}
                className="h-14 w-14 cursor-pointer rounded-circle mr-3"
                alt="profile"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-base font-gilroy cursor-pointer">
                {data?.initials ||
                  data?.tenantInitials ||
                  data?.profilePic ||
                  "--"}
              </div>
            )}

            <div>
              <p className="text-lg mt-2 font-gilroy font-semibold mb-0">
                {data?.fullName || data?.tenantFullName}
              </p>
              <div className="flex mb-2">
                <span className="rounded-full bg-yellow-400 text-gray-900 me-2 text-xs font-gilroy font-normal px-2.5 py-1">
                  {data?.floorName ||
                    pgDetails?.floorName ||
                    data?.hostelInfo?.floorName}
                </span>
                <span className="rounded-full bg-red-100 text-gray-900 text-xs font-gilroy font-normal px-2.5 py-1">
                  {data?.roomName ||
                    pgDetails?.roomName ||
                    data?.hostelInfo?.roomName}{" "}
                  -{" "}
                  {data?.bedName ||
                    pgDetails?.bedName ||
                    data?.hostelInfo?.bedName}
                </span>
              </div>
            </div>

            <div className="ml-auto text-right mt-2">
              <p className="text-sm font-gilroy font-normal text-gray-700 m-0 p-0 mb-1">
                Check-out Date
              </p>
              <p className="text-sm font-gilroy font-semibold m-0">
                {state.UsersList?.initializeCheckout?.checkoutDate}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-gilroy font-normal">Status</span>
            <div className="flex justify-between items-center mb-3">
              <button className="text-xs font-gilroy font-semibold bg-green-600 text-white px-3 py-1.5 rounded-full border-none">
                Checkout
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-gilroy font-normal mb-2 mt-2">
              Comments
            </label>
            <textarea
              className="w-full h-12 text-sm font-gilroy font-normal p-2.5 border border-gray-300 rounded"
              placeholder="Please Enter Comments"
              rows={3}
              value={comments}
              onChange={handleCommentsChange}
            />
          </div>
        </Modal.Body>
        {state.UsersList?.chrckoutError && (
          <div className="d-flex justify-content-center">
            <ErrorMessage
              message={state.UsersList?.chrckoutError}
              type="error"
            />
          </div>
        )}

        {formLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10 top-[100px]">
            <div className="w-10 h-10 border-4 border-t-blue-600 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Modal.Footer className="!border-t-0">
          <Button
            className="!text-base !font-gilroy !font-normal !bg-transparent !text-gray-800 px-4 py-2 rounded"
            onClick={handleClosecheck}
          >
            Cancel
          </Button>
          <Button
            disabled={formLoading}
            onClick={handleConfirmCheckout}
            className="text-base !font-gilroy !font-normal !bg-[#1E45E1] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check-out
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
DueCustomerConfirmCheckout.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  customerID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pgDetails: PropTypes.shape({
    floorName: PropTypes.string,
    roomName: PropTypes.string,
    bedName: PropTypes.string,
  }).isRequired,
};
export default DueCustomerConfirmCheckout;
