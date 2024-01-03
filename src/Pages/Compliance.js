import React, { useState ,useEffect } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import { Button, Row, Col } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {  Offcanvas, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Profile from '../Assets/Images/Profile.jpg';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';



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



const Compliance = () => {
 

  const[data,setData] = useState([]);
  const state = useSelector(state=> state) 
  const dispatch = useDispatch()

  useEffect(()=> {
    console.log("executing useEffect")
    dispatch({type:'COMPLIANCE-LIST'})
},[])

useEffect(()=> {
 setData(state.ComplianceList.Compliance)
},[])

const [showForm, setShowForm] = useState(false);
const [isUserClicked, setUserClicked] = useState(true);
const [showMenu, setShowMenu] = useState(false);


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
  handleMenuClick();
  setShowMenu(true);
};

const handleFormclose = () => {
  handleMenuClick();
  setShowMenu(false);
}
const [id,setId] = useState('')
const [Name, setName] = useState('');
const [Phone, setPhone] = useState('');
const [Requestid, setRequestid] = useState('')
const [Roomdetail, setRoomdetail] = useState('');
const [Complainttype, setComplainttype] = useState('');
const [Assign, setAssign] = useState('');
const [showMessage, setShowMessage] = useState(false);
const [Status,setStatus] = useState('')
const [date, setdate] = React.useState(dayjs(''));


const handlePhone = (e) => {
  let phoneNo = e.target.value;
  setPhone(e.target.value)
  if (phoneNo.length === 10) {
      setPhone(phoneNo)
  }

}

useEffect(() => {
  if(showMessage){
   setShowMessage(true)
   setTimeout(() => {
    setShowMessage(false)
   }, 10000);
  } 
}, [showMessage])


const handleEdit = (item) => {
      console.log('item',item);
      setId(item.ID)
      setName(item.Name)
      setPhone(item.Phone)
      setRequestid(item.Requestid)
      setRoomdetail(item.Roomdetail) 
      setComplainttype(item.Complainttype)
      setAssign(item.Assign)
      setdate('')
      setStatus(item.Status)
      handleMenuClick();
      setShowMenu(true);
}

const handleSubmit = () => {
  if (Name && Phone && Requestid && Roomdetail && Complainttype && Assign && Status &&date) {
      dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: Name, Phone: Phone, Requestid: Requestid, Roomdetail:Roomdetail,Complainttype:Complainttype,Assign:Assign ,Status:Status,date:date,id:id} })
      setId('')
      setName('')
      setPhone('')
      setRequestid('')
      setRoomdetail('') 
      setComplainttype('')
      setAssign('')
      setdate('')
      setStatus('')
      setShowMessage(true)
      dispatch({type:'COMPLIANCE-LIST'})
  }
  else{
    Swal.fire({
      icon: "warning",
      title: 'Please Enter All Field',
      confirmButtonText: "ok"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {          
      }
    });
  }
}


const [searchItem, setSearchItem] = useState('')
const handleInputChange = (e) => { 
  const searchTerm = e.target.value;
  setSearchItem(searchTerm)

  const filteredItems = state.ComplianceList.Compliance.filter((user) =>
  user.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  setData(filteredItems);
}


const [searchicon ,setSearchicon] = useState(false);

const handleiconshow = () => {
setSearchicon(!searchicon)
}

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage === totalPages? prevPage : prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage === 1 ? prevPage:prevPage - 1);
  };

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


  return (
    <div class=' ps-3 pe-3' style={{ marginTop: "20px" }} >
      <div class="row g-0" style={{ width: "100%" }}>
        <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" >
          <div class="pt-1 ps-0" >
            <h6 style={{ fontSize: "16px" }}>Compliance</h6>
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
            <BsSearch class=" me-4" onClick={handleiconshow} />
            <IoFilterOutline class=" me-4" />
            <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Compliance</button>
          </div>
        </div>
        <div>

        </div>
        <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: '69vh' }}>
          <Offcanvas.Title style={{ background: '#2F74EB', color: 'white', paddingLeft: '20px', height: '40px' }}>
            Add User
          </Offcanvas.Title>
          <Offcanvas.Body>
            <div class="d-flex flex-row bd-highlight mb-3 item" style={{ marginTop: '-20px' }}>
              <div class="p-1 bd-highlight user-menu">
                <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
                  Compliance Details
                </ul>
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
                
                >

                  <TextField id="standard-basic" label="Name" value={Name} onChange={(e) => { setName(e.target.value) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Phone Number" value={Phone} onChange={(e) => { handlePhone(e) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Request Id" value={Requestid} onChange={(e) => { setRequestid(e.target.value) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Room Details" value={Roomdetail} onChange={(e) => { setRoomdetail(e.target.value) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Complaint Type" value={Complainttype} onChange={(e) => { setComplainttype(e.target.value) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Assign" value={Assign} onChange={(e) => { setAssign(e.target.value) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="status" value={Status} onChange={(e) => { setStatus(e.target.value) }} variant="standard" style={{ m: 1, width: '40ch' }} sx={{ '& > :not(style)': { paddingTop: "10px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
       
                    <DatePicker
                   label="date"
                   value={date}
                   onChange={(newValue) => setdate(newValue)}
                 
                                  />
                         </DemoContainer>
                       </LocalizationProvider>
                
                </Box>
                {
                            showMessage &&
                            <div ><p>We have taken your request successfuly</p></div>
                        }
                <div class="d-flex justify-content-start" style={{ marginTop: '20px' }}>
                  <Button variant="dark" size="sm" onClick={handleFormclose} style={{ borderRadius: '20vh', width: '80px',marginRight:'5px' }}>
                    Cancel
                  </Button>
                  <Button variant="outline-primary" size="sm" style={{ borderRadius: '20vh', width: '80px' }} onClick={handleSubmit}>
                    Next
                  </Button>
                </div>
              </Form>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <Table responsive>
        <thead style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
          <tr >
            <th style={{ color: "#91969E" }}>Date</th>
            <th style={{ color: "#91969E" }}>Request ID</th>
            <th style={{ color: "#91969E" }}>Name & Phone</th>
            <th style={{ color: "#91969E" }}>Room Detail</th>
            <th style={{ color: "#91969E" }}>Compliant Type</th>
            <th style={{ color: "#91969E" }}>Assign</th>
            <th style={{ color: "#91969E" }}>Status</th>
            <th style={{ color: "#91969E" }}>Action</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "10px" }}>
          {currentItems.map((item) => (
            <tr key={item.id} >
              <td style={{ color: "black", fontWeight: 500 }}>{moment(item.date).format('DD/MM/YY')}</td>
              <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Requestid}</td>
              <td>
                <div class="d-flex">
                  <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name.match(/(^\S\S?|\s\S)?/g).map(v=>v.trim()).join("").match(/(^\S|\S$)?/g).join("").toLocaleUpperCase()}</p></span>
                  <div class="ms-2">
                    <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
                    <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.Phone}</label>
                  </div>
                </div>
              </td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Roomdetail}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Complainttype}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Assign}</td>
              <td style={item.Status == "Success" ? { color: "green" } : { color: "red" }}>{item.Status}</td>
              <td class=""><img src={List} height="20" width="20" /><img class="ms-1" src={Edit} height="20" width="20" onClick={()=>handleEdit(item)}  style={{cursor:'pointer'}}/></td>
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
            <Dropdown.Menu >
              {generatePageNumbers().map((page) => (
                <Dropdown.Item key={page} eventKey={page} style={{ width: "10%" }} >
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

          <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px",cursor:'pointer'}}>
            Prev
          </div>
          <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
          <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px",cursor:'pointer'}}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compliance;