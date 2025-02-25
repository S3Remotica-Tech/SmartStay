import{ React,useState} from "react";
import crown from "../Assets/Images/New_images/crown.png"
import { Button, Offcanvas, Form, FormControl, FormSelect, Modal,Row,Col} from "react-bootstrap";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import squre from "../Assets/Images/New_images/minus-square.png";
import Image from "react-bootstrap/Image";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import { CloseCircle } from 'iconsax-react';
import DatePicker from "react-datepicker";

function SettingSubscription() {
 const [activeRow, setActiveRow] = useState(false);
 
 const toggleActiveRow = () => {
  setActiveRow((prev) => !prev); 
};


const [show, setShow] = useState(false);

const handleShow = () => {
  setShow(true); 
  setActiveRow(false);
};


const handleClose = () => {
  setShow(false); 
  setActiveRow(true); 
  setIsConfirmDelete(false); 
  }

  const [isConfirmDelete, setIsConfirmDelete] = useState(false); 
  const handleDelete = () => {
    
    console.log("User deleted");
    setIsConfirmDelete(false); 
};
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
              >
                Manage Plan
              </button>
            </div>
          </div>
        </div>


      </div>


      <div className="cardnewsubstable" style={{ marginTop: 40 }}>
        <Table
          responsive="md"
          className="Table_Design"
          style={{
            // width:"100%",
            height: "auto",
            overflow: "visible",
            tableLayout: "auto",
            borderRadius: "24px",
            border: "1px solid #DCDCDC",
          }}
        >
          <thead
            style={{
              width:"700",
              color: "gray",
              fontSize: "11px",
              backgroundColor: "#E7F1FF",
              position: "sticky",
              top: 0,
              zIndex: 1,
            }}
          >
            <tr style={{ height: "30px" }}>

              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                  borderTopLeftRadius: 24,
                  paddingLeft:"20px"
                }}
              >
                Billing Date
              </th>
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Paying Guest
              </th>
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Amount
              </th>
              {/* <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  Previous
                </th> */}
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Expiry Date
              </th>
              <th
                style={{
                  color: "rgb(147, 147, 147)",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Status
              </th>

              <th
                style={{
                  textAlign: "start",
                  fontFamily: "Gilroy",
                  color: "rgb(147, 147, 147)",
                  fontSize: 14,
                  fontWeight: 500,
                  borderTopRightRadius: 24,
                }}
              >
                {" "}
              </th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "12px" }}>
            {/* {currentRowelectricity &&
                currentRowelectricity.map((v) => {
                  const imageUrl = v.profile || Profile;
                 

                  let formattedDate;
if (v.date && v.date != '0000-00-00') {
    let Dated = new Date(v.date);
    let day = Dated.getDate();
    let month = Dated.getMonth() + 1;
    let year = Dated.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
} else {
    // Use a default initial date if v.date is empty or "00-00-00"
    let initialDate = new Date(v.initial_date); // Set your default initial date here
    let day = initialDate.getDate();
    let month = initialDate.getMonth() + 1;
    let year = initialDate.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
}

console.log('Formatted Date:', formattedDate);


                  return ( */}
            <tr>


              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom: "none",
                  paddingLeft:"20px"
                }}
              >
                {/* {v.floor_name} */}05-12-2024
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom: "none",
                }}
              >
                {/* {v.Room_Id} */}3
              </td>


              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle", // Center vertically
                  borderBottom: "none",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#EBEBEB",
                    paddingTop: "5px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "5px",
                    borderRadius: "60px",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  {/* {formattedDate} */}100
                </span>
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle", 
                  borderBottom: "none",
                }}
              >
                {/* {v.total_reading} */}05-12-2024
              </td>
              <td
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  verticalAlign: "middle",
                  borderBottom: "none",
                }}
              >
                {/* {v.total_amount} */}pending
              </td>
            
            </tr>
            {/* );
                })} */}
          </tbody>
        </Table>
      </div>

    </div>
  )
}
export default SettingSubscription;