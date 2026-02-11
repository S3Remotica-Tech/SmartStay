/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";

function DeleteTenantDocument({ showDeleteDoc, handleDeleteDocumentClose, showDocumentId }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();



    const CustomerOverView = state.UsersList?.customerdetails;

    const handleDeleteDocumentConfirm = () => {
        dispatch({
            type: "DELETETENANTDOCUMENT",
            payload: {
                hostelId: state.login.selectedHostel_Id,
                customerId: CustomerOverView?.customerId,
                documentId: showDocumentId,
            }
        });
    }

    useEffect(() => {
        if (state.UsersList?.tenantDocumentDeleteStatusCode === 204) {

            dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
            handleDeleteDocumentClose()
            setTimeout(() => {
                dispatch({ type: "REMOVE_DELETE_TENANT_DOCUMENT" });
            }, 100)
        }

    }, [state.UsersList?.tenantDocumentDeleteStatusCode])






    return (
        <div>
            <Modal
                show={showDeleteDoc}
                onHide={handleDeleteDocumentClose}
                centered
                backdrop="static"
                dialogClassName="custom-delete-modal"
            >

                <Modal.Header
                    style={{ borderBottom: "none" }}
                >
                    <Modal.Title
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            textAlign: "center",
                            flex: 1,
                        }}
                    >
                        Delete Document
                    </Modal.Title>
                </Modal.Header>


                <Modal.Body
                    style={{
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        textAlign: "center",
                        marginTop: "-20px",
                    }}
                >
                    Are you sure you want to delete this uploaded document?
                </Modal.Body>





                <Modal.Footer
                    style={{
                        justifyContent: "center",
                        borderTop: "none",
                        marginTop: "-10px",
                    }}
                >
                    <Button
                        onClick={handleDeleteDocumentClose}
                        style={{
                            borderRadius: 8,
                            padding: "16px 40px",
                            border: "1px solid #1E45E1",
                            backgroundColor: "#FFF",
                            color: "#1E45E1",
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDeleteDocumentConfirm}
                        style={{
                            borderRadius: 8,
                            padding: "16px 40px",
                            border: "1px solid #1E45E1",
                            backgroundColor: "#1E45E1",
                            color: "#fff",
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default DeleteTenantDocument
