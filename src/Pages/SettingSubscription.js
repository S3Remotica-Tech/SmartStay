import{ React,useState} from "react";
import crown from "../Assets/Images/New_images/crown.png"
import { Button, Offcanvas, Form, FormControl, FormSelect, } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import squre from "../Assets/Images/New_images/minus-square.png";
import Image from "react-bootstrap/Image";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";

function SettingSubscription() {
 const [activeRow, setActiveRow] = useState(false);
 
  return (
    <div className="container">
      <div style={{marginTop:25}}>
        <p className="cardnewsubs" style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}>Subscription</p>

      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <div className="card p-3 cardnewsubs">
            <div
              class="d-flex align-items-center justify-content-center"
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

            <div class="d-flex justify-content-between align-items-center">
              <p
                class="mb-0"
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
                class="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                ₹500
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <p
                class="mb-0"
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
                class="mb-0"
                style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}
              >
                12 September 2024
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <p
                class="mb-0"
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
                class="mb-0"
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
            height: "auto",
            overflow: "visible",
            tableLayout: "auto",
            borderRadius: "24px",
            border: "1px solid #DCDCDC",
          }}
        >
          <thead
            style={{
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
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "start",
                  borderTopLeftRadius: 24,
                  paddingLeft:"20px"
                }}
              >
                Billing Date
              </th>
              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "start",
                }}
              >
                Paying Guest
              </th>
              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "start",
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
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "start",
                }}
              >
                Expiry Date
              </th>
              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "start",
                }}
              >
                Status
              </th>

              <th
                style={{
                  textAlign: "start",
                  fontFamily: "Gilroy",
                  color: "rgba(34, 34, 34, 1)",
                  fontSize: 14,
                  fontWeight: 600,
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
                  textAlign: "start",
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
                  textAlign: "start",
                  verticalAlign: "middle",
                  borderBottom: "none",
                }}
              >
                {/* {v.Room_Id} */}3
              </td>


              <td
                style={{
                  textAlign: "start",
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
                  textAlign: "start",
                  verticalAlign: "middle", // Center vertically
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
                  textAlign: "start",
                  verticalAlign: "middle",
                  borderBottom: "none",
                }}
              >
                {/* {v.total_amount} */}pending
              </td>
              <td style={{ paddingTop: 12, border: "none" }}>
                {/* <MoreCircle  variant="Outline"  size="40" color="#dcdcdc" style={{transform:"rotate(90deg)"}}/>  */}

                <div
                  style={{
                    cursor: "pointer",
                    height: 40,
                    width: 40,
                    borderRadius: 100,
                    border: "1px solid #EFEFEF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1000,
                  }}
                // onClick={() => handleShowDots(v.eb_Id)}
                >
                  <PiDotsThreeOutlineVerticalFill
                    style={{ height: 20, width: 20 }}  onClick={setActiveRow}
                  />
        
        {activeRow && (
                                            <div
                                                // className="position-absolute"
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: "#fff",
                                                    width: 163,
                                                    border: "1px solid #EBEBEB",
                                                    borderRadius: 10,
                                                    display: "flex",
                                                    justifyContent: "start",
                                                    padding: 10,
                                                    alignItems: "center",
                                                    zIndex: 1000,paddingRight:30,
                                                    marginTop:140
                                                }}
                                            >
                                                <div>
                                                    <div
                                                        className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                       
                                                    >
                                                        <img src={Edit} style={{ height: 16, width: 16 }} />
                                                        <label className="m-0" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#222222" ,cursor:"pointer"}}>
                                                            Edit
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                                        style={{ backgroundColor: "#fff" }}

                                                    >
                                                        <img
                                                            src={Delete}
                                                            style={{ height: 16, width: 16 }}
                                                        />{" "}
                                                        <label
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 500,
                                                                fontFamily: "Gilroy,sans-serif",
                                                                color: "#FF0000",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Delete
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        )}
                  {/* {activeRow === v.eb_Id && (
                            <>
                              <div
                                ref={popupRef}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#fff",
                                  position: "absolute",
                                  right: 50,
                                  top: 20,
                                  width: 163,
                                  height: "auto",
                                  border: "1px solid #EBEBEB",
                                  borderRadius: 10,
                                  display: "flex",
                                  justifyContent: "start",
                                  padding: 10,
                                  alignItems: "center",
                                  zIndex: showDots ? 1000 : "auto",
                                }}
                              >
                                <div
                                  style={{ backgroundColor: "#fff" }}
                                  className=""
                                >
                                  <div
  className={"mb-3 d-flex justify-content-start align-items-center gap-2"}
  style={{
  
    cursor: props.ebEditPermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!props.ebEditPermission) {
      handleEditRoomReading(v);
    }
  }}
>
  <img
    src={Edit}
    style={{
      height: 16,
      width: 16,
      filter: props.ebEditPermission ? "grayscale(100%)" : "none", 
    }}
    alt="Edit"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy, sans-serif",
      color: props.ebEditPermission ? "#ccc" : "#222222",
      cursor: props.ebEditPermission ? "not-allowed" : "pointer",
    }}
  >
    Edit
  </label>
</div>


                                 

<div
  className={"mb-2 d-flex justify-content-start align-items-center gap-2"}
  style={{
    cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!props.ebDeletePermission) {
      handleDeleteShow(v);
    }
  }}
>
  <img
    src={Delete}
    style={{
      height: 16,
      width: 16,
      filter: props.ebDeletePermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
    }}
    alt="Delete"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy, sans-serif",
      color: props.ebDeletePermission ? "#ccc" : "#FF0000", // Change text color if disabled
      cursor: props.ebDeletePermission ? "not-allowed" : "pointer",
    }}
  >
    Delete
  </label>
</div>

                                </div>
                              </div>
                            </>
                          )} */}
                </div>

                {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
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