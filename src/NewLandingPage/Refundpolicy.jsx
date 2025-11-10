import React, { useEffect } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";


function RefundPolicy() {
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
    <div
      className="text-justify"
      style={{ padding: "10px 150px 10px 110px", lineHeight: "1.6" }}
    >
      <h3 style={sectionHeaderStyle}>SmartStay Refund Policy</h3>

     
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>1. Overview</h4>
        <p style={paragraphStyle}>
          This Refund Policy explains the terms under which customers (“you,”
          “subscriber,” or “licensee”) may request a refund for payments made to
          S3 Remotica Technologies for the SmartStay SaaS product and related
          subscription services. By purchasing or renewing a SmartStay plan, you
          agree to this policy.
        </p>
      </section>

      
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>2. Free Trial and Evaluation</h4>
        <p style={paragraphStyle}>
          SmartStay offers a 1-month free trial (or as stated on our website).
          No charges apply during the free-trial period. Once your trial
          converts to a paid plan, the subscription fee becomes payable and the
          refund policy below applies.
        </p>
      </section>

      
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>3. Eligibility for Refunds</h4>

        <p style={paragraphStyle}>
          Refund requests are evaluated under the following conditions:
        </p>

        <p style={listStyle} className="ps-0">
          <b>1. Refund Window:   </b></p> 
          <p style={listStyle} className="ps-5">Requests must be raised within{" "}
          <span style={{ fontWeight: 600 }}>
            14 days of the original payment date.
          </span>
        </p> 

        <p style={listStyle} className="ps-0">
          <b>2. Valid Reasons for Refund:</b>
        </p>
        <ul style={listStyle} className="ps-5">
          <li>Duplicate payment due to technical error.</li>
          <li>
            Failure of SmartStay to deliver promised functionality or access
            (verified by our support team).
          </li>
          <li>
            System downtime exceeding 7 consecutive days, directly caused by
            SmartStay’s internal failure.
          </li>
          <li>Transaction charged but account not activated.</li>
        </ul>

        <p style={listStyle} className="ps-0">
          <b>3. Non-Refundable Cases:</b>
        </p>
        <ul style={listStyle} className="ps-5">
          <li>After the 14-day period from the date of payment.</li>
          <li>Change of mind, disinterest, or discontinuation of use.</li>
          <li>Partial-month usage of a subscription plan.</li>
          <li>
            Refund requests related to internet issues, third-party integration
            failures, or wrong configuration on the customer’s end.
          </li>
          <li>
            Payments made for{" "}
            <span style={{ fontWeight: 600 }}>
              custom integrations, setup fees, or add-ons.
            </span>
          </li>
        </ul>
      </section>

     
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>4. Subscription Cancellations</h4>
        <p style={paragraphStyle}>
          You may cancel your subscription at any time through the SmartStay
          Dashboard or by emailing{" "}
          <span style={{ fontWeight: 600 }}>cs@s3remotica.com</span>.
        </p>
        <ul style={listStyle}>
          <li>Cancellation stops future renewals; it does not automatically trigger a refund.</li>
          <li>Access continues until the end of the current billing cycle.</li>
        </ul>
      </section>


      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>5. Pro-Rata and Renewal Refunds</h4>
        <ul style={listStyle}>
          <li>
            Refunds for auto-renewal charges may be granted only if requested
            within 7 days of renewal and no significant usage has occurred
            post-renewal.
          </li>
          <li>
            Pro-rata refunds for unused months are not generally issued, except
            for major system failure acknowledged by S3 Remotica.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>6. Refund Process</h4>
        <p style={paragraphStyle}>
          <b>Request Submission:</b> Send an email to{" "}
          <span style={{ fontWeight: 600 }}>cs@s3remotica.com</span> within the
          applicable refund window. Include:
        </p>
        <ul style={listStyle}>
          <li>Registered email ID</li>
          <li>Payment ID or invoice number</li>
          <li>Date of payment</li>
          <li>Reason for refund</li>
        </ul>

        <p style={paragraphStyle}>
          <b>Verification:</b> Our finance team will review your request and
          account usage logs.
        </p>
        <p style={paragraphStyle}>
          <b>Processing Time:</b> Approved refunds will be initiated within 7
          business days and credited to the original payment method (UPI,
          Credit/Debit Card, or Net Banking).
        </p>
        <p style={paragraphStyle}>
          <b>Tax and Fee Adjustments:</b> Transaction processing fees (such as
          payment-gateway charges or GST) may be deducted from the refunded
          amount as per applicable Indian regulations.
        </p>
      </section>

     
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>7. Compliance with Indian Law</h4>
        <p style={paragraphStyle}>
          This policy follows:
        </p>
        <ul style={listStyle}>
          <li>Consumer Protection (E-Commerce) Rules 2020</li>
          <li>Information Technology Act 2000</li>
          <li>
            Reserve Bank of India (RBI) guidelines on payment processing and
            chargebacks
          </li>
        </ul>
        <p style={paragraphStyle}>
          S3 Remotica will cooperate with legitimate chargeback investigations
          initiated by your payment provider. However, false claims or misuse of
          chargebacks may lead to account suspension or legal action.
        </p>
      </section>

      
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>8. Exceptional Circumstances</h4>
        <p style={paragraphStyle}>
          S3 Remotica Technologies reserves the right to issue full or partial
          refunds outside the stated conditions in exceptional cases, such as
          verified fraudulent activity, unintentional duplicate billing, or
          service discontinuation by the company.
        </p>
      </section>

     
      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>9. Contact Information</h4>
        <p className="ps-0" style={listStyle}><b>Support & Refund Queries:</b></p>
        <ul style={listStyle}>
          <li>
              <MdEmail size={20} color="#333" /> cs@s3remotica.com
          </li>
          <li>
           <MdPhone size={20} color="#333" /> +91 8344715078 (10 AM – 7 PM, Mon–Sat)
          </li>
          <li>
            <MdLocationOn size={20} color="#333" /> S3 Remotica Technologies, 7/96, North Street, Athisayapuram, VK
            Pudur (PO) Tenkasi – 627861
          </li>
        </ul>
      </section>


      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>10. Governing Law & Jurisdiction</h4>
        <p style={paragraphStyle}>
          This Refund Policy shall be governed by and construed in accordance
          with the laws of India, and any disputes shall be subject to the
          exclusive jurisdiction of courts in Chennai, Tamil Nadu.
        </p>
      </section>


      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>11. Changes to This Policy</h4>
        <p style={paragraphStyle}>
          S3 Remotica Technologies may update this Refund Policy periodically.
          The latest version will always be available at{" "}
          <span style={{ fontWeight: 600 }}>
            smartstay.qbatz.com/refund-policy
          </span>{" "}
          or an equivalent URL.
        </p>
      </section>
    </div>
  );
}

export default RefundPolicy;
