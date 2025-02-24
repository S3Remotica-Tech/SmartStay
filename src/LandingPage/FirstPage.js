import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Desktop from '../Assets/Images/New_images/home_dashboardimage.png'
import Spring1 from '../Assets/Images/New_images/spring_left.png'
import Spring2 from '../Assets/Images/New_images/spring_right.png';
import { useNavigate } from "react-router-dom";
import CountUp from 'react-countup';

function FirstPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  let navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/create-account')
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });






  return (
    <>


      <div style={{ backgroundColor: "#FFFFFF", height: "", paddingTop: 40, width: "100%" }} className='container animated-text'>

        <div className='d-flex justify-content-center align-items-center' style={{ textAlign: 'center' }}>
          <label>👋   <span style={{ fontFamily: "Montserrat", color: "rgba(0, 0, 0, 1)", fontWeight: 600, fontSize: 18, lineHeight: "28.8px" }}>MANAGE YOUR PG</span></label>

        </div>
        <div className='d-flex justify-content-center align-items-center pb-3' style={{ textAlign: 'center', wordSpacing: 1 }}>
          <label style={{ fontSize: isMobile ? 40 : 70, wordSpacing: 1 }}>
            <span style={{ fontFamily: "Gilroy", color: "rgba(30, 69, 225, 1)", fontWeight: 600 }}>Simplify </span>
            <span style={{ fontWeight: 300, fontFamily: "Gilroy" }}>your </span>{''}
            <span style={{ fontFamily: "Gilroy", color: "rgba(0, 0, 0, 1)", fontWeight: 500 }}>Paying Guest management </span>
            <span style={{ fontWeight: 300, fontFamily: "Gilroy" }}>with </span>
            <span style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>SmartStay</span>
          </label>
        </div>

        <div className='d-flex justify-content-center mb-1' style={{ paddingTop: "36px" }} >
          <label style={{ fontWeight: 400, fontSize: 18, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat", textAlign: "center" }}>Efficiently manage rooms, customers, inventory, vendors,
          </label>
        </div>
        <div className='d-flex justify-content-center mb-1 '>
          <label style={{ fontWeight: 400, fontSize: 18, color: "rgba(0, 0, 0, 1)", fontFamily: "Montserrat", textAlign: "center" }}>complaints, expenses, and reports—all in one place.</label>

        </div>


        <div className='d-flex justify-content-center mt-3 ' style={{ paddingTop: "24px" }}>
          <Button onClick={handleStartNow} variant="" style={{ backgroundColor: "rgba(30, 69, 225, 1)", color: "rgba(255, 255, 255, 1)", fontWeight: 600, fontSize: 16, fontFamily: "Montserrat", width: 320, height: 70, borderRadius: 16, padding: "24px 53px 24px 53px" }}>Get Started</Button>

        </div>










      </div>
      <div className='row d-flex justify-content-center mt-4' style={{ position: "relative", backgroundColor: "" }}>
        <img src={Desktop} className='img-fluid' style={{ height: 776, width: 1000 }} />
        <img src={Spring1}
          style={{
            position: "absolute",
            left: 0,
            top: "90%",
            transform: "translateY(-50%) rotate(360deg)",
            width: 220,
            height: 219,
            display: isMobile ? "none" : "flex"
          }}
        />
        <img
          src={Spring2}
          style={{
            position: "absolute",
            top: "-5%",
            right: 0,
            width: 220,
            height: 219,
            display: isMobile ? "none" : "flex"
          }}
        />
      </div>

      <div className="d-flex justify-content-around flex-wrap mt-5 mb-5" style={{ backgroundColor: "rgba(250, 249, 255, 1)", padding: "42px 10px 42px 10px" }}>

        <div className='text-center'>
          <div style={{ fontSize: 60, fontWeight: 800, fontFamily: "Montserrat", color: "rgba(30, 69, 225, 1)" }}> <CountUp start={1} end={200} delay={2} />K</div>
          <div style={{ fontSize: 18, fontWeight: 400, fontFamily: "Montserrat", color: "rgba(0, 0, 0, 1)" }}>Users use this platform</div>
        </div>

        <div className='text-center'>
          <div style={{ fontSize: 60, fontWeight: 800, fontFamily: "Montserrat", color: "rgba(30, 69, 225, 1)" }}><CountUp start={1} end={30} delay={2} />K+</div>
          <div style={{ fontSize: 18, fontWeight: 400, fontFamily: "Montserrat", color: "rgba(0, 0, 0, 1)" }}>Active users this month</div>
        </div>
        <div className='text-center'>
          <div style={{ fontSize: 60, fontWeight: 800, fontFamily: "Montserrat", color: "rgba(30, 69, 225, 1)" }}><CountUp start={1} end={25} delay={2} />K+</div>
          <div style={{ fontSize: 18, fontWeight: 400, fontFamily: "Montserrat", color: "rgba(0, 0, 0, 1)" }}>Available states</div>
        </div>
      </div>
    </>
  )
}

export default FirstPage