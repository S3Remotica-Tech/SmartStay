import React, { useState, useEffect } from 'react';
import { Table, Dropdown } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import { Button } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Offcanvas, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Profile from '../Assets/Images/Profile.jpg';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Compliance = () => {

  useEffect(() => {
    dispatch({ type: 'COMPLIANCE-LIST' })
  }, [])

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [data, setData] = useState(state.ComplianceList.Compliance);

  useEffect(() => {
    setData(state.ComplianceList.Compliance)
  }, [state.ComplianceList.Compliance])

  const [id, setId] = useState('')
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Requestid, setRequestid] = useState('')
  const [Complainttype, setComplainttype] = useState('');
  const [description,setDescription] = useState('')
  const [Assign, setAssign] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [Status, setStatus] = useState('')
  const [date, setDate] = useState();
  const [editbtn, setEditbtn] = useState(false)

  const [hostel_Id, setHostel_Id] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [searchItem, setSearchItem] = useState('');
  const [searchicon, setSearchicon] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [file, setFile] = useState(null)
  const [filtericon, setFiltericon] = useState(false)
  const [statusfilter, setStatusfilter] = useState('')



  useEffect(() => {
     dispatch({ type: 'HOSTELLIST' })
  }, [])

  useEffect(() => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: hostel_Id } })
    console.log("Updated Floor:", Floor);
  }, [Floor]);
    const [hostelname,setHostelName] = useState('')
    const handleHostelId = (e) => {
    console.log("e.target.value", e.target.value);
    const selectedHostelId = e.target.value;
    const selectedHostel = state.UsersList?.hostelList?.find(item => item.id == selectedHostelId);
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: selectedHostelId } });
    setHostel_Id(selectedHostelId);
    console.log("selectedHostel", selectedHostel);
    setHostelName(selectedHostel ? selectedHostel.Name : '');
  };
  
  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }
  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm)
    if (searchTerm == "ALL") {
      setData(state.ComplianceList.Compliance)
    }
    else {
      const filteredItems = state.ComplianceList.Compliance.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }
  }

  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };

  const handleClose = () => {
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
    setId('')
    setName('')
    setPhone('')
    setRequestid('')
    setComplainttype('')
    setAssign('')
    setDescription('')
    setDate('')
    setHostel_Id('')
    setFloor('')
    setRooms('')
    setStatus('')
  };

  const handleShow = () => {
    handleMenuClick();
    setShowMenu(true);
    setEditbtn(false)
  };

  const handleFormclose = () => {
    handleMenuClick();
    setShowMenu(false);
    setId('')
    setName('')
    setPhone('')
    setRequestid('')
    setComplainttype('')
    setAssign('')
    setDescription('')
    setDate('')
    setStatus('')
    setHostel_Id('')
    setFloor('')
    setRooms('')
  }

  const handlePhone = (e) => {
    let phoneNo = e.target.value;
    setPhone(e.target.value)
    if (phoneNo.length === 10) {
      setPhone(phoneNo)
    }

  }

  console.log("state",state);

  useEffect(() => {
    if (showMessage) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      }, 10000);
    }
  }, [showMessage])


  const handleEdit = (item) => {
    setEditbtn(true)
    setId(item.ID)
    setName(item.Name)
    setPhone(item.Phone)
    setRequestid(item.Requestid)
    setComplainttype(item.Complainttype)
    setAssign(item.Assign)
    setDescription(item.Description)
    setDate('')
    setStatus(item.Status)
    setHostel_Id(item.Hostel_id)
    setFloor(item.Floor_id)
    setRooms(item.Room)
    handleMenuClick();
    setShowMenu(true);
  }

  const handleSubmit = () => {
    if (Name && Phone && Requestid && Complainttype && Assign && description && Status && date && hostel_Id && Floor && Rooms ) {
      dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: Name, Phone: Phone, Requestid: Requestid, Complainttype: Complainttype, Assign: Assign, Description:description, Status: Status, date: date, id: editbtn ? id : '', Hostel_id: hostel_Id, Floor_id: Floor, Room: Rooms ,hostelname:hostelname } })
      setId('')
      setName('')
      setPhone('')
      setRequestid('')
      setComplainttype('')
      setAssign('')
      setDescription('')
      setDate('')
      setStatus('')
      setHostel_Id('')
      setFloor('')
      setRooms('')
      setShowMessage(true)
      dispatch({ type: 'COMPLIANCE-LIST' })
      setShowMenu(false);
      Swal.fire({
        icon: "success",
        title: editbtn ? 'Complaince Updated successfully' : 'Complaince Added successfully',
        confirmButtonText: "ok"
      }).then((result) => {
        dispatch({ type: 'COMPLIANCE-LIST' })
        if (result.isConfirmed) {
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

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchTerm != '') {
      const filteredItems = state.ComplianceList.Compliance.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setData(filteredItems);
    }
    else {
      setData(state.ComplianceList.Compliance)
    }
  }

  const handleiconshow = () => {
    setSearchicon(!searchicon)
    setFiltericon(false)
  }

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
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
  const handleDatePicker = (e) => {
    setDate(e.target.value)
  }

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
                <select value={statusfilter} onChange={(e) => handleStatusFilter(e)} class="form-control ps-4   searchinput" style={{ marginRight: '20px', fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px" }}
                >
                  <option selected value="ALL"> ALL</option>
                  <option value="Success">Success</option>
                  <option value="Hold">Hold</option>
                  <option value="Pending">Pending</option>
                </select>
              </>
            }
            <IoFilterOutline class=" me-4" onClick={handleFiltershow} />
            <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Compliance</button>
          </div>
        </div>
        <div>

        </div>
        <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: '69vh' }}>
          <Offcanvas.Title style={{ background: '#2F74EB', color: 'white', paddingLeft: '20px', height: '40px' }}>
            Add Compliance
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
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 0.6, width: '22ch' },
                  }}
                >

                  <TextField id="standard-basic" label="Request Id" value={Requestid} onChange={(e) => { setRequestid(e.target.value) }} variant="standard" style={{ m: 1, width: '22ch', marginTop: '0px' }} sx={{ '& > :not(style)': { paddingTop: "5px", fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Name" value={Name} onChange={(e) => { setName(e.target.value) }} variant="standard" style={{ m: 1, width: '22ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="Phone Number" value={Phone} onChange={(e) => { handlePhone(e) }} variant="standard" style={{ m: 1, width: '22ch', marginTop: '8px' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />



                  <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Select PG</InputLabel>
                    <Select
                      id="standard-basic"
                      variant="standard"

                      value={hostel_Id}
                      onChange={(e) => handleHostelId(e)}
                      label="Select PG"
                    >

                      {state.UsersList?.hostelList?.map((item) => (
                        <MenuItem key={item.Name} value={item.id}>
                          {item.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Select Floor</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select Floor"
                      value={Floor}
                      onChange={(e) => setFloor(e.target.value)}
                    >
                      <MenuItem value="none">                      
                      </MenuItem>
                      {state.UsersList?.hosteldetailslist
                        ?.filter((item, index, array) => array.findIndex(i => i.Floor_Id === item.Floor_Id) === index)
                        .map((u) => (
                          <MenuItem key={u.Floor_Id} value={u.Floor_Id}>
                            {u.Floor_Id}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Select Room No</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select Room No"
                      value={Rooms}
                      onChange={(e) => setRooms(e.target.value)}
                    >
                      <MenuItem value="none">
                        
                      </MenuItem>
                      {state.UsersList?.hosteldetailslist
                        ?.filter(item => item.Floor_Id === Floor)
                        .map((item) => (
                          <MenuItem key={item.Room_Id} value={item.Room_Id}>
                            {item.Room_Id}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 390 }}>
                    <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Complainttype</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Select Room No"
                      value={Complainttype}
                      onChange={(e) => { setComplainttype(e.target.value) }}
                    >
                      <MenuItem value="none">
                        <em>None</em>
                      </MenuItem>
                      
                          <MenuItem value="Invoice">
                            Invoice
                          
                          </MenuItem>
                          <MenuItem value="Others">
                            Others
                          
                          </MenuItem>
                       
                    </Select>
                  </FormControl>

                  <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          maxRows={4}
          variant="standard"
          sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }}
          style={{ m: 1, minWidth: 390}}
          value={description} onChange={(e) => { setDescription(e.target.value) }} 
        />
             
                  <TextField id="standard-basic" label="Assign" value={Assign} onChange={(e) => { setAssign(e.target.value) }} variant="standard" style={{ m: 1, width: '22ch', marginBottom: '10px' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" label="status" value={Status} onChange={(e) => { setStatus(e.target.value) }} variant="standard" style={{ m: 1, width: '22ch', marginTop: '4px' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />
                  <TextField id="standard-basic" type='date' value={date} onChange={(e) => { handleDatePicker(e) }} variant="standard" style={{ m: 1, width: '22ch', marginTop: '5px' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }} />

                </Box>
                {
                  showMessage &&
                  <div ><p>We have taken your request successfuly</p></div>
                }
                <div class="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                  <Button variant="dark" size="sm" onClick={handleFormclose} style={{ borderRadius: '20vh', width: '100px', marginRight: '15px' }}>
                    Cancel
                  </Button>
                  <Button variant="outline-primary" size="sm" style={{ borderRadius: '20vh', width: '100px' }} onClick={handleSubmit}>
                    {editbtn ? "Update" : "Save"}
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
            <th style={{ color: "#91969E" }}>Hostel Name</th>
            <th style={{ color: "#91969E" }}>Floor No</th>
            <th style={{ color: "#91969E" }}>Room No </th>
            <th style={{ color: "#91969E" }}>Compliant Type</th>
            <th style={{ color: "#91969E" }}>Description</th>
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
                  <span class="i-circle"><p class="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name.match(/(^\S\S?|\s\S)?/g).map(v => v.trim()).join("").match(/(^\S|\S$)?/g).join("").toLocaleUpperCase()}</p></span>
                  <div class="ms-2">
                    <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
                    <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.Phone}</label>
                  </div>
                </div>
              </td>

              <th style={{ color: "#91969E" }}>{item.hostelname}</th>
              
              <td style={{ color: "black", fontWeight: 500 }}>{item.Floor_id}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Room}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Complainttype}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Description}</td>
              <td style={{ color: "black", fontWeight: 500 }}>{item.Assign}</td>
              <td style={item.Status.toUpperCase() == "SUCCESS" ? { color: "green" } : { color: "red" }}>{item.Status}</td>
              <td class=""><img src={List} height="20" width="20" /><img class="ms-1" src={Edit} height="20" width="20" onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} /></td>
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

export default Compliance;