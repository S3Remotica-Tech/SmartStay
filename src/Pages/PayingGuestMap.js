import React, { useState, useEffect } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import Vendors from '../Assets/Images/New_images/profile-picture.png';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';





function PayingGuestMap(props) {


    const [showDots, setShowDots] = useState(null);

    const handleMouseEnter = (hostelId) => {
      setShowDots(hostelId);
    };
  
    const handleMouseLeave = () => {
      setShowDots(null);
    };


    const handleEdit = (item) => {

    };



    const handleDelete = (item) => {

    }

    const handleSelectedHostel = (selectedHostel) => {
props.OnSelectHostel(selectedHostel)
props.onRowVisiblity(false)
    }



    return (
        <Card className="h-100" key={props.hostel && props.hostel.id} style={{ borderRadius: 16, border: "1px solid #E6E6E6" }} onClick={()=>handleSelectedHostel(props.hostel.id)}>
            <Card.Body style={{ padding: 20 }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap" >
                    <div className='d-flex gap-2'>
                        <div className="">
                            <Image src={props.hostel && props.hostel.profile ? props.hostel.profile : Vendors} roundedCircle style={{ height: "60px", width: "60px" }} />
                        </div>
                        <div >
                            <div className='pb-2'>
                                <label style={{ fontSize: 16, color: "#222222", fontWeight: 600,fontFamily:"Gilroy"}} >{props.hostel && props.hostel.Name}</label>
                            </div>
                            <div>
                                <div style={{ backgroundColor: "rgba(255, 239, 207, 1)", fontWeight: 500, width: "fit-content", padding: 5, borderRadius: 10, fontSize: 14 ,fontFamily:"Gilroy",color:'rgba(34, 34, 34, 1)'}}>Paying Guest</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: showDots ? 1000 : 'auto' }} onMouseEnter={() => handleMouseEnter(props.hostel.id)}
                        onMouseLeave={handleMouseLeave}>
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                            {showDots === props.hostel.id && <>
                                <div style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 0, top:10, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                    <div >
                                        <div className='mb-2' onClick={() => handleEdit(props.vendor)} >
                                            <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" }} >Edit</label>
                                        </div>
                                        <div onClick={() => handleDelete(props.vendor)}>
                                            <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#FF0000" }}>Delete</label>
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
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Email ID </label>
                        </div>
                        <div >
                            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.hostel && props.hostel.email_id}</label>
                        </div>

                    </div>
                    <div className='mb-2'>
                        <div className='mb-1'>
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Contact Number</label>
                        </div>
                        <div>
                            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>+91 {props.hostel && props.hostel.hostel_PhoneNo}</label>
                        </div>

                    </div>
                </div>

                <div className='mb-2'>
                    <div className='mb-1'>
                        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}> Address</label>

                    </div>

                    <div>
                        <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.hostel && props.hostel.Address}</label>
                    </div>

                </div>




            </Card.Body>
            
        </Card>
    )
}

export default PayingGuestMap