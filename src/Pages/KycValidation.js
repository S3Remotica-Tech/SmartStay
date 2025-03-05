import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch} from 'react-redux';
import Loginimage from '../Assets/Images/New_images/KYC.png';
import Logo from '../Assets/Images/New_images/Group.png';
import { Eye, EyeSlash } from 'iconsax-react';

const MyComponent = () => {

    const dispatch = useDispatch()
    const [showPassword, setShowpassword] = useState(false)
    const [aadhaarNo, setAadhaarNo] = useState('');
    const [otp, setOtp] = useState('')

    const togglePasswordVisibility = () => {
        setShowpassword(!showPassword);
    };




    const handleValidate = () => {
        // dispatch({ type: 'KYCVALIDATE', payload: {aadhar_number:'', user_id:''} })
        // KYCVALIDATEOTPVERIFY
        dispatch({ type: 'KYCVALIDATEOTPVERIFY', payload: {aadhar_number:aadhaarNo, user_id:'', otp:otp, ref_id:''} })
    }



    return (

        <div className='container login_page1 h-100'>
            <div className='row h-100 align-items-center p-3 mt-md-4 pt-md-4 w-100'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div className="d-flex gap-1 mb-1">

                        <img src={Logo} alt='logo' style={{ height: 25, width: 25 }} />
                        <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy" }}>Smartstay</label></div>
                    </div>
                    <div className='mb-3 mt-3' >
                        <h1 style={{ fontFamily: "Gilroy", fontWeight: 600, color: 'rgba(34, 34, 34, 1)', fontSize: '32px' }}>Validate your KYC</h1>
                    </div>
                    <div>
                        <p className='p_font'>Enter your Aadhaar card to validate your KYC details</p>
                    </div>
                    <div className='mt-3'>
                        <Form className="Form p-0">

                            <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Aadhaar card no.</Form.Label>
                            <Form.Control
                                placeholder="1234 5678 9101"
                                aria-label="Recipient's username"
                                className=' mb-3'
                                aria-describedby="basic-addon2"
                                style={{ boxShadow: "none", border: "1px solid rgba(217, 217, 217, 1)", fontSize: 16, fontWeight: 500, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
                                autoFocus
                                size="lg"
                                value={aadhaarNo}
                                onChange={(e) => { setAadhaarNo(e.target.value) }}
                            />


                            <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Enter OTP</Form.Label>
                            <InputGroup className='mb-2'>
                                <Form.Control
                                    size="lg"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter otp"
                                    style={{
                                        position: "relative",
                                        boxShadow: "none",
                                        border: "1px solid rgba(217, 217, 217, 1)",
                                        fontSize: 16,
                                        fontWeight: 500,
                                        color: "rgba(34, 34, 34, 1)",
                                        fontFamily: "Gilroy",
                                        borderRight: "none"
                                    }}
                                    value={otp}
                                    onChange={(e) => { setOtp(e.target.value) }}
                                />
                                <InputGroup.Text onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(217, 217, 217, 1)", cursor: "pointer", borderLeft: "none" }}>
                                    {showPassword ? (
                                        <Eye size="20" color="rgba(30, 69, 225, 1)" />
                                    ) : (

                                        <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                                    )}
                                </InputGroup.Text>

                            </InputGroup>






                        </Form>
                        <div className=' d-flex mt-3 mb-3 gap-1 justify-content-end'>
                            <span className="create-account-hover" style={{ color: 'rgba(30, 69, 225, 1)', fontWeight: 600, fontSize: '16px', fontFamily: 'Montserrat', cursor: "pointer" }} >Resend Otp</span>
                        </div>
                        <div className="d-flex justify-content-center pt-2">
                            <Button onClick={handleValidate} type="button" className="btn w-100" style={{ height: '42px', fontWeight: 600, fontSize: "16px", borderRadius: '10px', backgroundColor: "rgba(30, 69, 225, 1)", color: "rgba(255, 255, 255, 1)", fontFamily: "Montserrat" }} >
                                Validate KYC
                            </Button>

                        </div>

                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12 mt-md-3'>
                    <div className='image_div mt-2'>
                        <img src={Loginimage} className='responsive-image' alt='Hai' />
                    </div>
                </div>


            </div>



        </div>


    );
};

export default MyComponent;

