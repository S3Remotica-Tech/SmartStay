import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import StartupImage from "../Assets/Images/landingpageimages/Clents.png";
import { Helmet } from "react-helmet-async";
const Startup = () => {
  return (
    <>
      <Helmet prioritizeSeoTags>
        <html lang="en-IN" />

        {/* Core SEO */}
        <title>SmartStay â€“ PG & Hostel Management Software</title>
        <meta
          name="description"
          content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool." />
        <link rel="canonical" href="https://smartstay.qbatz.com/" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SmartStay" />
        <meta property="og:title" content="SmartStay â€“ PG & Hostel Management Software" />
        <meta property="og:description" content="Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool." />
        <meta property="og:url" content="https://smartstay.qbatz.com/" />
        <meta property="og:image" content="https://smartstay.qbatz.com/assets/sm_homepage-CODs4gRc.png" />
        <meta property="og:image:alt" content="SmartStay dashboard showing hostel room availability and bed occupancy" />


        {/* Schema.org WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "SmartStay â€“ PG & Hostel Management Software",
            url: "https://smartstay.qbatz.com/",
            description:
              "Indiaâ€™s most trusted hostel software. SmartStay offers rent collection tools, tenant billing, PG booking system, and a complete hostel issue tracking tool.",
          })}
        </script>
      </Helmet>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
        <Row className="w-100">
          <Col className="d-flex justify-content-center">
            <img
              src={StartupImage}
              alt="SmartStay trusted by 100+ startups for hostel management software and PG booking platform"
              className="img-fluid"
              style={{ maxHeight: "100%", objectFit: "contain" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Startup;
