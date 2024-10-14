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
import { InputGroup, FormControl, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import Notify from '../Assets/Images/New_images/notify.png';
import Profileimage from '../Assets/Images/New_images/profile.png';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from 'universal-cookie';
import Smartstay from '../Assets/Images/New_images/LogoSmart.svg';
import Smarts from '../Assets/Images/Smartstaysm1.png';
import Dash from '../Assets/Images/New_images/home.svg';

import Manage from '../Assets/Images/New_images/category.png';

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
import Profilesettings from '../Pages/AccountSettings'
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';


function Sidebar() {
  const cookies = new Cookies()
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const stateData = useSelector(state => state.createAccount)
  const stateLogin = useSelector(state => state.login)

  const [manageOpen, setManageOpen] = useState(false)
  console.log("state for side bar", stateData)




  let LoginId = localStorage.getItem("loginId")
  let checkedValue = localStorage.getItem("checked")


  const loginId = localStorage.getItem('loginId');


  useEffect(() => {
    dispatch({ type: 'HOSTELLIST' })
    dispatch({ type: 'ACCOUNTDETAILS' })
  }, []);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState([]);
  console.log("notification", notification);

  useEffect(() => {
    dispatch({ type: 'ALL-NOTIFICATION-LIST' })
    setNotification(state.login.Notification)
  }, [])



  let newNotificationIDs = state.login.Notification && state.login.Notification?.length > 0 && state.login.Notification.filter(notification => notification.status === 1).map(notification => notification.id);


  const newNotificationsCount = newNotificationIDs.length;
  console.log("id", newNotificationIDs);


  const handleClosepopup = () => setShow(false);

  const handleShowpopup = () => {
    setShow(true);
    if (newNotificationIDs.length > 0 && newNotificationIDs != []) {
      setTimeout(() => {
        dispatch({ type: 'UPDATE-NOTIFICATION', payload: { id: newNotificationIDs } });
      }, 1000)
    }

    // dispatch({ type: 'ALL-NOTIFICATION-LIST' })
  }


  useEffect(() => {
    if (state.login.UpdateNotificationMessage != null && state.login.UpdateNotificationMessage != '') {
      dispatch({ type: 'ALL-NOTIFICATION-LIST' })
      setTimeout(() => {
        dispatch({ type: 'AFTER_UPDATE_NOTIFICATION', message: null })
        newNotificationIDs = []
      }, 100);
    }
  }, [state.login.UpdateNotificationMessage])


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

        // console.log("Is_Enable *****", Is_Enable)

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











  // const [filterhostellist, setFilterhostellist] = useState([]);
  // const [loginCustomerid, setLoginCustomerId] = useState('')
  const [profiles, setProfiles] = useState(null)
  const [profilename, setProfileArray] = useState('')




  useEffect(() => {
    if (stateData.accountList.length > 0) {
      try {


        const FilteredProfile = stateData.accountList[0]?.user_details

        const profilePictures = FilteredProfile.profile;



        const profileName = FilteredProfile.first_name;
        setProfiles(profilePictures);
        setProfileArray(profileName);
        console.log("profileName", profileName);
      }

      catch (error) {
        console.log("Error decrypting loginid", error);
      }

    }

  }, [stateData.accountList, state.hostelList, stateData.statusCodeForAccount])


  console.log("profile*****", profiles)



  // if((profiles == 'null' || profiles == null) || (profiles == undefined || profiles == 'undefined' || profiles == '')){
  //   setProfiles(0)
  // }

  const [selectedHostel, setSelectedHostel] = useState(null);

  const handleHostelSelect = (hostelName) => {
    const selected = state.hostelList.find((item) => {
      return item.Name === hostelName
    });
    setSelectedHostel(selected);

  };



  const [activePage, setActivePage] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');


  console.log("currentPage", currentPage)

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
    setCurrentPage(localStorage.getItem('currentPage'));
  }, [currentPage]);

  console.log("currentPage", localStorage.getItem("currentPage"))

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setActivePage(false);
    localStorage.setItem('currentPage', page);
  };


  useEffect(() => {
    if (state.login?.isLoggedIn) {
      setCurrentPage('dashboard')
    }
  }, [state.login?.isLoggedIn])



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





  const stateAccount = useSelector(state => state.createAccount)


  const [profile, setProfile] = useState(null)


  useEffect(() => {

    const Filteredprofile = stateAccount?.accountList[0]?.user_details?.profile
    setProfile(Filteredprofile)
  }, [])



  useEffect(() => {
    if (stateAccount.statusCodeForAccountList == 200) {
      const loginProfile = stateAccount.accountList[0].user_details.profile
      setProfile(loginProfile)
    }

  }, [stateAccount.statusCodeForAccountList])

  const handledisplaycompliace = (compliance) => {
    setCurrentPage('compliance')
    localStorage.setItem('currentPage', 'compliance');
  }
  return (
    <>



      <Container fluid className='p-0'>

        <Row className='g-0 m-0'  >
          <Col lg={2} md={2} sm={2} xs={2} className="d-sm-block  sidebar" style={{ cursor: "pointer", backgroundColor: '#E0ECFF', position: "fixed",
             maxWidth: 240, width: "100%", height: "100%", maxHeight: 768 }} >
            <div className='container' style={{ position: "relative" }}>


              <div className="d-flex align-items-center justify-content-start" style={{ padding: "16px 30px" }}>
                <img src={Smartstay} style={{ height: 25.06, width: 134 }} />
              </div>



              <ul className="p-0" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>


                <li className={`align-items-center list-Item ${currentPage === 'dashboard' ? 'active' : ''}`} onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none", display: "flex", }}>
                  {/* <div className='d-flex  align-items-center justify-content-between' > */}
                    <img src={currentPage === 'dashboard' ? Dash2 : Dash} style={{ height: 20, width: 20 }} />
                    <span className="Title" style={{ fontSize: 14, fontWeight: 500, display: "inline-block", fontFamily: "Gilroy" }}>Home</span>
                  {/* </div> */}
                </li>



                <li className={`align-items-center list-Item ${currentPage === 'manage' ? 'active' : ''}`} onClick={() => setManageOpen(!manageOpen)} style={{ listStyleType: "none", display: "flex" }}>
                  <img src={Manage} style={{ height: 20, width: 20 }} />
                  <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Manage</span>
                  <span className="ms-auto">{manageOpen ?
                    <ArrowUp2
                      size="16"
                      color="#4B4B4B"
                    /> :
                    <ArrowDown2
                      size="16"
                      color="#4B4B4B"
                    />
                  }</span>
                </li>


                {manageOpen && (
                  <ul className="p-1"style={{marginLeft:10}}>
                    <li className={` align-items-center list-sub-Item ${currentPage === 'pg-list' ? 'active' : ''}`} onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none", display: "flex" }}>
                      <img src={currentPage === 'pg-list' ? Paying2 : Paying} style={{ height: 20, width: 20 }} />
                      <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Paying Guest</span>
                    </li>
                    <li className={`align-items-center list-sub-Item ${currentPage === 'user-list' ? 'active' : ''}`} onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none", display: "flex" }}>
                      <img src={currentPage === 'user-list' ? Custom2 : Custom} style={{ height: 20, width: 20 }} />
                      <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Customers</span>
                    </li>
                    <li className={`align-items-center list-sub-Item ${currentPage === 'asset' ? 'active' : ''}`} onClick={() => handlePageClick('asset')} style={{ listStyleType: "none", display: "flex" }}>
                      <img src={currentPage === 'asset' ? Asset2 : Asset} style={{ height: 20, width: 20 }} />
                      <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Assets</span>
                    </li>
                    <li className={`align-items-center list-sub-Item ${currentPage === 'vendor' ? 'active' : ''}`} onClick={() => handlePageClick('vendor')} style={{ listStyleType: "none", display: "flex" }}>
                      <img src={currentPage === 'vendor' ? Vendor2 : Vendor} style={{ height: 20, width: 20 }} />
                      <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Vendor</span>
                    </li>
                  </ul>
                )}













                {/* <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'pg-list' ? 'active' : ''}`} onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none", position: "", display: "flex" }}>

                <img src={currentPage === 'pg-list' ? Paying2 : Paying} style={{ height:20,width:20}} />
                <span className="ms-3 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Paying Guest</span>


              </li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'user-list' ? 'active' : ''}`} onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'user-list' ? Custom2 : Custom} style={{ height:20,width:20}} />
                <span className="ms-3 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Customers</span></li>

              <li className={`p-2 mb-2 align-items-center list-Item ${currentPage === 'vendor' ? 'active' : ''}`} onClick={() => handlePageClick('vendor')} style={{ listStyleType: "none", display: "flex" }}>
                <img src={currentPage === 'vendor' ? Vendor2 : Vendor} style={{ height:20,width:20}} />
                <span className="ms-3 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Vendor</span></li> */}

                <li className={`align-items-center list-Item ${currentPage === 'invoice' ? 'active' : ''}`} onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none", display: "flex" }}>

                  <img src={currentPage === 'invoice' ? Invoice2 : Invo} style={{ height: 20, width: 20 }} />

                  <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Bills</span></li>


                {/* <li className={`p-2 mb-2 align-items-center list-Item ${currentPage == 'asset' ? 'active' : ''}`} onClick={() => handlePageClick('asset')} style={{ listStyleType: "none", display: "flex" ,backgroundColor: currentPage === 'asset' ? '#FFFFFF' : 'inherit',color: currentPage === 'asset' ? 'rgba(30, 69, 225, 1)' : 'inherit'}}>
                <img src={currentPage == 'asset' ? Asset2 : Asset} style={{ height:20,width:20 ,color:currentPage == 'asset' && "rgba(30, 69, 225, 1)" }} />
                <span className="ms-3 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Assets</span></li> */}




                <li className={`align-items-center list-Item ${currentPage === 'eb' ? 'active' : ''}`} onClick={() => handlePageClick('eb')} style={{ listStyleType: "none", display: "flex" }}>
                  <img src={currentPage === 'eb' ? Eb2 : Eb} style={{ height: 20, width: 20 }} />
                  <span className="ms-1 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Electricity</span>
                </li>

                <li className={` align-items-center list-Item ${currentPage === 'compliance' ? 'active' : ''}`} onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none", display: "flex" }}>
                  <img src={currentPage === 'compliance' ? Compl2 : Compl} style={{ height: 20, width: 20 }} />
                  <span className=" Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Compliants</span></li>
                <li className={`align-items-center list-Item ${currentPage === 'expenses' ? 'active' : ''}`} onClick={() => handlePageClick('expenses')} style={{ listStyleType: "none", display: "flex" }}>

                  <img src={currentPage === 'expenses' ? Expense2 : Expense} style={{ height: 20, width: 20 }} />
                  <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Expenses</span></li>

                <li className={` align-items-center list-Item ${currentPage === 'reports' ? 'active' : ''}`} onClick={() => handlePageClick('reports')} style={{ listStyleType: "none", display: "flex" }}>

                  <img src={currentPage === 'reports' ? Repo2 : Repo} style={{ height: 20, width: 20 }} />
                  <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Reports</span></li>

                <li className={`align-items-center list-Item ${currentPage === 'settings' ? 'active' : ''}`} onClick={() => handlePageClick('settings')} style={{ listStyleType: "none", display: "flex" }}>
                  <img src={currentPage === 'settings' ? Sett2 : Sett} style={{ height: 20, width: 20 }} />
                  <span className="Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy" }}>Settings</span>
                </li>


              </ul>





            </div>
            <ul className="p-0" style={{ position: "absolute", bottom: 0, left: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <li className={` align-items-center list-Items ${currentPage === 'profile' ? 'active' : ''}`} onClick={() => handlePageClick('profile')} style={{ listStyleType: "none", display: "flex", width: 200 }}>
                {/* <img src={currentPage === 'settings' ? Sett2 : Sett} style={{ fontSize: '13px' }} /> */}
                <div className="mr-3" style={{ cursor: "pointer" }}>
                  <Image
                    src={(profiles == 'null' || profiles == null) || (profiles == undefined || profiles == 'undefined' || profiles == '' || (profiles == 0 || profiles == "0")) ? Profileimage : profiles} alt='profile-image'
                    roundedCircle style={{ height: "40px", width: "40px" }} onClick={() => handlePageClick('profile')} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="ms-3 Title" style={{ fontSize: 14, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy", textTransform: "capitalize" }}>{profilename}</span>
                  <span className="ms-3 Title" style={{ fontSize: 12, fontWeight: 600, display: "inline-block", fontFamily: "Gilroy", color: 'blue' }}>Admin</span>
                </div>

              </li>
            </ul>
          </Col>
          <Col className="bg-white main-content" lg={{ span: 10, offset: 2 }} md={{ span: 10, offset: 2 }} sm={{ span: 10, offset: 2 }} xs={{ span: 10, offset: 2 }} style={{ maxWidth: 1126, width: "100%" }}>
            <div className='container d-flex justify-content-end align-items-center' style={{ marginTop: '20px' }}>

              <div >
                {/* <InputGroup>
    <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
      <CiSearch style={{ fontSize: 20 }} />
    </InputGroup.Text>
    <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
      placeholder="Search..."
    />
  </InputGroup> */}
              </div>
              {/* <div className="mr-3" onClick={handleShowpopup} style={{cursor:"pointer"}}>
  <img src={Notify} alt="notification" />
</div> */}


            </div>

            {/* <Offcanvas placement="end" show={show} onHide={handleClosepopup} style={{ width: "69vh" }}>
              <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >Notification</Offcanvas.Title>
              <Offcanvas.Body style={{ maxHeight: 'calc(100vh - 35px)', overflowY: 'auto' }}>
                <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
                  <div class="p-1 bd-highlight user-menu">
                    <div>
                      {newNotificationsCount > 0 && <p style={{ marginTop: '10px' }}><span style={{ backgroundColor: '#DBE1FB', padding: '8px 12px', color: '#222222', borderRadius: '14px', fontWeight: 500 }}>{newNotificationsCount} new notifications</span></p>}
                    </div>
                    <div className='container' style={{ marginTop: "30px" }}>
                      <>
                        <div className='row mb-3'>
                          {state.login.Notification && state.login.Notification?.length > 0 && state.login.Notification.map((val) => (
                            <div key={val.id} className='border-bottom' style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                              <p style={{ color: val.status === 1 ? 'black' : '#939393', width: '75%' }}>{val.message}</p>
                              {val.status === 1 && <div style={{ width: '10px', height: '10px', backgroundColor: 'blue', borderRadius: '50%', marginTop: '5px' }}>
                              </div>}


                            </div>
                          ))}

                        </div>
                      </>


                    </div>
                  </div>
                </div>

              </Offcanvas.Body>
            </Offcanvas> */}

            {currentPage === 'dashboard' && <Dashboards displayCompliance={handledisplaycompliace} />}
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
            {currentPage === 'profile' && <Profilesettings />}
          </Col>
        </Row>
      </Container>




    </>
  );
}

export default Sidebar;