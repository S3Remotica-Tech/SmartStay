/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

function DeleteExpense({ show, handleClose, deleteExpenseRowData }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const ConfirmDeleteExpense = () => {
    dispatch({ type: "REMOVE_DELETE_EXPENSE_ERROR" });
    if (deleteExpenseRowData) {
      dispatch({
        type: "DELETEEXPENSE",
        payload: {
          expenseId: deleteExpenseRowData,
          hostelId: state.login.selectedHostel_Id,
        },
      });
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state.ExpenseList.deleteExpenseStatusCode === 204) {
      setDeleteLoading(false);
    }
  }, [state.ExpenseList.deleteExpenseStatusCode]);

  useEffect(() => {
    if (state.ExpenseList?.expenseRemoveError) {
      setDeleteLoading(false);
    }
  }, [state.ExpenseList?.expenseRemoveError]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[400px] rounded-xl bg-white shadow-lg mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6">
          <h2 className="text-center text-[18px] font-semibold font-gilroy">
            Delete expense?
          </h2>
        </div>

        <div className="px-6 py-4 text-center text-[14px] font-medium font-gilroy">
          Are you sure you want to delete this expense?
        </div>

        <div className="flex justify-center gap-2 p-6 pt-2">
          <button
            onClick={handleClose}
            className="w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white text-[#1E45E1] border border-[#1E45E1] font-semibold font-gilroy text-[14px]"
          >
            Cancel
          </button>

          <button
            disabled={deleteLoading}
            onClick={ConfirmDeleteExpense}
            className={`w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 bg-[#1E45E1] text-white font-semibold font-gilroy text-[14px]
              ${
                deleteLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
          >
            {deleteLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
DeleteExpense.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteExpenseRowData: PropTypes.object,
};

export default DeleteExpense;
