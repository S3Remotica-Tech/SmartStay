import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Form from "react-bootstrap/Form";
import Edit from "../Assets/Images/New_images/edit.png";
import Hostel from "../Assets/Images/Logo-Icon.png";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import User from "../Assets/Images/Ellipse 1.png";
import Tickicon from "../Assets/Images/tick-circle.png";
import Profile_add from "../Assets/Images/profile-add.png";
import moment from "moment";
import Delete from "../Assets/Images/New_images/trash.png";

const InvoiceSettingsList = (props) => {
 
 
 
 
  const [showDots, setShowDots] = useState(false);
  const [active, setActive] = useState(false);

  const handleShowDots = () => {
    setShowDots(!showDots);
    console.log("handle edit works");
  };

  const handleEditInvoice = (item) => {
    props.OnEditInvoice(item);
  };

  const handleSetAsDefault = (e) => {
    setActive(e.target.checked);
    props.handleRecurringFormShow();
  };

  console.log("props invoicesett***********", props);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries,
      appearOnScrool
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  

  // const handleEdit = (item) => {
  //   props.OnEditInvoice(item)
  // }

  return (
    <>
      {/* <tr style={{ lineHeight: "40px" }}>
            <td className='ps-1 ps-lg-3' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>
            <Image
            src={props.item.profile ? props.item.profile : Hostel}
            roundedCircle
            style={{
              height: 30,
              width: 30,
              borderRadius: '50%',
            }}

          
          />
            </td>
                <td className='ps-1 ps-lg-2' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{props.item.Name}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{props.item.prefix ? props.item.prefix :'-'}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{props.item.suffix ? props.item.suffix :'-'}</td>

                <td>   <div>
                    <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                        {showDots && <>
                            <div
  style={{
    backgroundColor: "rgb(235, 235, 235)",
    position: "absolute",
    right: 45,
    top: 5,
    width: 100,
    height: 42,
    border: "1px solid #EBEBEB",
    borderRadius: 10,
    display: "flex",
    justifyContent: "start",
    paddingLeft: "10px",
    cursor: props.billEditPermission ? "not-allowed" : "pointer",
    opacity: props.billEditPermission ? 0.7 : 1,
  }}
>
  <div onClick={!props.billEditPermission ? () => handleEditInvoice(props.item) : undefined}>
    <img src={Edit} style={{ height: 16, width: 16 }} alt="Edit" />
    <label
      style={{
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Gilroy",
        color: "#222222",
        cursor: props.billEditPermission ? "not-allowed" : "pointer",
      }}
    >
      Edit
    </label>
  </div>
</div>



                        </>}

                    </div>
                </div></td>
            </tr> */}

      <Card
        className="h-100  fade-in mb-4"
        style={{
          borderRadius: 16,
          border: "1px solid #E6E6E6",
          width: "600px",
        }}
      >
        <Card.Body style={{ padding: 20 }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="d-flex gap-2">
              <label
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 18,
                  color: "#222",
                  fontWeight: 600,
                  marginLeft: "10px",
                }}
              >
                Invoice Information
              </label>
            </div>

            <div>
              <div
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  border: "1px solid #EFEFEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
                onClick={handleShowDots}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20, cursor: "pointer" }}
                />

                {showDots && (
                  <>
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        position: "absolute",
                        right: 0,
                        top: 50,
                        width: 163,
                        height: 92,
                        border: "1px solid #EBEBEB",
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "start",
                        padding: 15,
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                         onClick={()=>handleEditInvoice(props.item)}
                          className={"mb-2"}
                          // onClick={() => {
                          //     handleEdit(props.item);
                          // }}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={Edit}
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            alt="Edit"
                           

                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy, sans-serif",
                              color: "#222222",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          >
                            Edit
                          </label>
                        </div>

                        <div
                          className={"mb-2"}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={Delete}
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            alt="Delete"
                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy, sans-serif",
                              color: "#FF0000",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          >
                            Delete
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <hr style={{ border: "1px solid #E7E7E7" }} />

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Invoice Number
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {props.item.prefix}{props.item.suffix}
                </label>
              </div>
            </div>

            <div className="mb-2 me-5">
              <div className="mb-1">
                <label
                  style={{color: "#939393",fontSize: 14,fontWeight: 500,fontFamily: "Gilroy",fontStyle: "normal",lineHeight: "normal"}}>
                  Invoice date
                </label>
              </div>
              <div>
                <label
                  style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
                  {moment(props.item.inv_date).format('DD-MM-YYYY')}
                </label>
              </div>
            </div>

            <div className="mb-2 me-5">
              <div className="mb-1">
                <label style={{ color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
                  Due Date
                </label>
              </div>
              <div>
                <label
                  style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
                   {props.item.due_date} 
                </label>
              </div>
            </div>
          </div>

          <div>
            <label
              style={{ color: "#939393", fontSize: 14,fontWeight: 500, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
              Recurring
            </label>
            <Form.Check
              type="switch"
              id="custom-switch"
              checked={active}
              onChange={(e) => handleSetAsDefault(e)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap mt-3">
            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Calculation type
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Monthly
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Calculation Start Date
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {moment(props.item.inv_date).format('DD-MM-YYYY')}
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Calculation End Date
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {moment(props.item.inv_startdate).format('DD-MM-YYYY')}
                </label>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default InvoiceSettingsList;
