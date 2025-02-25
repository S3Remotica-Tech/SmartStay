import React from 'react';
import Razorpay from '../Assets/Images/Razorpay.jpg';
import Paytm from '../Assets/Images/Paytm.jpg';
import Easypay from '../Assets/Images/Easypay.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Payment.css";
import Card from 'react-bootstrap/Card';



function Payment() {


  return (
    <>

      {/* <div className='paymentDetails p-2'>

      <div>

        <h2 className='pay mb-3'>Payments</h2>

        <div 
        className='overallDiv'
        >
          <div className='razorPay'>
            <img src={Razorpay} width={100} height={35}></img><br></br>
            <p>Razorpay is an indian payment gateway which allows your customer to pay via cards netbanking and wallets.
            </p>
            <a href='/#' className='atag'>view Razorpay's Transaction Fees</a><br></br><br></br>
            <div><button className='btn btn-primary'>Set up Now</button>
              <a href='/#' className='atag ms-4'>learn more</a></div>
          </div>
          <div className='payTym'>
            <img src={Paytm} width={100} height={35}></img><br></br>
            <p>Paypal is faster,safer way to send money, make an online payment, rechive moneyor set up a marchant account
            </p>
            <a href='/#' className='atag'>view paytym Transaction Fees</a><br></br><br></br>
            <div><button className='btn btn-primary'>Set up Now</button>
              <a href='/#' className='atag ms-4'>learn more</a></div>
          </div>
        </div>

        <div className='easyPay'>
          <img src={Easypay} width={100} height={40}></img><br></br>
          <p>Enable your customers to pay you using a variety of online and offline payment modes supported curency:INR
          </p>
          <a href='/#' className='atag'>view Razorpay's Transaction Fees</a><br></br><br></br>
          <div>
            <button className='btn btn-primary'>Set up Now</button>
            <a href='/#' className='atag ms-4'>learn more</a>
          </div>

        </div>

      </div>
    </div> */}


      <div style={{ height: "100vh", width: "100%" }} >
        <h4 className="ps-5 pt-3">Payments</h4>
        <div className="row g-4 ps-5 pt-3">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card >
              <Card.Body>
                <img src={Razorpay} width={100} height={35} className="mb-3"/>
                <Card.Text style={{ fontSize: "13px" }}>
                  Razorpay is an indian payment gateway which allows your customer to pay via cards netbanking and wallets.
                </Card.Text>
                <Card.Text style={{ color: "#2E75EA" }}>
                  view Razorpay's Transaction Fees
                </Card.Text>
                <div className="d-flex " style={{ backgroundColor: "" }}>
                  <button type="button" className="btn btn-primary" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "500",width:"175px" }}>SET UP NOW</button>
                  <button type="button" className="btn btn-white ms-1" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "500", color: "#2E75EA" ,width:"175px"}}>Learn More</button>
                </div>

              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card >
              <Card.Body>
                <img src={Paytm} width={100} height={28} className="mb-3"/>
                <Card.Text style={{ fontSize: "13px" }}>
                  Paypal is faster,safer way to send money, make an online payment, rechive moneyor set up a marchant account.
                </Card.Text>
                <Card.Text style={{ color: "#2E75EA" }}>
                  view Paytm Transaction Fees
                </Card.Text>
                <div className="d-flex " style={{ backgroundColor: "" }}>
                  <button type="button" className="btn btn-primary" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "500",width:"175px" }}>SET UP NOW</button>
                  <button type="button" className="btn btn-white ms-1" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "500", color: "#2E75EA" ,width:"175px"}}>Learn More</button>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="row g-4 ps-5 pt-3">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Card >
              <Card.Body>
                <img src={Easypay} width={100} height={40} className="mb-3"/>
                <Card.Text style={{ fontSize: "13px" }}>
                  Enable your customers to pay you using a variety of online and offline payment modes supported curency:INR
                </Card.Text>
                <Card.Text style={{ color: "#2E75EA" }}>
                  view Razorpay's Transaction Fees
                </Card.Text>
                <div className="d-flex " style={{ backgroundColor: "" }}>
                  <button type="button" className="btn btn-primary" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "500",width:"175px" }}>SET UP NOW</button>
                  <button type="button" className="btn btn-white ms-1" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "12px", fontWeight: "500", color: "#2E75EA",width:"175px" }}>Learn More</button>
                </div>

              </Card.Body>
            </Card>
          </div>
        </div>
      </div>







    </>


  )
}

export default Payment