
import React from "react";
import PropTypes from "prop-types";

function DeleteBanking({
    deleteShow,
    handleCloseDelete,

}) {









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
                        Are you sure you want to delete this Bank-details?
                    </p>
                </div>


                <div className="flex items-center justify-center gap-3 px-6 pb-6">
                    <button
                        type="button"
                        onClick={handleCloseDelete}

                        className="h-[48px] w-full max-w-[160px] rounded-[8px] border border-[#1E45E1] bg-white px-5 py-3 font-gilroy text-[14px] font-semibold text-[#1E45E1] hover:bg-[#F7FAFF] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled
                        // onClick={handleDeleteBank}
                        className="h-[48px] w-full max-w-[160px] cursor-not-allowed rounded-[8px] 
                        bg-[#1E45E1] px-3 py-3 font-gilroy text-[14px] font-semibold text-white opacity-50"
                    >
                        Coming Soon
                    </button>
                </div>
            </div>
        </div>
    );
}
DeleteBanking.propTypes = {
    deleteShow: PropTypes.bool.isRequired,
    handleCloseDelete: PropTypes.func.isRequired,
};

export default DeleteBanking;