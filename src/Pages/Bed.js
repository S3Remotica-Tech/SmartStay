import React, { useState, useEffect, useMemo } from 'react'
import { FaAngleRight } from 'react-icons/fa';
import Bed from '../Assets/Images/bed.png';
import Plus from '../Assets/Images/Create-button.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Topbar from '../Components/Topbar';
import Sidebar from '../Components/Sidebar';
import { useNavigate } from 'react-router-dom';
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
  // console.log(state, "state");
  const [bed, setBed] = useState();
  const [bedName, setBedName] = useState([])


  // console.log("props for bedDetails ", props)
  const { bedDetailsSendThePage } = props;

  const roomId = bedDetailsSendThePage.Room_Id;
  const initialNumberOfBeds = bedDetailsSendThePage.Number_Of_Beds;

  // console.log("initialNumberOfBeds",bedDetailsSendThePage.Number_Of_Beds)

  const dispatch = useDispatch();
  const Hostel_Id = bedDetailsSendThePage.Hostel_Id
  const floorId = bedDetailsSendThePage.Floor_Id;
  const RoomName = getFormattedRoomId(floorId, roomId)
  const [roomCount, setRoomCount] = useState([])



  const [shows, setShows] = useState(false);
  const handleCloses = () => {
    setShows(false)
  };

  const handleShows = (val, index) => {
    setShows(true)
    console.log("value for handleShows", val)
  }

  const handleCancels = () => {
    handleCloses();
  };

  useEffect(() => {
    setRoomCount(state.PgList.roomCount)
    console.log("roomCount for ", roomCount)
  }, [state.PgList.roomCount])

  const handleCreateBed = () => {
    if (Hostel_Id && floorId && roomId) {
      const selectedHostel = state.UsersList?.hostelList.find(hostel => hostel.id === Hostel_Id);
      console.log("selectedHostel", selectedHostel)

      if (selectedHostel) {
        const payload = {
          phoneNo: String(selectedHostel.hostel_PhoneNo),
          floorDetails: [{
            floorId: String(floorId),
            roomId: String(roomId),
            number_of_beds: bed,
          }],
        };
        console.log('Payload:', payload);
        dispatch({ type: 'CREATEROOM', payload });
        Swal.fire({
          icon: 'success',
          title: "Number Of beds Updated Successfully",
        }).then((result) => {
          if (result.isConfirmed) {
            props.bedDetailsSendThePage.Number_Of_Beds = Number(bed);
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
    const initialBedNames = [...Array(initialNumberOfBeds).keys()].map(index => `Bed ${index + 1}`);
         
    setBedName(initialBedNames);
  }, [initialNumberOfBeds, bedName]);


  
  





  const handleNumberOfBedChange = (numberOfBeds) => {
    setBed(numberOfBeds);
  };



  const [loading, setLoading] = useState(false);

  const handleDisplayBedDetailUser =  (bedId) => {
    console.log("executed")
    console.log("bedId", bedId)
    if (bedId) {
      setLoading(true);
      dispatch({ type: 'BEDDETAILS', payload: { hostel_Id: Hostel_Id, floor_Id: floorId, room_Id: roomId, bed_Id: bedId } })
       
    }
  }

  useEffect(() => {
    dispatch({ type: 'USERLIST' })
  }, [])
  


  useEffect(() => {
       if (state.PgList?.statusCode === 200) {
        const UserBed = state.PgList?.bedDetailsForUser?.response?.data;
        console.log("userbed", UserBed);
        props.hidePgList(false);
        props.showBedDetail(true, UserBed);
        dispatch({ type: 'CLEAR_STATUS_CODE_BED' });
      } else if (state.PgList?.errorStatusCode === 201) {
        setLoading(false);
        console.log("executed");
        props.hidePgList(true);
        props.showBedDetail(false);
        dispatch({ type: 'CLEAR_STATUS_CODE' });
      }
     }, [state.PgList?.statusCode, state.PgList?.errorStatusCode]);
 
 return (
    <>
      <div style={{ width: "100%" }}>

        <div className="row row-gap-3 gx-5  justify-content-start pt-2 ps-2 ps-5" style={{ backgroundColor: "" }}>

          <div className='col-lg-3 col-md-5  col-sm-10 col-xs-10 col-10'>
            <div className="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", width: "auto", maxWidth: 400 }}>
              <div className="card-header d-flex justify-content-between p-2">
                <strong style={{ fontSize: "13px" }}>ROOM-{RoomName}</strong>
                <FaAngleRight style={{ height: "15px", width: "15px", color: "grey" }} />
              </div>
              <div className="card-body text-center" >
                <p className="card-title text-center">({bedName.length || 0}) Beds</p>
                <div className="row  row-gap-3 gx-2  d-flex  justify-content-start p-1">
                  {bedName.map((item, index) => (
                    <div className="col-lg-3 col-md-3 col-sm-4 col-xs-4 col-6 d-flex justify-content-center" >
                      <div className="card  text-center align-items-center p-1" style={{borderColor:state.UsersList.Users.some(user => user.Bed === index + 1) ? "#25D366" : "#e3e4e8", backgroundColor: state.UsersList.Users.some(user => user.Bed === index + 1) ? "#25D366" : "#e3e4e8", color: state.UsersList.Users.some(user => user.Bed === index + 1) ? "white" : "gray",height: 60, width:50, borderRadius: "5px" }} onClick={() => handleDisplayBedDetailUser(index + 1)}>
                        <img src={Bed} style={{ height: "100px", width: "35px", color: "gray" ,filter: state.UsersList.Users.some(user => user.Bed === index + 1) ? "brightness(0) invert(1)" : "none"}} className="img-fluid mb-0" alt="Room" />
                        <p style={{ marginTop: "2px", fontSize: "10px",display:"flex",flexWrap:"nowrap" }}>{item}</p>
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
            <div className="card h-100 d-flex justify-content-center align-items-center" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto", maxWidth: 400 }} id="card-hover">
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
      {/* {loading &&  <Spinner animation="border" variant="primary" />} */}
    </>

  );
}

export default BedDetails;

