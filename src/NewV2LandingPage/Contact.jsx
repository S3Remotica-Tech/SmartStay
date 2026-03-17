import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { send } from 'emailjs-com';
// import { MdError } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import ErrorMessage from '../Components/ErrorMessage'
import { Mobile, Sms } from "iconsax-react";
// import { CiMail } from "react-icons/ci";
import BottomImage from "../Assets/v2Images/bottom_image.svg";


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
        await axios.post('https://marketingapi.s3remotica.com/api/user/add_lead', formData);


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

     


      <div className="relative bg-white py-[80px]">

        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start px-[40px]">


          <div>

            <h3 className="text-[48px] font-semibold font-tasa text-black leading-[56px]">
              See Smartstay in Action
            </h3>

            <p className="text-[20px] text-[#222222] mt-2 font-tasa">
              Discover how Smartstay can streamline your hostel, from check-in to check-out.
            </p>


            <div className="flex items-start gap-3 my-10">

              <div className="bg-[#EFF2FF] p-2 rounded flex items-center justify-center">
                <Mobile color="#1E45E1" size="18" variant="Bold" />
              </div>

              <div className="font-tasa leading-tight">
                <div className="text-xs text-[#222222]">
                  We are Available
                </div>

                <div className="text-base font-medium text-[#222222]">
                  +91 94296 93581
                </div>

                <div className="text-xs text-[#222222] flex items-center gap-2">
                  (10:00 AM to 06:00PM)

                  <span className="bg-[#FF95001A] text-[#FF9500] px-2 py-[2px] rounded text-xs">
                    Mon-Sat
                  </span>
                </div>
              </div>

            </div>


            <div className="flex items-start gap-3">

              <div className="bg-[#EFF2FF] p-2 rounded flex items-center justify-center">
                <Sms color="#1E45E1" size="18" variant="Bold" />
              </div>

              <div className="font-tasa">
                <div className="text-xs text-[#222222]">
                  You can also email us here
                </div>

                <div className="text-base font-medium text-[#222222]">
                  dm@s3remotica.com
                </div>
              </div>

            </div>

          </div>


          <div className="bg-white p-[30px] rounded-xl shadow-sm border-1 border-[#D3D3D3] z-50 font-tasa">

            {status && (
              <div className="bg-blue-100 text-blue-700 p-2 rounded mb-3">
                {status}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="text-sm font-medium">
                  Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
                />

                {errors.user_name && (
                  <ErrorMessage message={errors.user_name} type="error" />
                )}
              </div>


              <div>
                <label className="text-sm font-medium">
                  Contact Number <span className="text-red-500">*</span>
                </label>

                <div className="w-full mt-1 flex items-center border border-[#DCDCDC] rounded-md overflow-hidden">

                  <span className="px-3 py-[8px]  text-[#222222] text-sm">
                    +91
                  </span>

                  <input
                    type="text"
                    name="user_phone"
                    value={formData.user_phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    className="w-full p-[8px] bg-[#FFFFFF] text-[#808092] focus:border-[#1E45E1] outline-none"
                  />

                </div>

                {errors.user_phone && (
                  <ErrorMessage message={errors.user_phone} type="error" />
                )}
              </div>


              <div>
                <label className="text-sm font-medium">City</label>

                <input
                  type="text"
                  name="user_city"
                  value={formData.user_city}
                  onChange={handleChange}
                  placeholder="Your city"
                  className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
                />
              </div>


              <div>
                <label className="text-sm font-medium">Message</label>

                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirements"
                  className="w-full mt-1 p-[8px] bg-[#FFFFFF] rounded-md text-[#808092] border border-[#DCDCDC] focus:border-[#1E45E1] outline-none"
                />
              </div>


              <button
                type="submit"
                className="w-full bg-[#1E45E1] text-white py-[14px] rounded-lg font-medium mt-2"
              >
                Submit
              </button>

            </form>

          </div>

        </div>



        <div className="absolute bottom-0 left-0 right-0 z-10">
          <img src={BottomImage} alt="bottom" className="w-full object-cover" />
        </div>

      </div>














    </>
  );
}

export default Contact;