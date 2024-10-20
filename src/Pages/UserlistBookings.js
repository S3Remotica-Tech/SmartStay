import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Image, Modal, Pagination , Form, Row, Col,FormControl,} from 'react-bootstrap';
import './Userlistbooking.css';
import minus from '../Assets/Images/New_images/minus-square.png';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/New_images/edit.png';
import Calendars from '../Assets/Images/New_images/calendar.png';
import { CloseCircle } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingModal from './Addbookingform';
import AssignBooking from './Assignbooking';
import { FaCheckCircle } from 'react-icons/fa';
import check from '../Assets/Images/add-circle.png';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import Emptystate from '../Assets/Images/Empty-State.jpg';
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import { be } from 'date-fns/locale';


function Booking(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("stateBooking",state)
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const [paying, setPaying] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [endMeterError, setendMeterError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  // const [startMeterError, setstartMeterError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setamountError] = useState("");
  const [formError, setFormError] = useState("");
  const [HostelName, setHostelName] = useState("");
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formEdit, setFormEdit] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [HostelIds, setHostelIds] = useState('');
  const [FloorIds, setFloorIds] = useState('');
  const [bedIds, setBedIds] = useState('');
  const [id, setId] = useState("");
  

  


  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: HostelIds },
    });
  }, [HostelIds]);
  // useEffect(()=>{
  //   dispatch({ type: "GET_BOOKING_LIST"});
  // },[])

  useEffect(() => {
    if (HostelIds && FloorIds) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: HostelIds, floor_Id: FloorIds },
      });
    }
  }, [FloorIds]);
  useEffect(() => {
    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: { hostel_id: HostelIds, floor_id: FloorIds, room_id: roomId },
    });
  }, [roomId]);

  const calendarRef = useRef(null);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setfirstNameError("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleDate = (selectedDates) => {
    if (selectedDates.length > 0) {
      const localDate = new Date(
        selectedDates[0].getTime() -
          selectedDates[0].getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setJoiningDate(localDate);
      setDateError("");
      setFormError("");
    }
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    setamountError("");
  };
  // const handlePayingguest =(e)=>{
  //   setPaying(e.target.value)
  //   setHostelIdError('')
  // }
  const handlePayingguest = (e) => {
    const selectedHostelId = e.target.value;
    // handleInputChange()
    const selectedHostel =
      state.UsersList.hostelList &&
      state.UsersList.hostelList.filter((item) => item.id == e.target.value);
    setHostelIds(selectedHostelId);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    if (selectedHostelId === "Select a PG") {
      setHostelIdError("Please select a valid PG");
    } else {
      setHostelIdError("");
    }
    // setFloor("");
    // setRoom("");
    // setBed("");
    setHostelIdError("");
    setFormError("");
    setFloorIds('')
    setRoomId('')
    setBedIds('')
  };
  const handleFloor = (e) => {
    setFloorIds(e.target.value);
    setfloorError("");
  };

  const handleRoom = (e) => {
    setRoomId(e.target.value);
    setRoomError("");
  };

  const handleBed = (e) => {
    setBedIds(e.target.value);
    setBedError("");
  };

  const handleComments = (e) => {
    setComments(e.target.value);
  };
  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select a PG" ||
      value === "Select a floor" ||
      value === "Select a room" ||
      value === "Select a bed"
    ) {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("FirstName ID is required");
          break;
        case "joiningDate":
          setDateError("joiningDate ID is required");
          break;
        case "amount":
          setamountError("Amount is required");
          break;
        case "paying":
          setHostelIdError("Hostel ID is required");
          break;
        case "floor":
          setfloorError("Floor is required");
          break;
        case "room":
          setRoomError("Room is required");
          break;
        case "bed":
          setBedError("Bed is required");
          break;

        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("");
          break;
        case "joiningDate":
          setDateError("");
          break;
        case "amount":
          setamountError("");
          break;
        case "paying":
          setHostelIdError("");
          break;
        case "floor":
          setfloorError("");
          break;
        case "room":
          setRoomError("");
          break;
        case "bed":
          setBedError("");
          break;

        default:
          break;
      }
      return true;
    }
  };

  const handleSubmit = () => {
    const isFirstnameValid = validateAssignField(firstName, "firstName");
    const isjoiningDateValid = validateAssignField(joiningDate, "joiningDate");
    const isamountValid = validateAssignField(amount, "amount");

    const isHostelValid = validateAssignField(paying, "paying");
    const isFloorvalid = validateAssignField(floor, "floor");
    const isRoomValid = validateAssignField(room, "room");
    const isbedvalid = validateAssignField(bed, "bed");

    if (paying === "Select a PG" || !isHostelValid) {
      setHostelIdError("Please select a valid Hostel");
      return; // Prevent save
    } else {
      setfloorError(""); // Clear the error if valid
    }
    if (floor === "Select a floor" || !isFloorvalid) {
      setfloorError("Please select a valid Floor");
      return; // Prevent save
    } else {
      setfloorError(""); // Clear the error if valid
    }

    // Validate Room field
    if (room === "Select a room" || !isRoomValid) {
      setRoomError("Please select a valid Room");
      return; // Prevent save
    } else {
      setRoomError("");
    }
    if (bed === "Select a bed" || !isbedvalid) {
      setBedError("Please select a valid Room");
      return; // Prevent save
    } else {
      setBedError(""); // Clear the error if valid
    }



    if (
      !isFirstnameValid ||
      !isjoiningDateValid ||
      (!isamountValid &&
        !isHostelValid &&
        !isFloorvalid &&
        !isRoomValid &&
        !isbedvalid)
    ) {
      return;
    }

    const isValidDate = (date) => {
      return !isNaN(Date.parse(date));
    };
    const isChangedBed =
      (isNaN(FloorIds)
        ? String(FloorIds).toLowerCase() !==
          String(initialStateAssign.floor).toLowerCase()
        : Number(FloorIds) !== Number(initialStateAssign.floor)) ||
      (isNaN(roomId)
        ? String(roomId).toLowerCase() !==
          String(initialStateAssign.room).toLowerCase()
        : Number(roomId) !== Number(initialStateAssign.room)) ||
      (isNaN(bedIds)
        ? String(bedIds).toLowerCase() !==
          String(initialStateAssign.bed).toLowerCase()
        : Number(bedIds) !== Number(initialStateAssign.bed)) ||
      (isValidDate(joiningDate) && isValidDate(initialStateAssign.joiningDate)
        ? new Date(joiningDate).toISOString().split("T")[0] !==
          new Date(initialStateAssign.joiningDate).toISOString().split("T")[0]
        : joiningDate !== initialStateAssign.joiningDate) ||
      Number(amount) !== Number(initialStateAssign.amount) ||
      String(firstName) !== String(initialStateAssign.firstName) ||
      String(lastName) !== String(initialStateAssign.lastName) ||
      String(comments) !== String(initialStateAssign.comments) 
      

    // If no changes detected
    if (!isChangedBed) {
      setFormError("No changes detected.");
      return;
    } else {
      setFormError("");
    }
    let formattedDate = null;
    try {
      formattedDate = new Date(joiningDate).toISOString().split("T")[0];
    } catch (error) {
      setDateError("date is required.");
      console.error(error);
      return;
    }

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        first_name: firstName,
        last_name: lastName,
        joining_date: formattedDate,
        amount: amount,
        hostel_id: HostelIds,
        floor_id: FloorIds,
        room_id: roomId,
        bed_id: bedIds,
        comments: comments,
        id:id
      },
    });
    handleCloseForm()
    

  };
  
  console.log("stateghjhsjdhjs",state)

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
    
      dispatch({ type:"GET_BOOKING_LIST" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);


  
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const popupRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = props.filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.filteredUsers?.length / itemsPerPage);

  const handleDotsClick = (id) => {
    setActiveDotsId((prevId) => (prevId === id ? null : id));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');  // Add leading zero for day if needed
    return `${year}-${month}-${day}`;
  };
  
  const handleEdit = (item) => {
    console.log("itemEdit...///",item)
    setFormEdit(true);
    if(item && item.id){

      setFirstName(item.first_name || "")
      setLastName(item.last_name || "")
      // setJoiningDate(item.joining_date || "")
      const formattedJoiningDate = item.joining_date
      ? formatDate(item.joining_date)
      : "";  

    setJoiningDate(formattedJoiningDate); 
      setAmount(item.amount || "")
      setPaying(item.hostel_name  || "")
      setFloor(item.floor_name  || "")
      setRoom(item.room_name || "")
      setBed(item.bed_name  || "")
      setComments(item.comments  || "")
      setHostelIds(item.hostel_id  || "")
      setFloorIds(item.floor_id  || "")
      setRoomId(item.room_id  || "")
      setBedIds(item.bed_id  || "")
      setId(item.id || "")


      setInitialStateAssign({
        firstName: item.first_name || "",
        lastName:item.last_name || "",
        floor: item.floor_id || "",
        room: item.room_id || "",
        bed: item.bed_id || "",
        joiningDate: item.user_join_date || "",
        amount: item.amount || "",
        paying: item.hostel_id || "",
        comments:item.comments || ""
      });
      

      // setRoomId(item[0].room_id || "");

    }
  };
  const [initialStateAssign, setInitialStateAssign] = useState({
    firstName: "",
    lastName: "",
    paying: "",
    floor: "",
    room: "",
    bed: "",
    amount: "",
    comments: "",
    joiningDate: ""
  });
  const handleCloseForm = ()=> {
    setFormEdit(false)
  }

  const handleAdd = () => {
    setSelectedCustomer(null);
    setModalType('add');
  };
  const handleShowbook = () => {
    setModalType("add");
    
    setSelectedCustomer(null);
}

  const handleDelete = (id) => {
    const customer = customers.find((c) => c.id === id);
    setSelectedCustomer(customer);
    setModalType("delete");
    setActiveDotsId(null);
  };
  const handleCheckin = (id) => {
    const customer = customers.find((c) => c.id === id);
    if (customer) {
      setSelectedCustomer(customer);
      setModalType('checkin');
      setActiveDotsId(null);
    } else {
      toast.error('Customer not found!', {
       
      });
    }
  };


  const handleSave = (updatedCustomer) => {
    if (modalType === 'edit' || modalType === 'checkin') {
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c))
      );
      const message = modalType === 'edit' ? 'Saved changes successfully!' : 'Check-in assigned successfully!';
      showToast(message);
    } else if (modalType === 'add') {
      setCustomers((prevCustomers) => [updatedCustomer, ...prevCustomers]);
      showToast('Booking added successfully!');
    }
    handleModalClose();
  };

  const showToast = (successMessage) => {
    toast.success(successMessage, {
    });

  }


  const handleModalClose = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers((prevCustomers) => prevCustomers.filter((c) => c.id !== selectedCustomer.id));
      toast.success(` booking deleted successfully!`, {
       });
    }
    handleModalClose();
  };
useEffect(()=>{
  dispatch({ type: "GET_BOOKING_LIST"});

  
},[])
useEffect(()=>{
  setCustomers(state.Booking.CustomerBookingList.bookings)
},state.Booking.CustomerBookingList.bookings)
console.log("customer///////",props.filteredUsers)


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveDotsId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="p-10" style={{marginLeft:"-20px"}}>
        <div>

          {props.filteredUsers?.length > 0 ? (
            <div className="p-10 booking-table-userlist" style={{ paddingBottom: '20px' }}>


              <Table className="table-booking" responsive>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', padding: '10px', background: '#E7F1FF', border: 'none', borderTopLeftRadius:'16px'}}>
                      <img src={minus} height={20} width={20} alt="minus icon" />
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                       
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                      }}
                    >
                      Email ID
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                      }}
                    >
                      Mobile No
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                      }}
                    >
                      Booking Date
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                      }}
                    >
                      Joining Date
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        textAlign: 'start',
                        padding: '10px',
                        color: '#4B4B4B',
                        fontSize: '14px',
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        background: '#E7F1FF',
                        border: 'none',
                         borderTopRightRadius:'16px'
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {props.filteredUsers?.map((customer) => {
                     let Dated = new Date(customer.joining_date);
                     console.log("Dated..?", Dated);
     
                     let day = Dated.getDate();
                     let month = Dated.getMonth() + 1; 
                     let year = Dated.getFullYear();
                    let formattedDate = `${year}/${month}/${day}`;


                    let createDated = new Date(customer.createdat);
                    console.log("Dated..?", Dated);
    
                    let day1 = createDated.getDate();
                    let month1 = createDated.getMonth() + 1; 
                    let year1 = createDated.getFullYear();
                   let formattedDatecreate = `${year1}/${month1}/${day1}`;

                     
                    return(
                    <tr key={customer.id} className="customer-row">
                      <td style={{ textAlign: 'center', padding: '10px', border: 'none' }}>
                        <img src={minus} height={20} width={20} alt="minus icon" />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {/* <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" /> */}
                          <span
                            style={{
                              fontSize: '16px',
                              fontWeight: 600,
                              fontFamily: 'Gilroy',
                              color: '#222222',
                              paddingLeft: '4px',
                            }}
                            className="ms-2 customer-name"
                          >
                            {customer.first_name} {customer.last_name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          fontFamily: 'Gilroy',
                          color: '#000000',
                          textAlign: 'start',
                        }}
                      >
                        -
                        {/* {customer.email} */}
                      </td>
                      <td
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          fontFamily: 'Gilroy',
                          color: '#000000',
                          textAlign: 'start',
                        }}
                      >
                        -
                        {/* {customer.mobile} */}
                      </td>

                      <td
                        style={{
                          padding: '10px',
                          border: 'none',
                          textAlign: 'start',
                          fontSize: '16px',
                          fontWeight: 600,
                          fontFamily: 'Gilroy',
                        }}
                      >
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '60px',
                            backgroundColor: '#EBEBEB',
                            textAlign: 'start',
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'Gilroy',
                          }}
                        >
                          {formattedDatecreate}
                        </span>
                      </td>

                      <td
                        style={{
                          padding: '10px',
                          border: 'none',
                          textAlign: 'start',
                          fontSize: '16px',
                          fontWeight: 600,
                          fontFamily: 'Gilroy',
                        }}
                      >
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '60px',
                            backgroundColor: '#EBEBEB',
                            textAlign: 'start',
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'Gilroy',
                          }}
                        >
                          {formattedDate}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: '10px',
                          border: 'none',
                          textAlign: 'start',
                          fontSize: '16px',
                          fontWeight: 600,
                          fontFamily: 'Gilroy',
                        }}
                      >
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: '60px',
                            backgroundColor: '#EBEBEB',
                            textAlign: 'start',
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: 'Gilroy',
                          }}
                        >
                          {customer.amount}
                        </span>
                      </td>

                      <td>
                        <div
                          style={{
                            cursor: 'pointer',
                            height: 40,
                            width: 40,
                            borderRadius: '50%',
                            border: '1px solid #EFEFEF',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: activeDotsId === customer.id ? 1000 : 'auto',
                          }}
                          onClick={() => handleDotsClick(customer.id)}
                        >
                          <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                          {activeDotsId === customer.id && (
                            <div
                              ref={popupRef}
                              style={{
                                cursor: 'pointer',
                                backgroundColor: '#F9F9F9',
                                position: 'absolute',
                                right: 0,
                                top: 50,
                                width: 163,
                                height: 92,
                                border: '1px solid #EBEBEB',
                                borderRadius: 10,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: 15,
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                              }}
                            >
                              <div
                                className="mb-2 d-flex align-items-center"
                                onClick={() => handleCheckin(customer.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <img src={check} style={{ height: 16, width: 16, marginRight: '8px' }} alt="Checkin icon" />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: 'Gilroy',
                                    color: '#222222',
                                  }}
                                >
                                  Check In
                                </label>
                              </div>
                              <div
                                className="mb-2 d-flex align-items-center"
                                onClick={() => handleEdit(customer)}
                                style={{ cursor: 'pointer' }}
                              >
                                <img src={Edit} style={{ height: 16, width: 16, marginRight: '8px' }} alt="Edit icon" />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: 'Gilroy',
                                    color: '#222222',
                                  }}
                                >
                                  Edit
                                </label>
                              </div>
                              <div
                                className="d-flex align-items-center"
                                onClick={() => handleDelete(customer.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <img src={Delete} style={{ height: 16, width: 16, marginRight: '8px' }} alt="Delete icon" />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: 'Gilroy',
                                    color: '#FF0000',
                                  }}
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                    )
})}
                </tbody>
              </Table>

              {totalPages > 1 && (
                <Pagination className="mt-4 d-flex justify-content-end align-items-center">
                  <Pagination.Prev
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                  >

                    <ArrowLeft2 size="16" color="#1E45E1" />

                  </Pagination.Prev>

                  {Array.from({ length: totalPages }, (_, idx) => (
                    <Pagination.Item
                      key={idx + 1}
                      active={idx + 1 === currentPage}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}

                  <Pagination.Next
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                  >

                    <ArrowRight2 size="16" color="#1E45E1" />

                  </Pagination.Next>
                </Pagination>
              )}
           
            </div>
          ) : (
            <div className='d-flex align-items-center justify-content-center ' style={{ width: "100%", height: 350, margin: "0px auto" }}>
            <div>

                <div className="no-data-container">
                    <Image src={Emptystate} alt="No Data" />
                    <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No Walk-in available</div>
                    <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no Walk-in added. </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Button
                        onClick={handleShowbook}
                        style={{
                            fontSize: 16,
                            backgroundColor: "#1E45E1",
                            color: "white",
                            height: 56,
                            fontWeight: 600,
                            borderRadius: 12,
                            width: 200,
                            padding: "18px 20px",
                            fontFamily: 'Montserrat'
                        }}
                    >
                        + Add Walk-in
                    </Button>

                </div>
            </div>
            <div>

            </div>
        </div>
          )
          }

        </div>
      </div>

      {/* Booking Modal (Add/Edit) */}
      <BookingModal
        show={modalType === 'edit' || modalType === 'add'}
        handleClose={handleModalClose}
        mode={modalType} // 'edit' or 'add'
        customer={selectedCustomer}
        handleSave={handleSave}
      />

      <AssignBooking
        show={modalType === 'checkin'}
        handleClose={handleModalClose}
        mode={modalType}
        customer={selectedCustomer}
        handleSave={handleSave}
      />






<Modal
      show={formEdit}
      onHide={handleCloseForm}
      centered
      backdrop="static"
    >
      {/* <Form noValidate validated={validated} > */}
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title>New Booking</Modal.Title>
        <CloseCircle
          size="32"
          color="#222222"
          onClick={handleCloseForm}
          style={{ cursor: "pointer" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  height: "50px",
                }}
                value={firstName}
                className={formErrors.firstName ? "is-invalid" : ""}
                onChange={(e) => handleFirstName(e)}
              />
            </Form.Group>
            {firstNameError && (
              <div style={{ color: "red" }}>
                <MdError />
                {firstNameError}
              </div>
            )}
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  height: "50px",
                }}
                value={lastName}
                isInvalid={!!formErrors.lastName}
                onChange={(e) => handleLastName(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="formJoiningDate">
              {/* <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Joining Date
              </Form.Label>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor="date-input"
                  style={{
                    border: "1px solid #D9D9D9",
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: joiningDate ? 500 : 500,
                    color: "#222222",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (calendarRef.current && calendarRef.current.flatpickr) {
                      calendarRef.current.flatpickr.open();
                    }
                  }}
                >
                  {joiningDate instanceof Date && !isNaN(joiningDate)
                    ? joiningDate.toLocaleDateString("en-GB")
                    : "DD/MM/YYYY"}
                  <img
                    src={Calendars}
                    style={{ height: 24, width: 24, marginLeft: 10 }}
                    alt="Calendar"
                  />
                </label>

                <Flatpickr
                  ref={calendarRef}
                  value={joiningDate}
                  onChange={(date) => setJoiningDate(date[0])}
                  options={{
                    dateFormat: "d/m/Y",
                    allowInput: true,
                  }}
                  style={{
                    display: "none",
                  }}
                />
                {formErrors.joiningDate && (
                  <div className="invalid-feedback">
                    {formErrors.joiningDate}
                  </div>
                )}
              </div> */}
               <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222",
                                        fontFamily: "'Gilroy'",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Joining_Date{" "}
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "20px",
                                        }}
                                      >
                                        *{" "}
                                      </span>
                                    </Form.Label>

                                    <div style={{ position: "relative" }}>
                                      <label
                                        htmlFor="date-input"
                                        style={{
                                          border: "1px solid #D9D9D9",
                                          borderRadius: 8,
                                          padding: 11,
                                          fontSize: 14,
                                          fontWeight: 500,
                                          color: "#222222",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-between",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          if (calendarRef.current) {
                                            calendarRef.current.flatpickr.open(); // Open Flatpickr on click
                                          }
                                        }}
                                      >
                                        {/* {selectedDate ? selectedDate : 'YYYY-MM-DD'} Show selectedDate */}
                                        <span>
                                          {joiningDate === "0000-00-00" ||
                                          !joiningDate
                                            ? "YYYY-MM-DD"
                                            : joiningDate}
                                        </span>
                                        <img
                                          src={Calendars}
                                          style={{
                                            height: 24,
                                            width: 24,
                                            marginLeft: 10,
                                          }}
                                          alt="Calendar"
                                        />
                                      </label>

                                      <Flatpickr
                                        ref={calendarRef}
                                        options={{
                                          dateFormat: "Y-m-d",
                                        }}
                                        value={
                                          joiningDate
                                            ? new Date(joiningDate)
                                            : new Date()
                                        }
                                        onChange={(selectedDates) =>
                                          handleDate(selectedDates)
                                        }
                                        style={{
                                          display: "none",
                                        }}
                                      />
                                    </div>
            </Form.Group>
            {dateError && (
              <div style={{ color: "red" }}>
                <MdError />
                {dateError}
              </div>
            )}
          </Col>
          <Col md={6}>
           
<Form.Group className="">
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Amount{" "}
                                        <span
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          *{" "}
                                        </span>
                                      </Form.Label>
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => handleAmount(e)}
                                        style={{
                                          fontSize: 16,
                                          color: "#4B4B4B",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                          boxShadow: "none",
                                          border: "1px solid #D9D9D9",
                                          height: 50,
                                          borderRadius: 8,
                                        }}
                                      />
                                    </Form.Group>
            {amountError && (
              <div style={{ color: "red" }}>
                <MdError />
                {amountError}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="formPaying">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Paying Guest <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>
              {/* <Form.Select
        aria-label="Paying Guest"
        value={paying}
        isInvalid={!!formErrors.paying}
         className='' id="vendor-select"
        onChange={(e) => handlePayingguest(e)}
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a PG</option>
        <option value="UPI/BHIM">Paying guest 1</option>
        <option value="CASH">Paying guest 2</option>
        <option value="Net Banking">Paying guest 3</option>
      </Form.Select> */}

              <Form.Select
                aria-label="Default select example"
                className="border"
                value={HostelIds}
                onChange={(e) => handlePayingguest(e)}
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  lineHeight: "18.83px",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                }}
              >
                <option
                  style={{ fontSize: 14, fontWeight: 600 }}
                  selected
                  value=""
                >
                  Select a PG
                </option>
                {state.UsersList?.hostelList &&
                  state.UsersList?.hostelList.map((item) => (
                    <>
                      <option key={item.id} value={item.id}>
                        {item.Name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
            {hostelIdError && (
              <div style={{ color: "red" }}>
                <MdError />
                {hostelIdError}
              </div>
            )}
          </Col>
          <Col>
            <Form.Group className="mb-2" controlId="formFloor">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Floor <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                className="border"
                value={FloorIds}
                onChange={(e) => handleFloor(e)}
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                }}
              >
                <option
                  style={{ fontSize: 14, fontWeight: 600 }}
                  selected
                  value=""
                >
                  Select Floor
                </option>
                {state?.UsersList?.hosteldetailslist &&
                  state?.UsersList?.hosteldetailslist.map((item) => (
                    <>
                      <option key={item.floor_id} value={item.floor_id}>
                        {item.floor_name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
            {floorError && (
              <div style={{ color: "red" }}>
                <MdError />
                {floorError}
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="formRoom">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Room <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                className="border"
                value={roomId}
                onChange={(e) => handleRoom(e)}
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                }}
              >
                <option>Select a Room</option>
                {state.UsersList?.roomdetails &&
                  state.UsersList?.roomdetails.map((item) => (
                    <>
                      <option key={item.Room_Id} value={item.Room_Id}>
                        {item.Room_Name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
            {roomError && (
              <div style={{ color: "red" }}>
                <MdError />
                {roomError}
              </div>
            )}
          </Col>
          <Col>
            <Form.Group className="mb-2" controlId="formBed">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Bed <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                }}
                value={bedIds}
                className="border"
                placeholder="Select a bed"
                id="form-selects"
                onChange={(e) => handleBed(e)}
              >
                <option value="" selected>
                  Selected Bed
                </option>

                {/* {props.edit === "Edit" &&
    Bednum &&
    Bednum.Bed &&
    Bednum.Bed !== "undefined" &&  Bednum.Bed !== "" &&  Bednum.Bed !== "null" &&  Bednum.Bed !== "0" && (
      <option value={Bednum.Bed} selected>
        {Bednum.Bed}
      </option>
    )} */}

                {state.UsersList?.bednumberdetails?.bed_details &&
                  state.UsersList?.bednumberdetails?.bed_details
                    .filter(
                      (item) =>
                        item.bed_no !== "0" &&
                        item.bed_no !== "undefined" &&
                        item.bed_no !== "" &&
                        item.bed_no !== "null"
                    )
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.bed_no}
                      </option>
                    ))}
              </Form.Select>
            </Form.Group>
            {bedError && (
              <div style={{ color: "red" }}>
                <MdError />
                {bedError}
              </div>
            )}
          </Col>
        </Row>

        <Form.Group controlId="formComments" className="mb-3">
          <Form.Label
            style={{
              fontSize: 14,
              color: "#222222",
              fontFamily: "Gilroy",
              fontWeight: 500,
            }}
          >
            Comments
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter comments"
            value={comments}
            onChange={(e) => handleComments(e)}
            style={{
              fontSize: 14,
              color: "rgba(75, 75, 75, 1)",
              fontFamily: "Gilroy",
            }}
          />
        </Form.Group>
        {formError && (
                                  <div style={{ color: "red" }}>
                                    <MdError />
                                    {formError}
                                  </div>
        )}
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: 12,
              padding: "12px",
              border: "1px solid rgba(36, 0, 255, 1)",
              backgroundColor: "rgba(36, 0, 255, 1)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
            onClick={handleSubmit}
          >
            Saved
          </Button>
        </Modal.Footer>
      </Modal.Body>
      {/* </Form> */}
    </Modal>

      {/* Delete Modal */}
      <Modal show={modalType === 'delete'} onHide={handleModalClose} centered backdrop="static">
       
          <Modal.Title style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: "18px", textAlign: "center", color: "#222222", paddingTop: "20px" }}>Delete Booking?</Modal.Title>
       
        <p style={{ color: "#646464", fontFamily: "Gilroy", fontWeight: 500, textAlign: "center", fontSize: "16px", paddingTop: "20px" }}>
          Are you sure you want to delete this booking for booking?
        </p>
        <div class="d-flex justify-content-evenly" style={{ margin: "20px" }}>
          <button
            style={{
              fontFamily: "Gilroy",
              fontWeight: 600,
              fontSize: "16px",
              width: "160px",
              height: "52px",
              borderColor: "#1E45E1",
              color: "#1E45E1",
              transition: "all 0.3s ease"
            }}
            type="button"
            className="btn hover-button"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            style={{
              fontFamily: "Gilroy",
              fontWeight: 600,
              fontSize: "16px",
              width: "160px",
              height: "52px",
              borderColor: "#1E45E1",
              color: "#1E45E1",
              transition: "all 0.3s ease"
            }}
            type="button"
            className="btn hover-button"
            onClick={confirmDelete}
          >
            Delete
          </button>
       </div>
      </Modal>



    </>
  );
}

export default Booking;