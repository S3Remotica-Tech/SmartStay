/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import ErrorMessage from "../../Components/ErrorMessage";
import { CloseCircle } from "iconsax-react";

const RemoveRentRevision = ({ open, onClose }) => {
  if (!open) return null;

  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl font-gilroy">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#101828]">
            Delete New Rent
          </h2>

          <button onClick={onClose}>
            <CloseCircle size={22} color="#667085" />
          </button>
        </div>

        <p className="mt-4 text-sm text-[#667085]">
          Are you sure you want to delete the new monthly rent?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#D0D5DD] px-4 py-2 text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={deleteLoading}
            // onClick={handleDelete}
            className={`
    rounded-lg
    px-10
    py-2
    border
    border-[#1E45E1]
    bg-[#1E45E1]
    text-white
    text-sm
    font-semibold
    font-gilroy
    transition-all
    ${deleteLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#1738B8]"}
  `}
          >
            {deleteLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveRentRevision;
