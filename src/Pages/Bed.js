import React, { useState, useEffect } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import Bed from '../Assets/Images/bed.png';
import Plus from '../Assets/Images/Create-button.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import { useNavigate} from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

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
 
  const state = useSelector(state => state);
  console.log(state, "state");
 
  const location = useLocation();
  
  console.log("props for bedDetails ",props)
  const { bedDetailsSendThePage } = props;
  const numberOfBeds = bedDetailsSendThePage.Number_Of_Beds;
  const roomId = bedDetailsSendThePage.Room_Id;
  console.log("numberOfBeds",numberOfBeds)
 
const bedName = [...Array(numberOfBeds).keys()]
const dispatch = useDispatch();

console.log("bedName",bedName)
const Hostel_Id = bedDetailsSendThePage.Hostel_Id

const floorId = bedDetailsSendThePage.Floor_Id;
const RoomName = getFormattedRoomId(floorId, roomId)

console.log("RoomName",RoomName)
const [shows, setShows] = useState(false);
    const handleCloses = () => {
        // setRoomDetails([{ roomId: '', numberOfBeds: '' }]);
        setShows(false)
    };

    const handleShows = (val, index) => {
      setShows(true)
      console.log("value for handleShows",val)
    }

    const handleCancels = () => {
      handleCloses();
  };


// const handleCreateBed = () => {
// if(Hostel_Id && floorId && roomId ){
//   dispatch({ type: 'CREATEROOM', payload : { phoneNo: state.UsersList?.hostelList.hostel_PhoneNo,
//     floorDetails:{
//     floorId:floorId,
//     roomId:roomId,
//     number_of_beds:numberOfBeds
//   }
//     }})
// }

// }



const handleCreateBed = () => {
    if (Hostel_Id && floorId && roomId) {
    const selectedHostel = state.UsersList?.hostelList.find(hostel => hostel.id === Hostel_Id);
console.log("selectedHostel",selectedHostel)

if(selectedHostel){
    const payload = {
      phoneNo: String(selectedHostel.hostel_PhoneNo),
      floorDetails: [{
        floorId: String(floorId),
        roomId: String(roomId),
        number_of_beds:bed,
      }],
    };
    console.log('Payload:', payload); 
    dispatch({ type: 'CREATEROOM', payload });
    Swal.fire({
      icon: 'success',
      title: "Number Of beds Updated Successfully",
  }).then((result) => {
      if (result.isConfirmed) {
      }
  });
  
  handleCloses();
  }
  
}else{
  Swal.fire({
    icon: 'warning',
    title: 'No Data Found',
});
}
};




const [bed, setBed] = useState('')

const handleNumberOfBedChange = (numberOfBeds) => {
  setBed(numberOfBeds)
};




  return (

    
  
         <> 
      <div style={{ width: "100%" }}>
        
        <div className="row row-gap-3 row-column-gap-4 gap-3 g-2 justify-content-start ps-5 pt-2 pe-5" style={{ backgroundColor: "" }}>
                
            <div  className='col-lg-4 col-md-5 col-xs-12 col-sm-12'>
              <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", width: "auto", maxWidth:400  }}>
                <div className="card-header d-flex justify-content-between p-2">
                  <strong style={{ fontSize: "13px" }}>ROOM-{RoomName}</strong>
                  <FaAngleRight style={{ height: "15px", width: "15px", color: "grey" }} />
                </div>
                <div className="card-body text-center" >
                  <p className="card-title text-center">({numberOfBeds || 0}) Beds</p>
                  <div className="row row-gap-3 pe-3 d-flex  text-center">
                     {bedName.map((item,index)=> ( 
                      <div className="col-3" >
                      <div className="card  text-center align-items-center p-1" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                        <img src={Bed} style={{  height: "100px", width: "35px", color: "gray" }} className="img-fluid mb-0" alt="Room" />
                        <p style={{ marginTop: "2px", fontSize: "10px" }}>Bed {index + 1}</p>
                      </div>
                    </div>
                     ))} 
                    
                    <div className="col-3">
                      <div className="card text-bg-light text-center align-items-center p-1" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }} onClick={() => { handleShows({RoomName,roomId}) }}>
                        <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt="Room" />
                        <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} className="mb-0">Create Bed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 col-xs-12 col-sm-12">
            <div className="card h-100 d-flex justify-content-center align-items-center text-center" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400}} id="card-hover" >
            <div className=" d-flex justify-content-between p-2" style={{height:'50px'}}></div>
              <div style={{ display: "flex",flexDirection:'column', justifyContent: "center", alignItems: "center" }} >
              <div className="d-flex justify-content-center align-items-center" >
                <img src={Plus} height="18" width="16" alt='Plus' />
              </div>
              <div>
                <p style={{ color: "#1F75FE", fontSize: "15px", fontWeight: 600 }}>Create Room</p>
              </div>
              </div>
              <div className="col-4">
                                <div className=" text-center align-items-center" style={{ height: "60px", width: "35px"}} >
                                  
                                </div>
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
                                                     
                            
                                <div  className="col-lg-6 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                                    <div className=" form-group mb-4 ps-1">
                                      
                                        <label  className="form-label mb-1" style={{ fontSize: "11px" }}>Room Name</label>
                                        <div>
                                        <label style={{ fontSize: "11px" ,fontWeight:"700"}} >{RoomName}</label>
                                        </div>
                                        
                                    </div>
                                </div>
                       


                    <div  className="col-lg-4 col-md-12 col-xs-12 col-sm-12 col-12 mb-4" style={{ backgroundColor: "#F6F7FB", height: "60px", borderRadius: "5px" }}>
                        <div className="form-group mb-4 ps-1">
                            <label  className="form-label mb-1" style={{ fontSize: "11px" }}>Number of Beds</label>
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

                    {/* {index > 0 &&
                        <div className="col-lg-1">
                            <TiDeleteOutline style={{ fontSize: 18, color: "red", cursor: "pointer" }} onClick={() => handleRemoveRoomDetails(index)} />
                        </div>
                    } */}

              
        </div>
        {/* <div >
            <AiOutlinePlusCircle style={{ height: "30px" }} /> <label style={{ color: "gray", fontSize: "14px" }}>Add Bed</label>
        </div> */}
        <hr style={{ marginTop: "100px" }} />

        <div className="d-flex justify-content-end" style={{ marginTop: "15px" }} >
            <Button onClick={handleCancels}  variant="outline-secondary" className='ms-2 me-2' size="sm" style={{ width: "90px", borderRadius: 200 }} >
                Cancel
            </Button>
            <Button variant="outline-primary" className='ms-2 me-2' size="sm" style={{ borderRadius: 200, width: "80px" }} onClick={handleCreateBed} >
              Save
            </Button>
        </div>
    </Offcanvas.Body>
</Offcanvas>
      
</>  
  
      );
}

export default BedDetails;
