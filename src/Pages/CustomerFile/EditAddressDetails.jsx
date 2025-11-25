/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
    Modal,
    Form,
    Button,
    FormControl

} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'

function EditAddressDetails({ show, handleClose, addressDetails }) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();




    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const [formError, setFormError] = useState("")



    const [firstName, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const [countryCode, setCountryCode] = useState("91");
    const [initialState, setInitialstate] = useState("")
    const [pincodeError, setPincodeError] = useState("")

    useEffect(() => {
        if (addressDetails) {
            setHouseNo(addressDetails.address?.houseNo || "");
            setStreet(addressDetails.address?.streetName || "");
            setLandmark(addressDetails.address?.landmark || "");
            setPincode(addressDetails.address?.pincode || "");
            setCity(
                addressDetails.address?.city && addressDetails.address?.city !== "undefined"
                    ? addressDetails.address.city
                    : ""
            );
            setStateName(
                addressDetails.address?.state && addressDetails.address?.state !== "undefined"
                    ? addressDetails.address.state
                    : ""
            );
            setInitialstate({
                Address: addressDetails.address?.houseNo || "",
                area: addressDetails.address?.streetName || "",
                landmark: addressDetails.address?.landmark || "",
                city:
                    addressDetails.address?.city && addressDetails.address?.city !== "undefined"
                        ? addressDetails.address.city
                        : "",
                pincode: addressDetails.address?.pincode || "",
                state:
                    addressDetails.address?.state && addressDetails.address?.state !== "undefined"
                        ? addressDetails.address.state
                        : "",
            });
        }
    }, [addressDetails]);




    const handleHouseNoChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;

        if (regex.test(value)) {
            setHouseNo(value);
            setFormError("");
        }
    };

    const handleStreetChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;
        if (regex.test(value)) {
            setStreet(value);
            setFormError("")
        }
    }

    const handleLandmarkChange = (e) => {
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;
        if (regex.test(value)) {
            setLandmark(value);
            setFormError("")
        }
    };


    const handlePincodeChange = (e) => {
        const value = e.target.value;
        if (!/^\d{0,6}$/.test(value)) {
            return;
        }

        setPincode(value);
        if (value.length > 0 && value.length < 6) {
            setPincodeError("Pin Code Must Be Exactly 6 Digits");
        } else {
            setPincodeError("");
        }
        setFormError("")
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        setFormError("")

    };

    const handleStateChange = (selectedOption) => {
        setStateName(selectedOption?.value || "");
        setFormError("")

    };
    useEffect(() => {
        const rawAddress = state.UsersList.KycCustomerDetails?.address || "";

        if (rawAddress) {
            const parts = rawAddress.split(",").map((part) => part.trim());


            const addressParts = parts.slice(1);


            const pincodePart = addressParts[addressParts.length - 1];
            const statePart = addressParts[addressParts.length - 2];
            const cityPart = addressParts[addressParts.length - 3];


            const others = addressParts.slice(0, addressParts.length - 3);
            const [streetNumber, streetName, areaPart, landmarkPart] = others;

            setHouseNo(`${streetNumber} ${streetName}`);
            setStreet(areaPart);
            setLandmark(landmarkPart);
            setCity(cityPart);
            setStateName(statePart);
            setPincode(pincodePart);
        }
    }, [state.UsersList.KycCustomerDetails?.address]);






    const indianStates = [
        { value: "Tamil Nadu", label: "Tamil Nadu" },
        { value: "Andhra Pradesh", label: "Andhra Pradesh" },
        { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
        { value: "Assam", label: "Assam" },
        { value: "Bihar", label: "Bihar" },
        { value: "Chhattisgarh", label: "Chhattisgarh" },
        { value: "Goa", label: "Goa" },
        { value: "Gujarat", label: "Gujarat" },
        { value: "Haryana", label: "Haryana" },
        { value: "Himachal Pradesh", label: "Himachal Pradesh" },
        { value: "Jharkhand", label: "Jharkhand" },
        { value: "Karnataka", label: "Karnataka" },
        { value: "Kerala", label: "Kerala" },
        { value: "Madhya Pradesh", label: "Madhya Pradesh" },
        { value: "Maharashtra", label: "Maharashtra" },
        { value: "Manipur", label: "Manipur" },
        { value: "Meghalaya", label: "Meghalaya" },
        { value: "Mizoram", label: "Mizoram" },
        { value: "Nagaland", label: "Nagaland" },
        { value: "Odisha", label: "Odisha" },
        { value: "Punjab", label: "Punjab" },
        { value: "Rajasthan", label: "Rajasthan" },
        { value: "Sikkim", label: "Sikkim" },
        { value: "Telangana", label: "Telangana" },
        { value: "Tripura", label: "Tripura" },
        { value: "Uttar Pradesh", label: "Uttar Pradesh" },
        { value: "Uttarakhand", label: "Uttarakhand" },
        { value: "West Bengal", label: "West Bengal" },
        {
            value: "Andaman and Nicobar Islands",
            label: "Andaman and Nicobar Islands",
        },
        { value: "Chandigarh", label: "Chandigarh" },
        {
            value: "Dadra and Nagar Haveli and Daman and Diu",
            label: "Dadra and Nagar Haveli and Daman and Diu",
        },
        { value: "Delhi", label: "Delhi" },
        { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
        { value: "Ladakh", label: "Ladakh" },
        { value: "Lakshadweep", label: "Lakshadweep" },
        { value: "Puducherry", label: "Puducherry" },
    ];


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])

    
    const pincodeRef = useRef(null);

    const handleSubmitAddress = () => {
        let focused = false;
        let hasError = false;

        const pinString = String(pincode || "").trim();


       if (pinString && pinString.length !== 6) {
            setPincodeError("Pin Code Must Be Exactly 6 Digits");
            if (!focused) {
                pincodeRef.current?.focus();
                focused = true;
            }
            hasError = true;
        } else if (pinString === "000000") {
            setPincodeError("Pin Code cannot be all zeros");
            if (!focused) {
                pincodeRef.current?.focus();
                focused = true;
            }
            hasError = true;
        } else if (pinString[0] === "0") {
            setPincodeError("Pin Code cannot start with 0");
            if (!focused) {
                pincodeRef.current?.focus();
                focused = true;
            }
            hasError = true;
        } else if (pinString.slice(-3) === "000") {
            setPincodeError("Last 3 digits cannot be 000");
            if (!focused) {
                pincodeRef.current?.focus();
                focused = true;
            }
            hasError = true;
        } else {
            setPincodeError("");
        }

        if (hasError) return;

        
        if (!initialState) return;

        
        const noChanges =
    houseNo === initialState.Address &&
    street === initialState.area &&
    landmark === initialState.landmark &&
    city === initialState.city &&
    String(pincode) === String(initialState.pincode) &&
    stateName === initialState.state;

        if (noChanges) {
            setFormError("No changes detected");
            return;
        }

        
        const capitalizeFirstLetter = (str) =>
            str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

         
        dispatch({
            type: "EDITBASICDETAILS",
            payload: {
                customerId: addressDetails?.customerId,
                payloads: {
                    houseNo: houseNo || "",
                    street: street || "",
                    landmark: landmark || "",
                    pincode: pinString || "",
                    city: city || "",
                    state: stateName || "",
                },
                profilePic: addressDetails?.profilePic || "",
            },
        });
    };





    return (
        <div
            className="modal show"
            style={{
                display: "block",
                position: "initial",
            }}
        >
            <Modal show={show}
                onHide={handleClose}
                centered backdrop="static">
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
                            Edit Address Details
                        </Modal.Title>

                        <CloseCircle size="24" color="#000"
                            onClick={handleClose}
                            style={{ cursor: "pointer" }} />
                    </Modal.Header>

                    <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll p-3 mt-2 me-3" >
                        <div className="row mb-0">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Flat , House no , Building , Company ,
                                        Apartment{" "}
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter House No"
                                        value={houseNo}
                                        onChange={handleHouseNoChange}
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

                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Area , Street , Sector , Village{" "}
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter Street"
                                        value={street}
                                        onChange={handleStreetChange}
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

                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Landmark {" "}
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="E.g , near appollo hospital"
                                        value={landmark}
                                        onChange={handleLandmarkChange}
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

                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group
                                    className="mb-3"
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
                                        Pincode {" "}

                                    </Form.Label>
                                    <Form.Control
                                    ref={pincodeRef}
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                        type="tel"
                                        maxLength={6}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        placeholder="Enter Pincode"
                                        style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: pincode ? 600 : 500,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                            height: 50,
                                            borderRadius: 8,
                                        }}
                                    />

                                </Form.Group>
                                {pincodeError && (
                                    <ErrorMessage message={pincodeError} type="error" />
                                )}
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Town/City {" "}

                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter City"
                                        value={city}
                                        onChange={handleCityChange}
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

                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput5"
                                >
                                    <Form.Label
                                        style={{
                                            fontFamily: "Gilroy",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: "#222",
                                            fontStyle: "normal",
                                            lineHeight: "normal",
                                        }}
                                    >
                                        State

                                    </Form.Label>

                                    <Select
                                        options={indianStates}

                                        onChange={handleStateChange}
                                        onInputChange={(inputValue, { action }) => {
                                            if (action === "input-change") {
                                                const lettersOnly = inputValue.replace(
                                                    /[^a-zA-Z\s]/g,
                                                    ""
                                                );
                                                return lettersOnly;
                                            }
                                            return inputValue;
                                        }}
                                        value={stateName ? { label: stateName, value: stateName } : null}
                                        placeholder="Select State"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        noOptionsMessage={() =>
                                            "No state available"
                                        }
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                height: "50px",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: stateName ? 600 : 500,
                                                boxShadow: "none",
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                backgroundColor: "#f8f9fa",
                                                border: "1px solid #ced4da",
                                                fontFamily: "Gilroy",
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                backgroundColor: "#f8f9fa",
                                                maxHeight: "120px",
                                                padding: 0,
                                                scrollbarWidth: "thin",
                                                overflowY: "auto",
                                                fontFamily: "Gilroy",
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: "#555",
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                color: "#555",
                                                cursor: "pointer",
                                            }),
                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                cursor: "pointer",
                                                backgroundColor: state.isFocused
                                                    ? "#f0f0f0"
                                                    : "white",
                                                color: "#000",
                                            }),
                                        }}
                                    />
                                </Form.Group>

                            </div>
                        </div>




                    </Modal.Body>
                    {formError && (
                        <div className="d-flex justify-content-center">
                            <ErrorMessage message={formError} type="error" />
                        </div>

                    )}


                    <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
                        <div className="d-flex justify-content-end gap-3">


                            <Button
                                onClick={handleClose}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#fff",
                                    border: "none",
                                    color: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmitAddress}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Update
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}
EditAddressDetails.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,

    addressDetails: PropTypes.func.isRequired,

};
export default EditAddressDetails