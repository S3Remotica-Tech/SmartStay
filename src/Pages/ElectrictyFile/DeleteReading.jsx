/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
// import ErrorMessage from '../../Components/ErrorMessage'

function DeleteReading({ show, handleClose, deleteDetails }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();



    const handleDeleteReading = () => {
        handleClose();


        dispatch({ type: 'CLEAR_DELETE_ROOM_ERROR' })
    };

   
    // console.log("deleteDetails", deleteDetails)


    const handleDeleteConfirm = () => {
        // console.log("calledddd")
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
                <Modal.Header className="!border-b-0"
                  >
                    <Modal.Title className="text-lg font-semibold font-gilroy text-center flex-1">
                        Delete Reading
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body
                    className="!text-sm !font-semibold !font-gilroy !text-center !mt-[-20px]"
                >
                    Are you sure you want to delete the reading?
                </Modal.Body>
             <Modal.Footer
                    className="!justify-center !border-t-0 !mt-[-10px]"
                >

                    <Button onClick={handleDeleteReading} className="!rounded-lg !px-10 !py-4 !border !border-blue-700 !bg-white !text-blue-700 !font-gilroy">
                        Cancel
                    </Button>

                    <Button className="!rounded-lg !px-10 !py-4 !border !border-blue-700 !bg-blue-700 !text-white !font-gilroy"
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