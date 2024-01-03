import React, { useState, useEffect } from "react";
import "./UserList.css";
import { IoIosSearch } from "react-icons/io";
import { BsFilter } from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";
import img1 from '../Assets/Images/list-report.png';
import img2 from '../Assets/Images/edit.png';
import Profile from '../Assets/Images/Profile.jpg';
import { Dropdown } from 'react-bootstrap';
import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import { Edit } from "@material-ui/icons";
import Swal from 'sweetalert2';



function UserList() {

  const state = useSelector(state => state)
  console.log('state', state)
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("executing useEffect")
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
    console.log("e.target.value",e.target.value);

    
    // dispatch({ type: 'CLEAR_ERROR' })
    dispatch({type:'HOSTELDETAILLIST', payload:{hostel_Id:e.target.value}})
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
  const totalPages = Math.ceil(state.InvoiceList?.Invoice.length / itemsPerPage);
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
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
      setCurrentPage((prevPage) => prevPage === totalPages? prevPage : prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage === 1 ? prevPage:prevPage - 1);
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

    const filteredItems = state.UsersList.Users.filter((user) =>
      user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filteredItems);
  }

  const handleiconshow = () => {
    setSearchicon(!searchicon)
  }

  // const handleSaveUserlist = () => {

  //   if (firstname && lastname && Phone && Email && Address && hostel_Id && Floor && Rooms && bed && AdvanceAmount && RoomRent && BalanceDue && PaymentType) {
  //     dispatch({ type: 'ADDUSER', payload: { firstname: firstname, lastname: lastname, Phone: Phone, Email: Email, Address: Address, hostel_Id: hostel_Id, Floor: Floor, Rooms: Rooms, bed: bed, AdvanceAmount: AdvanceAmount, RoomRent: RoomRent, BalanceDue: BalanceDue, PaymentType: PaymentType, ID: edit === 'Edit' ? id : '' } })
  //     Swal.fire({
  //       icon: 'success',
  //       title: edit == 'Add' ? 'Detail Saved Successfully' : 'Detail Updated Successfully',
  //       text: 'You have been Created successfully!',
  //       confirmButtonText: 'ok'
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         setFirstname('')
  //         setLastname('')
  //         setAddress('')
  //         setPhone('')
  //         setEmail('')
  //         setHostel_Id('')
  //         setFloor('')
  //         setRooms('')
  //         setBed('')
  //         setAdvanceAmount('')
  //         setRoomRent('')
  //         setPaymentType('')
  //         setBalanceDue('')
  //       }
  //     })
     
     
  //   }
  //   else {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'please Enter AllField',
  //       confirmButtonText: 'ok'
  //     }).then((result) => {
  //       if (result.isConfirmed) {

  //       }
  //     })
  //   }

  // }
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
      if (state.UsersList?.errorMessage?.length>0) {
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

  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "-13px"
  };
  return (
    <div className='container' >
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
                class="form-control ps-2 pe-1 pb-1 pt-1 searchinput"
                style={{ width: '150px', marginRight: '20px' }}

              />
            </>
          }

          <IoIosSearch className='io'
            onClick={handleiconshow}
          />
          <BsFilter className='bs' />
          <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} class="me-1" height="12" width="12" alt="Plus" />Add User</button>

        </div>


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


                {/* <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                  <img src={Profile} alt='user1' style={{ width: '70px', marginBottom: '-15px' }} />
                  <FaPlusCircle style={{ color: 'blue', position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }} />
                </div> */}
                <div>

                  <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                    {file ? <>
                      <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '70px', marginBottom: '-15px' }} />
                    </> :
                      <img src={Profile} alt='user1' style={{ width: '70px', marginBottom: '-15px' }} />
                    }
                    <label htmlFor="imageInput" className=''>
                      <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-35px', left: '48%', height: 20, width: 20 }} />
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
                  {
                    <div>{state.UsersList.errorMessage?.length > 0 ? <label style={{ color: "red", fontSize: 18 }}>{state.UsersList.errorMessage}</label> : null}</div>
                  }
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
                <tr style={{ fontWeight: "700" }}>

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

            <div onClick={handlePrevious} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px",cursor:'pointer'}}>
              Prev
            </div>
            <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
            <div onClick={handleNext} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px",cursor:'pointer'}}>
              Next
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserList