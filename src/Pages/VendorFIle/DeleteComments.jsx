/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

function DeleteComments({ open, onClose, selectedCommentId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleConfirmDelete = () => {
    if (selectedCommentId) {
      setDeleteLoading(true);
      dispatch({
        type: "DELETE_VENDOR_COMMENTS_SAGA",
        payload: { commentId: selectedCommentId },
      });
    }
  };

  // console.log("selectedCommentId", selectedCommentId);

  useEffect(() => {
    if (state.ComplianceList?.deleteCommentsVendorstatusCode === 200) {
      setDeleteLoading(false);
    }
  }, [state.ComplianceList?.deleteCommentsVendorstatusCode]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-[90%] max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-center text-[18px] font-semibold font-gilroy text-[#222222]">
          Delete Comment?
        </h2>

        <p className="mt-3 text-center text-[14px] font-medium font-gilroy text-[#4B4B4B]">
          Are you sure you want to delete this comment?
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="w-full max-w-[160px] h-[52px] rounded-lg border border-[#1E45E1] bg-white text-[#1E45E1] text-[14px] font-semibold font-gilroy hover:bg-[#EEF2FF]"
          >
            Cancel
          </button>

          <button
            disabled={deleteLoading}
            onClick={handleConfirmDelete}
            className={`w-full max-w-[160px] h-[52px] rounded-lg bg-[#1E45E1] text-white text-[14px] font-semibold font-gilroy flex items-center justify-center gap-2 ${
              deleteLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#1638BF]"
            }`}
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
        </div>
      </div>
    </div>
  );
}
DeleteComments.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  selectedCommentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default DeleteComments;
