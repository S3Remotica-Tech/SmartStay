import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import Bed from '../Assets/Images/bed.png';
import Plus from '../Assets/Images/Create-button.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import { useNavigate} from 'react-router-dom';




function getFormattedRoomId(floor_Id, room_Id) {
  const roomIdString = String(room_Id);

  switch (floor_Id) {
      case 1:
          return` G${roomIdString.padStart(3, '0')}`;
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
const floorId = bedDetailsSendThePage.Floor_Id;
const RoomName = getFormattedRoomId(floorId, roomId)
console.log("bedName",bedName)
  return (

    
  
            
      <div style={{ width: "100%" }}>
        
        <div className="row row-cols-1 row-gap-3 row-cols-md-6 g-1 ms-5 me-5 pt-2" style={{ backgroundColor: "" }}>
                
            <div  className='col-lg-3 col-md-5 col-xs-10 col-sm-12 me-3'>
              <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", width: "auto", maxWidth:400  }}>
                <div className="card-header d-flex justify-content-between p-2">
                  <strong style={{ fontSize: "13px" }}>ROOM-{RoomName}</strong>
                  <FaAngleRight style={{ height: "15px", width: "15px", color: "grey" }} />
                </div>
                <div className="card-body text-center" >
                  <p className="card-title text-center">({numberOfBeds || 0}) Beds</p>
                  <div className="row row-gap-2 pe-3 d-flex  text-center">
                     {bedName.map((u,index)=> ( 
                      <div className="col-3" >
                      <div className="card  text-center align-items-center p-1" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                        <img src={Bed} style={{  height: "100px", width: "35px", color: "gray" }} className="img-fluid mb-0" alt="Room" />
                        <p style={{ marginTop: "2px", fontSize: "10px" }}>Bed {index + 1}</p>
                      </div>
                    </div>
                     ))} 
                    
                    <div className="col-3">
                      <div className="card text-bg-light text-center align-items-center p-1" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }}>
                        <img src={Plus} className="pt-2 mb-0" height="25" width="15" alt="Room" />
                        <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} className="mb-0">Create Bed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="col-lg-3 col-md-5  col-sm-12 col-xs-12">
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


            {/* <div className="col-lg-3 col-md-5 col-sm-12 col-xs-10 col-10">
            <div className="card h-100 d-flex justify-content-center align-items-center" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400,height:"auto" }} id="card-hover">
              <div className="">
                <img src={Plus} height="18" width="16" alt='Plus' />
              </div>
              <div>
                <p style={{ color: "#1F75FE", fontSize: "15px", fontWeight: 600 }}>Create Room</p>
              </div>
            </div>
          </div> */}
          




        </div>
      </div>
    
      
    
  );
}

export default BedDetails;
