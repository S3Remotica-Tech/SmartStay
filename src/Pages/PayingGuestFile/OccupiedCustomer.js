import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { maxWidth } from '@mui/system';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';





function OccupiedCustomer({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("currentItem", currentItem)


    const [customer, setCustomer] = useState([])

    useEffect(() => {

        const Hostel_Id = currentItem?.room.Hostel_Id;
        const Floor_Id = currentItem?.room.Floor_Id;
        const Bed_Id = currentItem?.bed.id;
        const Room_Id = currentItem?.room.Room_Id;


        console.log("Hostel_Id && Floor_Id && Bed_Id && Room_Id", Hostel_Id, Floor_Id, Bed_Id, Room_Id)

        if (Hostel_Id && Floor_Id && Bed_Id && Room_Id) {
console.log("called")
            dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { hostel_id: Hostel_Id, floor_id: Floor_Id, room_id: Room_Id, bed: Bed_Id } })
        }
    }, [currentItem])


    useEffect(() => {
        if (state.PgList.OccupiedCustomerGetStatusCode == 200) {
            setCustomer(state.PgList.OccupiedCustomer)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
            }, 2000)
        }


    }, [state.PgList.OccupiedCustomerGetStatusCode])






    useEffect(() => {
        const closeButton = document.querySelector('button[aria-label="close-button"]');
        if (closeButton) {
            closeButton.style.backgroundColor = 'white';
            closeButton.style.borderRadius = '50%';
            closeButton.style.width = '10px';
            closeButton.style.height = '10px';
            closeButton.style.border = '1.5px solid #000000';
            closeButton.style.padding = '9px';
        }
    }, []);


    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial'
            }}
        >
            <Modal show={show} onHide={handleClose} centered size="sm" style={{ borderRadius: 24 }} backdrop="static" >

                <Modal.Dialog className="p-0 m-0" style={{ margin: '0 auto' }}>
                    {customer && customer.map((custom) => (
                        <div key={custom.id} className="p-0 m-0" style={{}}>

                            <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                                <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Bed {currentItem.bed.bed_no}</Modal.Title>

                                <CloseCircle size="24" color="#000" onClick={handleClose} />

                            </Modal.Header>

                            <Modal.Body >

                                <label style={{ fontSize: 14, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Occupied by</label>
                                <div className='d-flex  pt-3'>
                                    <div>
                                        <Image src={custom.profile && custom.profile !== "0" ? custom.profile : Profile2} roundedCircle style={{ height: 48, width: 48 }} />
                                    </div>
                                    <div className='d-flex flex-column justify-content-between flex-wrap w-100 ps-2 '>

                                        <div className='d-flex justify-content-between flex-wrap'>
                                            <label style={{ fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", fontWeight: 600 }}>{custom.Name}</label>
                                            <label style={{ fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", fontWeight: 600 }}> ₹{custom.RoomRent}</label>
                                        </div>
                                        <div className='d-flex justify-content-between flex-wrap'>
                                            <label style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>{custom.Phone}</label>
                                            <label style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}> {moment(custom.createdAt).format("DD/MM/YYYY")}</label>
                                        </div>
                                    </div>
                                </div>

                            </Modal.Body>
                        </div>))}
                </Modal.Dialog>
            </Modal>
        </div>
    )
}

export default OccupiedCustomer
