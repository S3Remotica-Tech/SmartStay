import React, { useEffect, useState } from 'react'
import Login from '../Assets/Images/login.jpg'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import Image from 'react-bootstrap/Image';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import List from '../Assets/Images/list-report.png';
import Edits from '../Assets/Images/edit.png';
import { IoFilterOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Room from '../Assets/Images/Room.png'
import Nav from 'react-bootstrap/Nav';
import '../Pages/RoomDetails.css'
import Plus from '../Assets/Images/Create-button.png';
import UserBedDetailsEdit from '../Pages/UserBedDetailEdit';
import CryptoJS from "crypto-js";
import LoaderComponent from './LoaderComponent';



function UserBedDetails(props) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const getFloorName = (Floor) => {
    if (Floor === 1) {
      return 'Ground Floor';
    } else if (Floor === 2) {
      return '1st Floor';
    } else if (Floor === 3) {
      return '2nd Floor';
    } else {

      const adjustedFloor = Floor - 1;
      const lastDigit = adjustedFloor % 10;
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

      return `${adjustedFloor}${suffix} Floor`;
    }
  }

  const getFormattedRoomId = (Floor, Rooms) => {

    const floor = parseInt(Floor)
    const roomIdString = String(Rooms);
    switch (floor) {
      case 1:
        return `G${roomIdString.padStart(3, '0')}`;
      case 2:
        return `F${roomIdString.padStart(3, '0')}`;
      case 3:
        return `S${roomIdString.padStart(3, '0')}`;
      case 4:
        return `T${roomIdString.padStart(3, '0')}`;
      default:
        const floorAbbreviation = getFloorAbbreviation(floor);
        return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
    }
  };

  const getFloorAbbreviation = (floor) => {
    switch (floor) {
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
        return `${floor}`;
    }
  };

  const [filterByInvoice, setFilterByInvoice] = useState('');
  const [filterStatus, setFilterStatus] = useState(false)
  const [filterByStatus, setFilterByStatus] = useState('ALL')
  const [activeStep, setActiveStep] = React.useState(0);
  const [search, setSearch] = useState(false)

  const LoginId = localStorage.getItem("loginId")

  const [loginID, setLoginID] = useState('')




  // useEffect(() => {
  //   dispatch({ type: 'BILLPAYMENTHISTORY' })
  // }, [])

  const handleFilterByInvoice = (e) => {
    const searchInvoice = e.target.value;
    setFilterByInvoice(searchInvoice);
  }


  const handleSearch = () => {
    setSearch(!search)
    setFilterStatus(false)
  }
  const handleFliterByStatus = () => {
    setFilterStatus(!filterStatus)
    setSearch(false)
  }

  const handleStatusFilterChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterByStatus(selectedStatus);
  };



  const handleBack = () => {
    props.backToBed(true)
    props.hideBed(false)
    dispatch({ type: 'CLEAR_STATUS_CODE_BED' })
  }



  let BillPayementHistoryForUser = []




  const [isOpenTab, setIsOpenTab] = useState(true)

  const handleOpen = () => {
    setIsOpenTab(true)
  }

  useEffect(() => {
    if(LoginId){
      const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
      const decryptedIdString = decryptedData.toString(CryptoJS.enc.Utf8);
      const parsedData = Number(decryptedIdString);
  dispatch({ type: 'INVOICELIST', payload:{loginId:parsedData} })
    }
     
   
  }, [LoginId])


  const [filteredDatas, setFilteredDatas] = useState([]);


  useEffect(() => {
    if (state.InvoiceList?.Invoice && filteredDataForUser.length > 0) {
      let filteredData = [...filteredDataForUser];


      if (filterByStatus !== 'ALL') {
        filteredData = filteredData.filter((item) => item.Status === filterByStatus);
      }

      if (filterByInvoice) {
        filteredData = filteredData.filter((item) => item.Invoices.toLowerCase().includes(filterByInvoice.toLowerCase()));
      }

      setFilteredDatas(filteredData);
    }
  }, [filterByStatus, filterByInvoice, state.InvoiceList?.Invoice]);

  const handleCreateBedDetails = () => {
    props.showCreateBed(true)
  }

  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const [EditObj, setEditObj] = useState('')
  const [edit, setEdit] = useState('')


  const handleShow = (u) => {
    handleMenuClick();
    setShowMenu(true);
    localStorage.setItem('showMenu', 'true');
    setEditObj(u)

  };
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [file, setFile] = useState(null)

  const [hostel, setHostel] = useState('')
  const [floor, setFloor] = useState('')
  const [beds, setBeds] = useState('')
  const [rooms, setRooms] = useState('')


  const AfterEditHostel = (hostel_id) => {
    setHostel(hostel_id)
  }


  const AfterEditFloor = (Floor_ID) => {
    setFloor(Floor_ID)
  }

  const AfterEditRooms = (room) => {
    setRooms(room)
  }

  const AfterEditBed = (bedsId) => {
    setBeds(bedsId)
  }





  const [userDetailForUser, setUserDetailsForUser] = useState([])
  const [filteredDataForUser, setFilteredDataForUser] = useState([]);


  const [hostelId, setHostelId] = useState(props.Hostel_Id);
  const [bedId, setBedId] = useState(props.userBed_Id);
  const [floorId, setFloorId] = useState(props.Floor_Id);
  const [roomsId, setRoomsId] = useState(props.Room_Id);

  const [showLoader, setShowLoader] = useState(false)



  useEffect(() => {

    const ParticularUserDetails = state.UsersList?.Users?.filter(item => {

      return item.Bed == bedId &&
        item.Hostel_Id == hostelId &&
        item.Floor == floorId &&
        item.Rooms == Number(roomsId)
    }

    );


    setUserDetailsForUser(ParticularUserDetails)

    setShowLoader(true); 


    let User_Id = null;
    if (ParticularUserDetails.length > 0) {
      User_Id = ParticularUserDetails[0]?.User_Id;
      setShowLoader(false); 
      const filteredData = state.InvoiceList?.Invoice && state.InvoiceList?.Invoice.filter(user => user.User_Id == User_Id);
      
      setFilteredDataForUser(filteredData);
    }
    

  }, [state.UsersList?.Users,hostelId, floorId, roomsId, bedId,state.InvoiceList?.Invoice])



  

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser == 200) {
      try {
        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedIdString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = Number(decryptedIdString);
        setLoginID(parsedData)
        dispatch({ type: 'USERLIST', payload: { loginId: parsedData } })
      }
      catch (error) {
        console.log("Error decrypting loginid", error);
      }
      // setHostelId(hostel);
      // setBedId(beds)
      // setFloorId(floor)
      // setRoomsId(rooms)
    }

  }, [state.UsersList?.statusCodeForAddUser])

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      setHostelId(hostel);
      setBedId(beds);
      setFloorId(floor);
      setRoomsId(rooms);

      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
      }, 2000)
    }
  }, [state.UsersList?.statusCodeForAddUser, hostel, beds, floor, rooms]);




  return (
    <div className='' style={{ width: "100%" }}>
      {userDetailForUser && userDetailForUser?.map((item, index) => (<>
        <div class="row g-0 w-100 p-2">
          <div class="col-lg-5 col-md-12 col-xs-12 col-sm-12" style={{ backgroundColor: "" }}>
            <div class="d-flex justify-content-start">
              <OverlayTrigger trigger={['hover', 'focus']} placement="top" overlay={<Tooltip id="back-tooltip"   >Go back to Floor</Tooltip>}>
                <div className=" d-flex justify-content-center align-items-center me-1" style={{ cursor: "pointer", backgroundColor: "#CCCCCC55", borderRadius: 25, height: "35px", width: "35px" }}>
                  <MdOutlineKeyboardDoubleArrowLeft style={{ fontSize: 22 }} onClick={handleBack} /></div>
              </OverlayTrigger>
              <div className='d-flex' style={{ height: "40px", width: "35px", backgroundColor: "#F6F7FB", borderRadius: "50px" }} class="d-flex justify-content-center align-items-center" >
                <Image src={Room} roundedCircle style={{ height: "25px", width: "25px", backgroundColor: "#F6F7FB" }} />
              </div>
              <div class="d-block ms-2 me-1">
                <p class="ms-1" style={{ fontSize: "10px", marginBottom: "0px", color: "gray" }}>{getFloorName(item.Floor)}</p>
                <label style={{ fontSize: "13px", marginBottom: "0px", color: "black", fontWeight: 700 }}>Room No -{getFormattedRoomId(item.Floor, item.Rooms)}  </label>
              </div>

              <div className="vertical-rule ms-3"></div>

              <div class="ms-5">
                <Nav variant="underline" >
                  <Nav.Item>
                    <Nav.Link href="#" onClick={handleOpen} style={{ fontSize: "12px", fontWeight: "700" }}>Bed - {item.Bed}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>


            </div>
          </div>
          <div class="col-lg-3 offset-lg-4 col-md-12 col-xs-12 col-sm-12" style={{ backgroundColor: "" }}>
            <div class="d-flex">
              <button type="button" class="" style={{ fontSize: "12px", backgroundColor: "white", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={() => { handleShow(item) }} ><img src={Edits} height="12" width="12" alt='Edits' /> Edit</button>
              {/* <button type="button" class="ms-2" style={{ fontSize: "12px", fontWeight: "700", backgroundColor: "white", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleCreateBedDetails}><img src={Plus} height="12" width="12" alt='Plus' /> Create Bed</button> */}
            </div>
          </div>

        </div>
        <hr className='m-0 p-0' />
        {isOpenTab && <>
          <div class="row d-flex g-0" key={index}>
            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 p-3" style={{ borderRight: "1px solid lightgray" }}>
              <div class="row g-0 p-0">
                <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12 d-flex align-items-center justify-content-start' style={{ backgroundColor: "" }}>

                  <Image src={Login} roundedCircle style={{ height: "45px", width: "45px", backgroundColor: "#F6F7FB" }} />
                </div>
                <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12 d-flex align-items-center '>
                  <div class="d-block ps-1">
                    <p style={{ fontWeight: "700", textTransform: '' }} class="mb-0">{item.Name}</p>
                    {/* <button type="button" class="btn btn-light p-1" style={{ color: "#0D99FF", height: "4vh", fontSize: "12px" }}>IsActive</button> */}
                    {/* <button type="button" class="btn btn-light p-1 ms-2" style={{ color: "#0D99FF", height: "4vh", fontSize: "12px" }}>Delete</button> */}

                  </div>
                </div>
                <div class="col-lg-4  offset-lg-1 col-md-12 col-sm-12 col-xs-12 d-flex align-items-center justify-content-center" style={{ backgroundColor: "" }}>
                  <p className='mb-0' style={{ fontSize: "12px", padding: "1px", fontWeight: 700, color: "gray" }}>Joining Date:{new Date(item.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
              </div>
              <div class="d-flex justify-content-between mb-0 mt-2">
                <p style={{ fontSize: "12px", fontWeight: '700' }} class="mb-2">USER DETAIL</p>

              </div>
              <hr class="m-0 mb-2" />
              <div class="d-flex justify-content-between">
                <p style={{ fontSize: "12px", fontWeight: 700, color: "gray" }}>Phone No</p>
                <p style={{ fontSize: "12px", fontWeight: 700 }}>+91 {item.Phone}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p style={{ fontSize: "12px", fontWeight: 700, color: "gray" }}>Email Id</p>
                <p style={{ fontSize: "12px", fontWeight: 700 }}>{item.Email}</p>
              </div>



              <div class="d-flex justify-content-between mt-3 mb-0">
                <p class="mb-1" style={{ fontSize: "12px", fontWeight: 700 }} >ADDRESS DETAIL</p>

              </div>
              <hr class="m-0 mb-2 p-0" />
              <div class="d-block">
                <p class="mb-1" style={{ fontSize: "12px", fontWeight: 700 }} >PERMANENT ADDRESS</p>
                <p class="mb-3" style={{ fontSize: "12px", textTransform: 'capitalize', fontWeight: 500 }}>{item.Address}</p>

              </div>

              {/* <div class="d-flex">
                <p style={{ color: "#0D99FF", fontSize: "13px", textDecoration: "underline", fontWeight: 700 }}> + Add Additional Address</p>
              </div> */}
              <div class="d-flex justify-content-between mt-3">
                <p class="mb-1" style={{ fontSize: "12px", fontWeight: '700' }} >KYC DETAIL</p>

              </div>
              <hr class="m-0 mb-2" />

              <div className='row g-1 mt-2'>
                <div class="col-lg-4 d-flex justify-content-start">
                  <div>
                    <p style={{ fontSize: "12px", color: "gray", fontWeight: 700 }}>Aadhar Card  No</p>
                    <p style={{ fontSize: "12px", color: "gray", fontWeight: 700 }}>Pan Card  No</p>
                    <p style={{ fontSize: "12px", color: "gray", fontWeight: 700 }}>Licence</p>

                  </div>
                </div>
                <div class="col-lg-4 d-flex justify-content-center">
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: 700 }}>{item.AadharNo}</p>
                    <p style={{ fontSize: "12px", fontWeight: 700 }}>{item.PancardNo}</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, color: "black" }}>{item.licence}</p>
                  </div>
                </div>
                <div class="col-lg-4 d-flex justify-content-center">
                  <div>
                    <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                    <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                    <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                  </div>

                </div>
              </div>


            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 p-3">
              <div class="d-flex justify-content-between " style={{ backgroundColor: "", width: "100%" }}>
                <div class="p-2" style={{ backgroundColor: "" }}>
                  <h6 style={{ fontSize: "16px", fontWeight: 700 }}>Bill Payment</h6>
                </div>
                <div class="d-flex justify-content-between align-items-center gap-3" style={{ backgroundColor: "" }} >

                  {search && <>
                    <input type="text" value={filterByInvoice} onChange={(e) => handleFilterByInvoice(e)} className='form-control form-control-sm me-2' placeholder='Search here....' style={{ width: "150px", boxShadow: "none", border: "1px solid lightgray" }} /></>
                  }
                  <BsSearch title="Search By Invoice" class="me-2" style={{ fontSize: 20 }} onClick={handleSearch} />

                  {
                    filterStatus &&
                    <>
                      <select value={filterByStatus} onChange={(e) => handleStatusFilterChange(e)} class="form-control form-control-sm m-2"
                        style={{ fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", boxShadow: "none", padding: "5px", border: "1px Solid lightgray" }}
                      >
                        <option selected value="ALL"> ALL</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </>
                  }
                  <IoFilterOutline class="me-2" style={{ fontSize: 20 }} onClick={handleFliterByStatus} />
                </div>

              </div>
              <Table responsive>
                <thead style={{ backgroundColor: "#F6F7FB", color: "gray", fontSize: "11px" }}>
                  <tr className="" style={{ height: "30px" }}>
                    <th style={{ color: "gray" }}>Date</th>
                    <th style={{ color: "gray" }}>Invoices#</th>
                    <th style={{ color: "gray" }}>Amount</th>
                    {/* <th style={{ color: "gray" }}>Balance Due</th> */}
                    <th style={{ color: "gray" }}>Status</th>
                    <th style={{ color: "gray" }}>Action</th>
                  </tr>
                </thead>
                <tbody style={{ height: "50px", fontSize: "11px" }}>
                  {filteredDatas && filteredDatas.map((view) => (
                    <tr key={view.Invoices}>
                      <td>{new Date(view.Date).toLocaleDateString('en-GB')}</td>
                      <td>{view.Invoices}</td>
                      <td>₹{view.Amount}</td>
                      {/* <td>₹{view.BalanceDue}</td> */}
                      <td style={view.Status === "Success" ? { color: "green", fontWeight: 700 } : { color: "red", fontWeight: 700 }}>{view.Status}</td>
                      <td
                        className="justify-content-center"
                      >
                        <img src={List} height={20} width={20} alt='List' />
                        {/* <img
                          className="ms-1"
                          src={Edits} height={20} width={20} alt='Edits' /> */}
                      </td>
                    </tr>
                  ))}
                  {filteredDatas.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {/* <div class="d-flex justify-content-between mb-3">
                <p style={{ fontWeight: 700 }}>Comments</p>
                <p style={{ color: "#0D99FF", fontSize: "13px", textDecoration: "underline", fontWeight: 700 }}>+ Add Comment</p>
              </div> */}

              <div class="" style={{ marginTop: 30 }}>
                <div class="d-flex justify-content-start align-items-center" style={{ backgroundColor: "", marginLeft: 100, marginTop: 50 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: '', height: "" }}>
                    <Stepper activeStep={activeStep} orientation="vertical" style={{ color: "#2F74EB", height: "", }}>
                      <Step sx={{ color: "#2F74EB" }} style={{ position: "relative" }} >
                        <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                          <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                        </div>
                        <div style={{ position: "absolute", left: -80, top: 0 }}>
                          <p class="mb-0" style={{ color: "black", fontSize: '11px' }}>05-01-2023</p>
                          <p style={{ color: "black", fontSize: '11px' }}>07.23PM</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: "absolute", left: 50, top: -30 }}>
                          <div className="pop-overs" style={{ padding: "20px", borderWidth: 1, borderColor: '#888888', borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', width: "70vh", maxWidth: "1000px", borderRadius: 5 }}>
                            <div class="d-block">
                              <p class="mb-1" style={{ fontSize: '11px', color: "black" }}>Invoice updated</p>
                              <p class="mb-1" style={{ fontSize: '11px', color: "black" }}>Invoice Dhaskshan Sri emailed by <strong>SmartStay</strong> <span style={{ color: '#2F74EB' }}> - View Details</span></p>
                            </div>

                            <div style={{ width: 12, height: 12, borderLeftWidth: 1, borderTopWidth: 0, borderBottomWidth: 1, borderRightWidth: 0, borderLeftColor: '#888888', borderBottomColor: '#888888', borderStyle: 'solid', position: 'absolute', left: -7, transform: 'rotate(45deg)', backgroundColor: '#FFFFFF' }}></div>
                          </div>
                        </div>
                      </Step>
                      <Step sx={{ color: "#2F74EB" }}>
                      </Step>
                      <Step sx={{ color: "#2F74EB", }}>
                      </Step>
                      <Step sx={{ color: "#2F74EB" }}>
                      </Step>
                      <Step sx={{ color: "#2F74EB" }}>
                      </Step>
                      <div>
                        <Step sx={{ color: "#2F74EB" }} style={{ position: "relative" }}>
                          <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                            <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                          </div>
                          <div style={{ position: "absolute", left: -80, top: 0 }}>
                            <p class="mb-0" style={{ color: "black", fontSize: '11px' }} >05-01-2023</p>
                            <p style={{ color: "black", fontSize: '11px' }}>07.20PM</p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: "absolute", left: 50, top: -30 }}>
                            <div className="pop-overs" style={{ padding: "20px", borderWidth: 1, borderColor: '#888888', borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', width: "70vh", borderRadius: 5 }}>
                              <div class="d-block">
                                <p class="mb-1" style={{ fontSize: '11px', color: "black" }}>Invoice added</p>
                                <p class="mb-1" style={{ fontSize: '11px', color: "black" }}>Invoice Dhaskshan Sri amount of ₹500.00 created by <strong>SmartStay</strong> <span style={{ color: '#2F74EB' }}> - View Details</span></p>
                              </div>

                              <div style={{ width: 12, height: 12, borderLeftWidth: 1, borderTopWidth: 0, borderBottomWidth: 1, borderRightWidth: 0, borderLeftColor: '#888888', borderBottomColor: '#888888', borderStyle: 'solid', position: 'absolute', left: -7, transform: 'rotate(45deg)', backgroundColor: '#FFFFFF' }}></div>
                            </div>
                          </div>
                        </Step>
                      </div>
                    </Stepper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}
      </>))}

      {
        showMenu == true ? <UserBedDetailsEdit
          AfterEditHostel={AfterEditHostel}
          AfterEditFloor={AfterEditFloor}
          AfterEditRooms={AfterEditRooms}
          AfterEditBed={AfterEditBed}
          showMenu={showMenu} setShowMenu={setShowMenu} handleShow={handleShow} edit={edit} setEdit={setEdit} EditObj={EditObj} setEditObj={setEditObj} handleMenuClick={handleMenuClick} setShowForm={setShowForm} showForm={showForm} setUserClicked={setUserClicked}

        /> : null
      }


{showLoader && <LoaderComponent />}
    </div>
  )
}

export default React.memo(UserBedDetails)   