import React, { useState, useEffect, useMemo } from 'react'
import moment from 'moment';
import { FaAngleRight } from 'react-icons/fa';
import Bed from '../Assets/Images/bed.png';
import Plus from '../Assets/Images/Create-button.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { TiDeleteOutline } from "react-icons/ti";
import { useLocation } from 'react-router-dom';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import { AiOutlinePlusCircle } from "react-icons/ai";
import Swal from 'sweetalert2';
import Profile from '../Assets/Images/Profile.jpg';
import CryptoJS from "crypto-js";
import recycle from '../Assets/bin.png';



function getFormattedRoomId(floor_Id, room_Id) {

  const roomIdString = String(room_Id);

  switch (floor_Id) {
    case 1:
      return `G${roomIdString.padStart(3, '0')}`;

    case 2:
      return `F${roomIdString.padStart(3, '0')}`;
    case 3:
      return `S${roomIdString.padStart(3, '0')}`;
    case 4:
      return `T${roomIdString.padStart(3, '0')}`;
    default:
      const floorAbbreviation = getFloorAbbreviation(floor_Id);
      return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
  }
}


function getFloorAbbreviation(floor_Id) {

  switch (floor_Id) {
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
      return `${floor_Id}`;
  }
}


function BedDetails(props) {

  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
  };

  const state = useSelector(state => state);


  const [bed, setBed] = useState();
  const [bedName, setBedName] = useState([])
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [file, setFile] = useState(null)



  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };
  const handleClose = () => {
    setFirstname('');
    setLastname('');
    setAddress('');
    setAadharNo('');
    setPancardNo('');
    setLicence('');
    setPhone('');
    setEmail('');
    setBed('');
    setAdvanceAmount('');
    setRoomRent('');
    setPaymentType('');
    setBalanceDue('');
    setShowMenu(false);
    setShowForm(false);
    setPaidAdvance('');
    setPaidrent('');
    setshowsCreateRoom(false)

  };

  const { bedDetailsSendThePage } = props;

  const roomId = bedDetailsSendThePage.Room_Id;



  const dispatch = useDispatch();
  const Hostel_Id = bedDetailsSendThePage.Hostel_Id
  const floorId = bedDetailsSendThePage.Floor_Id;
  // const RoomRent = bedDetailsSendThePage.Room_Rent
  const [RoomRent, setRoomRent] = useState('')
  const RoomName = getFormattedRoomId(floorId, roomId)
  const [roomCount, setRoomCount] = useState([])
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [Phone, setPhone] = useState('')
  const [HostelName, setHostelName] = useState('')
  const [payableamount ,setPayableamount]= useState('');

  const [BalanceDue, setBalanceDue] = useState('')
  const [PaymentType, setPaymentType] = useState('')
  const [AdvanceAmount, setAdvanceAmount] = useState('')
  const [paid_advance, setPaidAdvance] = useState('')
  const [paid_rent, setPaidrent] = useState('')
  const [Address, setAddress] = useState('')
  const [Email, setEmail] = useState('')
  const [AadharNo, setAadharNo] = useState('')
  const [PancardNo, setPancardNo] = useState('')
  const [licence, setLicence] = useState('')
  const [Bednum, setBednum] = useState('')
  const [shows, setShows] = useState(false);
  const [roomDetailsError, setRoomDetailsError] = useState(false);
  const handleCloses = () => {
    setShows(false)
  };

  const handleShows = (val, index) => {
    setShows(true)
  }

  const handleCancels = () => {
    handleCloses();
    setshowsCreateRoom(false)

  };
  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];

    if (fileimgage) {
      setFile(fileimgage);
    }
  };


  const handlePaidadvance = (e) => {
    setPaidAdvance(e.target.value)
  }

  const handlePaidrent = (e) => {
    const value = e.target.value
    if (value <= payableamount){
      setPaidrent(e.target.value)
    } 
  }


  useEffect(()=> {
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

   const oneday_amount = props.bedDetailsSendThePage.Room_Rent /totalDaysInCurrentMonth

   const payableamount = oneday_amount * numberOfDays
   const This_month_payableamount = Math.round(payableamount);
   setPayableamount(This_month_payableamount)


  },[props.bedDetailsSendThePage.Room_Rent])


  const handleAadharNo = (e) => {
    setAadharNo(e.target.value)
  }
  const handlePancardNo = (e) => {
    setPancardNo(e.target.value)
  }
  const handlelicence = (e) => {
    setLicence(e.target.value)
  }
  const handleFirstName = (e) => {
    setFirstname(e.target.value)
  }
  const handleLastName = (e) => {
    setLastname(e.target.value)
  }
  const handlePhone = (e) => {
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

  //create Room 
  const roomDetailsFromState = [];
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [showsCreateRoom, setshowsCreateRoom] = useState(false);
  const [roomDetails, setRoomDetails] = useState([{ roomId: '', numberOfBeds: '', roomRent: '' }
    // , { roomId: '', numberOfBeds: '' }, { roomId: '', numberOfBeds: '' }
  ]);
  const handleCreateRoomShows = () => {
    setshowsCreateRoom(true)
  }
  const handleNumberOfBedChangeForCreateRoom = (numberOfBeds, index) => {
    setRoomDetails(prevState => {
      const updatedRooms = [...prevState];
      updatedRooms[index].numberOfBeds = numberOfBeds;
      return updatedRooms;
    });
  };
  const handleAddRoom = () => {
    setRoomDetails([...roomDetails, { roomId: '', numberOfBeds: '' }]);
    const isExistingRoom = roomDetailsFromState.some(existingRoom =>
      existingRoom.Hostel_Id === props.hostel_Id &&
      existingRoom.Floor_Id === props.floorID &&
      String(existingRoom.Room_Id) === String(roomDetails[0].roomId)
    );

    const isRoomDetailsValid = roomDetails.every(room => room.roomId && room.numberOfBeds);

    if (isExistingRoom && isRoomDetailsValid) {
      setRoomDetailsError(true);
    } else {
      setRoomDetailsError(false);
    }
  };
  const handleRemoveRoomDetails = (indexToRemove) => {
    setRoomDetails((prevDetails) => prevDetails.filter((_, index) => index !== indexToRemove));
  };

  const handleCreateRoom = () => {
    const floorId = props.floorID.toString()
    // const hostel_Id = props.hostel_Id.toString();
    const validRooms = roomDetails.filter(room => room.roomId && room.numberOfBeds);
    if (validRooms.length > 0) {
      dispatch({
        type: 'CREATEROOM',
        payload: {
          id: props.hostel_Id,

          floorDetails: validRooms.map(room => ({
            floorId: floorId,
            roomId: room.roomId,
            number_of_beds: room.numberOfBeds,
            roomRent: room.roomRent
          })),
        },
      });

      Swal.fire({
        icon: 'success',
        title: "Room created successfully",
      })
      setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
      handleCreateRoomCloses();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter at least one valid room.',
      });
    }
    // setRoomCount(state.PgList.roomCount)
  };

  const handleCreateRoomCloses = () => {
    setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
    setshowsCreateRoom(false)
  };

  const handleRoomRentChange = (roomRent, index) => {
    setRoomDetails(prevState => {
      const updatedRoomRent = [...prevState];
      updatedRoomRent[index].roomRent = roomRent;
      return updatedRoomRent;
    });
  }

  const handleRoomIdChange = (roomId, index) => {
    setRoomDetails(prevState => {
      const updatedRooms = [...prevState];
      updatedRooms[index].roomId = roomId;
      return updatedRooms;
    });
    if (roomId !== '' && roomDetailsFromState.some(existingRoom =>
      existingRoom.Hostel_Id === props.hostel_Id &&
      existingRoom.Floor_Id === props.floorID &&
      String(existingRoom.Room_Id) === String(roomId)
    )) {
      setRoomDetailsError(true);
    } else {
      setRoomDetailsError(false);
    }
    setCurrentRoomId(roomId);
  };

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    setRoomRent(roomRentValue);
    let newBalanceDue = 0;
    let BalanceDuelength = 0;


    if (AdvanceAmount <= roomRentValue) {
      newBalanceDue = roomRentValue - AdvanceAmount;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(BalanceDuelength);
    } else if (AdvanceAmount >= roomRentValue) {
      newBalanceDue = AdvanceAmount - roomRentValue;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(-BalanceDuelength);
      // - sign
    }

  }


  const handlePaymentType = (e) => {
    setPaymentType(e.target.value)
  }


  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    setAdvanceAmount(advanceAmount)
    let newBalanceDue = 0;
    let BalanceDuelength = 0;

    if (advanceAmount <= RoomRent) {
      newBalanceDue = RoomRent - advanceAmount;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(BalanceDuelength);
    } else if (advanceAmount >= RoomRent) {
      newBalanceDue = advanceAmount - RoomRent;
      BalanceDuelength = newBalanceDue === 0 ? '00' : newBalanceDue;
      setBalanceDue(-BalanceDuelength);
      // - sign
    }
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }
  const handleEmail = (e) => {
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

  useEffect(() => {
    setRoomCount(state.PgList?.roomCount)
  }, [state.PgList?.roomCount])

  const handleCreateBed = () => {
    if (Hostel_Id && floorId && roomId) {
      const selectedHostel = state.UsersList?.hostelList.find(hostel => hostel.id === Hostel_Id);

      if (selectedHostel) {
        const payload = {
          id: Hostel_Id,
          floorDetails: [{
            floorId: String(floorId),
            roomId: String(roomId),
            number_of_beds: bed,
          }],
        };

        dispatch({ type: 'CREATEROOM', payload });
        Swal.fire({
          icon: 'success',
          title: "Number Of beds Updated Successfully",
        }).then((result) => {
          if (result.isConfirmed) {
            // props.bedDetailsSendThePage.Number_Of_Beds = Number(bed);
          }
        });
        handleCloses();
      }

    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Data Found',
      });
    }

  };


  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom == 200) {
      setTimeout(() => {
        dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: floorId, hostel_Id: Hostel_Id } })
      }, 2000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' });
      }, 2500);

    }
  }, [state.PgList.statusCodeCreateRoom])




  useEffect(() => {
    const selectedHostel = state.UsersList.hostelList && state.UsersList.hostelList.filter((item) => item.id == props.bedDetailsSendThePage.Hostel_Id);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : '');

  })

  const [NumberOfbeds, setNumberOfBeds] = useState(props.bedDetailsSendThePage.Number_Of_Beds)


  useEffect(() => {
    if (state.PgList.statusCodeCreateRoom == 0) {


      const filteredData = state.PgList?.roomCount && state.PgList?.roomCount
        .flatMap(array => array)
        .filter(item => {
          return item.Hostel_Id === Hostel_Id && item.Floor_Id === floorId && item.Room_Id === roomId;
        });

      if (filteredData.length > 0) {
        const AfterCreateNumberOfBeds = filteredData[0].Number_Of_Beds;
        setNumberOfBeds(AfterCreateNumberOfBeds);
      }

    }
  }, [state.PgList?.roomCount, state.PgList.statusCodeCreateRoom]);



  useEffect(() => {
    const initialBedNames = [...Array(NumberOfbeds).keys()].map(index => `Bed ${index + 1}`);
    setBedName(initialBedNames);
  }, [NumberOfbeds]);

  const handleNumberOfBedChange = (numberOfBeds) => {
    setBed(numberOfBeds);
  };

  let ParticularUserId = " "


  const handleDisplayBedDetailUser = (bedId) => {
    dispatch({ type: 'CLEAR_STATUS_CODES' })
    setBednum(bedId)

    if (state.UsersList && state.UsersList.Users) {
      ParticularUserId = state.UsersList.Users.filter(item =>
        item.Bed == bedId &&
        item.Hostel_Id == Hostel_Id &&
        item.Floor == floorId &&
        item.Rooms == roomId 
        // item.Room_Rent == room_Rent
      );
    } else {
      console.error("state.UsersList.Users is undefined or null.");
    }

    // ParticularUserId = state.UsersList?.Users.filter((item => item.Bed == bedId && item.Hostel_Id == Hostel_Id && item.Floor == floorId && item.Rooms == roomId))
    if (ParticularUserId.length > 0) {
      props.hidePgList(false);
      props.showBedDetail(true);
      props.userBedId(bedId);
      props.Hostel_Id(Hostel_Id);
      props.floorId(floorId);
      props.roomId(roomId);
      // props.room_Rent(room_Rent)
    }
    else {
      setShowForm(true);
      setShowMenu(true);
      // props.hidePgList(true);
      // props.showBedDetail(false);
    }


  }


  const LoginId = localStorage.getItem("loginId")

  const [loginID, setLoginID] = useState('')


 
  useEffect(() => {
    dispatch({ type: 'USERLIST',payload:{hostel_id:state.login.selectedHostel_Id} })
  }, [])

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      setFirstname('');
      setLastname('');
      setAddress('');
      setAadharNo('');
      setPancardNo('');
      setLicence('');
      setPhone('');
      setEmail('');
      setAdvanceAmount('');
      setRoomRent('');
      setPaidAdvance('');
      setPaidrent('');
      setPaymentType('');
      setBalanceDue('');
      setPayableamount('')
      handleClose()
    }
  },[state.UsersList?.statusCodeForAddUser])




  const handleSaveUserlist = () => {
    const emailElement = document.getElementById('emailIDError');
    const emailError = emailElement ? emailElement.innerHTML : '';
    
    if (emailError === 'Invalid Email Id *') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid email address',
        confirmButtonText: 'Ok',
        
      });
      return;
    }

    const phoneNumberError = document.getElementById('MobileNumberError')
    const mobileError = phoneNumberError ? phoneNumberError.innerHTML : '';


    if (mobileError === 'Invalid mobile number *') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid 10-digit phone number',
        confirmButtonText: 'Ok',
        
      });
      return;
    }

   
    if (
      firstname &&
      lastname &&
      Phone &&
      Email &&
      Address &&
      AdvanceAmount &&
      props.bedDetailsSendThePage.Room_Rent 
      // paid_advance &&
      // paid_rent 
      // payableamount,

    
    ) {
      dispatch({
        type: 'ADDUSER',
        payload: {
          firstname: firstname,
          lastname: lastname,
          Phone: Phone,
          Email: Email,
          Address: Address,
          AadharNo: AadharNo,
          PancardNo: PancardNo,
          licence: licence,
          HostelName: HostelName,
          hostel_Id: props.bedDetailsSendThePage.Hostel_Id,
          Floor: props.bedDetailsSendThePage.Floor_Id,
          Rooms: props.bedDetailsSendThePage.Room_Id,
          Bed: Bednum,
          AdvanceAmount: AdvanceAmount,
          RoomRent: props.bedDetailsSendThePage.Room_Rent,
          BalanceDue: BalanceDue,
          paid_advance:paid_advance,
          paid_rent:paid_rent,
          PaymentType: PaymentType,
          payable_rent:payableamount,
        },
      });

      // setFirstname('');
      // setLastname('');
      // setAddress('');
      // setAadharNo('');
      // setPancardNo('');
      // setLicence('');
      // setPhone('');
      // setEmail('');
      // setAdvanceAmount('');
      // setRoomRent('');
      // setPaymentType('');
      // setBalanceDue('');
      // handleClose()
          
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All required Fields',
        confirmButtonText: 'Ok',
      });
    }
  };


  useEffect(() => {
    if (state.UsersList.statusCodeForAddUser == 200) {
      dispatch({ type: 'USERLIST',payload:{hostel_id:state.login.selectedHostel_Id} })
      // setTimeout(()=>{
      //   dispatch({ type: 'MANUALINVOICE' })
      // },3000)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
      }, 200)
    }

  }, [state.UsersList.statusCodeForAddUser])

  useEffect(() => {
    if (state.PgList.deleteRoom != null && state.PgList.deleteRoom != "") {
      dispatch({ type: '', payload: { floor_Id: floorId, hostel_Id: Hostel_Id } })
      props.handleBackToFloors()
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_ROOM', message: null })
      }, 100);
    }
  }, [state.PgList.deleteRoom])

  const handleDeleteRoom = () => {

    if (bedDetailsSendThePage.Number_Of_Beds > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Please delete the bed before deleting the room.',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
    else {
      // let roomID = RoomName.replace(/\D/g, "")
      let roomID = bedDetailsSendThePage.Room_Id
      Swal.fire({
        icon: 'warning',
        title: 'Do you want to delete the Room ?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: 'DELETEROOM',
            payload: {
              hostelId: props.hostel_Id,
              floorId: props.floorID,
              roomNo: roomID
            },
          });
          Swal.fire({
            icon: 'success',
            title: 'Room deleted Successfully',
          })
        }
      });
    }

    // dispatch({type:'DELETEROOM'})
  }

  return (
    <>
      <div style={{ width: "100%" }}>

        <div className="row row-gap-3 gx-5  justify-content-start pt-2 ps-2 ps-5" style={{ backgroundColor: "" }}>

          <div className='col-lg-3 col-md-5  col-sm-10 col-xs-10 col-10'>
            <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", width: "auto", maxWidth: 400 }}>
              <div className="card-header d-flex justify-content-between p-2 flex-row">
                <strong style={{ fontSize: "13px" }}>ROOM-{RoomName}</strong>
                <div>
                  {/* <h6 onClick={() => { handleCreateRoomShows(bedDetailsSendThePage) }}>edit</h6> */}
                  <img src={recycle} style={{ height: 13, width: 13, marginRight: 2 }} onClick={handleDeleteRoom} />
                  <FaAngleRight style={{ height: "15px", width: "15px", color: "grey" }} />
                </div>
              </div>
              <div className="card-body text-center" >
                <p className="card-title text-center">({bedName.length || 0}) Beds</p>
                <div className="row  row-gap-3 gx-2  d-flex  justify-content-start p-1">
                  {bedName.map((item, index) => (
                    <div key={index} className="col-lg-3 col-md-3 col-sm-4 col-xs-4 col-6 d-flex justify-content-center" >
                      <div className="card  text-center align-items-center p-1"
                        style={{
                          borderColor: state.UsersList?.Users && state.UsersList?.Users.some(user =>
                            user.Floor == floorId && user.Hostel_Id == Hostel_Id && user.Rooms == roomId && user.Bed === index + 1
                          ) ? "#25D366" : "#e3e4e8",
                          backgroundColor: state.UsersList?.Users && state.UsersList?.Users.some(user =>
                            user.Floor == floorId && user.Hostel_Id == Hostel_Id && user.Rooms == roomId && user.Bed === index + 1
                          ) ? "#25D366" : "#e3e4e8",
                          color: state.UsersList?.Users && state.UsersList?.Users.some(user =>
                            user.Floor == floorId && user.Hostel_Id == Hostel_Id && user.Rooms == roomId && user.Bed === index + 1
                          ) ? "white" : "gray",
                          height: 60,
                          width: 50,
                          borderRadius: "5px"
                        }}
                        onClick={() => handleDisplayBedDetailUser(index + 1)}>
                        <img src={Bed} style={{
                          height: "100px", width: "35px", color: "gray",
                          filter: state.UsersList?.Users && state.UsersList?.Users.some(user =>
                            user.Floor == floorId && user.Hostel_Id == Hostel_Id && user.Rooms == roomId && user.Bed === index + 1
                          ) ? "brightness(0) invert(1)" : "none"
                        }} className="img-fluid mb-0" alt="Room" />
                        <p style={{ marginTop: "2px", fontSize: "10px", display: "flex", flexWrap: "nowrap" }}>{item}</p>
                      </div>
                    </div>
                  ))}

                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 col-6 d-flex justify-content-center" >
                    <div className="card text-bg-light text-center align-items-center p-1" style={{ height: 60, width: 50, borderRadius: "5px", border: "1px solid #2E75EA" }} onClick={() => { handleShows({ RoomName, roomId }) }}>
                      <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt="Room" />
                      <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} className="mb-0">Create Bed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-5  col-sm-10 col-xs-10 col-10">
            <div className="card h-100 d-flex justify-content-center align-items-center" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 }} id="card-hover" onClick={() => { handleCreateRoomShows() }}>
              <div className="">
                <img src={Plus} height="18" width="16" alt='Plus' />
              </div>
              <div>
                <p style={{ color: "#1F75FE", fontSize: "15px", fontWeight: 600 }}>Create Room</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Offcanvas show={shows} onHide={handleCloses} placement="end" style={{ width: "70vh" }}>
        <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-3">Create Bed</Offcanvas.Title>
        <Offcanvas.Body>
          <h4 style={{ fontSize: 14, fontWeight: 600 }}>Create Bed</h4>
          <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>


          <div className="row column-gap-3 g-3 d-flex align-items-center ">


            <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
              <div className=" form-group mb-4 ps-1">

                <label className="form-label mb-1" style={{ fontSize: "11px" }}>Room Name</label>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: "700" }} >{RoomName}</label>
                </div>

              </div>
            </div>



            <div className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
              <div className="form-group mb-4 ps-1">
                <label className="form-label mb-1" style={{ fontSize: "11px" }}>Number of Beds</label>
                <div className="d-flex">
                  <input
                    type="text"
                    value={bed}
                    onChange={(e) => handleNumberOfBedChange(e.target.value)}
                    className="form-control custom-border-bottom p-0"
                    placeholder="Enter here"
                    style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                  />
                </div>
              </div>
            </div>

          </div>

          <hr style={{ marginTop: "100px" }} />

          <div className="d-flex justify-content-end" style={{ marginTop: "15px" }} >
            <Button onClick={handleCancels} variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "90px", borderRadius: 200 }} >
              Cancel
            </Button>
            <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateBed} >
              Save
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>



      <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: "69vh" }}>

        <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >
          Add User
        </Offcanvas.Title>
        <Offcanvas.Body>
          <div class="d-flex flex-row bd-highlight mb-4  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
            <div class="p-1 bd-highlight user-menu">
              <ul className={showForm ? 'active' : ''} onClick={handleMenuClick}  >
                User Details
              </ul>
            </div>
            {/* <div class="p-1 bd-highlight  user-menu">
                <ul className={showForm ? '' : 'active'}
                  onClick={() => setShowForm(false)}
                >KYC Details</ul>
              </div> */}
          </div>
          {showForm &&
            <div>
              <p className="mb-1" style={{ textAlign: "center", fontSize: "15px", marginTop: "-30px" }}>Upload Profile</p>
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
                <div className='row' >
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>First Name</Form.Label>
                      <FormControl
                        id="form-controls"
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
                        id="form-controls"
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
                        type="phone"
                        id="form-controls"
                        maxLength={10}
                        value={Phone} onChange={(e) => handlePhone(e)}
                        style={bottomBorderStyle}
                      />
                      <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Email Id</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={Email} onChange={(e) => handleEmail(e)}
                        style={bottomBorderStyle}
                      />
                      <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                    </Form.Group>
                  </div>
                </div>
                <div className='row'>
                  <div className='col lg-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px" }}>Address</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={Address} onChange={(e) => handleAddress(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-lg-12'>
                    <Form.Label style={{ fontSize: "12px" }}>HostelName</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={props.bedDetailsSendThePage.Hostel_Id}
                      style={bottomBorderStyle}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-lg-6'>
                    <Form.Label style={{ fontSize: "12px" }}> Floor</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={props.bedDetailsSendThePage.Floor_Id}
                      style={bottomBorderStyle}
                    />




                  </div>
                  <div className='col-lg-6 mt-1'>
                    <Form.Label style={{ fontSize: '12px' }}> Room</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={props.bedDetailsSendThePage.Room_Id}
                      style={bottomBorderStyle}
                    />

                  </div>
                  <div className='col-lg-12 mt-3'>
                    <Form.Label style={{ fontSize: '12px' }}> Bed</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={Bednum}
                      style={bottomBorderStyle}
                    />


                  </div>

                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <Form.Group className="">
                      <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Advance Amount</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={AdvanceAmount} onChange={(e) => handleAdvanceAmount(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                  <div className='col lg-6'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Room Rent (Monthly)</Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={props.bedDetailsSendThePage.Room_Rent} onChange={(e) => handleRoomRent(e)}
                        style={bottomBorderStyle}
                      />
                    </Form.Group>
                  </div>
                </div>


                <div className='row'>
                <div className='col-lg-6'>
                  <Form.Group className="">
                    <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Paid Advance</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={paid_advance} onChange={(e) => handlePaidadvance(e)}
                      style={bottomBorderStyle}
                    />
                  </Form.Group>
                </div>

                <div className='col-lg-6'>
                  <Form.Group className="">
                    <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Paid Rent</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={paid_rent} onChange={(e) => handlePaidrent(e)}
                      style={bottomBorderStyle}
                    />
      <p style={{fontSize:'11px',color:'red'}}>* This month payable amount <b style={{color:'black'}}>{payableamount}</b> </p>

                  </Form.Group>
                </div>
                </div>

                <div className='col-lg-6'>
                  <Form.Group className="">
                    <Form.Label style={{ fontSize: "12px", marginTop: "" }}>Payable Rent Amount</Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      value={payableamount} 
                      style={bottomBorderStyle}
                      disabled
                    />
                  </Form.Group>
                </div>
                {/* <div className='row'>
                    <div className='col lg-6'>
                      <Form.Label style={{ fontSize: '12px' }}>PaymentType</Form.Label>
                      <Form.Select
                        id="form-selects"
                        aria-label='Default select example'
                        style={bottomBorderStyle}
                        value={PaymentType}
                        onChange={(e) => handlePaymentType(e)}
                      >
                        <option>Selected PaymentType</option>
                        <option value="Cash">Cash</option>
                        <option value="Online">Online</option>
                      </Form.Select>

                    </div>

                    <div className='col lg-6'>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: "12px" }}>BalanceDue:</Form.Label>
                        <h1 style={{ fontSize: "12px", backgroundColor: "#F6F7FB", padding: 8 }}>{BalanceDue}</h1>


                      </Form.Group>
                    </div>
                  </div> */}

              </div>


              <hr />
              <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

                <Button variant="white" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} onClick={handleSaveUserlist}>
                  Save
                </Button>
                {/* <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }}
                    onClick={() => setShowForm(false)}>
                    Next
                  </Button> */}
              </div>
            </div>
            // :
            // <div>
            //   <div className='container' style={{ marginTop: "30px" }}>
            //     <div className='row'>
            //       <div className='col lg-12'>
            //         <Form.Group className="mb-3">
            //           <Form.Label style={{ fontSize: "12px" }}>Author Card Number</Form.Label>
            //           <FormControl
            //             type="text"
            //             value={AadharNo}
            //             onChange={(e) => handleAadharNo(e)}
            //             style={bottomBorderStyle}
            //             maxLength={12}
            //             id="form-controls"
            //             pattern="\d*"
            //           />
            //         </Form.Group>
            //       </div>
            //     </div>

            //     <div className='row'>
            //       <div className='col lg-12'>
            //         <Form.Group className="mb-3">
            //           <Form.Label style={{ fontSize: "12px" }}>Pan Card Number</Form.Label>
            //           <FormControl
            //             type="text"
            //             id="form-controls"
            //             value={PancardNo} onChange={(e) => handlePancardNo(e)}
            //             style={bottomBorderStyle}
            //           />
            //         </Form.Group>
            //       </div>
            //     </div>

            //     <div className='row'>
            //       <div className='col lg-12'>
            //         <Form.Group className="mb-3">
            //           <Form.Label style={{ fontSize: "12px" }}>Licence</Form.Label>
            //           <FormControl
            //             type="text"
            //             id="form-controls"
            //             value={licence} onChange={(e) => handlelicence(e)}
            //             style={bottomBorderStyle}
            //           />
            //         </Form.Group>
            //       </div>
            //     </div>
            //   </div>
            //   <hr />
            //   <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

            //     <Button variant="white" size="sm" onClick={handleClose}>
            //       Cancel
            //     </Button>
            //     <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} onClick={handleSaveUserlist}>
            //       Save
            //     </Button>
            //   </div>
            // </div>
          }
        </Offcanvas.Body>
      </Offcanvas>



      {/* create Room */}
      <Offcanvas show={showsCreateRoom} onHide={handleCreateRoomCloses} placement="end" style={{ width: "70vh" }}>
        <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-3">Create Room</Offcanvas.Title>
        <Offcanvas.Body>
          <h4 style={{ fontSize: 14, fontWeight: 600 }}>Create Room</h4>
          <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes. Be a part of SmartStay Circle, and invite-only, global community of social media influencers and affiliate networks.</p>

          {/* {roomDetailsError && (
            <div className="p-2 mb-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }}>
                {roomDetails.map((room, index) => (
                    <div key={index}>
                        RoomId {room.roomId} is already exists & available beds are {roomDetailsFromState.find(existingRoom =>
                            existingRoom.Hostel_Id === props.hostel_Id &&
                            existingRoom.Floor_Id === props.floorID &&
                            String(existingRoom.Room_Id) === String(room.roomId)
                        )?.Number_Of_Beds}
                    </div>
                ))}
            </div>
        )} */}

          {roomDetailsError && (
            <div className="p-2 mb-2" style={{ borderRadius: 2, color: 'white', backgroundColor: "#f71b2e", fontSize: '13px' }}>
              {roomDetails.map((room, index) => {
                if (room.roomId === currentRoomId) {
                  return (
                    <div key={index}>
                      RoomId {currentRoomId} is already exists & available beds are {roomDetailsFromState.find(existingRoom =>
                        existingRoom.Hostel_Id === props.hostel_Id &&
                        existingRoom.Floor_Id === props.floorID &&
                        String(existingRoom.Room_Id) === String(room.roomId)
                      )?.Number_Of_Beds}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}



          <div className="row column-gap-4 g-3 d-flex align-items-center ">
            {roomDetails.map((room, index) => (
              <>
                <div key={index} className="col-lg-3 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                  <div className="form-group mb-4 ps-1">
                    <label htmlFor={`roomNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Room Number</label>
                    <input
                      type="text"
                      value={room.roomId}
                      onChange={(e) => handleRoomIdChange(e.target.value, index)}
                      className="form-control custom-border-bottom p-0"
                      id={`roomNumber${index}`}
                      autoFocus
                      placeholder="Enter here"
                      style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                    />
                  </div>
                </div>

                <div key={`beds${index}`} className="col-lg-3 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                  <div className="form-group mb-4 ps-1">
                    <label htmlFor={`bedsNumber${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Number of Beds</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        value={room.numberOfBeds}
                        onChange={(e) => handleNumberOfBedChangeForCreateRoom(e.target.value, index)}
                        className="form-control custom-border-bottom p-0"
                        id={`bedsNumber${index}`}
                        placeholder="Enter here"
                        style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                      />
                    </div>
                  </div>
                </div>
                <div key={`RoomRent${index}`} className="col-lg-3 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                  <div className="form-group mb-4 ps-1">
                    <label htmlFor={`RoomRent${index}`} className="form-label mb-1" style={{ fontSize: "11px" }}>Room Rent</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        value={room.roomRent}
                        onChange={(e) => handleRoomRentChange(e.target.value, index)}
                        className="form-control custom-border-bottom p-0"
                        id={`RoomRent${index}`}
                        placeholder="Enter here"
                        style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, borderRight: "none", borderBottom: "1px solid lightgray" }}
                      />
                    </div>
                  </div>
                </div>

                {index > 0 &&
                  <div className="col-lg-1">
                    <TiDeleteOutline style={{ fontSize: 18, color: "red", cursor: "pointer" }} onClick={() => handleRemoveRoomDetails(index)} />
                  </div>
                }
              </>
            ))}
          </div>

          <div onClick={handleAddRoom}>
            <AiOutlinePlusCircle style={{ height: "30px" }} /> <label style={{ color: "gray", fontSize: "14px" }}>Add Room</label>
          </div>
          <hr style={{ marginTop: "100px" }} />

          <div className="d-flex justify-content-end" style={{ marginTop: "15px" }}>
            <Button variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "90px", borderRadius: 200 }} onClick={handleCancels}>
              Cancel
            </Button>
            <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateRoom}>
              {roomDetailsError ? "Update" : "Save"}
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>


    </>

  );
}

export default BedDetails;

