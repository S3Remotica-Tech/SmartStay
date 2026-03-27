import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Mobile, Sms, TickCircle, DocumentText, Calendar, Home } from "iconsax-react";
import BottomImage from "../Assets/v2Images/bottom_image.svg";
import SmartstayWhiteLogo from "../Assets/v2LandingImages/SmartstayWhiteLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../Components/ErrorMessage'
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "antd/dist/reset.css";

function SmartstayDemo() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [tenants, setTenants] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  const [name, setName] = useState("");
  const [noOfProperties, setNoOfProperties] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [errors, setErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false)
  const nameRef = useRef(null);
  const cityRef = useRef(null);
  const demoDateRef = useRef(null);
  const mobileRef = useRef(null);
  const countryCodeRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Enter Valid Mail ID",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };
  const steps = [
    {
      id: 1,
      icon: <DocumentText size="26" color="#1E45E1" variant="Bold" />,
      title: "Fill out the Form",
      desc: "Tell us what you need",
    },
    {
      id: 2,
      icon: <Calendar size="26" color="#1E45E1" variant="Bold" />,
      title: "We'll reach out",
      desc: "Our team schedules a time that works for you.",
    },
    {
      id: 3,
      icon: <Home size="26" color="#1E45E1" variant="Bold" />,
      title: "See Smartstay in Action",
      desc: "Get Personalized Demo",
    },
  ];


  const countryOptions = [
    { value: "91", label: "+91" },
    { value: "1", label: "+1" },
    { value: "44", label: "+44" },
    { value: "61", label: "+61" }
  ];



  const stateOptions = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands", },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];



  const handleDemoReuquest = () => {

    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      newErrors.name = "Please Enter Name";
    }

    if (!countryCode) {
      newErrors.countryCode = "Please Select Country code";
    }

    if (!contactNumber) {
      newErrors.contactNumber = "Please Enter Contact Number";
    } else if (contactNumber.length !== 10) {
      newErrors.contactNumber = "Enter valid 10 digit number";
    } else if (/^0+$/.test(contactNumber)) {
      newErrors.contactNumber = "Enter Valid Contact Number";
    }

    if (!city) {
      newErrors.city = "Please Enter City";
    }

    if (!demoDate) {
      newErrors.demoDate = "Please Enter Demo Date";
    }
    if (email && !emailRegex.test(email)) {
      newErrors.email = "Enter Valid Mail ID";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) nameRef.current?.focus();
      else if (newErrors.countryCode) countryCodeRef.current?.focus();
      else if (newErrors.contactNumber) mobileRef.current?.focus();
      else if (newErrors.city) cityRef.current?.focus();
      else if (newErrors.demoDate) demoDateRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      return;
    }

    const formatDate = (date) => {
      if (!date) return "";
      return dayjs(date).format("DD-MM-YYYY");
    };

    const payload = {
      countryCode: countryCode || "",
      mobile: contactNumber || "",
      name: name || "",
      emailId: email || "",
      organization: organizationName || "",
      noOfProperties: Number(noOfProperties) || 0,
      noOfTenants: Number(tenants) || 0,
      city: city || "",
      state: stateName || "",
      requestedDate: formatDate(demoDate),
      requestedTime: demoTime || ""
    };

    dispatch({
      type: "DEMOREQUESTSAGA",
      payload
    });
    setFormLoading(true)
  };

  useEffect(() => {
    if (state.login?.demoSuccess === 200) {
      setFormLoading(false)
      setContactNumber("");
      setEmail("");
      setOrganizationName("");
      setTenants("");
      setCity("");
      setCountry("");
      setDemoDate("");
      setDemoTime("");
      setName("");
      setNoOfProperties("");
      setStateName("");
      setCountryCode("+91");
      setErrors({});
    }

  }, [state.login?.demoSuccess])


  useEffect(() => {
    if (state.login?.demoEror) {
      setFormLoading(false)
    }

  }, [state.login?.demoEror])

  return (
    <>
      <div className="relative bg-white py-[80px] font-tasa">

        <div className=" max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start px-[40px]">


          <div className="rounded-2xl p-10 text-white bg-gradient-to-b from-[#5272F0] to-[#0F2169] ">


            <div className="flex items-center gap-2 mb-6">
              <img src={SmartstayWhiteLogo} alt="logo" />
            </div>


            <div className="inline-block text-xs bg-white/20 px-3 py-1 rounded-full mb-6 text-white">
              Digitally verify your tenants with ease and security
            </div>


            <h3 className="text-[36px] font-semibold leading-[44px] mb-4 font-tasa">
              See Smartstay in Action
            </h3>


            <p className="text-[15px] text-white/90 mb-8 leading-relaxed">
              Discover How Smartstay can streamline your Hostel,
              From Check-in to Check-Out
            </p>


            <h4 className="text-[32px] font-bold mb-5 text-white">
              What’s include in Demo!
            </h4>


            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <TickCircle size="20" variant="Bold" color="#FF9D00" />
                <p className="text-white">A live walkthrough of the platform.</p>
              </div>

              <div className="flex items-start gap-3">
                <TickCircle size="20" variant="Bold" color="#FF9D00" />
                <p className="text-white">
                  Personalized guidance on Smartstay to suit your business.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <TickCircle size="20" variant="Bold" color="#FF9D00" />
                <p className="text-white">
                  Help choosing the right pricing plan for you.
                </p>
              </div>

            </div>
          </div>



          <div className="relative bg-white px-[20px] py-[30px] rounded-xl shadow-sm border border-[#D3D3D3] z-50 font-gilroy">
            {formLoading && (
              <div className="absolute inset-0  flex items-center bg-white/50 justify-center  z-[9999]">
                <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <h2 className="text-[22px] font-semibold mb-3">
              Get your personalized Demo
            </h2>
            <div className="max-h-[450px] overflow-y-auto  show-scrolls relative">

              <div className="me-2">
                <div className="mb-3">
                  <label className="text-sm font-normal">
                    Name <span className="text-red-500">*</span>
                  </label>

                  <input ref={nameRef}
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        setName(value);
                        setErrors((prev) => ({ ...prev, name: "" }));
                      }
                    }}
                    placeholder="Enter Name"
                    className={`w-full mt-1 h-10 px-3 text-sm border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none focus:border-[#1E45E1]
    ${name ? "font-semibold text-black" : "font-normal"}
  `}
                  />
                  {errors.name && (
                    <ErrorMessage message={errors.name} type="error" />
                  )}
                </div>
                <div className="mb-3">
                  <label className="text-sm font-normal">
                    Contact Number <span className="text-red-500">*</span>
                  </label>

                  <div className="w-full mt-1 flex items-center border border-[#DCDCDC] rounded-md">

                    <div className="w-[120px]">
                      <Select ref={countryCodeRef}
                        options={countryOptions}
                        // defaultValue={countryOptions[0]}
                        onChange={(option) => setCountryCode(option?.value)}
                        className="text-sm"
                        placeholder="+91"
                        styles={{
                          control: (base) => ({
                            ...base,
                            border: "none",
                            boxShadow: "none",
                            minHeight: "36px",
                            fontWeight: 600,
                          }),

                          singleValue: (base) => ({
                            ...base,
                            fontWeight: 600,
                            color: "#1E1E1E",
                          }),

                          placeholder: (base) => ({
                            ...base,
                            fontWeight: 400,
                          }),

                          menu: (base) => ({
                            ...base,
                            zIndex: 9999
                          }),

                          option: (base, state) => ({
                            ...base,
                            cursor: "pointer",
                            backgroundColor: state.isFocused ? "lightblue" : "white",
                            color: "#000",
                            fontFamily: "Gilroy",
                            fontWeight: state.isSelected ? 600 : 400,
                          }),

                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>

                    <input
                      ref={mobileRef}
                      type="text"
                      value={contactNumber}
                      inputMode="numeric"
                      maxLength={10}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/\D/g, "");
                        if (value.length > 10) return;
                        if (/^0+$/.test(value)) {
                          setContactNumber(value);
                          setErrors((prev) => ({
                            ...prev,
                            contactNumber: "Enter Valid Contact Number",
                          }));
                          return;
                        }
                        setContactNumber(value);
                        setErrors((prev) => ({
                          ...prev,
                          countryCode: "",
                          contactNumber: "",
                        }));
                      }}
                      placeholder="Enter Contact Number"
                      className={`w-full mt-1 h-10 px-3 text-sm   rounded-md bg-white text-[#808092] outline-none 
    ${contactNumber ? "font-semibold text-black" : "font-normal"}
  `}
                    />
                  </div>
                  {(errors.countryCode || errors.contactNumber) && (
                    <ErrorMessage
                      message={errors.countryCode || errors.contactNumber}
                      type="error"
                    />
                  )}
                </div>


                <div className="mb-3">
                  <label className="text-sm font-normal">Mail ID</label>

                  <input ref={emailRef}
                    type="email"
                    placeholder="Enter Mail ID"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full mt-1 h-10 px-3 text-sm border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${email ? "font-semibold text-black" : "font-normal"}
  `}
                  />
                  {errors.email && (
                    <ErrorMessage message={errors.email} type="error" />
                  )}
                </div>


                <div className="mb-3">
                  <label className="text-sm font-normal">Organization Name</label>

                  <input
                    type="text"
                    placeholder="Eg: Royal Homes"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className={`w-full mt-1 h-10 px-3 text-sm  border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${organizationName ? "font-semibold text-black" : "font-normal"}
  `}
                  />
                </div>

                <div className="mb-3">
                  <label className="text-sm font-normal">
                    Number of Properties
                  </label>

                  <input
                    type="number"
                    value={noOfProperties}
                    onChange={(e) => setNoOfProperties(e.target.value)}
                    placeholder="Enter Properties count"
                    className={`w-full mt-1 h-10 px-3 text-sm  border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${noOfProperties ? "font-semibold text-black" : "font-normal"}
  `}
                  />
                </div>
                <div className="mb-3">
                  <label className="text-sm font-normal">
                    No. of Tenants Managing
                  </label>

                  <input
                    type="number"
                    value={tenants}
                    onChange={(e) => setTenants(e.target.value)}
                    placeholder="Enter number of tenants"
                    className={`w-full mt-1 h-10 px-3 text-sm border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${tenants ? "font-semibold text-black" : "font-normal"}
  `}
                  />
                </div>


                <div className="grid grid-cols-2 gap-4 mb-3">

                  <div>
                    <label className="text-sm font-normal">City <span className="text-red-500">*</span></label>

                    <input ref={cityRef}
                      type="text"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^a-zA-Z\s]/g, "");
                        setCity(value);
                        setErrors((prev) => ({ ...prev, city: "" }));
                      }}
                      className={`w-full mt-1 h-10 px-3 text-sm border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${city ? "font-semibold text-black" : "font-normal"}
  `}
                    />
                    {errors.city && (
                      <ErrorMessage message={errors.city} type="error" />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-normal">Country</label>

                    <input
                      type="text"
                      placeholder="Enter Country"
                      value={country}
                      onChange={(e) => {
                        let value = e.target.value;
                        value = value.replace(/[^a-zA-Z\s]/g, "");
                        setCountry(value);
                      }}
                      className={`w-full mt-1 h-10 px-3 text-sm border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${country ? "font-semibold text-black" : "font-normal"}
  `}
                    />

                  </div>

                </div>

                <div className="mb-3">
                  <label className="text-sm font-normal">
                    State
                  </label>

                  <Select
                    options={stateOptions}
                    onChange={(option) => setStateName(option.value)}
                    placeholder="Select state"
                    menuPlacement="bottom"
                    className="mt-1 text-sm "
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: "#DCDCDC",
                        boxShadow: "none",
                        minHeight: "40px",
                        height: "40px",
                        fontSize: "14px",
                         cursor:"pointer"
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "0 8px"
                      }),
                       option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      color: "#000",
                    }),
                      singleValue: (base) => ({
                        ...base,
                        fontWeight: 600,
                        color: "#1E1E1E"
                      }),
                      placeholder: (base) => ({
                        ...base,
                        fontWeight: 400
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#F9FAFB",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                        cursor:"pointer"
                      }),
                      menuList: (base) => ({
      ...base,
      maxHeight: "150px",     
      overflowY: "auto",    
      cursor: "pointer",
    }),
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">

                  <div>
                    <label className="text-sm font-normal">
                      Demo Date <span className="text-red-500">*</span>
                    </label>

                    <div className="datepicker-wrapper relative w-full mt-px">
                      <DatePicker
                        ref={demoDateRef}
                        className={`w-full mt-1 h-10 text-xs border border-[#DCDCDC] text-black rounded-md font-gilroy 
  ${demoDate ? "font-bold text-black" : "font-normal text-[#808092]"}
`}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={demoDate ? dayjs(demoDate) : null}
                        onChange={(date) => {
                          setDemoDate(date ? date.toDate() : null);
                          setErrors((prev) => ({ ...prev, demoDate: "" }));
                        }}
                        disabledDate={(current) =>
                          current && current < dayjs().startOf("day")
                        }
                        getPopupContainer={() => document.body}
                        popupStyle={{ zIndex: 2000 }}
                        placement="bottomLeft"
                      />
                    </div>

                    {errors.demoDate && (
                      <ErrorMessage message={errors.demoDate} type="error" />
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-normal">Demo Time</label>

                    <input
                      type="time"
                      value={demoTime}
                      onChange={(e) => setDemoTime(e.target.value)}
                      className={`w-full mt-1 h-10 px-3 text-sm  border border-[#DCDCDC] rounded-md bg-white text-[#808092] outline-none 
    ${demoTime ? "font-semibold text-black" : "font-normal"}
  `}
                    />
                  </div>

                </div>

              </div>
              <button onClick={handleDemoReuquest} className="w-full bg-[#1E45E1] text-white py-2 rounded-md font-medium hover:opacity-90">
                Submit
              </button>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <img src={BottomImage} alt="bottom" className="w-full object-cover" />
        </div>














      </div>
      <section className="py-2 mb-4 bg-white font-tasa">


        <div className="text-center mb-12 px-4">
          <h2 className="text-[52px] font-bold mt-4 inline-block bg-gradient-to-r from-[#1E45E1] to-[#05A7FF] bg-clip-text text-transparent">
            How it Works...?
          </h2>

          <p className="text-[#4A4A4A] mt-2 text-sm md:text-base">
            Three simple steps to your personalized demo.
          </p>
        </div>


        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">

          {steps.map((step) => (
            <div key={step.id} className="text-center flex flex-col items-center">


              <div className="relative mb-4">

                <div className="w-14 h-14 bg-[#EEF2FF] rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>


                <span className="absolute -top-2 -right-2 bg-[#FF9500] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold">
                  {step.id}
                </span>

              </div>


              <h3 className="font-semibold text-[#222] text-[28px] font-medium">
                {step.title}
              </h3>


              <p className="text-[#444444] text-base mt-1 max-w-[220px] font-medium">
                {step.desc}
              </p>

            </div>
          ))}

        </div>
      </section>
    </>
  );
}

export default SmartstayDemo;