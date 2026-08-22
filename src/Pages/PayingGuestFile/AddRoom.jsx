/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'

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

  const roomRef = useRef(null);


  useEffect(() => {
    dispatch({ type: "CLEAR_ALREADY_ROOM_ERROR" });
  }, []);
  useEffect(() => {

    if (roomRef.current) {
      roomRef.current.focus();
    }
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
    let Room_Id = e.target.value;


    Room_Id = Room_Id.replace(/^\s+/, "");
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
      if (room_Id) {
        dispatch({
          type: "UPDATEROOM",
          payload: {
            hostelId: hostel_Id,
            // floorId: floorId,
            roomName: room,
            isActive: true,
            roomId: Number(room_Id),
          },
        });
        setFormLoading(true)
      }
    } else {
      if (floorId && room) {
        dispatch({
          type: "CREATEROOM",
          payload: { hostelId: hostel_Id, floorId: floorId, roomName: room },
        });
        setFormLoading(true)
      }
    }
  };


  useEffect(() => {
    if (state.PgList?.alreadyRoomHere) {
      setFormLoading(false)
    }

  }, [state.PgList?.alreadyRoomHere])




  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])






  return (
    <div
      className="modal show block static font-gilroy">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog className="m-0 p-0  w-full max-w-full" >
          <Modal.Header className="m-0 border border-[#E7E7E7]">
            <Modal.Title className="!text-lg !font-gilroy !font-semibold !text-[#222222]" >
              {modalTitle}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>

          <Modal.Body className="px-3 py-2">
            <div className="mt-1 m-0">
              <div className="w-full">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="font-gilroy text-black font-semibold text-base"
                  >
                    Room{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>
                  <Form.Control ref={roomRef}
                    value={room}
                    onChange={handleRoomChange}
                    type="text"
                    placeholder="Enter Room Name or No"
                    className={`text-base text-gray-600 font-gilroy shadow-none border border-gray-300 rounded-lg h-12 focus:outline-none ${room ? "font-semibold" : "font-medium"}`}

                  />
                </Form.Group>
              </div>
            </div>
            {roomError && (
              <ErrorMessage message={roomError} type="error" />
            )}
            {floorError && (
              <ErrorMessage message={floorError} type="error" />
            )}

            {state.PgList && state.PgList?.alreadyRoomHere && (
              <ErrorMessage message={state.PgList?.alreadyRoomHere} type="error" />
            )}
          </Modal.Body>


          {formLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-blue-600 border-r-transparent animate-spin"></div>
            </div>
          )}


          {isChangedError && (
            <div className="flex justify-center">
              <ErrorMessage message={isChangedError} type="error" />
            </div>
          )}

          <Modal.Footer className="border-0 p-3 mt-1">
            <Button
             disabled={formLoading}
              onClick={handleCreateRoom}
             className="w-100 m-0 !bg-[#1e45e1] !font-semibold !rounded-xl !py-3 !font-gilroy"
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
