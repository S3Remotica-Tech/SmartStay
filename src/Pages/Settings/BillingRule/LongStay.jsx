/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../../Components/ErrorMessage';

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
            newErrors.billingDate = "Please select billing date of month";
        }
        if (!dueDate) {
            newErrors.dueDate = "Please select due date of month";
        }
        if(!noticePeriod){
             newErrors.notice = "Please select notice period";
        }


        if (billingDate && dueDate && Number(dueDate.value) < Number(billingDate.value)) {
        newErrors.dueDate = "Due date cannot be before billing date";
    }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostelId: state?.login?.selectedHostel_Id || "",
                    startDate: Number(billingDate?.value) || 0,
                    dueDate: Number(dueDate?.value) || 0,
                    noticeDays: Number(noticePeriod?.value) || 0,
                }
                })
            setFormLoading(true)
        }
    };





    useEffect(() => {
        if (state.Settings.SettingsRecurringAddSuccess === 201) {
            setFormLoading(false)
            handleClose()
            dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
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
                            }}>Billing Date of Month {" "}
                    <span style={{ color: "#FF0000", display: "inline-block", fontSize: "20px" }}>
                      *
                    </span></Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Billing Date"
                            value={billingDate}
                            onChange={(selected) => {
                                setBillingDate(selected);
                                setErrors((prev) => ({ ...prev, billingDate: "" }));
                            }}


                        />

                        {errors.billingDate && (
                            <ErrorMessage message={errors.billingDate} type="error" />
                        )}

                    </Form.Group>

                    <Form.Group controlId="dueDate" style={{ marginBottom: 16 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Due Date of Month {" "}
                    <span style={{ color: "#FF0000", display: "inline-block", fontSize: "20px" }}>
                      *
                    </span></Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Due Date"
                            value={dueDate}
                            onChange={(selected) => {
                                setDueDate(selected);
                                setErrors((prev) => ({ ...prev, dueDate: "" }));
                            }} />
                        {errors.dueDate && (
                            <ErrorMessage message={errors.dueDate} type="error" />
                        )}
                    </Form.Group>

                    <Form.Group controlId="noticePeriod" style={{ marginBottom: 24 }}>
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}>Notice Period {" "}
                    <span style={{ color: "#FF0000", display: "inline-block", fontSize: "20px" }}>
                      *
                    </span></Form.Label>
                        <Select options={dayOptions} styles={selectStyle} placeholder="Select Notice Period"
                            value={noticePeriod}
                            onChange={(selected) => {
                                setNoticePeriod(selected)
                                setErrors((prev) => ({ ...prev, notice: "" }));
                            }}

                        />
                         {errors.notice && (
                            <ErrorMessage message={errors.notice} type="error" />
                        )}
                    </Form.Group>
                    {state.createAccount?.networkError ?
                                <ErrorMessage message={state.createAccount?.networkError} type="error" />
                                : null}

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
