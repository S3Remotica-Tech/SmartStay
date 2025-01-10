import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';

const SettingsElectricityTable = ({ hostelid }) => {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    useEffect(() => {
        if (hostelid) {
            dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
        }
    }, [hostelid])

    return (
        <div className="mt-4">
            {/* <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Electricity</h3>
                <button className="btn btn-primary" onClick={toggleModal}>
                    + Add Electricity
                </button>
            </div> */}

            {/* Responsive Table */}

            <div className="table-responsive"
                style={{
                    border: "1px solid #EBEBEB", // Add border around the table container
                    borderRadius: "10px", // Rounded corners for the table
                    overflow: "hidden", // Clip content to maintain the border-radius
                }}>
                <table className="table table-borderless align-middle"
                    style={{ color: "#222" }}
                >
                    <thead
                        className="text-muted"
                        style={{
                            backgroundColor: "#E7F1FF",
                            fontWeight: 600,
                            fontSize: "14px",
                            textAlign: "left",
                            position:"sticky",
                            top:0,
                            zIndex:1,
                        }}
                    >
                        <tr>
                            <th>Calculation Type</th>
                            <th>Calculation Start Date</th>
                            <th>Calculation End Date</th>
                            <th>Unit</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "14px", color: "#333" }}>
                        {state.Settings.EBBillingUnitlist?.length > 0 && state.Settings.EBBillingUnitlist.map((row, index) => (
                            <tr key={index}>
                                <td>Monthly</td>
                                <td><span style={{
                                    backgroundColor: "#F9F9F5",
                                    borderRadius: "24px",
                                    padding: "8px 12px",
                                }}>{row.start_date}</span></td>
                                <td><span style={{
                                    backgroundColor: "#F9F9F9",
                                    borderRadius: "24px",
                                    padding: "8px 12px",
                                }}>{row.end_date}</span></td>
                                <td>{row.unit}</td>
                                <td>{row.amount}</td>
                                <td>
                                    <button
                                        className="btn p-0 border-0 bg-transparent"
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img
                                            src="https://img.icons8.com/ios-glyphs/30/null/menu-2.png"
                                            alt="Menu"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div
                            className="modal-content"
                            style={{ borderRadius: "10px", overflow: "hidden" }}
                        >
                            {/* Modal Header */}
                            <div
                                className="modal-header"
                                style={{
                                    borderBottom: "none",
                                    backgroundColor: "#F5F5F5",
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            >
                                <h5 className="modal-title">Recurring Enable</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={toggleModal}
                                    aria-label="Close"
                                ></button>
                            </div>

                            {/* Modal Body */}
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">
                                        EB calculation Start Date will be
                                    </label>
                                    <select className="form-select">
                                        <option>Start Day</option>
                                        <option>Day 1</option>
                                        <option>Day 15</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        EB calculation End Date will be
                                    </label>
                                    <select className="form-select">
                                        <option>End Day</option>
                                        <option>Day 30</option>
                                        <option>Day 31</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">On Every</label>
                                    <select className="form-select">
                                        <option>Month</option>
                                        <option>Week</option>
                                        <option>Year</option>
                                    </select>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div
                                className="modal-footer"
                                style={{
                                    justifyContent: "center",
                                    borderTop: "none",
                                    paddingBottom: "20px",
                                }}
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        backgroundColor: "#007BFF",
                                        borderColor: "#007BFF",
                                    }}
                                    onClick={toggleModal}
                                >
                                    + Add Electricity
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsElectricityTable;
