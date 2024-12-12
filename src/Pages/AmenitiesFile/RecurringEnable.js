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

function RecurringEnable({show, handleCloseRecurring}) {






  return (
    <div
    className="modal show"
    style={{
        display: 'block', position: 'initial'
    }}
>
    <Modal show={show} onHide={handleCloseRecurring} centered backdrop="static" >
        <Modal.Dialog style={{
            maxWidth: 850,
            width: '100%',
            
        }} className='m-0 p-0'>
            <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Recurring Enable</Modal.Title>
                <CloseCircle size="24" color="#000" onClick={handleCloseRecurring} />
            </Modal.Header>
            <Modal.Body>
                <div className='row mt-2'>
                    <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amenities calculation Start Date will be
                                <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                        </Form.Group>

                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>


                    <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amenities calculation End Date will be
                                <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                        </Form.Group>

                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>

                    <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>On Every<span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>

                        </Form.Group>

                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                        <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </div>
                </div>

            </Modal.Body>

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

  )
}

export default RecurringEnable