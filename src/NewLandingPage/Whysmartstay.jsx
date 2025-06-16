import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Plus from "../Assets/Images/landingpageimages/Plus.png";

const SmartStaySection = () => {
  return (
    <Container fluid className="text-white py-5" style={{ backgroundColor: "#090F29", marginBottom: 40, position: "relative", overflow: "visible" }}>
   
   
             <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -300, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -285, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -270, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -255, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -240, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -225, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", left: -70, top: -210, transform: "rotate(320deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -270, transform: "rotate(130deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -255, transform: "rotate(130deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -240, transform: "rotate(130deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -225, transform: "rotate(130deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -210, transform: "rotate(130deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -195, transform: "rotate(130deg)", borderRadius: 8 }}></div>
            <div style={{ backgroundColor: "#ffffff", zIndex: 0, opacity: 0.1, height: 550, width: 4, position: "absolute", right: 0, bottom: -180, transform: "rotate(130deg)", borderRadius: 8 }}></div>

   
      <Container>
        <Row className="align-items-center">

          <Col lg={6} className="mb-4 mb-lg-0 p-0" style={{ zIndex: 4, backgroundColor: "#090F29", overflow: "visible", }}>

  



            <h2 className="fw-bold mb-3" style={{ backgroundColor: "#090F29", fontSize: "34px", fontFamily: "Montserrat, sans-serif", fontWeight: 700, zIndex: 4 }}>
              Why SmartStay?
            </h2>

            <p className="text-light" style={{ backgroundColor: "#090F29", zIndex: 4, fontSize: "16px", fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}>
              Efficiently manage rooms, customers, inventory, vendors, complaints, expenses, and reports—all in one place.<br></br>
              Get Started
            </p>
            <ul className="list-unstyled" style={{ zIndex: 4, backgroundColor: "#090F29" }}>
              {[
                { title: "Efficiency", description: "Automate routine tasks and save time." },
                { title: "Visibility", description: "Gain insights with real-time data and analytics." },
                { title: "Scalability", description: "Scale effortlessly as your business grows." },
                { title: "User-Friendly", description: "Intuitive interface designed for ease of use." },
                { title: "Customer Support 24/7", description: "24/7 customer support to assist you at every step." },
              ].map((feature, index) => (
                <li key={index} className="mb-3">
                  <div className="d-flex align-items-center">
                    <span className="text-primary fw-bold me-2"
                    ><img src={Plus} alt="plusimage" /></span>
                    <strong
                      style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: "18px" }}>{feature.title}</strong>
                  </div>
                  <span className=""
                    style={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: "14px", paddingLeft: "22px" }}>{feature.description}</span>
                </li>
              ))}
            </ul>

          </Col>


          <Col lg={6} className="mb-4 mb-lg-0 p-0" style={{ zIndex: 4, backgroundColor: "#090F29", overflow: "visible", }}>
            <div className="bg-white p-4 rounded-lg shadow-lg"
              style={{ borderRadius: "20px" }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="PG Name" required
                    style={{ background: "rgba(246, 247, 249, 1)", fontFamily: 'Montserrat', fontWeight: 500, fontSize: "16px", padding: '10px' }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Full Name" required
                    style={{ background: "rgba(246, 247, 249, 1)", fontFamily: 'Montserrat', fontWeight: 500, fontSize: "16px", padding: '10px' }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Email" required
                    style={{ background: "rgba(246, 247, 249, 1)", fontFamily: 'Montserrat', fontWeight: 500, fontSize: "16px", padding: '10px' }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="tel" placeholder="+91" required
                    style={{ background: "rgba(246, 247, 249, 1)", fontFamily: 'Montserrat', fontWeight: 500, fontSize: "16px", padding: '10px' }} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control as="textarea" rows={3} placeholder="Tell us more about your requirements"
                    style={{ background: "rgba(246, 247, 249, 1)", fontFamily: 'Montserrat', fontWeight: 500, fontSize: "16px", padding: '10px' }} />
                </Form.Group>
                <Button className="w-100 fw-bold"
                  style={{ fontSize: "16px", fontFamily: 'Montserrat', fontWeight: 700, background: '#1E45E1', padding: '10px' }}>
                  BOOK A DEMO
                </Button>
              </Form>
              <p className="text-start  mt-3" style={{ fontSize: "12px", color: 'rgba(104, 108, 157, 1)', fontFamily: 'Montserrat', fontWeight: 400 }}>
                Ready to simplify your PG Management? Join now and be part of a new era of PG management.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SmartStaySection;