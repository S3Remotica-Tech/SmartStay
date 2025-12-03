/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup, Card, FormControl } from "react-bootstrap";
import { MdError } from "react-icons/md";
import { CloseCircle, Trash, AddCircle, Gallery } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'

function AddPg({ show, handleClose, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [pgName, setPgName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setStateName] = useState("");
  const [initialState, setInitialState] = useState({});
  const [displayLayer, setDisplayLayer] = useState(null);
  const [pgNameError, setPgNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [hostel_Id, setHostel_Id] = useState("");
  const [formLoading, setFormLoading] = useState(false)
  const errorRef = useRef(null);
  const pgNameRef = useRef(null);
  const countryCodeRef = useRef(null);
  const mobileRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateNameRef = useRef(null);

  const [images, setImages] = useState(Array(4).fill({ image: null }));


  console.log("images", images)

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





  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      setFile(fileImage);
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;

    const pattern = /^\d*$/;

    if (pattern.test(value)) {
      setMobile(value);
      setGeneralError("");
      setIsChangedError("");

      if (value === "") {
        setMobileError("Please Enter Mobile No");
      } else if (value.length < 10) {
        setMobileError("Please Enter Valid Mobile No");
      } else if (value.length === 10) {
        setMobileError("");
      }
    } else {
      setMobileError("Please Enter Valid Mobile No");
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);
    setGeneralError("");
    setIsChangedError("");

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Please Enter Valid Email Id");
    } else {
      setEmailError("");
    }
  };

  const handlePgNameChange = (e) => {
    const value = e.target.value;
    setPgNameError("");
    setGeneralError("");
    setIsChangedError("");
    if (value === "") {
      setPgName(value);
      return;
    }

    if (value.trim() !== "") {
      setPgName(value);
    }
  };

  const handleHouseNo = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;
    if (regex.test(value)) {
      setHouseNo(value);
      setHouse_NoError("");
      setGeneralError("");
      setIsChangedError("");
    }
  };


  const handleStreetName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;

    if (regex.test(value)) {
      setStreet(value);
      setStreetError("");
      setGeneralError("");
      setIsChangedError("");
    } else {
      setStreetError("Please Enter Valid Street Name");
    }
  };


  const handleLandmark = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;

    if (regex.test(value)) {
      setLandmark(value);
      setLandmarkError("");
      setGeneralError("");
      setIsChangedError("");
    } else {
      setLandmarkError("Please Enter Valid Landmark");
    }
  };


  const handlePinCodeChange = (e) => {
    const value = e.target.value;

    if (!/^\d{0,6}$/.test(value)) {
      return;
    }

    setPincode(value);

    if (value.length > 0 && value.length < 6) {
      setPincodeError("Pin Code Must Be 6 Digits");
    } else {
      setPincodeError("");
    }

    setGeneralError("");
    setIsChangedError("");
  };

  const handleCity = (e) => {
    const inputValue = e.target.value;
    const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, "");
    setCity(lettersOnly);
    setCityError("");
    setGeneralError("");
    setIsChangedError("");
  };

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "20px";
      closeButton.style.height = "20px";
      closeButton.style.border = "1.5px solid #000000";
      closeButton.style.padding = "2px";
    }
  }, []);







  const nochangeRef = useRef(null)



  const handleCreatePayingGuest = () => {
    let hasError = false;
    let focused = false;
    dispatch({ type: 'CLEAR_NETWORK_ERROR' })

    setGeneralError("");
    setPgNameError("");
    setMobileError("");
    setCountryCodeError("");
    setEmailError("");
    setHouse_NoError("");
    setStreetError("");
    setCityError("");
    setLandmarkError("");
    setPincodeError("");
    setStateNameError("");
    setIsChangedError("");

    if (!pgName) {
      setPgNameError("Please Enter PG Name");
      if (!focused) {
        pgNameRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }

    if (!countryCode) {
      setCountryCodeError("Please Select Country Code");
      if (!focused) {
        countryCodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }

    if (!mobile) {
      setMobileError("Please Enter Mobile No");
      if (!focused) {
        mobileRef.current?.focus();
        focused = true;
      }
      hasError = true;
    } else if (!/^(?!0{10})[1-9][0-9]{9}$/.test(mobile)) {
      setMobileError("Please Enter Valid Mobile No");
      if (!focused) {
        mobileRef.current?.focus();
        focused = true;
      }
      hasError = true;
    } else {
      setMobileError("");
    }




    const pinString = String(pincode).trim();

    if (!pinString) {
      setPincodeError("Please Enter Pincode");
      if (!focused) {
        pincodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }
    else if (!/^\d+$/.test(pinString)) {
      setPincodeError("Pin Code Must Be Numeric");
      if (!focused) {
        pincodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }
    else if (pinString.length !== 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
      if (!focused) {
        pincodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }
    else if (pinString === "000000") {
      setPincodeError("Pin Code cannot be all zeros");
      if (!focused) {
        pincodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }
    else if (pinString[0] === "0") {
      setPincodeError("Pin Code cannot start with 0");
      if (!focused) {
        pincodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }
    else if (pinString.slice(-3) === "000") {
      setPincodeError("Last 3 digits cannot be 000");
      if (!focused) {
        pincodeRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }
    else {
      setPincodeError("");
    }


    if (!city) {
      setCityError("Please Enter City");
      if (!focused) {
        cityRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }



    if (!state_name) {
      setStateNameError("Please Select State");
      if (!focused) {
        stateNameRef.current?.focus();
        focused = true;
      }
      hasError = true;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("Please Enter Valid Email Id");
      if (!focused) {
        focused = true;
      }
      hasError = true;
    }

    if (
      !pgName &&
      !mobile &&
      !countryCode &&
      !house_no &&
      !street &&
      !landmark &&
      !city &&
      !pincode &&
      !state_name
    ) {
      setGeneralError("Please Fill In All The Required Fields");
      if (!focused) {
        pgNameRef.current?.focus();
        focused = true;
      }
      return;
    }

    if (hasError) return;


    const arraysAreEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].image !== arr2[i]?.image) return false;
      }
      return true;
    };

    const isChanged =
  String(pgName || "").trim() !== String(initialState.pgName || "").trim() ||
  Number(mobile || 0) !== Number(initialState.mobile || 0) ||
  String(email || "").trim() !== String(initialState.email || "").trim() ||
  String(house_no || "").trim() !== String(initialState.house_no || "").trim() ||
  String(street || "").trim() !== String(initialState.street || "").trim() ||
  String(landmark || "").trim() !== String(initialState.landmark || "").trim() ||
  String(city || "").trim() !== String(initialState.city || "").trim() ||
  String(pincode || "").trim() !== String(initialState.pincode || "").trim() ||
  String(state_name || "") !== String(initialState.state || "") ||
  file !== null ||
  images.some((img) => img?.isChanged === true);


  


    if (currentItem && !isChanged) {
      setIsChangedError("No Changes Detected");


      setTimeout(() => {
        if (nochangeRef.current) {
          nochangeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          nochangeRef.current.focus();
        }
      }, 100);

      return;
    } else {
      setIsChangedError("");
    }


    if (currentItem?.hostelId) {
      dispatch({
        type: "UPDATEPG",
        payload: {
          mainImage: file,
          hostelId: currentItem?.hostelId,
          additionalImages: [
            images[0]?.isChanged
              ? images[0].image
              : currentItem.image_list?.[0]?.image || null,
            images[1]?.isChanged
              ? images[1].image
              : currentItem.image_list?.[1]?.image || null,
            images[2]?.isChanged
              ? images[2].image
              : currentItem.image_list?.[2]?.image || null,
            images[3]?.isChanged
              ? images[3].image
              : currentItem.image_list?.[3]?.image || null,
          ].filter(Boolean),

          payloads: {
            hostelName: pgName,
            mobile: `${mobile}`,
            pincode: Number(pincode),
            city: city,
            state: state_name,
            emailId: email,
            houseNo: house_no,
            street: street,
            landmark: landmark,
          },
        },
      });
      setFormLoading(true)
    }
    else {
      console.log("callededed else")
      dispatch({
        type: "CREATEPG",
        payload: {
          mainImage: file,
          additionalImages: [
            images[0]?.isChanged
              ? images[0].image
              : currentItem.image_list?.[0]?.image || null,
            images[1]?.isChanged
              ? images[1].image
              : currentItem.image_list?.[1]?.image || null,
            images[2]?.isChanged
              ? images[2].image
              : currentItem.image_list?.[2]?.image || null,
            images[3]?.isChanged
              ? images[3].image
              : currentItem.image_list?.[3]?.image || null,
          ].filter(Boolean),

          payloads: {
            hostelName: pgName,
            mobile: `${mobile}`,
            pincode: Number(pincode),
            city: city,
            state: state_name,
            emailId: email,
            houseNo: house_no,
            street: street,
            landmark: landmark,
          },
        },
      });
      setFormLoading(true)
    }


  };


  useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);



  useEffect(() => {
    if (currentItem) {



      const initialData = {
        pgName: currentItem.name || "",
        mobile: currentItem.mobile,
        countryCode: countryCode,
        email: currentItem.emailId && currentItem.emailId !== "undefined" ? currentItem.emailId : "",
        house_no: currentItem.houseNo || "",
        street: currentItem.street || "",
        city: currentItem.city || "",
        pincode: currentItem.pincode || "",
        landmark: currentItem.landmark || "",
        state: currentItem.state || "",
        file: currentItem.mainImage ? currentItem.mainImage : null,
      };


      setPgName(initialData.pgName);
      setMobile(initialData.mobile);
      setEmail(initialData.email);
      setFile(initialData.file);
      setCountryCode(initialData.countryCode);
      setHouseNo(initialData.house_no);
      setStreet(initialData.street);
      setLandmark(initialData.landmark);
      setPincode(initialData.pincode);
      setCity(initialData.city);
      setStateName(initialData.state);


      const formattedImages = currentItem?.images?.map((img) => ({
        name:
          img.image !== "0" && typeof img.image === "string" ? img.name : "",
        image:
          img.image !== "0" && typeof img.image === "string" ? img.image : null,
      }));

      // setImages(
      //   formattedImages && formattedImages.length > 0
      //     ? formattedImages
      //     : Array(4).fill({ image: null, isChanged: false})
      // );

      // formattedImages = API response images array

const maxSlots = 4;

const finalImages = Array(maxSlots)
  .fill(null)
  .map((_, i) => ({
    image: formattedImages[i]?.image || null,
    isChanged: false,
}));

setImages(finalImages);

      setInitialState({
        ...initialData,
        imageUrls: formattedImages,
      });
    }
  }, [currentItem]);





  const handleFileChange = (index) => async (e) => {
    setIsChangedError("");
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          try {
            const compressedBlob = await imageCompression(file, options);

            return new File([compressedBlob], file.name, {
              type: compressedBlob.type,
              lastModified: Date.now(),
            });
          } catch (error) {
            console.error("Image compression error:", error);
            return null;
          }
        })
      );

      setImages((prevImages) => {
        const updatedImages = [...prevImages];

        compressedFiles.forEach((compressedFile, i) => {
          if (compressedFile) {
            const currentIndex = index + i;

            updatedImages[currentIndex] = {
              name: `image${currentIndex + 1}`,
              image: compressedFile,
              isChanged: true,
            };
          }
        });

        return updatedImages;
      });
    }
  };




  const handleMouseEnter = (index) => {
    setDisplayLayer(index);
  };

  const handleMouseLeave = () => {
    setDisplayLayer(null);
  };

  const handleDeleteImages = (ImageName, index) => {
    const imageObj = images[index];

    if (currentItem.id && imageObj?.isChanged !== true && ImageName) {
      dispatch({
        type: "DELETEHOSTELIMAGES",
        payload: {
          hostel_id: currentItem.id,
          image_name: ImageName,
        },
      });
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = { image: null };
      return updatedImages;
    });
  };


  useEffect(() => {
    if (state.PgList.createPgStatusCode === 201 || state.PgList.updatePgStatusCode === 200) {
      setFormLoading(false)
    }
  }, [state.PgList.createPgStatusCode, state.PgList.updatePgStatusCode])


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
    }

  }, [state.createAccount?.networkError])

  console.log("state.PgList.updatePgStatusCode", state.PgList.updatePgStatusCode)

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title
            style={{
              fontSize: 18,
              color: "#222222",
              fontFamily: "Gilroy",
              fontWeight: 600,
            }}
          >
            {currentItem ? "Edit Paying Guest" : "Add Paying Guest"}
          </Modal.Title>
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        {generalError && (
          <ErrorMessage message={generalError} type="error" />
        )}


        <Modal.Body style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll mt-1 me-3">




          <div className="d-flex align-items-center">
            <div
              className=""
              style={{ height: 100, width: 100, position: "relative" }}
            >
              <Image
                src={
                  file
                    ? typeof file === "string"
                      ? file
                      : URL.createObjectURL(file)
                    : Profile2
                }
                roundedCircle
                style={{ height: 100, width: 100 }}
              />
              <label htmlFor="imageInput" className="">
                <Image
                  src={Plus}
                  roundedCircle
                  style={{
                    height: 20,
                    width: 20,
                    position: "absolute",
                    top: 90,
                    left: 80,
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  id="imageInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="ps-3">
              <div>
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#222222",
                    fontFamily: "Gilroy",
                  }}
                >
                  Image
                </label>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                  }}
                >
                  Max size of image 10MB
                </label>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Paying Guest Name {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={pgName}
                  onChange={handlePgNameChange}
                  type="text"
                  ref={pgNameRef}
                  placeholder="Enter PG Name"
                  style={{
                    fontSize: 16,
                    color: pgName ? "#4B4B4B" : "#9AA0A6",
                    opacity: pgName ? 1 : 0.7,
                    fontWeight: pgName ? 600 : 500,
                    fontFamily: "Gilroy",
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>

              {pgNameError && (
                <ErrorMessage message={pgNameError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Mobile No{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>

                <InputGroup>
                  <Form.Select
                    value={countryCode}
                    ref={countryCodeRef}
                    id="vendor-select-pg"
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: "8px 0 0 8px",
                      height: 50,
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: countryCode ? 600 : 500,
                      boxShadow: "none",
                      backgroundColor: "#fff",
                      maxWidth: 90,
                    }}
                  >
                    <option>+{countryCode}</option>
                  </Form.Select>
                  <Form.Control
                    value={mobile}
                    ref={mobileRef}
                    onChange={handleMobileChange}
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: mobile ? 600 : 500,
                      boxShadow: "none",
                      borderLeft: "unset",
                      borderRight: "1px solid #D9D9D9",
                      borderTop: "1px solid #D9D9D9",
                      borderBottom: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: "0 8px 8px 0",
                    }}
                  />
                </InputGroup>
              </Form.Group>

              {countryCodeError && (
                <ErrorMessage message={countryCodeError} type="error" />
              )}

              {mobileError && (
                <ErrorMessage message={mobileError} type="error" />

              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    marginTop: "8px",
                    marginBottom: "9px",
                  }}
                >
                  Email ID

                </Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter Email ID"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: email ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>

              {emailError && (
                <ErrorMessage message={emailError} type="error" />

              )}
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Flat , House no , Building , Company , Apartment{" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter House No"
                  value={house_no}
                  onChange={(e) => handleHouseNo(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: house_no ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>
              {house_noError && (
                <ErrorMessage message={house_noError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="mb-1">
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
                  onChange={(e) => handleStreetName(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: street ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>
              {streetError && (
                <ErrorMessage message={streetError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Landmark{" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="E.g , near appollo hospital"
                  value={landmark}
                  onChange={(e) => handleLandmark(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: landmark ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>
              {landmarkError && (
                <ErrorMessage message={landmarkError} type="error" />
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                  Pincode{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={pincode}
                  ref={pincodeRef}
                  onChange={(e) => handlePinCodeChange(e)}
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
                {pincodeError && (
                  <ErrorMessage message={pincodeError} type="error" />

                )}
              </Form.Group>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Town/City{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter City"
                  value={city}
                  ref={cityRef}
                  onChange={(e) => handleCity(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: city ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>
              {cityError && (
                <ErrorMessage message={cityError} type="error" />
              )}
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <Select
                  options={indianStates}
                  ref={stateNameRef}
                  onChange={(selectedOption) => {
                    setStateName(selectedOption?.value);
                    setStateNameError("");
                    setIsChangedError("");
                  }}
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
                  value={
                    state_name ? { value: state_name, label: state_name } : null
                  }
                  placeholder="Select State"
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  noOptionsMessage={() => "No state available"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "50px",
                      border: "1px solid #D9D9D9",
                      borderRadius: "8px",
                      fontSize: "16px",
                      color: state_name ? "#4B4B4B" : "9AA0A6",
                      fontFamily: "Gilroy",
                      fontWeight: state_name ? 600 : 500,
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
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9AA0A6",
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
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      color: "#000",
                    }),
                  }}
                />
                {state_nameError && (
                  <ErrorMessage message={state_nameError} type="error" />
                )}
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <Form.Label
              style={{
                fontSize: 14,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              Images{" "}
            </Form.Label>

            {images.map((img, index) => {
              const imageSrc = img?.image;

              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-3 col-sm-12 col-xs-12 no-height-override"
                >
                  <Card
                    style={{
                      border: img.image
                        ? "1px solid rgba(217, 217, 217, 0.5)"
                        : "1px solid #D9D9D9",
                      borderRadius: 8,
                      height: 120,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    className="m-0"
                  >
                    {imageSrc ? (
                      <div
                        style={{ position: "relative" }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image
                          className="img-fluid"
                          src={
                            imageSrc &&
                            (typeof imageSrc === "string"
                              ? imageSrc
                              : URL.createObjectURL(imageSrc))
                          }
                          alt={`currentItem-image-${index}`}
                          style={{
                            objectFit: imageSrc && "cover",
                            borderRadius: 5,
                            height: 120,
                            cursor: "pointer",
                          }}
                        />

                        {displayLayer === index && (
                          <div
                            style={{
                              borderRadius: 5,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              height: 120,
                              width: "100%",
                              transition: "opacity 0.3s ease-in-out",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 5,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                borderRadius: 100,
                                backgroundColor: "rgba(255, 255, 255, 0.5)",
                                padding: 5,
                                width: "100%",
                              }}
                            >
                              <label htmlFor={`imageUpload${index}`}>
                                <Gallery
                                  size="24"
                                  color="#FFF"
                                  variant="Bold"
                                  style={{ cursor: "pointer" }}
                                />
                              </label>
                              <div
                                style={{
                                  width: 2,
                                  backgroundColor: "#fff",
                                  height: "auto",
                                  border: "1px solid #fff",
                                }}
                              />
                              <Trash
                                size="24"
                                color="#FFF"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleDeleteImages(img.name, index);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <label htmlFor={`imageUpload${index}`}>
                          <AddCircle
                            size="24"
                            color="#1E45E1"
                            style={{ cursor: "pointer" }}
                          />
                        </label>
                        <label
                          style={{
                            fontSize: 13,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                          }}
                        >
                          Add image
                        </label>
                        <label
                          style={{
                            fontSize: 10,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Max size 10 MB
                        </label>
                      </>
                    )}
                  </Card>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange(index)}
                    style={{ display: "none" }}
                    id={`imageUpload${index}`}
                  />
                </div>
              );
            })}
          </div>


          {/* {
            state.createAccount?.networkError &&   <ErrorMessage message={state.createAccount?.networkError} type="error" />
          } */}

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
        <Modal.Footer
          className="d-flex align-items-center justify-content-center"
          style={{ border: "none" }}
        >
          {isChangedError && (
            <div ref={nochangeRef} className="d-flex align-items-center justify-content-center">
              <ErrorMessage message={isChangedError} type="error" />
            </div>
          )}





          <Button
            disabled={formLoading}
            onClick={handleCreatePayingGuest}
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
            {currentItem ? "Save Changes" : "Add Paying Guest"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
AddPg.propTypes = {
  currentItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};
export default AddPg;
