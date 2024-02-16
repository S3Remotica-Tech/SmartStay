import React, { useState, useEffect } from 'react'
import Plus from '../Assets/Images/Create-button.png';
import '../Pages/Dashboard.css';
import Room from '../Assets/Images/Room.png';
import { FaAngleRight } from "react-icons/fa";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function getFloorName(floor_Id) {
    if (floor_Id === 1) {
        return 'Ground Floor';
    } else if (floor_Id === 2) {
        return '1st Floor';
    } else if (floor_Id === 3) {
        return '2nd Floor';
    } else if (floor_Id === 4) {
        return '3rd Floor';
    } else if (floor_Id >= 11 && floor_Id <= 13) {
        const id = floor_Id - 1
        console.log("id.....", id);
        return `${floor_Id}th Floor`;
    } else {
        const lastDigit = floor_Id % 10;
        let suffix = 'th';

        switch (lastDigit) {
            case 1:
                suffix = 'st';
                break;
            case 2:
                suffix = 'nd';
                break;
            case 3:
                suffix = 'rd';
                break;
        }

        return `${floor_Id - 1}${suffix} Floor`;
    }
}

function getFormattedRoomId(floor_Id, room_Id) {
    const roomIdString = String(room_Id);

    switch (floor_Id) {
        case 1:
            return `G${roomIdString.padStart(3, '0')}`;
        case 2:
            return `F${roomIdString.padStart(3, '0')}`;
        case 3:
            return `S${roomIdString.padStart(3, '0')}`;
        case 4:
            return `T${roomIdString.padStart(3, '0')}`;
        default:
            const floorAbbreviation = getFloorAbbreviation(floor_Id);
            return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
    }
}

function getFloorAbbreviation(floor_Id) {

    switch (floor_Id) {
        case 5:
            return 'F';
        case 6:
            return 'S';
        case 8:
            return 'E';
        case 9:
            return 'N';
        case 10:
            return 'T';

        default:
            return `${floor_Id}`;
    }
}


function DashboardRoom(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [updateRoom, setUpdateRoom] = useState(false)
    const [shows, setShows] = useState(false);
    const handleCloses = () => {
        setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
        setShows(false)
    };

    const [roomDetails, setRoomDetails] = useState([{ roomId: '', numberOfBeds: '' }
        // , { roomId: '', numberOfBeds: '' }, { roomId: '', numberOfBeds: '' }
    ]);

    const [roomCount, setRoomCount] = useState([])

    console.log("state.UsersList.roomFullCheck *", state);
    useEffect(() => {
        setRoomCount(state.PgList.roomCount)
    }, [state.PgList.roomCount])


    useEffect(() => {
        if (props.floorID && props.hostel_Id) {
            console.log("RoomCount", props.hostel_Id);
            dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
            
            return () => {
                console.log("RoomCount unmount");
            }
        }
    }, [props.hostel_Id])


    useEffect(() => {
        console.log("state.PgList.createRoomMessage",state.PgList.createRoomMessage);
        if (state.PgList.createRoomMessage !== null && state.PgList.createRoomMessage != '') {
            // dispatch({ type: 'HOSTELLIST' })
            console.log("useEffect");
            // dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })

            setTimeout(() => {
                dispatch({ type: 'UPDATE_MESSAGE_AFTER_CREATION', message: null })
            }, 100)
        }
    }, [state.PgList.createRoomMessage])

    const handleShows = (val, index) => {
        setShows(true);
        if (val) {
            setUpdateRoom('Edit');
            setRoomDetails(prevState => {
                const updatedRooms = [...prevState];
                updatedRooms[0].roomId = val.Room_Id;
                updatedRooms[0].numberOfBeds = val.Number_Of_Beds;
                return updatedRooms;
            });
        }
        else {
            setUpdateRoom('Add')
        }
    }
    const handleCancels = () => {
        handleCloses();
    };

    const [currentRoomId, setCurrentRoomId] = useState("");

    const [roomDetailsError, setRoomDetailsError] = useState(false);
    const handleRoomIdChange = (roomId, index) => {
        setRoomDetails(prevState => {
            const updatedRooms = [...prevState];
            updatedRooms[index].roomId = roomId;
            return updatedRooms;
        });
        if (roomId !== '' && roomDetailsFromState.some(existingRoom =>
            existingRoom.Hostel_Id === props.hostel_Id &&
            existingRoom.Floor_Id === props.floorID &&
            String(existingRoom.Room_Id) === String(roomId)
        )) {
            setRoomDetailsError(true);
        } else {
            setRoomDetailsError(false);
        }
        setCurrentRoomId(roomId);
    };

    const handleNumberOfBedChange = (numberOfBeds, index) => {
        setRoomDetails(prevState => {
            const updatedRooms = [...prevState];
            updatedRooms[index].numberOfBeds = numberOfBeds;
            return updatedRooms;
        });
    };
    // const handleAddRoom = () => {
    //     setRoomDetails([...roomDetails, { roomId: '', numberOfBeds: '' }]);
    // };

    const handleAddRoom = () => {
        setRoomDetails([...roomDetails, { roomId: '', numberOfBeds: '' }]);
               const isExistingRoom = roomDetailsFromState.some(existingRoom =>
            existingRoom.Hostel_Id === props.hostel_Id &&
            existingRoom.Floor_Id === props.floorID &&
            String(existingRoom.Room_Id) === String(roomDetails[0].roomId)
        );
    
        const isRoomDetailsValid = roomDetails.every(room => room.roomId && room.numberOfBeds);
           
        if (isExistingRoom && isRoomDetailsValid) {
            setRoomDetailsError(true);
        } else {
            setRoomDetailsError(false);
            }
    };
    


    const handleCreateRoom = () => {
        const floorId = props.floorID.toString();
        const phoneNumber = props.phoneNumber.toString();

        const validRooms = roomDetails.filter(room => room.roomId && room.numberOfBeds);
        if (validRooms) {
            dispatch({
                type: 'CREATEROOM',
                payload: {
                    phoneNo: phoneNumber,
                    floorDetails: validRooms.map(room => ({
                        floorId: floorId,
                        roomId: room.roomId,
                        number_of_beds: room.numberOfBeds,
                    })),
                },
            });
            Swal.fire({
                icon: 'success',
                title: "Room created successfully",
            })
            setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
            handleCloses();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Please enter at least one valid room.',
            });
        }
        setRoomCount(state.PgList.roomCount)
    };
    const handleRemoveRoomDetails = (indexToRemove) => {
        setRoomDetails((prevDetails) => prevDetails.filter((_, index) => index !== indexToRemove));
    };
    const arr = [];
// let arr =0
    // const handleRoomDetails = (val) => {

    //     navigate('/Bed', { state: { val: val } });
    // }
    const handleRoomDetails = (val) => {
        props.onRowVisibilityChange(false);
        props.onRowBedVisibilityChange(true, val)
    }


    const roomDetailsFromState = [];

    if (state.PgList?.roomCount) {
        state.PgList.roomCount.forEach((floorRooms) => {
            floorRooms && floorRooms.forEach((room) => {
                const roomDetail = {
                    Floor_Id: room.Floor_Id,
                    Hostel_Id: room.Hostel_Id,
                    Number_Of_Beds: room.Number_Of_Beds,
                    Room_Id: room.Room_Id,
                    bookedBedCount: room.bookedBedCount,
                };
                roomDetailsFromState.push(roomDetail);
            });
        });
    }

   

    return (
        <>
            <div className="col-lg-3 col-md-5  col-sm-10 col-xs-10 col-10 ms-5">

                <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 ,height:"auto",minHeight:200}}>

                    <div className="card-header d-flex justify-content-between p-2" style={{ backgroundColor: "#f6f7fb" }}><strong style={{ fontSize: "13px" }}>{getFloorName(props.floorID)}</strong><FaAngleRight className="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>

                    <div className="card-body">
                        <p className="card-title text-center" style={{ fontWeight: 600 }}>({arr}) Rooms</p>
                        {/* <p className="card-title text-center" style={{ fontWeight: 600 }}>({state.PgList.roomCount[props.floorID - 1] && state.PgList.roomCount[props.floorID - 1].length > 0 ? state.PgList.roomCount[props.floorID - 1].length : 0}) Rooms</p> */}
                        {/* <p className="card-title text-center" style={{ fontWeight: 600 }}>({state.PgList.roomCount[props.floorID - 1].length >0 ? state.PgList.roomCount[props.floorID - 1].length : 0}) Rooms</p> */}

                        <div className="row  row-gap-3  pe-3">
                            {

                                roomCount.length > 0 && roomCount.map((room) => {
                                    // arr =  room.length > 0 ? room.length : 0 
                                    // arr.length == 0 && arr.push(room.length)
                                    //  console.log("room count arr",room.length);
                                    return (
                                        <>
                                            {room.length > 0 &&
                                                room.map((val, index) => {
                                                    if (val.Floor_Id == props.floorID) {
                                                        // arr = room.length
                                                        // arr =  room.length > 0 ? room.length : 0 
                                                        // console.log("room count arr",arr);
                                                        // room.length > 0 ? arr.push(room.length) :  arr = [] && arr.push(0)
                                                        arr.length == 0 && arr.push(room.length)
                                                        const formattedRoomId = getFormattedRoomId(val.Floor_Id, val.Room_Id);

                                                        return (
                                                            <>

                                                                <div className="col-3" key={index} >
                                                                    <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: val.Number_Of_Beds - val.bookedBedCount == 0 ? "#25D366" : "#e3e4e8" }} onClick={() => { handleRoomDetails(val) }}>
                                                                        <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "2px", filter: val.Number_Of_Beds - val.bookedBedCount == 0 ? "brightness(0) invert(1)" : "none" }} alt='Room' />
                                                                        <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600, color: val.Number_Of_Beds - val.bookedBedCount == 0 ? "white" : "gray" }}>
                                                                            {formattedRoomId}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                            </>
                                                        )
                                                    }
                                                })
                                            }
                                        </>
                                    )
                                })

                            }

                            <div className="col-3">
                                <div className="card  text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA", backgroundColor: "#cccccc11" }} onClick={() => { handleShows() }}>
                                    <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt='Room' />
                                    <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px", fontWeight: 600 }} className="mb-0" >Create Room</p>
                                </div>
                            </div>
                        </div >
                    </div>
                    </div>
                </div>
            
            
              
<Offcanvas show={shows} onHide={handleCloses} placement="end" style={{ width: "70vh" }}>
    <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-3">Create PG</Offcanvas.Title>
    <Offcanvas.Body>
        <h4 style={{ fontSize: 14, fontWeight: 600 }}>Create Room</h4>
        <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes. Be a part of SmartStay Circle, and invite-only, global community of social media influencers and affiliate networks.</p>

        {/* {roomDetailsError && (
            <div className="p-2 mb-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }}>
                {roomDetails.map((room, index) => (
                    <div key={index}>
                        RoomId {room.roomId} is already exists & available beds are {roomDetailsFromState.find(existingRoom =>
                            existingRoom.Hostel_Id === props.hostel_Id &&
                            existingRoom.Floor_Id === props.floorID &&
                            String(existingRoom.Room_Id) === String(room.roomId)
                        )?.Number_Of_Beds}
                    </div>
                ))}
            </div>
        )} */}

{roomDetailsError && (
            <div className="p-2 mb-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }}>
                {roomDetails.map((room, index) => {
                    if (room.roomId === currentRoomId) {
                        return (
                            <div key={index}>
                                RoomId {currentRoomId} is already exists & available beds are {roomDetailsFromState.find(existingRoom =>
                                    existingRoom.Hostel_Id === props.hostel_Id &&
                                    existingRoom.Floor_Id === props.floorID &&
                                    String(existingRoom.Room_Id) === String(room.roomId)
                                )?.Number_Of_Beds}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        )}



        <div className="row column-gap-3 g-3 d-flex align-items-center ">
            {roomDetails.map((room, index) => (
                <>
                    <div key={index} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                        <div className="form-group mb-4 ps-1">
                            <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                            <input
                                type="text"
                                value={room.roomId}
                                onChange={(e) => handleRoomIdChange(e.target.value, index)}
                                className="form-control custom-border-bottom p-0"
                                id={`roomNumber${index}`}
                                autoFocus
                                placeholder="Enter here"
                                style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                            />
                        </div>
                    </div>

</>
))}

</div>
                </Offcanvas.Body>
            </Offcanvas> 
            <Offcanvas show={shows} onHide={handleCloses} placement="end" style={{ width: "70vh" }}>
                <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-3">Create PG</Offcanvas.Title>
                <Offcanvas.Body>
                    <h4 style={{ fontSize: 14, fontWeight: 600 }}>Create Room</h4>
                    <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>


                    <div className="row column-gap-3 g-3 d-flex align-items-center ">
                        {roomDetails.map((room, index) => (


                            <>

                                {/* {
                                    roomCount.length > 0 && roomCount.map((roomArray,countIndex) => (
                                        roomArray.length > 0 &&
                                        roomArray.map((val, valIndex) => (
                                            val.Floor_Id === props.floorID && (
                                                <>
                                                    {console.log("val.Floor_Id", val.Floor_Id)}
                                                    {console.log("val.Room_Id", val.Room_Id)}
                                                    {console.log("room.roomId*", room.roomId)}
                                                   
                                                        console.log("room.roomId", room.roomId);
                                                        console.log("Condition:", val.Room_Id == room.roomId);
                                                    {val.Room_Id === room.roomId && (
                                                    <div key={index} className="p-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }} >
                                                       
                                                            <div style={{ color: "white" }}>
                                                                RoomId <strong>{room.roomId}</strong> is already exists & available beds are <strong style={{ color: "white" }}>{val.Number_Of_Beds}</strong>
                                                            </div>
                                                        
                                                    </div>)}


                                                
                                                </>
                                            )
                                        ))
                                    ))
                                } */}



                                {roomDetailsError && (
                                    <div className="p-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }}>
                                        RoomId {room.roomId} is  already exists & available beds are {roomDetailsFromState.find(existingRoom =>
                                            existingRoom.Hostel_Id === props.hostel_Id &&
                                            existingRoom.Floor_Id === props.floorID &&
                                            String(existingRoom.Room_Id) === String(roomDetails[0].roomId)
                                        )?.Number_Of_Beds}
                                    </div>
                                )}
                                <div key={index} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                                    <div className="form-group mb-4 ps-1">
                                        <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                        <input
                                            type="text"
                                            value={room.roomId}
                                            onChange={(e) => handleRoomIdChange(e.target.value, index)}
                                            className="form-control custom-border-bottom p-0"
                                            id={`roomNumber${index}`}
                                            autoFocus
                                            placeholder="Enter here"
                                            style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                                        />
                                    </div>
                                </div>



                                <div key={`beds${index}`} className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                                    <div className="form-group mb-4 ps-1">
                                        <label htmlFor={`bedsNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Number of Beds</label>
                                        <div className="d-flex">
                                            <input
                                                type="text"
                                                value={room.numberOfBeds}
                                                onChange={(e) => handleNumberOfBedChange(e.target.value, index)}
                                                className="form-control custom-border-bottom p-0"
                                                id={`bedsNumber${index}`}
                                                placeholder="Enter here"
                                                style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                                            />
                                        </div>
                                    </div>
                                </div>


                    <div key={`beds${index}`} className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                        <div className="form-group mb-4 ps-1">
                            <label htmlFor={`bedsNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Number of Beds</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    value={room.numberOfBeds}
                                    onChange={(e) => handleNumberOfBedChange(e.target.value, index)}
                                    className="form-control custom-border-bottom p-0"
                                    id={`bedsNumber${index}`}
                                    placeholder="Enter here"
                                    style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                                />
                            </div>
                        </div>
                    </div>

                    {index > 0 &&
                        <div className="col-lg-1">
                            <TiDeleteOutline style={{ fontSize: 18, color: "red", cursor: "pointer" }} onClick={() => handleRemoveRoomDetails(index)} />
                        </div>
                    }
                </>
            ))}
        </div>

        <div onClick={handleAddRoom}>
            <AiOutlinePlusCircle style={{ height: "30px" }} /> <label style={{ color: "gray", fontSize: "14px" }}>Add Room</label>
        </div>
        <hr style={{ marginTop: "100px" }} />

        <div className="d-flex justify-content-end" style={{ marginTop: "15px" }}>
            <Button variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "90px", borderRadius: 200 }} onClick={handleCancels}>
                Cancel
            </Button>
            <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateRoom}>
                {roomDetailsError ? "Update" : "Save"}
            </Button>
        </div>
    </Offcanvas.Body>
</Offcanvas>


        </>
        )
}

export default React.memo(DashboardRoom);