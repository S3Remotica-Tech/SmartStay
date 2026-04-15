/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
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
  // const [amnitiesError, setAmnitiesError] = useState("")
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



  // const handleAmenityChange = (e) => {
  //   const value = e.target.value;
  //   const pattern = /^[a-zA-Z\s]*$/;
  //   if (!pattern.test(value)) {
  //     return;
  //   }
  //   setAmenity(value);
  //   setErrorAmenity("");
  //   setIsChangedError("");
  //   setAmnitiesError("")
  //   dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' })
  // };

  const handleAmenityChange = (e) => {
    let value = e.target.value;

    value = value.trimStart();
    value = value.replace(/\s+/g, " ");

    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }

    setAmenity(value);
    setErrorAmenity("");
    setIsChangedError("");
    // setAmnitiesError("");
    dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' });
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
    // setAmnitiesError("")
    dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' })
  }

  useEffect(() => {
    if (state.InvoiceList.amnitiessAddError) {
      setFormLoading(false)
      // setAmnitiesError(state.InvoiceList.amnitiessAddError)
    }

  }, [state.InvoiceList.amnitiessAddError])




  const handleSubmit = () => {
    dispatch({ type: 'REMOVE_ERROR_AMENITIES_SETTINGS' })
    let isValid = true;

    if (!hostelid) {
      setHostelError("Pleae Select a Hostel");
    }

    if (!amenity?.trim()) {
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
              amenityName: amenity.trim(),
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
              amenityName: amenity.trim(),
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

      <div className="modal show block relative">
        <Modal show={show} onHide={handleCloseForm} centered backdrop="static">
          <Modal.Dialog className="m-0 p-0 w-full max-w-3xl">

            <Modal.Header className="border border-gray-200 mb-[-4]">
              <Modal.Title className="!text-lg !font-gilroy !font-semibold !text-gray-900">
                {editDetails ? "Edit Amenities" : "Add Amenities"}
              </Modal.Title>

              <CloseCircle
                size={24}
                color="#000"
                onClick={handleCloseForm}
                className="cursor-pointer"
              />
            </Modal.Header>

            <Modal.Body className="pt-2">
              {hostelError && (
                <ErrorMessage message={hostelError} type="error" />
              )}

              <div className="grid gap-4 mt-2">

                <div className="w-full">
                  <label className="block text-sm text-gray-900 font-gilroy font-medium mb-1">
                    Amenity <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Amenity"
                    value={amenity}
                    onChange={handleAmenityChange}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md text-gray-700 font-gilroy font-medium text-base shadow-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errorAmenity && (
                    <ErrorMessage message={errorAmenity} type="error" />
                  )}
                </div>

                <div className="w-full">
                  <label className="block text-sm text-gray-900 font-gilroy font-medium mb-1">
                    Amount <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md text-gray-700 font-gilroy font-medium text-base shadow-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {errorAmount && (
                    <ErrorMessage message={errorAmount} type="error" />
                  )}
                </div>
              </div>
            </Modal.Body>

            {/* {state.createAccount?.networkError ?
             <div className="d-flex justify-content-center mt-1 mb-1">
              <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
              : null} */}

            {formLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-75 z-10">
                <div className="w-10 h-10 border-t-4 border-blue-700 border-r-4 border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {state.InvoiceList.amnitiessAddError && (
              <div className="flex justify-center items-center">
                <ErrorMessage message={state.InvoiceList.amnitiessAddError} type="error" />

              </div>
            )}
            {isChangedError && (
              <div className="flex justify-center items-center mt-1 mb-2">
                <ErrorMessage message={isChangedError} type="error" />
              </div>
            )}

            <Modal.Footer className="!border-none !pt-1">
              <button disabled={formLoading}
                onClick={handleSubmit}
                className="!w-full !bg-[#1E45E1] !font-gilroy !font-semibold !text-base !rounded-lg !py-3 text-white 
                disabled:!bg-gray-300  
                disabled:!text-gray-500 disabled:!cursor-not-allowed disabled:!opacity-70 "
              >
                {editDetails ? "Save Changes" : "Add Amenities"}
              </button>
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
