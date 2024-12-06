import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { InputGroup, FormControl } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { MdError } from "react-icons/md";
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import eye from '../../Assets/Images/login-password.png'
import eyeClosed from '../../Assets/Images/pngaaa.com-6514750.png';



function User({ show, handleClose }) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState('')


  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');
  const [roleError, setRoleError] = useState('');
 
  const [passwordError, setPasswordError] = useState("")



  // ///// function //////////////
  const handleNameChange = (e) => {
    setName(e.target.value)
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  dispatch({ type: "CLEAR_EMAIL_ID_ERROR" });
  ;
  const handleMobileChange = (e) => {
    setMobile(e.target.value)
    dispatch({ type: "CLEAR_PHONE_NUM_ERROR" });
  };
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value)
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }
    ;
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  };

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }


  const handleSubmit = () => {
    alert('called')
    let isValid = true;

    setNameError('');
    setEmailError('');
    setMobileError('');
    setCountryCodeError('');
    setRoleError('');
   


    if (!name) {
      setNameError('Please enter name');
      isValid = false;
    }
    if (!email) {
      setEmailError('Please enter email');
      isValid = false;
    }
    if (!countryCode) {
      setCountryCodeError('Please select country code');
      isValid = false;
    }
    if (!mobile) {
      setMobileError('Please enter mobile number');
      isValid = false;
    }
    if (!role) {
      setRoleError('Please select a role');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Please enter a password');
      isValid = false;
    }




    if (isValid) {
      dispatch({
        type: "ADDSTAFFUSER",
        payload: {
          user_name: name,
          phone: mobile,
          email_id: email,
          password: password, 
          role_id: role,
          description: description,
        },
      });
    }
  };


  // ////////// UseEffect


  useEffect(() => {
    dispatch({ type: 'SETTING_ROLE_LIST' })
    dispatch({ type: "COUNTRYLIST" });
  }, [])





  return (
    <div
      className="modal show"
      style={{
        display: 'block', position: 'initial'
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Add User</Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose} />

          </Modal.Header>

          <Modal.Body>


            <div className='row mt-2'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Name<span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <Form.Control
                    value={name}
                    onChange={handleNameChange}
                    type="text" placeholder="Enter Name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>
                {nameError && <p style={{ color: "red", fontSize: 12 }}>{nameError}</p>}
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Email <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <Form.Control
                    value={email}
                    onChange={handleEmailChange}
                    type="text" placeholder="Enter email" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>
                {emailError && <p style={{ color: "red", fontSize: 12 }}>{emailError}</p>}

{state.Settings.emailIdError && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {state.Settings.emailIdError}
      </label>
    </div>
  )}


              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,

                    }}
                  >
                    Mobile{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>
                      {" "}
                      *{" "}
                    </span>
                  </Form.Label>

                  <InputGroup>
                    <Form.Select
                      value={countryCode}
                      onChange={handleCountryCodeChange}
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
                        paddingRight: 10,
                      }}
                    >
                      {state.UsersList?.countrycode?.country_codes?.map(
                        (item) => {
                          return (
                            console.log(
                              "item.country_flag",
                              item.country_flag
                            ),
                            (
                              <>
                                <option value={item.country_code}>
                                  +{item.country_code}
                                </option>
                              </>
                            )
                          );
                        }
                      )}
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
                  <p
                    id="MobileNumberError"
                    style={{ color: "red", fontSize: 11, marginTop: 5 }}
                  ></p>
                </Form.Group>

                {mobileError && <p style={{ color: "red", fontSize: 12 }}>{mobileError}</p>}
                {countryCodeError && <p style={{ color: "red", fontSize: 12 }}>{countryCodeError}</p>}

                {state.Settings.phoneNumError && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {state.Settings.phoneNumError}
      </label>
    </div>
  )}




              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Password <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <InputGroup>
                    <FormControl
                      id="form-controls"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handlePassword(e)}
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        borderRight: "none",
                        height: "50px",
                        borderRadius: "8px 0 0 8px",
                      }}
                    />
                    <InputGroup.Text
                      className="border-start-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide Password" : "Show Password"}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #D9D9D9",
                        borderLeft: "none",
                        cursor: "pointer",
                        borderRadius: "0 8px 8px 0",
                      }}
                    >
                      {showPassword ? (
                        <img src={eye} alt="Hide Password" width={20} height={20} />
                      ) : (
                        <img src={eyeClosed} alt="Show Password" width={20} height={20} />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {passwordError && <p style={{ color: "red", fontSize: 12 }}>{passwordError}</p>}
              </div>




              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Role <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="border"
                    style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", ineHeight: "18.83px", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                    value={role}
                    onChange={handleRoleChange}
                  >
                    <option value="">Select a Role</option>
                    {state.Settings?.getsettingRoleList?.response?.roles?.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.role_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
    {roleError && <p style={{ color: "red", fontSize: 12 }}>{roleError}</p>}
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Description <span style={{ color: 'white', fontSize: '20px' }}>*</span></Form.Label>
                  <Form.Control
                    value={description}
                    onChange={handleDescriptionChange}
                    type="text" placeholder="Enter Description" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>




            </div>

          </Modal.Body>


          <Modal.Footer style={{ border: "none" }}>

            <Button
              onClick={handleSubmit}
              className='w-100' style={{cursor:"pointer", backgroundColor: "#1E45E1", fontWeight: 600, padding: 12, borderRadius: 8, fontSize: 16, fontFamily: "Gilroy" }}>
              Create User
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}

export default User