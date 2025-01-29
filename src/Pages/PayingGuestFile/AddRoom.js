import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { MdError } from "react-icons/md";
import {
  ArrowUp2,
  ArrowDown2,
  CloseCircle,
  SearchNormal1,
  Sort,
  Edit,
  Trash,
} from "iconsax-react";

function AddRoom({ show, handleClose, hostelDetails, editRoom }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [room, setRoom] = useState("");
  const [alreadyRoom, setAlreadyRoom] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomError, setRoomError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [initialState, setInitialState] = useState({});
  const isEditing = !!editRoom && !!editRoom.room_Id;
  const modalTitle = isEditing ? "Edit Room" : "Add Room";

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

    if (!/^\d*$/.test(Room_Id)) {
      setErrorMessage("Please enter a valid  number.");
    } else {
      setErrorMessage("");
    }

    setRoom(Room_Id);
    // const floorId = hostelDetails.floor_Id.toString();
    //     const hostel_Id = hostelDetails.hostel_Id.toString();
    const floorId = hostelDetails?.floor_Id
      ? hostelDetails.floor_Id.toString()
      : "";
    const hostel_Id = hostelDetails?.hostel_Id
      ? hostelDetails.hostel_Id.toString()
      : "";

    setAlreadyRoom(
      state.PgList.roomCount.some((item) => {
        return (
          item.Room_Id == Room_Id &&
          item.Floor_Id == floorId &&
          item.Hostel_Id == hostel_Id
        );
      })
    );
  };
  const handleCreateRoom = () => {
    let floorId, hostel_Id, room_Id, room_Name;

    if (isEditing) {
      floorId = editRoom?.floor_Id ? editRoom.floor_Id.toString() : "";
      hostel_Id = editRoom?.hostel_Id ? editRoom.hostel_Id.toString() : "";
      room_Id = editRoom?.room_Id ? editRoom?.room_Id.toString() : "";
      room_Name = editRoom?.Room_Name ? editRoom?.Room_Name.toString() : "";
    } else {
      floorId = hostelDetails?.floor_Id
        ? hostelDetails.floor_Id.toString()
        : "";
      hostel_Id = hostelDetails?.hostel_Id
        ? hostelDetails.hostel_Id.toString()
        : "";
    }

    // if (!room || !/^[1-9]\d*$/.test(room)) {

    // setRoomError('Please enter a valid Room no. (must be a positive number greater than 0)')

    //   // Swal.fire({
    //   //   icon: 'warning',
    //   //   title: 'Please enter a valid Room no. (must be a positive number greater than 0)',
    //   // });
    //   return;
    // }

    if (!room) {
      setRoomError("Please enter a  Room no. or name");

      // Swal.fire({
      //   icon: 'warning',
      //   title: 'Please enter a valid Room no. (must be a positive number greater than 0)',
      // });
      return;
    }

    if (!floorId) {
      setFloorError("Please select floor");
      setTimeout(() => {
        setFloorError("");
      }, 2000);

      return;
    }

    // if (alreadyRoom) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'This room already exists in the hostel.',
    //     });
    //     return;
    // }

    const isChanged = room !== initialState.room;

    if (!isChanged) {
      setIsChangedError("No changes detected");

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
      }
    } else {
      if (floorId && hostel_Id && room) {
        dispatch({
          type: "CREATEROOM",
          payload: { hostel_id: hostel_Id, floorId: floorId, roomId: room },
        });
      }
    }
  };

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
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
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

            <CloseCircle size="24" color="#000" onClick={handleClose}  style={{cursor:"pointer"}}/>
          </Modal.Header>

          <Modal.Body>
            <div className="row mt-2">
              {/* {alreadyRoom && 
            <div>
             <label style={{color:"red", fontSize:16}}>This room already exists in the hostel.</label>
            </div>} */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group
                  // className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
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
                    placeholder="Enter Room name or no."
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

          {isChangedError && (
            <div className="d-flex align-items-center">
              <MdError style={{ color: "red", marginRight: "5px", marginLeft: "15px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
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
              <MdError style={{ color: "red", marginRight: "5px", marginLeft: "15px" }} />
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
              <MdError style={{ color: "red", marginRight: "5px", marginLeft: "15px" }} />
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
            // <div className="d-flex align-items-center p-1 mb-2">
            <div className="d-flex align-items-center">
              <MdError style={{ color: "red", marginRight: "5px", marginLeft: "15px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
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
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                paddingTop: 10,
                paddingBottom:12,
                paddingLeft:12,
                paddingRight:12
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

export default AddRoom;
