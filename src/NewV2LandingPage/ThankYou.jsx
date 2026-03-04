import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="text-center">
        <Col>
          <img
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Success"
            width="120"
            className="mb-4"
          />
          <h2>Thank You for Booking with SmartStay!</h2>
          <p className="lead mt-3 mb-4">
            We’ve received your booking and will get in touch with you shortly.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ThankYou;
