import React,{useEffect}from 'react'

function Policy() {


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
    <div className='text-justify' style={{ padding: "10px 150px 10px 110px", lineHeight: "1.6" }}>
      <h3 style={sectionHeaderStyle}>
        Privacy Policy
      </h3>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>POLICY</h4>
        <p style={paragraphStyle}>
          S3 Remotica technologies built the SmartStay. This SERVICE is provided by S3 Remotica technologies at no cost to the end user and is intended for use as is
        </p>
        <p style={paragraphStyle}>
          This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.
        </p>
        <p style={paragraphStyle}>
          When you choose to use our Service, then you agree to the collection and use of information in relation to this policy. Personal Information collected is ONLY used for providing and improving the SmartStay Service. SmartStay will not use/share your information with anyone except as described in this Privacy Policy.
        </p>
        <p style={paragraphStyle}>
          The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible to Smartstay users unless otherwise defined in this Privacy Policy.
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>Information Collection and Use</h4>
        <p style={paragraphStyle}>
          SmartStay is used by Administrators of Private Hostels. The hostel administration needs identification data for a better experience & safety of other residents, while using our Service, they ask for the following data, however not all data is mandatory always.
        </p>
        <p style={paragraphStyle}>We may require you to provide us</p>
        <ul style={listStyle}>
          <li>with certain personally identifiable information, including but not limited to Name, mobile number, address, location (ONLY Limited For emergency support by your community).</li>
          <li>The information that we request will be retained by us and used as described in this privacy policy. At NO stage of business, we share or exchange your information to vendors or third parties.</li>
          <li>Resident's Profile image: For identification and mandated by all governments, these hostels may ask you to upload your profile image.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>Log Data -ERROR / Technical faults</h4>
        <p style={paragraphStyle}>
          We inform you that during use of our Service, in-case of an error in the app we collect data and information (through internal debugging solution) on your phone called Log Data. This is a worldwide acceptable & standard requirement for all technical/Software solutions.
        </p>
        <p style={paragraphStyle}>
          This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics. This information remains confidential always.
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h4 style={sectionHeaderStyle}>Security</h4>
        <p style={paragraphStyle}>
          We safeguard your Personal Information and use commercially acceptable means of protecting it. Force Majeure clause is applicable for circumstances unforeseen in commercial, natural distress/Disasters, and Government interventions.
        </p>
      </section>

      <section>
        <h4 style={sectionHeaderStyle}>Links to Other Sites</h4>
        <p style={paragraphStyle}>
          This Service may contain links to external sites. If you click on a third-party link, you will be redirected to that site/online services. External sites are not operated by us and we strongly advise you to review the Privacy Policy of these external vendor services. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
        <p style={paragraphStyle}>Smartstay does not share information with third-party/external websites.</p>
      </section>

      <section>
        <h4 style={sectionHeaderStyle}>Children’s Privacy</h4>
        <p style={paragraphStyle}>
          These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.
        </p>
      </section>

      <section>
        <h4 style={sectionHeaderStyle}>Changes to This Privacy Policy</h4>
        <p style={paragraphStyle}>
          We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
        </p>
      </section>

      <section>
        <h4 style={sectionHeaderStyle}>Contact Us</h4>
        <p style={paragraphStyle}>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@s3remotica.com.
        </p>
      </section>
    </div>
  
  )
}

export default Policy