import React, { useState, useEffect } from "react";
import "./UserList.css";
import { IoIosSearch } from "react-icons/io";
import { IoFilterOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import img1 from '../Assets/Images/list-report.png';
import img2 from '../Assets/Images/edit.png';
import Profile from '../Assets/Images/Profile.jpg';
import { Dropdown } from 'react-bootstrap';
import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import List from '../Assets/Images/list-report.png';
import Edits from '../Assets/Images/edit.png';
import Login from '../Assets/Images/login.jpg'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import Image from 'react-bootstrap/Image';



function UserList() {

  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "-13px"
  };

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'USERLIST' })
    dispatch({ type: 'HOSTELLIST' })

  }, [])

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUserClicked, setUserClicked] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [searchicon, setSearchicon] = useState(false);
  const [file, setFile] = useState(null)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [Phone, setPhone] = useState('')
  const [hostel_Id, setHostel_Id] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [bed, setBed] = useState('')
  const [RoomRent, setRoomRent] = useState('')
  const [BalanceDue, setBalanceDue] = useState('')
  const [PaymentType, setPaymentType] = useState('')
  const [AdvanceAmount, setAdvanceAmount] = useState('')
  const [Address, setAddress] = useState('')
  const [Email, setEmail] = useState('')
  const [edit, setEdit] = useState('')
  const [id, setId] = useState('')
  const [filtericon, setFiltericon] = useState(false)

  const [statusfilter, setStatusfilter] = useState('')


  const handleFirstName = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setFirstname(e.target.value)
  }
  const handleLastName = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setLastname(e.target.value)
  }
  const handlePhone = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setPhone(e.target.value)
  }
  const handleHostelId = (e) => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: e.target.value } })
    setHostel_Id(e.target.value)
  }
  const handleFloor = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setFloor(e.target.value)
  }
  const handleRooms = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setRooms(e.target.value)
  }
  const handleBed = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setBed(e.target.value)
  }
  const handleRoomRent = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setRoomRent(e.target.value)
  }
  const handleBalanceDue = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setBalanceDue(e.target.value)
  }
  const handlePaymentType = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setPaymentType(e.target.value)
  }
  const handleAdvanceAmount = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setAdvanceAmount(e.target.value)
  }
  const handleAddress = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setAddress(e.target.value)
  }
  const handleEmail = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setEmail(e.target.value)
  }

  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const handleClose = () => {
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
  };
  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];

    if (fileimgage) {
      setFile(fileimgage);
    }
  };
  const handleShow = (u) => {
    handleMenuClick();
    setShowMenu(true);
    console.log("u", u);
    if (u.ID) {
      let value = u.Name.split(" ")
      setEdit('Edit')
      setId(u.ID)
      setFirstname(value[0])
      setLastname(value[1])
      setAddress(u.Address)
      setPhone(u.Phone)
      setEmail(u.Email)
      setHostel_Id(u.Hostel_Id)
      setFloor(u.Floor)
      setRooms(u.Rooms)
      setBed(u.Bed)
      setAdvanceAmount(u.AdvanceAmount)
      setRoomRent(u.RoomRent)
      setPaymentType(u.PaymentType)
      setBalanceDue(u.BalanceDue)
    }
    else {
      setEdit('Add')
    }
  };

  useEffect(() => {
    setFilteredData(state.UsersList.Users);
  }, [state.UsersList.Users])

  const handleNext = () => {
    if (currentPage < 10) {
      setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
    }

  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  }
  const handleFiltershow = () => {
    setFiltericon(!filtericon)
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
  const handleSaveUserlist = () => {
    // Assuming these variables are coming from the component's state
    // You should check if they are defined and not empty before proceeding
    if (
      firstname &&
      lastname &&
      Phone &&
      Email &&
      Address &&
      hostel_Id &&
      Floor &&
      Rooms &&
      bed &&
      AdvanceAmount &&
      RoomRent &&
      BalanceDue &&
      PaymentType
    ) {
      dispatch({
        type: 'ADDUSER',
        payload: {
          firstname: firstname,
          lastname: lastname,
          Phone: Phone,
          Email: Email,
          Address: Address,
          hostel_Id: hostel_Id,
          Floor: Floor,
          Rooms: Rooms,
          bed: bed,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          ID: edit === 'Edit' ? id : ''
        },
      });

      // Checking for error message in the UsersList state
      if (state.UsersList?.errorMessage?.length > 0) {
        console.log("check");
        Swal.fire({
          icon: 'warning',
          title: state.UsersList.errorMessage,
          confirmButtonText: 'Ok',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: edit === 'Add' ? 'Detail Send Successfully' : 'Detail Updated Successfully',
          text: 'You have been Created successfully!',
          confirmButtonText: 'ok',
        }).then((result) => {
          if (result.isConfirmed) {
            // Resetting form fields after successful save/update
            setFirstname('');
            setLastname('');
            setAddress('');
            setPhone('');
            setEmail('');
            setHostel_Id('');
            setFloor('');
            setRooms('');
            setBed('');
            setAdvanceAmount('');
            setRoomRent('');
            setPaymentType('');
            setBalanceDue('');
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'please Enter All Fields',
        confirmButtonText: 'ok',
      });
    }
  };

  // Roomdetails here 



  const [roomDetail, setRoomDetail] = useState(false)
  const [userList, setUserList] = useState(true)
  const [clickedUserData, setClickedUserData] = useState([]);


  const handleRoomDetailsPage = (userData) => {
    console.log("Clicked row data:", userData);
    const clickedUserDataArray = Array.isArray(userData) ? userData : [userData];
    setRoomDetail(true)
    setUserList(false)
    setClickedUserData(clickedUserDataArray);
  }



  const [activeStep, setActiveStep] = React.useState(0);
  const [search, setSearch] = useState(false)
  const [isOpenTab, setIsOpenTab] = useState(true)


  console.log('state for Room details', state)



  const handleOpen = () => {
    setIsOpenTab(!isOpenTab)
  }





  const handleSearch = () => {
    setSearch(!search)
  }




  useEffect(() => {

    dispatch({ type: 'BILLPAYMENTHISTORY' })


  }, [])


  const [filteredDatas, setFilteredDatas] = useState([]);


  const billPaymentHistory = state.UsersList.billPaymentHistory;

  const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
  console.log("invoicePhones:", invoicePhones);

  


  console.log("selected UserData", clickedUserData)



  useEffect(() => {
    if (clickedUserData.length > 0 && clickedUserData[0].Phone) {
      const userPhone = clickedUserData[0].Phone;
      console.log("userPhone", userPhone);

      const invoicePhones = billPaymentHistory.map((item) => item.invoicePhone);
      const filteredDataForBillPayment = billPaymentHistory.filter((item) => item.invoicePhone === userPhone);
      console.log("filteredDataForBillPayment", filteredDataForBillPayment);
      setFilteredDatas(filteredDataForBillPayment);
    }
  }, [clickedUserData, billPaymentHistory]);


  console.log("filtered Datas", filteredDatas)
  

  const getFloorName = (Floor) => {
    if (Floor === "1") {
      return 'Ground Floor';
    } else if (Floor === "2") {
      return '1st Floor';
    } else if (Floor === "3") {
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
    console.log("floor is ", floor)
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


  const handleBack = () =>{
    setUserList(true)
    setRoomDetail(false)
  }




  return (
    <div className='container p-2' >

      {userList && <>
        <div className="user" >

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
                  placeholder='Type to search'
                  class="form-control ps-4 pe-1   searchinput"
                  style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}

                />
              </>
            }

            <IoIosSearch className='io'
              onClick={handleiconshow}
            />
            {
              filtericon &&
              <>
                <select value={statusfilter} onChange={(e) => handleStatusFilter(e)} class="form-control ps-4   searchinput" style={{ marginRight: '20px', fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px" }}
                >
                  <option selected value="ALL"> ALL</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                </select>
              </>
            }
            <IoFilterOutline class=" me-4" onClick={handleFiltershow} />
            <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} class="me-1" height="12" width="12" alt="Plus" />Add User</button>

          </div>




        </div>
        <div class="table-responsive" style={{ width: "100%" }} >
          <table className='table'>
            <thead style={{ backgroundColor: "#F6F7FB", fontSize: 10, color: "#91969E" }}>
              <tr >
                <th style={{ color: "#91969E" }} >Name & Phone</th>
                <th style={{ color: "#91969E" }} >EmailId</th>
                <th style={{ color: "#91969E" }} >Address</th>
                <th style={{ color: "#91969E" }}>Floor</th>
                <th style={{ color: "#91969E" }} >Room & Bed</th>
                <th style={{ color: "#91969E" }} >AdvanceAmount</th>
                <th style={{ color: "#91969E" }} >Room Rent</th>
                <th style={{ color: "#91969E" }} >Balance Due</th>
                <th style={{ color: "#91969E" }} >Payment Type</th>
                <th style={{ color: "#91969E" }} >Status</th>
                <th style={{ color: "#91969E" }} >Action</th>
              </tr>
            </thead>
            <tbody className='tablebody'>


              {currentItems.map((u) => {
                return (
                  <tr style={{ fontWeight: "700" }} onClick={()=>handleRoomDetailsPage(u)}>

                    <td><div style={{ display: 'flex', flexDirection: "row" }}>
                      <div>
                        <span class="i-circle"><p style={{ fontSize: 12, color: "black" }}>{u.Circle}</p></span>
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <label style={{ color: "#0D99FF", fontWeight: 600 }}>{u.Name}</label><br />
                        <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {u.Phone}</label>
                      </div>
                    </div></td>
                    <td style={{ color: "black", fontWeight: 500 }}>{u.Email}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{u.Address}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{u.Floor}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{u.Rooms}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{u.AdvanceAmount}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>₹ {u.RoomRent}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>₹ {u.BalanceDue}</td>
                    <td style={{ color: "black", fontWeight: 500 }}>{u.PaymentType}<MdExpandMore style={{ fontSize: 15 }} /></td>

                    <td style={u.Status == "Success" ? { color: "green" } : { color: "red" }}>{u.Status}</td>
                    <td><img src={img1} className='img1' alt="img1" /><img src={img2} className='img1 ms-1' alt="img1" onClick={() => { handleShow(u) }} /></td>

                  </tr>
                );
              })}
            </tbody>
          </table>



          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

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
              <div onClick={handleNext} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
                Next
              </div>
            </div>
          </div>
        </div>
      </>}

      <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: "69vh" }}>

        <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >
          {edit === 'Add' ? "Add User" : "EditUser"}
        </Offcanvas.Title>


        <Offcanvas.Body>
          <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
            <div class="p-1 bd-highlight user-menu">

              <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}  >


                User Details
              </ul>
            </div>
            <div class="p-2 bd-highlight">
              <ul onClick={() => setShowForm(false)}>KYC Details</ul>

            </div>

          </div>

          {showForm && (
            <Form>
              <p style={{ textAlign: "center", fontSize: "15px", marginTop: "-30px" }}>Upload Profile</p>
              <div>
                <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                  {file ? <>
                    <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                  </> :
                    <img src={Profile} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                  }
                  <label htmlFor="imageInput" className=''>
                    <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-5px', left: '48%', height: 20, width: 20 }} />
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    id="imageInput"
                    onChange={handleImageChange}
                    style={{ display: "none" }} />
                </div>
              </div>

              <div className='container' style={{ marginTop: "30px" }}>
                <div>
                  {state.UsersList.errorMessage?.length > 0 ? (
                    <div>
                      <label style={{ color: 'red', fontSize: 18 }}>{state.UsersList.errorMessage}</label>
                      {setTimeout(() => {
                        dispatch({
                          type: 'CLEAR_ERROR_MESSAGE',  // Add an action to clear the error message in your reducer
                        });
                      }, 5000)}
                    </div>
                  ) : null}
                </div>

                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>First Name</Form.Label>
                      <FormControl
                        type="text"
                        value={firstname} onChange={(e) => handleFirstName(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Last Name</Form.Label>
                      <FormControl
                        type="text"
                        value={lastname} onChange={(e) => handleLastName(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Phone Number</Form.Label>
                      <FormControl
                        type="text"
                        value={Phone} onChange={(e) => handlePhone(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Email Id</Form.Label>
                      <FormControl
                        type="text"

                        value={Email} onChange={(e) => handleEmail(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Address</Form.Label>
                      <FormControl
                        type="text"
                        value={Address} onChange={(e) => handleAddress(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Label style={{ fontSize: "12px" }}>Select PG</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={bottomBorderStyle}
                      value={hostel_Id} onChange={(e) => handleHostelId(e)}>
                      <option></option>
                      {
                        state.UsersList?.hostelList?.map((item) => {
                          return (
                            <>

                              <option value={item.id}>{item.Name}</option>
                            </>
                          )
                        })
                      }

                    </Form.Select>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col lg-4'>
                    <Form.Label style={{ fontSize: "12px" }}>Select Floor</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={bottomBorderStyle}
                      value={Floor} onChange={(e) => handleFloor(e)}>
                      <option>Selected Floor</option>
                      {
                        state.UsersList?.hosteldetailslist?.map((item) => {
                          return (
                            <>

                              <option>{item.Floor_Id}</option>
                            </>
                          )
                        })
                      }


                    </Form.Select>
                  </div>
                  <div className='col lg-4'>
                    <Form.Label style={{ fontSize: "12px" }}>Select Room</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={bottomBorderStyle}
                      value={Rooms} onChange={(e) => handleRooms(e)}>
                      <option>Selected Room</option>
                      {
                        state.UsersList?.hosteldetailslist?.map((item) => {
                          return (
                            <>

                              <option>{item.Room_Id}</option>
                            </>
                          )
                        })
                      }
                    </Form.Select>
                  </div>
                  <div className='col lg-4'>
                    <Form.Label style={{ fontSize: "12px" }}>Select Bed</Form.Label>
                    <Form.Select aria-label="Default select example"
                      style={bottomBorderStyle}
                      value={bed} onChange={(e) => handleBed(e)}>
                      <option>Selected Beds</option>
                      {
                        state.UsersList?.hosteldetailslist?.map((item) => {
                          return (
                            <>

                              <option>{item.Number_Of_Beds}</option>
                            </>
                          )
                        })
                      }
                    </Form.Select>
                  </div>

                </div>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px", marginTop: "15px" }}>Advance Amount</Form.Label>
                      <FormControl
                        type="text"
                        value={AdvanceAmount} onChange={(e) => handleAdvanceAmount(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>

                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px", marginTop: "15px" }}>Room Rent (Monthly)</Form.Label>
                      <FormControl
                        type="text"
                        value={RoomRent} onChange={(e) => handleRoomRent(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px", marginTop: "15px" }}>PaymentType</Form.Label>
                      <FormControl
                        type="text"
                        value={PaymentType} onChange={(e) => handlePaymentType(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>

                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px", marginTop: "15px" }}>BalanceDue</Form.Label>
                      <FormControl
                        type="text"
                        value={BalanceDue} onChange={(e) => handleBalanceDue(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>

              </div>


              <hr />
              <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

                <Button variant="white" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} onClick={handleSaveUserlist}>
                  {edit === 'Add' ? "save" : "update"}

                </Button>

              </div>
            </Form>
          )}
        </Offcanvas.Body>
      </Offcanvas>


      {
        roomDetail && (
          <>


            {clickedUserData && clickedUserData.map((item, index) => (

              <div class="row d-flex g-0">
                <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 p-2" style={{ borderRight: "1px solid lightgray" }}>
                  <div class="row g-0 p-1">
                    <div className='col-lg-2 col-md-12 col-sm-12 col-xs-12'>
                      <Image src={Login} roundedCircle style={{ height: "45px", width: "45px", backgroundColor: "#F6F7FB" }} />
                    </div>
                    <div className='col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                      <div class="d-block ps-1">
                        <p style={{ fontWeight: "700", textTransform: 'capitalize' }} class="mb-0">{item.Name}</p>
                        <p style={{ fontSize: "10px", padding: "1px", fontWeight: 700 }}>Joining Date:{new Date(item.createdAt).toLocaleDateString('en-GB')}</p>
                      </div>

                    </div>
                    <div class="col-lg-4 offset-lg-1">
                      <button type="button" class="" style={{ fontSize: "12px", backgroundColor: "white", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={() => { handleShow(item) }} ><img src={Edits} height="12" width="12" alt='Edits' /> Edit</button>

                    </div>
                  </div>
                  <div class="d-flex justify-content-between mb-0">
                    <p style={{ fontSize: "12px", fontWeight: '700' }} class="mb-2">USER DETAIL</p>

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

                  </div>
                  <hr class="m-0 mb-2" />
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Floor</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, textTransform: 'capitalize' }}> {getFloorName(item.Floor)}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Room & Bed</p>
                    <p style={{ fontSize: "12px", fontWeight: 700, textTransform: 'capitalize' }}>{getFormattedRoomId(item.Floor, item.Rooms)}</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '500', color: "gray" }}>Advance Amount</p>
                    <p style={{ fontSize: "12px", fontWeight: 700 }}>₹{item.AdvanceAmount} <span className='ps-2' style={{ color: "orange" }}>{item.Status}</span> </p>
                  </div>

                  <div class="d-flex justify-content-between pt-1 mb-0">
                    <p style={{ fontSize: "12px", fontWeight: '700' }} >ADDRESS DETAIL</p>

                    {/* <img src={Edits} style={{ height: "18px", width: "18px" }} alt='Edits' /> */}
                  </div>
                  <hr class="m-0 mb-2" />
                  <div class="d-block">
                    <p class="mb-1" style={{ fontSize: "12px", fontWeight: 500 }} >PERMANENT ADDRESS</p>
                    <p class="mb-1" style={{ fontSize: "12px", textTransform: 'capitalize' }}>{item.Address}</p>

                  </div>

                  <div class="d-flex">
                    <p style={{ color: "#0D99FF", fontSize: "13px", textDecoration: "underline" }}> + Add Additional Address</p>
                  </div>
                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px", fontWeight: '700' }} >KYC DETAIL</p>
                    {/* <img src={Edits} style={{ height: "18px", width: "18px" }} alt='Edits' /> */}
                  </div>
                  <hr class="m-0 mb-2" />

                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px" }}>Aadhar Card  No</p>
                    <p style={{ fontSize: "12px" }}>2354 5689 ** **</p>
                    <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                  </div>

                  <div class="d-flex justify-content-between">
                    <p style={{ fontSize: "12px" }}>Pan Card  No</p>
                    <p style={{ fontSize: "12px" }}>AGD2562**</p>
                    <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <p style={{ fontSize: "12px" }}>licence</p>
                    <p style={{ fontSize: "12px" }}>TN52 071892****</p>
                    <p style={{ color: "#63f759", fontSize: "12px" }}>Verified</p>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 p-2">
                  <div class="d-flex justify-content-between" style={{ backgroundColor: "", width: "100%" }}>
                    <div class="p-2" style={{ backgroundColor: "" }}>
                      <h6 style={{ fontSize: "16px" }}>Bill Payment</h6>
                    </div>
                    <div class="d-flex justify-content-center align-items-center" style={{ backgroundColor: "" }} >

                      {search && <><input type="text" className='form-control me-2' placeholder='Search Here' style={{ boxShadow: "none", border: "1px solid lightgray" }} /></>}
                      <BsSearch class="me-2" style={{ fontSize: 20 }} onClick={handleSearch} />
                      <IoFilterOutline class="me-2" style={{ fontSize: 18 }} />
                      <button className="btn btn-primary  w-75 d-flex jistify-content-center align-items-center" onClick={handleBack}><p className="m-0">Back to User</p></button>
                    </div>
                   
                  </div>



                  <Table responsive>
                    <thead style={{ backgroundColor: "#F6F7FB", color: "gray", fontSize: "11px" }}>
                      <tr className="" style={{ height: "30px" }}>
                        <th>Date</th>
                        <th>Invoices#</th>
                        <th>Amount</th>
                        <th>Balance Due</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody style={{ height: "50px", fontSize: "11px" }}>
                      {filteredDatas.length > 0 ? (
                        filteredDatas.map((view) => (
                          <tr key={view.Invoices}>
                            <td>{new Date(view.invDate).toLocaleDateString('en-GB')}</td>
                            <td>{view.Invoices}</td>
                            <td>₹{view.invAmount}</td>
                            <td>₹{view.invBalance}</td>
                            <td style={view.invStatus === "Success" ? { color: "green", fontWeight: 700 } : { color: "red", fontWeight: 700 }}>{view.invStatus}</td>
                            <td className="justify-content-between">
                              <img src={List} height="20" width="20" alt='List' />
                              <img className="ms-1" src={Edits} height="20" width="20" alt='Edits' />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>





                  <div class="d-flex justify-content-between mb-">
                    <p style={{ fontWeight: 700 }}>Comments</p>
                    <p style={{ color: "#0D99FF", fontSize: "13px", textDecoration: "underline" }}>+ Add Comment</p>
                  </div>



                  <div class="row" style={{ marginTop: 30 }}>

                    <div class="col-lg-3 offset-lg-1 col-md-12 col-xs-12 d-flex justify-content-center align-items-center" style={{ backgroundColor: "", }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: '', height: "" }}>
                        <Stepper activeStep={activeStep} orientation="vertical" style={{ color: "#2F74EB", height: "" }}>
                          <Step sx={{ color: "#2F74EB" }} style={{ position: "relative" }} >
                            <div class="d-flex justify-content-center align-items-center" style={{ height: "25px", width: "25px", border: "1px solid #2F74EB", borderRadius: "50px" }}>
                              <MapsUgcRoundedIcon style={{ color: "#2F74EB", height: "15px", width: "15px" }} />
                            </div>
                            <div style={{ position: "absolute", left: -100, top: 0 }}>
                              <p class="mb-0" style={{ color: "black", fontSize: '11px' }}>05-01-2023</p>
                              <p style={{ color: "black", fontSize: '11px' }}>07.23PM</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: "absolute", left: 50, top: -30 }}>
                              <div className="pop-overs" style={{ padding: "20px", borderWidth: 1, borderColor: '#888888', borderStyle: 'solid', display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative', width: "70vh", borderRadius: 5 }}>
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
                              <div style={{ position: "absolute", left: -100, top: 0 }}>
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

    </div>

  )
}

export default UserList