/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle, } from "iconsax-react";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'

function AddAmenities({ show, handleClose, hostelid, editDetails }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [amenity, setAmenity] = useState("");
  const [amount, setAmount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isChangedError, setIsChangedError] = useState("");
  const [initialState, setInitialState] = useState(null);
  const [hostelError, setHostelError] = useState("");
  const [errorAmenity, setErrorAmenity] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [amnitiesError, setAmnitiesError] = useState("")
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    if (editDetails) {
      const initialData = {
        amenity: editDetails.amenityName || "",
        amount: editDetails.amenityAmount || "",
        isChecked: !!editDetails.proRate,
      };


      setAmenity(initialData.amenity);
      setAmount(initialData.amount);
      setIsChecked(initialData.isChecked);
      setInitialState(initialData);
    }
  }, [editDetails]);

  console.log("initialdata", initialState , amount);
  
  const handleAmenityChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setAmenity(value);
    setErrorAmenity("");
    setIsChangedError("");
    setAmnitiesError("")
    dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' })
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setAmount(newAmount);
    setErrorAmount("");
    setIsChangedError("");
  };


  const handleCloseForm = () => {
    handleClose()
    setAmnitiesError("")
    dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' })
  }

  useEffect(() => {
    if (state.InvoiceList.amnitiessAddError) {
      setFormLoading(false)
      setAmnitiesError(state.InvoiceList.amnitiessAddError)
    }

  }, [state.InvoiceList.amnitiessAddError])

  console.log("editDetails", editDetails);
  

  const handleSubmit = () => {
    dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' })
    let isValid = true;

    if (!hostelid) {
      setHostelError("Pleae Select a Hostel");
    }

    if (!amenity) {
      setErrorAmenity("Please Enter Amenity");
      isValid = false;
    }

    // if (!amount) {
    //   setErrorAmount("Please Enter Amount");
    //   isValid = false;
    // } else if (isNaN(amount)) {
    //   setErrorAmount("Amount must be a Number");
    //   isValid = false;
    // }

    if (!amount) {
    setErrorAmount("Please Enter Amount");
    isValid = false;
  } else if (isNaN(amount)) {
    setErrorAmount("Amount Must Be a Number");
    isValid = false;
  } else if (Number(amount) <= 0) { 
    setErrorAmount("Amount Must Be Greater Than 0");
    isValid = false;
  }

    // if (initialState) {
    //   const isChanged =
    //     initialState.amenity !== amenity ||
    //     initialState.amount !== amount ||
    //     initialState.isChecked !== isChecked;

    //   if (!isChanged) {
    //     setIsChangedError("No Changes Detected");
    //     isValid = false;
    //   }
    // }

      if (initialState) {
    const oldAmount = Number(initialState.amount);
    const newAmount = Number(amount);

    const isChanged =
      initialState.amenity !== amenity ||
      oldAmount !== newAmount ||
      initialState.isChecked !== isChecked;

    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      isValid = false;
    }
  }

    if (isValid) {
      if (editDetails) {
        dispatch({
          type: "AMENITIESUPDATE",
          payload: {
          hostelId: state.login.selectedHostel_Id,
          amenityId: editDetails.amenityId,
          data: {
            amenityName: amenity,
            amount: amount,   
            proRate: isChecked,
          }
        },
        
        });
        setFormLoading(true)
      } else {
        dispatch({
          type: "ADD_AMENITIY",
          payload: {
          hostelId: state.login.selectedHostel_Id,
          data: {
            amenityName: amenity,
            amount: amount,   
            proRate: isChecked,
          }
        }
        });
        setFormLoading(true)
      }
    }
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  return (
    <>

      <div
        className="modal show"
        style={{
          display: "block",
          position: "initial",
        }}
      >
        <Modal show={show} onHide={handleCloseForm} centered backdrop="static">
          <Modal.Dialog
            style={{ maxWidth: 850, width: "100%" }}
            className="m-0 p-0"
          >
            <Modal.Header style={{ border: "1px solid #E7E7E7", marginBottom: "-15px" }}>
              <Modal.Title
                style={{
                  fontSize: 18,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                }}
              >
                {editDetails ? "Edit Amenities" : "Add Amenities"}
              </Modal.Title>

              <CloseCircle size="24" color="#000" onClick={handleCloseForm} style={{ cursor: "pointer" }} />
            </Modal.Header>

            <Modal.Body className="pt-2">


              {hostelError && (
                <ErrorMessage message={hostelError} type="error" />
              )}

              <div className="row mt-2">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-1"
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
                      Amenity {" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      value={amenity}
                      onChange={handleAmenityChange}
                      type="text"
                      placeholder="Enter Amenity"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>
                  {errorAmenity && (
                   <ErrorMessage message={errorAmenity} type="error" />
                  )}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-1"
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
                      Amount {" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      value={amount}
                      onChange={handleAmountChange}
                      type="text"
                      placeholder="Enter amount"
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: 8,
                      }}
                    />
                  </Form.Group>

                  {errorAmount && (
                   <ErrorMessage message={errorAmount} type="error" />
                  )}
                </div>


              </div>
            </Modal.Body>

           
            {formLoading &&
              <div
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
              </div>
            }

            {amnitiesError && (
              <div className="d-flex justify-content-center align-items-center">
                <ErrorMessage message={amnitiesError} type="error" />
              
              </div>
            )}
            {isChangedError && (
              <div className="d-flex justify-content-center align-items-center mt-1 mb-2">
                 <ErrorMessage message={isChangedError} type="error" />
              </div>
            )}

            <Modal.Footer style={{ border: "none", paddingTop:2 }}>
              <Button
                onClick={handleSubmit}
                className="w-100"
                style={{
                  backgroundColor: "#1E45E1",
                  fontWeight: 600,
                  padding: 12,
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: "Gilroy",
                }}
              >
                {editDetails ? "Save Changes" : "Add Amenities"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}


AddAmenities.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  hostelid: PropTypes.func.isRequired,
  editDetails: PropTypes.func.isRequired,

};

export default AddAmenities;
