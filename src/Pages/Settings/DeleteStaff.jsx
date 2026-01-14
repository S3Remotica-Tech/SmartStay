import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";




function DeleteStaff({ show, handleClose, deleteId }) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (deleteId) {
            dispatch({ type: "DELETEUSER", payload: { userId: deleteId, hostelId: state.login.selectedHostel_Id } });
        }
    };




    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            dialogClassName="custom-delete-modal"
        >
            <Modal.Header style={{ borderBottom: "none" }}>
                <Modal.Title
                    className="w-100 text-center mt-2"
                    style={{
                        fontSize: "18px",
                        fontFamily: "Gilroy",

                        fontWeight: 600,
                        color: "#222222",
                    }}
                >
                    Delete Staff ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body
                className="text-center"
                style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    color: "#646464",

                    marginTop: "-27px",
                }}
            >
                Are you sure you want to delete the Staff ?{" "}
            </Modal.Body>
            <Modal.Footer
                className="d-flex justify-content-center"
                style={{
                    borderTop: "none",
                    marginTop: "-10px",
                }}
            >
                <Button
                    className="me-2"
                    style={{
                        width: "100%",
                        maxWidth: 160,
                        height: 52,
                        borderRadius: 8,
                        padding: "12px 20px",
                        background: "#fff",
                        color: "#1E45E1",
                        border: "1px solid #1E45E1",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    style={{
                        width: "100%",
                        maxWidth: 160,
                        height: 52,
                        borderRadius: 8,
                        padding: "12px 20px",
                        background: "#1E45E1",
                        color: "#FFFFFF",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                    }}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteStaff