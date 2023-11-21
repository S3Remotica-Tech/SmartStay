import React, { useState, useEffect } from "react";
import "./UserList.css";
import { IoIosSearch } from "react-icons/io";
import { BsFilter, BsPlusCircleFill } from "react-icons/bs";
import { MdExpandMore } from "react-icons/md";
import img1 from '../Assets/Images/list-report.png';
import img2 from '../Assets/Images/edit.png';
import Profile from '../Assets/Images/Profile.jpg';
import Createbutton from '../Assets/Images/Create-button.png';
import ReactPaginate from 'react-paginate';
import { Pagination, Dropdown } from 'react-bootstrap';
import { Button, Offcanvas, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Plus from '../Assets/Images/Create-button.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const currencies = [
  {
    value: 'USD',
    label: 'Ground Floor',
  },
  {
    value: 'EUR',
    label: 'GOO5',
  },
  {
    value: 'BTC',
    label: 'BO2',
  },

]


function UserList() {

  const state = useSelector(state=> state)  
  console.log('state',state)

  const dispatch = useDispatch()

  useEffect(()=> {
    console.log("executing useEffect")
    dispatch({type:'USERLIST'})
},[])

  const [showMenu, setShowMenu] = useState(false);



  const totalPages = 10;
  const [activePage, setActivePage] = useState(1);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);



  const [showForm, setShowForm] = useState(false);


  const [isUserClicked, setUserClicked] = useState(true);

  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const handleClose = () => {
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
  };

  const handleShow = () => {
    // Call handleMenuClick when "Add User" button is clicked
    handleMenuClick();
    setShowMenu(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };



  const itemsPerPage = 7;
  useEffect(() => {
    setFilteredData(state.UsersList.Users);
  }, [])


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterChange = (filterValue) => {
    setCurrentPage(1);
  };

  const handleNext = () => {
    if (currentPage < 10) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
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









  return (
    <div className='container' >
      <div className="user" >

        <div className="user1" >
          <h6>User List</h6>
        </div>
        <div className="user2">
          <IoIosSearch className='io' />
          <BsFilter className='bs' />
          <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} class="me-1" height="12" width="12" />Add User</button>

        </div>



        <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: '69vh' }}>
          <Offcanvas.Title style={{ background: '#2F74EB', color: 'white', paddingLeft: '20px', height: '40px' }}>
            Add User
          </Offcanvas.Title>
          <Offcanvas.Body>
            <div class="d-flex flex-row bd-highlight mb-3 item" style={{ marginTop: '-20px' }}>
              <div class="p-1 bd-highlight user-menu">
                <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
                  User Details
                </ul>
              </div>
              <div class="p-2 bd-highlight">
                <ul onClick={() => setShowForm(false)}>KYC Details</ul>
              </div>
            </div>

            {showForm && (
              <Form>
                <p style={{ textAlign: 'center', marginTop: '-20px' }}>Upload Profile</p>
                <div class="d-flex justify-content-center">
                  <img src={Profile} alt="Profile" style={{ width: '100px', alignItems: 'center', marginTop: '-18px' }} />
                </div>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '22ch' },
                  }}
                // noValidate
                // autoComplete="off"
                >

                  <TextField id="standard-basic" label="First Name" variant="standard" sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Last Name" variant="standard" sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Phone Number" variant="standard" sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Email Id" variant="standard" sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Address" variant="standard" style={{ m: 1, width: '46ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    //   helperText="Please select your currency"
                    variant="standard"
                    style={{ m: 1, width: '14ch' }}
                    sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="EUR"
                    //   helperText="Please select your currency"
                    variant="standard"
                    style={{ m: 1, width: '14ch' }}
                    sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Select"
                    defaultValue="ER"
                    //   helperText="Please select your currency"
                    variant="standard"
                    style={{ m: 1, width: '14ch' }}
                    sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField id="standard-basic" label="Advance Amount" variant="standard" sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Room Rent(Monthly)" variant="standard" sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                </Box>
                <hr />
                <div class="d-flex justify-content-end" style={{ marginTop: '20px' }}>
                  <Button variant="white" size="sm">
                    Cancel
                  </Button>
                  <Button variant="outline-primary" size="sm" style={{ borderRadius: '20vh', width: '80px' }}>
                    Next
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
              <th style={{ color: "#91969E" }}>Floor</th>
              <th style={{ color: "#91969E" }} >Room & Bed</th>
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
                  <td style={{ color: "black", fontWeight: 500 }}>{u.Floor}</td>
                  <td style={{ color: "black", fontWeight: 500 }}>{u.Rooms}</td>
                  <td style={{ color: "black", fontWeight: 500 }}>₹ {u.RoomRent}</td>
                  <td style={{ color: "black", fontWeight: 500 }}>₹ {u.BalanceDue}</td>
                  <td style={{ color: "black", fontWeight: 500 }}>{u.PaymentType}<MdExpandMore style={{ fontSize: 15 }} /></td>
                  <td style={u.UserListStatus == "Success" ? { color: "green" } : { color: "red" }}>{u.UserListStatus}</td>
                  <td><img src={img1} className='img1' /><img src={img2} className='img1 ms-1' /></td>
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

            <div onClick={handlePrevious} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px" }}>
              Prev
            </div>
            <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
            <div onClick={handleNext} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px" }}>
              Next
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList