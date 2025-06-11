import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StartupImage from "../Assets/Images/landingpageimages/Clents.png";

const Startup = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
      <Row className="w-100">
        <Col className="d-flex justify-content-center">
          <img
            src={StartupImage}
            alt="SmartStay trusted by 100+ startups for hostel management software and PG booking platform"
            className="img-fluid mt-5"
            style={{ maxHeight: "100%", objectFit: "contain" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Startup;
