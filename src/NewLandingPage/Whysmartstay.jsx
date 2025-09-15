import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Plus from "../Assets/Images/landingpageimages/Plus.png";
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const SmartStaySection = () => {

  

  const [formData, setFormData] = useState({
    pg_name: '',
    user_name: '',
    email: '',
    user_phone: '',
    message: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user_phoneRegex = /^\d{10}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleaned = name === 'user_phone' ? value.replace(/\D/g, '') : value;

    setFormData({ ...formData, [name]: cleaned });

    // Instant validation
    let msg = '';
    if (name === 'email' && cleaned && !emailRegex.test(cleaned)) {
      msg = 'Enter a valid email';
    }
    if (name === 'user_phone' && cleaned.length !== 10) {
      msg = 'Enter a valid 10-digit number';
    }
    if (name === 'user_name' && cleaned.trim() === '') {
      msg = 'Name is required';
    }

    setErrors((prev) => ({ ...prev, [name]: msg }));
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const newErrors = {};
  //   if (!formData.pg_name.trim()) newErrors.pg_name = 'PG name is required';
  //   if (!formData.user_name.trim()) newErrors.user_name = 'Name is required';
  //   if (!user_phoneRegex.test(formData.user_phone)) newErrors.user_phone = 'Enter a valid 10-digit number';


  //   if (formData.email && !emailRegex.test(formData.email)) {
  //     newErrors.email = 'Enter a valid email';
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     await emailjs.send(
  //       'service_ael05nx',
  //       'template_le2ry4z',
  //       formData,
  //       'xM8OCsWJd_Fz844uW'
  //     );

  //     alert('Your request was sent successfully!');
  //     setFormData({
  //       pg_name: '',
  //       user_name: '',
  //       email: '',
  //       user_phone: '',
  //       message: ''
  //     });
  //     setErrors({});
  //     navigate('/thankyou');

  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.pg_name.trim()) newErrors.pg_name = 'PG name is required';
    if (!formData.user_name.trim()) newErrors.user_name = 'Name is required';
    if (!user_phoneRegex.test(formData.user_phone)) newErrors.user_phone = 'Enter a valid 10-digit number';
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_ael05nx',         // Your EmailJS service ID
        'template_le2ry4z',        // Your EmailJS template ID
        formData,
        'xM8OCsWJd_Fz844uW'        // Your EmailJS public key
      );

      // Success — redirect
      setFormData({
        pg_name: '',
        user_name: '',
        email: '',
        user_phone: '',
        message: ''
      });
      setErrors({});
      navigate('/thankyou');
    } catch (err) {
      console.error('Email send failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
     

      <Container fluid className="text-white py-5" style={{ backgroundColor: "#090F29", marginBottom: 40, position: "relative", overflow: "visible" }}>


        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -300, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -285, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -270, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -255, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -240, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -225, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -210, transform: "rotate(320deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -270, transform: "rotate(130deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -255, transform: "rotate(130deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -240, transform: "rotate(130deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -225, transform: "rotate(130deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -210, transform: "rotate(130deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -195, transform: "rotate(130deg)", borderRadius: 8 }}></div>
        <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -180, transform: "rotate(130deg)", borderRadius: 8 }}></div>


        <Container>
          <Row className="align-items-center">

            <Col lg={6} className="mb-4 mb-lg-0 p-0" style={{ zIndex: 4, backgroundColor: "#090F29", overflow: "visible", }}>





              <h2 className="fw-bold mb-3" style={{ backgroundColor: "#090F29", fontSize: "34px", fontFamily: "Montserrat, sans-serif", fontWeight: 700, zIndex: 4 }}>
                Why SmartStay?
              </h2>

              <p className="text-light" style={{ backgroundColor: "#090F29", zIndex: 4, fontSize: "16px", fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}>

                Get Started
              </p>
              <ul className="list-unstyled" style={{ zIndex: 4, backgroundColor: "#090F29" }}>
                {[
                  { title: "Efficiency", description: "Automate routine tasks and save time." },
                  { title: "Visibility", description: "Gain insights with real-time data and analytics." },
                  { title: "Scalability", description: "Scale effortlessly as your business grows." },
                  { title: "User-Friendly", description: "Intuitive interface designed for ease of use." },
                  { title: "Customer Support 24/7", description: "24/7 customer support to assist you at every step." },
                ].map((feature, index) => (
                  <li key={index} className="mb-3">
                    <div className="d-flex align-items-center">
                      <span className="text-primary fw-bold me-2"
                      ><img src={Plus} alt="plusimage" /></span>
                      <strong
                        style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: "18px" }}>{feature.title}</strong>
                    </div>
                    <span className=""
                      style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: "14px", paddingLeft: "22px" }}>{feature.description}</span>
                  </li>
                ))}
              </ul>

            </Col>
            <Col lg={6} className="p-0" style={{ zIndex: 4 }}>
              <div className="bg-white p-4 shadow-lg rounded" style={{ borderRadius: "20px" }}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="pg_name"
                      type="text"
                      placeholder="PG Name"
                      value={formData.pg_name}
                      onChange={handleChange}
                      isInvalid={!!errors.pg_name}
                      style={{ background: "#f6f7f9", fontFamily: 'Montserrat' }}
                    />
                    <Form.Control.Feedback type="invalid">{errors.pg_name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="user_name"
                      type="text"
                      placeholder="Full Name"
                      value={formData.user_name}
                      onChange={handleChange}
                      isInvalid={!!errors.user_name}
                      style={{ background: "#f6f7f9", fontFamily: 'Montserrat' }}
                    />
                    <Form.Control.Feedback type="invalid">{errors.user_name}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      style={{ background: "#f6f7f9", fontFamily: 'Montserrat' }}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      name="user_phone"
                      type="tel"
                      placeholder="+91"
                      value={formData.user_phone}
                      onChange={handleChange}
                      isInvalid={!!errors.user_phone}
                      style={{ background: "#f6f7f9", fontFamily: 'Montserrat' }}
                      maxLength={10}
                    />
                    <Form.Control.Feedback type="invalid">{errors.user_phone}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={3}
                      placeholder="Tell us more about your requirements"
                      value={formData.message}
                      onChange={handleChange}
                      style={{ background: "#f6f7f9", fontFamily: 'Montserrat' }}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100 fw-bold"
                    style={{ background: '#1E45E1', fontFamily: 'Montserrat', padding: '10px' }}
                  >
                    {isSubmitting ? "Sending..." : "BOOK A DEMO"}
                  </Button>
                </Form>
                <p className="text-start mt-3" style={{ fontSize: "12px", color: 'rgba(104, 108, 157, 1)', fontFamily: 'Montserrat' }}>
                  Ready to simplify your PG Management? Join now and be part of a new era of PG management.
                </p>
              </div>
            </Col>


          </Row>
        </Container>
      </Container>
    </>
  );
};

export default SmartStaySection;