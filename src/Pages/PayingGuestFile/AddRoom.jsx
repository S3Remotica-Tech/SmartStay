/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";

function AddRoom({ show, handleClose, hostelDetails, editRoom }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [room, setRoom] = useState("");
  const [roomError, setRoomError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [initialState, setInitialState] = useState({});
  const isEditing = !!editRoom && !!editRoom.room_Id;
  const modalTitle = isEditing ? "Edit Room" : "Add Room";
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    dispatch({ type: "CLEAR_ALREADY_ROOM_ERROR" });
  }, []);

  useEffect(() => {
    if (editRoom) {
      setRoom(editRoom.Room_Name ? editRoom.Room_Name : "");
      setInitialState({
        room: editRoom.Room_Name,
      });
    }
  }, [editRoom]);

  const handleRoomChange = (e) => {
    const Room_Id = e.target.value;
    setRoomError("");
    setIsChangedError("");
    dispatch({ type: "CLEAR_ALREADY_ROOM_ERROR" });
    setRoom(Room_Id);
  };
  const handleCreateRoom = () => {
     dispatch({ type: "CLEAR_ALREADY_ROOM_ERROR" });
    let floorId, hostel_Id, room_Id;

    if (isEditing) {
      floorId = editRoom?.floor_Id ? editRoom.floor_Id.toString() : "";
      hostel_Id = editRoom?.hostel_Id ? editRoom.hostel_Id.toString() : "";
      room_Id = editRoom?.room_Id ? editRoom?.room_Id.toString() : "";
    } else {
      floorId = hostelDetails?.floor_Id
        ? hostelDetails.floor_Id.toString()
        : "";
      hostel_Id = hostelDetails?.hostel_Id
        ? hostelDetails.hostel_Id.toString()
        : "";
    }

    if (!room) {
      setRoomError("Please Enter a Room No or Name");
      return;
    }

    if (!floorId) {
      setFloorError("Please Select Floor");
      setTimeout(() => {
        setFloorError("");
      }, 2000);

      return;
    }

    const isChanged = room !== initialState.room;

    if (!isChanged) {
      setIsChangedError("No Changes Detected");

      return;
    }

    if (isEditing) {
      if (floorId && hostel_Id) {
        dispatch({
          type: "CREATEROOM",
          payload: {
            hostel_id: hostel_Id,
            floorId: floorId,
            roomId: room,
            id: room_Id,
          },
        });
        setFormLoading(true)
      }
    } else {
      if (floorId && hostel_Id && room) {
        dispatch({
          type: "CREATEROOM",
          payload: { hostel_id: hostel_Id, floorId: floorId, roomId: room },
        });
        setFormLoading(true)
      }
    }
  };


useEffect(()=>{
  if(state.PgList?.alreadyRoomHere){
    setFormLoading(false)
  }

},[state.PgList?.alreadyRoomHere])











  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog
          style={{ maxWidth: 850, width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header className="m-0" style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {modalTitle}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>

          <Modal.Body style={{ paddingTop: 5 }}>
            <div className="row mt-2">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Room{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={room}
                    onChange={handleRoomChange}
                    type="text"
                    placeholder="Enter Room Name or No"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: room ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
  {formLoading && <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>}
          {isChangedError && (
            <div className="d-flex align-items- justify-content-center">
              <MdError
                style={{
                  color: "red",
                  marginRight: "5px",
                  marginLeft: "15px",
                  marginTop: "2px",
                }}
              />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {isChangedError}
              </label>
            </div>
          )}

          {roomError && (
            <div className="d-flex align-items-center">
              <MdError
                style={{ color: "red", marginRight: "5px", marginLeft: "15px" }}
              />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {roomError}
              </label>
            </div>
          )}
          {floorError && (
            <div className="d-flex align-items-center">
              <MdError
                style={{ color: "red", marginRight: "5px", marginLeft: "15px" }}
              />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {floorError}
              </label>
            </div>
          )}

          {state.PgList && state.PgList?.alreadyRoomHere && (
            <div className="d-flex align-items- justify-content-center">
              <MdError
                style={{
                  color: "red",
                  marginRight: "5px",
                  marginLeft: "15px",
                  marginTop: "2px",
                }}
              />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "13px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {state.PgList?.alreadyRoomHere}
              </label>
            </div>
          )}

          <Modal.Footer style={{ border: "none" }}>
            <Button
              onClick={handleCreateRoom}
              className="w-100 mt-0"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              {modalTitle}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
AddRoom.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  hostelDetails: PropTypes.func.isRequired,
  editRoom: PropTypes.func.isRequired,
};

export default AddRoom;
