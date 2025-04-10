/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup, Card } from "react-bootstrap";
import { MdError } from "react-icons/md";
import {CloseCircle,Trash,AddCircle,Gallery,} from "iconsax-react";
import PropTypes from "prop-types";

function AddPg({ show, handleClose, currentItem }) {

  
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [pgName, setPgName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  // const [errors, setErrors] = useState({});
  const [initialState, setInitialState] = useState({});
  const [displayLayer, setDisplayLayer] = useState(null);
  const [pgNameError, setPgNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [countryCode, setCountryCode] = useState("91");

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);
// const [formshow,setFormShow] = useState (false)

//   useEffect(()=> {
//     // setFormShow(true)
//     show=true;
//   },[pgformshow])

  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };


  const handleMobileChange = (e) => {
    const value = e.target.value;
  
    const pattern = /^\d*$/; // Only allow digits
  
    if (pattern.test(value)) {
      setMobile(value);
      setGeneralError("");
      setIsChangedError("");
  
      if (value === "") {
        setMobileError("Mobile Number is Required");
      } else if (value.length < 10) {
        setMobileError("Invalid Mobile Number");
      } else if (value.length === 10) {
        setMobileError(""); // Clear error when valid
      }
    } else {
      setMobileError("Invalid Mobile Number");
    }
  };
  
  // const handleMobileChange = (e) => {
  //   const value = e.target.value;

  //   const pattern = /^\d*$/;

  //   if (pattern.test(value)) {
  //     setMobile(value);
  //     setMobileError("");
  //     setGeneralError("");
  //     setIsChangedError("");

  //     // if (value.length === 10) {
  //     //   setErrors((prevErrors) => ({ ...prevErrors, mobile: "" }));
  //     // } else {
  //     //   setErrors((prevErrors) => ({
  //     //     ...prevErrors,
  //     //     mobile: "Invalid mobile number *",
  //     //   }));
  //     // }
  //   }
  // };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);
    setGeneralError("");
    setIsChangedError("");
  
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Invalid Email Id");
    } else {
      setEmailError("");
    }

    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   email: emailValue && !emailRegex.test(emailValue) ? "Invalid Email Id" : "",
    // }));
  };

  // const handleEmailChange = (e) => {
  //   const emailValue = e.target.value.toLowerCase();
  //   setEmail(emailValue);
  //   setGeneralError("");
  //   setIsChangedError("");
  //   setEmailError("");
  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
  //   const isValidEmail = emailRegex.test(emailValue);

  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     email: isValidEmail ? "" : "Invalid Email Id *",
  //   }));
  // };

  const handlePgNameChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setPgNameError("");
    setGeneralError("");
    setIsChangedError("");
    if (value === "") {
      setPgName(value);
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   pgName: "PG name cannot be empty or spaces only *",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setPgName(value);
      // setErrors((prevErrors) => ({ ...prevErrors, pgName: "" }));
    }
  };


  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setGeneralError("");
    setLocationError("");
    setIsChangedError("");
  };

  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  //   setGeneralError("");
  //   setCountryCodeError("");
  //   setIsChangedError("");
  // };

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

  const handleCreatePayingGuest = () => {
    let hasError = false;
  
    // Reset previous error messages
    setGeneralError("");
    setPgNameError("");
    setMobileError("");
    setCountryCodeError("");
    setLocationError("");
    setEmailError("");
    setIsChangedError("");
  
    // Required Field Validations
    if (!pgName) {
      setPgNameError("Please Enter PG Name");
      hasError = true;
    }
  
    if (!countryCode) {
      setCountryCodeError("Please Select Country Code");
      hasError = true;
    }
  
    if (!mobile) {
      setMobileError("Please Enter Mobile Number");
      hasError = true;
    }
  
    if (!location) {
      setLocationError("Please Enter Address");
      hasError = true;
    }
  
    // Email Format Validation
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("Enter a Valid Email ID");
      hasError = true;
    }
  
    // Mobile format check (10 digit validation, optional)
    if (mobile && mobile.length !== 10) {
      setMobileError("Please Enter Valid Mobile No");
      hasError = true;
    }
  
    if (!pgName && !mobile && !location && !countryCode) {
      setGeneralError("Please Fill In All The Required Fields");
      return;
    }
  
    // Stop execution if any validation fails
    if (hasError) return;
  
    // Check for changes
    const arraysAreEqual = (arr1, arr2) => {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].image !== arr2[i]?.image) return false;
      }
      return true;
    };
  
    const isChanged =
      pgName !== initialState.pgName ||
      Number(mobile) !== Number(initialState.mobile) ||
      email !== initialState.email ||
      location !== initialState.location ||
      file !== initialState.file ||
      countryCode !== initialState.countryCode ||
      !arraysAreEqual(images, initialState.imageUrls);
  
    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      return;
    }
  
    // Proceed with dispatch
    const MobileNumber = `${countryCode}${mobile}`;
  
    dispatch({
      type: "PGLIST",
      payload: {
        profile: file,
        name: pgName,
        phoneNo: MobileNumber,
        email_Id: email,
        location: location,
        id: currentItem.id,
        image1: images[0]?.isChanged ? images[0].image : currentItem.image_list?.[0]?.image || null,
        image2: images[1]?.isChanged ? images[1].image : currentItem.image_list?.[1]?.image || null,
        image3: images[2]?.isChanged ? images[2].image : currentItem.image_list?.[2]?.image || null,
        image4: images[3]?.isChanged ? images[3].image : currentItem.image_list?.[3]?.image || null,
      },
    });
  
    // Reset form
    setFile("");
    setPgName("");
    setMobile("");
    setEmail("");
    setLocation("");
  };
  
  const [hostel_Id,setHostel_Id] = useState("")
   useEffect(() => {
    setHostel_Id(state.login.selectedHostel_Id);
    }, [state?.login?.selectedHostel_Id]);
useEffect(() => {
    if (state.PgList.createPgStatusCode === 200) {
      dispatch({ type: "ALL_HOSTEL_DETAILS",payload:{hostel_id:hostel_Id} })
      dispatch({ type: "HOSTELIDDETAILS" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_PG_STATUS_CODE" });
      }, 4000);

      // setPgList({
      //   Name: "",
      //   phoneNumber: "",
      //   email_Id: "",
      //   location: "",
      // });
    }
  }, [state.PgList.createPgStatusCode,hostel_Id]);
  useEffect(() => {
    if (currentItem) {
      const phoneNumber = String(currentItem.hostel_PhoneNo || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);

      const initialData = {
        pgName: currentItem.Name || "",
        mobile: mobileNumber,
        countryCode: countryCode,
        email:
          currentItem.email_id && currentItem.email_id !== "undefined"
            ? currentItem.email_id
            : "",
        location: currentItem.Address,
        file:
          currentItem.profile &&
          typeof currentItem.profile === "string" &&
          currentItem.profile !== "0"
            ? currentItem.profile
            : null,
      };

      setPgName(initialData.pgName);
      setMobile(initialData.mobile);
      setEmail(initialData.email);
      setLocation(initialData.location);
      setFile(initialData.file);
      setCountryCode(initialData.countryCode);
      // const formattedImages = currentItem.image_list.map(img => {
      //           return { image: img.image !== '0' ? img : null };
      // });

      // setImages(formattedImages);

      const formattedImages = currentItem?.image_list?.map((img) => ({
        name:
          img.image !== "0" && typeof img.image === "string" ? img.name : "",
        image:
          img.image !== "0" && typeof img.image === "string" ? img.image : null,
      }));

      //     const formattedImages = Array.isArray(currentItem?.image_list) ?
      // currentItem.image_list.map(img => ({
      //   name: img.image !== '0' && typeof img.image === 'string' ? img.name : '',
      //   image: img.image !== '0' && typeof img.image === 'string' ? img.image : null
      // })) : [];

      setImages(formattedImages);
      setInitialState({ ...initialData, imageUrls: formattedImages });
    }
  }, [currentItem]);

  const [images, setImages] = useState(Array(4).fill({ image: null }));

 
  const handleFileChange = (index) => async (e) => {
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
            return await imageCompression(file, options);
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

  const handleDeleteImages = (ImageName) => {
    if (currentItem.id) {
      dispatch({
        type: "DELETEHOSTELIMAGES",
        payload: {
          hostel_id: currentItem.id,
          image_name: ImageName,
        },
      });
    }
  };

  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <Modal
        show={show }
        onHide={handleClose}
        centered
        backdrop="static"
        // className="custom-modal-width"
       
      >
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
          <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer' }}/>
        </Modal.Header>
        {generalError && (
          <div className="d-flex align-items-center p-1 mt-2 mb-2">
            <MdError style={{fontSize:"14px", color: "red", marginRight: "5px" }} />
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

       
        <Modal.Body>
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
                    cursor: "pointer"
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
              <Form.Group controlId="exampleForm.ControlInput1"
              >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Paying Guest Name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={pgName}
                  onChange={handlePgNameChange}
                  type="text"
                  placeholder="Enter PG Name"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: pgName ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>

              {pgNameError && (
                <div className="d-flex align-items-center p-1">
                  <MdError style={{ fontSize: "14px", color: "red", marginRight: "5px" }} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {pgNameError}
                  </label>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
              <Form.Group
               
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
                  Mobile No{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>

                <InputGroup>
                  <Form.Select
                    value={countryCode}
                    id="vendor-select-pg"
                    // onChange={handleCountryCodeChange}
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
                <div className="d-flex align-items-center p-1">
                  <MdError style={{fontSize: "14px", color: "red", marginRight: "5px" }} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {countryCodeError}
                  </label>
                </div>
              )}

              {mobileError && (
                <div className="d-flex align-items-center p-1">
                  <MdError style={{fontSize: "14px", color: "red", marginRight: "5px" ,marginBoTop:"1px"}} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {mobileError}
                  </label>
                </div>
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
              <Form.Group
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
                  Email ID{" "}
                  <span style={{ color: "white", fontSize: "20px" }}>*</span>
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
                <div className="d-flex align-items-center p-1">
                  <MdError style={{fontSize: "14px", color: "red", marginRight: "5px" }} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {emailError}
                  </label>
                </div>
              )}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
              <Form.Group
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
                  Address{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={location}
                  onChange={handleLocationChange}
                  type="text"
                  placeholder="Enter Address"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: location ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>

              {locationError && (
                <div className="d-flex align-items-center p-1">
                  <MdError style={{fontSize: "14px", color: "red", marginRight: "5px" }} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {locationError}
                  </label>
                </div>
              )}
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
              const imageSrc = img.image;

              return (
                <div
                  key={index}
                  className="col-lg-3 col-md-3 col-sm-12 col-xs-12"
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
                        {/* {imageSrc.endsWith('.svg') ? (
              <img
              className='img-fluid'
              src={imageSrc}
              alt={`currentItem-image-${index}`}
              style={{ borderRadius: 5, height: 120, cursor: "pointer" }}
            />
            ) : (
              <Image
                className='img-fluid'
                src={typeof imageSrc === 'string' ? imageSrc : URL.createObjectURL(imageSrc)}
                alt={`currentItem-image-${index}`}
                style={{ objectFit: "cover", borderRadius: 5, height: 120, cursor: "pointer" }}
              />
            )} */}

                        <Image
                          className="img-fluid"
                          // src={imageSrc}
                          // src={typeof imageSrc === 'string' ? imageSrc : undefined}
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
                                  handleDeleteImages(img.name);
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
                    // multiple
                    onChange={handleFileChange(index)}
                    style={{ display: "none" }}
                    id={`imageUpload${index}`}
                  />
                </div>
              );
            })}
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex align-items-center justify-content-center" style={{ border: "none" }}>
        {isChangedError && (
          <div className="d-flex align-items-center justify-content-center p-1 mt-2 mb-2">
            <MdError style={{fontSize:"14px",color: "red", marginRight: "5px" }} />
            <label
              className="mb-0"
              style={{
                color: "red",
                fontSize: "12px",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              {isChangedError}
            </label>
          </div>
        )}
          <Button
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
