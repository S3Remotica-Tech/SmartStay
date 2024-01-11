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



function getFloorName(floor_Id) {
    if (floor_Id === 1) {
        return 'Ground Floor';
    } else if (floor_Id === 2) {
        return '1st Floor';
    } else if (floor_Id === 3) {
        return '2nd Floor';
    } else if (floor_Id >= 11 && floor_Id <= 13) {
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

        return `${floor_Id}${suffix} Floor`;
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

    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);

    const handleCancels = () => {
        handleCloses();
    };

    useEffect(() => {
        dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
    }, [props.floorID, props.hostel_Id, props.room_id])






    const [roomDetails, setRoomDetails] = useState([{ roomId: '', numberOfBeds: '' }, { roomId: '', numberOfBeds: '' }, { roomId: '', numberOfBeds: '' }]);


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


            setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
            handleCloses();
        } else {

            alert('Please enter at least one valid room.');
        }
    };
    const handleRemoveRoomDetails = (indexToRemove) => {
        setRoomDetails((prevDetails) => prevDetails.filter((_, index) => index !== indexToRemove));
    };
    return (
        <>
            <div className="col-lg-2 col-md-4  col-sm-12 col-xs-12 col-12">

                <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 }}>

                    <div className="card-header d-flex justify-content-between p-2" style={{backgroundColor:"#f6f7fb"}}><strong style={{ fontSize: "13px" }}>{getFloorName(props.floorID)}</strong><FaAngleRight className="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>

                    <div className="card-body">
                        <p className="card-title text-center" style={{fontWeight:600}}>({state.UsersList.roomCount[props.floorID - 1]?.length || 0}) Rooms</p>

                        <div className="row  row-gap-3  pe-3">
                            {
                                state.UsersList.roomCount[props.floorID - 1]?.map((room) => {
                                    console.log("state",state);
                                    const formattedRoomId = getFormattedRoomId(props.floorID, room.Room_Id);
                                    return (
                                        <>
                                            <div className="col-4">
                                                <div className="card  text-center align-items-center" style={{ height: "60px", width:35, borderRadius: "5px", backgroundColor: "#f6f7fb" }}>
                                                    <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                    <p style={{ marginTop: "2px", fontSize: "10px",fontWeight:600 }}>
                                                        {formattedRoomId}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }

                            <div className="col-4">
                                <div className="card  text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA", backgroundColor: "#cccccc11" }} onClick={handleShows}>
                                    <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt='Room' />
                                    <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px",fontWeight:600 }} className="mb-0" >Create Room</p>
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
                            Save
                        </Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>


        </>)
}

export default DashboardRoom;















