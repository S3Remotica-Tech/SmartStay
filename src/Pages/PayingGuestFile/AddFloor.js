import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import { MdError } from "react-icons/md";
import {CloseCircle} from "iconsax-react";
import PropTypes from "prop-types";

function StaticExample({
  show,
  handleClose,
  hostelFloor,
  editFloor,
  updateFloor,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [floorNo, setFloorNo] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [floorId, setFloorId] = useState("");
  const [initialState, setInitialState] = useState({
    floorNo: "",
  });







  useEffect(() => {
    if (editFloor) {
      setFloorNo(editFloor.floorName);
      setInitialState({
        floorNo: editFloor.floorName || "",
      });
    } else {
      setFloorNo("");
    }
  }, [editFloor]);

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #222222";
      closeButton.style.padding = "9px";
    }
  }, []);

  useEffect(() => {
    if (state.UsersList.createFloorSuccessStatusCode === 200) {
      setFloorNo("");
    }
  }, [state.UsersList.createFloorSuccessStatusCode]);
  const handleFloorChange = (e) => {
    setFloorNo(e.target.value);
    setFloorError("");
    dispatch({ type: "CLEAR_ALREADY_FLOOR_ERROR" });
    dispatch({ type: "CLEAR_UPDATE_FLOOR_ERROR" });
    setIsChangedError("");
  };

  

  const handleCreateFloor = () => {
    setFloorId("");
    // if (!floorNo || !/^[1-9]\d*$/.test(floorNo)) {
    //                setFloorError('Please enter a valid Floor no.(must be a positive number greater than 0)')
    //     return;
    //   }
    const isChanged = floorNo !== initialState.floorNo;

    if (!floorNo) {
      setFloorError("Please enter a valid Floor name or no.");
      return;
    }

    if (!isChanged) {
      setIsChangedError("No changes detected");
      return;
    }

    if (updateFloor && !editFloor.floor_Id) {
      setFloorId("Please Select Floor");
      return;
    }

    if (floorNo) {
      if (updateFloor) {
        dispatch({
          type: "UPDATEFLOOR",
          payload: {
            floor_Id: floorNo,
            hostel_Id: editFloor.hostel_Id,
            id: editFloor.floor_Id,
          },
        });
      } else {
        dispatch({
          type: "CREATEFLOOR",
          payload: { hostel_Id: hostelFloor, floor_Id: floorNo },
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
        fontFamily: "Gilroy,sans-serif",
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog
          style={{ maxWidth: "100%", width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header
            // closeButton closeLabel="close-button"
            style={{ border: "1px solid #E7E7E7" }}
          >
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {updateFloor ? " Edit Floor" : "Add floor"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{cursor:"pointer"}} />
          </Modal.Header>
          <Modal.Body style={{ paddingTop: 10, paddingLeft:10, paddingRight:10, paddingBottom:10 }}>
            <div className="row mt-1">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group
                  // className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "'Gilroy', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Floor name or no
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={floorNo}
                    onChange={handleFloorChange}
                    type="text"
                    placeholder="Enter floor name or no"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: floorNo ? 600 : 500,
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
{/*  p-1 mb-2 */}
          {floorId && (
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
                {floorId}
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
          {state.UsersList?.alreadyFloorHere && (
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
                {state.UsersList.alreadyFloorHere}
              </label>
            </div>
          )}
          {state.PgList?.alreadyfloorNameHere && (
            <div className="d-flex align-items-center">
              <MdError style={{ color: "red", marginRight: "5px", marginLeft: "10px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {state.PgList?.alreadyfloorNameHere}
              </label>
            </div>
          )}

          {isChangedError && (
            <div className="d-flex align-items-center  justify-content-center">
              <MdError style={{ fontSize: "14px",color: "red", marginRight: "6px", marginLeft: "10px" , fontFamily:"Gilroy"}} />
              <label
                className="mb-0"
                style={{ color: "red", fontSize: "12px", fontWeight: 500,fontFamily:"Gilroy" }}
              >
                {isChangedError}
              </label>
            </div>
          )}
          
          

          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              onClick={handleCreateFloor}
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
            >
              {updateFloor ? "Save Changes" : "Add floor"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
StaticExample.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  editFloor: PropTypes.func.isRequired,
  updateFloor: PropTypes.func.isRequired,
  hostelFloor: PropTypes.func.isRequired,
};
export default StaticExample;
