import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import { BsExclamationOctagonFill } from "react-icons/bs";

function Amenities() {
    const [showModal, setShowModal] = useState(false);


    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };




    return (
        <div className='Amenities'>
            <div>
                <h4 style={{ fontSize: 20, fontWeight: 600}}>Amenities Settings</h4>
                <p style={{ color: '#67686C' }}>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <div class="table-responsive mt-4" style={{ width: "100%" }}>
                <table class="table text-center" >
                    <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
                        <tr >
                            <th scope="col">Amenities Name</th>
                            <th scope="col">Amount <BsExclamationOctagonFill className='ms-1'/></th>
                            <th scope="col">Set as Default <BsExclamationOctagonFill className='ms-1' /></th>

                        </tr>
                    </thead>
                    <tbody   style={{ fontSize: 13 }}>
                        <tr  style={{ fontSize: 13 }}>
                            <td className='text-center' >Gym & Play Ground</td>
                            <td >1200.00</td>
                            <td ><div className='d-flex justify-content-center align-items-center'>
                                <Form.Check type="switch" id="custom-switch" />
                            </div></td>
                           
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="d-flex justify-content-end" style={{ paddingTop: "30px" }} >
                <Button variant="outline-primary" onClick={handleShowModal}><FaPlus className="me-1" />Create Amenities </Button>
            </div>



            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton style={{backgroundColor:"#F5F5FF"}} className="text-center">
                    <Modal.Title style={{fontSize:18}} className="text-center">Create Amenities</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='mb-3 ps-2  pe-2'>
                        <label className='mb-1' style={{fontSize:14,fontWeight:650}}>Amenities Name</label>
                        <Form.Control
                                    placeholder="Amenities Name"
                                    aria-label="Recipient's username"
                                    className='border custom-input'
                                    aria-describedby="basic-addon2"
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "530",
                                        opacity: 1,
                                        borderRadius: "4px",
                                        color: "gray",
                                        '::placeholder': { color: "gray", fontSize: 12 }
                                    }}

                                />

                    </div>
                    <div className='mb-3 ps-2 pe-2'>
                        <label className='mb-1' style={{fontSize:14,fontWeight:650}}>Amount</label>
                        <Form.Control
                                    placeholder="Amount"
                                    aria-label="Recipient's username"
                                    className='border custom-input'
                                    aria-describedby="basic-addon2"
                                    style={{
                                        fontSize: 12,
                                        fontWeight: "530",
                                        opacity: 1,
                                        borderRadius: "4px",
                                        color: "gray",
                                        '::placeholder': { color: "gray", fontSize: 12 }
                                    }}

                                />
                    </div>

                    <div className='d-flex justify-content-between  ps-2 pe-2 '>
                        <label className='mb-3 ' style={{fontSize:14,fontWeight:650}} >Set as Default</label>
                        <Form.Check type="switch" id="custom-switch" />
                    </div>


                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="outline-primary" onClick={handleCloseModal} size="sm"  style={{ borderRadius:8, width: '100px', marginRight: '15px' }}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" style={{ borderRadius: 8, width: '100px' }} >
                 Create
                </Button>
                   
                </Modal.Footer>
            </Modal>



        </div>

    )
}

export default Amenities