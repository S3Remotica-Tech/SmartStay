import React, { useState } from 'react'
import Hostel from '../Assets/Images/hostel.png';
import Plus from '../Assets/Images/Create-button.png';
import Image from 'react-bootstrap/Image';
import '../Pages/Dashboard.css';
import { FaSquare } from "react-icons/fa";
import Room from '../Assets/Images/Room.png';
import { FaAngleRight } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import RoomDetails from '../Pages/RoomDetails';
import Form from 'react-bootstrap/Form';
import { TiDeleteOutline } from "react-icons/ti";
import Button from 'react-bootstrap/Button';


function Dashboard() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [shows, setShows] = useState(false);
    const handleCloses = () => setShows(false);
    const handleShows = () => setShows(true);
    const [activePage, setActivePage] = useState(true)
    const [roomDetails, setRoomDetails] = useState('')

    const handlePageClicks = (page) => {
        setRoomDetails(page);
        setActivePage(false)

    };
    const handleCancel = () => {
        handleClose();
    };
    const handleCancels = () => {
        handleCloses();
    };


    // const [floors, setFloors] = useState([
    //     { name: 'Ground Floor', rooms: ['G001', 'G002', 'G003', 'G004'] },
    //     { name: '1st Floor', rooms: ['F001', 'F002', 'F003', 'F004', 'F005'] },
    //     { name: '2nd Floor', rooms: ['S001', 'S002', 'S003'] },
    //     { name: '3rd Floor', rooms: ['T001', 'T002', 'T003', 'T004'] },
    // ]);
    const [floors, setFloors] = useState([
        { name: 'Ground Floor', rooms: [{ name: 'G001', beds: ['BED 1', 'BED 2', 'BED 3', 'BED 4'] }, { name: 'G002', beds: ['BED 1', 'BED 2', 'BED 3'] },{ name: 'G003', beds: ['BED 1', 'BED 2', 'BED 3'] },{ name: 'G004', beds: ['BED 1', 'BED 2', 'BED 3'] }, ] },
        { name: '1st Floor', rooms: [{ name: 'F001', beds: ['BED 1', 'BED 2', 'BED 3', 'BED 4', 'BED 5'] }, { name: 'F002', beds: ['BED 1', 'BED 2', 'BED 3'] },{ name: 'F003', beds: ['BED 1', 'BED 2', 'BED 3'] },{ name: 'F004', beds: ['BED 1', 'BED 2', 'BED 3'] },{ name: 'F005', beds: ['BED 1', 'BED 2', 'BED 3'] }] },
        { name: '2nd Floor', rooms: [{ name: 'S001', beds: ['BED 1', 'BED 2', 'BED 3'] }, { name: 'S002', beds: ['BED 1', 'BED 2'] }, { name: 'S003', beds: ['BED 1', 'BED 2', 'BED 3', 'BED 4'] }] },
        { name: '3rd Floor', rooms: [{ name: 'T001', beds: ['BED 1', 'BED 2', 'BED 3'] }, { name: 'T002', beds: ['BED 1', 'BED 2', 'BED 3'] }, { name: 'T003', beds: ['BED 1', 'BED 2', 'BED 3', 'BED 4'] }, { name: 'T004', beds: ['BED 1', 'BED 2'] }] },
    ]);
    const groundFloor = floors.find(floor => floor.name === 'Ground Floor');
    const firstFloor = floors.find(floor => floor.name === '1st Floor');
    const secondFloor = floors.find(floor => floor.name === '2nd Floor');
    const thirdFloor = floors.find(floor => floor.name === '3rd Floor');


    return (
        <>
            {activePage &&

                <>
                    <div class="p-2">

                        <div class="d-flex justify-content-between">

                            <div class="">
                                <h5>Dashboard</h5>
                                <p style={{ fontSize: "12px", }}>Hi,Rahul! Welcome to Business Dashboard</p>
                            </div>
                            <div class="" style={{ backgroundColor: "#F8F9FA", borderRadius: "50%", height: "30px", width: "30px" }}>
                                <FaSearch class="p-2" style={{ color: "lightgray" }} size={30} />
                            </div>
                        </div>

                        <hr class="mt-1 mb-3" />

                        <div class="row g-0  d-flex justify-content-center align-items-center" >
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12"  >
                                <div class="d-flex justify-content-between align-items-center">
                                    <Image src={Hostel} roundedCircle style={{ height: "30px", width: "30px" }} />
                                    <div class="d-block ps-1">
                                        <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray" }}>PG Detail</p>
                                        <p style={{ fontSize: "8.5px", marginBottom: "0px", marginRight: "0px", fontWeight: "800" }}>Royal Grand Hostel</p>
                                    </div>
                                    <Form.Select class="me-2 ms-0" aria-label="Default select example" style={{ border: "none", height: "10px", width: "40px" }} >

                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </Form.Select>
                                    <div class="" style={{ borderLeft: "1px solid #cccccc99", height: "30px" }} className="vertical-line"></div>
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" style={{ display: "flex", justifyContent: "center" }} >
                                <div style={{ fontSize: "11px", color: "gray", fontWeight: "700" }}>Ground Floor</div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" style={{ display: "flex", justifyContent: "center" }} >
                                <div style={{ fontSize: "11px", color: "gray", fontWeight: "700" }}>1st Floor</div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" style={{ display: "flex", justifyContent: "center" }} >
                                <div style={{ fontSize: "11px", color: "gray", fontWeight: "700" }}>2nd Floor</div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ fontSize: "11px", color: "gray", fontWeight: "700" }}>3rd Floor</div>
                            </div>
                            <div class="col-lg-2  col-md-6 col-sm-12 col-xs-12" style={{ display: "flex", justifyContent: "center" }}>
                                <div>
                                    <button type="button" class="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "auto", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "auto", color: "#2E75EA" }} onClick={handleShow}>
                                        <span style={{ padding: "20px 20px" }}>
                                            <img src={Plus} height="12" width="12" alt='Plus' /> Create Floor  </span></button>
                                </div>
                            </div>
                        </div>

                        <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "70vh" }}>
                            <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} class="ps-3">Create PG</Offcanvas.Title>
                            <Offcanvas.Body>
                                <p class="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
                                <div class="mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                    <div class="form-group mb-4 ps-3 pe-3" >
                                        <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Floor Name</label>
                                        <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="4th Floor" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                                    </div>
                                </div>
                                <div class="mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                    <div class="form-group mb-4 ps-3 pe-3" >
                                        <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Floor Name</label>
                                        <div class="d-flex">
                                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="5th Floor" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                                            <AiOutlineDelete style={{ color: "red" }} />
                                        </div>

                                    </div>
                                </div>
                                <div class="mb-3" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                    <div class="form-group mb-4 ps-3 pe-3" >
                                        <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Floor Name</label>
                                        <div class="d-flex">
                                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="6th Floor" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                                            <AiOutlineDelete style={{ color: "red" }} />
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <AiOutlinePlusCircle style={{ height: "30px" }} /> <label style={{ color: "gray", fontSize: "14px" }}>Add Floor</label>
                                </div>
                                <hr style={{ marginTop: "130px" }} />

                                <div class="d-flex justify-content-end" style={{ marginTop: "40px" }} >

                                    <Button variant="white" size="sm" style={{ width: "90px" }} onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }}>
                                        Save
                                    </Button>

                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                        <Offcanvas show={shows} onHide={handleCloses} placement="end" style={{ width: "70vh" }}>
                            <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} class="ps-3">Create Room</Offcanvas.Title>
                            <Offcanvas.Body>
                                <h4 style={{ fontSize: 14, fontWeight: 600 }}>Create Room</h4>
                                <p class="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
                                <div class="row column-gap-3 g-3">

                                    <div class="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                        <div class="form-group mb-4 ps-1" >
                                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                        <div class="form-group mb-4 ps-1" >
                                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Select Bed</label>
                                            <div class="d-flex">
                                                <select class="form-select custom-border-bottom" id="exampleInput1" aria-label="Default select example" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }}>
                                                    <option value="1">04</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="row column-gap-1 g-3 d-flex justify-content-between">
                                    <div class=" col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                        <div class="form-group mb-4 ps-1" >
                                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                        <div class="form-group mb-4 ps-1" >
                                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Select Bed</label>
                                            <div class="d-flex">
                                                <select class="form-select custom-border-bottom" id="exampleInput1" aria-label="Default select example" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }}>
                                                    <option value="1">04</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="col-lg-1">
                                        <TiDeleteOutline style={{ fontSize: 18, color: "red" }} />
                                    </div>

                                </div>
                                <div class="row column-gap-1 g-3 d-flex justify-content-between">
                                    <div class=" col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                        <div class="form-group mb-4 ps-1" >
                                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput1" placeholder="" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }} />
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }} >
                                        <div class="form-group mb-4 ps-1" >
                                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Select Bed</label>
                                            <div class="d-flex">
                                                <select class="form-select custom-border-bottom" id="exampleInput1" aria-label="Default select example" style={{ fontSize: "11px", backgroundColor: "#F6F7FB" }}>
                                                    <option value="1">04</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="col-lg-1">
                                        <TiDeleteOutline style={{ fontSize: 18, color: "red" }} />
                                    </div>

                                </div>

                                <div>
                                    <AiOutlinePlusCircle style={{ height: "30px" }} /> <label style={{ color: "gray", fontSize: "14px" }}>Add Room</label>
                                </div>
                                <hr style={{ marginTop: "100px" }} />

                                <div class="d-flex justify-content-end" style={{ marginTop: "15px" }} >

                                    <Button variant="white" size="sm" style={{ width: "90px" }} onClick={handleCancels}>
                                        Cancel
                                    </Button>
                                    <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }}>
                                        Save
                                    </Button>

                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                        <hr />
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5>Royal Grand Hostel</h5>
                            </div>
                            <div class="d-flex gap-5">
                                <div class="d-flex gap-1">
                                    <FaSquare style={{ color: "gray", height: "20px" }} />   <h6 class="ps-2" style={{ color: "gray", fontSize: "" }}>Room Empty</h6>
                                </div>
                                <div class="d-flex gap-1">
                                    <FaSquare style={{ color: "green", height: "20px" }} />   <h6 class="ps-2" style={{ color: "green" }}>Room Full</h6>
                                </div>
                            </div>
                        </div>

                        <div class="row row-cols-1  row-cols-md-6 g-1 justify-content-evenly pt-5" >
                            <div class="col-lg-2 col-md-6  col-sm-12 col-xs-12">
                                <div class="card h-auto" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }}>
                                    {floors.map((floor)=>{
                                        if (floor.name === 'Ground Floor') {
                                        return(
                                            <>
                                            <div class="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>{floor.name}</strong><FaAngleRight class="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>
                                                                         
                                    <div class="card-body">
                                        <p class="card-title text-center">({floor.rooms.length}) Rooms</p>

                                        <div class="row  row-gap-3 pe-3">
                                        {groundFloor.rooms.map((ground) => (
                                                <div class="col-4">
                                                    <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                                        <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                        <p style={{ marginTop: "2px", fontSize: "10px" }}>{ground.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div class="col-4">
                                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }} onClick={handleShows}>
                                                    <img src={Plus} class="pt-2 mb-0" height="25" width="15" alt='Room' />
                                                    <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} class="mb-0" >Create Room</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    </>
                                      )
                                    }
                                    return null
                                })}
                                </div>
                              
                            </div>
 
                                       
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
                                <div class="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }}>
                                  
                                {floors.map((floor)=>{
                                        if (floor.name === '1st Floor') {
                                        return(
                                            <>
                                    <div class="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>{floor.name}</strong> <FaAngleRight class="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>
                                    
                                    <div class="card-body">
                                        <p class="card-title text-center">({floor.rooms.length}) Rooms</p>
                                        <div class="row row-gap-3 pe-3">
                                        {firstFloor.rooms.map((first) => (
                                                <div class="col-4">
                                                    <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                                        <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                        <p style={{ marginTop: "2px", fontSize: "10px" }}>{first.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div class="col-4">
                                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }} onClick={handleShows}>
                                                    <img src={Plus} class="pt-2 mb-0" height="25" width="15" alt='Room' />
                                                    <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} class="mb-0">Create Room</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                )
                                        }
                                        return null
                                    })}
                                </div>
                               
                            </div>
                            <div class="col-lg-2 col-md-6  col-sm-12 col-xs-12">
                                <div class="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }}>
                                  
                                {floors.map((floor)=>{
                                        if (floor.name === '2nd Floor') {
                                        return(
                                  <>
                                    <div class="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>{floor.name}</strong> <FaAngleRight class="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>
                                   
                                    
                                   <div class="card-body">
                                        <p class="card-title text-center">({floor.rooms.length}) Rooms</p>
                                        <div class="row row-gap-3 pe-3">

                                        {secondFloor.rooms.map((second) => (
                                            <div class="col-4">
                                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                                    <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                    <p style={{ marginTop: "2px", fontSize: "10px" }}>{second.name}</p>
                                                </div>
                                            </div>
                                        ))}    
                                                                        

                                            <div class="col-4">
                                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }} onClick={handleShows}>
                                                    <img src={Plus} class="pt-2 mb-0" height="25" width="15" alt='Room' />
                                                    <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} class="mb-0">Create Room</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                    )
                                }
                                return null
                            })}
                           
                                </div>
                            </div>
                            <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12">
                                <div class="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }}>
                                {floors.map((floor)=>{
                                        if (floor.name === '3rd Floor') {
                                        return(
                                <>
                                    <div class="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>{floor.name}</strong> <FaAngleRight class="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>
                                   
                                   
                                   
                                   <div class="card-body">
                                        <p class="card-title text-center">({floor.rooms.length}) Rooms</p>
                                        <div class="row row-gap-3 pe-3">
                                        {thirdFloor.rooms.map((third) => (
                                            <div class="col-4">
                                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                                    <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                                    <p style={{ marginTop: "2px", fontSize: "10px" }}>{third.name}</p>
                                                </div>
                                            </div>
                                         ))}   
                                            
                                           
                                            <div class="col-4">
                                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }} onClick={handleShows}>
                                                    <img src={Plus} class="pt-2 mb-0" height="25" width="15" alt='Plus' />
                                                    <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} class="mb-0">Create Room</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                     )
                                    }
                                    return null
                                })}
                                </div>
                            </div>



                            <div class="col-lg-2 col-md-6  col-sm-12 col-xs-12">
                                <div class="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }} id="card-hover" onClick={handleShow}>
                                    <div class="d-flex justify-content-center" style={{ marginTop: "50%" }}>
                                        <img src={Plus} height="18" width="16"  alt='Plus' />
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <p style={{ color: "#1F75FE", paddingLeft: "", fontSize: "15px" }}>Create Floor</p>
                                    </div>
                                </div>
                            </div>
                        </div>





                    </div>


                </>

            }
            {roomDetails === 'RoomDetailsPage' && <RoomDetails />}

        </>
    )
}

export default Dashboard 