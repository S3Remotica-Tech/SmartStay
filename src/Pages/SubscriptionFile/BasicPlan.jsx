import React from "react";
import { Card, Button, Row, Col, Table } from "react-bootstrap";
import PaginationList from '../../Components/PaginationList';
import { Calendar } from "iconsax-react";
import { TbCheck } from "react-icons/tb";
import { MdPayment } from "react-icons/md";
import { PiLightning } from "react-icons/pi";




function SubscriptionCard() {



    return (
          <div className="container mt-4 show-scroll p-0 " style={{
              fontFamily: "Gilroy", maxHeight: "500px",
              overflowY: "auto", marginBottom: 50
            }}>

            <Card className="p-4 mb-4 me-2" style={{
                borderRadius: "14px", backgroundColor: "#F8F9FF",
                border: "2px solid #1E45E1",
                //  border: "2px solid #E8E8E8",
            }}>

                <div className='d-flex justify-content-between '>
                    <div className="d-flex gap-3 mb-3">



                        <div>
                            <div>
                                <label className="" style={{ fontWeight: 600, color: "#222222", fontSize: 16 }}>
                                    Basic Plan
                                </label>

                            </div>
                            <div>
                                <label style={{ fontWeight: 500, color: "#4A4A4A", fontSize: 14 }}>₹599/month</label>

                            </div>

                        </div>

                        <div
                            style={{
                                background: "#00A32E",
                                color: "white",
                                padding: "3px 12px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                width: "fit-content",
                                height: "fit-content",
                                textAlign: "center", fontWeight: 500
                            }}
                        >
                            <TbCheck /> {" "} Active
                        </div>
                    </div>
                    <div className=''>
                        <Button
                            className=""
                            style={{
                                background: "#1E45E1",
                                borderRadius: "10px",
                                padding: "10px 25px",
                                border: "none",
                                fontSize: 14, fontWeight: 400
                            }}
                        >
                            Change Plan
                        </Button>
                    </div>


                </div>

                <Row className="mt-2">
                    <Col>
                        <div className='d-flex gap-2 align-items-start'>
                            <div>
                                <Calendar size="16" color="#4B4B4B" />
                            </div>

                            <div className=''>
                                <div>
                                    <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 13 }}>Renewal Date</label>

                                </div>
                                <div>
                                    <label className='' style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 16 }}>Oct 21, 2025</label>

                                </div>
                            </div>
                        </div>

                    </Col>

                    <Col>
                        <div className='d-flex gap-2 align-items-start'>
                            <div>
                                <MdPayment size="16" color="#4B4B4B" />
                            </div>

                            <div className=''>
                                <div>
                                    <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 13 }}>Payment Method</label>

                                </div>
                                <div>
                                    <label className='' style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 16 }}>UPI Auto Debit</label>

                                </div>
                            </div>
                        </div>

                    </Col>
                    <Col>
                        <div className='d-flex gap-2 align-items-start'>
                            <div>
                                <PiLightning size="16" color="#4B4B4B" />
                            </div>

                            <div className=''>
                                <div>
                                    <label style={{ fontWeight: 400, color: "#4B4B4B", fontSize: 13 }}>Status</label>

                                </div>
                                <div>
                                    <label className='' style={{ fontWeight: 400, color: "#1E45E1", fontSize: 16 }}>Active</label>

                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>




            </Card>


            <Card className="p-3 mb-4 me-2" style={{
                borderRadius: "14px", backgroundColor: "#F8F9FF",
                border: "2px solid #1E45E1",
                //  border: "2px solid #E8E8E8",
            }}>

                <div className='d-flex justify-content-between align-items-center mb-2'>
                    <div className="d-flex gap-3 ">



                        <div>
                            <div>
                                <label className="" style={{ fontWeight: 600, color: "#222222", fontSize: 16 }}>
                                    Upgrade to Premium Plan
                                </label>

                            </div>
                            <div>
                                <label style={{ fontWeight: 500, color: "#4A4A4A", fontSize: 14 }}>Get WhatsApp Integration, Digital KYC, Legal E-Sign & more</label>

                            </div>

                        </div>


                    </div>
                    <div
                        style={{
                            background: "#00A32E",
                            color: "white",
                            padding: "3px 12px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            width: "fit-content",
                            height: "fit-content",
                            textAlign: "center", fontWeight: 500
                        }}
                    >
                        Recommended
                    </div>


                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <label style={{ color: "#1E45E1", fontSize: 20, fontWeight: 500 }}>₹999 <span style={{ color: "#4B4B4B", fontSize: 14, fontWeight: 500 }}>/month</span></label>
                    </div>
                    <div>
                        <Button
                            className="mt-3"
                            style={{
                                background: "#1E45E1",
                                borderRadius: "10px",
                                padding: "10px 25px",
                                border: "none",
                                fontSize: 14, fontWeight: 400
                            }}
                        >
                            Upgrade Now
                        </Button>
                    </div>
                </div>




            </Card>



            <h5 className="mt-4 mb-3" style={{color:"#222222",fontWeight:600, fontSize:16}}>Billing History</h5>

            <div className="col-lg-12 col-md-12 col-sm-10 mt-3">
                <div
                    className="  me-2"
                    style={{ paddingBottom: "20px" }}
                >

                    <div
                        className="show-scrolls"
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            borderTop: "1px solid #E8E8E8",
                            marginBottom: 20,
                            marginTop: "20px",
                            paddingRight: 0,
                            paddingLeft: 0,
                        }}
                    >
                        <Table
                            responsive="md"
                            style={{
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 500,
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                borderRadius: 0,
                            }}
                        >
                            <thead
                                style={{
                                    fontFamily: "Gilroy",
                                    backgroundColor: "rgba(231, 241, 255, 1)",
                                    color: "rgba(34, 34, 34, 1)",
                                    fontSize: 12,
                                    fontStyle: "normal",
                                    fontWeight: 500,
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <tr className="" style={{ height: "30px" }}>
                                    <th
                                        style={{
                                            textAlign: "start",
                                            color: "#939393",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            fontFamily: "Gilroy",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            paddingLeft: "20px",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <div className="d-flex gap-1 align-items-center justify-content-start">

                                            INVOICE
                                        </div>
                                    </th>
                                    <th
                                        style={{
                                            color: "#939393",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            fontFamily: "Gilroy",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            textAlign: "start",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <div className="d-flex gap-1 align-items-center justify-content-start">

                                            BILLING DATE
                                        </div>
                                    </th>
                                    <th
                                        style={{
                                            color: "#939393",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            fontFamily: "Gilroy",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            textAlign: "start",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <div className="d-flex gap-1 align-items-center justify-content-start">

                                            PLAN
                                        </div>
                                    </th>
                                    <th
                                        style={{
                                            color: "#939393",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            fontFamily: "Gilroy",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            textAlign: "start",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        <div className="d-flex gap-1 align-items-center justify-content-start">

                                          AMOUNT
                                        </div>
                                    </th>

                                    <th
                                        style={{
                                            color: "#939393",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            fontFamily: "Gilroy",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            textAlign: "start",
                                        }}
                                    >
                                        <div className="d-flex gap-1 align-items-center justify-content-start">

                                            STATUS
                                        </div>
                                    </th>
                                      <th
                                        style={{
                                            color: "#939393",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            fontFamily: "Gilroy",
                                            paddingTop: "10px",
                                            paddingBottom: "10px",
                                            textAlign: "start",
                                        }}
                                    >
                                        <div className="d-flex gap-1 align-items-center justify-content-start">

                                           ACTION
                                        </div>
                                    </th>

                                </tr>
                            </thead>


                            <tbody style={{ fontSize: "11px", verticalAlign: "middle", height: "50px" }}>
                                <PaginationList display={true}>
                                     
                                    {/* {hostelDetails.map((view, index) => {
                            let formattedDate = view.plan_start
                              ? `${new Date(view.plan_start).getDate()}/${new Date(view.plan_start).getMonth() + 1}/${new Date(view.plan_start).getFullYear()}`
                              : "-";
                            let DueformattedDate = view.plan_end
                              ? `${new Date(view.plan_end).getDate()}/${new Date(view.plan_end).getMonth() + 1}/${new Date(view.plan_end).getFullYear()}`
                              : "-";
    
                            return (
                              <tr key={index} style={{ marginTop: "20px" }}>
                                <td>{index + 1}</td>
                                <td>{view.name}</td>
                                <td>{formattedDate}</td>
                                <td>{DueformattedDate}</td>
                                <td>
                                  <span style={{
                                    color: "black",
                                    backgroundColor: "#D9FFD9",
                                    padding: "3px 10px",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    borderRadius: "10px"
                                  }}>
                                    {view.plan_status === 1 ? "Active" : "Not Active"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })} */}
                                </PaginationList>
                            </tbody>

                        </Table>
                    </div>



                </div>
            </div>


        </div>
    );
}

export default SubscriptionCard;
