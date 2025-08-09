/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CloseCircle } from 'iconsax-react';
import PropTypes from "prop-types";
import AddSquare from '../../Assets/Images/add-square.png'
import AssignTenant from '../../Assets/Images/assign_tenant.png'
import DeleteImage from '../../Assets/Images/Delete_red.png'
import DeleteBed from './DeleteBed';
import PGAssignTenant from './PGAssignTenant';
import AddCustomer from './AddCustomerPG';




function EmptyBed ({ show, handleClose , currentItem , deleteBedDetails }) {

    const [assign_tenantform, setAssignTenantForm] = useState(false)
    const [add_customerform, setAddCustomerForm] = useState(false)

    const [showDeleteBed, setShowDeleteBed] = useState(false)


  const handleDeleteBed = () => {
      setShowDeleteBed(true)
  }

   const handleCloseDeleteBed = () => {
    setShowDeleteBed(false)
  }


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

    const handleShowAssignTenant = () => {
          setAssignTenantForm(true)
    }

    const handleCloseAssignTenant = () => {
        setAssignTenantForm(false)
    }

    const handleShowAddCustomer = () => {
          setAddCustomerForm(true)
    }

    const handleCloseAddCustomer = () => {
        setAddCustomerForm(false)
    }



    return (

        <>
        <div
            className="modal show"
            style={{
                display: 'block', position: 'initial'
            }}
        >
          <Modal
  show={show}
  onHide={handleClose}
  centered
  size="sm"
  backdrop="static"
  style={{ borderRadius: 24 }}
  contentClassName="custom-modal-content"
>
<Modal.Header className="border-0 px-4 pt-4 position-relative">

  <Modal.Title
    className="w-100 text-center"
    style={{
      fontSize: 18,
      color: "#222222",
      fontFamily: "Gilroy",
      fontWeight: 600,
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
    }}
  >
    Manage Bed
  </Modal.Title>

  <div className="ms-auto" style={{ zIndex: 1 }}>
    <CloseCircle
      size="24"
      color="#000"
      onClick={handleClose}
      style={{ cursor: "pointer" }}
    />
  </div>

</Modal.Header>


  <Modal.Body className="px-4 pb-4">
    <div className="d-flex flex-column gap-3">

      <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} >
        <span style={{ fontSize: 14, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
          Add Customer
        </span>
        <img src={AddSquare} height={20} width={20} color="#1E45E1" alt='addcustomer' onClick={handleShowAddCustomer}/>
      </div>

      <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} >
        <span style={{ fontSize: 14, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>
          Assign Tenant
        </span>
        <img src={AssignTenant} color="#1E45E1" alt='assign_tenant' onClick={handleShowAssignTenant}/>
      </div>

      <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} >
        <span style={{ fontSize: 14, color: "#FF0000", fontFamily: "Gilroy", fontWeight: 400 }}>
          Delete
        </span>
       <img src={DeleteImage} height={20} width={20} color="#FF0000" alt='deleteicon' onClick={handleDeleteBed}/>
      </div>

    </div>
  </Modal.Body>

 
</Modal>

        </div>

        

       {
         showDeleteBed && <DeleteBed show={showDeleteBed} handleClose={handleCloseDeleteBed} deleteBedDetails={deleteBedDetails} />
       }

       {
         assign_tenantform && <PGAssignTenant  show={assign_tenantform} handleClose={handleCloseAssignTenant} currentItem = {currentItem} />
       }   

       {
        add_customerform && <AddCustomer  show={add_customerform} handleClose={handleCloseAddCustomer}/>
       }
    
         


        </>
    )
}
EmptyBed.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    currentItem: PropTypes.func.isRequired,
    deleteBedDetails: PropTypes.func.isRequired
}
export default EmptyBed
