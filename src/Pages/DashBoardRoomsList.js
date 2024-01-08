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
    console.log('state', state)
    const dispatch = useDispatch();
    console.log("props ************", props);

    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);

    const handleCancels = () => {
        handleCloses();
    };

    useEffect(() => {
        dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
           }, [props.floorID, props.hostel_Id,props.room_id])

    

    return (
        <>
 <div className="col-lg-2 col-md-6  col-sm-12 col-xs-12">

            <div className="card h-auto" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto",maxWidth:200 }}>

                <div className="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>{getFloorName(props.floorID)}</strong><FaAngleRight className="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>

                <div className="card-body">
                    <p className="card-title text-center">({state.UsersList.roomCount[props.floorID - 1]?.length || 0}) Rooms</p>
                   
                                    <div className="row  row-gap-3 pe-3">
                                    {
                        state.UsersList.roomCount[props.floorID - 1]?.map((room) => {
                            const formattedRoomId = getFormattedRoomId(props.floorID, room.Room_Id);
                            return (
                                <>
                                        <div className="col-4">
                                            <div className="card  text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" ,backgroundColor:"#cccccc11"}}>
                                                <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                <p style={{ marginTop: "2px", fontSize: "10px" }}>
                                                     {/* {state.UsersList.RoomList[props.floor_Id - 1]?.length > 0 ? room.Room_Id : 0} */}
                                                     {formattedRoomId}
                                                     </p>
                                            </div>
                                        </div>
                                        </>
                                    )
                                    })
                                }
                                
                                        <div className="col-4">
                                            <div className="card  text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA",backgroundColor:"#cccccc11" }} onClick={handleShows}>
                                                <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt='Room' />
                                                <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} className="mb-0" >Create Room</p>
                                            </div>
                                        </div>
                                        </div >
                                  
                        </div>


            </div>


            </div>




            
            <Offcanvas show={shows} onHide={handleCloses} placement="end" style={{ width: "70vh" }}>
                <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-3">Create Room</Offcanvas.Title>
                <Offcanvas.Body>
                    <h4 style={{ fontSize: 14, fontWeight: 600 }}>Create Room</h4>
                    <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
                    <div className="row column-gap-3 g-3">

                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                            <div className="form-group mb-4 ps-1" >
                                <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                <input type="text" className="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                            <div className="form-group mb-4 ps-1" >
                                <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Select Bed</label>
                                <div className="d-flex">
                                    <select className="form-select custom-border-bottom" id="exampleInput1" aria-label="Default select example" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }}>
                                        <option value="1">04</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row column-gap-1 g-3 d-flex justify-content-between">
                        <div className=" col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                            <div className="form-group mb-4 ps-1" >
                                <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                <input type="text" className="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                            <div className="form-group mb-4 ps-1" >
                                <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Select Bed</label>
                                <div className="d-flex">
                                    <select className="form-select custom-border-bottom" id="exampleInput1" aria-label="Default select example" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }}>
                                        <option value="1">04</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-1">
                            <TiDeleteOutline style={{ fontSize: 18, color: "red" }} />
                        </div>

                    </div>
                    <div className="row column-gap-1 g-3 d-flex justify-content-between">
                        <div className=" col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                            <div className="form-group mb-4 ps-1" >
                                <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                <input type="text" className="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                            <div className="form-group mb-4 ps-1" >
                                <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Select Bed</label>
                                <div className="d-flex">
                                    <select className="form-select custom-border-bottom" id="exampleInput1" aria-label="Default select example" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }}>
                                        <option value="1">04</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>

                            </div>

                        </div>
                        <div className="col-lg-1">
                            <TiDeleteOutline style={{ fontSize: 18, color: "red" }} />
                        </div>

                    </div>

                    <div>
                        <AiOutlinePlusCircle style={{ height: "30px" }} /> <label style={{ color: "gray", fontSize: "14px" }}>Add Room</label>
                    </div>
                    <hr style={{ marginTop: "100px" }} />

                    <div className="d-flex justify-content-end" style={{ marginTop: "15px" }} >

                        <Button variant="white" size="sm" style={{ width: "90px" }} onClick={handleCancels}>
                            Cancel
                        </Button>
                        <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }}>
                            Save
                        </Button>

                    </div>
                </Offcanvas.Body>
            </Offcanvas>


        </>)
}

export default DashboardRoom;

