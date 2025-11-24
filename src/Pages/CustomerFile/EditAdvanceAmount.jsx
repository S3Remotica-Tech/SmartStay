/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
    Modal,
    Form,
    Button,
    FormControl

} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle, MessageQuestion, Trash } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function EditAdvanceAmount({ show, handleClose }) {



    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [monthlyRent, setMonthlyRent] = useState("");
    const [monthlyRentError, setMonthlyRentError] = useState("");

    const [effectiveFrom, setEffectiveFrom] = useState("");
    const [effectiveFromError, setEffectiveFromError] = useState("");
    const [reason, setReason] = useState(null);
    const [loading, setLoading] = useState(false)
    const rentInputRef = useRef(null);
    const dateRef = useRef(null);


    const reasonOptions = [
        { value: "Annual Rent Revision", label: "Annual Rent Revision" },
        { value: "Room Upgrade / Change", label: "Room Upgrade / Change" },
        { value: "Additional Amenities Added", label: "Additional Amenities Added" },
        { value: "Electricity / Utility Cost Updated", label: "Electricity / Utility Cost Updated" },
        {
            value: "Others",
            label: "Others",
            color: "#1E45E1"
        },
    ];


    const handleReasonChange = (selectedOption) => {
        if (selectedOption?.value !== "Others") {
            setReason(selectedOption);
        } else {
            setReason({ value: "Others", label: "Others" });
        }
        setReasonError("");
    };

    const handleMonthlyRentChange = (e) => {
        const value = e.target.value;

        if (/^[0-9\b]*$/.test(value)) {
            if (value === "" || Number(value) > 0) {
                setMonthlyRent(value);
                setMonthlyRentError("");
            }
        }
    };


    const handleEffectiveFromChange = (date, dateString) => {
        setEffectiveFrom(dateString);
        setEffectiveFromError("");
    };


    const handleSubmit = () => {
        let isValid = true;

        if (!monthlyRent || Number(monthlyRent) <= 0) {
            setMonthlyRentError("Please enter a valid monthly rent");
            rentInputRef.current?.focus();
            isValid = false;
        }

        // if (!effectiveFrom) {
        //     setEffectiveFromError("Please select an effective date");
        //     dateRef.current?.focus();
        //     isValid = false;
        // }



        if (!isValid) return;

        setLoading(true)


    };

    useEffect(() => {
        if (state.createAccount?.networkError) {
            setLoading(false)
        }

    }, [state.createAccount?.networkError])

    return (
        <div
            className="modal show"
            style={{
                display: "block",
                position: "initial",
            }}
        >
            <Modal show={show}
                onHide={handleClose}
                centered backdrop="static">
                <Modal.Dialog
                    style={{
                        maxWidth: 850, width: "100%",
                        paddingTop: 5,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                    className="m-0 p-0"
                >
                    <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title
                            style={{
                                fontSize: 18,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                            }}
                        >
                            Edit Advance Amount
                        </Modal.Title>

                        <CloseCircle size="24" color="#000"
                            onClick={handleClose}
                            style={{ cursor: "pointer" }} />
                    </Modal.Header>

                    <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll p-3 mt-0 me-3" >
                        <div className="row mb-0">

                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <div style={{ backgroundColor: "#B7C2F0", borderRadius: 8, border: "1px solid #C6D1FF" }} className="d-flex align-items-center p-2 gap-1">
                                    <MessageQuestion
                                        size="18"
                                        color="#222"
                                    /> {" "} <label style={{ fontSize: 11, fontFamily: "Gilroy", color: "#222" }}> Rent changes will apply from next billing cycle and are fully audit-logged</label>
                                </div>

                            </div> */}


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        New Advance Amount  {" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        ref={rentInputRef}
                                        value={monthlyRent}
                                        onChange={handleMonthlyRentChange}
                                        placeholder="Enter New Advance Amount"

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
                                    />
                                    {monthlyRentError && <ErrorMessage message={monthlyRentError} type="error" />}
                                </Form.Group>

                            </div>

                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Effective From  {" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Form.Label>
                                    <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                        <DatePicker ref={dateRef}
                                            style={{
                                                width: "100%",
                                                height: 48,
                                                cursor: "pointer",
                                                fontFamily: "Gilroy",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: 8,
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            value={effectiveFrom ? dayjs(effectiveFrom, "DD/MM/YYYY") : null}
                                            onChange={handleEffectiveFromChange}
                                        // disabledDate={(current) =>
                                        //     current && current < dayjs().startOf("day")
                                        // }
                                        />
                                        {effectiveFromError && (
                                            <ErrorMessage message={effectiveFromError} type="error" />
                                        )}
                                    </div>
                                </Form.Group>

                            </div> */}





                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Gilroy",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: "#222",
                                            fontStyle: "normal",
                                            lineHeight: "normal",
                                        }}
                                    >
                                        Reason
                                    </Form.Label>

                                    {reason?.label === "Others" ? (
                                        <div style={{ position: "relative" }}>
                                            <FormControl
                                                type="text"
                                                placeholder="Enter your reason"
                                                value={reason?.value === "Others" ? "" : reason?.value}
                                                onChange={(e) => {
                                                    const customReason = e.target.value;
                                                    setReason({ value: customReason, label: "Others" });
                                                }}
                                                style={{
                                                    fontSize: 16,
                                                    color: "#4B4B4B",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: 8,
                                                    height: 50,
                                                    boxShadow: "none",
                                                }}
                                            />
                                            <Trash
                                                size="18"
                                                color="#FF0000"


                                                variant="link"
                                                onClick={() => setReason(null)}
                                                style={{
                                                    position: "absolute",
                                                    right: 10,
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    fontSize: 14,
                                                    color: "#1E45E1",
                                                    textDecoration: "none",
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy", cursor: "Po"
                                                }}
                                            >

                                            </Trash>
                                        </div>) : (
                                        <Select
                                            value={reason}
                                            onChange={handleReasonChange}
                                            options={reasonOptions}
                                            placeholder="Select Reason"
                                            classNamePrefix="custom"
                                            // menuPlacement="auto"
                                            noOptionsMessage={() => "No reason available"}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    height: "50px",
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "8px",
                                                    fontSize: "16px",
                                                    color: "#4B4B4B",
                                                    fontFamily: "Gilroy",
                                                    boxShadow: "none",
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    cursor: "pointer",
                                                    fontFamily: "Gilroy",
                                                    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                                    color: state.data.value === "Others" ? "#1E45E1" : "#000",
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: "#555",
                                                }),
                                                indicatorSeparator: () => ({ display: "none" }), menuList: (base) => ({
                                                    ...base,
                                                    maxHeight: "150px",
                                                    overflowY: "auto", scrollbarWidth: "thin",
                                                    msOverflowStyle: "auto",
                                                }),
                                            }}
                                        />
                                    )}

                                </Form.Group>


                            </div>
                        </div>




                    </Modal.Body>

                    {loading && <div
                        style={{
                            position: 'absolute',
                            top: 100,
                            right: 0,
                            bottom: 0,
                            left: 0,
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
                    </div>}


                    <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
                        <div className="d-flex justify-content-end gap-3">


                            <Button
                                onClick={handleClose}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#fff",
                                    border: "none",
                                    color: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Update
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}

export default EditAdvanceAmount