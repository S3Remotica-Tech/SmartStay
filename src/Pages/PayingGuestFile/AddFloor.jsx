import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
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
  const [formLoading, setFormLoading] = useState(false)
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
      setFormLoading(false)
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
    dispatch({ type: "CLEAR_ALREADY_FLOOR_ERROR" });
    dispatch({ type: "CLEAR_UPDATE_FLOOR_ERROR" });
    setFloorId("");
    const isChanged = floorNo !== initialState.floorNo;

    if (!floorNo) {
      setFloorError("Please Enter a Valid Floor Name or No");
      return;
    }

    if (!isChanged) {
      setIsChangedError("No Changes Detected");
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
        setFormLoading(true)
      } else {
        dispatch({
          type: "CREATEFLOOR",
          payload: { hostel_Id: hostelFloor, floor_Id: floorNo },
        });
        setFormLoading(true)
      }
    }

  };



  useEffect(() => {
    if (state.UsersList?.alreadyFloorHere || state.PgList?.alreadyfloorNameHere) {
      setFormLoading(false)
    }

  }, [state.UsersList?.alreadyFloorHere, state.PgList?.alreadyfloorNameHere])




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
              {updateFloor ? " Edit Floor" : "Add Floor"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
          </Modal.Header>
          <Modal.Body style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}>
            <div className="row mt-1">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group
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
                    Floor Name or No
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={floorNo}
                    onChange={handleFloorChange}
                    type="text"
                    placeholder="Enter Floor Name or No"
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
          {state.createAccount?.networkError ? 
          <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                                  <MdError style={{ color: "red", marginRight: '5px' }} />
                                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                                </div>
                                  : null}
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
              <MdError style={{ fontSize: "14px", color: "red", marginRight: "6px", marginLeft: "10px", fontFamily: "Gilroy" }} />
              <label
                className="mb-0"
                style={{ color: "red", fontSize: "12px", fontWeight: 500, fontFamily: "Gilroy" }}
              >
                {isChangedError}
              </label>
            </div>
          )}



          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              onClick={handleCreateFloor}
              className="w-100 mt-3"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
            >
              {updateFloor ? "Save Changes" : "Add Floor"}
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
