import React ,{ useEffect, useState} from "react";
import crown from "../Assets/Images/New_images/crown.png"
import { Table } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Guest from '../Assets/pricing/house.png'
import Custom from '../Assets/pricing/Manage customer.png'
import Vendor from '../Assets/pricing/shop.png';
import Asset from '../Assets/pricing/Money.png';
import Invoice from '../Assets/pricing/note.png';
import Expense from '../Assets/pricing/coin.png';
import Report from '../Assets/pricing/clipboard-text.png';


function SettingSubscription() {
const [show,setShow] = useState(false)

const handleShow = (()=>{
  setShow(true)
})

const handleClose = (()=>{
  setShow(false)
})

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
     useEffect(() => {
        const appearOptions = {
          threshold : 0.5
        };
        const faders = document.querySelectorAll('.fade-in'); 
        const appearOnScro1l = new IntersectionObserver(function(entries){
          entries.forEach(entry =>{
            if(!entry.isIntersecting){
              return;
            }
            else{
              entry.target.classList.add('appear');
              appearOnScro1l.unobserve(entry.target);
            }
          })
        }, appearOptions)
        faders.forEach(fader =>{
          appearOnScro1l.observe(fader);
        })
      });
    

  return (
    <div className="container">
      <div style={{marginTop:26}}>
        <p className="cardnewsubs" style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}>Subscription</p>

      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card p-3 cardnewsubs">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: 12,
                backgroundColor: "#eef4ff",
              }}
            >
              <img src={crown} width={40} height={40} alt="Crown Icon" />
            </div>

            <div>
              <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                Your plan is active
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p
                className="mb-0"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                }}
              >
                Amount
              </p>
              <p
                className="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                ₹500
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <p
                className="mb-0"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                }}
              >
                Next payment
              </p>
              <p
                className="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                12 September 2024
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <p
                className="mb-0"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color: "#4B4B4B",
                }}
              >
                Payment method
              </p>
              <p
                className="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                VISA **60
              </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 ">
              {/* <img src={msg} width={40} height={40} alt="Crown Icon" /> */}
              <button
                className="btn btn-primary"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy", backgroundColor: "transparent", color: "blue" }}
              >
                Change Payment methods
              </button>
              <button
                className="btn btn-primary"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
                onClick={handleShow} >
                Manage Plan
              </button>
            </div>
          </div>
        </div>


      </div>

     


      {show === true && (
  <div className='mb-5'>
    {/* <div className='d-flex justify-content-center mt-3 mb-5'>
      <label style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: 60 }}>
        Flexible Pricing to suit <span style={{ color: "rgba(30, 69, 225, 1)" }}>your needs</span>
      </label>
    </div> */}

    <div className='d-flex justify-content-center'>
      <Card className='fade-in' style={{ backgroundColor: "rgba(34, 34, 34, 1)", borderRadius: "40px", maxWidth: 600, width: "100%", padding: "15px 20px", boxShadow: '0px 0px 16px 0px #C7C7C7' }}>
        <Card.Body>

          <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 40, lineHeight: "48px" }} > Get SmartStay</label>

          <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Montserrat", fontWeight: 'lighter', fontSize: 16, lineHeight: "22px", paddingTop: "20px" }}>
            Get access to your very own Rental Product and elevate your rental business with <span style={{ fontWeight: 700 }}> Limited-time offer 👇 </span>
          </label>

          <div className='gap-3 d-flex align-items-center mb-3 mt-2'>
            <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 700, fontSize: 40 }}>₹599</label>
            <label style={{ color: "rgba(100, 100, 100, 1)", fontFamily: "Gilroy", fontWeight: 500, fontSize: 32, textDecoration: "line-through" }}>₹999</label>
            <div>
              <Badge bg="rgba(0, 163, 46, 1)" style={{ backgroundColor: "rgba(0, 163, 46, 1)", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>20 % off</Badge>
            </div>
          </div>

          <div className='mb-2'>
            <Button className="w-100" style={{ height: 62, backgroundColor: "rgba(30, 69, 225, 1)", borderRadius: 16, fontSize: 16, fontWeight: 600, fontFamily: "Montserrat" }}>
              Get Started
            </Button>
          </div>

          <div className='d-flex justify-content-start pt-2 pb-3'>
            <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Montserrat", fontWeight: 'lighter', fontSize: 16 }}>
              Get free <span style={{ fontWeight: 700 }}>30 days trial</span> as an introductory offer.
            </label>
          </div>

          <div className='pt-2 pb-3'>
            <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Montserrat", fontWeight: 400, fontSize: 15 }}>
              You will get access to these features:
            </label>
          </div>

          <div className='pt-2 pb-3'>
            <div className='pb-3 gap-2 d-flex'>
              <img src={Guest} alt="Guest" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Paying Guest</label>
            </div>

            <div className='pb-3 gap-2 d-flex'>
              <img src={Custom} alt="Custom" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Manage customers</label>
            </div>

            <div className='pb-3 gap-2 d-flex'>
              <img src={Vendor} alt="Vendor" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Manage Vendors</label>
            </div>

            <div className='pb-3 gap-2 d-flex'>
              <img src={Asset} alt="Asset" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Asset Management</label>
            </div>

            <div className='pb-3 gap-2 d-flex'>
              <img src={Invoice} alt="Invoice" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Invoice Management</label>
            </div>

            <div className='pb-3 gap-2 d-flex'>
              <img src={Expense} alt="Expense" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Expenses Management</label>
            </div>

            <div className='pb-3 gap-2 d-flex'>
              <img src={Report} alt="Report" />
              <label style={{ color: "rgba(255, 255, 255, 1)", fontFamily: "Gilroy", fontWeight: 600, fontSize: 17 }}>Reports Management</label>
            </div>
          </div>

        </Card.Body>
      </Card>
    </div>
  </div>
)}




    </div>
  )
}
export default SettingSubscription;