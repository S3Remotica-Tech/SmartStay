import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { send } from 'emailjs-com';
// import { MdError } from "react-icons/md";
import { Styles } from '../Styles/ContactUsStyles';
import TopLeftCurve from "../Assets/Images/landingpageimages/topleftcurve.png";
import Email from "../Assets/Images/landingpageimages/message.png";
import Location from "../Assets/Images/landingpageimages/Location.png";
import Call from "../Assets/Images/landingpageimages/call.png";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
function Contact() {

   const ogImage = "https://smartstay.qbatz.com/assets/Smartstay_LOGO-CEWVemGR.svg";
  const ogAlt = "SmartStay logo";

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    user_name: '',
    user_city: '',
    user_phone: '',
    message: '',
    site_name: 'smartstay',
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
    if (!formData.user_phone.trim()) newErrors.user_phone = 'Phone Number is Required';
   



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

    if (formData.user_name && formData.user_phone) {
      try {
        const response = await axios.post('https://marketingapi.s3remotica.com/api/user/add_lead', formData);
     

        await send('service_ael05nx',
          'template_le2ry4z',
          formData, 'xM8OCsWJd_Fz844uW');
       
        setStatus('Message sent successfully!');
        setFormData({
          user_name: '',
          user_city: '',
          user_phone: '',
          message: '',
        });

        setTimeout(() => {
          setStatus('');
        }, 1000);
        navigate('/thankyou');
      } catch (error) {
        console.error('Error:', error);
        setStatus('Failed to send message. Please try again later.');
      }
    }
  };

  return (
    <>
<Helmet prioritizeSeoTags>
  {/* Language */}
  <html lang="en-IN" />

  {/* ===== Core SEO ===== */}
  <title>Hostel Management Software – Rent & Booking</title>
  <meta
    name="description"
    content="SmartStay is India’s trusted hostel management software for PGs. Manage bookings, rent collection, expenses & tenant complaints in one platform."
  />
  <link rel="canonical" href="https://smartstay.qbatz.com/pg-software-contact/" />
  <meta name="robots" content="index, follow" />

  {/* ===== Open Graph ===== */}
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SmartStay" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:url" content="https://smartstay.qbatz.com/pg-software-contact/" />
  <meta property="og:title" content="Hostel Management Software – Rent & Booking" />
  <meta
    property="og:description"
    content="SmartStay is India’s trusted hostel management software for PGs. Manage bookings, rent collection, expenses & tenant complaints in one platform."
  />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:alt" content={ogAlt} />

  {/* ===== Schema.org: WebPage ===== */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "SmartStay",
      url: "https://smartstay.qbatz.com/",
      email: "dm@s3remotica.com",
      telephone: ["+918344715078", "+919688207649", "+919688229461"],
      sameAs: [
        "https://www.instagram.com/smartstay.qbatz/",
        "https://www.facebook.com/profile.php?id=61574999712221",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+918344715078",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["en", "ta"],
        },
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "7/96, North Street, Athisayapuram, VK Pudur (PO)",
          addressLocality: "Tenkasi",
          postalCode: "627861",
          addressRegion: "TN",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "1B, Block 1, Neelkamal Apartment, Kazhipattur",
          addressLocality: "Chennai",
          postalCode: "603103",
          addressRegion: "TN",
          addressCountry: "IN",
        },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:30",
          closes: "19:00",
        },
      ],
    })}
  </script>

  {/* ===== Breadcrumbs: Home ===== */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://smartstay.qbatz.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact Us",
          item: "https://smartstay.qbatz.com/pg-software-contact/",
        },
      ],
    })}
  </script>
</Helmet>

      <div style={{ display: 'flex', flexDirection: 'column', textAlign: "center", alignItems: 'center', position: 'relative', background: "linear-gradient(135deg, #E2E6FF, #EFFCFF)", height: '400px', zIndex: 1, marginBottom: '500px', paddingTop: '50px' }}>
        <img
          src={TopLeftCurve}
          alt="Top Left Curve"
          className="position-absolute d-none d-md-block"
          style={{ top: "0", left: "0", width: "120px", zIndex: "1" }}
        />
        <h1 style={{ fontSize: 40, fontWeight: 700, color: 'rgba(9, 15, 41, 1)', fontFamily: 'Montserrat' }}>
          Get in touch with us
        </h1>
       




        <div className="container   mt-3" style={{ zIndex: 4, position: "absolute", top: 160 }}>
          <div className="row justify-content-center flex-wrap shadow rounded-5" style={{ padding: '20px', gap: '24px', marginBottom: '50px', marginTop: '40px', backgroundColor: 'white' }}>
            <div className="col-lg-5 col-md-12 col-sm-12" style={{ border: '1px solid #E2E2E2', borderRadius: '20px', padding: '30px', backgroundColor: 'rgba(9, 15, 41, 1)', color: 'white' }}>
              <h3 style={{ textAlign: "start", fontWeight: 600, fontFamily: "Montserrat", fontSize: 28, color: 'rgba(255, 255, 255, 1)' }}>
                Our Contacts & Location
              </h3>
              <h5 style={{ textAlign: "start", fontWeight: 400, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)', paddingTop: '5px' }}>
                You Can Find Us At The Following Location
              </h5>
              <div style={{ paddingTop: '30px' }}>
                <p style={{ textAlign: "start", fontWeight: 700, fontFamily: "Montserrat", fontSize: 17, color: 'rgba(255, 255, 255, 1)' }}>
                  Head Office Address:
                </p>
                <span className='d-flex gap-2 ' >
                  <img src={Location} alt='location' style={{ height: 19, width: 19, marginTop: 7 }} />  <p style={{ textAlign: "start", fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)' }}> 7/96, North Street, Athisayapuram, VK Pudur (PO) Tenkasi – 627861
                  </p>
                </span>
              </div>
              <div style={{ paddingTop: '30px' }}>
                <p style={{ textAlign: "start", fontWeight: 700, fontFamily: "Montserrat", fontSize: 17, color: 'rgba(255, 255, 255, 1)' }}>
                  Chennai Address:
                </p>
                <span className='d-flex gap-2 ' >

                  <img src={Location} alt='location' style={{ height: 19, width: 19, marginTop: 7 }} />  <p style={{ textAlign: "start", fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)' }}> 1B, Block 1, Neelkamal Apartment, Kazhipattur, Chennai - 603103
                  </p>
                </span>
              </div>
              <hr></hr>

              <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'row' }}>

                <div className="d-flex align-items-center justify-content-center" style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  backgroundColor: "rgba(232, 236, 252)",
                  marginRight: '10px'
                }}>
                  <img src={Email} alt='email' />
                </div>

                <div>
                  <p className='mb-1' style={{ textAlign: "start", fontWeight: 700, fontFamily: "Montserrat", fontSize: 17, color: 'rgba(255, 255, 255, 1)' }}>
                    Email Support :
                  </p>
                  <p style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)' }}>
                    dm@s3remotica.com
                  </p>
                </div>
              </div>

              <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'row' }}>

                <div className="d-flex align-items-center justify-content-center" style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "15px",
                  backgroundColor: "rgba(232, 236, 252)",
                  marginRight: '10px'
                }}>
                  <img src={Call} alt='call' />
                </div>
                <div>
                  
                  <p className='mb-1' style={{ textAlign: "start", fontWeight: 700, fontFamily: "Montserrat", fontSize: 17, color: 'rgba(255, 255, 255, 1)' }}>
                    Contact Support :
                  </p>
                   <p className='mb-1' style={{ textAlign: "start", fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)', marginTop: '3px' }}>
                    +91 9429693581
                  </p>
                  <p className='mb-1' style={{ textAlign: "start", fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)' }}>
                    +91 8344715078
                  </p>
                  <p className='mb-1' style={{ textAlign: "start", fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)', marginTop: '3px' }}>
                    +91 9688207649
                  </p>
                  <p className='mb-1' style={{ textAlign: "start", fontWeight: 500, fontFamily: "Montserrat", fontSize: 15, color: 'rgba(255, 255, 255, 1)', marginTop: '3px' }}>
                    +91 9688229461
                  </p>
                  
                </div>


              </div>
            </div>


            <div className="col-lg-6 col-md-12 col-sm-12" style={{ padding: '10px' }}>
              <h3 style={{ textAlign: "start", fontWeight: Styles.FontBold, fontFamily: Styles.fontFamilyMontserrat, fontSize: Styles.Font25 }}>
                Let&apos;s Get in Touch
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
                      <ErrorMessage message={errors.user_name} type="error" />
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
                      <ErrorMessage message={errors.user_phone} type="error" />
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
                  
                  </div>

                  <div className="col-md-12 col-lg-12 col-sm-12">
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
      </div>
    </>
  );
}

export default Contact;