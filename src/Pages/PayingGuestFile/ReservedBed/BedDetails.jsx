/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
// import Profile from '../../../Assets/Images/New_images/profile-picture.png'
import { AddCircle, LogoutCurve } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import { useHasPermission } from "../../../Utils/Permission";
import { Edit } from "iconsax-react";
import { useNavigate } from "react-router-dom";

function BedDetails({
  show,
  handleCloseBed,
  handleShowCheck_In,
  currentItem,
  handleShowInActiveForm,
  showEditBed,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const canWriteCustomers = useHasPermission("Customers", "canWrite")

  const {
    canWriteModule: canWriteCustomers,
    // canReadModule: canReadPayingGuests,
    // canUpdateModule: canUpdatePayingGuests,
    // canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Customers");

  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");

  const {
    canUpdateModule: canUpdatePayingGuests,
    // canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");

  const handleEditBed = () => {
    showEditBed(true);
  };

  const [showDots, setShowDots] = useState("");
  const [activeRoomId, setActiveRoomId] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_InActive" });
      }, 1000);
    }
  }, [state.Booking.StatusCodeInactiveCode]);

  const handleShowDots = (roomId) => {
    setShowDots(!showDots);
    setActiveRoomId(activeRoomId === roomId ? null : roomId);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveRoomId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckin = (tenant) => {
    handleShowCheck_In(true, tenant);
  };

  // const [customer_details, setCustomerDetails] = useState({})

  const handleMakeInActive = (tenant) => {
    handleShowInActiveForm(true, tenant);
  };

  const handleNavigateTenantProfile = (tenantDetails) => {
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: tenantDetails?.tenetId },
    });
    navigate(`/tenant/details/${tenantDetails?.tenetId}`, {
      state: {
        customerId: tenantDetails?.tenetId,
        hostelId: state.login?.selectedHostel_Id,
        name: tenantDetails?.tenantFullName,
        isPgWay: true,
      },
    });
    dispatch({ type: "UPDATE_USERSLIST_FALSE" });
  };

  return (
    <>
      <div className="modal show block static font-gilroy">
        <Modal show={show} onHide={handleCloseBed} centered>
          <Modal.Dialog className="w-full max-w-full rounded-2xl m-0 p-0">
            <Modal.Header className="pb-0 border border-gray-200">
              <div className="flex justify-between w-full py-1.5 pl-1 pr-2 -mt-2">
                <div>
                  <div>
                    <Modal.Title className="!text-xl text-gray-800 !font-gilroy font-semibold mb-1">
                      Bed Status
                    </Modal.Title>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm text-blue-700 font-gilroy font-medium">
                      {currentItem?.floorName}
                    </label>

                    <span className="text-sm text-blue-700 font-gilroy font-medium">
                      |
                    </span>

                    <label className="text-sm text-blue-700 font-gilroy font-medium">
                      {currentItem?.roomName}
                    </label>

                    <span className="text-sm text-blue-700 font-gilroy font-medium">
                      |
                    </span>

                    <span className="text-sm text-blue-700 font-gilroy font-medium ">
                      {currentItem?.bedName}
                    </span>
                  </div>
                </div>

                <div className="mt-1.5 flex items-center gap-1.5 !border !border-blue-700 text-blue-700 bg-blue-50 font-gilroy font-semibold text-sm rounded-full px-1.5 h-7 w-fit whitespace-nowrap">
                  Reserved
                </div>
              </div>

              {/* <CloseCircle size="24" color="#000" onClick={handleCloseBed} style={{ cursor: "pointer" }} /> */}
            </Modal.Header>
            <Modal.Body className="py-1 px-">
              <div className="mt-1 grid grid-cols-1 gap-2">
                <div className="col-span-2 w-full">
                  <div>
                    <label className="mt-0 mb-1 text-base text-gray-800 font-gilroy font-medium">
                      Reserved by
                    </label>
                  </div>

                  {currentItem?.newTenantInfo?.map((tenant, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between">
                        <div className="flex gap-3 items-center">
                          <div>
                            {tenant?.profilePic &&
                            tenant?.profilePic !== "0" ? (
                              <Image
                                src={tenant?.profilePic}
                                roundedCircle
                                className="h-14 w-14"
                                alt="image"
                              />
                            ) : (
                              <div className="h-14 w-14 rounded-full bg-blue-700 flex items-center justify-center text-white font-gilroy font-semibold text-xl">
                                {tenant?.tenantInitials || "-"}
                              </div>
                            )}
                          </div>

                          <div className="mt-2">
                            <div>
                              <label
                                className="block max-w-[120px] truncate text-lg font-gilroy font-semibold text-blue-700 cursor-pointer underline"
                                title={tenant?.tenantFullName || "N/A"}
                                onClick={() =>
                                  handleNavigateTenantProfile(tenant)
                                }
                              >
                                {tenant?.tenantFullName || "N/A"}
                              </label>
                            </div>
                            <div>
                              <label className="text-base text-gray-700 font-gilroy font-medium">
                                {tenant?.mobile
                                  ? `+ ${tenant?.countryCode} ${String(tenant?.mobile)}`
                                  : "No phone"}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => handleShowDots(index)}
                          className={`relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 cursor-pointer
              ${activeRoomId === index ? "bg-blue-100" : "bg-white"}`}
                        >
                          <PiDotsThreeOutlineVerticalFill className="w-5 h-5" />

                          {activeRoomId === index && (
                            <div
                              ref={popupRef}
                              className="absolute right-12 top-2 w-40 flex flex-col z-[1000] border border-gray-300 rounded-lg bg-[#f9f9f9] shadow-md"
                            >
                              <div
                                onClick={() =>
                                  canWriteCustomers && handleCheckin(tenant)
                                }
                                className={`flex items-center gap-2 px-2.5 py-2 rounded-t-lg 
                    ${canWriteCustomers ? "cursor-pointer opacity-100 hover:bg-blue-50" : "cursor-not-allowed opacity-50"}`}
                              >
                                <AddCircle
                                  size={18}
                                  color={
                                    canWriteCustomers ? "#1E45E1" : "#A0A0A0"
                                  }
                                />
                                <label
                                  className={`text-sm font-medium font-gilroy cursor-pointer ${canWriteCustomers ? "text-gray-800" : "text-gray-300"}`}
                                >
                                  Check-In
                                </label>
                              </div>

                              <div className="h-px bg-gray-200" />

                              <div
                                onClick={() =>
                                  canWriteBooking && handleMakeInActive(tenant)
                                }
                                className={`flex items-center gap-2 px-2.5 py-2 rounded-b-lg 
    ${
      canWriteBooking
        ? "cursor-pointer opacity-100 hover:bg-red-50"
        : "cursor-not-allowed opacity-50"
    }`}
                              >
                                <LogoutCurve
                                  size={18}
                                  color={
                                    canWriteBooking ? "#FF9500" : "#A0A0A0"
                                  }
                                />
                                <label
                                  className={`text-sm font-medium font-gilroy  cursor-pointer
      ${canWriteBooking ? "text-gray-800" : "text-gray-300"}`}
                                >
                                  Make as Inactive
                                </label>
                              </div>

                              <div className="h-px bg-gray-200" />

                              <div
                                onClick={() =>
                                  canUpdatePayingGuests
                                    ? handleEditBed()
                                    : undefined
                                }
                                className={`ml-0.5 flex items-center gap-2 px-2.5 py-2 rounded-b-lg 
                    ${canUpdatePayingGuests ? "cursor-pointer opacity-100 hover:bg-red-50" : "cursor-not-allowed opacity-60"}`}
                              >
                                <Edit
                                  size={16}
                                  className={`${canUpdatePayingGuests ? "text-blue-700" : "text-gray-400"}`}
                                />
                                <label
                                  className={`text-sm font-medium font-gilroy ${canUpdatePayingGuests ? "text-gray-800" : "text-gray-400"}`}
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mb-2 mt-4">
                        <label className="text-sm text-gray-800 font-gilroy">
                          Booking Amount
                        </label>
                        <label className="text-sm text-gray-800 font-gilroy font-semibold">
                          {tenant?.bookingAmount || "N/A"}
                        </label>
                      </div>

                      <div className="flex justify-between mb-2 pb-3">
                        <label className="text-sm text-gray-800 font-gilroy">
                          Booking Date
                        </label>
                        <label className="text-sm text-gray-800 font-gilroy font-semibold">
                          {tenant?.bookingDate || "N/A"}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}
BedDetails.propTypes = {
  handleCloseBed: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  handleShowCheck_In: PropTypes.func.isRequired,
  handleShowInActiveForm: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  showEditBed: PropTypes.func.isRequired,
};
export default BedDetails;
