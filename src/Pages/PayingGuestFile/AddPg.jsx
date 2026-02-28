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
  // const [hostel_Id, setHostel_Id] = useState("");
  const [formLoading, setFormLoading] = useState(false)
  // const errorRef = useRef(null);
  const pgNameRef = useRef(null);
  const countryCodeRef = useRef(null);
  const mobileRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateNameRef = useRef(null);

  const [images, setImages] = useState(Array(4).fill({ image: null }));




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


  useEffect(() => {
    if (pgNameRef.current) {
      pgNameRef.current.focus();
    }
  }, []);
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

    const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;

    if (regex.test(value)) {
      setHouseNo(value);
      setHouse_NoError("");
      setGeneralError("");
      setIsChangedError("");
    }
  };


  const handleStreetName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;

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
    const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;

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


    // const arraysAreEqual = (arr1, arr2) => {
    //   if (arr1.length !== arr2.length) return false;
    //   for (let i = 0; i < arr1.length; i++) {
    //     if (arr1[i].image !== arr2[i]?.image) return false;
    //   }
    //   return true;
    // };

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
          additionalImages: images
            .map((img, i) => {
              if (img.isChanged) {
                return img.image;
              }
              return currentItem.images?.[i]?.image || null;
            })
            .filter(Boolean),

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

      dispatch({
        type: "CREATEPG",
        payload: {
          mainImage: file,
          additionalImages: [
            images[0]?.isChanged
              ? images[0].image
              : currentItem.images?.[0]?.image || null,
            images[1]?.isChanged
              ? images[1].image
              : currentItem.images?.[1]?.image || null,
            images[2]?.isChanged
              ? images[2].image
              : currentItem.images?.[2]?.image || null,
            images[3]?.isChanged
              ? images[3].image
              : currentItem.images?.[3]?.image || null,
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


  // useEffect(() => {
  //   setHostel_Id(state.login.selectedHostel_Id);
  // }, [state?.login?.selectedHostel_Id]);



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

  const handleDeleteImages = (
    // ImageName, 
    index) => {
    // const imageObj = images[index];

    // if (currentItem.id && imageObj?.isChanged !== true && ImageName) {
    //   dispatch({
    //     type: "DELETEHOSTELIMAGES",
    //     payload: {
    //       hostel_id: currentItem.id,
    //       image_name: ImageName,
    //     },
    //   });
    // }

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = {
        image: null,
        isChanged: true,
      };
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



  return (
    <div className="modal show block static">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Modal.Title className="!text-gray-900 !font-semibold !text-lg !font-gilroy">
            {currentItem ? "Edit Paying Guest" : "Add Paying Guest"}
          </Modal.Title>
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </Modal.Header>
        {generalError && (
          <ErrorMessage message={generalError} type="error" />
        )}

        <Modal.Body className="show-scroll mt-1 mr-3 max-h-96 overflow-y-scroll">
          <div className="flex items-center">
            <div className="h-24 w-24 relative">
              <Image
                src={
                  file
                    ? typeof file === "string"
                      ? file
                      : URL.createObjectURL(file)
                    : Profile2
                }
                roundedCircle
                className="h-24 w-24"
              />
              <label htmlFor="imageInput">
                <Image
                  src={Plus}
                  roundedCircle
                  className="h-5 w-5 absolute top-[85px] left-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  id="imageInput"
                  onChange={handleImageChange}
                  className="hidden sr-only"
                />
              </label>
            </div>

            <div className="pl-4">
              <div>
                <label className="text-base font-medium text-gray-900 font-gilroy">
                  Image
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 font-gilroy">
                  Max size of image 10MB
                </label>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-0 mt-4">
            <div className="col-span-12 mb-2">
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

            <div className="col-span-12 md:col-span-6 lg:col-span-6 mb-2">
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

            <div className="col-span-12 md:col-span-6 lg:col-span-6 mb-2">
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

            <div className="col-span-12 mb-1">
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

            <div className="col-span-12 md:col-span-6 lg:col-span-6 mb-1">
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

            <div className="col-span-12 md:col-span-6 lg:col-span-6 mb-1">
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
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
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

            <div className="col-span-12 md:col-span-6 lg:col-span-6 mb-1">
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

            <div className="col-span-12 ">
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

          <div className="grid grid-cols-12 gap-x-3">
            <Form.Label className="text-sm text-gray-900 font-medium font-gilroy col-span-12 mb-0" >
              Images{" "}
            </Form.Label>

            {images.map((img, index) => {
              const imageSrc = img?.image;

              return (
                <div
                  key={index}
                  className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-3 no-height-override"
                >
                  <div
                    className={`flex flex-col justify-center items-center cursor-pointer p-0 rounded-md h-32 m-0
    ${img.image ? "border border-gray-300/50" : "border border-gray-300"}`}
                  >
                    {imageSrc ? (
                      <div className="relative"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image
                          className="object-cover rounded-md h-32 cursor-pointer w-full"
                          src={
                            imageSrc &&
                            (typeof imageSrc === "string"
                              ? imageSrc
                              : URL.createObjectURL(imageSrc))
                          }
                          alt={`currentItem-image-${index}`}

                        />

                        {displayLayer === index && (
                          <div className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-md flex items-center justify-center p-1 transition-opacity duration-300 ease-in-out"
                          >
                            <div className="flex justify-between w-full rounded-full bg-white/50 p-1">
                              <label htmlFor={`imageUpload${index}`}>
                                <Gallery
                                  size="24"
                                  color="#FFF"
                                  variant="Bold"
                                  className="cursor-pointer"
                                />
                              </label>
                              <div className="w-[2px] bg-white border border-white"

                              />
                              <Trash
                                size="24"
                                color="#FFF"
                                className="cursor-pointer"
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
                            className="cursor-pointer"
                          />
                        </label>
                        <label className="text-sm text-gray-900 font-semibold font-gilroy">
                          Add image
                        </label>
                        <label className="text-[10px] text-gray-900 font-medium font-gilroy">
                          Max size 10 MB
                        </label>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange(index)}
                    className="hidden"
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

        {formLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 border-t-4 border-r-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <Modal.Footer
          className="flex items-center justify-center !border-t-0"
        >
          {isChangedError && (
            <div ref={nochangeRef} className="w-full flex justify-center text-center">
              <ErrorMessage message={isChangedError} type="error" />
            </div>
          )}

          <Button
            disabled={formLoading}
            onClick={handleCreatePayingGuest}
            className="w-100 !bg-[#1E45E1] !font-semibold !rounded-lg !text-base !font-gilroy h-12">
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
