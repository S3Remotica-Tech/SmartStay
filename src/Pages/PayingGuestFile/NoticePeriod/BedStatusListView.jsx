/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Green from '../../../Assets/Images/New_images/Frame.png'
import White from '../../../Assets/Images/New_images/empty_bed.png'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types"
import noticeimg from "../../../Assets/Images/New_images/noticeperiodimg.png";
import Tickimg from "../../../Assets/Images/New_images/blue_tick.png";
import EmptyState from '../../../Assets/Images/New_images/empty_image.png';
import "../ParticularHostelDetails.css";
import ConfirmChangeBed from './ConfirmChangeBed';

 

function BedStatusListView(props) {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);


  const [showDots, setShowDots] = useState('')
  const [roomCountData, setRoomCountData] = useState([])
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [loader, setLoader] = useState(false)

  const [confirmchangebed , setConfirmChangeBed] = useState(false)
  const [reserved_customer , setReservedCustomer] = useState("")
  const [selectedBed, setSelectedBed] = useState(null);

   const handleShowconfirmchangeBed = () => {
      setConfirmChangeBed(true)
      setReservedCustomer(props?.Reserved_customer_details)
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props?.Reserved_customer_details?.ID} });
   }

   console.log("props", props.Reserved_customer_details);
   
    const handleCloseconfirmchangeBed = () => {
      setConfirmChangeBed(false)
   }
  

  const handleShowDots = (roomId) => {
    setShowDots(!showDots)
    setActiveRoomId(activeRoomId === roomId ? null : roomId);
  }


  const handleClickBed = (bed, room) => {
    console.log("bed", bed, room);
    
      setSelectedBed({
        floorId: room.Floor_Id,
        roomName: room.Room_Name,
        RoomId : room.Room_Id,
        bedNo: bed.bed_no,
        bedId: bed.id,
        bedamount:bed.bed_amount
      })
  }

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveRoomId(null);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    if (props.floorID && props.hostel_Id) {
      setLoader(true)
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setSelectedBed(null)
    }
    else {
      setLoader(false)
    }
  }, [props.hostel_Id, props.floorID, state?.login?.selectedHostel_Id])


  useEffect(() => {
    if (state?.PgList?.roomCountStatusCode === 200) {
      setRoomCountData(state.PgList?.roomCount);

      setTimeout(() => {
        setLoader(false)
        dispatch({ type: 'CLEAR_STATUS_CODE_ROOM_COUNT' })
      }, 500);
    }
  }, [state?.PgList?.roomCountStatusCode])




  useEffect(() => {
    if (state.PgList?.noRoomsInFloorStatusCode === 201) {

      setRoomCountData([])

      setTimeout(() => {
        setLoader(false)
        dispatch({ type: 'CLEAR_NO_ROOM_STATUS_CODE' })
      }, 200);
    }

  }, [state.PgList?.noRoomsInFloorStatusCode])


  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      dispatch({ type: 'HOSTELLIST' })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' })
      }, 100)
    }
  }, [state.PgList.statusCodeCreateRoom])

  useEffect(() => {
    if (state.PgList.createBedStatusCode === 200) {
      dispatch({ type: 'HOSTELLIST' })
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_BED_STATUS_CODE' })
      }, 4000)
    }
  }, [state.PgList.createBedStatusCode])

  useEffect(() => {
    dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  }, [])

 

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>


      <div >

        <div className='mt-2 mb-2 d-flex justify-content-center w-100 ' style={{ position: "relative" }}>
          {loader && <div
            style={{
              position: 'absolute',
              top: 200,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>}
        </div>

        <div className='container-fluid show-scroll' style={{ maxHeight: "400px", overflowY: "auto", marginTop: "-25px" }}>
          <div className='row mt-4 mb-2 row-gap-3' style={{ fontFamily: "Gilroy" }}>
            {roomCountData.length > 0 && roomCountData.map((room) => (
              <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center' key={room.Room_Id}>
                <Card className="w-100 h-100 fade-in" style={{ border: "1px solid #E6E6E6", borderRadius: 16, minHeight: 120 }}>
                  <Card.Header className="d-flex justify-content-between align-items-start" style={{ backgroundColor: "#E0ECFF", border: "1px solid #E6E6E6", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>


                    <div style={{ width: "110px" }}>
                      <div title={`Room No ${room.Room_Name}`} style={{ fontSize: 14, fontWeight: 600, color: "rgba(34, 34, 34, 1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {room.Room_Name}
                      </div>
    <div
  style={{
    fontSize: 12,
    fontWeight: 400,
    color: "#7C7C7C",
    marginTop: "-2px",
  }}
>
  {(() => {
    if (Array.isArray(room.bed_details) && room.bed_details.length > 0) {
      const count = room.bed_details.filter((bed) => {
        if (props?.Reserved_customer_details?.bed_status === "Check In") {
          return bed.isbooked === 0 && bed.isfilled === 0;
        } else {
          return (
            (bed.isbooked === 0 && bed.isfilled === 0) ||
            (bed.isfilled === 1 &&
              bed.isNoticePeriod === 1 &&
              bed.isbooked !== 1)
          );
        }
      }).length;

      return `${count} sharing`;
    }
    return "0 sharing";
  })()}
</div>

                    </div>

                    <div onClick={() => handleShowDots(room.Room_Id)} style={{ position: "relative", zIndex: showDots ? 1000 : 'auto', cursor: "pointer" }}>
                      <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                      
                    </div>
                  </Card.Header>

                  {/* <Card.Body>
                    <div className="row g-2 overflow-auto" style={{ maxHeight: 240 }}>
                     {Array.isArray(room.bed_details) &&room.bed_details.length > 0 &&room.bed_details.filter((bed) => {
      if (props?.Reserved_customer_details?.bed_status === "Check In") {
        return bed.isbooked === 0 && bed.isfilled === 0;
      } else {
        return (
          (bed.isbooked === 0 && bed.isfilled === 0) ||
          (bed.isfilled === 1 && bed.isNoticePeriod === 1 && bed.isbooked !== 1)
        );
      }
    })
    .map((bed) => (
                          <div
                            key={bed.id}
                            className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${props.addPermissionError ? "disabled" : ""}`}>
                            <div
                              className="d-flex flex-column align-items-center w-100" style={{ cursor: props.addPermissionError ? "not-allowed" : "pointer" }}>
                              <div style={{ position: "relative", width: 34, height: 41 }}>
                                {bed.isNoticePeriod === 1 && bed.isbooked !== 1  &&(
                                  <img
                                    src={selectedBed?.bedId === bed.id ? Tickimg :  noticeimg}
                                    alt="notice"
                                    height={20}
                                    width={20}
                                    style={{  position: "absolute", top: 1, right: -10, cursor: props.addPermissionError ? "not-allowed" : "pointer",}}/> )}

                                {bed.isfilled === 0 && selectedBed?.bedId === bed.id  && (
                                  <img
                                    src={Tickimg}
                                    alt="notice"
                                    height={20}
                                    width={20}
                                    style={{  position: "absolute", top: 1, right: -10, cursor: props.addPermissionError ? "not-allowed" : "pointer",}}
                                  />
                                )}

                                <img
                                  className="mt-1"
                                  src={bed.isfilled ? Green : White}
                                  alt="bedd"
                                  style={{
                                    height: 41,
                                    width: 34,
                                    cursor: props.addPermissionError ? "not-allowed" : "pointer",
                                  }}
                                  onClick={() => {
                                    if (!props.addPermissionError) {
                                      handleClickBed(bed, room);
                                    }
                                  }}
                                />
                              </div>

                              <div
                                className="pt-2"
                                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }}
                              >
                                {bed.bed_no}
                              </div>
                            </div>
                          </div>
                        ))}

                 
                    </div>
                  </Card.Body> */}

                  <Card.Body>
  <div className="row g-2 overflow-auto" style={{ maxHeight: 240 }}>
    {Array.isArray(room.bed_details) && room.bed_details.length > 0 ? (
      (() => {
        const filteredBeds = room.bed_details.filter((bed) => {
          if (props?.Reserved_customer_details?.bed_status === "Check In") {
            // Only empty beds
            return bed.isbooked === 0 && bed.isfilled === 0;
          } else {
            // Original condition
            return (
              (bed.isbooked === 0 && bed.isfilled === 0) ||
              (bed.isfilled === 1 &&
                bed.isNoticePeriod === 1 &&
                bed.isbooked !== 1)
            );
          }
        });

        if (filteredBeds.length === 0) {
          return (
            <div className="d-flex  flex-column  justify-content-center align-items-center text-center " style={{ fontSize: 13, fontWeight: 500, color: "#7C7C7C" , marginTop:'15px'}}>
               <div><img src={EmptyState} style={{ height: 40, width: 40 }} alt="Empty state" /></div>
              No beds available
            </div>
          );
        }

        return filteredBeds.map((bed) => (
          <div
            key={bed.id}
            className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${
              props.addPermissionError ? "disabled" : ""
            }`}
          >
            <div
              className="d-flex flex-column align-items-center w-100"
              style={{ cursor: props.addPermissionError ? "not-allowed" : "pointer" }}
            >
              <div style={{ position: "relative", width: 34, height: 41 }}>
                {bed.isNoticePeriod === 1 && bed.isbooked !== 1 && (
                  <img
                    src={selectedBed?.bedId === bed.id ? Tickimg : noticeimg}
                    alt="notice"
                    height={20}
                    width={20}
                    style={{
                      position: "absolute",
                      top: 1,
                      right: -10,
                      cursor: props.addPermissionError ? "not-allowed" : "pointer",
                    }}
                  />
                )}

                {bed.isfilled === 0 && selectedBed?.bedId === bed.id && (
                  <img
                    src={Tickimg}
                    alt="notice"
                    height={20}
                    width={20}
                    style={{
                      position: "absolute",
                      top: 1,
                      right: -10,
                      cursor: props.addPermissionError ? "not-allowed" : "pointer",
                    }}
                  />
                )}

                <img
                  className="mt-1"
                  src={bed.isfilled ? Green : White}
                  alt="bedd"
                  style={{
                    height: 41,
                    width: 34,
                    cursor: props.addPermissionError ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    if (!props.addPermissionError) {
                      handleClickBed(bed, room);
                    }
                  }}
                />
              </div>

              <div
                className="pt-2"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }}
              >
                {bed.bed_no}
              </div>
            </div>
          </div>
        ));
      })()
    ) : (
      <div className="d-flex  flex-row justify-content-center align-items-center text-center " style={{ fontSize: 13, fontWeight: 500, color: "#7C7C7C" }}>
        <div><img src={EmptyState} style={{ height: 40, width: 40 }} alt="Empty state" /></div>
        No beds available
      </div>
    )}
  </div>
</Card.Body>



                </Card>
                
              </div>
              
            ))}

              { roomCountData.length === 0 && (
              <div className='d-flex flex-column align-items-center justify-content-center text-center w-100 px-3 fade-in'>
                <div><img src={EmptyState} style={{ height: 140, width: 140 }} alt="Empty state" /></div>
                <div className="pb-1 mt-1" style={{ fontWeight: 600, fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No rooms available</div>
                <div className="pb-1 mt-1" style={{ fontWeight: 500, fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There is no room added in this floor.</div>
                <div className='d-flex justify-content-center pb-1 mt-3'>
                
                </div>
              </div>
            )}
       {selectedBed && (
  <div
    className="d-flex justify-content-center align-items-center p-2 border-top bg-white flex-wrap"
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1050, 
    }}
  >
    <div>
      <p  style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" , color:'rgba(75, 75, 75, 1)', margin:0 }}>Bed |   {(() => {
          const room = roomCountData.find(
            (r) => r.Room_Name === selectedBed.roomName
          );
          if (!room || !Array.isArray(room.bed_details)) return "0 sharing";

          const sharing = room.bed_details.filter(
            (bed) =>
              (bed.isbooked === 0 && bed.isfilled === 0) ||
              (bed.isfilled === 1 &&
                bed.isNoticePeriod === 1 &&
                bed.isbooked !== 1)
          ).length;

          return `${sharing} sharing`;
        })()}</p>
      <p>
      <span style={{ fontWeight: 500  ,color:'rgba(30, 69, 225, 1)' , fontSize: 16, fontFamily: "Gilroy" }}>
        {`Room ${selectedBed.roomName} | Bed ${selectedBed.bedNo}`} 
      </span></p>
    </div>
    <div style={{marginLeft:200}}>
    <Button  style={{
                      fontSize: 16,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: 12,
                      padding: "10px 20px",
                      fontFamily: "Gilroy"
                    }}
                    onClick={handleShowconfirmchangeBed}
                    >Continue →</Button>
    </div>
  </div>
)}


           
          </div>
        </div>
       
     

 {
  confirmchangebed && (
    <ConfirmChangeBed show={confirmchangebed} handleClose={handleCloseconfirmchangeBed} reserved_customer={reserved_customer} selectedBedDetails={selectedBed} floorName={props?.floorName}/>
  )
 }


      </div>


    </>
  )
}

BedStatusListView.propTypes = {
  floorID: PropTypes.func.isRequired,
  hostel_Id: PropTypes.func.isRequired,
  deletePermissionError: PropTypes.func.isRequired,
  addPermissionError: PropTypes.func.isRequired,
  editPermissionError: PropTypes.func.isRequired,
  Reserved_customer_details: PropTypes.func.isRequired,
  floorName: PropTypes.func.isRequired,
};
export default BedStatusListView



