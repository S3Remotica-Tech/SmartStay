import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Akshay from "../Assets/Images/landingpageimages/akshay.png"
import "./ImageSlider.css";
import Getanswer from "./Getanswer";
// import LeftArrow from "../Assets/Images/landingpageimages/leftarr.png"
// import RightArrow from "../Assets/Images/landingpageimages/right_arrow.png"


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

const TestimonialSlider = () => {
  return (
    <>

      <div className="testimonial-container">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={true}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="testimonial-slider"
          style={{
            paddingBottom: "80px",
            position: "relative"
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="testimonial-slide">
              <div className="testimonial-content">
                <img src={testimonial.image} alt={testimonial.alt} className="testimonial-image" />
                <div className="testimonial-text">
                  <p style={{
                    fontWeight: 500,
                    fontFamily: "Montserrat",
                    fontSize: 24,
                  }}>{testimonial.text}</p>
                  <div className="testimonial-rating">
                    {"⭐".repeat(testimonial.rating)}
                  </div>
                  <strong> - {testimonial.name}</strong>
                  <span>{testimonial.designation}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Getanswer />
    </>
  );
};

export default TestimonialSlider;
