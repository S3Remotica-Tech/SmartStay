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

function AddAmenities({ show, handleClose, hostelid, editDetails }) {


    const state = useSelector(state => state)
  

    const dispatch = useDispatch();
    const [amenity, setAmenity] = useState('');
    const [amount, setAmount] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isChangedError, setIsChangedError] = useState('');
const [initialState, setInitialState] = useState(null)

    const [hostelError, setHostelError] = useState('')
    const [errorAmenity, setErrorAmenity] = useState('');
    const [errorAmount, setErrorAmount] = useState('');

    const handleAmenityChange = (e) => {
        setAmenity(e.target.value);
        setErrorAmenity('');
        setIsChangedError('')
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setErrorAmount('');
        setIsChangedError('')
    };

    const handleToggle = (e) => {
        setIsChecked(e.target.checked);
        setIsChangedError('')
    };



    const handleSubmit = () => {
        let isValid = true;

        if (!hostelid) {
            setHostelError('Pleae select a Hostel');
        }


        if (!amenity) {
            setErrorAmenity('Amenity is required.');
            isValid = false;
        }

        if (!amount) {
            setErrorAmount('Amount is required.');
            isValid = false;
        } else if (isNaN(amount)) {
            setErrorAmount('Amount must be a number.');
            isValid = false;
        }


        if (initialState) {
            const isChanged =
                initialState.amenity !== amenity ||
                initialState.amount !== amount ||
                initialState.isChecked !== isChecked 
               

            if(!isChanged) {
                setIsChangedError('No changes detected.');
                isValid = false;
            }
        }

        if (isValid) {
            if (editDetails) {
                dispatch({
                    type: 'AMENITIESUPDATE', payload: {
                        id: editDetails.Amnities_Id,
                        amenitiesName: amenity,
                        Amount: amount,
                        setAsDefault: isChecked,
                        Status: editDetails.Status,
                        Hostel_Id: state.login.Settings_Hostel_Id,
                    }
                });



            } else {
                dispatch({
                    type: 'AMENITIESSETTINGS', payload: {
                        amenitiesName: amenity,
                        Amount: amount,
                        setAsDefault: isChecked,
                        Hostel_Id: state.login.Settings_Hostel_Id,

                    }
                });
            }


        }
    };



     useEffect(() => {
        if (editDetails) {
            const initialData = {
                amenity: editDetails.Amnities_Name || '',
                amount: editDetails.Amount || '',
                isChecked: editDetails.setAsDefault === 1 ? true : false,
               
            };

           
            setAmenity(initialData.amenity);
            setAmount(initialData.amount);
            setIsChecked(initialData.isChecked);
            setInitialState(initialData)
           
        }
    }, [editDetails]);





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
                            <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{editDetails ? 'Edit Amenities' : 'Add Amenities'}</Modal.Title>

                            <CloseCircle size="24" color="#000" onClick={handleClose} />

                        </Modal.Header>

                        <Modal.Body>
                            {isChangedError && (
                                <div style={{ color: 'red', fontSize: '14px', marginTop: '8px' }}>
                                    <MdError style={{ marginRight: '4px' }} />
                                    {isChangedError}
                                </div>
                            )}


                            {hostelError && (
                                <div className="d-flex align-items-center mt-1">
                                    <MdError style={{ color: 'red', marginRight: '5px' }} />
                                    <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{hostelError}</span>
                                </div>
                            )}

                            <div className='row mt-2'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amenity<span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                        <Form.Control
                                            value={amenity}
                                            onChange={handleAmenityChange}
                                            type="text" placeholder="Enter Amenity" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                    </Form.Group>
                                    {errorAmenity && (
                                        <div className="d-flex align-items-center mt-1">
                                            <MdError style={{ color: 'red', marginRight: '5px' }} />
                                            <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{errorAmenity}</span>
                                        </div>
                                    )}

                                </div>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amount <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                                        <Form.Control
                                            value={amount}
                                            onChange={handleAmountChange}
                                            type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                    </Form.Group>


                                    {errorAmount && (
                                        <div className="d-flex align-items-center mt-1">
                                            <MdError style={{ color: 'red', marginRight: '5px' }} />
                                            <span style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{errorAmount}</span>
                                        </div>
                                    )}

                                </div>

                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Set as Default</label>
                                        </div>
                                        <div>
                                            <Form.Check
                                                type="switch"
                                                id="custom-switch"
                                                checked={isChecked}
                                                onChange={(e) => handleToggle(e)}
                                            >

                                            </Form.Check>
                                        </div>
                                    </div>


                                </div>



                            </div>

                        </Modal.Body>


                        <Modal.Footer style={{ border: "none" }}>

                            <Button
                                onClick={handleSubmit}
                                className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, padding: 12, borderRadius: 8, fontSize: 16, fontFamily: "Gilroy" }}>
                                {editDetails ? 'Save Changes' : 'Add Amenities'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>


        </>
    )
}

export default AddAmenities