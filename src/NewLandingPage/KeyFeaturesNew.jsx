import React,{useState,useRef} from "react";
import Frame from "../Assets/Images/landingpageimages/formImg.png";
import Backgrey from "../Assets/Images/landingpageimages/backgrey.png";
import Group from "../Assets/Images/landingpageimages/grupcard.png";
import Form2 from "../Assets/Images/landingpageimages/form2.png";
import Backblue from "../Assets/Images/landingpageimages/nature_blue.png";
import form3 from "../Assets/Images/landingpageimages/form3.png";
import shield from "../Assets/Images/landingpageimages/shieldactive.png";
import mesaageactive from "../Assets/Images/landingpageimages/mesaageactive.png";
import mesaageInactive from "../Assets/Images/landingpageimages/message-inactive.png";
import activerepeat from "../Assets/Images/landingpageimages/activerepeat.png";
import Inactiverepeat from "../Assets/Images/landingpageimages/repeatInactive.png";
import cardactive from "../Assets/Images/landingpageimages/card-tick active.png";
import cardInactive from "../Assets/Images/landingpageimages/card-tickinactive.png";
import documentactive from "../Assets/Images/landingpageimages/documentactive.png";
import documentInactive from "../Assets/Images/landingpageimages/document-inactive.png";
import shieldinactive from "../Assets/Images/landingpageimages/shield-tickblue.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./KeyFeaturesNew.css";
import tenantform from "../Assets/Images/landingpageimages/tenantform.png";
import Backtenant from "../Assets/Images/landingpageimages/tenantback.png";
import Notification from "../Assets/Images/landingpageimages/Notification.png";
import recureForm from "../Assets/Images/landingpageimages/recureForm.png";
import recureBack from "../Assets/Images/landingpageimages/recureback.png";
import recureCard from "../Assets/Images/landingpageimages/recureCard.png";
import paymentForm from "../Assets/Images/landingpageimages/frampayment.png";
import Backpayment from "../Assets/Images/landingpageimages/paymentnature.png";
import paymentCard from "../Assets/Images/landingpageimages/paymentsuccess.png";
import iconpng from "../Assets/Images/landingpageimages/Icon.png";
import line from "../Assets/Images/landingpageimages/line.png";
import TopCurve from "../Assets/Images/landingpageimages/topleftcurve.png";




const KeyFeaturesNew = () => {
  const [activeSection, setActiveSection] = useState("kyc");
    const [animate, setAnimate] = useState(false);


const kycRef = useRef(null);
const esignRef = useRef(null);
const paymentRef = useRef(null)
const tenentRef = useRef(null)
const recureRef = useRef(null)

 
 


const handleFeatureClick = (section) => {
  setActiveSection(section);
   setAnimate(false);
      setTimeout(() => setAnimate(true), 10);

 
  const el = document.querySelector(`[data-feature="${section}"]`);
  if (el) {
    console.log("Before animation:", el); 
    el.classList.remove("clicked");       
    void el.offsetWidth;                  
    el.classList.add("clicked");           
    setTimeout(() => el.classList.remove("clicked"), 200); 
  }

 
  let ref = null;
  if (section === "kyc") ref = kycRef;
  else if (section === "esign") ref = esignRef;
  else if (section === "payment") ref = paymentRef;
  else if (section === "tenant") ref = tenentRef;
  else if (section === "recure") ref = recureRef;

  if (ref?.current) {
    setTimeout(() => {
      const offset = -40; 
      const top = ref.current.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }, 100);
  }
};




  return (
    <>




    <div 
      style={{
      
        backgroundColor: "#fff",
        
       
      }}
    >
        <div
  style={{
    position: "relative",
    padding: "40px",
    background: "linear-gradient(90deg, #f5f9ff 0%, #e6f0ff 100%)",
    textAlign: "center",
    overflow: "hidden",
  }}
>
  
  <img
  src={TopCurve}
  alt="top-left-curve"
  style={{
    position: "absolute",
    top: "-80px",
    left: "-80px",
    width: "200px",
    height: "200px",
    zIndex: 0,
    objectFit: "contain", 
    pointerEvents: "none", 
  }}
/>


  
  <img
  src={line}
  alt="decorative-line"
  style={{
    position: "absolute",
    right: "20px",
    top: "30%",
   
    height: "150px",
    zIndex: 0,
     
    
  }}
/>

  
  <div style={{ position: "relative", zIndex: 1 }}>
    <p
      style={{
        color: "#1E45E1",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: "Gilroy",
        marginBottom: "10px",
      }}
    >
      Key Features
    </p>

    <p
      style={{
        fontSize: "38px",
        fontWeight: 600,
        fontFamily: "Gilroy",
        marginBottom: "30px",
        color: "#1c1c1c",
      }}
    >
      Ready to Simplify Your PG <br />
      <span style={{ display: "block",marginTop:"-10px" }}>Management?</span>
    </p>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {[
        {
          label: "KYC Verification",
          value: "kyc",
          activeImg: shield,
          inactiveImg: shieldinactive,
        },
        {
          label: "E-Sign for Agreements",
          value: "esign",
          activeImg: documentactive,
          inactiveImg: documentInactive,
        },
        {
          label: "Payment Automation",
          value: "payment",
          activeImg: cardactive,
          inactiveImg: cardInactive,
        },
        {
          label: "Recurring Invoices",
          value: "tenant",
          activeImg: activerepeat,
          inactiveImg: Inactiverepeat,
        },
        {
          label: "Notification Alerts",
          value: "recure",
          activeImg: mesaageactive,
          inactiveImg: mesaageInactive,
        },
      ].map((feature, index) => (
        <div
          key={index}
          data-feature={feature.value}
          onClick={() => handleFeatureClick(feature.value)}
          className={`feature-button ${
            activeSection === feature.value ? "active" : ""
          }`}
          id={`feature-${feature.value}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "10px 30px",
            borderRadius: "12px",
            border:
              activeSection === feature.value
                ? "1px solid #4D6AFF"
                : "1px solid #dcdcdc",
            backgroundColor:
              activeSection === feature.value ? "#4D6AFF" : "#ffffff",
            color: activeSection === feature.value ? "#ffffff" : "#000000",
            fontWeight: 500,
            fontSize: "16px",
            cursor: "pointer",
            fontFamily: "Gilroy",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            transition: "all 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          <img
            src={
              activeSection === feature.value
                ? feature.activeImg
                : feature.inactiveImg
            }
            alt={feature.label}
            style={{ width: 20, height: 20 }}
          />
          {feature.label}
        </div>
      ))}
    </div>
  </div>
</div>




     <div ref={kycRef}
      style={{
        padding: "60px 20px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px",
        }}
      >
       
       

<div
  style={{
    flex: "1 1 460px",
    backgroundImage: `url(${Backgrey})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: "420px",
  }}
>
  
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "360px",
    }}
  >
  
    <img

      src={Frame}
      alt="E-Sign Card"
      style={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    />

   
    <img

      src={Group}
      alt="Signature Overlay"
      style={{
        position: "absolute",
        bottom: "9%",
        right: "-10%",  
        width: "200px",
        height: "auto",
      }}
    />
  </div>
</div>




         <div style={{ flex: "1 1 500px", paddingRight: "10px" }} >
          <p
            style={{
              color: "#4D6AFF",
              fontSize: "12px",
              fontWeight: 400,
              backgroundColor: "#E8EEFF",
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "20px",
              marginBottom: "14px",
              fontFamily:"Montserrat",
              fontStyle: 'italic'
            }}
          >
           Digitally verify your tenants with ease and security
          </p>

          <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px", fontFamily:"Montserrat" }}>
            KYC Verification
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "#9C9C9C",
              lineHeight: "1.6",
              marginBottom: "30px",
              fontFamily:"Montserrat"
            }}
          >
           Easily collect and verify tenant identity documents using DigiLocker integration, ensuring compliance and building trust before move-in — all handled securely through your dashboard.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0,fontFamily:"Montserrat",color:"#090F29",fontSize:18,fontWeight:600 }}>
            {[
              "Secure digital KYC process for all tenants",
              "Supports Aadhaar, PAN, Passport uploads",
              "Auto-verification with DigiLocker integration",
              "Track verification status in real-time",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                  fontSize: "15px",
                }}
              >
                <img src={iconpng} alt="clickicon" color="#4D6AFF" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>


 <div ref={esignRef}
      style={{
        padding: "60px 20px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px",
        }}
      >
       
        <div style={{ flex: "1 1 500px", paddingRight: "10px" }}>
          <p
            style={{
              color: "#4D6AFF",
              fontSize: "12px",
              fontWeight: 400,
              backgroundColor: "#E8EEFF",
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "20px",
              marginBottom: "14px",
              fontFamily:"Montserrat",
              fontStyle: 'italic'
            }}
          >
            Just E-sign and go
          </p>

          <h2  style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px", fontFamily:"Montserrat" }}>
            E-Sign for Agreements
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "#9C9C9C",
              lineHeight: "1.6",
              marginBottom: "30px",
              fontFamily:"Montserrat"
            }}
          >
            Say goodbye to physical paperwork. Enable tenants to digitally sign rental agreements
            from anywhere, making the onboarding process faster, safer, and legally compliant.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0,fontFamily:"Montserrat",color:"#090F29",fontSize:18,fontWeight:600 }}>
            {[
              "Legally valid digital signatures for rental agreements",
              "Easy tenant-side approval from mobile or web",
              "Tamper-proof and timestamped contracts",
              "Auto-storage of signed copies in tenant profile",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                  fontSize: "15px",
                }}
              >
                  <img src={iconpng} alt="clickicon" color="#4D6AFF" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>



<div
  style={{
    flex: "1 1 460px",
    backgroundImage: `url(${Backblue})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: "420px",
  }}
>
  
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "360px",
    }}
  >
  
    <img
      className="fade-in-up img-fluid"
      src={Form2}
      alt="E-Sign Card"
      style={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    />

   
    <img
      className="fade-in-down img-fluid"
      src={form3}
      alt="Signature Overlay"
      style={{
        position: "absolute",
        bottom: "10%",
        right: "-10%",  
        width: "300px",
        height: "auto",
      }}
    />
  </div>
</div>
       
      
      </div>
    </div>



<div ref={paymentRef}
    style={{
      padding: "60px 20px",
      backgroundColor: "#ffffff",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "40px",
      }}
    >
      
  
<div
  style={{
    flex: "1 1 460px",
    backgroundImage: `url(${Backpayment})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: "420px",
  }}
>
  
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "360px",
    }}
  >
  
    <img
      className="fade-in-up img-fluid"
      src={paymentForm}
      alt="E-Sign Card"
      style={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    />

   
    <img
      className="fade-in-down img-fluid"
      src={paymentCard}
      alt="Signature Overlay"
      style={{
        position: "absolute",
        bottom: "0%",
        right: "-10%",  
        width: "150px",
        height: "auto",
      }}
    />
  </div>
</div>
     
      <div style={{ flex: "1 1 500px", paddingRight: "10px" }}>
        <p
          style={{
              color: "#4D6AFF",
              fontSize: "12px",
              fontWeight: 400,
              backgroundColor: "#E8EEFF",
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "20px",
              marginBottom: "14px",
              fontFamily:"Montserrat",
              fontStyle: 'italic'
            }}
        >
          Collect rent easily with digital payments
        </p>

        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px", fontFamily:"Montserrat" }}>
          Payment Automation
        </h2>

        <p
           style={{
              fontSize: "15px",
              color: "#9C9C9C",
              lineHeight: "1.6",
              marginBottom: "30px",
              fontFamily:"Montserrat"
            }}
        >
          Automatically generate and send invoices for rent, EB, and other charges. Enable one-click
          digital payments and receive instant confirmations with minimal manual effort.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0,fontFamily:"Montserrat",color:"#090F29",fontSize:18,fontWeight:600 }}>
          {[
            "Auto-generated rent & utility invoices monthly",
            "One-click payment via UPI, QR, or bank transfer",
            "Real-time payment status tracking for admins",
            "Instant receipts with GST and split components",
          ].map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
                fontSize: "15px",
              }}
            >
                <img src={iconpng} alt="clickicon" color="#4D6AFF" size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>


 <div ref={recureRef}
      style={{
        padding: "60px 20px",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px",
        }}
      >
     
        <div style={{ flex: "1 1 500px", paddingRight: "10px" }}>
          <p
            style={{
              color: "#4D6AFF",
              fontSize: "12px",
              fontWeight: 400,
              backgroundColor: "#E8EEFF",
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "20px",
              marginBottom: "14px",
              fontFamily:"Montserrat",
              fontStyle: 'italic'
            }}
          >
            Keep your tenants informed, always
          </p>

          <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px", fontFamily:"Montserrat" }}>
            Tenant Notification Alerts
          </h2>

          <p
             style={{
              fontSize: "15px",
              color: "#9C9C9C",
              lineHeight: "1.6",
              marginBottom: "30px",
              fontFamily:"Montserrat"
            }}
          >
            Ensure tenants never miss an update. SmartStay sends automatic alerts for payments,
            complaints, and agreements via WhatsApp, push notifications, and email — in real-time.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0,fontFamily:"Montserrat",color:"#090F29",fontSize:18,fontWeight:600 }}>
            {[
              "Auto alerts for new invoices, payments & complaints",
              "Push + WhatsApp + Email notification support",
              "Custom message templates for each action",
              "Track who viewed the alert with timestamps",
            ].map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                  fontSize: "15px",
                }}
              >
                   <img src={iconpng} alt="clickicon" color="#4D6AFF" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        
       


        <div
  style={{
    flex: "1 1 460px",
    backgroundImage: `url(${Backtenant})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: "420px",
  }}
>
  
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "360px",
    }}
  >
  
    <img
      className="fade-in-up img-fluid"
      src={tenantform}
      alt="E-Sign Card"
      style={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    />

   
    <img
      className="fade-in-down img-fluid"
      src={Notification}
      alt="Signature Overlay"
      style={{
        position: "absolute",
        bottom: "48%",
        right: "-8%",  
        width: "300px",
        height: "auto",
      }}
    />
  </div>
</div>
      </div>
    </div>



   
    <div ref={tenentRef}
    style={{
      padding: "60px 20px",
      backgroundColor: "#ffffff",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "40px",
      }}
    >
      
    

     <div
  style={{
    flex: "1 1 460px",
    backgroundImage: `url(${recureBack})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    minHeight: "420px",
  }}
>
  
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: "360px",
    }}
  >
  
    <img
      className="fade-in-up img-fluid"
      src={recureForm}
      alt="E-Sign Card"
      style={{
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      }}
    />

   
    <img
      className="fade-in-down img-fluid"
      src={recureCard}
      alt="Signature Overlay"
      style={{
        position: "absolute",
        bottom: "68%",
        right: "-8%",  
        width: "300px",
        height: "auto",
      }}
    />
  </div>
</div>
    
      <div style={{ flex: "1 1 500px", paddingRight: "10px" }}>
        <p
           style={{
              color: "#4D6AFF",
              fontSize: "12px",
              fontWeight: 400,
              backgroundColor: "#E8EEFF",
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "20px",
              marginBottom: "14px",
              fontFamily:"Montserrat",
              fontStyle: 'italic'
            }}
        >
          Auto-generate invoices based on your schedule
        </p>

        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "16px", fontFamily:"Montserrat" }}>
          Recurring Invoices
        </h2>

        <p
           style={{
              fontSize: "15px",
              color: "#9C9C9C",
              lineHeight: "1.6",
              marginBottom: "30px",
              fontFamily:"Montserrat"
            }}
        >
          Configure monthly billing cycles to auto-generate rent and utility invoices. Tenants receive timely reminders, while admins enjoy effortless tracking and accurate recordkeeping.
        </p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0,fontFamily:"Montserrat",color:"#090F29",fontSize:18,fontWeight:600 }}>
          {[
            "Monthly rent & EB charges calculated automatically",
            "Configurable billing cycle & due date setup",
            "Reminder notifications before & after due",
            "Advance amount and settlement auto-managed",
          ].map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
                fontSize: "15px",
              }}
            >
               <img src={iconpng} alt="clickicon" color="#4D6AFF" size={16} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

    </>
  );
};

export default KeyFeaturesNew;
