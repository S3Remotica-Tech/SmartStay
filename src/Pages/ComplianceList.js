import React, { useState, useEffect } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import Vendors from '../Assets/Images/New_images/profile-picture.png';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import User from '../Assets/Images/Ellipse 1.png';
import Tickicon from '../Assets/Images/tick-circle.png'
import Profile_add from '../Assets/Images/profile-add.png'
import moment from 'moment';




const ComplianceList = (props) => {

    
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


  function getFormattedRoomId(floor_Id, room_Id) {
    const roomIdString = String(room_Id);
    switch (floor_Id) {
        case 1:
            return `${roomIdString.padStart(3, '0')}`;
        case 1:
            return `G${roomIdString.padStart(3, '0')}`;
        case 2:
            return `F${roomIdString.padStart(3, '0')}`;
        case 3:
            return `S${roomIdString.padStart(3, '0')}`;
        case 4:
            return `T${roomIdString.padStart(3, '0')}`;
        default:
            const floorAbbreviation = getFloorAbbreviation(floor_Id-1);
            console.log("floorAbbreviation",floorAbbreviation,floor_Id );
            // return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
            return `${roomIdString.padStart(3, '0')}`;
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


    const [showDots, setShowDots] = useState('')

    const handleShowDots = () => {
        setShowDots(!showDots)
    }

    const handleEdit = (item) => {
        props.onEditComplaints(item);
    };

    const handleassignshow = () => {
        console.log('Assign button clicked'); // Add a log here
        props.onAssignshow()
    }

    console.log("handleSow props", props)

    // const handleDelete = (item) =>{
    //   props.onDeleteVendor(item)
    // }


    return (
        <Card className="h-100" style={{ borderRadius: 16, border: "1px solid #E6E6E6" }}>
            <Card.Body style={{ padding: 20 }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap" >
                    <div className='d-flex gap-2'>
                        <div className="">
                            <Image src={User} roundedCircle style={{ height: "60px", width: "60px" }} />
                        </div>
                        <div >
                            <div className='pb-2'>
                                <label style={{fontFamily:'Gilroy', fontSize: 16, color: "#222", fontWeight: 600, marginLeft: '10px' }} >{props.complaints && props.complaints.Name} </label>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#FFE0D9', padding: '6px 12px',  borderRadius: '60px', marginRight: '10px' ,fontFamily:'Gilroy', fontSize: 16, color: "#222", fontWeight: 500}}>{getFormattedRoomId(props.complaints.Floor_id, props.complaints.Room)} - B{props.complaints && props.complaints.Bed}</div>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#FFEFCF', padding: '6px 12px',  borderRadius: '60px', fontFamily:'Gilroy', fontSize: 16, color: "#222", fontWeight: 500 }}>{getFloorName(props.complaints.Floor_id)}
                                        {/* {props.complaints && props.complaints.Floor_id} */}
                                        {/* Ground floor */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                            {showDots && <>
                                <div style={{ backgroundColor: "#FFFFFF", position: "absolute", right: 0, top: 50, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                    <div >
                                        <div className='mb-2' onClick={() => handleEdit(props.complaints)}>
                                            <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Edit</label>
                                       
                                        </div>
                                        <div  >
                                            <img style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000" }}>Delete</label>
                                        </div>
                                    </div>
                                </div>


                            </>}

                        </div>
                    </div>
                </div>
                <hr style={{ border: "1px solid #E7E7E7" }} />

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal' }}>Request ID </label>
                        </div>
                        <div >
                            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal'  }}>{props.complaints && props.complaints.Requestid}</label>
                        </div>

                    </div>

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal' }}> Complaint date</label>
                        </div>
                        <div>
                            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal'  }}>{moment(props.complaints.date).format('DD-MM-YYYY')} </label>
                        </div>

                    </div>

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal' }}>Assigned to</label>
                        </div>
                        <div>
                        <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal'  }}>
      {props.complaints.Assign  === '' || props.complaints.Assign == null ? (
        <p onClick={handleassignshow} style={{color:'#1E45E1',fontSize:'16px'}}>+ Assign</p>
      ) : (
        props.complaints.Assign
      )}
    </label>                        </div>

                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between' }}>
                <div className='mb-2'>
                    <div className='mb-1'>
                        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal' }}> Complaint type</label>

                    </div>

                    <div>
                        <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal'  }}>{props.complaints && props.complaints.Complainttype}- {props.complaints && props.complaints.Description}</label>
                    </div>

                </div>

                <div className='mb-2'>
                    <div className='mb-1'>
                        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal' }}> Status</label>

                    </div>

                    <div>
                        <label style={(props.complaints && props.complaints.Status.toUpperCase() === "COMPLETED") ? { color: "#00A32E" } : { color: "#FF9E00" }}>{props.complaints && props.complaints.Status}</label>
                    </div>

                </div>
                </div>

                <hr style={{ border: "1px solid #E7E7E7" }} />
                
                <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy, sans-serif" }}>
      {props.complaints.Assign === '' || props.complaints.Assign  == null ? (
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#222', fontFamily: 'Gilroy' ,fontStyle:'normal',lineHeight:'normal'}}>
          <img src={Profile_add} className='me-2' alt="Add Profile" />
          Yet to assign the complaint
        </p>
      ) : (
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#222', fontFamily: 'Gilroy',fontStyle:'normal',lineHeight:'normal' }}>
          <img src={Tickicon} className='me-2' alt="Success" />
          successfully attended on {moment(props.complaints.date).format('DD-MM-YYYY')}
        </p>
      )}
    </label>

            </Card.Body>
        </Card>
    )
}
export default ComplianceList;