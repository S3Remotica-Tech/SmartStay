import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plus from '../Assets/Images/Create-button.png';
import Image from 'react-bootstrap/Image';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Hostel from '../Assets/Images/hostel.png';
import CreateButton from '../Assets/Images/Create-button.png';
import Button from 'react-bootstrap/Button';
import CreatePG from '../Components/CreatePG';
import '../Pages/Dashboard.css';
import { FaSquare } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import RoomDetails from '../Pages/RoomDetails';
import DashboardRoomList from './DashBoardRoomsList';
import SelectedHostelFloorList from './SelectedHostelFloorList';
import BedDetail from './Bed';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import UserBedDetails from '../Pages/UserBedDetails';
import CryptoJS from "crypto-js";
import { FaAngleRight } from "react-icons/fa6";
import SmartLogo from '../Assets/Images/Logo-Icon.png';
import Filter from '../Assets/Images/New_images/Group 13.png';
import PayingGuest from '../Pages/PayingGuestMap'
import Alert from 'react-bootstrap/Alert';
import ParticularHostelDetails from '../Pages/ParticularHostelDetails'
import AddPg from "./AddPg"
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import AddFloor from './AddFloor';
import './PgList.css';
import Nav from 'react-bootstrap/Nav';
import AddRoom from './AddRoom';
import { IoIosArrowDropleft } from "react-icons/io";

function getFloorName(floor_Id) {
  if (floor_Id === 1) {
    return 'Ground Floor';
  } else if (floor_Id === 2) {
    return '1st Floor';
  } else if (floor_Id === 3) {
    return '2nd Floor';
  } else if (floor_Id === 4) {
    return '3rd Floor';
  } else if (floor_Id >= 11 && floor_Id <= 13) {
    const id = floor_Id - 1
    return `${id}th Floor`;
  } else {
    const lastDigit = floor_Id % 10;
    let suffix = 'th';

    switch (lastDigit) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
    }

    return `${floor_Id - 1}${suffix} Floor`;
  }
}


function PgList() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);


console.log("state for pgList",state)



  const [pgList, setPgList] = useState({
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    // number_Of_Floor: '',
    // number_Of_Rooms: '',
    // floorDetails: [],

  })



 
  const [hostelIndex, setHostelIndex] = useState(0)
  const [roomDetails, setRoomDetails] = useState('')


  const [selectedHostel, setSelectedHostel] = useState(false);

console.log("selectedHostel",selectedHostel)


  // const handleHostelSelect = (hostelName) => {
  //   const selected = state.UsersList.hostelList?.find((item, index) => {
  //     setHostelIndex(index)
  //     return item.id == hostelName
  //   });
  //   setSelectedHostel(selected);
  //   handleRowVisibilityChange(true);
  //   handleBedVisibilityChange(false)
  // };

const [filteredData, setFilteredData] = useState([])



  useEffect(() => {
    if (state.UsersList?.hosteListStatusCode == 200) {
     setFilteredData(state.UsersList.hostelList)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_HOSTELLIST_STATUS_CODE' })
      }, 1000)
    }

  }, [state.UsersList?.hosteListStatusCode])


  const [floorDetails, setFloorDetails] = useState([{ number_of_floor: '' }
    // , { number_of_floor: '' }, { number_of_floor: '' }
  ]);





  const LoginId = localStorage.getItem("loginId")



  useEffect(() => {
    const timeout = setTimeout(() => {
      let tempArry = [];
      for (let i = 0; i < pgList.number_Of_Floor; i++) {
        var a = {}
        tempArry.push(a)
      }
      setPgList({ ...pgList, floorDetails: tempArry })
    }, 1000);
    return () => clearTimeout(timeout)
  }, [pgList.number_Of_Floor])


  useEffect(() => {
    const timeout = setTimeout(() => {
      let tempArray = [];
      for (let i = 0; i < pgList.number_Of_Rooms; i++) {
        let newRoom = {
          roomNumber: i + 1,
          number_Of_Bed: '',
          price: ''
        };
        tempArray.push(newRoom);
      }
      setPgList((prevPgList) => ({
        ...prevPgList,
        floorDetails: [tempArray],
      }));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pgList.number_Of_Rooms]);


  useEffect(() => {
    if (state.UsersList.createFloorMessage) {

           dispatch({ type: 'HOSTELLIST' })


       setTimeout(() => {
        dispatch({ type: 'UPDATE_MESSAGE_FLOOR', message: null })
      }, 100)
    }

  }, [state.UsersList.createFloorMessage])
  
  useEffect(() => {
    if (state.PgList.createPGMessage) {
           dispatch({ type: 'HOSTELLIST' })
      setTimeout(() => {
        dispatch({ type: 'AFTER_CREATE_PG_MSG', message: null })
      }, 100);
    }
  }, [state.PgList.createPGMessage])








  const [show, setShow] = useState(false);
  const handleClose = () => {
    setFloorDetails([{ number_of_floor: '' }])
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleCancels = () => {
    handlecloseHostelForm();
  };
  const [addhostelForm, setAddhostelForm] = useState(false)
  const handleshowHostelForm = () => {
    setAddhostelForm(true)
  }
  const handlecloseHostelForm = () => {
    setPgList({
      Name: '',
      phoneNumber: '',
      email_Id: '',
      location: '',
    
    });
    setEmailError('')
    setAddhostelForm(false)
  }







  const [decrypt, setDecrypt] = useState('')





  const loginId = localStorage.getItem('loginId');

  useEffect(() => {
    dispatch({ type: 'HOSTELLIST' })
  }, []);




  const handleSubmitPgList = () => {
    if (!pgList.Name || !pgList.phoneNumber || !pgList.email_Id || !pgList.location
      // || !pgList.number_Of_Floor 
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
      });
    }else if (pgList.phoneNumber.length !== 10) {
      Swal.fire({
        icon: 'warning',
        text: 'Please Enter a valid 10-digit Phone Number',
      });
    }
    else if (!validateEmail(pgList.email_Id)) {
      Swal.fire({
        icon: 'warning',
               text:"Please Enter a valid Email_id"
      });
    } 
    else {
      dispatch({
        type: 'PGLIST',
        payload: {
          name: pgList.Name,
          phoneNo: pgList.phoneNumber,
          email_Id: pgList.email_Id,
          location: pgList.location,
          // number_of_floors: pgList.number_Of_Floor,
          // number_Of_Rooms: pgList.number_Of_Rooms,
          // floorDetails: pgList.floorDetails,
          // created_by: decrypt
        }
      });
      setPgList({
        Name: '',
        phoneNumber: '',
        email_Id: '',
        location: '',
        // number_Of_Floor: '',
        // number_Of_Rooms: '',
        // floorDetails: [],

      });
      handlecloseHostelForm()


    }

  }



  const handleFloorChange = (value, index) => {
    setFloorDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].number_of_floor = value;
      return updatedDetails;
    });
  };


  const handleCreateFloor = (hostel_Id) => {

    Swal.fire({
      icon: 'warning',
      title: 'Do you want create one floor ?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const floors = floorDetails.map((floor) => (
          { number_of_floors: 1 }));
        const hostel_ID= hostel_Id.toString()
        dispatch({
          type: 'CREATEFLOOR',
          payload: {
            hostel_Id : hostel_ID,
            hostelDetails: floors,
          },
        });
        Swal.fire({
          icon: 'success',
          title: 'Create Floor details saved Successfully',
        })
      }
    });



    // const floors = floorDetails.map((floor) => (
    //   { number_of_floors: parseInt(floor.number_of_floor) }));
    // const phoneNumber = selectedHostel.hostel_PhoneNo.toString()
    // dispatch({
    //   type: 'CREATEFLOOR',
    //   payload: {
    //     phoneNo: phoneNumber,
    //     hostelDetails: floors,
    //   },
    // });

    // Swal.fire({
    //   icon: 'success',
    //   title: 'Create Floor details saved Successfully',
    // })
    setFloorDetails([])
    handleClose();
  };

  const handleAddFloor = () => {
    setFloorDetails([...floorDetails, { number_of_floor: '' }])
  }


  const handleDeleteFloor = (index) => {
    setFloorDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails.splice(index, 1);
      return updatedDetails;
    });
  };


  const handleCancel = () => {
    handleClose();
  };













  // useEffect(() => {
  //   const selected = state.UsersList.hostelList.find(item => item.Name === selectedHostel?.Name);
  //   setSelectedHostel(selected);
  // }, [state.UsersList.hostelList[hostelIndex]?.number_Of_Floor])

  const [isRowVisible, setIsRowVisible] = useState(true);
  const [bedDetailShow, setBedDetailShow] = useState(false)
  const [bedDetailsPage, setBedDetailsPage] = useState('')
  const [hidePgList, setHidePgList] = useState(true)
  const [bedDetailsDisplay, setBedDetailsDisplay] = useState(false)
  const [usersBed, setUsersBed] = useState('')
  const [hosteID, setHosteID] = useState('')
  const [floorID, setFloorID] = useState('')
  const [roomID, setRoomID] = useState('')

  const handleRowVisibilityChange = (isVisible) => {
    setIsRowVisible(isVisible);
  };

  const handlehidePgList = (isVisible) => {
    setHidePgList(isVisible);
  };



  const handleDisplayBed = (isVisible, userBeds) => {
    setBedDetailsDisplay(isVisible)

  }

  const userBedId = (bedId) => {
    setUsersBed(bedId)
  }

  const Hostel_Id = (Hostel_Id) => {
    setHosteID(Hostel_Id)
  }

  const floorId = (floorId) => {
    setFloorID(floorId)
  }

  const roomId = (roomId) => {
    setRoomID(roomId)
  }


  const handleBedVisibilityChange = (isVisible, BedDetails) => {
    setBedDetailShow(isVisible)
    setBedDetailsPage(BedDetails)
    setBedDetailsDisplay(false)

  }

  const handleBackToFloors = () => {
    setIsRowVisible(true)
    setBedDetailShow(false)
    setMouseEnter(false)
    setMouseEnter(false)
  }

  const handlehidePgListForUser = (isVisible) => {
    setHidePgList(isVisible);
    setBedDetailShow(isVisible)

  }

  const handleDisplayBedDetails = (isVisible) => {
    setBedDetailsDisplay(isVisible)
  }






  const [mouseEnter, setMouseEnter] = useState(false)


  const handleMouseEnter = () => {
    setMouseEnter(true)
  }


  const handleMouseLeave = () => {
    setMouseEnter(false)
  }

  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Please Enter a Valid Email');
      return false;
    }
  };


  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setPgList({ ...pgList, email_Id: value });
    validateEmail(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
     const validValue = value.replace(/[^0-9]/g, '');
     console.log("validValue",validValue)
    setPgList({ ...pgList, phoneNumber: validValue });
  };

//  new Ui changes 
const [showHostelDetails, setShowHostelDetails]= useState('')
console.log("showHostelDetails",showHostelDetails)

const handleSelectedHostel = (selectedHostelId) => {
  const selected = state.UsersList.hostelList?.find((item, index) => {
    setHostelIndex(index)
    return item.id == selectedHostelId
  });
  setSelectedHostel(true);
  setShowHostelDetails(selected)
}


const [showAddPg, setShowAddPg] = useState(false);

  const handleCloses = () => {
    setShowAddPg(false);
  }
  const handleShowAddPg = () => {
    setShowAddPg(true);
  }



const handleDisplayPgList = (isVisible) =>{
  setHidePgList(isVisible);
}

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(4);

const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const [currentItem, setCurrentItem] = useState('')

  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber);
  } 


  const [showFloor, setShowFloor] = useState(false)
  const [showRoom, setShowRoom] = useState(false)


  const handleAddFloors = () => {
    setShowFloor(true)
}

const handleCloseFloor = () =>{
  setShowFloor(false)
}

const handleShowAddRoom = () => {
    setShowRoom(true)
}

const handlecloseRoom = () =>{
    setShowRoom(false)
}

const [floorClick, setFloorClick] = useState(1)

const  handleFloorClick = (floor) =>{

console.log("Floor", floor)

setFloorClick(floor)

}

const handlebackToPG = () =>{
  setSelectedHostel(false)
  setHidePgList(true);
}










  return (
    <div className='m-4' style={{fontFamily: "Gilroy,sans-serif"}}>
      {hidePgList && <>
        <div className="d-flex justify-content-between align-items-center mb-3">
          
          <div>
            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600 }}>Paying Guest</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
            </div>
           
            <div>
              <Button 
              onClick={handleShowAddPg}
              style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 151, padding: "18px, 20px, 18px, 20px" }}> + Add new PG</Button>
            </div>
          </div>
        </div>

        {
          showAddPg && <AddPg  show={showAddPg} handleClose={handleCloses}/>
        }
              

          <div className='row row-gap-3'>
          {currentItems.length > 0 && currentItems.map((hostel) => {
            return (<>
            <div key ={hostel.id} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
              <PayingGuest   hostel={hostel} OnSelectHostel={handleSelectedHostel}   onRowVisiblity={handleDisplayPgList}/>
                         </div>
                         </>)
                    })}
          

          {filteredData.length == 0 &&

            <div style={{ width: 400 }}>
              <Alert variant="warning" >
                Currently, no hostel are available.
              </Alert>

            </div>
          }

        </div>
   

      
      
        <Pagination className="mt-4 d-flex justify-content-end">
          {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      
      
      
      
      
      
      
      
      </>}

{selectedHostel && (
  <div className=''>
   
    <div className="d-flex justify-content-between align-items-center mb-3">
    
      <div className='d-flex align-items-center'>
      <div onClick={handlebackToPG}>
          <IoIosArrowDropleft style={{height:30, width:30, fontSize:25, color:"#dcdcdc"}} />
          </div>
        <label style={{ fontSize: 24, color: "#000000", fontWeight: 600 }}>{showHostelDetails.Name}</label>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <div className='me-3'>
          <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
        </div>

        <div>
          <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 151, padding: "18px, 20px, 18px, 20px"  }} onClick={()=>handleCreateFloor(showHostelDetails.id)}>+ Create a floor</Button>
        </div>
      </div>
    </div>

{
  showHostelDetails.number_Of_Floor > 0 && 
<>
    <Nav variant="underline"  style={{ borderBottom: "1px solid #DEDEDE", marginBottom: 2 }}>
        {Array.from({ length:showHostelDetails.number_Of_Floor }, (_, index) => (
          <Nav.Item key={index}>
            <Nav.Link  className='Nav-Links' style={{ fontSize: 16 }} 
            active={index + 1 === floorClick}
            onClick={() => handleFloorClick(index + 1)}
            >
              {getFloorName(index + 1)}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

<ParticularHostelDetails
floorID={floorClick}
hostel_Id={showHostelDetails.id}
phoneNumber={showHostelDetails.hostel_PhoneNo}

/>

</>



      }

    {/* Render floors */}
   
     
  


  <div className='row mt-2'>
<div>
    <label style={{fontSize:16, color:"#1E45E1", fontWeight:600, fontFamily:'Montserrat,sans-serif'}} onClick={handleShowAddRoom}>+ Add room</label>
</div>
</div>

  </div>
)}

{/* {selectedHostel && 
   <ParticularHostelDetails  floorID={showHostelDetails.number_Of_Floor} hostel_Id={showHostelDetails.id} phoneNumber={showHostelDetails.hostel_PhoneNo} hostelName={showHostelDetails}/>
} */}


        {showFloor && <AddFloor  show={showFloor} handleClose={handleCloseFloor} />}
        {showRoom && <AddRoom   show={showRoom} handleClose={handlecloseRoom}/>}
    </div>

  );
}

export default PgList;
