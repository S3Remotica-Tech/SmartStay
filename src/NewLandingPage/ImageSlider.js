

// // import React from "react";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Navigation, Pagination } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/navigation";
// // import "swiper/css/pagination";

// // import Akshay from "../Assets/Images/landingpageimages/akshay.png";
// // import "./ImageSlider.css";
// // import Getanswer from "./Getanswer"; // Optional component

// // const testimonials = [
// //   {
// //     image: Akshay, // Replace with actual image
// //     text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
// //     rating: 5,
// //     name: "Akshay Kumar",
// //     designation: "Lead AI Designer at Google",
// //   },
// //   {
// //     image: Akshay, // Replace with actual image
// //     text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
// //     rating: 5,
// //     name: "John Doe",
// //     designation: "UI/UX Designer at Apple",
// //   },
// //   {
// //     image: Akshay, // Replace with actual image
// //     text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
// //     rating: 5,
// //     name: "Akshay Kumar",
// //     designation: "Lead AI Designer at Google",
// //   },
// //   {
// //     image: Akshay, // Replace with actual image
// //     text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
// //     rating: 5,
// //     name: "John Doe",
// //     designation: "UI/UX Designer at Apple",
// //   },
// //   {
// //     image: Akshay, // Replace with actual image
// //     text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
// //     rating: 5,
// //     name: "Akshay Kumar",
// //     designation: "Lead AI Designer at Google",
// //   },
// //   {
// //     image: Akshay, // Replace with actual image
// //     text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
// //     rating: 5,
// //     name: "John Doe",
// //     designation: "UI/UX Designer at Apple",
// //   },
// // ];

// // const TestimonialSlider = () => {
// //   return (
// //     <>
// //       <div className="testimonial-container">
// //         <Swiper
// //           modules={[Navigation, Pagination]}
// //           navigation={true}
// //           pagination={{ clickable: true }}
// //           spaceBetween={30}
// //           slidesPerView={1}
// //           className="testimonial-slider"
// //         >
// //           {testimonials.map((testimonial, index) => (
// //             <SwiperSlide key={index} className="testimonial-slide">
// //               <div className="testimonial-content">
// //                 <img
// //                   src={testimonial.image}
// //                   alt={testimonial.name}
// //                   className="testimonial-image"
// //                 />
// //                 <div className="testimonial-text">
// //                   <p>{testimonial.text}</p>
// //                   <div className="testimonial-rating">
// //                     {"⭐".repeat(testimonial.rating)}
// //                   </div>
// //                   <strong>- {testimonial.name}</strong>
// //                   <span>{testimonial.designation}</span>
// //                 </div>
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </div>

// //       {/* Optional */}
// //       <Getanswer />
// //     </>
// //   );
// // };

// // export default TestimonialSlider;

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import Akshay from "../Assets/Images/landingpageimages/akshay.png";
// import "./ImageSlider.css";

// const testimonials = [
//   {
//     image: Akshay,
//     text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
//     rating: 5,
//     name: "Akshay Kumar",
//     designation: "Lead AI Designer at Google",
//   },
//   {
//     image: Akshay,
//     text: "This design tool is the best! It has completely transformed my workflow. Highly recommend it to designers.",
//     rating: 5,
//     name: "John Doe",
//     designation: "UI/UX Designer at Apple",
//   },
// ];

// const TestimonialSlider = () => {
//   return (
//     <div className="testimonial-container">
//       <Swiper
//         modules={[Navigation, Pagination]}
//         navigation
//         pagination={{ clickable: true }}
//         spaceBetween={30}
//         slidesPerView={1}
//         className="testimonial-slider"
//       >
//         {testimonials.map((testimonial, index) => (
//           <SwiperSlide key={index} className="testimonial-slide">
//             <div className="testimonial-content">
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="testimonial-image"
//               />
//               <div className="testimonial-text">
//                 <p>{testimonial.text}</p>
//                 <div className="testimonial-rating">
//                   {"⭐".repeat(testimonial.rating)}
//                 </div>
//                 <strong>- {testimonial.name}</strong>
//                 <span>{testimonial.designation}</span>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default TestimonialSlider;



import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './ImageSlider.css';

const testimonials = [
  {
    image: "https://i.imgur.com/1Q9Z1Zm.jpg", // Replace with your image
    text: "I have waited my entire life for a design tool like this - nearly my entire life. With SlothUI, less is truly more. Period.",
    name: "Akshay Kumar",
    title: "Lead AI Designer at Google",
  },
  // Add more testimonials if needed
];

const NavigationButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="d-flex align-items-center justify-content-center gap-3 mt-3">
      <button
        onClick={() => swiper.slidePrev()}
        className="arrow-btn border-0 bg-transparent"
      >
        <FaArrowLeft size={20} />
      </button>

      <div className="swiper-pagination" />

      <button
        onClick={() => swiper.slideNext()}
        className="arrow-btn border-0 bg-transparent"
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

const TestimonialSlider = () => {
  return (
    <Container className="my-5">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        loop
        className="testimonial-swiper"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <Row className="align-items-center p-4 shadow rounded bg-white">
              <Col xs={12} md={2} className="text-center mb-3 mb-md-0">
                <Image
                  src={t.image}
                  roundedCircle
                  width={80}
                  height={80}
                  className="object-fit-cover"
                />
              </Col>
              <Col xs={12} md={10}>
                <p className="mb-2 fs-5">{t.text}</p>
                <div className="text-warning mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <div>
                  <strong>- {t.name}</strong>
                  <br />
                  <small className="text-muted">{t.title}</small>
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        ))}
        <NavigationButtons />
      </Swiper>
    </Container>
  );
};

export default TestimonialSlider;
