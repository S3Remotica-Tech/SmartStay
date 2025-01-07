import React, { useEffect, useState } from 'react';
// import './ContactUs.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { send } from 'emailjs-com';
// import Footer from './Footer';
// import NeedFooter from './Need_Footer';
import { Styles } from '../Styles/ContactUsStyles';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        send('service_12mjzrm', 'template_5i9w5vw', formData, 'k5FjQQAsBMk4I-pzB')
            .then((response) => {
                console.log('Email successfully sent:', response);
                setStatus('Message sent successfully!');
                setFormData({
                    name: '',
                    city: '',
                    email: '',
                    phone: '',
                    message: ''
                });
    
                
                setTimeout(() => {
                    setStatus('');
                }, 1000);
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                setStatus('Failed to send message. Please try again later.');
            });
    };
    
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
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div className="col-md-12 col-lg-6 col-sm-12  mb-3">
                                    <input
                                        type="email"
                                        className="form-control custom-input-height"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                               
                                <div className="col-md-12 col-lg-6 col-sm-12 mb-3">
                                    <input
                                        type="text"
                                        className="form-control custom-input-height"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Your phone"
                                    />
                                </div>
                                <div className="col-md-12 col-lg-6 col-sm-12  mb-3">
                                    <input
                                        type="text"
                                        className="form-control custom-input-height"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Your city"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <textarea
                                        className="form-control"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Your message"
                                    ></textarea>
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