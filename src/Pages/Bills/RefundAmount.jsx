/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import { CloseCircle, DocumentDownload } from "iconsax-react";
import Profile2 from "../../Assets/Images/New_images/bank.png";
import homearrow from "../../Assets/Images/New_images/bank.png";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux';




function RefundAmount({ show, handleClose, refundDetails }) {


    console.log("refundDetails", refundDetails)

    const state = useSelector(state => state)
    const dispatch = useDispatch();


    const [refundAmount, setRefundAmount] = useState("");
    const [refundDate, setRefundDate] = useState(null);
    const [refundFrom, setRefundFrom] = useState(null);
    const [transactionId, setTransactionId] = useState("");
    const [refundAmountError, setRefundAmountError] = useState("");
    const [refundDateError, setRefundDateError] = useState("");
    const [refundFromError, setRefundFromError] = useState("");
    const [formRecordLoading, setFormRecordLoading] = useState(false)


    useEffect(() => {
        if (refundDetails?.invoiceId && state?.login?.selectedHostel_Id) {
            dispatch({ type: 'GETINITIALIZEREFUNDDETAILS', payload: { hostelId: state?.login?.selectedHostel_Id, invoiceId: refundDetails?.invoiceId } })

        }
    }, [])



    console.log("state", state.InvoiceList?.refundDetails)
    const bankOptions = state.InvoiceList?.refundDetails?.listBanks?.map(bank => ({
        value: bank.bankId,
        label: `${bank.bankName}`
    })) || [];

    const handleRefundAmount = (e) => {
        setRefundAmount(e.target.value);
        if (e.target.value.trim() === "") setRefundAmountError("Please enter amount");
        else setRefundAmountError("");
    };

    const handleRefundDate = (date) => {
        setRefundDate(date);
        if (!date) setRefundDateError("Please select a date");
        else setRefundDateError("");
    };

    const handleRefundFrom = (selectedOption) => {
        setRefundFrom(selectedOption);
        if (!selectedOption) setRefundFromError("Please select a refund source");
        else setRefundFromError("");
    };

    const handleTransactionId = (e) => {
        setTransactionId(e.target.value);

    };


    const handleSaveInvoiceList = () => {
        let valid = true;

        if (!refundAmount || refundAmount <= 0) {
            setRefundAmountError("Please enter refund amount");
            valid = false;
        }
        if (!refundDate) {
            setRefundDateError("Please select  refund date");
            valid = false;
        }
        if (!refundFrom) {
            setRefundFromError("Please select  refund account");
            valid = false;
        }

        if (!valid) return;

        const payload = {
            refundAmount: refundAmount,
            refundDate: dayjs(refundDate).format("DD-MM-YYYY"),
            bankId: refundFrom.value,
            referenceNumber: transactionId,
            invoiceId: refundDetails?.invoiceId,
            hostelId: state?.login?.selectedHostel_Id,
        };

        dispatch({ type: "CREATEREFUND", payload });
        setFormRecordLoading(true)
    };


    useEffect(() => {
        if (state.InvoiceList?.createRefundStatusCode === 200) {
            setFormRecordLoading(false)
                   }

    }, [state.InvoiceList?.createRefundStatusCode])




    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
        >
            <Modal.Dialog
                className="m-0 p-0"
            >



                <Modal.Header
                    style={{ paddingTop: 10, position: "relative" }}
                >
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            fontFamily: "Gilroy", textAlign: "start",

                        }}
                    >
                        {`Refund Amount `}
                        {refundDetails?.fullName && (
                            <span>
                                -
                                <span style={{ color: "#1E45E1" }}>
                                    {" "}
                                    {refundDetails?.fullName}
                                </span>{" "}
                            </span>
                        )}
                        {refundDetails?.invoiceNumber && (
                            <span>
                                -
                                <span style={{ color: "#1E45E1" }}>
                                    {" "}
                                    {refundDetails?.invoiceNumber}
                                </span>{" "}
                            </span>
                        )}
                    </div>

                    <CloseCircle size="24" color="#000" onClick={handleClose}
                        style={{ cursor: 'pointer' }} />
                </Modal.Header>




                <Modal.Body>
                    <>
                        <div className="d-flex align-items-center " >
                            <img
                                src={refundDetails?.profilePic ? refundDetails?.profilePic : Profile2}

                                style={{ height: 55, width: 55, cursor: "pointer" }}
                                alt="profile"
                                className="rounded-circle me-3"
                            />
                            <div>
                                <p style={{ fontSize: "1.25rem", fontFamily: "Gilroy", fontWeight: 600 }} className="mb-0">
                                    {refundDetails.fullName}                   </p>
                                <div className="d-flex mb-2">
                                    <span className="badge rounded-pill bg-warning text-dark me-2" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                                        Floor name
                                    </span>
                                    <span className="badge rounded-pill bg-danger-subtle text-dark" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                                        Room : Bed :
                                    </span>
                                </div>
                            </div>
                            <div className="ms-auto text-end mt-2">
                                <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B", padding: 0, margin: 0 }}>Refund Amount</p>
                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600, }}>
                                    {state.InvoiceList?.refundDetails?.refundableAmount}
                                </p>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Form.Group

                                    controlId="exampleForm.ControlInput3"
                                >
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            marginBottom: 2


                                        }}
                                    >
                                        Refund Amount {" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Form.Label>

                                    <Form.Control
                                        type="number"
                                        min="0"
                                        step="1"
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
                                        placeholder="Enter Amount"
                                        className="no-spinner"
                                        value={refundAmount}
                                        onChange={handleRefundAmount}
                                        onKeyDown={(e) => {
                                            if (e.key === "-" || e.key === "e") e.preventDefault();
                                        }}

                                    />



                                    {refundAmountError.trim() !== "" && (
                                        <ErrorMessage message={refundAmountError} type="error" />
                                    )}
                                </Form.Group>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Form.Group

                                    controlId="exampleForm.ControlInput3"
                                >
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            marginBottom: 2


                                        }}
                                    >
                                        Balance Due {" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Form.Label>

                                    <Form.Control
                                        disabled
                                        type="number"
                                        min="0"
                                        step="1"
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
                                        placeholder="Enter Amount"
                                        className="no-spinner"
                                        value={
                                            (Number(state.InvoiceList?.refundDetails?.refundableAmount) || 0) -
                                            (Number(refundAmount) || 0)
                                        }

                                    />




                                </Form.Group>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Form.Group
                                    controlId="purchaseDate"
                                >
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Refund Date {" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Form.Label>
                                    <div
                                        style={{
                                            position: "relative",
                                            width: "100%",
                                        }}
                                    >

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
                                                value={refundDate ? dayjs(refundDate) : null}
                                                onChange={handleRefundDate}
                                                disabledDate={(current) => current && current > dayjs().endOf("day")}
                                                getPopupContainer={(triggerNode) =>
                                                    triggerNode.closest(".show-scroll") || document.body
                                                }
                                            />


                                        </div>
                                    </div>
                                    {refundDateError.trim() !== "" && (
                                        <ErrorMessage message={refundDateError} type="error" />
                                    )}
                                </Form.Group>




                            </div>



                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Form.Group
                                    className=""
                                    controlId="exampleForm.ControlInput2"
                                >
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "'Gilroy', sans-serif",
                                            fontWeight: 500,

                                        }}
                                    >
                                        Refund From {" "}
                                        <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
                                    </Form.Label>

                                    <Select
                                        options={bankOptions}
                                        onChange={handleRefundFrom}
                                        value={refundFrom}
                                        placeholder="Please Select"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        noOptionsMessage={() => "No options available"}
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                height: "49px",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy, sans-serif",
                                                fontWeight: 500,
                                                boxShadow: "none",
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                backgroundColor: "#f8f9fa",
                                                border: "1px solid #ced4da",
                                                fontFamily: "Gilroy, sans-serif",
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                backgroundColor: "#f8f9fa",
                                                maxHeight: "120px",
                                                padding: 0,
                                                scrollbarWidth: "thin",
                                                overflowY: "auto",
                                                fontFamily: "Gilroy, sans-serif",
                                            }),
                                            placeholder: (base) => ({
                                                ...base,
                                                color: "#555",
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                cursor: "pointer",
                                                backgroundColor: state.isFocused ? "lightblue" : "white",
                                                color: "#000",
                                            }),
                                            dropdownIndicator: (base) => ({
                                                ...base,
                                                color: "#555",
                                                cursor: "pointer"
                                            }),
                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                        }}
                                    />




                                    {refundFromError.trim() !== "" && (
                                        <ErrorMessage message={refundFromError} type="error" />
                                    )}
                                </Form.Group>
                            </div>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group

                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Transaction ID
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
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
                                        placeholder="Enter Transaction ID"
                                        value={transactionId}
                                        onChange={handleTransactionId}
                                    />
                                </Form.Group>
                            </div>




                        </div>
                    </>

                </Modal.Body>



                {formRecordLoading && <div
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
                </div>}



                <Modal.Footer style={{ border: "none" }}>


                    <div className="text-end mt-4">
                        <Button variant="" className="me-2" onClick={handleClose} style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }}>
                            Cancel
                        </Button>
                        <Button
                            style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400, backgroundColor: "#1E45E1" }}
                            onClick={handleSaveInvoiceList}
                        >Record</Button>
                    </div>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )
}

export default RefundAmount