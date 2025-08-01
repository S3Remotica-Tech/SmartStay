/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function LongStayRecurringModal({ handleClose, show }) {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [billingDate, setBillingDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [noticePeriod, setNoticePeriod] = useState(null);
    const [errors, setErrors] = useState({});
    const [formLoading, setFormLoading] = useState(false)

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




    const handleSave = () => {
        const newErrors = {};
        if (!billingDate) {
            newErrors.billingDate = "Please enter billing date of month";
        }
        if (!dueDate) {
            newErrors.dueDate = "Please enter due date of month";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostel_id: Number(state.login.selectedHostel_Id),
                    billingDateOfMonth: parseInt(billingDate?.value, 10),
                    dueDateOfMonth: parseInt(dueDate?.value, 10),
                    isActive: 1,
                    noticePeriod: parseInt(noticePeriod?.value, 10),
                    billFrequency:"Monthly"
                },
            })
            setFormLoading(false)
        }
    };





    useEffect(() => {
        if (state.Settings.SettingsRecurringAddSuccess === 200) {
            setFormLoading(false)
            handleClose()
            dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostel_id: state.login.selectedHostel_Id } });
            setTimeout(() => {
                dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
            }, 100);
        }
    }, [state.Settings.SettingsRecurringAddSuccess]);


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])






    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                style={{ fontFamily: "sans-serif" }}
                backdrop="static"

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
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Billing Date"
                            value={billingDate}
                            onChange={(selected) => {
                                setBillingDate(selected);
                                setErrors((prev) => ({ ...prev, billingDate: "" }));
                            }}


                        />

                        {errors.billingDate && (
                            <div className="d-flex align-items-center mt-1">
                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                <label
                                    className="mb-0"
                                    style={{
                                        color: "red",
                                        fontSize: "12px",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                    }}
                                >
                                    {errors.billingDate}
                                </label>
                            </div>
                        )}

                    </Form.Group>

                    <Form.Group controlId="dueDate" style={{ marginBottom: 16 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Due Date of Month</Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Due Date"
                            value={dueDate}
                            onChange={(selected) => {
                                setDueDate(selected);
                                setErrors((prev) => ({ ...prev, dueDate: "" }));
                            }} />
                        {errors.dueDate && (
                            <div className="d-flex align-items-center mt-1">
                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                <label
                                    className="mb-0"
                                    style={{
                                        color: "red",
                                        fontSize: "12px",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                    }}
                                >
                                    {errors.dueDate}
                                </label>
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group controlId="noticePeriod" style={{ marginBottom: 24 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Notice Period</Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Notice Period"
                            value={noticePeriod}
                            onChange={(selected) => setNoticePeriod(selected)}

                        />
                    </Form.Group>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: 24,
                            gap: 5,
                            marginRight: 2
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
                            onClick={handleSave}
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


                    {formLoading &&
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                opacity: 0.75,
                                zIndex: 10,
                            }}
                        >
                            <div
                                style={{
                                    borderTop: '4px solid #1E45E1',
                                    borderRight: '4px solid transparent',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    animation: 'spin 1s linear infinite',
                                }}
                            ></div>
                        </div>
                    }
                    {state.createAccount?.networkError ?
                        <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                        </div>
                        : null}


                </Modal.Body>
            </Modal>
        </>
    );
}

LongStayRecurringModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,


};
export default LongStayRecurringModal;
