/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";

function AddBed({ show, setShowBed, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [bedNo, setBedNo] = useState("");
  const [amount, setAmount] = useState("");
  const [bedError, setBedError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [bedAlreadyBooked, setBedAlreadyBooked] = useState("")
  const [formLoading, setFormLoading] = useState(false)


  useEffect(() => {
    if (state.PgList?.alreadyBedAvailable)
      setBedAlreadyBooked(state.PgList?.alreadyBedAvailable)

  }, [state.PgList?.alreadyBedAvailable])
  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #000000";
      closeButton.style.padding = "9px";
    }
  }, []);

  useEffect(() => {
    if (state.PgList.createBedStatusCode === 200) {
      setBedNo("");
      setAmount("");
      setFormLoading(false)
    }
  }, [state.PgList.createBedStatusCode]);





  const handleBedNoChange = (e) => {
    setBedNo(e.target.value);
    setGeneralError("");
    setBedError("");
    setBedAlreadyBooked("")
    dispatch({ type: "CLEAR_ALREADY_BED" });
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setAmount(newAmount);
    setGeneralError("");
    setBedAlreadyBooked("")
    setAmountError("");
  };

  const handleClose = () => {
    setShowBed(false)
    dispatch({ type: "CLEAR_ALREADY_BED" });
  }


  const handleSubmit = () => {
    dispatch({ type: "CLEAR_ALREADY_BED" });
    if (!bedNo) {
      setBedError("Please Enter a Valid Bed Number");

    } else {
      setBedError("");
    }


    if (!amount || amount <= 0) {
      setAmountError("Please Enter a Valid Amount");
    } else {
      setAmountError("");
    }
    if (
      currentItem.item.hostel_Id &&
      currentItem.item.floorID &&
      currentItem.Room_Id &&
      bedNo &&
      amount
      && amount > 0
    ) {
      dispatch({
        type: "CREATEBED",
        payload: {
          hostel_id: currentItem.item.hostel_Id,
          floor_id: currentItem.item.floorID,
          room_id: currentItem.Room_Id,
          bed_no: bedNo,
          amount: amount,
        },
      });
      setFormLoading(true)
      setGeneralError("");
    }
  };



  useEffect(() => {
    if (state.PgList?.alreadyBedAvailable) {
      setFormLoading(false)
    }
  }, [state.PgList?.alreadyBedAvailable])










  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog
          style={{
            maxWidth: 850, width: "100%",
            paddingTop: 5,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10
          }}
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
              Add bed
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
          </Modal.Header>

          <Modal.Body style={{ padding:"8px 13px" }} >
            <div className="row mb-0">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-2"
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
                    Bed Name or No{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={bedNo}
                    onChange={handleBedNoChange}
                    type="text"
                    placeholder="Enter Bed Name or No"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: bedNo ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {bedError && (
                  // <div className="d-flex align-items-center p-1 mb-2">
                  <div className="d-flex align-items-center p-0">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {bedError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-2"
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
                    Amount{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={amount}
                    onChange={handleAmountChange}
                    type="text"
                    placeholder="Enter Amount"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: amount ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>

                {amountError && (
                  // <div className="d-flex align-items-center p-1 mb-2">
                  <div className="d-flex align-items-center p-0">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {amountError}
                    </label>
                  </div>
                )}
              </div>
            </div>


            {generalError && (
              // <div className="d-flex align-items-center p-1 mb-2">
              <div className="d-flex align-items-center p-0">
                <MdError style={{ color: "red", marginRight: "5px" }} />
                <label
                  className="mb-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {generalError}
                </label>
              </div>
            )}

            {bedAlreadyBooked && bedAlreadyBooked && (
              // <div className="d-flex align-items-center p-1 mb-2">
              <div className="d-flex align-items-center p-0">
                <MdError style={{ color: "red", marginRight: "5px" }} />
                <label
                  className="mb-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {bedAlreadyBooked}
                </label>
              </div>
            )}
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

          <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
            <Button
              onClick={() => { handleSubmit() }}
              className="w-100 mt-1"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 12,
                paddingRight: 12
              }}
            >
              Add bed
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
AddBed.propTypes = {
  currentItem: PropTypes.func.isRequired,
  setShowBed: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,

};
export default AddBed;
