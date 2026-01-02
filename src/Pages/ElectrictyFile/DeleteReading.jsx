/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage'

function DeleteReading({ show, handleClose, deleteDetails }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();



    const handleDeleteReading = () => {
        handleClose();


        dispatch({ type: 'CLEAR_DELETE_ROOM_ERROR' })
    };

   
    console.log("deleteDetails", deleteDetails)


    const handleDeleteConfirm = () => {
        console.log("calledddd")
        if ((deleteDetails?.readingId || deleteDetails?.id) && state.login.selectedHostel_Id ) {
            dispatch({
                type: 'DELETEREADING',
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    readingId: deleteDetails?.readingId || deleteDetails?.id,

                }
            })
        }

    }



    return (
        <div>
            <Modal
                show={show}
                onHide={handleDeleteReading}
                centered
                backdrop="static"
                dialogClassName="custom-delete-modal"
            >
                <Modal.Header
                    style={{
                        borderBottom: "none",
                    }}
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
                        Delete Reading
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
                    Are you sure you want to delete the reading?
                </Modal.Body>
                {/* {deleteRoomError && (
          <ErrorMessage message={deleteRoomError} type="error" />
        )} */}

                <Modal.Footer
                    style={{
                        justifyContent: "center",
                        borderTop: "none",
                        marginTop: "-10px",
                    }}
                >

                    <Button onClick={handleDeleteReading} style={{ borderRadius: 8, padding: "16px 40px", border: "1px solid #1E45E1", backgroundColor: "#FFF", color: "#1E45E1", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                        Cancel
                    </Button>

                    <Button style={{ borderRadius: 8, padding: "16px 40px", border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
                        onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
DeleteReading.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    deleteDetails: PropTypes.object.isRequired,


}
export default DeleteReading