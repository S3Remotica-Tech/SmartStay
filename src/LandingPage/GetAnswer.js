import React, { useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card';
import Smart from '../Assets/Images/get.png'
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function GetAnswer() {


  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className='mt-3 mb-3'>

      <div className='d-flex justify-content-center mt-3 mb-5'>
        <label style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: 60, lineHeight: "72px" }}>Get answers to some <span style={{ color: "rgba(30, 69, 225, 1)" }}>FAQs</span></label>
      </div>

      <div className='d-flex justify-content-center  mb-5'>
        <label style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: 18, color: "rgba(34, 34, 34, 1)" }}>Take a look at our most Frequently Asked Questions</label>
      </div>
      <div className="row mb-5">
        <div className="col-lg-8 offset-lg-2 col-md-12 col-xs-12 col-sm-12 fade-in">
          <Accordion
            style={{
              border: "1px solid rgba(30, 69, 225, 1)",
              borderRadius: 20,
              padding: "16px",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Accordion.Item
                eventKey={index.toString()}
                key={index}
                style={{
                  border: "none",
                  borderBottom:
                    index !== 5 ? "1px solid rgba(220, 220, 220, 1)" : "none",
                }}
              >
                <Accordion.Header
                  style={{
                    boxShadow: "none", fontFamily: "Gilroy", fontWeight: 600, fontSize: 20, lineHeight: "32px", color: '#000000'
                  }}
                >
                  The blue whale is the biggest animal to have ever lived
                </Accordion.Header>
                <Accordion.Body
                  style={{
                    boxShadow: "none", fontFamily: "Gilroy", fontWeight: 600, fontSize: 20
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>


  

      <Container fluid className="d-flex justify-content-center mt-2 mb-5">
        <Row className="w-100">
          <Col lg={8} md={10} sm={12} xs={12} className="mx-auto">
            <Card
              className="text-center position-relative p-4 bg-primary rounded-4"
              style={{ maxWidth: 1000, width: "100%" }}
            >
              <Card.Body>
           
                <div
                  className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 150, height: 100, borderRadius: 70, position: "absolute", top: -20, left: -100 }}

                ></div>
                <div
                  className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 200, height: 200, borderRadius: 70, position: "absolute", top: -80, left: -100 }}
                ></div>


                <div
                  className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 150, height: 100, borderRadius: 70, position: "absolute", bottom: -20, right: -100 }}
                ></div>

                <div className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 200, height: 200, borderRadius: 70, position: "absolute", bottom: -80, right: -100 }}>

                </div>
               
                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                  <img src={Smart} alt="smartstay" style={{ width: "40px" }} />
                  <h5 className="text-white fw-bold m-0">Smartstay</h5>
                </div>

              
                <h1
                  className="text-white fw-bold px-3"
                  style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
                >
                  Ready to Simplify Your PG Management?
                </h1>

              
                <p className="text-white fs-5 px-3">
                  Join now and be part of a new era of PG management.
                </p>

               
                <Button
                  className="px-4 py-3 mt-3"
                  style={{
                    width: "clamp(150px, 50%, 250px)",
                    height: "clamp(48px, 5vw, 62px)",
                    color: "rgba(30, 69, 225, 1)",
                    borderRadius: 16,
                    fontSize: "clamp(14px, 2vw, 18px)",
                    fontWeight: 600,
                    backgroundColor: "#FFF",
                    border: "none",
                  }}
                >
                  Get Started
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>




    </div>
  )
}

export default GetAnswer