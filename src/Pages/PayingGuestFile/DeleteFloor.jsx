/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'





function DeleteFloor({ show, handleClose, currentItem }) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();





  const handleDelete = () => {

    if (currentItem.floor_Id) {
      dispatch({ type: 'DELETEFLOOR', payload: { floor_Id: currentItem.floor_Id } })

    }
  }



  const [deleteFloorForm, setDeleteFloor] = useState("")

  useEffect(() => {
    if (state.UsersList?.deleteFloorError) {
      setDeleteFloor(state.UsersList?.deleteFloorError)
    }
  }, [state.UsersList?.deleteFloorError]);


  const handleCloseFormFloor = () => {
    handleClose()
    setDeleteFloor("")
    dispatch({ type: 'CLEAR_DELETE_FLOOR_ERROR' })
  }

  return (
    <div>
      <Modal show={show} onHide={handleCloseFormFloor} centered backdrop="static"
       dialogClassName="!max-w-md !w-full" 

      >
        <Modal.Header className="!border-b-0 flex !justify-center mb-1 mt-2">
          <Modal.Title className="!text-lg !font-semibold !font-gilroy">
            Delete floor
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-gray-700 text-base font-medium !font-gilroy text-center -mt-5">
          {`Are you sure you want to delete the ${currentItem.floor_Name}?`}
        </Modal.Body>
        {deleteFloorForm && (
          <ErrorMessage message={deleteFloorForm} type="error" />
        )}
        <Modal.Footer className="flex !justify-center !border-t-0 mb-3">
          <Button onClick={handleCloseFormFloor} className="!rounded-lg !py-4 !px-10 !border !border-[#1E45E1] !bg-white !text-[#1E45E1] !text-sm !font-semibold !font-gilroy">
            Cancel
          </Button>

          <Button className="!rounded-lg !py-4 !px-10 !border !border-[#1E45E1] !bg-[#1E45E1] !text-white !text-sm !font-semibold !font-gilroy"
            onClick={handleDelete}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>

    </div>
  )
}
DeleteFloor.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
}
export default DeleteFloor
