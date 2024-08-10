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


function StaticExample({ show, handleClose, hostelFloor }) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    console.log("state", state)



const [floorNo, setFloorNo] = useState('')


const handleFloorChange = (e) =>{
    setFloorNo(e.target.value)
}


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



    const handleCreateFloor = () => {


        if (!floorNo || !/^\d+$/.test(floorNo)) {
            Swal.fire({
              icon: 'warning',
              title: 'Please enter a valid Floor no.',
            });
            return;
          }


if(floorNo){
    dispatch({ type: 'CREATEFLOOR', payload:{hostel_Id : hostelFloor, floor_Id : floorNo }})
     handleClose();
}


        // Swal.fire({
        //   icon: 'warning',
        //   title: 'Do you want create one floor ?',
        //   confirmButtonText: 'Yes',
        //   cancelButtonText: 'No',
        //   showCancelButton: true,
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     const floors = floorDetails.map((floor) => (
        //       { number_of_floors: 1 }));
        //     const hostel_ID = hostel_Id.toString()
        //     dispatch({
        //       type: 'CREATEFLOOR',
        //       payload: {
        //         hostel_Id: hostel_ID,
        //         hostelDetails: floors,
        //       },
        //     });
        //     Swal.fire({
        //       icon: 'success',
        //       title: 'Create Floor details saved Successfully',
        //     })
        //   }
        // });
    
    
    
      
 
        
      };




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
                        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Add floor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: 20 }}>


                        <div className='row mt-1'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 600 }}>Floor</Form.Label>
                                    <Form.Control
                                         value={floorNo}
                                         onChange={handleFloorChange}
                                        type="text" placeholder="Enter floor no." style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: floorNo ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                                </Form.Group>

                            </div>
                            {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Beds</Form.Label>
                                    <Form.Select aria-label="Default select example" className='' id="vendor-select">
                                        <option>Select no. of beds</option>
                                       
                                    </Form.Select>
                                </Form.Group>
                            </div>
                           
                            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Room</Form.Label>
                                    <Form.Select aria-label="Default select example" className='' id="vendor-select">
                                        <option>Select no. of rooms</option>
                                       
                                    </Form.Select>
                                </Form.Group>
                            </div> */}
                        </div>

                    </Modal.Body>
                    <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>

                        <Button onClick={handleCreateFloor} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }} >
                            Add floor
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default StaticExample;