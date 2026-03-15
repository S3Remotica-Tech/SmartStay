/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Green from '../../Assets/Images/New_images/Frame.png'
import White from '../../Assets/Images/New_images/empty_bed.png';
import { FaSquarePlus } from "react-icons/fa6";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import overDude from "../../Assets/Images/New_images/overDue.png";
import AddBedUI from './AddBed';
import PropTypes from "prop-types"
import EmptyBed from './EmptyBed';
import BedDetails from './ReservedBed/BedDetails';
import Check_In from "../PayingGuestFile/ReservedBed/Check_In"
import MakeAsInactive from '../CustomerFile/MakeAsInactive';
import OccupiedBedStatus from './OccupiedBeds/OccupiedBedStatus';
import CustomerReAssign from "../CustomerFile/CustomerReAssign";
import CustomerCheckout from "../CustomerFile/CustomerCheckout";
import NoticeBedStatusDetails from './NoticePeriod/BedStatus';
import BookingBed from './NoticePeriod/BookingBed';
import PGAssignTenant from './PGAssignTenant';
import OccupiedCustomer from './OccupiedCustomer';
import DeleteBed from './DeleteBed';
import DueCustomerConfirmCheckout from '../CustomerFile/DueCustomerConfirmCheckout';
import AddCustomerPG from './AddCustomerPG';
import { triggerPG } from '../../Redux/Action/LoginAction';
import Tick from '../../Assets/v2Images/Tick.svg'
import ConfirmChangeBed from './NoticePeriod/ConfirmChangedBed';
import { useHasPermission } from '../../Utils/Permission';
import BackToCheckIn from "../CustomerFile/BackToCheckIn";
import { clickedBedForChange } from '../../Redux/Action/LoginAction';
import FinalOld from '../CustomerFile/FinalOld';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
function BedDetailsMap({ room, propsValue,
    selectedBed,
    setSelectedBed }) {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const [emptybed, setEmptyBed] = useState(false)
    const [showReservedBed, setShowReservedBed] = useState(false)
    const [occupiedCustomer, setOccupiedCustomer] = useState(false)
    const [showCheckIn, setShowCheckIn] = useState(false)
    const [showInactive, setShowInActive] = useState(false)
    const [Noticeperiod_booking, setNoticePeriodBooking] = useState(false)
    const [Noticeperiod_checkout, setNoticePeriodCheckout] = useState(false)
    const [showReAssignBedForm, setShowReAssignBedForm] = useState(false);
    const [moveToNoticePeriodForm, setMoveToNoticePeriodForm] = useState(false);
    const [customerDetails, setCustomerDetails] = useState('');
    const [Occubied_bed, setOccubiedBed] = useState(false)
    const [Noticeperiod_bed, setNoticePeriodBed] = useState(false)
    const [deleteBedDetails, setDeleteBedDetails] = useState({ bed: null, room: null })
    const [customer, setCustomer] = useState([])
    const [add_customerform, setAddCustomerForm] = useState(false)
    const [assign_tenantform, setAssignTenantForm] = useState(false)
    const [showDeleteBed, setShowDeleteBed] = useState(false)
    const [showBed, setShowBed] = useState(false)
    const [details, setDetails] = useState('')
    const [makeasinactive, setMakeasInactive] = useState(false)
    const [finalsettlepage, setFinalSettlePage] = useState(false)
    const [showConfirmChangeBedModal, setShowConfirmChangeBedModal] = useState(false)
    const [clickedBed, setClickedBed] = useState('')
    const [changeBedClicked, setChangedBedClicked] = useState('')
    const [bactocheckinForm, setBacktoCheckInForm] = useState(false)
    const [editBedMode, setEditBedMode] = useState(false)

    const {
        canWriteModule: canWritePayingGuests,
    } = useHasPermission("Paying Guests");


    const handleshowfinalsettlement = (tenantDetails) => {
        // setFinalSettlePage(isvisible)
        setNoticePeriodBed(false)
        setSelectedTenant(tenantDetails)

        navigate(`/tenant/final-settlement/${tenantDetails?.customerId}`, {
            state: {
                data: tenantDetails,
                isPGWay: true
            }
        });


    }

    // console.log("customer",customer)

    const handleClosefinalsettelment = () => {
        setFinalSettlePage(false)
    }
    const handleShowReservedBed = () => {
        setShowReservedBed(true)
    }

    const handleCloseReservedBed = () => {
        setShowReservedBed(false)
    }

    const handleCloseBackToCheckIn = () => {
        setBacktoCheckInForm(false)
    }



    useEffect(() => {
        if (state.UsersList.cancelCheckoutStatusCode === 200) {
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            setBacktoCheckInForm(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_CANCEL_CHECKOUT' })
            }, 100)
        }

    }, [state.UsersList.cancelCheckoutStatusCode])


    const handleCloseReassignForm = () => {
        setShowReAssignBedForm(false)
    }

    const handleShowReAssignBedPopup = () => {
        setOccubiedBed(false)
        dispatch(triggerPG(true))
        setNoticePeriodBed(false)

    }
    const handleShowNoticePeriod = (isVisible, customer) => {
        setNoticePeriodBed(false)
        setOccubiedBed(false)
        setMoveToNoticePeriodForm(isVisible)
        setCustomerDetails(customer)

    }

    const handleCloseNoticePeriod = () => {
        setMoveToNoticePeriodForm(false)
    }



    const handleShowCheck_In = (isVisible, reservedTenant) => {
        setShowCheckIn(isVisible)
        setShowReservedBed(false)
        setSelectedTenant(reservedTenant)
        setOccubiedBed(false)

    }

    const handleCloseCheck_In = () => {
        setShowCheckIn(false)

    }



    const handleShowMakeAsInActive = () => {
        setShowInActive(true)
        setShowReservedBed(false)
    }

    const handleCloseMakeAsInActive = () => {
        setShowInActive(false)
        dispatch({ type: 'REMOVE_ERROR_MAKEASINACTIVE' })
    }

    const handlecloseoccubiedbed = () => {
        setOccubiedBed(false)
    }

    const handlecloseNoticePeriodBed = () => {
        setNoticePeriodBed(false)
    }

    const handleshowNoticePeriodBooking = (isVisible, tenantDetails) => {
        setNoticePeriodBooking(isVisible)
        setNoticePeriodBed(false)
        setSelectedTenant(tenantDetails)
    }

    const handlecloseNoticeperiodBooking = () => {
        setNoticePeriodBooking(false)
        dispatch({ type: "ERROR_BOOKING_REMOVE" })
    }


    const handleshowNoticePeriodCheckout = (isVisible, tenantDetails) => {
        setNoticePeriodCheckout(isVisible)
        setNoticePeriodBed(false)
        // setCustomerID(customerId)
        setSelectedTenant(tenantDetails)

    }

    const handlecloseNoticeperiodCheckout = () => {
        setNoticePeriodCheckout(false)
    }

    const handleShowAddCustomer = () => {
        setAddCustomerForm(true)
        setEmptyBed(false)
    }

    const handleCloseAddCustomer = () => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
        setAddCustomerForm(false)
        setEmptyBed(false)

    }

    const handleShowAssignTenant = (isVisible) => {
        setAssignTenantForm(isVisible)
        setEmptyBed(false)

    }

    const handleCloseAssignTenant = () => {
        dispatch({ type: "ERROR_BOOKING_REMOVE" })
        dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
        setAssignTenantForm(false)
    }

    const handleShowBed = () => {
        setShowDeleteBed(true)
        setEmptyBed(false)
    }

    const handleCloseDeleteBed = () => {
        setShowDeleteBed(false)
    }

    const handleCloseOccupiedCustomer = () => {
        setOccupiedCustomer(false)
    }




    const handleAddBed = (item, Room_Id) => {
        setShowBed(true)
        setDetails({ item, Room_Id });
        setEditBedMode(false)
    }

    const handleEditBed = () => {
        setEmptyBed(false)
        setOccubiedBed(false)
        setShowBed(true)
        setEditBedMode(true)
        setNoticePeriodBed(false)
        setShowReservedBed(false)
    }

    const handlecloseBed = () => {
        setEmptyBed(false)

    }

    const [selectedTenant, setSelectedTenant] = useState(null);


    useEffect(() => {
        if (state.PgList?.OccupiedCustomer && state.PgList?.OccupiedCustomer?.currentTenantInfo?.[0]?.tenetId) {
            dispatch(clickedBedForChange(state.PgList?.OccupiedCustomer));
        }
    }, [state.PgList?.OccupiedCustomer]);




    const handleclickBed = (bed, room) => {
        dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { bedId: bed.id } })

        if (!state.login.isTrigger) {

            if (bed.isBooked && !bed.isOccupied) {
                setShowReservedBed(true);

            }
            else if (!bed.isOccupied) {
                setEmptyBed(true);
                setDeleteBedDetails({ bed, room });

            }
            else if (bed.onNotice && bed.isOccupied) {
                setOccubiedBed(false);
                setNoticePeriodBed(true);
            }
            else if (bed.isOccupied) {
                setOccubiedBed(true);
            }
        }

        setClickedBed(bed)

    };

    const handleclickBedForChangeBed = (bed) => {
        if (selectedBed?.bedId === bed.id) {
            setSelectedBed(null);
            setChangedBedClicked(null);
            return;
        }

        setSelectedBed({
            bedId: bed.id,
            roomId: bed.roomId
        });
        dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { bedId: bed.id } })
        setChangedBedClicked(bed)
    }

    const handleShowInActiveForm = (isVisible, reservedTenant) => {
        setMakeasInactive(isVisible)
        setShowReservedBed(false);
        setNoticePeriodBed(false)
        setSelectedTenant(reservedTenant)
        setOccubiedBed(false);
    }

    const handleOpenCancelCheckout = (isVisible, tenantDetails) => {
        setNoticePeriodBed(false)
        setBacktoCheckInForm(isVisible)
        setSelectedTenant(tenantDetails)

    }


    const handleCloseInActive = () => {
        setMakeasInactive(false)
    }




    const handleOpenChangeBed = () => {
        setNoticePeriodBed(false)
        dispatch(triggerPG(true))
    }




    const handleCloseChangedBed = () => {
        setShowConfirmChangeBedModal(false)
        setChangedBedClicked('')
        setSelectedBed(null)
    }


    const handleShowConfirmChangeBed = () => {
        setShowConfirmChangeBedModal(true)
    }



    const handleDisplayCheckInForm = () => {
        setShowCheckIn(true)
        setNoticePeriodBed(false)
    }


    useEffect(() => {
        if (!state.login.isTrigger) {
            setChangedBedClicked(null)
            setSelectedBed(null)
        }

    }, [state.login.isTrigger])


    useEffect(() => {
        if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
            setCustomer(state.PgList?.OccupiedCustomer)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
            }, 100)
        }


    }, [state.PgList.OccupiedCustomerGetStatusCode])


    useEffect(() => {
        if (room.id) {

            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });

        }
    }, [room]);


    useEffect(() => {
        if (state.PgList.createBedStatusCode === 201 || state.PgList.updateBedStatusCode === 200) {

            setShowBed(false)
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });

            setTimeout(() => {
                dispatch({ type: 'CLEAR_CREATE_BED_STATUS_CODE' })
                dispatch({ type: 'CLEAR_UPDATE_BED_STATUS_CODE' })
            }, 4000)
        }
    }, [state.PgList.createBedStatusCode, state.PgList.updateBedStatusCode])


    useEffect(() => {
        if (state.PgList.statusCodeDeleteBed === 200 || state.PgList.statusCodeDeleteBed === 204) {
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
            setTimeout(() => {
                dispatch({ type: 'CLEAR_DELETE_BED_STATUS_CODE' })
            }, 2000)
        }

    }, [state.PgList.statusCodeDeleteBed])



    useEffect(() => {
        if (state.UsersList.statusCodeForCheckInCustomer === 201) {
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            setAssignTenantForm(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_STATUS_CODES_CHECK_IN' })
            }, 500)
        }

    }, [state.UsersList.statusCodeForCheckInCustomer])


    const bedsForRoom = state.PgList?.bedList?.[room.id] || [];




    // const filteredBeds = state.login.isTrigger
    //     ? bedsForRoom.filter(
    //         (bed) =>
    //             (!bed.isBooked && !bed.isOccupied) ||
    //             (bed.onNotice === true && !bed.isBooked && !bed.isOccupied)
    //     )
    //     : bedsForRoom;

    // const filteredBeds = React.useMemo(() => {
    //     if (!state.login.isTrigger) return bedsForRoom;

    //     return bedsForRoom.filter(
    //         bed =>
    //             (!bed.isBooked && !bed.isOccupied) ||
    //             (bed.onNotice && !bed.isBooked && !bed.isOccupied)
    //     );
    // }, [bedsForRoom, state.login.isTrigger]);


    const filteredBeds = React.useMemo(() => {
        if (!state.login.isTrigger) return bedsForRoom;

        return bedsForRoom.filter(
            bed => !bed.isOccupied
        );
    }, [bedsForRoom, state.login.isTrigger]);



    useEffect(() => {
        if (state?.Booking?.statusCodeForAddBooking === 200) {
            handleCloseAssignTenant()
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
            setTimeout(() => {
                dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
            }, 500);

        }
    }, [state?.Booking?.statusCodeForAddBooking])





    useEffect(() => {
        if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
            handleCloseAddCustomer()

        }
    }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);



    useEffect(() => {
        if (state.UsersList?.bookingToCheckinStatusCode === 200) {
            setShowCheckIn(false)
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_BOOKING_TO_CHECKIN' })
            }, 100)
        }

    }, [state.UsersList?.bookingToCheckinStatusCode])





    useEffect(() => {
        if (state.Booking.StatusCodeInactiveCode === 200) {
            setShowInActive(false)
            dispatch({ type: "USERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
            setTimeout(() => {
                dispatch({ type: 'CLEAR_BOOKING_InActive' })
            }, 1000)

        }

    }, [state.Booking.StatusCodeInactiveCode])


    useEffect(() => {
        if (state.UsersList.statusCodeForReassinBed === 200) {
            dispatch(triggerPG(false))
            setShowConfirmChangeBedModal(false)
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });

            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });

            setTimeout(() => {
                dispatch({ type: "CLEAR_REASSIGN_BED" });
            }, 200);
        }
    }, [state.UsersList.statusCodeForReassinBed]);






    return (

        <div>

            {
                bactocheckinForm && <BackToCheckIn show={bactocheckinForm} handleClose={handleCloseBackToCheckIn} checkInDetails={selectedTenant} pgDetails={customer} />

            }



            {showBed && <AddBedUI show={showBed} setShowBed={setShowBed} currentItem={details} editBedMode={editBedMode} isOccupied={customer} />}

            {
                showDeleteBed && <DeleteBed show={showDeleteBed} handleClose={handleCloseDeleteBed} deleteBedDetails={deleteBedDetails} />
            }

            {
                occupiedCustomer && <OccupiedCustomer show={occupiedCustomer} handleClose={handleCloseOccupiedCustomer} currentItem={customer} />
            }

            {

                emptybed && <EmptyBed show={emptybed} handleClose={handlecloseBed}
                    currentItem={customer} deleteBedDetails={deleteBedDetails}
                    showbed={handleShowBed}
                    showcustomer={handleShowAddCustomer}
                    showtenant={handleShowAssignTenant}
                    showEditBed={handleEditBed}
                />

            }



            {
                add_customerform && <AddCustomerPG showMenu={add_customerform} handleClose={handleCloseAddCustomer} />
            }


            {
                assign_tenantform && <PGAssignTenant show={assign_tenantform} handleClose={handleCloseAssignTenant} currentItem={customer}

                />
            }

            {
                showReservedBed && <BedDetails show={handleShowReservedBed} handleCloseBed={handleCloseReservedBed}
                    handleShowCheck_In={handleShowCheck_In} MakeAsInActive={handleShowMakeAsInActive}
                    currentItem={customer} handleShowInActiveForm={handleShowInActiveForm} showEditBed={handleEditBed}
                />
            }

            {
                showCheckIn && <Check_In show={showCheckIn} handleClose={handleCloseCheck_In} currentItem={selectedTenant} pgDetails={customer} />
            }

            {
                showInactive && <MakeAsInactive show={showInactive} handleCloseInActive={handleCloseMakeAsInActive} />
            }

            {
                makeasinactive && <MakeAsInactive show={makeasinactive} handleCloseInActive={handleCloseInActive}
                    inActiveDetails={selectedTenant} currentItem={customer}
                />

            }


            {
                showConfirmChangeBedModal &&

                <ConfirmChangeBed show={showConfirmChangeBedModal} handleClose={handleCloseChangedBed} previousBed={clickedBed} currentBed={changeBedClicked} customer={customer} />

            }




            {
                Occubied_bed && <OccupiedBedStatus show={Occubied_bed} showEditBed={handleEditBed} handleShowInActiveForm={handleShowInActiveForm} handleShowCheck_In={handleShowCheck_In}
                    handleCloseBed={handlecloseoccubiedbed} currentItem={customer}
                    handleShowReassignBed={handleShowReAssignBedPopup} handleShowNoticePeriod={handleShowNoticePeriod} />
            }


            {
                Noticeperiod_bed && <NoticeBedStatusDetails showEditBed={handleEditBed} show={Noticeperiod_bed} handleDisplayCheckInForm={handleDisplayCheckInForm}
                    handleCloseBed={handlecloseNoticePeriodBed} currentItem={customer} handleShowReassignBed={handleShowReAssignBedPopup}
                    showBooking={handleshowNoticePeriodBooking} showNoticeperiodCheckout={handleshowNoticePeriodCheckout} showfinalsettelemnet={handleshowfinalsettlement}
                    handleOpenChangeBed={handleOpenChangeBed} handleShowInActiveForm={handleShowInActiveForm} handleOpenCancelCheckout={handleOpenCancelCheckout}

                    handleShowNoticePeriod={handleShowNoticePeriod}

                />}


            {showReAssignBedForm &&
                <CustomerReAssign
                    show={showReAssignBedForm}

                    setCustomerReAssign={handleCloseReassignForm}
                />

            }

            {
                Noticeperiod_booking && <BookingBed show={Noticeperiod_booking} handleClose={handlecloseNoticeperiodBooking} currentItem={customer} selectedTenant={selectedTenant} />
            }





            {
                Noticeperiod_checkout && <DueCustomerConfirmCheckout show={Noticeperiod_checkout} handleClose={handlecloseNoticeperiodCheckout}
                    data={selectedTenant}
                    pgDetails={customer}
                />
            }

            {moveToNoticePeriodForm && (() => {
                return (
                    <CustomerCheckout
                        bedData={customer}
                        data={customerDetails}
                        customerCheckoutpage={moveToNoticePeriodForm}
                        setCustomerCheckoutpage={handleCloseNoticePeriod}
                    />
                );
            })()}

            {
                finalsettlepage && <FinalOld show={finalsettlepage} handleClose={handleClosefinalsettelment}
                    data={selectedTenant}
                    pgDetails={customer}
                />
            }

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start mx-0 max-h-60 py-1.5 overflow-y-auto overflow-x-hidden gap-x-3 gap-y-4">
                {Array.isArray(filteredBeds) && filteredBeds.length > 0 ? (
                    filteredBeds.map((bed) => (
                        <div
                            key={`${bed.roomId}-${bed.id}`}
                            className={`w-full flex justify-center px-1 ${propsValue.addPermissionError ? 'disabled' : ''}`}
                        >
                            <div
                                className={`flex flex-col items-center justify-start w-20 ${propsValue.addPermissionError ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div className="relative w-9 h-10">

                                    {state.login.isTrigger &&
                                        Number(selectedBed?.bedId) === Number(bed.id) &&
                                        Number(selectedBed?.roomId) === Number(bed.roomId) && (
                                            <div className="absolute inset-y-px -right-2.5 cursor-pointer z-40">
                                                <img src={Tick} alt="alt-image" className="h-5 w-5 cursor-pointer" />
                                            </div>
                                        )}

                                    {(bed.isBooked && bed.onNotice) && (
                                        <div className="action-circle">
                                            {(bed.onNotice && bed.overDue && bed.isBooked) ? 3 : 2}

                                            <div className="action-icons">
                                                {bed.isBooked && (
                                                    <img src={recerverimg} alt="occupied" height={20} width={20} className="cursor-pointer" />
                                                )}

                                                {bed.onNotice && (
                                                    <img src={noticeimg} alt="notice" height={20} width={20} className="cursor-pointer" />
                                                )}

                                                {bed.overDue && (
                                                    <img src={overDude} alt="overDude" height={20} width={20} className="cursor-pointer" />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {!bed.isBooked && !bed.onNotice && bed.overDue && (
                                        <img
                                            src={overDude}
                                            alt="overDude"
                                            height={20}
                                            width={20}
                                            className="absolute inset-y-px -right-2.5 cursor-pointer"
                                        />
                                    )}

                                    {bed.isBooked && !bed.onNotice && (
                                        <img
                                            src={recerverimg}
                                            alt="booking"
                                            height={20}
                                            width={20}
                                            className="absolute inset-y-px -right-2.5 cursor-pointer"
                                        />
                                    )}

                                    {bed.onNotice && !bed.isBooked && (
                                        <img
                                            src={noticeimg}
                                            alt="notice"
                                            height={20}
                                            width={20}
                                            className="absolute inset-y-px -right-2.5 cursor-pointer"
                                        />
                                    )}

                                    <img
                                        className={`mt-1 h-10 w-9 ${propsValue.addPermissionError ? "cursor-not-allowed" : "cursor-pointer"}`}
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
                        className={`w-full flex px-1 ${filteredBeds.length === 0 ? 'col-span-full justify-center' : 'justify-center'} ${propsValue.addPermissionError ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}

                        onClick={() => {
                            if (canWritePayingGuests) {
                                handleAddBed(propsValue, room.id);
                            }
                        }}
                    >
                        <div className="flex flex-col items-center justify-center w-20">
                            <FaSquarePlus
                                className={`${propsValue.addPermissionError ? 'text-gray-400' : 'text-blue-600'} h-11 w-9`}
                            />

                            <div
                                className={`pt-2 text-[10px] font-semibold font-montserrat ${!canWritePayingGuests ? 'text-gray-400' : 'text-blue-600'}`}
                            >
                                Add bed
                            </div>
                        </div>
                    </div>
                )}

                {state.login.isTrigger && changeBedClicked?.roomId && selectedBed?.bedId && (
                    <div className="fixed bottom-0 left-[19%] right-0 z-50 flex flex-wrap items-center justify-center border-t bg-white p-2">

                        <div>
                            <p className="m-0 text-sm font-semibold font-gilroy text-neutral-600">
                                Bed | {Array.isArray(state.PgList?.bedList?.[room.id])
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
    )
}
BedDetailsMap.propTypes = {
    room: PropTypes.func.isRequired,
    propsValue: PropTypes.func.isRequired,
    selectedBed: PropTypes.shape({
        bedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        roomId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),

    setSelectedBed: PropTypes.func.isRequired
};
export default BedDetailsMap;