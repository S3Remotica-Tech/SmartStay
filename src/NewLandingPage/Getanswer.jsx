import React, { useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Smart from "../Assets/Images/get.png";
import RightArrow from "../Assets/Images/landingpageimages/bluearrow.png";

const Getanswer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/create-account");
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center mt-2 mb-5 pt-5">
      <Row className="w-100">
        <Col lg={10} md={10} sm={12} xs={12} className="mx-auto">
          <Card className="text-center position-relative p-4 rounded-4 shadow-lg"
            style={{
              maxWidth: "100%",
              width: "100%",
              minHeight: "450px",
              backgroundColor: "rgba(30, 69, 225, 1)",
            }}
          >
            <Card.Body>
              {/* Circles (Responsive Tweaks) */}
              <div className="position-absolute d-none d-md-block rounded-circle border border-white"
                style={{ width: "8vw", height: "8vw", top: "-5%", left: "-7%" }}
              ></div>
              <div className="position-absolute d-none d-md-block rounded-circle border border-white"
                style={{ width: "12vw", height: "12vw", top: "-10%", left: "-5%" }}
              ></div>

              <div className="position-absolute d-none d-md-block rounded-circle border border-white"
                style={{ width: "8vw", height: "8vw", bottom: "-5%", right: "-7%" }}
              ></div>
              <div className="position-absolute d-none d-md-block rounded-circle border border-white"
                style={{ width: "12vw", height: "12vw", bottom: "-10%", right: "-5%" }}
              ></div>

              {/* Logo and Title */}
              <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                <img src={Smart} alt="SmartStay hostel management software logo for PG and hostel booking platform" style={{ width: "40px" }} />
                <h5 className="text-white fw-bold m-0">Smartstay</h5>
              </div>

              <h1 className="px-3 fw-bold text-white"
                style={{
                  fontSize: "clamp(28px, 4vw, 50px)",
                  marginTop: "30px",
                  fontFamily: "Montserrat",
                }}
              >
                Ready to Simplify Your <br />
                PG Management?
              </h1>

              <p className="text-white mt-3"
                style={{
                  fontSize: "clamp(14px, 2vw, 18px)",
                  fontWeight: 400,
                  fontFamily: "Montserrat",
                }}
              >
                Join now and be part of a new era of PG management.
              </p>

              {/* Responsive Button */}
              <Button onClick={handleSignUp}
                className="mt-3 fw-bold"
                style={{
                  width: "clamp(140px, 50%, 220px)",
                  height: "clamp(40px, 5vw, 58px)",
                  color: "rgba(30, 69, 225, 1)",
                  borderRadius: "16px",
                  fontSize: "clamp(14px, 1.8vw, 18px)",
                  backgroundColor: "#FFF",
                  border: "none",
                  fontFamily: "Montserrat",
                }}
              >
                Get Started <img src={RightArrow} alt="Arrow Icon" style={{ width: "15px", marginLeft: "10px" }} />
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Getanswer;
