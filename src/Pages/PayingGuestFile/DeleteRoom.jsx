/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";

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
        hostelId: deleteRoomDetails.Hostel_Id,
        floorId: deleteRoomDetails.Floor_Id,
        roomNo: deleteRoomDetails.Room_Id,
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
        <Modal.Header
          style={{
            borderBottom: "none",
          }}
        >
          <Modal.Title
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Gilroy",
              textAlign: "center",
              flex: 1,
            }}
          >
            Delete room
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 600,
            fontFamily: "Gilroy",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Are you sure you want to delete the room?
        </Modal.Body>
        {deleteRoomError && (
          <div className="d-flex justify-content-center align-items-center gap-2 ">
            <MdError style={{ color: "red" }} />
            <label
              className="mb-0"
              style={{
                color: "red",
                fontSize: "12px",
                fontFamily: "Gilroy",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {deleteRoomError}
            </label>
          </div>
        )}

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >

          <Button onClick={handleDeleteRoomForm} style={{ borderRadius: 8, padding: "16px 40px", border: "1px solid #1E45E1", backgroundColor: "#FFF", color: "#1E45E1", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
            Cancel
          </Button>

          <Button style={{ borderRadius: 8, padding: "16px 40px", border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }} onClick={handleDeleteRoomConfirm}>
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
