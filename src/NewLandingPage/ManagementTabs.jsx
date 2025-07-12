import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Tabs, Tab, Box } from '@mui/material';
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "./KeyFeaturesNew.css";
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






const RoomManagement = () => {
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState("1");
   const [animate, setAnimate] = useState(false);


 

 
const handleChanges = (_,  newValue) => {
  setAnimate(false); 

  setTimeout(() => {
    setValue(newValue); 
    setAnimate(true);   
  }, 200); 
};
   const features = [
    {
      label: 'KYC Verification',
      value: '1',
      activeImg: shield,
      inactiveImg: shieldinactive,
    },
    {
      label: 'E-Sign for Agreements',
      value: '2',
      activeImg: documentactive,
      inactiveImg: documentInactive,
    },
    {
      label: 'Payment Automation',
      value: '3',
      activeImg: cardactive,
      inactiveImg: cardInactive,
    },
    {
      label: 'Recurring Invoices',
      value: '4',
      activeImg: activerepeat,
      inactiveImg: Inactiverepeat,
    },
    {
      label: 'Notification Alerts',
      value: '5',
      activeImg: mesaageactive,
      inactiveImg: mesaageInactive,
    },
  ];
   

  return (
    <div style={{ height: 'auto', backgroundColor: 'white',paddingTop:37 }}>
      <div className="text-center">
        <label style={{ fontFamily: "Montserrat", color: "#090F29", fontWeight: 700, fontSize: 30, marginBottom: 8 }}>Ready to Simplify Your PG Management?</label>
      </div>
      <div className="text-center">
        <label style={{ fontFamily: "Montserrat", color: "#4C6280", fontWeight: 500, fontSize: 16, marginBottom: 50, opacity:0.6 }}>Efficiently manage rooms, customers, inventory, vendors,<br></br>
        complaints, expenses, and reports—all in one place.</label></div>






      <TabContext value={value} >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleChanges}
          TabIndicatorProps={{ style: { display: 'none' } }}
          orientation={isSmallScreen ? "vertical" : "horizontal"}
        >
          {features.map((feature, index) => (
            <Tab
              key={index}
              value={feature.value}
              label={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    padding: '10px 15px',
                    borderRadius: '20px',
                    backgroundColor: value === feature.value ? '#4D6AFF' : '#ffffff',
                    color: value === feature.value ? '#ffffff' : '#000000',
                    border: value === feature.value ? '1px solid #4D6AFF' : '1px solid #dcdcdc',
                    fontWeight: 500,
                    fontSize: '14px',
                    fontFamily: 'Montserrat',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <img
                    src={value === feature.value ? feature.activeImg : feature.inactiveImg}
                    alt={feature.label}
                    style={{ width: 20, height: 20 }}
                  />
                  {feature.label}
                </div>
              }
              style={{ padding: 15, minWidth: 'auto', textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>


        <TabPanel value="1" style={{marginTop:"-50px"}}>
         


          <div 
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
                className={`tab-content-wrapper ${animate ? "fade-slide-in-up" : ""}`}
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
          
          
          
          
                   <div style={{ flex: "1 1 500px", paddingRight: "10px" }}  className="slide-in-right">
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
          
                    <ul style={{ listStyle: "none", padding: 0, margin: 0,fontFamily:"Montserrat",color:"#090F29",fontSize:18,fontWeight:600 }}  >
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
        </TabPanel>

        <TabPanel value="2" style={{marginTop:"-50px"}}>
         <div 
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
                
                 <div style={{ flex: "1 1 500px", paddingRight: "10px" }} className={`tab-content-wrapper ${animate ? "fade-slide-right" : ""}`}>
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
              
               src={Form2}
               alt="E-Sign Card"
               style={{
                 width: "100%",
                 borderRadius: "12px",
                 boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
               }}
             />
         
            
             <img
              className={`tab-content-wrapper ${animate ? "fade-slide-in-up" : ""}`}
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
        </TabPanel>

        <TabPanel value="3" style={{marginTop:"-50px"}}>
        <div 
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
             
              src={paymentForm}
              alt="E-Sign Card"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            />
        
           
            <img
             className={`tab-content-wrapper ${animate ? "fade-slide-in-up" : ""}`}
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
             
              <div style={{ flex: "1 1 500px", paddingRight: "10px" }} className={`tab-content-wrapper ${animate ? "slide-left" : ""}`}>
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
        </TabPanel>

        <TabPanel value="4" style={{marginTop:"-50px"}}>
         <div
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
             
                <div style={{ flex: "1 1 500px", paddingRight: "10px" }} className={`tab-content-wrapper ${animate ? "fade-slide-right" : ""}`}>
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
             
              src={tenantform}
              alt="E-Sign Card"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            />
        
           
            <img
              className={`tab-content-wrapper ${animate ? "fade-slide-in-up" : ""}`}
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
        </TabPanel>

        <TabPanel value="5" style={{marginTop:"-50px"}}>
        <div 
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
             
              src={recureForm}
              alt="E-Sign Card"
              style={{
                width: "100%",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
            />
        
           
            <img
             className={`tab-content-wrapper ${animate ? "fade-slide-in-up" : ""}`}
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
            
              <div style={{ flex: "1 1 500px", paddingRight: "10px" }} className={`tab-content-wrapper ${animate ? "slide-left" : ""}`}>
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
        </TabPanel>

      </TabContext>
    </div>

  );
};

export default RoomManagement;
