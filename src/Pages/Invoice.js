
import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import {  Button, Offcanvas, Form, Dropdown, FormControl } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';



const TableWithPagination = () => {
 

  const[data,setData] = useState([]);
  //offcanvas variable
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);

 const [invoiceList,setInvoiceList] = useState({
  firstName:'',
  lastName:'',
  phone:'',
  email:'',
  amount:'',
  balanceDue:'',
  dueDate:'2023-12-30'
 })


  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const state = useSelector(state=> state)  
  console.log('state',state)

  const dispatch = useDispatch()

  useEffect(()=> {
    console.log("executing useEffect")
    // dispatch({type:'USERLIST'})
    dispatch({type:'INVOICELIST'})
},[])

useEffect(()=> {
 setData(state.UsersList.Users)
},[])


  // pagination
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

//offcanvas function
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

    const filteredItems = state.InvoiceList.Invoice.filter((user) =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setData(filteredItems);
  }


const [searchicon ,setSearchicon] = useState(false);

const handleiconshow = () => {
  setSearchicon(!searchicon)
}

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

const handleSaveInvoiceList = () =>{
  console.log('save');
  dispatch({type:'ADDINVOICEDETAILS',
  payload:{Name:invoiceList.firstName +' '+ invoiceList.lastName,Phone:invoiceList.phone,Email:invoiceList.email,Amount:invoiceList.amount,BalanceDue:invoiceList.balanceDue,DueDate:invoiceList.dueDate,Status:invoiceList.balanceDue==0?"Success":"Pending"}})

  dispatch({type:'INVOICELIST'})
}

console.log("state",state);
console.log("currentItems",currentItems);

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
            
            onChange={(e)=>handleInputChange(e)}
            placeholder='Type to search'
            class="form-control ps-2 pe-1 pb-1 pt-1 searchinput"
            style={{width:'150px',marginRight:'20px'}}
            
          />
          </>
          }
            <BsSearch class=" me-4"  onClick={handleiconshow}/>
            <IoFilterOutline class=" me-4" />
            <button type="button"  onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Invoice</button>
          </div>
        </div>
        <div>

        </div>
      </div>



      <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: "69vh" }}>

<Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >Add Invoice</Offcanvas.Title>


<Offcanvas.Body>
  <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
    <div class="p-1 bd-highlight user-menu">

      <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}  >


        User Details
      </ul>
    </div>
    {/* <div class="p-2 bd-highlight">
      <ul onClick={() => setShowForm(false)}>KYC Details</ul>

    </div> */}

  </div>

  {showForm && (
    <Form>
      {/* <p style={{ textAlign: "center", fontSize: "15px", marginTop: "-30px" }}>Upload Profile</p>


      <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
        <img src={Profile} alt='user1' style={{ width: '70px', marginBottom: '-15px' }} />
        <FaPlusCircle style={{ color: 'blue', position: 'absolute', bottom: '-20px', left: '50%', transform: 'translateX(-50%)' }} />
      </div> */}

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
                value={invoiceList.phone} onChange={(e) => { setInvoiceList({ ...invoiceList, phone: e.target.value }) }}
                style={bottomBorderStyle}
              />
            </Form.Group>
          </div>
          <div className='col lg-6'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "12px" }}>Email ID</Form.Label>
              <FormControl
                type="text"
                value={invoiceList.email} onChange={(e) => { setInvoiceList({ ...invoiceList, email: e.target.value }) }}
                style={bottomBorderStyle}
              />
            </Form.Group>
          </div>
        <div className='row'>
          <div className='col lg-6'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "12px" }}>Amount</Form.Label>
              <FormControl
                type="text"
                value={invoiceList.amount} onChange={(e) => { setInvoiceList({ ...invoiceList, amount: e.target.value})}}
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

        <Button variant="white" size="sm" onClick={()=>{handleClose()}}>
          Cancel
        </Button>
        <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} 
        onClick={handleSaveInvoiceList}
        >
          Save
        </Button>

      </div>
    </Form>
  )}
</Offcanvas.Body>
</Offcanvas>



      <Table responsive >
        <thead class='pt-0' style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
          <tr style={{}}>
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
          {state.InvoiceList.Invoice.map((item) => (
            <tr key={item.id}>  
              <td style={{ color: "black", fontWeight: 500 }} >{moment(item.Date).format('DD/MM/YY')}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Invoices==null?'0.00':item.Invoices}</td>

              <td style={{ color: "#0D99FF", fontWeight: 600 }}>
              <div class="d-flex">
                  <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name.slice(0,1,0)}{item.Name.slice(0,1,0)}</p></span>
                  <div class="ms-2">
                    <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
                    <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.phoneNo}</label>
                  </div>
                </div>
                 {/* <span class="i-circle"><p style={{ fontSize: 12, color: "black" }} class="mb-0">{item.Circle}</p></span><span style={{ color: "#0D99FF", fontWeight: 600, marginLeft: 5 }}>{item.Name}</span><br></br><span style={{ color: "#0D99FF", fontWeight: 600, marginLeft: 5 }}>{item.Phone}</span> */}
                 </td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Amount}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.BalanceDue}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{moment(item.DueDate).format('DD/MM/YY')}</td>
              <td style={item.BalanceDue == 0 ? { color: "green" } : { color: "red" }}>{item.BalanceDue ==0?"Success":"Pending"}</td>
              <td class="justify-content-between"><img src={List} height="20" width="20" alt='List'/><img class="ms-1" src={Edit} height="20" width="20" alt='Edit'/></td>

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

          <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px" }}>
            Prev
          </div>
          <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
          <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px" }}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableWithPagination;
