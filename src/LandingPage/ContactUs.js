import React, { useEffect, useState } from 'react';
// import './ContactUs.css';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { send } from 'emailjs-com';
import { MdError } from "react-icons/md";
// import Footer from './Footer';
// import NeedFooter from './Need_Footer';
import { Styles } from '../Styles/ContactUsStyles';

function ContactUs() {
 

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        user_name: '',
        user_city: '',
        user_phone: '',
        message: '' , 
        site_name:'smartstay',
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'user_phone') {
            if (!/^\d*$/.test(value)) return; 
            if (value.length > 10) return;    
        }
    
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };


    const validateForm = () => {
        let newErrors = {};
        if (!formData.user_name.trim()) newErrors.user_name = 'Name is required';
        if (!formData.user_city.trim()) newErrors.user_city = 'City is required';
        if (!formData.user_phone.trim()) newErrors.user_phone = 'Phone number is required';
        if (!formData.message.trim()) newErrors.message = 'Course Select required';

       

        if (formData.user_phone.length !== 10) {
            newErrors.user_phone = 'Phone number must be exactly 10 digits';
        }

        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
    
        const dataToSend = {
            ...formData, 
            site_name: formData.site_name || 'smartstay' 
        };
    
      
    
        if (dataToSend.user_name && dataToSend.user_phone && dataToSend.user_city && dataToSend.message && dataToSend.site_name) {
            try {
                const response = await axios.post('https://marketingapi.s3remotica.com/api/user/add_lead', dataToSend);
                
    
                await send('service_ael05nx', 'template_3dnr1i6', {
                    name: dataToSend.user_name,
                    email: dataToSend.email,
                    phone: dataToSend.user_phone,
                    city: dataToSend.user_city,
                    message: dataToSend.message
                }, 'xM8OCsWJd_Fz844uW');
                
               
    
                setStatus('Message sent successfully!');
                setFormData({
                    user_name: '',
                    user_city: '',
                    user_phone: '',
                    message: '',
                    site_name: 'smartstay', 
                });
    
                setTimeout(() => {
                    setStatus('');
                }, 1000);
            } catch (error) {
                setStatus('Failed to send message. Please try again later.');
            }
        }
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formErrors = validateForm();
    //     if (Object.keys(formErrors).length > 0) {
    //         setErrors(formErrors);
    //         return;
    //     }

    //     if (formData.user_name  && formData.user_phone && formData.user_city && formData.message) {
    //         try {
    //             const response = await axios.post('https://marketingapi.s3remotica.com/api/user/add_lead', formData);
    //             console.log('API response:', response.data);

    //             await send('service_ael05nx', 'template_3dnr1i6', formData, 'xM8OCsWJd_Fz844uW');
    //             console.log('Email successfully sent');

    //             setStatus('Message sent successfully!');
    //             setFormData({
    //                 user_name: '',
    //                 user_city: '',
    //                 user_phone: '',
    //                 message: '' , 
    //                 // site_name:'',
    //             });

    //             setTimeout(() => {
    //                 setStatus('');
    //             }, 1000);
    //         } catch (error) {
    //             console.error('Error:', error);
    //             setStatus('Failed to send message. Please try again later.');
    //         }
    //     }
    // };
    
    return (
        <div>
            <div className="container">
                <div className="row g-4 justify-content-center" style={{ paddingTop: "50px", gap: "24px" }}>
                    {/* Contact Details Section */}
                    <div className="col-lg-5 col-md-12 col-sm-12" style={{ border: "1px solid #E2E2E2", borderRadius: "20px",
                         padding: "30px" }}>
                        <h3 style={{
                            fontWeight: Styles.FontBold,
                            fontFamily: Styles.fontFamilyMontserrat,
                            fontSize: Styles.Font26
                        }}>
                            Our Contacts & Location
                        </h3>
                        <h5 style={{
                            fontSize: Styles.Font15,
                            fontWeight: Styles.FontMedium,
                            color: "#141414",
                            paddingTop: "5px",
                            fontFamily: Styles.fontFamilyRoboto
                        }}>You Can Find Us At The Following Location</h5>
                        <div style={{ paddingTop: "30px" }}>
                            <p style={{
                                fontWeight: Styles.FontBold,
                                fontFamily: Styles.fontFamilyMontserrat,
                                fontSize: Styles.Font18,
                                color: "#141414"
                            }}>Head Office Address:</p>
                            <p style={{
                                fontWeight: Styles.FontMedium,
                                fontFamily: Styles.fontFamilyMontserrat,
                                fontSize: Styles.Font14,
                                color: "#888"
                            }}>7/96, North Street, Athisayapuram, VK Pudur (PO) Tenkasi – 627861</p>
                        </div>
                        <div style={{ paddingTop: "30px" }}>
                            <p style={{
                                fontWeight: Styles.FontBold,
                                fontFamily: Styles.fontFamilyMontserrat,
                                fontSize: Styles.Font18,
                                color: "#141414"
                            }}>Chennai Address:</p>
                            <p style={{
                                fontWeight: Styles.FontMedium,
                                fontFamily: Styles.fontFamilyMontserrat,
                                fontSize: Styles.Font14,
                                color: "#888"
                            }}> 1B, Block 1, Neelkamal Apartment, Kazhipattur, Chennai - 603103</p>
                        </div>
                        <div style={{ paddingTop: "30px" }}>
                            <p style={{
                                fontWeight: Styles.FontBold,
                                fontFamily: Styles.fontFamilyMontserrat,
                                fontSize: Styles.Font18,
                                color: "#141414"
                            }}>Contact Info</p>
                            <ul className="contact-info" style={{
                                fontWeight: Styles.FontMedium,
                                fontFamily: Styles.fontFamilyMontserrat,
                                fontSize: Styles.Font14,
                                color: "#888"
                            }}>
                                <li>support@s3remotica.com</li>
                                <li>+91 8344715078</li>
                                <li>+91 6382064159</li>
                            </ul>
                        </div>
                    </div>

                    {/* Get in Touch Section */}
                    <div className="col-lg-6 col-md-12 col-sm-12" style={{ border: "1px solid #E2E2E2", borderRadius: "20px", padding: "30px" }}>
                        <h3 style={{ fontWeight: Styles.FontBold, fontFamily: Styles.fontFamilyMontserrat, fontSize: Styles.Font25 }}>
                            Get in Touch
                        </h3>
                        <p style={{
                            fontSize: Styles.Font15,
                            fontWeight: Styles.FontMedium,
                            fontFamily: Styles.fontFamilyRoboto,
                            color: "#141414",
                            paddingTop: "5px"
                        }}>Give us your contact details, and we will reach out to you as soon as possible!</p>
                        {status && <div className="alert alert-info">{status}</div>}
                        <form
                         onSubmit={handleSubmit} 
                         style={{ paddingTop: "10px" }}>
                            <div className="row mb-3">
                                 <div className="col-md-12 col-lg-6 col-sm-12   mb-3">
                                 <input
                                        type="text"
                                        className="form-control custom-input-height"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                    />
                                       {errors.user_name && (
                    <div className="d-flex align-items-center  mb-2">
                      <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {errors.user_name}
                      </label>
                    </div>
                  )}
                                  
                                </div>
                                <div className="col-md-12 col-lg-6 col-sm-12  mb-3">
                                <input
                                        type="text"
                                        className="form-control custom-input-height"
                                        name="user_phone"
                                        value={formData.user_phone}
                                        onChange={handleChange}
                                        placeholder="Your phone"
                                    />
                                       {errors.user_phone && (
                    <div className="d-flex align-items-center  mb-2">
                      <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {errors.user_phone}
                      </label>
                    </div>
                  )}
                                   
                                </div>
                            </div>

                         

                            <div className="row mb-3">
                            <div className="col-md-12 col-lg-6 col-sm-12  mb-3">
                                    <input
                                        type="text"
                                        className="form-control custom-input-height"
                                        name="user_city"
                                        value={formData.user_city}
                                        onChange={handleChange}
                                        placeholder="Your city"
                                    />
                                       {errors.user_city && (
                    <div className="d-flex align-items-center  mb-2">
                      <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {errors.user_city}
                      </label>
                    </div>
                  )}
                                </div>

                            <div className="col-md-12 col-lg-6 col-sm-12">
                                  

                                  <Form.Group className="" controlId="exampleForm.ControlInput5">
  
  <Form.Select 
    aria-label="Default select example" 
    name="message"
    value={formData.message}
    onChange={handleChange} 
     className="w-full p-2 border rounded"
    style={{ 
      fontSize: 16, 
      color: "#4B4B4B", 
    //   fontFamily: "Gilroy", 
      lineHeight: '18.83px', 
      fontWeight: 500, 
      boxShadow: "none", 
      border: "1px solid #D9D9D9", 
      height: 39, 
      borderRadius: 8 ,
      backgroundColor: "white"
    }}>
      <option value=''>Select Course</option>
      <option value='Frontend'>Frontend</option>
      <option value='Backend'>Backend</option>
      <option value='Full stack Development'>Full stack Development</option>
     
     
  </Form.Select>
   {errors.message && (
                    <div className="d-flex align-items-center  mb-2">
                      <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {errors.message}
                      </label>
                    </div>
                  )}
  
  </Form.Group>
                                  </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className=" w-100"
                                        style={{ marginTop: "20px", backgroundColor:"#1E45E1", padding:"15px 20px", color:"white", fontFamily:"Gilroy", borderRadius:8, border:"1px solid #1E45E1" }}
                                    >
                                        Submit Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ContactUs;