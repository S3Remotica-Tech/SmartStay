import React,{useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";

const CookiesPolicy = () => {

 useEffect(() => {
        window.scrollTo(0, 0);
    }, []);








    
  const sectionHeaderStyle = {
    color: "#333",
    fontFamily: "Gilroy",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "1.6",
    marginBottom: "10px",
  };

  const paragraphStyle = {
    color: "#555",
    fontFamily: "Gilroy",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: "1.8",
    marginBottom: "10px",
  };

  const listStyle = {
    color: "#555",
    fontFamily: "Gilroy",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: "1.8",
    marginBottom: "10px",
    paddingLeft: "20px",
  };

  return (
    <Container style={{padding: "10px 150px 10px 110px"}} className="m-0">
      <Row>
        <Col>
          <h1 style={sectionHeaderStyle}>Cookies Policy</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>1. What Are Cookies?</h2>
          <p style={paragraphStyle}>
            Cookies are small text files stored on your device when you visit a
            website. They are used to improve your browsing experience by
            remembering preferences, enabling functionality, and analyzing
            usage patterns.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>2. Types of Cookies We Use</h2>

<p style={paragraphStyle}>We use the following types of cookies:
</p>

          <h3 style={sectionHeaderStyle}>2.1 Necessary Cookies</h3>
          <p style={paragraphStyle}>
            These cookies are essential for the operation of our platform.
            Without them, certain functionalities may not work.
          </p>
          <h3 style={sectionHeaderStyle}>2.2 Functional Cookies</h3>
          <p style={paragraphStyle}>
            These cookies enable enhanced functionality, such as remembering
            your preferences or login details.
          </p>
          <h3 style={sectionHeaderStyle}>2.3 Analytical Cookies</h3>
          <p style={paragraphStyle}>
            These cookies collect information about how users interact with the
            platform, helping us improve its performance. For example:
          </p>
          <div>
          <ul style={listStyle}>
            <li>Tracking the number of visitors</li>
            <li>Monitoring popular features</li>
          </ul>
          </div>
          <h3 style={sectionHeaderStyle}>2.4 Advertising Cookies</h3>
          <p style={paragraphStyle}>
            These cookies are used to deliver relevant ads and track the
            effectiveness of advertising campaigns.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>3. How We Use Cookies</h2>
          <p style={paragraphStyle}>
            We use cookies to: </p>
            <ul style={listStyle}>
              <li>Recognize your device and improve your user experience.</li>
              <li>Remember your preferences, such as language or region settings.</li>
              <li>Analyze platform usage to identify areas for improvement.</li>
              <li>Deliver personalized content and advertisements.</li>
            </ul>
         
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>4. Managing Cookies</h2>
          <p style={paragraphStyle}>You can control or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our platform.
          </p>
          <h3 style={sectionHeaderStyle}>4.1 Browser Settings</h3>
          <p style={paragraphStyle}>
            Most browsers allow you to manage cookies by:   </p>
            <ul style={listStyle}>
              <li>Blocking all cookies</li>
              <li>Deleting specific cookies</li>
              <li>Setting preferences for certain websites</li>
            </ul>
       
          <h3 style={sectionHeaderStyle}>4.2 Opt-Out Tools</h3>
          <p style={paragraphStyle}>
            For analytics cookies, you can use opt-out tools provided by
            services like Google Analytics.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>5. Third-Party Cookies</h2>
          <p style={paragraphStyle}>
            We may allow third-party service providers to set cookies on our
            platform. These third parties may use cookies to:  </p>
            <ul style={listStyle}>
              <li>Deliver targeted advertisements</li>
              <li>Measure ad performance</li>
              <li>Provide analytical services</li>
            </ul>
            <p style={paragraphStyle}>We encourage you to review the privacy policies of these third-party providers.</p>
           
        
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>6. Updates to This Policy</h2>
          <p style={paragraphStyle}>
            We may update this Cookies Policy to reflect changes in technology
            or legal requirements. Updates will be posted on this page with an
            updated 1.1.2025.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 style={sectionHeaderStyle}>7. Contact Us</h2>
          <p style={paragraphStyle}>
            If you have any questions about this Cookies Policy, please contact
            us:
          </p>
          <p style={paragraphStyle}>
            <strong>QbatzClay (Owned by S3 Remotica Technologies)</strong>
          </p>
          <p style={paragraphStyle}>Email: support@s3remotica.com</p>
          <p style={paragraphStyle}>Phone: +91 8344715078</p>
          <p style={paragraphStyle}>
            Address: 7/96, North Street, Athisayapuram, VK Pudur (PO) Tenkasi –
            627861
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default CookiesPolicy;
