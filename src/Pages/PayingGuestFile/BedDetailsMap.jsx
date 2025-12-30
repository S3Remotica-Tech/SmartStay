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
import FinalSettlement from '../CustomerFile/FinalSettlement';
import { triggerPG } from '../../Redux/Action/smartStayAction';
// import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Tick from '../../Assets/v2Images/Tick.svg'
import ConfirmChangeBed from './NoticePeriod/ConfirmChangedBed';
import { useHasPermission } from '../../Utils/Permission';
import BackToCheckIn from "../CustomerFile/BackToCheckIn";
import { clickedBedForChange } from '../../Redux/Action/smartStayAction';


function BedDetailsMap({ room, propsValue }) {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // const navigate = useNavigate();
    const [emptybed, setEmptyBed] = useState(false)
    const [showReservedBed, setShowReservedBed] = useState(false)
    const [occupiedCustomer, setOccupiedCustomer] = useState(false)
    const [showCheckIn, setShowCheckIn] = useState(false)
    const [showInactive, setShowInActive] = useState(false)
    const [Noticeperiod_booking, setNoticePeriodBooking] = useState(false)
    const [Noticeperiod_checkout, setNoticePeriodCheckout] = useState(false)
    const [showReAssignBedForm, setShowReAssignBedForm] = useState(false);
    const [moveToNoticePeriodForm, setMoveToNoticePeriodForm] = useState(false);
    // const [customerId, setCustomerId] = useState('')
    const [customerDetails, setCustomerDetails] = useState('');
    const [Occubied_bed, setOccubiedBed] = useState(false)
    const [Noticeperiod_bed, setNoticePeriodBed] = useState(false)
    const [deleteBedDetails, setDeleteBedDetails] = useState({ bed: null, room: null })
    const [customer, setCustomer] = useState([])
    // const [customerID, setCustomerID] = useState('')
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

    // const canWritePayingGuests = useHasPermission("Paying Guests", "canWrite");


    const {
        canWriteModule: canWritePayingGuests,
        //   canReadModule: canReadExpense,
        //   canUpdateModule: canUpdateExpense,
        //   canDeleteModule: canDeleteExpense,
    } = useHasPermission("Paying Guests");


    const handleshowfinalsettlement = (isvisible,  tenantDetails) => {
        // setCustomerId(customerId)
console.log("tenantDetails",tenantDetails, )
        setFinalSettlePage(isvisible)
        setNoticePeriodBed(false)
        setSelectedTenant(tenantDetails)
    }

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
        // setShowReAssignBedForm(isVisible)
        // setCustomerId(customer_id)

    }
    const handleShowNoticePeriod = (isVisible, customer) => {

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

    const handleshowNoticePeriodBooking = () => {
        setNoticePeriodBooking(true)
        setNoticePeriodBed(false)
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
    console.log("state", state)

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

        // dispatch(clickedBedForChange(state.PgList?.OccupiedCustomer));

        setClickedBed(bed)

    };

    const handleclickBedForChangeBed = (bed) => {
        dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { bedId: bed.id } })
        setChangedBedClicked(bed)
        //   dispatch(changeBedForChange(bed));

    }



    const handleShowInActiveForm = (isVisible, reservedTenant) => {
        setMakeasInactive(isVisible)
        setShowReservedBed(false);
        setNoticePeriodBed(false)
        setSelectedTenant(reservedTenant)
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
        // dispatch(triggerPG(false))
        setShowConfirmChangeBedModal(false)
        setChangedBedClicked('')
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
            setChangedBedClicked('')
        }

    }, [state.login.isTrigger])


    useEffect(() => {
        if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
            setCustomer(state.PgList?.OccupiedCustomer)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
            }, 2000)
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
        if (state.PgList.statusCodeDeleteBed === 200) {
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




    const filteredBeds = state.login.isTrigger
        ? bedsForRoom.filter(
            (bed) =>
                (!bed.isBooked && !bed.isOccupied) ||
                (bed.onNotice === true && !bed.isBooked && !bed.isOccupied)
        )
        : bedsForRoom;




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
                bactocheckinForm && <BackToCheckIn show={bactocheckinForm} handleClose={handleCloseBackToCheckIn} checkInDetails={selectedTenant}  pgDetails={customer} />

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

            {/* Reserved Bed */}
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
                Occubied_bed && <OccupiedBedStatus show={Occubied_bed} showEditBed={handleEditBed} handleShowInActiveForm={handleShowInActiveForm}  handleShowCheck_In={handleShowCheck_In}
                    handleCloseBed={handlecloseoccubiedbed} currentItem={customer} handleShowReassignBed={handleShowReAssignBedPopup} handleShowNoticePeriod={handleShowNoticePeriod} />
            }




            {/* Notice period  */}
            {
                Noticeperiod_bed && <NoticeBedStatusDetails showEditBed={handleEditBed} show={Noticeperiod_bed} handleDisplayCheckInForm={handleDisplayCheckInForm}
                    handleCloseBed={handlecloseNoticePeriodBed} currentItem={customer}
                    showBooking={handleshowNoticePeriodBooking} showNoticeperiodCheckout={handleshowNoticePeriodCheckout} showfinalsettelemnet={handleshowfinalsettlement}
                    handleOpenChangeBed={handleOpenChangeBed} handleShowInActiveForm={handleShowInActiveForm} handleOpenCancelCheckout={handleOpenCancelCheckout}
                />}


            {showReAssignBedForm &&
                <CustomerReAssign
                    show={showReAssignBedForm}

                    setCustomerReAssign={handleCloseReassignForm}
                />

            }

            {
                Noticeperiod_booking && <BookingBed show={Noticeperiod_booking} handleClose={handlecloseNoticeperiodBooking} currentItem={customer} />
            }





            {
                Noticeperiod_checkout && <DueCustomerConfirmCheckout show={Noticeperiod_checkout} handleClose={handlecloseNoticeperiodCheckout}
                    // customerID={customerID}
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
                finalsettlepage && <FinalSettlement show={finalsettlepage} handleClose={handleClosefinalsettelment}
                    data={selectedTenant}
                    // customerID={customerId} 
                    pgDetails={customer}
                    />
            }

            <div className='row g-2 overflow-auto' style={{ maxHeight: 240 }}>
                {Array.isArray(filteredBeds) && filteredBeds.length > 0 ?
                    filteredBeds?.map((bed) => (
                        <div key={bed.id}
                            className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${propsValue.addPermissionError ? 'disabled' : ''}`}
                        >
                            <div className="d-flex flex-column align-items-center w-100"
                                style={{ cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer' }}
                            >
                                <div style={{ position: "relative", width: 34, height: 41 }}>

                                    {state.login.isTrigger && Number(changeBedClicked.id) === Number(bed.id) && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 1,
                                                right: -10,
                                                cursor: "pointer",
                                                backgroundColor: "#fff",
                                                borderRadius: 5
                                            }}
                                        >
                                            <img src={Tick} alt="alt-image"

                                                style={{ cursor: "pointer", height: 20, width: 20, }}
                                            />
                                        </div>
                                    )}




                                    {(bed.isBooked || bed.onNotice) && (bed.overDue) && (
                                        <div className="action-circle">
                                            {(bed.onNotice && bed.overDue && bed.isBooked) ? 3



                                                : 2}

                                            <div className="action-icons">
                                                {
                                                    bed.isBooked &&

                                                    <img
                                                        src={recerverimg}
                                                        alt="occupied"
                                                        height={20}
                                                        width={20}
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                }

                                                {bed.onNotice && (
                                                    <img
                                                        src={noticeimg}
                                                        alt="notice"
                                                        height={20}
                                                        width={20}
                                                        style={{ cursor: "pointer" }}
                                                    />
                                                )}


                                                {bed.overDue && (
                                                    <img
                                                        src={overDude}
                                                        alt="overDude"
                                                        height={20}
                                                        width={20}
                                                        style={{ cursor: "pointer" }}
                                                    />
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
                                            style={{
                                                position: "absolute",
                                                top: 1,
                                                right: -10,
                                                cursor: "pointer",
                                            }}
                                        />
                                    )}





                                    {bed.isBooked && !bed.onNotice && (
                                        <img
                                            src={recerverimg}
                                            alt="booking"
                                            height={20}
                                            width={20}
                                            style={{
                                                position: "absolute",
                                                top: 1,
                                                right: -10,
                                                cursor: "pointer",
                                            }}

                                        />
                                    )}



                                    {bed.onNotice && !bed.isBooked && !bed.overDue && (
                                        <img
                                            src={noticeimg}
                                            alt="notice"
                                            height={20}
                                            width={20}
                                            style={{
                                                position: "absolute",
                                                top: 1,
                                                right: -10,
                                                cursor: "pointer",
                                            }}

                                        />
                                    )}




                                    <img className="mt-1"
                                        src={bed.isOccupied ? Green : White}
                                        alt="bedd"
                                        style={{ height: 41, width: 34, cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer' }}
                                        onClick={() => {
                                            if (!state.login.isTrigger) {
                                                handleclickBed(bed, bed.roomId);
                                            } else if (state.login.isTrigger) {
                                                handleclickBedForChangeBed(bed, bed.roomId);
                                            }
                                        }}
                                    />
                                </div>

                                <div className="pt-2" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }}>
                                    {bed.bedName}
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className='d-flex justify-content-center'>
                        <label style={{ fontFamily: "Gilroy", color: "#4B4B4B", fontSize: 12 }}>
                            No beds available
                        </label>
                    </div>

                }

                {
                    !state.login.isTrigger &&

                    <div
                        className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${propsValue.addPermissionError ? 'disabled' : ''}`}
                        onClick={() => {
                            if (canWritePayingGuests) {
                                handleAddBed(propsValue, room.id);
                            }
                        }}
                        style={{ cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer' }}
                    >
                        <div className='d-flex flex-column align-items-center w-100'>
                            <div>
                                <FaSquarePlus style={{ height: 41, width: 34, color: propsValue.addPermissionError ? "#888888" : "#1E45E1" }} />
                            </div>
                            <div className="pt-2" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat", color: !canWritePayingGuests ? "#888888" : "#1E45E1" }}>
                                Add bed
                            </div>
                        </div>
                    </div>
                }
            </div>


            {
                state.login.isTrigger && changeBedClicked.roomId &&

                <div
                    className="d-flex justify-content-center align-items-center p-2 border-top bg-white flex-wrap"
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1050,
                    }}
                >
                    <div>
                        <p
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: "rgba(75, 75, 75, 1)",
                                margin: 0,
                            }}
                        >
                            Bed |  {Array.isArray(state.PgList?.bedList?.[room.id])
                                ? `${state.PgList.bedList[room.id].length} sharing`
                                : "0 sharing"}
                        </p>

                        <p>
                            <span
                                style={{
                                    fontWeight: 500,
                                    color: "rgba(30, 69, 225, 1)",
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                }}
                            >
                                {` ${customer?.floorName || "N/A"} | ${customer?.roomName || "N/A"} | ${customer.bedName || "-"}`}
                            </span>
                        </p>
                    </div>

                    <div style={{ marginLeft: 200 }}>
                        <Button
                            style={{
                                fontSize: 16,
                                backgroundColor: "#1E45E1",
                                color: "white",
                                fontWeight: 600,
                                borderRadius: 12,
                                padding: "10px 20px",
                                fontFamily: "Gilroy",
                            }}
                            onClick={handleShowConfirmChangeBed}
                        >
                            Continue →
                        </Button>
                    </div>
                </div>


            }



        </div>
    )
}
BedDetailsMap.propTypes = {
    room: PropTypes.func.isRequired,
    propsValue: PropTypes.func.isRequired,

};
export default BedDetailsMap