import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './addAsset.css'
import moment from 'moment';


function StaticExample({ show, handleClose, currentItem }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("state", state)

    console.log("currentItem", currentItem)
    

useEffect(()=>{
if(currentItem.hostel_id){
    setPgList(currentItem.hostel_id)
    setRoom(currentItem.room_id)
    setDate(moment(currentItem.assigned_date).format('YYYY-MM-DD'))
}else{
    setPgList('')
    setRoom('')
    setDate('')
}
},[currentItem])




    useEffect(() => {
        const closeButton = document.querySelector('button[aria-label="close-button"]');
        if (closeButton) {
            closeButton.style.backgroundColor = 'white';
            closeButton.style.borderRadius = '50%';
            closeButton.style.width = '10px';
            closeButton.style.height = '10px';
            closeButton.style.border = '1.5px solid #222222';
            closeButton.style.padding = '9px';
        }
    }, []);

    const [pglist, setPgList] = useState('')
    const [room, setRoom] = useState('')
    const [date, setDate] = useState('')

    const handlePgChange = (e) => {
        setPgList(e.target.value)
    }

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    useEffect(()=>{
        if(pglist){
            dispatch({ type: 'GETROOMS' , payload : { hostel_Id : pglist }})
        }
    },[pglist])



    const handleAddAssignAsset = () =>{
        if(pglist  && room  && date && currentItem.id ){
dispatch({ type: 'ASSIGNASSET', payload:{ asset_id : currentItem.id, hostel_id:pglist , room_id: room,asseign_date: date}})
setPgList('')
setRoom('')
setDate('')
handleClose()
}else{
            Swal.fire({
                icon: 'warning',
                title: 'Please Enter All Fields',
                timer: 1000
              });
        }
    }

console.log("pglist",room)
    return (
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
            }}
        >
            <Modal show={show} onHide={handleClose}>
                <Modal.Dialog style={{ maxWidth: '100%', width: '100%' }} className='m-0 p-0'>
                    <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>{currentItem.hostel_id ? 'Reassign asset ' : 'Assign asset'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>


                        <div className='row mt-1'>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 600 }}>Paying Guest</Form.Label>
                                    <Form.Select aria-label="Default select example" className='' id="vendor-select" value={pglist} onChange={handlePgChange}>
                                        <option>Select a PG</option>
                                        {
                                            state.UsersList?.hostelList?.map((item) => {
                                                return (
                                                    <>
                                                        <option key={item.id} value={item.id}>{item.Name}</option>
                                                    </>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Select a room</Form.Label>
                                    <Form.Select aria-label="Default select example" className='' id="vendor-select" value={room} onChange={handleRoomChange}>
                                        <option>Select a room</option>
                                        {state.AssetList.GetRoomList && state.AssetList.GetRoomList.map((item) => {
                                            return (
                                                <>
                                                    <option key={item.Room_Id} value={item.Room_Id} >
                                                        {item.Room_Id}</option>
                                                </>
                                            )

                                        })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Date</Form.Label>
                                    <Form.Control className="custom-date-input"
                                        value={date}
                                        onChange={handleDateChange}
                                        type="date" placeholder="DD-MM-YYYY" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>
                            </div>


                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>

                        <Button className='w-100' onClick={handleAddAssignAsset} style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }} >
                        {currentItem.hostel_id ? 'Reassign asset ' : 'Assign asset'}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;