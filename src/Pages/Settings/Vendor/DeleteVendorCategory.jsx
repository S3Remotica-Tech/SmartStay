/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

function DeleteVendorCategory({ show, handleClose, deleteId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = () => {
    dispatch({ type: "REMOVE_DELETE_VENDOR_CATEGORY_ERROR" });

    if (deleteId) {
      dispatch({
        type: "DELETE_VENDOR_CATEGORY_SAGA",
        payload: {
          categoryId: deleteId,
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
    setDeleteLoading(true);
  };

  useEffect(() => {
    if (state.Settings?.deleteVendorCategorySuccessStatus === 200) {
      setDeleteLoading(false);
    }
  }, [state.Settings?.deleteVendorCategorySuccessStatus]);

  useEffect(() => {
    if (state.Settings?.deleteCategoryError) {
      setDeleteLoading(false);
    }
  }, [state.Settings?.deleteCategoryError]);

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
          Delete Category ?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="!text-center !text-sm !font-medium !font-gilroy !text-gray-500 !mt-[-27px]">
        Are you sure you want to delete the Category ?
      </Modal.Body>

      <Modal.Footer className="!flex !justify-center !items-center !gap-2 !border-t-0 !mt-[-10px]">
        <button
          onClick={handleClose}
          className="!flex-1 !max-w-[160px] !h-[52px] !rounded-lg !px-5 !py-3 !bg-white !text-blue-700 !border !border-blue-700 !font-semibold !font-gilroy !text-sm"
        >
          Cancel
        </button>

        <button
          disabled={deleteLoading}
          onClick={handleDelete}
          className={`
    !flex-1 
    !max-w-[160px] 
    !h-[52px] 
    !rounded-lg 
    !px-5 
    !py-3 
    !bg-blue-700 
    !text-white 
    !font-semibold 
    !font-gilroy 
    !text-sm
    !flex 
    !items-center 
    !justify-center 
    !gap-2
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
        >
          {deleteLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
DeleteVendorCategory.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default DeleteVendorCategory;
