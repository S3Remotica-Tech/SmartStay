/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

function DeleteBanking({
    deleteShow,
    handleCloseDelete,
    deleteBankId

}) {

    const [deleteLoading, setDeleteLoading] = useState(false);

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleDeleteBank = () => {
        dispatch({ type: "REMOVE_DELETE_V2_BANKING_ERROR" })
        if (deleteBankId && state.login.selectedHostel_Id) {
            dispatch({ type: "DELETE_V2_BANKING_SAGA", payload: { bankId: deleteBankId, hostelId: state.login.selectedHostel_Id } });
            setDeleteLoading(true)
        }
    }

    useEffect(() => {
        if (state.bankingDetails?.deleteBankingSuccess === 204) {
            setDeleteLoading(false)
            handleCloseDelete()
            // dispatch({ type: "REMOVE_DELETE_V2_BANKING_REDUCER" })
        }

    }, [state.bankingDetails?.deleteBankingSuccess])

    useEffect(() => {
        if (state.bankingDetails?.deleteBankingError) {
            setDeleteLoading(false)
        }
    }, [state.bankingDetails?.deleteBankingError])


    if (!deleteShow) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-[450px] rounded-[12px] bg-white shadow-xl">


                <div className="px-6 pt-6 text-center">
                    <h2 className="font-gilroy text-[18px] font-semibold text-[#222222]">
                        Delete Banking?
                    </h2>
                </div>


                <div className="px-6 py-2 text-center">
                    <p className="font-gilroy text-[14px] font-medium text-[#646464] mb-0">
                        Are you sure you want to delete this Bank ?
                    </p>
                </div>


                <div className="flex items-center justify-center gap-3 px-6 pb-6">
                    <button
                        type="button"
                        onClick={handleCloseDelete}

                        className=" w-full max-w-[160px] rounded-[8px] border border-[#1E45E1] bg-white
                         px-5 py-3 font-gilroy text-[14px] font-semibold text-[#1E45E1] hover:bg-[#F7FAFF] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>


                    <button
                        disabled={deleteLoading}
                        onClick={handleDeleteBank}
                        className={`w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 bg-[#1E45E1] text-white font-semibold font-gilroy text-[14px]
              ${deleteLoading
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
DeleteBanking.propTypes = {
    deleteShow: PropTypes.bool.isRequired,
    handleCloseDelete: PropTypes.func.isRequired,
    deleteBankId: PropTypes.string.isRequired,
};

export default DeleteBanking;