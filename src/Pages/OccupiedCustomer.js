import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { maxWidth } from '@mui/system';
// import './occupiedCustom.css'




function AddBed({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("currentItem", currentItem)

    console.log("add bed state", state)

    const [customer, setCustomer] = useState('')


    useEffect(() => {
        if (currentItem) {

            const Hostel_Id = currentItem.room.Hostel_Id
            const Floor_Id = currentItem.room.Floor_Id
            const Bed_Id = currentItem.bed.bed_no
            const Room_Id = currentItem.room.Room_Id
            const FilteredCustomer = state.UsersList.Users.filter((view) => {
                return view.Hostel_Id === Number(Hostel_Id) && view.Floor === Number(Floor_Id) && view.Rooms === Number(Room_Id) && view.Bed === Number(Bed_Id)
            })

            console.log("FilteredCustomer", FilteredCustomer)
            setCustomer(FilteredCustomer)

        }
    }, [currentItem,show])


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




    const style = {
        maxWidth: "300px",
        width: "100%"
    }





    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial'
            }}
        >
            <Modal show={show} onHide={handleClose} centered size="sm"  style={{borderRadius:24}}>
              
                    <Modal.Dialog className="p-0 m-0" style={{ margin: '0 auto' }}>
                        {customer && customer.map((custom) => (
                            <div key={custom.id} className="p-0 m-0"  style={{}}>

                                <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                                    <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Bed {custom.Bed}</Modal.Title>
                                </Modal.Header>

                                <Modal.Body >

                                    <label style={{ fontSize: 14, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Occupied by</label>
                                    <div className='d-flex  pt-3'>
                                        <div>
                                            <Image  src={custom.profile && custom.profile !== "0" ? custom.profile : Profile2} roundedCircle style={{ height: 48, width: 48 }} />
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

export default AddBed
