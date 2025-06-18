import React,{useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Error from "../Assets/Images/landingpageimages/i.png";
import Featurebtn from "../Assets/Images/landingpageimages/featurebtn.png";
import Featuregrrenbtn from "../Assets/Images/landingpageimages/featuregreenbtn.png";
import TopLeftCurve from "../Assets/Images/landingpageimages/topleftcurve.png";

const SubscriptionPlan = () => {
  const plans = [
    {
      title: "Suite Team",
      plan: "1 Month",
      price: "299",
      featuretitle:'Team Plan Features:', 
      features: [" Paying Guest", " Manage customers", " Manage Vendors" , " Asset Management" , " Invoice Management" , " Expenses Management"] ,
      btnText: "Buy Now",
    },
    {
      title: "Suite Professional",
      plan: "1 Month",
      price: "599",
      featuretitle:'Proffessional Plan Features:',
      features: [" Paying Guest", " Manage customers", " Manage Vendors" , " Asset Management" , " Invoice Management" , " Expenses Management"],
      btnText: "Buy Now",
    },
    {
      title: "Suite Growth",
      plan: "1 Year",
      price: "999",
      featuretitle:'Growth Plan Features:',
      features: [" Paying Guest", " Manage customers", " Manage Vendors" , " Asset Management" , " Invoice Management" , " Expenses Management"],
      btnText: "Buy Now",
    },
    {
        title: "Smartstay Service",
        plan: "1 Year",
        price: "9999",
        featuretitle:'Proffessional Plan Features:',
        features: [" Paying Guest", " Manage customers", " Manage Vendors" , " Asset Management" , " Invoice Management" , " Expenses Management"],
        btnText: "Buy Now",
      },
  ];



 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);











  
  return (

    <>

<div>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      background: "linear-gradient(135deg, #E2E6FF, #EFFCFF)",
      height: "400px",
      zIndex: 1,
      marginBottom: "400px",
      padding: "50px 15px",
      textAlign: "center",
    }}
  >
    <img
      src={TopLeftCurve}
      alt="Top Left Curve"
      className="position-absolute d-none d-md-block"
      style={{ top: "0", left: "0", width: "120px", zIndex: "1" }}
    />
    <h1
      style={{
        fontSize: "32px",
        fontWeight: 700,
        color: "rgba(9, 15, 41, 1)",
        fontFamily: "Montserrat",
      }}
    >
      Flexible Pricing to suit your needs
    </h1>
    <p
      style={{
        maxWidth: "90%",
        fontSize: "16px",
        fontWeight: 400,
        color: "rgba(71, 85, 105, 1)",
        fontFamily: "Montserrat",
        paddingLeft:100,
        paddingRight:170
      }}
    >
    Get more done with targeted and personalized rewarding experiences at a global scale. Plum offers AI-enabled rewards automation that runs on the largest global rewards marketplace. It delivers rewards experiences people love, available in over 100 countries.
    </p>
  </div>


  <Container fluid className="d-flex justify-content-center" style={{ zIndex: 4, position: "absolute", top: 270 }}>
    <Row className="justify-content-center w-100">
      {plans.map((plan, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card
            className="text-center p-3 pt-4 rounded-4 position-relative"
            style={{
              backgroundColor: "rgba(250, 252, 255, 1)",
              height: "auto",
              border:
                index === 2
                  ? "1px solid rgba(0, 153, 97, 1)"
                  : "1px solid rgba(188, 202, 235, 1)",
            }}
          >
            {index === 2 && (
              <div
                className="position-absolute top-0 start-50 translate-middle badge"
                style={{
                  backgroundColor: "rgba(0, 153, 97, 1)",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "700",
                  fontFamily: "Montserrat",
                  padding: "6px 12px",
                }}
              >
                Most Popular
              </div>
            )}

            <Card.Body>
              <h4
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "rgba(9, 15, 41, 1)",
                  fontFamily: "Montserrat",
                }}
              >
                {plan.title}
              </h4>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "rgba(9, 15, 41, 1)",
                  fontFamily: "Montserrat",
                }}
              >
                {plan.plan}
              </h3>
              <h3
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: "rgba(9, 15, 41, 1)",
                  fontFamily: "Montserrat",
                }}
              >
                ₹ {plan.price}
              </h3>
              <Button
                className="mt-3 rounded px-4 py-2 w-100"
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  fontFamily: "Montserrat",
                  color: index === 2 ? "white" : "rgba(30, 69, 225, 1)",
                  backgroundColor: index === 2 ? "rgba(30, 69, 225, 1)" : "white",
                  borderColor: "rgba(30, 69, 225, 1)",
                }}
              >
                {plan.btnText}
              </Button>

              <div className="text-start d-flex flex-column align-items-start mt-4">
                <h6
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "rgba(9, 15, 41, 1)",
                    fontFamily: "Montserrat",
                  }}
                >
                  {plan.featuretitle}
                </h6>
                <ul className="list-unstyled mt-3">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="d-flex align-items-center justify-content-start"
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "rgba(62, 79, 113, 1)",
                        fontFamily: "Montserrat",
                        paddingBottom: "10px",
                      }}
                    >
                      <img
                        src={Error}
                        alt="error"
                        className="me-2 flex-shrink-0"
                        style={{ width: "16px", height: "16px" }}
                      />
                      <span className="text-start">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <hr />

              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color:
                    index === 2
                      ? "rgba(0, 153, 97, 1)"
                      : "rgba(30, 69, 225, 1)",
                  fontFamily: "Montserrat",
                }}
              >
                See all features{" "}
                <img
                  src={index === 2 ? Featuregrrenbtn : Featurebtn}
                  alt="feat"
                  className="ms-2 flex-shrink-0"
                  style={{ width: "8px", height: "8px" }}
                />
              </p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>

 
</div>

    </>
   
  
  );
};

export default SubscriptionPlan;
