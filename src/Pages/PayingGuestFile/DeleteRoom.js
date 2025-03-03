/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";



function DeleteRoom({ show, handleClose, deleteRoomDetails }) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  

  // useEffect(() => {
  //   if (state.PgList.roomCount && deleteRoomDetails) {
  //     const filteredBeds = state.PgList.roomCount.filter(item =>
  //       item.Hostel_Id === deleteRoomDetails.Hostel_Id &&
  //       item.Floor_Id === deleteRoomDetails.Floor_Id &&
  //       Number(item.Room_Id) === Number(deleteRoomDetails.Room_Id)
  //     );
  //     setNumberOfBeds(filteredBeds);
  //   }
  // }, [state.PgList.roomCount, deleteRoomDetails]);



  const handleDeleteRoomConfirm = () => {

    dispatch({
      type: 'DELETEROOM',
      payload: {
        hostelId: deleteRoomDetails.Hostel_Id,
        floorId: deleteRoomDetails.Floor_Id,
        roomNo: deleteRoomDetails.Room_Id,
      },
    });



  }

  useEffect(() => {
    if (state.UsersList?.deleteRoomError) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_ROOM_ERROR' });
      }, 3000);
    }
  }, [state.UsersList?.deleteRoomError]);



  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {
      handleClose()
    }
  }, [state.PgList.statusCodeForDeleteRoom])

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered backdrop="static"
        style={{
          width: 388,
          height: 250,
          marginLeft: "500px",
          marginTop: "200px",
        }}>
        <Modal.Header style={{
          borderBottom: "none",
          justifyContent: "center",
          display: "flex"
        }}>
          <Modal.Title style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>Delete room ?</Modal.Title>
          {/* <CloseCircle size="24" color="#000"  onClick={handleClose}/> */}
        </Modal.Header>



        {state.UsersList?.deleteRoomError && (
          <div className="d-flex align-items-center p-1 mb-2">
            <MdError style={{ color: "red", marginRight: '5px' }} />
            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
              {state.UsersList?.deleteRoomError}
            </label>
          </div>
        )}

        <Modal.Body style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy", textAlign: 'center',marginTop:"-20px" }}>
          {/* {numberOfBeds[0]?.bed_details.length > 0 && numberOfBeds[0]?.bed_details.length > 0
        ? 'Please delete the bed before deleting the room.'
        : 'Are you sure you want to delete the room?'} */}
          Are you sure you want to delete the room?

        </Modal.Body>


        <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
          <Button onClick={handleClose} style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid #1E45E1", backgroundColor: "#FFF", color: "#1E45E1", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
            Cancel
          </Button>

          <Button style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }} onClick={handleDeleteRoomConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
DeleteRoom.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteRoomDetails: PropTypes.func.isRequired,
}
export default DeleteRoom;
