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
    <Container fluid className="d-flex align-items-center justify-content-center mt-2 mb-5 pt-2">
      <Row className="w-100">
        <Col lg={10} md={10} sm={12} xs={12} className="mx-auto">
          <Card className="text-center position-relative p-4 rounded-4 shadow-lg"
            style={{
              maxWidth: "100%",
              width: "100%",
              minHeight: "450px",
              backgroundColor: "rgba(30, 69, 225, 1)",
              overflow:"hidden"
            }}
          >
            <Card.Body>
                       <div
                  className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 150, height: 100, borderRadius: 90, position: "absolute", top: -20, left: -100 }}

                ></div>
                <div
                  className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 200, height: 200, borderRadius: 70, position: "absolute", top: -80, left: -100 }}
                ></div>


                <div
                  className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 150, height: 100, borderRadius: 90, position: "absolute", bottom: -20, right: -100 }}
                ></div>

                <div className="position-absolute d-none d-md-block"
                  style={{ border: "1px solid rgba(255, 255, 255, 1)", width: 200, height: 200, borderRadius: 70, position: "absolute", bottom: -80, right: -100 }}>

                </div>

          
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
