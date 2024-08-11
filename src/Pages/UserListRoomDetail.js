import React, { useState, useEffect, useCallback, useRef } from "react";
import Profile from '../Assets/Images/New_images/profile-picture.png';
import leftarrow from "../Assets/Images/arrow-left.png"
import Image from 'react-bootstrap/Image';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import Group from '../Assets/Images/Group.png';
import { useDispatch, useSelector } from 'react-redux';
import Money from '../Assets/Images/New_images/Money.png';
import { Button, Offcanvas, Form, FormControl, InputGroup, Pagination } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
// import Modal from 'react-bootstrap/Modal';
import Plus from '../Assets/Images/New_images/add-circle.png'
import imageCompression from 'browser-image-compression';
import moment from 'moment';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UserEb from "./UserListEb";
import UserListInvoice from "./UserListInvoice";
import UserListAmenities from "./UserListAmenities";
import UserListTransaction from "./UserListTransaction";
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


function UserListRoomDetail(props) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const initialvalue = useRef();
  const [id, setId] = useState('')
  const [file, setFile] = useState(null)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [Phone, setPhone] = useState('')
  const [hostel_Id, setHostel_Id] = useState('')
  const [HostelName, setHostelName] = useState('')
  const [Floor, setFloor] = useState('')
  const [Rooms, setRooms] = useState('')
  const [Bed, setBed] = useState('')
  const [RoomRent, setRoomRent] = useState('')
  const [BalanceDue, setBalanceDue] = useState('')
  const [PaymentType, setPaymentType] = useState('')
  const [AdvanceAmount, setAdvanceAmount] = useState('')
  const [paid_advance, setPaidAdvance] = useState('')
  const [paid_rent, setPaidrent] = useState('')
  const [Address, setAddress] = useState('')
  const [Email, setEmail] = useState('')
  const [isActive, setIsActive] = useState('')
  const [AadharNo, setAadharNo] = useState('')
  const [PancardNo, setPancardNo] = useState('')
  const [licence, setLicence] = useState('')
  const [bedArray, setBedArray] = useState('');
  const [Arrayset, setArrayset] = useState([])
  const [Bednum, setBednum] = useState('')
  const [payableamount, setPayableamount] = useState('');
  const [formshow, setFormShow] = useState(false);
  const [customerdetailShow, setcustomerdetailShow] = useState(false);
  const [customerAsignBed, setcustomerAsignBed] = useState(false)
  const [Editbed, seteditBed] = useState('')
  const [value, setValue] = React.useState('1');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleChanges = (event, newValue) => {
    setValue(newValue);
  }
  const [hasChanges, setHasChanges] = useState(false);

  const handleShowEditBed = (item) => {
    if (item[0].ID) {
      if (item) {
        dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: item[0].Hostel_Id } })
        dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: item[0].Hostel_Id, floor_Id: item[0].Floor } })
        dispatch({ type: 'BEDNUMBERDETAILS', payload: { hostel_id: item[0].Hostel_Id, floor_id: item[0].Floor, room_id: item[0].Rooms } })
      }
      setBednum(item)
      seteditBed('editbeddet')
      setcustomerAsignBed(true)
      setcustomerdetailShow(false)
      setFormShow(true)
      setFormShow(true);
      setId(item[0].ID);

      if (item[0].profile === 0) {
        setFile(null);
      } else {
        setFile(item[0].profile);
      }

      if (item[0].Name) {
        let value = item[0].Name.split(" ");
        setFirstname(value[0]);
        setLastname(value[1]);
      } else {
        setFirstname("");
        setLastname("");
      }

      setAddress(item[0].Address || "");
      setAadharNo(item[0].AadharNo || "");
      setPancardNo(item[0].PancardNo || "");
      setLicence(item[0].licence || "");
      setPhone(item[0].Phone || "");
      setEmail(item[0].Email || "");
      setHostelName(item[0].HostelName || "");
      setHostel_Id(item[0].Hostel_Id || "");
      setFloor(item[0].Floor || "");
      setRooms(item[0].Rooms || "");
      setBed(item[0].Bed || "");
      setAdvanceAmount(item[0].AdvanceAmount || "");
      setRoomRent(item[0].RoomRent || "");
      setPaymentType(item[0].PaymentType || "");
      setBalanceDue(item[0].BalanceDue || "");
      setPaidAdvance(item[0].paid_advance || "");
      setPaidrent(item[0].paid_rent || "");
      setHasChanges(false);

    };
  }

  const handleInputChange = (e) => {
    setHasChanges(true);

  };

  const handleEditUser = (item) => {
    if (item[0].ID) {
      if (item) {
        dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: item[0].Hostel_Id } });
        dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: item[0].Hostel_Id, floor_Id: item[0].Floor } });
        dispatch({ type: 'BEDNUMBERDETAILS', payload: { hostel_id: item[0].Hostel_Id, floor_id: item[0].Floor, room_id: item[0].Rooms } });
      }
      setBednum(item);
      seteditBed('editbeddet');
      setcustomerAsignBed(false);
      setcustomerdetailShow(true);
      setFormShow(true);
      setFormShow(true);

      setId(item[0].ID);
      setFile(item[0].profile === '0' ? null : item[0].profile);

      if (item[0].Name) {
        let value = item[0].Name.split(" ");
        setFirstname(value[0]);
        setLastname(value[1]);
      } else {
        setFirstname("");
        setLastname("");
      }


      setAddress(item[0].Address || "");
      setAadharNo(item[0].AadharNo || "");
      setPancardNo(item[0].PancardNo || "");
      setLicence(item[0].licence || "");
      setPhone(item[0].Phone || "");
      setEmail(item[0].Email || "");
      setHostelName(item[0].HostelName || "");
      setHostel_Id(item[0].Hostel_Id || "");
      setFloor(item[0].Floor || "");
      setRooms(item[0].Rooms || "");
      setBed(item[0].Bed || "");
      setAdvanceAmount(item[0].AdvanceAmount || "");
      setRoomRent(item[0].RoomRent || "");
      setPaymentType(item[0].PaymentType || "");
      setBalanceDue(item[0].BalanceDue || "");
      setPaidAdvance(item[0].paid_advance || "");
      setPaidrent(item[0].paid_rent || "");

      setHasChanges(false);
    }
  }
  useEffect(() => {
    if (hostel_Id && Floor) {

      dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: hostel_Id, floor_Id: Floor } })
    }
  }, [Floor])


  const handleFirstName = (e) => {
    setFirstname(e.target.value)
   handleInputChange()
  }
  const handleLastName = (e) => {
    setLastname(e.target.value)
    handleInputChange()
  }

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    const joinDate = moment(currentDate).format('YYYY-MM-DD');
    const currentMonth = moment(currentDate).month() + 1;
    const currentYear = moment(currentDate).year();
    const createdAtMonth = moment(joinDate).month() + 1;
    const createdAtYear = moment(joinDate).year();

    if (currentMonth === createdAtMonth && currentYear === createdAtYear) {
      var dueDate = moment(joinDate).endOf('month').format('YYYY-MM-DD');
      var invoiceDate = moment(joinDate).format('YYYY-MM-DD');

    } else {
      var dueDate = moment(currentDate).endOf('month').format('YYYY-MM-DD');
      var invoiceDate = moment(currentDate).startOf('month').format('YYYY-MM-DD');
    }

    const formattedJoinDate = moment(invoiceDate).format('YYYY-MM-DD');
    const formattedDueDate = moment(dueDate).format('YYYY-MM-DD');
    const numberOfDays = moment(formattedDueDate).diff(moment(formattedJoinDate), 'days') + 1;


    const totalDaysInCurrentMonth = moment(currentDate).daysInMonth();


    const oneday_amount = RoomRent / totalDaysInCurrentMonth


    const payableamount = oneday_amount * numberOfDays
    const This_month_payableamount = Math.round(payableamount);
    setPayableamount(This_month_payableamount)

  }, [RoomRent])


  const handlePaidrent = (e) => {
    const value = e.target.value
    if (value <= payableamount) {
      setPaidrent(e.target.value)
    }
  }

  const handlePhone = (e) => {
    handleInputChange()
    setPhone(e.target.value)
    const pattern = new RegExp(/^\d{1,10}$/);
    const isValidMobileNo = pattern.test(e.target.value)
    if (isValidMobileNo && e.target.value.length === 10) {
      document.getElementById('MobileNumberError').innerHTML = ''
    }
    else {
      document.getElementById('MobileNumberError').innerHTML = 'Invalid mobile number *'
    }
  }
  const handleEmail = (e) => {
    handleInputChange()
    setEmail(e.target.value)
    const email = e.target.value
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      document.getElementById('emailIDError').innerHTML = ''
    }
    else {
      document.getElementById('emailIDError').innerHTML = 'Invalid Email Id *'
    }
  }
  const handleAddress = (e) => {
    handleInputChange()
    setAddress(e.target.value)
  }

  const handleIsActiveUser = (e) => {
    setIsActive(e.target.value)
  }


  const handleImageChange = async (event) => {
    handleInputChange()

    const fileImage = event.target.files[0];
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };
  useEffect(() => {
    if (props.id) {
      dispatch({ type: 'CUSTOMERDETAILS', payload: { user_id: props.id } })

    }
  }, [props.id]);


  useEffect(() => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: hostel_Id } })
  }, [hostel_Id,]);


  const handleHostelId = (e) => {
    const selectedHostelId = e.target.value;
    handleInputChange()
    const selectedHostel = state.UsersList.hostelList && state.UsersList.hostelList.filter(item => item.id == e.target.value);
    setHostel_Id(selectedHostelId);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : '');
    setFloor("")
    setRooms("")
    setBed("")
  }
  const handleFloor = (e) => {
    setFloor(e.target.value)
    handleInputChange()
    setRooms("")
    setBed("")
  }
  useEffect(() => {
    dispatch({ type: 'BEDNUMBERDETAILS', payload: { hostel_id: hostel_Id, floor_id: Floor, room_id: Rooms } })
  }, [Rooms])
  const handleRooms = (e) => {
    setRooms(e.target.value);
    setBed('');
    handleInputChange()

  }

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    handleInputChange()
    setRoomRent(roomRentValue);

  }

  const handleBed = (e) => {
    handleInputChange()
    setBed(e.target.value);

  };


  const handlePaymentType = (e) => {
    setPaymentType(e.target.value)
  }

  const handleAdvanceAmount = (e) => {
    handleInputChange()
    const advanceAmount = e.target.value;
    setAdvanceAmount(advanceAmount)

  }

  useEffect(() => {

    if (props.userDetails && props.userDetails.ID) {
      seteditBed('editbeddet')
      setId(props.userDetails.ID);
      if (props.userDetails.profile == 0) (
        setFile(null)
      )
      else {
        setFile(props.userDetails.profile)
      }
      let value = props.userDetails.Name.split(" ");
      setFirstname(value[0]);
      setLastname(value[1]);
      setAddress(props.userDetails.Address);
      setAadharNo(props.userDetails.AadharNo);
      setPancardNo(props.userDetails.PancardNo);
      setLicence(props.userDetails.licence);
      setPhone(props.userDetails.Phone);
      setEmail(props.userDetails.Email);
      setHostelName(props.userDetails.HostelName);
      setHostel_Id(props.userDetails.Hostel_Id);
      setFloor(props.userDetails.Floor);
      setRooms(props.userDetails.Rooms);
      setBed(props.userDetails.Bed);
      setAdvanceAmount(props.userDetails.AdvanceAmount);
      setRoomRent(props.userDetails.RoomRent);
      setPaymentType(props.userDetails.PaymentType);
      setBalanceDue(props.userDetails.BalanceDue);
      setPaidAdvance(props.userDetails.paid_advance)
      setPaidrent(props.userDetails.paid_rent)

    }
    else {
      props.setEdit('Add')
    }

  }, [props.userDetails])

  const handleCloseEditcustomer = () => {
    setFormShow(false)

  };


  const handleSaveUserlist = () => {

    const emailElement = document.getElementById('emailIDError');
    const emailError = emailElement ? emailElement.innerHTML : '';
    const phoneNumberError = document.getElementById('MobileNumberError');
    const mobileError = phoneNumberError ? phoneNumberError.innerHTML : '';

    if (emailError === 'Invalid Email Id *') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid email address',
        confirmButtonText: 'Ok',
        timer: 1000
      });
      return;
    }

    if (mobileError === 'Invalid mobile number *') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid 10-digit phone number',
        confirmButtonText: 'Ok',
        timer: 1000
      });
      return;
    }

    if (!firstname || !Phone || !Email || !Address || !hostel_Id) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in all required fields',
        confirmButtonText: 'Ok',
        timer: 1000
      });
      return;
    }

    // Prepare payload
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);
    const capitalizedLastname = capitalizeFirstLetter(lastname);
    const payload = {
      profile: file,
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      Phone: Phone,
      Email: Email,
      Address: Address,
      AadharNo: AadharNo,
      PancardNo: PancardNo,
      licence: licence,
      HostelName: HostelName,
      hostel_Id: hostel_Id,
      Floor: Floor,
      Rooms: Rooms,
      Bed: Bed,
      AdvanceAmount: AdvanceAmount,
      RoomRent: RoomRent,
      BalanceDue: BalanceDue,
      PaymentType: PaymentType,
      paid_advance: paid_advance,
      paid_rent: paid_rent,
      payable_rent: payableamount,
      ID: id
    };


    dispatch({
      type: 'ADDUSER',
      payload: payload
    });

    // Additional actions after edit (optional)

    props.AfterEditHostels(hostel_Id);
    props.AfterEditFloors(Floor);
    props.AfterEditRoomses(Rooms);
    props.AfterEditBeds(Bed);

    setFormShow(false)
    // handleCloseEditcustomer();
  };

  const handleSaveUserlistAddUser = () => {
    if (Floor && Rooms && Bed) {
      dispatch({
        type: 'ADDUSER',
        payload: {
          profile: file,
          firstname: firstname,
          lastname: lastname,
          Phone: Phone,
          Email: Email,
          Address: Address,
          AadharNo: AadharNo,
          PancardNo: PancardNo,
          licence: licence,
          HostelName: HostelName,
          hostel_Id: hostel_Id,
          Floor: Floor,
          Rooms: Rooms,
          Bed: Bed,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          paid_advance: paid_advance,
          paid_rent: paid_rent,
          payable_rent: payableamount,
          // isActive:isActive,
          ID: id
        },
      });
      props.AfterEditHostels(hostel_Id)
      props.AfterEditFloors(Floor)
      props.AfterEditRoomses(Rooms)
      props.AfterEditBeds(Bed)
      setFormShow(false)
      // handleClose();
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        confirmButtonText: 'Ok',
        timer: 1000
      });

    }

    dispatch({ type: 'INVOICELIST' })
  }


  useEffect(() => {
    if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })
      }, 1000)

    }

  }, [state.UsersList.CustomerdetailsgetStatuscode]);



  return (
    <>
      {
        props.roomDetail && (
          <>
            {props.userDetails && props.userDetails.map((item, index) => {
              const imageUrl = item.profile || Profile;
              return (
                <div key={item.ID} className="container mt-2">

                  <div style={{ marginLeft: 25, paddingBottom: 20 }}>
                    <img src={leftarrow}
                      onClick={props.handleBack} style={{ cursor: "pointer" }} /><span style={{ fontWeight: 600, fontSize: "20px", marginLeft: 15, fontFamily: "Gilroy" }}>User Profile</span> </div>
                  <div className="card" style={{ height: 130, borderRadius: "20px" }}>
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <Image
                          src={imageUrl}
                          alt={item.Name || "Default Profile"}
                          roundedCircle
                          style={{ height: "80px", width: "80px", marginRight: "10px" }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Profile;
                          }}
                        />
                        <div style={{ marginLeft: 10 }}>
                          <span className="card-title mb-0" style={{ fontSize: "20px", fontWeight: 600, fontFamily: "Gilroy" }}>
                            {item.Name}
                          </span>
                          <p style={{ marginTop: 10 }}>
                            <span style={{ backgroundColor: '#FFE0D9', borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px", paddingTop: "5px", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>
                              {props.getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed}
                            </span>

                            <span style={{ backgroundColor: '#FFEFCF', paddingLeft: "10px", paddingRight: "10px", paddingBottom: "5px", paddingTop: "5px", borderRadius: "10px", paddingLeft: "10px", paddingRight: "10px", marginLeft: 10, fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>
                              {props.getFloorName(item.Floor)}
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                      </div> */}

                    </div>
                  </div>

                  <TabContext value={value}>
                    <div >
                      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                        <TabList orientation={isSmallScreen ? 'vertical' : 'horizontal'} onChange={handleChanges} aria-label="lab API tabs example" style={{ marginLeft: '20px' }} className='d-flex flex-column flex-xs-column flex-sm-column flex-lg-row'>
                          <Tab label="Overview" value="1" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
                          <Tab label="EB Reading" value="2" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
                          <Tab label="Invoice" value="3" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
                          <Tab label="Amenities" value="4" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
                          <Tab label="Transactions" value="5" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />


                        </TabList>
                      </Box>
                    </div>
                    <TabPanel value="1">
                      <>
                        <div className="overdue mt-3" >
                          <div style={{ flex: 1 }}>
                            <div class="card" style={{ borderRadius: "20px", paddingLeft: 20, paddingTop: 0, paddingRight: 20, paddingBottom: 5 }}>
                              <div class="card-header d-flex justify-content-between align-items-center " style={{ backgroundColor: "transparent" }}>
                                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                                  Basic Information
                                </div>
                                <div style={{ cursor: "pointer" }}>
                                  <div onClick={() => { handleEditUser(props.userDetails) }} style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                  </div>

                                </div>
                              </div>
                              <div class="card-body">
                                <div class="row ">
                                  <div class="col-sm-6">
                                    <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Paying Guest</p>
                                    <p> <Buildings
                                      size="16"
                                      color="#1E45E1"
                                    /> <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", marginLeft: 5 }}>{item.HostelName}</span></p>

                                  </div>
                                  <div class="col-sm-6 text-right">
                                    <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }} onClick={() => { handleShowEditBed(props.userDetails) }}  >Room/Bed</p>
                                    <p onClick={() => { handleShowEditBed(props.userDetails) }}><img src={Group} style={{ cursor: "pointer" }} /><span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", cursor: "pointer" }}>{props.getFormattedRoomId(item.Floor, item.Rooms)} - Bed {item.Bed}</span></p>
                                  </div>
                                </div>
                                <div class="row ">
                                  <div class="col-sm-6">
                                    <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Email</p>
                                    <p><Sms
                                      size="16"
                                      color="#1E45E1"
                                    />

                                      <span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{item.Email}</span></p>
                                  </div>
                                  <div class="col-sm-6 text-right">
                                    <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Mobile no.</p>
                                    <p><Call
                                      size="16"
                                      color="#1E45E1"
                                    />
                                      {/* <img src={call} />  */}
                                      <span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{item.Phone}</span></p>
                                  </div>
                                </div>
                                <div class="row">
                                  <div class="col-sm-6">
                                    <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Address</p>
                                    <p><House
                                      size="16"
                                      color="#1E45E1"
                                    />
                                      {/* <img src={house} /> */}
                                      <span style={{ marginLeft: 5, fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>{item.Address}</span> </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div style={{ flex: 1 }}>

                            {
                              state.UsersList?.customerdetails?.data?.length > 0 && state.UsersList?.customerdetails?.data.map((g) => {

                                return (
                                  <div class="card" style={{ borderRadius: "20px", paddingLeft: 20, paddingTop: 0, paddingRight: 20, paddingBottom: 5 }}>
                                    <div class="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: "transparent" }}>
                                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                                        Detailed Information
                                      </div>

                                    </div>
                                    <div class="card-body">
                                      <div class="row mb-3">
                                        <div class="col-sm-4">
                                          <strong style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Advance Amount</strong>
                                          <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "gilroy" }}><img src={Money} />   ₹{props.userDetails[0].AdvanceAmount}</p>
                                        </div>
                                        <div class="col-sm-4">
                                          <strong style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Rent Amount</strong>
                                          <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "gilroy" }}> <img src={Money} /> ₹{props.userDetails[0].RoomRent}/m</p>
                                        </div>

                                      </div>
                                      <div class="row mb-3">
                                        <div class="col-sm-12">
                                          <strong style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Amenities</strong>

                                          <div class="d-flex flex-wrap mt-2">
                                            {
                                              g?.amentites?.length > 0 && g?.amentites.map((p) => {
                                                return (
                                                  <div key={p.Amnities_Name} style={{ backgroundColor: "#E0ECFF", borderRadius: "10px", paddingLeft: "12px", paddingRight: "12px", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500, paddingTop: "2px", paddingBottom: "3px", margin: "10px" }}>{p.Amnities_Name}</div>

                                                )
                                              })
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            }

                          </div>



                        </div>

                        <div class="card" style={{ borderRadius: "20px", paddingLeft: 20, paddingTop: 0, paddingRight: 20, paddingBottom: 5, marginTop: 30 }}>
                          <div class="card-header d-flex justify-content-between align-items-center " style={{ backgroundColor: "transparent" }}>
                            <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                              KYC details
                            </div>

                          </div>
                          <div class="card-body">
                            <div className="row">
                              <div className='col-lg-5 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3">
                                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Aadhaar Number</Form.Label>
                                  <FormControl
                                    id="form-controls"
                                    placeholder='987654321012'
                                    type="text"
                                    value={props.aadhaarNo}
                                    maxLength={12}
                                    onChange={(e) => props.handleAdhaarChange(e)}
                                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                  />
                                </Form.Group>
                              </div>




                              {props.showOtpValidation && <>
                                <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
                                  <Form.Group className="mb-3">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>OTP</Form.Label>
                                    <FormControl
                                      type="text"
                                      id="form-controls"
                                      placeholder='****'
                                      value={props.kycOtpValue}

                                      onChange={(e) => props.handleKycOtpChange(e)}
                                      style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                    />
                                  </Form.Group>
                                  <span style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}> Didn’t receive OTP? <a href="#" style={{ textDecoration: "none", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }} onClick={() => props.handleValidateAadhaar(item.id)}> Resend</a></span>
                                </div>
                              </>
                              }

                              {props.showValidate &&
                                <div className="mt-2" style={{ marginBottom: 20 }}>
                                  <Button style={{ fontFamily: 'Montserrat', fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 52, letterSpacing: 1, borderRadius: 12, width: "fit-content", padding: "10px, 3px, 10px, 3px", }} onClick={() => props.handleValidateAadhaar(item.id)}>Validate Aadhaar</Button>

                                </div>
                              }
                              {props.showOtpValidation &&
                                <div style={{ marginBottom: 20 }}>
                                  <Button style={{ fontFamily: 'Montserrat', fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 52, letterSpacing: 1, borderRadius: 12, width: 152, padding: "10px, 3px, 10px, 3px" }} onClick={() => props.handleVerifyOtp(item.id)}> Save Changes</Button>

                                </div>}

                            </div>


                          </div>
                        </div>

                        <Modal show={formshow} onHide={handleCloseEditcustomer} centered>
                          <Modal.Dialog style={{ maxWidth: 950, paddingRight: "10px", paddingRight: "10px", borderRadius: "30px" }} className='m-0 p-0'>

                            <Modal.Body>

                              <div className='d-flex align-items-center'>

                                {
                                  customerdetailShow ?
                                    <div>

                                      <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
                                        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Edit Customer
                                          {/* {props.edit === 'Edit' ? "Edit Customer" : "Add an customer"} */}
                                        </div>
                                        <button
                                          type="button"
                                          className="close"
                                          aria-label="Close"
                                          onClick={handleCloseEditcustomer}
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
                                            paddingBottom: "6px"

                                          }}>&times;</span>
                                        </button>
                                      </Modal.Header>

                                      <div className='d-flex align-items-center'>


                                        <div className="" style={{ height: 100, width: 100, position: "relative" }}>

                                          <Image src={file ? (typeof file == 'string' ? file : URL.createObjectURL(file)) : Profile} roundedCircle style={{ height: 100, width: 100 }} />

                                          <label htmlFor="imageInput" className='' >
                                            <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)' }} />
                                            <input
                                              type="file"
                                              accept="image/*"
                                              multiple
                                              className="sr-only"
                                              id="imageInput"
                                              onChange={handleImageChange}
                                              style={{ display: "none" }} />
                                          </label>


                                        </div>
                                        <div className='ps-3'>
                                          <div>
                                            <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy" }}>Profile Photo</label>
                                          </div>
                                          <div>
                                            <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>Max size of image 10MB</label>
                                          </div>
                                        </div>
                                      </div>

                                      <div className='row mt-4'>

                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                          <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>First Name</Form.Label>
                                            <FormControl
                                              id="form-controls"
                                              placeholder='Enter name'
                                              type="text"
                                              value={firstname}
                                              onChange={(e) => handleFirstName(e)}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                          </Form.Group>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                          <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Last Name</Form.Label>
                                            <FormControl
                                              type="text"
                                              id="form-controls"
                                              placeholder='Enter name'
                                              value={lastname}
                                              onChange={(e) => handleLastName(e)}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                          </Form.Group>
                                        </div>


                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                          <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Phone Number</Form.Label>
                                            <FormControl
                                              type="phone"
                                              id="form-controls"
                                              placeholder='Enter mobile Number'
                                              maxLength={10}
                                              value={Phone}
                                              onChange={(e) => handlePhone(e)}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                            <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                                          </Form.Group>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                          <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Email Id</Form.Label>
                                            <FormControl
                                              type="text"
                                              id="form-controls"
                                              placeholder='Enter email address'
                                              value={Email}
                                              onChange={(e) => handleEmail(e)}
                                              // style={bottomBorderStyle}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                            <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                                          </Form.Group>
                                        </div>


                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                          <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Address</Form.Label>
                                            <FormControl
                                              type="text"
                                              id="form-controls"
                                              value={Address}
                                              placeholder='Enter address'
                                              onChange={(e) => handleAddress(e)}
                                              // style={bottomBorderStyle}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                          </Form.Group>
                                        </div>

                                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                          <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest</Form.Label>
                                          <Form.Select
                                            aria-label="Default select example"
                                            className='border'
                                            // style={{ backgroundColor: "#f8f9fa", padding: 10, border: "none", boxShadow: "none", width: "100%", fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}
                                            style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            value={hostel_Id}
                                            onChange={(e) => handleHostelId(e)}
                                          >
                                            <option>Select a PG</option>
                                            {state.UsersList?.hostelList?.map((item) => (
                                              <option key={item.id} value={item.id}>{item.Name}</option>
                                            ))}
                                          </Form.Select>
                                        </div>
                                      </div>
                                      <Button className=' col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat", marginTop: 20 }} disabled={!hasChanges} onClick={handleSaveUserlist}>
                                        {/* {props.edit === 'Edit' ? "Edit Customer" : "Add an customer"} */}
                                        Edit Customer
                                      </Button>
                                    </div>
                                    : ''
                                }



                                {
                                  customerAsignBed && customerAsignBed ?
                                    <div className='container'>
                                      <div className='row mb-3'></div>


                                      <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
                                        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Edit Assign bed</div>
                                        <button
                                          type="button"
                                          className="close"
                                          aria-label="Close"
                                          onClick={handleCloseEditcustomer}
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
                                            paddingBottom: "6px"

                                          }}>&times;</span>
                                        </button>
                                      </Modal.Header>


                                      <div className='row mb-3'>
                                        <div className='col-12'>
                                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Floor</Form.Label>
                                          <Form.Select
                                            aria-label="Default select example"
                                            placeholder='Select no. of floor'
                                            style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            id="form-selects"
                                            className='border'
                                            value={Floor}
                                            onChange={(e) => handleFloor(e)}
                                          >
                                            <option>Selected Floor</option>
                                            {state.UsersList?.hosteldetailslist
                                              ?.map((u) => (
                                                <option key={u.floor_id}>
                                                  {u.floor_id}
                                                </option>
                                              ))}
                                          </Form.Select>
                                        </div>

                                        <div className='col-12 mt-1'>
                                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Room</Form.Label>
                                          <Form.Select
                                            aria-label='Default select example'
                                            placeholder='Select no. of rooms'
                                            style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            value={Rooms}
                                            className='border'
                                            id="form-selects"
                                            onChange={(e) => handleRooms(e)}
                                          >

                                            <option>Selected Room</option>
                                            {/* } */}

                                            {
                                              state.UsersList?.roomdetails &&
                                              state.UsersList.roomdetails.map((item) => (
                                                <option key={item.Room_Id}>
                                                  {item.Room_Id}
                                                </option>
                                              ))

                                            }
                                          </Form.Select>
                                        </div>

                                        <div className='col-12 mt-3 mb-3'>
                                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Bed</Form.Label>
                                          <Form.Select
                                            aria-label='Default select example'
                                            style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            value={Bed}
                                            className='border'
                                            placeholder='Select a bed'
                                            id="form-selects"
                                            onChange={(e) => handleBed(e)}
                                          >
                                            <option>Selected Bed</option>
                                            {Editbed === 'editbeddet' && Bednum && Bednum[0].Bed && (
                                              <option value={Bednum[0].Bed} selected>{Bednum[0].Bed}</option>
                                            )}
                                            {state.UsersList?.bednumberdetails?.bed_details?.length > 0 && state.UsersList.bednumberdetails.bed_details.map((item) => (
                                              <option key={item.bed_no} value={item.bed_no}>{item.bed_no}</option>
                                            ))}
                                          </Form.Select>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                          <Form.Group className="">
                                            <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Advance Amount</Form.Label>
                                            <FormControl
                                              type="text"
                                              id="form-controls"
                                              placeholder='Enter amount'
                                              value={AdvanceAmount}
                                              onChange={(e) => handleAdvanceAmount(e)}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                          </Form.Group>
                                        </div>
                                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                          <Form.Group className="mb-3">
                                            <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Rental Amount</Form.Label>
                                            <FormControl
                                              type="text"
                                              id="form-controls"
                                              placeholder='Enter amount'
                                              value={RoomRent}
                                              onChange={(e) => handleRoomRent(e)}
                                              style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                                            />
                                          </Form.Group>
                                        </div>
                                      </div>

                                      <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }} disabled={!hasChanges} onClick={handleSaveUserlistAddUser}>
                                        Assign Bed
                                      </Button>
                                    </div>
                                    : ''
                                }
                              </div>
                            </Modal.Body>

                            <Modal.Footer style={{ border: "none" }}>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal>
                      </>
                    </TabPanel>
                    <TabPanel value="2"><UserEb id={props.id} /> </TabPanel>
                    <TabPanel value="3"><UserListInvoice id={props.id} /></TabPanel>
                    <TabPanel value="4"><UserListAmenities id={props.id} setcustomerUser_Id={props.setcustomerUser_Id} customerUser_Id={props.customerUser_Id} setHostelIds={props.setHostelIds} hostelIds={props.hostelIds} hostelName={props.hostelName} sethosName={props.sethosName} statusAmni={props.statusAmni} /></TabPanel>
                    <TabPanel value="5"><UserListTransaction id={props.id} /></TabPanel>
                  </TabContext>
                </div>
              )
            })}

          </>
        )
      }
    </>
  )
}
export default UserListRoomDetail;