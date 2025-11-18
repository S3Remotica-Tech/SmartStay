/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { CloseCircle, Edit } from 'iconsax-react';
import PropTypes from "prop-types";
import AddSquare from '../../Assets/Images/add-square.png'
import AssignTenant from '../../Assets/Images/assign_tenant.png'
import DeleteImage from '../../Assets/Images/Delete_red.png'
import { useHasPermission } from '../../Utils/Permission';




function EmptyBed({ show, handleClose, showbed, showcustomer, showtenant, showEditBed }) {


  const state = useSelector((state) => state);
  const dispatch = useDispatch

  


  const {
    canWriteModule: canWriteCustomers,
    //   canReadModule: canReadExpense,
    // canUpdateModule: canUpdateCustomers,
    //   canDeleteModule: canDeleteExpense,
  } = useHasPermission("Customers");

  const {
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,

  } = useHasPermission("Paying Guests");



  const handleShowAddCustomer = () => {
    showcustomer(true)
  }

  const handleShowAssignTenant = () => {

    showtenant(true)
  }

  const handleDeleteBed = () => {
    showbed(true)
  }

  const handleEditBed = () => {
    showEditBed(true)
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



  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {

      handleClose()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBookin])





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


              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  cursor: canWriteCustomers ? "pointer" : "not-allowed",
                  opacity: canWriteCustomers ? 1 : 0.5,
                }}
                onClick={canWriteCustomers ? handleShowAddCustomer : undefined}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: canWriteCustomers ? "rgba(34, 34, 34, 1)" : "#A0A0A0",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Add Tenant
                </span>
                <img
                  src={AddSquare}
                  height={20}
                  width={20}
                  alt="addcustomer"
                  style={{
                    filter: canWriteCustomers ? "none" : "grayscale(100%)",
                  }}
                />
              </div>

              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  cursor: canWriteCustomers ? "pointer" : "not-allowed",
                  opacity: canWriteCustomers ? 1 : 0.5,
                }}
                onClick={canWriteCustomers ? handleShowAssignTenant : undefined}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: canWriteCustomers ? "rgba(34, 34, 34, 1)" : "#A0A0A0",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Assign Tenant
                </span>
                <img
                  src={AssignTenant}
                  alt="assign_tenant"
                  style={{
                    filter: canWriteCustomers ? "none" : "grayscale(100%)",
                  }}
                />
              </div>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  cursor: canUpdatePayingGuests ? "pointer" : "not-allowed",
                  opacity: canUpdatePayingGuests ? 1 : 0.5,
                }}
                onClick={() => canUpdatePayingGuests ? handleEditBed() : undefined}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: canUpdatePayingGuests ? "#1E45E1" : "#A0A0A0",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Edit
                </span>
                <Edit size="16" color={!canUpdatePayingGuests ? "#888888" : "#1E45E1"} />

              </div>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{
                  cursor: canDeletePayingGuests ? "pointer" : "not-allowed",
                  opacity: canDeletePayingGuests ? 1 : 0.5,
                }}
                onClick={canDeletePayingGuests ? handleDeleteBed : undefined}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: canDeletePayingGuests ? "#FF0000" : "#A0A0A0",
                    fontFamily: "Gilroy",
                    fontWeight: 400,
                  }}
                >
                  Delete
                </span>
                <img
                  src={DeleteImage}
                  height={20}
                  width={20}
                  alt="deleteicon"
                  style={{
                    filter: canDeletePayingGuests ? "none" : "grayscale(100%)",
                  }}
                />
              </div>


            </div>
          </Modal.Body>


        </Modal>

      </div>



    </>
  )
}
EmptyBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  showbed: PropTypes.func.isRequired,
  showtenant: PropTypes.func.isRequired,
  showcustomer: PropTypes.func.isRequired
}
export default EmptyBed
