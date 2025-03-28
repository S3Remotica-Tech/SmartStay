import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Akshay from "../Assets/Images/landingpageimages/akshay.png"
import "./ImageSlider.css";
// import LeftArrow from "../Assets/Images/landingpageimages/leftarr.png"
// import RightArrow from "../Assets/Images/landingpageimages/right_arrow.png"


const testimonials = [
  {
    image: Akshay, // Replace with actual image
    text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
    rating: 5,
    name: "Akshay Kumar",
    designation: "Lead AI Designer at Google",
  },
  {
    image: Akshay, // Replace with actual image
    text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
    rating: 5,
    name: "John Doe",
    designation: "UI/UX Designer at Apple",
  },
  {
    image: Akshay, // Replace with actual image
    text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
    rating: 5,
    name: "Akshay Kumar",
    designation: "Lead AI Designer at Google",
  },
  {
    image: Akshay, // Replace with actual image
    text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
    rating: 5,
    name: "John Doe",
    designation: "UI/UX Designer at Apple",
  },
  {
    image: Akshay, // Replace with actual image
    text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
    rating: 5,
    name: "Akshay Kumar",
    designation: "Lead AI Designer at Google",
  },
  {
    image: Akshay, // Replace with actual image
    text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
    rating: 5,
    name: "John Doe",
    designation: "UI/UX Designer at Apple",
  },
];

const TestimonialSlider = () => {
  return (
    <div className="testimonial-container">
     <Swiper
  modules={[Navigation, Pagination]}
  navigation={true}  // Make sure navigation is enabled
  pagination={{ clickable: true }}
  spaceBetween={30}
  slidesPerView={1}
  className="testimonial-slider"
>
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index} className="testimonial-slide">
            <div className="testimonial-content">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <div className="testimonial-text">
                <p   style={{
    //   color: "rgba(255, 255, 255, 1)",
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
  );
};

export default TestimonialSlider;
