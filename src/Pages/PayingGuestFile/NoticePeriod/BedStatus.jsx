/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import "../../../Pages/AssetFile/addAsset.css";
import CalenderTick from "../../../Assets/Images/New_images/calendar-tick.svg";
import TimerPause from "../../../Assets/Images/New_images/timer-pause.svg";
import logout from "../../../Assets/Images/New_images/logout.svg";
import AddPlus from "../../../Assets/Images/New_images/add-circle.png";
import Exchange from "../../../Assets/v2Images/exchange.svg";
import MakeAsInAcive from "../../../Assets/v2Images/Inactive.svg";
import { FiCalendar } from "react-icons/fi";
import Settings from "../../../Assets/v2Images/info-circle.svg";
import { useHasPermission } from "../../../Utils/Permission";
import { Calendar, Edit } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { LogoutCurve } from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
function NoticeBedStatusDetails({
  show,
  handleCloseBed,
  currentItem,
  showBooking,
  showNoticeperiodCheckout,
  showfinalsettelemnet,
  // handleOpenChangeBed,
  handleShowInActiveForm,
  handleOpenCancelCheckout,
  // handleDisplayCheckInForm,
  showEditBed,
  handleShowReassignBed,
  handleShowNoticePeriod,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  // const canWriteCustomers = useHasPermission("Customers", "canWrite")

  const {
    canWriteModule: canWriteCustomers,
    // canReadModule: canReadPayingGuests,
    // canUpdateModule: canUpdatePayingGuests,
    // canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Customers");

  const { canWriteModule: canWriteCheckout } = useHasPermission("Checkout");

  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");
  const {
    canUpdateModule: canUpdatePayingGuests,
    // canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");

  // const [recheckin, setRecheckin] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMenuForReserved, setActiveMenuForReserved] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState("");
  const popupRef = useRef(null);
  const isNoticeAndBooked = currentItem?.newTenantInfo?.length > 0;

  useEffect(() => {
    if (!selectedTenant?.tenetId) return;
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: selectedTenant?.tenetId },
    });
  }, [selectedTenant?.tenetId]);

  const handleEditBed = () => {
    showEditBed(true);
  };

  const handleShowDots = (type, tenant) => {
    setActiveMenu((prev) => (prev === type ? null : type));
    // console.log("tenant", tenant)
    setSelectedTenant(tenant);
  };

  const handleShowDotsForReserved = (type, tenant) => {
    setActiveMenuForReserved((prev) => (prev === type ? null : type));
    setSelectedTenant(tenant);
  };

  // const handleChangeBed = () => {
  //   handleOpenChangeBed(true)
  // }
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveMenu(null);
      setActiveMenuForReserved(null);
    }
  };

  const handleMakeAsInActive = (tenant) => {
    handleShowInActiveForm(true, tenant);
  };

  const handleRecheckInBed = (tenant) => {
    handleOpenCancelCheckout(true, tenant);
    // setBacktoCheckInForm(true)
    // setRecheckin(true)
  };

  const handleNewBooking = (tenant) => {
    showBooking(true, tenant);
  };

  // console.log("currentItem", currentItem)

  const handleCheckout = (tenantDetails) => {
    showNoticeperiodCheckout(true, tenantDetails);
    // dispatch({
    //   type: "GETCONFIRMCHECKOUTCUSTOMER",
    //   // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    // });
  };

  const matchedDataStatus =
    state.UsersList.customerdetails?.customerCurrentStatus;

  const handleFinalsettelmentGenerate = (tenant) => {
    showfinalsettelemnet(tenant);
    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    });
  };

  // const handleCheckInforBookingTenant = () => {
  //   handleDisplayCheckInForm(true)
  // }

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_InActive" });
      }, 1000);
    }
  }, [state.Booking.StatusCodeInactiveCode]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.UsersList.statusCodeForFinalSettlement === 201) {
      handleCloseBed();
      // dispatch({
      //   type: "USERLIST",
      //   payload: { hostel_id: state.login.selectedHostel_Id },
      // })
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: currentItem.roomId },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_FINAL_GENERATE" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForFinalSettlement]);

  useEffect(() => {
    if (state.UsersList.statuscodeForConformCheckout === 200) {
      handleCloseBed();
      // dispatch({
      //   type: "USERLIST",
      //   payload: { hostel_id: state.login.selectedHostel_Id },
      // });
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: currentItem.roomId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
      }, 500);
    }
  }, [state.UsersList.statuscodeForConformCheckout]);

  // useEffect(() => {
  //   dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  // }, [state.login.selectedHostel_Id])

  useEffect(() => {
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      handleCloseBed();
      // dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);
    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);

  const handleReAssignBed = (currentItem) => {
    // console.log("currentItem", currentItem);
    handleShowReassignBed(true, currentItem);
  };

  const handleMoveToNoticePeriod = (currentItem) => {
    handleShowNoticePeriod(true, currentItem);
  };

  const handleNavigateTenantProfile = (tenantDetails) => {
    if (tenantDetails) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: {
          customerId:
            tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId,
        },
      });
      navigate(
        `/tenant/details/${tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId}`,
        {
          state: {
            customerId:
              tenantDetails.currentTenantInfo?.tenetId ||
              tenantDetails?.tenetId,
            hostelId: state.login.selectedHostel_Id,
            name:
              tenantDetails.currentTenantInfo?.tenantFullName ||
              tenantDetails?.tenantFullName,
            isPgWay: true,
          },
        },
      );
      dispatch({ type: "UPDATE_USERSLIST_FALSE" });
    }
  };

  const handleNavigateReservedTenantProfile = (tenantDetails) => {
    if (tenantDetails) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: tenantDetails?.tenetId },
      });
      navigate(`/tenant/details/${tenantDetails?.tenetId}`, {
        state: {
          customerId: tenantDetails?.tenetId,
          hostelId: state.login.selectedHostel_Id,
          name: tenantDetails?.tenantFullName,
          isPgWay: true,
        },
      });
      dispatch({ type: "UPDATE_USERSLIST_FALSE" });
    }
  };

  const hasCheckinAndNotice =
    currentItem?.currentTenantInfo?.some(
      (t) => t.currentStatus === "CHECKIN",
    ) &&
    currentItem?.currentTenantInfo?.some((t) => t.currentStatus === "NOTICE");

  // console.log("hasCheckinAndNotice", hasCheckinAndNotice);
  return (
    <>
      <div className="modal show block static font-gilroy">
        <Modal show={show} onHide={handleCloseBed} centered>
          <Modal.Dialog className="w-full max-w-full rounded-2xl m-0 p-0">
            <Modal.Header className="pb-0 border border-gray-200">
              <div className="flex justify-between w-full pr-2.5 pb-2 pl-1">
                <div>
                  <div>
                    <Modal.Title className="!text-lg !text-gray-900 !font-semibold font-gilroy">
                      Bed Status
                    </Modal.Title>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-blue-600 font-gilroy font-medium">
                      {currentItem?.floorName}
                    </label>
                    <span className="text-sm text-blue-600 font-gilroy font-medium">
                      |
                    </span>
                    <label className="text-sm text-blue-600 font-gilroy font-medium">
                      {currentItem?.roomName}
                    </label>
                    <span className="text-sm text-[#1E45E1] font-gilroy font-medium">
                      |
                    </span>
                    <span className="text-sm text-blue-600 font-gilroy font-medium">
                      {currentItem?.bedName}
                    </span>
                  </div>
                </div>

                <div className="m-0 flex items-center gap-1 h-fit p-2.5 text-sm font-gilroy font-semibold text-red-600 bg-red-50 rounded-full">
                  Notice Period
                </div>
              </div>
            </Modal.Header>

            <Modal.Body className="show-scrolls pr-4 p-[5px_20px] max-h-[480px] overflow-y-scroll">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12">
                  <div className="flex justify-between items-center">
                    <label className="-mt-1 mb-1 text-base text-gray-900 font-gilroy font-medium">
                      {isNoticeAndBooked
                        ? "Currently Occupied by"
                        : " Occupied by"}
                    </label>
                  </div>

                  {currentItem?.currentTenantInfo?.map((tenant, index) => (
                    <div key={tenant.tenetId || index} className="mb-3">
                      <div className="flex gap-3 items-center justify-between">
                        <div className="flex gap-3 items-center justify-between">
                          <div className="flex gap-3 items-center">
                            <div>
                              {tenant?.profilePic &&
                              tenant?.profilePic !== "0" ? (
                                <Image
                                  src={tenant?.profilePic}
                                  roundedCircle
                                  className="h-12 w-12"
                                  alt="image"
                                />
                              ) : (
                                <div className="h-14 w-14 rounded-full bg-blue-800 flex justify-center items-center text-xl font-semibold text-white font-gilroy">
                                  {tenant?.tenantInitials || "-"}
                                </div>
                              )}
                            </div>
                            <div className="mt-2">
                              <div>
                                <label
                                  className="text-base text-blue-600 font-gilroy font-bold underline cursor-pointer"
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
                        </div>

                        <div
                          onClick={() => handleShowDots(index, tenant)}
                          className={`cursor-pointer h-10 w-10 flex justify-center items-center relative rounded-full ${
                            activeMenu === index ? "bg-blue-100" : "bg-white"
                          }`}
                        >
                          <PiDotsThreeOutlineFill className="h-6 w-6" />
                          {activeMenu === index && (
                            <div
                              ref={popupRef}
                              className="absolute right-16 -top-3 w-fit  flex flex-col rounded-lg bg-gray-100 border border-gray-200 shadow-md z-50"
                            >
                              {(matchedDataStatus === "NOTICE" ||
                                matchedDataStatus ===
                                  "SETTLEMENT_GENERATED") && (
                                <>
                                  <div
                                    onClick={
                                      canWriteBooking
                                        ? () => handleNewBooking(tenant)
                                        : undefined
                                    }
                                    className={`flex gap-2 items-center   px-2.5 pe-5 py-2.5 rounded-b-lg ${
                                      canWriteBooking
                                        ? "cursor-pointer opacity-100"
                                        : "cursor-not-allowed opacity-50"
                                    }`}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "#FFF3F3";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <img
                                      src={TimerPause}
                                      alt="booking"
                                      style={{
                                        filter: canWriteBooking
                                          ? "none"
                                          : "grayscale(100%)",
                                      }}
                                    />
                                    <label
                                      className={`text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                        canWriteBooking
                                          ? "text-gray-900 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                      }`}
                                    >
                                      New Booking
                                    </label>
                                  </div>
                                  <div className="h-px bg-gray-300" />
                                </>
                              )}

                              {matchedDataStatus === "NOTICE" && (
                                <div>
                                  <div
                                    onMouseEnter={() => {
                                      if (hasCheckinAndNotice)
                                        setShowTooltip(true);
                                    }}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    onClick={() => {
                                      if (hasCheckinAndNotice) return;
                                      handleRecheckInBed(tenant);
                                    }}
                                    className={`flex gap-2 items-center px-2.5 pe-5 py-2.5 rounded-t-lg ${
                                      canWriteCustomers && !hasCheckinAndNotice
                                        ? "cursor-pointer opacity-100"
                                        : "cursor-not-allowed opacity-50"
                                    }`}
                                    // onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                                    // onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                  >
                                    <Calendar
                                      className="flex-shrink-0"
                                      size="16"
                                      style={{
                                        filter:
                                          canWriteCustomers &&
                                          !hasCheckinAndNotice
                                            ? "none"
                                            : "grayscale(100%)",
                                      }}
                                    />

                                    <label
                                      className={`text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                        canWriteCustomers &&
                                        !hasCheckinAndNotice
                                          ? "text-gray-900 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                      }`}
                                    >
                                      Cancel Checkout
                                    </label>
                                  </div>
                                  {showTooltip && (
                                    <div className="flex absolute shadow-md bg-purple-100 gap-1 text-gray-900 text-xs p-2.5 rounded-md whitespace-normal pointer-events-none z-50 w-56 font-gilroy -top-1/2 left-1/2 -translate-x-1/2">
                                      <AiOutlineExclamationCircle
                                        size={24}
                                        color="#1E45E1"
                                      />{" "}
                                      Not able to recheck-in because already
                                      tenant checked in
                                    </div>
                                  )}

                                  <div className="h-px bg-gray-300" />
                                  <div
                                    onClick={() =>
                                      canWriteCheckout &&
                                      handleFinalsettelmentGenerate(tenant)
                                    }
                                    className={`flex gap-2 items-center px-2.5 pe-5 py-2.5 rounded-b-lg ${
                                      canWriteCheckout
                                        ? "cursor-pointer opacity-100"
                                        : "cursor-not-allowed opacity-50"
                                    }`}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "#FFF3F3";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <img
                                      src={logout}
                                      alt="Checkout"
                                      style={{
                                        filter: canWriteCheckout
                                          ? "none"
                                          : "grayscale(100%)",
                                      }}
                                    />

                                    <label
                                      className={`text-sm font-medium font-gilroy whitespace-nowrap mb-0 ${
                                        canWriteCheckout
                                          ? "text-gray-900 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                      }`}
                                    >
                                      Generate
                                    </label>
                                  </div>
                                  {/* {hasCheckinAndNotice && (
                                    <>
                                      <div className="h-px bg-gray-300" />
                                      <div
                                        className={`flex gap-2 items-center p-2.5 rounded-b-lg ${
                                          canWriteCustomers
                                            ? "cursor-pointer opacity-100"
                                            : "cursor-not-allowed opacity-60"
                                        }`}
                                        onClick={() =>
                                          canWriteCustomers &&
                                          handleReAssignBed(tenant)
                                        }
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            "#F0F4FF";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            "transparent";
                                        }}
                                      >
                                        <FiCalendar
                                          size={16}
                                          color={
                                            canWriteCustomers
                                              ? "#1E45E1"
                                              : "#A9A9A9"
                                          }
                                        />
                                        <label
                                          className={`text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                            canWriteCustomers
                                              ? "cursor-pointer"
                                              : "cursor-not-allowed"
                                          }`}
                                        >
                                          Change Bed check
                                        </label>
                                      </div>
                                    </>
                                  )} */}
                                </div>
                              )}

                              {matchedDataStatus === "CHECK_IN" && (
                                <div>
                                  <div
                                    className={`flex gap-2 items-center px-2.5 pe-5 py-2.5 rounded-b-lg ${
                                      canWriteCustomers
                                        ? "cursor-pointer opacity-100"
                                        : "cursor-not-allowed opacity-60"
                                    }`}
                                    onClick={() =>
                                      canWriteCustomers &&
                                      handleReAssignBed(tenant)
                                    }
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "#F0F4FF";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <FiCalendar
                                      size={16}
                                      color={
                                        canWriteCustomers
                                          ? "#1E45E1"
                                          : "#A9A9A9"
                                      }
                                    />
                                    <label
                                      className={`text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                        canWriteCustomers
                                          ? "cursor-pointer"
                                          : "cursor-not-allowed"
                                      }`}
                                    >
                                      Change Bed
                                    </label>
                                  </div>

                                  <div className="h-px bg-gray-300" />
                                  <div
                                    className={`flex gap-2 items-center px-2.5 pe-5 py-2.5 rounded-b-lg ${
                                      canWriteCustomers
                                        ? "cursor-pointer opacity-100"
                                        : "cursor-not-allowed opacity-60"
                                    }`}
                                    onClick={() =>
                                      canWriteCustomers &&
                                      handleMoveToNoticePeriod(tenant)
                                    }
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "#FFF3F3";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    }}
                                  >
                                    <LogoutCurve
                                      className="flex-shrink-0"
                                      size="18"
                                      color={
                                        canWriteCustomers
                                          ? "#FF9500"
                                          : "#A9A9A9"
                                      }
                                    />
                                    <label
                                      className={`text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                        canWriteCustomers
                                          ? "text-gray-900 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                      }`}
                                    >
                                      Move To Notice Period
                                    </label>
                                  </div>
                                </div>
                              )}

                              {matchedDataStatus === "SETTLEMENT_GENERATED" && (
                                <div
                                  className={`flex gap-2 items-center px-2.5 pe-5 py-2.5 rounded-b-lg ${
                                    canWriteCheckout
                                      ? "cursor-pointer opacity-100"
                                      : "cursor-not-allowed opacity-50"
                                  }`}
                                  onClick={
                                    canWriteCheckout
                                      ? () => handleCheckout(tenant)
                                      : undefined
                                  }
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#FFF3F3";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                  }}
                                >
                                  <img
                                    src={logout}
                                    alt="Checkout"
                                    style={{
                                      filter: canWriteCheckout
                                        ? "none"
                                        : "grayscale(100%)",
                                    }}
                                  />
                                  <label
                                    className={`text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                      canWriteCheckout
                                        ? "text-gray-900 cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed"
                                    }`}
                                  >
                                    Check-out
                                  </label>
                                </div>
                              )}

                              <div className="h-px bg-gray-300" />

                              <div
                                className={`flex gap-2 items-center px-2.5 pe-5 py-2.5 rounded-b-lg ${
                                  canUpdatePayingGuests
                                    ? "cursor-pointer opacity-100"
                                    : "cursor-not-allowed opacity-60"
                                }`}
                                onClick={() =>
                                  canUpdatePayingGuests
                                    ? handleEditBed()
                                    : undefined
                                }
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "#FFF3F3";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                }}
                              >
                                <Edit
                                  size="16"
                                  color={
                                    !canUpdatePayingGuests
                                      ? "#888888"
                                      : "#1E45E1"
                                  }
                                  className="ml-0.5"
                                />
                                <label
                                  className={`ml-1 text-sm font-medium font-gilroy mb-0 whitespace-nowrap ${
                                    canUpdatePayingGuests
                                      ? "text-gray-900 cursor-pointer"
                                      : "text-gray-400 cursor-not-allowed"
                                  }`}
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between mb-1 mt-2">
                        <div>
                          <label className="font-gilroy text-sm text-gray-900">
                            Rental Amount
                          </label>
                        </div>
                        <div>
                          <label className="font-gilroy text-sm text-gray-900 font-semibold">
                            ₹{tenant?.rentAmount}
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between mb-1">
                        <div>
                          <label className="font-gilroy text-sm text-gray-900">
                            Check-In Date
                          </label>
                        </div>
                        <div>
                          <label className="font-gilroy text-sm text-gray-900 font-semibold">
                            {tenant?.joiningDate}
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between mb-1">
                        <div>
                          <label className="font-gilroy text-sm text-gray-900">
                            Last Invoice
                          </label>
                        </div>
                        <div>
                          <label className="font-gilroy text-sm text-blue-600 font-semibold">
                            {tenant?.lastInvoiceNumber || "N/A"}

                            {tenant?.totalInvoices > 1 && (
                              <span className="ml-1 font-normal text-blue-600">
                                & {tenant.totalInvoices - 1} more
                              </span>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between mb-1">
                        <div>
                          <label className="font-gilroy text-sm text-gray-900">
                            Checkout Date
                          </label>
                        </div>
                        <div>
                          <label className="font-gilroy text-sm text-black font-semibold">
                            {tenant?.leavingDate || "N/A"}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isNoticeAndBooked && (
                <div className="grid grid-cols-12">
                  <hr className="col-span-12 !border !border-gray-400" />
                  <div className="col-span-12 ">
                    <div className="flex justify-between items-center">
                      <label className="mb-1 text-base text-gray-900 font-gilroy font-medium">
                        Reserved by
                      </label>
                    </div>
                    {currentItem?.newTenantInfo?.map((tenant, index) => (
                      <div key={index}>
                        <div className="flex gap-3 items-center justify-between">
                          <div className="flex gap-3 items-center">
                            <div>
                              {tenant?.profilePic &&
                              tenant?.profilePic !== "0" ? (
                                <Image
                                  src={tenant?.profilePic}
                                  roundedCircle
                                  className="h-12 w-12"
                                  alt="image"
                                />
                              ) : (
                                <div className="h-14 w-14 rounded-full bg-blue-800 flex justify-center items-center text-xl font-semibold text-white font-gilroy">
                                  {tenant?.tenantInitials || "-"}
                                </div>
                              )}
                            </div>
                            <div className="mt-2">
                              <div>
                                <label
                                  className="text-base text-blue-600 font-gilroy font-bold underline cursor-pointer"
                                  onClick={() =>
                                    handleNavigateReservedTenantProfile(tenant)
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
                            onClick={() =>
                              handleShowDotsForReserved(index, tenant)
                            }
                            className={`flex justify-center items-center relative h-10 w-10 cursor-pointer rounded-full ${
                              activeMenuForReserved === index
                                ? "bg-blue-100"
                                : "bg-white"
                            }`}
                          >
                            <PiDotsThreeOutlineFill className="h-6 w-6" />
                            {activeMenuForReserved === index && (
                              <div
                                ref={popupRef}
                                className="absolute right-16 -top-8 w-40 flex flex-col bg-gray-100 border border-gray-300 rounded-lg shadow-md z-50"
                              >
                                <div
                                  onMouseEnter={(e) => {
                                    if (!currentItem.isOccupied) {
                                      e.currentTarget.style.backgroundColor =
                                        "#FFF3F3";
                                    } else {
                                      const tooltip =
                                        e.currentTarget.querySelector(
                                          ".tooltip-msg",
                                        );
                                      const rect =
                                        e.currentTarget.getBoundingClientRect();

                                      tooltip.style.display = "block";
                                      tooltip.style.top = `${rect.bottom - 150}px`;
                                      tooltip.style.left = `${rect.left - 100}px`;
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!currentItem.isOccupied) {
                                      e.currentTarget.style.backgroundColor =
                                        "transparent";
                                    } else {
                                      const tooltip =
                                        e.currentTarget.querySelector(
                                          ".tooltip-msg",
                                        );
                                      tooltip.style.display = "none";
                                    }
                                  }}
                                  // onClick={
                                  //   canWriteCustomers && !currentItem.isOccupied
                                  //     ? () => handleCheckIn(currentItem)
                                  //     : undefined
                                  // }
                                  className={`flex gap-2 items-center relative z-[2000] p-2.5 rounded-b-lg ${
                                    canWriteCustomers && !currentItem.isOccupied
                                      ? "cursor-pointer opacity-100"
                                      : "cursor-not-allowed opacity-60"
                                  }`}
                                >
                                  <img
                                    src={AddPlus}
                                    alt="booking"
                                    style={{
                                      filter:
                                        canWriteCustomers &&
                                        !currentItem.isOccupied
                                          ? "none"
                                          : "grayscale(100%) brightness(60%)",
                                      cursor:
                                        canWriteCustomers &&
                                        !currentItem.isOccupied
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                  />
                                  <label
                                    className={`ml-0.5 text-sm font-medium font-gilroy mb-0 ${
                                      canWriteCustomers &&
                                      !currentItem.isOccupied
                                        ? "text-gray-900 cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed"
                                    }`}
                                  >
                                    Check-In
                                  </label>

                                  <div>
                                    <div className="hidden fixed bg-amber-100 border border-amber-300 text-amber-900 px-3 py-2 rounded-md text-xs font-medium font-gilroy shadow-md z-[9999] tooltip-msg w-[250px]">
                                      <div className="flex items-center gap-1">
                                        <img src={Settings} alt="alt" />
                                        Complete the Checkout Process for the
                                        Occupied tenant, then the button will
                                        appear
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`flex gap-2 items-center p-2.5 rounded-b-lg cursor-not-allowed opacity-50`}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#FFF3F3";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                  }}
                                >
                                  <img
                                    src={Exchange}
                                    alt="Checkout"
                                    style={{
                                      filter:
                                        canWriteCustomers &&
                                        "grayscale(100%) brightness(60%)",
                                      cursor:
                                        canWriteCustomers && "not-allowed",
                                    }}
                                  />
                                  <label
                                    className={`text-sm font-medium font-gilroy mb-0 text-gray-400 cursor-not-allowed
                                      `}
                                  >
                                    Change Bed
                                  </label>
                                </div>

                                <div
                                  className={`flex gap-2 items-center p-2.5 rounded-b-lg ${
                                    canWriteCustomers
                                      ? "cursor-pointer opacity-100"
                                      : "cursor-not-allowed opacity-50"
                                  }`}
                                  onClick={
                                    canWriteCustomers
                                      ? () => handleMakeAsInActive(tenant)
                                      : undefined
                                  }
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#FFF3F3";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                  }}
                                >
                                  <img
                                    src={MakeAsInAcive}
                                    alt="Checkout"
                                    style={{
                                      filter: canWriteCustomers
                                        ? "none"
                                        : "grayscale(100%) brightness(60%)",
                                      cursor: canWriteCustomers
                                        ? "pointer"
                                        : "not-allowed",
                                    }}
                                  />
                                  <label
                                    className={`text-sm font-medium font-gilroy mb-0 ${
                                      canWriteCustomers
                                        ? "text-gray-900 cursor-pointer"
                                        : "text-gray-300 cursor-not-allowed"
                                    }`}
                                  >
                                    Make as Inactive
                                  </label>
                                </div>

                                <div
                                  className={`flex gap-2 items-center p-2.5 rounded-b-lg ${
                                    canUpdatePayingGuests
                                      ? "cursor-pointer opacity-100"
                                      : "cursor-not-allowed opacity-60"
                                  }`}
                                  onClick={() =>
                                    canUpdatePayingGuests
                                      ? handleEditBed()
                                      : undefined
                                  }
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "#FFF3F3";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                      "transparent";
                                  }}
                                >
                                  <Edit
                                    size="16"
                                    color={
                                      !canUpdatePayingGuests
                                        ? "#888888"
                                        : "#1E45E1"
                                    }
                                    className="ml-0"
                                  />
                                  <label
                                    className={`text-sm font-medium font-gilroy mb-0 ${
                                      canUpdatePayingGuests
                                        ? "text-gray-900 cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed"
                                    }`}
                                  >
                                    Edit
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between mb-1 mt-1">
                          <div>
                            <label className="font-gilroy text-sm text-gray-900">
                              Booking Amount
                            </label>
                          </div>
                          <div>
                            <label className="font-gilroy text-sm text-gray-900 font-semibold">
                              {tenant?.bookingAmount || "N/A"}
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-between mb-1">
                          <div>
                            <label className="font-gilroy text-sm text-gray-900">
                              Check-In Date
                            </label>
                          </div>
                          <div>
                            <label className="font-gilroy text-sm text-gray-900 font-semibold">
                              {tenant?.joiningDate || "N/A"}
                            </label>
                          </div>
                        </div>

                        {/* <div className="flex justify-between mb-1">
                          <div>
                            <label className="font-gilroy text-sm text-gray-900">
                              Last Invoice
                            </label>
                          </div>
                          <div>
                            <label className="font-gilroy text-sm text-gray-900 font-semibold">
                              {tenant?.lastInvoiceNumber || "N/A"}{" "}
                              {tenant?.totalInvoices > 1 &&
                                `& ${tenant.totalInvoices}`}
                              {tenant?.totalInvoices > 2 && (
                                <span className="ml-1 font-normal">
                                  (+{tenant.totalInvoices - 1} more)
                                </span>
                              )}
                            </label>
                          </div>
                        </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}
NoticeBedStatusDetails.propTypes = {
  handleCloseBed: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  showNoticeperiodCheckout: PropTypes.func.isRequired,
  showBooking: PropTypes.func.isRequired,
  showfinalsettelemnet: PropTypes.func.isRequired,
  handleShowInActiveForm: PropTypes.func.isRequired,
  handleOpenCancelCheckout: PropTypes.func.isRequired,
  showEditBed: PropTypes.func.isRequired,
  handleShowReassignBed: PropTypes.func.isRequired,
  handleShowNoticePeriod: PropTypes.func.isRequired,
};
export default NoticeBedStatusDetails;
