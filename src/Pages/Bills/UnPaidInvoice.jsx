/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';

// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";

import { Form } from "react-bootstrap";





function UnPaidInvoice({ show, handleClose, selectedInvoice }) {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false);

// console.log("selectedInvoice",selectedInvoice)
    const confirmUnpaid = () => {
        if (selectedInvoice) {
            dispatch({
                type: "MANUAL_BILL_UPDATE_UNPAID_SAGA",
                payload: {
                    hostelId: selectedInvoice.hostelId || state?.login?.selectedHostel_Id,
                    invoiceId: selectedInvoice.invoiceId
                }
            });
        }

        setFormLoading(true);
    };


    useEffect(() => {
        if (state.InvoiceList.manualInvoiceUnpaidStatusCode === 200) {
            setFormLoading(false);
            handleClose()
        }

    }, [state.InvoiceList.manualInvoiceUnpaidStatusCode])

    useEffect(() => {
        if (state.InvoiceList?.unPaidError) {
            setFormLoading(false);
        }

    }, [state.InvoiceList?.unPaidError])


    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            dialogClassName="!max-w-md !w-full"
        >

            <Modal.Header className="!flex !justify-center !border-0 !pb-0">
                <Modal.Title className="!text-lg !font-semibold !font-gilroy">
                    Mark Invoice as Unpaid ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="!relative !text-gray-600 !text-center !pt-3 !pb-2 !text-base !font-medium !font-gilroy">
                Are you sure you want to mark this invoice as unpaid?
            </Modal.Body>

            {formLoading && (
                <div className="!absolute !inset-0 !flex !items-center !justify-center !bg-transparent !opacity-75 !z-10">
                    <div className="!w-10 !h-10 !rounded-full !border-4 !border-t-[#1E45E1] !border-r-transparent !animate-spin" />
                </div>
            )}

            <Modal.Footer className="!flex !justify-center !gap-4 !mb-2 !border-0">

                <Button
                    onClick={handleClose}
                    className="!w-[130px] !h-[52px] !rounded-lg !border !border-[#1E45E1] !bg-white !text-[#1E45E1] !text-sm !font-semibold !font-gilroy"
                >
                    Cancel
                </Button>

                <Button disabled={formLoading}
                    className="!w-[130px] !h-[52px] !rounded-lg !border !border-[#1E45E1] !bg-[#1E45E1] !text-white !text-sm !font-semibold !font-gilroy"
                    onClick={confirmUnpaid}
                >
                    Confirm
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default UnPaidInvoice