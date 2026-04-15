/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'

function StaticExample({
  show,
  handleClose,
  hostelFloor,
  editFloor,
  updateFloor,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const floorNameRef = useRef(null);
  const [floorNo, setFloorNo] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [floorId, setFloorId] = useState("");
  const [formLoading, setFormLoading] = useState(false)
  const [initialState, setInitialState] = useState({
    floorNo: "",
  });




  useEffect(() => {
    if (floorNameRef.current) {
      floorNameRef.current.focus();
    }
  }, []);


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
    if (state.UsersList.createFloorSuccessStatusCode === 201) {
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
            floorName: floorNo,
            isActive: true,
            id: editFloor.floor_Id,
          },
        });
        setFormLoading(true)
      } else {
        dispatch({
          type: "CREATEFLOOR",
          payload: { hostelId: hostelFloor, floorName: floorNo },
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



  useEffect(() => {
    if (floorNameRef.current) {
      floorNameRef.current.focus();
    }
  }, []);


  return (
    <div className="modal show block static font-gilroy">
      <Modal show={show} onHide={handleClose} centered backdrop="static" >
        <Modal.Dialog className="m-0 p-0 w-full max-w-full">
          <Modal.Header className="m-0 border border-[#E7E7E7]">

            <Modal.Title className="!text-lg !font-gilroy !font-semibold !text-[#222222]">
              {updateFloor ? " Edit Floor" : "Add Floor"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} className="cursor-pointer" />
          </Modal.Header>

          <Modal.Body className="px-3 py-2">
            <div className="mt-1 m-0">
              <div className="w-full">

                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="font-gilroy text-black font-semibold text-base"
                  >
                    Floor Name or No {" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>
                  <Form.Control
                    ref={floorNameRef}
                    value={floorNo}
                    onChange={handleFloorChange}
                    type="text"
                    placeholder="Enter Floor Name or No"
                    className={`text-base text-gray-600 font-gilroy ${floorNo ? "font-semibold" : "font-medium"} shadow-none border border-gray-300
  h-12 rounded-lg
`}


                  />
                </Form.Group>
              </div>


            </div>

            {floorId && (
              <ErrorMessage message={floorId} type="error" />
            )}

            {floorError && (
              <ErrorMessage message={floorError} type="error" />
            )}
            {state.UsersList?.alreadyFloorHere && (
              <ErrorMessage message={state.UsersList?.alreadyFloorHere} type="error" />
            )}
            {state.PgList?.alreadyfloorNameHere && (
              <ErrorMessage message={state.PgList?.alreadyfloorNameHere} type="error" />
            )}

          </Modal.Body>

          {formLoading && (
            <div className="absolute inset-0 flex items-center justify-center opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-4 border-t-blue-600 border-r-transparent animate-spin"></div>
            </div>
          )}


          {isChangedError && (
            <div className="flex items-center  justify-center">
              <ErrorMessage message={isChangedError} type="error" />
            </div>
          )}


          <Modal.Footer className="border-0 p-3 mt-1">
            <Button  disabled={formLoading}
              onClick={handleCreateFloor}
              className="w-100 m-0 !bg-[#1e45e1] !font-semibold !rounded-xl !py-3 !font-gilroy"
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
