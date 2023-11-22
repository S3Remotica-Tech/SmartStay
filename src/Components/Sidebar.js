import React, { useState } from 'react';
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

function App() {

  const [activePage, setActivePage] = useState(true);

  const [collapsed, setCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState('');

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


  return (
    <Container fluid>
     
      <Row>
      
        <Col sm={2} xs={2} className=" d-sm-block bg-light vh-100 p-0" style={{cursor:"pointer"}} >
          
          <ul class="m-0 mt-3 p-0" style={{backgroundColor:""}}>
            <li class="p-2" onClick={() => handlePageClick('dashboard')} style={{ listStyleType: "none" }}><img src={Dashboard} height="15"  class="menu-icon" alt='DashBoard'/><span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Dashboard</span></li>
            <li class="p-2" onClick={() => handlePageClick('pg-list')} style={{ listStyleType: "none" }}> <img src={PgList} height="15"  class="menu-icon" alt='Pglist'/><span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>PG list</span> <span></span><img src={Menu} height="15" style={{ paddingLeft: "80px" }} alt='Menu'/></li>
            <li  class="p-2" onClick={() => handlePageClick('user-list')} style={{ listStyleType: "none" }}><img src={UserList} height="15"  class="menu-icon" alt='userList'/> <span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>User list</span></li>
          </ul>

          <ul class="m-0 mt-3 p-0">
            <li class="p-2" onClick={() => handlePageClick('invoice')} style={{ listStyleType: "none" }}><img src={Invoice} height="15"  class="menu-icon" alt='Invoice'/><span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Invoice</span></li>
            <li class="p-2" onClick={() => handlePageClick('compliance')} style={{ listStyleType: "none" }}><img src={Compliance} height="15" class="menu-icon" alt='Compliance'/><span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Compliance</span></li>
            <li class="p-2" onClick={() => handlePageClick('payment')} style={{ listStyleType: "none" }}><img src={Payment} height="15" class="menu-icon" alt='Payment'/> <span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Payment gateway</span></li>
            <li class="p-2" onClick={() => handlePageClick('user-access')} style={{ listStyleType: "none" }}><img src={UserAccess} height="15"  class="menu-icon" alt='userAccess'/> <span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>User and access</span></li>
            <li class="p-2" onClick={() => handlePageClick('reports')} style={{ listStyleType: "none" }}><img src={Reports} height="15" class="menu-icon" alt='Report'/> <span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Reports</span></li>
          </ul>

          <ul class="m-0 mt-3 p-0">
            <li class="p-2" onClick={() => handlePageClick('settings')} style={{ listStyleType: "none" }}><img src={Settings} height="15" class="menu-icon" alt='Settings'/> <span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Settings</span></li>
            <li class="p-2" onClick={() => handlePageClick('support')} style={{ listStyleType: "none" }}><img src={Support} height="15" class="menu-icon" alt='Support'/> <span class="ms-3" style={{ fontSize: "13px", fontWeight: "600" }}>Support</span></li>

          </ul>
        </Col>
        <Col sm={10}  xs={10} className="bg-white vh-100">
         
          {activePage ?
            <>
              <h4 class="p-2">Dashboard</h4>
              <p class="ps-2">Hi,Rahul! Welcome to Business Dashboard</p>
              <hr />
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <Image src={Hostels} roundedCircle style={{ height: "30px", width: "30px" }} />
                  <div class="d-block ms-2">
                    <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray" }}>PG Detail</p>
                    <p style={{ fontSize: "11px", marginBottom: "0px", marginRight: "0px", fontWeight: "800" }}>Royal Grand Hostel</p>
                  </div>
                </div>
                <div>
                  <button type="button" class="" style={{ backgroundColor:"white",fontSize: "12px", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleShow}><img src={Plus} height="12" width="12" alt='Plus'/> Create PG</button>
                </div>

                <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "70vh" }}>
                  <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} class="ps-3">Create PG</Offcanvas.Title>
                  <Offcanvas.Body>
                    <h6 style={{ color: "#0D6EFD" }}>PG Detail</h6>
                    <p class="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
                    <div class="d-flex justify-content-center">
                      <p style={{ fontSize: "11px" ,fontWeight:"500"}}>Upload PG Photo</p>
                    </div>
                    <div class="d-flex justify-content-center">
                      <Image src={Hostel} roundedCircle style={{ height: "50px", width: "50px" }} id="hostel-image" />
                      <Image src={CreateButton} style={{ height: "20px", width: "20px" }} id="plus-image" />
                    </div>
                    <form>
                      <div class="form-group mb-4">
                        <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Enter PG Name</label>
                        <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter PG Name" style={{ fontSize: "11px" }} />
                      </div>
                      <div class="form-group mb-4">
                        <div class="row">
                          <div class="col">
                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Phone Number</label>
                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter Phone Number" style={{ fontSize: "11px" }} />
                          </div>
                          <div class="col">
                            <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>Email Id</label>
                            <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter Email Id" style={{ fontSize: "11px" }} />
                          </div>
                        </div>
                      </div>
                      <div class="form-group mb-4">
                        <label for="exampleInput" class="form-label mb-1" style={{ fontSize: "11px" }}>PG Location</label>
                        <input type="text" class="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter PG Location" style={{ fontSize: "11px" }} />
                      </div>

                      <div class="form-group mb-3">
                        <div class="row">
                          <div class="col">
                            <label for="exampleSelect" style={{ fontSize: "11px" }}>Select Floor</label>
                            <select class="form-select custom-select p-0 pt-1" id="exampleSelect" style={{ fontSize: "11px" }}>
                              <option value="option1" >Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </select>
                          </div>
                          <div class="col">
                            <label for="exampleSelect" style={{ fontSize: "11px" }}>Select Room</label>
                            <select class="form-select custom-select p-0 pt-1" id="exampleSelect" style={{ fontSize: "11px" }}>

                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </select>
                          </div>
                          <div class="col">
                            <label for="exampleSelect" style={{ fontSize: "11px" }}>Select Bed</label>
                            <select class="form-select custom-select p-0 pt-1" id="exampleSelect" style={{ fontSize: "11px" }}>

                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <hr style={{ marginTop: "120px" }} />
                      <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-outline-dark border-0 w-25" style={{ borderRadius: "50px",fontWeight:"600" }}>Cancel</button>
                        <button type="button" class="btn btn-outline-primary w-25 ms-3" style={{ borderRadius: "50px",fontWeight:"600" }}>Save</button>
                      </div>
                    </form>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
              <hr />
              <div class="container">
                <div style={{ flex: 1 }} class="d-flex justify-content-center content">
                  <img src={Welcome} class="pt-5" height="100" width="50" alt='Welcome'/>
                </div>
                <div style={{ flex: 1 }} class="d-flex justify-content-center content pt-2">
                  <h3>World's fastest growing hotel chain.</h3>
                </div>
                <div style={{ flex: 1 }} class="d-flex justify-content-center content pt-2">
                  <p>We need a few basic details to consider your hostel</p>
                </div>
                <div style={{ flex: 1 }} class="d-flex justify-content-center content pt-3" >
                  <button type="button" class="" style={{backgroundColor:"white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleShow}><img src={Plus} height="12" width="12" alt='Plus'/> Create PG</button>
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

export default App;
