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
import VendorComponent from '../Pages/Vendor';
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
import Smartstay from '../Assets/Images/GroupsmartIcon.png';
import Smarts from '../Assets/Images/Smartstaysm1.png';
import Dash from '../Assets/Images/New_images/category.png';
import Paying from '../Assets/Images/New_images/house.png';
import Custom from '../Assets/Images/New_images/customers.png';
import Vendor from '../Assets/Images/New_images/vendor.png';
import Invo from '../Assets/Images/New_images/invoice.png';
import Asset from '../Assets/Images/New_images/Asset.png';
import Eb from '../Assets/Images/New_images/electricity.png';
import Compl from '../Assets/Images/New_images/messages-3.png';
import Expense from '../Assets/Images/New_images/expenses.png';
import Repo from '../Assets/Images/New_images/reports.png';
import Sett from '../Assets/Images/New_images/settings.png';
import Assets from '../Pages/Asset'
import Expenses from '../Pages/Expense'
import Dash2 from '../Assets/Images/New_images/category-active.png';
import Paying2 from '../Assets/Images/New_images/housepay.png';
import Custom2 from '../Assets/Images/New_images/profile-2user.png';
import Invoice2 from '../Assets/Images/New_images/clipboard-text.png';
import Vendor2 from '../Assets/Images/New_images/shop.png'
import Asset2 from '../Assets/Images/New_images/Money.png';
import Eb2 from '../Assets/Images/New_images/ele-active.png';
import Compl2 from '../Assets/Images/New_images/messages-active.png';
import Expense2 from '../Assets/Images/New_images/coin.png';
import Repo2 from '../Assets/Images/New_images/clipboard-text.png';
import Sett2 from '../Assets/Images/New_images/setting-2.png';


function Sidebar() {
  const cookies = new Cookies()
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector(state => state.UsersList)
  const stateData = useSelector(state => state.createAccount)
  const stateLogin = useSelector(state => state.login)


  console.log("state for side bar", stateData)




  let LoginId = localStorage.getItem("loginId")
  let checkedValue = localStorage.getItem("checked")


  const loginId = localStorage.getItem('loginId');


  useEffect(() => {
    dispatch({ type: 'HOSTELLIST' })
    dispatch({ type: 'ACCOUNTDETAILS' })
  }, []);




  useEffect(() => {
    if (stateData.statusCodeForAccountList == 200) {

      const loginInfo = stateData.accountList[0].user_details

      console.log("loginInfo", loginInfo)
      if (loginInfo) {
        const LoginId = loginInfo.id;
        const NameId = loginInfo.Name;
        const phoneId = loginInfo.mobileNo;
        const emilidd = loginInfo.email_Id;
        const Is_Enable = loginInfo.isEnable;
        const Pass_word = loginInfo.password;

        const encryptedLoginId = CryptoJS.AES.encrypt(LoginId.toString(), 'abcd').toString();
        // const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
        const encryptedphone = CryptoJS.AES.encrypt(phoneId.toString(), 'abcd').toString();
        const encryptedemail = CryptoJS.AES.encrypt(emilidd.toString(), 'abcd').toString();
        const encryptIsEnable = CryptoJS.AES.encrypt(Is_Enable.toString(), 'abcd').toString();
        const encryptPassword = CryptoJS.AES.encrypt(Pass_word.toString(), 'abcd').toString();

        localStorage.setItem("loginId", encryptedLoginId);
        // localStorage.setItem("NameId", encryptedname);
        localStorage.setItem("phoneId", encryptedphone);
        localStorage.setItem("emilidd", encryptedemail);
        localStorage.setItem("IsEnable", encryptIsEnable);
        localStorage.setItem("Password", encryptPassword);

        console.log("Is_Enable *****", Is_Enable)

        if (Is_Enable == 0) {
          const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd');
          localStorage.setItem("login", encryptData.toString());
        } else {
          const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd');
          localStorage.setItem("login", encryptData.toString());
        }
      } else {
        console.log("No data found")
      }
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
      }, 100)
    }

  }, [stateData.statusCodeForAccountList])


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
    if (stateData.accountList.length > 0) {
      try {


        // const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        // const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        // const parsedData = decryptedString;

        // const filteredList = state.UsersList?.hostelList?.filter((view) => {
        // console.log("parsedData",parsedData);
        // console.log("created_By",view.created_By);
        // console.log("view.created_By == parsedData",view.created_By == parsedData);
        //   return view.created_By == parsedData;


        // });
        // console.log("topbar_filteredlist", filteredList);
        // setFilterhostellist(filteredList)


        const FilteredProfile = stateData.accountList[0]?.user_details

        const profilePictures = FilteredProfile.profile;
        const profileName = FilteredProfile.Name;
        setProfiles(profilePictures);
        setProfileArray(profileName);
      }

      catch (error) {
        console.log("Error decrypting loginid", error);
      }

    }

  }, [stateData.accountList, state.hostelList, stateData.statusCodeForAccount])

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
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
        localStorage.setItem("loginId", '')
        localStorage.setItem("NameId", '')
        localStorage.setItem("phoneId", '')
        localStorage.setItem("emilidd", '')
      }
    })
  }



  return (
    <>



      <Container fluid className='p-0'>

        <Row className='g-0 m-0 vh-100'  >
          <Col lg={2} md={2} sm={2} xs={2} className="d-sm-block " style={{ cursor: "pointer", backgroundColor: '#E0ECFF', position: "fixed" }} >
            <div className="d-flex align-items-center m-3 gap-1 justify-content-center">

              <img src={Smartstay} style={{ fontSize: '15px' }} />
              <img src={Smarts} className='Title' style={{ fontSize: '15px' }} />
            </div>

            <ul className="p-3">
              <li className={`p-2 mb-2  align-items-center list-Item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none", display: "flex", }}>
                <div className='d-flex  align-items-center justify-content-between'>
                  <img src={currentPage === 'dashboard' ? Dash2 : Dash} style={{ fontSize: '13px' }} />
                  <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Dashboard</span>
                </div>
              </li>
              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'pg-list' ? 'active' : ''}`} onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none", position: "", display: "flex" }}>

                <img src={currentPage === 'pg-list' ? Paying2 : Paying} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Paying Guest</span>


              </li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'user-list' ? 'active' : ''}`} onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'user-list' ? Custom2 : Custom} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Customers</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'vendor' ? 'active' : ''}`} onClick={() => handlePageClick('vendor')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'vendor' ? Vendor2 : Vendor} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Vendor</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'invoice' ? 'active' : ''}`} onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none", display: "flex" }}>

                <img src={currentPage === 'invoice' ? Invoice2 : Invo} style={{ fontSize: '13px' }} />

                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Invoice</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'asset' ? 'active' : ''}`} onClick={() => handlePageClick('asset')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'asset' ? Asset2 : Asset} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Assets</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'eb' ? 'active' : ''}`} onClick={() => handlePageClick('eb')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'eb' ? Eb2 : Eb} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Electricity Bill</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'compliance' ? 'active' : ''}`} onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'compliance' ? Compl2 : Compl} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Compliants</span></li>
              <li className={`p-2  mb-2 align-items-center list-Item ${currentPage === 'expenses' ? 'active' : ''}`} onClick={() => handlePageClick('expenses')} style={{ listStyleType: "none", display: "flex" }}>

                <img src={currentPage === 'expenses' ? Expense2 : Expense} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Expenses</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'reports' ? 'active' : ''}`} onClick={() => handlePageClick('reports')} style={{ listStyleType: "none", display: "flex" }}>

                <img src={currentPage === 'reports' ? Repo2 : Repo} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: "16px", fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Reports</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => handlePageClick('settings')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'settings' ? Sett2 : Sett} style={{ fontSize: '13px' }} />
                <span className="ms-3 Title" style={{ fontSize: 16, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Settings</span></li>
            </ul>
            <ul className="p-3">

            </ul>
          </Col>
          <Col lg={{ span: 10, offset: 2 }} md={{ span: 10, offset: 2 }} sm={{ span: 10, offset: 2 }} xs={{ span: 10, offset: 2 }} className="bg-white">
            <img src={Logout} class="me-3" style={{ height: "25px", width: "25px", display: "" }} onClick={handleLogout} alt='Logout' />

            {currentPage === 'dashboard' && <Dashboards />}
            {currentPage === 'pg-list' && < PgLists />}
            {currentPage === 'user-list' && < UserLists />}
            {currentPage === 'invoice' && < Invoices />}
            {currentPage === 'vendor' && < VendorComponent />}
            {currentPage === 'compliance' && < Compliances />}
            {currentPage === 'asset' && < Assets />}
            {currentPage === 'reports' && < Report />}
            {currentPage === 'settings' && < Setting />}
            {currentPage === 'eb' && <  EbHostel />}
            {currentPage === 'checkout' && <Checkout />}
            {currentPage === 'expenses' && <Expenses />}

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sidebar;