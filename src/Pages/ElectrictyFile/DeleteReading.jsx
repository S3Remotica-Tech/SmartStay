/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
// import ErrorMessage from '../../Components/ErrorMessage'

function DeleteReading({ show, handleClose, deleteDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteReading = () => {
    handleClose();

    dispatch({ type: "CLEAR_DELETE_ROOM_ERROR" });
  };

  const handleDeleteConfirm = () => {
    if (
      (deleteDetails?.readingId || deleteDetails?.id) &&
      state.login.selectedHostel_Id
    ) {
      dispatch({
        type: "DELETEREADING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          readingId: deleteDetails?.readingId || deleteDetails?.id,
        },
      });
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.deleteReadingStatusCode === 204) {
      setDeleteLoading(false);
    }
  }, [state.UsersList?.deleteReadingStatusCode]);

  useEffect(() => {
    if (state?.UsersList?.deleteReadingError) {
      setDeleteLoading(false);
      dispatch({ type: "REMOVE_DELETE_READING_ERROR" });
    }
  }, [state?.UsersList?.deleteReadingError]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleDeleteReading}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header className="!border-b-0">
          <Modal.Title className="!text-[19px] font-semibold font-gilroy text-center flex-1">
            Delete Reading
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="!text-sm !font-semibold !font-gilroy !text-center !mt-[-20px]">
          Are you sure you want to delete the reading?
        </Modal.Body>
        <Modal.Footer className="!justify-center !border-t-0 !mt-[-10px]">
          <Button
            onClick={handleDeleteReading}
            className="!rounded-lg !px-10 !py-3.5 !border !border-blue-700 !bg-white !text-blue-700 !font-gilroy"
          >
            Cancel
          </Button>

          <Button
            disabled={deleteLoading}
            onClick={handleDeleteConfirm}
            className={`
    !rounded-lg 
    !px-10 
    !py-3.5 
    !border 
    !border-blue-700 
    !bg-blue-700 
    !text-white 
    !font-gilroy
    !font-semibold
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
          >
            {deleteLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent !rounded-full animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
DeleteReading.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteDetails: PropTypes.object.isRequired,
};
export default DeleteReading;
