import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/Sidebar.css'
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
import Offcanvas from 'react-bootstrap/Offcanvas';
import Hostel from '../Assets/Images/hostel.png';
import CreateButton from '../Assets/Images/Create-button.png';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RiDashboard3Line } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { LuUserCog } from "react-icons/lu";
import { TbFileInvoice } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { FaUsersRectangle } from "react-icons/fa6";
import { BiBarChartAlt } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Smart from "../Assets/Images/Logo-Icon-White.png";
import Notification from '../Assets/Images/Notification.png';
import Settings from '../Assets/Images/Settings.png';
import Men from '../Assets/Images/men.jpg';
import Logout from '../Assets/Images/turn-off.png';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";


import CreatePG from './CreatePG';

function Sidebar() {
  
  let navigate = useNavigate();

  const login = localStorage.getItem("login")
  const [activePage, setActivePage] = useState(true);

  // const [collapsed, setCollapsed] = useState(true);
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      let tempArry = [];
      for (let i = 0; i < pgList.number_Of_Floor; i++) {
        var a = {}
        tempArry.push(a)
      }
      setPgList({ ...pgList, floorDetails: tempArry })
    }, 1000);
    return () => clearTimeout(timeout)
  }, [pgList.number_Of_Floor])

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
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pgList.number_Of_Rooms]);

  const handleFloorList = (index, roomlist) => {
    var tempArray = pgList.floorDetails
    tempArray[index] = roomlist
    setPgList({ ...pgList, floorDetails: tempArray })
  }
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setActivePage(false);
    // setCollapsed(true);
  };


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancels = () => {
    handleClose();
  };

  const handleSubmitPgList = () => {
    if (pgList.Name && pgList.phoneNumber) {
      const floorDetailsArray = Array.from({ length: parseInt(pgList.number_Of_Floor) }, (_, index) => {
        const floorNumber = index + 1;
        const numberOfRooms = parseInt(pgList[`number_Of_Rooms_${floorNumber}`]) || 0;

        return {
          floor: floorNumber,
          roomDetails: Array.from({ length: numberOfRooms }, (_, roomIndex) => {
            return {
              number_Of_Rooms: pgList[`number_Of_Rooms_${floorNumber}_${roomIndex}`] || 0,
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
          number_Of_Rooms: pgList.number_Of_Rooms,
          floorDetails: pgList.floorDetails,
          created_by: state.login.id
        }
      });
    }


    setPgList({
      Name: '',
      phoneNumber: '',
      email_Id: '',
      location: '',
      number_Of_Floor: '',
      number_Of_Rooms: '',
      floorDetails: []
    });
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

const handleLogout = () =>{
  Swal.fire({
    icon: 'warning',
    title: 'Do you want LogOut?',
    confirmButtonText: 'Ok',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("login",false)
      navigate('/login-Page')
      console.log("login",login);

    }
  })
}

  return (
<>

<Navbar bg="light" expand="lg" style={{ backgroundColor: "#FFFFFF", padding: "0px 0px", boxShadow: "1px 1px 2px lightgray" }} >
      <Container fluid style={{ backgroundColor: "#FFFFFF", padding: "0px" }}>
        <div class="d-flex justify-content-start" style={{ marginLeft: "0px" }} >
          <Navbar.Brand href="#"  style={{ padding:"5px 8px",backgroundColor: "#2E75EA", height: "100%", width:"auto" }}><img class="img-fluid" src={Smart} style={{ height: "30px", width: "30px" }} alt='Smart'/></Navbar.Brand>
        </div>


        <Image  roundedCircle class="ms-1"  src={Hostel}  style={{ borderRadius:"50px",height: "30px", width: "30px" }}/>
        <div class="d-block ms-2">
          <p style={{ fontSize: "10px", marginBottom: "0px",color: "gray" }}>PG Detail</p>
          <p style={{ fontSize: "11px", marginBottom: "0px", marginRight: "0px", fontWeight: "800" }}>Royal Grand Hostel</p>
        </div>
        <Form.Select class="me-5" aria-label="Default select example" style={{ border: "none", height: "10px", width: "40px" }} >
        <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
        </Form.Select>
              <div style={{borderLeft:"1px solid #cccccc99",height:"30px"}} className="vertical-line"></div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div style={{ margin: "0px auto" }}>
            <Nav className="my-2 my-lg-0 " style={{ maxHeight: '100px' }} navbarScroll >
              <Nav.Link href="#action1" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }} onClick={() => handlePageClick('dashboard')}>Dashboard</Nav.Link>
              <Nav.Link href="#action2" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }} onClick={() => handlePageClick('invoice')}>Invoice</Nav.Link>
              <Nav.Link href="#action1" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }} onClick={() => handlePageClick('compliance')}>Compliances</Nav.Link>
              <Nav.Link href="#action2" style={{ color: "gray", fontSize: "14px", fontWeight: "600" }} onClick={() => handlePageClick('reports')}>Reports</Nav.Link>
            </Nav>
          </div>
          <Form className="d-flex">
            <div class="justify-content-evenly">
              <img src={Logout} class="me-3" style={{ height: "25px", width: "25px" }} onClick={handleLogout} alt='Logout'/>
              <img src={Notification} class="me-3" style={{ height: "25px", width: "25px" }} alt='Notification'/>
              <img src={Settings} class="me-3" style={{ height: "25px", width: "25px" }} alt='Settings'/>
            </div>
            <Image src={Men} roundedCircle style={{ height: "30px", width: "30px" }} />
        <div class="d-block ms-2">
          <p style={{ fontSize: "12px", marginBottom: "0px",fontWeight: "800" }}>Rahul Sharma</p>
          <p style={{ fontSize: "10px", marginBottom: "0px", marginRight: "0px", color: "gray" }}>Edit profile</p>
        </div>
       
          </Form>
          <Form.Select class="me-5 pt-3" aria-label="Default select example" style={{ border: "none", height: "10px", width: "40px" }} >
          <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
         </Form.Select>

        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container fluid className='p-0'>

      <Row className='g-0 m-0 vh-100'>
        <Col lg={isSidebarMaximized ? 2 : 1} md={isSidebarMaximized ? 2 : 1} sm={isSidebarMaximized ? 2 : 1} xs={isSidebarMaximized ? 2 : 1} className="d-sm-block bg-light" style={{ cursor: "pointer" }} >
          <div className="d-flex align-items-center m-3" style={{ justifyContent: isSidebarMaximized ? "end" : "center" }}>
            <div onClick={toggleSidebar} className="d-flex align-items-center justify-content-center  toggleButton" style={{ borderRadius: 10, width: "auto", padding: 5, backgroundColor: "#FFFFFF", boxShadow: "lightgray", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
              {isSidebarMaximized ? <label className="mb-0" style={{ fontSize: 11, color: "gray" }}><IoIosArrowBack style={{ fontSize: 11, color: "gray", fontFamily: "sans-serif" }} />Hide</label> : <label className="mb-0" style={{ fontSize: 11, color: "gray" }}><IoIosArrowForward style={{ fontSize: 11, color: "gray" }} />Show</label>}
            </div>
          </div>
          <ul className="m-0 mt-3 p-0">

            <li className="p-2 align-items-center list-Item" onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}>
              <div className='d-flex  align-items-center justify-content-between'>
                <RiDashboard3Line style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} />
                <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Dashboard</span>
              </div>
            </li>
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none", position: "", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}>
              <div className='d-flex  align-items-center justify-content-between'>
                <FaBuilding style={{ fontSize: isSidebarMaximized ? '16px' : '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>PG list</span>
                <FaCirclePlus style={{ fontSize: isSidebarMaximized ? '16px' : '13px', marginLeft: isSidebarMaximized ? 15 : 5, display: "inline-block" }} alt='Menu' />
              </div>
            </li>

            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><LuUserCog style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User list</span></li>
          </ul>

          <ul className="m-0 mt-3 p-0">
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><GrCompliance style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Invoice</span></li>
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><TbFileInvoice style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Compliance</span></li>
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('payment')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><MdPayment style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Payment gateway</span></li>
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('user-access')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><FaUsersRectangle style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User and access</span></li>
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('reports')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><BiBarChartAlt style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Reports</span></li>
          </ul>

          <ul className="m-0 mt-3 p-0">
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('settings')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><IoSettingsOutline style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Settings</span></li>
            <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('support')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><FaCircleExclamation style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Support</span></li>

          </ul>



        </Col>
        <Col lg={isSidebarMaximized ? 10 : 11} md={isSidebarMaximized ? 10 : 11} sm={isSidebarMaximized ? 10 : 11} xs={isSidebarMaximized ? 10 : 11} className="bg-white">

          {activePage ?
            <>
              <h4 className="p-3">Dashboard</h4>
              <p className="ps-3">Hi,Rahul! Welcome to Business Dashboard</p>
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
    </>
  );
}

export default Sidebar;


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import '../Components/Sidebar.css'
// import Dashboards from '../Pages/Dashboard';
// import PgLists from '../Pages/PgList';
// import UserLists from '../Pages/UserList';
// import Invoices from '../Pages/Invoice';
// import Compliances from '../Pages/Compliance';
// import Payments from '../Pages/Payment';
// import UserAccesss from '../Pages/UserAccess';
// import Report from '../Pages/Reports';
// import Setting from '../Pages/Settings';
// import Supports from '../Pages/Support';
// import Hostels from '../Assets/Images/hostel.png';
// import Plus from '../Assets/Images/Create-button.png';
// import Welcome from '../Assets/Images/dashboard-welcome.png';
// import Image from 'react-bootstrap/Image';
// import Offcanvas from 'react-bootstrap/Offcanvas';
// import Hostel from '../Assets/Images/hostel.png';
// import CreateButton from '../Assets/Images/Create-button.png';
// import Button from 'react-bootstrap/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoIosArrowBack } from "react-icons/io";
// import { IoIosArrowForward } from "react-icons/io";
// import { RiDashboard3Line } from "react-icons/ri";
// import { FaBuilding } from "react-icons/fa";
// import { LuUserCog } from "react-icons/lu";
// import { TbFileInvoice } from "react-icons/tb";
// import { GrCompliance } from "react-icons/gr";
// import { MdPayment } from "react-icons/md";
// import { FaUsersRectangle } from "react-icons/fa6";
// import { BiBarChartAlt } from "react-icons/bi";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FaCircleExclamation } from "react-icons/fa6";
// import { FaCirclePlus } from "react-icons/fa6";

// import CreatePG from './CreatePG';

// function Sidebar() {

//   const [activePage, setActivePage] = useState(true);

//   // const [collapsed, setCollapsed] = useState(true);
//   const [currentPage, setCurrentPage] = useState('');

//   const [pgList, setPgList] = useState({
//     Name: '',
//     phoneNumber: '',
//     email_Id: '',
//     location: '',
//     number_Of_Floor: '',
//     number_Of_Rooms: '',
//     floorDetails: []
//   })
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       let tempArry = [];
//       for (let i = 0; i < pgList.number_Of_Floor; i++) {
//         var a = {}
//         tempArry.push(a)
//       }
//       setPgList({ ...pgList, floorDetails: tempArry })
//     }, 1000);
//     return () => clearTimeout(timeout)
//   }, [pgList.number_Of_Floor])

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       let tempArray = [];
//       for (let i = 0; i < pgList.number_Of_Rooms; i++) {
//         let newRoom = {
//           roomNumber: i + 1,
//           number_Of_Bed: ''
//         };
//         tempArray.push(newRoom);
//       }

//       setPgList((prevPgList) => ({
//         ...prevPgList,
//         floorDetails: [tempArray],
//       }));
//     }, 1000);
//     return () => clearTimeout(timeout);
//   }, [pgList.number_Of_Rooms]);

//   const handleFloorList = (index, roomlist) => {
//     var tempArray = pgList.floorDetails
//     tempArray[index] = roomlist
//     setPgList({ ...pgList, floorDetails: tempArray })
//   }
//   const dispatch = useDispatch()
//   const state = useSelector(state => state)

//   const handlePageClick = (page) => {
//     setCurrentPage(page);
//     setActivePage(false);
//     // setCollapsed(true);
//   };


//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleCancels = () => {
//     handleClose();
//   };

//   const handleSubmitPgList = () => {
//     if (pgList.Name && pgList.phoneNumber) {
//       const floorDetailsArray = Array.from({ length: parseInt(pgList.number_Of_Floor) }, (_, index) => {
//         const floorNumber = index + 1;
//         const numberOfRooms = parseInt(pgList[`number_Of_Rooms_${floorNumber}`]) || 0;

//         return {
//           floor: floorNumber,
//           roomDetails: Array.from({ length: numberOfRooms }, (_, roomIndex) => {
//             return {
//               number_Of_Rooms: pgList[`number_Of_Rooms_${floorNumber}_${roomIndex}`] || 0,
//               number_Of_Bed: pgList[`number_Of_Bed_${floorNumber}_${roomIndex}`] || "",
//             };
//           }),
//         };
//       });

//       dispatch({
//         type: 'PGLIST',
//         payload: {
//           name: pgList.Name,
//           phoneNo: pgList.phoneNumber,
//           email_Id: pgList.email_Id,
//           location: pgList.location,
//           number_of_floors: pgList.number_Of_Floor,
//           number_Of_Rooms: pgList.number_Of_Rooms,
//           floorDetails: pgList.floorDetails,
//           created_by: state.login.id
//         }
//       });
//     }


//     setPgList({
//       Name: '',
//       phoneNumber: '',
//       email_Id: '',
//       location: '',
//       number_Of_Floor: '',
//       number_Of_Rooms: '',
//       floorDetails: []
//     });


//     handleClose();
//   }


//   const [isSidebarMaximized, setIsSidebarMaximized] = useState(true);
//   const toggleSidebar = () => {
//     setIsSidebarMaximized(!isSidebarMaximized);
//   };


//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <Container fluid className='p-0'>

//       <Row className='g-0 m-0 vh-100'>
//         <Col lg={isSidebarMaximized ? 2 : 1} md={isSidebarMaximized ? 2 : 1} sm={isSidebarMaximized ? 2 : 1} xs={isSidebarMaximized ? 2 : 1} className="d-sm-block bg-light" style={{ cursor: "pointer" }} >
//           <div className="d-flex align-items-center m-3" style={{ justifyContent: isSidebarMaximized ? "end" : "center" }}>
//             <div onClick={toggleSidebar} className="d-flex align-items-center justify-content-center  toggleButton" style={{ borderRadius: 10, width: "auto", padding: 5, backgroundColor: "#FFFFFF", boxShadow: "lightgray", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
//               {isSidebarMaximized ? <label className="mb-0" style={{ fontSize: 11, color: "gray" }}><IoIosArrowBack style={{ fontSize: 11, color: "gray", fontFamily: "sans-serif" }} />Hide</label> : <label className="mb-0" style={{ fontSize: 11, color: "gray" }}><IoIosArrowForward style={{ fontSize: 11, color: "gray" }} />Show</label>}
//             </div>
//           </div>
//           <ul className="m-0 mt-3 p-0">

//             <li className="p-2 align-items-center list-Item" onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}>
//               <div className='d-flex  align-items-center justify-content-between'>
//                 <RiDashboard3Line style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} />
//                 <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Dashboard</span>
//               </div>
//             </li>
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none", position: "", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}>
//               <div className='d-flex  align-items-center justify-content-between'>
//                 <FaBuilding style={{ fontSize: isSidebarMaximized ? '16px' : '13px' }} />
//                 <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>PG list</span>
//                 <FaCirclePlus style={{ fontSize: isSidebarMaximized ? '16px' : '13px', marginLeft: isSidebarMaximized ? 15 : 5, display: "inline-block" }} alt='Menu' />
//               </div>
//             </li>

//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><LuUserCog style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User list</span></li>
//           </ul>

//           <ul className="m-0 mt-3 p-0">
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><GrCompliance style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Invoice</span></li>
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><TbFileInvoice style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Compliance</span></li>
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('payment')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><MdPayment style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Payment gateway</span></li>
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('user-access')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><FaUsersRectangle style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User and access</span></li>
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('reports')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><BiBarChartAlt style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Reports</span></li>
//           </ul>

//           <ul className="m-0 mt-3 p-0">
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('settings')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><IoSettingsOutline style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Settings</span></li>
//             <li className="p-2  align-items-center list-Item" onClick={() => handlePageClick('support')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><FaCircleExclamation style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Support</span></li>

//           </ul>



//         </Col>
//         <Col lg={isSidebarMaximized ? 10 : 11} md={isSidebarMaximized ? 10 : 11} sm={isSidebarMaximized ? 10 : 11} xs={isSidebarMaximized ? 10 : 11} className="bg-white">

//           {activePage ?
//             <>
//               <h4 className="p-3">Dashboard</h4>
//               <p className="ps-3">Hi,Rahul! Welcome to Business Dashboard</p>
//             </>
//             :
//             ""
//           }
//           {currentPage === 'dashboard' && <Dashboards />}
//           {currentPage === 'pg-list' && < PgLists />}
//           {currentPage === 'user-list' && < UserLists />}
//           {currentPage === 'invoice' && < Invoices />}
//           {currentPage === 'compliance' && < Compliances />}
//           {currentPage === 'payment' && < Payments />}
//           {currentPage === 'user-access' && < UserAccesss />}
//           {currentPage === 'reports' && < Report />}
//           {currentPage === 'settings' && < Setting />}
//           {currentPage === 'support' && < Supports />}
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Sidebar;