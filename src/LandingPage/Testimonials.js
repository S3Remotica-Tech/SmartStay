// import React, {useEffect} from 'react';
// import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/lib/styles.css';
// import Image1 from '../Assets/Images/New_images/Anil Kumar.png'
// import Image2 from '../Assets/Images/profile/Akshey kumar.jpg'
// import Image3 from '../Assets/Images/profile/Akash kumar.jpg';
// import {QuoteUp,QuoteDown} from 'iconsax-react';
// import Image from 'react-bootstrap/Image';
// import './Testimo.css'




// const MyCarousel = () => {

//  useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);


//   const options = {
//     items: 1,
//     nav: true,
//     dots: false,
//     loop: true,
//     dotsClass: 'owl-dots',
//     dotClass: 'owl-dot-webDevelop',
//        autoplay: false,
//     autoplayTimeout: 3000,
//     navText: ["<span class='owl-prev-icon'></span>", "<span class='owl-next-icon'></span>"],
//     responsive: {
//       0: {
//         items: 1
//       },
//       600: {
//         items: 1
//       },
//       1000: {
//         items: 1
//       }
//     }
    
//   };


//   const images = [
//     { src: Image1, name: "Anil Kumar", title: "Lead AI Designer at Google", text: 'Lorem ipsum dolor sit amet consectetur. Vulputate integer fermentum libero aliquet ut fermentum. Egestas semper iaculis mattis neque facilisis vitae. Consectetur in non faucibus nunc in. Ullamcorper facilisis aliquam eget ornare bibendum at. Eu etiam at aliquam aliquet nisl arcu. Phasellus justo velit mauris quam rhoncus tristique. Morbi sit ac morbi arcu eros. Eget cursus sed elementum morbi. Semper quam interdum sollicitudin tortor in neque commodo. Tempus consequat aenean pellentesque erat gravida massa amet.', style: { height: 100, width: 100 } },
//     { src: Image2, name: "Akshay Kumar", title: "Lead AI Designer at Google", text: 'Lorem ipsum dolor sit amet consectetur. Vulputate integer fermentum libero aliquet ut fermentum. Egestas semper iaculis mattis neque facilisis vitae. Consectetur in non faucibus nunc in. Ullamcorper facilisis aliquam eget ornare bibendum at. Eu etiam at aliquam aliquet nisl arcu. Phasellus justo velit mauris quam rhoncus tristique. Morbi sit ac morbi arcu eros. Eget cursus sed elementum morbi. Semper quam interdum sollicitudin tortor in neque commodo. Tempus consequat aenean pellentesque erat gravida massa amet.', style: { height: 100, width: 100 } },
//     { src: Image3, name: "Akash Kumar", title: "Lead AI Designer at Google", text: 'Lorem ipsum dolor sit amet consectetur. Vulputate integer fermentum libero aliquet ut fermentum. Egestas semper iaculis mattis neque facilisis vitae. Consectetur in non faucibus nunc in. Ullamcorper facilisis aliquam eget ornare bibendum at. Eu etiam at aliquam aliquet nisl arcu. Phasellus justo velit mauris quam rhoncus tristique. Morbi sit ac morbi arcu eros. Eget cursus sed elementum morbi. Semper quam interdum sollicitudin tortor in neque commodo. Tempus consequat aenean pellentesque erat gravida massa amet.', style: { height: 100, width: 100 } }
//   ];

//   return (
//   <>

//     <div className='d-flex justify-content-center mt-5 mb-2'>
//       <label style={{ fontWeight: 700, fontSize: 56, fontFamily: "Gilroy" }}>Customer Testimonials</label>
//     </div>


// <div className='row mb-5' >
// <div className='col-lg-10 offset-lg-1  col-sm-10 col-xs-10 custom-owl-carousel'>
//     <OwlCarousel className="owl-carousel" options={options} style={{position:"relative",backgroundColor:"rgba(231, 241, 255, 1)", paddingTop:40, borderRadius:32}}>
//       {images.map((image, index) => (
//         <div key={index}>

//           <div className='d-flex justify-content-center' style={{ paddingLeft: 150, paddingRight: 150 }}>
//             <div style={{backgroundColor:""}}>
//             <QuoteUp
//               size="40"
//               color="#1E45E1"
//               variant="Bold"
//             />
//             </div>
           
//             <div style={{fontSize:24, fontFamily:"Gilroy", fontWeight:500,margin: '0 20px',backgroundColor:""}} className='text-center'>
//             {image.text}
//               </div>
//               <div style={{backgroundColor:""}} className='d-flex flex-column justify-content-end'><QuoteDown  size="40" color="#1E45E1" variant="Bold" /></div>
            
//           </div>
//           <div className='d-flex justify-content-center align-items-center text-justify p-3'>

//             <Image src={image.src} style={image.style} roundedCircle />
//             <div className='ps-2'>
//               <div style={{fontSize:24, fontFamily:"Montserrat", fontWeight:700, color:"rgba(30, 69, 225, 1)"}}>{image.name}</div>
//               <div style={{fontSize:24, fontFamily:"Montserrat", fontWeight:700}}>{image.title}</div>
//             </div>
//           </div>

//         </div>
//       ))}
  

// </OwlCarousel>
//     </div>
// </div>
//   </>
//   );
// };

// export default MyCarousel;

import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import Image1 from "../Assets/Images/New_images/Anil Kumar.png";
import Image2 from "../Assets/Images/profile/Akshey kumar.jpg";
import Image3 from "../Assets/Images/profile/Akash kumar.jpg";
import { QuoteUp, QuoteDown } from "iconsax-react";
import Image from "react-bootstrap/Image";
import "./Testimo.css";

const MyCarousel = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const options = {
    items: 1,
    nav: true,
    dots: false,
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    navText: [
      "<span class='owl-prev-icon'></span>",
      "<span class='owl-next-icon'></span>",
    ],
    responsive: {
      0: {
        items: 1,
        nav: false, // Hide navigation arrows on very small screens
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  const testimonials = [
    {
      src: Image1,
      name: "Anil Kumar",
      title: "Lead AI Designer at Google",
      text: "Lorem ipsum dolor sit amet consectetur. Vulputate integer fermentum libero aliquet ut fermentum. Egestas semper iaculis mattis neque facilisis vitae. Consectetur in non faucibus nunc in. Ullamcorper facilisis aliquam eget ornare bibendum at. Eu etiam at aliquam aliquet nisl arcu. Phasellus justo velit mauris quam rhoncus tristique. Morbi sit ac morbi arcu eros. Eget cursus sed elementum morbi. Semper quam interdum sollicitudin tortor in neque commodo. Tempus consequat aenean pellentesque erat gravida massa amet",
    },
    {
      src: Image2,
      name: "Akshay Kumar",
      title: "Lead AI Designer at Google",
      text: "Lorem ipsum dolor sit amet consectetur. Vulputate integer fermentum libero aliquet ut fermentum. Egestas semper iaculis mattis neque facilisis vitae. Consectetur in non faucibus nunc in. Ullamcorper facilisis aliquam eget ornare bibendum at. Eu etiam at aliquam aliquet nisl arcu. Phasellus justo velit mauris quam rhoncus tristique. Morbi sit ac morbi arcu eros. Eget cursus sed elementum morbi. Semper quam interdum sollicitudin tortor in neque commodo. Tempus consequat aenean pellentesque erat gravida massa amet",
    },
    {
      src: Image3,
      name: "Akash Kumar",
      title: "Lead AI Designer at Google",
      text: "Lorem ipsum dolor sit amet consectetur. Vulputate integer fermentum libero aliquet ut fermentum. Egestas semper iaculis mattis neque facilisis vitae. Consectetur in non faucibus nunc in. Ullamcorper facilisis aliquam eget ornare bibendum at. Eu etiam at aliquam aliquet nisl arcu. Phasellus justo velit mauris quam rhoncus tristique. Morbi sit ac morbi arcu eros. Eget cursus sed elementum morbi. Semper quam interdum sollicitudin tortor in neque commodo. Tempus consequat aenean pellentesque erat gravida massa amet",
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-center mt-5 mb-3">
        <label
          className="text-center fw-bold"
          style={{
            fontSize: "clamp(28px, 5vw, 56px)",
            fontFamily: "Gilroy",
          }}
        >
          Customer Testimonials
        </label>
      </div>

      <div className="row mb-5">
        <div className="col-lg-10 offset-lg-1 col-sm-12 custom-owl-carousel">
          <OwlCarousel
            className="owl-carousel"
            options={options}
            style={{
              position: "relative",
              backgroundColor: "rgba(231, 241, 255, 1)",
              padding: "40px 5%",
              borderRadius: "32px",
            }}
          >
            {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
            {/* Quote and Text */}
            <div className="d-flex flex-column align-items-center">
              <p
                className="text-center px-3"
                style={{
                  fontSize: "clamp(16px, 2vw, 24px)",
                  fontWeight: 500,
                  maxWidth: "80%",
                  position: "relative",
                }}
              >
                {/* Quote at Start */}
                <QuoteUp
                  size={30}
                  color="#1E45E1"
                  variant="Bold"
                  style={{ position: "absolute", top: "-5px", left: "-20px" }}
                />
                
                {testimonial.text}
          
                {/* Quote at End */}
                <QuoteDown
                  size={30}
                  color="#1E45E1"
                  variant="Bold"
                  style={{ position: "absolute", bottom: "-10px", right: "-20px" }}
                />
              </p>
            </div>
          
            {/* Profile */}
            <div className="d-flex justify-content-center align-items-center mt-3">
              <Image
                src={testimonial.src}
                roundedCircle
                style={{
                  width: "clamp(60px, 10vw, 100px)",
                  height: "clamp(60px, 10vw, 100px)",
                }}
              />
              <div className="ps-2 text-start">
                <div
                  className="fw-bold"
                  style={{
                    fontSize: "clamp(18px, 2vw, 24px)",
                    color: "rgba(30, 69, 225, 1)",
                  }}
                >
                  {testimonial.name}
                </div>
                <div
                  className="fw-semibold"
                  style={{
                    fontSize: "clamp(14px, 1.8vw, 20px)",
                  }}
                >
                  {testimonial.title}
                </div>
              </div>
            </div>
          </div>
          
            ))}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
};

export default MyCarousel;
