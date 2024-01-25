import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import { Button, Offcanvas, Form, Dropdown, FormControl } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';
import Profile from '../Assets/Images/Profile.jpg';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const InvoicePage = () => {

  //offcanvas style
  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "-13px"
  };

  const [data, setData] = useState([]);
  //offcanvas variable
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);

  const [file, setFile] = useState(null)
  const d = new Date();
  const [invoiceList, setInvoiceList] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    amount: '',
    balanceDue: '',
    dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
  })

  const state = useSelector(state => state)
  const [editOption, setEditOption] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'INVOICELIST' })
    setData(state.InvoiceList.Invoice)
  }, [])
  useEffect(() => {
    setData(state.InvoiceList.Invoice)
  }, [state.InvoiceList.Invoice])

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [filtericon, setFiltericon] = useState(false)

  const [statusfilter, setStatusfilter] = useState('')

  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handlePhoneNo = (e) => {
    const result = e.target.value.replace(/\D/g, '');
    const phoneError = document.getElementById("phoneError");
    setInvoiceList({ ...invoiceList, phone: result })
    if (result.length < 10) {
      phoneError.textContent = "Please put 10 digit mobile number";
    }
    else {
      phoneError.textContent = "";
    }
  }

  const handleEmailID = (e) => {
    const emailID = e.target.value;
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailID)) {
      setInvoiceList({ ...invoiceList, email: emailID }); // Corrected this line
      emailError.textContent = "Invalid email format";
    } else {
      setInvoiceList({ ...invoiceList, email: emailID }); // Set email even when valid (optional, depends on your use case)
      emailError.textContent = "";
    }

  }

  // pagination
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
  };

  //offcanvas function
  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const handleClose = () => {
    setInvoiceList({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      amount: '',
      balanceDue: '',
      dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
    })
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
  };

  const handleShow = (item) => {
    if (item.id) {
      setEditOption('Edit')
      let value = item.Name.split(" ")
      setInvoiceList({
        id: item.id,
        firstName: value[0],
        lastName: value[1],
        phone: item.phoneNo,
        email: item.EmailID,
        amount: item.Amount,
        balanceDue: item.BalanceDue == 0 ? '00' : item.BalanceDue,
        dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
      })
    }
    else {
      setEditOption('Add')
    }
    // Call handleMenuClick when "Add User" button is clicked
    handleMenuClick();
    setShowMenu(true);
  };

  // page range
  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const handlePageSelect = (event) => {
    const selectedPage = parseInt(event.target.value, 10);
    setCurrentPage(selectedPage);
  };

  const [searchItem, setSearchItem] = useState('')
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchItem != '') {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems.slice(indexOfFirstItem, indexOfLastItem))
    }
    else {
      setData(state.InvoiceList.Invoice)
    }
  }

  const [searchicon, setSearchicon] = useState(false);

  const handleiconshow = () => {
    console.log("randomNumberInRange", randomNumberInRange(1, new Date()));
    setSearchicon(!searchicon)
    setFiltericon(false)
  }


  const handleSaveInvoiceList = () => {
    const invoiceNo = randomNumberInRange(1, new Date())
    console.log("editOption == 'Add' && invoiceNo", editOption == 'Add' && invoiceNo);
    if (invoiceList.firstName && invoiceList.lastName && invoiceList.phone && invoiceList.email && invoiceList.amount && invoiceList.balanceDue && invoiceList.dueDate && invoiceList.balanceDue) {
      dispatch({
        type: 'ADDINVOICEDETAILS',
        payload: { Name: invoiceList.firstName + ' ' + invoiceList.lastName, Phone: invoiceList.phone, Email: invoiceList.email, Amount: invoiceList.amount, BalanceDue: invoiceList.balanceDue, DueDate: invoiceList.dueDate, invoiceNo: editOption == 'Add' ? invoiceNo : '', Status: invoiceList.balanceDue == 0 ? "Success" : "Pending", id: editOption === 'Edit' ? invoiceList.id : '' }
      })
      setData(state.InvoiceList.Invoice.slice(indexOfFirstItem, indexOfLastItem))
      setInvoiceList({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        amount: '',
        balanceDue: '',
        dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
      })
      Swal.fire({
        icon: "success",
        title: editOption == 'Add' ? 'Details Saved Successfully' : 'Details Updated Successfully',
        confirmButtonText: "ok"
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: 'INVOICELIST' })
          setInvoiceList({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            amount: '',
            balanceDue: '',
            dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
          })
          handleClose()

        }
      });
    }
    else {
      Swal.fire({
        icon: "warning",
        title: 'Please Enter All Field',
        confirmButtonText: "ok"
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }


  }
  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }

  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm)
    if (searchTerm == "ALL") {
      setData(state.InvoiceList.Invoice.slice(indexOfFirstItem, indexOfLastItem))
    }
    else {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }
  }

  const randomNumberInRange = (min, max) => {
    const invoice = 'SSN#' + (Math.floor(Math.random()
      * (max - min + 1)) + min);
    return invoice
  };

  return (
    <div class=' ps-3 pe-3' style={{ marginTop: "20px" }} >

      <div class="row g-0" style={{ width: "100%" }}>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" >
          <div class="pt-1 ps-0" >
            <h6 style={{ fontSize: "16px" }}>Invoices</h6>
          </div>
        </div>
        <div class="col-lg-6  offset-lg-4 col-md-6 col-sm-12 col-xs-12">
          <div class="p-1 d-flex justify-content-end align-items-center"  >

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
            <BsSearch class=" me-4" onClick={handleiconshow} />
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
            <IoFilterOutline class=" me-4" onClick={handleFiltershow} />
            <button type="button" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Invoice</button>
          </div>
        </div>
        <div>
        </div>
      </div>
      <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: "69vh" }}>
        <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >{editOption == 'Add' ? "Add Invoice" : "Edit Invoice"}</Offcanvas.Title>
        <Offcanvas.Body>
          <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
            <div class="p-1 bd-highlight user-menu">
              <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
                User Details
              </ul>
            </div>
          </div>
          {showForm && (
            <Form>
              <p style={{ textAlign: 'center', marginTop: '-20px' }}>Upload Profile</p>
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
              <div className='container' style={{ marginTop: "30px" }}>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>First Name</Form.Label>
                      <FormControl
                        type="text"
                        value={invoiceList.firstName} onChange={(e) => { setInvoiceList({ ...invoiceList, firstName: e.target.value }) }}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Last Name</Form.Label>
                      <FormControl
                        type="text"
                        value={invoiceList.lastName} onChange={(e) => { setInvoiceList({ ...invoiceList, lastName: e.target.value }) }}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='col lg-6'>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: "12px" }}>Phone Number</Form.Label>
                    <FormControl
                      type="text"
                      value={invoiceList.phone}
                      onChange={(e) => { handlePhoneNo(e) }}
                      style={bottomBorderStyle}
                    />
                  </Form.Group>
                  <p id='phoneError' style={{ color: 'red', fontSize: 14 }}></p>
                </div>
                <div className='col lg-6'>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: "12px" }}>Email ID</Form.Label>
                    <FormControl
                      type="email"
                      value={invoiceList.email}
                      onChange={(e) => { handleEmailID(e) }}
                      style={bottomBorderStyle}
                    />
                  </Form.Group>
                  <p id='emailError' style={{ color: 'red', fontSize: 14 }}></p>
                </div>
                <div className='row'>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Amount</Form.Label>
                      <FormControl
                        type="text"
                        value={invoiceList.amount} onChange={(e) => { setInvoiceList({ ...invoiceList, amount: e.target.value }) }}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Balance Due</Form.Label>
                      <FormControl
                        type="text"
                        value={invoiceList.balanceDue} onChange={(e) => { setInvoiceList({ ...invoiceList, balanceDue: e.target.value }) }}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center" style={{ marginTop: "30px" }} >

                <Button variant="white" size="sm" onClick={() => { handleClose() }}>
                  Cancel
                </Button>
                <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }}
                  onClick={handleSaveInvoiceList}
                >
                  {editOption === 'Add' ? "Save" : "Update"}
                </Button>
              </div>
            </Form>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <Table responsive >
        <thead class='pt-0' style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
          <tr style={{}}>
            <th style={{ color: "#91969E" }} >ID</th>
            <th style={{ color: "#91969E" }} >Date</th>
            <th style={{ color: "#91969E" }} >Invoices#</th>
            <th style={{ color: "#91969E" }} >Name & Phone</th>
            <th style={{ color: "#91969E" }} >Amount</th>
            <th style={{ color: "#91969E" }} >Balance Due</th>
            <th style={{ color: "#91969E" }} >Due Date</th>
            <th style={{ color: "#91969E" }} >Status</th>
            <th style={{ color: "#91969E" }} >Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "10px" }}>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td style={{ color: "black", fontWeight: 500 }} >{item.id}</td>
              <td style={{ color: "black", fontWeight: 500 }} >{moment(item.Date).format('DD/MM/YY')}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Invoices == null || item.Invoices == '' ? '0.00' : item.Invoices}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}>
                <div class="d-flex">
                  {/* <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name && item.Name.split(" ")[0].slice(0, 1, 0)}{item.Name.split(" ")[1].slice(0, 1, 0)}</p></span> */}
                  <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name && item.Name.split(" ")[0].slice(0, 1, 0).toUpperCase()}{item.Name.split(" ")[1] && item.Name.split(" ")[1].slice(0, 1).toUpperCase()}</p></span>

                  <div class="ms-2">
                    <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
                    <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.phoneNo}</label>
                  </div>
                </div>
              </td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Amount}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.BalanceDue}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{moment(item.DueDate).format('DD/MM/YY')}</td>
              <td style={item.BalanceDue == 0 ? { color: "green" } : { color: "red" }}>{item.BalanceDue == 0 ? "Success" : "Pending"}</td>
              <td class="justify-content-between"><img src={List} height="20" width="20" alt='List' /><img class="ms-1" src={Edit} height="20" width="20" alt='Edit' onClick={() => { handleShow(item) }} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
          </div>
          <Dropdown onSelect={(eventKey) => handlePageSelect(parseInt(eventKey))} >
            <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
              {currentPage} - {currentPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {generatePageNumbers().map((page) => (
                <Dropdown.Item key={page} eventKey={page}>
                  {currentPage} - {page}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
            of <label>{currentPage}</label>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
            Prev
          </div>
          <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
          <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
