import React, { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./UserList.css";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import img1 from '../Assets/Images/list-report.png';
import img2 from '../Assets/Images/edit.png';
import Profile from '../Assets/Images/Profile.jpg';
import { Dropdown, Table } from 'react-bootstrap';
import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { BsSearch } from "react-icons/bs";
import List from '../Assets/Images/list-report.png';
import Edits from '../Assets/Images/edit.png';
import Login from '../Assets/Images/login.jpg'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import Image from 'react-bootstrap/Image';
import UserlistForm from "./UserlistForm";
import CryptoJS from "crypto-js";
import LoaderComponent from './LoaderComponent';


function UserList() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();


  const [loading,setLoading] = useState(false)


  useEffect(() => {

    setLoading(true)

    if(state?.UsersList?.Users){
      setTimeout(() => {
      dispatch({ type: 'USERLIST' })
      dispatch({ type: 'INVOICELIST' })
      setLoading(false);
    }, 800);
    }
    else{
      setLoading(true)
    }
     

  }, [])




  //  to trigger invoice pdf

  const [showLoader, setShowLoader] = useState(false)
  const [selectedItems, setSelectedItems] = useState('')

  const handleInvoiceDetail = (item) => {
    console.log("item invoice", item)
    setSelectedItems(item)
    if (item.User_Id) {
      const originalDate = new Date(item.Date);
      originalDate.setDate(originalDate.getDate());
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const day = originalDate.getDate().toString().padStart(2, '0');
      const newDate = `${year}-${month}-${day}`;
      dispatch({ type: 'INVOICEPDF', payload: { Date: newDate, User_Id: item.User_Id, id: item.id } });
      setShowLoader(true);
    }
  };


  useEffect(() => {
    if (state.InvoiceList.statusCodeForPDf === 200) {
      dispatch({ type: 'INVOICELIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_LIST' });
      }, 100);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_PDF_STATUS_CODE' });
      }, 200);
    }
  }, [state.InvoiceList?.statusCodeForPDf]);







  useEffect(() => {
    const toTriggerPDF = state.InvoiceList?.toTriggerPDF;
    if (toTriggerPDF) {

      setTimeout(() => {
        let pdfWindow;
        const InvoicePDf = state.InvoiceList?.Invoice &&
          state.InvoiceList.Invoice.filter(view => view.User_Id == selectedItems.User_Id && view.id == selectedItems.id);
        if (InvoicePDf[0]?.invoicePDF) {
          pdfWindow = window.open(InvoicePDf[0]?.invoicePDF, '_blank');
          if (pdfWindow) {
            setShowLoader(false);
          }


        } else {
          // setShowLoader(true);
        }
      }, 0);
    } else {
      console.log("to trigger pdf is false so pdf not working");
    }
  }, [state.InvoiceList?.Invoice, state.InvoiceList?.toTriggerPDF]);


  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUserClicked, setUserClicked] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [searchicon, setSearchicon] = useState(false);
  const [edit, setEdit] = useState('')
  const [filtericon, setFiltericon] = useState(false)
  const [statusfilter, setStatusfilter] = useState('')
  const [EditObj, setEditObj] = useState('')
  const [addBasicDetail, setAddBasicDetail] = useState('')
  const [filteredDatas, setFilteredDatas] = useState([]);




  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // console.log("filteredDatas", filteredDatas)

  const [currentPages, setCurrentPages] = useState(1);
  const itemsPerPages = 7;
  const totalPagesFor = Math.ceil(filteredDatas.length / itemsPerPages);

  // console.log("totalPagesFor", totalPagesFor)
  const indexOfLastItems = currentPages * itemsPerPages;
  const indexOfFirstItems = indexOfLastItems - itemsPerPages;
  const currentItemsForInvoice = filteredDatas.slice(indexOfFirstItems, indexOfLastItems);

  // console.log("currentItemsForInvoice", currentItemsForInvoice)

  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };




  const handleShow = (u) => {
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(true)
    setEditObj(u)
  };

  const handleShowAddBed = (u) => {
    console.log("u for assign bed", u)
    handleMenuClick();
    setShowMenu(true);
    setAddBasicDetail(false)
    setEditObj(u)

  };



  console.log("state", state)


  useEffect(() => {
    setFilteredData(state.UsersList.Users);
  }, [state.UsersList.Users])

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
    }

  }

  const handleNextInvoice = () => {
    if (currentPages < totalPagesFor) {
      setCurrentPages((prevPage) => prevPage === totalPagesFor ? prevPage : prevPage + 1);
    }
  };

  const handlePreviousInvoice = () => {
    if (currentPages > 1) {
      setCurrentPages((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
    }

  }








  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handlePageChanges = (pageNumber) => {
    setCurrentPages(pageNumber);
  };

  const generatepagenumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchItem != '') {
      const filteredItems = state.UsersList.Users.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredData(filteredItems);
    }
    else {
      setFilteredData(state.UsersList.Users)
    }
  }

  const handleiconshow = () => {
    setSearchicon(!searchicon)
    setFiltericon(false)
  }
  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }
  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm)
    if (searchTerm == "ALL") {
      setFilteredData(state.UsersList.Users)
    }
    else {
      const filteredItems = state.UsersList.Users.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredItems);
    }
  }


  const [roomDetail, setRoomDetail] = useState(false)
  const [userList, setUserList] = useState(true)
  const [clickedUserData, setClickedUserData] = useState([]);
  const [filterByDate, setFilterByDate] = useState('');
  const [filterStatus, setFilterStatus] = useState(false)
  const [filterByStatus, setFilterByStatus] = useState('ALL')


  const [hostel, sethostel] = useState('')
  const [floors_Id, setFloors_Id] = useState('')
  const [rooms_id, setRoomsId] = useState('')
  const [beds_id, setBed_Id] = useState('')

  const handleRoomDetailsPage = (userData, bed, room, floor, hostel_id) => {
    const clickedUserDataArray = Array.isArray(userData) ? userData : [userData];
    // sethostel(hostel_id)
    // setFloors_Id(floor)
    // setRoomsId(room)
    // setBed_Id(bed)
    setHostelIds(hostel_id)
    setBedIds(bed)
    setFloorIds(floor)
    setRoomsIds(room)
    setRoomDetail(true)
    setUserList(false)
    setClickedUserData(clickedUserDataArray);

  }

  const [propsHostel, setPropsHostel] = useState('')
  const [propsFloor, setPropsFloor] = useState('')
  const [propsRooms, setPropsRooms] = useState('')
  const [propsBeds, setPropsBeds] = useState('')

  const AfterEditHostel = (hostel_id) => {
    setPropsHostel(hostel_id)
  }

  const AfterEditFloor = (Floor_ID) => {
    setPropsFloor(Floor_ID)
  }

  const AfterEditRooms = (room) => {
    setPropsRooms(room)
  }

  const AfterEditBed = (bedsId) => {
    setPropsBeds(bedsId)
  }


  const [hostelIds, setHostelIds] = useState(hostel);
  const [bedIds, setBedIds] = useState(beds_id);
  const [floorIds, setFloorIds] = useState(floors_Id);
  const [roomsIds, setRoomsIds] = useState(rooms_id);


  const [filteredDataForUser, setFilteredDataForUser] = useState([]);
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    const ParticularUserDetails = state.UsersList?.Users?.filter(item => {

      return item.Bed == bedIds &&
        item.Hostel_Id == hostelIds &&
        item.Floor == floorIds &&
        item.Rooms == Number(roomsIds)
    }

    );

    // const filteredUserDetails = ParticularUserDetails.filter(details => details.length !== 0);

    setUserDetails(ParticularUserDetails);

    let User_Id = null;
    if (ParticularUserDetails.length > 0) {
      User_Id = ParticularUserDetails[0]?.User_Id;
      const filteredData = state.InvoiceList?.Invoice && state.InvoiceList?.Invoice?.filter(user => user.User_Id == User_Id);

      setFilteredDataForUser(filteredData);

    }

    // if (User_Id) {
    //   const filteredData = state.InvoiceList?.Invoice && state.InvoiceList?.Invoice.filter(user => user.User_Id == User_Id);

    //   setFilteredDataForUser(filteredData);

    //   }
  }, [roomDetail, state.UsersList?.Users, hostelIds, bedIds, floorIds, roomsIds]);


  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({ type: 'USERLIST' })

      // setTimeout(()=>{
      //   dispatch({ type: 'MANUALINVOICE' })
      // },3000)

      setHostelIds(propsHostel);
      setBedIds(propsBeds);
      setFloorIds(propsFloor);
      setRoomsIds(propsRooms);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
      }, 2000)
    }
  }, [state.UsersList?.statusCodeForAddUser, propsHostel, propsBeds, propsFloor, propsRooms]);




  const [activeStep, setActiveStep] = React.useState(0);
  const [search, setSearch] = useState(false)
  const [isOpenTab, setIsOpenTab] = useState(true)

  const handleOpen = () => {
    setIsOpenTab(!isOpenTab)
  }




  const billPaymentHistory = state.UsersList.billPaymentHistory;
  const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
  const [filterByInvoice, setFilterByInvoice] = useState('');


  const handleFilterByInvoice = (e) => {
    const searchInvoice = e.target.value;
    setFilterByInvoice(searchInvoice);
  }






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
  }, [filterByStatus, filterByInvoice, filteredDataForUser, state.InvoiceList?.Invoice]);





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



  const handleBack = () => {
    setUserList(true)
    setRoomDetail(false)
  }
  const handleFilterByDate = (e) => {
    const searchDate = e.target.value;
    setFilterByDate(searchDate);
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




  return (
    <div className=' p-2' >

      {userList && <>
        <div className="user ps-3 pe-3" >

          <div className="user1" >
            <h6>User List</h6>
          </div>
          <div className="user2">
            {
              searchicon &&
              <>
                <input
                  type="text"
                  value={searchItem}
                  onChange={(e) => handleInputChange(e)}
                  placeholder='Search Here'
                  class="form-control ps-4 pe-1   searchinput"
                  style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "250px", borderRadius: "5px", padding: "2px", border: "1px Solid lightgray", height: "30px", color: "#2E75EA" }}
                />
              </>
            }

            <IoIosSearch className='me-3' style={{ fontSize: 20 }}
              onClick={handleiconshow}
            />
            {
              filtericon &&
              <>
                <select value={statusfilter} onChange={(e) => handleStatusFilter(e)}
                  class="form-control ps-4   searchinput" style={{ marginRight: '20px', fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px" }}
                >
                  <option selected value="ALL"> ALL</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                </select>
              </>
            }
            {/* <IoFilterOutline class=" me-4" onClick={handleFiltershow} style={{ fontSize: 20 }} /> */}
            <button type="button" class="me-2" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} class="me-1" height="12" width="12" alt="Plus" />Add User</button>

            {/* <button type="button" class="me-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >CheckOut User</button> */}


          </div>
        </div>


        <div className="p-2">


          <Table responsive >
            <thead style={{ backgroundColor: "#F6F7FB", fontSize: 10, color: "#91969E" }}>
              <tr >
                {/* <th style={{ color: "#91969E" }} ></th> */}
                <th style={{ color: "#91969E", textAlign: "center" }} >Name</th>
                <th style={{ color: "#91969E", textAlign: "center" }} >Phone</th>
                <th style={{ color: "#91969E", textAlign: "center" }} >HostelName</th>
                <th style={{ color: "#91969E", textAlign: "center" }}>Floor</th>
                <th style={{ color: "#91969E", textAlign: "center" }} >Room</th>
                <th style={{ color: "#91969E", textAlign: "center" }} >Bed</th>
                <th style={{ color: "#91969E", textAlign: "center" }} >Receivable</th>
                <th style={{ color: "#91969E", textAlign: "center" }} >Action</th>
              </tr>
            </thead>
            <tbody className='tablebody' >

            {loading ? (
          // Render skeletons
          Array.from({ length: state?.UsersList?.Users.length || 5 }).map((_, index) => (
            <tr key={index}>
            <td><Skeleton width={80} /></td>
            <td><Skeleton width={120} /></td>
            <td><Skeleton width={120} /></td>
            <td><Skeleton width={50} /></td>
            <td><Skeleton width={50} /></td>
            <td><Skeleton width={50} /></td>
            <td><Skeleton width={100} /></td>
            <td><Skeleton width={150} /></td>
          </tr>
          ))
        ) : (
              currentItems.map((user) => (

                <tr  style={{ fontWeight: "700" }}>
    
                  <td style={{ color: "#0D99FF", fontWeight: 500, textAlign: "center", textDecoration: 'underline', cursor: 'pointer' }} onClick={() => handleRoomDetailsPage(user, user.Bed, user.Rooms, user.Floor, user.Hostel_Id)}>{user.Name}</td>
                  <td style={{ color: "black", fontWeight: 500, textAlign: "center" }}>+91 {user.Phone}</td>
                  <td style={{ color: "black", fontWeight: 500, textAlign: "center" }}>{user.HostelName}</td>
                  <td style={{ color: "black", fontWeight: 500, textAlign: "center" }}>{user.Floor}</td>
                  <td style={{ color: "black", fontWeight: 500, textAlign: "center" }}>{user.Rooms}</td>
                  <td style={{ color: "black", fontWeight: 500, textAlign: "center" }}>{user.Bed}</td>
                  <td style={{ color: "black", fontWeight: 500, textAlign: "center" }}>₹ {user.paid_advance + user.paid_rent}</td>
                  <td style={{ fontWeight: 500, textAlign: "center" }} >
                    <Button variant={user.Bed ? "outline-success" : "outline-primary"} style={{ border: user.Bed && "none" }} disabled={user.Bed} size="sm" onClick={() => { handleShowAddBed(user) }} >{user.Bed ? "Bed Assigned" : "Assign"}</Button>
                  </td>
                </tr>

))

)}


            </tbody>
          </Table>
          <div className="d-flex justify-content-center" style={{width:"100%"}}>
{currentItems.length === 0 && !loading && <h5 style={{fontSize: 12, color: "red"}}>No Data Found</h5>}
</div>
        </div>



        <div className="p-3" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
            </div>
            <Dropdown onSelect={(eventKey) => handlePageChange(parseInt(eventKey))} >
              <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
                {activePage} - {currentPage}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {generatepagenumbers().map((pageNumber) => (
                  <Dropdown.Item key={pageNumber} eventKey={pageNumber}>
                    {currentPage} - {pageNumber}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
              of <label>{currentPage}</label>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>

            <div onClick={handlePrevious} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
              Prev
            </div>
            <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
            <div onClick={handleNext} disabled={currentPage === totalPages} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
              Next
            </div>
          </div>
        </div>




      </>}


      {
        roomDetail && (
          <>
            {userDetails && userDetails.map((item, index) => (
              <div class="row d-flex g-0">
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 p-2" style={{ borderRight: "1px solid lightgray" }}>
                  <div class="row g-0 p-1">
                    <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                      <Image src={Login} roundedCircle style={{ height: "50px", width: "50px", backgroundColor: "#F6F7FB" }} />
                    </div>
                    <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                      <div class="d-block ps-1">
                        <p style={{ fontWeight: "700", textTransform: '' }} class="mb-0">{item.Name}</p>
                        <p style={{ fontSize: "10px", padding: "1px", fontWeight: 700 }}>Joining Date:{new Date(item.createdAt).toLocaleDateString('en-GB')}</p>
                      </div>



                    </div>
                    <div class="col-lg-4 offset-lg-1">
                      {/* <button type="button" class="" style={{ fontSize: "12px", backgroundColor: "white", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={() => { handleShow(item) }} ><img src={Edits} height="12" width="12" alt='Edits' /> Edit</button> */}

                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-0">
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: '700' }} class="mb-2">USER DETAIL</p>
                    </div>
                    <div className="mb-2 me-2" onClick={() => { handleShow(item) }}>
                      <img src={img2} style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <hr class="m-0 mb-2" />
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Phone No</p>
                    <p style={{ fontSize: "12px", fontWeight: 700 }}>+91 {item.Phone}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Email Id</p>
                    <p style={{ fontSize: "12px", fontWeight: 700 }}>{item.Email}</p>
                  </div>



                  <div class="d-flex justify-content-between pt-1 mb-0">
                    <p style={{ fontSize: "12px", fontWeight: '700' }} class="mb-2">ROOM DETAIL</p>
                    <div className="mb-2 me-2" onClick={() => { handleShowAddBed(item) }}>
                      <img src={img2} style={{ width: 20, height: 20 }} />
                    </div>
                  </div>
                  <hr class="m-0 mb-2" />
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Floor</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, textTransform: 'capitalize' }}> {getFloorName(item.Floor)}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Room & Bed</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, textTransform: 'capitalize' }}>{getFormattedRoomId(item.Floor, item.Rooms)} & Bed {item.Bed}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Advance Amount</p>
                    <p style={{ fontSize: "12px", fontWeight: 700 }}>₹{item.AdvanceAmount} <span className='ps-2' style={{ color: "orange" }}>{item.Status}</span> </p>
                  </div>

                  <div class="d-flex justify-content-between pt-1 mb-0">
                    <p style={{ fontSize: "12px", fontWeight: '700' }} >ADDRESS DETAIL</p>

                  </div>
                  <hr class="m-0 mb-2" />
                  <div class="d-block">
                    <p class="mb-1" style={{ fontSize: "12px", fontWeight: 500 }} >PERMANENT ADDRESS</p>
                    <p class="mb-1" style={{ fontSize: "12px", textTransform: 'capitalize' }}>{item.Address}</p>

                  </div>


                  {/* <div class="d-flex justify-content-between mt-5">
                    <p style={{ fontSize: "12px", fontWeight: '700' }} >KYC DETAIL</p>

                  </div>
                  <hr class="m-0 mb-2" /> */}

                  {/* <div className='row g-1 mt-2'>
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
                  </div> */}
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 p-2">


                  <div class="d-flex justify-content-between" style={{ backgroundColor: "", width: "100%" }}>
                    <div class="p-2" style={{ backgroundColor: "" }}>
                      <h6 style={{ fontSize: "16px" }}>Bill Payment</h6>
                    </div>
                    <div class="d-flex justify-content-between align-items-center" style={{ backgroundColor: "" }} >
                    {showLoader && <LoaderComponent />}
                      {search && <>
                        <input type="text" value={filterByInvoice} onChange={(e) => handleFilterByInvoice(e)} className='form-control form-control-sm me-2' placeholder='Search by Invoice' style={{ width: "150px", boxShadow: "none", border: "1px solid lightgray" }} /></>
                      }
                      <BsSearch class="me-2" style={{ fontSize: 20 }} onClick={handleSearch} />

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

                      {/* <button   type="button" class="" style={{ fontSize: "12px", backgroundColor: "white", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}  >Back</button> */}
                      {/* <button type="button" class="ms-2" style={{ fontSize: "12px", backgroundColor: "white", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={() => { handleShow(item) }} ><img src={Edits} height="12" width="12" alt='Edits' /> Edit</button> */}
                      <Button className="ms-2" variant="outline-secondary" onClick={handleBack} size="sm" style={{ borderRadius: '20vh', width: '100px', marginRight: '15px' }}>
                        Back
                      </Button>


                    </div>

                  </div>



                  <Table responsive>
                    <thead style={{ backgroundColor: "#F6F7FB", color: "gray", fontSize: "11px" }}>
                      <tr className="" style={{ height: "30px" }}>
                        {/* <th>Id</th> */}
                        <th>Date</th>
                        <th>Invoices#</th>
                        <th>Amount</th>
                        {/* <th>Balance Due</th> */}
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ height: "50px", fontSize: "11px" }}>
                      {currentItemsForInvoice.map((view) => (
                        <tr key={view.id}>
                          {/* <td>{view.id}</td> */}
                          <td>{new Date(view.Date).toLocaleDateString('en-GB')}</td>
                          <td>{view.Invoices}</td>
                          <td>₹{view.Amount}</td>
                          {/* <td>₹{view.BalanceDue}</td> */}
                          <td style={view.Status === "Success" ? { color: "green", fontWeight: 700 } : { color: "red", fontWeight: 700 }}>{view.Status}</td>
                          <td
                            className="justify-content-center"
                          >
                            <img src={List} height={20} width={20} alt='List' onClick={() => { handleInvoiceDetail(view) }} />
                            {/* <img
                              className="ms-1"
                              src={Edits} height={20} width={20} alt='Edits' /> */}
                          </td>
                        </tr>
                      ))}
                      {currentItemsForInvoice.length === 0 && (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                        </tr>
                      )}

                    </tbody>
                  </Table>


                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}>

                    <div onClick={handlePreviousInvoice} disabled={currentPages === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
                      Prev
                    </div>
                    <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPages} </span>
                    <div onClick={handleNextInvoice} disabled={currentPages === totalPagesFor} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
                      Next
                    </div>
                  </div>



                  <div class="d-flex justify-content-between mb-3">
                    <p style={{ fontWeight: 700 }}>Comments</p>
                    {/* <p style={{ color: "#0D99FF", fontSize: "13px", textDecoration: "underline" }}>+ Add Comment</p> */}
                  </div>




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

            ))}




          </>



        )
      }
      {
        showMenu == true ? <UserlistForm
          AfterEditHostels={AfterEditHostel}
          AfterEditFloors={AfterEditFloor}
          AfterEditRoomses={AfterEditRooms}
          AfterEditBeds={AfterEditBed}
          showMenu={showMenu} displayDetail={addBasicDetail} setShowMenu={setShowMenu} handleShow={handleShow} edit={edit} setEdit={setEdit} EditObj={EditObj} setEditObj={setEditObj} handleMenuClick={handleMenuClick} setShowForm={setShowForm} showForm={showForm} setUserClicked={setUserClicked} /> : null
      }

    </div>

  )
}

export default UserList