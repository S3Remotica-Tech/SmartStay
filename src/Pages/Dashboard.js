import React, { useState, useEffect, useRef } from 'react'
import Hostel from '../Assets/Images/hostel.png';
import Plus from '../Assets/Images/Create-button.png';
import Image from 'react-bootstrap/Image';
import '../Pages/Dashboard.css';
import { FaSquare } from "react-icons/fa";
import { FaSearch } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import RoomDetails from '../Pages/RoomDetails';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import DashboardRoomList from './DashBoardRoomsList';
import SelectedHostelFloorList from './SelectedHostelFloorList';

function Dashboard() {

//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

    const [activePage, setActivePage] = useState(true)
//     const [roomDetails, setRoomDetails] = useState('')
//     const [selectedHostel, setSelectedHostel] = useState(null);
//     const [floorDetails, setFloorDetails] = useState([{ number_of_floor: '' }
//     // , { number_of_floor: '' }, { number_of_floor: '' }
// ]);

//     const handleFloorChange = (value, index) => {
//         setFloorDetails((prevDetails) => {
//             const updatedDetails = [...prevDetails];
//             updatedDetails[index].number_of_floor = value;
//             return updatedDetails;
//         });
//     };


//     const handleCreateFloor = () => {
//         const floors = floorDetails.map((floor) => ({ number_of_floors: parseInt(floor.number_of_floor) }));
//         const phoneNumber = selectedHostel.hostel_PhoneNo.toString()
//         dispatch({
//             type: 'CREATEFLOOR',
//             payload: {
//                 phoneNo: phoneNumber,
//                 hostelDetails: floors,
//             },
//         });
//         setFloorDetails([])
//         handleClose();
//     };

//     const handleAddFloor = () => {
//         setFloorDetails([...floorDetails, { number_of_floor: '' }])
//     }


//     const handleDeleteFloor = (index) => {
//         setFloorDetails((prevDetails) => {
//             const updatedDetails = [...prevDetails];
//             updatedDetails.splice(index, 1);
//             return updatedDetails;
//         });
//     };



//     const handlePageClicks = (page) => {
//         setRoomDetails(page);
//         setActivePage(false)

//     };
//     const handleCancel = () => {
//         handleClose();
//     };


//     const state = useSelector(state => state)
//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch({ type: 'HOSTELLIST' })
//     }, [])

//     const handleHostelSelect = (hostelName) => {
//         console.log("state.UsersList.hostelList",state.UsersList.hostelList);
//         const selected = state.UsersList.hostelList.find(item => item.Name === hostelName);
//         setSelectedHostel(selected);
//     };
    return (
        <>
            {activePage &&

                <>
                    <div className="p-3">

                        <div className="d-flex justify-content-between">

                            <div>
                            <h4 className="p-3">Dashboard</h4>
              <p className="ps-3">Hi, Welcome to Business Dashboard</p>
                            </div>
                            <div className="" style={{ backgroundColor: "#F8F9FA", borderRadius: "50%", height: "30px", width: "30px" }}>
                                <FaSearch className="p-2" style={{ color: "lightgray" }} size={30} />
                            </div>
                        </div>

                        {/* <hr className="mt-1 mb-3" />
                        <div className="row g-0 d-flex justify-content-start align-items-center" >
                            <div className="col-lg-2 col-md-4 col-sm-12 col-xs-12 col-12 d-flex justify-content-between align-items-center p-0" style={{ backgroundColor: "" }} >
                                <div className="d-flex justify-content-between align-items-center">
                                    <Image src={Hostel} roundedCircle style={{ height: "30px", width: "30px" }} />
                                    <div className="d-block ps-2">
                                        <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray", fontWeight: 600 }}>PG Detail</p>

                                        <select onChange={(e) => handleHostelSelect(e.target.value)} class="form-select ps-0" aria-label="Default select example" style={{ backgroundColor: "", padding: "8px", border: "none", boxShadow: "none", width: "100px", fontSize: 9, fontWeight: 700 }}>
                                            <option disabled selected className='p-3'>Select Hostel</option>
                                            {state.UsersList.hostelList.map((obj) => {
                                                return (<>
                                                    <option style={{ fontSize: 15 }}>{obj.Name}</option>
                                                </>)
                                            })}

                                        </select>

                                    </div>
                                    <div style={{ borderLeft: "1px solid #cccccc99", height: "30px" }} className="vertical-line"></div>
                                </div>
                            </div>
                            {selectedHostel && <>
                                {
                                    Array.from(Array(selectedHostel.number_Of_Floor), (index, element) => {
                                        return <SelectedHostelFloorList floorID={element + 1} hostel_Id={selectedHostel.id} phoneNumber={selectedHostel.hostel_PhoneNo} />
                                    })}


                                <div className="col-lg-2  col-md-4 col-sm-12 col-xs-12 col-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <div>
                                        <button type="button" className="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "auto", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "auto", color: "#2E75EA" }} onClick={handleShow}>
                                            <span style={{ padding: "20px 20px" }}>
                                                <img src={Plus} height="12" width="12" alt='Plus' /> Create Floor  </span></button>
                                    </div>
                                </div>
                            </>}
                        </div>
                      

                        <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "70vh" }}>
                            <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-4">Create Floor</Offcanvas.Title>
                            <Offcanvas.Body>
                                <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
                                <div className="row g-3 d-flex align-items-center " >
                                    {floorDetails.map((floor, index) => (
                                        <>
                                            <div key={index} className='col-lg-10 col-md-10 col-xs-12 col-sm-12 col-12' style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "0px" }}>
                                                <div className="form-group mb-4 ps-1" >
                                                    <label htmlFor={`floorName${index}`} for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Floor Name</label>

                                                    <input type="text" id={`floorName${index}`}
                                                        onChange={(e) => handleFloorChange(e.target.value, index)}
                                                        value={floor.number_of_floor} className="form-control custom-border-bottom p-0" placeholder="Enter here" style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, width: "", borderRight: "none", borderBottom: "1px solid lightgray" }} />
                                                </div>

                                            </div>
                                            <div className='col-lg-2 col-md-2 col-xs-12 col-sm-12 col-12 d-flex justify-content-between align-items-center' style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "0px" }}>
                                                {index > 0 &&
                                                    <AiOutlineDelete style={{ color: "red" }} onClick={() => handleDeleteFloor(index)} />
                                                }


                                            </div>

                                        </>
                                    ))}




                                </div>


                                <div className='d-flex mt-2' onClick={handleAddFloor}>
                                    <div><AiOutlinePlusCircle style={{ height: "30px" }} /> </div>
                                    <div className='ms-1'><label style={{ color: "gray", fontSize: "12px" }}>Add Floor</label></div>
                                </div>
                                <hr style={{ marginTop: "130px" }} />

                                <div className="d-flex justify-content-end" style={{ marginTop: "40px" }} >

                                    <Button variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "80px", borderRadius: 200 }} onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                    <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateFloor}>
                                        Save
                                    </Button>

                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                        <hr />




                        {selectedHostel && <>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 style={{ fontSize: 18, color: "black", fontWeight: 600 }}>{selectedHostel.Name}</h5>
                                </div>
                                <div className="d-flex gap-5">
                                    <div className="d-flex gap-1">
                                        <FaSquare style={{ color: "gray", height: "20px" }} />   <h6 className="ps-2" style={{ color: "gray", fontSize: "" }}>Room Empty</h6>
                                    </div>
                                    <div className="d-flex gap-1">
                                        <FaSquare style={{ color: "green", height: "20px" }} />   <h6 className="ps-2" style={{ color: "green" }}>Room Full</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="row row-cols-1 row-gap-3 row-cols-md-6 g-1 justify-content-evenly pt-5" >

                                {
                                    Array.from(Array(selectedHostel.number_Of_Floor), (index, element) => {
                                        return <DashboardRoomList floorID={element + 1} hostel_Id={selectedHostel.id} phoneNumber={selectedHostel.hostel_PhoneNo} />
                                    })}

                                <div className="col-lg-2 col-md-4  col-sm-12 col-xs-12 col-12">
                                    <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 }} id="card-hover" onClick={handleShow}>
                                        <div className="d-flex justify-content-center" style={{ marginTop: "50%" }}>
                                            <img src={Plus} height="18" width="16" alt='Plus' />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <p style={{ color: "#1F75FE", paddingLeft: "", fontSize: "15px", fontWeight: 600 }}>Create Floor</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>} */}


                    </div>


                </>

            }
            {/* {roomDetails === 'RoomDetailsPage' && <RoomDetails />} */}

        </>
    )
}

export default Dashboard;