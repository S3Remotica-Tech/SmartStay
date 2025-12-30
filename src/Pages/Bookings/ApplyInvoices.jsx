
/* eslint-disable react-hooks/exhaustive-deps */
import React, { 
    // useEffect, 
    useState } from 'react';
import { Modal, Button, Table, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

const initialData = [
    {
        type: "Rental",
        invNo: "#INV-987",
        dueDate: "11 Dec 2025",
        invoiceAmount: 4500,
        invoiceBalance: 4500,
        applyAmount: "",
    },
    {
        type: "Advance",
        invNo: "#ADV-287",
        dueDate: "12 Dec 2025",
        invoiceAmount: 5000,
        invoiceBalance: 5000,
        applyAmount: "",
    },
];





function ApplyBookingModal({ show, handleClose }) {


    const [sortedData, setSortedData] = useState(initialData);

    const handleApplyAmountChange = (index, value) => {
        if (value === "") {
            const updatedData = [...sortedData];
            updatedData[index].applyAmount = "";
            setSortedData(updatedData);
            return;
        }

        if (!/^\d+$/.test(value)) return;

        const sanitizedValue = value.replace(/^0+(?!$)/, "");

        const updatedData = [...sortedData];
        updatedData[index].applyAmount = sanitizedValue;
        setSortedData(updatedData);
    };











    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <div
                style={{
                    fontFamily:
                        "Gilroy, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
                    padding: 16,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <h5
                        style={{
                            margin: 0,
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        Apply Booking to Invoice
                    </h5>

                    <span
                        onClick={handleClose}
                        style={{
                            cursor: "pointer",
                            fontSize: 18,
                            fontWeight: 500, color: '#FF0000'
                        }}
                    >
                        ✕
                    </span>
                </div>


                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#F8FAFC",
                        padding: 15,
                        borderRadius: 6,
                        marginBottom: 16,
                    }}
                >
                    <div style={{ display: "flex", gap: 12 }}>
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background: "#E2E8F0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600, color: "#44536A"
                            }}
                        >
                            SK
                        </div>

                        <div>
                            <div style={{ fontWeight: 500, fontSize: 18, color: "#222222" }}>Ravi Kumar</div>
                            <div style={{ fontSize: 12, }}>
                                <span style={{ backgroundColor: "#FFEFCF", fontSize: 10, color: "#222222", padding: "6px 14px", borderRadius: 10 }}>First Floor </span>
                                &nbsp; | &nbsp; <span style={{ backgroundColor: "#FFE0D9", fontSize: 10, color: "#222222", padding: "6px 14px", borderRadius: 10 }}> G105 - B02</span>
                            </div>
                        </div>
                    </div>

                    <div style={{}}>
                        <div style={{ fontSize: 12, color: "#64748B" }}>
                            Booking Amount
                        </div>
                        <div className="d-flex gap-2 align-items-center" style={{ fontWeight: 600 }}>

                            <div>
                                <label>₹500</label>
                            </div>
                            <Button
                                style={{
                                    background: "#16A34A",
                                    border: "none",
                                    fontWeight: 500,
                                    padding: "6px 11px",
                                    fontSize: 10
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>


                </div>


                <Table
                    responsive="md"
                >

                    <thead style={{
                        fontFamily: "Gilroy", backgroundColor: "#F9FAFB", color: "#6B7280", fontSize: 12, fontStyle: "normal", fontWeight: 500, position: "sticky",
                        top: 0,
                        zIndex: 1
                    }}>
                        <tr>
                            <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>

                                TYPE </th>

                            <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }} >


                                INV NO </th>

                            <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>


                                DUE DATE</th>

                            <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>


                                INVOICE AMOUNT </th>

                            <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>


                                INVOICE BALANCE</th>

                            <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, textTransform: "capitalize" }}>


                                AMOUNT TO APPLY</th>



                        </tr>
                    </thead>



                    <tbody>
                        {sortedData && sortedData.length > 0 ? (
                            sortedData.map((item, index) => (
                                <tr key={index} style={{ fontSize: 14, }}>
                                    <td>{item.type}</td>

                                    <td style={{ color: "#2563EB", cursor: "pointer" }}>
                                        {item.invNo}
                                    </td>

                                    <td>{item.dueDate}</td>

                                    <td style={{ fontWeight: 600 }}>
                                        ₹{item.invoiceAmount.toFixed(2)}
                                    </td>

                                    <td>₹{item.invoiceBalance.toFixed(2)}</td>


                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.applyAmount}
                                            onChange={(e) =>
                                                handleApplyAmountChange(index, e.target.value)
                                            }
                                            placeholder="₹ 0.00"
                                            style={{
                                                fontFamily: "Gilroy",
                                                fontSize: 14,
                                                height: 34,
                                                textAlign: "start",
                                                borderRadius: 6,
                                                border: "1px solid #E5E7EB",
                                                paddingRight: 10, boxShadow: "none",
                                                fontWeight: item.applyAmount ? 600 : 500
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                                    No invoices found
                                </td>
                            </tr>
                        )}
                    </tbody>


                </Table>


                <div
                    style={{
                        marginTop: 24,
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            // width: "100%",               
                            backgroundColor: "#F8F8F8",
                            padding: "14px 20px",
                            borderRadius: 10,
                        }}
                    >
                        <div className='g-2'
                            style={{
                                display: "flex",
                                justifyContent: "space-between ",
                                marginBottom: 8, gap: 10
                            }}
                        >
                            <div style={{ fontSize: 12, color: "#64748B" }}>
                                Amount Applied
                            </div>
                            <div style={{ fontWeight: 600 }}>₹ 0.00</div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ fontSize: 12, color: "#64748B" }}>
                                Available Balance
                            </div>
                            <div style={{ fontWeight: 600 }}>₹ 500.00</div>
                        </div>
                    </div>
                </div>


                {/* Actions */}
                <div
                    style={{
                        marginTop: 24,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 12,
                    }}
                >
                    <Button variant="light" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        style={{
                            background: "#1E45E1",
                            border: "none",
                            fontWeight: 500,
                            padding: "6px 16px",
                        }}
                    >
                        Apply →
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
ApplyBookingModal.propTypes = {
  show: PropTypes.bool,        
  handleClose: PropTypes.func.isRequired,
};

export default ApplyBookingModal;
