import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/Sidebar.css'
import Dashboard from '../Assets/Images/Side Menu/Dashboard.png';
import PgList from '../Assets/Images/Side Menu/pg-list.png';
import UserList from '../Assets/Images/Side Menu/user-list.png';
import Invoice from '../Assets/Images/Side Menu/Invoice.png';
import Compliance from '../Assets/Images/Side Menu/Compliance.png';
import Payment from '../Assets/Images/Side Menu/payment-gateway.png';
import UserAccess from '../Assets/Images/Side Menu/User-and-access.png';
import Reports from '../Assets/Images/Side Menu/report.png';
import Settings from '../Assets/Images/Side Menu/settings.png';
import Support from '../Assets/Images/Side Menu/support.png';
import Dashboards from '../Pages/Dashboard';
import PgLists from '../Pages/PgList';
import UserLists from '../Pages/UserList';
import Invoices from '../Pages/Invoice';
import Compliances from '../Pages/Compliance';
import Payments from '../Pages/Payment';
import UserAccesss from '../Pages/UserAccess';
import Report from '../Pages/Reports';
import Setting from '../Pages/Settings';
import Supports from '../Pages/Support';
import Hostels from '../Assets/Images/hostel.png';
import Plus from '../Assets/Images/Create-button.png';
import Welcome from '../Assets/Images/dashboard-welcome.png';
import Image from 'react-bootstrap/Image';
import Menu from '../Assets/Images/Menu-plus.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Hostel from '../Assets/Images/hostel.png';
import CreateButton from '../Assets/Images/Create-button.png';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { BsTextIndentLeft } from "react-icons/bs";
import { BsTextIndentRight } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import CreatePG from './CreatePG';

function Sidebar() {

  const [activePage, setActivePage] = useState(true);

  const [collapsed, setCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState('');

  const [pgList, setPgList] = useState({
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    number_Of_Floor: '',
    number_Of_Rooms: '',
    floorDetails: []
  })
  const [floorDetails, setfloorDetails] = useState([])
  const [floorName, setFloorName] = useState('');
  const [roomDetails, setRoomDetails] = useState({
    // roomNo:'',
    // numberOfBed:''
  })
  // const [roomNo,setRoomNo] = useState('');
  // const [numberOfBed,setNumberOfBed] = useState('')
  // const handleRoom = (e) =>{
  // const room = e.target.value;
  // setRoomDetails({...roomDetails,roomNo:room})
  // setfloorDetails([...floorDetails,{roomDetails}])
  // // setRoomNo(room)
  // // setfloorDetails([...floorDetails,{RoomNo:room}])
  // }
  // const handleUpdateBed = (e) =>{
  //   const bed = e.target.value;
  //   setRoomDetails({...roomDetails,numberOfBed:bed})
  //   setfloorDetails([...floorDetails,{roomDetails}])
  //   // setNumberOfBed(bed)
  //   // setfloorDetails([...floorDetails,{NumberOfBed:bed}])
  // }

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('pgList.number_Of_Floor', pgList.number_Of_Floor);
      let tempArry = [];
      for (let i = 0; i < pgList.number_Of_Floor; i++) {
        var a = {}
        tempArry.push(a)
      }
      setPgList({ ...pgList, floorDetails: tempArry })
      console.log("tempArry", tempArry);

    }, 1000);
    return () => clearTimeout(timeout)
  }, [pgList.number_Of_Floor])

  // useEffect(()=>{
  //   const timeout = setTimeout(() => {
  //   let tempArry =[];
  //   for(let i=0;i<pgList.number_Of_Rooms;i++){
  //     var a={}
  //     tempArry.push(a)
  //   }
  //   setPgList({...pgList,floorDetails[pgList.number_Of_Floor-i]:a})
  // }, 1000);

  //   return () => clearTimeout(timeout)
  // },[pgList.number_Of_Rooms])

  useEffect(() => {
    const timeout = setTimeout(() => {
      let tempArray = [];
      for (let i = 0; i < pgList.number_Of_Rooms; i++) {
        let newRoom = {
          roomNumber: i + 1,
          number_Of_Bed: ''
        };
        tempArray.push(newRoom);
      }

      setPgList((prevPgList) => ({
        ...prevPgList,
        floorDetails: [tempArray],
      }));

      console.log("tempArray...Room", tempArray);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pgList.number_Of_Rooms]);

  const handlenumberOfFloor = () => {
    console.log("check");
  }
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  console.log("state for PgList", state)


  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setActivePage(false);
    setCollapsed(true);
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancels = () => {
    handleClose();
  };

  // const handleSubmitPgList = () => {
  //      if (pgList.Name && pgList.phoneNumber) {
  //     dispatch({
  //       type: 'PGLIST',
  //       payload: { name: pgList.Name, phoneNo: pgList.phoneNumber, email_Id: pgList.email_Id, location: pgList.location, number_of_floors: pgList.number_Of_Floor, room: pgList.room_Id, bed: pgList.number_Of_Bed, }
  //     })
  //   }
  //   setPgList({
  //     Name: '',
  //     phoneNumber: '',
  //     email_Id: '',
  //     location: '',
  //     number_Of_Floor: '',
  //     room_Id: '',
  //     number_Of_Bed: '',
  //   });
  // }

  const handleSubmitPgList = () => {
    console.log("floorDetails", floorDetails);
    console.log("pglist",pgList);
    if (pgList.Name && pgList.phoneNumber) {
      const floorDetailsArray = Array.from({ length: parseInt(pgList.number_Of_Floor) }, (_, index) => {
        const floorNumber = index + 1;
        const numberOfRooms = parseInt(pgList[`number_Of_Rooms_${floorNumber}`]) || 0;

        return {
          floor: floorNumber,
          roomDetails: Array.from({ length: numberOfRooms }, (_, roomIndex) => {
            return {
              number_Of_Rooms: pgList[`number_Of_Rooms_${floorNumber}_${roomIndex}`] || 0,
              // room_Name: pgList[`room_Name_${floorNumber}_${roomIndex}`] || "",
              number_Of_Bed: pgList[`number_Of_Bed_${floorNumber}_${roomIndex}`] || "",
            };
          }),
        };
      });

      dispatch({
        type: 'PGLIST',
        payload: {
          name: pgList.Name,
          phoneNo: pgList.phoneNumber,
          email_Id: pgList.email_Id,
          location: pgList.location,
          number_of_floors: pgList.number_Of_Floor,
          floorDetails: floorDetailsArray,
        }
      });
    }


    // setPgList({
    //   Name: '',
    //   phoneNumber: '',
    //   email_Id: '',
    //   location: '',
    //   number_Of_Floor: '',
    //   // room_Id: '',
    //   // number_Of_Bed: '',
    // });


    handleClose();
  }


  const [isSidebarMaximized, setIsSidebarMaximized] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarMaximized(!isSidebarMaximized);
  };


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  console.log("pglist", pgList);
  return (
    <Container fluid className='p-0'>

      <Row className='g-0 m-0'>

        <Col lg={isSidebarMaximized ? 2 : 1} md={isSidebarMaximized ? 2 : 1} sm={12} xs={12} className=" d-sm-block bg-light vh-100 p-0" style={{ cursor: "pointer", position: "relative" }} >
          <div onClick={toggleSidebar} className=" d-flex align-items-center justify-content-center mb-2 mt-2" style={{ position: "absolute", right: 0, borderRadius: 10, width: "fit-content", padding: "3px 10px", backgroundColor: "#FFFFFF", boxShadow: "lightgray", border: "1px solid lightgray", display: window.innerWidth > 768 ? "block" : "none" }}>
            {isSidebarMaximized ? <span className="mb-0" style={{ fontSize: 11, color: "gray" }} ><IoIosArrowBack style={{ fontSize: 11, color: "gray", fontFamily: "sans-serif" }} />Hide</span> : <span className="mb-0" style={{ fontSize: 11, color: "gray" }} ><IoIosArrowForward style={{ fontSize: 11, color: "gray" }} />Show</span>}
          </div>
          <ul className="m-0 mt-5 p-0">
            <li className="p-2" onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none" }}><img src={Dashboard} height="15" className="menu-icon" alt='DashBoard' /><span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Dashboard</span></li>
            <li className="p-2" onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none" }}> <img src={PgList} height="15" className="menu-icon" alt='Pglist' /><span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>PG list</span> <span></span><img src={Menu} height="15" style={{ paddingLeft: "80px" }} alt='Menu' /></li>
            <li className="p-2" onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none" }}><img src={UserList} height="15" className="menu-icon" alt='userList' /> <span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User list</span></li>
          </ul>

          <ul className="m-0 mt-3 p-0">
            <li className="p-2" onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none" }}><img src={Invoice} height="15" className="menu-icon" alt='Invoice' /><span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Invoice</span></li>
            <li className="p-2" onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none" }}><img src={Compliance} height="15" className="menu-icon" alt='Compliance' /><span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Compliance</span></li>
            <li className="p-2" onClick={() => handlePageClick('payment')} style={{ listStyleType: "none" }}><img src={Payment} height="15" className="menu-icon" alt='Payment' /> <span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Payment gateway</span></li>
            <li className="p-2" onClick={() => handlePageClick('user-access')} style={{ listStyleType: "none" }}><img src={UserAccess} height="15" className="menu-icon" alt='userAccess' /> <span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User and access</span></li>
            <li className="p-2" onClick={() => handlePageClick('reports')} style={{ listStyleType: "none" }}><img src={Reports} height="15" className="menu-icon" alt='Report' /> <span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Reports</span></li>
          </ul>

          <ul className="m-0 mt-3 p-0">
            <li className="p-2" onClick={() => handlePageClick('settings')} style={{ listStyleType: "none" }}><img src={Settings} height="15" className="menu-icon" alt='Settings' /> <span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Settings</span></li>
            <li className="p-2" onClick={() => handlePageClick('support')} style={{ listStyleType: "none" }}><img src={Support} height="15" className="menu-icon" alt='Support' /> <span className="ms-3" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Support</span></li>

          </ul>



        </Col>
        <Col lg={isSidebarMaximized ? 10 : 11} md={isSidebarMaximized ? 10 : 11}
          sm={10} xs={10}
          className="bg-white vh-100">

          {activePage ?
            <>
              <h4 className="p-3">Dashboard</h4>
              <p className="ps-3">Hi,Rahul! Welcome to Business Dashboard</p>
              <hr />
              <div className="d-flex justify-content-between p-3">
                <div className="d-flex">
                  <Image src={Hostels} roundedCircle style={{ height: "30px", width: "30px" }} />
                  <div className="d-block ms-2">
                    <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray" }}>PG Detail</p>
                    <p style={{ fontSize: "11px", marginBottom: "0px", marginRight: "0px", fontWeight: "800" }}>Royal Grand Hostel</p>
                  </div>
                </div>
                <div>
                  <button type="button" className="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleShow}><img src={Plus} height="12" width="12" alt='Plus' /> Create PG</button>
                </div>

                <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "70vh" }}>
                  <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="p-3 m-0 d-flex align-items-center">Create PG</Offcanvas.Title>
                  <Offcanvas.Body>
                    <h6 style={{ color: "#0D6EFD" }}>PG Detail</h6>
                    <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
                    <div className="d-flex justify-content-center">
                      <p style={{ fontSize: "11px", fontWeight: "500" }}>Upload PG Photo</p>
                    </div>
                    <div className="d-flex justify-content-center" style={{ position: "relative" }}>
                      <Image src={Hostel} roundedCircle style={{ height: "50px", width: "50px" }} id="hostel-image" />
                      <Image src={CreateButton} style={{ height: "20px", width: "20px", position: "absolute", bottom: 0 }} id="plus-image" />
                    </div>
                    <form>
                      <div className="form-group mb-4">
                        <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>PG Name</label>
                        <input type="text"
                          value={pgList.Name}
                          onChange={(e) => { setPgList({ ...pgList, Name: e.target.value }) }}
                          className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter PG Name" style={{ fontSize: "11px" }} />
                      </div>
                      <div className="form-group mb-4">
                        <div className="row">
                          <div className="col">
                            <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Phone Number</label>
                            <input type="text"
                              maxLength={10}
                              value={pgList.phoneNumber}
                              onChange={(e) => { setPgList({ ...pgList, phoneNumber: e.target.value }) }}
                              className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter Phone Number" style={{ fontSize: "11px" }} />
                          </div>
                          <div className="col">
                            <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Email Id</label>
                            <input type="email"
                              value={pgList.email_Id}
                              onChange={(e) => { setPgList({ ...pgList, email_Id: e.target.value }) }}
                              className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter Email Id" style={{ fontSize: "11px" }} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-4">
                        <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>PG Location</label>
                        <input type="text"
                          value={pgList.location}
                          onChange={(e) => { setPgList({ ...pgList, location: e.target.value }) }}

                          className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter PG Location" style={{ fontSize: "11px" }} />
                      </div>


                      <div className="form-group mb-3">
                        <label htmlFor="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Number Of Floor</label>
                        <input
                          type="text"
                          value={pgList.number_Of_Floor}
                          onChange={(e) => setPgList({ ...pgList, number_Of_Floor: e.target.value })}
                          // onBlur={()=>{handlenumberOfFloor()}}
                          className="form-control custom-border-bottom p-0 mt-2"
                          id="exampleInput"
                          placeholder="Enter Number of Floors"
                          style={{ fontSize: "11px" }}
                        />
                      </div>


                      {pgList.number_Of_Floor && (
                        <div>
                          {Array.from({ length: parseInt(pgList.number_Of_Floor) }, (_, index) => {
                            const floorNumber = index + 1;
                            const numberOfRooms = parseInt(pgList[`number_Of_Rooms_${floorNumber}`]) || 0;
                            const floorLabel = floorNumber === 1 ? 'Ground' : `${floorNumber - 1}`;
                            console.log("pglist number ************", pgList.number_Of_Floor)
                            return (
                              <div key={index} className="form-group mb-3">
                                <label htmlFor="exampleInput" className="form-label mb-1" style={{ fontWeight: 700, fontSize: "11px" }}>
                                  {/* {`${pgList.number_Of_Floor === 1 ? 'Ground' : `${pgList.number_Of_Floor}`} Floor `} */}
                                  {`${floorLabel} Floor:`}
                                </label>
                                <CreatePG index={index} pgList={pgList} setPgList={setPgList}></CreatePG>
                                {/* <div className="row mb-2">
                                  <div className="col">
                                    <label className='mb-2' htmlFor={`totalRooms-${index}`} style={{ fontSize: "11px" }}>Number of Rooms</label>
                                    <input
                                      type="text"
                                      className="form-control custom-border-bottom p-0"
                                      id="exampleInput"
                                      placeholder="Enter here"
                                      style={{ fontSize: "11px" }}
                                      value={pgList.number_Of_Rooms}
                                      onChange={(e) => {
                                        setPgList({
                                          ...pgList,
                                          number_Of_Rooms:e.target.value
                                          // [`number_Of_Rooms_${floorNumber}`]: e.target.value,
                                        });
                                      }}
                                    />
                                  </div>
                                </div> */}

                                {/* {Array.from({ length: pgList.number_Of_Rooms }, (_, roomIndex) => (
                                  <div key={roomIndex} className="row">
                                    <div className="col">
                                      <label htmlFor={`roomName-${roomIndex}`} style={{ fontSize: "11px" }}>Room Name</label>
                                      <input
                                        type="text"
                                        className="form-control custom-border-bottom p-0"
                                        id="exampleInput"
                                        placeholder="Enter here"
                                        style={{ fontSize: "11px" }}
                                        value={roomDetails.roomNo}
                                        onChange={(e)=>{handleRoom(e)}}
                                        // onChange={(e)=>{setfloorDetails([...floorDetails.RoomDetails,{RoomNo:e.target.value}])}}
                                        // onChange={(e)=>{setPgList({...pgList,floorDetails:[...pgList.floorDetails,{roomNo:e.target.value}]})}}
                                      />
                                    </div>

                                    <div className="col">
                                      <label htmlFor={`beds-${roomIndex}`} style={{ fontSize: "11px" }}>Number of Beds</label>
                                      <input
                                        type="text"
                                        className="form-control custom-border-bottom p-0 mt-2"
                                        id="exampleInput"
                                        placeholder="Enter here"
                                        style={{ fontSize: "11px" }}
                                        value={roomDetails.numberOfBed}
                                        onChange={(e)=>{handleUpdateBed(e)}}
                                        // onChange={(e)=>{setfloorDetails([...floorDetails.RoomDetails,{NumberOfBeds:e.target.value}])}}
                                        // onChange={(e)=>{setPgList({...pgList,floorDetails:[...pgList.floorDetails,{number_Of_Bed:e.target.value}]})}}
                                      />
                                    </div>
                                  </div>
                                ))} */}
                              </div>
                            );
                          })}
                        </div>
                      )}



                      <hr style={{ marginTop: "50px" }} />
                      <div className="d-flex justify-content-end" style={{ marginTop: "15px" }} >

                        <Button variant="white" size="sm" style={{ width: "90px" }} onClick={handleCancels}>
                          Cancel
                        </Button>
                        <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} onClick={handleSubmitPgList}>
                          Save
                        </Button>

                      </div>
                    </form>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
              <hr />
              <div className="container">
                <div style={{ flex: 1 }} className="d-flex justify-content-center content">
                  <img src={Welcome} className="pt-5" height="100" width="50" alt='Welcome' />
                </div>
                <div style={{ flex: 1 }} className="d-flex justify-content-center content pt-2">
                  <h3>World's fastest growing hotel chain.</h3>
                </div>
                <div style={{ flex: 1 }} className="d-flex justify-content-center content pt-2">
                  <p>We need a few basic details to consider your hostel</p>
                </div>
                <div style={{ flex: 1 }} className="d-flex justify-content-center content pt-3" >
                  <button type="button" className="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleShow}><img src={Plus} height="12" width="12" alt='Plus' /> Create PG</button>
                </div>
              </div>
            </>
            :
            ""
          }
          {currentPage === 'dashboard' && <Dashboards />}
          {currentPage === 'pg-list' && < PgLists />}
          {currentPage === 'user-list' && < UserLists />}
          {currentPage === 'invoice' && < Invoices />}
          {currentPage === 'compliance' && < Compliances />}
          {currentPage === 'payment' && < Payments />}
          {currentPage === 'user-access' && < UserAccesss />}
          {currentPage === 'reports' && < Report />}
          {currentPage === 'settings' && < Setting />}
          {currentPage === 'support' && < Supports />}
        </Col>
      </Row>
    </Container>
  );
}

export default Sidebar;

