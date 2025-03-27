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
import { fontSize } from '@mui/system';
import TopLeftCurve from "../Assets/Images/landingpageimages/topleftcurve.png";
import Email from "../Assets/Images/landingpageimages/message.png";
import Location from "../Assets/Images/landingpageimages/Location.png";
import Call from "../Assets/Images/landingpageimages/call.png";
import { message } from 'antd';

function Contact () {
 

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
        if (!formData.user_name.trim()) newErrors.user_name = 'Name is Required';
        if (!formData.user_city.trim()) newErrors.user_city = 'City is Required';
        if (!formData.user_phone.trim()) newErrors.user_phone = 'Phone Number is Required';
        if (!formData.message.trim()) newErrors.message = 'Course Select Required';

       

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

        if (formData.user_name  && formData.user_phone && formData.user_city && formData.message) {
            try {
                const response = await axios.post('https://marketingapi.s3remotica.com/api/user/add_lead', formData);
                console.log('API response:', response.data);

                await send('service_ael05nx', 'template_3dnr1i6', formData, 'xM8OCsWJd_Fz844uW');
                console.log('Email successfully sent');

                setStatus('Message sent successfully!');
                setFormData({
                    user_name: '',
                    user_city: '',
                    user_phone: '',
                    message: '' , 
                    // site_name:'',
                });

                setTimeout(() => {
                    setStatus('');
                }, 1000);
            } catch (error) {
                console.error('Error:', error);
                setStatus('Failed to send message. Please try again later.');
            }
        }
    };
    
    return (
        <>
        <div style={{}}>
  <div style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', position: 'relative',  backgroundColor: 'rgba(226, 230, 255, 1)' , height:'450px' , zIndex:1 ,marginBottom:'100px',paddingTop:'50px'}}>
     <img
              src={TopLeftCurve}
              alt="Top Left Curve"
              className="position-absolute"
              style={{ top: "0", left: "0", width: "150px", zIndex: "1" }}
            />
    <h1 style={{ fontSize: 40, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>
      Get in touch with us
    </h1>
    <p style={{display: 'flex', alignItems: 'center',width:'70%', fontSize: '17px', fontWeight: 400, color: 'rgba(71, 85, 105, 1)', fontFamily: 'Montserrat' }}>
      Get more done with targeted and personalized rewarding experiences at a global scale. Plum offers AI-enabled rewards automation that runs on the largest global rewards marketplace. It delivers rewards experiences people love, available in over 100 countries.
    </p>
  </div>

  

  <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute' , zIndex:4 , top:250 , left:100  }}>
    <div className="row g-4 justify-content-center shadow rounded-5" style={{ padding: '50px', gap: '24px', marginBottom: '50px', marginTop: '40px', backgroundColor: 'white' }}>
      {/* Contact Details Section */}
      <div className="col-lg-5 col-md-12 col-sm-12" style={{ border: '1px solid #E2E2E2', borderRadius: '20px', padding: '30px', backgroundColor: 'rgba(9, 15, 41, 1)', color: 'white' }}>
        <h3 style={{ fontWeight: 600, fontFamily: "Montserrat", fontSize: 28 , color:'rgba(255, 255, 255, 1)' }}>
          Our Contacts & Location
        </h3>
        <h5 style={{ fontWeight: 400, fontFamily: "Montserrat", fontSize: 15 , color:'rgba(255, 255, 255, 1)',paddingTop:'5px' }}>
          You Can Find Us At The Following Location
        </h5>
        <div style={{ paddingTop: '30px' }}>
          <p  style={{ fontWeight: 700, fontFamily: "Montserrat", fontSize: 17 , color:'rgba(255, 255, 255, 1)' }}>
            Head Office Address:
          </p>
          <p style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 15 , color:'rgba(255, 255, 255, 1)' }}>
          <img src={Location}  style={{marginRight:'10px'}}/>  7/96, North Street, Athisayapuram, VK Pudur (PO) Tenkasi – 627861
          </p>
        </div>
        <div style={{ paddingTop: '30px' }}>
          <p style={{ fontWeight: 700, fontFamily: "Montserrat", fontSize: 17 , color:'rgba(255, 255, 255, 1)' }}>
          Chennai Address:
          </p>
          <p style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 15 , color:'rgba(255, 255, 255, 1)' }}>
          <img src={Location}  style={{marginRight:'10px'}}/>  1B, Block 1, Neelkamal Apartment, Kazhipattur, Chennai - 603103
          </p>
        </div>
        <hr></hr>

        <div style={{ paddingTop: '10px'   , display:'flex', flexDirection:'row'}}>

            <div    className="d-flex align-items-center justify-content-center" style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  backgroundColor: "rgba(232, 236, 252)",
                  marginRight:'10px'
                }}>
           <img src={Email}  /> 
            </div>
         
         <div>
          <p style={{ fontWeight: 700, fontFamily: "Montserrat", fontSize: 17 , color:'rgba(255, 255, 255, 1)' }}>
           Email Support : 
          </p>
          <p style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 15 , color:'rgba(255, 255, 255, 1)' }}>
          support@s3remotica.com
          </p>
          </div>
        </div>

        <div style={{ paddingTop: '10px' , display:'flex', flexDirection:'row'}}>

        <div    className="d-flex align-items-center justify-content-center" style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  backgroundColor: "rgba(232, 236, 252)",
                  marginRight:'10px'
                }}>
      <img src={Call}  /> 
            </div>
            <div>
            <p style={{ fontWeight: 700, fontFamily: "Montserrat", fontSize: 17 , color:'rgba(255, 255, 255, 1)' }}>
            Contact Support : 
          </p>
          <p style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 15 , color:'rgba(255, 255, 255, 1)' }}>
          +91 8344715078
          </p>
          <p style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 15 , color:'rgba(255, 255, 255, 1)', marginTop:'3px' }}>
          +91 6382064159
          </p>
            </div>
      
      
        </div>
      </div>

      {/* Get in Touch Section */}
      <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '30px' }}>
        <h3 style={{ fontWeight: Styles.FontBold, fontFamily: Styles.fontFamilyMontserrat, fontSize: Styles.Font25 }}>
          Let's Get in Touch
        </h3>

        {status && <div className="alert alert-info">{status}</div>}
        <form onSubmit={handleSubmit} style={{ paddingTop: '10px' }}>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 mb-3">
              <input
                type="text"
                className="form-control custom-input-height"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Your name"
                style={{ padding: '20px', backgroundColor: 'rgba(238, 241, 252, 1)', borderRadius: 12, color: 'rgba(128, 128, 146, 1)', fontFamily: 'Montserrat' }}
              />
              {errors.user_name && (
                <div className="d-flex align-items-center mb-2">
                  <MdError style={{ color: 'red', marginRight: '5px', fontSize: '14px' }} />
                  <label className="mb-0" style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
                    {errors.user_name}
                  </label>
                </div>
              )}
            </div>
            <div className="col-md-12 col-lg-12 col-sm-12 mb-3">
              <input
                type="text"
                className="form-control custom-input-height"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
                placeholder="Your phone"
                style={{ padding: '20px', backgroundColor: 'rgba(238, 241, 252, 1)', borderRadius: 12, color: 'rgba(128, 128, 146, 1)', fontFamily: 'Montserrat' }}
              />
              {errors.user_phone && (
                <div className="d-flex align-items-center mb-2">
                  <MdError style={{ color: 'red', marginRight: '5px', fontSize: '14px' }} />
                  <label className="mb-0" style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
                    {errors.user_phone}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12 col-lg-12 col-sm-12 mb-3">
              <input
                type="text"
                className="form-control custom-input-height"
                name="user_city"
                value={formData.user_city}
                onChange={handleChange}
                placeholder="Your city"
                style={{ padding: '20px', backgroundColor: 'rgba(238, 241, 252, 1)', borderRadius: 12, color: 'rgba(128, 128, 146, 1)', fontFamily: 'Montserrat' }}
              />
              {errors.user_city && (
                <div className="d-flex align-items-center mb-2">
                  <MdError style={{ color: 'red', marginRight: '5px', fontSize: '14px' }} />
                  <label className="mb-0" style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
                    {errors.user_city}
                  </label>
                </div>
              )}
            </div>

            <div className="col-md-12 col-lg-12 col-sm-12">
              <Form.Group className="" controlId="exampleForm.ControlInput5">
                <Form.Select
                  aria-label="Default select example"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  style={{
                    fontSize: 16,
                    color: 'rgba(128, 128, 146, 1)',
                    lineHeight: '18.83px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    fontFamily: 'Montserrat',
                    border: '1px solid #D9D9D9',
                    height: 59,
                    borderRadius: 12,
                    padding: '20px',
                    backgroundColor: 'rgba(238, 241, 252, 1)'
                  }}
                >
                  <option style={{ fontFamily: 'Montserrat' }} value="">Select Course</option>
                  <option style={{ fontFamily: 'Montserrat' }} value="Frontend">Frontend</option>
                  <option style={{ fontFamily: 'Montserrat' }} value="Backend">Backend</option>
                  <option style={{ fontFamily: 'Montserrat' }} value="Full stack Development">Full stack Development</option>
                </Form.Select>
                {errors.message && (
                  <div className="d-flex align-items-center mb-2">
                    <MdError style={{ color: 'red', marginRight: '5px', fontSize: '14px' }} />
                    <label className="mb-0" style={{ color: 'red', fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
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
                className="w-100"
                style={{ marginTop: '20px', backgroundColor: '#1E45E1', padding: '15px 20px', color: 'white', fontFamily: 'Gilroy', borderRadius: 8, border: '1px solid #1E45E1' }}
              >
                Submit Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div style={{ position: 'relative', backgroundColor: 'white', height:'450px',   zIndex:2 }}></div>
</div>
        </>
    );
}

export default Contact;