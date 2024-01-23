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

    const noOfFloor = Number(props.floorID) + Number(props.floorID);
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

    const handleShows = (val, index) => {
        // console.log("val,index",val,index);
        setShows(true);
        if (val) {
            setUpdateRoom('Edit');
            // const room = val.Room_Id
            // const bed = val.Number_Of_Beds
            setRoomDetails(prevState => {
                console.log('pre', prevState);
                const updatedRooms = [...prevState];
                // updatedRooms[index].roomId = val.Room_Id;
                // updatedRooms[index].numberOfBeds = val.Number_Of_Beds;
                updatedRooms[0].roomId = val.Room_Id;
                updatedRooms[0].numberOfBeds = val.Number_Of_Beds;
                console.log("updatedRooms", updatedRooms);
                return updatedRooms;
            });
            // setR
        }
        else {
            setUpdateRoom('Add')
        }
    }

    const handleCancels = () => {
        handleCloses();
    };

    useEffect(() => {
        dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
    }, [props.floorID, props.hostel_Id, state.PgList.createRoomMessage])

    useEffect(() => {
        dispatch({ type: 'CHECKROOM' })
    }, [])

    const roomDetailsFromState = state.PgList?.checkRoomList && state.PgList.checkRoomList.map(room => ({ roomId: room.RoomId, numberOfBeds: room.NumberOfBeds, hostel_Id: room.Hostel_Id, floor_Id: room.Floor_Id }));


    const handleRoomIdChange = (roomId, index) => {
        setRoomDetails(prevState => {
            const updatedRooms = [...prevState];
            updatedRooms[index].roomId = roomId;
            return updatedRooms;
        });
    };

    const handleNumberOfBedChange = (numberOfBeds, index) => {
        setRoomDetails(prevState => {
            const updatedRooms = [...prevState];
            updatedRooms[index].numberOfBeds = numberOfBeds;
            return updatedRooms;
        });
    };
    const handleAddRoom = () => {
        setRoomDetails([...roomDetails, { roomId: '', numberOfBeds: '' }]);
    };

    const handleCreateRoom = () => {
        const floorId = props.floorID.toString();
        const phoneNumber = props.phoneNumber.toString();

        const validRooms = roomDetails.filter(room => room.roomId && room.numberOfBeds);
        console.log("validRooms", validRooms);
        if (validRooms.length > 0) {
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
            if (state.PgList.createRoomMessage) {
                Swal.fire({
                    icon: 'success',
                    title: state.PgList.createRoomMessage,
                }).then((result) => {
                    if (result.isConfirmed) {

                    }
                });
                setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
                handleCloses();
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Please enter at least one valid room.',
                // timer:1000
            });

            // alert('Please enter at least one valid room.');
        }
    };
    const handleRemoveRoomDetails = (indexToRemove) => {
        setRoomDetails((prevDetails) => prevDetails.filter((_, index) => index !== indexToRemove));
    };
    const arr = [];
    console.log("state", state);
    return (
        <>
            <div className="col-lg-2 col-md-4  col-sm-12 col-xs-12 col-12">

                <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 }}>

                    <div className="card-header d-flex justify-content-between p-2" style={{ backgroundColor: "#f6f7fb" }}><strong style={{ fontSize: "13px" }}>{getFloorName(props.floorID)}</strong><FaAngleRight className="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>

                    <div className="card-body">
                        <p className="card-title text-center" style={{ fontWeight: 600 }}>({arr}) Rooms</p>
                        {/* <p className="card-title text-center" style={{ fontWeight: 600 }}>({state.UsersList.roomCount[props.floorID - 1] && state.UsersList.roomCount[props.floorID - 1].length > 0 ? state.UsersList.roomCount[props.floorID - 1].length : 0}) Rooms</p> */}
                        {/* <p className="card-title text-center" style={{ fontWeight: 600 }}>({state.UsersList.roomCount[props.floorID - 1].length >0 ? state.UsersList.roomCount[props.floorID - 1].length : 0}) Rooms</p> */}

                        <div className="row  row-gap-3  pe-3">
                            {
                                // state.UsersList.roomCount[(props.floorID * 2) - 1]?.map((room) => {
                                // state.UsersList?.roomCount && state.UsersList.roomCount[(props.floorID) - 1]?.map((room) => {
                                state.UsersList?.roomCount.length > 0 && state.UsersList.roomCount.map((room) => {
                                    // const arr = [];
                                    return (
                                        <>
                                            {room.length > 0 &&
                                                room.map((val, index) => {
                                                    if (val.Floor_Id == props.floorID) {
                                                        arr.length == 0 && arr.push(room.length)
                                                        const formattedRoomId = getFormattedRoomId(val.Floor_Id, val.Room_Id);

                                                        return (
                                                            <>
                                                                {/* <p className="card-title text-center" style={{ fontWeight: 600 }}>({arr}) Rooms</p> */}
                                                                {/* <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p> */}
                                                                <div className="col-4">
                                                                    <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }} onClick={() => { handleShows(val, index) }}>
                                                                        <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                                        <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
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

                                    // console.log("room[0]?.length",room.length);
                                    // console.log("props.floorID",props.floorID);
                                    // console.log("room[0].Floor_Id",room[0].Floor_Id);


                                    // if (room.length > 0 ) {
                                    //     console.log("room",room);
                                    //     // const roomLength = room.length
                                    //     room.map((val)=>{
                                    //         if(val.Floor_Id  == props.floorID){
                                    //             // console.log("room", room);
                                    //             // console.log("if",room.length);
                                    //             const formattedRoomId = getFormattedRoomId(val.Floor_Id, val.Room_Id);
                                    //             console.log("formattedRoomId",formattedRoomId);
                                    //             // console.log("room[0].Floor_Id", room[0].Floor_Id);
                                    //             // console.log("room[0].Room_Id", room[0].Room_Id);
                                    //             // console.log("stste", state);
                                    //             return (
                                    //                 <>
                                    //                  <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p>
                                    //                     <div className="col-4">
                                    //                         <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                    //                             <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                    //                             <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
                                    //                                 {formattedRoomId}
                                    //                             </p>
                                    //                         </div>
                                    //                     </div>
                                    //                 </>
                                    //             )
                                    //         }
                                    //     })


                                    //     // for(let j = 0; j < room.length; j++){
                                    //     //     console.log("roomLength[i]",room[j]);
                                    //     //     console.log("props.floorID",props.floorID);
                                    //     //     if(room[j].Floor_Id  == props.floorID){
                                    //     //         // console.log("room", room);
                                    //     //         // console.log("if",room.length);
                                    //     //         const formattedRoomId = getFormattedRoomId(room[j].Floor_Id, room[j].Room_Id);
                                    //     //         console.log("formattedRoomId",formattedRoomId);
                                    //     //         // console.log("room[0].Floor_Id", room[0].Floor_Id);
                                    //     //         // console.log("room[0].Room_Id", room[0].Room_Id);
                                    //     //         // console.log("stste", state);
                                    //     //         return (
                                    //     //             <>
                                    //     //              <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p>
                                    //     //                 <div className="col-4">
                                    //     //                     <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                    //     //                         <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                    //     //                         <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
                                    //     //                             {formattedRoomId}
                                    //     //                         </p>
                                    //     //                     </div>
                                    //     //                 </div>
                                    //     //             </>
                                    //     //         )
                                    //     //     }
                                    //     // }


                                    //     // console.log("room", room);
                                    //     // // console.log("if",room.length);
                                    //     // const formattedRoomId = getFormattedRoomId(room[0].Floor_Id, room[0].Room_Id);
                                    //     // // console.log("room[0].Floor_Id", room[0].Floor_Id);
                                    //     // // console.log("room[0].Room_Id", room[0].Room_Id);
                                    //     // // console.log("stste", state);
                                    //     // return (
                                    //     //     <>
                                    //     //      <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p>
                                    //     //         <div className="col-4">
                                    //     //             <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                    //     //                 <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                    //     //                 <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
                                    //     //                     {formattedRoomId}
                                    //     //                 </p>
                                    //     //             </div>
                                    //     //         </div>
                                    //     //     </>
                                    //     // )
                                    // }

                                })

                                // state.UsersList?.roomCount.length > 0 && state.UsersList.roomCount.map((room) => {
                                //     if (room.length > 0 ) {
                                //         return(
                                //             <>
                                //         {
                                //             room.map((val)=>{
                                //                     if(val.Floor_Id  == props.floorID){
                                //                         const formattedRoomId = getFormattedRoomId(val.Floor_Id, val.Room_Id);
                                //                         return (
                                //                             <>
                                //                             <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p>                                                            
                                //                                 <div className="col-4">
                                //                                     <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                //                                         <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                //                                         <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
                                //                                             {formattedRoomId}
                                //                                         </p>
                                //                                     </div>
                                //                                 </div>
                                //                             </>
                                //                         )
                                //                     }
                                //             })
                                //         }
                                //         </>
                                //         )
                                //         // console.log("room",room.length);
                                //         // // const roomLength = room.length
                                //         // for(let j = 0; j < room.length; j++){
                                //         //     // console.log("roomLength[i]",roomLength[i]);
                                //         //     console.log("props.floorID",props.floorID);
                                //         //     if(room[j].Floor_Id  == props.floorID){
                                //         //         // console.log("room", room);
                                //         //         // console.log("if",room.length);
                                //         //         const formattedRoomId = getFormattedRoomId(room[j].Floor_Id, room[j].Room_Id);
                                //         //         console.log("formattedRoomId",formattedRoomId);
                                //         //         // console.log("room[0].Floor_Id", room[0].Floor_Id);
                                //         //         // console.log("room[0].Room_Id", room[0].Room_Id);
                                //         //         // console.log("stste", state);
                                //         //         return (
                                //         //             <>
                                //         //              <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p>
                                //         //                 <div className="col-4">
                                //         //                     <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                //         //                         <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                //         //                         <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
                                //         //                             {formattedRoomId}
                                //         //                         </p>
                                //         //                     </div>
                                //         //                 </div>
                                //         //             </>
                                //         //         )
                                //         //     }
                                //         // }
                                //         // console.log("room", room);
                                //         // // console.log("if",room.length);
                                //         // const formattedRoomId = getFormattedRoomId(room[0].Floor_Id, room[0].Room_Id);
                                //         // // console.log("room[0].Floor_Id", room[0].Floor_Id);
                                //         // // console.log("room[0].Room_Id", room[0].Room_Id);
                                //         // // console.log("stste", state);
                                //         // return (
                                //         //     <>
                                //         //      <p className="card-title text-center" style={{ fontWeight: 600 }}>({room.length}) Rooms</p>
                                //         //         <div className="col-4">
                                //         //             <div className="card  text-center align-items-center" style={{ height: "60px", width: 35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                //         //                 <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                //         //                 <p style={{ marginTop: "2px", fontSize: "10px", fontWeight: 600 }}>
                                //         //                     {formattedRoomId}
                                //         //                 </p>
                                //         //             </div>
                                //         //         </div>
                                //         //     </>
                                //         // )
                                //     }

                                // })
                            }

                            <div className="col-4">
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
                    <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>


                    <div className="row column-gap-3 g-3 d-flex align-items-center ">
                        {roomDetails.map((room, index) => (
                            <>
                                {
                                    updateRoom === 'Add' &&
                                    roomDetailsFromState && roomDetailsFromState.some(existingRoom => existingRoom.hostel_Id === props.hostel_Id && existingRoom.floor_Id === props.floorID && String(existingRoom.roomId) === String(room.roomId)) && (
                                        <div className="p-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }}>
                                            RoomId <strong>{room.roomId}</strong> is already exists &
                                            available beds are <strong style={{ color: "white" }}>{roomDetailsFromState.find(existingRoom => existingRoom.hostel_Id === props.hostel_Id && existingRoom.floor_Id === props.floorID && String(existingRoom.roomId) === String(room.roomId))?.numberOfBeds}</strong>
                                        </div>
                                    )
                                }
                                {
                                    updateRoom === 'Edit' ?
                                        <>
                                            <div key={index} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                                                <div className="form-group mb-4 p-2 d-flex flex-column">
                                                    <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}><b>Room Number : </b></label>
                                                    <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>{room.roomId}</label>
                                                </div>
                                            </div>
                                            {/* <div key={index} className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                                    <div className="form-group mb-4 p-2 d-flex flex-column">
                                        <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}><b>Number of Beds : </b></label>
                                        <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>{room.numberOfBeds}</label>
                                    </div>
    </div> */}
                                        </>
                                        :
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
                                                        placeholder="Enter here"
                                                        style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                }



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

                    <div className="d-flex justify-content-end" style={{ marginTop: "15px" }} >
                        <Button variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "90px", borderRadius: 200 }} onClick={handleCancels}>
                            Cancel
                        </Button>
                        <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateRoom}>
                            {updateRoom == 'Add' ? "Save" : "Update"}
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>


        </>)
}

export default DashboardRoom;