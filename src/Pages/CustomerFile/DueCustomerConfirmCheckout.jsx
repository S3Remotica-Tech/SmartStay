/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { CloseCircle, DocumentDownload } from "iconsax-react";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import { Tooltip } from "bootstrap";
import ErrorMessage from '../../Components/ErrorMessage'



function DueCustomerConfirmCheckout({ show, handleClose, data, customerID }) {


    const handleClosecheck = () => {
        handleClose()
        dispatch({ type: "REMOVE_CONFORM_CHECKOUT_ERROR" });
    }

    const state = useSelector((state) => state);

    const dispatch = useDispatch();

    const [fields, setFields] = useState([]);
    const [comments, setComments] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [uploadFile, setUploadFile] = useState(null);

    const [ReturnAmount, setReturnAmount] = useState('')

    const [formLoading, setFormLoading] = useState(false)

    const [dataBed, setDataBed] = useState([])

    const [hostelData, setHostelData] = useState("")

    const [detuction, setDetuction] = useState("")


    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
        }
    }, [state.login.selectedHostel_Id]);





    useEffect(() => {
        const userData = state.UsersList.Users.filter((item) => item.ID === customerID);

        setDataBed(userData)
    }, [customerID]);
    useEffect(() => {
        if (state.UsersList?.chrckoutError) {
            setFormLoading(false)
        }

    }, [state.UsersList?.chrckoutError])



    useEffect(() => {
        if (state.UsersList.statusCodegetConfirmCheckout) {
            const validInvoices = state?.UsersList?.GetconfirmcheckoutBillDetails?.filter(
                (invoice) => invoice.balance > 0
            );



            const deduction_details = state?.UsersList?.nonRefundable_details?.filter(
                (deduction) => deduction.amount > 0
            );


            const invoiceTotal = Array.isArray(validInvoices)
                ? validInvoices.reduce((total, invoice) => total + Number(invoice.balance || 0), 0)
                : 0;



            if (Array.isArray(deduction_details) && deduction_details.length > 0) {
                const formattedFields = deduction_details.map((item) => ({
                    reason_name: item.reason || "",
                    amount: Number(item.amount) || 0,
                    showInput: false,
                    isDefault: false, // backend la irunthu vanthathu illana false
                }));

                formattedFields.unshift({
                    reason_name: "DueAmount",
                    amount: invoiceTotal,
                    showInput: false,
                    isDefault: true, // Backend la irunthu vanthathu
                });

                setFields(formattedFields);
            } else {
                setFields([
                    { reason_name: "DueAmount", amount: invoiceTotal, showInput: false, isDefault: true },
                ]);
            }
            // const rentBalance =
            //   state?.UsersList?.GetconfirmcheckoutBillDetails?.find(
            //     (item) => String(item.action).toLowerCase() === "rent"
            //   )?.balance ?? 0;
            // setRentalBalance(rentBalance)
            setDetuction(state?.UsersList?.Deduction)
            // setReFundableDetails(state?.UsersList?.Refundable_details)


            setHostelData(state?.UsersList?.hostelData)

        }

        setTimeout(() => {
            dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
        }, 500);
    }, [state.UsersList.statusCodegetConfirmCheckout, data]);


    const advanceAmount = state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount

    useEffect(() => {
        if (fields || advanceAmount) {
            const totalDeductions = fields.reduce((acc, item) => acc + Number(item.amount || 0), 0);
            const returnAmount = Number(advanceAmount || 0) - totalDeductions;
            setReturnAmount(returnAmount)
        }
    }, [fields, advanceAmount])






    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
        }
    };








    ;

    const handleCommentsChange = (event) => {
        setComments(event.target.value);

    };








    useEffect(() => {
        if (state.UsersList.conformChekoutError) {
            setFormLoading(false)

        }
    }, [state.UsersList.conformChekoutError])
    const quillRef = useRef(null);

    useEffect(() => {
        return () => {
            if (quillRef.current) {
                const editor = quillRef.current.getEditor?.();
                if (editor) {
                    editor.off("selection-change");
                    editor.off("text-change");
                }
            }
        };
    }, []);




    useEffect(() => {
        if (hostelData) {
            setCheckOutDate(hostelData?.CheckoutDate)
        }

    }, [hostelData])

    useEffect(() => {
        if (state.UsersList.statusCodeForDueCustomer === 200 || state.UsersList.statusCodeAddConfirmCheckout === 200) {
            setFormLoading(false)
            handleClosecheck()
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            })
            dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: dataBed[0]?.Floor, hostel_Id: state.login.selectedHostel_Id } })
            setTimeout(() => {
                dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
            }, 500);
        }

    }, [state.UsersList.statusCodeForDueCustomer, state.UsersList.statusCodeAddConfirmCheckout])


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])


    useEffect(() => {
        // Initialize tooltips with white background
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(
            (tooltipTriggerEl) =>
                new Tooltip(tooltipTriggerEl, {
                    customClass: "white-tooltip",
                })
        );
    }, []);
    useEffect(() => {
        // Inject custom style once
        const style = document.createElement("style");
        style.innerHTML = `
    .white-tooltip .tooltip-inner {
      background-color: white !important;
      color: black !important;
      border: 1px solid #ddd;
      font-size: 0.8rem;
    }
    .white-tooltip .tooltip-arrow::before {
      border-top-color: white !important;
    }
  `;
        document.head.appendChild(style);
    }, []);



    const handleConfirmCheckout = () => {
        if (data.customerId || data.currentTenantCustomerId) {
            dispatch({
                type: "CONFIRMCHECKOUT",
                payload: { customerId: data.customerId || data.currentTenantCustomerId, comments: comments }

            })


        }
    }
    useEffect(() => {
        if (state.UsersList.statuscodeForConformCheckout === 200) {
            handleClosecheck()
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            setTimeout(() => {
                dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
            }, 500);
        }
    }, [state.UsersList.statuscodeForConformCheckout])





    return (
        <div>

            <Modal show={show} onHide={handleClosecheck} centered >

                <Modal.Header
                    style={{ marginBottom: "10px", position: "relative", borderBottom: "none" }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                            }}
                        >
                            Check-out Tenant
                        </div>

                    </div>
                    <CloseCircle size="24" color="#000" onClick={handleClosecheck}
                        style={{ cursor: 'pointer' }} />
                </Modal.Header>
                <Modal.Body>

                    <div className="d-flex align-items-center " style={{ marginTop: "-30px" }}>
                        <img
                            src={
                                data?.user_profile && data?.user_profile !== "0"
                                    ? data?.user_profile
                                    : dataBed[0]?.profile && dataBed[0]?.profile !== "0"
                                        ? dataBed[0].profile
                                        : Profile2
                            }
                            style={{ height: 55, width: 55, cursor: "pointer" }}
                            alt="profile"
                            className="rounded-circle me-3"
                        />
                        <div>
                            <p style={{ fontSize: "1.25rem", fontFamily: "Gilroy", fontWeight: 600 }} className="mb-0">{data?.firstName || data?.currentTenantFirstName}</p>
                            <div className="d-flex mb-2">
                                <span className="badge rounded-pill bg-warning text-dark me-2" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                                    {data.floorName}
                                </span>
                                <span className="badge rounded-pill bg-danger-subtle text-dark" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                                    {data.roomName} - {data.bedName}
                                </span>
                            </div>
                        </div>
                        <div className="ms-auto text-end mt-2">
                            <p style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, color: "#4B4B4B", padding: 0, margin: 0 }}>Checkout Date</p>
                            <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600, }}>{data.bookedAt}</p>
                        </div>
                    </div>

                    {detuction?.DueAmount ? (
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400 }}>Status</span>
                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <Button
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        backgroundColor: "#F03E3E",
                                        padding: "3px 12px",
                                        borderRadius: 50,
                                        border: "none",
                                    }}
                                >
                                    Write-Off
                                </Button>
                            </div>

                        </div>
                    ) :
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400 }}>Status</span>
                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <Button
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        backgroundColor: "#0D9D35",
                                        padding: "3px 12px",
                                        borderRadius: 50,
                                        border: "none",
                                    }}
                                >
                                    Checkout
                                </Button>
                            </div>

                        </div>}


                    <Form.Group >
                        <Form.Label style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400 }}>Comments</Form.Label>
                        <Form.Control
                            style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 400, height: 50 }}
                            as="textarea"
                            placeholder="Please Enter Comments"
                            rows={3}
                            value={comments}
                            onChange={handleCommentsChange}
                        />
                    </Form.Group>
                    {/* } */}

                </Modal.Body>
                {state.UsersList?.chrckoutError && (
                    <ErrorMessage message={state.UsersList?.chrckoutError} type="error" />
                )}
                <Modal.Footer style={{ borderTop: "none", marginTop: "-10px" }}>
                    <Button style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }} className="btn btn-light" onClick={handleClosecheck}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmCheckout} style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }} variant="primary">Check-Out</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
DueCustomerConfirmCheckout.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
    customerID: PropTypes.func.isRequired,


};
export default DueCustomerConfirmCheckout