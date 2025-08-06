/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,useRef } from "react";
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

function EditAddressDetails({ show, handleClose,addressDetails }) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();


    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [stateName, setStateName] = useState("");
    const[formError,setFormError] = useState("")



const [firstName,setFirstname] = useState("")
const [lastname,setLastname] = useState("")
const [phone,setPhone] = useState("")
 const [countryCode, setCountryCode] = useState("91");
 const [initialState,setInitialstate] = useState("")
 const [pincodeError,setPincodeError] = useState("")

useEffect(()=>{
if(addressDetails){
     const phoneNumber = String(addressDetails[0].Phone || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      if (addressDetails[0].Name) {
        let value = addressDetails[0].Name.split(" ");
        setFirstname(value[0]);
        setLastname(value[1]);
      } else {
        setFirstname("");
        setLastname("");
      }

  setHouseNo(addressDetails[0].Address || "")
  setStreet(addressDetails[0].area || "")
  setLandmark(addressDetails[0].landmark || "")
  setPincode(addressDetails[0].pincode || "")
  setCity(
  addressDetails[0].city && addressDetails[0].city !== "undefined"
    ? addressDetails[0].city
    : ""
);

setStateName(
  addressDetails[0].state && addressDetails[0].state !== "undefined"
    ? addressDetails[0].state
    : ""
);
  setPhone(mobileNumber)
  setCountryCode(countryCode)


  setInitialstate({
      Address: addressDetails[0].Address || "",
      area: addressDetails[0].area || "",
      landmark: addressDetails[0].landmark || "",
      city:
        addressDetails[0].city && addressDetails[0].city !== "undefined"
          ? addressDetails[0].city
          : "",
      pincode: addressDetails[0].pincode || "",
      state:
        addressDetails[0].state && addressDetails[0].state !== "undefined"
          ? addressDetails[0].state
          : "",
    });
}
},[addressDetails])

    const handleHouseNoChange = (e) => {
        setHouseNo(e.target.value);
        setFormError("")
    }


    const handleStreetChange = (e) => {
        setStreet(e.target.value);
        setFormError("")
    }

    const handleLandmarkChange = (e) => {
        setLandmark(e.target.value);
        setFormError("")

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

const MobileNumber = `${countryCode}${phone}`;
  const pincodeRef = useRef(null);

    const handleSubmitAddress = ()=>{
         const focusedRef = { current: false };
const cleanedPincode = String(pincode || "").trim();
        if (cleanedPincode && cleanedPincode !== "0" && !/^\d{6}$/.test(cleanedPincode)) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");

      if (!focusedRef.current && pincodeRef?.current) {
        pincodeRef.current.focus();
        focusedRef.current = true;
      }

     
    } else {
      setPincodeError("");
    }

          if (!initialState) return;

  const noChanges =
    houseNo === initialState.Address &&
    street === initialState.area &&
    landmark === initialState.landmark &&
    city === initialState.city &&
    pincode === initialState.pincode &&
    stateName === initialState.state;

  if (noChanges) {
    setFormError("No changes detected.");
    return;
  }
        const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstName);
    const capitalizedLastname = capitalizeFirstLetter(lastname);
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
        
         const payload = {
      profile: addressDetails[0].profile,
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      Phone: normalizedPhoneNumber,
      Email: addressDetails[0].Email,
      Address: houseNo,
      area: street,
      landmark: landmark,
      city: city,
      pincode: pincode,
      state: stateName,
      HostelName: addressDetails[0].HostelName,
      hostel_Id: addressDetails[0].Hostel_Id,
      Floor:  addressDetails[0].Floor,
      Rooms:  addressDetails[0].hstl_Rooms,
      Bed: addressDetails[0].hstl_Bed,
      joining_date: addressDetails[0].Bed,
      AdvanceAmount: addressDetails[0].AdvanceAmount,
      RoomRent: addressDetails[0].RoomRent,
      ID: addressDetails[0].ID,

    };
    dispatch({
      type: "ADDUSER",
      payload: payload,
    });
    }


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
                                                                        <div
                                                                          style={{
                                                                            marginTop: "",
                                                                            color: "red",
                                                                          }}
                                                                        >
                                                                          {" "}
                                                                          <MdError
                                                                            style={{
                                                                              fontSize: "12px",
                                                                              fontFamily: "Gilroy",
                                                                              fontWeight: 500,
                                                                              marginRight: "5px",
                                                                            }}
                                                                          />
                                                                          <span
                                                                            style={{
                                                                              fontSize: "13px",
                                                                              fontFamily: "Gilroy",
                                                                              fontWeight: 500,
                                                                            }}
                                                                          >
                                                                            {pincodeError}
                                                                          </span>
                                                                        </div>
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
                                     <div
                                       className="d-flex align-items-center justify-content-center"
                                       style={{ color: "red" }}
                                     >
                                       <MdError style={{ marginRight: "5px" }} />
                                       <span
                                         style={{
                                           fontSize: "12px",
                                           color: "red",
                                           fontFamily: "Gilroy",
                                           fontWeight: 500,
                                         }}
                                       >
                                         {formError}
                                       </span>
                                     </div>
                                   )}

                    {state.createAccount?.networkError ?
                        <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                            <MdError style={{ color: "red", marginLeft: "15px", marginRight: 5, fontSize: "14px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                        </div>
                        : null}
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