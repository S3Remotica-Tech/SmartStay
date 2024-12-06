import React, { useRef, useState } from "react";
import role from "../Assets/Images/New_images/security-user.png";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import round from "../Assets/Images/Group 14.png"
import { Button , Col } from "react-bootstrap";

function SettingCompliance() {

    const popupRef = useRef(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [activeRow, setActiveRow] = useState(false);

    const handleShowDots = (e) => {
        if (activeRow === true) {
          setActiveRow(false);
        } else {
          const rect = e.currentTarget.getBoundingClientRect();
          setPopupPosition({
            top: rect.top + window.scrollY + 30,
            left: rect.left + window.scrollX - 120,
          });
          setActiveRow(true);
        }
      };

      const handleEdit =()=>{
        setActiveRow(null)
      }
      const handleDelete=()=>{
        setActiveRow(false)
      }
    return (
        <div className="container">
            <div className='d-flex row mb-4 mt-4'>
                <Col>
                <h4 style={{
                    fontSize: 18,
                    color: "#000000",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                }}>Complaint Type</h4>
                </Col>
                <Col>
                <div className="d-flex justify-content-end">
                    <Button style={{ backgroundColor: "#1E45E1", color: '#ffffff' }}>
                        + Add Complaint Type
                    </Button>
                </div>
                </Col>
            </div>
            <div className="col-12 col-sm-6 col-md-12 col-lg-3 mb-3">
                <div
                    className="d-flex align-items-center justify-content-between p-3 border rounded"
                    style={{ height: 64, width: "100%" }}
                >
                    <div className="d-flex align-items-center">
                        <img src={role} width={24} height={24} alt="Role Icon" />
                        <span
                            style={{
                                marginLeft: 20,
                                fontSize: 16,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: "#222222",
                            }}
                        >
                            {/* {u.role_name} */}test
                        </span>
                    </div>
                    <button className="btn p-0">
                        <img src={round} width={34} height={34} alt="Menu Icon"
                           onClick={(e) => handleShowDots(e)}
                        />
                    </button>
                </div>

                {activeRow && (
                <div
                    ref={popupRef}
                    className="position-absolute"
                    style={{
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        top: popupPosition.top,
                        left: popupPosition.left,
                        width: 163,
                        border: "1px solid #EBEBEB",
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "start",
                        padding: 10,
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div>
                        <div
                            className="mb-3 d-flex justify-content-start align-items-center gap-2"
                         onClick={() => handleEdit()}
                        >
                            <img src={Edit} style={{ height: 16, width: 16 }} />
                            <label className="m-0" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#222222" }}>
                                Edit
                            </label>
                        </div>
                        <div
                            className="mb-2 d-flex justify-content-start align-items-center gap-2"
                            style={{ backgroundColor: "#fff" }}
                        onClick={()=> handleDelete()} 
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
            </div>
        </div>
    )
}
export default SettingCompliance;