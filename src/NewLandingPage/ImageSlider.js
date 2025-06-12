import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import React, { useRef } from "react";
import { FaStar } from "react-icons/fa"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./ImageSlider.css";
import Akshay from "../Assets/Images/landingpageimages/akshay.png"
import LeftArrow from "../Assets/Images/landingpageimages/leftarr.png"
import RightArrow from "../Assets/Images/landingpageimages/rightarr.png"

const TestimonialSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);



  const testimonials = [
    {
      image: Akshay,
      text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
      rating: 5,
      name: "Akshay Kumar",
      designation: "Lead AI Designer at Google",
      alt: "User testimonial praising SmartStay hostel management software – ideal for online hostel booking and PG near me services."

    },
    {
      image: Akshay,
      text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
      rating: 5,
      name: "John Doe",
      designation: "UI/UX Designer at Apple",
      alt: "Happy customer testimonial for SmartStay hostel management software – trusted by professionals for hostel booking and PG operations."
    },
    {
      image: Akshay,
      text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
      rating: 5,
      name: "Akshay Kumar",
      designation: "Lead AI Designer at Google",
      alt: "User testimonial praising SmartStay hostel management software – ideal for online hostel booking and PG near me services."
    },
    {
      image: Akshay,
      text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
      rating: 5,
      name: "John Doe",
      designation: "UI/UX Designer at Apple",
      alt: "Happy customer testimonial for SmartStay hostel management software – trusted by professionals for hostel booking and PG operations."
    },
    {
      image: Akshay,
      text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
      rating: 5,
      name: "Akshay Kumar",
      designation: "Lead AI Designer at Google",
      alt: "User testimonial praising SmartStay hostel management software – ideal for online hostel booking and PG near me services."
    },
    {
      image: Akshay,
      text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
      rating: 5,
      name: "John Doe",
      designation: "UI/UX Designer at Apple",
      alt: "Happy customer testimonial for SmartStay hostel management software – trusted by professionals for hostel booking and PG operations."
    },
  ];

  return (
    <div className="testimonial-container p-5 mb-4" style={{ backgroundColor: "#F8FAFC", position: 'relative' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
         
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.params.pagination.el = paginationRef.current;

              swiper.navigation.init();
              swiper.navigation.update();
              swiper.pagination.init();
              swiper.pagination.render();
              swiper.pagination.update();
            }
          });
        }}
        spaceBetween={30}
        slidesPerView={1}
        className="testimonial-slider"
        style={{
          padding: 30,
          position: "relative",
          backgroundColor: "#F8FAFC"
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="testimonial-slide">
            <div className="testimonial-content d-flex flex-column flex-md-row gap-3" style={{ alignItems: "flex-start" }}>
              <img src={testimonial.image} alt={testimonial.alt} className="testimonial-image" style={{ height: 158, width: 158 }} />
              <div className="testimonial-text p-0">
                <p className="mb-1 mt-0" style={{ fontWeight: 500, fontFamily: "Montserrat", fontSize: 24 }}>{testimonial.text}</p>
                <div className="testimonial-rating mb-2 gap-1">
                  {Array(testimonial.rating).fill().map((_, index) => (
                    <FaStar key={index} color="#FFD700" className="me-1" />
                  ))}
                </div>
                <div className="mb-1">
                  <span style={{ fontFamily: "Gilroy", color: "#1E293B" }}>
                    <strong> - {testimonial.name}</strong>
                  </span>
                </div>
                <div className="mb-1">
                  <span style={{ fontFamily: "Gilroy", color: "#475569" }}>
                    {testimonial.designation}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="d-flex  align-items-center gap-3"
        style={{
          position: "absolute",
          top: "60%",
          right: "5%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          zIndex: 10,
        }}
      >
        <div>
          <button ref={prevRef} className="border-0" style={{ backgroundColor: "#F8FAFC" }}>
            <img src={LeftArrow} style={{ height: 30, width: 30 }} alt="prev"/>
          </button>
        </div>
        <div ref={paginationRef} className="d-flex gap-2 custom-pagination w-fit" style={{ width: "fit-content" }} />

        <div>
          <button ref={nextRef} className="border-0 " style={{ backgroundColor: "#F8FAFC" }}>
            <img src={RightArrow} style={{ height: 30, width: 30 }} alt="next" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default TestimonialSlider;

