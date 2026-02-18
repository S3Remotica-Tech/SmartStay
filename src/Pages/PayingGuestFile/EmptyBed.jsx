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
        className="modal show block static" >
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="sm"
          backdrop="static"
          className='rounded-2xl'
          contentClassName="custom-modal-content"
        >
          <Modal.Header className="border-0 px-4 pt-4 relative">

            <Modal.Title className="absolute inset-x-0 text-center !text-[18px] !text-gray-900 !font-semibold !font-gilroy" >
              Manage Bed
            </Modal.Title>

            <div className="ml-auto z-10">
              <CloseCircle
                size="24"
                color="#000"
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>

          </Modal.Header>


          <Modal.Body className="px-4 pb-4 font-gilroy">
            <div className="flex flex-col gap-3">
              <div
                className={`flex justify-between items-center ${canWriteCustomers ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"
                  }`}
                onClick={canWriteCustomers ? handleShowAddCustomer : undefined}
              >
                <span className={`text-[14px] font-medium  ${canWriteCustomers ? "text-gray-900" : "text-gray-400"
                  }`}>
                  Add Tenant
                </span>
                <img
                  src={AddSquare}
                  height={20}
                  width={20}
                  alt="addcustomer"
                  className={`${canWriteCustomers ? "" : "grayscale"}`}
                />
              </div>

              <div className={`flex justify-between items-center ${canWriteCustomers ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"
                }`}

                onClick={canWriteCustomers ? handleShowAssignTenant : undefined}
              >
                <span className={`text-[14px] font-medium font-gilroy ${canWriteCustomers ? "text-gray-900" : "text-gray-400"
                  }`}>
                  Assign Tenant
                </span>
                <img
                  src={AssignTenant}
                  alt="assign_tenant"
                  className={`${canWriteCustomers ? "" : "grayscale"}`}
                />
              </div>
              <div className={`flex justify-between items-center ${canUpdatePayingGuests
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-50"
                }`}

                onClick={() => canUpdatePayingGuests ? handleEditBed() : undefined}
              >
                <span className={`text-[14px] font-medium font-gilroy ${canUpdatePayingGuests ? "text-blue-700" : "text-gray-400"
                  }`}

                >
                  Edit
                </span>
                <Edit size="16" color={!canUpdatePayingGuests ? "#888888" : "#1E45E1"} />

              </div>
              <div className={`flex justify-between items-center ${canDeletePayingGuests
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-50"
                }`}

                onClick={canDeletePayingGuests ? handleDeleteBed : undefined}
              >
                <span className={`text-[14px] font-normal font-gilroy ${canDeletePayingGuests ? "text-red-600" : "text-gray-400"
                  }`}

                >
                  Delete
                </span>
                <img
                  src={DeleteImage}
                  height={20}
                  width={20}
                  alt="deleteicon"
                  className={`${canDeletePayingGuests ? "" : "grayscale"}`}
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
  showcustomer: PropTypes.func.isRequired,
  showEditBed: PropTypes.func.isRequired,
}
export default EmptyBed
