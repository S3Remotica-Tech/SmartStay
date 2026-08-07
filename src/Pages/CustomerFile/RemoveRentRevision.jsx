/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ErrorMessage from "../../Components/ErrorMessage";
import { CloseCircle } from "iconsax-react";

const RemoveRentRevision = ({ open, onClose }) => {
  if (!open) return null;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const CustomerOverView = state?.UsersList?.customerdetails;

  const handleConfirmDelete = () => {
    if (CustomerOverView?.hostelId && CustomerOverView?.customerId) {
      dispatch({
        type: "REMOVE_RENT_REVISION_UPDATE_SAGA",
        payload: {
          hostelId: CustomerOverView?.hostelId,
          customerId: CustomerOverView?.customerId,
        },
      });
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.removeRentRevisionSuccess) {
      setDeleteLoading(false);
      onClose();
    }
  }, [state.UsersList?.removeRentRevisionSuccess]);

  useEffect(() => {
    if (state.UsersList?.RentRevisionError) {
      setDeleteLoading(false);
    }
  }, [state.UsersList?.RentRevisionError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setDeleteLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 300);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-[90%] max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-center">
          <h2 className="text-center text-[18px] font-semibold font-gilroy text-[#222222]">
            Delete New Monthly Rent
          </h2>
        </div>

        <p className="mt-3 text-center text-[14px] font-medium font-gilroy text-[#4B4B4B]">
          Are you sure you want to delete the new monthly rent?
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
};

export default RemoveRentRevision;
