import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import img2 from '../Assets/Images/edit.png';
import { useDispatch, useSelector } from 'react-redux';

function AmenitiesView(props) {

    const state = useSelector(state => state)

    const handleEditAmenities = (item) => {
        props.modalEditAmenities(item)
    }



    return (
        <>
            <tr style={{ fontSize: 13 }}>
                {/* <td style={{textAlign:'left'}}>
                    {state.UsersList.hostelList.some((view) => view.id == props.item.Hostel_Id) ? state.UsersList.hostelList.find((view) => view.id == props.item.Hostel_Id).Name : null}
                </td> */}
                <td className='text-center' >{props.item.Amnities_Name}</td>
                <td >{props.item.Amount}</td>
                <td ><div className='d-flex justify-content-center align-items-center'>
                    <Form.Check type="switch" id="custom-switch" readOnly checked={props.item.setAsDefault === 1 ? true : false} />
                </div></td>
                <td> <img src={img2} className='img1 ms-1' alt="img1" onClick={() => handleEditAmenities(props.item)} /></td>
            </tr>

        </>
    )
}

export default AmenitiesView;