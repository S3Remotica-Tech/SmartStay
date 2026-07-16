/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Green from "../../Assets/Images/New_images/Frame.png";
import White from "../../Assets/Images/New_images/empty_bed.png";
import { FaSquarePlus } from "react-icons/fa6";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import overDude from "../../Assets/Images/New_images/overDue.png";
import AddBedUI from "./AddBed";
import PropTypes from "prop-types";
import EmptyBed from "./EmptyBed";
import BedDetails from "./ReservedBed/BedDetails";
import Check_In from "../PayingGuestFile/ReservedBed/Check_In";
import MakeAsInactive from "../CustomerFile/MakeAsInactive";
import OccupiedBedStatus from "./OccupiedBeds/OccupiedBedStatus";
import ChangeBedTenantWay from "../CustomerFile/ChangeBedTenantWay";
import MoveToNoticePGAndTenant from "../CustomerFile/MoveToNoticePGAndTenant";
import NoticeBedStatusDetails from "./NoticePeriod/BedStatus";
import BookingBed from "./NoticePeriod/BookingBed";
import PGAssignTenant from "./PGAssignTenant";
import OccupiedCustomer from "./OccupiedCustomer";
import DeleteBed from "./DeleteBed";
import DueCustomerConfirmCheckout from "../CustomerFile/DueCustomerConfirmCheckout";
import AddCustomerPG from "./AddCustomerPG";
import { triggerPG } from "../../Redux/Action/LoginAction";
import Tick from "../../Assets/v2Images/Tick.svg";
import ConfirmChangeBed from "./NoticePeriod/ConfirmChangedBed";
import { useHasPermission } from "../../Utils/Permission";
import BackToCheckIn from "../CustomerFile/BackToCheckIn";
import { clickedBedForChange } from "../../Redux/Action/LoginAction";
import FinalOld from "../CustomerFile/FinalOld";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import BookingToCheckin from "../CustomerFile/BookingToCheckin";
function BedDetailsMap({ room, propsValue, selectedBed, setSelectedBed }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [hoveredBedId, setHoveredBedId] = useState(null);
  const [emptybed, setEmptyBed] = useState(false);
  const [showReservedBed, setShowReservedBed] = useState(false);
  const [occupiedCustomer, setOccupiedCustomer] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showInactive, setShowInActive] = useState(false);
  const [Noticeperiod_booking, setNoticePeriodBooking] = useState(false);
  const [Noticeperiod_checkout, setNoticePeriodCheckout] = useState(false);
  const [showReAssignBedForm, setShowReAssignBedForm] = useState(false);
  const [moveToNoticePeriodForm, setMoveToNoticePeriodForm] = useState(false);
  const [customerDetails, setCustomerDetails] = useState("");
  const [Occubied_bed, setOccubiedBed] = useState(false);
  const [Noticeperiod_bed, setNoticePeriodBed] = useState(false);

  const [showbookingToCheckIn, setShowbookingToCheckIn] = useState(false);

  const [deleteBedDetails, setDeleteBedDetails] = useState({
    bed: null,
    room: null,
  });

  // const [hoveredBedId, setHoveredBedId] = useState(null);
  const [customer, setCustomer] = useState([]);
  const [add_customerform, setAddCustomerForm] = useState(false);
  const [assign_tenantform, setAssignTenantForm] = useState(false);
  const [showDeleteBed, setShowDeleteBed] = useState(false);
  const [showBed, setShowBed] = useState(false);
  const [details, setDetails] = useState("");
  const [makeasinactive, setMakeasInactive] = useState(false);
  const [finalsettlepage, setFinalSettlePage] = useState(false);
  const [showConfirmChangeBedModal, setShowConfirmChangeBedModal] =
    useState(false);
  const [clickedBed, setClickedBed] = useState("");
  const [changeBedClicked, setChangedBedClicked] = useState("");
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false);
  const [editBedMode, setEditBedMode] = useState(false);

  const { canWriteModule: canWritePayingGuests } =
    useHasPermission("Paying Guests");

  const handleshowfinalsettlement = (tenantDetails) => {
    // setFinalSettlePage(isvisible)
    setNoticePeriodBed(false);
    setSelectedTenant(tenantDetails);

    navigate(`/tenant/final-settlement/${tenantDetails?.customerId}`, {
      state: {
        data: tenantDetails,
        isPGWay: true,
        customer: customer,
      },
    });
  };

  const handleClosefinalsettelment = () => {
    setFinalSettlePage(false);
  };
  const handleShowReservedBed = () => {
    setShowReservedBed(true);
  };

  const handleCloseReservedBed = () => {
    setShowReservedBed(false);
  };

  const handleCloseBackToCheckIn = () => {
    setBacktoCheckInForm(false);
  };

  useEffect(() => {
    if (state.UsersList.cancelCheckoutStatusCode === 200) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      setBacktoCheckInForm(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_CANCEL_CHECKOUT" });
      }, 100);
    }
  }, [state.UsersList.cancelCheckoutStatusCode]);

  const handleCloseReassignForm = () => {
    setShowReAssignBedForm(false);
  };

  const handleShowReAssignBedPopup = (isVisible, customer) => {
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: customer?.tenetId },
    });
    setOccubiedBed(false);
    dispatch(triggerPG(true));
    setNoticePeriodBed(false);
  };

  const handleShowNoticePeriod = (isVisible, customer) => {
    setNoticePeriodBed(false);
    setOccubiedBed(false);
    setMoveToNoticePeriodForm(isVisible);
    setCustomerDetails(customer);
  };

  const handleCloseNoticePeriod = () => {
    setMoveToNoticePeriodForm(false);
  };

  const handleShowCheck_In = (isVisible, reservedTenant) => {
    setShowbookingToCheckIn(true);
    setShowReservedBed(false);
    setSelectedTenant(reservedTenant);
    setOccubiedBed(false);
  };

  // console.log("showCheckIn", showbookingToCheckIn);
  const handleCloseCheck_In = () => {
    setShowbookingToCheckIn(false);
  };

  const handleShowMakeAsInActive = () => {
    setShowInActive(true);
    setShowReservedBed(false);
  };

  const handleCloseMakeAsInActive = () => {
    setShowInActive(false);
    dispatch({ type: "REMOVE_ERROR_MAKEASINACTIVE" });
  };

  const handlecloseoccubiedbed = () => {
    setOccubiedBed(false);
  };

  const handlecloseNoticePeriodBed = () => {
    setNoticePeriodBed(false);
  };

  const handleshowNoticePeriodBooking = (isVisible, tenantDetails) => {
    setNoticePeriodBooking(isVisible);
    setNoticePeriodBed(false);
    setSelectedTenant(tenantDetails);
  };

  const handlecloseNoticeperiodBooking = () => {
    setNoticePeriodBooking(false);
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
  };

  const handleshowNoticePeriodCheckout = (isVisible, tenantDetails) => {
    setNoticePeriodCheckout(isVisible);
    setNoticePeriodBed(false);
    // setCustomerID(customerId)
    setSelectedTenant(tenantDetails);
  };

  const handlecloseNoticeperiodCheckout = () => {
    setNoticePeriodCheckout(false);
  };

  const handleShowAddCustomer = () => {
    setAddCustomerForm(true);
    setEmptyBed(false);
  };

  const handleCloseAddCustomer = () => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setAddCustomerForm(false);
    setEmptyBed(false);
  };

  const handleShowAssignTenant = (isVisible) => {
    setAssignTenantForm(isVisible);
    setEmptyBed(false);
  };

  const handleCloseAssignTenant = () => {
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR" });
    setAssignTenantForm(false);
  };

  const handleShowBed = () => {
    setShowDeleteBed(true);
    setEmptyBed(false);
  };

  const handleCloseDeleteBed = () => {
    setShowDeleteBed(false);
  };

  const handleCloseOccupiedCustomer = () => {
    setOccupiedCustomer(false);
  };

  const handleAddBed = (item, Room_Id) => {
    setShowBed(true);
    setDetails({ item, Room_Id });
    setEditBedMode(false);
  };

  const handleEditBed = () => {
    setEmptyBed(false);
    setOccubiedBed(false);
    setShowBed(true);
    setEditBedMode(true);
    setNoticePeriodBed(false);
    setShowReservedBed(false);
  };

  const handlecloseBed = () => {
    setEmptyBed(false);
  };

  const [selectedTenant, setSelectedTenant] = useState(null);

  useEffect(() => {
    if (
      state.PgList?.OccupiedCustomer &&
      state.PgList?.OccupiedCustomer?.currentTenantInfo?.[0]?.tenetId
    ) {
      dispatch(clickedBedForChange(state.PgList?.OccupiedCustomer));
    }
  }, [state.PgList?.OccupiedCustomer]);

  const handleclickBed = (bed, room) => {
    dispatch({ type: "OCCUPIEDCUSTOMER", payload: { bedId: bed.id } });

    if (!state.login.isTrigger) {
      if (bed.isBooked && !bed.isOccupied) {
        setShowReservedBed(true);
      } else if (!bed.isOccupied) {
        setEmptyBed(true);
        setDeleteBedDetails({ bed, room });
      } else if (bed.onNotice && bed.isOccupied) {
        setOccubiedBed(false);
        setNoticePeriodBed(true);
      } else if (bed.isOccupied) {
        setOccubiedBed(true);
      }
    }

    setClickedBed(bed);
  };

  const handleclickBedForChangeBed = (bed) => {
    if (selectedBed?.bedId === bed.id) {
      setSelectedBed(null);
      setChangedBedClicked(null);
      return;
    }

    setSelectedBed({
      bedId: bed.id,
      roomId: bed.roomId,
    });
    dispatch({ type: "OCCUPIEDCUSTOMER", payload: { bedId: bed.id } });
    setChangedBedClicked(bed);
  };

  const handleShowInActiveForm = (isVisible, reservedTenant) => {
    setMakeasInactive(isVisible);
    setShowReservedBed(false);
    setNoticePeriodBed(false);
    setSelectedTenant(reservedTenant);
    setOccubiedBed(false);
  };

  const handleOpenCancelCheckout = (isVisible, tenantDetails) => {
    setNoticePeriodBed(false);
    setBacktoCheckInForm(isVisible);
    setSelectedTenant(tenantDetails);
  };

  const handleCloseInActive = () => {
    setMakeasInactive(false);
  };

  const handleOpenChangeBed = () => {
    setNoticePeriodBed(false);
    dispatch(triggerPG(true));
  };

  const handleCloseChangedBed = () => {
    setShowConfirmChangeBedModal(false);
    setChangedBedClicked("");
    setSelectedBed(null);
  };

  const handleShowConfirmChangeBed = () => {
    setShowConfirmChangeBedModal(true);
  };

  const handleDisplayCheckInForm = () => {
    setShowCheckIn(true);
    setNoticePeriodBed(false);
  };

  useEffect(() => {
    if (!state.login.isTrigger) {
      setChangedBedClicked(null);
      setSelectedBed(null);
    }
  }, [state.login.isTrigger]);

  useEffect(() => {
    if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
      setCustomer(state.PgList?.OccupiedCustomer);

      setTimeout(() => {
        dispatch({ type: "CLEAR_OCCUPED_CUSTOMER_STATUSCODE" });
      }, 100);
    }
  }, [state.PgList.OccupiedCustomerGetStatusCode]);

  useEffect(() => {
    if (room.id) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
    }
  }, [room]);

  useEffect(() => {
    if (
      state.PgList.createBedStatusCode === 201 ||
      state.PgList.updateBedStatusCode === 200
    ) {
      setShowBed(false);
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_CREATE_BED_STATUS_CODE" });
        dispatch({ type: "CLEAR_UPDATE_BED_STATUS_CODE" });
      }, 4000);
    }
  }, [state.PgList.createBedStatusCode, state.PgList.updateBedStatusCode]);

  useEffect(() => {
    if (
      state.PgList.statusCodeDeleteBed === 200 ||
      state.PgList.statusCodeDeleteBed === 204
    ) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BED_STATUS_CODE" });
      }, 2000);
    }
  }, [state.PgList.statusCodeDeleteBed]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCheckInCustomer === 201) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      setAssignTenantForm(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES_CHECK_IN" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForCheckInCustomer]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForDirectCheckInCustomer === 201) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      setAssignTenantForm(false);

      dispatch({ type: "REMOVE_DIRECT_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.statusCodeForDirectCheckInCustomer]);

  useEffect(() => {
    if (state.UsersList?.bookingToCheckinSuccessCode === 201) {
      setShowbookingToCheckIn(false);

      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });

      dispatch({ type: "REMOVE_BOOKING_TO_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.bookingToCheckinSuccessCode]);

  const bedsForRoom = state.PgList?.bedList?.[room.id] || [];

  const [filteredBeds, setFilteredBeds] = useState([]);

  useEffect(() => {
    if (!state.login.isTrigger) {
      setFilteredBeds(bedsForRoom);
    } else {
      setFilteredBeds(bedsForRoom.filter((bed) => !bed.isOccupied));
    }
  }, [bedsForRoom, state.login.isTrigger]);
  // console.log("filteredBeds", filteredBeds);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      handleCloseAssignTenant();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (
      state.UsersList?.statusCodeForAddUser === 201 ||
      state.UsersList?.statusCodeForAddCustomerSaveInfo === 201
    ) {
      handleCloseAddCustomer();
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      setShowInActive(false);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_InActive" });
      }, 1000);
    }
  }, [state.Booking.StatusCodeInactiveCode]);

  useEffect(() => {
    if (state.UsersList.statusCodeForReassinBed === 200) {
      dispatch(triggerPG(false));
      setShowConfirmChangeBedModal(false);
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });

      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_REASSIGN_BED" });
      }, 200);
    }
  }, [state.UsersList.statusCodeForReassinBed]);

  return (
    <div>
      {bactocheckinForm && (
        <BackToCheckIn
          show={bactocheckinForm}
          handleClose={handleCloseBackToCheckIn}
          checkInDetails={selectedTenant}
          pgDetails={customer}
        />
      )}

      {showBed && (
        <AddBedUI
          show={showBed}
          setShowBed={setShowBed}
          currentItem={details}
          editBedMode={editBedMode}
          isOccupied={customer}
        />
      )}

      {showDeleteBed && (
        <DeleteBed
          show={showDeleteBed}
          handleClose={handleCloseDeleteBed}
          deleteBedDetails={deleteBedDetails}
        />
      )}

      {occupiedCustomer && (
        <OccupiedCustomer
          show={occupiedCustomer}
          handleClose={handleCloseOccupiedCustomer}
          currentItem={customer}
        />
      )}

      {emptybed && (
        <EmptyBed
          show={emptybed}
          handleClose={handlecloseBed}
          currentItem={customer}
          deleteBedDetails={deleteBedDetails}
          showbed={handleShowBed}
          showcustomer={handleShowAddCustomer}
          showtenant={handleShowAssignTenant}
          showEditBed={handleEditBed}
        />
      )}

      {add_customerform && (
        <AddCustomerPG
          showMenu={add_customerform}
          handleClose={handleCloseAddCustomer}
        />
      )}

      {assign_tenantform && (
        <PGAssignTenant
          show={assign_tenantform}
          handleClose={handleCloseAssignTenant}
          currentItem={customer}
        />
      )}

      {showReservedBed && (
        <BedDetails
          show={handleShowReservedBed}
          handleCloseBed={handleCloseReservedBed}
          handleShowCheck_In={handleShowCheck_In}
          MakeAsInActive={handleShowMakeAsInActive}
          currentItem={customer}
          handleShowInActiveForm={handleShowInActiveForm}
          showEditBed={handleEditBed}
        />
      )}

      {/* {showCheckIn && (
        <Check_In
          show={showCheckIn}
          handleClose={handleCloseCheck_In}
          currentItem={selectedTenant}
          pgDetails={customer}
        />
      )} */}

      {showbookingToCheckIn && selectedTenant && (
        <BookingToCheckin
          show={showbookingToCheckIn}
          handleClose={handleCloseCheck_In}
          tenantDetails={selectedTenant}
        />
      )}

      {showInactive && (
        <MakeAsInactive
          show={showInactive}
          handleCloseInActive={handleCloseMakeAsInActive}
        />
      )}

      {makeasinactive && (
        <MakeAsInactive
          show={makeasinactive}
          handleCloseInActive={handleCloseInActive}
          inActiveDetails={selectedTenant}
          currentItem={customer}
        />
      )}

      {showConfirmChangeBedModal && (
        <ConfirmChangeBed
          show={showConfirmChangeBedModal}
          handleClose={handleCloseChangedBed}
          previousBed={clickedBed}
          currentBed={changeBedClicked}
          customer={customer}
        />
      )}

      {Occubied_bed && (
        <OccupiedBedStatus
          show={Occubied_bed}
          showEditBed={handleEditBed}
          handleShowInActiveForm={handleShowInActiveForm}
          handleShowCheck_In={handleShowCheck_In}
          handleCloseBed={handlecloseoccubiedbed}
          currentItem={customer}
          handleShowReassignBed={handleShowReAssignBedPopup}
          handleShowNoticePeriod={handleShowNoticePeriod}
        />
      )}

      {Noticeperiod_bed && (
        <NoticeBedStatusDetails
          showEditBed={handleEditBed}
          show={Noticeperiod_bed}
          handleDisplayCheckInForm={handleDisplayCheckInForm}
          handleCloseBed={handlecloseNoticePeriodBed}
          currentItem={customer}
          handleShowReassignBed={handleShowReAssignBedPopup}
          showBooking={handleshowNoticePeriodBooking}
          showNoticeperiodCheckout={handleshowNoticePeriodCheckout}
          showfinalsettelemnet={handleshowfinalsettlement}
          handleOpenChangeBed={handleOpenChangeBed}
          handleShowInActiveForm={handleShowInActiveForm}
          handleOpenCancelCheckout={handleOpenCancelCheckout}
          handleShowNoticePeriod={handleShowNoticePeriod}
        />
      )}

      {showReAssignBedForm && (
        <ChangeBedTenantWay
          show={showReAssignBedForm}
          setCustomerReAssign={handleCloseReassignForm}
        />
      )}

      {Noticeperiod_booking && (
        <BookingBed
          show={Noticeperiod_booking}
          handleClose={handlecloseNoticeperiodBooking}
          currentItem={customer}
          selectedTenant={selectedTenant}
        />
      )}

      {Noticeperiod_checkout && (
        <DueCustomerConfirmCheckout
          show={Noticeperiod_checkout}
          handleClose={handlecloseNoticeperiodCheckout}
          data={selectedTenant}
          pgDetails={customer}
        />
      )}

      {moveToNoticePeriodForm &&
        (() => {
          return (
            <MoveToNoticePGAndTenant
              bedData={customer}
              data={customerDetails}
              customerCheckoutpage={moveToNoticePeriodForm}
              setCustomerCheckoutpage={handleCloseNoticePeriod}
            />
          );
        })()}

      {finalsettlepage && (
        <FinalOld
          show={finalsettlepage}
          handleClose={handleClosefinalsettelment}
          data={selectedTenant}
          pgDetails={customer}
        />
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start mx-0 max-h-60 py-1.5 overflow-y-auto overflow-x-hidden gap-x-3 gap-y-4">
        {Array.isArray(filteredBeds) && filteredBeds.length > 0 ? (
          filteredBeds.map((bed) => (
            <div
              key={`${bed.roomId}-${bed.id}`}
              className={`w-full flex justify-center px-1 ${propsValue.addPermissionError ? "disabled" : ""}`}
            >
              <div
                className={`flex flex-col items-center justify-start w-20 ${propsValue.addPermissionError ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="relative w-9 h-10">
                  {state.login.isTrigger &&
                    Number(selectedBed?.bedId) === Number(bed.id) &&
                    Number(selectedBed?.roomId) === Number(bed.roomId) && (
                      <div className="absolute inset-y-px -right-2.5 cursor-pointer z-40">
                        <img
                          src={Tick}
                          alt="alt-image"
                          className="h-5 w-5 cursor-pointer"
                        />
                      </div>
                    )}

                  {(bed.isBooked || bed.onNotice || bed.overDue) &&
                    (() => {
                      const activeStatuses = [
                        bed.isBooked,
                        bed.onNotice,
                        bed.overDue,
                      ].filter(Boolean);

                      const count = activeStatuses.length;

                      if (count === 1) {
                        return (
                          <div className="absolute -top-[2px] -right-[10px]">
                            {bed.isBooked && (
                              <img
                                src={recerverimg}
                                className="w-[20px] h-[20px] flex-shrink-0"
                              />
                            )}
                            {bed.onNotice && (
                              <img
                                src={noticeimg}
                                className="w-[20px] h-[20px] flex-shrink-0"
                              />
                            )}
                            {bed.overDue && (
                              <img
                                src={overDude}
                                className="w-[20px] h-[20px] flex-shrink-0"
                              />
                            )}
                          </div>
                        );
                      }

                      return (
                        <div
                          className={`absolute -top-[2px] -right-[10px] w-[22px] h-[22px]  ${hoveredBedId !== bed.id && count ? "border-2  bg-white border-green-600 rounded-full " : " bg-transparent"} text-[12px] font-bold text-green-600 flex items-center justify-center cursor-pointer`}
                          onMouseEnter={() => setHoveredBedId(bed.id)}
                          onMouseLeave={() => setHoveredBedId(null)}
                        >
                          {hoveredBedId !== bed.id && count}

                          {hoveredBedId === bed.id && (
                            <div
                              className="absolute top-0 left-0 -translate-x-1/2 bg-white rounded-full px-[6px] py-[3px]
                             flex items-center gap-[4px] shadow-md w-fit"
                            >
                              {bed.isBooked && (
                                <img
                                  src={recerverimg}
                                  className="w-[18px] h-[18px] flex-shrink-0"
                                />
                              )}
                              {bed.onNotice && (
                                <img
                                  src={noticeimg}
                                  className="w-[18px] h-[18px] flex-shrink-0"
                                />
                              )}
                              {bed.overDue && (
                                <img
                                  src={overDude}
                                  className="w-[18px] h-[18px] flex-shrink-0"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                  <img
                    className={`mt-1 h-10 w-9  cursor-pointer`}
                    src={bed.isOccupied ? Green : White}
                    alt="bedd"
                    onClick={() => {
                      if (!state.login.isTrigger) {
                        handleclickBed(bed, bed.roomId);
                      } else {
                        handleclickBedForChangeBed(bed, bed.roomId);
                      }
                    }}
                  />
                </div>

                <div className="pt-2 text-xs font-semibold font-montserrat">
                  {bed.bedName}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-2">
            <label className="text-xs font-gilroy text-neutral-600 whitespace-nowrap">
              No beds available
            </label>
          </div>
        )}

        {!state.login.isTrigger && (
          <div
            className={`w-full flex px-1 ${filteredBeds.length === 0 ? "col-span-full justify-center" : "justify-center"} ${propsValue.addPermissionError ? "pointer-events-none opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => {
              if (canWritePayingGuests) {
                handleAddBed(propsValue, room.id);
              }
            }}
          >
            <div className="flex flex-col items-center justify-center w-20">
              <FaSquarePlus
                className={`${propsValue.addPermissionError ? "text-gray-400" : "text-blue-600"} h-11 w-9`}
              />

              <div
                className={`pt-2 text-[10px] font-semibold font-montserrat ${!canWritePayingGuests ? "text-gray-400" : "text-blue-600"}`}
              >
                Add bed
              </div>
            </div>
          </div>
        )}

        {state.login.isTrigger &&
          changeBedClicked?.roomId &&
          selectedBed?.bedId && (
            <div className="fixed bottom-0 left-[19%] right-0 z-50 flex flex-wrap items-center justify-center border-t bg-white p-2">
              <div>
                <p className="m-0 text-sm font-semibold font-gilroy text-neutral-600">
                  Bed |{" "}
                  {Array.isArray(state.PgList?.bedList?.[room.id])
                    ? `${state.PgList.bedList[room.id].length} sharing`
                    : "0 sharing"}
                </p>

                <p>
                  <span className="text-base font-medium font-gilroy text-blue-700">
                    {` ${customer?.floorName || "N/A"} | ${customer?.roomName || "N/A"} | ${customer.bedName || "-"}`}
                  </span>
                </p>
              </div>

              <div className="ml-[200px]">
                <Button
                  className="rounded-xl bg-blue-700 px-5 py-2.5 text-base font-semibold font-gilroy text-white"
                  onClick={handleShowConfirmChangeBed}
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
BedDetailsMap.propTypes = {
  room: PropTypes.func.isRequired,
  propsValue: PropTypes.func.isRequired,
  selectedBed: PropTypes.shape({
    bedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    roomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),

  setSelectedBed: PropTypes.func.isRequired,
};
export default BedDetailsMap;
