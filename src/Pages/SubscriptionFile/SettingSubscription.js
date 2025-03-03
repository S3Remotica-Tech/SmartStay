import React,{useState,useEffect} from "react";
import crown from "../../Assets/Images/New_images/crown.png";
import { Table } from "react-bootstrap";
import SubscriptionList from "./subscriptionList";

function SettingSubscription() {
//  const [activeRow, setActiveRow] = useState(false);
 
//  const toggleActiveRow = () => {
//   setActiveRow((prev) => !prev); 
// };


const [show, setShow] = useState(false);

const handleShow = () => {
  setShow(true); 
  // setActiveRow(false);
};


const handleClose = () => {
  setShow(false); 
 
  }

  // const [isConfirmDelete, setIsConfirmDelete] = useState(false); 
//   const handleDelete = () => {
    
//     console.log("User deleted");
//     setIsConfirmDelete(false); 
// };
  return (
    <div className="container">

{show ? (
        <SubscriptionList />
      ) : (
        <>
          <div style={{ marginTop: 26 }}>
            <p className="cardnewsubs" style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}>
              Subscription
            </p>
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
                  <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Your plan is active</p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0" style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy", color: "#4B4B4B" }}>
                    Amount
                  </p>
                  <p className="mb-0" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>₹500</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="mb-0" style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy", color: "#4B4B4B" }}>
                    Next payment
                  </p>
                  <p className="mb-0" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
                    12 September 2024
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="mb-0" style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy", color: "#4B4B4B" }}>
                    Payment method
                  </p>
                  <p className="mb-0" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>VISA **60</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-primary" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy", backgroundColor: "transparent", color: "blue" }}>
                    Change Payment methods
                  </button>
                  <button className="btn btn-primary" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }} onClick={handleShow}>
                    Manage Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
     



    </div>
  )
}
export default SettingSubscription;