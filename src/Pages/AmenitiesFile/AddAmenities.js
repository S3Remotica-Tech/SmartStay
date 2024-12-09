import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { MdError } from "react-icons/md";
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import Form from 'react-bootstrap/Form';

function AddAmenities({ show, handleClose }) {



    const [isChecked, setIsChecked] = useState(false);
    
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };




   








    return (
        <>
            {/* Add Amenities Popup */}
            <div
                className="modal show"
                style={{
                    display: 'block', position: 'initial'
                }}
            >
                <Modal show={show} onHide={handleClose} centered backdrop="static">
                    <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
                        <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                            <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Add Amenities</Modal.Title>

                            <CloseCircle size="24" color="#000" onClick={handleClose} />

                        </Modal.Header>

                        <Modal.Body>


                            <div className='row mt-2'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amenity<span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                        <Form.Control

                                            type="text" placeholder="Enter Amenity" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                    </Form.Group>

                                </div>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amount <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                        <Form.Control

                                            type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                    </Form.Group>




                                </div>

                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>State</label>
                                        </div>
                                        <div>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                onChange={handleToggle}
                                            >

                                            </Form.Check>
                                        </div>
                                    </div>


                                </div>



                            </div>

                        </Modal.Body>












                        {/* {state.PgList && state.PgList?.alreadyBedAvailable && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {state.PgList?.alreadyBedAvailable}
      </label>
    </div>
  )} */}
                        <Modal.Footer style={{ border: "none" }}>

                            <Button
                                //   onClick={handleSubmit}
                                className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, padding: 12, borderRadius: 8, fontSize: 16, fontFamily: "Gilroy" }}>
                                Add Amenities
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>


        </>
    )
}

export default AddAmenities