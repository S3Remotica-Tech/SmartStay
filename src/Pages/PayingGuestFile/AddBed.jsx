/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'

function AddBed({ show, setShowBed, currentItem, editBedMode, isOccupied }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [bedNo, setBedNo] = useState("");
  const [amount, setAmount] = useState("");
  const [bedError, setBedError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [generalError, setGeneralError] = useState("");
    const [formLoading, setFormLoading] = useState(false)
const bedRef = useRef(null);


 useEffect(() => {
   
    if (bedRef.current) {
      bedRef.current.focus();
    }
  }, []);

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
    if (state.PgList.createBedStatusCode === 201) {
      setBedNo("");
      setAmount("");
      setFormLoading(false)
    }
  }, [state.PgList.createBedStatusCode]);





  const handleBedNoChange = (e) => {
    let value = e.target.value;
    value = value.replace(/^\s+/, "");
    setBedNo(value);
    setGeneralError("");
    setBedError("");
    // setBedAlreadyBooked("");
    dispatch({ type: "CLEAR_ALREADY_BED" });
  };


  const handleAmountChange = (e) => {
    const newAmount = e.target.value
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setAmount(newAmount);
    setGeneralError("");
    // setBedAlreadyBooked("")
    setAmountError("");
  };


 

  const handleClose = () => {
    setShowBed(false)
    dispatch({ type: "CLEAR_ALREADY_BED" });
  }


  const handleSubmit = () => {
    dispatch({ type: 'CLEAR_NETWORK_ERROR' })
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

    const isChanged = () => {
  return (
    bedNo !== (isOccupied?.bedName || "") ||
    String(amount) !== String(isOccupied?.rentAmount || "")
  );
};



    if (editBedMode && !isChanged()) {
      setGeneralError("No changes detected");
      return;
    }


    if (editBedMode && bedNo && amount && amount > 0) {
      dispatch({
        type: 'UPDATEBED',
        payload: {
          bedName: bedNo,
          isActive: true,
          amount: amount,
          bedId: isOccupied?.bedId
        }
      })
      setFormLoading(true)

    }
    else if (
      currentItem.item.hostel_Id &&
      currentItem.Room_Id &&
      bedNo &&
      amount
      && amount > 0
    ) {
      dispatch({
        type: "CREATEBED",
        payload: {
          hostelId: currentItem.item.hostel_Id,
          roomId: currentItem.Room_Id,
          bedName: bedNo,
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


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])




  useEffect(() => {
    if (editBedMode) {
      setBedNo(isOccupied?.bedName)
      setAmount(isOccupied?.rentAmount)
    }

  }, [editBedMode])



  return (

    <div className="modal show block static font-gilroy">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
          <Modal.Dialog className="m-0 p-0 w-full max-w-full">
          <Modal.Header className="m-0 border border-[#E7E7E7]">
            <Modal.Title className="!text-lg !font-gilroy !font-semibold !text-[#222222]">
              {editBedMode ? 'Edit bed' : 'Add bed'}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} className="cursor-pointer" />
          </Modal.Header>

          <Modal.Body className="px-3.5 py-2" >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-1">
                   <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                    Bed Name or No{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>
                  <Form.Control
                    value={bedNo}
                    ref={bedRef}
                    onChange={handleBedNoChange}
                    type="text"
                    placeholder="Enter Bed Name or No"
                    className={`text-base text-gray-600 font-gilroy shadow-none border border-gray-300 rounded-lg h-12 focus:outline-none ${bedNo ? "font-semibold" : "font-medium"}`}

                  />
                </Form.Group>
                {bedError && (

                  <ErrorMessage message={bedError} type="error" />
                )}
              </div>
              <div className="md:col-span-1">
                <Form.Group
                  className="mb-2"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm text-gray-900 font-gilroy font-medium" >
                    Amount{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>
                  <Form.Control
                    value={amount}
                    onChange={handleAmountChange}
                    type="text"
                    placeholder="Enter Amount"
                    className={`text-base text-gray-600 font-gilroy shadow-none border border-gray-300 rounded-lg h-12 focus:outline-none ${amount ? "font-semibold" : "font-medium"}`}
                  />
                </Form.Group>

                {amountError && (
                  <ErrorMessage message={amountError} type="error" />
                )}
              </div>
            </div>


            {generalError && (
              <div className="flex justify-center">
                <ErrorMessage message={generalError} type="error" />
              </div>
            )}

            {state.PgList?.alreadyBedAvailable && (
              <ErrorMessage message={state.PgList?.alreadyBedAvailable} type="error" />
            )}
          </Modal.Body>

          {formLoading && (
            <div className="absolute inset-0 flex items-center justify-center opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-4 border-t-blue-600 border-r-transparent animate-spin"></div>
            </div>
          )}

          <Modal.Footer className="border-0 p-3">
            <Button
              disabled={formLoading}
              onClick={() => { handleSubmit() }}
               className="w-100 m-0 !bg-[#1e45e1] !font-semibold !rounded-xl !py-3 !font-gilroy"
            >
              {editBedMode ? 'Save Changes' : 'Add bed'}
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
  show: PropTypes.bool.isRequired,
  editBedMode: PropTypes.bool,
  isOccupied: PropTypes.shape({
    bedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bedName: PropTypes.string,
    rentAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
export default AddBed;
