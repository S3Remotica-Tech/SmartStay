
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState} from "react";
import {
    Modal,
    Form,
    Button,
} from "react-bootstrap";
import "../../../Pages/AssetFile/addAsset.css";
import { CloseCircle} from "iconsax-react";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';


export default function TenantInactiveModal({ show, handleClose }) {
    const [Date, setDate] = useState(null);
    const [reason, setReason] = useState("");




   

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static"   >

            <Modal.Header style={{ border: "none" }} className="ps-4 pe-4 pb-2 pt-4">
                <div>
                    <Modal.Title style={{
                        fontSize: 20,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                    }}>Tenant Inactive ?</Modal.Title>

                    <label style={{
                        fontSize: 14,
                        color: "#646464",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                    }}>Are you sure you want to inactive this tenant?</label>
                </div>

                <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
            </Modal.Header>


            <Modal.Body className="ps-4 pe-4 pb-4 pt-0">


                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2" controlId="joiningDate">
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}
                        >
                            Date
                        </Form.Label>

                        <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: 48,
                                    cursor: "pointer",
                                    fontFamily: "Gilroy",
                                }}
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                value={Date ? dayjs(Date) : null}
                                onChange={(date) => {
                                    setDate(date ? date.toDate() : null);
                                }}
                                getPopupContainer={() => document.body}
                            />
                        </div>
                    </Form.Group>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                        <Form.Label style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                        }}>Reason (Comments)</Form.Label>
                        <Form.Control
                            style={{
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                                height: 50,
                                borderRadius: 8,
                            }}
                            as="textarea"
                            rows={5}
                            placeholder="Enter reason here"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Modal.Footer style={{ border: "none", padding: 0 }}>
                    <div className="d-flex  w-100 gap-3">


                        <Button
                            onClick={handleClose}
                            className="w-100"
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #D2D2D2",
                                color: "#4B4B4B",
                                fontWeight: 600,
                                borderRadius: 10,
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                padding: "8px 40px"
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            // onClick={handleConfirm}
                            className="w-100"
                            style={{
                                backgroundColor: "#1E45E1",
                                fontWeight: 600,
                                borderRadius: 10,
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                padding: "8px 40px"
                            }}
                        >
                            Confirm
                        </Button>
                    </div>

                </Modal.Footer>
            </Modal.Body>

        </Modal>
    );
}
TenantInactiveModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,

}
