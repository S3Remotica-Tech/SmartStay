import React, { useEffect } from 'react';

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

function Condition() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='text-justify' style={{ padding: "10px 150px 10px 110px", lineHeight: "1.6" }}>
      <h3 style={sectionHeaderStyle}>
        Terms & Conditions
      </h3>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>
          LICENSE
        </h4>
        <p style={paragraphStyle}>
          SmartStay as a product is developed and maintained by S3 Remotica Technologies. S3 Remotica Technologies is registered as a Startup with the Department of Micro, Small and Medium Enterprises, Government of India under the Innovation Product Solutions category.
        </p>
        <p style={paragraphStyle}>
          Any use of the SmartStay logo is prohibited without prior approval from S3 Remotica Technologies.
        </p>
        <p style={paragraphStyle}>
          SmartStay applications and their source code are the property of S3 Remotica Technologies and are not distributable under any circumstances.
        </p>
        <p style={paragraphStyle}>
          SmartStay REST APIs are not for public use. A subscription is required to access SmartStay APIs.
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>
          Subscription & Payment
        </h4>
        <p style={paragraphStyle}>
          A signup and valid subscription are required to use SmartStay web and mobile applications.
        </p>
        <p style={paragraphStyle}>
          You authorize the SmartStay team to remind you via SMS, call, or notification if your subscription is close to expiration. You are required to renew your subscription well in advance before the expiry date to continue using uninterrupted services.
        </p>
        <p style={paragraphStyle}>
          S3 Remotica Technologies may provide you a 7-day grace period so that your customers are not affected. This grace period will be adjusted when you renew next time.
        </p>
        <p style={paragraphStyle}>
          You are free to change your subscription plans at any time. Any change to freemium or advertisement-supported plans will be effective from your next payment cycle.
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>
          Refunds
        </h4>
        <p style={paragraphStyle}>
          S3 Remotica Technologies will not refund the subscription fee paid for the plans.
        </p>
        <p style={paragraphStyle}>
          A failed transaction while paying online towards SmartStay will be settled by S3 Remotica Technologies within 7 working days and will be refunded to the original payment source.
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>
          Support
        </h4>
        <p style={paragraphStyle} className='text-justify'>
          Providing the best customer experience and technical solutions is the aim and responsibility of the SmartStay team, and we take it very seriously. We have integrated support options in all our applications, and our team is always here to help you. Based on your subscription, we will strive to provide the best support. For any emergency, don't hesitate to email us at <a href="mailto:support@s3remotica.com">support@s3remotica.com</a>.
        </p>
      </section>

      <section>
        <h4 style={sectionHeaderStyle}>
          Limitations of Liability
        </h4>
        <p style={paragraphStyle} className='text-justify'>
          Providing the best customer experience and technical solutions is the aim and responsibility of the SmartStay team, and we take it very seriously. We have integrated support options in all our applications, and our team is always here to help you. Based on your subscription, we will strive to provide the best support. For any emergency, don't hesitate to email us at <a href="mailto:support@s3remotica.com">support@s3remotica.com</a>.
        </p>
      </section>
    </div>
  );
}

export default Condition;
