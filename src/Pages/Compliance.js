import React, { useRef, useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Calendars from '../Assets/Images/New_images/calendar.png'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Table, Dropdown } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import 'sweetalert2/dist/sweetalert2.min.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { format } from 'date-fns';
import '../Pages/Compliance.css'
import CryptoJS from "crypto-js";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import Filter from '../Assets/Images/New_images/Group 13.png';
import { FaSearch } from 'react-icons/fa';
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
// import AddVendor from './AddVendormodal';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
// import VendorListMap from './VendorListMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Tickicon from '../Assets/Images/tick-circle.png'
import Profile_add from '../Assets/Images/profile-add.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import User from '../Assets/Images/Ellipse 1.png';
import Calendor from '../Assets/Images/calendar.png';
import Badge from 'react-bootstrap/Badge';
import { Room } from '@material-ui/icons';
import ComplianceList from './ComplianceList';
// import Image from 'react-bootstrap/Image';


const Compliance = () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [data, setData] = useState(state.ComplianceList.Compliance);

  const bottomBorderStyles = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "",
    paddingLeft: "2px",
    backgroundColor: "#E6ECF8"
  };


  const LoginId = localStorage.getItem("loginId")

  const [login_Id, setLogin_Id] = useState('')

  useEffect(() => {
    dispatch({ type: 'COMPLIANCE-LIST' })
    dispatch({ type: 'USERLIST' });
  }, [])

  useEffect(() => {
    if (state.ComplianceList.statusCodeForAddCompliance === 200) {
      dispatch({ type: 'COMPLIANCE-LIST' })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_COMPLIANCE_STATUS_CODE' })
      }, 200)

    }
  }, [state.ComplianceList.statusCodeForAddCompliance]);



  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  const options = {
    dateFormat: 'd/m/Y', // Set the date format to DD/MM/YYYY
    defaultDate: selectedDate || new Date(), // Set default date to the selected date or today
    // minDate: selectedDate ? selectedDate : 'today'
    // Allow past dates if a date is selected
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate])



  useEffect(() => {
    if (state?.ComplianceList?.Compliance) {
      setData(state.ComplianceList.Compliance);
    }

  }, [state?.ComplianceList?.Compliance]);

  const [id, setId] = useState('')
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Complainttype, setComplainttype] = useState('');
  const [description, setDescription] = useState('')
  const [Assign, setAssign] = useState('');
  console.log("assign", Assign);
  console.log("Complainttype", Complainttype);
  const [Status, setStatus] = useState('')
  const [date, setDate] = useState('');
  const [editbtn, setEditbtn] = useState(false)

  const [hostel_Id, setHostel_Id] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [beds, setBeds] = useState('');
  const [userid, setUser_Id] = useState('')
  const [loading, setLoading] = useState(true);


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




  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  //  command line
  // useEffect(() => {
  //   dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: hostel_Id } })
  // }, [hostel_Id]);



  const [hostelname, setHostelName] = useState('')
  console.log("hostelname", hostelname);
  // const handleHostelId = (e) => {
  //   console.log("e.target.value", e.target.value);
  //   const selectedHostelId = e.target.value;
  //   const selectedHostel = state.UsersList?.hostelList?.find(item => item.id == selectedHostelId);
  //   setHostel_Id(selectedHostelId);
  //   console.log("selectedHostel", selectedHostel);
  //   setHostelName(selectedHostel ? selectedHostel.Name : '');
  // };

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


  // const handleClose = () => {
  //   setShowMenu(false);
  //   setUserClicked(false);
  //   setShowForm(false);
  //   setId('')
  //   setName('')
  //   setPhone('')
  //   setComplainttype('')
  //   setAssign('')
  //   setDescription('')
  //   setDate('')
  //   setHostel_Id('')
  //   setFloor('')
  //   setRooms('')
  //   setStatus('')
  // };

  // const handleShow = () => {
  //   handleMenuClick();
  //   setShowMenu(true);
  //   setEditbtn(false)
  //   setSelectedUserId('');
  // };

  const handleFormclose = () => {
    handleMenuClick();
    setShowMenu(false);
    setId('')
    setName('')
    setPhone('')
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


  // const handleEdit = (item) => {
  //   if (item) {
  //     setEditbtn(true)
  //     setSelectedUserId(item.User_id);
  //     setId(item.ID)
  //     setName(item.Name)
  //     setPhone(item.Phone)
  //     setComplainttype(item.Complainttype)
  //     setAssign(item.Assign)
  //     setDescription(item.Description)
  //     setDate(format(new Date(item.date), 'yyyy-MM-dd'))
  //     setStatus(item.Status)
  //     setHostel_Id(item.Hostel_id)
  //     setHostelName(item.hostelname)
  //     setFloor(item.Floor_id)
  //     setRooms(item.Room)
  //     handleMenuClick();
  //     setShowMenu(true);
  //   }

  // }

  // const handleSubmit = () => {
  //   if (Name && Phone && Complainttype && Assign && description && Status && date && hostel_Id && Floor && Rooms) {
  //     dispatch({ type: 'COMPLIANCE-ADD', payload: { User_id: selectedUserId, Name: Name, Phone: Phone, Complainttype: Complainttype, Assign: Assign, Description: description, Status: Status, date: date, id: editbtn ? id : '', Hostel_id: hostel_Id, Floor_id: Floor, Room: Rooms, hostelname: hostelname } })
  //     setId('')
  //     setName('')
  //     setPhone('')
  //     setComplainttype('')
  //     setAssign('')
  //     setDescription('')
  //     setDate('')
  //     setStatus('')
  //     setHostel_Id('')
  //     setFloor('')
  //     setRooms('')
  //     setBeds('')

  //     setShowMenu(false);
  //     Swal.fire({
  //       icon: "success",
  //       title: editbtn ? 'Complaince Updated successfully' : 'Complaince Added successfully',
  //       confirmButtonText: "ok"
  //     }).then((result) => {

  //       if (result.isConfirmed) {
  //       }
  //     });
  //   }
  //   else {
  //     Swal.fire({
  //       icon: "warning",
  //       title: 'Please Enter All Field',
  //       confirmButtonText: "ok"
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //       }
  //     });
  //   }
  // }

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

  const handlePageSelect = (eventKey) => {
    const selectedPage = parseInt(eventKey, 10);
    setCurrentPage(selectedPage);
  };
  const handleDatePicker = (e) => {
    setDate(e.target.value)
  }


  const [usersId, setUsersId] = useState('')



  useEffect(() => {
    if (state.UsersList?.UserListStatusCode == 200) {
      const uniqueOptions = Array.from(new Set(state.UsersList?.Users.map((item) => item.User_Id)));


      setUsersId(uniqueOptions);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_USER' })
      }, 1000)
    }

  }, [state.UsersList.UserListStatusCode])






  const [selectedUsername, setSelectedUserName] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);

  console.log("username", selectedUsername);
  console.log("state", state);
  console.log("filterdetails", filteredUserDetails);

  useEffect(() => {
    if (selectedUsername) {
      console.log("state.UsersList.Users", state.UsersList.Users);
      const filteredDetails = state.UsersList.Users.filter(item => {
        return item.Name == selectedUsername
      }
      )
      console.log("filteredDetails", filteredDetails);
      if (filteredDetails.length > 0) {
        setFilteredUserDetails(filteredDetails);
        const firstFilteredDetail = filteredDetails[0];
        // setName(firstFilteredDetail.Name || '');
        // setPhone(firstFilteredDetail.Phone || '');
        setHostel_Id(firstFilteredDetail.Hostel_Id || '');
        setHostelName(firstFilteredDetail.HostelName || '');
        setFloor(firstFilteredDetail.Floor || '');
        setBeds(firstFilteredDetail.Bed || '');
        setRooms(firstFilteredDetail.Rooms || '');
        setUser_Id(firstFilteredDetail.User_Id || '');

      } else {
        setFilteredUserDetails([]);
        setName('');
        // setPhone('');
        setHostelName('');
        setBeds('')
        setFloor('');
        setRooms('');
      }
    } else {
      setFilteredUserDetails([]);
      setName('');
      // setPhone('');
      setHostelName('');
      setBeds('')
      setFloor('');
      setRooms('');
    }
  }, [selectedUsername]);

  const handleCheckoutChange = (event, newValue) => {
    console.log("clickeduser", event.target.value);
    setSelectedUserName(event.target.value);
  };



  const [show, setShow] = useState(false);

  const handleShow = () => {
    setEdit(false)
    setShow(true);
  }
  const handleClose = () => {
    // setEdit(!edit)
    setShow(false);
    setSelectedUserName('');
    setComplainttype('');
    setAssign('');
    setDescription('');
    setSelectedDate('')
    setDate('');
    setBeds('')
    setFloor('');
    setRooms('');
    setHostelName('');
    setStatus('')
  }

  const [Assignpopupshow, setAssignpopupshow] = useState(false);

  const handleAssignShow = () => {
    console.log('handleAssignShow called'); // Add a log here
    setAssignpopupshow(true);
  }
  const handleAssignClose = () => {
    console.log('handleAssignClose called'); // Add a log here
    setAssignpopupshow(false);
  }

  const [edit, setEdit] = useState(false)

  const handleAddcomplaint = () => {

    setEdit(false)

    if (Complainttype && description && selectedDate && hostelname && beds && Rooms) {
      // console.log();
      if (id) {
        dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: selectedUsername, Complainttype: Complainttype, Assign: Assign, Description: description, date: selectedDate, Hostel_id: hostel_Id, Bed: beds, Room: Rooms, hostelname: hostelname, Floor_id: Floor, Status: Status, User_id: userid, id: id } })
        handleClose()
        setSelectedUserName('');
        setComplainttype('');
        setAssign('');
        setDescription('');
        setSelectedDate('')
        setBeds('')
        setFloor('');
        setRooms('');
        setHostelName('');
        setStatus('');
        setId('');
        setHostel_Id('')
      }
      else {
        dispatch({ type: 'COMPLIANCE-ADD', payload: { Name: selectedUsername, Complainttype: Complainttype, Assign: Assign, Description: description, date: selectedDate, Hostel_id: hostel_Id, Bed: beds, Room: Rooms, hostelname: hostelname, Floor_id: Floor, User_id: userid, Status: Status } })
        handleClose()
        setSelectedUserName('');
        setComplainttype('');
        setAssign('');
        setDescription('');
        setSelectedDate('')
        setBeds('')
        setFloor('');
        setRooms('');
        setHostelName('');
        setStatus('');
        setId('');
        setHostel_Id('')
      }

      Swal.fire({
        icon: "success",
        title: edit ? 'Complaince Updated successfully' : 'Complaince Added successfully',
        confirmButtonText: "ok"
      }).then((result) => {

        if (result.isConfirmed) {
        }
      });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        timer: 1000
      });
    }
  }



  const [editdata, setEditData] = useState('')

    const[editcomplainttype , setEditcomplainttype ] = useState('')

  const handleEditcomplaint = (Complaintdata) => {

    console.log("edit works", Complaintdata);

    setEdit(true)
    if (Complaintdata) {
      setEditData(Complaintdata)
      setShow(true);
      // setCheck('EDIT')
      console.log("Edited complaint data:", Complaintdata);
      setId(Complaintdata.ID)
      setSelectedUserName(Complaintdata.Name);
      setComplainttype(Complaintdata.Complainttype);
      setEditcomplainttype(Complaintdata.complaint_name)
      setAssign(Complaintdata.Assign);
      setDescription(Complaintdata.Description);
      // setDate(format(new Date(Complaintdata.date), 'yyyy-MM-dd'));
      setSelectedDate(new Date(Complaintdata.date), 'dd/MM/yyyy');
      setHostel_Id(Complaintdata.Hostel_id)
      setBeds(Complaintdata.Bed)
      setFloor(Complaintdata.Floor_id);
      setRooms(Complaintdata.Room);
      setHostelName(Complaintdata.hostelname);
      setStatus(Complaintdata.Status)
    }
  };

  // useEffect(() => {
  //   handleEditcomplaint(editdata)
  // }, [editdata]);

  console.log("description", description);
  console.log("date", date);
  console.log("assign", Assign);


  useEffect(() => {
    const closeButton = document.querySelector('button[aria-label="close-button"]');
    if (closeButton) {
      closeButton.style.backgroundColor = 'white';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '10px';
      closeButton.style.height = '10px';
      closeButton.style.border = '1.5px solid #000000';
      closeButton.style.padding = '9px';
    }
  }, []);

  const [complainttypelist, setComplainttypelist] = useState([])
  console.log("complainttypelist", complainttypelist);

  useEffect(() => {
    dispatch({ type: 'COMPLAINT-TYPE-LIST' })
  }, [])

  useEffect(() => {

    setComplainttypelist(state.Settings.Complainttypelist.complaint_types)


  }, [state.Settings.Complainttypelist.complaint_types])


  return (
    <div style={{ width: "100%", fontFamily: "Gilroy,sans-serif" }} className=''>
      <div className='m-4'>
        {/* <div className='d-flex justify-content-end align-items-center mb-4'>

          <div>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
                <CiSearch style={{ fontSize: 20 }} />
              </InputGroup.Text>
              <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
                placeholder="Search..."
              />
            </InputGroup>
          </div>
          <div className="mr-3">
            <img src={Notify} alt="notification" />
          </div>

          <div className="mr-3">
            <Image src={Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
          </div>
        </div> */}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600, marginLeft: '20px' }}>Complaints</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">

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
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
            </div>

            <div>
              <Button
                onClick={handleShow}
                style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Add Complaint</Button>
            </div>
          </div>
        </div>

        <div className='row row-gap-3'>
          {data && data.map((complaints) => (
            <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
              <ComplianceList complaints={complaints} onEditComplaints={handleEditcomplaint} onAssignshow={handleAssignShow} />
            </div>
          ))
          }


          {data.length == 0 &&

            <div style={{ width: 400 }}>
              <Alert variant="warning" >
                Currently, no complaints are available.
              </Alert>

            </div>
          }

        </div>
        <Pagination className="mt-4 d-flex justify-content-end">
          {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {show &&
        <div
          className="modal show"
          style={{
            display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={show}
             onHide={handleClose}
            centered>
            <Modal.Dialog style={{ maxWidth: 950,paddingRight:"10px",paddingRight:"10px" ,borderRadius:"30px"}} className='m-0 p-0'>
             

              <Modal.Body>
   <div>

              <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
              <div style={{ fontSize: 20, fontWeight: 600,fontFamily:"Gilroy" }}>{edit ? "Edit Compliant" : "Add an complaint"}</div>
              <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: '10px',
            top: '16px',
            border: '1px solid black',
            background: 'transparent',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
           
          }}
        >
          <span aria-hidden="true" style={{
              fontSize: '30px',
              paddingBottom:"6px"
             
            }}>&times;</span>
        </button>
       
                {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
              </Modal.Header>
              </div>

                <div className='row mt-4'>
                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Customer
                      </Form.Label>
                      <Form.Select className='border'
                        value={selectedUsername}
                        onChange={handleCheckoutChange}
                        disabled={edit}
                        style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      >
                        <option value="">Select a customer</option>

                        {
                          state.UsersList?.Users.map((u, index) => (
                            <option selected value={u.Name}>{u.Name}</option>
                          )

                          )
                        }


                      </Form.Select>
                    </Form.Group>



                  </div>
                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Complaint Type
                      </Form.Label>
                      <Form.Select className='border'
                        selected
                        value={Complainttype}
                        onChange={(e) => { setComplainttype(e.target.value) }}
                        style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      >
                        {
                          edit ? <option selected value={Complainttype}>{editcomplainttype}</option> :
                            <>



                              <option selected value="">Select a type</option>
                              {
                                complainttypelist && complainttypelist.map((u, index) => (
                                  <option selected value={u.id}>{u.complaint_name}</option>
                                )

                                )
                              }
                            </>
                        }


                      </Form.Select>
                    </Form.Group>

                  </div>

                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        //  style={labelStyle}
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Paying Guests
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Paying Guests"
                        value={hostelname}
                        readOnly
                      // style={inputStyle}
                      />
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      // style={labelStyle}
                      >
                        Beds
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Beds"
                        value={beds}
                        readOnly
                      // style={inputStyle}
                      />
                    </Form.Group>
                  </div>
                  {/* {!edit &&  Assign == !null( */}
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Assignee
                      </Form.Label>
                      <Form.Select
                        className='border'
                        style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy, sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        value={Assign}
                        onChange={(e) => { setAssign(e.target.value) }}
                      >
                        {edit ? (
                          <option selected value={Assign}>{Assign}</option>
                        ) : (
                          <>
                            <option value="">Select assignee</option>
                            <option value="John">John</option>
                            <option value="Josh">Josh</option>
                          </>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Status
                      </Form.Label>
                      <Form.Select
                        className='border'
                        style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy, sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        value={Status}
                        onChange={(e) => { setStatus(e.target.value) }}
                      >
                        {/* {edit ? (
          <option selected value={Status}>{Status}</option>

        ) : (
          <> */}
                        <option value="">Select a status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        {/* </> */}
                        {/* )} */}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  {/* )} */}



                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Label
                        style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Room no
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Rooms"
                        value={Rooms}
                        readOnly
                      // style={inputStyle}
                      />
                    </Form.Group>
                  </div>


                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Complaint date</Form.Label>

                    {/* <div className="rectangle-group">
                  <div className="frame-child1" />
                  <input
                    className="frame-input"
                    placeholder="DD-MM-YYYY"
                    type="date"
                    value={date}
                        disabled={edit}
                    onChange={(e) => { handleDatePicker(e) }}
                  />
                  <img
                    className="vuesaxlinearcalendar-icon"
                    alt=""
                    src={Calendor}
                  />
                </div> */}

                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#222222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Ensure space between text and icon
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (calendarRef.current) {
                            calendarRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {selectedDate ? selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={calendarRef}
                        options={options}
                        value={selectedDate}
                        onChange={(selectedDates) => {
                          setSelectedDate(selectedDates[0]);
                        }}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>


                  </div>

                  {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Date</Form.Label>
                                    <Form.Control className="custom-date-input"
                                        value={date}
                                        onChange={handleDatePicker}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>
                            </div> */}
                  {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500 }}>Complaint date</Form.Label>
                      <Form.Control
                        //  value={address} onChange={(e) => handleAddressChange(e)}
                        type="text" placeholder="Enter Address" style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group> */}



                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Description</Form.Label>
                      <Form.Control
                        value={description} onChange={(e) => { setDescription(e.target.value) }}
                        type="text" placeholder="Enter description" style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer style={{ border: "none" }}>

                <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }}
                  onClick={handleAddcomplaint}
                >
                  {edit ? "Save complaint" : "Add complaint"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      }

      {Assignpopupshow &&
        <div
          className="modal show"
          style={{
            display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={Assignpopupshow} onHide={handleAssignClose}
            centered>
            <Modal.Dialog style={{ width: '100%' }} className='m-0 p-0 col-4'>
              <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}> Assign Complaint</Modal.Title>
              </Modal.Header>

              <Modal.Body>


                <div className='row mt-4'>
                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500 }}>
                        Assignee
                      </Form.Label>
                      <Form.Select className='border'
                        selected value={selectedUsername}
                        onChange={handleCheckoutChange}
                        style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      >
                        <option value="">Select Assignee</option>

                        {
                          state.UsersList?.Users.map((u, index) => (
                            <option key={index} value={u.id}>{u.Name}</option>
                          )

                          )
                        }


                      </Form.Select>
                    </Form.Group>



                  </div>



                </div>

              </Modal.Body>
              <Modal.Footer style={{ border: "none" }}>

                <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }}
                  onClick={handleAddcomplaint}
                >
                  Add complaint
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      }





    </div>


    //     <div class=' ps-3 pe-3' style={{ marginTop: "20px" }} >
    //       <div class="row g-0" style={{ width: "100%" }}>
    //         <div class="col-lg-2 col-md-6 col-sm-12 col-xs-12" >
    //           <div class="pt-1 ps-0" >
    //             <h6 style={{ fontSize: "16px" }}>Compliance</h6>
    //           </div>
    //         </div>
    //         <div class="col-lg-6  offset-lg-4 col-md-6 col-sm-12 col-xs-12">
    //           <div class="p-1 d-flex justify-content-end align-items-center"  >
    //             {
    //               searchicon &&
    //               <>
    //                 <input
    //                   type="text"
    //                   value={searchItem}
    //                   onChange={(e) => handleInputChange(e)}
    //                   placeholder='Type to search'
    //                   class="form-control ps-4 pe-1   searchinput"
    //                   style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}

    //                 />
    //               </>
    //             }
    //             <BsSearch class=" me-4" onClick={handleiconshow} />
    //             {
    //               filtericon &&
    //               <>
    //                 <select value={statusfilter} onChange={(e) => handleStatusFilter(e)} class="form-control ps-4   searchinput" style={{ marginRight: '20px', fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px" }}
    //                 >
    //                   <option selected value="ALL"> ALL</option>
    //                   <option value="Success">Success</option>
    //                   <option value="Hold">Hold</option>
    //                   <option value="Pending">Pending</option>
    //                 </select>
    //               </>
    //             }
    //             <IoFilterOutline class=" me-4" onClick={handleFiltershow} />
    //             <button type="button" class="" onClick={handleShow} style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} ><img src={Plus} height="12" width="12" /> Add Compliance</button>
    //           </div>
    //         </div>
    //         <div>

    //         </div>
    //         <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: '69vh' }}>
    //           <Offcanvas.Title className="d-flex align-items-center" style={{ background: '#2F74EB', color: 'white', padding: '5px 20px', height: '40px', fontSize: 15 }}>
    //             {editbtn ? "Edit Compliance" : "Add Compliance"}
    //           </Offcanvas.Title>
    //           <Offcanvas.Body>
    //             <div class="d-flex flex-row bd-highlight mb-3 item" style={{ marginTop: '-20px' }}>
    //               <div class="p-1 bd-highlight user-menu">
    //                 <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
    //                   Compliance Details
    //                 </ul>
    //               </div>

    //             </div>

    //             {showForm && (
    //               <Form>
    //                 <p style={{ textAlign: 'center', marginTop: '-20px', marginBottom: 2 }}>Upload Profile</p>
    //                 <div className="d-flex justify-content-center mt-0" style={{ position: 'relative' }}>
    //                   {file ? <>
    //                     <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
    //                   </> :
    //                     <img src={Profile} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
    //                   }
    //                   <label htmlFor="imageInput" className=''>
    //                     <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-5px', left: '48%', height: 20, width: 20 }} />
    //                   </label>

    //                   <input
    //                     type="file"
    //                     accept="image/*"
    //                     multiple
    //                     className="sr-only"
    //                     id="imageInput"
    //                     onChange={handleImageChange}
    //                     style={{ display: "none" }} />
    //                 </div>
    //                 <Box
    //                   component="form"
    //                   sx={{
    //                     '& > :not(style)': { m: 0.6, width: '22ch' },
    //                   }}
    //                 >


    //                   <div className='row d-flex justify-content-between w-100 g-1 row-gap-1' style={{ backgroundColor: "" }}>

    //                       <div className='col-12 mb-3'>

    //                         <Form.Label style={{ fontSize: "14px", marginBottom: 5, fontWeight: 600 }}>Select User ID</Form.Label>
    //                         <Autocomplete
    //                           value={selectedUserId}
    //                           onChange={handleCheckoutChange}
    //                           label='Amenities'
    //                           id="free-solo-dialog-demo"
    //                           options={usersId}
    //                           selectOnFocus
    //                           clearOnBlur
    //                           disabled={editbtn}
    //                           handleHomeEndKeys
    //                           renderOption={(props, option) => (
    //                             <li {...props}>
    //                               {option}
    //                             </li>
    //                           )}

    //                           style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa", width: '97%', marginLeft: '1%' }}
    //                           sx={{ width: 300 }}

    //                           renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, placeholder: 'Enter or Select UserId' }} />}
    //                         />
    //                       </div>
    //                     {/* } */}

    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" label="Name" value={Name} InputProps={{ readOnly: true }} onChange={(e) => { setName(e.target.value) }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" label="Phone Number" value={Phone} InputProps={{ readOnly: true }} onChange={(e) => { handlePhone(e) }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>





    //                     <div className='col-6'>


    //                       <TextField id="standard-basic" label="Hostel Name" value={hostelname} InputProps={{ readOnly: true }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />


    //                     </div>
    //                     <div className='col-6'>

    //                       <TextField id="standard-basic" label="Floor" value={Floor} InputProps={{ readOnly: true }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>
    //                     <div className='col-6'>

    //                       <TextField id="standard-basic" label="Room" value={Rooms} InputProps={{ readOnly: true }} variant="standard" style={{ m: 1, width: '20ch' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" type='date'
    //                         value={date}
    //                         disabled={editbtn}
    //                         onChange={(e) => { handleDatePicker(e) }}
    //                         variant="standard" style={{ width: '20ch', marginTop: "18px" }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold" } }}
    //                       />
    //                     </div>
    //                     <div className='col-6'>
    //                       <FormControl variant="standard" sx={{ m: 1, width: "20ch" }}>
    //                         <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Complaint Type</InputLabel>
    //                         <Select
    //                           labelId="demo-simple-select-standard-label"
    //                           id="demo-simple-select-standard"
    //                           label="Select Room No"
    //                           value={Complainttype}
    //                           onChange={(e) => { setComplainttype(e.target.value) }}
    //                           style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" }}
    //                         >
    //                           <MenuItem value="none">
    //                             <em>None</em>
    //                           </MenuItem>

    //                           <MenuItem value="Invoice">
    //                             Invoice

    //                           </MenuItem>
    //                           <MenuItem value="Others">
    //                             Others

    //                           </MenuItem>

    //                         </Select>
    //                       </FormControl>
    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField
    //                         id="standard-multiline-flexible"
    //                         label="Description"
    //                         multiline
    //                         maxRows={4}
    //                         variant="standard"
    //                         sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }}
    //                         style={{ m: 1, width: "20ch", marginTop: '4px' }}
    //                         value={description} onChange={(e) => { setDescription(e.target.value) }}
    //                       />
    //                     </div>
    //                     <div className='col-6'>
    //                       <TextField id="standard-basic" label="Assign" value={Assign} onChange={(e) => { setAssign(e.target.value) }} variant="standard" style={{ m: 1, width: '20ch', marginTop: '4px' }} sx={{ '& > :not(style)': { fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" } }} />

    //                     </div>

    //                     <div className='col-6'>
    //                       <FormControl variant="standard" sx={{ width: "20ch" }}>
    //                         <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '0.8rem', fontWeight: "bold" }}>Status</InputLabel>
    //                         <Select
    //                           labelId="demo-simple-select-standard-label"
    //                           id="demo-simple-select-standard"
    //                           label="Status"
    //                           value={Status}
    //                           onChange={(e) => { setStatus(e.target.value) }}
    //                           style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#000000DE" }}
    //                         >
    //                           <MenuItem value="none">

    //                           </MenuItem>
    //                           <MenuItem value="Pending">Pending</MenuItem>
    //                           <MenuItem value="Success">Success</MenuItem>

    //                         </Select>
    //                       </FormControl>
    //                     </div>

    //                   </div>
    //                 </Box>

    //                 <div class="d-flex justify-content-end" style={{ marginTop: '20px' }}>
    //                   <Button variant="outline-secondary" size="sm" onClick={handleFormclose} style={{ borderRadius: '20vh', width: '100px', marginRight: '15px' }}>
    //                     Cancel
    //                   </Button>
    //                   <Button variant="outline-primary" size="sm" style={{ borderRadius: '20vh', width: '100px' }} onClick={handleSubmit}>
    //                     {editbtn ? "Update" : "Save"}
    //                   </Button>
    //                 </div>



    //               </Form>
    //             )}
    //           </Offcanvas.Body>
    //         </Offcanvas>
    //       </div>
    //       <Table responsive>
    //         <thead style={{ backgroundColor: "#F6F7FB", color: "#91969E", fontSize: "10px" }}>
    //           <tr >
    //             <th style={{ color: "#91969E" }}>Date</th>
    //             <th style={{ color: "#91969E" }}>Request ID</th>
    //             <th style={{ color: "#91969E" }}>Name & Phone</th>
    //             <th style={{ color: "#91969E" }}>Hostel Name</th>
    //             <th style={{ color: "#91969E" }}>Floor No</th>
    //             <th style={{ color: "#91969E" }}>Room No </th>
    //             <th style={{ color: "#91969E" }}>Compliant Type</th>
    //             <th style={{ color: "#91969E" }}>Description</th>
    //             <th style={{ color: "#91969E" }}>Assign</th>
    //             <th style={{ color: "#91969E" }}>Status</th>
    //             <th style={{ color: "#91969E" }}>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody style={{ fontSize: "10px" }}>
    //         {loading ? (

    //           Array.from({ length: state?.ComplianceList?.Compliance.length || 5 }).map((_, index) => (
    //             <tr key={index}>
    //               <td><Skeleton width={80} /></td>
    //               <td><Skeleton width={120} /></td>
    //               <td>
    //                 <div className="d-flex">
    //                   <span className="i-circle">
    //                     <Skeleton circle width={24} height={24} />
    //                   </span>
    //                   <div className="ms-2">
    //                     <Skeleton width={80} /><br />
    //                     <Skeleton width={100} />
    //                   </div>
    //                 </div>
    //               </td>
    //               <td><Skeleton width={120} /></td>
    //               <td><Skeleton width={50} /></td>
    //               <td><Skeleton width={50} /></td>
    //               <td><Skeleton width={100} /></td>
    //               <td><Skeleton width={150} /></td>
    //               <td><Skeleton width={100} /></td>
    //               <td><Skeleton width={60} /></td>
    //               <td><Skeleton width={40} /></td>
    //             </tr>
    //           ))
    //         ) : (
    //           currentItems.map((item) => (
    //             <tr key={item.ID}>
    //               <td style={{ color: "black", fontWeight: 500 }}>{moment(item.date).format('DD-MM-YYYY')}</td>
    //               <td style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Requestid}</td>
    //               <td>
    //                 <div className="d-flex">
    //                   {item.Name && (
    //                     <span className="i-circle">
    //                       <p className="mb-0" style={{ fontSize: 12, color: "black" }}>{item.Name.match(/(^\S\S?|\s\S)?/g).map(v => v.trim()).join("").match(/(^\S|\S$)?/g).join("").toLocaleUpperCase()}</p>
    //                     </span>
    //                   )}
    //                   <div className="ms-2">
    //                     <label style={{ color: "#0D99FF", fontWeight: 600 }}>{item.Name}</label><br />
    //                     <label style={{ color: "#9DA9BC", fontWeight: 600 }}>+91 {item.Phone}</label>
    //                   </div>
    //                 </div>
    //               </td>
    //               <td style={{ color: "#91969E" }}>{item.hostelname}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Floor_id}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Room}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Complainttype}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Description}</td>
    //               <td style={{ color: "black", fontWeight: 500 }}>{item.Assign}</td>
    //               <td style={(item.Status && item.Status.toUpperCase() === "SUCCESS") ? { color: "green" } : { color: "red" }}>{item.Status}</td>
    //               <td className=""><img src={List} height="20" width="20" />
    //                 <img className="ms-1" src={Edit} height="20" width="20" onClick={() => handleEdit(item)} style={{ cursor: 'pointer' }} /></td>
    //             </tr>
    //           ))
    // )}


    //         </tbody>
    //       </Table>

    //       <div className="d-flex justify-content-center" style={{width:"100%"}}>
    // {currentItems.length === 0 && !loading && <h5 style={{fontSize: 12, color: "red"}}>No Data Found</h5>}
    // </div>
    //       <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

    //         <div style={{ display: "flex", flexDirection: "row" }}>
    //           <div>
    //             <p style={{ fontSize: 13, marginTop: "5px" }}>Results:</p>
    //           </div>
    //           <Dropdown onSelect={(eventKey) => handlePageSelect(eventKey)}>
    //             <Dropdown.Toggle variant="secondary" style={{ backgroundColor: "#F6F7FB", color: "black", border: "none", fontSize: "10px", marginLeft: "10px" }}>
    //               {currentPage} - {currentPage}
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu>
    //               {generatePageNumbers().map((page) => (
    //                 <Dropdown.Item key={page} eventKey={page}>
    //                   {currentPage} - {page}
    //                 </Dropdown.Item>
    //               ))}
    //             </Dropdown.Menu>
    //           </Dropdown>
    //           <div style={{ fontSize: "10px", marginTop: "7px", marginLeft: "10px" }}>
    //             of <label>{currentPage}</label>
    //           </div>
    //         </div>
    //         <div style={{ display: "flex", flexDirection: "row" }}>

    //           <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
    //             Prev
    //           </div>
    //           <span class="i-circle" style={{ margin: '0 10px', fontSize: "8px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
    //           <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
    //             Next
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default Compliance;