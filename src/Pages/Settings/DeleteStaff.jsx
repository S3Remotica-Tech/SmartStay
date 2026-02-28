/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";




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

            <Modal.Header className="!border-b-0 mb-2">
                <Modal.Title className="!w-full !text-center !mt-2 !text-lg !font-semibold !font-gilroy !text-gray-900">
                    Delete Staff ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="!text-center !text-sm !font-medium !font-gilroy !text-gray-500 !mt-[-27px]">
                Are you sure you want to delete the Staff ?
            </Modal.Body>

            <Modal.Footer className="!flex !justify-center !items-center !gap-2 !border-t-0 !mt-[-10px]">
                <button
                    onClick={handleClose}
                    className="!flex-1 !max-w-[160px] !h-[52px] !rounded-lg !px-5 !py-3 !bg-white !text-blue-700 !border !border-blue-700 !font-semibold !font-gilroy !text-sm"
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    className="!flex-1 !max-w-[160px] !h-[52px] !rounded-lg !px-5 !py-3 !bg-blue-700 !text-white !font-semibold !font-gilroy !text-sm"
                >
                    Delete
                </button>
            </Modal.Footer>



        </Modal>
    )
}
DeleteStaff.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    deleteId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default DeleteStaff