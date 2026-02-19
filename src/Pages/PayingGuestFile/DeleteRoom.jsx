/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'

function DeleteRoom({ show, handleClose, deleteRoomDetails }) {
  const state = useSelector((state) => state);
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
      type: "DELETEROOM",
      payload: {
        // hostelId: deleteRoomDetails.Hostel_Id,
        // floorId: deleteRoomDetails.Floor_Id,
        roomId: deleteRoomDetails.Room_Id,
      },
    });
  };
  const [deleteRoomError, setDeleteRoomError] = useState("");
  useEffect(() => {
    if (state.UsersList?.deleteRoomError) {
      setDeleteRoomError(state.UsersList.deleteRoomError);
    }
  }, [state.UsersList?.deleteRoomError]);

  const handleDeleteRoomForm = () => {
    handleClose();
    setDeleteRoomError("");
    dispatch({ type: 'CLEAR_DELETE_ROOM_ERROR' })
  };

  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {
      handleDeleteRoomForm();
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ROOM" });
      }, 500);
    }
  }, [state.PgList.statusCodeForDeleteRoom]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleDeleteRoomForm}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header className="!border-b-0">
          <Modal.Title className="!text-lg !font-semibold !font-gilroy text-center flex-1">
            Delete room
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-sm font-semibold font-gilroy text-center -mt-5 text-gray-600">
          Are you sure you want to delete the room?
        </Modal.Body>
        {deleteRoomError && (
          <ErrorMessage message={deleteRoomError} type="error" />
        )}

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >

          <Button onClick={handleDeleteRoomForm} className="!rounded-lg !py-3 !px-10 !border !border-[#1E45E1] !bg-white !text-[#1E45E1] !text-sm !font-semibold !font-gilroy">
            Cancel
          </Button>

          <Button className="!rounded-lg !py-3 !px-10 !border !border-[#1E45E1] !bg-[#1E45E1] !text-white !text-sm !font-semibold !font-gilroy" onClick={handleDeleteRoomConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
DeleteRoom.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteRoomDetails: PropTypes.func.isRequired,
};
export default DeleteRoom;
