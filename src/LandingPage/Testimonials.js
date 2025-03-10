import React, { useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import Image1 from "../Assets/Images/New_images/Anil Kumar.png";
import Image2 from "../Assets/Images/profile/Akshey kumar.jpg";
import Image3 from "../Assets/Images/profile/Akash kumar.jpg";
import { QuoteUp, QuoteDown } from "iconsax-react";
import Image from "react-bootstrap/Image";

const MyCarousel = () => {
  const owlRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const options = {
    items: 1,
    nav: false,
    dots: false,
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
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
    <div style={{ width: "100%", textAlign: "center", padding: "40px 0" }}>
      <h2
        style={{
          fontSize: "clamp(28px, 5vw, 56px)",
          fontWeight: "bold",
          fontFamily: "Gilroy",
        }}
      >
        Customer Testimonials
      </h2>

      <div
        style={{
          maxWidth: "90%",
          margin: "0 auto",
          position: "relative",
          backgroundColor: "rgba(231, 241, 255, 1)",
          padding: "40px 5%",
          borderRadius: "32px",
        }}
      >
        {/* Previous Button - Inside Container */}
        <button
          onClick={() => owlRef.current.prev()}
          style={{
            position: "absolute",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "clamp(40px, 4vw, 50px)",
            height: "clamp(40px, 4vw, 50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ❮
        </button>

        <OwlCarousel ref={owlRef} options={options}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 24px)",
                  fontWeight: 500,
                  maxWidth: "80%",
                  margin: "0 auto",
                  position: "relative",
                }}
              >
                <QuoteUp
                  size={30}
                  color="#1E45E1"
                  variant="Bold"
                  style={{ position: "absolute", left: "-20px", top: "-5px" }}
                />
                {testimonial.text}
                <QuoteDown
                  size={30}
                  color="#1E45E1"
                  variant="Bold"
                  style={{ position: "absolute", right: "-20px", bottom: "-10px" }}
                />
              </p>

              {/* Profile */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Image
                  src={testimonial.src}
                  roundedCircle
                  style={{
                    width: "clamp(60px, 10vw, 100px)",
                    height: "clamp(60px, 10vw, 100px)",
                    marginRight: "10px",
                  }}
                />
                <div style={{ textAlign: "left" }}>
                  <div
                    style={{
                      fontSize: "clamp(18px, 2vw, 24px)",
                      fontWeight: "bold",
                      color: "rgba(30, 69, 225, 1)",
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(14px, 1.8vw, 20px)",
                      fontWeight: "500",
                    }}
                  >
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>

        {/* Next Button - Inside Container */}
        <button
          onClick={() => owlRef.current.next()}
          style={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "50%",
            width: "clamp(40px, 4vw, 50px)",
            height: "clamp(40px, 4vw, 50px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default MyCarousel;

