/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
// import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import Profile from '../../../Assets/Images/New_images/profile-picture.png'
import { AddCircle, LogoutCurve } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Image from 'react-bootstrap/Image';


function BedDetails({
    show,
    handleCloseBed,
    handleShowCheck_In
}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
   

    const [showDots, setShowDots] = useState('')
    const [activeRoomId, setActiveRoomId] = useState(null);
    const popupRef = useRef(null);


    const handleShowDots = (roomId) => {
        setShowDots(!showDots)
        setActiveRoomId(activeRoomId === roomId ? null : roomId);
    }




    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActiveRoomId(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCheckin = () =>{
       handleShowCheck_In(true)
    }

    return (
        <>



            <div
                className="modal show"
                style={{
                    display: "block",
                    position: "initial",
                    fontFamily: "Gilroy,sans-serif",
                }}
            >
                <Modal show={show} onHide={handleCloseBed} centered
                //   backdrop="static"
                >
                    <Modal.Dialog
                        style={{ maxWidth: "100%", width: "100%", borderRadius: 16 }}
                        className="m-0 p-0"
                    >
                        <Modal.Header className="pb-0"
                            style={{ border: "1px solid #E7E7E7" }}
                        >

                            <div className="d-flex justify-content-between w-100" style={{ padding: "5px  10px 5px 5px" }}>
                                <div>
                                    <div>
                                        <Modal.Title
                                            style={{
                                                fontSize: 18,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Bed Status
                                        </Modal.Title>
                                    </div>
                                    <div>
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>Room No G3 </label> <vr /> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}> Bed 9</span>
                                    </div>
                                </div>

                                <div onClick={() => handleShowDots(1)}
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
                                        zIndex: showDots ? 1000 : "auto",
                                        backgroundColor: "white",
                                    }}>
                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                    {String(activeRoomId) === String(1) && (
                                        <div
                                            ref={popupRef}
                                            className="position-absolute"
                                            style={{
                                                right: 0,
                                                top: 50,
                                                width: 160,
                                                border: "1px solid #EBEBEB",
                                                borderRadius: 10,
                                                backgroundColor: "#f9f9f9",
                                                display: "flex",
                                                flexDirection: "column",
                                                zIndex: 1000,
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                            }}
                                        >

                                            <div
                                                className="d-flex gap-2 align-items-center"
                                                onClick={() => handleCheckin()}


                                                style={{
                                                    padding: "10px",
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    cursor: "pointer"
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                            >
                                                <AddCircle
                                                    size="18"
                                                    color="#1E45E1"
                                                />
                                                <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Check-In</label>
                                            </div>

                                            <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />


                                            <div
                                                className="d-flex gap-2 align-items-center"
                                                onClick={() => { }}

                                                style={{
                                                    padding: "10px",
                                                    borderBottomLeftRadius: 10,
                                                    borderBottomRightRadius: 10,

                                                    cursor: "pointer"
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                            >
                                                <LogoutCurve
                                                    size="18"
                                                    color="#FF9500"
                                                />                                            <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Make as Inactive</label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>




                            {/* <CloseCircle size="24" color="#000" onClick={handleCloseBed} style={{ cursor: "pointer" }} /> */}
                        </Modal.Header>
                        <Modal.Body style={{ padding: "5px 20px" }}>
                            <div className="row mt-1">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <label style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }} className="mt-0 mb-1">Reserved by</label>

                                    <div className="d-flex gap-3 align-items-center">
                                        <div>
                                            <Image src={Profile} roundedCircle style={{ height: 50, width: 50 }} alt="image" />
                                        </div>
                                        <div className="mt-2">
                                            <div>
                                                <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }} >Rajesh</label>
                                            </div>
                                            <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>+91 98765 43210</label></div>
                                        </div>
                                    </div>




                                </div>


                            </div>
                        </Modal.Body>







                        <Modal.Footer style={{ border: "none", padding: 15 }} className="mt-1">
                            <Button

                                className="w-100 m-0"
                                style={{
                                    border: "1px solid #1E45E1 ",
                                    color: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 60,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: 10,
                                    backgroundColor: "#fff"

                                }}
                            >
                                Reserved
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>
           
        </>
    );
}
BedDetails.propTypes = {
    handleCloseBed: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,

};
export default BedDetails;
