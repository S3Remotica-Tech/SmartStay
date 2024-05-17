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
import SmartLogo from '../Assets/Images/Logo-Icon.png'

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
    return `${floor_Id}th Floor`;
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
  const [pgList, setPgList] = useState({
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    number_Of_Floor: '',
    number_Of_Rooms: '',
    floorDetails: [],
   
  })

  const [hostelIndex, setHostelIndex] = useState(0)
  const [roomDetails, setRoomDetails] = useState('')
  

  const [selectedHostel, setSelectedHostel] = useState(state.UsersList.hostelList.length > 0 ? state.UsersList.hostelList[0] : {});
  
  const handleHostelSelect = (hostelName) => {
    const selected = state.UsersList.hostelList?.find((item, index) => {
      setHostelIndex(index)
      return item.id == hostelName
    });
    setSelectedHostel(selected);
    handleRowVisibilityChange(true);
    handleBedVisibilityChange(false)
  };


  useEffect(()=>{
    if(state.UsersList?.hosteListStatusCode == 200){
      setSelectedHostel(state.UsersList.hostelList.length > 0 ? state.UsersList.hostelList[0] : {})
      setTimeout(()=>{
        dispatch({ type: 'CLEAR_HOSTELLIST_STATUS_CODE'})
      },1000)
    }
  
  },[state.UsersList?.hosteListStatusCode])


  const [floorDetails, setFloorDetails] = useState([{ number_of_floor: '' }
    // , { number_of_floor: '' }, { number_of_floor: '' }
  ]);


  


  const LoginId = localStorage.getItem("loginId")

  // const [filterhostellist,setFilterhostellist] = useState([]);
  // const [filterlogo,setFilterlogo] = useState([]);


  // useEffect(() => {
  //   if (LoginId) {
  //     try{
  //       const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
  //       const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
  //       const parsedData = decryptedString;
  //       dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })
      
  //     }
      
  //       catch(error){
  //      console.log("Error decrypting loginid",error);
  //       }
  //   }

  // }, [LoginId])

//  useEffect(() => {
//   console.log("filterhostellist", filterhostellist);
//   const filteredLogos = [];

//   for (let i = 0; i < filterhostellist.length; i++) {
//     const hostel = filterhostellist[i];
//     if (hostel === selectedHostel) {
//       const filteredHostels = state.UsersList?.hostelList?.filter((view) => {
//         return view.created_By === hostel.created_By;
//       });

//       filteredLogos.push(...filteredHostels);
//     }
//   }

//   console.log("filteredLogos", filteredLogos);
//   setFilterlogo(filteredLogos);
// }, [filterhostellist, state.UsersList, selectedHostel]);
  

  // useEffect(() => {
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])

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
          price:''
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


  useEffect(()=>{
    if (state.UsersList.createFloorMessage) {

        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = Number(decryptedString);
        dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })
        // dispatch({ type: 'HOSTELLIST' })


      setTimeout(() => {
        dispatch({ type: 'UPDATE_MESSAGE_FLOOR', message: null })
      }, 100)
    }

},[state.UsersList.createFloorMessage])

useEffect(()=>{
if(state.PgList.createPGMessage){
        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = Number(decryptedString);
        dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })
  
       

 setTimeout(() => {
  dispatch({type:'AFTER_CREATE_PG_MSG',message:null})
 }, 100);
}
},[state.PgList.createPGMessage])






  const handleFloorList = (index, roomlist) => {
    var tempArray = pgList.floorDetails
    tempArray[index] = roomlist
    setPgList({ ...pgList, floorDetails: tempArray })
  }

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
      number_Of_Floor: '',
      number_Of_Rooms: '',
      floorDetails: [],
     
    });
    setAddhostelForm(false)
  }







const[decrypt, setDecrypt] = useState('')



 

const loginId = localStorage.getItem('loginId');
  useEffect(() => {
    if (loginId) {
      try {
        const decryptedId = CryptoJS.AES.decrypt(loginId, 'abcd');
        const decryptedIdString = decryptedId.toString(CryptoJS.enc.Utf8);
        const parsedData = Number(decryptedIdString);

        dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })
        setDecrypt(decryptedIdString);
      } catch (error) {
        console.error('Error decrypting loginId:', error);
      }
    }
  }, []); 




  const handleSubmitPgList = () => {
    if (!pgList.Name || !pgList.phoneNumber || !pgList.email_Id || !pgList.location || !pgList.number_Of_Floor ) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
      });
    } else if (pgList.number_Of_Floor == 0) {
      Swal.fire({
        icon: 'warning',
        title: "Number of Floors cannot be 0",
        text:"Please provide a valid number"
      });
    } else {
      dispatch({
        type: 'PGLIST',
        payload: {
          name: pgList.Name,
          phoneNo: pgList.phoneNumber,
          email_Id: pgList.email_Id,
          location: pgList.location,
          number_of_floors: pgList.number_Of_Floor,
          number_Of_Rooms: pgList.number_Of_Rooms,
          floorDetails: pgList.floorDetails,
           created_by: decrypt
        }
      }); 
      setPgList({
        Name: '',
        phoneNumber: '',
        email_Id: '',
        location: '',
        number_Of_Floor: '',
        number_Of_Rooms: '',
        floorDetails: [],
      
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


  const handleCreateFloor = () => {
    const floors = floorDetails.map((floor) => (
      { number_of_floors: parseInt(floor.number_of_floor) }));
    const phoneNumber = selectedHostel.hostel_PhoneNo.toString()
    dispatch({
      type: 'CREATEFLOOR',
      payload: {
        phoneNo: phoneNumber,
        hostelDetails: floors,
      },
    });

    Swal.fire({
      icon: 'success',
      title: 'Create Floor details saved Successfully',
    })
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


 



 




 

  useEffect(() => {
    const selected = state.UsersList.hostelList.find(item => item.Name === selectedHostel?.Name);
    setSelectedHostel(selected);
  }, [state.UsersList.hostelList[hostelIndex]?.number_Of_Floor])

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

  

  const handleDisplayBed = (isVisible,userBeds) =>{
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

  const handlehidePgListForUser = (isVisible) =>{
    setHidePgList(isVisible);
    setBedDetailShow(isVisible)
  
  }
  
  const handleDisplayBedDetails = (isVisible) =>{
    setBedDetailsDisplay(isVisible)
  }




 

const [mouseEnter, setMouseEnter]= useState(false)


const handleMouseEnter = () =>{
  setMouseEnter(true)
}


const handleMouseLeave = () =>{
  setMouseEnter(false)
}
  return (
    <>
     {hidePgList && <> 
      <div className="d-flex justify-content-between p-3">
        <h4>Pg List</h4>
        <div className="d-flex justify-content-center align-items-center p-2">
          <div><p className='mb-0 me-2' style={{ fontSize: 16, fontWeight: 700 }}>Create a new PG</p></div>
          <div><button type="button" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleshowHostelForm}><img src={Plus} height="12" width="12" alt='Plus' /> Create PG</button></div>
        </div>
        {/* <div className="d-flex">
                  <p className='p-1 mr-1'>Create a new PG</p>
                  <button type="button" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "110px", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} onClick={handleshowHostelForm}><img src={Plus} height="12" width="12" alt='Plus' /> Create PG</button>
                </div> */}

        <Offcanvas show={addhostelForm} onHide={handlecloseHostelForm} placement="end" style={{ width: "70vh" }}>
          <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="p-3 m-0 d-flex align-items-center">Create PG</Offcanvas.Title>
          <Offcanvas.Body className='p-0'>   <div className='ps-3 pt-2 pe-3 pb-2'>
            <h6 style={{ color: "#0D6EFD" }}>PG Detail</h6>
            <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
            <div className="d-flex justify-content-center">
              <p style={{ fontSize: "11px", fontWeight: "500" }}>Upload PG Photo</p>
            </div>
            <div className="d-flex justify-content-center" style={{ position: "relative" }}>
              <Image src={Hostel} roundedCircle style={{ height: "50px", width: "50px" }} id="hostel-image" />
              <Image src={CreateButton} style={{ height: "20px", width: "20px", position: "absolute", bottom: 0 }} id="plus-image" />
            </div>

            <div className="form-group mb-4">
              <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>PG Name</label>
              <input type="text"
                value={pgList.Name}
                onChange={(e) => { setPgList({ ...pgList, Name: e.target.value }) }}
                className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter PG Name" style={{ fontSize: "11px" }} />
            </div>
            <div className="form-group mb-4">
              <div className="row">
                <div className="col">
                  <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Phone Number</label>
                  <input type="text"
                    maxLength={10}
                    value={pgList.phoneNumber}
                    onChange={(e) => { setPgList({ ...pgList, phoneNumber: e.target.value }) }}
                    className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter Phone Number" style={{ fontSize: "11px" }} />
                </div>
                <div className="col">
                  <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Email Id</label>
                  <input type="email"
                    value={pgList.email_Id}
                    onChange={(e) => { setPgList({ ...pgList, email_Id: e.target.value }) }}
                    className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter Email Id" style={{ fontSize: "11px" }} />
                </div>
              </div>
            </div>
         
            <div className="form-group mb-4">
              <label for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>PG Location</label>
              <input type="text"
                value={pgList.location}
                onChange={(e) => { setPgList({ ...pgList, location: e.target.value }) }}

                className="form-control custom-border-bottom p-0" id="exampleInput" placeholder="Enter PG Location" style={{ fontSize: "11px" }} />
            </div>


            <div className="form-group mb-3">
              <label htmlFor="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Number Of Floor</label>
              <input
                type="text"
                value={pgList.number_Of_Floor}
                onChange={(e) => setPgList({ ...pgList, number_Of_Floor: e.target.value })}
                className="form-control custom-border-bottom p-0 mt-2"
                id="exampleInput"
                placeholder="Enter Number of Floors"
                style={{ fontSize: "11px" }}
              />
            </div>


            {pgList.number_Of_Floor && (
              <div>
                {Array.from({ length: parseInt(pgList.number_Of_Floor) }, (_, index) => {
                  const floorNumber = index + 1;
                  const numberOfRooms = parseInt(pgList[`number_Of_Rooms_${floorNumber}`]) || 0;
                  const floorLabel = floorNumber === 1 ? 'Ground' : `${floorNumber - 1}`;
                  return (
                    <div key={index} className="form-group mb-3">
                      <label htmlFor="exampleInput" className="form-label mb-1" style={{ fontWeight: 700, fontSize: "11px" }}>
                        {/* {`${pgList.number_Of_Floor === 1 ? 'Ground' : `${pgList.number_Of_Floor}`} Floor `} */}
                        {`${floorLabel} Floor:`}
                      </label>
                      <CreatePG index={index} pgList={pgList} setPgList={setPgList} handleFloorList={handleFloorList}></CreatePG>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
            <hr style={{ marginTop: "50px" }} />
            <div className="d-flex justify-content-end m-3"  >

              <Button variant="white" size="sm" style={{ width: "90px" }} onClick={handleCancels}>
                Cancel
              </Button>
              <Button variant="outline-primary" size="sm" style={{ borderRadius: "20vh", width: "80px" }} onClick={handleSubmitPgList}>
                Save
              </Button>

            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
      <hr />
      {/* <div className="row g-0 d-flex justify-content-start align-items-center p-2" >
        <div className="col-lg-2 col-md-3 col-sm-12 col-xs-12 col-12 d-flex justify-content-between align-items-center p-0" style={{ backgroundColor: "" }} >
          <div className="d-flex justify-content-between align-items-center">
            <Image src={Hostel} roundedCircle style={{ height: "30px", width: "30px" }} />
            <div className="d-block ps-2">
              <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray", fontWeight: 600 }}>PG Detail</p>

              <select onChange={(e) => handleHostelSelect(e.target.value)} class="form-select ps-0" aria-label="Default select example" style={{ backgroundColor: "", padding: "8px", border: "none", boxShadow: "none", width: "100px", fontSize: 9, fontWeight: 700 }}>
                <option disabled selected className='p-3'>Select Hostel</option>
                {state.UsersList.hostelList.map((obj) => {
                  return (<>
                    <option style={{ fontSize: 15 }}>{obj.Name}</option>
                  </>)
                })}

              </select>

            </div>
            <div style={{ borderLeft: "1px solid #cccccc99", height: "30px" }} className="vertical-line"></div>
          </div>
        </div>
        {selectedHostel && <>
          {
            Array.from(Array(selectedHostel.number_Of_Floor), (index, element) => {
              return <SelectedHostelFloorList floorID={element + 1} hostel_Id={selectedHostel.id} phoneNumber={selectedHostel.hostel_PhoneNo} />
            })}

          <div className="col-lg-2  col-md-3 col-sm-4 col-xs-12 col-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
              <button type="button" className="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "auto", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "auto", color: "#2E75EA" }} onClick={handleShow}>
                <span style={{ padding: "20px 20px" }}>
                  <img src={Plus} height="12" width="12" alt='Plus' /> Create Floor  </span></button>
            </div>
          </div>
        </>}
      </div> */}

      <div className="row g-0 p-2" >
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 col-12 d-flex justify-content-start align-items-center p-0" style={{ backgroundColor: "" }} >
          <div className="d-flex justify-content-start align-items-center w-100">
          
   

            {/* Hostel */}
            <div className="d-block ps-2 w-100">
              <p style={{ fontSize: "10px", marginBottom: "0px", color: "gray", fontWeight: 600,marginLeft:'25%'}}>PG Detail</p>
              <div style={{display:'flex',flexDirection:'row'}}>
              <div style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5,marginRight:5 }}>
              {/* <Image  src={selectedHostel && selectedHostel.profile == null ? Hostel : selectedHostel && selectedHostel.profile} roundedCircle style={{ height: 30, width: 30,borderRadius: '50%' }} /> */}
              {selectedHostel && selectedHostel.profile !== null ? (
        <Image src={selectedHostel.profile} roundedCircle style={{ height: 15, width: 15,borderRadius:'50%' }} />
    ) : (
        <Image src={SmartLogo} alt="Default Logo" style={{ height: 15, width: 15,borderRadius:'50%' }} />
    )}
             
              </div>
              
              <select   value={selectedHostel ? selectedHostel.id || "" : ""} onChange={(e) => handleHostelSelect(e.target.value)} class="form-select ps-2" aria-label="Default select example" style={{ backgroundColor: "#f8f9fa", padding:8, border: "none", boxShadow: "none", width: "100%", fontSize: 9, fontWeight: 700,textTransform:"capitalize",borderRadius:"none" }}>
                <option disabled selected className='p-3' style={{ fontSize: 15,textTransform:"capitalize" }}>Select Hostel</option>
                {state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((obj) => {
                  return (<>
                    <option key={obj.id} value={obj.id} style={{ fontSize: 15,textTransform:"capitalize" }}>{obj.Name}</option>
                  </>)
                })}

              </select>
              </div>

            </div>
            <div style={{ borderLeft: "1px solid #cccccc99", height: "45px" }} className="vertical-line ms-1 me-2"></div>
          </div>
        </div>
        {selectedHostel && <>
          {
            Array.from(Array(selectedHostel.number_Of_Floor), (index, element) => {
              return <SelectedHostelFloorList floorID={element + 1} hostel_Id={selectedHostel.id} phoneNumber={selectedHostel.hostel_PhoneNo} />
            })}

          <div className="col-lg-6  col-md-3 col-sm-4 col-xs-12 col-12" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div>
              <button type="button" className="" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "auto", borderRadius: "15px", padding: "2px", border: "1px Solid #2E75EA", height: "auto", color: "#2E75EA" }} onClick={handleShow}>
                <span style={{ padding: "20px 20px" }}>
                  <img src={Plus} height="12" width="12" alt='Plus' /> Create Floor  </span></button>
            </div>
          </div>
        </>}
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: "70vh" }}>
        <Offcanvas.Title style={{ backgroundColor: "#0D6EFD", width: "100%", color: "white", fontSize: "15px", height: "30px", fontWeight: "700" }} className="ps-4">Create Floor</Offcanvas.Title>
        <Offcanvas.Body>
          <p className="text-justify" style={{ fontSize: "11px" }}>Generate revenue from your audience by promoting SmartStay hotels and homes.Be a part of SmartStay Circle, and invite-only,global community of social media influencers and affiliate networks.</p>
          <div className="row g-3 d-flex align-items-center " >
            {floorDetails.map((floor, index) => (
              <>
                <div key={index} className='col-lg-10 col-md-10 col-xs-12 col-sm-12 col-12' style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "0px" }}>
                  <div className="form-group mb-4 ps-1" >
                    <label htmlFor={`floorName${index}`} for="exampleInput" className="form-label mb-1" style={{ fontSize: "11px" }}>Floor Name</label>

                    <input type="text" id={`floorName${index}`}
                      onChange={(e) => handleFloorChange(e.target.value, index)}
                      value={floor.number_of_floor} className="form-control custom-border-bottom p-0" placeholder="Enter here" style={{ boxShadow: "none", fontSize: "11px", backgroundColor: "#F6F7FB", fontWeight: 700, borderTop: "none", borderLeft: "none", borderRadius: 0, width: "", borderRight: "none", borderBottom: "1px solid lightgray" }} />
                  </div>
                </div>

                <div className='col-lg-2 col-md-2 col-xs-12 col-sm-12 col-12 d-flex justify-content-between align-items-center' style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "0px" }}>
                  {index > 0 &&
                    <AiOutlineDelete style={{ color: "red" }} onClick={() => handleDeleteFloor(index)} />
                  }

                </div>

              </>
            ))}
          </div>


          <div className='d-flex mt-2' onClick={handleAddFloor}>
            <div><AiOutlinePlusCircle style={{ height: "30px" }} /> </div>
            <div className='ms-1'><label style={{ color: "gray", fontSize: "12px" }}>Add Floor</label></div>
          </div>
          <hr style={{ marginTop: "130px" }} />

          <div className="d-flex justify-content-end" style={{ marginTop: "40px" }} >

            <Button variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "80px", borderRadius: 200 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateFloor}>
              Save
            </Button>

          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <hr />

      {selectedHostel && <>
        <div className="ms-5 me-5 d-flex justify-content-between p-2">
          <div className='d-flex justify-content-center  align-items-center gap-1'>
            {bedDetailShow && (<>
              <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{backgroundColor:mouseEnter ? "#ebebeb":"transparent",borderRadius:mouseEnter ? 10: "none",padding:5 }}>
                <MdOutlineKeyboardDoubleArrowLeft className="" style={{ fontSize: 23 }} onClick={handleBackToFloors} />
              </span>

            </>)}
            <h5 className='mb-0' style={{ fontSize: 18, color: "black", fontWeight: 600,textTransform:"capitalize" }}>{selectedHostel.Name}</h5>
            {bedDetailShow && <>
              <span>
                <FaAngleRight style={{ fontSize: 16 }} />
              </span>
              <div style={{ fontSize: 18, color: "gray", fontWeight: 600 }} >{getFloorName(bedDetailsPage.Floor_Id)}</div>
            </>}

          </div>

          <div className="d-flex gap-5 ms-2">
            <div className="d-flex gap-1">
              <FaSquare style={{ color: "gray", height: "20px" }} />   <h6 className="ps-2" style={{ color: "gray", fontSize: "" }}>{bedDetailShow ? "Bed Available" : "Room Available"}</h6>
            </div>
            <div className="d-flex gap-1">
              <FaSquare style={{ color: "#25D366", height: "20px" }} />   <h6 className="ps-2" style={{ color: "#25D366" }}>{bedDetailShow ? "Bed Full" : "Room Full"}</h6>
            </div>
          </div>
        </div>
        {
          isRowVisible &&

          <div className="row row-cols-1 row-gap-3 row-cols-md-6 g-1 pt-2" >
            {
              selectedHostel.id &&
              Array.from(Array(selectedHostel.number_Of_Floor), (index, element) => {
                return <DashboardRoomList onRowVisibilityChange={handleRowVisibilityChange} onRowBedVisibilityChange={handleBedVisibilityChange} floorID={element + 1} hostel_Id={selectedHostel.id} phoneNumber={selectedHostel.hostel_PhoneNo} />
              })}
            <div className="col-lg-3 col-md-5  col-sm-10 col-xs-10 col-10 ms-5">
              <div className="card h-100 d-flex justify-content-center align-items-center text-center" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 }} id="card-hover" onClick={handleShow}>
                <div className=" d-flex justify-content-between p-2" style={{ height: '50px' }}></div>
                <div style={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }} >
                  <div className="d-flex justify-content-center align-items-center" >
                    <img src={Plus} height="18" width="16" alt='Plus' />
                  </div>
                  <div>
                    <p style={{ color: "#1F75FE", fontSize: "15px", fontWeight: 600 }}>Create Floor</p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center align-items-center" style={{ height: "60px", width: "35px" }} >

                  </div>
                </div>
              </div>
            </div>

          </div>
        }
        {bedDetailShow && (
          <>
            <BedDetail bedDetailsSendThePage={bedDetailsPage}
                hidePgList={handlehidePgList}
                showBedDetail={handleDisplayBed}
                userBedId={userBedId}
                Hostel_Id={Hostel_Id}
                floorId={floorId}
                floorID={bedDetailsPage.Floor_Id}
                hostel_Id={selectedHostel.id}
                roomId={roomId} /> 
          </>
        )
        }
      </>}
      {roomDetails === 'RoomDetailsPage' && <RoomDetails />}

      </>}

      {bedDetailsDisplay && <>
        <UserBedDetails
          // showCreateBed={showCreatedBed} 
          userBed_Id={usersBed}
          Hostel_Id={hosteID}
          Floor_Id={floorID}
          Room_Id={roomID}
          hidePgList={handlehidePgList}
          backToBed={handlehidePgListForUser}
          hideBed={handleDisplayBedDetails} /> 

</>}


    </>

  );
}

export default PgList;
