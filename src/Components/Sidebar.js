import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../Components/Sidebar.css'
import Dashboards from '../Pages/Dashboard';
import PgLists from '../Pages/PgList';
import UserLists from '../Pages/UserList';
import EbHostel from '../Pages/EB_Hostel';
import Checkout from '../Pages/Checkout';
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
import Dashboard from '../Assets/Images/Side Menu/Dashboard.png'
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
import { CiViewList } from "react-icons/ci";
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
import CryptoJS from "crypto-js";
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { BsClipboard2Check } from "react-icons/bs";
import SmartLogo from '../Assets/Images/hostel.png'
import Cookies from 'universal-cookie';



function Sidebar() {

  let navigate = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector(state => state.UsersList)
  const stateData = useSelector(state => state.createAccount)
  const stateLogin = useSelector(state => state.login)


  console.log("state for side bar",stateData)

  const token = stateLogin.JWTtoken
  console.log("stateLogin.JWTtoken", token)
  const cookies = new Cookies()
  cookies.set('token', token, { path: '/' });
  const tokenCookies = cookies.get('token');
  console.log("tokenCookies", tokenCookies)


  // useEffect(() => {
  //   if(tokenCookies){
  //     dispatch({ type: 'ACCOUNTDETAILS', payload: { user_details: tokenCookies } })
  //     console.log("executed account details")
  //   }
  //    }, [])



  let LoginId = localStorage.getItem("loginId")
  let checkedValue = localStorage.getItem("checked")


  const loginId = localStorage.getItem('loginId');


  useEffect(() => {
    if (loginId) {
      try {
        const decryptedId = CryptoJS.AES.decrypt(loginId, 'abcd');
        const decryptedIdString = decryptedId.toString(CryptoJS.enc.Utf8);
        const parsedData = Number(decryptedIdString);

        dispatch({ type: 'HOSTELLIST' })

      } catch (error) {
      }
    }
  }, []);




useEffect(()=>{
if(stateData.statusCodeForAccountList == 200){

  const loginInfo = stateData.accountList[0].user_details
       
  console.log("loginInfo",loginInfo)
  if (loginInfo) {
      const LoginId = loginInfo.id;
      const NameId = loginInfo.Name;
      const phoneId = loginInfo.mobileNo;
      const emilidd = loginInfo.email_Id;
      const Is_Enable = loginInfo.isEnable;
      const Pass_word = loginInfo.password;

      const encryptedLoginId = CryptoJS.AES.encrypt(LoginId.toString(), 'abcd').toString();
      const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
      const encryptedphone = CryptoJS.AES.encrypt(phoneId.toString(), 'abcd').toString();
      const encryptedemail = CryptoJS.AES.encrypt(emilidd.toString(), 'abcd').toString();
      const encryptIsEnable = CryptoJS.AES.encrypt(Is_Enable.toString(), 'abcd').toString();
      const encryptPassword = CryptoJS.AES.encrypt(Pass_word.toString(), 'abcd').toString();

      localStorage.setItem("loginId", encryptedLoginId);
      localStorage.setItem("NameId", encryptedname);
      localStorage.setItem("phoneId", encryptedphone);
      localStorage.setItem("emilidd", encryptedemail);
      localStorage.setItem("IsEnable", encryptIsEnable);
      localStorage.setItem("Password", encryptPassword);
    

      } else {
console.log("No data found")
  }
  setTimeout(()=>{
    dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE'})
    },100)
  }

},[stateData.statusCodeForAccountList])


  //  command but we need


  // useEffect(() => {

  //   console.log("executed")
  //   const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
  //   const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
  //   const parsedData = decryptedString;


  //   const IsEnableCheckState = stateData.accountList && stateData.accountList.filter((view => view.id == parsedData))

  //   console.log("IsEnableCheckState", IsEnableCheckState)

  //   const is_Enable = IsEnableCheckState[0]?.isEnable

  //   console.log("is_Enable sidebar", is_Enable)

  //   if (is_Enable == 1) {
  //     const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd');
  //     console.log("encryptData", encryptData.toString());
  //     localStorage.setItem("login", encryptData.toString());
  //   } else {
  //     const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd');
  //     console.log("encryptData", encryptData.toString());
  //     localStorage.setItem("login", encryptData.toString());

  //   }


  // }, [stateData.accountList, LoginId])









  // const [filterhostellist, setFilterhostellist] = useState([]);
  // const [loginCustomerid, setLoginCustomerId] = useState('')
  const [profiles, setProfiles] = useState('')
  const [profileArray, setProfileArray] = useState('')



  useEffect(() => {
    if (LoginId && stateData.accountList) {
      try {


        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = decryptedString;

        // const filteredList = state.UsersList?.hostelList?.filter((view) => {
        // console.log("parsedData",parsedData);
        // console.log("created_By",view.created_By);
        // console.log("view.created_By == parsedData",view.created_By == parsedData);
        //   return view.created_By == parsedData;


        // });
        // console.log("topbar_filteredlist", filteredList);
        // setFilterhostellist(filteredList)


        const FilteredProfile = stateData.accountList[0].user_details
       
          const profilePictures = FilteredProfile.profile;
          const profileName = FilteredProfile.Name;
          setProfiles(profilePictures);
          setProfileArray(profileName);
              }

      catch (error) {
        console.log("Error decrypting loginid", error);
      }

    }

  }, [stateData.accountList, state.hostelList, LoginId, stateData.statusCodeForAccount])

  const [selectedHostel, setSelectedHostel] = useState(null);

  const handleHostelSelect = (hostelName) => {
    const selected = state.hostelList.find((item) => {
      return item.Name === hostelName
    });
    setSelectedHostel(selected);

  };



  const [activePage, setActivePage] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const [pgList, setPgList] = useState({
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    number_Of_Floor: '',
    number_Of_Rooms: '',
    floorDetails: []
  })
 


  const handlePageClick = (page) => {
    setCurrentPage(page);
    setActivePage(false);
  };





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


  const handleLogout = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want LogOut?',
      confirmButtonText: 'Ok',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'LOG_OUT' })
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd')
        localStorage.setItem("login", encryptData.toString())
        // localStorage.setItem("loginId", '')
        localStorage.setItem("NameId", '')
        localStorage.setItem("phoneId", '')
        localStorage.setItem("emilidd", '')
      }
    })
  }






  return (
    <>

      <Navbar bg="light" expand="lg" style={{ backgroundColor: "#FFFFFF", padding: "0px 0px", boxShadow: "1px 1px 2px lightgray" }} >
        <Container fluid style={{ backgroundColor: "#FFFFFF", padding: "0px" }}>
          <div class="d-flex justify-content-start" style={{ marginLeft: "0px" }} >
            <Navbar.Brand href="#" style={{ padding: "5px 8px", backgroundColor: "#2E75EA", height: "100%", width: "auto" }}><img class="img-fluid" src={Smart} style={{ height: "30px", width: "30px" }} alt='Smart' /></Navbar.Brand>
          </div>


          <div style={{ display: 'flex', alignItems: "center", width: '20%', marginLeft: '0px', backgroundColor: "", gap: 5 }}>
            <div >
              {selectedHostel && selectedHostel.profile !== null ? (
                <Image src={selectedHostel.profile} roundedCircle style={{ height: 25, width: 25, borderRadius: '50%' }} />
              ) : (
                <Image src={SmartLogo} alt="Default Logo" style={{ height: 25, width: 25, borderRadius: '50%' }} />
              )}
            </div>


            <div style={{ alignItems: "center", display: "block", width: "100%" }}>
              <div style={{ paddingLeft: 7, paddingTop: 2, paddingBottom: 0 }}>
                <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray" }}>PG Detail</p>
              </div>


              <select onChange={(e) => handleHostelSelect(e.target.value)} class="form-select ps-2" aria-label="Default select example" style={{ padding: 7, border: "none", boxShadow: "none", width: "100%", fontSize: 9, fontWeight: 700, textTransform: "capitalize", borderRadius: "none" }}>
                <option disabled selected className='p-3' style={{ fontSize: 15, textTransform: "capitalize" }}>Select Hostel</option>
                {state.hostelList.length > 0 && state.hostelList.map((obj) => {
                  return (<>
                    <option style={{ fontSize: 15, textTransform: "capitalize" }}>{obj.Name}</option>
                  </>)
                })}

              </select>
            </div>
          </div>


          <div style={{ borderLeft: "1px solid #cccccc99", height: "30px" }} className="vertical-line ms-2"></div>


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
                <img src={Logout} class="me-3" style={{ height: "25px", width: "25px" }} onClick={handleLogout} alt='Logout' />
                <img src={Notification} class="me-3" style={{ height: "25px", width: "25px" }} alt='Notification' />
                <img src={Settings} class="me-3" style={{ height: "25px", width: "25px" }} alt='Settings' onClick={() => handlePageClick('settings')} />
              </div>
              <Image src={profiles == null ? Men : profiles} roundedCircle style={{ height: "30px", width: "30px" }} />
              <div class="d-block ms-2">
                <p style={{ fontSize: "12px", marginBottom: "0px", fontWeight: "800" }}>{profileArray}</p>
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

              <li className={`p-2 align-items-center list-Item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}>
                <div className='d-flex  align-items-center justify-content-between'>
                  <RiDashboard3Line style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} />
                  <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Dashboard</span>
                </div>
              </li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'pg-list' ? 'active' : ''}`} onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none", position: "", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}>
                <div className='d-flex  align-items-center justify-content-between'>
                  <FaBuilding style={{ fontSize: isSidebarMaximized ? '16px' : '13px' }} />
                  <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>PG list</span>
                  <FaCirclePlus style={{ fontSize: isSidebarMaximized ? '16px' : '13px', marginLeft: isSidebarMaximized ? 15 : 5, display: "inline-block" }} alt='Menu' />
                </div>
              </li>

              <li className={`p-2 align-items-center list-Item ${currentPage === 'user-list' ? 'active' : ''}`} onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><LuUserCog style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User list</span></li>
            </ul>

            <ul className="m-0 mt-3 p-0">
              <li className={`p-2 align-items-center list-Item ${currentPage === 'invoice' ? 'active' : ''}`} onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><GrCompliance style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Invoice</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'compliance' ? 'active' : ''}`} onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><TbFileInvoice style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Compliance</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'payment' ? 'active' : ''}`} onClick={() => handlePageClick('payment')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><MdPayment style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Payment gateway</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'user-access' ? 'active' : ''}`} onClick={() => handlePageClick('user-access')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><FaUsersRectangle style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>User and access</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'eb' ? 'active' : ''}`} onClick={() => handlePageClick('eb')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><CiViewList style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>EB</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'checkout' ? 'active' : ''}`} onClick={() => handlePageClick('checkout')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><BsClipboard2Check style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Checkout</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'reports' ? 'active' : ''}`} onClick={() => handlePageClick('reports')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><BiBarChartAlt style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Reports</span></li>
            </ul>

            <ul className="m-0 mt-3 p-0">
              <li className={`p-2 align-items-center list-Item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => handlePageClick('settings')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><IoSettingsOutline style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /> <span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Settings</span></li>
              <li className={`p-2 align-items-center list-Item ${currentPage === 'support' ? 'active' : ''}`} onClick={() => handlePageClick('support')} style={{ listStyleType: "none", display: "flex", justifyContent: isSidebarMaximized ? "start" : "center" }}><FaCircleExclamation style={{ fontSize: isSidebarMaximized ? '16px' : '15px' }} /><span className="ms-3 Title" style={{ fontSize: "13px", fontWeight: "600", display: isSidebarMaximized ? "inline-block" : "none" }}>Support</span></li>

            </ul>



          </Col>
          <Col lg={isSidebarMaximized ? 10 : 11} md={isSidebarMaximized ? 10 : 11} sm={isSidebarMaximized ? 10 : 11} xs={isSidebarMaximized ? 10 : 11} className="bg-white">

            {/* {activePage ?
              <>
                <h4 className="p-3">Dashboard</h4>
                <p className="ps-3">Hi,Rahul! Welcome to Business Dashboard</p>
              </>
              :
              ""
            } */}
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
            {currentPage === 'eb' && <  EbHostel />}
            {currentPage === 'checkout' && <Checkout />}


          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sidebar;