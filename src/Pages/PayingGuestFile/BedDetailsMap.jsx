import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Green from '../../Assets/Images/New_images/Frame.png'
import White from '../../Assets/Images/New_images/empty_bed.png';
import { FaSquarePlus } from "react-icons/fa6";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import AddBedUI from './AddBed';

function BedDetailsMap({ room, propsValue }) {

    console.log("room", room)
    console.log("propsValue", propsValue)
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [bedList, setBedList] = useState([])

    const [showBed, setShowBed] = useState(false)
    const [details, setDetails] = useState('')

    const handleAddBed = (item, Room_Id) => {
        setShowBed(true)
        setDetails({ item, Room_Id });
    }


    const handleclickBed = (bed, room) => {

        if (bed.isbooked === 1) {
            setShowReservedBed(true);
            setOccupiedCustomerDetails({ bed, room });

        } else if (bed.isfilled === 0) {
            setEmptyBed(true);
            setDeleteBedDetails({ bed, room });
            setOccupiedCustomerDetails({ bed, room });

        } else if (bed.isfilled === 1 && bed.isNoticePeriod === 1) {
            setOccubiedBed(false);
            setNoticePeriodBed(true);
            setOccupiedCustomerDetails({ bed, room });

        } else if (bed.isfilled === 1) {
            setOccubiedBed(true);
            setOccupiedCustomerDetails({ bed, room });
        }
    };


    useEffect(() => {
        if (room) {

            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: room.id }
            });

        }
    }, [state?.PgList?.getAllRoomSuccessStatus]);

console.log("state",state)

    useEffect(() => {
        if (state?.PgList.getAllBedSuccessStatus === 200) {
            setBedList(state.PgList?.bedList)
        }

    }, [state?.PgList.getAllBedSuccessStatus])


    console.log("bedList**********", bedList)

    useEffect(() => {
        if (state.PgList.createBedStatusCode === 201 || state.PgList.updateBedStatusCode === 201) {

            setShowBed(false)
            dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: propsValue.floorID } })
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
            dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: propsValue.floorID } })

            setTimeout(() => {
                dispatch({ type: 'CLEAR_DELETE_BED_STATUS_CODE' })
            }, 2000)
        }

    }, [state.PgList.statusCodeDeleteBed])

const bedsForRoom = state.PgList.bedList?.[room.id] || [];



    return (

        <div>
            {showBed && <AddBedUI show={showBed} setShowBed={setShowBed} currentItem={details} />}


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
                                    {bed.isBooked && (
                                        <img
                                            src={recerverimg}
                                            alt="bookingimg"
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
                                    )}

                                    {/* occupied + notice */}
                                    {bed.isOccupied && bed.onNotice && (
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
                                    )}

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
                                    {bed.name}
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

export default BedDetailsMap