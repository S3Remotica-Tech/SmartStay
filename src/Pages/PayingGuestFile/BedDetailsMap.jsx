/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Green from '../../Assets/Images/New_images/Frame.png'
import White from '../../Assets/Images/New_images/empty_bed.png';
import { FaSquarePlus } from "react-icons/fa6";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
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
// import AddCustomer from './AddCustomerPG';
import PGAssignTenant from './PGAssignTenant';
// import CheckoutTenant from './NoticePeriod/Check-out Tenant';
import OccupiedCustomer from './OccupiedCustomer';
import DeleteBed from './DeleteBed';
import DueCustomerConfirmCheckout from '../CustomerFile/DueCustomerConfirmCheckout';
// import UserlistForm from '../CustomerFile/UserlistForm';
import AddCustomerPG from './AddCustomerPG';
import FinalSettlement from '../CustomerFile/FinalSettlement';

function BedDetailsMap({ room, propsValue }) {


    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    // const [bedList, setBedList] = useState([])
    const [emptybed, setEmptyBed] = useState(false)
    const [showReservedBed, setShowReservedBed] = useState(false)
    const [occupiedCustomer, setOccupiedCustomer] = useState(false)
    const [showCheckIn, setShowCheckIn] = useState(false)
    const [showInactive, setShowInActive] = useState(false)
    const [Noticeperiod_booking, setNoticePeriodBooking] = useState(false)
    const [Noticeperiod_checkout, setNoticePeriodCheckout] = useState(false)
    const [showReAssignBedForm, setShowReAssignBedForm] = useState(false);
    const [moveToNoticePeriodForm, setMoveToNoticePeriodForm] = useState(false);
    const [customerId, setCustomerId] = useState('')
    const [customerDetails, setCustomerDetails] = useState('');
    const [Occubied_bed, setOccubiedBed] = useState(false)
    const [Noticeperiod_bed, setNoticePeriodBed] = useState(false)
    const [deleteBedDetails, setDeleteBedDetails] = useState({ bed: null, room: null })
    const [customer, setCustomer] = useState([])
    // const [OccupiedCustomerDetails, setOccupiedCustomerDetails] = useState({ bed: null, room: null })
    const [customerID, setCustomerID] = useState('')
    const [add_customerform, setAddCustomerForm] = useState(false)
    const [assign_tenantform, setAssignTenantForm] = useState(false)
    const [showDeleteBed, setShowDeleteBed] = useState(false)
    const [showBed, setShowBed] = useState(false)
    const [details, setDetails] = useState('')
 const [makeasinactive, setMakeasInactive] = useState(false)  
const [finalsettlepage,setFinalSettlePage] = useState(false)

const handleshowfinalsettlement = (isvisible ,customerId) => {
   setCustomerId(customerId)
   
      setFinalSettlePage(isvisible)
      setNoticePeriodBed(false)
  }
 
  const handleClosefinalsettelment = ()=>{
    setFinalSettlePage(false)
  }
    const handleShowReservedBed = () => {
        setShowReservedBed(true)
    }

    const handleCloseReservedBed = () => {
        setShowReservedBed(false)
    }



    const handleCloseReassignForm = () => {
        setShowReAssignBedForm(false)
    }

    const handleShowReAssignBedPopup = (isVisible, customer_id) => {
        setOccubiedBed(false)
        setShowReAssignBedForm(isVisible)
        setCustomerId(customer_id)

    }
    const handleShowNoticePeriod = (isVisible, customer) => {

        setOccubiedBed(false)
        setMoveToNoticePeriodForm(isVisible)
        setCustomerDetails(customer)

    }

    const handleCloseNoticePeriod = () => {
        setMoveToNoticePeriodForm(false)
    }



    const handleShowCheck_In = () => {
        setShowCheckIn(true)
        setShowReservedBed(false)

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
    }


    const handleshowNoticePeriodCheckout = (isVisible, customerId) => {
        setNoticePeriodCheckout(isVisible)
        setNoticePeriodBed(false)
        setCustomerID(customerId)

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
    }

    const handlecloseBed = () => {
        setEmptyBed(false)

    }
    const handleclickBed = (bed, room) => {

       dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { bedId: bed.id } })

        if (bed.isBooked) {
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
    };


    const handleShowInActiveForm = () =>{
        setMakeasInactive(true)
        setShowReservedBed(false);
    }



    const handleCloseInActive = () =>{
              setMakeasInactive(false)
    }

    useEffect(() => {
        if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
            setCustomer(state.PgList?.OccupiedCustomer)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
            }, 2000)
        }


    }, [state.PgList.OccupiedCustomerGetStatusCode])



    useEffect(() => {
        if (room) {

            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });

        }
    }, [room]);







    useEffect(() => {
        if (state.PgList.createBedStatusCode === 201 || state.PgList.updateBedStatusCode === 201) {

            setShowBed(false)
                     dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });

            setTimeout(() => {
                dispatch({ type: 'CLEAR_CREATE_BED_STATUS_CODE' })
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
            setAssignTenantForm(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_STATUS_CODES_CHECK_IN' })
            },500)
        }

    }, [state.UsersList.statusCodeForCheckInCustomer])


    const bedsForRoom = state.PgList?.bedList?.[room.id] || [];


  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
         handleCloseAssignTenant()
       
           dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });
          setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);

         }
  }, [state?.Booking?.statusCodeForAddBooking ])

console.log("state",state)



  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
     handleCloseAddCustomer()
       
    }
  }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);

    return (

        <div>
            {showBed && <AddBedUI show={showBed} setShowBed={setShowBed} currentItem={details} />}

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
                />

            }



            {/* {
                add_customerform && <UserlistForm showMenu={add_customerform} setShowMenu={handleCloseAddCustomer} />
            } */}
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
                    currentItem={customer} handleShowInActiveForm={handleShowInActiveForm}
                />
            }

            {
                showCheckIn && <Check_In show={showCheckIn} handleClose={handleCloseCheck_In} currentItem={customer} />
            }

            {
                showInactive && <MakeAsInactive show={showInactive} handleClose={handleCloseMakeAsInActive} />
            }

  {
                makeasinactive && <MakeAsInactive show={makeasinactive} handleCloseInActive={handleCloseInActive}
                 inActiveDetails={customer}
                />

            }



            {/* Occubied bed Details */}

            {
                Occubied_bed && <OccupiedBedStatus show={Occubied_bed}
                    handleCloseBed={handlecloseoccubiedbed} currentItem={customer} handleShowReassignBed={handleShowReAssignBedPopup} handleShowNoticePeriod={handleShowNoticePeriod} />
            }

            {/* {
                Noticeperiod_bed && <NoticeBedStatusDetails show={Noticeperiod_bed}
                    handleCloseBed={handlecloseNoticePeriodBed} currentItem={customer} />
            } */}


            {/* Notice period  */}
            {
                Noticeperiod_bed && <NoticeBedStatusDetails show={Noticeperiod_bed}
                    handleCloseBed={handlecloseNoticePeriodBed} currentItem={customer}
                    showBooking={handleshowNoticePeriodBooking} showNoticeperiodCheckout={handleshowNoticePeriodCheckout} showfinalsettelemnet={handleshowfinalsettlement}
                />}


            {showReAssignBedForm &&
                <CustomerReAssign
                    show={showReAssignBedForm}

                    // reAssignBedDetail={{ ...OccupiedCustomerDetails, id: customerId }}
                    setCustomerReAssign={handleCloseReassignForm}
                />

            }

            {
                Noticeperiod_booking && <BookingBed show={Noticeperiod_booking} handleClose={handlecloseNoticeperiodBooking} currentItem={customer} />
            }


            {/* this needed  */}
            {/* {
                Noticeperiod_checkout && <CheckoutTenant show={Noticeperiod_checkout} handleClose={handlecloseNoticeperiodCheckout}
                    customerID={customerID}

                    data={OccupiedCustomerDetails}
                />
            } */}


            {
                Noticeperiod_checkout && <DueCustomerConfirmCheckout show={Noticeperiod_checkout} handleClose={handlecloseNoticeperiodCheckout}
                    customerID={customerID}

                    data={customer}
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
                  finalsettlepage &&<FinalSettlement show = {finalsettlepage}   handleClose={handleClosefinalsettelment}  
                   data={customer}
                   customerID={customerId}/>
                }

            <div className='row g-2 overflow-auto' style={{ maxHeight: 240 }}>
                {Array.isArray(bedsForRoom) && bedsForRoom.length > 0 &&
                    bedsForRoom?.map((bed) => (
                        <div key={bed.id}
                            className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${propsValue.addPermissionError ? 'disabled' : ''}`}
                        >
                            <div className="d-flex flex-column align-items-center w-100"
                                style={{ cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer' }}
                            >
                                <div style={{ position: "relative", width: 34, height: 41 }}>

                                    {/* booked status */}
                                    {bed.isBooked && bed.onNotice && (
                                        <div className="action-circle">
                                            2
                                            <div className="action-icons">
                                                <img
                                                    src={recerverimg}
                                                    alt="booking"
                                                    height={20}
                                                    width={20}

                                                    style={{ cursor: "pointer" }}
                                                />
                                                <img
                                                    src={noticeimg}
                                                    alt="notice"
                                                    height={20}
                                                    width={20}

                                                    style={{ cursor: "pointer" }}
                                                />
                                            </div>
                                        </div>
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
                                                cursor:  "pointer",
                                            }}

                                        />
                                    )}

                                    {bed.onNotice && !bed.isBooked && (
                                        <img
                                            src={noticeimg}
                                            alt="notice"
                                            height={20}
                                            width={20}
                                            style={{
                                                position: "absolute",
                                                top: 1,
                                                right: -10,
                                                cursor:  "pointer",
                                            }}

                                        />
                                    )}



                                    {/* occupied + notice */}
                                    {/* {bed.isOccupied && bed.onNotice && (
                                        <img
                                            src={noticeimg}
                                            alt="notice"
                                            height={20}
                                            width={20}
                                            style={{
                                                position: "absolute",
                                                top: 1,
                                                right: -10,
                                                cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer'
                                            }}
                                            className="me-1 mb-1"
                                        />
                                    )} */}

                                    {/* bed color */}
                                    <img className="mt-1"
                                        src={bed.isOccupied ? Green : White}
                                        alt="bedd"
                                        style={{ height: 41, width: 34, cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer' }}
                                        onClick={() => {
                                            if (!propsValue.addPermissionError) {
                                                handleclickBed(bed, bed.roomId);
                                            }
                                        }}
                                    />
                                </div>

                                <div className="pt-2" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }}>
                                    {bed.bedName}
                                </div>
                            </div>
                        </div>
                    ))}

                {/* Add Bed */}
                <div
                    className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${propsValue.addPermissionError ? 'disabled' : ''}`}
                    onClick={() => {
                        if (!propsValue.addPermissionError) {
                            handleAddBed(propsValue, room.id);
                        }
                    }}
                    style={{ cursor: propsValue.addPermissionError ? 'not-allowed' : 'pointer' }}
                >
                    <div className='d-flex flex-column align-items-center w-100'>
                        <div>
                            <FaSquarePlus style={{ height: 41, width: 34, color: propsValue.addPermissionError ? "#888888" : "#1E45E1" }} />
                        </div>
                        <div className="pt-2" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat", color: propsValue.addPermissionError ? "#888888" : "#1E45E1" }}>
                            Add bed
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
BedDetailsMap.propTypes = {
    room: PropTypes.func.isRequired,
    propsValue: PropTypes.func.isRequired,

};
export default BedDetailsMap