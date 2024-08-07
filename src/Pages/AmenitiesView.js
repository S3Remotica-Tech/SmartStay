import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import img2 from '../Assets/Images/edit.png';
import dottt from "../Assets/Images/Group 14.png"
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/New_images/edit.png';



function AmenitiesView(props) {

    const state = useSelector(state => state)

    const handleEditAmenities = (item) => {
        props.modalEditAmenities(item)
    }

    const [showDots, setShowDots] = useState(false)

    const handleShowDots = () => {
        setShowDots(!showDots)
        console.log("handle edit works");
        
    }

    return (
        <>

            <tr style={{ lineHeight: "40px" }}>
                <td className='ps-1 ps-lg-5' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{props.item.Name}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{props.item.Amnities_Name}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>₹ {props.item.Amount}</td>
                {/* <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{amenity.Status == 1 ? "Active" : "Inactive"}</td> */}
                <td style={{
                    // paddingTop: 20,
                    fontSize: "16px",
                    color: props.item.Status == 1 ? "green" : "red",
                    fontWeight: 500
                }}>
                    {props.item.Status == 1 ? <span style={{ backgroundColor: '#D9FFD9', padding: '8px 12px', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy' }}>Active</span> : <span
                        // onClick={() => handleShow(props.item)}
                        style={{ cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', padding: '8px 12px', color: '#000', borderRadius: '14px' }}>Inactive</span>}</td>
                <td>   <div>
                        <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                            {showDots && <>
                                <div style={{ backgroundColor: "#FFFFFF", position: "absolute", right: 45, top: 3, width: 100, height: 42, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", paddingLeft:'10px' }}>
                                    
                                        <div  onClick={() => handleEditAmenities(props.item)}>
                                            <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" }} >Edit</label>
                                       
                                        </div>
                                       
                                    
                                </div>


                            </>}

                        </div>
                    </div></td>
            </tr>


            {/* <tr style={{ fontSize: 13 }}>
                <td style={{textAlign:'left'}}>
                    {state.UsersList.hostelList.some((view) => view.id == props.item.Hostel_Id) ? state.UsersList.hostelList.find((view) => view.id == props.item.Hostel_Id).Name : null}
                </td>
                <td className='text-center' >{props.item.Amnities_Name}</td>
                <td >{props.item.Amount}</td>
                <td ><div className='d-flex justify-content-center align-items-center'>
                    <Form.Check type="switch" id="custom-switch" readOnly checked={props.item.setAsDefault === 1 ? true : false} />
                </div></td>
                <td> <img src={img2} className='img1 ms-1' alt="img1" onClick={() => handleEditAmenities(props.item)} /></td>
            </tr> */}

        </>
    )
}

export default AmenitiesView;