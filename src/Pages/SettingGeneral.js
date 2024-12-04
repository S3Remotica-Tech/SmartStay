import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import img1 from "../Assets/Images/Ellipse 1.png";
import img2 from "../Assets/Images/New_images/settingeye.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Plus from "../Assets/Images/New_images/add-circle.png";
import "./Settings.css";

function SettingGeneral(){
const [showFormGeneral,setShowFormGeneral] = useState(false)
const [file, setFile] = useState(null);

const handleShowFormGreneral=()=>{
    setShowFormGeneral(true)
}
const handleClose=()=>{
    setShowFormGeneral(false)
}
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
    return(
        <>
            <div className="d-flex justify-content-between align-items-center settingGreneral  mb-3">
        <div style={{ padding: 15 }}>
          <label
            style={{
              fontSize: 18,
              color: "#000000",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            General
          </label>
        </div>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ paddingRight: 25 }}
        >
         

          <div>
            <Button
              style={{
                fontFamily: "Montserrat",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 8,
                width: 140,
                padding: "14px, 22px, 14px, 22px",
                border: "none",
                cursor: "pointer",
              }}
            //   disabled={ebAddPermission}
              onClick={handleShowFormGreneral}
            >
              + Create Master
            </Button>
          </div>
        </div>
      </div>




      <div class="container mt-4">
      <div class="card p-3 settingGreneral" style={{borderRadius:16}}>
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <img src={img1} alt="Profile" class="rounded-circle" style={{width:50,height:50}}/>
        <div class="ms-3">
          <p class="mb-0" style={{fontSize:16,fontWeight:600,fontFamily:"Gilroy",whiteSpace:"nowrap"}}>Rakul Singh</p>
        </div>
      </div>
      <div class="d-flex align-items-center">
  <img src={img2} width="20" height="20" alt="icon" />
  <p class="mb-0 mx-2" style={{fontFamily:"Montserrat",fontWeight:600,fontSize:14,color:"#1E45E1",cursor:"pointer"}}>Change Password</p>
  <img src={round} width="30" height="30" alt="icon" />
  {/* <PiDotsThreeOutlineVerticalFill width={20} height={20}/> */}
</div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-md-6">
        <p class="mb-1" style={{fontSize:12,fontFamily:"Gilroy",fontWeight:500,color:"#939393"}}>Email ID</p>
        <p  style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>priya@gmail.com</p>
      </div>
      <div class="col-md-6">
        <p class="mb-1" style={{fontSize:12,fontFamily:"Gilroy",fontWeight:500,color:"#939393"}}>Contact Number</p>
        <p  style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>+91 9876543210</p>
      </div>
      <div class="col-12">
        <p class="mb-1"style={{fontSize:12,fontFamily:"Gilroy",fontWeight:500,color:"#939393"}}>Address</p>
        <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>7/205,Kamarajnagar,Athisayapuram</p>
      </div>
    </div>
  </div>
  </div>
      


  <Modal
        show={showFormGeneral}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      >
        {/* <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header> */}

        <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
           {/* {props.edit ? "Edit Bank" : "Add Bank"} */} General
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
            style={{
              position: "absolute",
              right: "10px",
              top: "16px",
              border: "1px solid black",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "30px",
                paddingBottom: "6px",
              }}
            >
              &times;
            </span>
          </button>
        </Modal.Header>
        <div className="d-flex align-items-center" style={{marginLeft:10}}>
                    <div
                      className=""
                      style={{ height: 80, width: 80, position: "relative" }}
                    >
                      <Image
                        src={
                          file
                            ? typeof file == "string"
                              ? file
                              : URL.createObjectURL(file)
                            : Profile
                        }
                        roundedCircle
                        style={{ height: 80, width: 80 }}
                      />

                      <label htmlFor="imageInput" className="">
                        <Image
                          src={Plus}
                          roundedCircle
                          style={{
                            height: 20,
                            width: 20,
                            position: "absolute",
                            top: 65,
                            left: 70,
                            transform: "translate(-50%, -50%)",
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
                          Profile Photo
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
        <Modal.Body>
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter name"
                //   value={accountName}
                //   onChange={(e) => handleAccountName(e)}
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
              {/* {accountNameError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {accountNameError}
                  </div>
                )} */}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Last Name.{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter account no."
                //   value={accountNo}
                //   onChange={(e) => handleAccountNo(e)}
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
              {/* {accountNumberError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {accountNumberError}
                  </div>
                )} */}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Mobile number{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="9098787886"
                //   value={bankName}
                //   onChange={(e) => handleBankName(e)}
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
              {/* {bankNameError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {bankNameError}
                  </div>
                )} */}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Email ID{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Email address"
                //   value={ifscCode}
                //   onChange={(e) => handleIfscCode(e)}
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
              {/* {ifcsCodeError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {ifcsCodeError}
                  </div>
                )} */}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Address{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter address"
                //   value={description}
                //   onChange={(e) => handleDescription(e)}
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
              {/* {descriptionError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {descriptionError}
                  </div>
                )} */}
            </div>
          </div>
        </Modal.Body>
         {/* {error && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {error}
                  </div>
                )}  */}
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 20,
            }}
            // onClick={handleSubmitBank}
          >
            {/* {props.edit ? "save changes" : "Add Bank"} */}Add
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}
export default SettingGeneral;