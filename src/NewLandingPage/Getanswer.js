import React , {useEffect} from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Smart from '../Assets/Images/get.png'
import RightArrow from "../Assets/Images/landingpageimages/bluearrow.png";


const Getanswer = () => {


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   let navigate = useNavigate();
    
      const handleSignIn = () => {
        navigate("/login-Page");
      };
    
      const handleSignUp = () => {
        navigate("/create-account");
      };


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



    return(
        <>
         <Container fluid className="d-flex align-items-center  justify-content-center mt-2 mb-5 pt-5" style={{height:'630px'}}>
                <Row className="w-100">
                  <Col lg={10} md={10} sm={12} xs={12} className="mx-auto">
                    <Card
                    className="text-center position-relative p-4 rounded-4"
                    style={{
                      maxWidth: "100%", 
                      width: "100%", 
                      minHeight: "500px",  // Increased height
                      backgroundColor: "rgba(30, 69, 225, 1)"
                    }}
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
                          className="px-3"
                          style={{ fontSize: "56px", marginTop:'50px' , fontWeight:700, color:'rgba(255, 255, 255, 1)' ,  fontFamily: "Montserrat",}}
                        >
                          Ready to Simplify Your <br></br>
                           PG Management?
                        </h1>
        
                      
                        <p    style={{ fontSize: "18px" , marginTop:'20px'  , fontWeight:400, color:'rgba(255, 255, 255, 1)' ,  fontFamily: "Montserrat",}}>
                          Join now and be part of a new era of PG management.
                        </p>
        
                       
                        <Button
                        onClick={handleSignUp}
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
                            fontFamily: "Montserrat",
                          }}
                        >
                          Get Started  <img src={RightArrow} alt="Arrow Icon" style={{ width: "15px", marginLeft:"10px"}} />
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
        </>
    )
}
export default Getanswer;
