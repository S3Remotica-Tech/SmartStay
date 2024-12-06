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
import Forward from '../../Assets/Images/New_images/Forward.svg'
import BackWard from '../../Assets/Images/New_images/Backward.svg'
import Image from 'react-bootstrap/Image';


function AssignAmenities({show, handleClose}) {



    
  return (
    <div
    className="modal show"
    style={{
        display: 'block', position: 'initial'
    }}
>
    <Modal show={show} onHide={handleClose} centered backdrop="static"  className="custom-modal-width-Amenities">
        <Modal.Dialog style={{
            maxWidth: 1000,
            width: '100%',
            
        }} className='m-0 p-0'>
            <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Assign Amenities</Modal.Title>
                <CloseCircle size="24" color="#000" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>


            <div className="row">
  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
  <Card style={{border:"1px solid #DCDCDC", borderRadius:8}}>
      <Card.Header style={{backgroundColor:"#E7F1FF",  fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Unassigned</Card.Header>
      <Card.Body>
        hello
      </Card.Body>
    </Card>
  </div>
  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
<div className='d-flex flex-column align-items-center justify-content-center'>
    <div>
<Image src={Forward} />
    </div>
    <div>
    <Image src={BackWard} />
    </div>
</div>



  </div>
  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"> 
    <Card style={{border:"1px solid #DCDCDC", borderRadius:8}}>
      <Card.Header style={{backgroundColor:"#E7F1FF",  fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Unassigned</Card.Header>
      <Card.Body>
        hello
      </Card.Body>
    </Card></div>
</div>
















            </Modal.Body>

<Modal.Footer style={{ border: "none" }}>

    
</Modal.Footer>
</Modal.Dialog>
</Modal>
</div>
  )
}

export default AssignAmenities