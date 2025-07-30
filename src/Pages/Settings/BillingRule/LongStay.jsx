import React, { useState } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";


function LongStayRecurringModal({ handleClose, show }) {

    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0'),
        label: (i + 1).toString().padStart(2, '0'),
    }));

    const selectStyle = {
        control: (base) => ({
            ...base,
            height: 45,
            border: "1px solid #D9D9D9",
            borderRadius: "8px",
            fontSize: "16px",
            color: "#4B4B4B",
            fontFamily: "Gilroy",
            fontWeight: 500,
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            fontFamily: "Gilroy",
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            maxHeight: "120px",
            padding: 0,
            scrollbarWidth: "thin",
            overflowY: "auto",
            fontFamily: "Gilroy",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#555",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#555",
            display: "inline-block",
            fill: "currentColor",
            lineHeight: 1,
            stroke: "currentColor",
            strokeWidth: 0,
            cursor: "pointer",
        }),
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused
                ? "#1E45E1"
                : "white",
            color: state.isFocused
                ? "white"
                : "#222",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
    };
    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                style={{ fontFamily: "sans-serif" }}
            >
                <Modal.Header style={{ border: "none" }}>
                    <Modal.Title
                        style={{
                            fontSize: 18,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                        }}
                    >
                        Long Stay Recurring
                    </Modal.Title>

                    <CloseCircle
                        size="24"
                        color="#000"
                        onClick={handleClose}
                        style={{ cursor: "pointer" }}
                    />
                </Modal.Header>

                <Modal.Body className="pt-0">

                    <Form.Group controlId="billingDate" style={{ marginBottom: 16 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Billing Date of Month</Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Billing Date" />
                    </Form.Group>

                    <Form.Group controlId="dueDate" style={{ marginBottom: 16 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Due Date of Month</Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Due Date" />
                    </Form.Group>

                    <Form.Group controlId="noticePeriod" style={{ marginBottom: 24 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Notice Period</Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Notice Period" />
                    </Form.Group>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: 24,
                            gap: 5,
                            marginRight:2
                        }}
                    >
                        <Button
                            onClick={handleClose}
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #4B4B4B",
                                borderRadius: 12,
                                padding: "8px 35px",
                                fontWeight: 400,
                                                           fontFamily: "Gilroy",
                                color: '#4B4B4B'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {

                                handleClose();
                            }}
                            style={{
                                backgroundColor: "#1E45E1",
                                borderRadius: 12,
                                padding: "8px 45px",
                                fontWeight: 400,
                                border: "none",
                                fontFamily: "Gilroy",
                                color: "#fff"
                            }}
                        >
                            Save
                        </Button>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

const selectStyle = {
    height: 50,
    borderRadius: 8,
    border: "1px solid #D9D9D9",
    fontSize: 16,
    fontWeight: 500,
};

export default LongStayRecurringModal;
